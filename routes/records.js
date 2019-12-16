const express = require('express');
const router = express.Router();
const isodate=require('isodate');
const records = require('../models/records');
const { Validator } = require('node-input-validator');




router.post('/', function (req, res) {
  const validate =new Validator(req.body,{
    startDate:'required|dateFormat:YYYY-MM-DD', 
    endDate:'required|dateFormat:YYYY-MM-DD',
    minCount:'required|integer',
    maxCount:'required|integer'   
  });
 
  validate.check().then((matched) => {
    if (!matched) {
      res.status(400).json({"code":400,"msg":validate.errors,"records":[]}).send(validate.errors);
    }
    else{
      const promise =records.aggregate([
        {
          $match:
          {
            "createdAt": 
            {$gte:isodate(validate.inputs.startDate),
            $lt: isodate(validate.inputs.endDate)}
          }
        },
        {
          $project: 
          {
              totalCount: 
            {
              $sum: "$counts",
            },
            key:"$key",
            createdAt:"$createdAt"
          }
        },
        { 
          $match: 
            { 'totalCount': {$lt:validate.inputs.maxCount,$gte: validate.inputs.minCount} } 
        },
        {
          $limit:10
        }
        ]);   
  
    
        
    promise.then((data)=>{
     
      if(!data)
        res.status(204).json({"code":204}); 
  
      res.json({"code":0,"msg":"Success","records":data});
      
    }).catch((err)=>{
      res.json(err);
    })
      
     
    }
  });
});



module.exports = router;



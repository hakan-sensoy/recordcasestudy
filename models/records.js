const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

 const recordsSchema =new Schema({
    startDate:{
        type:String,
        required:[true,'`{PATH}` ALANI ZORUNLUDUR']
    },
    endDate:{
        type:String,
        required:true
    },
    minCount:{
        type:Number,
        required:true
    },
    maxCount:{
        type:Number,
        required:true
    }

});

module.exports=mongoose.model('records',recordsSchema);


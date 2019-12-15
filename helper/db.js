const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect('mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study',{ useNewUrlParser: true ,useUnifiedTopology:true})
    mongoose.connection.on('open',()=>{
       // console.log('Mongo Db Connected');
    });
    mongoose.connection.on('error',(error)=>{
        console.log('Mongo Db Error',error);
    });
    mongoose.Promise=global.Promise;
};


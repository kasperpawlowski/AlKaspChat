const ChatEvent = require('../model/ChatEvents');
const mongoose = require('mongoose');
const cfg = require('../cfg.json');

mongoose.connect(cfg.mongoDBConnectionString, { useNewUrlParser: true})
    .then( ()    => {console.log("Mongoose connected successfully");},
           error => {console.log("Moongoose could not connect to the database: " + error);}
         );

ChatEvent.find({}, (err, results) => {
    if(err) throw err;

    console.log(results);
    process.exit(0);
});
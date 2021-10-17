const ChatMessage = require('../model/ChatHistory');
const mongoose = require('mongoose');
const cfg = require('../cfg.json');

const userIndex = process.argv.findIndex(a => a === '-u');
const roomIndex = process.argv.findIndex(a => a === '-r');

const user = userIndex === -1 ? undefined : process.argv[userIndex+1];
const room = roomIndex === -1 ? undefined : process.argv[roomIndex+1];

mongoose.connect(cfg.mongoDBConnectionString, { useNewUrlParser: true})
    .then( ()    => {console.log("Mongoose connected successfully");},
           error => {console.log("Moongoose could not connect to the database: " + error);}
         );

function queryCallback(err, results) {
    if(err) throw err;

    console.log(results);
    process.exit(0);
};

if(user && room) {
    ChatMessage.where('senderUsername').eq(user)
               .where('chatroom').eq(room)
               .exec(queryCallback);
} else if(user) {
    ChatMessage.where('senderUsername').eq(user)
               .exec(queryCallback);    
} else if(room) {
    ChatMessage.where('chatroom').eq(room)
               .exec(queryCallback);    
} else {
    ChatMessage.find({}, queryCallback);
}
const moment = require('moment');
const ChatEvent = require('../model/ChatEvents');
const ChatMessage = require('../model/ChatHistory');
const userUtil = require('./user');

function saveEvent(type, {username='', id='', room=''}) {
    let chatEvent = new ChatEvent({
        type: type,
        date: moment().format('YYYY/MM/DD'),
        time: moment().format('HH:mm:ss'),
        username: username,
        socketId: id,
        chatroom: room
    });

    chatEvent.save().then(() => {
        console.log('New event:');
        console.log(`${chatEvent.date} ${chatEvent.time}\n${chatEvent.username} ${chatEvent.type} ${chatEvent.chatroom}\n`);
    }, e => {
        console.log(`Error while adding event to the BD: ${e}`);
    });
};

function retrieveEvents() {
    return new Promise((resolve, reject) => {
        ChatEvent.find({}, (err, results) => {
            if(err) {
                reject(err); 
                return;
            }
            resolve(results);
        });
    });
}

function saveMessage({username, id, room}, message) {
    let recipients = userUtil.getRoomUsers(room)
                             .filter(user => user.username !== username)
                             .map(user => {
                                    return {username: user.username, socketId: user.id};
                                });

    let chatMessage = new ChatMessage({
        socketId: id,
        date: moment().format('YYYY/MM/DD'),
        time: moment().format('HH:mm:ss'),
        senderUsername: username,
        recipients: recipients,
        chatroom: room,
        message: message
    });

    chatMessage.save().then(() => {
        console.log('New message:');
        console.log(`${chatMessage.date} ${chatMessage.time}`);
        console.log(`From: ${chatMessage.senderUsername}\tTo: ${chatMessage.chatroom}\n"${chatMessage.message}"\n`);
    }, e => {
        console.log(`Error while adding message to the BD: ${e}`);
    });
};

function retrieveHistory() {
    return new Promise((resolve, reject) => {
        ChatMessage.find({}, (err, results) => {
            if(err) {
                reject(err); 
                return;
            }
            resolve(results);
        });
    });
}

module.exports = {saveEvent, retrieveEvents, saveMessage, retrieveHistory};
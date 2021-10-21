const mongoose= require('mongoose');

const chatEventSchema = new mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    username: {
        type: String,
        default: ''
    },
    socketId: {
        type: String,
        default: ''
    },
    chatroom: {
        type: String,
        default: ''
    }
});

const ChatEvent = mongoose.model('ChatEvent', chatEventSchema, 'Events');
module.exports = ChatEvent;
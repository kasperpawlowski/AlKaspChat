const mongoose= require('mongoose');

const recipientSchema = new mongoose.Schema({
    socketId: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    }
});

const chatMessageSchema = new mongoose.Schema({
    socketId: {
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
    senderUsername: {
        type: String,
        require: true
    },
    recipients: {
        type: [recipientSchema],
        default: []
    },
    chatroom: {
        type: String,
        require: true
    },    
    message: {
        type: String,
        require: true
    } 
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema, 'History');
module.exports = ChatMessage;
const moment = require('moment');
const cfg = require('../cfg.json');

//returns welcome user message form the bot
function welcomeUserBot(room) {
  return timeTag({username: cfg.botName, msg: `Welcome to ${cfg.chatName}! You are in the ${room} room.`});
}

//returns notification message from the bot that new user joined the chat
function newUserBot(username) {
  return timeTag({username: cfg.botName, msg: `${username} has joined the chat`});
}

//returns notification message from the bot that user left the chat
function userLeftBot(username) {
  return timeTag({username: cfg.botName, msg: `${username} has left the chat`});
}

// returns message error notification
function sendError() {
  return timeTag({username: cfg.botName, msg: 'Error sending message. Leave the chat and try again!'});
}

//adds time tag to the given message object
function timeTag({username, msg}) {
  return {
    username,
    msg,
    time: moment().format('h:mm a')
  };
}

module.exports = {welcomeUserBot, newUserBot, userLeftBot, sendError, timeTag};

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const cfg = require('./cfg.json');
const dashboardRouter = require('./routing/dashboardRouter');
const messageUtil = require('./utils/message');
const mongooseUtil = require('./utils/mongoose');
const {
  userJoin,
  userLeave,
  getUser,
  getRoomUsers
} = require('./utils/user');

// Initialization
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: cfg.frontendHost,
    methods: ["GET", "POST"]
  }
});

// Connect to DB
mongoose.connect(cfg.mongoDBConnectionString, { useNewUrlParser: true})
        .then( ()    => {console.log("Mongoose connected successfully");},
               error => {console.log("Moongoose could not connect to the database: " + error);}
            );

// Set up express routing
app.use(cors());
app.use('/dashboard', dashboardRouter);

app.use(function(req, res){
  res.send(404);
});

// Install event handlers when socket connection with the client established
io.on('connection', socket => {
  // Add SOCKET CONNECTED EVENT event
  mongooseUtil.saveEvent('SOCKET CONNECTED', {username: 'server'});

  socket.on('joinRoom', ({newRoom, newUsername}) => {
    let user = getUser(socket.id);

    // Check if new user or just switching the rooms
    if(user) {
      // User is switching rooms
      // Leave current room
      userLeave(socket.id);
      socket.leave(user.room);

      // Broadcast to other chatroom users when user leaves their chatroom
      io.to(user.room).emit('newMessage', messageUtil.userLeftBot(user.username));

      // Update current list of chatroom users
      io.to(user.room).emit('roomUsers', {newRoom: user.room, newUsers: getRoomUsers(user.room)});

      // Add LEFT ROOM event
      mongooseUtil.saveEvent('LEFT ROOM', user);
    }
      
    // New user or user just left the channel
    // Add user to the internal list
    user = userJoin(socket.id, newUsername, newRoom);

    // Add user to the room
    socket.join(user.room);

    // Welcome new user in the chatroom
    socket.emit('newMessage', messageUtil.welcomeUserBot(user.room));    
    
    // Broadcast to other chatroom users when new user connects to their chatroom
    socket.broadcast.to(user.room).emit('newMessage', messageUtil.newUserBot(user.username));

    // Update current list of chatroom users
    io.to(user.room).emit('roomUsers', {newRoom: user.room, newUsers: getRoomUsers(user.room)});

    // Add JOINED ROOM event
    mongooseUtil.saveEvent('JOINED ROOM', user);
  });


  // Listen for new messages in the chat room and broadcast them to other users
  socket.on('newMessage', message => {
    const user = getUser(socket.id);

    if(!user) {
      // Error, user does not exist
      socket.emit('newMessage', messageUtil.sendError());

      // Add ERROR MESSAGE event
      mongooseUtil.saveEvent('ERROR MESSAGE', {id: socket.id});
      return;
    }

    // Broadcast new message
    io.to(user.room).emit('newMessage', messageUtil.timeTag({username: user.username, msg: message}));

    // Add SENT MESSAGE event
    mongooseUtil.saveEvent('SENT MESSAGE', user);

    // Add message to DB
    mongooseUtil.saveMessage(user, message);
  });

  // Listen for user leave
  socket.on('leave', () => {
    const user = userLeave(socket.id);

    if(user) {
      // Broadcast to other chatroom users when user leaves their chatroom
      io.to(user.room).emit('newMessage', messageUtil.userLeftBot(user.username));

      // Update current list of chatroom users
      io.to(user.room).emit('roomUsers', {newRoom: user.room, newUsers: getRoomUsers(user.room)});

      // Add USER LEFT CHATROOM event
      mongooseUtil.saveEvent('LEFT ROOM', user);
    }
  });  

  // Listen for user disconnect
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if(user) {
      // Broadcast to other chatroom users when user leaves their chatroom
      io.to(user.room).emit('newMessage', messageUtil.userLeftBot(user.username));

      // Update current list of chatroom users
      io.to(user.room).emit('roomUsers', {newRoom: user.room, newUsers: getRoomUsers(user.room)});

      // Add USER DISCONNECTED event
      mongooseUtil.saveEvent('USER DISCONNECTED', user);
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));

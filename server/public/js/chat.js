const changeSelector = document.getElementById('change-selector');
const leaveBtn = document.getElementById('leave-btn');
const dashboardBtn = document.getElementById('dashboard-btn');
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// React App Host
const REACT_APP_HOST = 'http://localhost:3000';

// Initialization
const socket = io();

// Get username and room from the URL string
let {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true});

// Update the room selector according to the choice from the main page
for(let i=0; i<changeSelector.options.length; i++) {
  if(changeSelector.options[i].innerText === room) {
    changeSelector.selectedIndex = i;
    break;
  }
}

// Join chosen chatroom
socket.emit('joinRoom', {newRoom: room, newUsername: username});

// Listen for room and users update
socket.on('roomUsers', ({newRoom, newUsers}) => {
  displayRoomName(newRoom);
  displayUsers(newUsers);
});

// Listen for message from server
socket.on('newMessage', (message) => {
  displayMessage(message);

  // Scroll down option 
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Listen for message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!e.target.elements.msg.value) {
    return false;
  }

  // Get message text
  let msg = e.target.elements.msg.value.trim();

  // Emit message to the server
  socket.emit('newMessage', msg);

  // clear input values 
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Listen for room change
changeSelector.addEventListener('change', () => {
  room = changeSelector.options[changeSelector.selectedIndex].innerText;

  // For consistency set appropriate URL without page reloading (socket disconnection)
  history.replaceState({}, '', `chat?username=${encodeURIComponent(username)}&room=${encodeURIComponent(room)}`);

  // Clear messages
  chatMessages.innerHTML = '';
  socket.emit('joinRoom', {newRoom: room, newUsername: username});
});

// Listen for leaving the chat, redirect to the main page
leaveBtn.addEventListener('click', () => {
    history.back();
});

// Listen for redirection to React dashboard app, pretend that we're still in the same app
dashboardBtn.addEventListener('click', () => {
  location.assign(REACT_APP_HOST);
});

// Display message on DOM
function displayMessage(message) {
  const div = document.createElement('div');
  const metadata = document.createElement('p');
  const msg = document.createElement('p');

  div.classList.add('message');
  metadata.classList.add('metadata');
  msg.classList.add('text');

  metadata.innerText = `${message.username} ${message.time}`;
  msg.innerText = message.msg;
  
  div.appendChild(metadata);
  div.appendChild(msg);
  chatMessages.appendChild(div);
}

// Display room name on DOM
function displayRoomName(newRoom) {
  roomName.innerText = newRoom;
}

// Display chatroom users on DOM
function displayUsers(newUsers) {
  userList.innerHTML = '';
  for(let user of newUsers) {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  }
}
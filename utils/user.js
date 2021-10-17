const users = [];

// Add user to the given chatroom
// returns added user object
function userJoin(id, username, room) {
  const user = {id, username, room};
  users.push(user);
  return user;
}

// Remove user of given id from the chat
// returns removed user object or undefined if given user not found
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index === -1) {
    return undefined;
  }
  return users.splice(index, 1)[0];
}

// Get user of given id
// returns user object or undefined if not found
function getUser(id) {
  return users.find(user => user.id === id);
}

// Get list of user objects assigned to a given chatroom or empty 
// array if the chatroom is empty
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {userJoin, getUser, userLeave, getRoomUsers};
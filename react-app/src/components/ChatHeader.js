import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmile} from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

function ChatHeader(props) {
    return (
        <header className="chat-header">
        <h1><FontAwesomeIcon icon={faSmile} />{' ' + props.chatName}</h1>
        <form>
          <label htmlFor="room">{'ROOM '}</label>
          <select name="room" value={props.chatroom} onChange={(e) => props.chatroomChangeHandle(e.target.value)}>
            <option value="Gamers">Gamers</option>
            <option value="Developers">Developers</option>
            <option value="Scientists">Scientists</option>
            <option value="Teachers">Teachers</option>
            <option value="Lawyers">Lawyers</option>
            <option value="Doctors">Doctors</option>
          </select>
        </form>
        <Link to="/"><Button clickHandler={props.leaveChatHandle} text="LEAVE CHAT" /></Link>
        <Link to="/dashboard"><Button clickHandler={props.leaveChatHandle} text="GO TO ADMIN DASHBOARD" /></Link>
      </header>
    );
}

export default ChatHeader;
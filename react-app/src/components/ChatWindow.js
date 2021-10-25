import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComments, faUsers} from '@fortawesome/free-solid-svg-icons';
import {v4 as uuidv4} from 'uuid';

function Message(props) {
    return (
        <div className="message">
            <p className="metadata">{`${props.time} ${props.username}`}</p>
            <p className="text">{props.message}</p>
        </div>
    );
}

function ChatWindow(props) {
    return (
        <main className="chat-main">
            <div className="chat-sidebar">
                <h3><FontAwesomeIcon icon={faComments} />{' ROOM NAME:'}</h3>
                <h2 id="room-name">{props.chatroom}</h2>
                <h3><FontAwesomeIcon icon={faUsers} />{' USERS'}</h3>
                <ul id="users">
                    {props.users.map(user => {
                        return <li key={uuidv4()}>{user.username}</li>
                    })}
                </ul>
            </div>
            <div id="chat-messages" className="chat-messages-container">
                {props.messages.map(msg => {
                    return <Message key={uuidv4()} time={msg.time} username={msg.username} message={msg.msg} />
                })}
                <div ref={props.messagesBottomRef}/>
            </div>
        </main>
    );
}

export default ChatWindow;
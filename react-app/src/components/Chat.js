import React, {useState, useEffect, useRef} from 'react';
import ChatHeader from './ChatHeader';
import ChatWindow from './ChatWindow';
import ChatForm from './ChatForm';
import io from'socket.io-client';
import cfg from '../cfg.json';

const socket = io(cfg.backendHost);

function Chat(props) {
    const [username, setUsername] = useState(props.match.params.username);
    const [chatroom, setChatroom] = useState(props.match.params.chatroom);
    const [usernames, setUsernames] = useState([]);
    const [messages, setMessages] = useState([]);
    const messagesBottom = useRef(null);

    useEffect(() => {
        // Listen for room and users update
        socket.on('roomUsers', ({newUsers}) => {
            setUsernames(newUsers);
        });

        // Listen for message from server
        socket.on('newMessage', (message) => {
            setMessages(messages => [...messages, message]);
            messagesBottom.current?.scrollIntoView({ behavior: 'smooth' });
        });

        // Join chosen chatroom
        socket.emit('joinRoom', {newRoom: chatroom, newUsername: username});

        socket.on('connect_error', err => {alert(`${cfg.chatName} server connection error`)});
        socket.on('connect_failed', err => {alert(`${cfg.chatName} server connection failed`)});

        return () => {
            socket.off('roomUsers');
            socket.off('newMessage');
            socket.off('connect_error');
            socket.off('connect_failed');
        }
    }, [props]);

    const chatroomChange = (newChatroom) => {
        setChatroom(newChatroom);
        setUsernames([]);
        setMessages([]);

        // Join chosen chatroom
        props.history.push(`/chat/${newChatroom}/${username}`);
    }

    const sendNewMessage = (message) => {
        // Emit message to the server
        socket.emit('newMessage', message);
    }

    const leaveChat = () => {
        socket.emit('leave');
    }

    return (
        <div className="chat-container">
        <ChatHeader chatName={cfg.chatName} chatroom={chatroom} chatroomChangeHandle={chatroomChange} leaveChatHandle={leaveChat} />
        <ChatWindow chatroom={chatroom} users={usernames} messages={messages} messagesBottomRef={messagesBottom} />
        <ChatForm newMessageHandler={sendNewMessage} />
        </div>
    );
}

export default Chat;
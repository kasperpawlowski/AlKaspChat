import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';

function ChatForm(props) {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(message.trimEnd() === '') return;

        props.newMessageHandler(message.trimEnd());
        setMessage('');
    }

    return (
        <div className="chat-form-container">
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Enter Message"
                    autoComplete="off"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="btn"><FontAwesomeIcon icon={faPaperPlane} />{' SEND'}</button>
            </form>
        </div>
    );
}

export default ChatForm;
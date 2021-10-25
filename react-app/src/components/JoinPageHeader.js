import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmile} from '@fortawesome/free-solid-svg-icons';

function JoinPageHeader(props) {
    return ( 
        <header className="join-header">
			<h1><FontAwesomeIcon icon={faSmile} />{' ' + props.chatName}</h1>
		</header>
    );
}

export default JoinPageHeader;
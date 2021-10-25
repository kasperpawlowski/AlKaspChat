import React from 'react';
import {Link} from 'react-router-dom';
import JoinPageHeader from './JoinPageHeader';
import JoinPageForm from './JoinPageForm';
import cfg from '../cfg.json';

function JoinPage(props) {
    return (
		<div className="join-container">
			<JoinPageHeader chatName={cfg.chatName} />
			<main className="join-main">
				<JoinPageForm history={props.history}/>
				<Link to="/dashboard"><button className="btn">GO TO ADMIN DASHBOARD</button></Link>
			</main>
		</div>
    );
}

export default JoinPage;
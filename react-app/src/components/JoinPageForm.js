import React, {useState} from 'react';

function JoinPageForm(props) {
    const [username, setUsername] = useState('');
    const [chatroom, setChatroom] = useState('Gamers');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(username === '') return;

        props.history.push(`/chat/${chatroom}/${username}`);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
			<div className="form-control">
				<label htmlFor="username">USERNAME</label>
				<input
					type="text"
					name="username"
					placeholder="Enter username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</div>
			<div className="form-control">
				<label htmlFor="room">ROOMS</label>
				<select name="room" value={chatroom} onChange={(e) => setChatroom(e.target.value)}>
					<option value="Gamers">Gamers</option>
					<option value="Developers">Developers</option>
					<option value="Scientists">Scientists</option>
					<option value="Teachers">Teachers</option>
					<option value="Lawyers">Lawyers</option>
					<option value="Doctors">Doctors</option>
				</select>
			</div>
            <button type="submit" className="btn">JOIN CHAT</button>
		</form>
    );
}

export default JoinPageForm;
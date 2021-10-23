import React from 'react';
import { DataGrid } from "@material-ui/data-grid";
import '../App.css';

function HistoryTable(props) {
    const columns = () => {
        return [
            {field: "id", hide: true},
            {field: "socketId", hide: true},
            {field: "date", headerName: "Date", width: 150},
            {field: "time", headerName: "Time", width: 150},
            {field: "sender", headerName: "Sender", width: 200},
            {field: "recipients", headerName: "Recipients", width: 200,},
            {field: "message", headerName: "Message", width: 500},
            {field: "chatroom", headerName: "Chatroom", width: 200}
        ].map(col => ({...col, headerAlign: 'center'}));
    }

    const rows = (content) => {
        if(!content) return []; 

        return content.map(msg => {
            return {
                id: msg._id,
                socketId: msg.socketId,
                date: msg.date,
                time: msg.time,
                sender: msg.senderUsername,
                recipients: msg.recipients.map(r => r.username).toString().replace(/,/g, ', '),
                message: msg.message,
                chatroom: msg.chatroom
            }
        });
    }

    return (
        <div className="dashboard-table">
            <DataGrid rows={rows(props.content)} columns={columns()} pageSize={25} rowsPerPageOptions={[25]} />
        </div>
    );
}

export default HistoryTable;
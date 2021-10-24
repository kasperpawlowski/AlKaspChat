import React from 'react';
import { DataGrid } from "@material-ui/data-grid";
import '../App.css';

 function EventsTable(props) {
    const columns =()=> {
        return [
            {field: "socketId", headerName: "Socket ID", width: 200 },
            {field: "type", headerName: "Type", width: 200},
            {field: "date", headerName: "Date", width: 200},
            {field: "time", headerName: "Time", width: 180},
            {field: "username", headerName: "Username", width: 300},
            {field: "chatroom", headerName: "Chatroom", width: 300}
        ].map(col =>({...col, headerAlign: "center"}));
    }
const rows =(content) =>{
    if(!content) return [];

    return content.map(msg => {
        return {
            socketId: msg.socketId,
            type: msg.type,
            date: msg.date,
            time: msg.time,
            username: msg.username,
            chatroom: msg.chatroom
        }
    });
}
   return (

        <div className = "dashboard-table">
        <DataGrid rows={rows(props.content)}
        columns={columns()} pageSize={25}   
        rowsPerPageOptions={[25]}/>

        </div>
    );
}

export default EventsTable;
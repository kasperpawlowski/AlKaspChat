import React from 'react';
import {DataGrid} from "@material-ui/data-grid";
import '../App.css';

function EventsTable(props) {
    const columns = () =>{
        return[

            {field: "type", headerName: "Type", width: 200 },
            {field: "date", headerName: "Date", width: 150 },
            {field: "time", headerName: "Time", width: 150 },
            {field: "username", headerName: "User", width: 200 },
            {field: "socketId", headerName: "Event ID", width: 150 },
            {field: "_id", headerName: "PPID", width: 150 }          
           
        ].map (col => ({...col, headerAlign: 'center'}));
    }

    const rows = (content) =>{
        if (!content) return [];

        return content.map(msg=>{
            return {
                type:  msg.type,
                date: msg.date,
                time: msg.time,
                username: msg.username,
                socketId: msg.id,
                _id: msg._id          
            
            }
        });
    }

    return (
        <div className ="dashboard-table">
           <DataGrid rows={rows(props.content)}
            columns= {columns()}
            pageSize={25} rowsPerPageOptions={[25]}/>

        </div>
    );
}

export default EventsTable;
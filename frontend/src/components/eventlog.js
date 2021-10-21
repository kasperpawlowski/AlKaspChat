import React, { Component } from 'react';
import axios from 'axios';
import { saveEvent } from '../../../utils/mongoose';
import {ChatEvents} from '../../model/ChatEvents';




const ChatEvent = props => (
  <tr>
    <td>{props.saveEvent.type}</td>
    <td>{props.saveEvent.user}</td>
    <td>{props.saveEvent.time}</td>
    <td>{props.saveEvent.EventId} </td>
    <td>{props.saveEvent.Ppid}</td>
    <td>{props.saveEvent.date.substring(0,10)}</td>
  </tr>
)
saveEvent() 


class eventlog extends Component{
    constructor(props){
        super(props);

        this.eventlog =this.eventlog.bind(this)
        this.state = {eventlog: []};
    }


    componentDidMount() {
        axios.get('http://localhost:5000/api/')
          .then(response => {
              if (response.data.length >0)

            this.setState({ eventlog: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

    render(){
        return(
        <div>
        <ChatEvents/>
        </div>
        )
    }

}
export default eventlog;

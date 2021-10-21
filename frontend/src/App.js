import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import eventlog from './components/eventlog';
import 'bootstrap/dist/css/bootstrap.min.css'
import navigation from './components/navigation';
import moment from 'moment';
import { saveEvent } from '../../utils/mongoose';

class App extends Component{

constructor(){
super()
this.state = {

  type: saveEvent.type,
  date: moment().format('YYYY/MM/DD'),
  time: moment().format('HH:mm:ss'),
  username: saveEvent.username,
  socketId: saveEvent.id,

}

}

  return () {

    <Router>
    <div className ="container">
      <navigation />

      <br/>
      <Route path ="/" exact component={eventlog}/>
    </div>
    </Router>
  
  };




}
  
  


export default App;

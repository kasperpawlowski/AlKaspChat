import React, { Component } from 'react';
import {Link} from 'react-router-dom';

 class navigation extends Component {

    render() {
      return (
        <nav className="navigation navigation-dark bg-dark navigation-expand-lg">
          <Link to="/" className="navigation-brand">Guest Screen</Link>
          <div className="collpase navigation-collapse">
          <ul className="navigation-nav mr-auto">
            <li className="navigation-item">
            <Link to="/ChatEvents" className="nav-link">Event History</Link>
            </li>
            <li className="navigation-item">
            <Link to="/ChatHistory" className="nav-link">Chat History</Link>
            </li>
         </ul>
          </div>
        </nav>
      );
    }
  }
  export default navigation;
 
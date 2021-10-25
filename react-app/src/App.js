import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import JoinPage from './components/JoinPage';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path="/" component={JoinPage} exact />
          <Route path="/chat/:chatroom/:username" component={Chat} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

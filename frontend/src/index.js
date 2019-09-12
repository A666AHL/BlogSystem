import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login_view from './components/login_view';
import Register from './components/RegisterCard';
import Main from './pages/Main';
import {BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render((
    <Router>
       <Route path="/login_view" component={Login_view}/>
       <Route path="/App" component={App}/>
       <Route path="/main" component={Main}/>
       <Route path="/register" component={Register} />
    </Router>
    ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

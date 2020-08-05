import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginView from './views/login/LoginView';
import AdminDashboard from './views/dashboard/AdminDashboard/AdminDashboard';
import Home from './views/site/Home';
import About from './views/site/About';
import Header from './views/site/Header';
import Posts from './views/site/Posts';
import Contact from './views/site/Contact';
import Recipes from './views/site/Recipes';
import { setGlobalHeader } from './util/http';
import * as serviceWorker from './serviceWorker';
import { Route, Redirect, HashRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const token = localStorage.getItem('token') || ''

var loggedIn = false;
if (token) {
  setGlobalHeader('Authorization', token);
  loggedIn = true;
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <Switch> */}
      <Route exact path="/" render={(props) => <Home/>} />
      <Route path="/about" render={(props) => <div><Header ><About /></Header ></div>} />
      <Route path="/posts/:postid" render={(props) => <Header><Posts {...props} /></Header>} />
      <Route exact path="/recipes" render={(props) => <Header><Recipes {...props} /></Header>} />
      <Route path="/recipes/:category" render={(props) => <Header><Recipes {...props} /></Header>} />
      <Route path="/contact" render={(props) => <div><Header><Contact/></Header></div>} />
      <Route exact path="/admin" render={(props) => {
          return (loggedIn ?  <Redirect to="/admin/dashboard" /> : <Redirect to="/admin/login" />)}
      }/>
      <Route path="/admin/login" component={LoginView} />
      <Route path="/admin/dashboard" component={AdminDashboard} />


    {/* </Switch> */}
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

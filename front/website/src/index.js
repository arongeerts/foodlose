import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginView from './views/login/LoginView';
import AdminDashboard from './views/dashboard/AdminDashboard/AdminDashboard';
import UserDashboard from './views/dashboard/UserDashboard/UserDashboard';
import Home from './views/site/Home';
import About from './views/site/About';
import Header from './views/site/Header';
import Posts from './views/site/Posts';
import Contact from './views/site/Contact';
import Recipes from './views/site/Recipes';
import { updateLoginState, loginState } from './util/login';
import * as serviceWorker from './serviceWorker';
import { Route, Redirect, HashRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactGA from "react-ga";
import CookieConsent, { Cookies } from "react-cookie-consent";

const acceptCookies = () => {
  ReactGA.initialize("UA-190755162-2");
  ReactGA.pageview(window.location.pathname + window.location.search);
}

updateLoginState()

const App = () => {
  return <>
    <React.StrictMode>
      <Router>
        <Route exact path="/" render={(props) => <Home/>} />
        <Route path="/about" render={(props) => <div><Header ><About /></Header ></div>} />
        <Route path="/posts/:postid" render={(props) => <Header><Posts {...props} /></Header>} />
        <Route exact path="/recipes" render={(props) => <Header><Recipes {...props} /></Header>} />
        <Route path="/recipes/:category" render={(props) => <Header><Recipes {...props} /></Header>} />
        <Route path="/contact" render={(props) => <div><Header><Contact/></Header></div>} />
        <Route exact path="/dashboard" render={(props) => {
            return (loginState.loggedIn ?  
              (loginState.role == "ADMIN" ?
                <Redirect to="/admin/dashboard" /> : 
                <Redirect to="/user/dashboard" />) : 
              <Redirect to="/login" />)
        }}/>
        <Route path="/login" component={LoginView} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/user/dashboard" component={UserDashboard} />
      </Router>
    </React.StrictMode>
    <CookieConsent
      location="bottom"
      buttonText="OK"
      onAccept={acceptCookies}
      buttonStyle={{ backgroundColor: "#000000", color: "#ffffff" }}
      style={{ 
        backgroundColor: "#ffffff", 
        color: "#000000", 
        border: "1px solid black",
        maxWidth: 400,
        margin: 10
      }}
      debug
    >
      Mogen wij jouw cookies in ruil voor de onze? Op basis van jouw gebruik kunnen wij, volledig anoniem, jouw gebruik in kaart brengen om onze website beter te maken.
    </CookieConsent>
  </>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

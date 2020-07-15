import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import UserInfo from "./modules/UserInfo";
import CreateUser from "./modules/CreateUser";
import CreatePost from "./modules/CreatePost";
import './Dashboard.css'




export default class Dashboard extends React.Component {
  constructor(props) {
      super(props);
  };

    
  render() {

    return <Tabs defaultActiveKey="createPost" id="dashboardPanels">
        <Tab eventKey="createPost" title="Posts">
            <CreatePost />
        </Tab>
        <Tab eventKey="userInfo" title="Gebruikers">
            <UserInfo />
        </Tab>
        <Tab eventKey="createUser" title="Nieuwe gebruiker">
            <CreateUser />
        </Tab>
    </Tabs>
  }
}

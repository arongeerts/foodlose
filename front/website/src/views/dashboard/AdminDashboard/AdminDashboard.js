import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import UserInfo from "../../../panels/UserInfo";
import CreateUser from "../../../panels/CreateUser";
import CreatePost from "../../../panels/CreatePost";
import './AdminDashboard.css'




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

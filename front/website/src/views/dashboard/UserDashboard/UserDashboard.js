import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return <Tabs defaultActiveKey="dummy" id="dashboardPanels">
            <Tab eventKey="dummy" title="Dummy">
                <span>UserDashboard</span>
            </Tab>
        </Tabs>
    }
}

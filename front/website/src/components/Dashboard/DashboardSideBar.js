import React from 'react';

import { ProSidebar, Menu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

export default function DashboardSideBar(props) {
    return <ProSidebar>
        <SidebarHeader>
            <div style={{textAlign: "center"}}>{props.title}</div>
        </SidebarHeader>
        <SidebarContent>
        <Menu iconShape="square">
            {props.children}
        </Menu>
        </SidebarContent>
        <SidebarFooter>
            <div style={{ textAlign: "center" }}><a href={window.location.origin} style={{color: "black"}}>Foodlose</a></div>
        </SidebarFooter>
    </ProSidebar>;
}
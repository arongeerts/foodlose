import React from 'react';
import { logout } from '../../../util/login';
import UserInfo from "../../../panels/UserInfo";
import CreateUser from "../../../panels/CreateUser";
import CreatePost from "../../../panels/CreatePost";
import EditPost from "../../../panels/EditPost";
import './AdminDashboard.css'
import DashboardSideBar from '../../../components/Dashboard/DashboardSideBar';
import SidebarItem from '../../../components/Dashboard/SideBarItem';
import { faEdit, faUser, faChartLine, faSignOutAlt, faFileMedical } from '@fortawesome/free-solid-svg-icons'
import DashboardContainer from '../../../components/Dashboard/DashboardContainer';
import ConfirmModal from '../../../components/Modal/ConfirmModal';

export default class Dashboard extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        selected: "createPost",
        modal: {
          show: false,
          title: "",
          confirm: () => {},
          cancel: () => {}
        }
      }

      this.select = this.select.bind(this);
      this.clickLogout = this.clickLogout.bind(this);
      this.resetModal = this.resetModal.bind(this);
  };

  select(newKey) {
      this.setState({...this.state, selected: newKey})
  }

  resetModal() {
      this.setState({
          ...this.state, modal: {
              show: false,
              title: "",
              confirm: () => {},
              cancel: () => {}
          }})
  }

  clickLogout() {
      this.setState({...this.state, modal: {show: true, title: "Uitloggen", confirm: logout, cancel: this.resetModal}})
  }

  render() {
    const mappings = {
        createPost: <CreatePost />,
        editPost: <EditPost />,
        createUser: <CreateUser />,
        userInfo: <UserInfo />
    }
    return (
        <div style={{display: "flex", position: "relative", height: "100%"}}>
            <DashboardSideBar title="Admin Dashboard">
                <SidebarItem itemKey="createPost" icon={faFileMedical} onSelect={this.select} >
                    <div>Nieuwe Post</div>
                </SidebarItem>
                <SidebarItem itemKey="editPost" icon={faEdit} onSelect={this.select} >
                    <div>Bewerk post</div>
                </SidebarItem>
                <SidebarItem itemKey="createUser" icon={faUser} onSelect={this.select}>
                    <div>Gebruikers toevoegen</div>
                </SidebarItem>
                <SidebarItem itemKey="userInfo" icon={faChartLine} onSelect={this.select}>
                    <div>Gebruikers voortgang</div>
                </SidebarItem>
                <SidebarItem itemKey="logout" icon={faSignOutAlt} onSelect={this.clickLogout}>
                    <div>Uitloggen</div>
                </SidebarItem>
            </DashboardSideBar>
            <DashboardContainer>
                {mappings[this.state.selected]}
            </ DashboardContainer>
            <ConfirmModal {...this.state.modal} text="Weet je zeker dat je wilt uitloggen?"/>
        </div >

    )
  }
}
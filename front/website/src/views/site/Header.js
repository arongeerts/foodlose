import React from "react";

import Sidebar from "../../components/Menu/Sidebar";
import MenuBar from "../../components/Menu/MenuBar";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sideBarDisplay: false, width: window.innerWidth, height: window.innerHeight };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.hideSideBar = this.hideSideBar.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      ...this.state,
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  toggleSideBar() {
    this.setState({ ...this.state, sideBarDisplay: !this.state.sideBarDisplay });
  }

  hideSideBar() {
    this.setState({ ...this.state, sideBarDisplay: false });
  }


  render() {

    if (this.state.width > 800) {
      return (
        <>
          <Sidebar />
          <div className="container-large-screen">{this.props.children}</div>
        </>
      );
    } else {
        return (
          <>
            {this.state.sideBarDisplay && <Sidebar />}
              <MenuBar toggleSideBar={this.toggleSideBar} >
              <div 
                onClick={this.state.sideBarDisplay ? this.hideSideBar : () => {}} >
                {this.props.children}
                 </div>
              </MenuBar>
           
          </>
        );
    }
  }
}

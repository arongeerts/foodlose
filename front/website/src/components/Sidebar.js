import React from 'react';
import instagram from "../img/instagram.png"


export default function Sidebar(props) {
    return <div className="sidebar" style={props.style}>
          <div className="sidebar-header overlay-item">
            <div className="menu-overlay">
          <a className="sidebar-link" href="/">
              FOODLOSE
              </a>
            </div>
          </div>
          <div className="sidebar-item overlay-item">
          <div className="menu-overlay"><a className="sidebar-link" href="/">HOME</a></div>
          </div>
          <div className="sidebar-item overlay-item">
        <div className="menu-overlay"><a className="sidebar-link" href="/#about">ABOUT</a></div>
          </div>
          <div className="sidebar-item overlay-item">
        <div className="menu-overlay"><a className="sidebar-link" href="/#recipes">RECEPTEN</a></div>
        </div>
        <div className="submenu">
          <div className="sidebar-item sidebar-sub-item overlay-item" >
            <div className="menu-overlay"><a className="sidebar-link" href="/#recipes/breakfast">ONTBIJT</a></div>
          </div>
        <div className="sidebar-item sidebar-sub-item overlay-item" >
          <div className="menu-overlay"><a className="sidebar-link" href="/#recipes/lunch">LUNCH</a></div>
        </div>
        <div className="sidebar-item sidebar-sub-item overlay-item" >
          <div className="menu-overlay"><a className="sidebar-link" href="/#recipes/dinner">DINER</a></div>
        </div>
        <div className="sidebar-item sidebar-sub-item overlay-item" >
          <div className="menu-overlay"><a className="sidebar-link" href="/#recipes/drinks">DRANK</a></div>
        </div>
        <div className="sidebar-item sidebar-sub-item overlay-item" >
          <div className="menu-overlay"><a className="sidebar-link" href="/#recipes/sweet">ZOET</a></div>
        </div>
        <div className="sidebar-item sidebar-sub-item overlay-item" >
          <div className="menu-overlay"><a className="sidebar-link" href="/#recipes/salty">ZOUT</a></div>
        </div>
        </div>
          <div className="sidebar-item overlay-item">
        <div className="menu-overlay"><a className="sidebar-link" href="/#contact">CONTACT</a></div>
          </div>
      <div className="sidebar-item ">
        
          <a href="https://www.instagram.com/charportael/"><img alt="Laden..." src={instagram} width="30px" height="30px" 
          style={{marginTop: "16px"}}/></a>
      </div>
        </div>
}
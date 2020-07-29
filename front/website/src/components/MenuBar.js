import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuBar(props) {
  return (
    <div>
      <div className="menu-bar">
        <div className="menu-bar-title" style={{ float: "left" }}>
          FOOD LOSE
        </div>
        <div
          className="menu-bar-button"
          onClick={props.toggleSideBar}
          style={{ float: "right" }}
        >
          <FontAwesomeIcon icon={faBars} size="1x"/>
        </div>
      </div>
      <div className="container-small-screen">{props.children}</div>
    </div>
  );
}

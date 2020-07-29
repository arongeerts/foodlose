import React from "react";
import Logo from "../components/Logo"
export default function Welcome(props) {
    return <>
        <Logo width="50%" style={{marginLeft: "auto", marginRight: "auto", display: "block"}} />
        <div className="welcome">
            <h1 className="welcome-header">Welkom</h1>
            <p>Hi! Welkom bij Foodlose, een nieuwe website boordevol inspiratie voor een gezonde levensstijl.<br/>
            Op zoek naar gezonde recepten?  Dan ben je aan het juiste adres!  Geen keukenprinses, geen probleem!  <br/>
            Granola at your service!  <br /> </p>
        </div>
        </>
}
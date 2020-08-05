import React from "react";

export default function PageHeader(props) {
    return <>
        <div className="welcome">
            <h1 className="welcome-header">{props.title}</h1>
            <p>{props.text.map(line => <>{line}<br /></>)}</p>
        </div>
        </>
}
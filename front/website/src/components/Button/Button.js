import React from "react";
import Button from 'react-bootstrap/Button'

const style = {
    width: "100%",
}

export default function CustomButton(props) {
    return <Button variant="outline-dark" className="post-button" onClick={props.onClick} style={style}>
        <label style={{margin: 0, cursor: "pointer", padding: "5px"}}>
        {props.label}
        {props.children}
        </label>
    </Button>
}
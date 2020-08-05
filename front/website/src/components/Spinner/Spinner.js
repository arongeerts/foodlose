import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import './Spinner.css'

export default function Spinner(props) {
    const borderStyle = {
        borderColor: "black",
        borderStyle: "dashed",
        borderWidth: "1px",
        borderRadius: "50%",
        padding: "10px",
        display: "inline-block",
        width: "40px",
        height: "40px"
    }

    return (
        props.show ? 
            <div style={{width: "100%", textAlign: "center", padding: "10px", ...props.style}} >
                <div className="fast-spin" style={borderStyle}>
                    <FontAwesomeIcon icon={faUtensils} size="lg" />
                </div>
            </div> 
        : <></> );
}
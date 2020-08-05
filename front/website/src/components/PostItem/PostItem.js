import React from "react";


export default function PostItem(props) {
    return <>
        <h1>{props.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: props.text }} />
        <img src={props.imgUrl} width="50%"
            style={{ display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "40px" }} />
        </>
}
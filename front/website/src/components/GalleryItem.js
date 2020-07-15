import React from "react";
import Card from "react-bootstrap/Card";

export default function GalleryItem(props) {
  return <Card className="gallery-item">
    <div className="gallery-overlay">
    <a href={"/#posts/" + props.postId}>
      <Card.Img variant="top" src={props.imgUrl} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
      </Card.Body>
    </a>
    </div>
  </Card>;
}

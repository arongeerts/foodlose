import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "../Button/Button"


export default function MyModal(props) {
    return <Modal show={props.show} onHide={props.cancel} centered={true}>
        <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {props.text || <p>Weet je het zeker?</p>}
        </Modal.Body>

        <Modal.Footer>
            <Button label="Nee" onClick={props.cancel} />
            <Button label="Ja" onClick={props.confirm} variant="dark" />
        </Modal.Footer>
    </Modal>
}

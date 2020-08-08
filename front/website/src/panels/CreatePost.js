import React from 'react';

import client from "../api/client";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from '../components/Spinner/Spinner';
import EditPostItem from '../components/PostItem/EditPostItem';



export default class CreatePost extends React.Component {
    constructor(props) {
        super(props);

        const emptyPost = {
            name: "",
            text: "",
            image: "",
            tags: []
        }

        this.initialState = {
            message: "",
            messageColor: "green",
            waiting: false,
            post: emptyPost
        };

        this.state = this.initialState;

        this.handleFailedUpload =  this.handleFailedUpload.bind(this);
        this.handleSuccessfulUpload = this.handleSuccessfulUpload.bind(this);
        this.savePost = this.savePost.bind(this);
        this.setPost = this.setPost.bind(this);
    }

    savePost(upload) {
        if (!this.state.post.image) {
            this.setState({...this.state, message: "Selecteer een afbeelding", messageColor: "red"})
            return
        }
        this.setState({...this.state, waiting: true})
        var convertToBase64 = function (url, imagetype, callback) {
            var img = document.createElement('IMG');
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var data = '';

            img.crossOrigin = 'Anonymous'

            img.addEventListener('load', function () {
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);
                data = canvas.toDataURL(imagetype);
                callback(data);
            }, false)

            img.src = url;

        };

        var upload = function (name, text, tags, img_data) {
            return client.createPost(name, text, tags, img_data)

        }

        convertToBase64(this.state.post.image, 'image/jpeg', 
            (img_data) => upload(this.state.post.name, this.state.post.text, this.state.post.tags, img_data)
                            .then(this.handleSuccessfulUpload)
                            .catch(this.handleFailedUpload))
    }

    setPost(post) {
        this.setState({...this.state, post: post})
    }

    handleSuccessfulUpload(response) {
        console.log("success")
        this.setState({ ...this.state, waiting: false })
        this.setState({ ...this.initialState, message: "Opgeslagen", post: {name: "", text: "", tags: [], image: ""}});
    }

    handleFailedUpload(err) {
        console.error(err);
        this.setState({ ...this.state, waiting: false })
        this.setState({ ...this.initialState, message: err.message, messageColor: "red" })
    }

    
    render() {
        return (
            <Container style={{ padding: "20px", width: '100%', maxWidth: '100vw' }}>
                <Row>
                    <Col sm={12}><Spinner show={this.state.waiting} size="lg" /></Col>
                    <div style={{ color: this.state.messageColor }}>{this.state.message}</div>
                    <EditPostItem title="Nieuwe post" post={this.state.post} setPost={this.setPost}onSave={() => this.savePost(this.upload)}/>
                </Row>
            </Container>
        )
    }
}

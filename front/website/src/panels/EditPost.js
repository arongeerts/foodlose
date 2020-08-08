import React from 'react';

import client from "../api/client";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from '../components/Spinner/Spinner';
import EditPostItem from '../components/PostItem/EditPostItem';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



export default class CreatePost extends React.Component {
    constructor(props) {
        super(props);

        const emptyPost = {
            post_id: "",
            name: "",
            text: "",
            image: "",
            tags: []
        }

        this.initialState = {
            message: "",
            messageColor: "green",
            waiting: false,
            post: emptyPost,
            postList: []
        };

        this.state = this.initialState;

        this.handleFailedUpload = this.handleFailedUpload.bind(this);
        this.handleSuccessfulUpload = this.handleSuccessfulUpload.bind(this);
        this.savePost = this.savePost.bind(this);
        this.setPost = this.setPost.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.loadPosts = this.loadPosts.bind(this);
    }

    savePost(upload) {
        this.setState({ ...this.state, waiting: true })
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

        var upload = function (post_id, name, text, tags, img_data, timestamp) {
            return client.uploadPost(post_id, name, text, tags, img_data, timestamp)
        }

        const callback = (img_data) => upload(this.state.post.post_id,
            this.state.post.name,
            this.state.post.text,
            this.state.post.tags,
            img_data,
            this.state.post.timestamp)
            .then(this.handleSuccessfulUpload)
            .catch(this.handleFailedUpload)

        if (this.state.post.image) {
            convertToBase64(this.state.post.image, 'image/jpeg', callback)
        } else {
            callback(null)
        }
    }

    componentDidMount() {
        this.loadPosts()
    }

    loadPosts() {
        client.getPosts()
            .then(data => this.setState({ ...this.state, postList: data, messageColor: "green", message: "" }))
            .catch(response => {
                console.error(response);
                this.setState({ ...this.state, messageColor: "red", message: "Kon posts niet ophalen, probeer het later opnieuw" })
            })
    }

    handleSearchChange(event, newValue) {
        this.setState({...this.state, waiting: true})
        if (newValue.post_id) {
            client.getPostDetails(newValue.post_id)
                .then(data => this.setState({ ...this.state, waiting: false, post: data }))
                .catch(response => console.error(response))
        }
    }

    setPost(post) {
        this.setState({ ...this.state, post: post })
    }

    handleSuccessfulUpload(response) {
        this.setState({ ...this.state, waiting: false })
        this.setState({ ...this.initialState, postList: this.state.postList, message: "Opgeslagen", post: { name: "", text: "", tags: [], image: "" } });
        this.loadPosts()
    }

    handleFailedUpload(err) {
        console.error(err);
        this.setState({ ...this.state, waiting: false })
        this.setState({ ...this.initialState, message: err.message, messageColor: "red" })
    }


    render() {
        return (
            <Container style={{ padding: "20px", width: '100%', maxWidth: '100vw' }}>
                <Col>
                <Row>
                    <Autocomplete
                        id="postSearch"
                        value={this.state.post}
                        onChange={this.handleSearchChange}
                        options={this.state.postList}
                        getOptionLabel={(p) => p.name}
                        style={{ width: "100%", marginLeft: "30px", marginRight: "30px", marginBottom: "10px" }}
                        renderInput={(params) => <TextField {...params} label="Post:" variant="outlined" />}
                    />
                </Row>
                <Row>
                    <Col sm={12}><Spinner show={this.state.waiting} size="lg" /></Col>
                    <div style={{ color: this.state.messageColor }}>{this.state.message}</div>
                    
                </Row>
                </Col>
                <Col>
                    <EditPostItem title="Post bewerken" post={this.state.post} setPost={this.setPost} onSave={() => this.savePost(this.upload)} />
                </Col>
            </Container>
        )
    }
}

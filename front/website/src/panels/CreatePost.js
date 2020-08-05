import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import client from "../api/client";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostItem from '../components/PostItem/PostItem';
import Spinner from '../components/Spinner/Spinner';


export default class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        
        this.initialState = {
            name: "",
            text: "",
            message: "",
            messageColor: "green",
            image: "",
            tags: [],
            waiting: false
        };

        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.savePost = this.savePost.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleImageDelete = this.handleImageDelete.bind(this);
        this.handleSuccessfulUpload = this.handleSuccessfulUpload.bind(this);
        this.handleFailedUpload = this.handleFailedUpload.bind(this);
        this.onTagClick = this.onTagClick.bind(this);
    };

    onTagClick(tag) {
        var tags = []
        if (this.state.tags.includes(tag)) {
            var tags = this.state.tags.filter(function (value, index, arr) { return value !== tag; })
        } else {
            var tags = [...this.state.tags, tag]
        }
        this.setState({...this.state, tags: tags})
    }

    handleChange(value) {
        this.setState({...this.state, text: value})
    }

    handleNameChange(event) {
        this.setState({ ...this.state, name: event.target.value })
    }

    savePost() {
        this.setState({...this.state, waiting: true})
        var convertToBase64 = function (url, imagetype, callback) {

            var img = document.createElement('IMG');
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var data = '';

            img.crossOrigin = 'Anonymous'

            img.addEventListener('load', function () {
                console.log('loaded')
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);
                data = canvas.toDataURL(imagetype);
                callback(data);
            }, false)
            
            console.log(url);
            console.log(img.onLoad)
            img.src = url;
            console.log(img)
        };

        var upload = function(name, text, tags, img_data) {

            console.log('post!')
            return client.createPost(name, text, tags, img_data)
                
        }
        convertToBase64(this.state.image, 'image/jpeg', 
            (img_data) => upload(this.state.name, this.state.text, this.state.tags, img_data)
                            .then(this.handleSuccessfulUpload)
                            .catch(this.handleFailedUpload))
    }

    handleSuccessfulUpload(response) {
        console.log(response);
        this.setState({ ...this.state, waiting: false })
        this.setState({ ...this.initialState, message: "Opgeslagen" });
    }

    handleFailedUpload(err) {
        console.error(err);
        this.setState({ ...this.state, waiting: false })
        this.setState({ ...this.initialState, message: err.message, messageColor: "red" })
    }

    handleImageChange(event) {
        this.setState({ ...this.state, image: URL.createObjectURL(event.target.files[0])})

        console.log(this.state.image)
    }

    handleImageDelete(f) {
        this.setState({...this.state, image: ''})
    }

    render() {
        const tags = [
            {
                tag: "breakfast",
                label: "Ontbijt"
            },
            {
                tag: "lunch",
                label: "Lunch"
            },
            {
                tag: "dinner",
                label: "Diner"
            },
            {
                tag: "sweet",
                label: "Zoet"
            },
            {
                tag: "salty",
                label: "Zout"
            },
            {
                tag: "drinks",
                label: "Drank"
            }

        ]
        return (
            <Container style={{marginLeft: '0', marginRight: '0', width: '100%', maxWidth: '100vw'}}>
                <Row>
                    <Col sm={6}>
                        <h1>Nieuwe post</h1>
                        <div style={{ color: this.state.messageColor }}>{this.state.message}</div>
                        <input placeholder="Naam" className="post-name-input" type="text" onChange={this.handleNameChange} />
                        <ReactQuill className="post-text-input" theme="snow" value={this.state.text} onChange={this.handleChange}/>
                        <TagRow tags={tags} onClick={this.onTagClick} activeTags={this.state.tags} />
                        <Row>
                            <Col sm={6}>
                                <FileUpload className="post-button" onChange={this.handleImageChange}/>
                            </Col>
                            <Col sm={6}>
                                <button className="post-button" onClick={this.savePost}>
                                    <label>Opslaan</label>
                                </button>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <h1>Preview</h1>
                        <div className="preview-container">
                            <PostItem name={this.state.name} text={this.state.text} imgUrl={this.state.image} />
                        </div>
                    </Col>
                    <Col sm={12}><Spinner show={this.state.waiting} size="lg" /></Col>
                </Row>
            </Container>
        )
    }
}

const FileUpload = ({ className, onChange }) => (
    <button className={className}>
        <label>
            Afbeelding invoegen
        <input
                style={{ display: "none" }}
                type="file"
                onChange={onChange}
            />
        </label>
    </button>
);


const TagRow = ( { tags, onClick, activeTags } ) => (
    <div className="tag-row">
    {tags.map(t => <Tag key={t.tag} label={t.label} tag={t.tag} active={activeTags.includes(t.tag)} onClick={onClick} />)}
    </div>
)

const Tag = ({label, tag, active, onClick}) => {
    var clazz = 'tag unselected'
    if (active) {
        var clazz = 'tag selected'
    }
    return <div className={clazz} onClick={() => {onClick(tag)}}>{label}</div>
}
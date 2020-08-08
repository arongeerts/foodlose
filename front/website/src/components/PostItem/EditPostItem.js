import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostItem from './PostItem';
import Button from '../Button/Button'


export default class EditPostItem extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            post: props.post,
        };

        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleImageDelete = this.handleImageDelete.bind(this);
        this.onTagClick = this.onTagClick.bind(this);
    };

    onTagClick(tag) {
        var tags = []
        if (this.props.post.tags.includes(tag)) {
            var tags = this.props.post.tags.filter(function (value, index, arr) { return value !== tag; })
        } else {
            var tags = [...this.props.post.tags, tag]
        }
        this.props.post.tags = tags
        this.props.setPost(this.props.post)
    }

    handleChange(value, delta, source, editor) {
        this.props.post.text = value
        this.props.setPost(this.props.post)
    }

    handleNameChange(event) {
        this.props.post.name = event.target.value
        this.props.setPost(this.props.post)
    }

    handleImageChange(event) {
        this.props.post.image = URL.createObjectURL(event.target.files[0])
        this.props.setPost(this.props.post)
    }

    handleImageDelete(f) {
        this.props.post.image = ""
        this.props.setPost(this.props.post)
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
            <>
            <Col lg={6}>
                <h1>{this.props.title}</h1>
                <input placeholder="Naam" className="post-name-input" type="text" value={this.props.post.name} onChange={this.handleNameChange} />
                <ReactQuill className="post-text-input" theme="snow" value={this.props.post.text} onChange={this.handleChange} />
                <TagRow tags={tags} onClick={this.onTagClick} activeTags={this.props.post.tags} />
                <Row>
                    <Col sm={6}>
                        <FileUpload className="post-button" onChange={this.handleImageChange} />
                    </Col>
                    <Col sm={6}>
                        <Button label="Opslaan" onClick={this.props.onSave}/>
                    </Col>
                </Row>
            </Col>
            <Col lg={6}>
                <h1>Preview</h1>
                <div className="preview-container">
                    <PostItem name={this.props.post.name} text={this.props.post.text} imgUrl={this.props.post.image || this.props.post.img_url} />
                </div>
            </Col>
            </>
        )
    }
}

const FileUpload = ({ className, onChange }) => (
    <Button label="Afbeelding invoegen">
        <input
                style={{ display: "none" }}
                type="file"
                onChange={onChange}
            />
    </Button>
);


const TagRow = ({ tags, onClick, activeTags }) => (
    <div className="tag-row">
        {tags.map(t => <Tag key={t.tag} label={t.label} tag={t.tag} active={activeTags.includes(t.tag)} onClick={onClick} />)}
    </div>
)

const Tag = ({ label, tag, active, onClick }) => {
    var clazz = 'tag unselected'
    if (active) {
        var clazz = 'tag selected'
    }
    return <div className={clazz} onClick={() => { onClick(tag) }}>{label}</div>
}
import React from 'react';
import PostItem from '../../components/PostItem/PostItem'
import client from '../../api/client';
import Spinner from '../../components/Spinner/Spinner';
import ReactGA from "react-ga";


export default class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postid: props.match.params.postid,
            loading: true,
            post_info: null
        }
        this.mounted=false
    }

    componentDidMount() {
        client.getPostDetails(this.props.match.params.postid)
            .then(data => this.setState({...this.state, loading: false, post_info: data}))
            .then(() => ReactGA.event({
                action: 'Get Recipe',
                category: this.state.post_info.name
            }))
            .catch(err => console.log(err))
    }


    render() {
        if (this.state.loading) {
            return <Spinner show={this.state.loading} />
        } else {
            return <PostItem name={this.state.post_info.name}
                        text={this.state.post_info.text}
                        imgUrl={this.state.post_info.img_url}
                        tags={this.state.post_info.tags} />
        }
    }
}
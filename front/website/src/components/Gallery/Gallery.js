import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import client from "../../api/client";
import GalleryItem from "./GalleryItem";
import './Gallery.css'
import Spinner from '../../components/Spinner/Spinner';


export default class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        items: [],
        loading: true
    }

    this.load = this.load.bind(this);
  }
  
  componentDidMount() {
    this.load()
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.load()
    }
  }

  load() {
    this.setState({...this.state, loading: true})
    client.getPosts(null, this.props.category || null)
      .then(data => { this.setState({ ...this.state, items: data, loading: false }) })
  }

  render() {
    if (this.state.loading) {
      return <Spinner show={this.state.loading} size="lg" />
    } else if (this.state.items.length === 0) {
      return <div>no posts</div>
    } else {
      return (
      <CardDeck>
        {this.state.items.map(item => <GalleryItem key={item.post_id} postId={item.post_id} imgUrl={item.img_url} name={item.name} />)}
      </CardDeck>
      );
    }
  }
}

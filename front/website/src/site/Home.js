import React from 'react';
import Header from './Header';
import Gallery from './Gallery';
import Welcome from '../components/Welcome'


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.resize = this.resize.bind(this)
    }
    state = { selectedItem: 'Tickets' };

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();

    render() {
        return (
            <Header>
            <Welcome />
            <Gallery />
            </Header>
        );
    }
}

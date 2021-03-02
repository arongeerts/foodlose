import React from 'react';
import Header from './Header';
import Logo from "../../components/Logo/Logo";
import Gallery from '../../components/Gallery/Gallery';
import PageHeader from '../../components/PageHeader/PageHeader';


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
        const header = {
            title: "Welkom",
            text: [
                "Hi! Welkom bij Foodlose, een nieuwe website boordevol inspiratie voor een gezonde levensstijl.",
                "Op zoek naar gezonde recepten ? Dan ben je aan het juiste adres!  Geen keukenprinses, geen probleem!",
                "Granola at your service!"
            ]
        }
        return (
            <Header>
            <Logo width="50%" style={{ marginLeft: "auto", marginRight: "auto", display: "block" }} />
            <PageHeader {...header} />
            <Gallery />
            </Header>
        );
    }
}

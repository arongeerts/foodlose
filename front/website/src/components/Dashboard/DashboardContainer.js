import React from "react"
import "./Dashboard.scss"

export default class DashboardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return <main className="app">
            {this.props.children}
        </main>
    }
}
import React from 'react';
import client from "../api/client"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { UserData } from '../components/UserData/UserData';
import { Graph } from '../components/Graph/Graph';


export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewableUser: null,
            searchUser: "",
            records: [],
            userList: [],
            errorMessage: ""
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.searchUser = this.searchUser.bind(this);
    };

    componentDidMount() {
        client.getUsers()
            .then(data => this.setState({...this.state, userList: data})) 
            .catch(response => console.error(response))
    }

    searchUser() {
        client.getUserInfo(this.state.searchUser.email)
            .then(data => this.setState({...this.state, viewableUser: data}))
            .catch(response => console.error(response))
        client.getUserRecords(this.state.searchUser.email, this.state.start_date, this.state.end_date)
            .then(data => this.setState({...this.state, records: data})) 
            .catch(response => console.error(response))
    }

    handleSearchChange(event, newValue) {
        this.setState({...this.state, searchUser: newValue})
    }

    render() {
        return <div>
            <Autocomplete
                id="userSearch"
                onChange={this.handleSearchChange}
                options={this.state.userList}
                getOptionLabel={(u) => u.first_name + " " + u.last_name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Gebruiker:" variant="outlined" />}
            />
            <button onClick={this.searchUser}>
                Zoek
            </button>
            <UserData user={this.state.viewableUser}/>
            <Graph records={this.state.records}/>
        </div>
    }
}

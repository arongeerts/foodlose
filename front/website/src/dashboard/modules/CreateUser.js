import React from 'react';
import client from "../../api/client"



export default class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            first_name: "",
            last_name: "",
            gender: "M",
            phone: "",
            date_of_birth: "2000-01-01",
            zip_code: "",
            length: "",
            email: "",
            password: "",
            confirm_password: "",
            height: "",
            errorMessage: "",
            successMessage: ""
        }
        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    
    handleChange(event) {
        this.setState({...this.state, [event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.password !== this.state.confirm_password) {
            this.setState({...this.state, errorMessage: "Wachtwoorden komen niet overeen"});
            return;
        } else if (!["M", "V", "X"].includes(this.state.gender)) {
            this.setState({...this.state, errorMessage: "Kies een geldig geslacht"});
            return;
        }
        client.createProfile({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            gender: this.state.gender,
            date_of_birth: this.state.date_of_birth,
            zip_code: this.state.zip_code,
            phone: this.state.phone,
            consent_version: "0.0.0",
            height: parseInt(this.state.height)
        })
          .then(data => this.setState({...this.initialState, 
            successMessage: "Gebruiker " + this.state.first_name + " " + this.state.last_name + " aangemaakt"}));
      }
    
      render() {
        return (
        <div>
          <div style={{color: "green"}}>{this.state.successMessage}</div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Email:
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
            </label>
            <label>
              Voornaam:
              <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
            </label>
            <label>
              Naam:
              <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
            </label>
            <label>
              Geboortedatum:
              <input type="text" name="date_of_birth" value={this.state.date_of_birth} onChange={this.handleChange} />
            </label>
            <label>
              Geslacht:
                <select id="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
                    <option value="M">M</option>
                    <option value="V">V</option>
                    <option value="X">X</option>
                </select>
            </label>
            <label>
              Telefoonnummer:
              <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
            </label>
            <label>
              Wachtwoord:
              <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
            </label>
            <label>
              Wachtwoord bevestigen:
              <input type="text" name="confirm_password" value={this.state.confirm_password} onChange={this.handleChange} />
            </label>
            <label>
              Postcode:
              <input type="text" name="zip_code" value={this.state.zip_code} onChange={this.handleChange} />
            </label>
              <label>
                Grootte (in cm):
              <input type="text" name="height" value={this.state.height} onChange={this.handleChange} />
              </label>
            <input type="submit" value="Submit" />
          </form>
        <div style={{color: "red"}}>{this.state.errorMessage}</div>
          </div>
        );
      }
}

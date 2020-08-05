import React from "react";
import './Contact.css'

export default function Contact(props) {
    return <div>
         <h1 style={{ textAlign: "center", marginBottom: "40px" }}> Contact</h1>

         <h3>Kick off your healthy lifestyle</h3>
         <p>Een nieuwe levensstijl aannemen kost tijd, en is niet altijd even eenvoudig.  Ik ben helemaal klaar om daarbij te helpen.</p>
        <p>Contacteer me <b>via charlotteportael@gmail.com</b> en je hoort snel van mij!</p>
         <p>Probeer intussen zeker al eens een receptje uit.</p></div>
}

// export default class Contact extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             first_name: "",
//             last_name: "",
//             email: "",
//             message: "",
//             resultMessage: "",
//             resultMessageColor: "green"
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleMessageResponse = this.handleMessageResponse.bind(this);
//     }

//     handleChange(event) {
//         this.setState({ ...this.state, [event.target.name]: event.target.value });
//     }

//     handleSubmit(event) {
//         event.preventDefault();
//         client.contactMessage(this.state.first_name, this.state.last_name, this.state.email, this.state.password)
//             .then(data => this.handleMessageResponse(data))
//             .catch(data => this.handleMessageResponse(data))
        
//     }

//     handleMessageResponse(data) {
//         console.log(data)
//         this.setState({...this.state, resultMessage: data.response, resultMessageColor: data.color})
//     }
//     render() {
//         return <div>
//         <h1 style={{ textAlign: "center", marginBottom: "40px" }}> Contact</h1>
        
//         <h3>Kick off your healthy lifestyle</h3>
//         <p>Een nieuwe levensstijl aannemen kost tijd, en is niet altijd even eenvoudig.  Ik ben helemaal klaar om daarbij te helpen.</p>
//         <p>Contacteer me via dit contactformulier en je hoort snel van mij!</p>
//         <p>Probeer intussen zeker al eens een receptje uit.</p>
//         <span style={{color: this.state.resultMessageColor }}>{this.state.resultMessage}</span>
//             <form onSubmit={this.handleSubmit} style={{width: "100%"}}>
//         <label>
//             Voornaam:<br/>
//             <input 
//                 className="contact-field" 
//                 type="text" 
//                 name="first_name" 
//                 value={this.state.first_name} 
//                 onChange={this.handleChange} 
//                 placeholder="Voornaam"/>
//         </label><br />
//         <label>
//             Naam:<br />
//             <input 
//                 className="contact-field" 
//                 type="text" 
//                 name="last_name" 
//                 value={this.state.last_name} 
//                 onChange={this.handleChange} 
//                 placeholder="Naam" />
//         </label><br />
//         <label>
//             Email:<br />
//             <input 
//                 className="contact-field" 
//                 type="text" 
//                 name="email" 
//                 value={this.state.email} 
//                 onChange={this.handleChange} 
//                 placeholder="Email" />
//         </label><br />
//         <label>
//             Bericht:<br />
//             <textarea 
//                 className="contact-field contact-field-large" 
//                 name="message" 
//                 value={this.state.message} 
//                 onChange={this.handleChange} 
//                 placeholder="Bericht" 
//                 rows={5}/>
//         </label><br />
//         <input type="submit" value="Submit" className="submit"/>
//         </form>
//         <div style={{ height: "50px" }}></div>
//     </div>
//     }
// }
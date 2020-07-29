import React from 'react';


export function UserData(props) {

    if (!props.user) {
        return <div>Geen gebruiker geselecteerd</div>
    }
    return <div>
        <div>Naam: {props.user.first_name + " " + props.user.last_name}</div>
        <div>Email: {props.user.email}</div>
        <div>Postcode: {props.user.zip_code}</div>
    </div>
}

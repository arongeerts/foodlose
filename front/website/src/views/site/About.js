import React from "react";
import image from "../../resources/img/about.jpg"

export default function About(props) {
    return <div>
        <h1 style={{textAlign: "center", marginBottom: "40px"}}> About</h1>
        <img src={image} width="50%" 
        style={{display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "40px"}}/>
        <p>Hi!  Ik ben Charlotte Portael, 25 jaar met een enorme passie voor koken en gezonde voeding. </p>
        <p>Naast mijn fantastische job als copywriter volg ik een opleiding tot voedingsadviseur, om mezelf te blijven uitdagen in wat ik graag doe.  Ik sta elke dag in de keuken om nieuwe dingen uit te proberen en deel deze graag met jullie.</p>

        <p>Waarom ‘Foodlose’?  </p>
        <p>Ik hou van eten, en ik denk dat ik niet de enige ben.  Daarom ben ik van mening dat genieten van eten nog steeds het belangrijkste is.  Mijn principe is dat lekkere gezonde voeding en een nieuwe levensstijl de methode zijn om slechte gewoontes af te leren.  Hoe?  Door iets minder en gezonder, maar vooral bewuster te gaan leven en eten.  En als je daarbij die paar extra kilo’s kan verliezen, dan is dat mooi meegenomen.
        (Footloose is overigens een fantastische film en een nummer waar je op moet dansen).</p>

        <p>Ready to kick off your healthy lifestyle?</p>
        <div style={{height: "50px"}}></div>
    </div> 
}
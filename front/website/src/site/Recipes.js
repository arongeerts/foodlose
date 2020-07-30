import React from 'react';

import Gallery from './Gallery';

const titles = {
    drinks: {
        title: "Drank",
        text: ["Het allerbelangrijkste is om voldoende water te drinken, al kan een smaakje ook wel eens lekker zijn.",
        "Deze drankjes zijn gezond, fris en te pimpen naar je eigen voorkeur."]
    },
    sweet: {
        title: "Zoet",
        text: ["Wie houdt er niet van desserts en zoete tussendoortjes?", 
        "Genieten doe je optimaal als ze ook nog eens gezond zijn!"]
    },
    salty: {
        title: "Zout",
        text: ["Aperitieven is het leukste wat er is!", 
        "Deze gezonde snacks en aperitiefhapjes zijn de ideale vervangers voor of aanvullingen van de klassiekers."]
    },
    dinner: {
        title: "Diner",
        text: ["De dag afsluiten doe je liefst in stijl.", 
        "Lichte, voedzame maaltijden zorgen ervoor dat je met een voldaan, maar niet overladen gevoel gaat slapen."]
    },
    lunch: {
        title: "Lunch",
        text: ["Na het ontbijt is de lunch mijn favoriete maaltijd. De mogelijkheden zijn eindeloos.", 
        "Ik geef je alvast wat inspiratie mee."]
    },
    breakfast: {
        title: "Ontbijt",
        text: ["Een goed ontbijt betekent de start van een goede dag.",
        "Zorg dat je bij het ontbijt de juiste voedingsmiddelen binnenkrijgt. Hoe je dat doet? Zo!"]
    }
}

export default function Recipes(props) {
    const category = props.match.params.category;
    var title = "Recepten"
    var text = []
    if (category) {
        title = titles[category].title
        text = titles[category].text
    }
    return <>
        <div className="welcome">
            <h1 className="welcome-header">{title}</h1>
            <p>{text.map(line => <>{line}<br/></>)}</p>
        </div>
        < Gallery category={category} />
    </>
}
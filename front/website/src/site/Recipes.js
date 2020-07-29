import React from 'react';

import Gallery from './Gallery';


export default function Recipes(props) {
    const category = props.match.params.category
    return < Gallery category={category} />
}
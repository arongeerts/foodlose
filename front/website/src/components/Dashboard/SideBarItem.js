import React from 'react';

import { MenuItem } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function SideBarItem(props) {
    
    return <MenuItem icon={<FontAwesomeIcon icon={props.icon} size="lg" />}>
        <div onClick= {() => props.onSelect(props.itemKey)}>{props.children}</div>
    </MenuItem>
}
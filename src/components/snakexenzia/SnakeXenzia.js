import React from "react";

import "./SnakeXenzia.style.scss";

import Field from './Field';
import { CookiesProvider } from "react-cookie";

const componentName = "snake-xenzia";

// eslint-disable-next-line
const componentNameCap = (name) => {
    return name.split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1, word.length))
        .join(' ')
};


export function SnakeXenzia(props) {
    document.title = props.pageTitle;
    return (
        <div className={componentName}>
            <CookiesProvider>
                <Field />
            </CookiesProvider>
        </div>
    )
}


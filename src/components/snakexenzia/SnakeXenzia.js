import React from "react";
import { CookiesProvider } from "react-cookie";

import "./SnakeXenzia.style.scss";
import Field from './Field';


export function SnakeXenzia(props) {
    document.title = props.pageTitle;
    
    return (
        <div className="snake-xenzia">
            <CookiesProvider>
                <Field />
            </CookiesProvider>
        </div>
    )
}


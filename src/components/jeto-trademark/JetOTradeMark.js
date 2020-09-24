import React from 'react';

import './JetOTradeMark.style.scss';
import { USER } from "../VALUES/strings";
import Waves from '../waves';


const getClientName = () => {
    const firstName = USER.firstName.charAt(0).toUpperCase() + USER.firstName.substr(1,);
    const lastName = USER.lastName.charAt(0).toUpperCase() + USER.lastName.substr(1,);
    return `${firstName} ${lastName}`
}

const OWNER_NAME = getClientName();

const JetO_LINKS = {
    instagram: "https://www.instagram.com/jeto.dbl",
    twitter: "https://twitter.com/jeto_dbl",
    github: "https://github.com/jeto-dbl",
}


export const JetOTradeMark = () => {
    return(
        <footer className="trademark">
            <div className="owner-trademark">
                &copy;&nbsp;
                {new Date().getFullYear()}&nbsp;
                {OWNER_NAME}&nbsp;
            </div>
            <div className="jeto-trademark">
                <a 
                    href={JetO_LINKS.instagram} 
                    target="_blank" rel="noopener noreferrer">
                        <span>Powered by</span>
                        <img 
                            className="jeto-logo"
                            src={require('../../assets/logos/JetO512.png')}
                            alt="JetO"
                        />
                </a>
            </div>
            <Waves />
        </footer>
    )
}
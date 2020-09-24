import React from 'react';

import './Contact.style.scss';
import { CONTACTS, NAME } from '../VALUES/strings';


import JetOTradeMark from '../jeto-trademark';


const SocialHandles = () => {
    return CONTACTS.map((handle) => {
        const iconColor = {color: handle.color};
        return handle.link && (
                <a 
                    key={handle.text}
                    href={handle.link}
                    title={handle.type}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="handle"
                >
                    <div className="handle-icon">
                        <i 
                            className={handle.logoCircle || handle.logoPlain}
                            style={iconColor}>
                        </i>
                    </div>
                    <div className="handle-text" style={iconColor}>{handle.text}</div>
                </a>
        )
    })
}


export const Contact = (props) => {

    const ContactComponent = () => {
        return(
            <section id={NAME.contacts} className="contact">
                <div className="social-handles grid-container">
                    <SocialHandles />
                </div>
                <JetOTradeMark />
            </section>
        )
    }

    return(
        <ContactComponent />
    )

}
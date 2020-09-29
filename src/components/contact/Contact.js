import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Contact.style.scss';
import { CONTACTS, NAME } from '../VALUES/strings';
import JetOTradeMark from '../jeto-trademark';


const SocialHandles = () => {
    return CONTACTS.map((handle) => {
        return handle.link && (
                <a 
                    key={handle.text}
                    href={handle.link}
                    title={handle.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="handle">
                        <div className="handle-icon">
                            <FontAwesomeIcon 
                                icon={[handle.prefix, handle.logoCircle || handle.logoPlain]}
                                style={{color: handle.color}}
                                className="fa-icon"
                                />
                            {/* <i 
                                className={`${handle.prefix} fa-${handle.logoCircle || handle.logoPlain} fa-icon`}
                                style={{color: handle.color}}>
                            </i> */}
                        </div>
                        <div className="handle-text" style={{color: handle.color}}>{handle.text}</div>
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
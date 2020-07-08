import React from 'react'

import './ContactMe.style.scss'


const socialAccts = [
    {
        href:"mailto:oyegbitejohn@gmail.com",
        type:"envelope",
        mode:"fas",
    },
    {
        type:"instagram",
        href:"https://www.instagram.com/johnoyegbite/",
        mode:"fab",
    },
    {
        type:"facebook-f",
        href:"https://web.facebook.com/johnoyegbite",
        mode:"fab",
},
    {
        type:"twitter",
        href:"https://twitter.com/johnoyegbite",
        mode:"fab",
    },
]

const SocialLink = ({ href, mode, type }) => {
    return(
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer">
            <span className={`fa-stack fa-lg ${type}`}>
                <i className="far fa-circle fa-stack-2x"></i>
                <i className={`${mode} fa-${type} fa-stack-1x`}></i>
            </span>
        </a>
    )
}

const ListSocialHandle = () => {
    const socialHandles = socialAccts.map((handle, idx) => {
        return (
            <SocialLink
                key={handle.type}
                href={handle.href}
                mode={handle.mode}
                type={handle.type}
            />
        )
    })
    return socialHandles
}


export function ContactMe(params) {
    return(
        <section id="contact" className="contact-me">
            <div className="contact-details">
                <div className="details">
                    <p>
                        <a
                            href="tel:+2348090565698"
                            target="_blank"
                            rel="noopener noreferrer">
                            <i className="fas fa-phone fa-icon"></i>
                            <span className="contact-text">(234)-809-056-5698</span>
                        </a>
                    </p>
                </div>
                <p className="social-acct">
                    <ListSocialHandle />
                </p>
                <h1 className="contact-title">
                    <a
                        href="https://www.linkedin.com/in/john-oyegbite-67bb9913a/"
                        target="_blank"
                        rel="noopener noreferrer">
                    John Oyegbite
                    </a>
                </h1>
            </div>
        </section>
    )
}
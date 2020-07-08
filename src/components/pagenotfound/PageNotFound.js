import React from 'react'
import { Link } from 'react-router-dom'

import './PageNotFound.style.scss'


const errors = [
    "We cannot find the page you are looking for.",
    "It might have been removed, had its name changed, or is temporarily unavailable.",
    "Please check that the Web site address is spelled correctly.",
]

const errorList = errors.map((error, idx) => {
    return (
        <li key={idx}>{error}</li>
    );
})



export function PageNotFound({pageTitle}) {
    document.title = pageTitle;
    return (
        <div className="error-page">
            <div className="error">
                <h1>JetO is Sorry!</h1>
                <h1>404 - The page cannot be found</h1>
            </div>
            <div className="error-list">
                <ul>
                    {errorList}
                    <li>
                        Or go to our 
                        <Link to="/home"> home page</Link>,
                        and use the menus to navigate to a specific section.
                    </li>
                </ul>
            </div>
        </div>
    );
}
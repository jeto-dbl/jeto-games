import React from 'react'
import './DisplayDevelopment.style.scss';


export function DisplayDevelopment({ isLogo }) {
    // eslint-disable-next-line
    const [pageName, setPageName] = React.useState("Current");

    if (isLogo){
        return (
            <div className="loader-container">
                <i className="fa fa-spinner fa-spin spinner"></i>
            </div>
        )
    } 
    else
    return (
        <div className="display-development">
            <div className="update-text">
                {pageName} Page in Development
            </div>
            <div className="loader-container">
                <svg className="loader" width="51px" height="50px" viewBox="0 0 51 50">

                    <rect y="0" width="13" height="50" fill="#FFD5AF">
                        <animate attributeName="height" values="50;10;50" begin="0s" dur="1s" repeatCount="indefinite" />
                        <animate attributeName="y" values="0;20;0" begin="0s" dur="1s" repeatCount="indefinite" />
                    </rect>

                    <rect x="19" y="0" width="13" height="50" fill="#BF40B4">
                        <animate attributeName="height" values="50;10;50" begin="0.2s" dur="1s" repeatCount="indefinite" />
                        <animate attributeName="y" values="0;20;0" begin="0.2s" dur="1s" repeatCount="indefinite" />
                    </rect>

                    <rect x="38" y="0" width="13" height="50" fill="#FFD5AF">
                        <animate attributeName="height" values="50;10;50" begin="0.4s" dur="1s" repeatCount="indefinite" />
                        <animate attributeName="y" values="0;20;0" begin="0.4s" dur="1s" repeatCount="indefinite" />
                    </rect>

                </svg>
            </div>
        </div>
    )
}

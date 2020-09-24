import React from 'react';
import './Waves.style.scss';

import { COLORS } from "../VALUES/colors";

export const Waves = () => {
    return(
        <svg 
            className="waves" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 25 10 22" 
            preserveAspectRatio="none" 
            shapeRendering="auto">
                <defs>
                    <path 
                        id="gentle-wave" 
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" 
                    />
                </defs>
                <g className="parallax">
                    <use 
                        xlinkHref="#gentle-wave" 
                        x="48" 
                        y="0" 
                        fill={COLORS.siteColor1RGBA}
                    />
                    <use 
                        xlinkHref="#gentle-wave" 
                        x="48" 
                        y="3" 
                        fill={COLORS.siteColor2RGBA}
                    />
                    {/* <use 
                        xlinkHref="#gentle-wave" 
                        x="48" 
                        y="5" 
                        fill={COLORS.siteColor1RGBA}
                    />
                    <use 
                        xlinkHref="#gentle-wave" 
                        x="48" 
                        y="7" 
                        fill={COLORS.siteColor2RGBA}
                    /> */}
                </g>
        </svg>
    )
}
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './ScrollButton.style.scss';
import { DURATIONS, DIMENS_INT } from '../VALUES/dimens';


window.requestAnimationFrame = window.requestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame || function(f){return setTimeout(f, 1000/60)};

// eslint-disable-next-line
const scrollToTopMethod = () => {
    // For Chrome, Firefox, IE and Opera || Safari
    // for slower motion of the scrolling, increase the 'slowNumber'.
    // The bigger the number - the smoother/slower the scrolling.
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    const slowNumber = 12;
    let xpos = 0;
    if (c > 0) {
        let ypos = c - c / slowNumber;
        window.requestAnimationFrame(scrollToTopMethod);
        window.scrollTo(xpos, ypos);
    }
}
  
const scrollToTop = () => {
    // Method 1
    // window.scrollTo({ top: 0-DIMENS_INT.barrierHeight, behavior: 'smooth' });  // OR
    window.scroll({
        top: 0 - DIMENS_INT.barrierHeight,
        left: 0,
        behavior: "smooth"
      });  

    // Method 2
    // scrollToTopMethod();
}


export const ScrollButton = (props) => {
    const [display, setDisplay] = React.useState(false);

    const updateScrollDisplay = () => {
        const WINDOW_HEIGHT = window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight;
        const FACTOR = 2;
        const DEFINED_HEIGHT = WINDOW_HEIGHT * FACTOR;
        if (document.body.scrollTop > DEFINED_HEIGHT || document.documentElement.scrollTop > DEFINED_HEIGHT) {
            setDisplay(true);
        } else {
            setDisplay(false);
        }
    }

    React.useEffect(() => {
        window.addEventListener('scroll', updateScrollDisplay);
        
        // Remove event listener on cleanup
        return () => {
            window.removeEventListener("scroll", updateScrollDisplay);
        };
    }, []);


    const SVG_DIM = DIMENS_INT.scrollButtonDim;  // width x height = 48 x 48px
    const POINT_1 = 0.3 * SVG_DIM;
    const POINT_2 = SVG_DIM - POINT_1;
    return (
        <CSSTransition 
            in={display}
            timeout={DURATIONS.scrollButtonTransitionDuration}
            classNames="fade"
            unmountOnExit>
                <div
                    onClick={scrollToTop}
                    title="Scroll To Top"
                    className="scroll-button">
                        <svg className="angle-up">
                            <path 
                                d={`M${POINT_1} ${POINT_2} L${SVG_DIM/2} ${POINT_1} L${POINT_2} ${POINT_2}`}
                            />
                        </svg>
                </div>
        </CSSTransition>
    )

}
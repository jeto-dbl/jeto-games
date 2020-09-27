import React from 'react';
import { 
    browserBreadth, 
    browserHeight, 
    browserWidth 
} from '../snakexenzia/Util';
import { DIMENS_INT } from '../VALUES/dimens';

import './PlayerGuide.style.scss';


const guides = {
    mobile: [
        {
            header: "Player's Guide",
            paragraphs: [
                `Use the Pad provided at the bottom (if phone is in portrait mode) 
                 or at the right (if phone is in Landscape mode) to direct the snake`,
                "Double click the game area to pause/resume game",
                `Use the Pad provided at the bottom (if phone is in portrait mode) 
                 or at the right (if phone is in Landscape mode) to direct the snake`,
                `Use the Pad provided at the bottom (if phone is in portrait mode) 
                 or at the right (if phone is in Landscape mode) to direct the snake`,
                "Double click the game area to pause/resume game",
                `Use the Pad provided at the bottom (if phone is in portrait mode) 
                 or at the right (if phone is in Landscape mode) to direct the snake`,
                `Use the Pad provided at the bottom (if phone is in portrait mode) 
                 or at the right (if phone is in Landscape mode) to direct the snake`,
            ]
        },
        {
            header: "Test Run",
            paragraphs: [
                `Use the Pad provided at the bottom (if phone is in portrait mode) 
                 or at the right (if phone is in Landscape mode) to direct the snake`,
                "Double click the game area to pause/resume game",            
            ]
        },
        {
            header: "Instruction",
            paragraphs: [
                `Use the Pad provided at the bottom (if phone is in portrait mode) 
                 or at the right (if phone is in Landscape mode) to direct the snake`,
                "Double click the game area to pause/resume game",            
                `Use the Pad provided at the bottom (if phone is in portrait mode) 
                 or at the right (if phone is in Landscape mode) to direct the snake`,
                "Double click the game area to pause/resume game",           
            ]
        },
    ],
    desktop: [
        "Use the 'Arrow keys' [up, right, down, left] to direct the snake",
        "Tap the 'Space Bar' key to pause or resume game",
        "Tap the 'Enter' key to replay game",
    ]

}

const GuideLists = ({ paragraphs }) => {
    return paragraphs.map((list, idx) => {
        return(
            <li key={idx}>
                <div className="marker"></div>
                <p className="content">{list}.</p>
            </li>
        )
    })
}

const DisplayPlayerGuides = ({ activeIndex }) => {
    return guides.mobile.map((guide, idx) => {
        const currIndex = idx + 1;  // Don't use zero indexing!
        const currStyle = {display: activeIndex === currIndex ? "block" : "none"};
        const activeClass = activeIndex === currIndex ? "fade-in-guide" : "";
        return(
            <div 
                className={`guide ${activeClass}`} 
                style={currStyle}
                key={guide.header}>
                    <header className="guide-header">
                        {guide.header}
                    </header>
                    <ul className="guide-body">
                        <GuideLists 
                            paragraphs={guide.paragraphs}
                        />
                    </ul>
            </div>
        )
    })
}

const DisplayDots = ({ activeIndex, showSlides }) => {
    return guides.mobile.map((guide, idx) => {
        const currIndex = idx + 1;  // Don't use zero indexing!
        const currStyle = {backgroundColor: activeIndex === currIndex ? "#717171" : "#bbb"};
        return(
            <span
                style={currStyle}
                onClick={() => showSlides(currIndex)} 
                className="dot"
                key={currIndex}></span>
        )
    })
}


export const PlayerGuide = (props) => {
    const isGuideCancelled = props.isGuideCancelled;
    const cancelPlayerGuide = props.cancelPlayerGuide;
    const isGuideDeleted = props.isGuideDeleted;
    const deletePlayerGuide = props.deletePlayerGuide;
    const rotateX = props.rotateX;

    const noOfSlides = guides.mobile.length;
    // const [isGuideCancelled, setCancelGuide] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(1);

    // const cancelPlayerGuide = (cancel) => {
    //     setCancelGuide(cancel);
    // }


    const plusSlides = (index) => {
        const newIndex = activeIndex + index;
        showSlides(newIndex);
    }

    const showSlides = (index) => {
        setActiveIndex((prevIndex) => {
            if(index < 1 || index > noOfSlides){
                return prevIndex;
            }
            return index;
        });
    }

    const disableButton = {
        // Disable the previous button if we are at the first slide
        prev: activeIndex === 1 ? true : false,
        // Disable the last next button if we are at the last slide
        next: activeIndex === noOfSlides ? true : false,
    }

    const shrinkAnimationClass = isGuideCancelled ? "shrink-animation" : "";
    // eslint-disable-next-line
    const fadeOutAnimationClass = isGuideCancelled ? "fade-out-modal-animation" : "";


    const rotateStyle = {
        transform: `rotateX(${rotateX}deg) translateY(-${rotateX*2}px)`,
    };

    const longerDimension = Math.max(browserWidth(), browserHeight());

    const guideWidth = {
        width: longerDimension === browserHeight() ? browserBreadth() - DIMENS_INT.fieldMargin : "480px",
    }


    return(
        <>
            {
                !isGuideDeleted && (
                    <div className={`player-guide-modal ${shrinkAnimationClass}`} style={rotateStyle}>
                        <div className={`player-guide ${shrinkAnimationClass}`} style={guideWidth}>

                            <button
                                className={`prev ${disableButton.prev && "disable-button"}`}
                                disabled={disableButton.prev}
                                onClick={ () => { plusSlides(-1) } }>
                                    &#10094;
                            </button>
                            <button 
                                disabled={disableButton.next}
                                className={`next ${disableButton.next && "disable-button"}`}
                                onClick={ () => { plusSlides(1) } }>
                                    &#10095;
                            </button>

                            {/* Guide (contains the header and body) */}
                            <DisplayPlayerGuides 
                                activeIndex={activeIndex}
                            />

                            <footer className="guide-footer">
                                <button 
                                    onClick={() => deletePlayerGuide(true)}
                                    className="delete">
                                        Don't show again
                                </button>
                                <div className="slide-dots">
                                    <DisplayDots 
                                        activeIndex={activeIndex}
                                        showSlides={showSlides}
                                    />
                                </div>
                                <button 
                                    onClick={() => { cancelPlayerGuide(true) }}
                                    className="cancel-guide">
                                        Cancel
                                </button>
                            </footer>
                        </div>
                    </div>
                )
            }
        </>
    )
}
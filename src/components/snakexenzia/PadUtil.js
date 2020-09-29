import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './SnakeXenzia.style.scss';
import { DIMENS_INT } from '../VALUES/dimens';
import { KEYBOARD_KEYS } from "./Util";


const ChangePadColor = (props) => {
    const padColor = props.padColor;
    const nextPadColor = props.nextPadColor;
    const changePadColor = props.changePadColor;
    const next = 1;
    const current = -1; // current or previous
    return(
        <div className="pad-color-change">
            <div
                className="pad-up"
                onClick={() => changePadColor(next)}
                style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon 
                        icon="caret-up"
                        color={`${nextPadColor}`}
                    />
            </div>
            <div
                className="pad-down"
                onClick={() => changePadColor(current)}
                style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon 
                        icon="caret-down" 
                        color={`${padColor}`}
                    />
            </div>
        </div>
    )
}

const PadBoundary = (props) => {
    const padStyle = props.padStyle;
    const DIMENS = props.DIMENS;
    const ARROW_DIMENS = props.ARROW_DIMENS;
    const arrowIndicatorStyle = props.arrowIndicatorStyle;
    const leftRightArrowStyle = props.leftRightArrowStyle;
    const upDownArrowStyle = props.upDownArrowStyle;
    const onPadDirChange = props.onPadDirChange;
    return(
        <div className="pad-boundary">
            <div className="pad" style={padStyle}>
                <div className="horizontal-dir" style={{marginTop: `${ARROW_DIMENS.negativeShiftDimen}${DIMENS.unit}`}}>
                    <button
                        id="left-arrow"
                        className="arrow"
                        style={leftRightArrowStyle}
                        onClick={() => onPadDirChange(KEYBOARD_KEYS.LEFT)}
                    ><span className="small-arrow-left" style={arrowIndicatorStyle.left}></span></button>
                    <button
                        id="right-arrow"
                        className="arrow"
                        style={leftRightArrowStyle}
                        onClick={() => onPadDirChange(KEYBOARD_KEYS.RIGHT)}
                    ><span className="small-arrow-right" style={arrowIndicatorStyle.right}></span></button>
                </div>
                <div className="vertical-dir" style={{marginLeft: `${ARROW_DIMENS.negativeShiftDimen}${DIMENS.unit}`}}>
                    <button
                        id="up-arrow"
                        className="arrow"
                        style={upDownArrowStyle}
                        onClick={() => onPadDirChange(KEYBOARD_KEYS.UP)}
                    >
                        <span className="small-arrow-up" style={arrowIndicatorStyle.up}>
                            {/* Continue from here */}
                            {/* <b style={{color: "red", fontSize: "18px"}}>{props.padDimen}</b> */}
                        </span>
                    </button>
                    <button
                        id="down-arrow"
                        className="arrow"
                        style={upDownArrowStyle}
                        onClick={() => onPadDirChange(KEYBOARD_KEYS.DOWN)}
                    ><span className="small-arrow-down" style={arrowIndicatorStyle.down}></span></button>
                </div>
            </div>
        </div>
    )
}

const Pad = (props) => {
    const DIMENS = {
        padDimension: props.padDimen - DIMENS_INT.scoreBoardHeight,
        lengthFactor: 0.4,
        breadthFactor: 0.2 + 0.08,
        // The space from border is just to make sure that the arrow indicators are not touching the arrows
        spaceFromPadBorder: 8,
        unit: "px",
    }

    const ARROW_DIMENS = {
        // so as to make the arrows almost touching each other at the curved portion
        truncPadDimens: DIMENS.padDimension - 0.04 * DIMENS.padDimension,
        // Note that double of the length plus the breadth would give the pad dimension
        // (i.e, 2L + B = D)but to make the breadth a little bigger and beautiful, 
        // we increase the breadth factor by 8%
        length: DIMENS.padDimension * DIMENS.lengthFactor,
        breadth: DIMENS.padDimension * DIMENS.breadthFactor,
    }
    // Up and Down arrow are grouped into vertical direction,
    // left and right arrow are grouped into horizontal direction
    // hence after positioning absolutely with a 50% from top or left,
    // we need to centralize it by shifting it back (-ve) by half of the arrow breadth.
    ARROW_DIMENS.negativeShiftDimen = (ARROW_DIMENS.breadth / 2.0) * (-1);
    
    const ARROW_INDICATOR_DIMENS = {
        // NOTE: Arrow indicator thickness should (by preference) be the same as the breadth of the Arrow
        // Arrow indicator thickness consist of double a border width (thickness),
        // but we need the half of this double, so we can with ease, put it to the border props
        // hence we reduce the breadth by half (or 50% => 0.5)
        // Note that you can change the percentage by preference.
        arrowIndicatorThickness: ARROW_DIMENS.breadth * 0.3,
    }
    ARROW_INDICATOR_DIMENS.arrowIndicatorThicknessNeg = ARROW_INDICATOR_DIMENS.arrowIndicatorThickness * (-1);
    ARROW_INDICATOR_DIMENS.doubleArrowIndicatorThicknessNeg = 
        (ARROW_INDICATOR_DIMENS.arrowIndicatorThickness * 2 + DIMENS.spaceFromPadBorder) * (-1);

    const padStyle = { 
        boxShadow: `0px 0px 4px 2px ${props.color}`,
        width: `${ARROW_DIMENS.truncPadDimens}${DIMENS.unit}`,
        height: `${ARROW_DIMENS.truncPadDimens}${DIMENS.unit}`,
    }

    const colorStyle = {
        background: `radial-gradient(#f1f1f1, ${props.color}, ${props.color})`,
        cursor: "pointer",
    }

    // Up and Down arrow are grouped into vertical direction,
    // and dimension would be BREADTH x LENGTH.
    const upDownArrowStyle = {
        width: `${ARROW_DIMENS.breadth}${DIMENS.unit}`,
        height: `${ARROW_DIMENS.length}${DIMENS.unit}`,
        ...colorStyle,
    }
    
    // left and right arrow are grouped into horizontal direction
    // and dimension would be LENGTH x BREADTH
    const leftRightArrowStyle = {
        width: `${ARROW_DIMENS.length}${DIMENS.unit}`,
        height: `${ARROW_DIMENS.breadth}${DIMENS.unit}`,
        ...colorStyle,
    }

    const arrowIndicatorStyle = {
        left: {
            borderWidth: `${ARROW_INDICATOR_DIMENS.arrowIndicatorThickness}${DIMENS.unit}`,
            left: `${ARROW_INDICATOR_DIMENS.doubleArrowIndicatorThicknessNeg}${DIMENS.unit}`,
            marginBottom: `${ARROW_INDICATOR_DIMENS.arrowIndicatorThicknessNeg}${DIMENS.unit}`,
            borderRightWidth: `${ARROW_INDICATOR_DIMENS.arrowIndicatorThickness}${DIMENS.unit}`,
        },
        right: {
            borderWidth: `${ARROW_INDICATOR_DIMENS.arrowIndicatorThickness}${DIMENS.unit}`,
            right: `${ARROW_INDICATOR_DIMENS.doubleArrowIndicatorThicknessNeg}${DIMENS.unit}`,
            marginBottom: `${ARROW_INDICATOR_DIMENS.arrowIndicatorThicknessNeg}${DIMENS.unit}`,
            borderLeftWidth: `${ARROW_INDICATOR_DIMENS.arrowIndicatorThickness}${DIMENS.unit}`,
        },
        up: {
            borderWidth: `${ARROW_INDICATOR_DIMENS.arrowIndicatorThickness}${DIMENS.unit}`,
            top: `${ARROW_INDICATOR_DIMENS.doubleArrowIndicatorThicknessNeg}${DIMENS.unit}`,
            marginLeft: `${ARROW_INDICATOR_DIMENS.arrowIndicatorThicknessNeg}${DIMENS.unit}`,
            borderBottomWidth: `${ARROW_INDICATOR_DIMENS.arrowIndicatorThickness}${DIMENS.unit}`,
        },
        down: {
            borderWidth: `${ARROW_INDICATOR_DIMENS.arrowIndicatorThickness}${DIMENS.unit}`,
            bottom: `${ARROW_INDICATOR_DIMENS.doubleArrowIndicatorThicknessNeg}${DIMENS.unit}`,
            marginLeft: `${ARROW_INDICATOR_DIMENS.arrowIndicatorThicknessNeg}${DIMENS.unit}`,
            borderTopWidth: `${ARROW_INDICATOR_DIMENS.arrowIndicatorThickness}${DIMENS.unit}`,
        },
    }


    return (
        <PadBoundary 
            padStyle={padStyle}
            DIMENS={DIMENS}
            ARROW_DIMENS={ARROW_DIMENS}
            arrowIndicatorStyle={arrowIndicatorStyle}
            leftRightArrowStyle={leftRightArrowStyle}
            upDownArrowStyle={upDownArrowStyle}
            onPadDirChange={props.onPadDirChange}
        />
    )
}


export {
    ChangePadColor,
    Pad,
}
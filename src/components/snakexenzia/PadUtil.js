import React from 'react'

import './SnakeXenzia.style.scss'
import { directions } from "./Util";


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
                style={{ cursor: "pointer" }}
                >
                <i
                    className="fa fa-caret-up"
                    style={{ color: `${nextPadColor}` }}></i>
            </div>
            <div
                className="pad-down"
                onClick={() => changePadColor(current)}
                style={{ cursor: "pointer" }}
                >
                <i
                    className="fa fa-caret-down"
                    style={{ color: `${padColor}` }}></i>
            </div>
        </div>
    )
}

const Pad = (props) => {
    const colorStyle = {
        background: `radial-gradient(#f1f1f1, ${props.color}, ${props.color})`,
        cursor: "pointer",
    }
    return (
        <div className="pad-boundary">
            <div className="pad" style={{ boxShadow: `0px 0px 4px 2px ${props.color}` }}>
                <div className="horizontal-dir">
                    <button
                        id="left-arrow"
                        className="arrow"
                        style={colorStyle}
                        onClick={() => props.onPadDirChange(directions.LEFT)}
                    ><span className="small-arrow-left"></span></button>
                    <button
                        id="right-arrow"
                        className="arrow"
                        style={colorStyle}
                        onClick={() => props.onPadDirChange(directions.RIGHT)}
                    ><span className="small-arrow-right"></span></button>
                </div>
                <div className="vertical-dir">
                    <button
                        id="up-arrow"
                        className="arrow"
                        style={colorStyle}
                        onClick={() => props.onPadDirChange(directions.UP)}
                    ><span className="small-arrow-up"></span></button>
                    <button
                        id="down-arrow"
                        className="arrow"
                        style={colorStyle}
                        onClick={() => props.onPadDirChange(directions.DOWN)}
                    ><span className="small-arrow-down"></span></button>
                </div>
            </div>
        </div>
    )
}


export {
    ChangePadColor,
    Pad,
}
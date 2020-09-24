import React from 'react'

import './SnakeXenzia.style.scss'
import { BOX_TYPE } from './Util'

// eslint-disable-next-line
const Food3D = (props) => {
    return(
        <div 
            className={props.hasBonus ? "snake-food-3d" : "snake-food-3d"}
            style={props.style}>
                <div className="side top"></div>
                <div className="side left">
                    {/* {props.numFoodEaten} */}
                </div>
                <div className="side front"></div>
        </div>
    )
}

const Food2D = (props) => {
    return(
        <div 
            className={props.hasBonus ? "snake-food-bonus" : "snake-food"}
            style={props.style}>
            {/* {props.numFoodEaten} */}
        </div>
    )
}


export default function Food(props) {
    const x = props.food[0];
    const y = props.food[1];
    const style = {
        top: `${y}${BOX_TYPE}`,
        left: `${x}${BOX_TYPE}`,
    }
    return(
        <Food2D 
            hasBonus={props.hasBonus}
            style={style}
            numFoodEaten={props.numFoodEaten}
        />
    )
}
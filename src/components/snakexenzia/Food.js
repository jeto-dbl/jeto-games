import React from 'react'

import './SnakeXenzia.style.scss'
import { BOX_TYPE } from './Util'

export default function Food(props) {
    const x = props.food[0];
    const y = props.food[1];
    const style = {
        left: `${x}${BOX_TYPE}`,
        top: `${y}${BOX_TYPE}`,
    }
    return(
        <div 
            className={props.isBonus ? "snake-food-bonus" : "snake-food"}
            style={style}>
            {props.numFoodEaten}
        </div>
    )
}
import React from 'react';

import './SnakeXenzia.style.scss';
import { BOX_TYPE, BOX_SIZE_INC } from './Util';


const DisplaySnake = (props) => {
    // if vibrate is true then the snake meets the field boundary
    // or it collides with itself, hence add the vibrate class.
    const vibrate = props.vibrate ? "vibrate" : "";
    let eatClass = props.eat ? "eat-animate" : "";
    return props.snake.map((box, idx, array) => {
        const x = box[0];
        const y = box[1];
        const style = { 
            top: `${y}${BOX_TYPE}`, 
            left: `${x}${BOX_TYPE}`,
            backgroundColor: `${props.snakeColor}`,
        }
        let eat = '';
        if(idx === array.length - 1){ // Head of Snake.
            style.borderRadius = '50%';
            style.width = `${BOX_SIZE_INC}${BOX_TYPE}`;
            style.height = `${BOX_SIZE_INC}${BOX_TYPE}`;
            style.border = `2px dotted #f1f1f1`;
            eat = eatClass;
        } else { // Other part of Snake.
            style.borderRadius = '40%';
        }
        style.boxShadow = '0px 0px 8px 2px rgba(0, 0, 0, .5)';

        return (
        <div 
            key={idx} 
            style={style} 
            className={`snake-box ${vibrate} ${eat}`}>
            {/* if this box represent head, attach a dot at its center */}
            {
                idx === array.length - 1 ? 
                    <span className="snake-head-dot"></span> : null
            }
            {/* if this box represent tail, attach a dot at its center */}
            {
                idx === 0 ?
                    <span 
                        className="snake-head-dot"
                        style={{width: '20%', height: '20%'}}></span> 
                    : null
            }
        </div>
        )
    })
}


export default function Snake(props) {
    return(
        <div className="snake">
            <DisplaySnake 
                snake={props.snake} 
                vibrate={props.vibrate}
                snakeColor={props.snakeColor}
                eat={props.eat}
                />
        </div>
    )
}
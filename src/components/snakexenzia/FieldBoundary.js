import React from 'react';

import './SnakeXenzia.style.scss'
import Snake from './Snake';
import Food from './Food';


const CountdownBoard = (props) => {
    return(
        props.countdown <= 0 ? "" :
            <div className="game-over-board">
                <div className="game-over">
                    <div className="advise">
                        Feel the Experience on Landscape Mode
                    </div>
                    <div className="countdown">
                        {props.countdown}
                    </div>
                    <div className="level">
                        Level {props.level}
                        <div className="level-left">
                            of {props.FIELD_IMAGES.length-1}
                        </div>
                    </div>
                </div>
            </div>
    )
}

const GameOverBoard = (props) => {
    return(
        !props.gameOver ? "" :
            <div className="game-over-board">
                <div className="game-over">
                    <div className="level" style={{ opacity: '1' }}>
                        Level {props.level}
                    </div>
                    <div className="game-over-title">GAME OVER</div>
                    <button 
                        onClick={props.resetGame} 
                        className="replay-btn"
                        style={{cursor: "pointer"}}
                        >
                        Replay
                    </button>
                </div>
            </div>
    )
}

const BonusLifeBar = (props) => {
    const style = { width: `${props.bonusLife}%` }
    return (
        !props.hasBonus ? "" :
            <div className="bonus-life-bar">
                <div className="progress-cont">
                    <div
                        className="progress-bar"
                        style={style}
                    ></div>
                </div>
            </div>
    )
}

const ScoreBoard = (props) => {
    return (
        <div className="score-board">
            <div className="score-label">Score: </div>
            <div className="score">
                {props.score}
            </div>
        </div>
    )
}


export default function FieldBoundary(props) {
    const level = props.level;
    const FIELD_IMAGES = props.FIELD_IMAGES;
    const countdown = props.countdown;
    const snake = props.snake;
    const snakeColor = props.snakeColor;
    const food = props.food;
    const eat = props.eat;
    const hasBonus = props.hasBonus;
    const bonusLife = props.bonusLife;
    const gameOver = props.gameOver;
    const resetGame = props.resetGame;
    const vibrate = props.vibrate;
    const score = props.score;
    const vibrateClass = vibrate ? "vibrate" : "";

    const WINDOW_WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const WINDOW_HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const FIELD_WIDTH = Math.min(WINDOW_WIDTH, WINDOW_HEIGHT) - 10;
    const style = {width: `${FIELD_WIDTH}px`, height: `${FIELD_WIDTH}px`};
    return(
        <div className={`field-boundary ${vibrateClass}`} style={style}>
            {/*
                Add all the field images at once so as to create
                smooth transition between fields.
            */}
            {
                FIELD_IMAGES.map((fieldImage, idx, arr) => {
                    const opacity = level === idx ? 1 : 0;
                    return (<div
                                key={idx}
                                className={`field  ${vibrateClass}`}
                                style={{
                                    backgroundImage: `url(${fieldImage})`,
                                    zIndex: arr.length - idx,
                                    opacity: opacity,
                                }}>

                                {/* Display a bonus life bar if there is a bonus food */}
                                <BonusLifeBar
                                    bonusLife={bonusLife}
                                    hasBonus={hasBonus}
                                />
                                {/* Countdown board */}
                                
                                <CountdownBoard 
                                    countdown={countdown}
                                    level={level}
                                    FIELD_IMAGES={FIELD_IMAGES}
                                />

                                {/* Game over board */}
                                <GameOverBoard
                                    gameOver={gameOver}
                                    level={level}
                                    resetGame={resetGame}
                                />

                                <Snake
                                    snake={snake}
                                    vibrate={vibrate}
                                    snakeColor={snakeColor}
                                    eat={eat}
                                />

                                <Food food={food} numFoodEaten={snake.length - 3} isBonus={hasBonus} />
                                
                                <ScoreBoard 
                                    score={score}
                                />
                    </div>)
                })
            }
        </div>
    )
}
import React from 'react';

import './SnakeXenzia.style.scss';
import Snake from './Snake';
import Food from './Food';
import { DIMENS_INT } from "../VALUES/dimens";
import { 
    isMobile,
    browserHeight,
    browserWidth,
    browserBreadth, 
    browserLength, 
    FIELD_PORTION,
} from "./Util";


const CountdownBoard = (props) => {
    return(
        props.countdown > 0 && (
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
                        <div className="level-remaining">
                            of {props.FIELD_IMAGES.length-1}
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

const GameOverBoard = (props) => {
    return(
        props.gameOver && (
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
    )
}

const ResumeGameBoard = (props) => {
    const style = {
        cursor: 'pointer',
        color: '#1C86EE',
        border: '5px solid #00FFFF',
    }
    return (
        props.paused && (
            <div className="game-over-board">
                <div className="game-over">
                    <button
                        onClick={props.resumeGame}
                        className="replay-btn"
                        style={style}>
                        RESUME
                    </button>
                </div>
            </div>
        )
    )
}

const BonusLifeBar = (props) => {
    const style = { width: `${props.bonusLife}%` }
    return (
        props.hasBonus && (
            <div className="bonus-life-bar">
                <div className="progress-cont">
                    <div
                        className="progress-bar"
                        style={style}
                    ></div>
                </div>
            </div>
        )
    )
}

const ScoreBoard = (props) => {
    // margin between the score board and the Field
    const margin = 4;
    // if after adding the scoreBoardWidth to the browserHeight(),
    // and the browserWidth() is the longer dimension the place the scoreBoardWidth
    // at the bottom-right of the field, else place it at the bottom center
    const longerDimension = Math.max(browserWidth(), browserHeight() + DIMENS_INT.scoreBoardWidth + margin);

    const scoreBoardStyle = {
        bottom: longerDimension === browserWidth() ? "0px" : "-28px",
        right: longerDimension === browserWidth() ? `${-DIMENS_INT.scoreBoardWidth - margin}px` : "50%",
        margin: longerDimension === browserWidth() ? "0" : `0px ${-DIMENS_INT.scoreBoardWidth / 2.0}px 0px 0px`,
        minWidth: `${DIMENS_INT.scoreBoardWidth}px`,
    }

    return (
        <div className="score-board" style={scoreBoardStyle}>
            <div className="score-label">Score: </div>
            <div className="score">
                {props.score}
            </div>
        </div>
    )
}


const FieldBoundary = (props) => {
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
    const paused = props.paused;
    const simulateFieldVibrate = props.simulateFieldVibrate;
    const score = props.score;
    const vibrateClass = simulateFieldVibrate ? "vibrate" : "";
    const rotateX = isMobile() ? 0 : props.rotateX; // Only apply for Desktops
    const resumeGame = props.resumeGame;
    const togglePlayPause = props.togglePlayPause;
    const resetGame = props.resetGame;

    const FIELD_MARGIN = DIMENS_INT.fieldMargin;  // space between the field of play and the browser's edge
    const FIELD_WIDTH = Math.min(browserBreadth(), FIELD_PORTION * browserLength()) - FIELD_MARGIN;

    const style = {
        width: `${FIELD_WIDTH}px`, 
        height: `${FIELD_WIDTH}px`,
        transform: `rotateX(${rotateX}deg) translateY(-${rotateX*2}px)`,
    };

    
    return(
        <div className={`field-boundary ${vibrateClass}`} style={style}>
            {/*
                Add all the field images at once so as to create
                smooth transition between fields.
            */}
            {
                FIELD_IMAGES.map((fieldImage, idx, arr) => {
                    const opacity = level === idx ? 1 : 0;
                    return (
                        <div
                            key={idx}
                            className={`field  ${vibrateClass}`}
                            onDoubleClick={togglePlayPause}
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

                                <ResumeGameBoard 
                                    paused={paused}
                                    resumeGame={resumeGame}
                                />

                                <Snake
                                    snake={snake}
                                    simulateFieldVibrate={simulateFieldVibrate}
                                    snakeColor={snakeColor}
                                    eat={eat}
                                />

                                <Food 
                                    food={food} 
                                    numFoodEaten={snake.length - 3} 
                                    hasBonus={hasBonus}
                                />
                                
                                <ScoreBoard 
                                    score={score}
                                />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FieldBoundary;
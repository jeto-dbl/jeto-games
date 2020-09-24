import React from 'react';

import './SnakeXenzia.style.scss'
import { 
    browserBreadth, 
    browserLength, 
    isMobile,
    FIELD_PORTION,
} from "./Util";
import Snake from './Snake';
import Food from './Food';
// eslint-disable-next-line
import PlayerGuide from './PlayerGuide';


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
    return (
        <div className="score-board">
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
    const vibrate = props.vibrate;
    const score = props.score;
    const vibrateClass = vibrate ? "vibrate" : "";
    const rotateX = isMobile ? 0 : props.rotateX; // Only apply for Desktops
    const resumeGame = props.resumeGame;
    const togglePlayPause = props.togglePlayPause;
    const resetGame = props.resetGame;
    // eslint-disable-next-line
    const isGuideCancelled = props.isGuideCancelled
    // eslint-disable-next-line
    const cancelPlayerGuide = props.cancelPlayerGuide
    // eslint-disable-next-line
    const isGuideDeleted = props.isGuideDeleted
    // eslint-disable-next-line
    const deletePlayerGuide = props.deletePlayerGuide 

    const FIELD_MARGIN = 10;  // space between the field of play and the browser's edge
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
                                    vibrate={vibrate}
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
            {/* <PlayerGuide
                isGuideCancelled={isGuideCancelled}
                cancelPlayerGuide={cancelPlayerGuide}
                isGuideDeleted={isGuideDeleted}
                deletePlayerGuide={deletePlayerGuide}
            /> */}
        </div>
    )
}

export default FieldBoundary;
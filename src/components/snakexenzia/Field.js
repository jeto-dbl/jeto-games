import React from 'react';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import './SnakeXenzia.style.scss';
import FieldBoundary from './FieldBoundary';
import { Sound } from './Sound';
import {
    Pad,
    ChangePadColor,
} from './PadUtil';
import { 
    BOX_SIZE, 
    directions, 
    SNAKE_COLORS,
    PAD_COLORS,
    VIBRATE_MILLISECONDS,
    DEFAULT_COUNTDOWN,
    FIELD_IMAGES,
    NORMAL_FOOD_POINT,
    BONUS_FOOD_POINT,
    NEW_LEVEL_FOOD_POINT,
    GAME_START_SPEED,
    LEVEL_RATIO,
    SPEED_RATIO,
    MAX_SPEED,
    UNIT_SPEED,
    COOKIEKEYS,
    isMobile,
    screenMode,
    time,
} from './Util'

let START_DIRECTION = directions.RIGHT;
const SOUND = new Sound();

const generateRandomFood = () => {
    const minCoord = 1;
    // We have to substract the BOX_SIZE to cater
    // for the space that would contain the box size
    const maxCoord = 100 - BOX_SIZE;

    // How many coordinate do we have between minCoord and maxCoord
    const coordDiff = maxCoord - minCoord + 1;

    // Pick a random coord between minCoord and maxCoord
    // You have to add the minCoord so that the coordDiff
    //would be in the range minCoord and maxCoord
    const randomX = Math.random() * coordDiff + minCoord;

    // Make sure the choosen coordinate is divisible,
    // by the BOX_SIZE value.
    const X = Math.floor(randomX / BOX_SIZE) * BOX_SIZE;

    // Repeat the same for Y coordinate
    const randomY = Math.random() * coordDiff + minCoord;
    const Y = Math.floor(randomY / BOX_SIZE) * BOX_SIZE;

    return [X, Y];

}

const isPartOfSnake = (food, snake) => {
    for (let body of snake) {
        if (food[0] === body[0] && food[1] === body[1]) {
            return true;
        }
    }
    return false;
}

const isSnakeOutOfField = (snakeHead) => {
    const X = snakeHead[0];
    const Y = snakeHead[1];
    if (X < 0 || X >= 100 || Y < 0 || Y >= 100) {
        return true
    };
    return false;
}

const isSnakeDead = (snakeHead, snake) => {
    if (isSnakeOutOfField(snakeHead) ||
        isPartOfSnake(snakeHead, snake)) {
        return true
    };
    return false;
}

const getNewSnakeHead = (direction, snakeHead) => {
    switch (direction) {
        case directions.RIGHT:
            // Increase X; Y remains constant.
            snakeHead = [snakeHead[0] + BOX_SIZE, snakeHead[1]];
            break;
        case directions.DOWN:
            // X remains constant; Increse Y.
            snakeHead = [snakeHead[0], snakeHead[1] + BOX_SIZE];
            break;
        case directions.LEFT:
            // Reduce X; Y remains constant.
            snakeHead = [snakeHead[0] - BOX_SIZE, snakeHead[1]];
            break;
        case directions.UP:
            // X remains constant; Reduce Y.
            snakeHead = [snakeHead[0], snakeHead[1] - BOX_SIZE];
            break;
        default:
            break;
    }
    return snakeHead;
}

const generateRandomSnakePos = () => {
    /* Generate the starting three (3) snake boxes at random on the field */
    const snake = [];
    // First generate the tail
    snake.push(generateRandomFood());

    // Now generate the other two (2) boxes relative to the tail.
    let snakeHead = snake[snake.length-1];

    // Assign all possible directions to choose from
    const possibleDir = [
        directions.UP, directions.RIGHT, 
        directions.DOWN, directions.LEFT
    ]

    // Now I have to add one more box to modify the direction in which the 
    // other boxes would move towards to. 
    // Hence SNAKE_LEN is 4 (instead of 3)
    let direction = directions.RIGHT; // To instantiate default direction
    const SNAKE_LEN = 4;
    while(snake.length < SNAKE_LEN) {
        direction = possibleDir[Math.floor(Math.random() * possibleDir.length)];
        snakeHead = getNewSnakeHead(direction, snakeHead);
        if(!isSnakeDead(snakeHead, snake)){
            snake.push([...snakeHead]);
        }
        snakeHead = snake[snake.length - 1];
    }
    // Remove the head that depicts the relative direction
    snake.pop();

    // Set the direction the snake would start with.
    START_DIRECTION = direction;

    return snake;
}

const generateFoodCoordinate = (snake) => {
    let newFood = generateRandomFood();
    let foodAndSnakeBodyIntersect = isPartOfSnake(newFood, snake);
    while (foodAndSnakeBodyIntersect) {
        newFood = generateRandomFood();
        foodAndSnakeBodyIntersect = isPartOfSnake(newFood, snake);
    }
    return newFood;
}

const getSnakeColor = () => {
    return SNAKE_COLORS[Math.floor(Math.random() * SNAKE_COLORS.length)]
}



export class Field extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props){
        super(props);

        this.startingState = {
            level: 1,
            countdown: DEFAULT_COUNTDOWN,
            snake: generateRandomSnakePos(),
            snakeColor: getSnakeColor(),
            direction: START_DIRECTION,
            eat: false,
            hasBonus: false,
            speed: GAME_START_SPEED,
            score: 0,
            highscore: this.getCookie(COOKIEKEYS.highscore, false) || 0,
            numOfFoodEaten: 0,
            gameOver: false,
            paused: false,
            vibrate: false,
            padColorPos: 0,
            fullscreenMode: screenMode.EXPAND,
        }
        
        // Add food to state
        const food = generateFoodCoordinate(this.startingState.snake);
        this.startingState.food = food;

        // Add field image to state depending on the level
        this.startingState.fieldImage = FIELD_IMAGES[this.startingState.level-1];

        // Add padColor to state using the pad color position in array
        this.startingState.padColor = PAD_COLORS[this.startingState.padColorPos];
        this.startingState.nextPadColor = PAD_COLORS[this.startingState.padColorPos + 1];
        
        // Adding 1 since level in state begins at '0' instead of 1.
        this.startingState.currLevelFoods = this.startingState.level * LEVEL_RATIO;
        this.startingState.currLevelSpeed = this.startingState.level * SPEED_RATIO;

        // I added assignedLevelSpeed first before dividing so that
        // we would surely have minimum of 1 food eaten before we can increase
        // the speed.
        // Note: foodForSpeed (total food per speed increase)
        this.startingState.foodForSpeed = Math.floor(
            (this.startingState.currLevelFoods + this.startingState.currLevelSpeed) / this.startingState.currLevelSpeed
        );

        this.startingState.bonusLife = 100; // Unit in Percentage

        

        // if state exist, use it or use the starting state.
        this.state = JSON.parse(this.getCookie(COOKIEKEYS.state, true) || "null") || this.startingState;
        
        // Store the state to be used for resetting game later
        // Also make sure you add all the needed states before this line of code.
        this.defaultState = { ...this.startingState };

        this.preparePlayer = this.preparePlayer.bind(this);
        this.startGame = this.startGame.bind(this);
        this.updateMoveDirection = this.updateMoveDirection.bind(this);
        this.onPadDirChange = this.onPadDirChange.bind(this);
        this.setDirection = this.setDirection.bind(this);
        this.moveSnake = this.moveSnake.bind(this);
        this.increaseScoreBy = this.increaseScoreBy.bind(this);
        this.setNewHighscore = this.setNewHighscore.bind(this);
        this.increaseSnakeSpeedBy = this.increaseSnakeSpeedBy.bind(this);
        this.showFood = this.showFood.bind(this);
        this.checkForBonus = this.checkForBonus.bind(this);
        this.vibrateSnake = this.vibrateSnake.bind(this);
        this.resetState = this.resetState.bind(this);
        this.resetGame =this.resetGame.bind(this);
        this.pauseGame = this.pauseGame.bind(this);
        this.resumeGame = this.resumeGame.bind(this);
        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.changePadColor = this.changePadColor.bind(this);
        this.toogleFullScreen = this.toogleFullScreen.bind(this);
        this.moveToNewLevel = this.moveToNewLevel.bind(this);
    }

    toogleFullScreen(fullScreenMode) {
        if(fullScreenMode === screenMode.EXPAND) {
            // 1. View in fullscreen
            this.openFullscreen();
            // 2. Change the fullscreenMode to compress
            // (this would in turn change the icon automatically)
            this.setState({ fullscreenMode: screenMode.COMPRESS});

        } else { // Screen mode is compress
            // 1. Exit fullscreen
            this.closeFullscreen();
            // 2. Change the fullscreenMode to expand
            // (this would in turn change the icon automatically)
            this.setState({ fullscreenMode: screenMode.EXPAND });
        }
    }

    openFullscreen() {
        const gameScreen = document.documentElement;
        if (gameScreen.requestFullscreen) {
            gameScreen.requestFullscreen();
        } else if (gameScreen.mozRequestFullScreen) { /* Firefox */
            gameScreen.mozRequestFullScreen();
        } else if (gameScreen.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            gameScreen.webkitRequestFullscreen();
        } else if (gameScreen.msRequestFullscreen) { /* IE/Edge */
            gameScreen.msRequestFullscreen();
        }
    }

    closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }

    changePadColor(dir) {
        // dir is 1 or -1, i.e. move forward or backward.
        // the modulo arithmetic make sure the color position (index) 
        // is valid (i.e. 0 <= position < PAD_COLORS.length).
        let newColorPos = (this.state.padColorPos + dir) % PAD_COLORS.length;
        if(newColorPos < 0){
            newColorPos = PAD_COLORS.length - 1;
        }
        this.setState({ padColorPos: newColorPos });
        this.setState({ padColor: PAD_COLORS[this.state.padColorPos]});

        let nextColorPos = (this.state.padColorPos + 1) % PAD_COLORS.length;
        this.setState({ nextPadColor: PAD_COLORS[nextColorPos] });
    }

    getComputerLevel() {
        return this.state.level - 1;
    }

    getRealLevel() {
        return this.state.level;
    }

    resetState() {
        this.setState(this.defaultState);
        this.setState({ speed: GAME_START_SPEED });
        this.setState({ food: generateFoodCoordinate(this.state.snake) });
        this.setState({ snakeColor: getSnakeColor() });
        this.setState({ highscore: this.getCookie(COOKIEKEYS.highscore, false) || 0 });
        this.setCookie(COOKIEKEYS.state, this.state);
    }

    vibrateSnake() {
        this.setState({ vibrate: true });
        // The VIBRATE_MILLISECONDS is the same as the vibrate class in the CSS file
        window.navigator.vibrate(VIBRATE_MILLISECONDS);
    }

    increaseSnakeSpeedBy(millSpeed) {
        // Also ensures that the speed state is always positive
        if ((this.state.speed - millSpeed) >= MAX_SPEED) {
            // The lower the figure, the higher the speed
            this.setState({ speed: this.state.speed - millSpeed });
        }
    }

    increaseScoreBy(digit) {
        const scoreInc = this.state.score + Math.ceil(digit * this.getRealLevel());
        this.setState({ score: scoreInc });
        this.setNewHighscore();
    }

    setCookie(key, value){
        const { cookies } = this.props;
        cookies.set(key, value, { path: '/' });
    }

    getCookie(key, doNotParse) {
        const { cookies } = this.props;
        return cookies.get(key, { doNotParse: doNotParse });
    }

    setNewHighscore() {
        if(this.state.score > this.state.highscore) {
            this.setState({ highscore: this.state.score });
            this.setCookie(COOKIEKEYS.highscore, this.state.score)
        }
    }

    vibratePad() {
        window.navigator.vibrate(100);
    }

    setDirection(direction) {
        const prevDirection = this.state.direction;
        let newDirection = this.state.direction;
        switch (direction) {
            case directions.RIGHT: // Go RIGHT
                // Make sure direction to go makes sense
                if (prevDirection !== directions.LEFT) {
                    newDirection = directions.RIGHT;
                }
                break;
            case directions.DOWN: // Go DOWN
                if (prevDirection !== directions.UP) {
                    newDirection = directions.DOWN;
                }
                break;
            case directions.LEFT: // Go LEFT
                if (prevDirection !== directions.RIGHT) {
                    newDirection = directions.LEFT;
                }
                break;
            case directions.UP: // Go UP
                if (prevDirection !== directions.DOWN) {
                    newDirection = directions.UP;
                }
                break;
            default:
                break;
        }
        // If the Enter key is pressed, replay the game 
        // if and only if the game is over (gameOver is true).
        // Note that Space-Bar should be used for Play and Pause.
        if (direction === directions.REPLAY && this.state.gameOver) {
            this.resetGame();
        }

        // You can also pause or play the game using the space-bar key.
        if(direction === directions.PLAY_PAUSE) {
            this.togglePlayPause();
        }

        // Also, only update direction if game begins
        if(this.state.countdown <= 0){
            this.setState({ direction: newDirection });
        }
    }

    onPadDirChange(direction) {
        this.setDirection(direction);
        this.vibratePad();
    }

    updateMoveDirection(e) {
        e.preventDefault();
        e = e || window.event;
        this.setDirection(e.keyCode);
    }

    moveToNewLevel() {
        this.setState({ snakeColor: getSnakeColor() });
        SOUND.pauseSnakeHiss();
        // this has to be BEFORE you assign the new level
        this.increaseScoreBy(NEW_LEVEL_FOOD_POINT);

        // Assign new level
        this.setState({ level: this.state.level + 1 }); // Increase level

        // Assign total number of food for this level
        this.setState({ currLevelFoods: this.getRealLevel() * LEVEL_RATIO });
        
        // Assign total number of speed for this level
        this.setState({ currLevelSpeed: this.getRealLevel() * SPEED_RATIO });

        this.resetFoodForSpeed();

        // reset countdown
        this.setState({ countdown: DEFAULT_COUNTDOWN });

        this.preparePlayer();
        this.startGame(); // Equivalent to continue game
    }

    setEat(shouldEat) {
        this.setState({ eat: shouldEat });
    }

    moveSnake() {
        this.setEat(false);
        let newSnake = [...this.state.snake];
        let snakeHead = newSnake[newSnake.length - 1];
        SOUND.playSnakeHiss();

        // As the snake moves, always check if it has eaten food
        // So that we can add it to the body part of the snake
        const food = [...this.state.food];
        let snakeHasEatenFood = false;
        if (snakeHead[0] === food[0] && snakeHead[1] === food[1]) {
            snakeHasEatenFood = true;
            this.setEat(true);
        }

        // Store the coordinate of the new head depending on the direction
        // and also the coordinate of an additional new head depending if
        // food has been eaten.
        snakeHead = getNewSnakeHead(this.state.direction, snakeHead);

        // Before you move the snake, also check if the head is within coordinate
        const isDead = isSnakeDead(snakeHead, this.state.snake);
        if (!isDead){
            // Add the new head
            newSnake.push(snakeHead);

            // Note that if the snake has eaten food there is no need
            // to remove the tail. 
            // Hence the tail that was not removed will represent the food eaten.
            if (!snakeHasEatenFood) {
                // Update snake tail by removing the previous snake tail,
                // and also note that the penultimate tail is now the new snake tail.
                newSnake.shift();
            }
        } 

        // This simulate the new snake movement since all the position of
        // the snake body (box) has been updated.
        this.setState({ snake: newSnake });

        // 1. Increase the score since snake has eaten
        // 2. Generate a new food coordinate if snake have eaten the previous one
        // Note: Snake food is either NORMAL or BONUS depending on the current score
        if(snakeHasEatenFood) {
            this.increaseScoreBy(NORMAL_FOOD_POINT);
            
            // Generate the next food
            this.showFood();
            
            // To reduce the total number of food for this level
            // so as to move to a new level.
            this.reduceFoodToEat();

            this.decreaseFoodForSpeed();
            
            // console.log(`${this.state.foodForSpeed} speed food remaining!!!`);
        }
        this.setCookie(COOKIEKEYS.state, JSON.stringify(this.state));
        return isDead;
    }

    decreaseFoodForSpeed() {
        this.setState({ foodForSpeed: this.state.foodForSpeed - 1});
    }

    speedMustIncrease() {
        return this.state.foodForSpeed <= 0;
    }

    increaseSpeed() {
        // Increase snake speed if we have eaten a specific amount of food
        // and also reset the specific amount of food
        this.increaseSnakeSpeedBy(UNIT_SPEED);
        this.resetFoodForSpeed();
        // console.log("New Speed: " + this.state.speed);
        this.startGame();
    }


    resetFoodForSpeed() {
        const assignedLevelFoods = this.getRealLevel() * LEVEL_RATIO;
        const assignedLevelSpeed = this.getRealLevel() * SPEED_RATIO;
        this.setState({ foodForSpeed: Math.floor((assignedLevelFoods + assignedLevelSpeed) / assignedLevelSpeed) });
    }

    reduceFoodToEat() {
        this.setState({ currLevelFoods: this.state.currLevelFoods - 1 });
    }

    foodLevelToEat() {
        return this.state.currLevelFoods;
    }

    checkForBonus() {
        // BONUS food would show up,
        // if currFoodLevels is divisible by 7.
        const bonusConstant = 7;
        if (this.foodLevelToEat() % bonusConstant === 0 && this.foodLevelToEat() !== 0) {
            this.setState({ hasBonus: true });
        } else {
            this.setState({ hasBonus: false })
        }
        return this.state.hasBonus;
    }

    showFood() {
        const foodIsBonus = this.checkForBonus();

        // Show NORMAL or BONUS food.
        this.setState({ food: generateFoodCoordinate(this.state.snake) });

        // if food is BONUS then we have to set a countdown for the
        // BONUS food to disappear if snake hasn't eaten it within a
        // specified period of time and show NORMAL food.
        if(foodIsBonus) {
            this.setState({ food: generateFoodCoordinate(this.state.snake) });
            const milliSecsChecked = time.MILLI_500;
            /*
                // Default is 7 seconds for a speed of 200 (minimum)
                // and 2 seconds for a speed of 0 (maximum)

                 secs       speed
                |--- 7    200 ---|
                |--- x     s  ---|
                |--- 2     0  ---|
                
                => x = (s/200)*5 + 2
                where 1. x is the bonusLife
                      2. s is this.state.speed
            */
            let totalBonusLife = Math.round((this.state.speed*5) / 200) + 2 || 6;
            totalBonusLife = Math.floor((1000 / milliSecsChecked)) * totalBonusLife;
            let currBonusLife = totalBonusLife;

            const prevFoodLevel = this.foodLevelToEat();
            const bonus = setInterval(() => {
                // console.log("Bonus Life: " + currBonusLife);
                // console.log(
                //     `PrevFood: ${prevFoodLevel}; CurrFood: ${this.foodLevelToEat()}`
                // );
                if (prevFoodLevel - this.foodLevelToEat() > 1) {
                    currBonusLife = 0;
                    SOUND.playEatFoodBonus();
                    // console.log(`curr bonus life: ${currBonusLife}`);
                    // console.log(`total bonus life: ${totalBonusLife}`);
                    this.increaseScoreBy((totalBonusLife / totalBonusLife) * BONUS_FOOD_POINT);
                }
                // if BONUS food life is exhausted before eaten the food,
                // remove the BONUS food and generate another food.
                if (currBonusLife === 0) {
                    this.setState({ hasBonus: false });
                    clearInterval(bonus);
                }
                this.setState({ bonusLife: (currBonusLife / totalBonusLife) * 100 });
                currBonusLife -= 1;
            }, milliSecsChecked);
        } else {
            SOUND.playEatFood();
        }
    }

    resetGame() {
        this.resetState();
        this.preparePlayer();
        this.startGame();
    }

    startGame() {
        // console.log(`Level ${this.getComputerLevel()} with ${this.foodLevelToEat()} foods`);
        // console.log(`${this.state.foodForSpeed} foods per speed`);
        const currInterval = setInterval(() => {
            if (this.state.paused) {
                clearInterval(currInterval);
            }
            // Only move snake when the game begins and the game is not paused.
            if (this.state.countdown <= 0 && !this.state.paused) {
                // When you move a snake, it's either the snake hits a boundary,
                // collides with itself for the game to be over.
                const gameOver = this.moveSnake();
                if(gameOver){
                    SOUND.pauseSnakeHiss();
                    SOUND.playGameOver();
                    clearInterval(currInterval);
                    this.setState({ gameOver: true });
                    this.vibrateSnake();
                    return false;
                }

                // Move to new level if current food for this level is
                // finished and,
                //  there is still an image to represent new level
                if(this.foodLevelToEat() <= 0
                    && this.getComputerLevel() < FIELD_IMAGES.length - 1 ){
                        clearInterval(currInterval);
                        this.moveToNewLevel();
                }
                // console.log(`${this.state.currLevelFoods} foods remaining`);
                if(this.speedMustIncrease()) {
                    clearInterval(currInterval);
                    this.increaseSpeed();
                }
            }
        }, this.state.speed);
        return true;
    }

    preparePlayer() {
        SOUND.playAdvanceToLevel();
        // Only change snake color if user don't have a previous game
        if(!this.getCookie(COOKIEKEYS.state, false)){
            this.setState({ snakeColor: getSnakeColor() });
        }
        const countDown = setInterval(() => {
            if(this.state.countdown <= 0) {
                clearInterval(countDown);
            } else {
                this.setState({ countdown: this.state.countdown - 1 });
            }
        }, time.ONE_SECOND);
    }

    pauseGame() {
        SOUND.pauseSnakeHiss();
        this.setState({ paused: true });
        this.setCookie(COOKIEKEYS.state, this.state);
    }

    resumeGame() {
        this.setState({ paused: false });
        this.startGame();
    }

    togglePlayPause() {
        if(this.state.paused) {
            this.resumeGame();
        } else {
            this.pauseGame();
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.updateMoveDirection);
        this.preparePlayer();
        this.startGame();

        // If the user leaves the window tab, Add a fucntion to pause the game
        window.addEventListener("blur", this.pauseGame);
        window.addEventListener("pagehide", this.pauseGame);
    
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.updateMoveDirection);
        window.removeEventListener("blur", this.pauseGame);
        window.removeEventListener("pagehide", this.pauseGame);
    }

    highscoreBoard() {
        const opacity = this.state.gameOver || this.state.paused ? "1" : ".4";
        return (
            <div className="highscore-board" style={{ opacity: opacity }}>
                <div className="score-label">H-Score: </div>
                <div className="score">
                    {this.state.highscore}
                </div>
            </div>
        )
    }

    render() {
        // Remove the default image.
        document.body.style.backgroundImage = "url('')";
        return(
            <div id="game-boundary">

                <div className="fullscreen-highscore">
                    {this.highscoreBoard()}
                    <button className="fullscreen-toggle">
                        <i
                            className={"fa fa-" + this.state.fullscreenMode}
                            onClick={() => this.toogleFullScreen(this.state.fullscreenMode)}
                            ></i>
                    </button>
                </div>

                <FieldBoundary 
                    level={this.getComputerLevel()}
                    FIELD_IMAGES={FIELD_IMAGES}
                    countdown={this.state.countdown}
                    snake={this.state.snake}
                    snakeColor={this.state.snakeColor}
                    food={this.state.food}
                    eat={this.state.eat}
                    hasBonus={this.state.hasBonus}
                    bonusLife={this.state.bonusLife}
                    gameOver={this.state.gameOver}
                    paused={this.state.paused}
                    resumeGame={this.resumeGame}
                    togglePlayPause={this.togglePlayPause}
                    vibrate={this.state.vibrate}
                    resetGame={this.resetGame}
                    score={this.state.score}
                />
                
                {/* 
                    1. If device is mobile, add the pad console
                    2. Change the pad box-shadow, the arrow background and the
                       border-bottom and border-top for pad-up and pad-down color
                */}
                {
                    !isMobile? null:
                        <Pad 
                            onPadDirChange={this.onPadDirChange}
                            color={this.state.padColor}
                        />
                }
                {
                    !isMobile? null:
                        <ChangePadColor
                            padColor={this.state.padColor}
                            nextPadColor={this.state.nextPadColor}
                            changePadColor={this.changePadColor}
                        />
                }
            </div>
        )
    }
}

export default withCookies(Field);
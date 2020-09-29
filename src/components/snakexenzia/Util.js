import { NAME } from "../VALUES/strings";
import { COLORS } from "../VALUES/colors";


const FIELD_IMAGES = [
    require("../../assets/images/snake-fields/1-turf_lawn_green_texture.jpg"),
    require("../../assets/images/snake-fields/2-animal-skin-texture.jpg"),
    require("../../assets/images/snake-fields/3-scales.jpg"),
    require("../../assets/images/snake-fields/4-sea-ocean-monster.png"),
    require("../../assets/images/snake-fields/5-man_under_sea_with_torch.jpg"),
    require("../../assets/images/snake-fields/6-man_under_sea.jpg"),
    require("../../assets/images/snake-fields/7-snake_and_ladder.jpg"),
]

const BOX_SIZE = 4;

const BOX_SIZE_INC = 4.2;

const BOX_TYPE = '%';

const FIELD_DIM = Math.floor(100 / BOX_SIZE);

const TOTAL_FIELD_BOXES = FIELD_DIM * FIELD_DIM;

// Since the snake has 3 boxes at start
// this is also the total food available
const LEFT_FIELD_BOXES = TOTAL_FIELD_BOXES - 3; 

const NUM_OF_LEVELS = FIELD_IMAGES.length;

// Adding the total numbers of levels together 
// Using sum of the first n terms in Arithmetic Progression
// 1 + 2 + 3 + ... + NUM_OF_LEVELS
const TOTAL_RATIO = Math.floor((NUM_OF_LEVELS * (1 + NUM_OF_LEVELS)) / 2.0);

// The additional 1 is to make sure the ratio is at least 1
const MODIFY_FOOD_BY = 1.2; // Change this to 1 for default setting
const LEVEL_RATIO = Math.floor(LEFT_FIELD_BOXES / (TOTAL_RATIO * MODIFY_FOOD_BY)) + 1;


const GAME_START_SPEED = 250; // Milliseconds
// MODIFY_SPEED_BY variable helps to reduce the number of food to eat
// before speed will increase (i.e. food per speed).
const MODIFY_SPEED_BY = .5; // Change this to 1 for default setting
const SPEED_RATIO = Math.floor(
    GAME_START_SPEED / (TOTAL_RATIO * MODIFY_SPEED_BY)
) + 1;

const NORMAL_FOOD_POINT = 4;

const BONUS_FOOD_POINT = 100;

const NEW_LEVEL_FOOD_POINT = 250;

const UNIT_SPEED = 1;

const MAX_SPEED = 0;

const FIELD_PORTION = 0.7; // => 70%
const PAD_PORTION = 1 - FIELD_PORTION - 0.04; // make it 26% instead of 30 to cater for the margin between them

const VIBRATE_MILLISECONDS = 500;

const time = {
    MILLI_20: 20,
    MILLI_200: 200,
    MILLI_500: 500,
    ONE_SECOND: 1000,
    TWO_SECONDS: 2000,
    THREE_SECONDS: 3000,
}

const KEYBOARD_KEYS = {
    //    Key	    Code
    // left-arrow	 37
    // up-arrow	     38
    // right-arrow	 39
    // down-arrow	 40
    // enter         13
    // space-bar     32
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37,
    REPLAY: 13,
    PLAY_PAUSE: 32,
}

const SCREEN_MODE = {
    expand: "expand",
    compress: "compress"
}

const SNAKE_COLORS = [
    'rgb(46,66,66)', '#9F454B',
    '#5C1424', '#936451',
    '#1D1D1D', '#726D5A', '#9C8465', '#9B7655', // King Cobra
    '#333333', '#2F2F2F', // Black Cobra
    '#8AA90E', '#CEC145', '#EFD631', '#F6E96D', // Boas
    '#CD843F', '#FFFFC2', '#D2EC07', '#A8E40A', // AHAETULLA 1
    '#6EAE00', // AHAETULLA 2
    '#160D06', '#805E3F', '#D59D6A', '#2F2313', // RUSSELL’S VIPER
    '#922D23', '#0E1B21', '#A62B17', '#242632', // KINGSNAKES
    '#37432D', '#7E825D', '#BD9D46', '#474A2B', // GREEN ANACONDA
]

const PAD_COLORS = [
    COLORS.siteColor2,
    '#9400D3', '#ecdb33', '#C71585', '#d04242',
    '#F81814', '#40ccd0', '#FF1493', '#3cdb4e',
    '#44126d', '#27baf8', '#432f5b', '#864bad',
    '#fff', '#4b5320', '#191c0b'
]

const gameSounds = {
    snakeHiss: require("../../assets/sounds/snakehiss.mp3"),
    eatFood: require("../../assets/sounds/snake_eat_normal.mp3"),
    eatFoodBonus: require("../../assets/sounds/snake_eat_bonus.mp3"),
    gameOver: require("../../assets/sounds/game_fail_1.mp3"),
    advance: require("../../assets/sounds/advance_1.mp3"),
}

const SOUND_TYPE = {
    playSnakeHiss: "playSnakeHiss",
    pauseSnakeHiss: "pauseSnakeHiss",
    playEatFoodBonus: "playEatFoodBonus",
    playEatFood: "playEatFood",
    playGameOver: "playGameOver",
    playAdvanceToLevel: "playAdvanceToLevel",
}

const DEFAULTS = {
    countdown: 4,
    rotateX: 0,
    highscore: 0,
    allowSnakeThroughWalls: false,
    muteSounds: false,
    muteVibrations: false,
    isGuideCancelled: false,
    isGuideDeleted: false,
    startDirection: KEYBOARD_KEYS.RIGHT,
    vibrateMilliseconds: 500,
}

const COOKIES_KEYS = {
    highscore: "highscore",
    state: "state",
    rotateX: "rotateX",
    allowSnakeThroughWalls: "allowSnakeThroughWalls",
    muteSounds: "muteSounds",
    muteVibrations: "muteVibrations",
    isGuideCancelled: "isGuideCancelled",
    isGuideDeleted: "isGuideDeleted",
    owner: "JetOGames"
}

// eslint-disable-next-line
const COOKIES_STRUCTURE = {
    JetOGames: {
        [NAME.snakeXenzia]: {
            highscore: COOKIES_KEYS.highscore,
            rotateX: COOKIES_KEYS.rotateX,
            isGuideCancelled: COOKIES_KEYS.isGuideCancelled,
            isGuideDeleted: COOKIES_KEYS.isGuideDeleted,
            state: COOKIES_KEYS.state,
        }
    }
}

const setCookie = ({ cookies, gameType, gameKey, gameValue }) => {
    const cookie_owner = COOKIES_KEYS.owner;
    // get the previous cookie if any exists
    const all_games = cookies.get(cookie_owner, { doNotParse: false }) || {};
    const parsed_curr_game = all_games[gameType] || null;
    const games_structure = {
        ...all_games, // retain other games
        [gameType]: {
            ...parsed_curr_game, // retain other properties of current game
            [gameKey]: gameValue, // change the required game property
        }
    };
    // update the cookie
    const curr_date = new Date();
    const noOfyears = 100; // in years
    curr_date.setTime(curr_date.getTime() + (noOfyears * 365 * 24 * 60 * 60 * 1000));
    // eslint-disable-next-line
    const expires = curr_date.toUTCString(); // include the expiring date later
    cookies.set(cookie_owner, games_structure, { path: '/' });
}

const getCookie = ({cookies, gameType, gameKey, doNotParse}) => {
    // See the cookie structure in Util.js
    const cookie_owner = COOKIES_KEYS.owner;
    const all_games = cookies.get(cookie_owner, { doNotParse: false });
    if(!all_games || !all_games[gameType]) { // if we don't have any existing game
        return null;
    }
    const parsed_curr_game = all_games[gameType];
    if(doNotParse) {
        return JSON.stringify(parsed_curr_game[gameKey]);
    }
    return parsed_curr_game[gameKey];
}

const isMobile = () => {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(navigator.userAgent.substr(0, 4))) {
        return true;
    }
    return false;
}

const browserWidth = () => {
    const deviceWidth = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    return deviceWidth;
}

const browserHeight = () => {
    const deviceHeight = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    return deviceHeight;
}

const browserBreadth = () => {
    return Math.min(browserHeight(), browserWidth());
}

const browserLength = () => {
    return Math.max(browserHeight(), browserWidth());
}

const openFullscreen = () => {
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

const closeFullscreen = () => {
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

const joinAsCamelCase = (string, seperators) => {
    // seperators is an array of string seperator
    let newString = string;
    // remove all the seperators and replace them with space
    for(let seperator of seperators) {
        newString = newString.split(seperator).join(" ");
    }

    let newStringArr = newString.split(" ");
    for(let i = 0; i < newStringArr.length; i++) {
        // convert the first letter of each word in newStringArr to uppercase excluding the first word
        if(i > 0) {
            newStringArr[i] = newStringArr[i].charAt(0).toUpperCase() + newStringArr[i].substr(1,);
        }
    }

    return newStringArr.join("");
}

class Node{
    constructor(val){
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class Dll {
    constructor() {
        this.back = new Node(null);
        this.front = new Node(null);
        this.back.next = this.front;
        this.front.prev = this.back;
        this.length = 0;
    }

    insertAtBack(val) {
        const node = new Node(val);
        node.prev = this.back;
        node.next = this.back.next;
        this.back.next.prev = node;
        this.back.next = node;
        this.length += 1;
    }

    removeFromFront() {
        if(this.isEmpty()){
            return null
        }
        const front = this.front.prev;
        front.prev.next = this.front;
        this.front.prev = front.prev;
        this.length -= 1;
        return front.val;
    }

    isEmpty() {
        return this.size() <= 1;
    }

    size() {
        return this.length;
    }
}

class Queue {
    constructor() {
       this.dll = new Dll();
    }
    
    enqueue(val){
        this.dll.insertAtBack(val);
    }
        
    dequeue(){
        const valDeleted = this.dll.removeFromFront();
        return valDeleted;
    }
    
    size(){
        return this.dll.size();
    }

    isEmpty() {
        return this.dll.isEmpty();
    }
}


export {
    DEFAULTS,
    BOX_SIZE,
    BOX_SIZE_INC,
    BOX_TYPE,
    SNAKE_COLORS,
    PAD_COLORS,
    VIBRATE_MILLISECONDS,
    FIELD_IMAGES,
    NORMAL_FOOD_POINT,
    BONUS_FOOD_POINT,
    NEW_LEVEL_FOOD_POINT,
    GAME_START_SPEED,
    UNIT_SPEED,
    MAX_SPEED,
    LEVEL_RATIO,
    SPEED_RATIO,
    SOUND_TYPE,
    COOKIES_KEYS,
    FIELD_PORTION,
    PAD_PORTION,
    KEYBOARD_KEYS,
    SCREEN_MODE,
    time,
    gameSounds,
    isMobile,
    openFullscreen,
    closeFullscreen,
    setCookie,
    getCookie,
    browserHeight,
    browserWidth,
    browserLength,
    browserBreadth,
    joinAsCamelCase,
    Queue,
}
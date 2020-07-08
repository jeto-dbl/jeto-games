import React from "react";
import { Link } from "react-router-dom";

import "./Home.style.scss";
import ContactMe from '../contactme';
import snakeXenziaImg from '../../assests/static/images/snake_xenzia.jpg'


const componentName = "home";
// eslint-disable-next-line
const componentNameCap = (name) => {
    return name.split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1, word.length))
        .join(' ')
};

const allGames = [
    {
        name: "Snake Xenzia",
        src: snakeXenziaImg,
        link: "snake-xenzia"
    },
]


const Games = ({ games }) => {
    const gameList = games.map((game, idx) => {
        return (
            <Link to={"/" + game.link} key={game.name}>
                <figure className="game">
                    <div>
                        <img src={game.src} alt={game.name} />
                        <figcaption className="flex-col">
                            <span>{game.name}<br/></span>
                        </figcaption>
                    </div>
                </figure>
            </Link>
        )
    });
    return gameList;
}

const backgroundImagesUrls = [
    require("../../assests/static/images/home/cool-black-background.jpg"),
    require("../../assests/static/images/home/black_and_cyan_wallpaper.jpg"),
    require("../../assests/static/images/home/Black_And_Red.jpg"),
    require("../../assests/static/images/home/red_and_black_abstract.jpg"),
    require("../../assests/static/images/home/evil_house.jpg"),
    require("../../assests/static/images/home/jugra.jpg"),
]



export function Home({ pageTitle }) {
    document.title = pageTitle;    
    document.body.style.backgroundImage = 
        `url(${backgroundImagesUrls[Math.floor(Math.random() * backgroundImagesUrls.length)]})`;

    return(
        <div className={componentName}>
            <div className="games flex-row">
                <Games games={allGames}/>
            </div>
            <ContactMe />
        </div>
    )
}
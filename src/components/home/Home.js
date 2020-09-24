import React from "react";
import { Link } from "react-router-dom";

import "./Home.style.scss";
import Contact from '../contact';
import { NAME } from "../VALUES/strings";


const allGames = [
    {
        name: "Snake Xenzia",
        src: require('../../assets/images/snake_xenzia.jpg'),
        link: NAME.snakeXenzia
    },
]


const Games = ({ games }) => {
    const gameList = games.map((game) => {
        return (
            <Link to={`/${game.link}`} key={game.name} className="a-game">
                <figure className="game">
                    <img src={game.src} alt={game.name} />
                    <figcaption className="flex-col-center-center">
                        <span>{game.name}</span>
                    </figcaption>
                </figure>
            </Link>
        )
    });
    return gameList;
}

const backgroundImagesUrls = [
    require("../../assets/images/home/cool-black-background.jpg"),
    require("../../assets/images/home/black_and_cyan_wallpaper.jpg"),
    require("../../assets/images/home/Black_And_Red.jpg"),
    require("../../assets/images/home/red_and_black_abstract.jpg"),
    require("../../assets/images/home/evil_house.jpg"),
    require("../../assets/images/home/jugra.jpg"),
]



export function Home({ pageTitle }) {
    document.title = pageTitle;    
    document.body.style.backgroundImage = 
        `url(${backgroundImagesUrls[Math.floor(Math.random() * backgroundImagesUrls.length)]})`;

    return(
        <div className="home">
            <div className="games flex-row-evenly flex-wrap">
                <Games games={allGames}/>
            </div>
            <Contact />
        </div>
    )
}
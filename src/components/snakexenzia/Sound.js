import { gameSounds } from './Util';


class Sound {
    constructor() {
        this.sound = {
            gameOverAudio: new Audio(gameSounds.gameOver),
            snakeHissAudio: new Audio(gameSounds.snakeHiss),
            eatFoodAudio: new Audio(gameSounds.eatFood),
            eatFoodBonusAudio: new Audio(gameSounds.eatFoodBonus),
            advanceAudio: new Audio(gameSounds.advance),
        }
    }

    playGameOver() {
        this.sound.gameOverAudio.play();
    }

    playSnakeHiss() {
        return this.sound.snakeHissAudio.play();
    }

    pauseSnakeHiss() {
        var playPromise = this.playSnakeHiss();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Automatic playback started!
                // Show playing UI.
                // We can now safely pause video...
                this.sound.snakeHissAudio.pause();
            })
            .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
            });
        }
    }

    playEatFood() {
        this.sound.eatFoodAudio.play();
    }

    playEatFoodBonus() {
        this.sound.eatFoodBonusAudio.play();
    }

    playAdvanceToLevel() {
        this.sound.advanceAudio.play();
    }
}

export {
    Sound,
}
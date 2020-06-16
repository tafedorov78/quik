import * as PIXI from 'pixi.js'
import {GameContainer} from "./GameContainer";

class Engine {

    public app:PIXI.Application;

    constructor() {
        this.app = new PIXI.Application({width: 600, height: 600});

        document.body.appendChild(this.app.view);
    }
}

const engine = new Engine()

window.onload = load;


function load() {
    create();
}

function create() {
    const gameContainer = new GameContainer()
    gameContainer.x = engine.app.view.width / 2 - gameContainer.width / 2
    gameContainer.y = 0
    engine.app.stage.addChild(gameContainer);
}



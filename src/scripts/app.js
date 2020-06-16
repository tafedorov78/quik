"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __importStar(require("pixi.js"));
var GameContainer_1 = require("./GameContainer");
var Engine = (function () {
    function Engine() {
        this.app = new PIXI.Application({ width: 600, height: 600 });
        document.body.appendChild(this.app.view);
    }
    return Engine;
}());
var engine = new Engine();
window.onload = load;
function load() {
    create();
}
function create() {
    var gameContainer = new GameContainer_1.GameContainer();
    gameContainer.x = engine.app.view.width / 2 - gameContainer.width / 2;
    gameContainer.y = 0;
    engine.app.stage.addChild(gameContainer);
}
//# sourceMappingURL=app.js.map
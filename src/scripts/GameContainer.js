"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __importStar(require("pixi.js"));
var data = __importStar(require("./data.json"));
var GameContainer = (function (_super) {
    __extends(GameContainer, _super);
    function GameContainer() {
        var _this = _super.call(this) || this;
        _this.shift = 3;
        _this.queueIndex = 0;
        _this.fieldContainer = new PIXI.Graphics();
        _this.currentRow = 0;
        _this.currentColumn = 0;
        _this.timer = null;
        _this.createField();
        _this.getNext();
        return _this;
    }
    GameContainer.prototype.createField = function () {
        var _this = this;
        console.log(data.types);
        var back = new PIXI.Graphics();
        back.beginFill(0xffffff);
        back.drawRect(0, -(this.shift * data.boxSizeV), data.boxSizeH * data.sizeH, data.boxSizeV * (data.sizeV + this.shift));
        back.endFill();
        this.addChild(back);
        this.field = [];
        for (var i = 0; i < data.sizeH; i++) {
            this.field.push([]);
            for (var j = 0; j < data.sizeV + this.shift; j++) {
                this.field[i].push(0);
            }
        }
        this.addChild(this.fieldContainer);
        this.timer = setInterval(function () { return _this.update(); }, 300);
    };
    GameContainer.prototype.update = function () {
        this.dropDown();
    };
    GameContainer.prototype.getNext = function () {
        if (this.queueIndex + 1 > data.queue.length - 1) {
            alert("Lack of the symbols in JSON");
            clearInterval(this.timer);
            return;
        }
        this.queueIndex++;
        this.currentShapeData = data.queue[this.queueIndex];
        this.currentArrData = this.converToArrays(data.types[this.currentShapeData.id][this.currentShapeData.rotation]);
        this.currentColumn = this.currentShapeData.column;
        this.currentRow = 0;
    };
    GameContainer.prototype.dropDown = function () {
        if (this.currentArrData) {
            if (this.checkAbilityToDraw(this.currentRow + 1, this.currentColumn, this.currentArrData)) {
                this.currentRow++;
                if (this.currentArrData) {
                    this.reDraw();
                }
            }
            else {
                this.removeCurrentShape();
                this.drawCurrentShapeOnField();
                this.getNext();
            }
        }
    };
    GameContainer.prototype.checkAbilityToDraw = function (row, column, arrData) {
        if (!this.field) {
            return false;
        }
        for (var i = 0; i < arrData.length; i++) {
            for (var j = 0; j < arrData[i].length; j++) {
                if (arrData[i][j] == 1) {
                    if (row + j > this.field[0].length - 1 || this.field[column + i][row + j] == 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    GameContainer.prototype.drawCurrentShapeOnField = function () {
        if (!this.field || !this.currentArrData) {
            return;
        }
        for (var i = 0; i < this.currentArrData.length; i++) {
            for (var j = 0; j < this.currentArrData[i].length; j++) {
                if (this.currentArrData[i][j] == 1) {
                    this.field[this.currentColumn + i][this.currentRow + j] = 1;
                }
            }
        }
        this.reDrawField();
    };
    GameContainer.prototype.reDrawField = function () {
        if (!this.field) {
            return;
        }
        this.fieldContainer.clear();
        this.fieldContainer.beginFill(0xffeee);
        for (var i = 0; i < this.field.length; i++) {
            for (var j = 0; j < this.field[i].length; j++) {
                if (this.field[i][j] == 1) {
                    this.fieldContainer.drawRect(data.boxSizeH * i, data.boxSizeV * (j - this.shift), data.boxSizeH, data.boxSizeV);
                }
            }
        }
        this.fieldContainer.endFill();
    };
    GameContainer.prototype.drawShape = function (shapeConfig, color) {
        if (color === void 0) { color = 0xff0000; }
        var shape = new PIXI.Container();
        var box;
        for (var i = 0; i < shapeConfig.length; i++) {
            for (var j = 0; j < shapeConfig[i].length; j++) {
                if (shapeConfig[i][j] == 1) {
                    box = this.drawBox(color);
                    box.x = data.boxSizeH * (i + this.currentColumn);
                    box.y = data.boxSizeV * (j + this.currentRow - this.shift);
                    shape.addChild(box);
                }
            }
        }
        this.addChild(shape);
        return shape;
    };
    GameContainer.prototype.reDraw = function () {
        if (this.currentArrData) {
            this.removeCurrentShape();
            this.currentShape = this.drawShape(this.currentArrData);
        }
    };
    GameContainer.prototype.removeCurrentShape = function () {
        if (this.currentShape) {
            this.currentShape.destroy({ children: true });
        }
    };
    GameContainer.prototype.drawBox = function (color) {
        var box = new PIXI.Graphics();
        box.beginFill(color);
        box.drawRect(0, 0, data.boxSizeH, data.boxSizeV);
        box.endFill();
        return box;
    };
    GameContainer.prototype.converToArrays = function (arr) {
        var resArr = [];
        var counter = 0;
        for (var i = 0; i < 3; i++) {
            resArr.push([]);
            for (var j = 0; j < 3; j++) {
                resArr[i].push(arr[counter]);
                counter++;
            }
        }
        return resArr;
    };
    return GameContainer;
}(PIXI.Container));
exports.GameContainer = GameContainer;
//# sourceMappingURL=GameContainer.js.map
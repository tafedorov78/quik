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
var ShapeContainer = (function (_super) {
    __extends(ShapeContainer, _super);
    function ShapeContainer(shapeData, rotation, column) {
        var _this = _super.call(this) || this;
        _this._rotation = 0;
        _this._column = 0;
        _this.rotation = rotation;
        _this.column = column;
        _this.shapeData = shapeData;
        _this.addChild(_this.drawShape());
        return _this;
    }
    ShapeContainer.prototype.drawShape = function () {
        var shape = new PIXI.Container();
        var box;
        for (var i = 0; i < this.shapeData.length; i++) {
            if (this.shapeData[i] == 1) {
                box = this.drawBox();
                var posJ = Math.floor(i / 3);
                var posI = i > 2 ? i - posJ * 3 : i;
                box.x = data.boxSizeH * posI;
                box.y = data.boxSizeV * posJ;
                shape.addChild(box);
            }
        }
        return shape;
    };
    ShapeContainer.prototype.drawBox = function () {
        var box = new PIXI.Graphics();
        box.beginFill(0xff0000);
        box.drawRect(0, 0, data.boxSizeH, data.boxSizeV);
        box.endFill();
        return box;
    };
    Object.defineProperty(ShapeContainer.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        set: function (value) {
            this._rotation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShapeContainer.prototype, "column", {
        get: function () {
            return this._column;
        },
        set: function (value) {
            this._column = value;
        },
        enumerable: true,
        configurable: true
    });
    return ShapeContainer;
}(PIXI.Container));
exports.ShapeContainer = ShapeContainer;
//# sourceMappingURL=ShapeContainer.js.map
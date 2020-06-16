"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FpsMeter = (function () {
    function FpsMeter(render, refreshDelay) {
        if (refreshDelay === void 0) { refreshDelay = 500; }
        this.render = render;
        this.refreshDelay = refreshDelay;
        this.nbFrames = 0;
        this.elapsedTime = 0;
        this.previousTime = performance.now();
    }
    FpsMeter.prototype.updateTime = function () {
        this.elapsedTime = performance.now() - this.previousTime;
    };
    FpsMeter.prototype.tick = function () {
        this.nbFrames++;
        if (this.elapsedTime > this.refreshDelay) {
            this.render();
            this.reset();
        }
    };
    FpsMeter.prototype.reset = function () {
        this.nbFrames = 0;
        this.elapsedTime = 0;
        this.previousTime = performance.now();
    };
    FpsMeter.prototype.getFrameRate = function () {
        return 1000.0 * this.nbFrames / this.elapsedTime;
    };
    return FpsMeter;
}());
exports.FpsMeter = FpsMeter;
//# sourceMappingURL=fps-meter.js.map
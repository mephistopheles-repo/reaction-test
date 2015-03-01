/**
 * Created by denuss on 19.02.2015.
 */
define(function () {
    return function (canvas) {
        this.ctx = null;
        this.canvasH = 0;
        this.canvasW = 0;
        var self = this;
        var lastTime = 0;

        this.mainLoop = null;

        var _run = function () {
            requestAnimationFrame(_run);
            var now = new Date().getTime();
            var dt = now - lastTime;
            lastTime = now;
            self.mainLoop && self.mainLoop.call(self, {dt: dt, lt: now});
        };

        this.run = function () {
            _run();
        };

        var init = function () {
            self.canvasH = canvas.height;
            self.canvasW = canvas.width;
            self.ctx = canvas.getContext('2d');
            self.clear();
        };

        this.clear = function (color) {
            color = color || 'white';
            self.ctx.fillStyle = color;
            self.ctx.fillRect(0, 0, self.canvasW, self.canvasH);
        };

        init();
    }
});
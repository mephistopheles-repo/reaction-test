/**
 * Created by denuss on 21.02.2015.
 */
define(['aabb-util'], function (aabbUtil) {
    var constants = {
        minSX: 5,
        minSY: 5,
        maxSX: 15,
        maxSY: 15,
        updateInterval: 25,
        changeSpeedInterval: 1500
    };

    return function (pos, size, color) {
        this.x = pos.x;
        this.y = pos.y;
        this.w = size.w;
        this.h = size.h;
        this.mx = this.x + this.w;
        this.my = this.y + this.h;
        this.color = color || "white";
        var sx = constants.minSX;
        var sy = constants.minSY;
        var lastTime = 0;
        var changeSpeedTime = 0;

        this.tick = function (time, game) {
            lastTime += time.dt;
            changeSpeedTime += time.dt;

            if (constants.changeSpeedInterval <= changeSpeedTime) {
                sx += (2 + (Math.floor(Math.random() * 10)) % 2) * (sx > 0 ? 1 : -1);
                sy += (2 + (Math.floor(Math.random() * 10)) % 2) * (sy > 0 ? 1 : -1);
                sx = Math.min(sx, constants.maxSX);
                sy = Math.min(sy, constants.maxSY);
                changeSpeedTime = 0;

            }

            if (constants.updateInterval <= lastTime) {
                var x = this.x + sx;
                var y = this.y + sy;
                var mx = x + this.w;
                var my = y + this.h;
                var result;
                if (result = aabbUtil.isInside(game.field, {x: x, y: y, mx: mx, my: my})) {
                    switch (result) {
                        case 1:
                            sx *= -1;
                            break;
                        case 2:
                            sy *= -1;
                            break;
                        case 3:
                            sx *= -1;
                            sy *= -1;
                            break;
                    }

                    x = this.x + sx;
                    y = this.y + sy;
                }

                this.x = x;
                this.y = y;
                this.mx = this.x + this.w;
                this.my = this.y + this.h;

                lastTime = 0;
            }
        };

        this.draw = function (ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.w, this.h);
        };
    }
});
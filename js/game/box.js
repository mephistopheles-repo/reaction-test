/**
 * Created by denuss on 21.02.2015.
 */
define(['aabb-util', 'underscore-min'], function (aabbUtil, _) {
    var constants = {
        minSX: 5,
        minSY: 5,
        maxSX: 15,
        maxSY: 15,
        updateInterval: 25,
        changeSpeedInterval: 1500
    };

    return function (params) {
        _.extend(this, params);
        this.mx = this.x + this.w;
        this.my = this.y + this.h;
        this.color = this.color || "white";
        var sx = constants.minSX * (_.random(0, 1) ? 1 : -1);
        var sy = constants.minSY * (_.random(0, 1) ? 1 : -1);
        var lastTime = 0;
        var changeSpeedTime = 0;

        this.tick = function (time, game) {
            if (!game.isStarted) return;

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

                this.setPos(x, y);

                lastTime = 0;
            }
        };


        this.setPos = function (x, y) {
            this.x = x;
            this.y = y;
            this.mx = this.x + this.w;
            this.my = this.y + this.h;
        };

        this.draw = function (ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.w, this.h);
        };
    }
});
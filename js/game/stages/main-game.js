/**
 * Created by denuss on 28.02.2015.
 */
define(['game/box', 'io-utils', 'game/player-box', 'underscore-min', 'print'], function (Box, IoUtils, Player, _, print) {
    return function (ctxWrapper, events) {
        var self = this;

        ctxWrapper.ctx.canvas.addEventListener('mousemove', function (event) {
            event.preventDefault();

            var mousePos = IoUtils.getMousePos(ctxWrapper.ctx.canvas, event);
            events.trigger("mouseMove", mousePos);
        }, false);

        ctxWrapper.ctx.canvas.addEventListener('mousedown', function (event) {
            event.preventDefault();

            var mousePos = IoUtils.getMousePos(ctxWrapper.ctx.canvas, event);
            events.trigger("mouseDown", mousePos);
        }, false);

        ctxWrapper.ctx.canvas.addEventListener('mouseup', function (event) {
            event.preventDefault();

            var mousePos = IoUtils.getMousePos(ctxWrapper.ctx.canvas, event);
            events.trigger("mouseUp", mousePos);
        }, false);

        var boxes = [];
        boxes.push(new Box({x: 30, y: 30, h: 70, w: 75, color: "green"}));
        boxes.push(new Box({x: 300, y: 330, h: 36, w: 150, color: "blue"}));
        boxes.push(new Box({x: 20, y: 330, h: 105, w: 45, color: "brown"}));
        boxes.push(new Box({x: 300, y: 30, h: 120, w: 95, color: "yellow"}));

        var game = {
            boxes: boxes,
            field: new Box({x: 0, y: 0, h: ctxWrapper.canvasH, w: ctxWrapper.canvasW})
        };

        game.player = new Player({events: events, x: 200, y: 200, h: 50, w: 50, color: "darkgrey", game: game});

        game.isStarted = false;
        game.gameStartTime = null;
        events.add("gameStart", function () {
            game.gameStartTime = new Date();
            game.isStarted = true;
        }, true);

        events.add("gameFinish", function () {
            game.isStarted = false;
            print("total time: " + (new Date().getTime() - game.gameStartTime.getTime()));
            events.trigger("restartLevel")
        });

        ctxWrapper.mainLoop = function (time) {
            //this - ctxWrapper
            this.clear();

            for (var b in boxes) {
                boxes[b].tick(time, game);
            }
            game.player.tick(time, game);

            for (var b in boxes) {
                boxes[b].draw(this.ctx);
            }
            game.player.draw(this.ctx);
        };
    }
})
;
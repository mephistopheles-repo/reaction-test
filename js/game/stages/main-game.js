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
        boxes.push(new Box({x: 30, y: 30, h: 70, w: 75, color: "#5cb85c"}));
        boxes.push(new Box({x: 280, y: 350, h: 36, w: 150, color: "#337ab7"}));
        boxes.push(new Box({x: 20, y: 330, h: 105, w: 45, color: "#d9534f"}));
        boxes.push(new Box({x: 310, y: 30, h: 120, w: 95, color: "#f0ad4e"}));

        var game = {
            boxes: boxes,
            field: new Box({x: 0, y: 0, h: ctxWrapper.canvasH, w: ctxWrapper.canvasW})
        };

        game.player = new Player({events: events, x: 200, y: 200, h: 50, w: 50, color: "#777", game: game});

        game.isStarted = false;
        game.gameStartTime = null;
        events.add("gameStart", function () {
            game.gameStartTime = new Date();
            game.isStarted = true;
        }, true);

        var myBestTimeEl = document.getElementById("js-best-my-result");
        myBestTimeEl.innerHTML = localStorage.getItem("myBestTime") || 0;

        var drawBoxes = function () {
            for (var b in boxes) {
                boxes[b].draw(ctxWrapper.ctx);
            }
        };

        var saveMyBestTime = function (time) {
            var myBestTime = localStorage.getItem("myBestTime") || 0;
            if (myBestTime < time) {
                localStorage.setItem("myBestTime", time);
            }
        };

        events.add("gameFinish", function () {
            if (!game.isStarted) return;
            game.isStarted = false;
            var time = new Date().getTime() - game.gameStartTime.getTime();
            var currentTimeEl = document.getElementById("js-curent-result");
            time = (time * 0.001).toFixed(3);
            saveMyBestTime(time);
            currentTimeEl.innerHTML = time.toString();
            drawBoxes();
            game.player.draw(ctxWrapper.ctx);
        });


        ctxWrapper.mainLoop = function (time) {
            //this - ctxWrapper
            this.clear();

            for (var b in boxes) {
                boxes[b].tick(time, game);
            }
            game.player.tick(time, game);

            drawBoxes();
            game.player.draw(this.ctx);
        };
    }
})
;
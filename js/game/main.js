/**
 * Created by denuss on 18.02.2015.
 */
define(['game/ctx-wrapper', 'events', 'stages/main-game'], function (CtxWrapper, Events, MainGame) {
    var Game = function () {
        var self = this;
        this.restartGame = function () {
            this.ctxWrapper.disposed = true;

            var newCanvas = this.canvas.cloneNode(true);
            this.canvas.parentNode.replaceChild(newCanvas, this.canvas);
            this.canvas = newCanvas;
            this.startGame()
        };

        this.startGame = function () {

            this.canvas = document.getElementById("js-canvas");

            this.ctxWrapper = new CtxWrapper(this.canvas);
            this.ctxWrapper.run();
            this.events = new Events();
            this.events.add("restartLevel", function () {
                self.restartGame();
            }, true);
            this.stage = new MainGame(this.ctxWrapper, this.events);
        };
    };
    new Game().startGame();
});
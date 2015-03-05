/**
 * Created by denuss on 21.02.2015.
 */
define(['game/box', 'aabb-util', 'print'], function (parent, aabbUtil, print) {
        var player = function () {
            parent.apply(this, arguments);

            this.dragged = false;
            this.posOffset = {x: 0, y: 0};
            var self = this;

            this.events.add("mouseDown", function (pos) {
                    if (aabbUtil.isPointInside(pos, self)) {
                        if (!self.game.isStarted) {
                            self.events.trigger("gameStart");
                        }
                        self.dragged = true;
                        self.posOffset.x = pos.x - self.x;
                        self.posOffset.y = pos.y - self.y;
                    }
                }
            );

            this.events.add("mouseUp", function (pos) {
                    self.dragged = false;
                    if (!self.game.isStarted){
                        self.events.trigger("restartLevel");
                    }
                }
            );

            this.events.add("mouseMove", function (pos) {
                    if (self.dragged) {
                        self.setPos(pos.x - self.posOffset.x, pos.y - self.posOffset.y);
                    }
                }
            );

            this.tick = function (time, game) {
                for (var b in game.boxes) {
                    if (aabbUtil.isIntersect(this, game.boxes[b])
                        || aabbUtil.isInside(game.field, this)) {
                        this.dragged = false;
                        self.events.trigger("gameFinish");
                    }
                }

            };
        };
        player.prototype = Object.create(parent);
        return player;
    }
)
;
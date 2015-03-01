/**
 * Created by denuss on 21.02.2015.
 */
define(['game/box', 'aabb-util', 'print'], function (parent, aabbUtil, print) {
        var player = function () {
            parent.apply(this, arguments);

            this.dragged = false;
            this.posOffset = {x: 0, y: 0};
            var self = this;

            this.aaa = function (events) {
                events.add("mouseDown", function (pos) {
                        if (aabbUtil.isPointInside(pos, self)) {
                            self.dragged = true;
                            self.posOffset.x = pos.x - self.x;
                            self.posOffset.y = pos.y - self.y;
                        }
                    }
                );

                events.add("mouseUp", function (pos) {
                        self.dragged = false;
                    }
                );

                events.add("mouseMove", function (pos) {
                        if (self.dragged) {
                            self.x = pos.x - self.posOffset.x;
                            self.y = pos.y - self.posOffset.y;
                        }
                    }
                );
            };

            this.tick = function (time, game) {
                for (var b in game.boxes) {
                    if (aabbUtil.isIntersect(this, game.boxes[b])) {
                        //print("touch!!!!");
                    }
                }

            };
        };
        player.prototype = Object.create(parent);
        return player;
    }
)
;
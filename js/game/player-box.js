/**
 * Created by denuss on 21.02.2015.
 */
define(['game/box', 'aabb-util', 'print'], function (parent, aabbUtil, print) {
        var player = function () {
            parent.apply(this, arguments);

            this.tick = function (time, game) {
                for (var b in game.boxes) {
                    if (aabbUtil.isIntersect(this, game.boxes[b])) {
                        print("touch!!!!");
                    }
                }

            };
        };
        player.prototype = Object.create(parent);
        return player;
    }
);
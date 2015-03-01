/**
 * Created by denuss on 18.02.2015.
 */
define(["aabb-util", 'print', 'game/box', 'game/ctx-wrapper', 'events','stages/main-game'], function (aabbUtil, print, box, ctxWrapper, events,MainGame) {

    var canvas = document.getElementById("js-canvas");

    ctxWrapper = new ctxWrapper(canvas);
    ctxWrapper.run();

    var stage = new MainGame(ctxWrapper);

/*    events = new events();
    var id = events.add("someShit",function(){print("someShit callback")});
     id = events.add("someShit",function(){print("someShit callback1")});
     id = events.add("someShit",function(){print("someShit callback2")});
     id = events.add("someShit",function(){print("someShit callback3")});
    events.trigger("someShit");
    events.remove(id);*/

    /*    //print(aabbUtil.isIntersect(0,0));
     print(aabbUtil.isInside({x: 0, y: 0, mx: 10, my: 10}, {x: 1, y: 1, mx: 9, my: 9}));
     print(aabbUtil.isInside({x: 0, y: 0, mx: 10, my: 10}, {x: -4, y: 1, mx: 9, my: 9}));
     print(aabbUtil.isInside({x: 0, y: 0, mx: 10, my: 10}, {x: 1, y: 1, mx: 9, my: 10}));*/
});
/**
 * Created by denuss on 28.02.2015.
 */
define(function () {
    return {
        getMousePos: function (canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
    }
});
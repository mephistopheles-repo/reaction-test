/**
 * Created by denuss on 18.02.2015.
 */
define(function () {
    return {
        isIntersect: function (a, b) {
            return true;
        },
        isInside: function (outer, inner) {
            var result = 0;
            if (inner.x < outer.x || inner.mx > outer.mx) {
                result = 1;
            }
            if (inner.y < outer.y || inner.my > outer.my) {
                result += 2;
            }
            return result;
        },
        isPointInside: function (point, box) {
            return box.x < point.x
                && box.y < point.y
                && box.mx > point.x
                && box.my > point.y
        }
    }
});

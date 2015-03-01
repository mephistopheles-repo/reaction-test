/**
 * Created by denuss on 27.02.2015.
 */
define(['print'], function (print) {
    return function () {
        var events = {exampleEvent: {id: 'callback'}};
        var lastId = 0;

        this.add = function (name, callback) {
            return +!((events[name] || (events[name] = {}))[++lastId] = callback) + lastId;
        };

        this.trigger = function (name, args) {
            if (events.hasOwnProperty(name)) {
                for (var c in events[name]) {
                    if (events[name].hasOwnProperty(c)) {
                        if (events[name][c].call(null, args) === false) {
                            break;
                        }
                    } else {
                        print("callback " + c + " for event " + name + " not found");
                    }
                }
            }
        };

        this.remove = function (name, id) {
            if (events.hasOwnProperty(name)) {
                delete events[name][id.toString()];
            }
        }
    }
});
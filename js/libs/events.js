/**
 * Created by denuss on 27.02.2015.
 */
define(['print'], function (print) {
    return function () {
        var events = {exampleEvent: {id: 'callback'}};
        var lastId = 0;

        this.add = function (name, callback, isAsync) {
            (events[name] || (events[name] = {}))[++lastId] = callback;
            events[name][lastId].isAsync = !!isAsync;
            return lastId;
        };

        this.trigger = function (name, args) {
            if (events.hasOwnProperty(name)) {
                for (var c in events[name]) {
                    if (events[name].hasOwnProperty(c)) {
                        var run = function () {
                            if (events[name][c].call(null, args) === false) {
                                return false;
                            }
                        };
                        if (events[name][c].isAsync) {
                            setTimeout(run, 0);
                        } else {
                            if (!run()) break;
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
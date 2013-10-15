/*global define */
define([], function () {
    "use strict";

    return (function() {

        function Extendable() {
        }

        // Extend the given child as a subclass of the parent class
        Extendable.extend = function(child) {
            for (var key in this) {
                if (!child.prototype.hasOwnProperty(key)) {
                    child[key] = this[key];
                }
            }

            function Ctor() {
                this.constructor = child;
            }
            Ctor.prototype = this.prototype;
            child.prototype = new Ctor();

            child.__super__ = this.prototype;
        };

        return Extendable;

    })();
});


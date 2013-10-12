/*global define */
define([], function () {
    "use strict";

    return (function() {

        function Component() {
        }

        // Extend the given child as a subclass of Component
        Component.extend = function(child) {
            for (var key in this) {
                if (!child.hasOwnProperty(key)) {
                    child[key] = this[key];
                }
            }
        }

        return Component;

    })();
});


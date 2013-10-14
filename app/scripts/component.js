/*global define */
define([], function () {
    "use strict";

    return (function() {

        // The entity that is assigned this component
        Component.prototype.entity = {};

        function Component(entity) {
            this.entity = entity;
        }

        // Extend the given child as a subclass of Component
        Component.extend = function(child) {
            for (var key in this) {
                if (!child.prototype.hasOwnProperty(key)) {
                    child[key] = this[key];
                }
            }

            function ctor() { this.constructor = child; }
            ctor.prototype = this.prototype;
            child.prototype = new ctor;

            child.__super__ = this.prototype;
        }

        // Functions called when the entity receives the given event
        Component.prototype.respondEvents = {};

        return Component;

    })();
});


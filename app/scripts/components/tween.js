/*
    Component: Tween
    Allows moving animations
*/
/*global define */
define(["jquery", "component"], function ($, Component) {
    "use strict";

    return (function() {
        // Inherit from the Component class
        Component.extend(Tween);

        // The name to refer to this component
        Tween.prototype.name = "Tween";

        // Parameters
        Tween.prototype.x = null;
        Tween.prototype.y = null;

        Tween.prototype.time = null;

        function Tween(entity, x, y, speed) {
            this.x = x;
            this.y = y;
            if (speed !== null) {
                this.time = 1;
            }

            Tween.__super__.constructor.call(this, entity);
        }

        Tween.prototype.preRender = function(event, scene) {
            // Start the animation timer if needed
            if (this.time === null) {
                this.time = new Date().getTime();
            }
            else {
                this.time += event.dt;
            }

            // TOdo: move it move it
        };

        return Tween;

    })();
});


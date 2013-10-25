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

        Tween.prototype.x0 = null;
        Tween.prototype.y0 = null;

        Tween.prototype.time = 0;
        Tween.prototype.duration = null;

        Tween.prototype.mx = null;
        Tween.prototype.my = null;

        function Tween(entity, x, y, speed) {
            this.x = x;
            this.y = y;

            // Save the original position
            this.x0 = entity.x;
            this.y0 = entity.y;

            // Calculate the distance between the two points
            var d = Math.pow(Math.pow(y - entity.y, 2) + Math.pow(x - entity.x, 2), 1/2);

            // Calculate the time to reach this point
            if (speed !== null) {
                this.duration = d / speed;
            }

            // Calculate the time slopes in x and y direcitons
            this.mx = (x - entity.x) / this.duration;
            this.my = (y - entity.y) / this.duration;

            Tween.__super__.constructor.call(this, entity);
        }

        Tween.prototype.preRender = function(event, scene) {
            if (this.time !== null && this.time < this.duration) {
                this.time += event.dt;

                // If we're done
                if (this.time >= this.duration) {
                    // Set the entity at its final place and reset the time attributes
                    this.entity.x = this.x;
                    this.entity.y = this.y;
                    this.time = null;
                }
                // Otherwise move it move it
                else {
                    this.entity.x = this.x0 + this.mx * this.time;
                    this.entity.y = this.y0 + this.my * this.time;
                }
            }
        };

        return Tween;

    })();
});


/*
    Component: Bounded
    Prevents moving outside the canvas
*/
/*global define */
define(['jquery', 'component'], function ($, Component) {
    'use strict';

    return (function() {
        // Inherit from the Component class
        Component.extend(Bounded);

        // The name to refer to this component
        Bounded.prototype.name = 'Bounded';

        // The location to be bounded within
        Bounded.prototype.x = null;
        Bounded.prototype.y = null;
        Bounded.prototype.width = null;
        Bounded.prototype.height = null;

        function Bounded(entity, x, y, width, height) {
            if (x !== null) {
                this.x = x;
            }
            if (y !== null) {
                this.y = y;
            }
            if (width !== null) {
                this.width = width;
            }
            if (height !== null) {
                this.height = height;
            }

            Bounded.__super__.constructor.call(this, entity);
        }

        Bounded.prototype.preRender = function(event, scene) {
            // If no args passed, bound inside whole canvas
            if (this.x === null) {
                this.x = 0;
            }
            if (this.y === null) {
                this.y = 0;
            }
            if (this.width === null) {
                this.width = scene.ctx.canvas.width;
            }
            if (this.height === null) {
                this.height = scene.ctx.canvas.height;
            }

            // North Edge
            if (this.entity.y < this.y) {
                this.entity.y = this.y;
            }

            // East Edge
            if (this.entity.x + this.entity.width > this.x + this.width) {
                this.entity.x = this.x + this.width - this.entity.width;
            }

            // South Edge
            if (this.entity.y + this.entity.height > this.y + this.height) {
                this.entity.y = this.height - this.y - this.entity.height;
            }

            // West Edge
            if (this.entity.x < this.x) {
                this.entity.x = this.x;
            }
        };

        return Bounded;

    })();
});


/*global define */
define(['jquery', 'extendable'], function ($, Extendable) {
    'use strict';

    return (function() {
        // Inherit from the Extendable class
        Extendable.extend(Entity);

        // Canvas Rendering
        Entity.prototype.display = true;
        Entity.prototype.x = 0;
        Entity.prototype.y = 0;
        Entity.prototype.width = 0;
        Entity.prototype.height = 0;
        Entity.prototype.color = 'rgb(0, 0, 0)';

        // Components
        Entity.prototype.components = {};

        function Entity(x, y, width, height, color) {
            // Set passed in args
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            if (color !== null) {
                this.color = color;
            }

            // Reset objects (for a deep copy)
            this.components = {};
        }

        // Draw the entity in the given context at the given coordinates
        Entity.prototype.render = function(ctx, dt) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };

        // Add a component
        Entity.prototype.componentAdd = function(component) {
            this.components[component.name] = component;
        };

        return Entity;

    })();
});

/*global define */
define(["jquery", "extendable"], function ($, Extendable) {
    "use strict";

    return (function() {
        // Inherit from the Extendable class
        Extendable.extend(Scene);

        Scene.prototype.entities = [];

        Scene.prototype.engine = null;

        // Used by the draggable component to limit dragging to 1 entity at a time
        Scene.prototype.dragging = false;

        function Scene(engine) {
            this.engine = engine;

            // Reset the entities object
            this.entities = [];
        }

        // Draw the entity in the given context at the given coordinates
        Scene.prototype.render = function(ctx, dt) {
            // Update the ctx
            this.ctx = ctx;

            // Render entities
            var me = this;
            this.entities.forEach(function(elt) {
                if (elt.display) {
                    me.eventFire({type: "preRender", dt: dt});
                    elt.render(ctx, dt);
                }
            });
        };

        // Create an entity
        Scene.prototype.entityAdd = function(entity) {
            this.entities.push(entity);
            return this.entities[this.entities.length - 1];
        };

        // Remove an entity.  Returns true if found, false if not found
        Scene.prototype.entityRemove = function(entity) {
            for (var i in this.entities) {
                var entityCheck = this.entities[i];
                if (entityCheck === entity) {
                    this.entities.splice(i, 1);
                    return true;
                }
            }

            return false;
        };

        // Call the given event responder on all entity components listening
        Scene.prototype.eventFire = function(event) {
            // Fire on the scene
            if (event.type in this) {
                this[event.type](event);
            }

            // Loop through in reverse order, to fire on recent, top entities first
            for (var i = this.entities.length - 1; i >= 0; i--) {
                // Fire on all entities
                var entity = this.entities[i];
                if (event.type in entity) {
                    entity[event.type](event, this);
                }
                for (var j in entity.components) {
                    // Fire on all components on the given entity
                    var component = entity.components[j];
                    if (event.type in component) {
                        component[event.type](event, this);
                    }
                }
            }
        };

        // Gets the coordinates of an event on the canvas relative to the canvas
        Scene.prototype.getEventCoords = function(event) {
            // Only if we have ctx (have rendered)
            if ("ctx" in this) {
                var totalOffsetX = 0;
                var totalOffsetY = 0;
                var canvasX = 0;
                var canvasY = 0;
                var currentElement = this.ctx.canvas;

                // Get the direct event x/y
                var eventX = 0;
                var eventY = 0;
                if (event.type === "touchstart" || event.type === "touchmove" || event.type === "touchend" || event.type === "touchcancel") {
                    var eventOriginal = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                    eventX = eventOriginal.pageX;
                    eventY = eventOriginal.pageY;
                }
                else {
                    eventX = event.pageX;
                    eventY = event.pageY;
                }

                // Get the coords with respect to the canvas
                do {
                    totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
                    totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
                }
                while(currentElement = currentElement.offsetParent);

                canvasX = eventX - totalOffsetX;
                canvasY = eventY - totalOffsetY;

                // Scale the coords if the canvas is scaled
                var scale = this.ctx.canvas.width / this.ctx.canvas.style.width.substr(0, this.ctx.canvas.style.width.length - 2);
                canvasX *= scale;
                canvasY *= scale;

                return {x:canvasX, y:canvasY};
            }
            else {
                return {x: 0, y: 0};
            }
        };

        // Returns true if the coords are inside the object, false otherwise
        Scene.isInside = function(coords, entity) {
            if ((coords.x >= entity.x) && (coords.x <= entity.x + entity.width)) {
                if ((coords.y >= entity.y) && (coords.y <= entity.y + entity.height)) {
                    return true;
                }
            }
            return false;
        };

        // Returns true if the two entities overlap
        Scene.isOverlap = function(entity1, entity2) {
            var rect1X1 = entity1.x;
            var rect1X2 = entity1.x + entity1.width;
            var rect1Y1 = entity1.y;
            var rect1Y2 = entity1.y + entity1.height;
            var rect2X1 = entity2.x;
            var rect2X2 = entity2.x + entity2.width;
            var rect2Y1 = entity2.y;
            var rect2Y2 = entity2.y + entity2.height;

            if (rect1X1 < rect2X2 && rect1X2 > rect2X1 && rect1Y1 < rect2Y2 && rect1Y2 > rect2Y1) {
                return true;
            }
            return false;
        };

        // Returns an object with x and y set to the midpoint of the two entities
        Scene.getMidpoint = function(entity1, entity2) {
            var coords = {x: 0, y: 0};

            coords.x = Math.round((entity1.x + entity2.x) / 2);
            coords.y = Math.round((entity1.y + entity2.y) / 2);

            return coords;
        };

        return Scene;

    })();
});

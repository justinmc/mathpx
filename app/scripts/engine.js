/*global define */
define(["jquery"], function ($) {
    "use strict";

    return (function() {

        // DOM Objects
        Engine.prototype.canvas = null;
        Engine.prototype.ctx = null;

        // Game stuff
        Engine.prototype.entities = [];

        // The time of the most recently completed render
        Engine.prototype.timeThen = null;

        function Engine(canvas) {
            // Save the canvas and context
            this.canvas = canvas;
            this.ctx = this.canvas.getContext("2d");

            // Add event listeners
            var me = this;
            $(this.canvas).on("mousedown", function(event) {
                me.componentsCallEvent(event);
            });
            $(this.canvas).on("mousemove", function(event) {
                me.componentsCallEvent(event);
            });
            $(this.canvas).on("mouseup", function(event) {
                me.componentsCallEvent(event);
            });
        }

        // Call at each frame
        Engine.prototype.render = function(dt) {
            // Render entities
            var me = this;
            this.entities.forEach(function(elt) {
                if (elt.display) {
                    me.componentsCallEvent({type: "preRender"});
                    elt.render(me.ctx, dt);
                }
            });
        };

        // Create an entity
        Engine.prototype.entityAdd = function(entity) {
            this.entities.push(entity);
            return this.entities[this.entities.length - 1];
        };

        // Call the given event responder on all entity components listening
        Engine.prototype.componentsCallEvent = function(event) {
            for (var i in this.entities) {
                var entity = this.entities[i];
                if (event.type in entity) {
                    entity[event.type](event, this);
                }
                for (var j in entity.components) {
                    var component = entity.components[j];
                    if (event.type in component) {
                        component[event.type](event, this);
                    }
                }
            }
        };

        // Gets the coordinates of an event on the canvas relative to the canvas
        Engine.prototype.getEventCoords = function(event) {
            var totalOffsetX = 0;
            var totalOffsetY = 0;
            var canvasX = 0;
            var canvasY = 0;
            var currentElement = this.canvas;

            do {
                totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
                totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
            }
            while(currentElement = currentElement.offsetParent);

            canvasX = event.pageX - totalOffsetX;
            canvasY = event.pageY - totalOffsetY;

            return {x:canvasX, y:canvasY};
        };

        // Returns true if the coords are inside the object, false otherwise
        Engine.prototype.isInside = function(coords, entity) {
            if ((coords.x >= entity.x) && (coords.x <= entity.x + entity.width)) {
                if ((coords.y >= entity.y) && (coords.y <= entity.y + entity.height)) {
                    return true;
                }
            }
            return false;
        };

        // Returns true if the two entities overlap
        Engine.prototype.isOverlap = function(entity1, entity2) {
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

        return Engine;
    })();
});

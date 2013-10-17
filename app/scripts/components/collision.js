/*
    Component: Collision
    Calls a callback when colliding with another entity
*/
/*global define */
define(["jquery", "component"], function ($, Component) {
    "use strict";

    return (function() {
        // Inherit from the Component class
        Component.extend(Collision);

        // The name to refer to this component
        Collision.prototype.name = "Collision";

        // The function to call if a collision was detected
        Collision.prototype.callback = null;

        // The event to listen to and check for a collision
        Collision.prototype.eventName = "preRender";

        // The component on other entities that can be collided with
        // If none given, all can be collided with
        Collision.prototype.componentCollidable = null;

        function Collision(entity, componentCollidable, callback, eventName) {
            this.entity = entity;
            this.componentCollidable = componentCollidable;
            this.callback = callback;
            if (eventName !== null) {
                this.eventName = eventName;
            }

            Collision.__super__.constructor.call(this, entity);
        }

        Collision.prototype.preRender = function(event, engine) {
            if (this.eventName === event.type) {
                this.check(event, engine);
            }
        };

        Collision.prototype.mouseup = function(event, engine) {
            if (this.eventName === event.type) {
                this.check(event, engine);
            }
        };

        Collision.prototype.mousedown = function(event, engine) {
            if (this.eventName === event.type) {
                this.check(event, engine);
            }
        };

        Collision.prototype.mousemove = function(event, engine) {
            if (this.eventName === event.type) {
                this.check(event, engine);
            }
        };

        // Check for a collision and act
        Collision.prototype.check = function(event, engine) {
            // Loop through all entities
            for (var i in engine.entities) {
                var entity = engine.entities[i];

                // Do we care if these entities overlap?
                if ((this.entity !== entity) && ((this.componentCollidable === null) || (this.componentCollidable in entity.components))) {
                    // Check if the entities overlap
                    if (engine.isOverlap(this.entity, entity)) {
                        // Call the callback!
                        this.callback(event, engine, entity);
                    }
                }
            }
        };

        return Collision;

    })();
});


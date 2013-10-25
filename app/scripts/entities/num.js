/*
    Entity: NumberPos
    A positive number
*/
/*global define */
define(["jquery", "extendable", "scene", "entity", "sprite", "draggable", "bounded", "collision"], function ($, Extendable, Scene, Entity, Sprite, Draggable, Bounded, Collision) {
    "use strict";

    return (function() {
        // Inherit from the Extendable class
        Sprite.extend(Num);

        Num.prototype.width = 64;
        Num.prototype.height = 64;

        // Parameters
        Num.prototype.toolbar = null;
        Num.prototype.boundedWidth = null;
        Num.prototype.boundedHeight = null;

        // Sprite
        Num.prototype.spriteSheet = $("img.gettable.gettable-math").attr("src");
        Num.prototype.spriteWidth = 16;
        Num.prototype.spriteHeight = 16;
        Num.prototype.spriteX = 0;
        Num.prototype.spriteY = 0;
        Num.prototype.spriteXDefault = 0;
        Num.prototype.spriteYDefault = 0;

        Num.prototype.dragCreateEntity = null;

        Num.prototype.value = 1;

        function Num(x, y, boundedWidth, boundedHeight, toolbar, active) {
            Num.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);

            // Save parameters
            this.toolbar = toolbar;
            this.boundedWidth = boundedWidth;
            this.boundedHeight = boundedHeight;

            this.dragCreateEntity = Num.bind(this, this.x, this.y, boundedWidth, boundedHeight, false, true);

            // Add the collision component for colliding with the trash
            var me = this;
            this.componentAdd(new Collision(this, "Trash", function(event, engine, entityCollided) {
                engine.entities.splice(engine.entities.indexOf(me), 1);
                entityCollided.spriteAnimate("eat", 1);
            }, "mouseup"));

            if (active) {
                // Add an animation and start it
                this.spriteAnimationAdd("rest", 0, 0, 3, 0.15);
                this.spriteAnimate("rest");

                // Add the draggable component
                this.componentAdd(new Draggable(this));

                // Add the bounded component
                this.componentAdd(new Bounded(this, 0, 0, boundedWidth, boundedHeight));
            }

            // Don't count toolbar numbers
            if (toolbar) {
                this.value = 0;
            }
        }

        Num.prototype.mousedown = function(event, scene) {
            this.dragCreate(event, scene);
        };

        Num.prototype.touchstart = function(event, scene) {
            event.preventDefault();
            this.dragCreate(event, scene);
        };

        // For toolbar nums, create a new active num on touch
        Num.prototype.dragCreate = function(event, scene) {
            // Only dragcreate toolbar nums
            if (this.toolbar) {

                // Can't dragcreate hidden entities
                if (this.display) {
                    var coords = scene.getEventCoords(event);

                    // Check to see if the entity was clicked
                    if (Scene.isInside(coords, this)) {
                        // Create the new entity
                        var dragging = scene.addActiveNum(scene.entityAdd(new this.dragCreateEntity()));
                        dragging.components.Draggable.draggingX = coords.x - this.x;
                        dragging.components.Draggable.draggingY = coords.y - this.y;
                    }
                }
            }
        };

        return Num;

    })();
});

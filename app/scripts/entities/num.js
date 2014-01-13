/*
    Entity: NumberPos
    A positive number
*/
/*global define */
define(["jquery", "extendable", "scene", "entity", "sprite", "draggable", "dragCreate", "bounded", "collision"], function ($, Extendable, Scene, Entity, Sprite, Draggable, DragCreate, Bounded, Collision) {
    "use strict";

    return (function() {
        // Inherit from the Extendable class
        Sprite.extend(Num);

        Num.prototype.width = 64;
        Num.prototype.height = 64;

        // Parameters
        Num.prototype.toolbar = null;

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

        function Num(x, y, boundedX, boundedY, boundedWidth, boundedHeight, toolbar, active) {
            Num.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);

            // Save parameters
            this.toolbar = toolbar;

            // Add the collision component for colliding with the trash
            var me = this;
            this.componentAdd(new Collision(this, "Trash", function(event, scene, entityCollided) {
                scene.entities.splice(scene.entities.indexOf(me), 1);
                scene.removeActiveNum(me);
                entityCollided.spriteAnimate("eat", 1);
            }, "mouseup"));

            // Add the annihilate animation
            this.spriteAnimationAdd("annihilate", 0, 2, 3, 0.15);

            if (active) {
                // Add the rest animation and start it
                this.spriteAnimationAdd("rest", 0, 0, 3, 0.15);
                this.spriteAnimate("rest");

                // Add the draggable component
                this.componentAdd(new Draggable(this));

                // Add the bounded component
                this.componentAdd(new Bounded(this, boundedX, boundedY, boundedWidth, boundedHeight));
            }

            // Don't count toolbar numbers
            if (toolbar) {
                this.value = 0;

                // Create the entity to create on drag, if not already set
                if (this.dragCreateEntity === null) {
                    this.dragCreateEntity = Num.bind(this, this.x, this.y, boundedX, boundedY, boundedWidth, boundedHeight, false, true);
                }

                // Add the dragCreate component
                this.componentAdd(new DragCreate(this, this.dragCreateEntity, this.dragCreate));
            }
        }

        // Drag create callback for toolbar nums
        Num.prototype.dragCreate = function(event, scene, entity, entityNew) {
            // Add the entity to the scene's active count
            scene.addActiveNum(entityNew);
        };

        return Num;

    })();
});

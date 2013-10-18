/*
    Entity: NumberPos
    A positive number
*/
/*global define */
define(["jquery", "extendable", "entity", "sprite", "draggable", "dragCreate", "bounded", "collision"], function ($, Extendable, Entity, Sprite, Draggable, DragCreate, Bounded, Collision) {
    "use strict";

    return (function() {
        // Inherit from the Extendable class
        Sprite.extend(Num);

        Num.prototype.width = 64;
        Num.prototype.height = 64;

        // Sprite
        Num.prototype.spriteSheet = $("img.gettable.gettable-math").attr("src");
        Num.prototype.spriteWidth = 16;
        Num.prototype.spriteHeight = 16;
        Num.prototype.spriteX = 0;
        Num.prototype.spriteY = 0;
        Num.prototype.spriteXDefault = 0;
        Num.prototype.spriteYDefault = 0;

        Num.prototype.value = 1;

        function Num(x, y, boundedWidth, boundedHeight, toolbar, active) {
            Num.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);

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

            if (toolbar) {
                // Don't count toolbar numbers
                this.value = 0;

                // Add the dragCreate component
                this.componentAdd(new DragCreate(this, Num.bind(this, this.x, this.y, boundedWidth, boundedHeight, false, true)));
            }
        }

        return Num;

    })();
});

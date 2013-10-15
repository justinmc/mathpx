/*
    Entity: NumberPos
    A positive number
*/
/*global define */
define(["jquery", "extendable", "entity", "draggable", "dragCreate", "bounded"], function ($, Extendable, Entity, Draggable, DragCreate, Bounded) {
    "use strict";

    return (function() {
        // Inherit from the Extendable class
        Entity.extend(Num);

        Entity.prototype.width = 64;
        Entity.prototype.height = 64;

        // Sprite
        Num.prototype.spriteSheet = $("img.gettable.gettable-math").attr("src");
        Num.prototype.spriteWidth = 16;
        Num.prototype.spriteHeight = 16;
        Num.prototype.spriteX = 0;
        Num.prototype.spriteY = 0;
        Num.prototype.spriteXDefault = 0;
        Num.prototype.spriteYDefault = 0;

        function Num(x, y, toolbar) {
            // Set passed in args
            this.x = x;
            this.y = y;

            // Create the object and load its resource
            this.createObj();

            // Reset objects (for a deep copy)
            this.components = {};
            this.spriteAnimations = {};

            this.componentAdd(new Bounded(this));

            // Set up a normal number
            if (!toolbar) {
                // Add an animation and start it
                this.spriteAnimationAdd("rest", 0, 0, 3, 0.15);
                this.spriteAnimate("rest");

                // Add the draggable component
                this.componentAdd(new Draggable(this));
            }
            // Otherwise setup a toolbar number
            else {
                this.componentAdd(new DragCreate(this, Num));
            }
        }

        Num.prototype.createObj = function() {
            // Create the object
            this.obj = new Image();

            // Load its resource
            var me = this;
            this.obj.addEventListener("load", function() {
                me.loading = false;
            }, false);
            this.obj.src = this.spriteSheet;
            this.loading = true;
        };

        return Num;

    })();
});

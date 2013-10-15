/*
    Entity: NumberPos
    A positive number
*/
/*global define */
define(["jquery", "extendable", "entity", "draggable"], function ($, Extendable, Entity, Draggable) {
    "use strict";

    return (function() {
        // Inherit from the Extendable class
        Entity.extend(Num);

        // Sprite
        Num.prototype.spriteSheet = $("img.gettable.gettable-math").attr("src");
        Num.prototype.spriteSize = 16;
        Num.prototype.spriteX = 0;
        Num.prototype.spriteY = 0;
        Num.prototype.spriteXDefault = 0;
        Num.prototype.spriteYDefault = 0;
        Num.prototype.spriteScale = 4;

        function Num(x, y, toolbar) {
            // Set passed in args
            this.x = x;
            this.y = y;

            // Create the object
            this.obj = new Image();

            // Load its resource
            var me = this;
            this.obj.addEventListener("load", function() {
                me.loading = false;
            }, false);
            this.obj.src = this.spriteSheet;
            this.loading = true;

            // Reset components (for a deep copy of the components object)
            this.components = {};

            // Set up a normal number
            if (!toolbar) {
                // Add an animation and start it
                this.spriteAnimationAdd("rest", 0, 0, 3, 0.15);
                this.spriteAnimate("rest");

                // Add the draggable component
                this.componentAdd(new Draggable(this));
            }
        }

        return Num;

    })();
});

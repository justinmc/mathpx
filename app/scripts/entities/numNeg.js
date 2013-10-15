/*
    Entity: Num: NumNeg
    A negative number
*/
/*global define */
define(["jquery", "num", "draggable", "dragCreate"], function ($, Num, Draggable, DragCreate) {
    "use strict";

    return (function() {
        Num.extend(NumNeg);

        // Sprite
        NumNeg.prototype.spriteSheet = $("img.gettable.gettable-math").attr("src");
        NumNeg.prototype.spriteSize = 16;
        NumNeg.prototype.spriteX = 0;
        NumNeg.prototype.spriteY = 1;
        NumNeg.prototype.spriteXDefault = 0;
        NumNeg.prototype.spriteYDefault = 1;
        NumNeg.prototype.spriteScale = 4;

        function NumNeg(x, y, toolbar) {
            // Set passed in args
            this.x = x;
            this.y = y;

            // Create the object and load its resource
            this.createObj();

            // Reset objects (for a deep copy)
            this.components = {};
            this.spriteAnimations = {};

            // Set up a normal number
            if (!toolbar) {
                // Add an animation and start it
                this.spriteAnimationAdd("rest", 0, 1, 3, 0.15);
                this.spriteAnimate("rest");

                // Add the draggable component
                this.componentAdd(new Draggable(this));
            }
            // Otherwise set up a toolbar number
            else {
                // Add the dragCreate component
                this.componentAdd(new DragCreate(this, NumNeg));
            }
        }

        return NumNeg;

    })();
});


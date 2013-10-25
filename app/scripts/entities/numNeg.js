/*
    Entity: Num: NumNeg
    A negative number
*/
/*global define */
define(["jquery", "num", "scene", "draggable", "bounded", "collision"], function ($, Num, Scene, Draggable, Bounded, Collision) {
    "use strict";

    return (function() {
        Num.extend(NumNeg);

        // Sprite
        NumNeg.prototype.spriteSheet = $("img.gettable.gettable-math").attr("src");
        NumNeg.prototype.spriteWidth = 16;
        NumNeg.prototype.spriteHeight = 16;
        NumNeg.prototype.spriteX = 0;
        NumNeg.prototype.spriteY = 1;
        NumNeg.prototype.spriteXDefault = 0;
        NumNeg.prototype.spriteYDefault = 1;

        NumNeg.prototype.value = -1;

        function NumNeg(x, y, boundedWidth, boundedHeight, toolbar, active) {
            NumNeg.__super__.constructor.call(this, x, y, boundedWidth, boundedHeight, toolbar, active);

            this.dragCreateEntity = NumNeg.bind(this, this.x, this.y, boundedWidth, boundedHeight, false, true);

            if (active) {
                // Add an animation and start it
                this.spriteAnimationAdd("rest", 0, 1, 3, 0.15);
                this.spriteAnimate("rest");
            }
        }

        return NumNeg;

    })();
});


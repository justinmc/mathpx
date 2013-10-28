/*
    Entity: CheckberPos
    A positive number
*/
/*global define, $ */
define(["sprite"], function (Sprite) {
    "use strict";

    return (function() {
        // Inherit from the Extendable class
        Sprite.extend(Check);

        Check.prototype.width = 64;
        Check.prototype.height = 64;

        // Sprite
        Check.prototype.spriteSheet = $("img.gettable.gettable-chalkboard").attr("src");
        Check.prototype.spriteWidth = 16;
        Check.prototype.spriteHeight = 16;
        Check.prototype.spriteX = 5;
        Check.prototype.spriteY = 0;

        function Check(x, y) {
            Check.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);

            // Add the init animation and start it
            this.spriteAnimationAdd("init", 0, 0, 7, 0.15);
            this.spriteAnimate("init", 1);
        }

        return Check;

    })();
});

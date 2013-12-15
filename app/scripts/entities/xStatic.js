/*
    Entity: XStatic
    A static check mark for marking question menu options
*/
/*global define, $ */
define(["sprite"], function (Sprite) {
    "use strict";

    return (function() {
        // Inherit from the Extendable class
        Sprite.extend(XStatic);

        XStatic.prototype.width = 32;
        XStatic.prototype.height = 32;

        // Sprite
        XStatic.prototype.spriteSheet = $("img.gettable.gettable-chalkboard").attr("src");
        XStatic.prototype.spriteWidth = 8;
        XStatic.prototype.spriteHeight = 8;
        XStatic.prototype.spriteX = 1;
        XStatic.prototype.spriteY = 4;

        function XStatic(x, y) {
            XStatic.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);
        }

        return XStatic;

    })();
});

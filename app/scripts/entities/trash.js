/*
    Entity: Trash
    Trash can to remove numbers
*/
/*global define */
define(["jquery", "extendable", "entity", "sprite"], function ($, Extendable, Entity, Sprite) {
    "use strict";

    return (function() {
        // Inherit from the Extendable class
        Sprite.extend(Trash);

        Trash.prototype.width = 64;
        Trash.prototype.height = 64;

        // Sprite
        Trash.prototype.spriteSheet = $("img.gettable.gettable-math").attr("src");
        Trash.prototype.spriteWidth = 16;
        Trash.prototype.spriteHeight = 16;
        Trash.prototype.spriteX = 0;
        Trash.prototype.spriteY = 3;
        Trash.prototype.spriteXDefault = 0;
        Trash.prototype.spriteYDefault = 0;

        function Trash(x, y) {
            Trash.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);

            // Add the Trash component for collision detection
            this.componentAdd({name: "Trash"});

            this.spriteAnimationAdd("eat", 0, 3, 3, 0.3);
        }

        return Trash;

    })();
});

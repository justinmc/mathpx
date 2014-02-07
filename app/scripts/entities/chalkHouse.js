/*
    Entity: ChalkHouse
    Animated house chalk drawing
*/
/*global define */
define(['jquery', 'sprite'], function ($, Sprite) {
    'use strict';

    return (function() {
        // Inherit from the Extendable class
        Sprite.extend(ChalkHouse);

        ChalkHouse.prototype.width = 64;
        ChalkHouse.prototype.height = 64;

        // Sprite
        ChalkHouse.prototype.spriteSheet = $('img.gettable.gettable-start').attr('src');
        ChalkHouse.prototype.spriteWidth = 16;
        ChalkHouse.prototype.spriteHeight = 16;
        ChalkHouse.prototype.spriteX = 0;
        ChalkHouse.prototype.spriteY = 3;
        ChalkHouse.prototype.spriteXDefault = 0;
        ChalkHouse.prototype.spriteYDefault = 3;

        function ChalkHouse(x, y) {
            ChalkHouse.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);

            // Add an animation and start it
            this.spriteAnimationAdd('draw', 0, 3, 33, 0.15);
            this.spriteAnimate('draw');
        }

        return ChalkHouse;

    })();
});

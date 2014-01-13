/*
    Entity: ChalkHeart
    Animated tic tac toe chalk drawing
*/
/*global define */
define(['jquery', 'sprite'], function ($, Sprite) {
    'use strict';

    return (function() {
        // Inherit from the Extendable class
        Sprite.extend(ChalkHeart);

        ChalkHeart.prototype.width = 64;
        ChalkHeart.prototype.height = 64;

        // Sprite
        ChalkHeart.prototype.spriteSheet = $('img.gettable.gettable-start').attr('src');
        ChalkHeart.prototype.spriteWidth = 16;
        ChalkHeart.prototype.spriteHeight = 16;
        ChalkHeart.prototype.spriteX = 0;
        ChalkHeart.prototype.spriteY = 2;
        ChalkHeart.prototype.spriteXDefault = 25;
        ChalkHeart.prototype.spriteYDefault = 2;

        function ChalkHeart(x, y) {
            ChalkHeart.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);

            // Add an animation and start it
            this.spriteAnimationAdd('draw', 0, 2, 36, 0.15);
            this.spriteAnimate('draw');
        }

        return ChalkHeart;

    })();
});

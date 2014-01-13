/*
    Entity: ChalkTTT
    Animated tic tac toe chalk drawing
*/
/*global define */
define(['jquery', 'sprite'], function ($, Sprite) {
    'use strict';

    return (function() {
        // Inherit from the Extendable class
        Sprite.extend(ChalkTTT);

        ChalkTTT.prototype.width = 64;
        ChalkTTT.prototype.height = 64;

        // Sprite
        ChalkTTT.prototype.spriteSheet = $('img.gettable.gettable-start').attr('src');
        ChalkTTT.prototype.spriteWidth = 16;
        ChalkTTT.prototype.spriteHeight = 16;
        ChalkTTT.prototype.spriteX = 0;
        ChalkTTT.prototype.spriteY = 1;
        ChalkTTT.prototype.spriteXDefault = 15;
        ChalkTTT.prototype.spriteYDefault = 1;

        function ChalkTTT(x, y) {
            ChalkTTT.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);

            // Add an animation and start it
            this.spriteAnimationAdd('draw', 0, 1, 15, 0.15);
            this.spriteAnimate('draw');
        }

        return ChalkTTT;

    })();
});

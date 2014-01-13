/*
    Entity: StartChalk
    An animated chalk drawing on the board, for the start scene
*/
/*global define */
define(['jquery', 'sprite'], function ($, Sprite) {
    'use strict';

    return (function() {
        // Inherit from the Extendable class
        Sprite.extend(StartChalk);

        StartChalk.prototype.width = 64;
        StartChalk.prototype.height = 64;

        // Sprite
        StartChalk.prototype.spriteSheet = $('img.gettable.gettable-start').attr('src');
        StartChalk.prototype.spriteWidth = 16;
        StartChalk.prototype.spriteHeight = 16;
        StartChalk.prototype.spriteX = 0;
        StartChalk.prototype.spriteY = 0;
        StartChalk.prototype.spriteXDefault = 0;
        StartChalk.prototype.spriteYDefault = 0;

        function StartChalk(x, y) {
            StartChalk.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);

            // Add an animation and start it
            this.spriteAnimationAdd('draw', 0, 0, 15, 0.15);
            this.spriteAnimate('draw');
        }

        return StartChalk;

    })();
});

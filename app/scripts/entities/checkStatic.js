/*
    Entity: CheckStatic
    A static check mark for marking question menu options
*/
/*global define, $ */
define(['sprite'], function (Sprite) {
    'use strict';

    return (function() {
        // Inherit from the Extendable class
        Sprite.extend(CheckStatic);

        CheckStatic.prototype.width = 32;
        CheckStatic.prototype.height = 32;

        // Sprite
        CheckStatic.prototype.spriteSheet = $('img.gettable.gettable-chalkboard').attr('src');
        CheckStatic.prototype.spriteWidth = 8;
        CheckStatic.prototype.spriteHeight = 8;
        CheckStatic.prototype.spriteX = 0;
        CheckStatic.prototype.spriteY = 4;

        function CheckStatic(x, y) {
            CheckStatic.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);
        }

        return CheckStatic;

    })();
});

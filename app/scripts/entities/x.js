/*
    Entity: X
    Animated thing to indicate an incorrect answer!
*/
/*global define, $ */
define(['sprite'], function (Sprite) {
    'use strict';

    return (function() {
        // Inherit from the Extendable class
        Sprite.extend(X);

        X.prototype.width = 64;
        X.prototype.height = 64;

        // Sprite
        X.prototype.spriteSheet = $('img.gettable.gettable-chalkboard').attr('src');
        X.prototype.spriteWidth = 16;
        X.prototype.spriteHeight = 16;
        X.prototype.spriteX = 5;
        X.prototype.spriteY = 1;

        function X(x, y) {
            X.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);

            // Add the init animation and start it
            this.spriteAnimationAdd('init', 0, 1, 7, 0.15);
            this.spriteAnimate('init', 1);
        }

        return X;

    })();
});

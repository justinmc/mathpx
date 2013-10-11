/*global define */
define(["jquery"], function ($) {
    "use strict";

    return (function() {

        // DOM Objects
        Entity.prototype.obj = null;

        Entity.prototype.x = 0;
        Entity.prototype.y = 0;

        // Sprite
        Entity.prototype.spriteSheet = $("img.gettable.gettable-math").attr("src");
        Entity.prototype.spriteSize = 16;
        Entity.prototype.spriteX = 0;
        Entity.prototype.spriteY = 0;
        Entity.prototype.spriteScale = 4;
        Entity.prototype.loading = false;

        // Animation
        Entity.prototype.spriteAnimations = {};

        function Entity(x, y) {
            // Set the initial position
            this.x = x;
            this.y = y;

            // Create the image
            this.obj = new Image();

            // Load it's resource
            var me = this;
            this.obj.addEventListener("load", function() {
                me.loading = false;
            }, false);
            this.obj.src = this.spriteSheet;
            this.loading = true;
        }

        // Draw the entity in the given context at the given coordinates
        Entity.prototype.render = function(ctx, dt) {
            if (!this.loading) {
                var image = this.obj;
                var sx = this.spriteX * this.spriteSize;
                var sy = this.spriteY * this.spriteSize;
                var sWidth = this.spriteSize;
                var sHeight = this.spriteSize;
                var dx = this.x;
                var dy = this.y;
                var dWidth = this.spriteSize * this.spriteScale;
                var dHeight = this.spriteSize * this.spriteScale;
                ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
        };

        // Define a new sprite animation with the given names and frames in the sprite sheet
        Entity.prototype.spriteAnimationAdd = function(name, fromX, fromY, toX) {
            this.spriteAnimations.push(name, fromX, fromY, toX);
        };

        // Run an animation
        Entity.prototype.spriteAnimate = function(name) {

        };

        return Entity;

    })();
});

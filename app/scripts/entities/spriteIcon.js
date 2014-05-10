/*
    Entity: Sprite: SpriteIcon
    Graphical button
*/
/*global define */
define(['jquery'], function ($) {
    'use strict';

    return (function() {
        hoopty.entities.Sprite.extend(SpriteIcon);

        SpriteIcon.prototype.strokeStyle = 'rgb(255, 255, 255)';
        SpriteIcon.prototype.fillStyle = 'rgb(91, 131, 78)';
        SpriteIcon.prototype.qOffset = 16;

        SpriteIcon.prototype.width = 32;
        SpriteIcon.prototype.height = 32;
        SpriteIcon.prototype.spriteWidth = 16;
        SpriteIcon.prototype.spriteHeight = 16;
        SpriteIcon.prototype.spriteSheetSelector = 'img.gettable-icons';
        SpriteIcon.prototype.callback = null;

        function SpriteIcon(x, y, spriteX, spriteY, callback) {
            this.callback = callback;

            // Get the spritesheet
            this.spriteSheet = $(this.spriteSheetSelector).attr('src');

            SpriteIcon.__super__.constructor.call(this, x, y, this.width, this.height, this.spriteSheet, spriteX, spriteY, this.spriteWidth, this.spriteHeight);

            // Add the click animation
            this.spriteAnimationAdd('click', this.spriteX, this.spriteY, 3, 0.05);
        }

        SpriteIcon.prototype.render = function(ctx, dt) {
            // Draw the rectangle
            ctx.strokeStyle = this.strokeStyle;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.quadraticCurveTo(this.x + this.width, this.y - this.qOffset, this.x + this.width, this.y);
            ctx.quadraticCurveTo(this.x + this.width + this.qOffset, this.y + this.height, this.x + this.width, this.y + this.height);
            ctx.quadraticCurveTo(this.x + this.width / 2, this.y + this.height + this.qOffset, this.x, this.y + this.height);
            ctx.quadraticCurveTo(this.x - this.qOffset, this.y + this.height / 4, this.x - 4, this.y - 10);
            ctx.stroke();
            ctx.fillStyle = this.fillStyle;
            ctx.fill();

            // Draw the sprite
            SpriteIcon.__super__.render.call(this, ctx, dt);
        };

        // SpriteIcon click event, has to check if click was inside the button!
        SpriteIcon.prototype.click = function(event, scene) {
            if (hoopty.scenes.Scene.isInside(scene.getEventCoords(event), this) && this.display) {
                var me = this;
                this.spriteAnimate('click', 1, function() {
                    me.callback(event);
                });
            }
        };

        return SpriteIcon;

    })();
});

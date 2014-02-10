/*
    Entity: Text: Button: ButtonPx
    Mathpx style button
*/
/*global define */
define(['jquery', 'scene', 'button'], function ($, Scene, Button) {
    'use strict';

    return (function() {
        Button.extend(ButtonPx);

        ButtonPx.prototype.width = 190;
        ButtonPx.prototype.height = 40;
        ButtonPx.prototype.padding = 16;
        ButtonPx.prototype.font = '20px \'Press Start 2P\'';
        ButtonPx.prototype.fillStyle = 'rgb(255, 255, 255)';
        ButtonPx.prototype.fillStyleButton = 'rgb(91, 131, 78)';
        ButtonPx.prototype.strokeStyle = 'rgb(255, 255, 255)';
        ButtonPx.prototype.qOffset = 16;

        function ButtonPx(x, y, text, callback, width, height, fillStyle) {
            if (!width) {
                width = this.width;
            }
            if (!height) {
                height = this.height;
            }
            if (!fillStyle) {
                fillStyle = this.fillStyle;
            }

            ButtonPx.__super__.constructor.call(this, x, y, width, height, text, this.font, fillStyle, callback, this.padding, this.strokeStyle);
        }

        ButtonPx.prototype.render = function(ctx, dt) {
            // Draw the rectangle
            ctx.strokeStyle = this.strokeStyle;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.quadraticCurveTo(this.x + this.width, this.y - this.qOffset, this.x + this.width, this.y);
            ctx.quadraticCurveTo(this.x + this.width + this.qOffset, this.y + this.height, this.x + this.width, this.y + this.height);
            ctx.quadraticCurveTo(this.x + this.width / 2, this.y + this.height + this.qOffset, this.x, this.y + this.height);
            ctx.quadraticCurveTo(this.x - this.qOffset, this.y + this.height / 4, this.x - 4, this.y - 10);
            ctx.stroke();
            ctx.fillStyle = this.fillStyleButton;
            ctx.fill();

            // Draw the text
            if (this.font !== null) {
                ctx.font = this.font;
            }
            ctx.fillStyle = this.fillStyle;
            ctx.fillText(this.text, this.x + this.padding, this.y + 2 * this.height / 3, this.width - this.padding * 2);
        };

        // ButtonPx click event, has to check if click was inside the button!
        ButtonPx.prototype.click = function(event, scene) {
            if (Scene.isInside(scene.getEventCoords(event), this) && this.display) {
                this.callback(event);
            }
        };

        return ButtonPx;

    })();
});

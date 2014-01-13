/*
    Entity: Text: Button
    Creates a text object with an outline around it
*/
/*global define */
define(['jquery', 'scene', 'text'], function ($, Scene, Text) {
    'use strict';

    return (function() {
        Text.extend(Button);

        Text.prototype.callback = null;
        Text.prototype.scene = null;
        Text.prototype.height = null;
        Text.prototype.padding = 16;
        Text.prototype.strokeStyle = 'rgb(0, 0, 0)';

        function Button(x, y, width, height, text, font, fillStyle, callback, padding, strokeStyle) {
            Button.__super__.constructor.call(this, x, y, width, text, font, fillStyle);

            // Necessary to pass in parameters
            this.callback = callback;
            this.height = height;

            // Optional parameters
            if (typeof padding !== 'undefined') {
                this.padding = padding;
            }
            if (typeof strokeStyle !== 'undefined') {
                this.strokeStyle = strokeStyle;
            }
        }

        Button.prototype.render = function(ctx, dt) {
            // Draw the rectangle
            ctx.strokeStyle = this.strokeStyle;
            ctx.strokeRect(this.x, this.y, this.width, this.height);

            // Draw the text
            if (this.font !== null) {
                ctx.font = this.font;
            }
            ctx.fillStyle = this.fillStyle;
            ctx.fillText(this.text, this.x + this.padding, this.y + 2 * this.height / 3, this.width - this.padding * 2);
        };

        // Button click event, has to check if click was inside the button!
        Button.prototype.click = function(event, scene) {
            if (Scene.isInside(scene.getEventCoords(event), this) && this.display) {
                this.callback(event);
            }
        };

        return Button;

    })();
});

/*
    Entity: Text: TextPx
    The typical text setup for Mathpx
*/
/*global define */
define([], function () {
    'use strict';

    return (function() {
        hoopty.entities.Text.extend(TextPx);

        TextPx.prototype.font = '28px \'Press Start 2P\'';
        TextPx.prototype.fillStyle = 'rgb(255, 255, 255)';

        function TextPx(x, y, width, text, font, fillStyle, textAlign) {
            if (!font) {
                font = this.font;
            }
            if (!fillStyle) {
                fillStyle = this.fillStyle;
            }

            TextPx.__super__.constructor.call(this, x, y, width, text, font, fillStyle, textAlign);
        }

        return TextPx;

    })();
});

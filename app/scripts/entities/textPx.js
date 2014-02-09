/*
    Entity: Text: TextPx
    The typical text setup for Mathpx
*/
/*global define */
define(['text'], function (Text) {
    'use strict';

    return (function() {
        Text.extend(TextPx);

        TextPx.prototype.font = '28px \'Press Start 2P\'';
        TextPx.prototype.fillStyle = 'rgb(255, 255, 255)';

        function TextPx(x, y, width, text, font, fillStyle) {
            if (!font) {
                font = this.font;
            }
            if (!fillStyle) {
                fillStyle = this.fillStyle;
            }

            TextPx.__super__.constructor.call(this, x, y, width, text, font, fillStyle);
        }

        return TextPx;

    })();
});

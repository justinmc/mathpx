/*
    Entity: TextMultiline
    Creates a text object
*/
/*global define */
define(['text'], function (Text) {
    'use strict';

    return (function() {
        Text.extend(TextMultiline);

        TextMultiline.prototype.charsPerLine = 80;
        TextMultiline.prototype.lineHeight = 30;

        // The text split into lines
        TextMultiline.prototype.textArray = [];

        function TextMultiline(x, y, width, text, font, fillStyle, charsPerLine, lineHeight) {
            TextMultiline.__super__.constructor.call(this, x, y, width, text, font, fillStyle);

            if (typeof charsPerLine !== 'undefined') {
                this.charsPerLine = charsPerLine;
            }
            if (typeof lineHeight !== 'undefined') {
                this.lineHeight = lineHeight;
            }

            // Create the text array
            var textWords = this.text.split(' ');
            var line = 0;
            while (textWords.length) {
                this.textArray[line] = textWords.shift();
                while (this.textArray[line] && (typeof textWords[0] !== 'undefined') && (this.textArray[line] + textWords[0]).length < this.charsPerLine) {
                    this.textArray[line] += ' ' + textWords.shift();
                }
                line++;
            }
        }

        TextMultiline.prototype.render = function(ctx, dt) {
            if (this.font !== null) {
                ctx.font = this.font;
            }
            ctx.fillStyle = this.fillStyle;

            for (var i = 0; i < this.textArray.length; i++) {
                ctx.fillText(this.textArray[i], this.x, this.y + i * this.lineHeight, this.width);
            }
        };

        return TextMultiline;

    })();
});

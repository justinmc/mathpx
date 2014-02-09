/*
    Entity: Text: TextPx: TextTitle
    Mathpx title
*/
/*global define */
define(['textPx'], function (TextPx) {
    'use strict';

    return (function() {
        TextPx.extend(TextTitle);

        TextTitle.prototype.font = '28px \'Press Start 2P\'';
        TextTitle.prototype.fillStyle = 'rgb(255, 255, 255)';

        function TextTitle(x, y, width, text) {
            TextTitle.__super__.constructor.call(this, x, y, width, text, this.font, this.fillStyle);
        }

        return TextTitle;

    })();
});

/*
    Entity: Text: TextPx: TextPxTitle
    The Mathpx text in the corner on each page
*/
/*global define */
define(['textPx'], function (TextPx) {
    'use strict';

    return (function() {
        TextPx.extend(TextPxTitle);

        TextPxTitle.prototype.x = 700;
        TextPxTitle.prototype.y = 70;
        TextPxTitle.prototype.width = 200;
        TextPxTitle.prototype.text = 'Mathpx';
        TextPxTitle.prototype.font = '20px \'Press Start 2P\'';

        function TextPxTitle() {
            TextPxTitle.__super__.constructor.call(this, this.x, this.y, this.width, this.text, this.font);
        }

        return TextPxTitle;

    })();
});

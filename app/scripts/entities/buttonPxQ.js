/*
    Entity: Text: Button: ButtonPx: ButtonPxQ
    Mathpx challenge question button
*/
/*global define */
define(['jquery', 'buttonPx'], function ($, ButtonPx) {
    'use strict';

    return (function() {
        ButtonPx.extend(ButtonPxQ);

        ButtonPxQ.prototype.width = 100;
        ButtonPxQ.prototype.fillStyle = 'rgb(255, 255, 255)';

        function ButtonPxQ(x, y, text, callback) {
            ButtonPxQ.__super__.constructor.call(this, x, y, text, callback);
        }

        return ButtonPxQ;

    })();
});

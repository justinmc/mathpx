/*
    Entity: Text: Button: ButtonPx: Back
    Mathpx back button
*/
/*global define */
define(['jquery', 'buttonPx'], function ($, ButtonPx) {
    'use strict';

    return (function() {
        ButtonPx.extend(ButtonBack);

        ButtonBack.prototype.x = 56;
        ButtonBack.prototype.y = 40;
        ButtonBack.prototype.width = 60;
        ButtonBack.prototype.height = 40;
        ButtonBack.prototype.text = '<-';
        ButtonBack.prototype.fillStyle = 'rgb(190, 190, 227)';

        function ButtonBack(callback) {
            ButtonBack.__super__.constructor.call(this, this.x, this.y, this.text, callback);
        }

        return ButtonBack;

    })();
});

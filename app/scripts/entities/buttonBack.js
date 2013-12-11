/*
    Entity: Text: Button: Back
    Standard back button
*/
/*global define */
define(["jquery", "button"], function ($, Button) {
    "use strict";

    return (function() {
        Button.extend(ButtonBack);

        ButtonBack.prototype.x = 50;
        ButtonBack.prototype.y = 40;
        ButtonBack.prototype.width = 60;
        ButtonBack.prototype.height = 40;
        ButtonBack.prototype.text = "<-";
        ButtonBack.prototype.font = "20px 'Press Start 2P'";
        ButtonBack.prototype.fillStyle = "rgb(255, 255, 255)";
        ButtonBack.prototype.padding = 16;
        ButtonBack.prototype.strokeStyle = "rgb(255, 255, 255)";

        function ButtonBack(callback) {
            ButtonBack.__super__.constructor.call(this, this.x, this.y, this.width, this.height, this.text, this.font, this.fillStyle, callback, this.padding, this.strokeStyle);
        }

        return ButtonBack;

    })();
});

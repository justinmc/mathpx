/*
    Entity: Text
    Creates a text object
*/
/*global define */
define(["jquery", "entity"], function ($, Entity) {
    "use strict";

    return (function() {
        Entity.extend(Text);

        Text.prototype.text = "";
        Text.prototype.font = null;
        Text.prototype.fillStyle = "rgb(0, 0, 0)";

        function Text(x, y, width, text, font, fillStyle) {
            if (typeof text !== "undefined") {
                this.text = text;
            }
            if (typeof font !== "undefined") {
                this.font = font;
            }
            if (typeof fillStyle !== "undefined") {
                this.fillStyle = fillStyle;
            }
            Text.__super__.constructor.call(this, x, y, width, 0);
        }

        Text.prototype.render = function(ctx, dt) {
            if (this.font !== null) {
                ctx.font = this.font;
            }
            ctx.fillStyle = this.fillStyle;

            ctx.fillText(this.text, this.x, this.y, this.width);
        };

        return Text;

    })();
});

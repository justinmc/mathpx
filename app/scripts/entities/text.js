/*global define */
define(["jquery", "entity"], function ($, Entity) {
    "use strict";

    return (function() {
        // Inherit from the Extendable class
        Entity.extend(Text);

        Text.prototype.text = "";

        function Text(x, y, width, text) {
            this.text = text;
            Text.__super__.constructor.call(this, x, y, width, 0);
        }

        // Draw the entity in the given context at the given coordinates
        Text.prototype.render = function(ctx, dt) {
            ctx.font = "20px 'Press Start 2P'";
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillText(this.text, this.x, this.y, this.width);
        };

        return Text;

    })();
});

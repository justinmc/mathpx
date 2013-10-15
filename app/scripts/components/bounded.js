/*
    Component: Bounded
    Prevents moving outside the canvas
*/
/*global define */
define(["jquery", "component"], function ($, Component) {
    "use strict";

    return (function() {
        // Inherit from the Component class
        Component.extend(Bounded);

        // The name to refer to this component
        Bounded.prototype.name = "Bounded";

        function Bounded(entity, EntityTypeDrag) {
            this.EntityTypeDrag = EntityTypeDrag;

            Bounded.__super__.constructor.call(this, entity);
        }

        Bounded.prototype.preRender = function(event, engine) {
            // North Edge
            if (this.entity.y < 0) {
                this.entity.y = 0;
            }

            // East Edge
            if (this.entity.x + this.entity.width > engine.ctx.canvas.width) {
                this.entity.x = engine.ctx.canvas.width - this.entity.width;
            }

            // South Edge
            if (this.entity.y + this.entity.height > engine.ctx.canvas.height) {
                this.entity.y = engine.ctx.canvas.height - this.entity.height;
            }

            // West Edge
            if (this.entity.x < 0) {
                this.entity.x = 0;
            }
        };

        return Bounded;

    })();
});


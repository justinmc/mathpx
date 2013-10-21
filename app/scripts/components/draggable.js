/*
    Component: Draggable
    Makes the entity draggable with the mouse
*/
/*global define */
define(["jquery", "scene", "component"], function ($, Scene, Component) {
    "use strict";

    return (function() {
        // Inherit from the Component class
        Component.extend(Draggable);

        // The name to refer to this component
        Draggable.prototype.name = "Draggable";

        Draggable.prototype.draggingX = null;
        Draggable.prototype.draggingY = null;

        function Draggable(entity) {
            Draggable.__super__.constructor.call(this, entity);
        }

        Draggable.prototype.mousedown = function(event, scene) {
            if (scene.dragging === false) {
                var coords = scene.getEventCoords(event);

                // Check to see if the entity was clicked, and start dragging it if so
                if (Scene.isInside(coords, this.entity)) {
                    scene.dragging = true;
                    this.draggingX = coords.x - this.entity.x;
                    this.draggingY = coords.y - this.entity.y;
                }
            }
        };

        Draggable.prototype.mousemove = function(event, scene) {
            // Drag if needed
            if ((this.draggingX !== null) && (this.draggingY !== null)) {
                var coords = scene.getEventCoords(event);
                this.entity.x = coords.x - this.draggingX;
                this.entity.y = coords.y - this.draggingY;
            }
        };

        Draggable.prototype.mouseup = function(event, scene) {
            // Release a drag if needed
            if ((this.draggingX !== null) && (this.draggingY !== null)) {
                scene.dragging = false;
                var coords = scene.getEventCoords(event);
                this.entity.x = coords.x - this.draggingX;
                this.entity.y = coords.y - this.draggingY;
                this.draggingX = null;
                this.draggingY = null;
            }
        };

        return Draggable;

    })();
});


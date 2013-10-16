/*
    Component: DragCreate
    On drag, creates a new draggable entity and drags it
    Ala getting something from a toolbar
*/
/*global define */
define(["jquery", "num", "component"], function ($, Num, Component) {
    "use strict";

    return (function() {
        // Inherit from the Component class
        Component.extend(DragCreate);

        // The name to refer to this component
        DragCreate.prototype.name = "DragCreate";

        // The entity type to be created on drag
        DragCreate.prototype.EntityTypeDrag = null;

        function DragCreate(entity, EntityTypeDrag) {
            this.EntityTypeDrag = EntityTypeDrag;

            DragCreate.__super__.constructor.call(this, entity);
        }

        DragCreate.prototype.mousedown = function(event, engine) {
            var coords = engine.getEventCoords(event);

            // Check to see if the entity was clicked
            if (engine.isInside(coords, this.entity)) {
                // Create the new entity
                var dragging = engine.entityAdd(new this.EntityTypeDrag(this.entity.x, this.entity.y));
                dragging.components.Draggable.draggingX = coords.x - this.entity.x;
                dragging.components.Draggable.draggingY = coords.y - this.entity.y;
            }
        };

        return DragCreate;

    })();
});


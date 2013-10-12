/*global define */
define(["component"], function (Component) {
    "use strict";

    return (function() {
        Component.extend(Draggable);

        function Draggable() {
        }

        Draggable.prototype.mouseup = function() {
            
        };

        return Draggable;

    })();
});


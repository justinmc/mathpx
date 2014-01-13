/*global define */
define(['extendable'], function (Extendable) {
    'use strict';

    return (function() {
        // Inherit from the Extendable class
        Extendable.extend(Component);

        // The entity that is assigned this component
        Component.prototype.entity = {};

        // The name to refer to this component
        Component.prototype.name = 'Component';

        function Component(entity) {
            this.entity = entity;
        }

        // Functions called when the entity receives the given event
        Component.prototype.respondEvents = {};

        return Component;

    })();
});


require.config({
    paths: {
        jquery: "../bower_components/jquery/jquery",
        bootstrap: "vendor/bootstrap",
        draggable: "components/draggable",
        dragCreate: "components/dragCreate",
        num: "entities/num",
        numNeg: "entities/numNeg",
    },
    shim: {
        bootstrap: {
            deps: ["jquery"],
            exports: "jquery"
        }
    }
});

require(["app", "extendable", "engine", "entity", "num", "numNeg", "component", "draggable", "dragCreate", "jquery", "bootstrap"], function (App, Extendable, Engine, Entity, Num, NumNeg, Component, Draggable, DragCreate, $) {
    "use strict";

    $(function() {

        new App();

    });

});

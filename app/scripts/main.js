require.config({
    paths: {
        jquery: "../bower_components/jquery/jquery",
        bootstrap: "vendor/bootstrap",
        draggable: "components/draggable",
        dragCreate: "components/dragCreate",
        bounded: "components/bounded",
        sprite: "entities/sprite",
        num: "entities/num",
        numNeg: "entities/numNeg",
        text: "entities/text",
    },
    shim: {
        bootstrap: {
            deps: ["jquery"],
            exports: "jquery"
        }
    }
});

require(["app", "extendable", "engine", "entity", "text", "sprite", "num", "numNeg", "component", "draggable", "dragCreate", "bounded", "jquery", "bootstrap"], function (App, Extendable, Engine, Entity, Text, Sprite, Num, NumNeg, Component, Draggable, DragCreate, Bounded, $) {
    "use strict";

    $(function() {

        new App();

    });

});

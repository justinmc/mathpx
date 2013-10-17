require.config({
    paths: {
        jquery: "../bower_components/jquery/jquery",
        bootstrap: "vendor/bootstrap",
        sprite: "entities/sprite",
        num: "entities/num",
        numNeg: "entities/numNeg",
        trash: "entities/trash",
        text: "entities/text",
        draggable: "components/draggable",
        dragCreate: "components/dragCreate",
        bounded: "components/bounded",
        collision: "components/collision",
    },
    shim: {
        bootstrap: {
            deps: ["jquery"],
            exports: "jquery"
        }
    }
});

require(["app", "extendable", "engine", "entity", "text", "sprite", "num", "numNeg", "trash", "component", "draggable", "dragCreate", "bounded", "collision", "jquery", "bootstrap"], function (App, Extendable, Engine, Entity, Text, Sprite, Num, NumNeg, Trash, Component, Draggable, DragCreate, Bounded, Collision, $) {
    "use strict";

    $(function() {

        new App();

    });

});

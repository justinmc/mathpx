require.config({
    paths: {
        jquery: "../bower_components/jquery/jquery",
        bootstrap: "vendor/bootstrap",
        draggable: "components/draggable",
    },
    shim: {
        bootstrap: {
            deps: ["jquery"],
            exports: "jquery"
        }
    }
});

require(["app", "engine", "entity", "component", "draggable", "jquery", "bootstrap"], function (App, Engine, Entity, Component, Draggable, $) {
    "use strict";

    $(function() {

        new App();

    });

});

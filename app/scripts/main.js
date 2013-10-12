require.config({
    paths: {
        jquery: "../bower_components/jquery/jquery",
        bootstrap: "vendor/bootstrap"
    },
    shim: {
        bootstrap: {
            deps: ["jquery"],
            exports: "jquery"
        }
    }
});

require(["app", "entity", "component", "jquery", "bootstrap"], function (App, Entity, Component, $) {
    "use strict";

    $(function() {

        new App();

    });

});

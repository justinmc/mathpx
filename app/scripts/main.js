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

require(["app", "entity", "jquery", "bootstrap"], function (App, Entity, $) {
    "use strict";

    $(function() {

        new App();

    });

});

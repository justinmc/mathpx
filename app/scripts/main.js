require.config({
    paths: {
        jquery: "../bower_components/jquery/jquery",
        bootstrap: "vendor/bootstrap",
        underscore: "../bower_components/underscore-amd/underscore-min",
        backbone: "../bower_components/backbone-amd/backbone-min",
        question: "models/question",
        questions: "collections/questions",
        histories: "collections/histories",
        play: "scenes/play",
        playAdd: "scenes/playAdd",
        playSub: "scenes/playSub",
        start: "scenes/start",
        menu: "scenes/menu",
        menuChallenges: "scenes/menuChallenges",
        menuChallengesAdd: "scenes/menuChallengesAdd",
        loading: "scenes/loading",
        startChalk: "entities/startChalk",
        sprite: "entities/sprite",
        text: "entities/text",
        num: "entities/num",
        numNeg: "entities/numNeg",
        trash: "entities/trash",
        check: "entities/check",
        x: "entities/x",
        button: "entities/button",
        tween: "components/tween",
        draggable: "components/draggable",
        dragCreate: "components/dragCreate",
        bounded: "components/bounded",
        collision: "components/collision",
    },
    shim: {
        bootstrap: {
            deps: ["jquery"],
            exports: "jquery"
        },
        backbone: {
            deps: ["underscore"],
        },
    }
});

require([
    "app",
	"jquery",
    "requestAnimationFrame.polyfill",
	"bootstrap"
],
function (app, $) {
    "use strict";

    $(function() {

        app.start();

    });

});

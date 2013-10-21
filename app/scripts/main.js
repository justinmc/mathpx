require.config({
    paths: {
        jquery: "../bower_components/jquery/jquery",
        bootstrap: "vendor/bootstrap",
        play: "scenes/play",
        start: "scenes/start",
        menu: "scenes/menu",
        loading: "scenes/loading",
        startChalk: "entities/startChalk",
        sprite: "entities/sprite",
        num: "entities/num",
        numNeg: "entities/numNeg",
        trash: "entities/trash",
        text: "entities/text",
        button: "entities/button",
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

require([
    "app",
    "extendable",
	"engine",
	"scene",
	"play",
	"start",
    "loading",
	"menu",
	"entity",
	"startChalk",
	"text",
    "button",
	"sprite",
	"num",
	"numNeg",
	"trash",
	"component",
	"draggable",
	"dragCreate",
	"bounded",
	"collision",
	"jquery",
	"bootstrap"
],
function (
    App,
	Extendable,
	Engine,
	Scene,
	Play,
	Start,
	Menu,
    Loading,
	Entity,
	StartChalk,
	Text,
    Button,
	Sprite,
	Num,
	NumNeg,
	Trash,
	Component,
	Draggable,
	DragCreate,
	Bounded,
	Collision,
	$) {

    "use strict";

    $(function() {

        new App();

    });

});

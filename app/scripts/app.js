/*global define */
define(["jquery", "histories", "engine", "start", "play", "playAdd", "playSub", "menu", "loading", "entity", "text", "num", "numNeg", "trash"], function ($, Histories, Engine, Start, Play, PlayAdd, PlaySub, Menu, Loading, Entity, Text, Num, NumNeg, Trash) {
    "use strict";

    var AppObj = (function() {

        // DOM Objects
        App.prototype.canvas = null;
        App.prototype.ctx = null;
        App.prototype.container = null;

        // Config
        App.prototype.width = 960;
        App.prototype.height = 482;
        App.prototype.widthSmall = 480;
        App.prototype.heightSmall = 258; // or 224!

        // Engine
        App.prototype.engine = null;

        // The time of the most recently completed render
        App.prototype.timeThen = null;

        // Game
        App.prototype.histories = null;

        function App() {
            // Create a new histories collection
            this.histories = new Histories();
        }

        // Start the app (after DOM is ready)
        App.prototype.start = function() {
            // Get the canvas
            this.canvas = $("canvas")[0];
            this.ctx = this.canvas.getContext("2d");

            // Get the container div
            this.container = $(".container");

            // Set the canvas size
            this.sizeCanvas();

            // Get the urls of all the resources needed to load
            var urls = [];
            $("img.gettable").each(function() {
                urls.push(this.src);
            });

            // Start the engine
            this.engine = new Engine(this.canvas);
            this.engine.sceneAdd(new Loading(this.engine, urls));
            this.engine.sceneAdd(new Start(this.engine));
            this.engine.sceneAdd(new Menu(this.engine));
            this.engine.sceneAdd(new Play(this.engine));
            this.engine.sceneAdd(new PlayAdd(this.engine));
            this.engine.sceneAdd(new PlaySub(this.engine));
            this.engine.sceneActive = "Loading";

            // Start the main game loop
            this.timeThen = Date.now();
            this.render();
        };

        // The main loop called at each iteration of the game
        App.prototype.render = function() {
            (this.renderFactory())();
        };

        // Return an instance of the main function
        App.prototype.renderFactory = function() {
            var me = this;
            return function() {
                // Get the changed time in seconds since last render
                var timeNow = Date.now();
                var dt = (timeNow - me.timeThen) / 1000.0;

                // Set the canvas size in case screen size/orientation changed
                me.sizeCanvas();

                // Reset the canvas
                me.canvas.width = me.canvas.width;

                // Disable image smoothing for pixel art
                me.ctx.imageSmoothingEnabled = false;
                me.ctx.mozImageSmoothingEnabled = false;
                me.ctx.webkitImageSmoothingEnabled = false;

                // Render the game engine
                me.engine.render(dt);

                // Continue the loop
                me.timeThen = timeNow;
                window.requestAnimationFrame(me.renderFactory());
            };
        };

        App.prototype.sizeCanvas = function() {
            // Size the canvas to the user's screen
            if (window.innerWidth < this.width || window.innerHeight < this.height) {
                this.ctx.canvas.width = this.widthSmall;
                this.ctx.canvas.height = this.heightSmall;
            }
            else {
                this.ctx.canvas.width = this.width;
                this.ctx.canvas.height = this.height;
            }

            // Position the container
            $(this.container).css("margin-top", -1 * $(this.container).height() / 2);
        };

        return App;
    })();

    return new AppObj();
});

/*global define */
define(["jquery", "engine", "entity", "num", "component", "draggable", "dragCreate"], function ($, Engine, Entity, Num, Component, Draggable, DragCreate) {
    "use strict";

    return (function() {

        // DOM Objects
        App.prototype.canvas = null;
        App.prototype.ctx = null;
        App.prototype.container = null;

        // Config
        App.prototype.width = 960;
        App.prototype.height = 482;
        App.prototype.widthSmall = 480;
        App.prototype.heightSmall = 258;

        // Engine
        App.prototype.engine = null;

        // Game stuff
        App.prototype.entities = [];
        App.prototype.draggingNumber = null;
        App.prototype.draggingX = null;
        App.prototype.draggingY = null;

        // The time of the most recently completed render
        App.prototype.timeThen = null;

        function App() {
            // Get the canvas
            this.canvas = $("canvas")[0];
            this.ctx = this.canvas.getContext("2d");

            // Get the container div
            this.container = $(".container");

            // Size the canvas to the user"s screen
            this.ctx.canvas.width = this.width;
            this.ctx.canvas.height = this.height;

            // Position the container
            $(this.container).css("margin-top", -1 * $(this.container).height() / 2);

            // Start the engine
            this.engine = new Engine(this.canvas);

            // Create the toolbar 
            var num = new Num(100, this.ctx.canvas.height - 80, true);
            num.componentAdd(new DragCreate(num, Num));
            this.engine.entityAdd(num);

            // Create numbers
            this.engine.entityAdd(new Num(0, 0, false));
            this.engine.entityAdd(new Num(200, 200, false));

            // Start the main game loop
            this.timeThen = Date.now();
            this.render();
        }

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

                // Reset the canvas
                me.canvas.width = me.canvas.width;

                // Disable image smoothing for pixel art
                me.ctx.imageSmoothingEnabled = false;
                me.ctx.mozImageSmoothingEnabled = false;
                me.ctx.webkitImageSmoothingEnabled = false;

                // Set the background
                me.ctx.fillStyle = "rgb(255, 255, 255)";
                me.ctx.fillRect (0, 0, me.ctx.canvas.width, me.ctx.canvas.height);

                // Render the game engine
                me.engine.render(dt);

                // Continue the loop
                me.timeThen = timeNow;
                window.requestAnimationFrame(me.renderFactory());
            };
        };

        // Returns the width of the user"s browser window
        App.prototype.getWindowWidth = function() {
            return window.innerWidth;
        };

        // Returns the height of the user"s browser window
        App.prototype.getWindowHeight = function() {
            return window.innerHeight;
        };

        // Returns true if the coords are inside the object, false otherwise
        App.prototype.isInside = function(coords, entity) {
            if ((coords.x >= entity.x) && (coords.x <= entity.x + entity.getWidth())) {
                if ((coords.y >= entity.y) && (coords.y <= entity.y + entity.getHeight())) {
                    return true;
                }
            }
            return false;
        };

        return App;
    })();
});

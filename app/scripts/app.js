/*global define */
define(["jquery", "engine", "entity", "text", "num", "numNeg"], function ($, Engine, Entity, Text, Num, NumNeg) {
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
        App.prototype.textLeft = null;
        App.prototype.textSign = null;
        App.prototype.textRight = null;
        App.prototype.textEquals = null;
        App.prototype.textAnswer = null;

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

            // Create the number bar
            this.textLeft = this.engine.entityAdd(new Text(Math.round(this.ctx.canvas.width / 6), 40, 100, "0"));
            this.textSign = this.engine.entityAdd(new Text(Math.round(this.ctx.canvas.width / 3), 40, 100, "+"));
            this.textRight = this.engine.entityAdd(new Text(Math.round(this.ctx.canvas.width / 2), 40, 100, "0"));
            this.textEquals = this.engine.entityAdd(new Text(Math.round(2 * this.ctx.canvas.width / 3), 40, 100, "="));
            this.textAnswer = this.engine.entityAdd(new Text(Math.round(5 * this.ctx.canvas.width / 6), 40, 100, "0"));

            // Create the toolbar 
            this.engine.entityAdd(new Text(70, this.ctx.canvas.height - 40, 100, "+"));
            this.engine.entityAdd(new Num(100, this.ctx.canvas.height - 80, true));
            this.engine.entityAdd(new Text(210, this.ctx.canvas.height - 40, 100, "-"));
            this.engine.entityAdd(new NumNeg(240, this.ctx.canvas.height - 80, true));

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

                // Display the correct numbers and signs
                var leftCount = me.getLeftCount();
                var rightCount = me.getRightCount();
                me.textLeft.text = leftCount;
                if (rightCount < 0) {
                    me.textSign.text = "-";
                }
                else {
                    me.textSign.text = "+";
                }
                me.textRight.text = Math.abs(rightCount);
                me.textAnswer.text = leftCount + rightCount;

                // Render the game engine
                me.engine.render(dt);

                // Continue the loop
                me.timeThen = timeNow;
                window.requestAnimationFrame(me.renderFactory());
            };
        };

        App.prototype.getLeftCount = function() {
            var count = 0;
            var me = this;
            this.engine.entities.forEach(function(entity) {
                if (entity.x < me.ctx.canvas.width / 3) {
                    if ("value" in entity) {
                        count += entity.value;
                    }
                }
            });

            return count;
        };

        App.prototype.getRightCount = function() {
            var count = 0;
            var me = this;
            this.engine.entities.forEach(function(entity) {
                if ((entity.x > me.ctx.canvas.width / 3) && (entity.x < 2 * me.ctx.canvas.width / 3)) {
                    if ("value" in entity) {
                        count += entity.value;
                    }
                }
            });

            return count;
        };

        return App;
    })();
});

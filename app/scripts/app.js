/*global define */
define(['jquery', 'backbone', 'histories', 'router', 'start', 'num', 'numNeg', 'trash', 'menu'], function ($, Backbone, Histories, Router, Start, Num, NumNeg, Trash, Menu) {
    'use strict';

    var AppObj = (function() {

        // DOM Objects
        App.prototype.canvas = null;
        App.prototype.ctx = null;
        App.prototype.container = null;

        // Config
        App.prototype.width = 960;
        App.prototype.height = 482;
        App.prototype.margin = 32;

        // Engine
        App.prototype.engine = null;

        // Backbone router
        App.prototype.router = null;

        // The time of the most recently completed render
        App.prototype.timeThen = null;
        App.prototype.frameCount = 0;
        App.prototype.frameCountTime = null;

        // Game
        App.prototype.histories = null;

        function App() {
            // Create a new histories collection
            this.histories = new Histories();
        }

        // Start the app (after DOM is ready)
        App.prototype.start = function() {
            // Get the canvas
            this.canvas = $('canvas')[0];
            this.ctx = this.canvas.getContext('2d');

            // Get the container div
            this.container = $('.container');

            // Set the canvas size
            this.ctx.canvas.width = this.width;
            this.ctx.canvas.height = this.height;
            this.ctx.canvas.style.width = this.width + 'px';

            // Get the urls of all the resources needed to load
            var urls = [];
            $('img.gettable').each(function() {
                urls.push(this.src);
            });

            // Start the engine
            this.engine = new hoopty.Engine(this.canvas, this.changeScenesCallback());

            // Start the router
            this.router = new Router(this.engine);
            Backbone.history.start({pushState: false});

            // Start the main game loop
            this.timeThen = Date.now();
            this.render();
        };

        // The main loop called at each iteration of the game
        App.prototype.render = function() {
            // Get the changed time in seconds since last render
            var timeNow = Date.now();
            var dt = (timeNow - this.timeThen) / 1000.0;

            // Set the frame rate on the screen
            /*if (this.frameCountTime === null) {
                this.frameCountTime = timeNow;
            }
            else if (timeNow - this.frameCountTime >= 1000) {
                $('.framecount').html(++this.frameCount + 'fps');
                this.frameCountTime = null;
                this.frameCount = 0;
            }
            else {
                this.frameCount++;
            }*/

            // Set the canvas size in case screen size/orientation changed
            this.ctx.canvas.style.width = this.getCanvasWidthSized() + 'px';

            // Position the container
            $(this.container).css('margin-top', -1 * $(this.container).height() / 2);

            // Reset the canvas
            this.canvas.width = this.canvas.width;

            // Disable image smoothing for pixel art
            this.ctx.imageSmoothingEnabled = false;
            this.ctx.mozImageSmoothingEnabled = false;
            this.ctx.webkitImageSmoothingEnabled = false;

            // Render the game engine
            this.engine.render(dt);

            // Continue the loop
            this.timeThen = timeNow;
            window.requestAnimationFrame(this.render.bind(this));
        };

        App.prototype.changeScenesCallback = function() {
            var me = this;
            return function(scene) {
                me.router.navigate(scene.route);
            };
        };

        // Get the proper size of the canvas width in order to fit the screen
        App.prototype.getCanvasWidthSized = function() {
            var widthCanvas = window.innerWidth - this.margin;
            var heightCanvas = widthCanvas * this.height / this.width;
            if (heightCanvas > window.innerHeight - this.margin) {
                heightCanvas = window.innerHeight - this.margin;
                widthCanvas = this.width * heightCanvas / this.height;
            }

            return widthCanvas;
        };

        return App;
    })();

    return new AppObj();
});

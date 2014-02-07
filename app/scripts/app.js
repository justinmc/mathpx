/*global define */
define(['jquery', 'backbone', 'histories', 'engine', 'router', 'start', 'loading', 'entity', 'text', 'num', 'numNeg', 'trash'], function ($, Backbone, Histories, Engine, Router, Start, Loading, Entity, Text, Num, NumNeg, Trash) {
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
            this.engine = new Engine(this.canvas, this.changeScenesCallback());
            this.engine.sceneAdd(new Loading(this.engine, urls, 'Start'), 'Loading');
            this.engine.sceneAdd(new Start(this.engine), 'Start');
            /*this.engine.sceneAdd(new Menu(this.engine));
            this.engine.sceneAdd(new MenuChallenges(this.engine));
            this.engine.sceneAdd(new MenuChallengesAdd(this.engine));
            this.engine.sceneAdd(new Play(this.engine));
            this.engine.sceneAdd(new PlayAdd(this.engine));
            this.engine.sceneAdd(new PlaySub(this.engine));
            */

            // Start the router
            this.router = new Router(this.engine);
            Backbone.history.start({pushState: false});

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

                // Set the frame rate on the screen
                if (me.frameCountTime === null) {
                    me.frameCountTime = timeNow;
                }
                else if (timeNow - me.frameCountTime >= 1000) {
                    $('.framecount').html(++me.frameCount + 'fps');
                    me.frameCountTime = null;
                    me.frameCount = 0;
                }
                else {
                    me.frameCount++;
                }

                // Set the canvas size in case screen size/orientation changed
                me.ctx.canvas.style.width = me.getCanvasWidthSized() + 'px';

                // Position the container
                $(me.container).css('margin-top', -1 * $(me.container).height() / 2);

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

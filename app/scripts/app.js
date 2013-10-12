/*global define */
define(["jquery", "entity"], function ($, Entity) {
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

        // Game stuff
        App.prototype.numbers = [];
        App.prototype.draggingNumber = null;
        App.prototype.draggingX = null;
        App.prototype.draggingY = null;

        // The time of the most recently completed render
        App.prototype.timeThen = null;

        function App() {
            // Create the canvas
            this.canvas = document.createElement("canvas");
            this.ctx = this.canvas.getContext("2d");

            // Create the container div
            this.container = document.createElement("div");
            this.container.className = "container";

            // Size the canvas to the user"s screen
            this.ctx.canvas.width = this.width;
            this.ctx.canvas.height = this.height;

            // Position the container
            $(this.container).css("margin-top", -1 * this.ctx.canvas.height / 2);

            // Create numbers
            this.numbers.push(new Entity(0, 0));
            this.numbers.push(new Entity(200, 200));

            // Clear the document and insert the cavnas
            document.body.innerHTML = "";
            this.container.appendChild(this.canvas);
            document.body.appendChild(this.container);

            // Add event listeners
            var me = this;
            $(this.canvas).on("mousedown", function(e) {
                var coords = me.getEventCoords(e);

                // Check to see if a number was clicked, and start dragging it if so
                me.numbers.forEach(function(elt, i) {
                    if (me.isInside(coords, elt)) {
                        me.draggingNumber = i;
                        me.draggingX = coords.x - elt.x;
                        me.draggingY = coords.y - elt.y;
                    }
                });
            });
            $(this.canvas).on("mousemove", function(e) {
                // Drag if needed
                if (me.draggingNumber != null) {
                    var coords = me.getEventCoords(e);
                    var dragging = me.numbers[me.draggingNumber];
                    dragging.x = coords.x - me.draggingX;
                    dragging.y = coords.y - me .draggingY;
                }
            });
            $(this.canvas).on("mouseup", function(e) {
                // Release a drag if needed
                if (me.draggingNumber != null) {
                    var coords = me.getEventCoords(e);
                    var dragging = me.numbers[me.draggingNumber];
                    dragging.x = coords.x - me.draggingX;
                    dragging.y = coords.y - me.draggingY;
                    me.draggingNumber = null;
                }
            });

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

                // Render entities
                me.numbers.forEach(function(elt) {
                    elt.render(me.ctx, dt);
                });

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

        // Gets the coordinates of an event on the canvas relative to the canvas
        App.prototype.getEventCoords = function(event) {
            var totalOffsetX = 0;
            var totalOffsetY = 0;
            var canvasX = 0;
            var canvasY = 0;
            var currentElement = this.canvas;

            do{
                totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
                totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
            }
            while(currentElement = currentElement.offsetParent)

            canvasX = event.pageX - totalOffsetX;
            canvasY = event.pageY - totalOffsetY;

            return {x:canvasX, y:canvasY}
        }

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

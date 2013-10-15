/*global define */
define(["jquery", "extendable"], function ($, Extendable) {
    "use strict";

    return (function() {
        // Inherit from the Extendable class
        Extendable.extend(Entity);

        // DOM Objects
        Entity.prototype.obj = null;

        // Canvas Rendering
        Entity.prototype.display = true;
        Entity.prototype.x = 0;
        Entity.prototype.y = 0;
        Entity.prototype.width = 0;
        Entity.prototype.height = 0;

        // Sprite
        Entity.prototype.spriteSheet = null;
        Entity.prototype.spriteX = 0;
        Entity.prototype.spriteY = 0;
        Entity.prototype.spriteX = 0;
        Entity.prototype.spriteY = 0;
        Entity.prototype.spriteXDefault = 0;
        Entity.prototype.spriteYDefault = 0;
        Entity.prototype.loading = false;

        // Animation
        Entity.prototype.spriteAnimations = {};
        Entity.prototype.spriteAnimation = null;
        Entity.prototype.spriteAnimationTime = null;

        // Components
        Entity.prototype.components = {};

        function Entity(x, y, width, height, spriteSheet, spriteX, spriteY, spriteWidth, spriteHeight) {
            // Set passed in args
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.spriteSheet = spriteSheet;
            this.spriteX = spriteX;
            this.spriteY = spriteY;
            this.spriteHeight = spriteHeight;
            this.spriteWidth = spriteWidth;
            this.spriteXDefault = spriteX;
            this.spriteYDefault = spriteY;

            // Create the object
            this.obj = new Image();

            // Load it's resource
            var me = this;
            this.obj.addEventListener("load", function() {
                me.loading = false;
            }, false);
            this.obj.src = this.spriteSheet;
            this.loading = true;

            // Reset objects (for a deep copy)
            this.components = {};
            this.spriteAnimations = {};
        }

        // Draw the entity in the given context at the given coordinates
        Entity.prototype.render = function(ctx, dt) {
            if (!this.loading) {
                // Handle sprite animations if needed
                if (this.spriteAnimation !== null) {
                    this.spriteAnimationTime += dt;
                    var animation = this.spriteAnimations[this.spriteAnimation];
                    var framesLength = animation.toX - animation.fromX + 1;

                    // If the animation has ended...
                    if (this.spriteAnimationTime > animation.period * framesLength) {
                        // If we have a set number of repetitions
                        if (this.spriteAnimationRepetitions > 0) {
                            this.spriteAnimationRepetitions--;
                            // If we've finished animating, reset the parameters
                            if (this.spriteAnimationRepetitions === 0) {
                                this.spriteAnimation = null;
                                this.spriteAnimationTime = null;
                                this.spriteX = this.spriteXDefault;
                                this.spriteY = this.spriteYDefault;
                            }
                            // Otherwise reset the animation
                            else {
                                this.spriteAnimationTime = 0;
                            }
                        }
                        else {
                            this.spriteAnimationTime = 0;
                        }
                    }
                    // Otherwise make sure the current frame is correct
                    else {
                        var frame = Math.floor(this.spriteAnimationTime / animation.period);
                        this.spriteX = animation.fromX + frame;
                        this.spriteY = animation.fromY;
                    }
                }

                var image = this.obj;
                var sx = this.spriteX * this.spriteWidth;
                var sy = this.spriteY * this.spriteHeight;
                var sWidth = this.spriteWidth;
                var sHeight = this.spriteHeight;
                var dx = this.x;
                var dy = this.y;
                var dWidth = this.width;
                var dHeight = this.height;
                ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
        };

        // Add a component
        Entity.prototype.componentAdd = function(component) {
            this.components[component.name] = component;
        };

        // Define a new sprite animation with the given names and frames in the sprite sheet
        Entity.prototype.spriteAnimationAdd = function(name, fromX, fromY, toX, period) {
            this.spriteAnimations[name] = {fromX: fromX, fromY: fromY, toX: toX, period: period};
        };

        // Run an animation
        Entity.prototype.spriteAnimate = function(name, repetitions) {
            if (repetitions === null) {
                repetitions = -1;
            }
            this.spriteAnimationRepetitions = repetitions;
            this.spriteAnimation = name;
            this.spriteAnimationTime = 0;
        };

        // Stop the running animation
        Entity.prototype.spriteAnimateStop = function() {
            this.spriteAnimation = null;
            this.spriteAnimationTime = null;
        };

        return Entity;

    })();
});

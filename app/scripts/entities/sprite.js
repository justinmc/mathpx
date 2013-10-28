/*global define */
define(["jquery", "entity"], function ($, Entity) {
    "use strict";

    return (function() {
        // Inherit from the Extendable class
        Entity.extend(Sprite);

        Sprite.prototype.obj = null;

        // Sprite
        Sprite.prototype.spriteSheet = null;
        Sprite.prototype.spriteX = 0;
        Sprite.prototype.spriteY = 0;
        Sprite.prototype.spriteXDefault = 0;
        Sprite.prototype.spriteYDefault = 0;
        Sprite.prototype.loading = false;

        // Animation
        Sprite.prototype.spriteAnimations = {};
        Sprite.prototype.spriteAnimation = null;
        Sprite.prototype.spriteAnimationTime = null;
        Sprite.prototype.spriteAnimationCallback = null;

        function Sprite(x, y, width, height, spriteSheet, spriteX, spriteY, spriteWidth, spriteHeight) {
            Sprite.__super__.constructor.call(this, x, y, width, height);

            // Set passed in args
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
            this.spriteAnimations = {};
        }

        // Draw the entity in the given context at the given coordinates
        Sprite.prototype.render = function(ctx, dt) {
            if (!this.loading) {
                // Handle sprite animations if needed for next frame
                if (this.spriteAnimation !== null) {
                    this.spriteAnimationTime += dt;
                    var animation = this.spriteAnimations[this.spriteAnimation];
                    var framesLength = animation.toX - animation.fromX + 1;

                    // If the animation has ended...
                    if (this.spriteAnimationTime > animation.period * framesLength) {
                        // If we have a set number of repetitions
                        if (this.spriteAnimationRepetitions > 0) {
                            this.spriteAnimationRepetitions--;
                            // If we've finished animating
                            if (this.spriteAnimationRepetitions === 0) {
                                // Call the callback if needed
                                if (this.spriteAnimationCallback !== null) {
                                    this.spriteAnimationCallback({type: "spriteAnimationEnd"}, this);
                                }

                                // Reset parameters
                                this.spriteAnimation = null;
                                this.spriteAnimationTime = null;
                                this.spriteAnimationCallback = null;
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

                // Render the image on the scene
                if (this.display) {
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
            }
        };

        // Define a new sprite animation with the given names and frames in the sprite sheet
        Sprite.prototype.spriteAnimationAdd = function(name, fromX, fromY, toX, period) {
            this.spriteAnimations[name] = {fromX: fromX, fromY: fromY, toX: toX, period: period};
        };

        // Run an animation
        Sprite.prototype.spriteAnimate = function(name, repetitions, callback) {
            if (typeof callback !== "undefined") {
                this.spriteAnimationCallback = callback;
            }
            if (repetitions === null) {
                repetitions = -1;
            }
            this.spriteAnimationRepetitions = repetitions;
            this.spriteAnimation = name;
            this.spriteAnimationTime = 0;
        };

        // Stop the running animation
        Sprite.prototype.spriteAnimateStop = function() {
            this.spriteAnimation = null;
            this.spriteAnimationTime = null;
            this.spriteX = this.spriteXDefault;
            this.spriteY = this.spriteYDefault;
        };

        return Sprite;

    })();
});

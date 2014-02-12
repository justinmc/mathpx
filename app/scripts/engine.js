/*global define, alert */
define(['jquery', 'scene'], function ($, Scene) {
    'use strict';

    return (function() {

        // DOM Objects
        Engine.prototype.canvas = null;
        Engine.prototype.ctx = null;

        // Scenes
        Engine.prototype.scenes = {};
        Engine.prototype.sceneActive = null;
        Engine.prototype.changeScenesCallback = null;
        Engine.prototype.sceneChanging = false;

        function Engine(canvas, changeScenesCallback) {
            // Save the changeScenes callback if given
            if (changeScenesCallback !== null) {
                this.changeScenesCallback = changeScenesCallback;
            }

            // Reset scenes
            Engine.prototype.scenes = {};

            // Save the canvas and context
            this.canvas = canvas;
            this.ctx = this.canvas.getContext('2d');

            // Add event listeners
            var me = this;
            $(this.canvas).on('mousedown', function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(this.canvas).on('mousemove', function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(this.canvas).on('mouseup', function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(this.canvas).on('click', function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(this.canvas).on('touchstart', function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(this.canvas).on('touchmove', function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(this.canvas).on('touchend', function(event) {
                me.getSceneActive().eventFire(event);
            });
            $(document).on('keyup', function(event) {
                me.getSceneActive().eventFire(event);
            });
        }

        // Call at each frame
        Engine.prototype.render = function(dt) {
            // Render the current scene
            this.getSceneActive().render(this.ctx, dt);
        };

        // Create a new scene
        Engine.prototype.sceneAdd = function(scene, name) {
            this.scenes[name] = scene;
            // tongue twister
            this.scenes[name].name = name;
        };

        // Destroy a scene
        Engine.prototype.sceneDestroy = function(name) {
            delete this.scenes[name];
        };

        // Gets the active scene
        Engine.prototype.getSceneActive = function() {
            return this.scenes[this.sceneActive];
        };

        // Changes to the new scene
        Engine.prototype.changeScenes = function(sceneName, SceneType, preserveSelf) {
            // Only change scenes if a valid sceneName was given
            if (sceneName !== null && sceneName !== this.sceneActive && !this.sceneChanging) {
                var sceneCurrent = this.sceneActive;

                // If the scene doesn't already exist and SceneType was given, create it
                if (!this.scenes.hasOwnProperty(sceneName) && SceneType !== null) {
                    this.sceneAdd(new SceneType(this), sceneName);
                }

                // If everything went well, change scenes
                if (this.scenes.hasOwnProperty(sceneName)) {
                    this.sceneChanging = true;

                    var me = this;
                    // Wait 50ms to avoid 'flash' between scenes
                    window.setTimeout(function() {
                        me.sceneActive = sceneName;

                        // Destroy the current scene unless preserveSelf
                        if ((preserveSelf === null || !preserveSelf) && sceneCurrent !== null) {
                            console.log('destroy ', sceneCurrent);
                            me.scenes[sceneCurrent].destroy();
                        }

                        // Call the callback if it was given
                        if (me.changeScenesCallback !== null) {
                            me.changeScenesCallback(me.getSceneActive());
                        }

                        me.sceneChanging = false;
                    }, 50);
                }
            }
        };

        return Engine;
    })();
});

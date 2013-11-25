/*global define, alert */
define(["backbone"], function (Backbone) {
    "use strict";

    return Backbone.Router.extend({

        routes: {
            "":                     "start",
            "main":                 "main",
            "challenges":           "challenges",
            "challenges/add":       "challengesAdd",
            "challenges/add/play":  "challengesAddPlay",
            "challenges/sub":       "challengesSub",
            "challenges/sub/play":  "challengesSub",
            "play":                 "play",
            "free":                 "free",
            "about":                "about",
            "*path":                "start"
        },

        // Must be created with an engine so that scenes can be changed
        initialize: function(engine) {
           this.engine = engine; 
        },

        start: function() {
            this.engine.scenes["Loading"].sceneNameChangeTo = "Start";
            this.engine.changeScenes("Loading");
        },

        main: function() {
            this.engine.scenes["Loading"].sceneNameChangeTo = "Menu";
            this.engine.changeScenes("Loading");
        },

        challenges: function() {
            this.engine.scenes["Loading"].sceneNameChangeTo = "MenuChallenges";
            this.engine.changeScenes("Loading");
        },

        challengesAdd: function() {
            this.engine.scenes["Loading"].sceneNameChangeTo = "MenuChallengesAdd";
            this.engine.changeScenes("Loading");
        },

        challengesAddPlay: function() {
            this.engine.scenes["Loading"].sceneNameChangeTo = "PlayAdd";
            this.engine.changeScenes("Loading");
        },

        challengesSub: function() {
            this.engine.scenes["Loading"].sceneNameChangeTo = "MenuChallengesSub";
            this.engine.changeScenes("Loading");
        },

        challengesSubPlay: function() {
            this.engine.scenes["Loading"].sceneNameChangeTo = "PlaySub";
            this.engine.changeScenes("Loading");
        },

        play: function() {
            this.engine.scenes["Loading"].sceneNameChangeTo = "Play";
            this.engine.changeScenes("Loading");
        },

    });
});

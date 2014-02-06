/*global define, alert */
define(['backbone', 'start', 'menu', 'menuChallenges', 'menuChallengesQuestionsAdd', 'menuChallengesQuestionsSub', 'menuChallengesQuestionsAddNeg', 'menuChallengesQuestionsSubNeg', 'play', 'playAdd', 'playAddNeg', 'playSub', 'playSubNeg', 'victory'], function (Backbone, Start, Menu, MenuChallenges, MenuChallengesQuestionsAdd, MenuChallengesQuestionsSub, MenuChallengesQuestionsAddNeg, MenuChallengesQuestionsSubNeg, Play, PlayAdd, PlayAddNeg, PlaySub, PlaySubNeg, Victory) {
    'use strict';

    return Backbone.Router.extend({

        routes: {
            '':                         'start',
            'main':                     'main',
            'challenges':               'challenges',
            'challenges/add':           'challengesAdd',
            'challenges/add/play':      'challengesAddPlay',
            'challenges/sub':           'challengesSub',
            'challenges/sub/play':      'challengesSubPlay',
            'challenges/addneg':        'challengesAddNeg',
            'challenges/addneg/play':   'challengesAddNegPlay',
            'challenges/subneg':        'challengesSubNeg',
            'challenges/subneg/play':   'challengesSubNegPlay',
            'play':                     'play',
            'free':                     'free',
            'about':                    'about',
            'victory':                  'victory',
            '*path':                    'start'
        },

        // Must be created with an engine so that scenes can be changed
        initialize: function(engine) {
            this.engine = engine;
        },

        start: function() {
            this.changeSceneTo('Start', Start);
        },

        main: function() {
            this.changeSceneTo('Menu', Menu);
        },

        challenges: function() {
            this.changeSceneTo('MenuChallenges', MenuChallenges);
        },

        challengesAdd: function() {
            this.changeSceneTo('MenuChallengesQuestionsAdd', MenuChallengesQuestionsAdd);
        },

        challengesAddPlay: function() {
            this.changeSceneTo('PlayAdd', PlayAdd);
        },

        challengesSub: function() {
            this.changeSceneTo('MenuChallengesQuestionsSub', MenuChallengesQuestionsSub);
        },

        challengesSubPlay: function() {
            this.changeSceneTo('PlaySub', PlaySub);
        },

        challengesAddNeg: function() {
            this.changeSceneTo('MenuChallengesQuestionsAddNeg', MenuChallengesQuestionsAddNeg);
        },

        challengesAddNegPlay: function() {
            this.changeSceneTo('PlayAddNeg', PlayAddNeg);
        },

        challengesSubNeg: function() {
            this.changeSceneTo('MenuChallengesQuestionsSubNeg', MenuChallengesQuestionsSubNeg);
        },

        challengesSubNegPlay: function() {
            this.changeSceneTo('PlaySubNeg', PlaySubNeg);
        },

        play: function() {
            this.changeSceneTo('Play', Play);
        },

        victory: function() {
            this.changeSceneTo('Victory', Victory);
        },

        // Change the scene to the given scene via loading
        changeSceneTo: function(name, Type) {
            // If the scene doesn't already exist, create it
            if (!this.engine.scenes.hasOwnProperty(name)) {
                this.engine.sceneAdd(new Type(this.engine), name);
            }

            // Change to the scene
            this.engine.scenes.Loading.sceneNameChangeTo = name;
            this.engine.changeScenes('Loading');
        },

    });
});

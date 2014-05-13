/*global define, alert */
define(['jquery', 'backbone', 'start', 'menu', 'about', 'menuLearning', 'menuChallenges', 'menuChallengesQuestionsAdd', 'menuChallengesQuestionsSub', 'menuChallengesQuestionsAddNeg', 'menuChallengesQuestionsSubNeg', 'playQuiz', 'play', 'playAdd', 'playAddNeg', 'playSub', 'playSubNeg', 'victoryAdd', 'victorySub', 'victoryAddNeg', 'victorySubNeg'], function ($, Backbone, Start, Menu, About, MenuLearning, MenuChallenges, MenuChallengesQuestionsAdd, MenuChallengesQuestionsSub, MenuChallengesQuestionsAddNeg, MenuChallengesQuestionsSubNeg, PlayQuiz, Play, PlayAdd, PlayAddNeg, PlaySub, PlaySubNeg, VictoryAdd, VictorySub, VictoryAddNeg, VictorySubNeg) {
    'use strict';

    return Backbone.Router.extend({

        routes: {
            '':                         'start',
            'main':                     'main',
            'learning':                 'learning',
            'learning/play':            'learning',
            'learning/quiz':            'learning',
            'challenges':               'challenges',
            'challenges/add':           'challengesAdd',
            'challenges/add/play':      'challengesAddPlay',
            'challenges/add/quiz':      'quiz',
            'challenges/add/victory':   'victoryAdd',
            'challenges/sub':           'challengesSub',
            'challenges/sub/play':      'challengesSubPlay',
            'challenges/sub/quiz':      'quiz',
            'challenges/sub/victory':   'victorySub',
            'challenges/addneg':        'challengesAddNeg',
            'challenges/addneg/play':   'challengesAddNegPlay',
            'challenges/addneg/quiz':      'quiz',
            'challenges/addneg/victory':'victoryAddNeg',
            'challenges/subneg':        'challengesSubNeg',
            'challenges/subneg/play':   'challengesSubNegPlay',
            'challenges/subneg/quiz':      'quiz',
            'challenges/subneg/victory':'victorySubNeg',
            'quiz':                     'quiz',
            'play':                     'play',
            'free':                     'free',
            'about':                    'about',
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

        learning: function() {
            this.changeSceneTo('MenuLearning', MenuLearning);
        },

        about: function() {
            this.changeSceneTo('About', About);
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

        quiz: function() {
            this.changeSceneTo('PlayQuiz', PlayQuiz);
        },

        play: function() {
            this.changeSceneTo('Play', Play);
        },

        victoryAdd: function() {
            this.changeSceneTo('VictoryAdd', VictoryAdd);
        },

        victorySub: function() {
            this.changeSceneTo('VictorySub', VictorySub);
        },

        victoryAddNeg: function() {
            this.changeSceneTo('VictoryAddNeg', VictoryAddNeg);
        },

        victorySubNeg: function() {
            this.changeSceneTo('VictorySubNeg', VictorySubNeg);
        },

        // Change the scene to the given scene via loading
        changeSceneTo: function(name, Type) {
            // If the scene doesn't already exist, create it
            if (!this.engine.scenes.hasOwnProperty(name)) {
                this.engine.sceneAdd(new Type(this.engine), name);
            }

            // Change to the scene via Loading
            if (!this.engine.scenes.hasOwnProperty(hoopty.scenes.Loading.name)) {
                var urls = [];
                $('img.gettable').each(function(i, img) {
                    urls.push($(img).attr('src'));
                });
                var loading = new hoopty.scenes.Loading(this.engine, urls, name);
                this.engine.sceneAdd(loading, loading.name);
            }
            else {
                this.engine.scenes.Loading.sceneNameChangeTo = name;
            }
            this.engine.changeScenes('Loading', hoopty.scenes.Loading);
            this.engine.sceneActive = 'Loading';
        },

    });
});

require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        underscore: '../bower_components/underscore-amd/underscore-min',
        backbone: '../bower_components/backbone-amd/backbone-min',
        localstorage: 'vendor/backbone.localStorage-min',
        question: 'models/question',
        questions: 'collections/questions',
        histories: 'collections/histories',
        play: 'scenes/play',
        playAdd: 'scenes/playAdd',
        playAddNeg: 'scenes/playAddNeg',
        playSub: 'scenes/playSub',
        playSubNeg: 'scenes/playSubNeg',
        start: 'scenes/start',
        menu: 'scenes/menu',
        menuChallenges: 'scenes/menuChallenges',
        menuChallengesQuestions: 'scenes/menuChallengesQuestions',
        menuChallengesQuestionsAdd: 'scenes/menuChallengesQuestionsAdd',
        menuChallengesQuestionsSub: 'scenes/menuChallengesQuestionsSub',
        menuChallengesQuestionsAddNeg: 'scenes/menuChallengesQuestionsAddNeg',
        menuChallengesQuestionsSubNeg: 'scenes/menuChallengesQuestionsSubNeg',
        victory: 'scenes/victory',
        loading: 'scenes/loading',
        startChalk: 'entities/startChalk',
        chalkTTT: 'entities/chalkTTT',
        chalkHeart: 'entities/chalkHeart',
        sprite: 'entities/sprite',
        text: 'entities/text',
        num: 'entities/num',
        numNeg: 'entities/numNeg',
        trash: 'entities/trash',
        check: 'entities/check',
        checkStatic: 'entities/checkStatic',
        x: 'entities/x',
        xStatic: 'entities/xStatic',
        button: 'entities/button',
        buttonBack: 'entities/buttonBack',
        tween: 'components/tween',
        draggable: 'components/draggable',
        dragCreate: 'components/dragCreate',
        bounded: 'components/bounded',
        collision: 'components/collision',
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        backbone: {
            deps: ['underscore'],
        },
    }
});

require([
    'app',
    'jquery',
    'backbone',
    'requestAnimationFrame.polyfill',
    'bootstrap'
],
function (app, $, Backbone) {
    'use strict';

    $(function() {

        app.start();

    });

});


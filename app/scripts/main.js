require.config({
    paths: {
        hoopty: 'vendor/hoopty.min',
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
        playQuiz: 'scenes/playQuiz',
        playLearning: 'scenes/playLearning',
        playQuizLearning: 'scenes/playQuizLearning',
        start: 'scenes/start',
        about: 'scenes/about',
        parents: 'scenes/parents',
        menu: 'scenes/menu',
        menuLearning: 'scenes/menuLearning',
        menuChallenges: 'scenes/menuChallenges',
        menuChallengesQuestions: 'scenes/menuChallengesQuestions',
        menuChallengesQuestionsAdd: 'scenes/menuChallengesQuestionsAdd',
        menuChallengesQuestionsSub: 'scenes/menuChallengesQuestionsSub',
        menuChallengesQuestionsAddNeg: 'scenes/menuChallengesQuestionsAddNeg',
        menuChallengesQuestionsSubNeg: 'scenes/menuChallengesQuestionsSubNeg',
        victory: 'scenes/victory',
        victoryAdd: 'scenes/victoryAdd',
        victorySub: 'scenes/victorySub',
        victoryAddNeg: 'scenes/victoryAddNeg',
        victorySubNeg: 'scenes/victorySubNeg',
        loading: 'scenes/loading',
        spriteIcon: 'entities/spriteIcon',
        startChalk: 'entities/startChalk',
        chalkTTT: 'entities/chalkTTT',
        chalkHeart: 'entities/chalkHeart',
        chalkHouse: 'entities/chalkHouse',
        text: 'entities/text',
        textMultiline: 'entities/textMultiline',
        textPx: 'entities/textPx',
        textPxTitle: 'entities/textPxTitle',
        num: 'entities/num',
        numNeg: 'entities/numNeg',
        trash: 'entities/trash',
        check: 'entities/check',
        checkStatic: 'entities/checkStatic',
        x: 'entities/x',
        xStatic: 'entities/xStatic',
        buttonPx: 'entities/buttonPx',
        buttonPxQ: 'entities/buttonPxQ',
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
    'hoopty',
    'requestAnimationFrame.polyfill',
    'bootstrap'
],
function (app, $, Backbone) {
    'use strict';

    $(function() {

        app.start();

    });

});


/*
    Backbone Collection: Histories
    Collection of History models
*/
/*global define */
define(['backbone', 'question'], function (Backbone, Question) {
    'use strict';

    return Backbone.Collection.extend({
        model: Question,
    });

});


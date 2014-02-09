/*
    Scene: Victory: VictoryAdd
    Addition Challenge VictoryAdd
*/
/*global define */
define(['victory', 'menuChallengesQuestionsAdd'], function (Victory, MenuChallengesQuestionsAdd) {
    'use strict';

    return (function() {
        Victory.extend(VictoryAdd);

        VictoryAdd.prototype.name = 'VictoryAdd';
        VictoryAdd.prototype.route = 'challenges/add/victory';

        VictoryAdd.prototype.nameSection = 'Simple Addition';
        VictoryAdd.prototype.nameMenu = 'MenuChallengesQuestionsAdd';
        VictoryAdd.prototype.TypeMenu = MenuChallengesQuestionsAdd;

        function VictoryAdd(engine, nameSection, nameMenu, TypeMenu) {
            VictoryAdd.__super__.constructor.call(this, engine, this.nameSection, this.nameMenu, this.TypeMenu);
        }

        return VictoryAdd;

    })();
});

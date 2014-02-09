/*
    Scene: Victory: VictorySubNeg
    Subtraction Neg Challenge Victory
*/
/*global define */
define(['victory', 'menuChallengesQuestionsSubNeg'], function (Victory, MenuChallengesQuestionsSubNeg) {
    'use strict';

    return (function() {
        Victory.extend(VictorySubNeg);

        VictorySubNeg.prototype.name = 'VictorySubNeg';
        VictorySubNeg.prototype.route = 'challenges/subneg/victory';

        VictorySubNeg.prototype.nameSection = 'Subtraction with Negatives';
        VictorySubNeg.prototype.nameMenu = 'Menu';
        VictorySubNeg.prototype.TypeMenu = MenuChallengesQuestionsSubNeg;

        function VictorySubNeg(engine, nameSection, nameMenu, TypeMenu) {
            VictorySubNeg.__super__.constructor.call(this, engine, this.nameSection, this.nameMenu, this.TypeMenu);
        }

        return VictorySubNeg;

    })();
});

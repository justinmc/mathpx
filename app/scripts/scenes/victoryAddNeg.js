/*
    Scene: Victory: VictoryAddNeg
    Addition Neg Challenge Victory
*/
/*global define */
define(['victory', 'menuChallengesQuestionsAddNeg'], function (Victory, MenuChallengesQuestionsAddNeg) {
    'use strict';

    return (function() {
        Victory.extend(VictoryAddNeg);

        VictoryAddNeg.prototype.name = 'VictoryAddNeg';
        VictoryAddNeg.prototype.route = 'challenges/addneg/victory';

        VictoryAddNeg.prototype.nameSection = 'Addition with Negatives';
        VictoryAddNeg.prototype.nameMenu = 'Menu';
        VictoryAddNeg.prototype.TypeMenu = MenuChallengesQuestionsAddNeg;

        function VictoryAddNeg(engine, nameSection, nameMenu, TypeMenu) {
            VictoryAddNeg.__super__.constructor.call(this, engine, this.nameSection, this.nameMenu, this.TypeMenu);
        }

        return VictoryAddNeg;

    })();
});


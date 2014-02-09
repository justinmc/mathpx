/*
    Scene: Victory: VictorySub
    Subtraction Challenge Victory
*/
/*global define */
define(['victory', 'menuChallengesQuestionsSub'], function (Victory, MenuChallengesQuestionsSub) {
    'use strict';

    return (function() {
        Victory.extend(VictorySub);

        VictorySub.prototype.name = 'VictorySub';
        VictorySub.prototype.route = 'challenges/sub/victory';

        VictorySub.prototype.nameSection = 'Simple Subtraction';
        VictorySub.prototype.nameMenu = 'MenuChallengesQuetsionsSub';
        VictorySub.prototype.TypeMenu = MenuChallengesQuestionsSub;

        function VictorySub(engine, nameSection, nameMenu, TypeMenu) {
            VictorySub.__super__.constructor.call(this, engine, this.nameSection, this.nameMenu, this.TypeMenu);
        }

        return VictorySub;

    })();
});

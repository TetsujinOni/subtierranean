(function(){
	'use strict';
	
	angular.module('subtierranean.calculator', []).factory('calculatorservice', calculator);
	
	calculator.$inject = [];
	
	function calculator(){
       
    var service  = {
        tierOneSeven: function(players) {
            var count = players.length;
            var allUnderSix = true;
            var allUnderFive = true;
            var allOverTwo = true;
            var total = 0;
            
            for (var i = 0; i < count; i++){
                var lvl = players[i].level;
                total += lvl;
                allUnderSix = allUnderSix && lvl < 6;
                allUnderFive = allUnderFive && lvl < 5;
                allOverTwo = allOverTwo && lvl > 2;
            }
            var lowTierWarn = "";
            var highTierWarn = "";
            if (!allUnderFive){
                lowTierWarn = " Level 5+ Too High"
            }
            if (!allOverTwo){
                highTierWarn = " Levels 1-2 Too Low"
            }

            if (total < count * 2.5) {
                return "Subtier 1-2" + lowTierWarn;
            }
            if (total === count * 2.5) {
                return (allUnderFive) ? "Players choose between 1-2 and 3-4" : "Subtier 3-4";
            }
            if (total < count * 3 && count < 6) {
                return  "Subtier 1-2" + (allUnderFive)? "" : "Level 5+ Too High";
            }

            if (total < count * 4.5) {
                return "Subtier 3-4";
            }
            if (total === count * 4.5){
                if (count < 6) { return "Subtier 3-4"}
            }
            if (total < count * 5.5) {
                if (count < 6) {
                    return "Subtier 3-4";
                }
            }
            if (total === count * 5.5 && count < 6) {
                
                return allOverTwo ? "Players choose between Subtier 3-4 and Subtier 6-7" : "Subtier 3-4";
            }
            if (allUnderSix) {
                return allOverTwo ?  "Players choose between Subtier 3-4 and Subtier 6-7" : "Subtier 3-4";
            }
            return "Subtier 6-7" + highTierWarn;
        }, 
        tierOneTwo: function(players) {
            var count = players.length;
            var total = totaller(players);

            if (total < count * 1.5) {
                return "Subtier 1";
            }
            if (total === count * 1.5) {
                return "Players choose between Subtier 1 and Subtier 2";
            }
            return "Tier 2";
        },
        tierTwelveFifteen: function(players) {
            var count = players.length;
            var total = totaller(players);

            if (total <= count * 13.5) {
                return "Subtier 12-13";
            }
            if (total === count * 13.5) {
                return "Players choose between Subtier 12-13 and Subtier 14-15";
            }
            return "Tier 14-15";
        },
        fiveLevelTierOld: function(min, max) {
            var choose = min + 1.5;
            var lowSubtier = "Subtier " + min + "-" + (min + 1);
            var highSubtier = "Subtier " + (max - 1) + "-" + max;
            var chooseSubtier = "Choose " + lowSubtier + " or " + highSubtier;

            return function(players) {
                var count = players.length;
                var total = 0;
                var allUnder = true;
                for (var i = 0; i < players.length; i++) {
                    var lvl = players[i].level;
                    total += lvl;
                    allUnder = allUnder && lvl < (max - 1);
                }

                if (total < count * choose) {
                    return lowSubtier;
                }
                if (total === count * choose) {
                    return chooseSubtier;
                }
                if (total <= count * (max-1)) {
                    if (count < 6) {
                        return lowSubtier;
                    }
                }
                if (allUnder) {
                    return chooseSubtier;
                }
                return highSubtier;
            };
        },
        seasonFourFiveLevelTier: function(min, max) {
            var chooseLow = min + 1.5;
            var chooseHigh = max - 1.5;
            
            var lowSubtier = "Subtier " + min + "-" + (min + 1);
            var highSubtier = "Subtier " + (max - 1) + "-" + max;
            var chooseSubtier = "Choose " + lowSubtier + " or " + highSubtier;
            
            var asFour = " as 4 PCs";
            var asSix = " as 6 PCs";
            
            return function(players) {
                var count = players.length;
                var total = 0;
                var allUnder = true;
                for (var i = 0; i < players.length; i++) {
                    var lvl = players[i].level;
                    total += lvl;
                    allUnder = allUnder && lvl < (max - 1);
                }
                if (total < count * chooseLow) {
                    return lowSubtier;
                }
                if (total === count * chooseLow) {
                    if (count < 5 ){
                        return "Choose " + lowSubtier + asFour + " or " + lowSubtier + asSix; 
                    }                      
                    return "Choose " + lowSubtier + asSix + " or " + highSubtier + asFour;
                }
                
                if (total < count * chooseHigh) {
                    if (count < 5) {
                        return lowSubtier + asSix;
                    }
                    return highSubtier + asFour;
                }
                if (total === count * chooseHigh) {
                    if (count < 5 ){
                        return "Choose " + lowSubtier + asSix + " or "  + highSubtier + asFour; 
                    }                      
                    return "Choose " + highSubtier + asFour + " or " + highSubtier + asSix;
                }
                
                return highSubtier;
            };
        }
    };

		return service;

    
    function totaller(players){
        var total = 0;
        for (var i =0;i<players.length;i++){
            total += players[i].level;
        }
        return total;
    };

	};
})();
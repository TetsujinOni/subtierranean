(function(){
	'use strict';
	
	angular
		.module('subtierranean')
		.factory('seasondata', SeasonData);
	SeasonData.$inject = [];
	
	function SeasonData(){
            function tier(label,min,max){
                var levels = [];
                for (var i =min; i<= max;i++){
                    levels.push(i);
                }
                return {label:label, min:min, max:max, levels:levels}
            };
            
            var tiers  = [
                tier('Tier 1-2', 1, 2),
                tier('Tier 1-5', 1, 5),
                tier('Tier 1-7', 1, 7),
                tier('Tier 3-7', 3, 7),
                tier('Tier 5-9', 5, 9),
                tier('Tier 7-11', 7, 11),
                tier('Tier 12-15', 12, 15)
            ];
            
            var seasons = [
                {label: 'Season 0', value: 0, tiers: [tiers[1], tiers[2], tiers[4], tiers[5]]},
                {label: 'Season 1', value: 1, tiers: [tiers[1], tiers[2], tiers[4], tiers[5]]},
                {label: 'Season 2: Year of the Shadow Lodge', value: 2, tiers: [tiers[1], tiers[2], tiers[4], tiers[5]]},
                {label: 'Season 3: Year of the Ruby Phoenix', value: 3, tiers: [tiers[1], tiers[3], tiers[4], tiers[5]]},
                {label: 'Season 4: Year of the Risen Rune', value: 4, tiers: [tiers[0], tiers[1], tiers[3], tiers[4], tiers[5]]},
                {label: 'Season 5: Year of the Demon', value: 5, tiers: [tiers[0], tiers[1], tiers[3], tiers[4], tiers[5]]},
                {label: 'Season 6: Year of the Sky Key', value: 6, tiers: [tiers[0], tiers[1], tiers[3], tiers[4], tiers[5]]},
                {label: 'Season 7: Year of the Serpent', value: 7, tiers: [tiers[0], tiers[1], tiers[3], tiers[4], tiers[5], tiers[6]]},
                {label: 'Season 8: Year of the Stolen Storm', value: 8, tiers: [tiers[0], tiers[1], tiers[3], tiers[4], tiers[5]]}
            ];
            
            return seasons;
	}
})();
(function(){
	'use strict';

	describe('calculatorservice factory', function(){
		beforeEach(module('subtierranean'));
		
		it('should contain a calculatorservice',
		inject(function(calculatorservice){
			expect(calculatorservice).not.toEqual(null);
		}));
		
		it('should contain a Season 0-2 Tier 1-7 calculator',
		inject(['calculatorservice', function(service){
			expect(service.tierOneSeven).not.toEqual(null)
		}]));
		
		it('should contain a Season 0-3 5-level-tier Calculator Factory',
		inject(['calculatorservice', function(service){
			expect(service.fiveLevelTierOld).not.toEqual(null)
			var tier59 = service.fiveLevelTierOld(5,9);
			function p(lvl){ return {level: lvl}};
			expect(tier59([ p(7), p(7), p(7), p(7)])).toEqual('Subtier 5-6');
			expect(tier59([ p(7), p(7), p(7), p(7), p(7), p(7), p(7)])).toEqual('Choose Subtier 5-6 or Subtier 8-9');
			expect(tier59([ p(8), p(9), p(8), p(9), p(7), p(7)])).toEqual('Subtier 8-9')
			
		}]));
		
		
		it('should contain a modern Tier 1-2 calculator',
		inject(['calculatorservice',function(service){
			expect(service.tierOneTwo).not.toEqual(null)
		}]));
	});
})();
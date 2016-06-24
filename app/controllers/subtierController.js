'use strict';
(function () {
    angular.module('subtierranean.subtier', ['subtierranean.calculator'])
        .controller('SubtierController', SubtierController);


    SubtierController.$init = ['$scope', 'calculatorservice', 'seasondata'];

    function SubtierController($scope, calculatorservice, seasondata) {
        var vm = $scope;
        vm.players = [];
        vm.seasons = seasondata;
        vm.season = vm.seasons[vm.seasons.length - 1];
        vm.tier = vm.season.tiers[0];
        vm.playerCount = '6';
        vm.totalLevels = totalLevels;
        vm.apl = averageLevel;
        vm.subtier = describeSubtier;

        $scope.$watch('playerCount', adjustPlayerList);
        $scope.$watch('season', setTierToMinimumInSeason);
        $scope.$watch('tier', setToTierMinimum);


        function totalLevels() {
            var total = 0;
            for (var i = 0; i < vm.players.length; i++) {
                total += vm.players[i].level;
            }
            return total;
        };


        function averageLevel() {
            return totalLevels() / vm.players.length
        }

        function describeSubtier() {
            var selectedTier = vm.tier;
            var players = vm.players;

            if (selectedTier.min === 1 && selectedTier.max === 2) {
                return calculatorservice.tierOneTwo(players);
            }

            if (selectedTier.min === 1 && selectedTier.max === 7) {
                return calculatorservice.tierOneSeven(players);
            }

            if (vm.season.value < 4) {
                return calculatorservice.fiveLevelTierOld(selectedTier.min, selectedTier.max)(players);
            }
            return calculatorservice.seasonFourFiveLevelTier(selectedTier.min, selectedTier.max)(players);
        };

        function adjustPlayerList(newValue) {
            var count = Number(newValue);
            if (vm.players.length > count) {
                vm.players.splice(count);
            }
            for (var i = vm.players.length; i < count; i++) {
                vm.players.push(Player());
            }
        }

        function setTierToMinimumInSeason(newValue) {
            if (!newValue) return;
            if (newValue.tiers.indexOf(vm.tier) < 0) {
                vm.tier = newValue.tiers[0];
            }
        }

        function setToTierMinimum(newValue) {
            vm.players.forEach(function (p) {
                p.level = vm.tier.min
            });
        }

        function Player() {
            return { level: vm.tier.min };
        };

    }
})();
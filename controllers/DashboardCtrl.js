angular
    .module('Wss.Controllers.DashboardCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('DashboardCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        '$location',
        '$window',
        function($scope, $state, $timeout, $localStorage, $rootScope, $location, $window) {
           
             $scope.changeState = function(state) {
                $state.go(state);
            }

        }
    ]);

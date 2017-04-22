angular
    .module('Wss.Controllers.OfferCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('OfferCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        '$location',
        '$window',
        function($scope, $state, $timeout, $localStorage, $rootScope, $location, $window) {


            $scope.upperMenuItems = [{
                'labelPl': 'Oferta',
                'activeStateRule': 'offer',
                'uiSref': 'offer'
            }];


            $scope.lowerMenuItems = [{
                'labelPl': 'Wyszukaj',
                'activeStateRule': 'search',
                'uiSref': 'search'
            }, {
                'labelPl': 'Zamówienie',
                'activeStateRule': 'order',
                'uiSref': 'order'
            }];



            $scope.changeState = function(state) {
                $state.go(state);
            }


        }
    ]);

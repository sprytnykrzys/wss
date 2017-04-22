angular
    .module('Wss.Controllers.AdminCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('AdminCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        '$location',
        '$window',
        function($scope, $state, $timeout, $localStorage, $rootScope, $location, $window) {

            $scope.upperMenuItems = [{
                'labelPl': 'Admin',
                'activeStateRule': 'admin',
                'uiSref': 'admin'
            }, {
                'labelPl': 'Oferta',
                'activeStateRule': 'offer',
                'uiSref': 'offer'
            }];


            $scope.lowerMenuItems = [{
                    'labelPl': 'Dashboard',
                    'activeStateRule': 'dashboard',
                    'uiSref': 'dashboard'
                }, {
                    'labelPl': 'Produkt',
                    'activeStateRule': 'product',
                    'uiSref': 'product'
                }, {
                    'labelPl': 'Zestaw',
                    'activeStateRule': 'set',
                    'uiSref': 'set'
                }, {
                    'labelPl': 'Katalog',
                    'activeStateRule': 'catalog',
                    'uiSref': 'catalog'
                }, {
                    'labelPl': 'Klient',
                    'activeStateRule': 'customer',
                    'uiSref': 'customer'
                }];



            $scope.changeState = function(state) {
                $state.go(state);
            }

        }
    ]);

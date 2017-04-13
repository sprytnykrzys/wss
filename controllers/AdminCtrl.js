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

            $rootScope.upperMenuItems = [{
                'labelPl': 'Admin',
                'activeStateRule': 'admin',
                'uiSref': 'admin',
            }, {
                'labelPl': 'Oferta',
                'activeStateRule': 'offer',
                'uiSref': 'offer',
            }];


            $rootScope.lowerMenutItems = [{
                'labelPl': 'Dashboard',
                'activeStateRule': '',
                'uiSref': 'dashboard',
                'parentState': 'admin'
            }, {
                'labelPl': 'Produkt',
                'activeStateRule': 'product',
                'uiSref': 'product',
                'parentState': 'admin'
            }, {
                'labelPl': 'Zestaw',
                'activeStateRule': 'set',
                'uiSref': 'set',
                'parentState': 'admin'
            }, {
                'labelPl': 'Katalog',
                'activeStateRule': 'catalog',
                'uiSref': 'catalog',
                'parentState': 'admin'
            }, {
                'labelPl': 'Klient',
                'activeStateRule': 'client',
                'uiSref': 'client',
                'parentState': 'admin'
            }, {
                'labelPl': 'Wyszukaj',
                'activeStateRule': 'search',
                'uiSref': 'search',
                'parentState': 'offer'
            }, {
                'labelPl': 'Zamówienie',
                'activeStateRule': 'order',
                'uiSref': 'order',
                'parentState': 'offer'
            }];



            $rootScope.changeState = function(state) {
                $state.go(state);
            }

        }
    ]);

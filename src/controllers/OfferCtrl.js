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


            $scope.menuItems = [{
                'labelPl': 'Admin',
                'activeStateRule': 'admin',
                'ifLogged': 'admin',
                'uiSref': 'admin'
            }, {
                'labelPl': 'Oferta',
                'activeStateRule': 'offer',
                'ifLogged': 'admin',
                'uiSref': 'offer'
            }, {
                'labelPl': 'Wyszukaj',
                'activeStateRule': 'search',
                'ifLogged': 'client',
                'uiSref': 'search'
            }, {
                'labelPl': 'Zamówienie',
                'activeStateRule': 'order',
                'ifLogged': 'client',
                'uiSref': 'order'
            }, {
                'labelPl': 'Wyloguj',
                'uiSref': 'logout'
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
            }, {
                'labelPl': 'Wyszukaj',
                'activeStateRule': 'search',
                // 'ifLogged': 'client',
                'uiSref': 'search'
            }, {
                'labelPl': 'Zamówienie',
                'activeStateRule': 'order',
                // 'ifLogged': 'client',
                'uiSref': 'order'
            }];


            $scope.changeState = function(state) {
                if (state == 'logout') {
                    $localStorage.user = null;
                    $rootScope.user = null;
                    $state.go('login');
                    swal({
                        title: 'Wylogowano!',
                        timer: 1200
                    })
                } else {
                    $state.go(state);
                }

            }


            $scope.verifyMenu = function(item) {
                if ($localStorage.user.who == item.ifLogged) {
                    return true;
                } else if (item.uiSref == 'logout') {
                    return true;
                } else {
                    return false;
                }
            }

            $scope.whichUser = function() {
                if ($localStorage.user.who == 'client') {
                    return false;
                } else {
                    return true;
                }
            }

        }
    ]);

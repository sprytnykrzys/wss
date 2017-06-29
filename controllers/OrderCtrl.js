angular
    .module('Wss.Controllers.OrderCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('OrderCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        '$location',
        '$window',
        'ContentSrvc',
        function($scope, $state, $timeout, $localStorage, $rootScope, $location, $window, ContentSrvc) {

            $scope.currentOrders = $localStorage.orders;
            $scope.userData = $localStorage.user;
            $scope.printOrder = function() {
                window.print();
            }
        }
    ]);

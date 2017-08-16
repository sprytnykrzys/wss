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

            $scope.getUsersFromAPI = function() {
                $scope.users = null;

                ContentSrvc.getUsers().then(function(data) {
                    $scope.users = data.data.users;

                }, function(data) {
                    swal({
                        title: 'Wystąpił błąd!',
                        timer: 1200
                    })
                });
            };

            $scope.getUsersFromAPI();

            $scope.currentOrders = $localStorage.orders;
            $scope.userData = $localStorage.user;
            $scope.printOrder = function() {
                window.print();
            }
            $scope.normalPrice = function(amount, price) {

                return amount * price;
            }

            $scope.discountPrice = function(price, amount) {

                for (var i = 0; i < $localStorage.users.length; i++) {

                    if ($localStorage.users[i].email == $localStorage.user.auth.email) {
                        $scope.discount = 1 - $localStorage.users[i].discount / 100;

                    }
                }
                if (amount) {
                    $scope.currPrice = price * $scope.discount;
                    return $scope.currPrice * amount;
                } else {
                    return price * $scope.discount;
                }

            }

            $scope.nPrice = 0;

            $scope.normalSum = function() {
                $scope.nPrice = 0;
                for (var i = 0; i < $localStorage.orders.length; i++) {
                    $scope.nPrice = $localStorage.orders[i].normalPrice + $scope.nPrice;
                }
                return $scope.nPrice;
            }

            $scope.discountSum = function() {
                return $scope.nPrice * $scope.discount;
            }


            $scope.setAmountOfSetProducts = function(index, set) {
                for (var i = 0; i < $localStorage.orders.length; i++) {
                    for (var j = 0; j < $localStorage.orders[i].products.length; j++) {
                        if ($localStorage.orders[i].products[j].name == set.name) {
                            $scope.amountOfSet = $localStorage.orders[i].products[j].amount;
                            for (var k = 0; k < $localStorage.orders[i].products[j].products.length; k++) {
                                $localStorage.orders[i].products[j].products[k].quantity_by_set = $localStorage.orders[i].products[j].products[k].quantity * $scope.amountOfSet;
                            }
                        }
                    }
                }
            }
        }
    ]);
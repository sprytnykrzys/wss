angular
    .module('Wss.Controllers.SetCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('SetCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        '$location',
        '$window',
        'ContentSrvc',
        function($scope, $state, $timeout, $localStorage, $rootScope, $location, $window, ContentSrvc) {

            $scope.getSetFromAPI = function() {
                $scope.set = null;
           

                ContentSrvc.getSet().then(function(data) {
                    $scope.set = data.data.set;
                    // $scope.currentCategories = data.data.categories;
                    // $localStorage.sets = data.data.sets;


                }, function(data) {
                   
                });
            };

            $scope.getSetFromAPI();

            $scope.getProductsFromAPI = function() {
                $scope.products = null;
             

                ContentSrvc.getProducts().then(function(data) {
                    $scope.products = data.data.products;
                    // $scope.currentCategories = data.data.categories;


                }, function(data) {
                
                });
            };

            $scope.getProductsFromAPI();


            $scope.newSet = {
                products_set: {
                    number: "",
                    type: "",
                    id_system: 2,
                    products: [1, 5]
                }
            }

        }
    ]);

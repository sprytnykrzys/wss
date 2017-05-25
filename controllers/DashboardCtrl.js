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
        'ContentSrvc',
        function($scope, $state, $timeout, $localStorage, $rootScope, $location, $window, ContentSrvc) {

            //  $scope.changeState = function(state) {
            //     $state.go(state);
            // }

            $scope.getUsersFromAPI = function() {
                $scope.users = null;
                // $scope.currentCategories = null;

                ContentSrvc.getUsers().then(function(data) {
                    $scope.users = data.data.users;
                    // $scope.currentCategories = data.data.categories;


                }, function(data) {
                    // Materialize.toast('Wystąpił błąd', 4000);
                });
            };

            $scope.getUsersFromAPI();


        }
    ]);

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

            $scope.getClientsFromAPI = function() {
                $scope.clients = null;
                $scope.generalStats = null;

                ContentSrvc.getClients().then(function(data) {
                    $scope.clients = data.data.clients;
                    $scope.generalStats = data.data.general_stats;

                }, function(data) {
                    swal({
                        title: 'Wystąpił błąd!',
                        timer: 1200
                    })
                });
            };

            $scope.getClientsFromAPI();


            $scope.getUsersFromAPI = function() {
                $scope.users = null;

                ContentSrvc.getLastUsers().then(function(data) {
                    $scope.users = data.data.users;

                }, function(data) {
                    swal({
                        title: 'Wystąpił błąd!',
                        timer: 1200
                    })
                });
            };

            $scope.getUsersFromAPI();

            $scope.filterClient = '';
            $scope.if20Logs = true; // Czy wyswietlamy 20 ostatnich logowań w tabeli
            $scope.checkLoginsCount = function() {
                for (var i = 0; i < $localStorage.clients.length; i++) {
                    if ($localStorage.clients[i].name == $scope.filterClient) {
                        $scope.currentLoginsAmount = $localStorage.clients[i].stats.login_count;
                        $scope.currentOffersAmount = $localStorage.clients[i].stats.offers_count;
                        $scope.if20Logs = false;
                        // alert("Zwracam FALSE");
                        return true;
                    } else {
                        $scope.currentLoginsAmount = '';
                        $scope.currentOffersAmount = '';
                        $scope.if20Logs = true;
                        // alert("Zwracam TRUE");
                    }
                }

            }

            $scope.filter = function(params) {
                $scope.currentLoginsAmount = params.stats.login_count;
                $scope.currentOffersAmount = params.stats.offers_count;
                $scope.filterClient = params.name;
            }



        }
    ]);

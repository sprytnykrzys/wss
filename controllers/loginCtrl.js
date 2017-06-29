angular
    .module('Wss.Controllers.LoginCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('LoginCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        '$location',
        '$window',
        'AuthorizationSrvc',
        function($scope, $state, $timeout, $localStorage, $rootScope, $location, $window, AuthorizationSrvc) {


            $scope.userData = {
                auth: {
                    email: "",
                    password: ""
                }
            }


            $scope.login = function() {
                AuthorizationSrvc.loginUser($scope.userData).then(function(data) {
                    if ($localStorage.user.who == "admin") {
                        swal({
                            title: 'Pomyślnie zalogowano!',
                            timer: 1200
                        })
                        $state.go('dashboard');
                    } else if ($localStorage.user.who == "client") {
                        swal({
                            title: 'Pomyślnie zalogowano!',
                            timer: 1200
                        })
                        $state.go('search');
                    }

                }, function(data) {
                    swal(
                        'Niepoprawne dane logowania!',
                        '',
                        'warning'
                    )
                });
            }

        }
    ]);

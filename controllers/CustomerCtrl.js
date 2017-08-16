angular
    .module('Wss.Controllers.CustomerCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('CustomerCtrl', [
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
                ContentSrvc.getClients().then(function(data) {
                    $scope.clients = data.data.clients;

                }, function(data) {
                    swal({
                        title: 'Wystąpił błąd!',
                        timer: 1200
                    })
                });
            };

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

            $scope.getClientsFromAPI();
            $scope.getUsersFromAPI();

            $scope.correctClientName = function() {
                for (var i = 0; i < $localStorage.clients.length; i++) {
                    if ($localStorage.clients[i].name == $scope.newClient.client.name) {
                        $scope.newUser.user.id_client = $localStorage.clients[i].id;
                        return false;
                    } else {
                        $scope.newUser.user.id_client = null;
                    }
                }
                return true;
            }

            $scope.correctUserInTable = function(data) {
                if (data == undefined) {
                    return false;
                }
                if (data == $scope.newUser.user.id_client) {
                    return true;

                }

            }

            $scope.saveChanges = function() {
                for (var i = 0; i < $localStorage.clients.length; i++) {
                    if ($localStorage.clients[i].name == $scope.newClient.client.name) {
                        $scope.currentIdClient = $localStorage.clients[i].id
                        $scope.updateClient();
                        return true;
                    }
                }
                $scope.addClient();
            }

            $scope.editClient = function(client) {
                $scope.newClient.client.name = client.name;
                $scope.newClient.client.discount = client.discount;
                $scope.currentIdClient = client.id;
            }

            $scope.newClient = {
                client: {
                    name: "",
                    discount: "",
                    discount_currency: ""
                }
            };

            $scope.newUser = {
                user: {
                    email: "",
                    password: "",
                    role: "client",
                    key: "rmuwt6546wel4t65"
                }
            }

            $scope.addClient = function() {
                ContentSrvc.sendClient($scope.newClient).then(function(data) {
                    $scope.getClientsFromAPI();
                    swal(
                        'Pomyślnie dodano klienta!',
                        '',
                        'success'
                    )
                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        $state.go('login');
                        swal({
                            title: 'Zostałeś wylogowany!',
                            timer: 1200
                        })
                    } else {
                        $localStorage.user.auth.token = data.data.auth.token;
                        swal(
                            'Nie udało się dodać klienta!',
                            '',
                            'error'
                        )
                    }
                });
            }

            $scope.updateClient = function() {
                console.log($scope.newClient);
                ContentSrvc.updateClient($scope.newClient, $scope.currentIdClient).then(function(data) {
                    $scope.getClientsFromAPI();
                    $scope.getUsersFromAPI();
                    swal(
                        'Pomyślnie zaktualizowao!',
                        '',
                        'success'
                    )
                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        $state.go('login');
                        swal({
                            title: 'Zostałeś wylogowany!',
                            timer: 1200
                        })
                    } else {
                        $localStorage.user.auth.token = data.data.auth.token;
                        swal(
                            'Nie udało się zaktualizować!',
                            '',
                            'error'
                        )
                    }
                });
            }

            $scope.addUser = function() {
                ContentSrvc.sendUser($scope.newUser).then(function(data) {
                    $scope.getClientsFromAPI();
                    $scope.getUsersFromAPI();

                    $scope.newUser = {
                        user: {
                            email: "",
                            password: "",
                            role: "client",
                            key: "rmuwt6546wel4t65"
                        }
                    }
                    swal(
                        'Pomyślnie dodano użytkownika!',
                        '',
                        'success'
                    )
                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        $state.go('login');
                        swal({
                            title: 'Zostałeś wylogowany!',
                            timer: 1200
                        })
                    } else {
                        $localStorage.user.auth.token = data.data.auth.token;
                        swal(
                            'Nie udało się dodać użytkownika!',
                            '',
                            'error'
                        )
                    }
                });
            }

            $scope.deleteClient = function(id) {
                swal({
                    title: 'Czy jesteś pewny?',
                    text: "",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Usuń!',
                    cancelButtonText: 'Anuluj!'
                }).then(function() {
                    $scope.clientId = {
                        id: id
                    }

                    ContentSrvc.deleteClient($scope.clientId).then(function(data) {
                        $scope.getClientsFromAPI();
                        $scope.clearInputs();
                        swal(
                            'Usunięto!',
                            '',
                            'success'
                        )

                    }, function(data) {
                        if (data.status == 403) {
                            $localStorage.user = null;
                            $rootScope.user = null;
                            $state.go('login');
                            swal({
                                title: 'Zostałeś wylogowany!',
                                timer: 1200
                            })
                        } else {
                            $localStorage.user.auth.token = data.data.auth.token;
                            swal(
                                'Nie udało się usunąć klienta!',
                                '',
                                'error'
                            )
                        }
                    });

                })


            }

            $scope.deleteUser = function(uid) {
                swal({
                    title: 'Czy jesteś pewny?',
                    text: "",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Usuń!',
                    cancelButtonText: 'Anuluj!'
                }).then(function() {
                    $scope.userId = {
                        uid: uid
                    }
                    ContentSrvc.deleteUser($scope.userId).then(function(data) {
                        $scope.getUsersFromAPI();
                        swal(
                            'Usunięto!',
                            '',
                            'success'
                        )

                    }, function(data) {
                        if (data.status == 403) {
                            $localStorage.user = null;
                            $rootScope.user = null;
                            $state.go('login');
                            swal({
                                title: 'Zostałeś wylogowany!',
                                timer: 1200
                            })
                        } else {
                            $localStorage.user.auth.token = data.data.auth.token;
                            swal(
                                'Nie udało się usunąć użytkownika!',
                                '',
                                'error'
                            )
                        }
                    });

                })
            }

            $scope.clearInputs = function() {
                $scope.newClient.client.name = '';
                $scope.newClient.client.discount = '';
            }

        }
    ]);

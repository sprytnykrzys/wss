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
                // $scope.currentCategories = null;

                ContentSrvc.getClients().then(function(data) {
                    $scope.clients = data.data.clients;
                    // $scope.currentCategories = data.data.categories;


                }, function(data) {
                    // Materialize.toast('Wystąpił błąd', 4000);
                });
            };

            $scope.getClientsFromAPI();

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



            $scope.newClient = {
                client: {
                    name: "",
                    discount: ""
                }
            };

            $scope.correctClientName = function() {
                for (var i = 0; i < $localStorage.clients.length; i++) {
                    if ($localStorage.clients[i].name == $scope.newClient.client.name) {
                        $scope.newUser.id_client = $localStorage.clients[i].id;
                        return false;

                    } else {
                        $scope.newUser.id_client = null;
                    }
                }
                return true;
            }

            $scope.correctUserInTable = function(data) {
                if (data == undefined) {
                    return false;

                }
                if (data == $scope.newUser.id_client) {
                    return true;

                }




            }


            $scope.addClient = function() {
                ContentSrvc.sendClient($scope.newClient).then(function(data) {
                    $scope.getClientsFromAPI();
                    // $scope.getNestedCategoriesFromAPI();
                    // Materialize.toast('Zapisano!', 4000);

                    // $scope.newClient = {
                    //     client: {
                    //         name: "",
                    //         discount: ""
                    //     }
                    // };
                    swal(
                        'Pomyślnie dodano klienta!',
                        '',
                        'success'
                    )
                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        // Materialize.toast('Zostałeś wylogowany', 4000);

                        $state.go('adminLogin');
                    } else {
                        swal(
                                'Nie udało się dodać klienta!',
                                '',
                                'error'
                            )
                            // $scope.getCategoriesFromAPI();
                    }
                });
            }


            $scope.newUser = {
                email: "",
                password: "",
                role: "client",
                key: "rmuwt6546wel4t65"
            }

            $scope.addUser = function() {
                ContentSrvc.sendUser($scope.newUser).then(function(data) {
                    $scope.getClientsFromAPI();
                    $scope.getUsersFromAPI();
                    $scope.newUser = {
                        email: "",
                        password: "",
                        role: "client",
                        key: "rmuwt6546wel4t65"
                    }

                    swal(
                            'Pomyślnie dodano użytkownika!',
                            '',
                            'success'
                        )
                        // $scope.getNestedCategoriesFromAPI();
                        // Materialize.toast('Zapisano!', 4000);


                    // $scope.newClient = {
                    //     client: {
                    //         name: "",
                    //         discount: ""
                    //     }
                    // };
                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        // Materialize.toast('Zostałeś wylogowany', 4000);

                        $state.go('adminLogin');
                    } else {
                        swal(
                                'Nie udało się dodać użytkownika!',
                                '',
                                'error'
                            )
                            // Materialize.toast('Wystąpił błąd', 4000);
                            // $scope.getCategoriesFromAPI();
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
                        // $scope.getNestedCategoriesFromAPI();
                        // Materialize.toast('Zapisano!', 4000);
                        swal(
                            'Usunięto!',
                            '',
                            'success'
                        )

                    }, function(data) {
                        if (data.status == 403) {
                            $localStorage.user = null;
                            $rootScope.user = null;
                            // Materialize.toast('Zostałeś wylogowany', 4000);

                            $state.go('adminLogin');
                        } else {
                            // Materialize.toast('Wystąpił błąd', 4000);
                            // $scope.getCategoriesFromAPI();
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
                        // $scope.getNestedCategoriesFromAPI();
                        // Materialize.toast('Zapisano!', 4000);
                        swal(
                            'Usunięto!',
                            '',
                            'success'
                        )


                    }, function(data) {
                        if (data.status == 403) {
                            $localStorage.user = null;
                            $rootScope.user = null;
                            // Materialize.toast('Zostałeś wylogowany', 4000);

                            $state.go('adminLogin');
                        } else {
                            // Materialize.toast('Wystąpił błąd', 4000);
                            // $scope.getCategoriesFromAPI();
                        }
                    });

                })
            }

            $scope.editClient = function(name, discount) {
                $scope.newClient.client.name = name;
                $scope.newClient.client.discount = discount;
            }





        }
    ]);

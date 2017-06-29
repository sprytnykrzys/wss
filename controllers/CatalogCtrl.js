angular
    .module('Wss.Controllers.CatalogCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('CatalogCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        '$location',
        '$filter',
        '$window',
        'ContentSrvc',
        function($scope, $state, $timeout, $localStorage, $rootScope, $location, $filter, $window, ContentSrvc) {

            $scope.getCatalogFromAPI = function() {
                $scope.catalog = null;
                ContentSrvc.getCatalog().then(function(data) {
                    $scope.catalog = data.data.catalog;
                    $scope.currentCategories = data.data.categories;

                }, function(data) {
                    swal({
                        title: 'Wystąpił błąd!',
                        timer: 1200
                    })
                });
            };

            $scope.getCatalogFromAPI();

            $scope.newSystemProvider = {
                system_provider: {
                    id_parent: 1,
                    name: ''
                }
            }

            $scope.addSystemProvider = function() {
                ContentSrvc.sendSystemProvider($scope.newSystemProvider).then(function(data) {
                    $scope.getCatalogFromAPI();
                    swal(
                        'Pomyślnie dodano Systemodawcę!',
                        '',
                        'success'
                    )
                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        swal({
                            title: 'Zostałeś wylogowany!',
                            timer: 1200
                        })

                        $state.go('login');
                    } else {
                        $localStorage.user.auth.token = data.data.auth.token;
                        swal(
                            'Nie udało się dodać Systemodawcy!',
                            '',
                            'error'
                        )
                    }
                });
            }

            $scope.newSystem = {
                system: {
                    id_parent: '',
                    name: ''
                }
            }

            $scope.addSystem = function() {
                ContentSrvc.sendSystem($scope.newSystem).then(function(data) {
                    $scope.getCatalogFromAPI();
                    swal(
                        'Pomyślnie dodano System!',
                        '',
                        'success'
                    )
                }, function(data) {
                    if (data.status == 403) {
                        $localStorage.user = null;
                        $rootScope.user = null;
                        swal({
                            title: 'Zostałeś wylogowany!',
                            timer: 1200
                        })

                        $state.go('login');
                    } else {
                        $localStorage.user.auth.token = data.data.auth.token;
                        swal(
                            'Nie udało się dodać Systemu!',
                            '',
                            'error'
                        )
                    }
                });
            }



            $scope.saveChanges = function() {
                for (var key in $localStorage.catalog) {
                    for (var sub in $localStorage.catalog[key].subhierarchyElements) {
                        if ($localStorage.catalog[key].subhierarchyElements[sub].name == $scope.newSystemProvider.system_provider.name) {
                            $scope.newSystem.system.id_parent = $localStorage.catalog[key].subhierarchyElements[sub].id;
                            $scope.addSystem();
                            return true;
                        }
                    }
                }
                $scope.addSystemProvider();
            }

            $scope.correctSystemProvider = function(data) {
                if ($scope.newSystemProvider.system_provider.name == data) {
                    return true;
                } else if ($scope.newSystemProvider.system_provider.name == '') {
                    return true;
                } else {
                    return false;
                }
            }

            $scope.deleteSystemProvider = function(id) {
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
                    $scope.systemProviderId = {
                        id: id
                    }

                    ContentSrvc.deleteSystemProvider($scope.systemProviderId).then(function(data) {
                        $scope.getCatalogFromAPI();
                        swal(
                            'Usunięto!',
                            '',
                            'success'
                        )

                    }, function(data) {
                        if (data.status == 403) {
                            $localStorage.user = null;
                            $rootScope.user = null;
                            swal({
                                title: 'Zostałeś wylogowany!',
                                timer: 1200
                            })

                            $state.go('login');
                        } else {
                            $localStorage.user.auth.token = data.data.auth.token;
                            swal(
                                'Nie udało się usunąć Systemodawcy!',
                                '',
                                'error'
                            )
                        }
                    });

                })

            }

            $scope.deleteSystem = function(id) {
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
                    $scope.systemId = {
                        id: id
                    }

                    ContentSrvc.deleteSystem($scope.systemId).then(function(data) {
                        $scope.getCatalogFromAPI();
                        swal(
                            'Usunięto!',
                            '',
                            'success'
                        )

                    }, function(data) {
                        if (data.status == 403) {
                            $localStorage.user = null;
                            $rootScope.user = null;
                            swal({
                                title: 'Zostałeś wylogowany!',
                                timer: 1200
                            })

                            $state.go('login');
                        } else {
                            $localStorage.user.auth.token = data.data.auth.token;
                            swal(
                                'Nie udało się usunąć Systemu!',
                                '',
                                'error'
                            )
                        }
                    });

                })

            }
        }




    ]);

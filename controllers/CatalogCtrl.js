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
        '$window',
        'ContentSrvc',
        function($scope, $state, $timeout, $localStorage, $rootScope, $location, $window, ContentSrvc) {

            $scope.getCatalogFromAPI = function() {
                $scope.catalog = null;
                // $scope.currentCategories = null;

                ContentSrvc.getCatalog().then(function(data) {
                    $scope.catalog = data.data.catalog;
                    // $scope.currentCategories = data.data.categories;


                }, function(data) {
                    // Materialize.toast('Wystąpił błąd', 4000);
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
                    // $scope.getNestedCategoriesFromAPI();
                    // Materialize.toast('Zapisano!', 4000);


                    swal(
                        'Pomyślnie dodano Systemodawcę!',
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
                                'Nie udało się dodać Systemodawcy!',
                                '',
                                'error'
                            )
                            // $scope.getCategoriesFromAPI();
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
                    // $scope.getNestedCategoriesFromAPI();
                    // Materialize.toast('Zapisano!', 4000);


                    swal(
                        'Pomyślnie dodano System!',
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
                                'Nie udało się dodać System!',
                                '',
                                'error'
                            )
                            // $scope.getCategoriesFromAPI();
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
                    $scope.addSystemProvider();

                }

                // for (var i = 0; i < $localStorage.catalog.length; i++) {
                //     alert($localStorage.catalog[i].name);
                //     if ($localStorage.catalog[i].name == $scope.newSystemProvider.system_provider.name) {
                //         $scope.newSystem.system.id_parent = $localStorage.catalog[i].id;
                //         $scope.addSystem();
                //         alert('Poprawnie');
                //         return true;
                //     }
                // }
                // alert($scope.newSystemProvider.system_provider.name);
                // $scope.addSystemProvider();
            }
        }
    ]);

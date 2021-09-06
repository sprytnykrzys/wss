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
                    $scope.set = data.data.products_sets;
                    $scope.leftTableProducts = data.data.products_sets;
                }, function(data) {
                    swal({
                        title: 'Wystąpił błąd!',
                        timer: 1200
                    })
                });
            };

            $scope.getProductsFromAPI = function() {
                $scope.products = null;
                ContentSrvc.getProducts().then(function(data) {
                    $scope.products = data.data.products;
                }, function(data) {
                    swal({
                        title: 'Wystąpił błąd!',
                        timer: 1200
                    })
                });
            };

            $scope.getCatalogFromAPI = function() {
                $scope.catalog = null;
                ContentSrvc.getCatalog().then(function(data) {
                    $scope.catalog = data.data.catalog;
                }, function(data) {
                    swal({
                        title: 'Wystąpił błąd!',
                        timer: 1200
                    })
                });
            };

            $scope.getSetFromAPI();
            $scope.getProductsFromAPI();
            $scope.getCatalogFromAPI();

            $scope.newSet = {
                products_set: {
                    code: "",
                    export_code: "",
                    type: "",
                    name: "",
                    id_system: "",
                    products: []
                }
            }

            $scope.productCode = ""; // Kod produktu który chcemy dodać do zestawu
            $scope.quantity = ""; // Ilość produktu który chcemy dodać do zestawu
            $scope.addedProducts = []; // Produkty do wyświetlenia w lewej tabeli

            $scope.correctProductCode = function() {
                for (var i = 0; i < $localStorage.products.length; i++) {
                    if ($localStorage.products[i].code == $scope.productCode) {
                        $scope.currentProductId = $localStorage.products[i].id; // Id aktualnie wyszukanego produktu
                        return false;
                    } else {
                        $scope.currentProductId = null;
                    }
                }
                return true;
            }

            $scope.correctProductInTable = function(data) {
                if (data == $scope.newSet.products_set.code) {
                    return true;
                } else if ($scope.setCodeWithNewAddedProducts == $scope.newSet.products_set.code) {
                    // $scope.addedProducts = [];
                    return false;
                } else {
                    $scope.addedProducts = [];
                    $scope.newSet.products_set.products = [];
                    return false;
                }
            }

            $scope.setId = {
                uid: ""
            }

            $scope.addProduct = function() {
                $scope.setCodeWithNewAddedProducts = $scope.newSet.products_set.code; // Zapisuje kod aktualnie dodanego produktu
                // $scope.addedProducts.push($scope.currentProduct);
                // $scope.newSet.products_set.products.push($scope.currentProduct.id);
                // swal(
                //     'Pomyślnie dodano produkt do zestawu!',
                //     '',
                //     'success'
                // )
                for (var i = 0; i < $localStorage.set.length; i++) {
                    if ($localStorage.set[i].code == $scope.newSet.products_set.code) {
                        $scope.setId = {
                            uid: $localStorage.set[i].id
                        }
                    }
                }
                ContentSrvc.sendProductToSet($scope.setId.uid, $scope.currentProductId, $scope.quantity).then(function(data) {
                    $scope.getSetFromAPI();
                    // $scope.addedProducts = [];
                    // $scope.newSet.products_set.products = [];
                    swal(
                        'Pomyślnie dodano zestaw!',
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
                            'Nie udało się dodać zestawu!',
                            '',
                            'error'
                        )
                    }
                });
            }

            $scope.editSet = function(set) {
                $scope.newSet = {
                    products_set: {
                        code: set.code,
                        export_code: set.export_code,
                        type: set.type,
                        name: set.name,
                        id_system: set.id_system
                    }
                }
                $scope.setId = {
                    uid: set.id
                }
            }

            $scope.saveChanges = function() {
                for (var i = 0; i < $localStorage.set.length; i++) {
                    if ($localStorage.set[i].code == $scope.newSet.products_set.code) {
                        $scope.setId = {
                            uid: $localStorage.set[i].id
                        }
                        $scope.updateSet();
                        $scope.addedProducts = [];

                        return true;
                    }
                }

                $scope.addSet();
                $scope.addedProducts = [];

            }

            $scope.addSet = function() {
                var selectedFile = document.getElementById('newFile').files[0];
                if (typeof selectedFile == 'undefined') {
                    $scope.newSet.products_set.image = null;
                    $scope.sendSetService($scope.newSet);
                } else {
                    selectedFile.convertToBase64(function(base) {
                        base = base.substring(base.indexOf(';base64,') + 8, base.length);
                        var base64 = base;
                        $scope.newSet.products_set.image = base64;
                        $scope.sendSetService($scope.newSet);
                    });
                }


            }

            $scope.updateSet = function() {
                var selectedFile = document.getElementById('newFile').files[0];
                if (typeof selectedFile == 'undefined') {
                    $scope.newSet.products_set.image = null;
                    $scope.updateSetService($scope.newSet);
                } else {
                    selectedFile.convertToBase64(function(base) {
                        base = base.substring(base.indexOf(';base64,') + 8, base.length);
                        var base64 = base;
                        $scope.newSet.products_set.image = base64;
                        $scope.updateSetService($scope.newSet);
                    });
                }

            }


            $scope.sendSetService = function(data) {
                if ($scope.newSet.products_set.id_system == "") {
                    $scope.newSet.products_set.id_system = null;
                }
                ContentSrvc.sendSet(data).then(function(data) {
                    $scope.getSetFromAPI();
                    $scope.addedProducts = [];
                    $scope.newSet.products_set.products = [];
                    swal(
                        'Pomyślnie dodano zestaw!',
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
                            'Nie udało się dodać zestawu!',
                            '',
                            'error'
                        )
                    }
                });
            }

            $scope.updateSetService = function(data) {
                ContentSrvc.updateSet(data, $scope.setId).then(function(data) {
                    $scope.getSetFromAPI();
                    $scope.newSet.products_set.products = [];
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

            $scope.deleteSet = function(uid) {
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
                    $scope.setId = {
                        uid: uid
                    }
                    ContentSrvc.deleteSet($scope.setId).then(function(data) {
                        $scope.getSetFromAPI();
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
                                'Nie udało się usunąć zestawu!',
                                '',
                                'error'
                            )
                        }
                    });

                })
            }

            $scope.deleteProductFromSet = function(setId, productId) {
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
                    $scope.toDelete = {
                        products_set: {
                            id_set: setId,
                            id_product: productId
                        }
                    }
                    ContentSrvc.deleteProductFromSet($scope.toDelete).then(function(data) {
                        $scope.getSetFromAPI();
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
                            $state.go('login');
                            swal({
                                title: 'Zostałeś wylogowany!',
                                timer: 1200
                            })
                        } else {
                            $localStorage.user.auth.token = data.data.auth.token;
                            swal(
                                'Nie udało się usunąć produktu!',
                                '',
                                'error'
                            )
                        }
                    });

                })
            }

            $scope.deleteProductFromArray = function(productId) {
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
                    $scope.addedProducts.splice(productId, 1);
                    $scope.newSet.products_set.products.splice(productId, 1);
                    $scope.getSetFromAPI();

                    swal(
                        'Usunięto!',
                        '',
                        'success'
                    )


                })
            }

            $scope.getName = function(idSystem) {
                for (var key in $localStorage.catalog[1].subhierarchyElements) {
                    for (var system in $localStorage.catalog[1].subhierarchyElements[key].subhierarchyElements) {
                        if ($localStorage.catalog[1].subhierarchyElements[key].subhierarchyElements[system].id == idSystem) {
                            return $localStorage.catalog[1].subhierarchyElements[key].subhierarchyElements[system].name;
                        }
                    }
                }
                return 'Brak';
            }

            File.prototype.convertToBase64 = function(callback) {
                var FR = new FileReader();
                FR.onload = function(e) {
                    callback(e.target.result)
                };
                FR.readAsDataURL(this);
            }
        }
    ]);

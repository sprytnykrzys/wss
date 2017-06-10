angular
    .module('Wss.Controllers.ProductCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('ProductCtrl', [
        '$scope',
        '$state',
        '$timeout',
        '$localStorage',
        '$rootScope',
        '$location',
        '$window',
        'ContentSrvc',
        function($scope, $state, $timeout, $localStorage, $rootScope, $location, $window, ContentSrvc) {


            $scope.getProductsFromAPI = function() {
                $scope.products = null;
                // $scope.currentCategories = null;

                ContentSrvc.getProducts().then(function(data) {
                    $scope.products = data.data.products;
                    // $scope.currentCategories = data.data.categories;


                }, function(data) {
                    // Materialize.toast('Wystąpił błąd', 4000);
                });
            };

            $scope.getProductsFromAPI();

            $scope.newProduct = {
                product: {
                    name: "",
                    code: "",
                    export_code: "",
                    price: "",
                    currency: "",
                    measure_unit: ""
                }
            }

            $scope.saveChanges = function() {
                for (var i = 0; i < $localStorage.products.length; i++) {
                    if ($localStorage.products[i].code == $scope.newProduct.product.code) {
                        $scope.updateProduct();
                        return true;
                    }
                }

                $scope.addProduct();
            }


            $scope.addProduct = function() {
                ContentSrvc.sendProduct($scope.newProduct).then(function(data) {
                    $scope.getProductsFromAPI();
                    // $scope.getNestedCategoriesFromAPI();
                    // Materialize.toast('Zapisano!', 4000);

                    // $scope.newClient = {
                    //     client: {
                    //         name: "",
                    //         discount: ""
                    //     }
                    // };
                    swal(
                        'Pomyślnie dodano produkt!',
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
                                'Nie udało się dodać produktu!',
                                '',
                                'error'
                            )
                            // $scope.getCategoriesFromAPI();
                    }
                });
            }

            $scope.updateProduct = function() {
                $scope.newProduct.product.id = $scope.currentIdProduct;
                ContentSrvc.updateProduct($scope.newProduct).then(function(data) {
                    $scope.getProductsFromAPI();
                      $scope.newProduct.product.id = null;
                    // $scope.getNestedCategoriesFromAPI();
                    // Materialize.toast('Zapisano!', 4000);

                    // $scope.newClient = {
                    //     client: {
                    //         name: "",
                    //         discount: ""
                    //     }
                    // };
                    swal(
                        'Pomyślnie zaktualizowano produkt!',
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
                                'Nie udało się zaktualizować produktu!',
                                '',
                                'error'
                            )
                            // $scope.getCategoriesFromAPI();
                    }
                });
            }

            $scope.deleteProduct = function(prod) {
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
                    $scope.productToDelete = {
                        product: {
                            code: prod.code,
                            export_code: prod.export_code,
                            measure_unit: prod.measure_unit
                        }
                    }

                    ContentSrvc.deleteProduct($scope.productToDelete, prod).then(function(data) {
                        $scope.getProductsFromAPI();
                        $scope.clearInputs();
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

            $scope.editProduct = function(prod) {
                $scope.newProduct.product.name = prod.name;
                $scope.newProduct.product.code = prod.code;
                $scope.newProduct.product.export_code = prod.export_code;
                $scope.newProduct.product.price = prod.price;
                $scope.newProduct.product.currency = prod.currency;
                $scope.newProduct.product.measure_unit = prod.measure_unit;
                $scope.currentIdProduct = prod.id;

            }

            $scope.clearInputs = function() {
                $scope.newProduct.product.name = '';
                $scope.newProduct.product.code = '';
                $scope.newProduct.product.export_code = '';
                $scope.newProduct.product.price = '';
                $scope.newProduct.product.currency = '';
                $scope.newProduct.product.measure_unit = '';
                $scope.currentIdProduct = '';
            }


        }
    ]);

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

            $scope.getProductsFromAPI();
            $scope.getCatalogFromAPI();

            $scope.newProduct = {
                product: {
                    name: "",
                    code: "",
                    export_code: "",
                    price: "",
                    currency: "",
                    measure_unit: "",
                    id_system: ""
                }
            }

            $scope.saveChanges = function() {
                for (var i = 0; i < $localStorage.products.length; i++) {
                    if ($localStorage.products[i].code == $scope.newProduct.product.code) {
                        $scope.currentIdProduct = $localStorage.products[i].id
                        $scope.updateProduct();
                        return true;
                    }
                }

                $scope.addProduct();
            }


            $scope.addProduct = function() {
                var selectedFile = document.getElementById('newFile').files[0];
                if (typeof selectedFile == 'undefined') {
                    $scope.newProduct.product.image = null;
                    $scope.sendProductService($scope.newProduct);
                } else {
                    selectedFile.convertToBase64(function(base) {
                        base = base.substring(base.indexOf(';base64,') + 8, base.length);
                        var base64 = base;
                        $scope.newProduct.product.image = base64;
                        $scope.sendProductService($scope.newProduct);
                    });
                }

            }

            $scope.updateProduct = function() {
                $scope.newProduct.product.id = $scope.currentIdProduct;
                var selectedFile = document.getElementById('newFile').files[0];
                if (typeof selectedFile == 'undefined') {
                    $scope.newProduct.product.image = null;
                    $scope.updateProductService($scope.newProduct);
                } else {
                    selectedFile.convertToBase64(function(base) {
                        base = base.substring(base.indexOf(';base64,') + 8, base.length);
                        var base64 = base;
                        $scope.newProduct.product.image = base64;
                        $scope.updateProductService($scope.newProduct);
                    });
                }
            }

            $scope.sendProductService = function(data) {
                if($scope.newProduct.product.id_system == ""){
                    $scope.newProduct.product.id_system = null;
                }
                ContentSrvc.sendProduct(data).then(function(data) {
                    $scope.getProductsFromAPI();
                    swal(
                        'Pomyślnie dodano produkt!',
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
                    } else {
                        $localStorage.user.auth.token = data.data.auth.token;
                        swal(
                            'Nie udało się dodać produktu!',
                            '',
                            'error'
                        )
                    }
                });
            }

            $scope.updateProductService = function(data) {
                ContentSrvc.updateProduct(data).then(function(data) {
                    $scope.getProductsFromAPI();
                    $scope.newProduct.product.id = null;
                    swal(
                        'Pomyślnie zaktualizowano produkt!',
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
                    } else {
                        $localStorage.user.auth.token = data.data.auth.token;
                        swal(
                                'Nie udało się zaktualizować produktu!',
                                '',
                                'error'
                            )
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

            $scope.editProduct = function(prod) {
                $scope.currentIdProduct = prod.id;
                $scope.newProduct = {
                    product: {
                        name: prod.name,
                        code: prod.code,
                        export_code: prod.export_code,
                        price: prod.price,
                        currency: prod.currency,
                        measure_unit: prod.measure_unit,
                        id_system: prod.id_system
                    }
                }
            }

            $scope.clearInputs = function() {
                $scope.currentIdProduct = '';
                $scope.newProduct = {
                    product: {
                        name: "",
                        code: "",
                        export_code: "",
                        price: "",
                        currency: "",
                        measure_unit: "",
                        id_system: ""
                    }
                }
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

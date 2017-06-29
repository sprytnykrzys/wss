angular
    .module('Wss.Controllers.SearchCtrl', [
        'ui.router',
        'ngAnimate',
    ])
    .controller('SearchCtrl', [
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
                    for (var i = 0; i < $scope.products.length; i++) {
                        $scope.products[i].amount = '';
                    }

                    console.log($scope.products);
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

            $scope.getSetFromAPI = function() {
                $scope.set = null;
                ContentSrvc.getSet().then(function(data) {
                    $scope.set = data.data.products_sets;
                    $scope.leftTableProducts = data.data.products_sets;
                    for (var i = 0; i < $scope.set.length; i++) {
                        $scope.set[i].amount = '';
                    }
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

            $scope.newOrder = {
                name: "",
                date: new Date(),
                products: []
            }

            $scope.searchByInputs = {
                code: "",
                name: ""
            }

            $scope.currentOrders = $localStorage.orders; // Wszystkie zapisane zamówienia

            if (!$localStorage.orders) {
                $localStorage.orders = [];
            }

            $scope.descriptionFurther = function() {
                $('#collapse2').collapse('show')
                $('#collapse1').collapse('hide')
            }

            $scope.searchFurther = function() {
                $('#collapse3').collapse('show')
                $('#collapse2').collapse('hide')
            }

            $scope.back = function() {
                $('#collapse1').collapse('show')
                $('#collapse2').collapse('hide')
            }

            $scope.addItem = function(item) {
                if (item.amount !== '') {
                    if ($scope.newOrder.products.length > 0) {
                        for (var i = 0; i < $scope.newOrder.products.length; i++) {
                            if ($scope.newOrder.products[i].code == item.code) {
                                swal({
                                    title: 'Czy chcesz zmienić ilość?',
                                    text: "",
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Zmień!',
                                    cancelButtonText: 'Anuluj!'
                                }).then(function() {
                                    $scope.prodToAdd = item;
                                    $scope.newOrder.products[i] = $scope.prodToAdd;
                                    swal(
                                        'Zmieniono ilość!',
                                        '',
                                        'success'
                                    )
                                    $scope.getCatalogFromAPI(); // W celu odświeżenia tablicy w zmiennej
                                })
                                return true;

                            }
                        }
                        $scope.prodToAdd = item;
                        $scope.newOrder.products.push($scope.prodToAdd);
                        swal(
                            'Dadano produkt!',
                            '',
                            'success'
                        )
                    } else {
                        $scope.prodToAdd = item;
                        $scope.newOrder.products.push($scope.prodToAdd);
                        swal(
                            'Dadano produkt!',
                            '',
                            'success'
                        )
                    }
                } else {
                    swal(
                        'Podaj ilość!',
                        '',
                        'warning'
                    )
                }

                $scope.deleteProductFromTable = function(index) {
                    swal({
                        title: 'Czy chcesz usunąć produkt?',
                        text: "",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Usuń!',
                        cancelButtonText: 'Anuluj!'
                    }).then(function() {
                        $scope.newOrder.products.splice(index, 1);
                        swal(
                            'Usunięto!',
                            '',
                            'success'
                        )
                        $scope.getCatalogFromAPI(); // W celu odświeżenia tablicy w zmiennej
                    })

                }

            }

            $scope.saveAndSummarize = function() {
                if ($scope.newOrder.name && $scope.newOrder.products.length > 0) {
                    $localStorage.orders.push($scope.newOrder);
                } else if ($scope.newOrder.name == '') {
                    swal(
                        'Dodaj nazwę zamówienia!',
                        '',
                        'warning'
                    )
                    $('#collapse3').collapse('hide')
                    $('#collapse1').collapse('show')
                    return;
                } else {
                    swal(
                        'Dodaj produkt do zamówienia!',
                        '',
                        'warning'
                    )
                    $('#collapse3').collapse('hide')
                    $('#collapse2').collapse('show')
                    return;
                }

                $scope.newOrder = {
                    name: "",
                    date: new Date(),
                    products: []
                }

                ContentSrvc.generateOffer().then(function(data) {
                    swal(
                        'Zapisano!',
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
                            'Nie zapisano w statystykach ofert klientów!',
                            '',
                            'error'
                        )
                    }
                });


                $timeout(function() {
                    $state.go('order');
                }, 1500);
            }

            $scope.deleteOrder = function(index) {
                swal({
                    title: 'Czy chcesz usunąć zamówienie?',
                    text: "",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Usuń!',
                    cancelButtonText: 'Anuluj!'
                }).then(function() {

                    $localStorage.orders.splice(index, 1);

                    swal(
                        'Usunięto!',
                        '',
                        'success'
                    )

                    $scope.getCatalogFromAPI(); // W celu odświeżenia tablicy w zmiennej

                })

            }

            $scope.addNewOrder = function() {
                if ($scope.newOrder.name && $scope.newOrder.products.length > 0) {
                    $localStorage.orders.push($scope.newOrder);
                    for (var i = 0; i < $scope.products.length; i++) {
                        $scope.products[i].amount = '';
                    }
                    for (var i = 0; i < $scope.set.length; i++) {
                        $scope.set[i].amount = '';
                    }

                    $scope.newOrder = {
                        name: "",
                        date: new Date(),
                        products: []
                    }
                } else if ($scope.newOrder.name == '') {
                    swal(
                        'Dodaj nazwę zamówienia!',
                        '',
                        'warning'
                    )
                    $('#collapse3').collapse('hide')
                    $('#collapse1').collapse('show')
                    return;
                } else {
                    swal(
                        'Dodaj produkt do zamówienia!',
                        '',
                        'warning'
                    )
                    $('#collapse3').collapse('hide')
                    $('#collapse2').collapse('show')
                    return;
                }
                $('#collapse3').collapse('hide')
                $('#collapse1').collapse('show')
            }

            $scope.clearAll = function() {
                swal({
                    title: 'Czy chcesz wszystko wyczyścić?',
                    text: "",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Wyczyść!',
                    cancelButtonText: 'Anuluj!'
                }).then(function() {

                    $localStorage.orders = [];
                    $scope.currentOrders = $localStorage.orders;
                    $scope.newOrder = {
                        name: "",
                        date: new Date(),
                        products: []
                    }

                    swal(
                        'Wyczyszczono!',
                        '',
                        'success'
                    )

                    $scope.getCatalogFromAPI(); // W celu odświeżenia tablicy w zmiennej

                    $('#collapse3').collapse('hide')
                    $('#collapse1').collapse('show')
                })
            }
        }
    ]);

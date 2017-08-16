angular.module('Wss.Services.ContentSrvc', [
    'ngStorage'
])

.service('ContentSrvc', [
    '$http',
    '$localStorage',
    '$state',
    '$rootScope',
    '$window',
    '$q',


    function($http, $localStorage, $state, $rootScope, $window, $q) {


        this.getUsers = function() {
            $rootScope.showPreloader();
            var req = {
                method: 'GET',
                url: $rootScope.endpointURL + '/user',
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.users = data.data.users;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.getClients = function() {
            $rootScope.showPreloader();
            var req = {
                method: 'GET',
                url: $rootScope.endpointURL + '/client?uid=' + $localStorage.user.auth.uid + '&token=' + $localStorage.user.auth.token,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.clients = data.data.clients;
                $localStorage.generalStats = data.data.general_stats;
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.getLastUsers = function() {
            $rootScope.showPreloader();
            var req = {
                method: 'GET',
                url: $rootScope.endpointURL + '/user?recently_logged=1',
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.lastUsers = data.data.users;
                $rootScope.hidePreloader();

            });

            return promise;
        };

        this.getProducts = function() {
            $rootScope.showPreloader();
            var req = {
                method: 'GET',
                url: $rootScope.endpointURL + '/product',
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.products = data.data.products;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.getCatalog = function() {
            $rootScope.showPreloader();
            var req = {
                method: 'GET',
                url: $rootScope.endpointURL + '/catalog',
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.catalog = data.data.catalog;
                $rootScope.hidePreloader();
            });

            return promise;
        };


        this.getSet = function() {
            $rootScope.showPreloader();
            var req = {
                method: 'GET',
                url: $rootScope.endpointURL + '/products_set',
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.set = data.data.products_sets;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.sendSystemProvider = function(data) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                "system_provider": data.system_provider
            };

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/system_provider',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.sendSystem = function(data) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                "system": data.system
            };


            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/system',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };


        this.sendClient = function(data) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                "client": data.client
            };

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/client',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };


        this.sendUser = function(data) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                "user": data.user
            };

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/user',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };


        this.sendProduct = function(data) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                "product": data.product
            };

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/product',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.sendSet = function(data) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                "products_set": data.products_set
            };

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/products_set',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

         this.sendProductToSet = function(id_set, id_product, quantity) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
            };

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/products_set/' + id_set + '/product/' + id_product + '/' + quantity + '/',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };


        this.deleteClient = function(data) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                "id": data.id
            };


            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/client/delete',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();

            });

            return promise;
        };

        this.deleteUser = function(params) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                }
            };


            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/user/' + params.uid + '/delete/',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.deleteProduct = function(data, prod) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                "product": data.product
            };

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/product/' + prod.id + '/delete/',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.deleteSet = function(params) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                // "uid": data.uid
            };

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/products_set/' + params.uid + '/delete/',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.set = data.data.products_sets;
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.deleteSystemProvider = function(params) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
            };

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/system_provider/' + params.id + '/delete/',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.catalog = data.data.catalog;
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.deleteSystem = function(params) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
            };


            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/system/' + params.id + '/delete/',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.catalog = data.data.catalog;
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();

            });

            return promise;
        };

        this.deleteProductFromSet = function(data) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                "products_set": data.products_set
            };


            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/products_set/remove_product/',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.catalog = data.data.catalog;
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();

            });

            return promise;
        };


        this.updateClient = function(data, clientId) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                "client": data.client
            };

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/client/' + clientId + '/',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();

            });

            return promise;
        };

        this.updateProduct = function(data) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                "product": data.product
            };

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/product',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.updateSet = function(data, id) {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                "products_set": data.products_set
            };

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/products_set/' + id.uid + '/',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };

        this.generateOffer = function() {
            $rootScope.showPreloader();
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                }
            };

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/client/generate_offer/',
                data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.user.auth.token = data.data.auth.token;
                $rootScope.hidePreloader();
            });

            return promise;
        };
    }
]);

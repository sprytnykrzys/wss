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

            });

            return promise;
        };

        this.getClients = function() {

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

            });

            return promise;
        };

        this.getLastUsers = function() {

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


            });

            return promise;
        };

        this.getProducts = function() {

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

            });

            return promise;
        };

        this.getCatalog = function() {

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

            });

            return promise;
        };


        this.getSet = function() {

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

            });

            return promise;
        };

        this.sendSystemProvider = function(data) {

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
            });

            return promise;
        };

        this.sendSystem = function(data) {

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
            });

            return promise;
        };


        this.sendClient = function(data) {

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
            });

            return promise;
        };


        this.sendUser = function(data) {

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
            });

            return promise;
        };


        this.sendProduct = function(data) {

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
            });

            return promise;
        };

        this.sendSet = function(data) {

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
            });

            return promise;
        };


        this.deleteClient = function(data) {

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

            });

            return promise;
        };

        this.deleteUser = function(params) {

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

            });

            return promise;
        };

        this.deleteProduct = function(data, prod) {

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

            });

            return promise;
        };

        this.deleteSet = function(params) {

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
            });

            return promise;
        };

        this.deleteSystemProvider = function(params) {

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

            });

            return promise;
        };

        this.deleteSystem = function(params) {

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

            });

            return promise;
        };

        this.deleteProductFromSet = function(data) {

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

            });

            return promise;
        };


        this.updateClient = function(data, clientId) {
            var data = {
                "auth": {
                    "uid": $localStorage.user.auth.uid,
                    "token": $localStorage.user.auth.token
                },
                "client": data.newClient
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

            });

            return promise;
        };

        this.updateProduct = function(data) {

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
            });

            return promise;
        };

        this.updateSet = function(data, id) {

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
            });

            return promise;
        };

        this.generateOffer = function() {

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
            });

            return promise;
        };
    }
]);

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
                url: $rootScope.endpointURL + '/client',
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                $localStorage.clients = data.data.clients;

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
                $localStorage.set = data.data.set;

            });

            return promise;
        };

        this.sendSystemProvider = function(data) {

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

            });

            return promise;
        };

        this.sendSystem = function(data) {

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

            });

            return promise;
        };


        this.sendClient = function(data) {

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

            });

            return promise;
        };


        this.updateClient = function(data, clientId) {

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
                // $localStorage.clients = data.data.clients;

            });

            return promise;
        };

        this.sendUser = function(data) {

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

            });

            return promise;
        };


        this.deleteClient = function(data) {

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
                // $localStorage.clients = data.data.clients;

            });

            return promise;
        };


        this.deleteUser = function(data) {

            var req = {
                method: 'POST',
                url: $rootScope.endpointURL + '/user/' + data.uid + '/delete/',
                // data: data,
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                // $localStorage.clients = data.data.clients;

            });

            return promise;
        };


        this.sendProduct = function(data) {

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

            });

            return promise;
        };

        this.deleteProduct = function(data, prod) {

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
                // $localStorage.clients = data.data.clients;

            });

            return promise;
        };

        this.updateProduct = function(data) {

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

            });

            return promise;
        };
    }
]);

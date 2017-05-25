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



    }
]);

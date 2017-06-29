angular.module('Wss.Services.AuthorizationSrvc', [
    'ngStorage'
])

.service('AuthorizationSrvc', [
    '$http',
    '$localStorage',
    '$state',
    '$rootScope',
    '$window',
    '$q',
    function($http, $localStorage, $state, $rootScope, $window, $q) {

        var user = null;

        if ($localStorage.user) {
            user = $localStorage.user;
        };


        this.loginUser = function(params) {
            var req = {
                method: 'POST',
                data: params,
                url: $rootScope.endpointURL + "/user/login",
                headers: {
                    "Content-Type": "text/plain"
                }
            };

            var promise = $http(req);

            promise.then(function(data) {
                if (data.data.auth.role == "ADMIN") {
                    user = data.data;
                    user.who = 'admin';
                    $localStorage.user = user;
                    $rootScope.user = user;
                } else {
                    user = data.data;
                    user.who = 'client';
                    $localStorage.user = user;
                    $rootScope.user = user;
                }

            });

            return promise;
        };
    }
]);

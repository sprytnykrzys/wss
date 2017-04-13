angular.module('Wss.Routes', [
    'ui.router',
    'ngMaterial',

    'Wss.Services.AuthorizationSrvc',
    'Wss.Services.ContentSrvc',

    'Wss.Controllers.LoginCtrl',
    'Wss.Controllers.AdminCtrl',
    'Wss.Controllers.IndexCtrl',
    'Wss.Controllers.OfferCtrl',

])

.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$mdDateLocaleProvider',
        '$httpProvider',
        '$locationProvider',
        function($stateProvider, $urlRouterProvider, $mdDateLocaleProvider, $httpProvider, $locationProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl'
                })
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'views/admin.html',
                    controller: 'AdminCtrl'
                })
                .state('offer', {
                    url: '/offer',
                    templateUrl: 'views/offer.html',
                    controller: 'OfferCtrl'
                });



            // $locationProvider.html5Mode(true);


            $urlRouterProvider.otherwise(function($injector, $location) {
                var $state = $injector.get("$state");
                $state.go("login");
            });

        }
    ])
    .run(['$rootScope', '$state', '$localStorage', '$window', '$location', '$http', function($rootScope, $state, $localStorage, $window, $location, $http) {

        $rootScope.$on('$stateChangeStart', function(e, to, params, from) {
            $rootScope.currState = to.name;
            // $rootScope.parentCurrState = to.parent;


            //TODO - should be moved to config file






        });

    }]);

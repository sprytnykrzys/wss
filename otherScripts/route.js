angular.module('Wss.Routes', [
    'ui.router',
    'ngMaterial',

    'Wss.Services.AuthorizationSrvc',
    'Wss.Services.ContentSrvc',

    'Wss.Controllers.MainCtrl',
    'Wss.Controllers.AdminCtrl',
    'Wss.Controllers.AdminLoginCtrl',
    'Wss.Controllers.IndexCtrl',
  
])

.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$mdDateLocaleProvider',
        '$httpProvider',
        '$locationProvider',
        function($stateProvider, $urlRouterProvider, $mdDateLocaleProvider, $httpProvider, $locationProvider) {
            $stateProvider
                .state('main', {
                    url: '/main',
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl'
                })
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'views/admin.html',
                    controller: 'AdminCtrl'
                })
                .state('adminLogin', {
                    url: '/login',
                    templateUrl: 'views/adminLogin.html',
                    parent: 'admin',
                    controller: 'AdminLoginCtrl'
                });
           

            // $locationProvider.html5Mode(true);


            $urlRouterProvider.otherwise(function($injector, $location) {
                var $state = $injector.get("$state");
                $state.go("main");
            });

        }
    ])
    .run(['$rootScope', '$state', '$localStorage', '$window', '$location', '$http', function($rootScope, $state, $localStorage, $window, $location, $http) {

        $rootScope.$on('$stateChangeStart', function(e, to, params, from) {
            $rootScope.currState = to.name;
            $rootScope.parentCurrState = to.parent;


            //TODO - should be moved to config file






        });

    }]);

angular.module('Wss.Routes', [
    'ui.router',
    'ngMaterial',

    'Wss.Services.AuthorizationSrvc',
    'Wss.Services.ContentSrvc',

    'Wss.Controllers.MainCtrl',
    'Wss.Controllers.AdminCtrl',
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
                });
            

            // $locationProvider.html5Mode(true);


            $urlRouterProvider.otherwise(function($injector, $location) {
                var $state = $injector.get("$state");
                $state.go("admin");
            });

        }
    ])
    .run(['$rootScope', '$state', '$localStorage', '$window', '$location', '$http', function($rootScope, $state, $localStorage, $window, $location, $http) {

        $rootScope.$on('$stateChangeStart', function(e, to, params, from) {
            $rootScope.currState = to.name;
            $rootScope.parentCurrState = to.parent;

             e.preventDefault();
            $state.go('main');
  
            //TODO - should be moved to config file



        });

    }]);

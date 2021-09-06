angular
  .module("Wss.Routes", ["ui.router", "ngMaterial", "Wss.Services.AuthorizationSrvc", "Wss.Services.ContentSrvc", "Wss.Controllers.LoginCtrl", "Wss.Controllers.AdminCtrl", "Wss.Controllers.IndexCtrl", "Wss.Controllers.OfferCtrl", "Wss.Controllers.DashboardCtrl", "Wss.Controllers.ProductCtrl", "Wss.Controllers.SetCtrl", "Wss.Controllers.CatalogCtrl", "Wss.Controllers.CustomerCtrl", "Wss.Controllers.SearchCtrl", "Wss.Controllers.OrderCtrl"])

  .config([
    "$stateProvider",
    "$urlRouterProvider",
    "$mdDateLocaleProvider",
    "$httpProvider",
    "$locationProvider",
    function ($stateProvider, $urlRouterProvider, $mdDateLocaleProvider, $httpProvider, $locationProvider) {
      $stateProvider
        .state("login", {
          url: "/login",
          templateUrl: "views/login.html",
          controller: "LoginCtrl",
        })
        .state("admin", {
          url: "/admin",
          templateUrl: "views/admin.html",
          controller: "AdminCtrl",
        })
        .state("offer", {
          url: "/offer",
          templateUrl: "views/offer.html",
          controller: "OfferCtrl",
        })
        .state("dashboard", {
          url: "/dashboard",
          templateUrl: "views/dashboard.html",
          parent: "admin",
          controller: "DashboardCtrl",
        })
        .state("product", {
          url: "/product",
          templateUrl: "views/product.html",
          parent: "admin",
          controller: "ProductCtrl",
        })
        .state("set", {
          url: "/set",
          templateUrl: "views/set.html",
          parent: "admin",
          controller: "SetCtrl",
        })
        .state("catalog", {
          url: "/catalog",
          templateUrl: "views/catalog.html",
          parent: "admin",
          controller: "CatalogCtrl",
        })
        .state("customer", {
          url: "/customer",
          templateUrl: "views/customer.html",
          parent: "admin",
          controller: "CustomerCtrl",
        })
        .state("search", {
          url: "/search",
          templateUrl: "views/search.html",
          parent: "offer",
          controller: "SearchCtrl",
        })
        .state("order", {
          url: "/order",
          templateUrl: "views/order.html",
          parent: "offer",
          controller: "OrderCtrl",
        });

      // $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get("$state");
        $state.go("login");
      });
    },
  ])
  .run([
    "$rootScope",
    "$state",
    "$localStorage",
    "$window",
    "$location",
    "$http",
    function ($rootScope, $state, $localStorage, $window, $location, $http) {
      $rootScope.$on("$stateChangeStart", function (e, to, params, from) {
        $rootScope.currState = to.name;
        $rootScope.parentCurrState = to.parent;

        if ($localStorage.user && !$rootScope.user) {
          $rootScope.user = $localStorage.user;
        }

        //TODO - should be moved to config file

        $rootScope.endpointURL = "http://wss-app.k-org.pl";

        // if (to.name == 'admin') {
        //     e.preventDefault();
        //     $state.go('dashboard');
        // }

        // if (to.name == 'offer') {
        //     e.preventDefault();
        //     $state.go('search');
        // }

        //  if ((to.name == 'admin') && (!$localStorage.user || $localStorage.user.who !== "admin")) {
        //     e.preventDefault();
        //     $state.go('login');
        // }
        if (to.name != "login" && (to.parent == "admin" || to.name == "admin") && (!$localStorage.user || $localStorage.user.who !== "admin")) {
          e.preventDefault();
          $state.go("login");
        } else if ($localStorage.user && $localStorage.user.who == "admin" && to.name == "admin") {
          e.preventDefault();
          $state.go("dashboard");
        }

        if (to.name != "login" && (to.parent == "offer" || to.name == "offer") && !$localStorage.user) {
          e.preventDefault();
          $state.go("login");
        } else if ($localStorage.user && to.name == "offer") {
          e.preventDefault();
          $state.go("search");
        }

        $rootScope.preloaderCounter = 0;

        $rootScope.showPreloader = function () {
          $rootScope.preloaderCounter++;
        };

        $rootScope.hidePreloader = function () {
          $rootScope.preloaderCounter--;
        };
      });
    },
  ]);

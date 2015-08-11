'use strict';
var App = angular
  .module('chatwebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
]).config(function ($routeProvider, localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('chatwebApp')
    .setStorageType('sessionStorage')
    .setNotify(true, true);
    $routeProvider
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
    })
     .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        resolve : Authorize
    })
    .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
    })
      .when('/base', {
        //templateUrl: 'views/main.html',  //main controller will be used to inject common services...
        controller: 'BaseCtrl',
        controllerAs: 'base'
    })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
    })
      .otherwise({
        redirectTo: '/'
    });
})



var Authorize = {
    authenticate : ["$location", "AuthenticationService", function ($location, AuthenticationService) {
            var p = AuthenticationService.authenticate();
            p.then(function (result) { 
                if (!result) {
                    $location.path('login');
                } 
            }, function (result) { 
                $location.path('login');
            });
            return p;
        }]
}

'use strict';

/**
 * @ngdoc overview
 * @name chatwebApp
 * @description
 * # chatwebApp
 *
 * Main module of the application.
 */
var App = angular
  .module('chatwebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
    })
     .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
    })
    .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
    })
      .when('/main', {
        //templateUrl: 'views/main.html',  //main controller will be used to inject common services...
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
    })
      .otherwise({
        redirectTo: '/'
    });
});
App.service('appService', function () {
    return {
        hideMessage : function () {
            $("#message-box").fadeOut(100, function () {
                $("#message-box span").remove();
            });
        },
        showMessage : function (message) {
            if ($("#message-box span").length == 0) {
                $("#message-box").fadeIn(100);
                var span = $("<span/>").html("<strong>Info: </strong>" + message);
                $("#message-box").append(span);
            } else {
                $("#message-box span").html("<strong>Info: </strong>" + message)
            }
           
        }
    }
});

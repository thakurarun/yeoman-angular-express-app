'use strict';

/**
 * @ngdoc function
 * @name chatwebApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the chatwebApp
 */
angular.module('chatwebApp')
  .controller('DashboardCtrl', ['$scope', '$http', '$cookies', 'AuthenticationService', 'appService', 
    function ($scope, $http, $cookies, AuthenticationService, appService) {
        $scope.name = appService.GetLogedInUserName();
        $scope.$root.$broadcast("UpdateLoginStatus");
    }]);

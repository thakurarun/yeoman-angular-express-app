'use strict';

/**
 * @ngdoc function
 * @name chatwebApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the chatwebApp
 */
angular.module('chatwebApp')
  .controller('DashboardCtrl', ['$scope', '$http', 'appService', function ($scope, $http, appService) {
        $scope.service = appService;
    }]);

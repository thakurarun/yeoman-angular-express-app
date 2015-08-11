'use strict';

/**
 * @ngdoc function
 * @name chatwebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatwebApp
 */
angular.module('chatwebApp')
  .controller('BaseCtrl', ['$scope','appService', function ($scope, appService) {
        $scope.service = appService;
      
    }]);

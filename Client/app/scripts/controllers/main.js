'use strict';

/**
 * @ngdoc function
 * @name chatwebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatwebApp
 */
angular.module('chatwebApp')
  .controller('MainCtrl', ['$scope', 'appService', function ($scope, appService) {
        $scope.service = appService; //Expose service to full container and call any common function there..
    }]);

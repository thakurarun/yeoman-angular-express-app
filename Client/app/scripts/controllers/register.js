'use strict';

/**
 * @ngdoc function
 * @name chatwebApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the chatwebApp
 */
angular.module('chatwebApp')
  .controller('RegisterCtrl', ['$scope' , '$http', 'appService', function ($scope, $http, appService) {
        $scope.service = appService;
        $scope.processRegistration = function () {
            $http({
                method  : 'POST', 
                url : '/public/register', 
                data : $.param($scope.model), 
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {
                if (typeof data.IsSuccess != 'undefined' && data.IsSuccess) {
                    window.location.hash = '/';
                    appService.showMessage("Successfuly registered.")
                }
            }).error(function (data, status, headers, config) {
                appService.showMessage("some thing wrong happen");
            });
        }
    }]);





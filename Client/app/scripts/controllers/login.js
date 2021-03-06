'use strict';

/**
 * @ngdoc function
 * @name chatwebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the chatwebApp
 */
angular.module('chatwebApp')
  .controller('LoginCtrl', ['$scope', '$http','appService','localStorageService', function ($scope, $http,appService, localStorageService) {
        $scope.service = appService;
        localStorageService.set('isLoggedIn',false);
        $scope.processLogin = function () {
            $http({
                method  : 'POST', 
                url : '/public/login', 
                data : $.param($scope.model), 
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {
                if (typeof data.IsSuccess != 'undefined') {
                    if (data.IsSuccess) {
                         window.location.hash = '/';
                    }
                    else {
                        appService.showMessage(data.Message)
                    }
                }
            }).error(function (data, status, headers, config) {
                appService.showMessage("some thing wrong happen");
            });
        }
    }]);

'use strict';
/**
 * @ngdoc function
 * @name chatwebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatwebApp
 */
angular.module('chatwebApp')
  .controller('HeaderCtrl', ['$scope', '$location', 'AuthenticationService','appService', function ($scope, $location, AuthenticationService, appService) {
        $scope.IsLoggedIn = appService.IsLoggedIn();
        $scope.$on("UpdateLoginStatus", function (event, args) {
            $scope.IsLoggedIn = appService.IsLoggedIn();
        });
        $scope.logoutMe = function (){
            var promise = AuthenticationService.logout();
            promise.then(function () {
                $scope.IsLoggedIn = appService.IsLoggedIn();
                $location.path('/login');
            }, function () { 
                alert("some thing wrong happen :(");
            })
            
            
        }
    }]);

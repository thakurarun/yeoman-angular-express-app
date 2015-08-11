'use strict';
angular
  .module('chatwebApp').service('AuthenticationService', ['$cookies', '$http','$q', 'localStorageService', function ($cookies, $http, $q, localStorageService) {
        return {
            authenticate : function () {
                var p = $q(function (resolve, reject) {
                    if (!$cookies.get('__auth')) {
                        reject(false);
                    } 
                    else if ($cookies.get('__auth')) {
                        var options = {};
                        options.headers = { '__auth': $cookies.get('__auth') || null };
                        var promise = $http.post('public/authenticate', {}, options).then(function (response) {
                            if (localStorageService.isSupported) {
                                var storageType = localStorageService.getStorageType();
                                localStorageService.set('myname', response.data.Name[0]);
                                localStorageService.set('isLoggedIn', response.data.IsValid);
                            }
                            resolve(true);
                        }, function (response) {
                            reject(false);
                        });
                        return promise;
                    } 
                    else {
                        reject(false);
                    }
                });
                return p;
            },
            logout: function () {
                var options = {};
                options.headers = { '__auth': $cookies.get('__auth') || null };
                var promise = $http.post('api/logout', {}, options).then(function (response) {
                    localStorageService.set('isLoggedIn', false);
                    return response.data.IsValid;
                }, function (response) {
                    return false;
                });
                return promise;
            }
        }
    }]);

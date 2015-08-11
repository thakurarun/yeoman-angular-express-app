'use strict';
angular
   .module('chatwebApp').service('appService', ['localStorageService', function (localStorageService) {
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
           
            },
            IsLoggedIn : function () {
                return localStorageService.get('isLoggedIn') || false;
            },
            GetLogedInUserName : function (){
                return localStorageService.get('myname') || "Guest";
            }
        }
    }]);
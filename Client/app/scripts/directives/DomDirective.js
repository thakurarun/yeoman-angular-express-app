var App = angular.module('chatwebApp');
App.directive('tabClick', function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
                // $(".tab").addClass("active"); // instead of this do the below 
                $(this).removeClass("btn-default").addClass("btn-primary");
            });
        }
    };
});

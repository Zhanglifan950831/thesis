angular.module('directive',[])
.directive('stuNav', ['$location',function ($location){
    return {
        restrict: 'A',
        templateUrl: 'views/student.nav.html',
        replace: true,
        scope:{
            chosenIdx:'@chosen'
        },
        link: function($scope, iElm, iAttrs, controller) {
            /*获取用户名*/
            $scope.userName=publicJs.getLocalStore('userName');
            /*登出*/
            $scope.logOut=function(){
                publicJs.removeStore('userName');
                $location.path('/');
            }
        }
    };
}])
.directive('teacherNav', ['$location',function ($location){
    return {
        restrict: 'A',
        templateUrl: 'views/teacher.nav.html',
        replace: true,
        scope:{
            chosenIdx:'@chosen'
        },
        link: function($scope, iElm, iAttrs, controller) {
            /*获取用户名*/
            $scope.userName=publicJs.getLocalStore('userName');
            /*登出*/
            $scope.logOut=function(){
                publicJs.removeStore('userName');
                $location.path('/');
            }
        }
    };
}])
;
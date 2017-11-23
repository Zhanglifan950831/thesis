angular.module('thesis', ['ngRoute', 'directive'])
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            template: '<login></login>'
        })
            .when('/student', {
                template: '<student></student>'
            })
            .when('/teacher', {
                template: '<teacher></teacher>'
            })
            .when('/pasInfo', {
                template: '<pas-info></pas-info>'
            }).when('/arcticle', {
            template: '<arcticle></arcticle>'
        })
            .when('/result', {
                template: '<result></result>'
            })
            .when('/pasTeacherInfo', {
                template: '<pas-teacher-info></pas-teacher-info>'
            })
            .when('/arcRelease', {
                template: '<arc-release></arc-release>'
            })
            .when('/arcJudge', {
                template: '<arc-judge></arc-judge>'
            })
            .when('/admin/index', {      // 管理员首页
                template: '<admin-index></admin-index>'
            })
            .otherwise({redirectTo: '/'});

        $httpProvider.defaults.transformRequest = function (obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        }

        $httpProvider.defaults.headers.post = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }])
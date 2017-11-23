angular.module('thesis')
/*登陆模块*/
    .component('login', {
        templateUrl: 'views/login.template.html',
        transclude: true,
        controller: ['$scope', '$http', '$location', function ($scope, $http, $location) {
            /*初始化*/
            $scope.chosenIdx = 1;
            $scope.stu = {No: '', pwd: ''};
            $scope.teacher = {No: '', pwd: ''};
            /*改变入口*/
            $scope.changeEntry = function (type) {
                if (type == 1) {
                    $scope.isShow = true;
                } else if (type == 2) {
                    $scope.isShow = false;
                }
                $scope.chosenIdx = type;
            }
            $scope.submit = function (entry) {
                if (entry == 1) {
                    if (publicJs.isEmpty($scope.stu.No)) {
                        alert('学号不能为空');
                        return;
                    }
                    if (publicJs.isEmpty($scope.stu.pwd)) {
                        alert('密码不能为空');
                        return;
                    }
                    $scope.stu.entry = 1;
                    var data = $scope.stu;
                } else {
                    if (entry == 2 && publicJs.isEmpty($scope.teacher.No)) {
                        alert('教师编号不能为空');
                        return;
                    } else if (entry == 3 && publicJs.isEmpty($scope.teacher.No)) {
                        alert('管理员账号不能为空');
                        return;
                    }

                    if (publicJs.isEmpty($scope.teacher.pwd)) {
                        alert('密码不能为空');
                        return;
                    }
                    $scope.teacher.entry = 2;
                    var data = $scope.teacher;
                }
                $http.get('php/login.php', {params: data})
                    .success(function (info) {
                        if (info.errCode == 0) {
                            publicJs.setLocalStore('userName', info.userName);
                            entry == 1 ? $location.path('/student') : entry == 2 ? $location.path('/teacher') : $location.path('/admin/index');
                        }
                        else {
                            alert(info.msg);
                            entry == 1 ? $scope.stu.pwd = '' : $scope.teacher.pwd = '';
                        }
                    })
            }
        }]
    })
    /*学生首页模块*/
    .component('student', {
        templateUrl: 'views/student.index.template.html',
        transclude: true,
        controller: ['$scope', '$location', '$http', function ($scope, $location, $http) {
            /*判断用户是否登陆，若否则进入登陆界面*/
            if (publicJs.getLocalStore('userName') == 'null') {
                $location.path('/');
            }
            ;

            $http.get('php/getInfo.php', {
                params: {
                    userName: publicJs.getLocalStore('userName'),
                    entry: 1
                }
            }).success(function (info) {
                if (info.errCode == 0) {
                    $scope.stuInfo = info.data;
                }
                else {
                    alert(info.msg);
                }
            })
        }]
    })
    /*教师首页模块*/
    .component('teacher', {
        templateUrl: 'views/teacher.index.template.html',
        transclude: true,
        controller: ['$scope', '$location', '$http', function ($scope, $location, $http) {
            /*判断用户是否登陆，若否则进入登陆界面*/
            if (publicJs.getLocalStore('userName') == 'null') {
                $location.path('/');
            }
            ;

            $http.get('php/getInfo.php', {
                params: {
                    userName: publicJs.getLocalStore('userName'),
                    entry: 2
                }
            }).success(function (info) {
                if (info.errCode == 0) {
                    $scope.teacherInfo = info.data;
                }
                else {
                    alert(info.msg);
                }
            })
        }]
    })
    /*密码修改*/
    .component('pasInfo', {
        templateUrl: 'views/pasInfo.template.html',
        transclude: true,
        controller: ['$scope', '$http', '$location', function ($scope, $http, $location) {
            $scope.user = {
                'userPwd': '',
                'newUserPwd': '',
                'newUserPwd1': ''
            };
            $scope.user.entry = 1;
            $scope.user.userName = publicJs.getLocalStore('userName');
            $scope.isOk = false;
            /*重置*/
            $scope.reset = function () {
                for (var key in $scope.user) {
                    $scope.user[key] = '';
                }
            }
            /*提交*/
            $scope.submit = function () {
                if (publicJs.isEmpty($scope.user.userPwd)) {
                    $scope.msg = '旧密码不能为空!';
                    return;
                }
                if (publicJs.isEmpty($scope.user.newUserPwd)) {
                    $scope.msg0 = '新密码不能为空!';
                    return;
                }
                else {
                    $scope.isShow = true;
                }
                if (publicJs.isEmpty($scope.user.newUserPwd1)) {
                    $scope.msg1 = '确认密码不能为空!';
                    return;
                }

                if ($scope.user.newUserPwd != $scope.user.newUserPwd1) {
                    alert('两次密码输入不一致,请重输!');
                    $scope.user.newUserPwd1 = '';
                    $scope.isSame = false;
                    return;
                }
                else {
                    $scope.isShow0 = true;
                }
                $http.post('php/changePass.php', $scope.user, {'Content-Type': 'application/x-www-form-urlencoded'}).success(function (info) {
                    if (info.errCode == 0) {
                        alert('密码修改成功');
                        $location.path('/student');
                    }
                    else {
                        alert(info.msg);
                    }
                })
            }
            /*验证原始密码是否正确*/
            $scope.valid = function () {
                $http.get('php/changePass.php', {params: $scope.user}).success(function (info) {
                    if (info.errCode == 0) {
                        $scope.isOk = true;
                    }
                    else {
                        $scope.isOk = false;
                        $scope.msg = info.msg;
                    }
                })
            }
        }]
    })
    /*教师密码修改*/
    .component('pasTeacherInfo', {
        templateUrl: 'views/pasTeacherInfo.template.html',
        transclude: true,
        controller: ['$scope', '$http', '$location', function ($scope, $http, $location) {
            $scope.user = {
                'userPwd': '',
                'newUserPwd': '',
                'newUserPwd1': ''
            };
            $scope.user.entry = 2;
            $scope.user.userName = publicJs.getLocalStore('userName');
            $scope.isOk = false;
            /*重置*/
            $scope.reset = function () {
                for (var key in $scope.user) {
                    $scope.user[key] = '';
                }
            }
            /*提交*/
            $scope.submit = function () {
                if (publicJs.isEmpty($scope.user.userPwd)) {
                    $scope.msg = '旧密码不能为空!';
                    return;
                }
                if (publicJs.isEmpty($scope.user.newUserPwd)) {
                    $scope.msg0 = '新密码不能为空!';
                    return;
                }
                else {
                    $scope.isShow = true;
                }
                if (publicJs.isEmpty($scope.user.newUserPwd1)) {
                    $scope.msg1 = '确认密码不能为空!';
                    return;
                }

                if ($scope.user.newUserPwd != $scope.user.newUserPwd1) {
                    alert('两次密码输入不一致,请重输!');
                    $scope.user.newUserPwd1 = '';
                    $scope.isSame = false;
                    return;
                }
                else {
                    $scope.isShow0 = true;
                }
                $http.post('php/changePass.php', $scope.user, {'Content-Type': 'application/x-www-form-urlencoded'}).success(function (info) {
                    if (info.errCode == 0) {
                        alert('密码修改成功');
                        $location.path('/student');
                    }
                    else {
                        alert(info.msg);
                    }
                })
            }
            /*验证原始密码是否正确*/
            $scope.valid = function () {
                $http.get('php/changePass.php', {params: $scope.user}).success(function (info) {
                    if (info.errCode == 0) {
                        $scope.isOk = true;
                    }
                    else {
                        $scope.isOk = false;
                        $scope.msg = info.msg;
                    }
                })
            }
        }]
    })
    .component('arcticle', {
        templateUrl: "views/arcticle.template.html",
        transclude: true,
        controller: ['$scope', '$http', function ($scope, $http) {
            var obj = {
                'page': 1
            };
            $scope.pages = [];
            var getData = function (obj) {
                $http.get('php/getArctile.php', {params: obj}).success(function (info) {
                    if (info.errCode == 0) {
                        $scope.arcticleInfo = info.data;
                        if ($scope.pages.length == 0) {
                            for (var i = 1; i <= info.pages; i++) {
                                $scope.pages.push(i)
                            }
                            ;
                            $scope.tempPages = $scope.pages.slice(0, 5);
                        }
                        ;
                    }
                })
            }
            /*搜索和教师相关的选题*/
            $scope.search = function () {
                obj.arcInstructor = $scope.arcInstructor;
                getData(obj);
            }
            /*分页*/
            $scope.changePage = function (page) {
                obj.page = page;
                getData(obj);
                if ($scope.pages.length > 5) {
                    $scope.tempPages = $scope.pages.slice(Math.ceil(page / 3), Math.ceil(page / 3) + 5);
                }
                ;
            }
            /*选择选题*/
            $scope.choose = function (id) {
                if (confirm('确认选择该选题?')) {
                    if (!$scope.isChosen) {
                        $http.post('php/postData.php', {
                            arcId: id,
                            arcStu: publicJs.getLocalStore('userName')
                        }, {'Content-type': 'application/x-www-form-urlencoded'}).success(function (info) {
                            if (info.errCode == 0) {
                                alert('选题成功,等待审核!');
                            } else {
                                if (info.msg) {
                                    alert(info.msg);
                                    return;
                                }
                                alert('请稍后重试!');
                            }
                        })
                    } else {
                        alert('您已选择了一个选题！');
                    }
                }
            }
            /*初始化*/
            getData(obj);
        }]
    })
    /*选题结果*/
    .component('result', {
        templateUrl: "views/result.template.html",
        transclude: true,
        controller: ['$scope', '$http', function ($scope, $http) {
            $http.get('php/getChosenArcticle.php', {params: {arcStu: publicJs.getLocalStore('userName')}}).success(function (info) {
                if (info.errCode == 0 && info.data) {
                    $scope.arcInfo = info.data[0];
                }
                ;
            })
        }]
    })
    /*选题发布*/
    .component('arcRelease', {
        templateUrl: 'views/arcRelease.template.html',
        transclude: true,
        controller: ['$scope', '$http', function ($scope, $http) {
            var obj = {'arcInstructor': publicJs.getLocalStore('userName')};
            var getData = function () {
                $http.get('php/arcRelease.php', {params: obj}).success(function (info) {
                    $scope.arcInfo = info.data;
                })
            }
            getData();
            /*发布选题*/
            $scope.release = function () {
                if (publicJs.isEmpty($scope.arcName)) {
                    alert('题目不能为空');
                } else {
                    obj.arcName = $scope.arcName;
                    $http.post('php/arcRelease.php', obj, {'Content-type': 'application/x-www-form-urlencoded'}).success(function (info) {
                        if (info.errCode == 0) {
                            alert('选题发布成功!');
                            $scope.arcInfo = info.data;
                        } else {
                            alert(info.msg);
                        }
                        $scope.arcName = '';
                    })
                }
                ;
            }
        }]
    })
    /*选题评定*/
    .component('arcJudge', {
        templateUrl: 'views/arcJudge.template.html',
        transclude: true,
        controller: ['$scope', '$http', function ($scope, $http) {
            /*获取数据*/
            var getData = function () {
                $http.get('php/getStuArcticle.php', {params: {arcInstructor: publicJs.getLocalStore('userName')}}).success(function (info) {
                    if (info.errCode == 0) {
                        $scope.arcInfo = info.data;
                    }
                })
            }
            /*初始化*/
            getData();

            /*提交数据*/
            var postData = function (data) {
                $http.post('php/postData.php', data, {'Content-type': 'application/x-www-form-urlencoded'}).success(function (info) {
                    if (info.errCode == 0) {
                        alert('操作成功');
                        getData();
                    }
                    ;
                })
            }
            /*弹出层*/
            $scope.param = {};
            $scope.showDialog = function (id, score) {
                $('#modal').modal('show');
                $scope.param.arcId = id;
                $scope.param.arcScore = score;
            }

            /*处理*/
            $scope.deal = function (id, type) {
                $scope.param.arcId = id;
                $scope.param.arcState = 2;
                postData($scope.param);
            }

            /*保存成绩*/
            $scope.save = function () {
                delete $scope.param.arcState;
                if (publicJs.isNumber($scope.param.arcScore)) {
                    postData($scope.param);
                    $('#modal').modal('hide');
                } else {
                    alert('请输入数字');
                }

            }
        }]
    })
    /*管理员首页*/
    .component('adminIndex', {
        templateUrl: 'views/adminIndex.template.html',
        transclude: true,
        controller: ['$scope', '$http', '$location', function ($scope, $http, $location) {
            /*判断用户是否登陆，若否则进入登陆界面*/
            if (publicJs.getLocalStore('userName') == 'null') {
                $location.path('/');
            }
            ;

            $scope.chosenIdx = 1;
            /*获取用户名*/
            $scope.userName = publicJs.getLocalStore('userName');
            /*登出*/
            $scope.logOut = function () {
                publicJs.removeStore('userName');
                $location.path('/');
            }

            $scope.teacher = {};
            $scope.student = {};
            /*录入数据*/
            $scope.recordData = function (entry) {
                var param = {};
                var tempParam = entry == 1 ? $scope.teacher : $scope.student;   //临时参数对象
                if (!checkData(tempParam)) return;
                param.userNo = tempParam.userNo;
                param.userName = tempParam.userName;
                param.gender = tempParam.gender;
                param.major = tempParam.major;
                param.entitleTime = new Date(tempParam.entitleTime).getTime();
                param.entry = entry;
                $http.post('./php/dealData.php', param).success(function (info) {
                    if (info.errCode == 0) {
                        /*数据成功插入,清空表单中的内容*/
                        $scope.teacher = {};
                        $scope.student = {};
                        alert('数据录入成功!');
                    } else {
                        alert(info.msg);
                        alert('上次插入的用户编号为：' + info.lastUserNo.userNo);
                    }
                })
            }
            /*检查数据*/
            var checkData = function (objData) {
                if (objData.userNo == undefined || publicJs.isEmpty(objData.userNo)) {
                    alert('用户编号不能为空!');
                    return false;
                }
                ;
                if (objData.userName == undefined || publicJs.isEmpty(objData.userName)) {
                    alert('用户姓名不能为空!');
                    return false;
                }
                ;
                if (objData.gender == undefined || publicJs.isEmpty(objData.gender)) {
                    alert('请填写用户性别!');
                    return false;
                }
                ;
                if (objData.major == undefined || publicJs.isEmpty(objData.major)) {
                    alert('请填写用户专业方向!');
                    return false;
                }
                ;
                if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(objData.entitleTime) || objData.entitleTime == undefined || publicJs.isEmpty(objData.entitleTime)) {
                    alert('请填写正确的日期格式!');
                    return false;
                }
                ;
                return true;
            }
        }]
    })
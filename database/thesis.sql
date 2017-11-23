#创建论文选题数据库
drop database if exists thesis;
create database thesis charset=utf8;
    use thesis;
    set names utf8;
    #创建用户表
    create table user(
            uid int auto_increment primary key,
            userNo char(12),
            userName varchar(50),
            userPwd char(32),
            gender char(4),
            major varchar(50),
            entitleTime bigint
        );
    #加入初始数据
    INSERT INTO user(userNo,userName,userPwd,gender,major,entitleTime) VALUES('201340533064','张李凡','e10adc3949ba59abbe56e057f20f883e','男','数字媒体技术',1377964800000),('201340533001','张三','e10adc3949ba59abbe56e057f20f883e','男','电子信息专业',1377964800000),('201340533002','李四','e10adc3949ba59abbe56e057f20f883e','男','计算机科学',1377964800000),('201340533003','王五','e10adc3949ba59abbe56e057f20f883e','女','环境工程',1377964800000),('201340533004','赵六','e10adc3949ba59abbe56e057f20f883e','女','广播电视学',1377964800000),('201340533005','田七','e10adc3949ba59abbe56e057f20f883e','女','材料化学',1377964800000);
    #创建教师表
    create table teacher(
            tid int auto_increment primary key,
            userNo char(10),
            userName varchar(50),
            userPwd char(32),
            gender char(4),
            major varchar(50),
            entitleTime bigint
        );
    #加入初始数据,时间戳:1278864000000,管理员账号密码均为:admin
    INSERT INTO teacher(userNo,userName,userPwd,gender,major,entitleTime) VALUES('admin','admin','21232f297a57a5a743894a0e4a801fc3',null,null,null),('00001','王立明','e10adc3949ba59abbe56e057f20f883e','男','计算机应用',1278864000000),('00002','张三','e10adc3949ba59abbe56e057f20f883e','男','计算机应用',1278864000000),('00003','李四','e10adc3949ba59abbe56e057f20f883e','男','计算机应用',1278864000000),('00004','王五','e10adc3949ba59abbe56e057f20f883e','男','计算机应用',1278864000000),('00005','赵六','e10adc3949ba59abbe56e057f20f883e','男','计算机应用',1278864000000),('00007','田七','e10adc3949ba59abbe56e057f20f883e','男','计算机应用',1278864000000);
    #创建论文选题表
    create table arcticle(
            arcId int auto_increment primary key,   
            arcName varchar(50),    #论文题目
            arcInstructor varchar(50),  #指导教师
            arcStu varchar(50), #选题学生
            arcScore int,    #论文选题成绩
            arcState int    #论文状态
        );
    #加入初始数据
    INSERT INTO arcticle(arcName,arcInstructor,arcStu,arcState,arcScore) VALUES('本科生毕业选题系统的设计与实现','王立明','',0,0),('全景摄影的设计与制作','王娜','',0,0),('二维动画《一切都是最好的安排》的设计与制作 ','王娜','',0,0),('视频广告的设计与制作','王娜','',0,0),('以用户体验为导向的电子商务网页界面设计与制作','刘巧丽','',0,0),('扁平化风格在网页界面设计中的运用','刘巧丽','',0,0),('基于智能手机的农业信息网的设计与制作','刘巧丽','',0,0),('响应式网页布局技术的研究','刘巧丽','',0,0),('《摄影艺术与技术》网络课程的设计与开发','刘巧丽','',0,0),('响应式网页布局技术的研究','刘巧丽','',0,0),('HTML5在WEB前端开发中的应用','刘巧丽','',0,0),('数字技术对当代摄影创作影响的研究','张晓星','',0,0),('校园微视频创作现状浅析','张晓星','',0,0),('自媒体影像的视觉表达与功能研究','张晓星','',0,0),('基于AE表达式的电视频道包装设计与实现','张晓星','',0,0),('基于影视作品后期编辑下的AE应用','张晓星','',0,0),('摄像机运动轨迹跟踪技术在影视制作中的应用','张晓星','',0,0),('基于AE合成软件的《交通安全公益广告》动画设计与实现','张晓星','',0,0),(' 高校实验室机房信息管理系统设计与实现','王立明','',0,0),(' 高校（院系）门户网站的设计与实现','王立明','',0,0),(' 图书信息管理系统设计与实现','王立明','',0,0),(' 基于WEB的高校学生考勤管理信息系统设计与实现','王立明','',0,0);
<?php  
    header('Content-type:application/json;charset=utf-8');

    /*加载连接数据库文件*/
    require_once('conn.php');

    $output=[];     //输出内容

    $entry=$_GET['entry'];
    $userName=$_GET['userName'];

    $tableName=$entry==1?'user':'teacher';

    /*定义sql查询语句*/
    $sql="SELECT userNo,userName,gender,major,entitleTime FROM $tableName WHERE userName='$userName'";
    $result=$mysqli->query($sql);

    if ($mysqli->affected_rows>0) {
        $rows=$result->fetch_assoc();
        $output['errCode']=0;
        $output['data']=$rows;
    } else {
        $output['errCode']=$mysqli->errno;
        $output['numRows']=$mysqli->affected_rows;
        $output['msg']='用户信息未找到';
    }

    echo json_encode($output);

    $mysqli->close();   //关闭数据库连接
?>
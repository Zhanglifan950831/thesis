<?php  
    header('Content-type:application/json;charset=utf-8');

    require_once('conn.php');

    $output=[];

    $userPwd=md5($_REQUEST['userPwd']);
    $userName=$_REQUEST['userName'];
    $entry=$_REQUEST['entry'];
    $tableName=$entry==1?'user':'teacher';

    $sql="SELECT userNo FROM $tableName WHERE userPwd=? AND userName=?";
    $stmt=$mysqli->prepare($sql);
    $stmt->bind_param('ss',$userPwd,$userName);
    $stmt->execute();
    $stmt->bind_result($userNo);
    $stmt->store_result();

    if ($stmt->num_rows) {
        if (isset($_POST['newUserPwd'])) {
            $newUserPwd=md5($_POST['newUserPwd']);
            $sql="UPDATE $tableName SET userPwd=? WHERE userNo=?";
            $stmt=$mysqli->prepare($sql);
            $stmt->bind_param('ss',$newUserPwd,$userNo);
            $stmt->execute();
            if (!$stmt->error) {
                $output['errCode']=0;
            }
            else{
                $output['errCode']=$stmt->errno;
                $output['msg']='密码修改失败,请稍后重试';
            }

        } else {
            $output['errCode']=0;
        }
    } else {
        $output['errCode']=$stmt->errno;
        $output['msg']='用户密码输入不正确,请重输!';
    }

    echo json_encode($output);

    $stmt->close();
    $mysqli->close();
?>
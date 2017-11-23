<?php  
    header('Content-type:application/json;charset=utf-8');

    require_once('conn.php');

    $output=[];

    $arcId=$_POST['arcId'];
    if (isset($_POST['arcStu'])) {
        $arcStu=$_POST['arcStu'];
        $sql="SELECT arcId FROM arcticle WHERE arcStu='$arcStu'";
        $result=$mysqli->query($sql);
        if($result->num_rows>0){
            $output['msg']='您已选择了一个选题！';
            echo json_encode($output);
            exit;
        }
        else{
            $sql="UPDATE arcticle SET arcStu =?,arcState=1 WHERE arcId=?";
            $stmt=$mysqli->prepare($sql);
            $stmt->bind_param('ss',$arcStu,$arcId);
        }
    }
    if (isset($_POST['arcScore'])) {
        $arcScore=$_POST['arcScore'];
        $sql="UPDATE arcticle SET arcScore=? WHERE arcId=?";
        $stmt=$mysqli->prepare($sql);
        $stmt->bind_param('si',$arcScore,$arcId);
    }
    if (isset($_POST['arcState'])) {
        $arcState=$_POST['arcState'];
        $sql="UPDATE arcticle SET arcState=? WHERE arcId=?";
        $stmt=$mysqli->prepare($sql);
        $stmt->bind_param('si',$arcState,$arcId);
    }
    
    $stmt->execute();

    if($stmt->affected_rows){
        $output['errCode']=0;
    }
    else{
        $output['errCode']=$stmt->errno;
    }

    echo json_encode($output);
    $stmt->close();
    $mysqli->close();
?>
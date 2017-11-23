<?php  
    header('Content-type:application/json;charset=utf-8');

    require_once('conn.php');

    $arcInstructor=$_REQUEST['arcInstructor'];

    if (isset($_POST['arcName'])) {
       $arcName=$_POST['arcName'];
           $sql="SELECT arcId FROM arcticle WHERE arcName='$arcName' AND arcInstructor='$arcInstructor'";
           $result=$mysqli->query($sql);
           if($result->num_rows==0){
               $sql="INSERT INTo arcticle(arcName,arcInstructor,arcStu,arcState,arcScore) VALUES(?,?,?,?,?)";
               $stmt=$mysqli->prepare($sql);
               $defaultStu='';
               $defaultState=0;
               $defaultScore=0;
               $stmt->bind_param('sssii',$arcName,$arcInstructor,$defaultStu,$defaultState,$defaultScore);
               $stmt->execute();

               if($stmt->error){
                   $output['errCode']=$stmt->errno;
                   $output['msg']='选题发布失败,请稍后重试!';
               }
               else{
                   $output['errCode']=0;
               }
               $stmt->close();
           }
           else{
               $output['msg']='您已有该选题了,请重新设置!';
           }
    }
    $sql="SELECT arcName FROM arcticle WHERE arcInstructor='$arcInstructor'";
    $result=$mysqli->query($sql);
    $output['data']=$result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($output);
    $mysqli->close();
?>
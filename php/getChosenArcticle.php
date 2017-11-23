<?php  
    header('Content-type:application/json;charset=utf-8');

    require_once('conn.php');

    $output=[];

    $arcStu=$_GET['arcStu'];

    $sql="SELECT arcName,arcInstructor,arcState,arcScore FROM arcticle WHERE arcStu='$arcStu'";
    $result=$mysqli->query($sql);
    if($result->num_rows){
        $output['errCode']=0;
        $output['data']=$result->fetch_all(MYSQLI_ASSOC);
    }
    else{
        $output['errCode']=$mysqli->errno;
    }
    echo json_encode($output);

    $mysqli->close();
?>
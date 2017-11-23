<?php  
    header('Content-type:application/json;charset=utf-8');

    require_once('conn.php');

    $output=[];
    $output['data']=[];
    $count=5;    //每页显示的条目
    $page=$_GET['page'];

    $start=($page-1)*$count;
    $sql="SELECT arcId FROM arcticle WHERE arcState=0";
    $result=$mysqli->query($sql);
    $output['totalNum']=$result->num_rows;
    $pages=ceil($output['totalNum']/$count);

    $sql="SELECT arcId,arcName,arcInstructor FROM arcticle WHERE arcState=0 LIMIT $start,$count";
    if(isset($_GET['arcInstructor'])){
        $arcInstructor=$_GET['arcInstructor'];
        $sql="SELECT arcName,arcInstructor FROM arcticle WHERE arcState=0 AND arcInstructor LIKE '%$arcInstructor%' LIMIT $start,$count";
    }
    
    $result=$mysqli->query($sql);
    if($result->num_rows){
        while ($row=$result->fetch_assoc()) {
            array_push($output['data'], $row);
        }
        $output['errCode']=0;
        $output['pages']=$pages;
    }
    else{
        $output['errCode']=$mysqli->errno;
    }
    echo json_encode($output);

    $mysqli->close();

?>
<?php  
    header('Content-type:application/json;charset=utf-8');

    require_once('conn.php');

    /*获取提交数据*/
    $userNo=$_POST['userNo'];
    $userName=$_POST['userName'];
    $gender=$_POST['gender'];
    $major=$_POST['major'];
    $entitleTime=$_POST['entitleTime'];
    $entry=$_POST['entry'];
    $userPwd=md5('123456');
    
    const STUDENT_DATABASE='user';
    const TEACHER_DATABASE='teacher';

    /**
    * 数据处理类
    */
    class DealData
    {
        // 构造函数
        function __construct($entry,$userNo,$userName,$userPwd,$gender,$major,$entitleTime)
        {
            $this->entry=$entry;
            $this->userNo=$userNo;
            $this->userName=$userName;
            $this->userPwd=$userPwd;
            $this->gender=$gender;
            $this->major=$major;
            $this->entitleTime=$entitleTime;
        }
        // 选表
        private function chooseTable(){
            return $this->entry==1?TEACHER_DATABASE:STUDENT_DATABASE;
        }
        // 检查表中是否存在对应数据
        public function check(&$mysqli){
            $table=$this->chooseTable();
            $sql="SELECT userNo FROM $table WHERE userNo='$this->userNo'";
            $result=$mysqli->query($sql);
            return $result->num_rows==0?true:false;
        }
        // 插入数据
        public function insertData(&$mysqli){
            $table=$this->chooseTable();
            $sql="INSERT INTO $table(userNo,userName,userPwd,gender,major,entitleTime) VALUES(?,?,?,?,?,?)";
            $stmt=$mysqli->prepare($sql);
            $stmt->bind_param('sssssi',$this->userNo,$this->userName,$this->userPwd,$this->gender,$this->major,$this->entitleTime);
            $stmt->execute();
            return $stmt->errno?$stmt->errno:0;
        }
        // 查询最后插入的用户编号
        public function getLastUserNo(&$mysqli){
            $table=$this->chooseTable();
            $id = $this->entry == 1 ?"tid":"uid";
            $sql = "SELECT userNo FROM $table ORDER BY $id DESC LIMIT 1";
            $result=$mysqli->query($sql);
            return $result->fetch_assoc();
        }
    }

    // 输出数据
    $output=[];

    $dd=new DealData($entry,$userNo,$userName,$userPwd,$gender,$major,$entitleTime);
    if ($dd->check($mysqli)) {
        $errCode=$dd->insertData($mysqli);
        if ($errCode==0) {
            $output['errCode']=0;
            $output['msg']='成功';
        } else {
            $output['errCode']=$errCode;
            $output['msg']='数据插入失败,请稍后重试!';
        }
    } else {
        $output['lastUserNo']=$dd->getLastUserNo($mysqli);
        $output['msg']='数据已存在,请重新输入!';
    };

    echo json_encode($output);
?>
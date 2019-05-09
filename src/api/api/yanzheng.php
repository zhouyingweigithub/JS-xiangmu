<?php
/*
验证用户名接口 
地址：  yanzheng.php
yonghu: 要注册的用户名
*/
$yonghu = trim(isset($_REQUEST['yonghu']) ? $_REQUEST['yonghu'] : '');
$serrername="localhost";
$username="root";
$password="";
$dbname="zhouyingwei";

$lian=new mysqli($serrername,$username,$password,$dbname);
$cha="select * from dengluye where name like '$yonghu'";
$res=$lian->query($cha);
$rom=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($rom,JSON_UNESCAPED_UNICODE);
?>
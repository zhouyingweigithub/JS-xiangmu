<?php
/*
登录接口 
地址：  denglu.php
yonghu: 要注册的用户名
mima:   要注册的密码
*/
$yonghu = trim(isset($_REQUEST['yonghu']) ? $_REQUEST['yonghu'] : '');
$mima = trim(isset($_REQUEST['mima']) ? $_REQUEST['mima'] : '');
$serrername="localhost";
$username="root";
$password="";
$dbname="zhouyingwei";

$lian=new mysqli($serrername,$username,$password,$dbname);
$cha="select * from dengluye where `name` like '$yonghu' and `password` like '$mima'";
$res=$lian->query($cha);
$rom=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($rom,JSON_UNESCAPED_UNICODE);
?>
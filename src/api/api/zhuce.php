<?php
/*
注册接口 
地址：  yonghuming.php
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
$zheng="INSERT INTO dengluye(name,password) VALUES('$yonghu','$mima')";
$res=$lian->query($zheng);
echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>
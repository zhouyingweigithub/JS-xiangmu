<?php
/*
首页用户信息接口
地址：  index2.php
leixing : 要查询的类型
mingcheng : 要查询的名称
*/
$leixing = trim(isset($_REQUEST['leixing']) ? $_REQUEST['leixing'] : '');
$mingcheng = trim(isset($_REQUEST['mingcheng']) ? $_REQUEST['mingcheng'] : '');
$serrername="localhost";
$username="root";
$password="";
$dbname="zhouyingwei";

$lian=new mysqli($serrername,$username,$password,$dbname);
$cha="SELECT * FROM user WHERE $leixing LIKE '$mingcheng'";
$res=$lian->query($cha);
$rom=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($rom,JSON_UNESCAPED_UNICODE);
?>
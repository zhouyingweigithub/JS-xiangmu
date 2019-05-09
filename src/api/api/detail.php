<?php
// 渲染接口 
// 地址：  detail.php
//mingcheng : 要查询的名称

$mingcheng=isset($_GET["mingcheng"])?$_GET["mingcheng"]:"";


$serrername="localhost";
$username="root";
$password="";
$dbname="zhouyingwei";


$lian=new mysqli($serrername,$username,$password,$dbname);
$cha="SELECT * FROM list WHERE id LIKE '$mingcheng'";
$res=$lian->query($cha);
$rom=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($rom,JSON_UNESCAPED_UNICODE);

?>
<?php
/*
根据ID查询内容接口 
地址:xiangqing.php
id:id 
*/
$id = trim(isset($_REQUEST['id']) ? $_REQUEST['id'] : '');

$serrername="localhost";
$username="root";
$password="";
$dbname="zhouyingwei";


$lian=new mysqli($serrername,$username,$password,$dbname);
$cha="SELECT * FROM shangpinye WHERE id LIKE $id";
$res=$lian->query($cha);
$rom=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($rom,JSON_UNESCAPED_UNICODE);
?>
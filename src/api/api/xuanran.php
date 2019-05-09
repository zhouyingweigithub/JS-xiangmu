<?php
/*
渲染接口 
地址：  xuanran.php
tiao : 从第几条开始
tiao2 : 每次加载多少条
*/
$tiao=isset($_GET["tiao"])?$_GET["tiao"]:"";
$tiao2=isset($_GET["tiao2"])?$_GET["tiao2"]:"";


$serrername="localhost";
$username="root";
$password="";
$dbname="zhouyingwei";


$lian=new mysqli($serrername,$username,$password,$dbname);
$cha="SELECT * FROM shangpinye LIMIT $tiao,$tiao2";
$res=$lian->query($cha);
$rom=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($rom,JSON_UNESCAPED_UNICODE);

?>
<?php
// 渲染接口 
// 地址：  xuanran.php
//leixing : 要查询的类型
//mingcheng : 要查询的名称
//tiao : 从第几条开始
//tiao2 : 每次加载多少条
$leixing=isset($_GET["leixing"])?$_GET["leixing"]:"";
$mingcheng=isset($_GET["mingcheng"])?$_GET["mingcheng"]:"";
$tiao=isset($_GET["tiao"])?$_GET["tiao"]:"";
$tiao2=isset($_GET["tiao2"])?$_GET["tiao2"]:"";
$biao=isset($_GET["biao"])?$_GET["biao"]:"";


$serrername="localhost";
$username="root";
$password="";
$dbname="zhouyingwei";


$lian=new mysqli($serrername,$username,$password,$dbname);
$cha="SELECT * FROM brand WHERE $leixing LIKE '$mingcheng' LIMIT $tiao,$tiao2";
$res=$lian->query($cha);
$rom=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($rom,JSON_UNESCAPED_UNICODE);

?>
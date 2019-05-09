<?php
/*
首页热批商品渲染接口 
地址：  index.php
leixing : 要查询的类型
mingcheng : 要查询的名称
tiao : 从第几条开始
tiao2 : 每次加载多少条
*/
$leixing = trim(isset($_REQUEST['leixing']) ? $_REQUEST['leixing'] : '');
$mingcheng = trim(isset($_REQUEST['mingcheng']) ? $_REQUEST['mingcheng'] : '');
$tiao = trim(isset($_REQUEST['tiao']) ? $_REQUEST['tiao'] : '');
$tiao2 = trim(isset($_REQUEST['tiao2']) ? $_REQUEST['tiao2'] : '');
$serrername="localhost";
$username="root";
$password="";
$dbname="zhouyingwei";

$lian=new mysqli($serrername,$username,$password,$dbname);
$cha="SELECT * FROM list WHERE $leixing LIKE '$mingcheng' LIMIT $tiao,$tiao2";
$res=$lian->query($cha);
$rom=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($rom,JSON_UNESCAPED_UNICODE);
?>
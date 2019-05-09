<?php
/*
层级搜索渲染接口
地址：  list.php
mingcheng : 要查询的名称
tiao : 从第几条开始
tiao2 : 每次加载多少条

*/
$mingcheng = trim(isset($_REQUEST['mingcheng']) ? $_REQUEST['mingcheng'] : '');
$tiao = trim(isset($_REQUEST['tiao']) ? $_REQUEST['tiao'] : '');
$tiao2 = trim(isset($_REQUEST['tiao2']) ? $_REQUEST['tiao2'] : '');
$serrername="localhost";
$username="root";
$password="";
$dbname="zhouyingwei";

$lian=new mysqli($serrername,$username,$password,$dbname);
$cha="select * from list where ttt like '%$mingcheng%' or yyy like '%$mingcheng%' or ppp like '%$mingcheng%' LIMIT $tiao,$tiao2";
$res=$lian->query($cha);
$rom=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($rom,JSON_UNESCAPED_UNICODE);
?>
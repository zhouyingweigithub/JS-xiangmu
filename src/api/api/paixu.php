<?php
/*
排序接口 
地址：  xuanran.php
tiao : 从第几条开始
tiao2 : 每次加载多少条
leixing : 按什么类型进行排序
*/
$tiao=isset($_GET["tiao"])?$_GET["tiao"]:"";
$tiao2=isset($_GET["tiao2"])?$_GET["tiao2"]:"";
$leixing=isset($_GET["leixing"])?$_GET["leixing"]:"";
$serrername="localhost";
$username="root";
$password="";
$dbname="zhouyingwei";
$lian=new mysqli($serrername,$username,$password,$dbname);

if($leixing=="jiage"){
    $cha="SELECT * FROM shangpinye ORDER BY jiage";
}

if($leixing=="shuliang"){
    $cha="SELECT * FROM shangpinye ORDER BY jiage";
}

if($leixing=="dianji"){
    $cha="SELECT * FROM shangpinye ORDER BY jiage";
}

$res=$lian->query($cha);
$rom=$res->fetch_all(MYSQLI_ASSOC);
$arr=array_slice($rom,$tiao,$tiao2);
echo json_encode($arr,JSON_UNESCAPED_UNICODE);



?>
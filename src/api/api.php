<?php
// header("content-type:text/html;charset=utf-8");  //设置编码
$jiekou = trim(isset($_POST['jiekou']) ? $_POST['jiekou'] : '');
//trim 去空格 
//isset检测变量是否已设置
//有设置就用设置 没有就为空


$a="localhost";    //主机名
$b="root";  //数据库用户名
$c="";  //密码 没有就填空
$d="zhouyingwei";  //数据库名称
$lian=new mysqli($a,$b,$c,$d); //连接数据库

        /*
    验证用户名存不存在接口 
    接口：register;
    yonghu: 要注册的用户名
    返回0 不存在此用户名
    返回1 存在此用户名 
    */
if($jiekou=="register"){
    $yonghu = trim(isset($_POST['yonghu']) ? $_POST['yonghu'] : '');

    $sql="select * from user where name like '$yonghu'"; 
    //select * from 选取数据
    //where 指定任何条件
    //like 匹配内容
    $res=$lian->query($sql); //执行数据库语句
    $rom=$res->fetch_all(MYSQLI_ASSOC); //从结果集中取得所有行作为关联数组
    if($rom==null){
        echo 0;
    }else{
        echo 1;
    }
}

        /*
    注册接口 
    接口：register2;
    yonghu: 要注册的用户名
    mima:   要注册的密码
    返回 false 失败
    返回 true 成功
    */
if($jiekou=="register2"){
    $yonghu = trim(isset($_POST['yonghu']) ? $_POST['yonghu'] : '');
    $mima = trim(isset($_POST['mima']) ? $_POST['mima'] : '');

    $zheng="INSERT INTO user(name,password) VALUES('$yonghu','$mima')";
    //INSERT INTO 向表中插入新记录
    //第一个（）填字段
    //第二个（）填要插入的内容

    $res=$lian->query($zheng);
    echo json_encode($res,JSON_UNESCAPED_UNICODE); 
    //json_encode 对变量进行JSON编码

    //JSON_UNESCAPED_UNICODE 防止乱码
}


        /*
    登录接口 
    yonghu: 要登录的用户名
    mima:   要登录的密码
    */
if($jiekou=="login"){
$yonghu = trim(isset($_REQUEST['yonghu']) ? $_REQUEST['yonghu'] : '');
$mima = trim(isset($_REQUEST['mima']) ? $_REQUEST['mima'] : '');

$sql="select * from user where `name` like '$yonghu' and `password` like '$mima'";
$res=$lian->query($sql);
$rom=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($rom,JSON_UNESCAPED_UNICODE);
}


        /*
    渲染接口 
    biao:要查询的表
    leixing : 要查询的类型
    mingcheng : 要查询的名称
    tiao : 从第几条开始
    tiao2 : 每次加载多少条
    */
if($jiekou=="xuanran"){
$biao = trim(isset($_POST['biao']) ? $_POST['biao'] : '');
$leixing = trim(isset($_POST['leixing']) ? $_POST['leixing'] : '');
$mingcheng = trim(isset($_POST['mingcheng']) ? $_POST['mingcheng'] : '');
$tiao = trim(isset($_POST['tiao']) ? $_POST['tiao'] : '');
$tiao2 = trim(isset($_POST['tiao2']) ? $_POST['tiao2'] : '');

$sql="SELECT * FROM $biao WHERE $leixing LIKE '$mingcheng' LIMIT $tiao,$tiao2";
$res=$lian->query($sql);
$rom=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($rom,JSON_UNESCAPED_UNICODE);
}


/*
搜索渲染接口（多字段查询）（排序查询）（搜索查询）
mingcheng : 要查询的名称
tiao : 从第几条开始
tiao2 : 每次加载多少条
paixun : 要排序的类型
$shengjiang1 : 价格的升序和降序
$shengjiang2 : 销量的升序和降序
*/
if($jiekou=="sousuo"){
$mingcheng = trim(isset($_POST['mingcheng']) ? $_POST['mingcheng'] : '');
$tiao = trim(isset($_POST['tiao']) ? $_POST['tiao'] : '');
$tiao2 = trim(isset($_POST['tiao2']) ? $_POST['tiao2'] : '');

$paixun = trim(isset($_POST['paixun']) ? $_POST['paixun'] : '');
$shengjiang1 = trim(isset($_POST['shengjiang1']) ? $_POST['shengjiang1'] : '');
$shengjiang2 = trim(isset($_POST['shengjiang2']) ? $_POST['shengjiang2'] : '');
//正常搜索的语句
if($paixun==null){ 
    $sql="SELECT * FROM list WHERE  `name` LIKE '%$mingcheng%' OR ttt LIKE '%$mingcheng%' OR yyy LIKE '%$mingcheng%' OR ppp LIKE '%$mingcheng%'  LIMIT $tiao,$tiao2";
}
//点击价格时的语句
if($paixun=="jiage"){
    if($shengjiang1=="1"){
        //升序
        $sql="SELECT * FROM list WHERE  `name` LIKE '%$mingcheng%' OR ttt LIKE '%$mingcheng%' OR yyy LIKE '%$mingcheng%' OR ppp LIKE '%$mingcheng%' ORDER BY `price`  LIMIT $tiao,$tiao2";
    }
    else{
        //降序
        $sql="SELECT * FROM list WHERE  `name` LIKE '%$mingcheng%' OR ttt LIKE '%$mingcheng%' OR yyy LIKE '%$mingcheng%' OR ppp LIKE '%$mingcheng%' ORDER BY `price` DESC  LIMIT $tiao,$tiao2";
    }
}
//点击销量时的语句
if($paixun=="xiaoliang"){
    if($shengjiang2=="1"){
        $sql="SELECT * FROM list WHERE  `name` LIKE '%$mingcheng%' OR ttt LIKE '%$mingcheng%' OR yyy LIKE '%$mingcheng%' OR ppp LIKE '%$mingcheng%' ORDER BY sold  LIMIT $tiao,$tiao2";
    }else{
        $sql="SELECT * FROM list WHERE  `name` LIKE '%$mingcheng%' OR ttt LIKE '%$mingcheng%' OR yyy LIKE '%$mingcheng%' OR ppp LIKE '%$mingcheng%' ORDER BY sold DESC  LIMIT $tiao,$tiao2";
    }
    }
$res=$lian->query($sql);
$rom=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($rom,JSON_UNESCAPED_UNICODE);
}

// 购物车添加商品接口
//id: 商品的id
//user: 用户id
//返回 true 添加成功
//返回 false 添加失败
//把商品id和用户id一起存到数据库
if($jiekou=="jiagouwu"){
    $id = trim(isset($_POST['id']) ? $_POST['id'] : '');
    $user = trim(isset($_POST['user']) ? $_POST['user'] : '');

    $sql="INSERT INTO shopping(`id`,`user`) VALUES('$id','$user')";
    $res=$lian->query($sql);
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
}

//购物车渲染接口（不同用户 不同购物车）
//user 用户ID
//id 商品id
//先根据用户名id查询此用户存的商品id
//再根据商品id查询列表页数据，进行渲染
if($jiekou=="gouwuche"){
    $user=trim(isset($_POST['user']) ? $_POST['user'] : '');
    $id=trim(isset($_POST['id']) ? $_POST['id'] : '');
    if($user!=null){
        $sql="SELECT * FROM shopping WHERE user LIKE '$user'";
    }
    if($id!=null){
        $sql="SELECT * FROM list WHERE id LIKE '$id'";
    }
    $res=$lian->query($sql);
    $rom=$res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($rom,JSON_UNESCAPED_UNICODE);

}
//删除商品接口
//id 要删除的商品ID
//记得后面设条件是1条 不然会把同样id的商品全删了 
if($jiekou=="shanchu"){
    $id=trim(isset($_POST['id']) ? $_POST['id'] : '');
    $sql="DELETE FROM `shopping` WHERE id='$id' LIMIT 1";
    $res=$lian->query($sql);
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
}



$lian->close();
?>
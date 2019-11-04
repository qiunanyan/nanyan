<?php

//连接数据库
include 'conn.php';
//1 接收数据
$yonghu = isset($_REQUEST['yonghu']) ? $_REQUEST['yonghu']:'';
$uid = isset($_REQUEST['uid']) ? $_REQUEST['uid']:'';
$num = isset($_REQUEST['num']) ? $_REQUEST['num']:'';
//2.写sql语句
$sql = "INSERT INTO shangpin (yonghu,uid,num) VALUES ('$yonghu','$uid','$num')";//插入数据

//3.执行语句
$res = $conn->query($sql);

//返回结果
if($res){
    //插入成功
    echo 'yes';
}else{
    echo'no';
}

?>
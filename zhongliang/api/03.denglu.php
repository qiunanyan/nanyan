<?php

//连接数据库
include 'conn.php';
//1 接收数据
$name = isset($_REQUEST['name']) ? $_REQUEST['name']:'';
$psw = isset($_REQUEST['psw']) ? $_REQUEST['psw']:'';
//2.写sql语句
$sql = "SELECT * FROM yanzheng WHERE name='$name' AND password='$psw'";

//3.执行语句
$res = $conn->query($sql);

//返回结果
if($res->num_rows){
    //查到，可以登录
    echo 'yes';
}else{
    echo'no';
}

?>
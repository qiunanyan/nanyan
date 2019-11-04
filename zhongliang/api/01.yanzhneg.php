<?php

//连接数据库
include 'conn.php';
//1 接收数据
$name = isset($_REQUEST['name']) ? $_REQUEST['name']:'';
//2.写sql语句
$sql = "SELECT * FROM yanzheng WHERE NAME='$name'" ;

//3.执行语句
$res = $conn->query($sql);

//返回结果
if($res->num_rows){
    //查到，不给注册
    echo 'no';
}else{
    echo'yes';
}

?>
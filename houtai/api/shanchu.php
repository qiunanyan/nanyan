<?php

//连接数据库
include 'conn.php';
//1 接收数据
$uid = isset($_REQUEST['uid']) ? $_REQUEST['uid']:'';

//2.写sql语句
$sql = "DELETE FROM shangpin WHERE uid=$uid";

//3.执行语句
$res = $conn->query($sql);

//返回结果
if($res){
    //删除成功
    echo 'yes';
}else{
    echo'no';
}

?>
<?php

//连接数据库
include 'conn.php';
//1 接收数据
$name = isset($_REQUEST['name']) ? $_REQUEST['name']:'';
$psw = isset($_REQUEST['psw']) ? $_REQUEST['psw']:'';
//2.写sql语句
$sql = "UPDATE yanzheng SET password='$psw' where name = '$name'" ;

//3.执行语句
$res = $conn->query($sql);

//返回结果
if($res){
    //更改成功
    echo 'yes';
}else{
    echo'no';
}

?>
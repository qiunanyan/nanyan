<?php

//连接数据库
include 'conn.php';
//1 接收数据
$uid = isset($_REQUEST['uid']) ? $_REQUEST['uid']:'';
//2.写sql语句
$sql = "SELECT * FROM shangpin" ;

//3.执行语句
$res = $conn->query($sql);

 //4.提取数据
 $arr = $res->fetch_all(MYSQLI_ASSOC);//对象

//  $data = array(
    
//      'data' => $arr,
    
//  );

 // //5.把对象转成字符串，echo给前端
 echo json_encode( $arr,JSON_UNESCAPED_UNICODE);
 //关闭数据，防止浪费
 $res->close();
 $conn->close();



?>
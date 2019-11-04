<?php

//连接数据库
include 'conn.php';
header("Content-type:text/html;charset=utf-8");
  //接收参数
  $tex1 = isset($_GET['tex1']) ? $_GET['tex1'] : '';
  $tex2 = isset($_GET['tex2']) ? $_GET['tex2'] : '';
//1.写查询语句
 $sql = "SELECT * FROM libiao WHERE price BETWEEN $tex1 AND $tex2";
 
 

 //2.执行语句
 $res = $conn->query($sql);//结果集：包含很多信息，其中数据部分就是我想要的，要特意用方法才能提取出来

 //3.提取数据
 $arr = $res->fetch_all(MYSQLI_ASSOC); //得到一个数组 [{},{},{}]
  
  $data = array(
     
    'data' => $arr
);


 echo json_encode($data,JSON_UNESCAPED_UNICODE);//把对象转成字符串 JSON_UNESCAPED_UNICODE防止转义
 /*
     乱码怎么解决：编码不统一就会乱码
         * 数据源：utf-8 外部导入的数据，确保是这个编码
         * 存储过程：连接、数据库、表里面设置编码
         * 使用过程：php、html
 */
 //防止乱码
 $conn->set_charset('utf8');

 //关闭连接，防止资源浪费
 $res->close();
 $conn->close();
?>
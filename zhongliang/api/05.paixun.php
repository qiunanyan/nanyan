<?php
    //连接数据库
    include 'conn.php';
    header("Content-type:text/html;charset=utf-8");
    //接收参数
    $order = isset($_GET['order']) ? $_GET['order'] : '';

    //1.查询语句
    // $sql = "SELECT * FROM libiao ORDER BY price $order";
    $sql="$order";

    //2.执行语句
    $res = $conn->query($sql);//结果集

    //3.提取数据
    $arr = $res->fetch_all(MYSQLI_ASSOC);

    $data = array(
     
        'data' => $arr
    );

    //4.对象转成字符串，转给前端
    echo json_encode($data,JSON_UNESCAPED_UNICODE);

    //防止乱码
    $conn->set_charset('utf8');

    //关闭连接，防止资源浪费
    $res->close();
    $conn->close();

?>
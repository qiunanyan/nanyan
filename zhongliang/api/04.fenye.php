<?php
   //连接数据库
    include 'conn.php';


    $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : '1';
    $num = isset($_REQUEST['num']) ? $_REQUEST['num'] : '40';
    // echo $page;
    // echo $num;//拿到前端的数据，在往下写代码！！！！！
    $conn->set_charset('utf8');//防止乱码
    /*
        拿到： 页面  条数    index     limit m,n;   m:下标  n:数量
                1     10     0
                2     10     10
                3     10     20
               
        index = (page - 1) * num
    */
     //1.写sql语句
    $index = ($page - 1) * $num;
    $sql = "SELECT * FROM libiao LIMIT $index,$num";
    $sql2 = 'SELECT * FROM libiao';
    
    //2.执行语句
    $res = $conn->query($sql);
    $res2 = $conn->query($sql2);
    
    //3.提取数据
    $arr = $res->fetch_all(MYSQLI_ASSOC);//对象

    $data = array(
        'total' => $res2->num_rows,
        'data' => $arr,
        'page' => $page,
        'num' => $num
    );

    // //4.把对象转成字符串，echo给前端
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
    //关闭数据，防止浪费
    $res->close();
    $res2->close();
    $conn->close();


?>
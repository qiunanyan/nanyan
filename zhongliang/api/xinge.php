<?php
   include 'conn.php';//引入外部文件到这来
    //列表页的接口--查询数据、分页、排序、查询某个商品、查找价格区间

   //需求：接收数据，查询数据，制作成字符串，echo给前端
   $type = isset($_REQUEST['type']) ? $_REQUEST['type'] : ''; //类型
   $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : '1'; //页数
   $xssl = isset($_REQUEST['xssl']) ? $_REQUEST['xssl'] : '4'; //显示条数
   $order = isset($_REQUEST['order']) ? $_GET['order'] : ''; //升降序
   $min = isset($_REQUEST['min']) ? $_REQUEST['min'] : ''; //最小值
   $max = isset($_REQUEST['max']) ? $_GET['max'] : ''; //最大值
   $search = isset($_REQUEST['search']) ? $_GET['search'] : '';  //模糊查询


   $zl = ''; 
  
   ////连接成功后，就可以进行增删改查操作

   //1.写sql语句
   $index = ($page - 1) * $xssl;
   $sql = "select * from shuju limit $index,$xssl";
   $sql2 = 'select * from shuju';

   if($type == 'sale') { //销量
        $sql3="select * from (select * from shuju ORDER BY renshu $order)pagea limit $index,$xssl";
   }else if($type == 'price') { //价格
       $sql3 = "select * from (select * from shuju ORDER BY price $order)pagea limit $index,$xssl";

   }else if($type == 'between') { //区间
       $sql3 = "select * from (select * from shuju where price BETWEEN $min and $max)pagea limit $index,$xssl";
   }else if($type == 'ss') { //模糊查询
       $sql3 = "select * from (select * from shuju WHERE content LIKE '%$search%')pagea limit $index,$xssl";
   }else if($type == 'csh'){
    $sql3 = "select * from shuju limit $index,$xssl";
   }

   //2.执行语句 -- 得到一个结果集：包含着很多信息，但是我们只需要数据，要用方法对它进行提取
   $res = $conn->query($sql); 
   $res2 = $conn->query($sql2); 
   $res3 = $conn->query($sql3);  
   
   if(($min + 1)&& $max) {
        $sql4 = "select * from shuju where price BETWEEN $min and $max";
        $res4 = $conn->query($sql4);  
        $zl = $res4->num_rows;
       
   }else if($search) {
        $sql4 = "select * from shuju WHERE content LIKE '%$search%'";
        $res4 = $conn->query($sql4);  
        $zl = $res4->num_rows;
   }else{
        $zl = $res2->num_rows;
  }

   //3.提取数据
   $arr = $res3->fetch_all(MYSQLI_ASSOC);//得到一个数据  [{},{},{}]
    // var_dump($arr);

   $data = array(
     'total' => $zl,
     'data' => $arr,
     'page' => $page,
     'xssl' => $xssl
   );
   

   //4.把数组转成字符串，传给前端,一个接口文件只能有一个输出：echo '[{},{},{}]'
    echo json_encode($data,JSON_UNESCAPED_UNICODE);//把对象转成字符串 
    //JSON_UNESCAPED_UNICODE防止转义
    /*
        乱码怎么解决：编码不统一就会乱码
            * 数据源：utf-8 外部导入的数据，确保是这个编码
            * 存储过程：连接、数据库、表里面设置编码
            * 使用过程：php、html
    */
    //4.防止乱码
    $conn->set_charset('utf8');

    //5.关闭连接，防止资源浪费
    $res->close();
    $conn->close();
?>

(function () {
    let ipage = 1; //获取第一页数据
    let num = 40; //每页显示40条

    function jie(arr) { //封装列表页的结构函数
        let html = arr.data.map(item => {
            return `<li data-id="${item.uid}">
                                    <div class="pImg">
                                        <img src="${item.img}"
                                            alt="">
                                        <div class="hai">海外直采</div>
                                        <div class="dian">店庆</div>
                                    </div>
                                    <div class="jia">￥
                                    ${item.price}
                                    </div>
                                    <div class="list">  ${item.content}
        
                                    </div>
                                    <div class="ziying">自营</div>
                                    <div class="zui">
                                        <span class="sp1">已评价
                                            <i>${item.number}</i>
                                        </span>
                                        <span class="sp2">收藏</span>
                                        <span class="sp3">加入购物车</span>
                                    </div>
                                </li>`
        }).join('');
        $('.libiao').html(html); //渲染页面
        //渲染页码
        let total = Math.ceil(arr.total / arr.num);
        let spanstr = '';
        for (let i = 0; i < total; i++) {
            spanstr += `<a href="###">${i + 1}</a>`;
        }
        let xun = `<div class="page_1">
                    <a href="###" class="ye1">&lt;上一页</a>
                    <i class="fanye"> ${spanstr}</i> 
                    <a href="###" class="ye2">下一页&gt;</a>
                    </div>
                    <div class="page_2">共${total}页</div>
                    <div class="page_3">到第</div>
                    <div class="page_4">
                        <input type="text" value="${ipage}">
                    </div>
                    <div class="page_5">页</div>
                    <div class="page_6">确定</div>`;

        $('.page').html(xun); //渲染页码到页面
        $('.fanye a').eq(ipage - 1).addClass('active');
        return arr;
    }

    function xuan() { //分页

        $.ajax({
            type: 'post',
            url: '../api/04.fenye.php',
            data: {
                page: ipage,
                num: num
            },
            success: str => {
                let arr = JSON.parse(str);
                // console.log(arr);
                jie(arr);


            }
        })
    }
    xuan();
    // // 事件委托实现翻页
    $('.page').on('click', '.fanye a', function () {
        ipage = $(this).text();
        xuan();
    });
    //手动输入翻页
    $('.page').on('click', '.page_6', function () {
        // console.log(1)
        ipage = $(this).prev().prev().children(0).val();
        if (ipage <= 1) {
            ipage = 1;
            xuan();
        } else if (ipage >= 2) {
            ipage = 2;
            xuan();
        }

    });

    //下一页
    $('.page').on('click', '.ye2', function () {
        ipage++;
        if (ipage >= 2) {
            ipage = 2;
            xuan();
        }

    });
    //上一页
    $('.page').on('click', '.ye1', function () {
        ipage--;
        if (ipage <= 1) {
            ipage = 1;
            xuan();
        }

    });


    //点击那个那个高亮
    $('.sort li').click(function () {
        $(this).addClass('so').siblings().removeClass('so');
    });

    //点击按钮实现左边侧栏的出现与隐藏
    $('.main_l .packup').click(function () {
        $('.main_l .unfold').css('display', 'block');
        $('.main_l .packup').css('display', 'none');
    });

    $('.main_l .unfold').click(function () {
        $('.main_l .packup').css('display', 'block');
        $('.main_l .unfold').css('display', 'none');
    });
    //1 关键字查找
    $('#icha').click(function () {
        $.ajax({
            type: 'get',
            url: '../api/07.guanjianzi.php',
            data: {
                guanjian: $('.text1').val()
            },
            success: str => {
                let arr = JSON.parse(str);
                // console.log(arr);
                jie(arr);
            }
        })
    });
    //2 综合排序
    $('.sort li').eq(0).click(function () {

        let order = 'SELECT * FROM libiao';


        //点击一次就要发送一次请求
        ajax({
            type: 'get',
            data: {
                order: order
            },
            url: '../api/05.paixun.php',
            success: str => {
                var arr = JSON.parse(str);
                // console.log(arr);
                jie(arr);
            }
        })
    });
    // 3 销量排序
    $('.sort li').eq(1).click(function () {

        let order = 'SELECT * FROM libiao ORDER BY price desc';


        //点击一次就要发送一次请求
        ajax({
            type: 'get',
            data: {
                order: order
            },
            url: '../api/05.paixun.php',
            success: str => {
                var arr = JSON.parse(str);
                // console.log(arr);
                jie(arr);
            }
        })
    });
    //4 价格排序
    $('.sort li').eq(2).click(function () {
        let li = $('.sort li').eq(2);
        if (li.text() == '价格↑') {
            li.text('价格↓');
            order = 'SELECT * FROM libiao ORDER BY price asc';
        } else {
            li.text('价格↑');
            order = 'SELECT * FROM libiao ORDER BY price desc';
        }

        //点击一次就要发送一次请求
        ajax({
            type: 'get',
            data: {
                order: order
            },
            url: '../api/05.paixun.php',
            success: str => {
                var arr = JSON.parse(str);
                // console.log(arr);
                jie(arr);
            }
        })
    });
    //评论数排序
    $('.sort li').eq(3).click(function () {

        let order = 'SELECT * FROM libiao ORDER BY number DESC';


        //点击一次就要发送一次请求
        ajax({
            type: 'get',
            data: {
                order: order
            },
            url: '../api/05.paixun.php',
            success: str => {
                var arr = JSON.parse(str);
                // console.log(arr);
                jie(arr);
            }
        })
    });
    //4 价格区间
    $('#qued').click(function () {
        $.ajax({
            type: 'get',
            url: '../api/06.jiagechaxun.php',
            data: {
                tex1: $('#di').val(),
                tex2: $('#gao').val()
            },
            success: str => {
                let arr = JSON.parse(str);
                // console.log(arr);
                jie(arr);
                $('#di').val(''); //清空文字
                $('#gao').val(''); //清空文字
                $('#di').focus(); //聚焦
            }
        })
    });
    //跳转详情页并带商品id过去
    $('.libiao').on('click', 'li', function () {
        // console.log(1)
        location.href = '06.xiangqing.html?' + $(this).attr('data-id');

    });



})();
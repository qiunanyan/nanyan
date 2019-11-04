(function () {
    /*
        需求：
            * 点击加减可以修改数量和小计
            * 删除当行
            * 全选不选
            * 全删
            
        接口：
            * 渲染数据接口：订单表(详情页点击购买的时候存的数据)
            * 数量加减
            * 删除当行、删除全部
            * 选做：保存总数量和总价格
    */
    function gouwu() { //以封装好
        function total(now, num) { //数量和小计 now指点击的元素
            let kucun = $(now).parent().find('.text1').data('num'); //库存数量
            // console.log(kucun)
            if (num < 1) {
                num = 1;
            } else if (num > kucun) {
                num = kucun; //提示已经达到库存量
            }
            $(now).parent().find('.text1').val(num); //点击的数量值
            //小计=数量*单价
            let price = $(now).parent().prev().text().slice(1) * 1; //单价
            let xiaoji = (num * price).toFixed(2);
            $(now).parent().next().next().html('￥' + xiaoji);
            shunum();
        }

        //1 点击加
        $('.con').on('click', '.jia', function () {
            let num = $(this).prev().val();
            // console.log(this)
            num++;
            total($(this), num);
            let id = $(this).parent().parent().data('id'); //获取商品id，通过ajax进行加减数量
            $.ajax({
                tpye: 'post',
                url: '../api/jiajian.php',
                data: {
                    uid: id,
                    num: num
                },
                success: str => {
                    // console.log(str);
                }
            })



        });
        //2 点击减
        $('.con').on('click', '.jian', function () {
            let num = $(this).next().val();
            // console.log(this)
            num--;
            total($(this), num);
            let id = $(this).parent().parent().data('id'); //获取商品id，通过ajax进行加减数量
            $.ajax({
                tpye: 'post',
                url: '../api/jiajian.php',
                data: {
                    uid: id,
                    num: num
                },
                success: str => {
                    // console.log(str);
                }
            })

        });
        //3 手动输入数量
        $('.con').on('input', '.text1', function () {
            let num = $(this).val();
            // console.log(num);
            total($(this), num);
            let id = $(this).parent().parent().data('id'); //获取商品id，通过ajax进行加减数量
            $.ajax({
                tpye: 'post',
                url: '../api/jiajian.php',
                data: {
                    uid: id,
                    num: num
                },
                success: str => {
                    // console.log(str);
                }
            })
        });
        //4 删除行
        $('.con').on('click', '.shan', function () {
            // console.log($(this));
            let sc = confirm('确定删除吗');
            if (sc) {
                let id = $(this).parent().parent().data('id') //获取id 进行删除商品
                $(this).parent().parent().remove();

                // console.log(id);
                $.ajax({
                    tpye: 'post',
                    url: '../api/shanchu.php',
                    data: {
                        uid: id
                    },
                    success: str => {
                        // console.log(str);
                    }
                })

            }
            if ($('.con .text1').size() == 0) { //没有数据了
                $('.nav_a').css('display', 'none');
                $('.order').css('display', 'none'); //页面隐藏
            }
            shunum();

        });

        //5 复选框控制数量和总价
        function checkedArr() {
            let arr = []; //存放被勾选的下标
            $('.con_l input').each(function (index, item) {
                if ($(item).prop('checked')) { //被勾选了
                    arr.push(index);
                }

            });
            // console.log(arr);
            return arr;
        }

        function shunum() { //封装函数，方便调用
            let cheall = checkedArr(); //勾选被返回的数组
            let num = 0; //商品数
            let total = 0; //总价
            cheall.forEach(function (item, index) {
                num += $('.con .text1').eq(cheall[index]).val() * 1; //累加就是总的商品数量
                total += $('.con_zhu .con_5').eq(cheall[index]).text().slice(1) * 1; //总价格

            });
            // console.log(total);
            $('#jianshu').html(num); //渲染商品件数
            $('#jiege').html('￥' + total.toFixed(2)); //渲染总价格
            $('#shangjia').html('￥' + total.toFixed(2)); //渲染总价格
            $('.ra2').html('￥' + total.toFixed(2)); //渲染总价格

            //点选控制全选按钮
            let len = $('.con_l input').size(); //所有复选框的长度
            let checkednum = $('.con_l input:checked').size(); //勾选上的长度
            if (len == checkednum) { //证明全部选上
                $('#quanxuan').prop('checked', true);
            } else {
                $('#quanxuan').prop('checked', false);
            }
        }
        //点击复选框事件
        $('.con').on('click', '.con_l input', function () {
            shunum(); //调用函数实现效果
        });
        //全选功能
        $('#quanxuan').click(function () {
            let ok = $('#quanxuan').prop('checked');
            $('.con_l input').prop('checked', ok);
            shunum();
        });
        //删除被勾选的行
        $('#shanchu').click(function () { //reverse()倒序不能删除下标会变
            let cheall = checkedArr().reverse(); //勾选被返回的数组
            let iok = confirm('您确定要删除我们吗？');
            if (iok) {
                cheall.forEach(function (item, index) {

                    let id = $('.con_zhu').eq(cheall[index]).data('id'); //获取id 进行删除商品
                    // console.log(id)
                    $('.con_zhu').eq(cheall[index]).remove();
                    $.ajax({
                        tpye: 'post',
                        url: '../api/shanchu.php',
                        data: {
                            uid: id
                        },
                        success: str => {
                            // console.log(str);
                        }
                    })





                });

            }
            shunum();
            if ($('.con .text1').size() == 0) { //没有数据了
                $('.nav_a').css('display', 'none');
                $('.order').css('display', 'none'); //页面隐藏
            }
        });
    }

    // 点击继续购物去到主页
    $('.tr_3').click(function () {
        // console.log($(this))
        location.href = '../shouye.html';
    });
    let url = decodeURI(location.search.slice(1)); //接收参数
    // console.log(url);
    let good = url.split('&'); //得到一个数组 第一个是商品id 第二个是商品数量 

    let id = good[0]; //商品id
    let shu = good[1]; //数量
    // console.log(shu);

    let pom = new Promise(function (resolved) { //Promise的使用
        $.ajax({ //商品表数据，找里面的数据
            tpye: 'post',
            url: '../api/dingdan.php',
            data: {
                uid: id
            },
            success: str => {
                let arr = JSON.parse(str);
                // console.log(arr);

                resolved(arr);

            }
        })
    });
    pom.then(function (arr) {
        var html = '';
        for (let i = 0; i < arr.length; i++) {
            // console.log(arr[i].uid)
            $.ajax({
                tpye: 'post',
                url: '../api/shuju.php', //在列表页找到对应id的数据渲染出来
                data: {
                    uid: arr[i].uid,
                    num: arr[i].num

                },

                success: str => {

                    let arr = JSON.parse(str);
                    // console.log(arr);
                    html += arr.data.map(item => {
                        return `<div class="con_zhu" data-id="${item.uid}">
                            <div class="con_l">
                                <input type="checkbox" name="">
                                <img src="${item.img}"
                                    alt="">
                                <div class="wen"><a
                                        href="####">${item.content}</a></div>
                            </div>
                            <div class="con_2">￥${item.price}</div>
                            <div class="con_3">
                                <div class="jian">-</div>
                                <input type="text" value="${arr.num}" data-num="500" class="text1">
                                <div class="jia">+</div>
                            </div>
                            <div class="con_4"></div>
                            <div class="con_5">￥${(item.price*arr.num).toFixed(2)}</div>
                            <div class="con_6">
                                <p class="shou"><a href="###">收藏</a></p>
                                <p class="shan"><a href="###">删除</a></p>
                            </div>
                        </div>`
                    }).join('');
                    $('.shanpin').html(html);

                }
            })
        }
    });



    gouwu(); //调用上面操作的函数
})();
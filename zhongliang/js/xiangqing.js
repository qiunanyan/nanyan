(function () {
    function dian() { //点击增减的封装函数
        function total(now, num) { //now指点击的元素
            let kucun = $(now).parent().find('#shuzi').data('num'); //库存数量
            // console.log(kucun)
            if (num < 1) {
                num = 1;
            } else if (num > kucun) {
                num = kucun; //提示已经达到库存量
            }
            $(now).parent().find('#shuzi').val(num); //点击的数量值

        }
        //1 点击加
        $('.pa').on('click', '.span_you', function () {
            let num = $(this).prev().val();
            // console.log(this)
            num++;
            total($(this), num);
        });
        //2 点击减
        $('.pa').on('click', '.span_zuo', function () {
            let num = $(this).next().val();
            // console.log(this)
            num--;
            total($(this), num);
        });
        //3 手动输入数量
        $('.pa').on('input', '#shuzi', function () {
            let num = $(this).val();
            // console.log(num);
            total($(this), num);
        });
    }
    // 选项卡
    $('.xuan li').click(function () {
        $(this).addClass('cu').siblings().removeClass('cu');
        $('.neia li').eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
    });
    let url = decodeURI(location.search.slice(1)); //接收参数
    // console.log(url);
    $.ajax({
        type: 'post',
        url: '../api/shuju.php', //通过id找对应的数量渲染出来
        data: {
            uid: url
        },
        success: str => {
            let arr = JSON.parse(str);
            // console.log(arr)
            let html = arr.data.map(item => {
                return ` 
                <h2>奶香浓郁四溢锁鲜直达</h2>
                <div class="tuan-wen">${item.content}
                </div>`
            }).join('');
            $('.ran1').html(html); //渲染页面
            let html1 = arr.data.map(nie => {
                return `<p class="p1">
                <span class="ab">￥</span>
                <span class="cd">${nie.price}</span>
            </p>
            <h3>
                <strong>${nie.uid*nie.price}</strong>
                人购买
            </h3>
            <h4>

                距离结束还剩
                <span>3&nbsp;</span>
                天以上
                &nbsp;（团购商品数量有限，先到先得，售完为止）
            </h4>
            <div class="mg-left">
                <div class="mga">
                    <div class="mg_l">
                        <p class="pa">
                            <span class="span_zuo">-</span>
                            <input type="text" value="1" id="shuzi" data-num="200">
                            <span class="span_you">+</span>
                        </p>
                        <div class="di">
                            <p class="pb">抢购</p>
                            <div class="sao">
                                <i class="ia"></i>购物车
                                <div class="ma"></div>
                            </div>
                        </div>
                    </div>
                    <div class="mg_r">
                        <p class="pc">
                            评价：<span>${nie.uid/10+4}分</span>
                            <span class="aa">${nie.number}</span>
                            评价
                        </p>
                        <div class="tiao"></div>
                        <h5>第一次喝欧诺鲜的牛奶，没想到比想象的还要好喝，赞一个。</h5>
                    </div>
                </div>
                <div class="mg_z">生产日期：2019-02-06&nbsp;保质期：365天</div>
            </div>`
            }).join('');
            $('.intzuo').html(html1); //渲染页面
            dian();
            //事件委托点击抢购于去购物车结算
            $('.intzuo').on('click', '.pb', function () {
                // console.log(1)
                let name = getCookie('name');
                // console.log(name);
                if (name) { //证明登录状态，如没有登录先登录
                    $.ajax({
                        type: 'post',
                        url: '../api/chazhao.php',
                        data: {
                            uid: url
                        },
                        success: str => {
                            console.log(str)
                            if (str == 'yes') {
                                //该商品还没有抢购过，可以抢购
                                $.ajax({
                                    type: 'post',
                                    url: '../api/xiang.php', //把用户名，id，数量插入数据库
                                    data: {
                                        yonghu: name, //用户名
                                        uid: url, //商品id
                                        num: $('#shuzi').val() //抢购数量
                                    },
                                    success: str => {
                                        // console.log(str)
                                        if (str == 'yes') { //插入数据成功
                                            alert('成功抢购');
                                            $('.intzuo').on('click', '.sao', function () {
                                                alert('去购物车结算吗');
                                                location.href = '07.gouwuche.html?' + url + '&' + $('#shuzi').val();
                                            })
                                        } else {
                                            alert('抢购失败');
                                        }
                                    }
                                })

                            } else {
                                alert('亲，该商品您已抢购过了，可以去购物车查看咯');
                                $('.intzuo').on('click', '.sao', function () { //直接去购物车
                                    alert('去购物车结算吗');
                                    location.href = '07.gouwuche.html';
                                })
                            }
                        }
                    })

                } else {
                    alert('请登录账号');
                    location.href = '02.denglu.html';
                }

            });

        }
    })



})();
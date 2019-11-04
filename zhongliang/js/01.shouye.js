(function () {

    //选项卡
    $('#xuan li').mouseover(function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('#nei .cont').eq($(this).index()).css('display', 'block').siblings().css('display', 'none')

    });
    //进口食品的选项卡
    $('.tit li').mouseover(function () {
        $(this).addClass('hei').siblings().removeClass('hei');
        $('.contab .ka1').eq($(this).index()).css('display', 'block').siblings().css('display', 'none');

    });
    // 1 楼层跳跃
    $('#louli li').click(function () { //点击跳到对于楼层
        $(this).css('background', '#3da601').find('b').css('color', '#fff').end().siblings().css('background', '').find('b').css('color', '#606060');
        $index = $(this).index();
        // console.log($('#wrapper .zhuyao5').eq($index).offset().top);
        $("html,body").animate({
            scrollTop: $('#wrapper .zhuyao5').eq($index).offset().top
        }, 500);
    });
    $(window).scroll(function () { //2 楼层联动
        //获取滚动条位置
        let iTop = $(window).scrollTop();
        //我买推荐到顶部的距离
        $h = $('.zhuyao3').offset().top;
        //尾部1到顶部的距离
        let $h2 = $('.footer1').offset().top;
        if (iTop <= $h || iTop >= $h2) { //滑动到我买推荐界面时出现楼层菜单
            // console.log($h2);
            $('#louli').hide(); //隐藏
        } else {
            $('#louli').show(); //显示
        }
        //楼层联动
        let num = 0;
        for (i = 0; i < $('#wrapper .zhuyao5').size(); i++) {
            $top = $('#wrapper .zhuyao5').eq(i).offset().top; //每个楼层到顶部的距离
            if (iTop >= $top) {
                num = i;
                // console.log(num);
            }

        }
        $('#louli li').eq(num).css('background', '#3da601').children('b').css('color', '#fff').end().siblings().css('background', '').children('b').css('color', '#606060');

    });
    //点击右侧的购物车显示
    let i = true;
    $('.toob1').click(function () {

        if (i) {
            $('.youlan').animate({
                'right': 0
            }, 500);

        } else {
            $('.youlan').animate({
                'right': -250
            }, 500);

        }
        i = !i;


    });
    //回顶操作
    $(window).scroll(function () {
        let h = $(window).scrollTop(); //获取滚动条位置
        // console.log(h)
        if (h >= 600) {
            $('.huid').css('display', 'block');
        } else {
            $('.huid').css('display', 'none');
        }

        $('.huid').click(function () { //点击回顶
            let timer = setInterval(function () {
                h -= 1500; //匀速运动：每隔60毫秒运动1500px
                if (h <= 0) {
                    clearInterval(timer);

                }
                window.scrollTo(0, h); //参数一：水平方向的滚动距离；参数二：垂直方向滚动到哪里,参考线是0所在水平线
            }, 60);

        });
    });
    //点击头部做栏菜单，跳转到列表页
    $('.kinds a').click(function () {
        location.href = 'html/05.libiao.html';
    });
    // 每日劲爆品
    $('.xiar .niu1 ').click(function () {
        // console.log(1)
        $('.xia_r').animate({
            'left': -970
        }, 500);


    });
    $('.xiar .niu2 ').click(function () {
        // console.log(1)
        $('.xia_r').animate({
            'left': 0
        }, 500);


    });
    //我买推荐
    $('.zhuyao3a .niu1 ').click(function () {
        // console.log(1)
        $('.zhuyao3a_1').animate({
            'left': -1250
        }, 500);


    });
    $('.zhuyao3a .niu2 ').click(function () {
        // console.log(1)
        $('.zhuyao3a_1').animate({
            'left': 0
        }, 500);


    });

})();
(function () {
    //如果登录中，主页面显示退出按钮，否则显示退出按钮
    function int() {
        let name = getCookie('name'); //获取数据判断
        // console.log(name)
        if (name) {
            //已登录
            let nei = name + ',' + `欢迎来我买网!`;
            // console.log(nei);
            $('#hi').html(nei);
            $('#deng1').html('退出');

        } else {

            $('#deng1').html('登录');
            $('#hi').html('hi，欢迎来我买网!');
        }
    }
    int();
    //跳转登录页面 并删除记录
    $('#deng1').click(function () {
        if ($('#deng1').html() == '退出') {
            removeCookie('name');
            $('#deng1').html('登录');
        } else {
            location.href = '02.denglu.html';
        }
        int();

    });
    //跳转注册页面
    $('#zhu1').click(function () {
        location.href = '01.zhuce.html';
    });
    let i = true;
    $('#an').click(function () { //导航下拉菜单按钮
        if (i) {
            $('.caidan').css('display', 'block'); //菜单出现
            $('#an').css('background', '#ffffff'); //背景色变白色
            $('#an').css('border', '1px solid #3a9900'); //边框变绿色
            $('#an').css('border-bottom', '1px solid  #ffffff'); //下边框变白色，为了遮住菜单框的一部分边框
            $('.zhezhao').css('display', 'block'); //这招出现
        } else {
            $('.caidan').css('display', 'none'); //关闭
            $('.zhezhao').css('display', 'none');
            $('#an').css('border', '');
            $('#an').css('background', '');
        }
        i = !i;

    });
    // 点X也关闭菜单
    $('#x').click(function () { //关闭/还原
        $('.caidan').css('display', 'none');
        $('.zhezhao').css('display', 'none');
        $('#an').css('border', '');
        $('#an').css('background', '');
    });
    //吸顶菜单
    $(window).scroll(function () {
        let h = $(window).height(); //可视窗的高度
        let top = $(window).scrollTop(); //滚动条离顶部距离
        // console.log(top);
        if (top > h) {
            $('#xd').addClass('fix');
            $('#ma').css('display', 'none');
            $('.logo1').css('background-image', 'url(../images/xd.png)');

        } else {
            $('#xd').removeClass('fix');
            $('#ma').css('display', 'block');
            $('.logo1').css('background-image', 'url(../images/logo1.jpg)');

        }
    });



})();
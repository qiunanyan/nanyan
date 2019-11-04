(function () {
    //1 .点击切换页面
    $('#wangji').click(function () { //点击切换到忘记密码页面
        $('#logina').css('display', 'none');
        $('#loginb').css('display', 'block');
    });
    $('#fanhui').click(function () { //点击返回登录页面
        $('#loginb').css('display', 'none');
        $('#logina').css('display', 'block');
    });
    //2.账号密码正确直接登录
    $('#denglu').click(function () {
        if ($('#name').val() && $('#password').val()) { //非空判断
            $.ajax({
                type: 'post',
                url: '../api/01.denglu.php',
                data: {
                    name: $('#name').val(),
                    psw: $('#password').val()
                },
                success: str => {
                    // console.log(str);
                    if (str == 'yes') { //信息正确
                        let name = getCookie('name');
                        if (name) {
                            //证明已经登录，不能重复登录
                            alert('已登录中');
                        } else {
                            setCookie('name', $('#name').val(), 3); //先保存起来，配合上面的重复登录
                            alert('登录成功');
                            location.href = 'yemian.html';
                        }
                    } else {
                        alert('信息有误，请重新输入');
                    }


                }
            });
        } else {
            alert('请输入账号密码');
        }
    });
    //3.忘记密码重置密码
    $('#chongzhi').click(function () {
        if ($('#name2').val() && $('#password2').val() && $('#password3').val()) { //非空判断
            $.ajax({
                type: 'get',
                url: '../api/02.chongzhi.php',
                data: {
                    name: $('#name2').val(),
                    psw: $('#password2').val(),
                },
                success: str => {
                    // console.log(str);
                    if (str == 'yes' && $('#password2').val() == $('#password3').val() && mima($('#password2').val())) {
                        alert('密码更改成功');
                    } else {
                        alert('重置密码失败');
                    }
                }

            })
        } else {
            alert('请输入完整信息');
        }
    });

    function mima(str) { //正则密码判断       
        var reg = /^\S{6,20}$/;
        return reg.test(str);
    }
    mima();
})();
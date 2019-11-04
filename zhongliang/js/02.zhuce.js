(function () {
    //开关
    var kaiguan1 = false;
    let kaiguan2 = false;
    let kaiguan3 = false;
    let kaiguan4 = false;

    //1.邮箱/手机 需求：1非空判断 2 正则判断
    $('#mail').blur(function () {
        let you = checkReg.email($('#mail').val()); //调用函数正则验证邮箱
        let shouji = checkReg.tel($('#mail').val()); //调用函数正则验证手机号
        if ($('#mail').val()) { //非空判断
            if (you || shouji) { //正则判断
                kaiguan1 = true;
                // console.log(kaiguan1);
                $('.main .xin').eq(0).html(''); //清空底下的信息提示
            } else {
                $('.main .xin').eq(0).html('请您输入正确的邮箱或手机').css('color', '#ff8080');
            }

        }
    });
    //2.用户名 需求：1.非空验证 2.正则验证 3. ajax验证
    $('#name').blur(function () {
        if ($('#name').val()) { //非空验证
            let user = /^[a-zA-Z]\w{3,15}$/;
            let ming = user.test($('#name').val());
            if (ming) { //正则
                $('.main .xin').eq(1).html('');
                $.ajax({
                    type: 'post',
                    url: '../api/01.yanzhneg.php',
                    data: {
                        name: $('#name').val()
                    },
                    success: str => {
                        // console.log(str);
                        if (str == 'yes') {
                            kaiguan2 = true;
                            // console.log(kaiguan2);
                            $('.main .xin').eq(1).html('');
                        } else {
                            $('.main .xin').eq(1).html('该名字已被注册').css('color', '#ff8080');

                        }
                    }
                })
            } else {
                $('.main .xin').eq(1).html('用户名必须是4到16位（字母，数字，下划线，减号）').css('color', '#ff8080');
            }
        }

    });
    //3 密码验证 需求：1 非空 2 正则
    $('#psw1').blur(function () {
        if ($('#psw1').val()) { //非空
            let reg = /^[a-zA-Z][\w\-]{5,17}$/;
            let mima = reg.test($('#psw1').val());
            if (mima) { //正则
                $('.main .xin').eq(2).html('');
                kaiguan3 = true;
                // console.log(kaiguan3);
            } else {
                $('.main .xin').eq(2).html('密码长度必须为8-16个字符').css('color', '#ff8080');
            }
        }
    });
    //4 确认密码  需求：1 非空 2 跟第一个密码一样
    $('#psw2').blur(function () {
        if ($('#psw2').val()) { //非空
            if ($('#psw1').val() == $('#psw2').val()) { //判断两个密码是否一样
                $('.main .xin').eq(3).html('');
                kaiguan4 = true;
                // console.log(kaiguan4);
            } else {
                $('.main .xin').eq(3).html('两次输入的密码不一致，请重新输入').css('color', '#ff8080');
            }
        }
    });
    //5.符合以上条件和服务协议勾选就可以注册
    $('.main4').click(function () {
        if (kaiguan1 && kaiguan2 && kaiguan3 && kaiguan4 && $('#xieyi').prop('checked')) { //判断以上条件都正确
            $.ajax({
                type: 'post',
                url: '../api/02.zhuce.php',
                data: {
                    name: $('#name').val(),
                    psw: $('#psw1').val()

                },
                success: str => {
                    if (str == 'yes') {
                        alert('注册成功');
                        location.href = '02.denglu.html';
                    } else {
                        alert('注册失败');
                    }
                }
            });
        } else {
            alert('信息不合法');
        }
    });
    $('#deng').click(function () { //有账号，就直接登录
        location.href = '02.denglu.html';
    });

})();
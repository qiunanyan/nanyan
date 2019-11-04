(function () {
    //注册账号，点击跳转到注册页
    $('.span2').click(function () {
        location.href = '01.zhuce.html';
    });
    //登录 需求：1 非空 2 ajax验证账号密码 3 登录中不能再登
    $('.span1').click(function () {
        // let name1 = $('#name1').val();
        // let psw1 = $('#pswa').val();
        // if ($('#mian').prop('checked')) {
        //     setCookie('name', name1, 10);
        //     setCookie('psw', psw1, 10);
        // }
        let huo = getCookie('name');
        if (huo) {
            //以登录
            alert('已登录中');
        } else if ($('#name1').val() && $('#pswa').val()) {
            $.ajax({
                type: 'post',
                url: '../api/03.denglu.php',
                data: {
                    name: $('#name1').val(),
                    psw: $('#pswa').val()
                },
                success: str => {
                    // console.log(str);
                    if (str == 'yes') { //信息正确

                        if ($('#mian').prop('checked')) { //十天免登陆
                            let name1 = $('#name1').val();
                            let psw1 = $('#pswa').val();
                            setCookie('name', name1, 10);
                            setCookie('psw', psw1, 10);
                            alert('登录成功');
                            location.href = '../shouye.html';

                        } else {
                            let name1 = $('#name1').val();
                            setCookie('name', name1, 1);
                            alert('登录成功');
                            location.href = '../shouye.html';

                        }


                    } else {
                        alert('登录失败');
                    }
                }
            });
        } else {
            alert('用户名跟密码不能为空');
        }
    });
    //要是用户名有误 出现提示X 点击可以清空输入框内容
    $('#name1').change(function () {
        $.ajax({
            type: 'post',
            url: '../api/01.yanzhneg.php',
            data: {
                name: $('#name1').val()
            },
            success: str => {
                // console.log(str);
                if (str == 'yes') { //当用户名错误
                    $('#kai').css('display', 'block');
                    $('#kai').click(function () { //点击X清空内容
                        // console.log(1);
                        $('#name1').val('');
                    });
                } else {
                    $('#kai').css('display', 'none');
                }
            }
        })
    });

    // function miandeng() {
    //     let name = getCookie('name');
    //     let psw = getCookie('psw');
    //     if ($('#name1').val() && $('#pswa').val()) {
    //         $('#name1').val(name);
    //         $('#pswa').val(psw);
    //     }
    // }
    // miandeng();
})();
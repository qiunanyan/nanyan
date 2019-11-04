// 生成随机颜色
function randomColor(type) {
    var color = ''; //用来保存结果
    if (type == 16) {
        //生成16进制的随机颜色
        color += '#';
        var html = '0123456789abcdef';
        for (var i = 0; i < 6; i++) {
            var num = parseInt(Math.random() * 16);
            color += html[num];
        }
        // console.log(color);
    }

}

// 生成一定范围内的随机数
function randomNum(min, max) {
    var a = parseInt(Math.random() * (max - min + 1)) + min;
    return a;

}

//通过id获取元素
function getid(id) {
    return document.getElementById(id);
}

//去掉数组中的重复项，并返回一个新的数组
function norepeat(arr) { //形参：用来接收回调函数的
    var res = []; //存处理好的数据，以后要返回到入口处
    arr.forEach(function (val) { //val指的是arr4里面每一项值
        if (res.indexOf(val) == -1) {
            res.push(val);
        }
    });
    return res;
}

//去掉字符串中的重复项，并返回一个新的字符串
function norepeatStr(str) { //形参：用来接收回调函数的
    var str1 = ''; //存处理好的数据，以后要返回到入口处

    for (var i = 0; i < str.length; i++) {
        if (str1.indexOf(str[i]) == -1) {
            str1 += str[i];
        }
    }
    return str1;
}

//把一堆的敏感词都替换掉
function filterStr(str) {
    var arr = ["fuck", '操', '你妈的', '金三胖', '去死', 'MMP', '妈蛋', '垃圾'];
    // var reg = new RegExp(word,"ig"); //构造函数的方式创建一个正则表达式
    for (var i = 0; i < arr.length; i++) {
        var word = arr[i];
        var reg = new RegExp(word, 'ig'); //构造函数的方式创建一个正则表达式
        str = str.replace(reg, '***');
    }
    return str;
}

// 封装把参数变成对象
//name=laoxie&age=18&sex=male ---> obj{name:'laoxie',age:'18',sex:'male'}
function strToObj(str) {
    var obj = {}; //创建一个用来存放最终内容的空对象
    var arr = str.split('&'); //以'&'为中间点进行分割，返回数组 --- ["name=laoxie", "age=18", "sex=male"]
    arr.forEach(function (item) { //遍历数组
        var arr1 = item.split('='); //以'='为中间点进行分割，返回数组 --- ["name", "laoxie"] ["age", "18"] ["sex", "male"]
        obj[arr1[0]] = arr1[1]; //将值存到obj对象里面 --- 属性：属性值
    });
    return obj;
}

//封装把对象变成参数
function objToStr(obj) {
    var str = ''; //创建一个用来存放最终结果的空字符串
    for (var key in obj) {
        //遍历过程把每次把对象属性赋值给key
        // 所以获取对象属性值为：obj[key]
        str += key + '=' + obj[key] + '&';
    }
    return str.slice(0, -1); //返回字符串str中第一个到倒数第二个的内容
}
//封装补零函数 --- 比如年月日时分秒： 2019-7-29 11：12 ：09

function toDb(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return '' + num;
    }
}
//封装年月日时分秒的函数
function toDate(time) {
    var date = new Date(time); //系统当前时间
    var year = date.getFullYear(); //年
    var month = date.getMonth() + 1; //月
    var day = date.getDate(); //日
    var hours = date.getHours(); // 时间
    var mins = date.getMinutes(); //分
    var sec = date.getSeconds(); //秒
    return `${year}-${toDb(month)}-${toDb(day)}  ${toDb(hours)} : ${toDb(mins)} : ${toDb(sec)}`;
}
// 封装表格的函数
function biaoge(x, y) {
    x = Number(x); // 行
    y = Number(y); // 列
    var html = '';
    html += '<table>';
    for (var i = 1; i <= x; i++) {
        html += '<tr>';
        html += '<td>' + i + '</td>'; //多一列，用于放序号
        for (var j = 1; j <= y; j++) {
            html += '<td>' + '第' + i + '行' + '第' + j + '列' + '</td>';
        }
        html += '<td><a href="###">复制</a>' + ' ' + '<a href="###">删除</a></td>';
        html += '</tr>';
    }
    html += '</table>';
    return html;

}
//封装获取样式函数
function getStyle(ele, attr) {
    if (getComputedStyle(ele, false)) {
        //高级浏览器
        return getComputedStyle(ele, false)[attr];
    } else { //IE8-
        return ele.currentStyle[attr];
        //    格式用法： var iw = getStyle(h1, 'width');
        //     console.log('宽度：' + iw);
    }
}
// 封装设置样式函数
function css() {
    if (arguments.length == 2) { // 非行内样式只能获取不可设置，我们是通过添加行内样式改变节点样式的
        //css() 仿jq   css(ele, attr , val) 设置样式   css(ele, attr)
        //获取样式
        if (getComputedStyle(arguments[0], false)) {
            //高级浏览器
            return getComputedStyle(arguments[0], false)[arguments[1]];
            //getComputedStyle(h1, false)['top'];
        } else {
            //IE8-
            return arguments[0].currentStyle[arguments[1]];
        }
    } else if (arguments.length == 3) {
        //设置样式  ele.style.width = '200px'
        arguments[0].style[arguments[1]] = arguments[2];
    }
    // 格式用法： css(h1, 'left', '200px');//给h1设置样式left==200px
    // var iTop = css(h1, 'top'); //获取h1的top的值
    // console.log(iTop);//50px
}
//封装事件绑定函数
function bind(ele, type, fn) {
    if (ele.addEventListener) {
        //主流浏览器
        ele.addEventListener(type, fn, false); //false:冒泡
    } else {
        ele.attachEvent('on' + type, fn);
    }
}
///封装正则验证

var checkReg = {
    email: function (str) { //邮箱
        var reg = /^[\w&%$#!\-]+@[\w&%$#!\-]+\.[a-zA-Z]+$/;
        return reg.test(str);
    },
    tel: function (str) { //电话
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    }
}

//封装表单验证


function checkInput(ele, reg, inf, meg) {
    /*
                参数一：ele 要正则验证的表单
                参数二：reg 正则不同
                参数三：inf 提示信息节点不同
                参数四：meg 提示信息不同,对象
    */

    ele.onblur = function () {
        var val = ele.value.trim();
        var index = this.dataset.index; //用自定义属性的值作为开关对象的属性名
        //1.非空验证
        if (val) {
            //2.正则验证
            // var regEmail = /^[\w&%$#!\-]+@[\w&%$#!\-]+\.[a-zA-Z]+$/;
            // var res = regEmail.test(email);
            // eval():把字符串转成js
            // var str = `checkReg.${reg}(val)`;//方法一：借助一个方法eval()
            var res = checkReg[reg](val); //方法二：利用对象属性名可以接收变量的特性实现
            // console.log(eval(str), res);
            // var res = reg(val);//实参
            // console.log(res);
            // var res = checkReg.email(val);
            if (res) {
                //符合规则
                inf.innerHTML = meg.success;
                inf.style.color = '#58bc58';
                ele.istrue = true;
            } else {
                //不符合规则
                inf.innerHTML = meg.failure;
                inf.style.color = 'red';
                ele.istrue = false;
            }
        } else {
            inf.innerHTML = meg.null;
            inf.style.color = 'red';
            ele.istrue = false;
        }
    }
}
//封装正则验证
var checkReg = {
    Id: function (str) { //账号
        var reg = /^[a-zA-Z][\w\-]{5,19}$/;
        return reg.test(str);
    },
    name: function (str) { //昵称
        var reg = /^[\u2E80-\u9FFF]+$/;
        return reg.test(str);
    },
    email: function (str) { //电子邮件
        var reg = /^[a-zA-Z0-9][\w\-\.]{2,29}@[a-zA-Z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/;
        return reg.test(str);
    },
    identity: function (str) { //身份证
        var reg = /^(\d{17}|\d{14})[\dx]$/;
        return reg.test(str);
    },
    tel: function (str) { //手机号
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    },
    birthday: function (str) { //生日
        var reg = /^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/;
        return reg.test(str);
    },
    paw: function (str) { //密码
        var reg = /^\S{6,20}$/;
        return reg.test(str);
    }
}
///正则大全
var checkReg = {
    trim: function (str) {
        //去掉前后空格
        var reg = /^\s+|\s+$/g;
        return str.replace(reg, "");
    },
    tel: function (str) {
        //电话
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    },
    email: function (str) {
        //邮箱正则:a_a2-+.s @ a_a+2-.s .s_a2
        var reg = /^\w+([\-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //网上推荐
        return reg.test(str);
    },
    idcard: function (str) {
        //身份证
        var reg = /^(\d{17}|\d{14})[\dX]$/;
        return reg.test(str);
    },
    psweasy: function (str) {
        //6-18位首字母开头
        var reg = /^[a-zA-Z]\w{5,17}$/;
        return reg.test(str);
    },
    pwwagain: function (str1, str2) {
        //确认密码
        return str1 === str2; //全等 恒等
    },
    urladr: function (str) {
        //路径：网址规则
        var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        return reg.test(str);
    },
    name: function (str) {
        //账号字母开头,6-20位
        var reg = /^[a-zA-Z][\w\-]{5,19}$/;
        return reg.test(str);
    },
    chinese: function (str) {
        //中文

        var reg = /^[\u2E80-\u9FFF]+$/;
        return reg.test(str);
    },
    birthday: function (str) {
        //生日
        var reg = /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;
        return reg.test(str);
    }
}; //

// // 设置自动居中显示  
// function autoCenter(ele) {
//     //获取网页可是区宽高  
//     var iW = document.documentElement.clientWidth;
//     var iH = document.documentElement.clientHeight;

//     //设置定位  
//     ele.style.left = (iW - ele.offsetWidth) / 2 + 'px';
//     ele.style.top = (iH - ele.offsetHeight) / 2 + 'px';

// }
// ///窗口自适应 跟上面的结合一起用，要调用
// window.onresize = function () {
//     // autoCenter(box2);
// }
/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {

        var istrue = true;

        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //			console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = css(obj, key) * 100; //透明度
            } else {
                cur = parseInt(css(obj, key)); // 300px  300  width heigth borderwidth px为单位的

            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            //保证上一个属性全部都达到目标值了
            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100; //0-1
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }

        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) { //可选参数的由来
                fnend();
            }
        }

    }, 30); //obj.timer 每个对象都有自己定时器

}

/*
           封装ajax函数：jq 
           $.ajax({
               type : 'get',//请求方式
               data : {//传输数据(选填)
                   name : 'jingjing',
                   pwd : 123455
               },
               asyn : true,//异步，(选填)
               url : 路径，//请求的接口路径
               success : function(str) {
                   //成功的回调
               },
               failure : function(str) {
                   //失败的回调
               }
           });
       */

function ajax(opt) {
    //默认参数
    let defaultData = {
        data: '',
        asyn: true,
        failure: null
    }

    Object.assign(defaultData, opt); //用默认参数

    let xhr = new XMLHttpRequest();
    if (defaultData.type.toLowerCase() == 'get') {
        //get方式
        if (defaultData.data) {
            defaultData.data = objToStr(defaultData.data);
            defaultData.url += '?' + defaultData.data;
        }
        xhr.open('get', defaultData.url, defaultData.asyn);
        xhr.send(null);
    } else if (defaultData.type.toLowerCase() == 'post') {
        //post方式
        xhr.open('post', defaultData.url, defaultData.asyn);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        defaultData.data = objToStr(defaultData.data);
        xhr.send(defaultData.data);
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 304) {
                //成功了
                let data = xhr.responseText;
                defaultData.success(data); //实参
            } else {
                //失败
                if (defaultData.failure) {
                    //写了这个回调
                    defaultData.failure(xhr.status);
                }
            }
        }
    }
}
//封装cookie 的  * 增：改 删 查
//用法  btn1.onclick = function () {
//会话级别，session，关掉浏览器就没有,延长失效时间的话，要设置expires
// setCookie('name', '小鱿鱼', 7);
// }

// //取
// btn2.onclick = function () {//name=小鱿鱼; age=20
//     var str = getCookie('name');
//     console.log(str);
// }
// //删除
// btn3.onclick = function () {//name=小鱿鱼; age=20
//     var str = removeCookie('name');

// }

function setCookie(key, val, iDay) {
    //key：键名；val：键值；iDay：失效时间
    var now = new Date();
    now.setDate(now.getDate() + iDay);
    document.cookie = key + '=' + val + ';expires=' + now.toUTCString() + ';path=/'; //设置一个站点内的文件可以共享此cookie
}

function getCookie(key) { //获取cookie值
    var cookies = document.cookie; //name=malin; pwd=123456
    var arr = cookies.split('; '); //['name=malin','pwd=123456']
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('='); //['name','malin'
        if (key == arr2[0]) {
            return arr2[1];
        }
    };
}

function removeCookie(key) { //删除：设置失效时间为过去的时间，立即失效
    setCookie(key, '', -1);
}








//开启定时器
// var timer = setInterval(function () {
//     num--;
//     if (num < 0) {
//         //到达临界点
//         clearInterval(timer); //关闭定时器
//         box.style.display = 'none';
//     }
//     time.innerHTML = num + '秒';
// }, 1000); //1000指每隔1000毫秒
// 3. 在楼层滚动的时候， 按钮跟着高亮显示(window)
// window.onscroll = function () {

//     var scrollTop = window.scrollY; //动态获取到滚动距离
//     for (var i = 0; i < aLis.length; i++) {
//         if (scrollTop >= aLis[i].offsetTop) { //offsetTop: 当前元素离<定位父级>元素顶部的距离。

//             // console.log('临界值到了' + i);
//             //排他
//             for (var j = 0; j < aBtns.length; j++) {
//                 aBtns[j].className = '';
//             }
//             aBtns[i].className = 'active';
//         }
//     }
// }
///循环排他的写法
// for (var i = 0; i < lists.length; i++) { //该循环的作用：用于给按钮们绑定事件
//     lists[i].index = i; // lists[0].index = 0; lists[1].index = 1 绑定索引

//     lists[i].onclick = function () {
//         //排他：循环清空再设置单个显示
//         for (var i = 0; i < lists.length; i++) {
//             lists[i].className = '';
//             cons[i].style.display = 'none';
//         }
//         this.className = 'active'; //当前按钮高亮显示
//         // console.log(this.index);
//         cons[this.index].style.display = 'block'; //让当前按钮对应的盒子出现
//     }
// }
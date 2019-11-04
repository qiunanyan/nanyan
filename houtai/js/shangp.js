(function () {
    function diao() {
        //全选
        $('#all').click(function () {
            let iok = $('#all').prop('checked');
            $('#tbody input').prop('checked', iok);
        });
        //反选
        $('#fx').click(function () {
            $('#tbody input').each(function (index, ele) {
                let ok = $(ele).prop('checked');
                $(ele).prop('checked', !ok);
            });
            arrNum();
        });
        //下面复选框发过来控制全选
        function arrNum() { //封装函数，方便调用
            let chang = $('#tbody input').size(); //复选框总长度
            let num = $('#tbody input:checked').size(); //点选复选框的长度
            if (chang == num) {
                //证明全部被勾选了
                $('#all').prop('checked', true);
            } else {
                $('#all').prop('checked', false);
            }

        }
        $('#tbody input').click(function () {
            arrNum(); //手动一个个点选复选框，控制是否全选
        });
        //删除 事件委托，因为是数据渲染出来的
        $('#tbody').on('click', '.shan2', function () {
            // console.log(1)
            let liu = confirm('确定删除吗');
            if (liu) {
                let id = $(this).parent().prev().prev().text();
                $(this).parent().parent().remove();
                $.ajax({
                    type: 'post',
                    url: '../api/shanchu.php',
                    data: {
                        uid: id
                    },
                    success: str => {


                    }
                })

            }
        })


        //获取那个被勾选了，取对应下标，到时用于删除功能
        function gou() {
            let arr = [];
            $('#tbody input').each(function (index, item) {
                if ($(item).prop('checked')) {
                    arr.push(index);
                }
            });
            return arr;
        }
        //多个删除
        $('#shan1').click(function () {
            let che = gou().reverse(); //reverse()倒序不然删除时会乱
            let ok = confirm('确定删除我们吗？');
            if (ok) {
                che.forEach(function (item, index) {
                    let id = $('#tbody input').eq(che[index]).parent().next().next().text(); //通过关系找id
                    $('#tbody input').eq(che[index]).parent().parent().remove();
                    $.ajax({
                        type: 'post',
                        url: '../api/shanchu.php',
                        data: {
                            uid: id
                        },
                        success: str => {


                        }
                    })
                });
            }
        });
        $('#tbody').on('click', '.gai', function () {
            let num = $(this).parent().prev().text();
            // console.log(num)
            let id = $(this).parent().prev().prev().text();
            // console.log(id)
            if (num <= 1) {
                num = 1;
                $(this).parent().prev().text(1);
                $.ajax({
                    type: 'post',
                    url: '../api/xiugai.php',
                    data: {
                        uid: id,
                        num: num
                    },
                    success: str => {


                    }
                })
            } else {
                num = num;
                $.ajax({
                    type: 'post',
                    url: '../api/xiugai.php',
                    data: {
                        uid: id,
                        num: num
                    },
                    success: str => {


                    }
                })
            }
        });
    }

    $.ajax({
        type: 'post',
        url: '../api/shuju.php',
        success: str => {
            let arr = JSON.parse(str);
            // console.log(arr);
            let html = arr.map(item => {
                return `<tr>
                <td><input type="checkbox"></td>
                <td>${item.yonghu}</td>
                <td>${item.uid}</td>
                <td contenteditable="true">${item.num}</td>
                <td><a href="###" class="gai">更改并保存</a>
                    <a href="###" class="shan2">删除</a>
                </td>
            </tr>`
            }).join('');
            $('#tbody').html(html); //渲染页面
        }
    })
    diao();
})();
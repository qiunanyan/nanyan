const express = require('express');

const Router = express.Router();
//引入数据库操作方式
const query = require('../db/mysql')
const mongodb = require('../db/mongodb')
const {
    formatData
} = require('../utils')

//编写数据接口
const colName = 'goods'
//jsonp跨域使用
Router.get('/jsonp', async (req, res) => {
    let {
        ke
    } = req.query;
    let sql = `select * from goods`;
    let data = await query(sql);
    res.send(`${ke}(${JSON.stringify(data)})`);
})

//查询单个商品
Router.get('/:id', async (req, res) => {
    // async & await写法
    // 用同步的代码实现异步操作
    let {
        id
    } = req.params;
    let sql = `select * from goods where id=${id}`;
    // console.log('语句：' + sql)
    let data = await query(sql);
    res.send(data);
})

//查询所有商品
Router.get('/', async (req, res) => {
    //mysql查询数据库
    // let sql = `select * from goods`;
    // let data = await query(sql);
    // res.send(data);

    //mongodb查询数据
    let {
        page = 1, size = 10, sort
    } = req.query;
    //根据分页和每页数量计算跳过的索引值
    let index = (page - 1) * size;

    let data = await mongodb.find(colName, {}, {
        skip: index,
        limit: size,
        sort
    });

    res.send(formatData({
        data
    }))
})

//添加商品
Router.post('/', async (req, res) => {
    // let sql = `  insert into goods (firstname, lastname, email) values ('John', 'Doe', 'john@example.com');`
    // console.log(666)
    let sql = `insert into goods(`
    for (let key in req.body) {
        sql += `${key},`
    }
    sql = sql.replace(/,$/, ') values(')
    for (let key in req.body) {
        sql += `"${req.body[key]}",`

    }
    sql = sql.replace(/,$/, ')');
    // console.log(sql);
    await query(sql)
    res.send('添加成功')
})
//修改商品
Router.patch('/:id', async (req, res) => {
    // let sql = `update goods set price="${price}",category="${category}" where id=${id}`
    let {
        id
    } = req.params;
    let sql = `update goods set `;
    //拼接sql语句
    for (let key in req.body) {
        sql += `${key}="${req.body[key]}",`
    }
    //把最后那个多余的逗号去掉
    sql = sql.slice(0, -1);
    sql += `where id=${id}`
    // console.log(sql)
    await query(sql)
    res.send('修改成功')
})
//删除商品
Router.delete('/:id', async (req, res) => {
    let {
        id
    } = req.params;
    let sql = `delete from goods where id=${id}`;
    await query(sql);
    res.send(`删除${id}的商品成功`)
})

module.exports = Router;
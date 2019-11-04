const express = require('express');

const Router = express.Router();

const {
    find,
    remove,
    update,
    create
} = require('../db/mongodb');

const {
    formatData
} = require('../utils');

//想连接的数据库名字
const colName = 'user';

//查询所有用户
Router.get('/', async (req, res) => {
    //查询数据库，调用函数方法
    let result = await find(colName);
    res.send(formatData({
        data: result
    }));
})
//查询单个用户信息
Router.get('/:id', async (req, res) => {
    let {
        id
    } = req.params;
    //查询数据库
    let result = await find(colName, {
        _id: id
    }, {
        fields: {
            password: false
        }
    }); //fields过滤某字符，这里表示password不显示出来
    res.send(formatData({
        data: result
    }))
})
//删除用户
Router.delete('/:id', async (req, res) => {
    let {
        id
    } = req.params;
    //查询数据
    let result = await remove(colName, {
        _id: id
    });
    if (result.deletedCount > 0) {
        res.send(formatData());
    } else {
        res.send(formatData({
            status: 0
        }));
    }

})
//修改用户信息
Router.patch('/:id', async (req, res) => {
    let {
        id
    } = req.params;
    let {
        username,
        password
    } = req.body;
    //查询数据库
    let result = await update(colName, {
        _id: id
    }, {
        username,
        password,
        age,
        gender
    });
    if (result.modifiedCount > 0) {
        res.send(formatData())
    } else {
        res.send(formatData({
            status: 0
        }))
    }
})
//添加用户信息
Router.post('/', async (req, res) => {
    // let {
    //     username,
    //     password,
    //     id,
    //     age,
    //     gender
    // } = req.body;

    // let data = await create(colName, {
    //     "username": username

    // })
    // res.send(data)

})

module.exports = Router;
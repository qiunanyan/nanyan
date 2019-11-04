//1.引入mysql模块
const mysql = require('mysql');

// 2. 利用连接池方式实现数据库操作（推荐）
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    // port: 3306,
    database: 'h51907',
    // connectionLimit:5,
    multipleStatements: true, //是否运行同时连接多个连接对象
});
//promise
module.exports = function (sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            if (err) {
                // 把状态从Pending -> Rejected
                reject(err);
            }
            // 把状态从Pending -> Resolved
            resolve(result)
        });
    })
}
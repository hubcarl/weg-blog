var mysql = require('mysql');
var logger = require("log4js").getLogger('data');

exports.getConnection = function () {
    console.log('>>>start conn.........');
    return mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'News',
        port: 3306
    });
}

exports.query = function (strSql, params) {
    var conn = exports.getConnection();
    conn.connect();
    return new Promise(function (resolve, reject) {
        var query = conn.query(strSql, params, function (err, rows, fields) {
            if (err) {
                logger.info('>>>mysql error:' + JSON.stringify(err));
                reject(err);
            } else {
                logger.info('>>>mysql result:' + JSON.stringify(rows));
                resolve(rows);
            }
            logger.info('>>>mysql sql:' + query.sql);
            conn.end();

        });
    });
}
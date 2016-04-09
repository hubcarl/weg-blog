var path = require("path");
var log4js = require("log4js");


/**
 * 暴露到应用的日志接口，调用该方法前必须确保已经configure过
 * @param name 指定log4js配置文件中的category。依此找到对应的appender。
 *              如果appender没有写上category，则为默认的category。可以有多个
 * @returns {Logger}
 */
exports.getLogger = function (name, level) {
    var dateFileLog = log4js.getLogger(name);
    dateFileLog.setLevel(level || log4js.levels.INFO);
    return dateFileLog;
}

/**
 * 用于express中间件，调用该方法前必须确保已经configure过
 * @returns {Function|*}
 */
exports.configure = function (root) {
    var config = {
        "appenders": [
            {
                "type": "console"
            },
            {
                "type": "dateFile",
                "filename": path.join(root, "logs/debug"),
                "pattern": "-yyyy-MM-dd.log",
                "maxLogSize": 1024,
                "backups": 3,
                "alwaysIncludePattern": true,
                "category": "debug"
            },
            {
                "type": "dateFile",
                "filename": path.join(root, "logs/data"),
                "pattern": "-yyyy-MM-dd.log",
                "maxLogSize": 1024,
                "backups": 3,
                "alwaysIncludePattern": true,
                "category": "data"
            },
            {
                "type": "dateFile",
                "filename": path.join(root, "logs/access"),
                "pattern": "-yyyy-MM-dd.log",
                "maxLogSize": 1024,
                "backups": 3,
                "alwaysIncludePattern": true,
                "category": "access"
            }
        ]
    };

    //var config = path.join(path.resolve(__dirname, '../config'), "log4js.json");
    log4js.configure(config);
    return log4js.connectLogger(log4js.getLogger("debug"), {level: log4js.levels.INFO});
}
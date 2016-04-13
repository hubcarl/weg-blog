/**
 * Created by sky on 16/4/10.
 * 根据middleware.json配置文件动态注册中间件,支持$开头的变量替换
 */
var fs = require("fs");
var path = require("path");
var caller = require('caller');

module.exports = function (app, options) {

    console.log(path.dirname(caller()));

    var www = options.dir || path.resolve(path.dirname(caller()), 'server/config');

    var fileName = options.fileName || "middleware.json";

    var config = JSON.parse(fs.readFileSync(path.join(www, fileName), "utf8"));

    var makeArgument = function (args, options) {

        //(args || []).forEach(function (item) {
        //    if (typeof item == 'array') {
        //        /// TODO
        //    }
        //    else if (typeof item == 'object') {
        //        Object.keys(item).forEach(function (key) {
        //            console.log(item[key], typeof item[key]);
        //            if (item[key] && typeof item[key] == 'string' && item[key].charAt(0) == '$') {
        //                item[key] = options[key];
        //            }
        //        });
        //    } else if (typeof item == 'string') {
        //        for (var key in options) {
        //            if (options.hasOwnProperty(key)) {
        //                item = item.replace(new RegExp('\\$' + key, 'gm'), options[key]);
        //            }
        //        }
        //    }
        //});
        //
        //return args;

        var str = JSON.stringify(args||[]);
        for(var key in options){
            if(options.hasOwnProperty(key)){
                str = str.replace(new RegExp('\\$' + key, 'gm'), options[key]);
            }
        }
        return JSON.parse(str);
    };

    Object.keys(config.middleware).forEach(function (key) {
        var item = config.middleware[key];
        if (item.enabled) {
            var module = item.module;
            var method = module.method;
            var args = makeArgument(module.arguments, options);
            var mkey = module.path ? path.join(options.www, module.path) : (module.name || key);
            var middleware = require(mkey);
            if (method) {
                app.use(middleware[method].apply(null, args))
            } else {
                app.use(middleware.apply(null, args))
            }
            ;
        }
    });

    return function (req, res, next) {
        next();
    }
};
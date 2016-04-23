/**
 * Created by sky on 16/4/10.
 * 根据middleware配置文件动态注册中间件
 */
var fs = require("fs");
var path = require("path");
var caller = require('caller');

module.exports = function (app, config) {

    config = config||{}

    var www = app.get('www');

    var env = config.env||'prod';

    var configMap ={
      local:'middleware.loca.js',
      dev:'middleware.dev.js',
      test:'middleware.test.js',
      prod:'middleware.prod.js',
    };

    var dir = config.path || path.resolve(path.dirname(caller()), 'server/config/middleware');

    var middlewareConfig = require(path.resolve(dir, configMap[env])).init(app, config);

    Object.keys(middlewareConfig.middleware).forEach(function (key) {
        var item = middlewareConfig.middleware[key];
        if (item.enabled) {
            var module = item.module;
            var method = module.method;
            var args = module.arguments;
            var mkey = module.path ? path.join(www, module.path) : (module.name || key);
            var middleware = require(mkey);
            if (method) {
                app.use(middleware[method].apply(null, args));
            } else {
                app.use(middleware.apply(null, args));
            }
        }
    });

    return function (req, res, next) {
        next();
    }
};
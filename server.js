var express = require('express');
var coexpress  =  require('coexpress');
coexpress(express);

var path = require('path');
var swig = require('./server/lib/weg-swig');
var middleware = require("./server/middleware/middleware.js");
var router = require("./server/middleware/router.js");

// 启动express
var app = express();

//设置视图模板的默认后缀名为tpl
app.set('view engine', 'tpl');

//设置模板文件文件夹,__dirname为全局变量,表示网站根目录
app.set('views', path.join(__dirname, '/client/views'));

//设置自定义swig view引擎
app.engine('.tpl', swig.init({root: path.join(__dirname, '/client')}, app));

//静态目录
app.use(express.static(path.join(__dirname, '/client')));

//注册中间件
app.use(middleware(app, {root: __dirname}));

//初始化路由
app.use(router(app));

//首页
app.get('/',function(req,res){
    res.redirect('/news/index');
});


//app.use(function (req, res, next) {
//    //console.log(' app normal next');
//    next();
//})


//var router = express.Router();
//
//router.all('*', function *(req, res, next) {
//    //res.body.generatorYieldPromise = yield new Promise(function (resolve) {
//    //    setTimeout(function () {
//    //        console.log(5, Date.now());
//    //        resolve(true);
//    //    }, 500);
//    //});
//    next();
//});
//

//app.use('/test', require('./server/controller/test/test.js'));
//app.use('/news', require('./server/controller/news/index.js'));

//app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('widget/error/error', {
//        message: err.message,
//        error: err.status
//    });
//});

var args = process.argv.join('|');
var port = /\-\-port\|(\d+)(?:\||$)/.test(args) ? ~~RegExp.$1 : 9999;

var server = app.listen(port, function() {
    console.log('Express server listening on port ' + server.address().port);
});


module.exports = app;

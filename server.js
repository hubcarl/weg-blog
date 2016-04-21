
var path = require('path');

var engine = require("./server/middleware/engine.js");
var router = require("express-router-middleware");
var middleware = require("express-use-middleware");

// 启动express
var app = engine(__dirname);

//注册中间件
app.use(middleware(app, {www: __dirname}));

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

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var resourceMap = require('weg-resource');
var swigView = require('weg-swig');
var bigpipe = require('weg-bigpipe');

// 启动express
var app = express();

//设置视图模板的默认后缀名为tpl
app.set('view engine', 'tpl');

//设置模板文件文件夹,__dirname为全局变量,表示网站根目录
app.set('views', path.join(__dirname, '/client/views'));

//设置自定义swig view引擎
app.engine('.tpl', swigView.init({root: path.join(__dirname, '/client')}, app));


//var swig = require('swig');
//var swigObj = new swig.Swig();
//app.engine('.tpl', swigObj.renderFile);

//初始化map资源依赖
app.use(resourceMap({root: __dirname, prefix: 'client'}));
//bigpipe
app.use(bigpipe());
app.use(favicon());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '123456',
    cookie: { maxAge: 60 * 1000 }
}));

app.use(express.static(path.join(__dirname, '/client')));

app.get('/',function(req,res){
    res.redirect('/test/widget');
});
app.use('/test', require('./server/controller/test/test.js'));
app.use('/news', require('./server/controller/news/index.js'));


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('widget/error/error', {
        message: err.message,
        error: err.status
    });
});

var args = process.argv.join('|');
var port = /\-\-port\|(\d+)(?:\||$)/.test(args) ? ~~RegExp.$1 : 9999;

var server = app.listen(port, function() {
    console.log('Express server listening on port ' + server.address().port);
});


module.exports = app;

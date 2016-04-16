/** 
 * engine 
 * Description：目标引擎
 * Created by sky on 16/4/13
 * Copyright (c) 2016 sky All Rights Reserved
 */

var express = require('express');
var coexpress  =  require('coexpress');
var swig = require('../lib/weg-swig');
var path = require('path');

// 支持es6 yield语法,解决异步回调问题
coexpress(express);

/**
 *
 * @param www 应用根目录
 * @param template 模板配置,相关默认值
 * client:client  前端资源根目录名称
 * ext:tpl 目标后缀名称
 */
module.exports = function(www, template){

    template = template||{};

    template.client = template.client||'client';

    var app = express();

    //设置视图模板的默认后缀名为tpl
    app.set('view engine', template.ext||'tpl');

    //设置模板文件文件夹,www表示网站根目录
    app.set('views', path.join(www, path.join(template.client , 'views')));

    //设置自定义swig view引擎
    app.engine('.' + (template.ext || 'tpl'), swig.init({www: www, layout: template.layout || 'layout'}, app));

    //静态目录
    app.use(express.static(path.join(www, template.client)));

    return app;

}

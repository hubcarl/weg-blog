var Pager = require("client/public/component/pager.js");
var XHR = require('client/public/component/xhr.js');
console.log(Pager, XHR);

var pager = new Pager({pageIndex: 2, defaultBottomHeight: 60});
pager.init(function (successCallback) {
    //XHR.get('/news/' + pager.pageIndex + '/' + pager.pageSize, {}, function (responseText) {
    //    var articleList = document.getElementById('articleList');
    //    articleList.innerHTML += responseText;
    //    successCallback(responseText == '');
    //});

    BigPipe.load({
        url:'/news/' + pager.pageIndex + '/' + pager.pageSize,
        pagelets: ['quickling'],
        param: 'key=quickling',
        container: 'articleList',
        cb: function () {
            console.log('pipe load done');
        }
    });
});

BigPipe.load({
    url:'/news/' + pager.pageIndex + '/' + pager.pageSize,
    pagelets: ['quickling'],
    param: 'key=quickling',
    container: 'articleList',
    cb: function () {
        console.log('pipe load done');
    }
});
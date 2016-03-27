var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

    // pagelet Id
    res.bigpipe.bind('heding1', function(setter) {

        // simulate an async progress
        setTimeout(function() {

            // now set data to the pagelet
            setter(null, {
               title:'0000001',
               content:'0000002'
            });
        }, 2000);
    });

    res.render('page/test/index.tpl', {});
});



router.get('/widget', function (req, res) {

    //you can assign async data like this  the async content will be rendered in chunk mode
    res.bigpipe.bind('async', function(setter) {

        // simulate an async progress
        setTimeout(function() {

            // now set data to the pagelet
            setter(null, {
                title:'bigpipe async test',
                content:'async 此类 widget 在输出时，也只会输出个壳子，但是内容在 body 输出完后，chunk 输出 js 自动填充。widget 将忽略顺序，谁先准备好，谁先输出。'
            });
        }, 2000);
    });

    res.render('page/test/widget/widget.tpl', {});
});

module.exports = router;

var express = require('express');
var Article = require('../../model/article');
var router = express.Router();

/* GET home page. */
router.get('/', function* (req, res, next) {
  if (req.session.visitCount) {
    req.session.visitCount++;
  } else {
    req.session.visitCount = 1;
  }
  var result = yield Article.query(1, 20);

  res.render('page/news/index/index.tpl', {list: result});
});


router.get('/:pageIndex/:pageSize', function* (req, res, next) {

  var pageIndex = req.params.pageIndex;
  var pageSize = req.params.pageSize;

  console.log('--------pageIndex:' + pageIndex + ' pageSize:' + pageSize);

  var result  = yield Article.query(pageIndex, pageSize)

  res.render('page/news/index.tpl', {list: result});

});

module.exports = router;
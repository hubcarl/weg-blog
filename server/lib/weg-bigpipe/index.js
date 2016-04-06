var BigPipe = require('./lib/bigpipe.js');

module.exports = function( options ) {

    return function(req, res, next) {
        console.log(' url:' + req.url);
        var bigpipe = res.bigpipe = new BigPipe(options);
        //var pagelet = req.param('pagelet');
        var pagelets = req.param('pagelets');
        if(pagelets){
            console.log(' pagelets:' + pagelets);
            var destroy = function() {
                res.removeListener('finish', destroy);
                //res.removeListener('close', destroy);

                bigpipe.destroy();
                bigpipe = res.bigpipe = null;
            };

            if (!Array.isArray(pagelets)) {
                pagelets = pagelets ? [ pagelets ] : [];
            }

            //pagelet && pagelets.push(pagelet);
            bigpipe.addQuicklingPagelets(pagelets);

            // res.locals 肯定是一个对象，不信可以去查看 express/middleware/init
            res.locals.isQuickingMode = bigpipe.isQuickingMode();

            res.on('finish', destroy);
            //res.on('close', destroy);
        }

        next();
    }
}
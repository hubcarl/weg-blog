var logger = require('log4js').getLogger('access');
module.exports = function(req,res,next){
    next();
};
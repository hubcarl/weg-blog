//fis.set('project.ignore', ['output/**', 'node_modules/**', '.git/**', '.svn/**']);
//
//fis.hook('commonjs');
//
//fis.match('/{index,server,app}.js',{
//    useMap:false,
//    useHash: false,
//    useCompile: false
//});
//
//fis.match('/server/**.**',{
//    useMap:false,
//    useHash: false,
//    useCompile: false
//});
//
//
//fis.match('/client/views/(**).{png,js,css}', {
//    release: '/client/public/$1'
//});
//
//fis.match('/client/**.{js,css,png,jpg}', {
//    useHash: true
//});
//
//// 公共静态资源
//fis.match('/{client/public, client/views}/**.js', {
//    isMod: true,
//    // fis-optimizer-uglify-js 插件进行压缩，已内置
//    optimizer: fis.plugin('uglify-js')
//});
//
//fis.match('/client/public/static/js/mod.js', {
//    isMod: false,
//    wrap: false
//});
//
//
//fis.match('/{client/public, client/views}/**.css', {
//    // fis-optimizer-clean-css 插件进行压缩，已内置
//    optimizer: fis.plugin('clean-css')
//});
//
//fis.match('/{client/public, client/views}/**.{png,jpg}', {
//    // fis-optimizer-png-compressor 插件进行压缩，已内置
//    optimizer: fis.plugin('png-compressor')
//});
//
//
//
//
//// 对 CSS 进行图片合并
//fis.match('*.css', {
//    // 给匹配到的文件分配属性 `useSprite`
//    useSprite: true
//});
//
//// 启用 fis-spriter-csssprites 插件
//fis.match('::package', {
//    spriter: fis.plugin('csssprites')
//})
//
//fis.match('::package', {
//    postpackager: fis.plugin('loader')
//});
//
////fis.match('*', {
////    deploy: fis.plugin('local-deliver', {
////        to: '/Users/caoli/dev/study/fis/fis3-express-swig/dist'
////    })
////})
//
////上传测试服务器
//fis.media('upload').match('*', {
//    deploy: fis.plugin('http-push', {
//        receiver: 'http://cq.01.p.p.baidu.com:8888/receiver.php',
//        to: '/home/work/htdocs' // 注意这个是指的是测试机器的路径，而非本地机器
//    })
//});
//
//
//fis.media('debug').match('*.{js,css,png}', {
//    useHash: false,
//    useSprite: false,
//    optimizer: null
//})

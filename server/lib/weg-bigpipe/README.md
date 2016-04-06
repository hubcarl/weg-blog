weg-bigpipe 
===========

- sync 默认就是此模式，直接输出。
- quicking 此类 widget 在输出时，只会输出个壳子，内容由用户自行决定通过 js，另起请求完成填充，包括静态资源加载。
- async 此类 widget 在输出时，也只会输出个壳子，但是内容在 body 输出完后，chunk 输出 js 自动填充。widget 将忽略顺序，谁先准备好，谁先输出。
- pipeline 与 async 基本相同，只是它会严格按顺序输出。

## BigPipe.js

对外暴露以下几个方法。

### BigPipe.onPageletArrive

此方法不需要主动去调用，当 pagelet 输出的时候会自动调用这个方法。不管是 `chunk` 输出的 `pagelet`, 还是靠第二次请求 `quickling` 类型的 `pagelet` 都是靠此方法渲染。

示例：

```javascript
BigPipe.onPageletArrive({"container":"pages-container","id":"spage","html":"contact us","js":[],"css":[],"styles":[],"scripts":[]});
```

格式说明 

* `container` 容器
* `id` pagelet id
* `html` 内容
* `js` 外联 js 集合
* `css` 外联 css 集合
* `styles` 内联 css 集合
* `scripts` 内联 js 集合

### BigPipe.load

默认 `quickling` 性质的 `pagelet` 不会主动加载，需要用户主动调用此方法，才会开始加载。

调用方式：

```javascript  
BigPipe.load('pageletId');

BigPipe.load('pageletId1 pageletId2 pagelet Id3');

BigPipe.load({
    pagelets: ['pageletId1', 'pageletId2']
    url: '/other page url',
    cacheID: 'pageletId1&pageletId2', // 设置后不会重复请求Pagelet
    param: 'key1=val1&key2=val2',
    container: dom /* or id or {pageletId1: dom1, pageletId2: dom2}*/,
    cb: function() {
        // excuted when all done.
    }
});
```

参数说明

* `pagelets` pagelets 的 id 列表，可以是单个 pagelet， 也可以是多个用空格隔开，或者直接就是一个数组，里面由 pagelet id 组成。
* `url` 页面地址，默认是从当前页面去加载 pagelet，有时你可能需要加载其他页面的 pagelet。
* `param` 附带参数内容。
* `cacheID` pagelet 请求的缓存ID，不设置则请求不会被缓存。
* `container` 指定 pagelet 渲染时的容器。
* `cb` 回调，完成后触发。

### BigPipe 事件

* `pageletarrive` 当 pagelet 即将渲染前触发。
* `pageletinsert` pagelet 开始渲染，并已经插入了 css 和 dom 了，还没开始执行脚本时触发。
* `pageletdone` 当 pagelet 全部渲染完成触发。

事件 API

* on(type, callback)
* off(type?, callback?)
* once(type, callback)
* trigger(type, args...?)
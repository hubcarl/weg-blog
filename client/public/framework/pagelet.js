(function() {
    var Util = (function() {
        var d = document;
        var head = d.getElementsByTagName('head')[0];

        var browser = (function() {
            var ua = navigator.userAgent.toLowerCase();
            var match = /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
                /(msie) ([\w.]+)/.exec(ua) || !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) ||
                [];
            return match[1];
        })();

        var loadJs = function(url, cb) {
            var script = d.createElement('script');
            var loaded = false;
            var wrap = function() {
                if (loaded) {
                    return;
                }

                loaded = true;
                cb && cb();
            };

            script.setAttribute('src', url);
            script.setAttribute('type', 'text/javascript');
            script.onload = wrap;
            script.onreadystatechange = wrap;
            head.appendChild(script);
        };

        var loadCss = function(url, cb) {
            var link = d.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = url;

            if (browser === 'msie') {
                link.onreadystatechange = function() {
                    /loaded|complete/.test(link.readyState) && cb();
                }
            } else if (browser == 'opera') {
                link.onload = cb;
            } else {
                //FF, Safari, Chrome
                (function() {
                    try {
                        link.sheet.cssRule;
                    } catch (e) {
                        setTimeout(arguments.callee, 20);
                        return;
                    };
                    cb();
                })();
            }

            head.appendChild(link);
        };

        var appendStyle = function(code) {
            var dom = document.createElement('style');
            dom.innerHTML = code;
            head.appendChild(dom);
        };

        var globalEval = function(code) {
            var script;

            code = code.replace(/^\s+/, '').replace(/\s+$/, '');

            if (code) {
                if (code.indexOf('use strict') === 1) {
                    script = document.createElement('script');
                    script.text = code;
                    head.appendChild(script).parentNode.removeChild(script);
                } else {
                    eval(code);
                }
            }
        };

        var ajax = function(url, cb, data) {
            var xhr = new (window.XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');

            xhr.onreadystatechange = function() {
                if (this.readyState == 4) {
                    cb(this.responseText);
                }
            };
            xhr.open(data?'POST':'GET', url + '&t=' + ~~(Math.random() * 1e6), true);

            if (data) {
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(data);
        };

        var mixin = function(a, b) {
            if (a && b) {
                for (var k in b) {
                    if (b.hasOwnProperty(k)) {
                        a[k] = b[k];
                    }
                }
            }
            return a;
        };

        return {
            loadCss: loadCss,
            loadJs: loadJs,
            appendStyle: appendStyle,
            globalEval: globalEval,
            ajax: ajax,
            mixin: mixin
        };
    })();


    var Pagelet = function() {

        // The order of render pagelet.
        // - load css
        // - append style
        // - insert html
        // - load js.
        // - exec scripts.
        //
        // data
        //  - container       optional
        //  - id              pagelet Id
        //  - html            pagelet content
        //  - js              []
        //  - css             []
        //  - styles          []
        //  - scripts         []
        //  - callback            function
        // onDomInserted called when dom inserted.
        function PageLet(data, onDomInserted) {
            var remaining = 0;

            var loadCss = function() {
                // load css
                if (data.css && data.css.length) {
                    remaining = data.css.length;
                    for (var i = 0, len = remaining; i < len; i++) {
                        Util.loadCss(data.css[i], function() {
                            --remaining || insertDom();
                        });
                    }
                } else {
                    insertDom();
                }
            }

            var insertDom = function() {
                var i, len, dom, node, text, scriptText;

                // insert style code
                if(data.styles && data.styles.length) {
                    for(i = 0, len = data.styles.length; i < len; i++) {
                        Util.appendStyle(data.styles[i]);
                    }
                }

                dom = data.container && typeof data.container === 'string' ?
                        document.getElementById(data.container) :
                        (data.container || document.getElementById(data.id));
                if(data.append){
                    dom.innerHTML += data.html;
                }else{
                    dom.innerHTML = data.html;
                }

                onDomInserted();
            }

            var loadJs = function() {
                var len = data.js && data.js.length;
                var remaining = len, i;

                // exec data.scripts
                var next = function() {
                    var i, len;

                    // eval scripts.
                    if(data.scripts && data.scripts.length) {
                        for(i = 0, len = data.scripts.length; i < len; i++) {
                            Util.globalEval(data.scripts[i]);
                        }
                    }
                    data.empty = !(data.html && data.html.replace(/\r|\n|(^\s*)|(\s*$)/gm,"").length);
                    data.callback && data.callback(data);
                };


                if (!len) {
                    next && next();
                    return;
                }

                for (i = 0; i < len; i++) {
                    Util.loadJs(data.js[i], next && function() {
                        --remaining || next();
                    });
                }
            }

            return {
                loadCss: loadCss,
                loadJs: loadJs
            };
        }

        var d = document,
            config = {},
            count = 0,
            pagelets = [];

        return {

            onPageletArrive: function(obj) {
                config[obj.id] && (obj = Util.mixin(obj, config[obj.id]));

                //console.log('onPageletArrive',obj);
                var pagelet = PageLet(obj, function() {
                    var item;

                    // enforce js executed after dom inserted.
                    if (!--count) {
                        while ((item = pagelets.shift())) {
                            item.loadJs();
                        }
                    }
                });
                pagelets.push(pagelet);
                count++;
                pagelet.loadCss();
            },


            load: function(pagelets) {
                console.log('pagelets', pagelets);
                var args = [];
                var currentPageUrl = location.href;
                var obj, i, id, callback, remaining, search, param;
                var url = pagelets.url;
                // convert arguments.
                // so we can accept
                //
                // - string with pagelet ID
                // - string with pagelet IDs split by `,`.
                // - array of string with pagelet ID
                // - object with pagelets key.
                if (pagelets instanceof Array) {
                    obj = {
                        pagelets: pagelets
                    }
                } else {
                    obj = typeof pagelets === 'string' ? {
                        pagelets: pagelets
                    }: pagelets;
                    pagelets = obj.pagelets;
                    typeof pagelets === 'string' &&
                        (pagelets = pagelets.split(/\s*,\s*/));
                }

                remaining = pagelets.length;
                callback = obj.callback && function(data) {
                    delete config[data.id];
                    --remaining || obj.callback(data);
                };

                for(i = remaining - 1; i >= 0; i--) {
                    id = pagelets[i];
                    args.push('pagelets=' + id);
                    config[id] = {
                        container: obj.container && obj.container[id] || obj.container,
                        callback: callback
                    }
                }

                param = obj.param ? '&' + obj.param : '';
                search = location.search;
                search = search ? (search + '&') : '?';
                if(url){
                    url += (url.indexOf('?')==-1 ? '?' : '&') + args.join('&') + param;
                }else{
                    url = search + args.join('&') + param;
                }
                console.log('url:'+url);
                Util.ajax(url, function(res) {

                    // if the page url has been moved.
                    if(currentPageUrl !== location.href) {
                        return;
                    }

                    Util.globalEval(res);
                });
            }
        };
    }();

    window.Pagelet = Pagelet;
})();
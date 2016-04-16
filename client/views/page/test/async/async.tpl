<pre>
        采用 bigpipe 方案，允许你在渲染页面的时候，提前将框架输出，后续再把耗时的 pagelet 通过 chunk 方式输出到页面，以加速网页渲染。

        目前此机制已集成在 yogurt 中，通过给 widget 设置不同的模式便能自动启动。

        1.sync 默认就是此模式，直接输出。
        2.quicking 此类 widget 在输出时，只会输出个壳子，内容由用户自行决定通过 js，另起请求完成填充，包括静态资源加载。
        3.async 此类 widget 在输出时，也只会输出个壳子，但是内容在 body 输出完后，chunk 输出 js 自动填充。widget 将忽略顺序，谁先准备好，谁先输出。
        4.pipeline 与 async 基本相同，只是它会严格按顺序输出。
</pre>

{% widget "widget/pagelets/async/async.tpl" mode="async" id="async"  %}

<div id="container_quickling">
    {% widget "widget/pagelets/quickling/quickling.tpl" mode="quickling" id="quickling" %}
</div>


{% script %}

require('./async.js');

BigPipe.load('quickling');

{% endscript %}
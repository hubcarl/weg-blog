
<div class="container smart-container">
    <div class="row row-offcanvas row-offcanvas-right">
        <div class="col-xs-12 col-sm-9">
            <ul class="smart-artiles" id="articleList">
                {% pagelet id="list" tag="none" append="true" %}
                    {% widget "widget/news/index/index.tpl" %}
                {% endpagelet %}
            </ul>
            <div id="pagerBottom" class="smart-pager"></div>
        </div>
    </div>
</div>

{% style %}
    @import url(../style/news.css?__inline);
{% endstyle %}


{% script %}
    require('./index.js');
{% endscript %}


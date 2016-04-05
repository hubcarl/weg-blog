{% extends 'page/layout.tpl' %}

{% block content %}
<div class="container smart-container">
    <div class="row row-offcanvas row-offcanvas-right">
        <div class="col-xs-12 col-sm-9">
            <ul class="smart-artiles" id="articleList">
                {% pagelet "widget/news/index/index.tpl" mode="quickling" id="quickling" tag="none" %}
                     <h2>test</h2>
                    {% widget "widget/news/index/index.tpl" mode="quickling" id="quickling" %}
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
    console.log('>>>>test>>>>>');
    require('./index.js');
{% endscript %}


{% endblock %}

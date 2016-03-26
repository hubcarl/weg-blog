{% extends 'page/layout.tpl' %}

{% block content %}
    {% widget "widget/pagelets/async/async.tpl"  %}

    {% script %}
        require('./widget.js');
    {% endscript %}

{% endblock %}

{% for item in list %}
<li>
    <div class="point">+{{item.hits}}</div>
    <div class="card">
        <h2><a href="/detail/{{item.id}}" target="_blank">{{item.title}}</a></h2>
        <div>
            <ul class="actions">
                <li>
                    <time class="timeago">{{item.moduleName}}</time>
                </li>
                <li class="tauthor">
                    <a href="#" target="_blank" class="get">Sky</a>
                </li>
                <li><a href="#" class="kblink-8007">+收藏</a></li>
                <li>
                    <span class="timeago">widget datasource: total:{{total}}  visitCount:{{visitCount}}</span>
                </li>
                <li>
                    <span class="timeago">widget attr:{{p1}}_{{p2}}_{{p3}}</span>
                </li>
            </ul>
        </div>
    </div>
</li>
{% endfor %}

{% script %}
    require('./index.js');
{% endscript %}

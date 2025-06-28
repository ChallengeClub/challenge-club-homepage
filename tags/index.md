---
title: タグ一覧
layout: base.njk
permalink: /tags/
---

{% set tagSlugs = tagNames %}
<h1>タグ一覧</h1>
<ul>
{% for tag, slug in tagNames %}
  <li><a href="/tags/{{ slug }}/">{{ tag }}</a></li>
{% endfor %}
</ul>

---
title: タグ一覧
layout: base.njk
permalink: /tags/
---

{% set tagSlugs = tagNames %}
<h1>タグ一覧</h1>
<ul>
{% set tagSlugs = tagNames %}
{% for tag in collections.tagList %}
  {% set slug = tagSlugs[tag] or (tag | safeSlug) %}
  <li><a href="/tags/{{ slug }}/">{{ tag }}</a></li>
{% endfor %}
</ul>

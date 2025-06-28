---
title: タグ一覧
layout: base.njk
permalink: "tags/"
---

{% set tagSlugs = tagNames %}
<h1>タグ一覧</h1>
<ul>
{% for tag in collections.tagList %}
  {% set slug = tagNames[tag] or (tag | safeSlug) %}
  <li><a href="{{ ('/tags/' ~ slug ~ '/') | url }}">{{ tag }}</a></li>
{% endfor %}
</ul>

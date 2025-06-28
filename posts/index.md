---
title: 投稿一覧
layout: base.njk
permalink: /posts/
eleventyExcludeFromCollections: true
---

<h1>投稿一覧</h1>
<ul>
{% for post in collections.posts %}
  <li><time>{{ post.date | date("yyyy-MM-dd") }}</time>
  - <a href="{{ post.url | url }}">{{ post.data.title }}</a>
  </li>
{% endfor %}
</ul>
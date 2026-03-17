---
title: "Blog posts"
permalink: /blog/
author_profile: true
redirect_from:
  - /wordpress/blog-posts/
  - /year-archive/
---

{% for post in site.posts %}
  <article style="margin-bottom: 20px;">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p style="font-size: 0.9em; color: #666;">
      {{ post.date | date: "%B %d, %Y" }}
    </p>
    <!-- {{ post.excerpt }} -->
  </article>
  <!-- <hr> -->
{% endfor %}
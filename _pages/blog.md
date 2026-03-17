---
title: "Blog posts"
permalink: /blog/
author_profile: true
redirect_from:
  - /wordpress/blog-posts/
  - /year-archive/
---

{% include base_path %}

{% for post in site.posts %}
  {% include archive-single-no-excerpt.html %}
{% endfor %}

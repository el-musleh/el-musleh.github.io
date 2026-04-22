---
title: "Blog Posts"
permalink: /blog/
author_profile: true
description: "Articles, opinions, and technical write-ups by Mohammad El-Musleh on software engineering, Linux, AI, and technology."
redirect_from:
  - /wordpress/blog-posts/
  - /year-archive/
---

{% include base_path %}

{% assign sorted_posts = site.posts | sort: "date" | reverse %}
{% for post in sorted_posts %}
  {% include archive-single-no-excerpt.html %}
{% endfor %}

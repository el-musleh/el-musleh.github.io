---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

This sitemap provides a comprehensive overview of all content available on this website. It includes main pages, blog posts, projects, publications, and other resources. For search engines and automated tools, there is also an [XML version]({{ base_path }}/sitemap.xml) available.

## Main Pages

These are the primary sections of the website:

| Page | Description |
| --- | --- |
| [About](/) | Home page with bio, skills, experience, education, and more |
| [Blog Posts](/blog/) | Technical blog and articles |
| [CV](/cv/) | Professional resume and work history |
| [Certifications](/certifications/) | Certifications, workshops, and awards |
| [Skills Matrix](/skills/) | Technical skills organized by category |
| [Projects](/projects/) | Technical projects and portfolio work |
| [Publications](/publications/) | Academic and technical publications |
| [Services](/services/) | Freelance and consulting services |
| [Terms & Privacy](/terms/) | Privacy policy and terms |

## Blog Posts

{% for post in site.posts %}
  - [{{ post.title }}]({{ post.url }})
{% endfor %}

## Projects

{% for post in site.projects %}
  - [{{ post.title }}]({{ post.url }})
{% endfor %}

## Publications

{% for post in site.publications %}
  - [{{ post.title }}]({{ post.url }})
{% endfor %}

## Experience

{% for post in site.experience %}
  - [{{ post.title }}]({{ post.url }})
{% endfor %}

## Education

{% for post in site.education %}
  - [{{ post.title }}]({{ post.url }})
{% endfor %}

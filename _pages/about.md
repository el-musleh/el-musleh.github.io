---
permalink: /
title: "About me"
author_profile: true
description: "C#/C++ (Embedded) Software Engineer | Leveraging \"Vibe Coding\" to build scalable industrial solutions."
redirect_from: 
  - /about/
  - /about.html
  - /resume
  - /cv
---

{% include base_path %}

<div class="cv-download-links">
  <a href="{{ base_path }}/files/misc/Mohammad_El_Musleh_enCV.pdf" class="btn btn--info">🔽 Download CV as PDF</a>
  <a href="{{ base_path }}/files/misc/el-musleh_contacts.vcf" class="btn btn--info">🔽 Download my contact information (vcf)</a>
  <a href="https://calendly.com/mohammadmusleh3/30min" class="btn btn--info">🗓️ Schedule a 30-minute meeting</a>
</div>
<br>
Hi 👋, I’m Mohammad. I build software that bridges the gap between hardware and intelligent automation, bringing 4+ years of experience in developing and optimizing solutions across industrial automation and service tools. Skilled in C#, C++, and C, I focus on building scalable applications using clean architecture, robust testing, and clean code practices.

I’m a firm believer in "Vibe Coding" and AI-assisted development to boost productivity and gain rapid access to knowledge. By moving beyond the traditional “Google everything” mindset, I can prioritize architectural integrity and high-level problem solving. For this reason, I practice with AI to articulate requirements clearly enough to minimize the need for follow-up prompts.

I’m always happy to connect, exchange experiences, or just have a friendly chat about tech, work, or the future of engineering.

**N.B.** Share this GitHub repo or the URL with your favorite LLM and ask it whatever you’d like about my work.

## Technical Skills
<div id="cv-skills-cloud" class="skills-container" style="visibility: hidden"
     data-feed-url='{{ "/assets/skills-feed.json" | relative_url }}'
     data-skills-url='{{ "/skills/" | relative_url }}'>
  <!-- Static Fallback (For SEO and fast loading of YAML tags) -->
  {% assign all_docs = site.education | concat: site.experience | concat: site.projects | concat: site.publications | concat: site.certifications %}
  {% assign raw_tags = "" | split: "" %}
  {% for doc in all_docs %}
    {% if doc.tags %}
      {% assign raw_tags = raw_tags | concat: doc.tags %}
    {% endif %}
  {% endfor %}
  {% assign unique_tags = raw_tags | uniq | sort %}
  
  {% for tag in unique_tags %}
    <a href="{{ '/skills/' | relative_url }}?tag={{ tag | cgi_escape }}" class="cv-skill-badge">
      {{ tag }}
    </a>
  {% endfor %}
</div>

<noscript><style>#cv-skills-cloud{visibility:visible!important}</style></noscript>
<script src="{{ '/assets/js/skills-cloud.js' | relative_url }}"></script>

## Work Experience
{% for post in site.experience reversed %}
### [{{ post.title }}]({{ post.url }})
<em>{{ post.venue }} | {% include duration-calculator.html start_date=post.date end_date=post.end_date %}</em>
  {% if post.bullets %}
  <ul>
    {% for bullet in post.bullets %}
      <li>{{ bullet }}</li>
    {% endfor %}
  </ul>
  {% endif %}
{% endfor %}

## Education
{% for post in site.education reversed %}
### [{{ post.title }}]({{ post.url }})
*{{ post.venue }} | {{ post.excerpt }}*
{% endfor %}

## Language Skills
{% assign ranked_languages = site.languages | sort: "title" | sort: "level_order" | reverse | slice: 0, 3 %}
{% if ranked_languages.size > 0 %}
<ul>
{% for post in ranked_languages %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> — <em>{{ post.proficiency }}</em></li>
{% endfor %}
</ul>
{% else %}
No language entries available yet.
{% endif %}

<!-- <div class="cv-download-links">
<a href="{{ '/languages/' | relative_url }}" class="btn btn--info">🌐 View all languages.</a>
</div> -->

## Certifications, Workshops, and Awards
- **Won the Carlsberg Hackathon 2020** - Carlsberg Group (*Nov 2020*)
- Received **four certificates of honor** during bachelor's studies for maintaining a high GPA - Near East University (*Jun 2018*)
    - *High Honour (GPA 3.64/4, 3.52/4)*
    - *Honour (GPA 3.30/4, 3.22/4)*
{% assign latest_certifications = site.certifications | sort: "date" | reverse | slice: 0, 3 %}
{% if latest_certifications.size > 0 %}
<ul>
{% for post in latest_certifications %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> — <em>{{ post.issued_by | default: post.platform }} | {{ post.date | date: "%B %Y" }}</em></li>
{% endfor %}
</ul>
{% else %}
No certifications entries available yet.
{% endif %}

<div class="cv-download-links">
<a href="{{ '/certifications/' | relative_url }}" class="btn btn--info">🎓️ View my completed certifications.</a>
</div>

## Publications
{% assign latest_publications = site.publications | sort: "date" | reverse | slice: 0, 3 %}
{% for post in latest_publications %}
### [{{ post.title }}]({{ post.url }})
*{{ post.citation | default: post.excerpt | strip_newlines | truncatewords: 50 }}*
{% endfor %}

<div class="cv-download-links">
<a href="{{ '/publications/' | relative_url }}" class="btn btn--info">🛠️ View all publications.</a>
</div>

## Projects
{% assign latest_projects = site.projects | sort: "date" | reverse | slice: 0, 3 %}
{% for post in latest_projects %}
### [{{ post.title }}]({{ post.url }})
*{{ post.excerpt | markdownify | strip_html | strip_newlines | truncatewords: 50 }}*
{% endfor %}

<div class="cv-download-links">
<a href="{{ '/projects/' | relative_url }}" class="btn btn--info">🛠️ View all projects.</a>
</div>

<!--## Talks
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul> -->
  
<!--## Teaching
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul> -->
  
<!--## Service and leadership
- Currently signed in to 43 different slack teams -->

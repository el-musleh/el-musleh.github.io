---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
description: "Professional C#/.NET Software Developer with expertise in clean code, testing, and agile methods."
redirect_from:
  - /resume
---

{% include base_path %}
<!--{% include toc %}-->

Connect with me and see my recent updates and posts on [my LinkedIn profile](https://www.linkedin.com/in/el-musleh/).

<div class="cv-download-links">
  <a href="{{ base_path }}/files/misc/enCV_Mohammad_El-Musleh.pdf" class="btn btn--info">Download CV as PDF</a>
  <br>
  <a href="{{ base_path }}/files/misc/el-musleh_contacts.vcf" class="btn btn--info">🪪 Download my contact information (vcf)</a>
</div>

## Education
------------
{% for post in site.education reversed %}
### [{{ post.title }}]({{ post.url }})
*{{ post.venue }} | {{ post.excerpt }}*
{% endfor %}

## Work Experience
------------------
{% for post in site.experience reversed %}
### [{{ post.title }}]({{ post.url }})
*{{ post.venue }} | {{ post.excerpt }}*
  {% if post.bullets %}
  <ul>
    {% for bullet in post.bullets %}
      <li>{{ bullet }}</li>
    {% endfor %}
  </ul>
  {% endif %}
{% endfor %}

## Technical Skills
-------------------
<div id="cv-skills-cloud" class="skills-container">
  <!-- 1. Static Fallback (For SEO and fast loading of YAML tags) -->
  {% assign all_docs = site.education | concat: site.experience | concat: site.portfolio | concat: site.publications %}
  {% assign raw_tags = "" | split: "" %}
  {% for doc in all_docs %}
    {% if doc.tags %}
      {% assign raw_tags = raw_tags | concat: doc.tags %}
    {% endif %}
  {% endfor %}
  {% assign unique_tags = raw_tags | uniq | sort %}
  
  {% for tag in unique_tags %}
    <a href="{{ '/skills/' | relative_url }}?tag={{ tag | url_encode }}" class="cv-skill-badge">
      {{ tag }}
    </a>
  {% endfor %}
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById('cv-skills-cloud');
  
  // Fetch the same feed used by the Skills Matrix
  const feedUrl = '{{ "/assets/skills-feed.json" | relative_url }}';
  console.debug('Fetching skills feed from', feedUrl);

  fetch(feedUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch skills feed: ' + response.status + ' ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data)) throw new Error('Skills feed JSON is not an array');

      const allSkills = new Set();

      data.forEach(doc => {
        // A. Add Front Matter Tags
        if (doc.tags && Array.isArray(doc.tags)) {
          doc.tags.forEach(t => allSkills.add(t));
        }
        
        // B. Add Inline Tags (Parse the HTML content)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = doc.content;
        const inlineTags = tempDiv.querySelectorAll('.cv-skill-tag');
        
        inlineTags.forEach(tagElem => {
          const name = tagElem.getAttribute('data-skill');
          if (name) allSkills.add(name);
        });
      });

      // C. Re-render the container with the complete, sorted list
      if (allSkills.size > 0) {
        container.innerHTML = ''; // Clear static fallback
        
        const sortedSkills = Array.from(allSkills).sort((a, b) => a.localeCompare(b));

        sortedSkills.forEach(skill => {
          const a = document.createElement('a');
          // encodeURIComponent handles C# -> C%23 and C++ -> C%2B%2B correctly
          a.href = `{{ '/skills/' | relative_url }}?tag=${encodeURIComponent(skill)}`;
          a.className = 'cv-skill-badge';
          a.textContent = skill;
          a.title = `View projects using ${skill}`;
          container.appendChild(a);
        });
      }
    })
    .catch(err => {
      console.error('Failed to load unified skills cloud:', err);
      if (container) {
        const note = document.createElement('div');
        note.style.fontSize = '0.9em';
        note.style.color = '#666';
        note.style.marginTop = '8px';
        note.textContent = 'Live skills cloud unavailable; showing static skill list.';
        container.appendChild(note);
      }
    });
});
</script>

## Language Skills
------------------
- **Arabic:** Mother Tongue
- **English:** Proficient
- **German:** Intermediate

## Honours and Awards
---------------------
- **Won the Carlsberg Hackathon 2020** - Carlsberg Group (*Nov 2020*)
- Received **four certificates of honor** during bachelor's studies for maintaining a high GPA - Near East University (*Jun 2018*)
    - *High Honour (GPA 3.64/4, 3.52/4)*
    - *Honour (GPA 3.30/4, 3.22/4)*
- Granted a half-tuition scholarship to study bachelor's at NEU (*Sep 2014*)

<div class="cv-download-links">
<a href="{{ base_path }}/certifications/" class="btn btn--info">View my completed certifications.</a>
</div>

## Publications
------------
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

<!--## Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul> -->
  
<!--## Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul> -->
  
<!--## Service and leadership
======
- Currently signed in to 43 different slack teams -->

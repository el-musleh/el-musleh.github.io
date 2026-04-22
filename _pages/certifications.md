---
title: "Certifications, Workshops, and Awards"
permalink: /certifications/
description: "Professional C#/.NET Software Developer with expertise in clean code, testing, and agile methods."
author_profile: true
redirect_from: 
  - /certificate
  - /awards
  - /courses
  - /accomplishments
  - /workshops
layout: archive
---

{% include base_path %}

This page showcases my commitment to continuous learning and professional development, highlighting notable awards, specialized workshops, and key certifications.

# Awards
---
{% assign awards = site.certifications | where: "type", "award" | sort: "date" | reverse %}
{% if awards.size > 0 %}
  {% for post in awards %}
    {% include certification-compact.html %}
  {% endfor %}
{% endif %}

<br>

# Workshops
---
{% assign workshops = site.certifications | where: "type", "workshop" | sort: "date" | reverse %}
{% if workshops.size > 0 %}
  {% for post in workshops %}
    {% include certification-compact.html %}
  {% endfor %}
{% endif %}

<br>

# Certifications
---
Certifications are organized by topic to provide a clear overview of my expertise. Within each topic, entries are sorted by date, with the most recent first.

## Generative AI & Machine Learning
{% assign ai_certifications = site.certifications | where: "category", "AI/ML" | sort: "date" | reverse %}
{% if ai_certifications.size > 0 %}
  {% for post in ai_certifications %}
    {% include certification-compact.html %}
  {% endfor %}
{% endif %}

## Programming Languages
{% assign programming_certifications = site.certifications | where: "category", "Programming Languages" | sort: "date" | reverse %}
{% if programming_certifications.size > 0 %}
  {% for post in programming_certifications %}
    {% include certification-compact.html %}
  {% endfor %}
{% endif %}

## Cybersecurity & Ethical Hacking
{% assign cybersecurity_certifications = site.certifications | where: "category", "Cybersecurity" | sort: "date" | reverse %}
{% if cybersecurity_certifications.size > 0 %}
  {% for post in cybersecurity_certifications %}
    {% include certification-compact.html %}
  {% endfor %}
{% endif %}


## DevOps
{% assign devops_certifications = site.certifications | where: "category", "DevOps" | sort: "date" | reverse %}
{% if devops_certifications.size > 0 %}
  {% for post in devops_certifications %}
    {% include certification-compact.html %}
  {% endfor %}
{% endif %}


## Quantum Computing
{% assign quantum_certifications = site.certifications | where: "category", "Quantum Computing" | sort: "date" | reverse %}
{% if quantum_certifications.size > 0 %}
  {% for post in quantum_certifications %}
    {% include certification-compact.html %}
  {% endfor %}
{% endif %}


## Professional & Other Skills
{% assign professional_certifications = site.certifications | where: "category", "Professional & Other Skills" | sort: "date" | reverse %}
{% if professional_certifications.size > 0 %}
  {% for post in professional_certifications %}
    {% include certification-compact.html %}
  {% endfor %}
{% endif %}


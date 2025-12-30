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
### Languages
C, C++, C#, Python, VHDL/Verilog, GraphQL, HTML, CSS, JavaScript, JSON, XML, MATLAB & Simulink
### System Architecture & Methodologies
SOLID principles, Scalable software design, Clean Code practices, Agile (Scrum/KanBan), V-MODEL, UML, CI/CD Pipelines
### Tools & Platforms
Visual Studio, Git, GitHub, FreeRTOS, MATLAB, Atlassian (Bitbucket, Confluence, Jira), Microsoft Azure (storage account), Docker, MySQL, Neo4j graph, FPGA (VHDL - Xilinx Vivado)
### Testing & Debugging
CANalyzer, ECU-Test, HiL Testing, Debugging, Unit Testing Test Planning, Peer Reviews
### Protocols & Standards
UART, UDS, CAN, I2C, SPI, TCP/IP, Bluetooth

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



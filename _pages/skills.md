---
title: Skills Matrix
author_profile: true
description: "List of skills"
permalink: /skills/
---

<div id="skills-container">
  <p>Loading skills...</p>
</div>

<script>
(function() {
  // Prevent multiple executions
  if (window.skillsPageInitialized) return;
  window.skillsPageInitialized = true;

  document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('skills-container');
    const feedUrl = '{{ "/assets/skills-feed.json" | relative_url }}';

  fetch(feedUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch skills feed: ' + response.status + ' ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data)) throw new Error('Skills feed JSON is not an array');

      const skillsMap = {};

      data.forEach(doc => {
        // Add Front Matter Tags (YAML)
        if (doc.tags && Array.isArray(doc.tags)) {
          doc.tags.forEach(tag => addSkillToMap(skillsMap, tag, doc));
        }

        // Add Inline Tags (HTML Content)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = doc.content;
        tempDiv.querySelectorAll('.cv-skill-tag').forEach(tagElem => {
          const skillName = tagElem.getAttribute('data-skill');
          if (skillName) addSkillToMap(skillsMap, skillName, doc);
        });
      });

      renderSkills(skillsMap);
    })
    .catch(err => {
      console.error('Error loading skills:', err);
      container.innerHTML = `<p>Error loading skills data. <a href="${feedUrl}" target="_blank" rel="noopener">Open feed</a> (check console for details)</p>`;
    });

  function addSkillToMap(map, skillName, doc) {
    const cleanName = skillName.trim();
    if (!map[cleanName]) map[cleanName] = [];
    
    // Avoid duplicates
    if (!map[cleanName].some(item => item.url === doc.url)) {
      map[cleanName].push({
        title: doc.title,
        venue: doc.venue,
        url: doc.url
      });
    }
  }

  function renderSkills(map) {
    // Prevent re-rendering if content already exists
    if (container.children.length > 0 && container.querySelector('.skill-section')) {
      return;
    }
    
    container.innerHTML = '';
    
    // Get the tag parameter (URLSearchParams.get() already decodes URL-encoded values)
    const urlParams = new URLSearchParams(window.location.search);
    let activeTag = urlParams.get('tag');
    if (activeTag) {
      // Replace plus signs with spaces (for tags like "C++" encoded as "C%2B%2B")
      // URLSearchParams already handles %23 -> #, so we just need to handle + -> space
      activeTag = activeTag.replace(/\+/g, ' ').trim();
    }

    let keysToRender = Object.keys(map).sort((a, b) => a.localeCompare(b));
    let isFiltered = false;

    if (activeTag) {
      // Exact match first (case-sensitive), then case-insensitive fallback
      let matchedKey = keysToRender.find(k => k === activeTag);
      if (!matchedKey) {
        matchedKey = keysToRender.find(k => k.toLowerCase() === activeTag.toLowerCase());
      }
      
      if (matchedKey) {
        keysToRender = [matchedKey];
        isFiltered = true;
        
        // Add back button
        const backBtn = document.createElement('a');
        backBtn.href = '{{ "/skills/" | relative_url }}';
        backBtn.className = 'btn btn--inverse';
        backBtn.style.display = 'inline-block';
        backBtn.style.marginBottom = '20px';
        backBtn.style.textDecoration = 'none';
        backBtn.innerHTML = '&larr; Back to all skills';
        backBtn.setAttribute('data-smooth-scroll', 'false');
        container.appendChild(backBtn);

        // Add header
        const header = document.createElement('h2');
        header.textContent = matchedKey;
        container.appendChild(header);
      } else {
        container.innerHTML = `<p>No projects found for skill: <strong>${activeTag}</strong></p><a href="{{ '/skills/' | relative_url }}">View all skills</a>`;
        return;
      }
    }

    // Render skills list
    keysToRender.forEach(skill => {
      const section = document.createElement('div');
      section.className = 'skill-section';
      section.style.marginBottom = '30px';
      
      if (!isFiltered) {
        const title = document.createElement('h2');
        title.id = encodeURIComponent(skill);
        title.textContent = skill;
        title.style.borderBottom = "1px solid #eaeaea";
        title.style.paddingBottom = "10px";
        section.appendChild(title);
      }

      const list = document.createElement('ul');
      map[skill].forEach(project => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = project.url;
        link.innerHTML = `<strong>${project.title}</strong>`;
        link.setAttribute('data-smooth-scroll', 'false');
        li.appendChild(link);
        
        if (project.venue) {
          const venueSpan = document.createElement('span');
          venueSpan.style.color = '#666';
          venueSpan.style.fontSize = '0.9em';
          venueSpan.textContent = ` — ${project.venue}`;
          li.appendChild(venueSpan);
        }
        list.appendChild(li);
      });
      
      section.appendChild(list);
      container.appendChild(section);
    });
  }
});
})();
</script>

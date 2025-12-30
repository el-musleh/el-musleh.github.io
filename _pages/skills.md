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
document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById('skills-container');
  
  fetch('{{ "/assets/skills-feed.json" | relative_url }}')
    .then(response => response.json())
    .then(data => {
      const skillsMap = {};

      data.forEach(doc => {
        // --- SOURCE 1: Front Matter Tags (YAML) ---
        if (doc.tags && Array.isArray(doc.tags)) {
          doc.tags.forEach(tag => {
            addSkillToMap(skillsMap, tag, doc);
          });
        }

        // --- SOURCE 2: Inline Tags (HTML Content) ---
        // We parse the content string to find <a class="cv-skill-tag">
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = doc.content;
        const inlineTags = tempDiv.querySelectorAll('.cv-skill-tag');

        inlineTags.forEach(tagElem => {
          const skillName = tagElem.getAttribute('data-skill');
          if (skillName) {
            addSkillToMap(skillsMap, skillName, doc);
          }
        });
      });

      renderSkills(skillsMap);
    })
    .catch(err => {
      console.error('Error loading skills:', err);
      container.innerHTML = '<p>Error loading skills data.</p>';
    });

  // Helper to add skill to map safely
  function addSkillToMap(map, skillName, doc) {
    // Normalize: Trim whitespace to avoid " C++" vs "C++"
    const cleanName = skillName.trim();
    
    if (!map[cleanName]) {
      map[cleanName] = [];
    }
    
    // Avoid duplicates (e.g. if a file has the tag in YAML AND inline)
    const exists = map[cleanName].some(item => item.url === doc.url);
    if (!exists) {
      map[cleanName].push({
        title: doc.title,
        venue: doc.venue,
        url: doc.url
      });
    }
  }

  function renderSkills(map) {
    container.innerHTML = '';
    
    // Get the tag from URL. URLSearchParams handles decoding automatically.
    // e.g. ?tag=C%2B%2B becomes "C++"
    const urlParams = new URLSearchParams(window.location.search);
    const activeTag = urlParams.get('tag');

    let keysToRender = Object.keys(map).sort((a, b) => a.localeCompare(b));
    let isFiltered = false;

    if (activeTag) {
      // Case-insensitive search to find the matching key
      const matchedKey = keysToRender.find(k => k.toLowerCase() === activeTag.toLowerCase());
      
      if (matchedKey) {
        keysToRender = [matchedKey]; // Only render this specific skill
        isFiltered = true;
        
         // Add a "Back" button
        const backBtn = document.createElement('a');
        backBtn.href = '{{ "/skills/" | relative_url }}';
        backBtn.style.display = 'inline-block';
        backBtn.style.marginBottom = '20px';
        backBtn.style.textDecoration = 'none';
        backBtn.innerHTML = '&larr; Back to all skills';
        container.appendChild(backBtn);

        // Header for the filtered view
        const header = document.createElement('h2');
        header.textContent = matchedKey; // e.g. "C++"
        container.appendChild(header);

        backBtn.className = 'btn btn--inverse'; // Minimal Mistakes button style
      } else {
        container.innerHTML = `<p>No projects found for skill: <strong>${activeTag}</strong></p><a href="{{ '/skills/' | relative_url }}">View all skills</a>`;
        return;
      }
    }

    // Render the list (either full or filtered)
    keysToRender.forEach(skill => {
      const section = document.createElement('div');
      section.className = 'skill-section';
      section.style.marginBottom = '30px';
      
      // Only show the H2 title if we are NOT in filtered mode (since we added a main H1 above)
      if (!isFiltered) {
        const title = document.createElement('h2');
        title.id = encodeURIComponent(skill); // Safe ID for linking
        title.textContent = skill;
        title.style.borderBottom = "1px solid #eaeaea";
        title.style.paddingBottom = "10px";
        section.appendChild(title);
      }

      const list = document.createElement('ul');
      map[skill].forEach(project => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${project.url}"><strong>${project.title}</strong></a>`;
        if (project.venue) {
          li.innerHTML += ` <span style="color:#666; font-size: 0.9em;">— ${project.venue}</span>`;
        }
        list.appendChild(li);
      });
      section.appendChild(list);
      container.appendChild(section);
    });
  }
});
</script>

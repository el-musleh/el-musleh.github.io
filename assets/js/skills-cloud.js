document.addEventListener("DOMContentLoaded", function() {
  var container = document.getElementById('cv-skills-cloud');
  if (!container) return;

  var feedUrl = container.getAttribute('data-feed-url');
  var skillsUrl = container.getAttribute('data-skills-url');
  var VISIBLE_COUNT = 50;

  fetch(feedUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Failed to fetch skills feed: ' + response.status + ' ' + response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      if (!Array.isArray(data)) throw new Error('Skills feed JSON is not an array');

      var tagCounts = new Map();

      data.forEach(function(doc) {
        // Track unique skills found in this document
        var documentSkills = new Set();

        // Add front matter tags (count each tag once per document)
        if (doc.tags && Array.isArray(doc.tags)) {
          doc.tags.forEach(function(t) {
            if (t) documentSkills.add(t);
          });
        }

        // Add inline skill tags (count each skill once per document)
        if (doc.content && typeof doc.content === 'string') {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = doc.content;
          var inlineTags = tempDiv.querySelectorAll('.cv-skill-tag');
          inlineTags.forEach(function(tagElem) {
            var name = tagElem.getAttribute('data-skill');
            if (name) documentSkills.add(name);
          });
        }

        // Increment global counts once per unique skill in this document
        documentSkills.forEach(function(skill) {
          tagCounts.set(skill, (tagCounts.get(skill) || 0) + 1);
        });
      });

      if (tagCounts.size === 0) return;

      var sorted = Array.from(tagCounts.entries()).sort(function(a, b) {
        return b[1] - a[1] || a[0].localeCompare(b[0]);
      });

      container.innerHTML = '';

      sorted.forEach(function(entry, index) {
        var skill = entry[0];
        var count = entry[1];

        var a = document.createElement('a');
        a.href = skillsUrl + '?tag=' + encodeURIComponent(skill);
        a.className = 'cv-skill-badge';
        a.title = count + ' linked ' + (count === 1 ? 'page' : 'pages');
        if (index >= VISIBLE_COUNT) a.classList.add('skill-hidden');

        var text = document.createTextNode(skill);
        a.appendChild(text);

        var chip = document.createElement('span');
        chip.className = 'skill-count';
        chip.textContent = count;
        a.appendChild(chip);

        container.appendChild(a);
      });

      container.style.transition = 'opacity 0.25s ease';
      container.style.opacity = '0';
      container.style.visibility = '';
      requestAnimationFrame(function() {
        requestAnimationFrame(function() { container.style.opacity = '1'; });
      });

      if (sorted.length > VISIBLE_COUNT) {
        var btn = document.createElement('button');
        btn.className = 'skills-show-toggle';
        btn.textContent = 'Show all ' + sorted.length + ' skills';
        var expanded = false;

        btn.addEventListener('click', function() {
          expanded = !expanded;
          var hidden = container.querySelectorAll('.skill-hidden');
          if (expanded) {
            hidden.forEach(function(el) { el.classList.remove('skill-hidden'); });
            btn.textContent = 'Show less';
          } else {
            var badges = container.querySelectorAll('.cv-skill-badge');
            badges.forEach(function(el, i) {
              if (i >= VISIBLE_COUNT) el.classList.add('skill-hidden');
            });
            btn.textContent = 'Show all ' + sorted.length + ' skills';
          }
        });

        container.appendChild(btn);
      }
    })
    .catch(function(err) {
      console.error('Failed to load unified skills cloud:', err);
      if (container) {
        container.style.visibility = '';
        var note = document.createElement('div');
        note.style.fontSize = '0.9em';
        note.style.color = '#666';
        note.style.marginTop = '8px';
        note.textContent = 'Live skills cloud unavailable; showing static skill list.';
        container.appendChild(note);
      }
    });
});

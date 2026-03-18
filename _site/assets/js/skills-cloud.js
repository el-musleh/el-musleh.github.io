document.addEventListener("DOMContentLoaded", function() {
  var container = document.getElementById('cv-skills-cloud');
  if (!container) return;

  var feedUrl = container.getAttribute('data-feed-url');
  var skillsUrl = container.getAttribute('data-skills-url');

  fetch(feedUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Failed to fetch skills feed: ' + response.status + ' ' + response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      if (!Array.isArray(data)) throw new Error('Skills feed JSON is not an array');

      var allSkills = new Set();

      data.forEach(function(doc) {
        if (doc.tags && Array.isArray(doc.tags)) {
          doc.tags.forEach(function(t) { allSkills.add(t); });
        }

        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = doc.content;
        var inlineTags = tempDiv.querySelectorAll('.cv-skill-tag');

        inlineTags.forEach(function(tagElem) {
          var name = tagElem.getAttribute('data-skill');
          if (name) allSkills.add(name);
        });
      });

      if (allSkills.size > 0) {
        container.innerHTML = '';

        var sortedSkills = Array.from(allSkills).sort(function(a, b) { return a.localeCompare(b); });

        sortedSkills.forEach(function(skill) {
          var a = document.createElement('a');
          a.href = skillsUrl + '?tag=' + encodeURIComponent(skill);
          a.className = 'cv-skill-badge';
          a.textContent = skill;
          a.title = 'View projects using ' + skill;
          container.appendChild(a);
        });
      }
    })
    .catch(function(err) {
      console.error('Failed to load unified skills cloud:', err);
      if (container) {
        var note = document.createElement('div');
        note.style.fontSize = '0.9em';
        note.style.color = '#666';
        note.style.marginTop = '8px';
        note.textContent = 'Live skills cloud unavailable; showing static skill list.';
        container.appendChild(note);
      }
    });
});

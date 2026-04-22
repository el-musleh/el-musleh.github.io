/**
 * Skills Page Module - Enhanced version with security, validation, and error handling
 * Handles dynamic loading and filtering of skills from JSON feed
 */
(function() {
  'use strict';
  
  if (window.skillsPageInitialized) return;
  window.skillsPageInitialized = true;

  // Configuration and constants
  const CONFIG = {
    PLUS_PLACEHOLDER: '__PLUS_PLACEHOLDER__',
    MAX_SKILL_NAME_LENGTH: 100,
    MAX_TITLE_LENGTH: 200,
    MAX_VENUE_LENGTH: 100,
    DEBUG_MODE: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  };

  // Utility functions
  const Utils = {
    /**
     * Safely escape HTML to prevent XSS
     * @param {string} str - String to escape
     * @returns {string} - Escaped string
     */
    escapeHtml: function(str) {
      if (typeof str !== 'string') return '';
      return str.replace(/[&<>"']/g, function(c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },

    /**
     * Validate and sanitize skill name
     * @param {string} skillName - Raw skill name
     * @returns {string|null} - Sanitized skill name or null if invalid
     */
    sanitizeSkillName: function(skillName) {
      if (typeof skillName !== 'string') return null;
      
      const trimmed = skillName.trim();
      if (trimmed.length === 0 || trimmed.length > CONFIG.MAX_SKILL_NAME_LENGTH) return null;
      
      // Remove potentially dangerous characters
      return trimmed.replace(/[<>"']/g, '');
    },

    /**
     * Validate URL format
     * @param {string} url - URL to validate
     * @returns {boolean} - True if valid URL
     */
    isValidUrl: function(url) {
      if (typeof url !== 'string') return false;
      try {
        const parsed = new URL(url, window.location.origin);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch (e) {
        return false;
      }
    },

    /**
     * Log debug messages
     * @param {string} message - Message to log
     * @param {*} data - Additional data to log
     */
    log: function(message, data) {
      if (CONFIG.DEBUG_MODE) {
        console.log('[SkillsPage]', message, data);
      }
    },

    /**
     * Log error messages
     * @param {string} message - Error message
     * @param {Error|string} error - Error object or message
     */
    logError: function(message, error) {
      console.error('[SkillsPage ERROR]', message, error);
    }
  };

  document.addEventListener("DOMContentLoaded", function() {
    try {
      var container = document.getElementById('skills-container');
      if (!container) {
        Utils.logError('Skills container not found');
        return;
      }

      var feedUrl = container.getAttribute('data-feed-url');
      var skillsUrl = container.getAttribute('data-skills-url');
      
      if (!feedUrl || !skillsUrl) {
        Utils.logError('Missing required data attributes', { feedUrl, skillsUrl });
        showError(container, 'Missing configuration. Please check page setup.');
        return;
      }

      // Show loading state
      showLoading(container);
      
      fetch(feedUrl)
        .then(function(response) {
          if (!response.ok) {
            throw new Error('HTTP ' + response.status + ': ' + response.statusText);
          }
          return response.json();
        })
        .then(function(data) {
          if (!Array.isArray(data)) {
            throw new Error('Skills feed is not an array');
          }
          
          Utils.log('Loaded skills data', { count: data.length });
          
          if (data.length === 0) {
            showEmptyState(container, skillsUrl);
            return;
          }

          var skillsMap = processSkillsData(data);
          
          if (Object.keys(skillsMap).length === 0) {
            showEmptyState(container, skillsUrl);
            return;
          }

          renderSkills(skillsMap, container, skillsUrl);
        })
        .catch(function(err) {
          Utils.logError('Error loading skills', err);
          showError(container, 'Could not load skills data. Please try again later.');
        });
    } catch (err) {
      Utils.logError('Critical error in initialization', err);
      if (container) {
        showError(container, 'An unexpected error occurred. Please refresh the page.');
      }
    }

    /**
     * Process skills data from JSON feed
     * @param {Array} data - Raw skills data
     * @returns {Object} - Processed skills map
     */
    function processSkillsData(data) {
      var skillsMap = {};
      var processedCount = 0;
      var errorCount = 0;

      data.forEach(function(doc, index) {
        try {
          if (!doc || typeof doc !== 'object') {
            Utils.logError('Invalid document at index', index);
            errorCount++;
            return;
          }

          // Process front matter tags
          if (doc.tags && Array.isArray(doc.tags)) {
            doc.tags.forEach(function(tag) {
              addSkillToMap(skillsMap, tag, doc);
            });
          }

          // Process inline skill tags from content
          if (doc.content && typeof doc.content === 'string') {
            processInlineSkills(skillsMap, doc.content, doc);
          }
          
          processedCount++;
        } catch (err) {
          Utils.logError('Error processing document at index ' + index, err);
          errorCount++;
        }
      });
      
      Utils.log('Processed skills data', { processed: processedCount, errors: errorCount, totalSkills: Object.keys(skillsMap).length });
      return skillsMap;
    }

    /**
     * Process inline skill tags from HTML content
     * @param {Object} map - Skills map to update
     * @param {string} content - HTML content
     * @param {Object} doc - Document object
     */
    function processInlineSkills(map, content, doc) {
      try {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        var skillTags = tempDiv.querySelectorAll('.cv-skill-tag');
        
        skillTags.forEach(function(tagElem) {
          var skillName = tagElem.getAttribute('data-skill');
          if (skillName) {
            addSkillToMap(map, skillName, doc);
          }
        });
        
        // Clean up temporary DOM
        tempDiv.innerHTML = '';
      } catch (err) {
        Utils.logError('Error processing inline skills', err);
      }
    }

    /**
     * Add skill to skills map with validation
     * @param {Object} map - Skills map
     * @param {string} skillName - Skill name
     * @param {Object} doc - Document object
     */
    function addSkillToMap(map, skillName, doc) {
      var cleanName = Utils.sanitizeSkillName(skillName);
      if (!cleanName) {
        Utils.log('Invalid skill name skipped', skillName);
        return;
      }

      if (!map[cleanName]) {
        map[cleanName] = [];
      }

      // Check for duplicates
      if (map[cleanName].some(function(item) { return item.url === doc.url; })) {
        return;
      }

      // Validate and sanitize document data
      var skillItem = {
        title: sanitizeText(doc.title) || 'Untitled',
        venue: sanitizeText(doc.venue) || '',
        url: Utils.isValidUrl(doc.url) ? doc.url : '#',
        date: doc.date || null
      };

      map[cleanName].push(skillItem);
    }

    /**
     * Sanitize text content
     * @param {string} text - Text to sanitize
     * @returns {string} - Sanitized text
     */
    function sanitizeText(text) {
      if (typeof text !== 'string') return '';
      return text.trim().substring(0, CONFIG.MAX_TITLE_LENGTH);
    }

    /**
     * Render skills to the DOM with enhanced security and accessibility
     * @param {Object} map - Skills map
     * @param {HTMLElement} container - Container element
     * @param {string} skillsUrl - Base skills URL
     */
    function renderSkills(map, container, skillsUrl) {
      try {
        // Prevent duplicate rendering
        if (container.querySelector('.skill-section')) {
          Utils.log('Skills already rendered, skipping');
          return;
        }

        // Clear container safely
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        // Parse URL parameters for filtering
        var activeTag = parseUrlTag();
        var keysToRender = Object.keys(map).sort(function(a, b) { return b.localeCompare(a); });
        var isFiltered = false;

        // Handle tag filtering
        if (activeTag) {
          var matchedKey = findMatchingSkill(keysToRender, activeTag);
          
          if (matchedKey) {
            keysToRender = [matchedKey];
            isFiltered = true;
            
            // Add back button
            var backBtn = createBackButton(skillsUrl);
            container.appendChild(backBtn);
            
            // Add filtered header
            var header = createSkillHeader(matchedKey, true);
            container.appendChild(header);
          } else {
            showNoResults(container, activeTag, skillsUrl);
            return;
          }
        }

        if (keysToRender.length === 0) {
          showEmptyState(container, skillsUrl);
          return;
        }

        // Render each skill section
        keysToRender.forEach(function(skill) {
          var section = createSkillSection(skill, map[skill], !isFiltered);
          container.appendChild(section);
        });
        
        Utils.log('Skills rendered successfully', { skillCount: keysToRender.length, isFiltered: !!activeTag });
      } catch (err) {
        Utils.logError('Error rendering skills', err);
        showError(container, 'Error displaying skills. Please refresh the page.');
      }
    }

    /**
     * Parse tag from URL parameters with proper + symbol handling
     * @returns {string|null} - Decoded tag or null
     */
    function parseUrlTag() {
      try {
        var query = window.location.search;
        if (!query || query.length <= 1) return null;

        var searchParams = query.substring(1).split('&');
        for (var i = 0; i < searchParams.length; i++) {
          var pair = searchParams[i].split('=');
          if (pair[0] !== 'tag' || pair.length < 2) continue;

          // Decode URL-encoded tag values like C%2B%2B
          var raw = pair.slice(1).join('=');
          var decoded = decodeURIComponent(raw).trim();

          Utils.log('Parsed tag from URL', { raw: raw, decoded: decoded });
          return decoded;
        }

        return null;
      } catch (err) {
        Utils.logError('Error parsing URL tag', err);
        return null;
      }
    }
    
    
    /**
     * Find matching skill key with intelligent matching for programming languages
     * @param {Array} keys - Available skill keys
     * @param {string} activeTag - Tag to search for
     * @returns {string|null} - Matching key or null
     */
    function findMatchingSkill(keys, activeTag) {
      // 1. Exact match
      var exactMatch = keys.find(function(k) { return k === activeTag; });
      if (exactMatch) return exactMatch;

      // 2. Case-insensitive match
      var caseInsensitiveMatch = keys.find(function(k) { return k.toLowerCase() === activeTag.toLowerCase(); });
      if (caseInsensitiveMatch) {
        Utils.log('Found case-insensitive match', { searched: activeTag, found: caseInsensitiveMatch });
        return caseInsensitiveMatch;
      }
      
      // 3. Programming language variations (C++, C#, C++, etc.)
      var normalizedSearch = normalizeProgrammingLanguage(activeTag);
      var normalizedMatch = keys.find(function(k) { return normalizeProgrammingLanguage(k) === normalizedSearch; });
      if (normalizedMatch) {
        Utils.log('Found normalized programming language match', { searched: activeTag, normalized: normalizedSearch, found: normalizedMatch });
        return normalizedMatch;
      }
      
      // 4. Partial match (for skills that might contain the search term)
      var partialMatch = keys.find(function(k) { 
        return k.toLowerCase().includes(activeTag.toLowerCase()) || 
               activeTag.toLowerCase().includes(k.toLowerCase());
      });
      if (partialMatch) return partialMatch;
      
      Utils.log('No match found for skill', { searched: activeTag });
      return null;
    }
    
    /**
     * Normalize programming language names for intelligent matching
     * @param {string} language - Programming language name
     * @returns {string} - Normalized name
     */
    function normalizeProgrammingLanguage(language) {
      if (!language || typeof language !== 'string') return '';
      
      return language.toLowerCase()
        .replace(/\s+/g, '') // Remove spaces
        .replace(/[+#]/g, '') // Remove + and # symbols for matching
        .replace(/\(programming language\)/g, '') // Remove suffix
        .replace(/\(language\)/g, '') // Remove suffix
        .trim();
    }

    /**
     * Create skill section element
     * @param {string} skillName - Skill name
     * @param {Array} items - Skill items
     * @param {boolean} showTitle - Whether to show title
     * @returns {HTMLElement} - Skill section element
     */
    function createSkillSection(skillName, items, showTitle) {
      var section = document.createElement('div');
      section.className = 'skill-section';
      section.setAttribute('role', 'region');
      section.setAttribute('aria-labelledby', showTitle ? 'skill-' + encodeURIComponent(skillName) : null);

      if (showTitle) {
        var title = createSkillHeader(skillName, false);
        section.appendChild(title);
      }

      var list = createSkillList(items);
      section.appendChild(list);

      return section;
    }

    /**
     * Create skill header element
     * @param {string} skillName - Skill name
     * @param {boolean} isFiltered - Whether this is a filtered view
     * @returns {HTMLElement} - Header element
     */
    function createSkillHeader(skillName, isFiltered) {
      var header = document.createElement('h2');
      header.id = 'skill-' + encodeURIComponent(skillName);
      header.className = 'skill-section__title';
      header.textContent = Utils.escapeHtml(skillName);
      
      if (isFiltered) {
        header.setAttribute('role', 'heading');
        header.setAttribute('aria-live', 'polite');
      }
      
      return header;
    }

    /**
     * Create skill list element
     * @param {Array} items - Skill items
     * @returns {HTMLElement} - List element
     */
    function createSkillList(items) {
      var list = document.createElement('ul');
      list.className = 'skill-section__list';
      list.setAttribute('role', 'list');

      // Sort items by date (newest first)
      var sortedItems = items.slice().sort(function(a, b) {
        var dateA = a.date ? new Date(a.date) : new Date(0);
        var dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
      });

      sortedItems.forEach(function(item) {
        var listItem = createSkillListItem(item);
        list.appendChild(listItem);
      });

      return list;
    }

    /**
     * Create skill list item element
     * @param {Object} item - Skill item
     * @returns {HTMLElement} - List item element
     */
    function createSkillListItem(item) {
      var li = document.createElement('li');
      li.setAttribute('role', 'listitem');

      var link = document.createElement('a');
      link.href = item.url;
      link.setAttribute('data-smooth-scroll', 'false');
      link.className = 'skill-item-link';
      
      // Add accessibility attributes
      if (item.url === '#') {
        link.setAttribute('aria-disabled', 'true');
        link.setAttribute('tabindex', '-1');
      }

      var titleSpan = document.createElement('strong');
      titleSpan.textContent = Utils.escapeHtml(item.title);
      link.appendChild(titleSpan);
      
      li.appendChild(link);

      if (item.venue) {
        var venueSpan = document.createElement('span');
        venueSpan.className = 'skill-section__venue';
        venueSpan.textContent = ' \u2014 ' + Utils.escapeHtml(item.venue);
        li.appendChild(venueSpan);
      }

      return li;
    }

    /**
     * Create back button for filtered views
     * @param {string} skillsUrl - Base skills URL
     * @returns {HTMLElement} - Back button element
     */
    function createBackButton(skillsUrl) {
      var backBtn = document.createElement('a');
      backBtn.href = skillsUrl;
      backBtn.className = 'btn btn--inverse skills-back-btn';
      backBtn.setAttribute('data-smooth-scroll', 'false');
      backBtn.setAttribute('aria-label', 'Back to all skills');
      backBtn.innerHTML = '&larr; Back to all skills';
      return backBtn;
    }

    // UI State Management Functions
    
    /**
     * Show loading state
     * @param {HTMLElement} container - Container element
     */
    function showLoading(container) {
      var loadingDiv = document.createElement('div');
      loadingDiv.className = 'skills-loading';
      loadingDiv.setAttribute('role', 'status');
      loadingDiv.setAttribute('aria-live', 'polite');
      loadingDiv.textContent = 'Loading skills...';
      
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(loadingDiv);
    }

    /**
     * Show error state
     * @param {HTMLElement} container - Container element
     * @param {string} message - Error message
     */
    function showError(container, message) {
      var errorDiv = document.createElement('div');
      errorDiv.className = 'skills-error';
      errorDiv.setAttribute('role', 'alert');
      errorDiv.setAttribute('aria-live', 'assertive');
      errorDiv.innerHTML = '<p>' + Utils.escapeHtml(message) + '</p>';
      
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(errorDiv);
    }

    /**
     * Show empty state
     * @param {HTMLElement} container - Container element
     * @param {string} skillsUrl - Base skills URL
     */
    function showEmptyState(container, skillsUrl) {
      var emptyDiv = document.createElement('div');
      emptyDiv.className = 'skills-empty';
      emptyDiv.innerHTML = 
        '<p>No skills found. Add tags to your posts, projects, or publications.</p>';
      
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(emptyDiv);
    }

    /**
     * Show no results state
     * @param {HTMLElement} container - Container element
     * @param {string} tag - Tag that was searched for
     * @param {string} skillsUrl - Base skills URL
     */
    function showNoResults(container, tag, skillsUrl) {
      var noResultsDiv = document.createElement('div');
      noResultsDiv.className = 'skills-no-results';
      noResultsDiv.setAttribute('role', 'status');
      noResultsDiv.innerHTML = 
        '<p>No pages found for tag <strong>' + Utils.escapeHtml(tag) + '</strong>. ' +
        '<a href="' + Utils.escapeHtml(skillsUrl) + '">View all skills</a>.</p>';
      
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(noResultsDiv);
    }
  });
})();

# Prompt: Update Sitemap

Update `_pages/sitemap.md` to reflect changes in the repository.

## Steps

1. Check for new/modified/removed content in:
   - `_pages/` - Pages
   - `_posts/` - Blog posts
   - `_projects/` - Projects
   - `_publications/` - Publications
   - `_experience/` - Work experience
   - `_education/` - Education

   Also check for any **new directories** added to the root that may contain content (e.g., `_talks/`, `_teaching/`, `_portfolio/`, etc.).

2. Review `_pages/sitemap.md` and update to match current repository structure:
   - Add/remove/modify sections as needed
   - Update the Main Pages table with new pages and descriptions
   - Add collection loops for any new directories found
   - Maintain consistent formatting

3. If new directories are found, ask the user:
   - Should this directory be included in the sitemap?
   - What section title should be used?
   - What description should be added?

4. Verify all links use Jekyll templating: `{{ post.url }}`

## Notes

- Jekyll loops auto-update on build, but manual updates needed for descriptions
- Keep format adaptable to repository structure changes

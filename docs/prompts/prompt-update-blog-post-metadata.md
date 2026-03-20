# Prompt: Update Blog Post Metadata

Update a new blog post's metadata (front matter) to match the format used in other blog posts in `_posts/`.

## Steps

1. **Read existing blog posts** to identify the metadata format:
   - Check `_posts/` directory for posts (exclude the one being updated)
   - Read the first 20-30 lines of 2-3 existing posts to understand the front matter structure

2. **Required metadata fields** (based on this Jekyll theme):
   ```yaml
   ---
   title:  "Post Title"
   date: YYYY-MM-DD
   collection: experience
   published: true 
   header:
     # teaser: "posts/your-image.jpg"  # Optional: uncomment if image exists
   categories: 
     - Category1
     - Category2
   tags:
     - Tag1
     - Tag2
   ---
   ```

3. **Optional metadata fields** (only if applicable):
   - `last_modified_at: YYYY-MM-DD` - If the post has been updated after publication

4. **Update the target blog post**:
   - Extract the title from the first H1 heading (`# Title`)
   - Extract the date from the filename (format: `YYYY-MM-DD-title.md`)
   - Set `collection: experience` (standard for blog posts in this repo)
   - Set `published: true`
   - Add appropriate `categories` and `tags` based on the post content

5. **Handle teaser image** (optional):
   - Check `images/posts/` for available images
   - If no image exists, leave the teaser commented out with a note
   - If using an existing image, set the path as `posts/filename.ext`

## Notes

- The `collection` field is typically `experience` for this blog
- Categories use title-case (e.g., `Technology`, `Linux`)
- Tags use kebab-case (e.g., `speech-recognition`, `nerd-dictation`)
- The header/teaser is optional - the post will render without it

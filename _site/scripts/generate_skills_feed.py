#!/usr/bin/env python3
"""
Script to generate skills-feed.json from Jekyll site content.
Reads tags from front matter of experience, projects, publications, and education files.
"""

import json
import os
import re
import yaml

def parse_front_matter(content):
    """Parse YAML front matter from file content."""
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            front_matter = parts[1]
            body = parts[2]
            try:
                data = yaml.safe_load(front_matter)
                return data, body
            except yaml.YAMLError:
                return {}, content
    return {}, content

def extract_inline_skills(body):
    """Extract inline skill tags from body content using skill.html include."""
    # Match skill.html includes like {% include skill.html text="C#" %}
    skill_pattern = r'{%\s*include\s+skill\.html\s+text="([^"]+)" %}'
    matches = re.findall(skill_pattern, body)
    return matches

def generate_skills_feed(repo_root):
    """
    Generates a skills-feed.json file from Jekyll site content.
    """
    # Define collections to process
    collections = ['experience', 'projects', 'publications', 'education']
    
    all_docs = []
    
    for collection in collections:
        collection_path = os.path.join(repo_root, '_' + collection)
        
        if not os.path.isdir(collection_path):
            continue
        
        # Process each file in the collection
        for filename in os.listdir(collection_path):
            if not filename.endswith('.md') and not filename.endswith('.html'):
                continue
            
            file_path = os.path.join(collection_path, filename)
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
            except (IOError, UnicodeDecodeError):
                continue
            
            front_matter, body = parse_front_matter(content)
            
            if not front_matter:
                continue
            
            # Get title and URL
            title = front_matter.get('title', '')
            url = front_matter.get('url', '')
            
            # If no URL, generate one from the filename
            if not url:
                url = f"/{collection}/{os.path.splitext(filename)[0]}"
            
            # Get tags from front matter
            tags = front_matter.get('tags', [])
            if not isinstance(tags, list):
                tags = []
            
            # Also extract inline skill tags from body
            inline_tags = extract_inline_skills(body)
            all_tags = list(set(tags + inline_tags))
            
            # Only include docs that have tags from front matter or inline includes
            if all_tags:
                doc = {
                    'title': title,
                    'url': url,
                    'tags': all_tags
                }
                all_docs.append(doc)
    
    # Sort docs by title
    all_docs.sort(key=lambda x: x.get('title', ''))
    
    # Write to file
    skills_feed_path = os.path.join(repo_root, 'assets', 'skills-feed.json')
    with open(skills_feed_path, 'w', encoding='utf-8') as f:
        json.dump(all_docs, f, indent=2)
    
    print(f"Successfully generated {skills_feed_path}")
    print(f"  - Total documents: {len(all_docs)}")
    
    # Count total unique tags
    all_tags = set()
    for doc in all_docs:
        all_tags.update(doc.get('tags', []))
    print(f"  - Unique tags: {len(all_tags)}")

if __name__ == '__main__':
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    generate_skills_feed(repo_root)

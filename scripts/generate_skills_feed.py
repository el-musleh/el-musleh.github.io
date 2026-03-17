#!/usr/bin/env python3
"""
Script to generate skills-feed.json from _data/cv.json
"""

import json
import os

def generate_skills_feed(repo_root):
    """
    Generates a skills-feed.json file from the cv.json data.
    """
    cv_json_path = os.path.join(repo_root, '_data', 'cv.json')
    skills_feed_path = os.path.join(repo_root, 'assets', 'skills-feed.json')

    if not os.path.exists(cv_json_path):
        print(f"Error: {cv_json_path} not found. Please run the script to generate cv.json first.")
        return

    with open(cv_json_path, 'r', encoding='utf-8') as f:
        cv_data = json.load(f)

    all_docs = []

    # Process publications
    if 'publications' in cv_data:
        for pub in cv_data['publications']:
            doc = {
                'title': pub.get('name', ''),
                'url': pub.get('website', ''),
                'tags': [],
                'content': pub.get('summary', '')
            }
            all_docs.append(doc)

    # Process portfolio
    if 'portfolio' in cv_data:
        for item in cv_data['portfolio']:
            doc = {
                'title': item.get('name', ''),
                'url': item.get('url', ''),
                'tags': [],
                'content': item.get('description', '')
            }
            all_docs.append(doc)
            
    # Process work
    if 'work' in cv_data:
        for item in cv_data['work']:
            doc = {
                'title': item.get('company', ''),
                'url': item.get('website', ''),
                'tags': [],
                'content': "
".join(item.get('highlights', []))
            }
            all_docs.append(doc)

    # Extract skills and associate them with documents
    if 'skills' in cv_data:
        for skill_category in cv_data['skills']:
            for skill in skill_category.get('keywords', []):
                for doc in all_docs:
                    if skill.lower() in doc['content'].lower() and skill not in doc['tags']:
                        doc['tags'].append(skill)
    
    # Remove docs without tags
    all_docs = [doc for doc in all_docs if doc['tags']]

    with open(skills_feed_path, 'w', encoding='utf-8') as f:
        json.dump(all_docs, f, indent=2)

    print(f"Successfully generated {skills_feed_path}")

if __name__ == '__main__':
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    generate_skills_feed(repo_root)

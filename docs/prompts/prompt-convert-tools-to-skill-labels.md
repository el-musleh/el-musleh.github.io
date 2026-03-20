# Prompt: Convert Tools to Skill Include Labels

Convert all technical skills/tools in a markdown post to use the skill include label format and remove bold formatting.

## Before/After

**Before:**
```markdown
- **Tool Name** - Description of the tool...
```

**After:**
```markdown
- {% include skill.html text="Tool Name" %} - Description of the tool...
```

## Steps

1. Identify all tools/skills mentioned in the file (typically in bullet lists or numbered lists)
2. Replace `**Tool Name**` with `{% include skill.html text="Tool Name" %}`
3. Ensure no `**` asterisks remain around the skill include tags

## Note
The skill include renders as a clickable tag linking to `/skills/?tag=toolname`. Located at `_includes/skill.html`.

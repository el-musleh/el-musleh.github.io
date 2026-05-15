---
title: "Escaping the Cloud: A Complete Guide to Transitioning from Google Photos"
date: 2026-05-14
collection: technical
published: true
header:
  teaser: "posts/google-photos-takeout.jpg"
categories:
  - Technology
  - Self-Hosting
tags:
  - Google Photos
  - Privacy
  - Data Migration
  - Linux
  - Python
  - Metadata
---

Google Photos is a convenient tool, but many of us eventually reach a point where we want more control over our digital memories. Whether it's for privacy reasons, cost, or simply wanting to own your data, moving away from Google Photos can feel like a daunting task. The biggest hurdle? Losing the precious metadata (like dates and locations) that Google stores separately in JSON files.

In this guide, I'll walk you through a streamlined process to export your library, fix the broken metadata, and organize your collection for the long term.

## 1. The Great Escape: Google Takeout

The first step is getting your data out. Google Takeout is the official tool for this. 

1. Go to [Google Takeout](https://takeout.google.com/).
2. Select only **Google Photos**.
3. Choose your export frequency and file type (ZIP is usually best).
4. Wait for the download links.

**Pro-Tip:** If you also use Google Keep and want to preserve those notes, check out the [Google Keep Exporter](https://github.com/vHanda/google-keep-exporter).

**The Catch:** Google provides your photos in one folder and their metadata (timestamps, location, descriptions) in separate `.json` files. If you simply move these photos to a new drive, they will all look like they were "created" on the day you downloaded them.

## 2. Restoring the Soul of Your Photos (Metadata)

To fix this, we need to merge the JSON data back into the image files. There are several ways to do this, ranging from specialized tools to custom scripts.

### Option A: Specialized Tools
If you prefer a GUI or a robust CLI tool, these are excellent choices:
- **[Google Photos Takeout Helper](https://github.com/TheLastGimbus/GooglePhotosTakeoutHelper/blob/master/README.md):** A popular tool that organizes your photos into a clear folder structure.
- **[Google Photos Export Organizer](https://alamantus.github.io/GooglePhotosExportOrganizer/):** Another great utility specifically designed to handle the JSON sidecar files.
- **[ExifTool](https://exiftool.sourceforge.net/):** The industry standard for metadata manipulation. It's powerful but has a steeper learning curve.

These tools typically help you:
- Fix all file created and modified dates as they are organized.
- Optionally copy all available metadata provided by Google Takeout in .json files back into the image/video files.
- Remind you to clean up after processing.

### Option B: The DIY Python Approach
For those who want a lightweight, customizable solution, I’ve used a simple Python script to update the file modification times based on the JSON `photoTakenTime`.

```python
import os
import json
from pathlib import Path

def update_file_modified_time(json_dir):
    for json_file in Path(json_dir).glob("*.json"):
        with open(json_file, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
                image_file = data.get("title")
                timestamp = data.get("photoTakenTime", {}).get("timestamp")

                if not image_file or not timestamp:
                    continue

                image_path = Path(json_dir) / image_file
                if image_path.exists():
                    modified_time = int(timestamp)
                    os.utime(image_path, (modified_time, modified_time))
                    print(f"Updated {image_file}")

            except Exception as e:
                print(f"Error processing {json_file}: {e}")

if __name__ == "__main__":
    update_file_modified_time("./photos")
```

## 3. Organizing for the Future

Once your metadata is restored, you need a strategy for organization.

### Immediate Next Steps
- **Fix Sorting with Metadata:** Use a script or tool to apply JSON data from the separate sidecar files directly to the image metadata. This ensures your collection is sorted correctly by the actual date taken, not the download date.
- **Remove Duplicates:** Google Takeout often includes "edited" versions of photos alongside the originals. Note that Google Photos doesn't remove the old edited photo; it keeps it but renames the new edited file with an additional number like `_1.jpg` at the end (and the number increments with every follow-up change). These old versions need to be handled if you want to keep only the latest edit. Run a deduplication tool (like `fdupes` or `rdfind` on Linux) to help.
- **Handle Extra Metadata:** What about captions, notes, or comments? Consider adding these to a sidecar markdown note with a reference to the image.
### Preservation Rules
When moving or editing your old photos, remember these golden rules:
1. **Bulk Changes:** Use tools that preserve original timestamps unless you are explicitly trying to correct them.
2. **Location Metadata:** If location data is missing, you can add it in bulk using tools like ExifTool before moving them to your final storage.
3. **Avoid "Today’s Date":** Moving or editing old photos (older than today) should *always* keep the creation or modified date. Ensure your workflow doesn’t push the date to today.

## 4. Handling it on the Go (Mobile Apps)

If you prefer to manage some of these tasks directly on your phone, here are some recommended Android apps:
- **Photo EXIF Editor:** Great for viewing and modifying EXIF data.
- **Image & Video Date Fixer:** Specifically designed to fix file dates based on metadata.
- **Cisdem Duplicate Finder:** Helpful for identifying and removing duplicate photos on your device.

## Conclusion

Transitioning away from Google Photos is a bit of work upfront, but the peace of mind knowing your memories are stored exactly how you want them is worth it. By restoring your metadata and establishing a solid organization system, you ensure that your digital library remains searchable and meaningful for years to come.

Do you have a preferred method for managing your local photo library? Let me know!

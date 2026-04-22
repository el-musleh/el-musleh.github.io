---
title:  "Linux Post-Install: My Essential Setup Guide"
date: 2024-03-09
collection: experience
published: true 
header:
  teaser: "posts/Gemini_GenAI_Linux-Setup.jpg"
categories: 
  - Technology
  - Linux
tags:
  - Linux
  - Setup
  - Productivity
  - System Administration
  - Development Environment
  - Open Source
---

<div class="notice--info" markdown="1">
**🤖 AI Disclosure:** For transparency, the content of this page was partially or mainly created with AI assistance tools.
</div>

Fresh Linux install? Welcome to the real work. Here's what I do to turn a barebones system into my daily driver.

## Software Manager Essentials

First round of apps I always install:

### Productivity & Files
- **{% include skill.html text="Bitwarden" %}** – {% include skill.html text="Password manager" %} I can't live without
- **{% include skill.html text="FreeFileSync" %}** – {% include skill.html text="File synchronization" %} between drives and network locations
- **{% include skill.html text="Obsidian" %}** – {% include skill.html text="Note-taking" %} and knowledge management
- **{% include skill.html text="OnlyOffice" %}** – {% include skill.html text="LibreOffice" %} alternative, better compatibility with Word/Excel files

### Media & Creativity
- **{% include skill.html text="GIMP" %}** – {% include skill.html text="Image editing" %} (Photoshop alternative)
- **{% include skill.html text="Pi-hole" %}** – {% include skill.html text="Network-wide ad blocking" %} at the {% include skill.html text="DNS" %} level
- **Cheese** – Webcam app for video calls
- **{% include skill.html text="DDNS" %}** – Accessible from anywhere using a memorable domain

### Utilities
- **{% include skill.html text="Diodon" %}** – {% include skill.html text="Clipboard manager" %} (Win+V to paste history)
- **Emote** – Emoji picker (Win+. to open)
- **{% include skill.html text="qbittorrent" %}** – {% include skill.html text="Download manager" %}

### Development
- **{% include skill.html text="Python3" %}**-full
- Git (usually pre-installed)

## Browser Setup

My browser stack:

- **{% include skill.html text="Chrome" %}** – Primary browser for Google ecosystem
- **{% include skill.html text="Firefox" %}** – {% include skill.html text="Privacy-focused" %} alternative
- **{% include skill.html text="Mullvad VPN" %}** – For {% include skill.html text="privacy" %} on public networks

### Firefox Tweaks

I add custom search engines and set up these extensions:
- **{% include skill.html text="uBlock Origin" %}** – {% include skill.html text="Ad blocker" %}
- OneTab – Save tab clusters for later

## Keyboard & Input

### Custom Shortcuts

| Shortcut | Action |
|----------|--------|
| Win + V | Clipboard history (Diodon) |
| Win + . | Emoji picker |
| Win + L | Lock screen |
| Win + Shift + S | Screenshot (area select) |

### Keyboard Layout

Add German and Arabic keyboards for multilingual typing.

## System Applets

- **Automatic Dark/Light Themes** – Follows sunset automatically
- **System Monitor** – CPU/RAM in the panel
- **Calendar** – Synced with Google Calendar

## Making It Feel Like Home

### Show Hidden Files & Extensions

Turn on in file manager view settings. Makes everything less mysterious.

### Screensaver & Lock Screen

Disable the default clock and background images. Keep it clean.

### Print Screen

Configure to capture selected area (not full screen) and save directly to Desktop:

```bash
gsettings set org.gnome.gnome-screenshot auto-save-directory "/home/$USER/Desktop"
```

## Connectivity

### Remote Desktop

[Remmina](https://remmina.org/) – One client for {% include skill.html text="RDP" %}, {% include skill.html text="VNC" %}, {% include skill.html text="SSH" %}, and more.

### Smart TV Streaming

**{% include skill.html text="Gnome Network Displays" %}** – {% include skill.html text="Cast screen" %} to TV via WiFi.

### VirtualBox

For running Windows apps when Linux alternatives fail. Install Guest Additions for proper integration.

## File Sync: FreeFileSync

My backup workflow:

1. Set up paired folder comparisons
2. Configure Meld as the diff tool:
   ```
   meld "%local_path%" "%local_path2%"
   ```
3. Schedule bidirectional syncs for important folders

## Linux Drivers

After a fresh install, back up your drivers:

```bash
# Find current kernel version
uname -r

# Backup modules
sudo rsync -av /lib/modules/$(uname -r)/ ~/driver_backup/

# Backup firmware
sudo rsync -av /etc/modprobe.d/ ~/driver_backup/
sudo rsync -av /lib/firmware/ ~/driver_backup/
```

## Mounting Drives on Boot

External drives need to mount automatically. Here's the method I use:

### 1. Find the UUID
```bash
sudo blkid
```

### 2. Add to /etc/fstab
```bash
UUID=YOUR-UUID /mnt/drive exfat defaults,uid=1000,gid=1000,umask=000 0 2
```

### 3. Test without rebooting
```bash
sudo mount -a
```

> **exFAT tip:** If you're mounting for Ollama or other services, use the correct UID/GID (find with `id username`).

## Voice Dictation

Want Voice-to-Text? Try these options:

- **Speech Note** (Flatpak) – Quick and easy
- **Whisper-Obsidian Plugin** – For voice notes inside Obsidian
- **nerd-dictation** – Open-source alternative to Dragon

## Flatpak App Management

For sandboxed apps, install [Flatseal](https://github.com/tchx84/Flatseal) to manage permissions without getting messy.

## Common Issues & Fixes

### Anki won't open (Qt/X11 error)

Install missing XCB libraries:
```bash
sudo apt-get install libxcb-xinerama0 libxcb-xinerama0-dev libxcb-cursor0
```

### Fingerprint login not working

Usually a driver issue—check Settings > Privacy > Login.

## What's Missing?

Still on my list:
- Full disk encryption setup
- Better backup strategy (offsite)
- Custom dotfiles management

---

*What's your post-install ritual? Drop a comment below with your must-have apps.*

---

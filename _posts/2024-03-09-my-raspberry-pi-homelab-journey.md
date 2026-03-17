---
title:  "My Raspberry Pi Homelab: From Zero to Self-Hosted"
date: 2024-03-09
collection: experience
published: true 
header:
  teaser: "posts/GenAI_Gemini_Raspberry_pi_projects.png"
categories: 
  - DIY
  - Technology
tags:
  - Raspberry-Pi
  - Homelab
  - Self-hosted
  - Linux
---

I've been running a Raspberry Pi homelab for years now. What started as a way to host my personal website turned into a full-fledged home server that handles media, downloads, ad-blocking, and more.

This is the story of what I've built—and what's still on the todo list.

## The Beginning

It started simple: I wanted a place to host my website. A cheap Raspberry Pi connected to my home internet seemed like the perfect solution. No monthly hosting fees, full control, and a great learning experience.

That was years ago. Here's what the journey looked like.

## What I've Built (So Far)

Here's my progress on the Pi—a mix of completed projects and things I'm still working on:

### Completed ✅

- **VNC Remote Control** – Control the Pi with a graphical desktop from anywhere
- **SSH & FTP** – Command-line access and file transfers over the network
- **Website Hosting** – Running Apache to serve my personal site
- **Plex Media Storage** – Movies and TV shows served to my TV
- **Pi-hole Ad Blocker** – Network-wide ad blocking at the DNS level
- **DDNS Setup** – Accessible from anywhere using a memorable domain
- **Chromecast Alternative** – Stream content to my TV using RaspiCast
- **Kali Linux** – Bootable penetration testing OS on micro-SD

### Still on the Todo List 📋

- [ ] Buy a domain name and properly host the site
- [ ] Steam Link – Stream games from my laptop to the TV via the Pi
- [ ] Docker – Learn containerization
- [ ] Personal VPN – Secure browsing from anywhere
- [ ] Bluetooth Audio – Wireless headphones connected to the Pi
- [ ] Free Proxy – Change my location virtually
- [ ] Magic Mirror – Smart display with weather, calendar, news
- [ ] Retro Gaming – Old Atari/NES emulation
- [ ] Home Security Camera – Motion detection and recording
- [ ] Mail Server – Self-hosted email (ambitious, I know)
- [ ] Relay Control – Smart home automation via GPIO pins

## The Stack

Here's what actually runs on my Pi:

| Service | Purpose | Port |
|---------|---------|------|
| Apache | Web server | 80, 443 |
| Plex Media Server | Media streaming | 32400 |
| Pi-hole | DNS-based ad blocker | 80 (admin) |
| Deluge | Torrent client | 8112 |
| Jackett | Torrent indexer integration | 9117 |
| Radarr | Movie automation | 7878 |
| Sonarr | TV show automation | 8989 |
| Lidarr | Music automation | 8686 |

## Key Configurations

### Dynamic DNS

Since my home IP changes, I use [freemyip.com](https://freemyip.com) to keep things accessible:

```bash
curl "https://freemyip.com/update?token=YOUR_TOKEN&domain=yourname.freemyip.com"
```

Set up as a cron job to update every 20 minutes.

### Port Forwarding

I forward specific ports on my router to access services externally:

- **80/443** – Web server
- **8112** – Deluge (torrent client)
- **32400** – Plex
- **7878** – Radarr

### Storage

An external HDD mounts automatically at boot via `/etc/fstab`. This holds all my media and downloads.

## Pi-hole: The Game Changer

The single most useful thing I installed was [Pi-hole](https://pi-hole.net/). It blocks ads network-wide—every device on my Wi-Fi benefits. No browser extensions needed, works on phones and smart TVs.

Access the admin panel at `http://pi.hole/admin` or via your Pi's IP address.

## Lessons Learned

1. **Static IP is crucial** – Set it in your router or via `dhcpcd.conf` so services stay reachable.

2. **Cron jobs are lifesavers** – Auto-updates, DDNS refresh, backup scripts—everything runs on autopilot now.

3. **External storage pays off** – SD cards have limited write cycles. Keep media and downloads on an external drive.

4. **Backup everything** – Docker containers, config files, cron jobs. When something breaks (and it will), you'll want a copy.

5. **Security matters** – Don't expose more than necessary. Use strong passwords, keep software updated, consider a VPN instead of opening ports.

## What's Next

The todo list is long, but that's the point. Docker is the next big learning hurdle. After that, a proper VPN so I can access everything securely from outside the home.

The beauty of a homelab is there's always something new to try.

---

*What's on your homelab todo list? Drop a comment below—I'd love to hear what projects you're working on.*

---

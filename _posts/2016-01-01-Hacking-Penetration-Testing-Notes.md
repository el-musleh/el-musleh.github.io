---
title:  "Getting Started with Penetration Testing: My Early Notes"
date: 2016-01-01
last_modified_at: 2026-03-16
collection: experience
published: true 
categories: 
  - Security
  - Hacking
tags:
  - Penetration-Testing
  - Kali-Linux
  - Security-Tools
---

> **Note:** These are my early notes from 2016 when I was learning penetration testing. Some tools have evolved, but the fundamentals remain the same.

Diving into cybersecurity was one of the most challenging but rewarding things I've done. Here's what I learned setting up my Kali Linux environment and the essential tools I used.

## Security Tools I Actually Used

Here's where the real work begins. These are tools I actually spent time learning and using.

### Web Application Testing

- {% include skill.html text="Burp Suite" %} - The industry standard intercepting proxy. Intercepts HTTP traffic between your browser and the target, lets you modify requests, repeat them, and find vulnerabilities. Essential for any web app testing.

- {% include skill.html text="OWASP Zap" %} - Free alternative to Burp. Great for automated scanning and finding common vulnerabilities like XSS and SQL injection. Good starting point for beginners.

- {% include skill.html text="sqlmap" %} - Automated SQL injection tool. Give it a URL with a vulnerable parameter and it does the rest - enumerates databases, extracts data, even gains shell access in some cases.

- {% include skill.html text="Dirb/Dirbuster" %} - Directory brute-forcing. Finds hidden directories and files on web servers by trying thousands of common paths. First step in any web assessment.

### Post-Exploitation

- {% include skill.html text="Beef Framework" %} - Browser exploitation. Hooks victim browsers and executes JavaScript, allowing you to steal cookies, capture keystrokes, and pivot to other systems.

1. {% include skill.html text="Nmap/Zenmap" %} - Network scanning. Know your targets before attacking.
2. {% include skill.html text="Metasploit" %} - The exploitation framework. Industry standard.
3. {% include skill.html text="Wireshark" %} - Packet analysis. Understand what's happening on the wire.
4. {% include skill.html text="Burp Suite" %} - Web testing. Every web pentester needs this.
6. {% include skill.html text="John the Ripper" %} - Password cracking. Essential for privilege escalation.
7. {% include skill.html text="Hydra" %} - Login brute-forcing. Test weak credentials.

## What I Learned
- Always have a lab network isolated from production
- Document everything - you'll forget the details later
- Python and Bash are your best friends for automation
- Don't just run tools - understand how they work
- Networking fundamentals are crucial

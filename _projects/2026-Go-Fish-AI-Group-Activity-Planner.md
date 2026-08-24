---
title: "Go Fish: AI-Powered Group Activity Planner"
excerpt: "A group activity planning app vibe-coded in 30 hours at the Cursor Hackathon Heilbronn (March 2026). Go Fish lets one person create an event, collect availability and preferences from the group, get LLM-generated activity suggestions, and send a confirmation email — all in one flow."
collection: projects
date: 2026-03-21
authors: ["Mohammad El Musleh"]
tags: [AI, Web Development, Vibe Coding, Git, Software Development, Hackathon, LLM, Group Planning, Express, React, PostgreSQL]
# paperurl: ""
---

<div class="notice--info" markdown="1">
**🤖 AI Disclosure:** The content here is created with AI assistance and reviewed by me. I believe in transparency about how content is made!
</div>

## Background

**Go Fish** was built at the **Cursor Hackathon Heilbronn** (March 2026), organized by CREATORS and Arkadia — a 30-hour sprint alongside 66 teams from across Europe. The event was centered on {% include skill.html text="Vibe Coding" %}: using AI-assisted development (primarily Cursor) as the main methodology, not just a helper.

The idea came from a simple frustration: group chats full of "we should do something" that never turn into actual plans because no one owns the next step.

---

## What I Built

Go Fish is a web app where one person creates an event and shares a single invite link with the group. The flow from there:

1. **Create** an event with a title, description, city, and response window
2. **Share** one invite link with the group
3. **Collect** availability and preference benchmarks from each participant
4. **Generate** ranked activity suggestions via an {% include skill.html text="LLM" %} (OpenRouter API)
5. **Finalize** by picking an option and sending an email confirmation to all participants

The output is a small shortlist of suggested activities with reasoning, not an open-ended list to argue about.

---

## Tech Stack

- **Backend**: Express (Node.js), port 3000
- **Frontend**: React (Vite), port 5173
- **Database**: PostgreSQL (Docker)
- **AI**: OpenRouter API for LLM-generated suggestions
- **Email**: Resend API for group confirmation emails
- **Optional enrichment**: Google Places, OpenWeatherMap, Foursquare, Ticketmaster (API keys, not core to the flow)
- **Deployment**: Railway (backend + frontend), also available at [go-fish-nu.vercel.app](https://go-fish-nu.vercel.app)

---

## Honest Scope

This was built in 30 hours, so there are rough edges. The Ticketmaster integration is wired up as an optional data source, not a direct booking system — the app confirms plans via email, it doesn't purchase tickets. The LLM-powered suggestions work well for the hackathon demo; a production version would benefit from better preference modeling and real-time venue data.

**Explore the full codebase:** [github.com/elmusleh/Go-Fish](https://github.com/elmusleh/Go-Fish)  
**See all hackathon projects:** [creators-ecosystem.de/de/hackathon-projects](https://www.creators-ecosystem.de/de/hackathon-projects)

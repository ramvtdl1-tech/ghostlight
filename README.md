# Ghostlight

A local-first incident exercise workspace for small software teams. Create scenarios, facilitate timed tabletop sessions, record observations and decisions, write postmortems, assign follow-up owners, and export/restore JSON backups. Built as a new standalone project for Kiroween 2026, targeting Costume Contest. Three deterministic scenarios teach release rollback, connection-pool isolation, and circuit breaking. Inspect evidence, make recovery decisions, and export a Markdown postmortem.

## Run and verify

Requires Node 18+ for tests and Python 3 for the local server; no npm install, API keys, or backend required.

```sh
npm test
npm start
```

Open http://localhost:4173. Start an exercise, select a scenario, enter a commander, record timeline entries, reveal evidence, and complete the exercise to see facilitator guidance. Edit postmortem notes and add owned action items. Download a Markdown postmortem or a JSON backup. Refresh preserves exercises. Use Scenario library to create custom exercises. Backup restore validates the file before asking to replace the workspace.

The Quick practice link opens the original scored drills. Select an incident, inspect traces, then choose the action supported by evidence. Wrong interventions reduce your score. Reset restarts the current incident. Switching incidents starts a fresh run. Progress is local to this browser; no accounts, shared sessions, or production monitoring exist. Export saves a report locally.

## Deploy

Publish the `dist` directory on any static host (Cloudflare Pages, Netlify, GitHub Pages). There is no build command. The app works at a subpath. For GitHub Pages, publish dist using a Pages deployment workflow or select a branch containing its contents. No environment variables are needed. Google Fonts is optional; system fonts work if it is blocked.

For Sites, `.openai/hosting.json` contains the registered Site identity. Hosting is owner-private by default; this must be made accessible to judges or deployed separately at a public URL before submission. Keep the application accessible without payment through January 29, 2027, 1 PM PT.

## Submission status

Read HACKATHON.md before submitting. The initial implementation and `.kiro` documents were authored by Codex, not Kiro. Merely including these documents does not satisfy the Kiro requirement. Complete meaningful development using Kiro, retain actual evidence, and write an accurate account of its contribution. Public GitHub publication, demo recording, and eligibility confirmation are still required.

## Source and privacy

`dist/engine.js` holds the pure simulation; `dist/app.js` handles browser UI and persistence; `tests` verifies scenario outcomes and scoring. No network requests carry incident data. Google Fonts may receive standard font-request metadata. User text is rendered with textContent. No third-party packages or stock assets are bundled. The abstract visual treatment is authored in CSS and text. Existing parent-workspace projects were not incorporated.

## Workspace limits

Workspace data uses a separate v2 browser storage key; original practice progress remains in its v1 key. No cloud database or concurrent collaboration is provided. Use a screen share to facilitate with teammates. Clearing browser data removes local records; JSON backups are the recovery mechanism. Storage failures are shown prominently and avoid silently overwriting unreadable data. Limits: 100 scenarios, 200 exercises, 500 timeline entries per exercise, 100 follow-ups per exercise, 5 MB imported backup. Custom scenario answers are hidden in the exercise UI but remain readable in browser source/storage; this is a facilitation tool, not a secure examination system. Multiple browser tabs are not synchronized; use one editing tab.

Workspace domain logic: `dist/workspace.js`; interface: `dist/workspace-app.js`. Tests cover lifecycle, immutable timeline events, postmortem export, backup round-trip, invalid records, and duration validation.

# Ghostlight — submission preparation

Category: Costume Contest

Live app: https://ghostlight-incident-lab.meshedcuckoo4.chatgpt.site/
Public source: https://github.com/ramvtdl1-tech/ghostlight

## Elevator pitch

Turn your team's next outage into a rehearsal: create incident scenarios, capture decisions, and leave with a postmortem and owned follow-up work.

## Inspiration

Small software teams often first practice incident response during a real outage. Ghostlight gives a facilitator a lightweight, safe workspace for rehearsing that response before customers are affected.

## What it does

Create a scenario with opening symptoms, investigation evidence, recovery guidance and prevention prompts. Start a timed exercise, name a commander, and record observations, decisions and communication. Reveal evidence during the discussion, complete the exercise, and write a postmortem with assigned action items. Export Markdown reports and JSON backups. Three ready-made scenarios and quick scored drills help teams get started.

## How it was built

Browser-native JavaScript modules, HTML and CSS. Pure domain logic validates scenarios and backup files. Local storage persists exercises on the current browser. No production connections, API keys or cloud database are needed. This is a facilitated tabletop tool, not real-time multi-user collaboration or live incident monitoring. Codex built the initial app. Authenticated Kiro CLI implemented saved-scenario editing, snapshot-preserving domain logic, and regression tests. See KIRO_USAGE.md for the exact contribution and integration checks.

## Test instructions for judges

1. Open the live app; no sign-in is required.
2. Open Scenario library and create a custom scenario.
3. Start an exercise and enter a commander/team name.
4. Add a timeline observation and reveal investigation evidence.
5. Record impact/root cause notes; add an action item and owner.
6. Complete the exercise; review facilitator guidance and export the postmortem.
7. Refresh and reopen the completed exercise to verify persistence.
8. Download a JSON backup. Restore is optional and replaces browser records after confirmation.

Local verification: run `npm test` and `npm start` from the repository root. No dependency installation is required. Open http://localhost:4173.

## Honest limits

Data stays in the current browser. There is no cloud sync, shared editing, AI diagnosis or production access. Clearing browser data removes local records, so use backups. Scenario guidance is hidden in the UI during exercises, but is not a secure exam secret. Use one editing tab.

## Required before final entry

- A public YouTube URL showing the working app in less than three minutes.
- Review the completed KIRO_USAGE.md statement for accuracy.
- Entrant confirmed age 20, India, solo, and no relevant employment/family conflicts on November 25, 2026.
- Entrant acceptance of the official rules and submission terms.

No video URL, personal eligibility, or rule acceptance has been fabricated.

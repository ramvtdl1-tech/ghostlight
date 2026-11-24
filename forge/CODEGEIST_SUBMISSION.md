# Ghostlight — Codegeist entry draft

Status: IMPLEMENTATION BUILT, DEPLOYMENT PENDING. Not ready for final submission.

Category: Apps for Software Teams

Elevator pitch: Turn Jira incident context into practical rehearsals, actionable follow-up issues, and Confluence postmortems—so software teams learn before the next outage.

## Inspiration

Incident lessons often live across Jira work and Confluence documentation. Ghostlight brings that context into a rehearsal and turns the discussion back into tracked work and shared learning.

## What it does

A facilitator selects a Jira incident, reviews its context, and starts a timeboxed exercise. They record observations, decisions and communication while the source incident remains unchanged. On completion, they save the postmortem, create follow-up Jira issues, and publish the timeline and findings to Confluence.

## Technology requirement

The new implementation uses Atlassian Forge global-page modules, Custom UI, Forge bridge/resolvers, KVS persistence and Jira/Confluence APIs using the signed-in user's permissions. manifest.yml defines the modules, resource and scopes. The public static app alone does not meet this requirement. Registration, deployment and a judge installation link are pending developer authentication.

## Existing-work disclosure

Ghostlight began as a standalone Kiroween project in November 2026. This entry rebuilds the relevant workflow as a distinct Forge implementation during Codegeist's submission period. Existing artwork/styles and concept are disclosed. The Forge backend, user-isolated persistence, Jira context and write integration, and Confluence publishing are newly authored for this version. Codegeist rules allow projects rebuilt on Forge during the submission period. The earlier Kiro contribution applies to the standalone version; no Kiro authorship is claimed for this Forge code.

## Testing evidence

8 adapter-based integration/domain tests pass and the Custom UI bundles successfully. 14 original app tests pass. Live Forge integration, installation and distribution have NOT yet been verified and must be completed before submitting.

## Required outstanding artifacts

- Registered Forge app ID and successful lint/deploy/install.
- Real production installation link with judge setup instructions.
- Actual end-to-end demonstration against Jira and Confluence.
- Public YouTube video under five minutes.
- Entrant review/acceptance of rules and final submission.

## Five-minute demo outline

0:00–0:25: Problem: context and incident learning are disconnected.
0:25–1:10: Inspect a real test Jira issue inside the Forge app.
1:10–2:00: Start rehearsal, record a decision and save root-cause notes.
2:00–2:50: Complete exercise, create follow-up work; open the real Jira issue.
2:50–3:40: Publish to a chosen test Confluence space; open the real page.
3:40–4:15: Explain server-derived user isolation, source permission checks, and write controls.
4:15–4:40: Show Forge manifest and tests; disclose reused standalone concept and current limits.

Do not record a mock API path as though it were a live integration.

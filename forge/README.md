# Ghostlight for Atlassian — Codegeist 2026

This is a separate Forge implementation of Ghostlight, targeting **Apps for Software Teams**. The GitHub Pages app is the original Kiroween edition; it is not a Forge installation or a substitute for the required Codegeist installation link.

## Implemented

- Native Jira and Confluence global-page modules with bundled Custom UI.
- Read an accessible Jira issue's summary, description, status, priority, assignee, related issue links and update time as the signed-in user.
- Start a timeboxed rehearsal with a snapshot of issue context; source issue stays unchanged.
- Persist private exercise records in Forge KVS, keyed by a hash of the server-supplied account ID. Payloads cannot choose their owner.
- Capture timestamped observations, decisions, communication, and saved postmortem notes.
- After completion, explicitly create real follow-up Jira issues in the source project, using available non-subtask issue types.
- Explicitly publish an escaped postmortem into a chosen accessible Confluence space. Recorded page IDs prevent ordinary repeat publication.

## Current validation status

UI bundle builds successfully. Eight Forge domain/service tests pass using injected SDK adapters; fourteen original application tests also pass. Tests verify lifecycle, account isolation, revoked source permissions, completion gates, allowed issue types, escaping and external-write/storage partial failure reporting. JavaScript syntax checks pass.

**Not yet registered, deployed, installed, or tested against a live Atlassian site.** The Forge CLI has no authenticated developer session. `forge lint` stops at missing registered app details. `manifest.yml` intentionally has no invented app ID; `forge register` must supply a real one. No judge installation URL exists yet. Do not claim Codegeist eligibility or a working Forge installation until these steps are completed.

## Local build

Use a supported Node release (the installed official Forge CLI 16 requires Node ^22.23.4, ^24.22.1, or >=26.12.1). From this folder:

```sh
npm ci
npm test
npm run build
```

The Custom UI requires Forge bridge context. Opening build output directly in a browser intentionally reports connection failure; there is no fallback mock environment pretending to be a live installation.

## Register and deploy

Install the official `@forge/cli` and follow Atlassian's authentication instructions. Keep credentials out of source and chat. The account owner should create/manage API credentials and enter the token directly into the local `forge login` prompt. A development site with Jira and Confluence is needed for the full workflow.

```sh
forge login
forge register
forge lint
forge deploy --environment development
forge install --environment development --product jira --site YOUR-SITE.atlassian.net
forge install --environment development --product confluence --site YOUR-SITE.atlassian.net
```

Check current CLI help if prompted for a developer space. Installation requests the scopes in manifest.yml; review and consent as the site owner. Never install into a real work site without its owner's authorization. Use a development site and non-sensitive incident data for the demo.

After live verification:

```sh
forge deploy --environment production
```

In the developer console, enable app sharing/distribution and copy the actual production installation link. Configure access according to Atlassian's sharing instructions. Provide that link and both-product installation instructions to judges. Keep the app functional through February 3, 2027, 5 PM Pacific, the judging end.

Official references:
- https://developer.atlassian.com/platform/forge/getting-started/
- https://developer.atlassian.com/platform/forge/cli-reference/login/
- https://developer.atlassian.com/platform/forge/distribute-your-apps/
- https://codegeist2026.devpost.com/rules

## Live acceptance walkthrough

1. On a test site, create a Jira project with a Task issue type and a source issue describing an outage. Use only test data.
2. Open Apps → Ghostlight in Jira, inspect the issue by key, and verify the returned fields match Jira.
3. Start an exercise; capture a decision, save summary and root cause, refresh, and reopen the exercise.
4. Complete it. Load issue types, create one follow-up and verify its summary, description, label and source project in Jira.
5. Load Confluence spaces and choose a test space. Publish the postmortem, open the page and verify the full timeline and follow-up keys.
6. Click publish again and verify a second page is not created for a recorded page ID.
7. Sign in as a different user: the first user's private exercises must not be listed or retrievable.
8. Revoke access to the source issue and verify get/update operations fail.

## Limitations

No AI model, Rovo, MCP or Teamwork Graph integration is claimed. No source-issue modification is performed. Context fields may be absent if Jira fields are hidden. Listing shows up to 100 exercises and up to 100 Confluence spaces. Use a single editing tab per exercise: storage updates use last-write-wins and are not collaborative transactions. There is no automatic cleanup/deletion flow yet. KVS retains data until app lifecycle cleanup or an authorized administrator removes it.

API writes are not automatically retried. Jira/Confluence may succeed before persisting a local reference fails; the error includes the created identifier and warns against retrying. Simultaneous publication from multiple tabs can create duplicates. Review the destination and use one editor.

Issue creation currently supports standard projects whose additional required fields have defaults or are not required. Complex field configurations need custom field controls before production rollout. Issue types and spaces are limited to the first API page. Confluence functionality requires the app and the user to have the necessary cross-product access on the same site; this must be verified during installation.

All app data remains within Forge storage and Atlassian APIs. No external egress, API tokens or customer data are embedded in Custom UI. Requests use asUser so product permissions apply.

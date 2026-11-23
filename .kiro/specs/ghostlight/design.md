# Design

Codex-authored planning input. Static ES modules, no backend or API secrets. Pure scenario state machine in dist/engine.js. UI in app.js uses textContent. localStorage persists scenario ID and action IDs; replay through the engine prevents trusting arbitrary persisted scores. Export uses a Blob and revokes its object URL. Test outcomes separately from rendering. CSS supplies the original haunted operations-console aesthetic.

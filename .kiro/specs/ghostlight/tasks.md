# Development tasks

Initial implementation by Codex:
- [x] Three scenarios and pure state machine.
- [x] Responsive UI, persistence, reset and export.
- [x] Engine regression tests and deployment instructions.

Completed by Kiro (Kiroween 2026):
- [x] Added `editScenario(db, id, fields)` to `dist/workspace.js`. Validates all fields through the existing `scenario()` validator, preserves the original scenario ID, replaces only the matching library entry, and returns a new db object without touching session snapshots.
- [x] Added `openEdit()`, `resetScenarioDialog()` helpers and `editingId` state to `dist/workspace-app.js`. Each library card now has an Edit scenario button that pre-fills the existing scenario dialog, sets its title to "Edit scenario", and on submit calls `editScenario` instead of pushing a new entry. Cancel and close both reset the dialog back to create mode.
- [x] Added `id="scenario-dialog-title"` to the scenario dialog heading in `dist/workspace.html` so the JS can switch the label between "Create a scenario" and "Edit scenario".
- [x] Added four regression tests in `tests/workspace.test.js` covering: ID preservation after edit, session snapshot isolation, rejection of an unknown ID, and rejection of invalid fields. All 14 tests pass (`npm test`).
- [x] Updated README.md and this spec to reflect actual changes.

Proposed work, not yet performed:
- [ ] Add a fourth scenario with progressive evidence and regression tests.
- [ ] Review and improve keyboard navigation and screen reader announcements.

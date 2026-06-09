# PROJECT_CONTEXT.md

## Project

Terminumfrage-Tool / Mini-Doodle for the BZZ CI/CD module. The current app is a standalone React + Vite + TypeScript frontend that stores polls in browser localStorage under `terminumfrage.polls.v1`.

## Current Architecture

- Frontend only: `src/`
- Routing: `/create`, `/poll/:pollId`, `/poll/:pollId/results` is intended
- Data model: Poll, Option/PollOption, Vote, VoteValue
- Persistence: localStorage, no backend/database yet
- Documentation: `README.md`, `docs/requirements.md`, `docs/data-model.md`, `docs/LU18.A04_STARTPLAN.md`
- CI: `.github/workflows/frontend_job.yml` intended for install, format-check, lint-check, test coverage

## Critical State

The repository currently contains unresolved merge-conflict markers in source, docs, config, and `package.json`. Because of this, `package.json` is invalid JSON and npm commands cannot run. First priority is resolving conflicts without losing intended features.

## CI/CD Target Evidence

BZZ expects visible evidence for formatter/linter, tests, Sonar, Jenkins/GitHub pipeline, deployment, secrets, Docker/monitoring, and final presentation docs. The reference repo uses separate frontend/backend/database folders, reusable GitHub workflows, Jenkinsfile, Sonar config, README badges, coverage artifacts, and deployment scripts. This project can either remain frontend-only with a documented scope decision or add backend/database work for backend-specific learning units.

## Safe Work Order

1. Resolve all conflict markers and restore valid JSON/TS/YAML/Markdown.
2. Add/commit a lockfile and verify local commands.
3. Make formatter/linter/test scripts non-mutating for CI checks.
4. Stabilize GitHub Actions frontend pipeline.
5. Add Sonar/Jenkins/deployment evidence.
6. Add missing tests, E2E, security/secrets docs, Docker, and final README/screenshots.

## Verification Commands

Start with `rg -n "^(<<<<<<<|=======|>>>>>>>)" -S .`, `git diff --check`, `npm install`, `npm run format-check`, `npm run lint-check`, `npm run test-coverage`, `npm run tsc`, and `npm run build` once conflicts are resolved.

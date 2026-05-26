# LU01-LU16 Evidence Matrix

Date: 2026-05-26

This file collects the current repository evidence for the BZZ CI/CD project. It links learning-unit proof to files, commits, and repeatable verification commands. Where evidence depends on an external service, the limitation is listed explicitly.

## Verification Baseline

Run from the repository root:

```bash
npm install
npm audit
npm run format-check
npm run lint-check
npm run test-coverage
npm run tsc
npm run build
```

Latest local evidence:

- Formatter: passed
- Linter: passed
- Tests: passed, 2 test files / 5 tests
- Coverage: LCOV generated at `coverage/lcov.info`
- TypeScript: passed
- Production build: passed with Vite 8
- Audit: 0 vulnerabilities
- Conflict markers: no matches from repository-wide marker scan

## Commit Evidence

| Commit    | Evidence                                                                           |
| --------- | ---------------------------------------------------------------------------------- |
| `f0af205` | Resolved merge conflicts, restored valid package/config/source/docs/workflow state |
| `e737888` | Added Jenkins frontend pipeline                                                    |
| `d688058` | Added Sonar config and CI/CD evidence notes                                        |
| `9f10f36` | Added static build artifact upload and deployment docs                             |
| `6c69687` | Added storage edge tests and VoteTable aggregation test                            |
| `2fbaff1` | Resolved npm audit findings with Vite/Vitest toolchain upgrade                     |
| `8206e68` | Added frontend Docker image definition and nginx SPA fallback                      |
| `396b776` | Added `.env.example` and secrets documentation                                     |

## Learning Unit Matrix

| LU   | Current Evidence                                                                                    | Files / Commands                                                                                              | Status                                         |
| ---- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| LU01 | Repository/task setup and issue backlog exist. Agent backlog #29-#41 tracks CI/CD and quality work. | `LU01.A01_REPOSITORY_UND_TASKS.md`, GitHub Issues                                                             | Complete                                       |
| LU02 | Local frontend project can be installed, built, and run with npm.                                   | `package.json`, `package-lock.json`, `npm install`, `npm run dev`, `npm run build`                            | Complete                                       |
| LU03 | Source structure, routing, and data model are documented and implemented.                           | `src/App.tsx`, `src/types/poll.ts`, `docs/data-model.md`, `docs/LU18.A04_STARTPLAN.md`                        | Complete                                       |
| LU04 | CI quality gates are represented in GitHub Actions and Jenkins.                                     | `.github/workflows/frontend_job.yml`, `Jenkinsfile`                                                           | Complete, Jenkins runtime not executed locally |
| LU05 | Automated tests and coverage run locally.                                                           | `src/utils/storage.test.ts`, `src/components/VoteTable.test.tsx`, `vitest.config.ts`, `npm run test-coverage` | Complete, page-level test gap tracked in #41   |
| LU06 | Formatter and linter checks are configured as non-mutating CI commands.                             | `.prettierrc.json`, `.prettierignore`, `eslint.config.js`, `npm run format-check`, `npm run lint-check`       | Complete                                       |
| LU07 | TypeScript validation and production build are reproducible.                                        | `tsconfig*.json`, `vite.config.ts`, `npm run tsc`, `npm run build`                                            | Complete                                       |
| LU08 | Sonar configuration exists and consumes LCOV coverage.                                              | `sonar-project.properties`, `coverage/lcov.info`, `docs/ci-cd-evidence.md`                                    | Complete, external Sonar token/server required |
| LU09 | Security dependency audit is clean.                                                                 | `npm audit`, `package.json`, `package-lock.json`                                                              | Complete                                       |
| LU10 | Static frontend deployment artifact is produced by CI.                                              | `.github/workflows/frontend_job.yml`, `docs/static-deployment.md`, `dist/` from `npm run build`               | Complete                                       |
| LU11 | Jenkins pipeline evidence exists for frontend install/check/test/build stages.                      | `Jenkinsfile`                                                                                                 | Complete, external Jenkins controller required |
| LU12 | Docker runtime artifact is defined for the static frontend.                                         | `Dockerfile`, `.dockerignore`, `nginx.conf`                                                                   | Complete, local Docker daemon was unavailable  |
| LU13 | Secrets and environment handling are documented.                                                    | `.env.example`, `docs/secrets.md`, `.gitignore`                                                               | Complete                                       |
| LU14 | Documentation explains app setup, data model, CI/CD evidence, deployment, and secrets.              | `README.md`, `docs/*.md`                                                                                      | Complete                                       |
| LU15 | Source-of-truth verification evidence is recorded in GitHub issue closure comments.                 | Closed issues #29-#40                                                                                         | Complete                                       |
| LU16 | Remaining improvement backlog is tracked instead of hidden.                                         | Issue #41 for page-level tests                                                                                | In progress / follow-up                        |

## External Limitations

- **Sonar:** A real scan needs `SONAR_HOST_URL` and `SONAR_TOKEN`.
- **Jenkins:** The Jenkinsfile is committed and local npm commands pass, but no Jenkins controller is configured in this workspace.
- **Docker:** Docker CLI exists, but the Docker Desktop Linux engine pipe was unavailable, so the image build could not run locally.
- **Deployment:** The static artifact path is configured. Publishing to a real host needs provider-specific credentials or manual upload.

## Open Follow-Up

- #41: add page-level tests for create, vote, and results flows.

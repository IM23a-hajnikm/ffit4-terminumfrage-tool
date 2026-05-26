# CI/CD Evidence

## Local Quality Gates

The frontend pipeline is verified with these commands:

```bash
npm install
npm run format-check
npm run lint-check
npm run test-coverage
npm run tsc
npm run build
```

## Coverage Artifact

`npm run test-coverage` writes coverage output to `coverage/`.

The SonarQube/SonarCloud configuration expects LCOV at:

```text
coverage/lcov.info
```

## Sonar Configuration

`sonar-project.properties` defines:

- project key and name
- UTF-8 source encoding
- `src` as source and test root
- test inclusions for Vitest test files
- generated artifact exclusions
- LCOV coverage report path

## External Secrets

Running a Sonar scan requires a configured Sonar host and token, for example:

- `SONAR_HOST_URL`
- `SONAR_TOKEN`

These values must be stored in GitHub Actions/Jenkins secrets or the local shell environment. They must not be committed.

## Current Local Evidence

The project currently verifies locally with formatter, linter, typecheck, test coverage, and production build commands. A real Sonar quality-gate result can only be produced after the external Sonar server/token are configured.

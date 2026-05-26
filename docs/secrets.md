# Secrets And Environment Variables

## Local Development

Copy `.env.example` to `.env` when local overrides are needed.

```bash
cp .env.example .env
```

Only use non-secret values for `VITE_*` variables because Vite exposes them to the browser bundle.

## Frontend Variables

| Variable               | Purpose                                                        | Secret |
| ---------------------- | -------------------------------------------------------------- | ------ |
| `VITE_APP_NAME`        | Display/build metadata for the app name                        | No     |
| `VITE_APP_ENV`         | Local/staging/production marker                                | No     |
| `VITE_PUBLIC_BASE_URL` | Public URL used in deployment documentation or external checks | No     |

## CI/CD Secrets

Store these values in the CI system, not in Git:

| Variable            | Purpose                          | Where to store                                            |
| ------------------- | -------------------------------- | --------------------------------------------------------- |
| `SONAR_HOST_URL`    | SonarQube/SonarCloud server URL  | GitHub Actions secret, Jenkins credential, or local shell |
| `SONAR_PROJECT_KEY` | Sonar project key                | GitHub Actions variable/Jenkins env or local shell        |
| `SONAR_TOKEN`       | Sonar authentication token       | GitHub Actions secret or Jenkins credential               |
| `DEPLOY_TARGET`     | Static hosting target identifier | CI variable                                               |
| `DEPLOY_TOKEN`      | Static hosting/deployment token  | GitHub Actions secret or Jenkins credential               |

## Handling Rules

- Do not commit `.env` files.
- Do not commit real tokens in `.env.example`.
- Rotate any token immediately if it is committed or pasted into an issue/comment.
- Prefer short-lived or scoped tokens where the provider supports them.
- Keep GitHub Actions on repository secrets and Jenkins on credentials bindings.
- Sonar and deployment commands should fail closed when required secrets are missing.

## Verification

Use these checks before committing configuration changes:

```bash
rg -n "BEGIN[ ]PRIVATE[ ]KEY" . -g "!.git" -g "!node_modules"
npm run format-check
npm run lint-check
npm run build
```

For provider-specific token prefixes, prefer a dedicated scanner such as `gitleaks` or `trufflehog` so the detection rules do not live in the repository docs.

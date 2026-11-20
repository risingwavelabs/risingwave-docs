# Note

This repository contains the latest RisingWave documentation. [The old repository](https://github.com/risingwavelabs/risingwave-docs-legacy) now hosts the archived documentation up to v2.0 of RisingWave.

# Documentation structure

Below are the main topic groups. Some groups are elevated to be tabs shown on the top of a documentation page.

- get-started
- demos
- sql
- ingestion
- processing
- delivery
- deploy
- operate
- python-sdk
- client-libraries
- performance
- troubleshoot
- integrations
- faq
- reference
- cloud
- changelog

### Development

The Mintlify CLI package was renamed from `mintlify` to [`mint`](https://www.npmjs.com/package/mint). Either works, but `mint` is the current recommended form for local development.

Note: some repository automation and CI checks may still use the legacy `mintlify` command name (for example, broken-links checks), so you may see either form in this repo.
Run the dev server from the repo root (where `docs.json` lives) — no global install needed:

```
npx mint@latest dev
```

Pass `--port <N>` if the default port is in use, e.g. `npx mint@latest dev --port 3333`.

If you prefer a global install:

```
npm i -g mint
mint dev
```

### Publishing Changes

Install our GitHub App to automatically propagate changes from your repo to your deployment. Changes will be deployed to production automatically after pushing to the default branch. Find the link to install on your dashboard.

#### Troubleshooting

- Dev server isn't running — run `mint install` to reinstall dependencies.
- Page loads as a 404 — make sure you're running in a folder with `docs.json` (the config was previously `mint.json`; Mintlify renamed it).

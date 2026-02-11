
# Note

This repository contains the latest RisingWave documentation. [The old repository](https://github.com/risingwavelabs/risingwave-docs-legacy) now hosts the archived documentation up to v2.0 of RisingWave.

## Need help or found an issue?

If you encounter any issues with RisingWave or have questions, please see our guide on [how to report and reproduce issues](https://docs.risingwave.com/troubleshoot/report-reproduce-issues) for effective bug reporting and support.

You can also:
- Ask questions in our [Slack Community](https://www.risingwave.com/slack)
- File issues on [GitHub](https://github.com/risingwavelabs/risingwave/issues/new/choose)

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

Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify) to preview the documentation changes locally. To install, use the following command

```
npm i -g mintlify
```

Run the following command at the root of your documentation (where mint.json is)

```
mintlify dev
```

### Publishing Changes

Install our Github App to auto propagate changes from your repo to your deployment. Changes will be deployed to production automatically after pushing to the default branch. Find the link to install on your dashboard. 

#### Troubleshooting

- Mintlify dev isn't running - Run `mintlify install` it'll re-install dependencies.
- Page loads as a 404 - Make sure you are running in a folder with `mint.json`

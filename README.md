

# RisingWave user documentation

This repository contains the source content for the RisingWave user documentation. The content is published to the docs website by [Docusaurus 2](https://docusaurus.io/), which you can use to build the docs locally.


# Contribute to RisingWave docs

To help us improve the RisingWave documentation, you can:

* Open a [GitHub issue](https://github.com/singularity-data/risingwave-docs/issues) to let us know something is incorrect or inaccurate.
* Submit a [pull request](https://github.com/singularity-data/risingwave-docs/pulls) with the proposed changes.

If you are not familiar with writing on GitHub, get started by reading [Basic writing and formatting syntax on GitHub](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

 # Build the docs locally


## Get the source code:
Clone the repository:

```
 $ git clone git@github.com:singularity-data/risingwave-docs.git
```

## Prerequisites

Install [NodeJS](https://nodejs.org/en/download/)

Install `yarn` in your dev machine.

```
$ npm install --global yarn
```

## Local Development

Install dependencies

```
$ yarn
```

Start a hot-reload development server at port 3000

```
$ yarn start
```

## Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.


### npm
> npm run docusaurus docs:version 1.1.0

### yarn
> yarn run docusaurus docs:version 1.1.0

## Deploy your site
### npm
> npm run build

### yarn
> yarn run build

Simply, run this command.
### npm
> npm run serve

### yarn
> yarn run serve
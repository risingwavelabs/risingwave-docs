# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Get the source code:
Clone the repository:

```
 $ git clone git@github.com:singularity-data/risingwave-docs.git
```
If this is your first time using Github, review http://help.github.com to learn the basics.

## Requirements
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

# How do you do Versioning?
Get started by **creating a new version**.

Or **try Docusaurus immediately** with **[Docusaurus Versioning](https://docusaurus.io/docs/next/versioning)**.

A typical versioned doc site looks like below:

```
website
├── sidebars.json        # sidebar for the current docs version
├── docs                 # docs directory for the current docs version
│   ├── foo
│   │   └── bar.md       # https://mysite.com/docs/next/foo/bar
│   └── hello.md         # https://mysite.com/docs/next/hello
├── versions.json        # file to indicate what versions are available
├── versioned_docs
│   ├── version-1.1.0
│   │   ├── foo
│   │   │   └── bar.md   # https://mysite.com/docs/foo/bar
│   │   └── hello.md
│   └── version-1.0.0
│       ├── foo
│       │   └── bar.md   # https://mysite.com/docs/1.0.0/foo/bar
│       └── hello.md
├── versioned_sidebars
│   ├── version-1.1.0-sidebars.json
│   └── version-1.0.0-sidebars.json
├── docusaurus.config.js
└── package.json
```

The versions.json file is a list of version names, ordered from newest to oldest.

## Terminology
Note the terminology we use here.

### Current version
The version placed in the ./docs folder.

### Latest version / last version
The version served by default for docs navbar items. Usually has path /docs.

## Tagging a new version
> First, make sure the current docs version (the ./docs directory) is ready to be frozen.
> Enter a new version number.

### npm
> npm run docusaurus docs:version 1.1.0

### yarn
> yarn run docusaurus docs:version 1.1.0

**When tagging a new version, the document versioning mechanism will:**
- Copy contents into a new versioned_docs/version-[versionName]/ folder.
- Create a versioned sidebars file based from your current sidebar configuration (if it exists) - saved as versioned_sidebars/version-[versionName]-sidebars.json.
- Append the new version number to versions.json.

# How do you do Internationalization?
Get started by **creating a new version**.

Or **try Docusaurus immediately** with **[Docusaurus Versioning](https://docusaurus.io/docs/next/i18n/introduction)**.

A typical versioned doc site looks like below:

```
RISINGWAVE-DOCS/i18n
└── fr
    ├── code.json  # Any text label present in the React code
    │              # Includes text labels from the themes' code
    ├── docusaurus-plugin-content-blog # translation data the blog plugin needs
    │   └── 2020-01-01-hello.md
    │
    ├── docusaurus-plugin-content-docs # translation data the docs plugin needs
    │   ├── current
    │   │   ├── doc1.md
    │   │   └── doc2.mdx
    │   ├── version-1.0.0
    │   │   ├── doc1.md
    │   │   └── doc2.mdx
    │   ├── current.json
    │   └── version-1.0.0.json
    │
    └── docusaurus-theme-classic # translation data the classic theme needs
        ├── footer.json   # Text labels in your footer theme config
        └── navbar.json   # Text labels in your navbar theme config
```

The JSON files are initialized with ```the docusaurus write-translations``` CLI command. Each plugin sources its own translated content under the corresponding folder, while the code.json file defines all text labels used in the React code.

Each content plugin or theme is different, and **defines its own translation files location:**
- [Docs i18n](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#i18n)
- [Blog i18n](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog#i18n)
- [Pages i18n](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages#i18n)
- [Themes i18n](https://docusaurus.io/docs/api/themes/configuration#i18n)

## Site configuration
Use the site i18n configuration to declare the i18n locales:

```docusaurus.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'fa'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
      // You can omit a locale (e.g. fr) if you don't need to override the defaults
      fa: {
        direction: 'rtl',
      },
    },
  },
};
```

## Start your site
### npm
> npm run start -- --locale fr

### yarn
> yarn run start -- --locale fr

Your site is accessible at ```http://localhost:3000/fr/```.

## Translate plugin data
JSON translation files are used for everything that is interspersed in your code:
- React code, including the translated labels you have marked above
- Navbar and footer labels in theme config
- Docs sidebar category labels in sidebars.js
- Blog sidebar title in plugin options

Run the write-translations command:
### npm
> npm run write-translations -- --locale fr

### yarn
> yarn run write-translations -- --locale fr

## Deploy your site
### npm
> npm run build

### yarn
> yarn run build

Docusaurus will build **one single-page application per locale:**
- ```website/build```: for the default, English language
- ```website/build/fr```: for the French language

You can now [deploy](https://docusaurus.io/docs/next/deployment) the build folder to the static hosting solution of your choice.

Simply, run this command.
### npm
> npm run serve

### yarn
> yarn run serve
# Translate the blog
mkdir -p i18n\fr\docusaurus-plugin-content-blog
ROBOCOPY blog i18n\fr\docusaurus-plugin-content-blog /S

# Translate the pages
mkdir -p i18n\fr\docusaurus-plugin-content-pages
ROBOCOPY src\pages i18n\fr\docusaurus-plugin-content-pages *.md /S
ROBOCOPY src\pages i18n\fr\docusaurus-plugin-content-pages *.mdx /S

# Translate the docs
mkdir -p i18n\fr\docusaurus-plugin-content-docs\current
ROBOCOPY docs i18n\fr\docusaurus-plugin-content-docs\current /S

mkdir -p i18n\fr\docusaurus-plugin-content-docs\version-1.0.0
ROBOCOPY versioned_docs\version-1.0.0 i18n\fr\docusaurus-plugin-content-docs\version-1.0.0 /S
# RisingWave Documentation Copilot Instructions

This document provides comprehensive guidance for AI copilots working on the RisingWave documentation repository. Follow these instructions to maintain consistency, quality, and accuracy across all documentation contributions.

## Repository Overview

This is the official documentation repository for RisingWave, a real-time streaming database platform. The documentation is built using Mintlify and follows a specific structure and style guide.

### Key Documentation Areas

1. **Get Started** - Introduction, quickstart, architecture, and use cases
2. **Python SDK** - Python client library documentation  
3. **Client Libraries** - Language-specific client guides (Go, Node.js, Python, Ruby, Java)
4. **RisingWave Console** - Management interface documentation
5. **Apache Iceberg™** - Iceberg integration and table management
6. **SQL Reference** - Complete SQL syntax, functions, and commands
7. **User-Defined Functions** - UDF development guides
8. **Deploy & Operate** - Deployment and operational guides
9. **Performance** - Optimization and troubleshooting
10. **Cloud** - RisingWave Cloud platform documentation
11. **Changelog** - Release notes and support policies

## Documentation Structure and Format

### File Organization

- **Main sections** are organized in top-level directories (e.g., `get-started/`, `sql/`, `cloud/`)
- **Subsections** use nested directories for logical grouping
- **All content files** use `.mdx` extension (Markdown + JSX)
- **Images** are stored in `/images/` with descriptive subdirectory organization
- **Shared components** are in `/snippets/`

### Frontmatter Requirements

Every `.mdx` file must include frontmatter with these fields:

```mdx
---
title: "Page Title"
description: "Brief description of the page content"
sidebarTitle: "Short title for navigation"  # Optional
mod: wide  # Optional - for wide layout
---
```

### Content Style Guidelines

#### Writing Style

- **Use clear, concise language** - Avoid jargon unless necessary
- **Active voice** - "RisingWave supports" not "is supported by RisingWave"
- **Present tense** - "RisingWave provides" not "RisingWave will provide"
- **Second person** - "You can create" not "Users can create"
- **Consistent terminology** - Use approved RisingWave terminology throughout

#### Technical Accuracy

- **Verify all SQL syntax** - Test commands before documenting
- **Use realistic examples** - Provide practical, working code samples
- **Include version information** - Note when features were introduced
- **Cross-reference related content** - Link to relevant sections

#### Visual Elements

- **Use proper image formatting**:
  ```mdx
  <Frame>
    <img src="/images/path/to/image.png" alt="Descriptive alt text"/>
  </Frame>
  ```
- **Include alt text** for all images for accessibility (note: current documentation has inconsistent alt text usage)
- **Use consistent screenshot dimensions** where possible
- **Organize images** in logical subdirectories under `/images/`

### Component Usage

#### Cards and CardGroups

```mdx
<CardGroup>
  <Card
    title="Feature Name"
    icon="icon-name"
    iconType="solid"
    href="/path/to/page"
  >
    Brief description
  </Card>
</CardGroup>
```

#### Buttons

```mdx
import { Button } from '/snippets/button.mdx';

<Button href="/path/to/page">
  Button Text
</Button>

<Button href="https://external-url.com" target="_blank">
  External Link
</Button>
```

#### Code Blocks

Use appropriate language tags and include descriptive titles:

```sql Create the source
CREATE SOURCE kafka_source (
  column1 VARCHAR,
  column2 INTEGER
) WITH (
  connector = 'kafka',
  topic = 'my_topic',
  properties.bootstrap.server = 'localhost:9092'
);
```

#### Notes and Warnings

```mdx
<Note>
  Important information that users should be aware of.
</Note>

<Warning>
  Critical warnings about potential issues or limitations.
</Warning>
```

#### Tabs for Multiple Options

```mdx
<Tabs>
  <Tab title="Option 1">
    Content for first option
  </Tab>
  <Tab title="Option 2">
    Content for second option
  </Tab>
</Tabs>
```

#### Steps for Procedures

```mdx
<Steps>
  1. First step description
  2. Second step description
  3. Final step description
</Steps>
```

## Common Documentation Patterns

### Getting Started Content

1. Start with overview and value proposition
2. Provide architecture context
3. Include quickstart with immediate results
4. Link to deeper documentation

### SQL Reference Content

1. Command syntax with proper formatting
2. Parameter descriptions
3. Usage examples
4. Related commands and see-also links

### Integration Guides

1. Prerequisites and setup requirements
2. Step-by-step configuration
3. Connection testing
4. Troubleshooting tips

### Troubleshooting Content

1. Problem description
2. Common causes
3. Diagnostic steps
4. Resolution procedures

## Quality Assurance Checklist

Before submitting any documentation changes:

### Content Review
- [ ] Frontmatter complete and accurate
- [ ] Title and description are SEO-friendly
- [ ] Content follows style guidelines
- [ ] Technical information is accurate and tested
- [ ] Examples are functional and realistic
- [ ] Links are working and point to correct destinations
- [ ] Images have proper alt text and are optimized

### Technical Review
- [ ] SQL syntax is valid and tested
- [ ] Code examples run without errors
- [ ] File paths and references are correct
- [ ] Navigation structure is logical
- [ ] Cross-references are appropriate

### Formatting Review
- [ ] Consistent heading hierarchy
- [ ] Proper use of MDX components
- [ ] Images formatted correctly
- [ ] Code blocks have language tags
- [ ] Lists and tables are properly formatted

## Common Tasks and Workflows

### Adding New Documentation

1. **Determine appropriate location** in navigation structure
2. **Create new `.mdx` file** with proper frontmatter
3. **Follow content template** for the documentation type
4. **Add to `mint.json` navigation** if it's a new page
5. **Test locally** using `mintlify dev`
6. **Review for quality** using the checklist above

### Updating Existing Documentation

1. **Check current content** for accuracy and relevance
2. **Update version information** if applicable
3. **Refresh examples** with current best practices
4. **Verify all links** still work
5. **Test any code examples**
6. **Review related pages** for consistency

### Adding New Integrations

1. **Create integration guide** in appropriate section
2. **Include prerequisites** and setup steps
3. **Provide configuration examples**
4. **Add troubleshooting section**
5. **Update overview pages** to include new integration
6. **Consider creating demo** if integration is significant

## Version Management

- **Current version** is maintained in `mint.json` line 91: `"Current (v2.5)"`
- **Feature availability** should be noted in documentation
- **Deprecated features** should be clearly marked
- **Migration guides** provided for breaking changes

## SEO and Discoverability

### Meta Tags
- Use descriptive, keyword-rich titles
- Write compelling meta descriptions
- Include relevant keywords naturally in content

### Internal Linking
- Link to related concepts and guides
- Use descriptive anchor text
- Maintain logical information hierarchy

### URL Structure
- Use kebab-case for file names
- Keep URLs short but descriptive
- Maintain consistent URL patterns

## Development Workflow

### Local Development

1. Install Mintlify CLI: `npm i -g mintlify`
2. Run development server: `mintlify dev`
3. Test changes locally before committing
4. Check console for build errors

### Deployment Process

1. Changes are automatically deployed on merge to main branch
2. GitHub App handles propagation to production
3. Review deployment status in repository

## Troubleshooting Common Issues

### Build Failures
- Check for syntax errors in MDX files
- Verify all imports are correct
- Ensure images exist at specified paths
- Check `mint.json` for navigation errors

### Content Issues
- Verify all links work correctly
- Check image loading and formatting
- Test code examples for accuracy
- Review navigation structure

### Performance Issues
- Optimize large images
- Minimize use of heavy components
- Check for broken links or resources

## Contact and Support

For questions about documentation standards or technical content:
- Review existing documentation patterns
- Check similar sections for consistency
- Consult with technical team for accuracy verification
- Follow established RisingWave terminology and conventions

---

*This guide should be updated as documentation standards evolve and new patterns emerge.*

---
id: develop-overview
title: Develop with RisingWave Cloud
description: Get started with building streaming services using RisingWave Cloud.
slug: /develop-overview
---

<!-- MDX imports -->
import DefaultButton from "@site/src/components/DefaultButton";
import LightButton from "@site/src/components/LightButton";
import OutlinedCard from "@site/src/components/OutlinedCard";
import Grid2 from "@mui/material/Grid2";

RisingWave Cloud leverages the superpower of RisingWave, an open-source distributed SQL database specifically designed for stream processing. RisingWave provides an interface language that resembles PostgreSQL, enabling your team to build real-time data services without the high engineering cost and complexity of traditional stream processing.

## RisingWave user docs

Developers can refer to the user documentation for RisingWave to develop streaming applications with RisingWave Cloud. The documentation covers essential topics such as data ingestion, SQL references, data delivery, client libraries, and ecosystem, providing comprehensive information on how to utilize the capabilities of RisingWave to build and manage data workflows that consume streaming data, perform incremental computations, and update results dynamically.

<DefaultButton text="RisingWave user docs" url="/docs/current/intro/"/> <LightButton text="See recommended topics" cloud="develop-overview#top-read-topics-for-developers"/>

## How to use the docs

RisingWave is a rapidly evolving system, with [new features](/release-notes/) added with each release. However, this also means some features may not function properly in older versions. Therefore, when using the RisingWave user docs, it's important to select the corresponding documentation version based on the RisingWave version in your project.

<Grid2 container>

<Grid2 size={6}>

### Check RisingWave version

To check your current version, go to [**Projects**](https://cloud.risingwave.com/project/home/).

<img
  src={require('./images/cluster-rwversion.png').default}
  alt="Check RisingWave version of clusters"
  width="95%"
/>

</Grid2>

<Grid2 size={6}>

### Select docs version

Select the version of the corresponding docs when using the RisingWave user docs.

![Select docs version](./images/select-docs-version.gif)

</Grid2>

</Grid2>

## Top read topics for developers

### Ecosystem

<Grid2 container spacing={1}>

<Grid2 size={{ xs: 12, sm: 6, md: 4 }}>

 <OutlinedCard
 style={{height: "87%"}}
 title="Integrations"
 content="See how RisingWave can integrate with your existing data stack. Vote for your favorite data tools and streaming services to help us prioritize the integration development."
 url="/docs/current/rw-integration-summary/"
 />

</Grid2>

<Grid2 size={{ xs: 12, sm: 6, md: 4 }}>

 <OutlinedCard
 style={{height: "87%"}}
 title="Sources"
 content="Connect to and ingest data from external sources such as databases and message brokers. See supported data sources."
 url="/docs/current/data-ingestion/"
 />

</Grid2>

<Grid2 size={{ xs: 12, sm: 6, md: 4 }}>

<OutlinedCard
 style={{height: "87%"}}
 title="Sinks"
 content="Stream processed data out of RisingWave to message brokers and databases. See supported data destinations."
 url="/docs/current/data-delivery/"
 />

</Grid2>

</Grid2>

### Process data with RisingWave

<OutlinedCard
title="SQL references"
content="SQL syntax and functionality supported by RisingWave. While RisingWave is wire-compatible with PostgreSQL, it has some unique features and notable differences."
links={[
{text:"Overview", url:"/docs/current/sql-references/"},
{text:"Commands", url:"/docs/current/sql-commands/"},
{text:"Query syntax", url:"/docs/current/query-syntax/"},
{text:"Data types", url:"/docs/current/sql-data-types/"},
{text:"Functions and operators", url:"/docs/current/sql-functions/"},
{text:"Query patterns", url:"/docs/current/sql-patterns/"}
]}
/>

### Use RisingWave in your applications

<OutlinedCard
title="Client libraries"
content="RisingWave offers support for popular PostgreSQL drivers, enabling seamless integration with your applications for interacting with it."
links={[
{text:"Java", url:"/docs/current/java-client-libraries/"},
{text:"Node.js", url:"/docs/current/nodejs-client-libraries/"},
{text:"Python", url:"/docs/current/python-client-libraries/"},
{text:"Go", url:"/docs/current/go-client-libraries/"}
]}
/>

### More to read

<Grid2 container spacing={1}>

<Grid2 size={{ xs: 12, sm: 6, md: 6 }}>

 <OutlinedCard
 style={{height: "90%"}}
 title="About RisingWave"
 content="Continue to learn about RisingWave."
 links={[
 {text:"Key concepts", url:"/docs/current/key-concepts/"},
 {text:"Architecture", url:"/docs/current/architecture/"},
 {text:"RisingWave vs. Apache Flink", url:"/docs/current/risingwave-flink-comparison/"},
 {text:"Release notes", url:"/release-notes/"}
 ]}
 />

</Grid2>

<Grid2 size={{ xs: 12, sm: 6, md: 6 }}>

<OutlinedCard
 style={{height: "90%"}}
 title="Blog"
 content="Product insights, engineering deep-dives, community events, industry highlights, and company news posted regularly by our CEO, engineers, product experts, community runners, communication specialists, and community contributors."
 url="https://www.risingwave-labs.com/blog/"
 links={[
 {text:"Blog", url:"https://www.risingwave.com/resources/?filter=blogs"}
 ]}
 />

</Grid2>

</Grid2>

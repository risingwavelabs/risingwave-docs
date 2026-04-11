# RisingWave Docs Restructure — Design Spec

**Date:** 2026-04-11  
**Status:** Approved  

## Background

The RisingWave documentation was last properly organized a long time ago. Its primary readers are now AI coding agents (Claude Code, Cursor, Copilot, etc.) that engineers use to accomplish tasks. The docs are currently organized for human learners, not for agents that need to quickly find accurate, complete, executable information.

At the same time, RisingWave's positioning has evolved. It is no longer just a "streaming database" — it is an **Event Streaming Platform for Agentic AI**.

## Goals

1. Make the docs agent-first: information-dense, complete examples, fast retrieval
2. Reflect the new positioning throughout
3. Keep traditional streaming use cases, but as secondary narrative
4. Highlight RisingWave's unique advantages clearly

---

## Part 1: Core Positioning Statement

**Hero tagline** (used in page titles, hero sections):

> **Event Streaming for Agentic AI**

**One-liner** (used in meta descriptions, short introductions):

> RisingWave is an event streaming platform for agentic AI.

**Full description** (used in intro pages, README-style descriptions):

> RisingWave is an event streaming platform for agentic AI. It continuously ingests data from databases, event streams, and webhooks, processes it incrementally, and serves fresh results at low latency, replacing the traditional event streaming stack (e.g., Debezium + Kafka + Flink + serving DB) with a single system.

**Rationale:** "Streaming database" positions RisingWave as a data storage tool. "Event streaming platform for agentic AI" positions it as a complete stack that solves a specific problem: agents and apps need data that is always fresh and queryable at low latency — the standard approach of chaining Debezium + Kafka + Flink + a serving DB adds latency at every hop and operational overhead at every system. RisingWave replaces the whole stack.

Traditional streaming use cases (monitoring, CDC pipelines, Iceberg lakehouse ingestion) remain — they are part of "what the platform does", not "what the platform is".

---

## Part 2: `intro.mdx` Restructure

**Current structure:** What is it → Technical features → Use cases  
**New structure:** Positioning → The problem → How it works → Use cases → Design decisions

### New section order

```
# What is RisingWave?

[Full description: one-liner + replaces Debezium+Kafka+Flink+serving DB]
[Architecture diagram]

## The problem

Agents and real-time applications need data that is always fresh and queryable at
low latency. The standard approach chains together Debezium for CDC, Kafka for
transport, Flink for processing, and a database for serving. Each hop adds latency
and each system adds operational overhead.

RisingWave replaces the whole stack: ingest, process, serve, store.

## How it works

### Ingest from any source
- Webhooks: HTTP-based event ingestion from SaaS and external systems
- Database changes: native CDC from PostgreSQL, MySQL, and others via transaction logs
- Event streams: Kafka, Pulsar, Kinesis, and other message brokers
- Historical data: batch ingestion from S3, data warehouses, and other storage
All sources are unified under the same SQL interface. Streams and tables can be
joined freely.

### Process continuously
Incremental computation — when upstream data changes, only affected results are
recomputed. End-to-end freshness under 100 ms.

### Serve at low latency
Results maintained in RisingWave's internal row store, served at 10–20 ms p99 via
standard SQL. No polling, no cache warming, no TTL management.

### Store in Apache Iceberg™
RisingWave hosts the Iceberg REST catalog directly and handles table maintenance
(compaction, small-file optimization, snapshot cleanup) without external tooling.
Iceberg queries run via Apache DataFusion (vectorized query engine). Data is in
open format — also readable by Spark, Trino, DuckDB, and others.

## Use cases

### Agent backends
- Agent memory: per-session and cross-session state, continuously maintained,
  queryable at 10–20 ms p99 without polling or cache invalidation
- Tool call results: fraud scores, anomaly signals, inventory checks,
  recommendations — pre-computed and always fresh for agent tool use
- Context injection: event-driven triggers that push updated context into LLM
  calls as upstream data changes
- Feature stores: batch and streaming features over the same pipeline, same system

### Real-time data stack
- Live dashboards: MVs updated incrementally, no scheduled refreshes
- Monitoring and alerting: continuous evaluation of streaming metrics
- Real-time enrichment: live events joined with historical reference data in-flight
- Streaming lakehouses: exactly-once ingestion into open-format tables with
  automated compaction and snapshot management

## Design decisions

### Ultimate cost efficiency
State, tables, and MVs stored in object storage (S3 or equivalent) — ~100x cheaper
than RAM. Elastic scaling without data rebalancing, failure recovery in seconds.
For latency-sensitive workloads, elastic disk cache pins hot data on local SSD/EBS,
keeping p99 query latency at 10–20 ms.

### Native experience for both humans and agents
Connects via the PostgreSQL wire protocol — works with psql, JDBC, and any
Postgres-compatible tooling. For agents specifically: MCP server, CLI, and Skills
allow agents to query and operate RisingWave without custom integration.

### Openness
Natively integrates with Apache Iceberg™ for continuous stream ingestion, direct
reads via DataFusion, and automated table maintenance. Data in Iceberg is open
format, accessible to any compatible query engine.

## See also

[Quickstart, Recipes, llms.txt for agents]
```

---

## Part 3: `llms.txt` and `llms-full.txt` Updates

These are the primary entry points for AI agents. Three new sections are added **at the top**, before the existing reference content.

### New Section 1: Agentic AI Patterns

Complete, runnable examples for the most common agent use cases:

- Agent reads always-fresh data (MV → query pattern)
- Agent receives push notifications (Subscription pattern)
- Connect via MCP server
- Connect via PostgreSQL driver (Python, Java, Node, Go)

### New Section 2: Key Differences from PostgreSQL (move to top, expand)

Currently this section exists at the bottom of `llms.txt`. Move it to the top and expand:

- Materialized views are auto-maintained (no REFRESH needed)
- `CREATE SOURCE` / `CREATE SINK` are RisingWave-specific DDL
- No `UPDATE`/`DELETE` on sources — use `CREATE TABLE` for mutable data
- Default port: 4566, default user: `root`, default database: `dev`
- No stored procedures, triggers, cursors, `LISTEN`/`NOTIFY`, full-text search
- Watermarks required for event-time window aggregations
- `NOW()` in materialized views requires temporal filters to avoid full scans

### New Section 3: Common Pitfalls

Mistakes agents commonly make when generating RisingWave code:

- Trying to `UPDATE`/`DELETE` a source → use `CREATE TABLE` with connector instead
- Forgetting watermark declaration on time-windowed MVs → rows never emit
- Using `NOW()` in a MV without a temporal filter → expensive full recomputation
- Confusing `CREATE SOURCE` (read-only stream, not persisted) with `CREATE TABLE` (persisted, mutable)
- Using PostgreSQL-specific syntax not supported in RisingWave (stored procedures, triggers, etc.)

---

## Part 4: New Recipes Pages

A new **Recipes** group is added under "Get started" in the navigation. Each recipe is a self-contained page: one task, complete runnable SQL/code, no need to jump to other pages.

| Page | Task |
|------|------|
| `get-started/recipes/kafka-to-mv-to-serve` | Kafka → materialized view → low-latency query |
| `get-started/recipes/cdc-postgres` | PostgreSQL CDC → RisingWave → downstream sink |
| `get-started/recipes/webhook-ingest` | Webhook event ingestion → processing → serve |
| `get-started/recipes/stream-to-iceberg` | Streaming data → Iceberg table, with auto compaction |
| `get-started/recipes/lakehouse-ingestion` | CDC + Kafka → Iceberg lakehouse, full pipeline |
| `get-started/recipes/subscription-push` | Materialized view change notifications via Subscription |
| `get-started/recipes/agent-memory-pattern` | Standard pattern for apps and agents reading/writing RisingWave |

**Recipe page format (consistent across all):**

```
## [Task name]

**What this does:** [One sentence]
**When to use this:** [One sentence on use case]

### Setup

[Complete SQL/code — copy-paste runnable]

### Key points

[2-4 bullet points: gotchas, performance notes, what to watch out for]

### Next steps

[1-2 links to related recipes or reference pages]
```

---

## Part 5: `use-cases.mdx` Updates

Reorganize into two explicit buckets matching the README's framing:

### Agent backends (new section, placed first)
- Agent memory pattern
- Tool call results (fraud scores, recommendations, inventory)
- Context injection
- Feature stores

### Real-time data stack (renamed from current generic use cases)
- Live dashboards (currently "streaming analytics" — reframe)
- Monitoring and alerting (currently "event-driven applications" — reframe)
- Real-time enrichment (keep, rename)
- Streaming lakehouse ingestion (new — currently missing)

For all sections:
- Each use case opens with one sentence on RisingWave's specific advantage
- SQL examples must be complete and directly runnable (no missing prerequisites)
- Existing examples (stock trading, fraud detection, e-commerce, ads bidding) are kept but reorganized into the new buckets and SQL is completed

---

## Implementation Priority

| Priority | Item | Rationale |
|----------|------|-----------|
| 1 | Core positioning language | Foundation for everything else |
| 2 | `llms.txt` / `llms-full.txt` | Affects every agent reading the docs |
| 3 | `intro.mdx` rewrite | First impression, most-visited page |
| 4 | Recipes (7 new pages) | Primary way agents find complete task answers |
| 5 | `use-cases.mdx` update | Important but lower urgency |

---

## Out of Scope

- Changes to SQL reference pages, connector pages, deployment guides — these are already structured as reference material and work well for agents
- Navigation restructuring beyond adding the Recipes group
- Removing or archiving any existing pages

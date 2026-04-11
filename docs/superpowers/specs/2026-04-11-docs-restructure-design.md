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

Replace all occurrences of "streaming database" positioning with:

> **RisingWave is an open-source event streaming platform for agentic AI.**

For longer descriptions (intro pages, meta descriptions):

> RisingWave is an open-source event streaming platform for agentic AI. It unifies data ingestion, stream processing, low-latency serving, and Iceberg lakehouse management in a single PostgreSQL-compatible system — so your apps and agents always have fresh, queryable data.

**Rationale:** "Streaming database" positions RisingWave as a data storage tool. "Event streaming platform for agentic AI" positions it as a complete stack that solves a specific problem: agents and apps needing always-fresh data without stitching together Debezium + Kafka + Flink + a serving database.

Traditional streaming use cases (monitoring, CDC pipelines, Iceberg lakehouse ingestion) remain — they are part of "what the platform does", not "what the platform is".

---

## Part 2: `intro.mdx` Restructure

**Current structure:** What is it → Technical features → Use cases  
**New structure:** Why it exists → What you can build → How it works → Key design decisions

### New section order

```
# What is RisingWave?

[One-line positioning]
[Two-sentence description: unified platform, replaces Debezium+Kafka+Flink+serving DB]

## What you can build

- Agentic AI apps & agents — always-fresh state, directly queryable via SQL
- Tool result caching — pre-computed fraud scores, recommendations, inventory; always ready
- Real-time monitoring & alerting — sub-second detection on event streams
- Streaming lakehouse ingestion — CDC / Kafka → Iceberg, with automatic compaction and maintenance

## How it works

[Existing architecture diagram — keep]
[Brief explanation of the four layers: ingest, process, serve, store]

## Key design decisions

[Keep existing content: PostgreSQL compat, object storage, Iceberg native]

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

1. Add **Agentic AI** as the first use case section (before streaming analytics)
2. Add **Lakehouse ingestion** as a use case section  
3. Existing examples (stock trading, fraud detection, e-commerce, ads bidding) — keep logic, but make SQL complete and directly runnable
4. Each use case opens with one sentence: "RisingWave's advantage here is X"

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

---
id: sql-show-schemas
title: SHOW SCHEMAS
description: Show existing schemas.
slug: /sql-show-schemas
---
<head>
  <link rel="canonical" href="https://docs.risingwave.com/docs/current/sql-show-schemas/" />
</head>

Use the `SHOW SCHEMAS` command to show schemas in the `dev` database.

## Syntax

```sql
SHOW SCHEMAS [ LIKE_expression ];
```


## Parameters

|Parameter or clause        | Description           |
|---------------------------|-----------------------|
|LIKE_expression| Filters the output based on names by applying pattern matching. See details in [LIKE pattern matching expressions](/sql/functions-operators/sql-function-string.md#like-pattern-matching-expressions).|

## Example

```sql
SHOW SCHEMAS;
```
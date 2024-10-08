---
id: sql-show-cluster
title: SHOW CLUSTERS
description: Show the details of your RisingWave cluster.
slug: /sql-show-cluster
---
<head>
  <link rel="canonical" href="https://docs.risingwave.com/docs/current/sql-show-cluster/" />
</head>

Use the `SHOW CLUSTERS` command to show the details of your RisingWave cluster, including the address of the cluster, its state, the parallel units it is using, and whether it's streaming data, serving data or unschedulable.

## Syntax

```sql
SHOW CLUSTERS;
```

## Example

```sql
SHOW CLUSTERS;
------RESULT
Addr            |  State  |     Parallel Units     | Is Streaming | Is Serving | Is Unschedulable
----------------+---------+------------------------+--------------+------------+------------------
 127.0.0.1:5688 | RUNNING | 3000, 3001, 3002, 3003 | true         | true       | false
(1 row)
```

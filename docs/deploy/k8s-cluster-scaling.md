---
id: k8s-cluster-scaling
title: Cluster scaling
description: Cluster scaling in RisingWave.
slug: /k8s-cluster-scaling
---
<head>
  <link rel="canonical" href="https://docs.risingwave.com/docs/current/k8s-cluster-scaling/" />
</head>

This article describes adaptive parallelism as the default scaling policy for all new streaming jobs starting from v1.7 in RisingWave. With adaptive parallelism, the system will automatically adjust parallelism to leverage added CPU cores or nodes in the cluster, ensuring optimal resource utilization.

## Scaling policies

RisingWave supports adaptive parallelism and fixed parallelism for tables, materialized views, and sinks.

- Adaptive parallelism (recommended)

    Adaptive parallelism is the **default** setting for newly created streaming jobs since v1.7. In this mode, RisingWave automatically adjusts parallelism to utilize all CPU cores across the compute nodes in the cluster. When nodes are added or removed, parallelism adjusts accordingly based on the current number of CPU cores.

    To modify the scaling policy to adaptive parallelism, use the SQL command:

    ```sql
    ALTER TABLE t SET PARALLELISM = adaptive;
    ```

    To modify on a materialized view:

    ```sql
    ALTER MATERIALIZED VIEW mv SET PARALLELISM = adaptive;
    ```

- Fixed parallelism

    Fixed parallelism is the advanced mode that allows manually specifying a parallelism number that remains constant as the cluster resizes. It’s commonly used to throttle stream bandwidth and ensures predictable resource allocation. For example:

    ```sql
    ALTER TABLE t SET PARALLELISM = 16; -- Replace 16 with the desired parallelism
    ```

RisingWave distributes its computation across lightweight threads called "streaming actors," which run simultaneously on CPU cores. By spreading these streaming actors across cores, RisingWave achieves parallel computation, resulting in improved performance, scalability, and throughput.

In both scaling modes, streaming actors will redistribute across the cluster to maintain balanced workloads.

## Scale-in

Scale-in here refers to the process of decreasing the computational resources to align with the current workload or operational requirements. By default, there's a 5-minute delay in scale-in operations. The delay is intentional to prevent unnecessary heavy recovery operations caused by transient failures like network jitters and CPU stalls. To manually trigger immediate scale-in, use the following statement:

```sql
risingwave ctl meta unregister-worker {id}
```

## Upgrade to v1.7

After upgrading to v1.7 from prior versions, if the parallelism is unset, streaming jobs will automatically upgrade to adaptive parallelism (`adaptive`). If the parallelism is set, streaming jobs will use `fixed` parallelism.

## Monitor parallelism

You can use a system table to view the current scaling policy of tables, materialized views, and sinks:

```sql
dev=> SELECT * FROM rw_streaming_parallelism;
  id  | name |   relation_type   | parallelism
------+------+-------------------+-------------
 1001 | t    | table             | FIXED(4)
 1002 | mv1  | materialized view | AUTO
 1004 | idx  | index             | AUTO
(3 rows)
```

To view the parallelism of fragments within a specific streaming job, please use the system table `rw_fragment_parallelism` instead:

```sql
dev=> SELECT * FROM rw_fragment_parallelism WHERE name = 't';
  id  | name |   relation_type   | fragment_id | distribution_type | state_table_ids | upstream_fragment_ids |        flags        | parallelism
------+------+-------------------+-------------+-------------------+-----------------+-----------------------+---------------------+-------------
 1001 | t    | table             |           2 | HASH              | {}              | {}                    | {SOURCE,DML}        |           4
 1001 | t    | table             |           1 | HASH              | {1001}          | {2}                   | {MVIEW}             |           4
```

To understand the output of the query, you may need to know about these two concepts: [streaming actors](/concepts/key-concepts.md#streaming-actors) and [fragments](/concepts/key-concepts.md#fragments).

---
title: "Query performance benchmarks: sysbench results"
sidebarTitle:  "Query performance benchmarks"
description: "This topic provides an overview of RisingWave's query performance characteristics (latency and throughput) based on the industry-standard sysbench benchmark."
---

## Performance highlights

RisingWave demonstrates low-latency query responses and high throughput for various OLAP workloads, even under high concurrency. Key takeaways from the sysbench results include:

- Low latency: RisingWave consistently delivers low-latency query responses, with average latencies as low as 4.96ms for point selects and 13.84ms - 16.40ms for more complex range queries. P95 latencies are also within a desirable range, indicating predictable performance for most requests.
- High throughput: RisingWave achieves high query throughput, processing up to 25,814 queries per second (QPS) for point selects and over 8,000 QPS for random point and range selects.
- Stable performance: RisingWave exhibits stable performance even when the data size increases from 1 million rows to 10 million rows, as long as the data can be cached in memory.

## Benchmark methodology

The performance tests were conducted using a modified version of the [sysbench](https://github.com/akopytov/sysbench) benchmark, a widely recognized tool for evaluating database performance. The RisingWave team forked the official sysbench repository and made necessary adjustments for compatibility.

### Environment

- **Hardware:**
    - One AWS EC2 instance (8 vCPUs, 16GB memory) for the RisingWave compute node.
    - One AWS EC2 instance (8 vCPUs, 16GB memory) for the RisingWave frontend node.
    - One AWS EC2 instance (8 vCPUs, 16GB memory) for the sysbench client (query generator).
- **Software:** RisingWave (specific version not mentioned in the report, but presumably a recent stable or nightly build).

### Test procedure

1. A table named `sbtest` was created in RisingWave with the following schema:
    
    ```sql
    CREATE TABLE sbtest(
      id INTEGER,
      k INTEGER,
      c VARCHAR,
      pad VARCHAR,
      PRIMARY KEY (id)
    );
    ```
    
2. Data was inserted into the `sbtest` table. Two data sizes were tested: 1 million rows (approximately 186MB) and 10 million rows (approximately 1.86GB).
3. 128 threads were used to concurrently issue queries against the table. This level of concurrency is sufficient to saturate the CPU of the RisingWave deployment.
4. Results, including latency and throughput, were collected.

### Workload

Three types of queries from the sysbench OLTP workload were used:

- **`oltp_point_select`:**
    
    ```sql
    SELECT c FROM sbtest WHERE id = ?;
    ```
    
- **`select_random_points`:**
    
    ```sql
    SELECT id, k, c, pad FROM sbtest WHERE k IN (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    ```
    
- **`select_random_ranges`:**
    
    ```sql
    SELECT count(k) FROM sbtest WHERE k BETWEEN ? AND ? OR k BETWEEN ? AND ?;
    ```
    

## Detailed benchmark results

**Data size: 1 million rows**

| **Latency (ms)** | **Min** | **Avg** | **P95** | **P99** | **Max** | **Throughput (QPS)** |
| --- | --- | --- | --- | --- | --- | --- |
| oltp_point_select | 0.40 | 5.05 | 9.22 | 15.27 | 131.75 | 25,335 |
| select_random_points | 1.27 | 15.11 | 21.89 | 31.94 | 131.87 | 8,467 |
| select_random_ranges | 1.92 | 13.98 | 20.00 | 35.59 | 233.90 | 9,156 |

**Data size: 10 million rows**

| **Latency (ms)** | **Min** | **Avg** | **P95** | **P99** | **Max** | **Throughput (QPS)** |
| --- | --- | --- | --- | --- | --- | --- |
| oltp_point_select | 0.40 | 4.96 | 8.90 | 18.28 | 233.90 | 25,814 |
| select_random_points | 0.84 | 16.40 | 24.38 | 32.53 | 175.82 | 8,203 |
| select_random_ranges | 0.86 | 13.84 | 19.65 | 38.94 | 142.34 | 9,247 |

## Key observations

- Memory impact: When the memory is sufficient to cache all the queried data, performance remains relatively stable as the table size grows. This highlights the importance of memory capacity for OLAP workloads.
- Bottlenecks: In the `oltp_point_select` workload, the frontend node becomes the primary bottleneck due to the lightweight nature of the operations. For `select_random_points` and `select_random_ranges`, both the compute and frontend nodes experience CPU saturation.

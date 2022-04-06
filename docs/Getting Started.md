---
id: getting-started
title: Getting Started
description: Basic steps for starting and using RisingWave.
slug: /getting-started
---


This guide will walk you through the basic steps for starting and using RisingWave. 

- Install and start RisingWave
- Connect to a streaming source
- Manage streams and data

## Install and start RisingWave

### Pre-built library (Linux x86_64)

```
// Download the pre-built library
wget https://github.com/singularity-data/risingwave/releases/download/v0.1.4/risingwave-v0.1.4-unknown-linux.tar.gz

// Unzip the library
tar xvf risingwave-v0.1.4-unknown-linux.tar.gz

// Start RisingWave in testing mode.
./risingwave playground
```

### Build from code (macOS & Linux)

1. Download the source code of RisingWave from this GitHub repository: https://github.com/singularity-data/risingwave.

    Alternatively, you can run this command in your terminal to download RisingWave to your environment.
    ```
    git clone https://github.com/singularity-data/risingwave.git
    ```

1. Install dependencies.

    RisingWave has the following dependencies. Ensure the dependencies are installed before starting RisingWave.
    * Java 11 (Note: Please use Java 11 as it is the only version we tested.)
    * Rust
    * CMake
    * Protocol Buffers
    * OpenSSL
    * PostgreSQL client (>=14.1)
    * Tmux

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

    <Tabs>
     <TabItem value="macos" label="macOS" default>

        If you use Homebrew, run the following commands to install the dependencies.

        ```
        brew install java11 cmake protobuf openssl postgresql tmux
        ```
        ```
        curl -proto '=https' -tlsv1.2 -sSf https://sh.rustup.rs (https://sh.rustup.rs/) | sh
        ```
     </TabItem>

     <TabItem value="linux" label="Linux">

        ```
        sudo apt update

        sudo apt upgrade

        sudo apt install openjdk-11-jdk

        sudo apt install make build-essential cmake protobuf-compiler curl openssl libssl-dev pkg-config

        sudo apt install postgresql-client

        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
        ```
     </TabItem>

     </Tabs>

1. Start RisingWave.

    To start RisingWave, in the terminal, navigate to the directory where RisingWave is downloaded, and run the following command.
    ```
    ./risedev dev # Starting RisingWave in production mode
    ```
    or
    ```
    ./risedev playground # starting RisingWave in testing mode. 
    ```
    :::tip

    RisingWave has two running modes: testing mode and production mode. In the testing mode, all nodes will be started in one process. Use the testing mode if need to do some quick tests. In the production mode, the meta node, compute node, and the serving node are started in three separate processes. 

    :::

    All services in RisingWave will be started. In this version, all nodes are hosted in your local environment.

    You can stop RisingWave with the following command.
    ```
    ./risedev kill
    ```

1. After RisingWave services are started, start the PostgreSQL interactive shell.
    ```
    psql -h localhost -p 4566 -d dev
    ```
    You can now issue SQL statements to manage your streams and data. 

## Connect to a streaming source

You use `CREATE SOURCE` statement to connect to a streaming source.

To connect to a Kafka topic: 

```sql
CREATE SOURCE KAFKA_TOPIC_1 (
   COLUMN_NAME DATA_TYPE, ...
)
with (
   'connector'='kafka'
   'kafka.topic'='',
   'kafka.bootstrap.servers'='172.10.1.1:9090,172.10.1.2:9090',
   'kafka.scan.startup.mode'='earliest|latest',
   'kafka.time.offset'='140000000'
   'kafka.consumer.group'='XXX_CONSUMER_NAME'
)
ROW FORMAT 'json' 
[ROW SCHEMA LOCATION 'local_file://path'];
```

For supported streaming sources and SQL examples, please see [Sources](Sources.md).

## Query and manage data

RisingWave uses Postgres-compatible SQL as the interface to manage and query data. Let's see a few examples 

* Create a table
* Create a materialized view from tables
* Create a materialized view from a stream
* Create a materialized view from
* Create a materialized view from an existing materialized view
* Get values of a materialized view

To create a table:

```sql
create table t2 (v1 int not null, v2 int not null, v3 int not null);
```

To create a materialized view from tables:

```sql
Create materialized view mv2 as select round(avg(v1), 1) as avg_v1, sum(v2) as sum_v2, count(v3) as count_v3 from t1;
```

To create a materialized view from a source:

```sql
create materialized view debezium_json_mysql_mv as select * from debezium_json_mysql_source;
```

To create a materialized view from existing materialized views:

```sql
create materialized view m4 as select m1.v1, m1.v2, m2.v1, m2.v2 from m1 join m2 on m1.v1 = m2.v1;
```

To get the latest values of a materialized view:

```sql
flush;
select * from m4;
```

For the complete list of supported SQL statements, see [SQL](SQL.md).







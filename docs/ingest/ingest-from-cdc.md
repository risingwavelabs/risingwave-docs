---
id: ingest-from-cdc
title: CDC via messaging systems
description: Ingest CDC data via messaging systems such as Kafka, Pulsar, etc.
slug: /ingest-from-cdc
---
<head>
  <link rel="canonical" href="https://docs.risingwave.com/docs/current/ingest-from-cdc/" />
</head>

Change data capture (CDC) refers to the process of identifying and capturing data changes in a database, then delivering the changes to a downstream service in real time.

You can use event streaming systems like Apache Kafka, Pulsar, or Kinesis to stream changes from MySQL, PostgreSQL, and SQL Server to RisingWave. In this case, you will need an additional CDC tool to stream the changes from the database and specify the corresponding formats when ingesting the streams into RisingWave.

RisingWave also provides native MySQL and PostgreSQL CDC connectors. With these CDC connectors, you can ingest CDC data from these databases directly, without setting up additional services like Kafka. For complete step-to-step guides about using the native CDC connector to ingest MySQL and PostgreSQL data, see [Ingest data from MySQL](/guides/ingest-from-mysql-cdc.md) and [Ingest data from PostgreSQL](/guides/ingest-from-postgres-cdc.md). This topic only describes the configurations for using RisingWave to ingest CDC data from an event streaming system.

For RisingWave to ingest CDC data, you must create a table (`CREATE TABLE`) with primary keys and connector settings. This is different from creating a source, as CDC data needs to be persisted in RisingWave to ensure correctness.

RisingWave accepts these data formats:

- **Debezium JSON (for MySQL, PostgreSQL, and SQL Server)**

    For Debezium JSON (`FORMAT DEBEZIUM ENCODE JSON`), you can use the [Debezium connector for MySQL](https://debezium.io/documentation/reference/stable/connectors/mysql.html), [Debezium connector for PostgreSQL](https://debezium.io/documentation/reference/stable/connectors/postgresql.html), or [Debezium connector for SQL Server](https://debezium.io/documentation/reference/stable/connectors/sqlserver.html) to convert CDC data to Kafka or Pulsar topics, or Kinesis data streams.

    Note that if you are ingesting data of type `timestamp` or `timestamptz` in RisingWave, the upstream value must be in the range of `[1973-03-03 09:46:40, 5138-11-16 09:46:40] (UTC)`. The value may be parsed and ingested incorrectly without warning.

- **Debezium Mongo JSON (for MongoDB)**

    For Debezium Mongo JSON (`FORMAT DEBEZIUM_MONGO ENCODE JSON`), you can use the [Debezium connector for MongoDB](https://debezium.io/documentation/reference/stable/connectors/mongodb.html) to convert CDC data to Kafka topics.

- **Debezium AVRO (for MySQL, PostgreSQL, and SQL Server)**

   For Debezium AVRO (`FORMAT DEBEZIUM ENCODE AVRO`), you can use the [Debezium connector for MySQL](https://debezium.io/documentation/reference/stable/connectors/mysql.html), [Debezium connector for PostgreSQL](https://debezium.io/documentation/reference/stable/connectors/postgresql.html), or [Debezium connector for SQL Server](https://debezium.io/documentation/reference/stable/connectors/sqlserver.html) to convert CDC data to Kafka topics.

- **Maxwell JSON (for MySQL only)**

    For Maxwell JSON (`FORMAT MAXWELL ENCODE JSON`), you need to use [Maxwell's daemon](https://maxwells-daemon.io/) to convert MySQL data changes to Kafka topics or Kinesis data streams. To learn about how to configure MySQL and deploy Maxwell's daemon, see the [Quick Start](https://maxwells-daemon.io/quickstart/).

- **The TiCDC dialect of Canal JSON (for TiDB only)**

    For the TiCDC dialect of [Canal](https://github.com/alibaba/canal) JSON (`FORMAT CANAL ENCODE JSON`), you can add TiCDC to an existing TiDB cluster to convert TiDB data changes to Kafka topics. You might need to define the topic name in a TiCDC configuration file. Note that only new changes will be captured from TiDB. Data that already exists within the target table will not be captured by TiCDC. For details, see [Deploy and Maintain TiCDC](https://docs.pingcap.com/tidb/dev/deploy-ticdc).

- **Canal JSON (for MySQL only)**

    For Canal JSON (`FORMAT CANAL ENCODE JSON`), you need to use the [Canal source connector](https://pulsar.apache.org/docs/2.11.x/io-canal-source/) to convert MySQL change data to Pulsar topics.

## Syntax

```sql
CREATE TABLE [ IF NOT EXISTS ] source_name (
   column_name data_type [ PRIMARY KEY ], ...
   PRIMARY KEY ( column_name, ... )
) 
WITH (
   connector='connector',
   connector_parameter='value', ...
) 
FORMAT { DEBEZIUM | DEBEZIUM_MONGO | MAXWELL | CANAL | PLAIN }
ENCODE { JSON | AVRO | PROTOBUF | CSV } [( encode properties ... )];
```

### Connector Parameters

Please see the respective data ingestion pages for the connection parameters.

- [Kafka](ingest-from-kafka.md)

- [Pulsar](ingest-from-pulsar.md)

- [Kinesis](ingest-from-kinesis.md)

## Examples

### Kafka

Here are examples of creating a table with the Kafka connector to ingest CDC data from Kafka topics.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupID = "data-formats">
<TabItem value="Debezium JSON" label="Debezium JSON">

```sql
CREATE TABLE [IF NOT EXISTS] source_name (
   column1 varchar,
   column2 integer,
   PRIMARY KEY (column1)
) 
WITH (
   connector='kafka',
   topic='user_test_topic',
   properties.bootstrap.server='172.10.1.1:9090,172.10.1.2:9090',
   scan.startup.mode='earliest'
) FORMAT DEBEZIUM ENCODE JSON;
```

</TabItem>
<TabItem value="Debezium Mongo JSON" label="Debezium Mongo JSON">

For more details on this row format, see [Debezium Mongo JSON](/sql/commands/sql-create-source.md#debezium-mongo-json)

```sql
CREATE TABLE [IF NOT EXISTS] source_name (
   _id BIGINT PRIMARY KEY
   payload jsonb
)
WITH (
   connector='kafka',
   topic='debezium_mongo_json_customers',
   properties.bootstrap.server='172.10.1.1:9090,172.10.1.2:9090',
) FORMAT DEBEZIUM_MONGO ENCODE JSON;
```

</TabItem>
<TabItem value="Debezium AVRO" label="Debezium AVRO">

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY
)
WITH (
    connector = 'kafka',
    topic = 'mysql.mydb.orders',
    properties.bootstrap.server = 'message_queue:29092',
    scan.startup.mode = 'earliest'
) 
FORMAT DEBEZIUM ENCODE AVRO (
    confluent_schema_registry = 'http://localhost:8081'
);
```

Although the `CREATE TABLE` command only specifies one column, the other columns in an upstream MySQL table will still be derived and included.

:::note

If the upstream is PostgreSQL, the `interval` type in PostgreSQL may be mismatched to `bigint` or `varchar` in RisingWave, depending on [interval.handling.mode](https://debezium.io/documentation/reference/2.3/connectors/postgresql.html#postgresql-property-interval-handling-mode) in the Debezium connector settings.

:::

</TabItem>
</Tabs>

### Pulsar

Here is an example of creating a table with Pulsar to ingest CDC data from Pulsar topics.

```sql
CREATE TABLE source_name (
   column1 varchar,
   column2 integer,
   PRIMARY KEY (column1)
)
WITH (
   connector='pulsar',
   topic='demo_topic',
   service.url='pulsar://localhost:6650/',
   admin.url='http://localhost:8080',
   scan.startup.mode='latest',
   scan.startup.timestamp_millis='140000000'
)FORMAT DEBEZIUM ENCODE JSON;
```

### Kinesis

Here is an example of creating a table with Kinesis to ingest CDC data from Kinesis data streams.

```sql
CREATE TABLE source_name (
    column1 varchar,
    column2 integer,
    PRIMARY KEY (column1)
) 
WITH (
    connector='kinesis',
    stream='kafka',
    aws.region='user_test_topic',
    endpoint='172.10.1.1:9090,172.10.1.2:9090',
    aws.credentials.session_token='AQoEXAMPL...kIKGO7fAE',
    aws.credentials.role.arn='arn:aws-cn:iam::602389639824:role/demo_role',
    aws.credentials.role.external_id='demo_external_id'
) FORMAT DEBEZIUM ENCODE JSON;
```

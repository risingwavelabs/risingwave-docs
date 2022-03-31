---
id: sources
title: Sources
description: Supported data sources and how to connect RisingWave to them.
slug: /sources
---

## What are sources?

Sources specify how RisingWave can connect to the streaming services you use and what the format and structure of the incoming data will be. Once you use [`CREATE SOURCE`](/#create-source) to establish the connection, RisingWave can ingest and then process the received data.
A source consists of the components below.

## Supported data sources

RisingWave ingests data from streaming platforms and materialized CDC sources listed below.

| Source | Version | Data format | Materialized? | Limitations |
|---------|---------|---------|---------|---------|
|Kafka|0.11.0 or higher	|JSON, protobuf|	Materialized & non-materialized|-
|Redpanda|Latest|JSON, protobuf	|Materialized & non-materialized|	-
|Pulsar|	2.8.0 or higher|	JSON, protobuf|	Materialized & non-materialized|	-
|Kinesis|	Latest|	JSON, protobuf|	Materialized & non-materialized|	-
|PostgreSQL CDC|	10, 11, 12, 13, 14|	JSON|	Materialized only|	Must have primary key|
|MySQL CDC|	5.7, 8.0|	JSON|	Materialized only|	Must have primary key|


## CREATE SOURCE

`CREATE SOURCE` connects RisingWave to a data source.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>
  <TabItem value="kafka-redpanda" label="Kafka & Redpanda" default>

You can use the SQL statement below to connect RisingWave to a Kafka broker.

### Syntax
```sql
CREATE [MATERIALIZED] SOURCE [IF NOT EXISTS] source_name (
   column_name data_type,[COMMENT col_comment], ...
)
WITH (
   'connector'='kafka',
   'field_name'='value', ...
)
ROW FORMAT 'json|protobuf' 
[ROW SCHEMA LOCATION 'local_file://path'];
```
#### `WITH` options

|Field|	Default|	Type|	Description|	Required?|
|---|---|---|---|---|
|kafka.topic|None|String|Address of the Kafka topic. One source can only correspond to one topic.|True
|kafka.bootstrap.servers	|None	|String	|Address of the Kafka broker. Format-ip:port,ip:port	|True|
|kafka.scan.startup.mode	|earliest	|String	|The Kafka consumer starts consuming data from the commit offset. This includes two values: 'earliest' and 'latest'.	|False
|kafka.time.offset	|None	|Int64	|Specify the offset in seconds from a certain point of time.	|False|
|kafka.consumer.group	|None	|String	|Name of the Kafka consumer group	|True|

Here is an example of connecting RisingWave to a Kafka broker to read data from individual topics.
```sql
CREATE MATERIALIZED SOURCE IF NOT EXISTS source_abc (
   column1 varchar,
   column2 integer,
)
WITH (
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
  </TabItem>

  <TabItem value="pulsar" label="Pulsar">

You can use the SQL statement below to connect RisingWave to a Pulsa broker.

### Syntax
```sql
CREATE [MATERIALIZED] SOURCE [IF NOT EXISTS] source_name (
   column_name data_type,[COMMENT col_comment], ...
)
WITH (
   'connector'='pulsar',
   'field_name'='value', ...
)
ROW FORMAT 'json|protobuf' 
[ROW SCHEMA LOCATION 'local_file://path'];
```
#### `WITH` options

|Field|	Default|	Type|	Description|	Required?|
|---|---|---|---|---|
|pulsar.topic	|None	|String	|Address of the Pulsar topic. One source can only correspond to one topic.	|True|
|pulsar.service.url	|None	|String	|Address of the Pulsar service	|True|
|pulsar.admin.url	|None	|String	|Address of the Pulsar admin	|True|
|pulsar.scan.startup.mode	|earliest	|String	|The Pulsar consumer starts consuming data from the commit offset. This includes two values: 'earliest' and 'latest'.	|False|
|pulsar.time.offset	|None	|Int64	|Specify the offset in seconds from a certain point of time.	|False|

Here is an example of connecting RisingWave to a Pulsar broker to read data from individual topics.

```sql
CREATE MATERIALIZED SOURCE IF NOT EXISTS source_abc (
   column1 string,
   column2 integer,
)
WITH (
   'connector'='pulsar'
   'pulsar.topic'='',
   'pulsar.service.url'='pulsar://localhost:6650/',
   'pulsar.admin.url'='XXXX'
   'pulsar.scan.startup.mode'='earliest|latest',
   'pulsar.time.offset'='140000000'
)
ROW FORMAT 'protobuf' 
[ROW SCHEMA LOCATION 'local_file://path'];
```
  </TabItem>

  <TabItem value="kinesis" label="Kinesis">
   
You can use the SQL statement below to connect RisingWave to Kinesis Data Streams.

### Syntax

```sql
CREATE [MATERIALIZED] SOURCE [IF NOT EXISTS] source_name (
   column_name data_type,[COMMENT col_comment], ...
) 
WITH (
   'connector'='kinesis',
   'field_name'='value', ...
) 
ROW FORMAT 'json';
```
#### `WITH` options

|Field|	Default|	Type|	Description|	Required?|
|---|---|---|---|---|
|kinesis.stream.name	|None	|String|	The stream name identifies the stream.	|True|
|kinesis.stream.region	|None	|String|	AWS service region. For example, US East (N. Virginia).	|True|
|kinesis.endpoint	|None	|String	|The URL of the entry point for the AWS Kinesis service|
|kinesis.credentials.access	|None	|String	|Indicates the Access key ID of AWS. Must appear in pairs with kinesis.credentials.secret.	|False|
|kinesis.credentials.secret	|None	|String	|Indicates the secret access key of AWS. Must appear in pairs with kinesis.credentials.access.	|False|
|kinesis.credentials.session_token	|None	|String	|The session token associated with the credentials. Temporary Session Credentials.	|False|
|kinesis.assumerole.arn	|None	|String		|False|
|kinesis.assumerole.external_id	|None	|String	|The [external id](https://aws.amazon.com/blogs/security/how-to-use-external-id-when-granting-access-to-your-aws-resources/) used to authorize access to third-party resources	|False|

Here is an example of connecting RisingWave to Kinesis Data Streams to read data from individual streams.

```sql
CREATE [MATERIALIZED] SOURCE [IF NOT EXISTS] source_name (
   column1 varchar,
   column2 integer,
) 
WITH (
   'connector'='kinesis',
   'kinesis.stream.name'='kafka',
   'kinesis.stream.region'='user_test_topic',
   'kinesis.endpoint'='172.10.1.1:9090,172.10.1.2:9090',
   'kinesis.credentials.session_token'='xxx',
   'kinesis.assumerole.arn'='xxx',
   'kinesis.assumerole.external_id'='xxx'
) 
ROW FORMAT 'json';
```
  </TabItem>

 <TabItem value="CDC" label="CDC">
   
You can use the SQL statement below to connect RisingWave to a CDC source.

:::note

Currently, RisingWave only supports materialized CDC sources with primary keys.

:::

### Syntax
```sql
CREATE MATERIALIZED SOURCE [IF NOT EXISTS] source_name (
   column_name data_type [PRIMARY KEY],[COMMENT col_comment], ...
   PRIMARY KEY (column_1, column_2)
) 
WITH (
   'connector'='kafka',
   'field_name'='value', ...
) 
ROW FORMAT 'debezium-json';
```
#### `WITH` options

XXX

Here is an example of connecting RisingWave to a CDC service to read data from individual streams.

```sql
CREATE MATERIALIZED SOURCE [IF NOT EXISTS] source_name (
   column1 varchar,
   column2 integer,
   PRIMARY KEY (column1)
) 
WITH (
   'connector'='kafka',
   'kafka.topic'='user_test_topic',
   'kafka.bootstrap.servers'='172.10.1.1:9090,172.10.1.2:9090',
   'kafka.scan.startup.mode'='earliest|latest',
   'kafka.consumer.group'='XXX_CONSUMER_NAME'
) 
ROW FORMAT 'debezium-json';
```
  </TabItem>

</Tabs>

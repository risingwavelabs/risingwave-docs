---
id: modify-schemas
title: Modify source or table schemas
slug: /modify-schemas
---
This topic describes how to modify the schema of a RisingWave source or table.

When the schema of your upstream source changes (i.e. adding or removing columns), you need to modify the schema of the corresponding source or table in RisingWave to ensure they are aligned.

If schema registry is used to create a source or table, you cannot modify the schema of the source or table.

## Add a column

To add a column to a source, use this command:

```sql
ALTER SOURCE <source_name> ADD COLUMN <column_name> <column_type>;
```

Similarly, to add a column to a table, use this command:

```sql
ALTER TABLE <table_name> ADD COLUMN <column_name> <column_type>;
```

For details about these two commands, see [`ALTER SOURCE`](/sql/commands/sql-alter-source.md) and [`ALTER TABLE`](/sql/commands/sql-alter-table.md).

:::note

Note that you cannot add a primary key column to a source or table in RisingWave. To modify the primary key of a source or table, you need to recreate the table.

:::

When you add a column to a source or table, the new column is not automatically picked up in a downstream materialized view.

For example, if you have a materialized view `mv1` that is created with this statement:

```sql
CREATE MATERIALIZED VIEW mv1 AS SELECT * FROM my_kafka_source;
```

When you add a column to `my_kafka_source`:

```sql
ALTER SOURCE my_kafka_source ADD COLUMN new_col INTEGER;
```

The materialized view `mv1` does not contain the new column `new_col`. If you want to pick up this new column, you'll need to create a new materialized view.

## Remove a column

You cannot remove a column from a source in RisingWave. If you intend to remove a column from a source, you'll need to drop the source and create the source again.

If a column of a table is referenced in a materialized view, you cannot remove the column. This is to ensure data consistency and prevent disruptions to downstream data processing.

To remove a column from a table, use this command:

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

---
id: user-defined-functions
slug: /user-defined-functions
title: User-defined functions
description: Define your own functions.
---
<head>
  <link rel="canonical" href="https://docs.risingwave.com/docs/current/user-defined-functions/" />
</head>

In modern data processing and analysis, SQL language is a powerful tool for handling structured data. However, as the complexity of data analysis increases, standard SQL statements and built-in functions may not be sufficient to meet all data processing needs. This is where user-defined functions (UDFs) come into play, allowing you to define custom functions to achieve more complex calculations and operations.

## When do you need UDFs

UDFs are crucial when there is a need to perform calculations that cannot be supported by standard SQL functions. Here are some typical scenarios and examples:

- Complex mathematical or statistical calculations, such as calculating the greatest common divisor of two numbers.
- Custom data transformations or validations, such as extracting information from network packets.
- Need to use external services or resources, such as accessing OpenAI API to generate text.
- Migration from existing systems, such as migrating Flink UDFs and implementing functions not currently supported by RisingWave.

It is important to note that UDFs have lower execution efficiency compared to built-in functions due to cross-language communication and data conversion. Therefore, users should always prioritize the use of built-in functions.

## Types of UDFs in RisingWave

At present, there are three ways to define your UDF. The first option is to use it as an external function, which runs as a standalone service and provides maximum flexibility. The second option is to use an embedded UDF, which runs internally in RisingWave. The third is to use a SQL UDF, which allows for the same capabilities as regular SQL while offering a more concise way to express complex queries.

You can create all types of UDFs mentioned above using the [`CREATE FUNCTION`](/sql/commands/sql-create-function.md) command. However, the syntax may vary slightly depending on the type of UDF you want to create. We have provided specific guides for each type of UDF below, so you can choose the one that best meets your needs.


### UDFs as external functions

RisingWave supports creating external UDFs with the following programming languages:

- [Python](/sql/udf/udf-python.md)

- [Java](/sql/udf/udf-java.md)

### Embedded UDFs

RisingWave supports creating embedded UDFs with the following programming languages:

- [Python](/sql/udf/udf-python-embedded.md)

- [JavaScript](/sql/udf/udf-javascript.md)
- [Rust](/sql/udf/udf-rust.md)

### SQL UDFs

For details about how to create a SQL UDF and its use cases, see:

- [SQL UDFs](/sql/udf/sql-udfs.md)

## Other ways to categorize UDFs

UDFs can be categorized based on three dimensions. In the documentation provided above, we categorize them according to the execution method of functions, which has an impact on their performance and capabilities.

The other two dimensions are:

- The input and output of functions.

  For this dimension, since common SQL functions include scalar functions,  table functions, aggregate functions, and window functions, UDFS can be classified as user-defined scalar functions (abbreviated as UDFs), user-defined table functions (UDTFs), user-defined aggregate functions (UDAFs), and user-defined window functions (UDWFs).

  RisingWave supports UDFs, UDTFs and UDAFs, covering most practical needs. You can find their guides in our documentation too.
  
  For example, for UDAFs, you can use the [`CREATE AGGREGATE`](/sql/commands/sql-create-aggregate.md) command to create functions. Meanwhile, we also offer dedicated sections for creating UDAFs in [Embedded Python UDFs](/sql/udf/udf-python-embedded.md#define-your-aggregate-functions) and [Embedded JavaScript UDFs](/sql/udf/udf-javascript.md#define-your-aggregate-functions).
 
- The language used to write functions.

  RisingWave currently supports using SQL, Python, Java, JavaScript, and Rust to write UDFs.

## See also

To learn more about the design and implementation of our user-defined functions (UDFs), we have a series of blog articles on our website, for example:

- [RisingWave user-defined functions: Overview](https://risingwave.com/blog/risingwave-user-defined-functions-overview/)

- [RisingWave user-defined functions: Rust x WebAssembly](https://risingwave.com/blog/user-defined-functions-rust-x-webassembly/)

- [RisingWave user-defined functions: Python external functions](https://risingwave.com/blog/risingwave-user-defined-functions-3-python-external-functions/)

These blogs provide in-depth information about UDFs and can help you understand their features and capabilities better. Feel free to explore them!

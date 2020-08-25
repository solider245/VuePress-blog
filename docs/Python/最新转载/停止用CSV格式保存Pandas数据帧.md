---
title : 停止用CSV格式保存Pandas数据帧
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-25 11:20:48 +0800
categories:
 -
tags:
 -
---
[[toc]]

CSV是一种很好的数据交换格式。所有人都能理解它，并且可以在普通记事本中进行编辑。但是，这并不意味着它适合保存所有的数据帧。用过的人应该都知道，CSV不仅读写速度慢，而且有时候需要下载数据，占用更多的磁盘空间，最重要的是**CSV不存储数据类型的信息。**

**CSV的优势：**

*   通俗易懂；
*   大多数编程语言都支持解析和创建。

**CSV的缺点：**

*   更大的磁盘占用率；
*   读写速度较慢；
*   不存储有关数据类型的信息。

在开始之前，我们首先来了解一下这些文件格式如何处理各种数据类型。

## Pandas数据类型


Pandas 支持非常多数据类型，其中一些还具有多个子类型，用于提高处理大数据帧的效率。基本数据类型包括：

*   对象 \-\- 字符串或混合类型
*   字符串 \-\- 从熊猫1.0.0开始
*   int -- 整数
*   float -- 浮点数
*   bool -- 布尔值True和False值
*   datetime -- 日期和时间值
*   timedelta -- 两个日期时间之间的时差
*   category -- 有限的值列表存储了内存效率高的查找

由于 pandas 使用 numpy 数组作为其后端结构，因此 ints 和 float 可以区分为内存效率更高的类型，例如 int8，int16，int32，int64，unit8，uint16，uint32 和 uint64 以及 float32 和 float64。

CSV 不存储有关数据类型的信息，所以我们必须在每个 read_csv（）中对它进行指定。在不告知 CSV 阅读器的情况下，它将推断所有整数列为效率最低的 int64，将 float 转换为 float64，将类别作为字符串以及日期时间加载。

```
#对于每个加载的数据集，必须指定让数据帧更高效的格式  
df = pd.read_csv(new_file,  
 dtype={"colA": "int8",  
 "colB": "int16",  
 "colC": "uint8",  
 "colcat": "category"},  
 parse_dates=["colD","colDt"])
```

**TimeDeltas**以字符串的形式存储在 CSVs-5days+18:59:39.000000 中，我们必须编写一个特殊的解析器来将这些字符串转换回 pandas 的 timedelta  格式。

时区看起来像 2020-08-06 15:35:06-06:00，并且需要在 read_csv（）中进行特殊处理。

![](https://p3-tt.byteimg.com/origin/pgc-image/dfbb8680e660467b9bca97fab01db6b7?from=pc)

使用没有参数的read_csv（）比较原始dtypes和自动推断的类型

## CSV替代方案


幸运的是，csv不是保存数据帧的唯一选择。阅读 Pandas 的 IO 工具，你会发现一个数据帧可以写入多种格式、数据库，甚至是剪贴板。

接下来我们来详细描述数据是如何创建的，并将教大家使用真实的数据帧完成性能测试和健全性检查。

![](https://p1-tt.byteimg.com/origin/pgc-image/30478f41b99d4101b8fcc7407cf5116c?from=pc)

## Pickle 和 to_pickle（）


**Pickle 是用于对象序列化的 python 本地格式。** 它允许 python 代码实现任何形式的增强，例如PEP574 酸洗带外数据缓冲区中描述的最新协议5。

（PEP574协议链接：https://www.python.org/dev/peps/pep-0574/）

这也意味着很难在 Python 生态系统之外进行酸洗。 但是，如果你想存储一些预处理的数据以备后用，或者不想在不立即使用数据的情况下浪费几个小时的分析工作，那么你只需对它们进行 pickle 处理即可。

```
# Pandas的to_pickle方法  
df.to_pickle(path)
```

与 **.to_csv（）**相反，**.to_pickle（）**方法仅接受3个参数:

*   path（路径）-- 数据将存储到的位置；
*   compression（压缩）-- 允许选择各种压缩方法；
*   protocol（协议）-- 更高的协议可以更有效地处理更大范围的数据。

**pickle 的优点：**

*   比 CSV 更快（取决于压缩方法，写入CSV的5–300％和读取CSV的15–200％）；
*   生成的文件更小（约为csv的50％）；
*   保留有关数据类型的信息（100％）；
*   无需指定过多的参数。

**pickle 的缺点：**

*   原生于 python，因此缺少其他编程语言的支持；
*   即使在不同的 python 版本中也不可靠。

![](https://p3-tt.byteimg.com/origin/pgc-image/513367b8fabd464b8e2269b89fec5203?from=pc)

Pickle能够100％序列化的padnas数据类型

## Parquet 与 to_parquet()


**apache parquet 是 Hadoop 生态系统中使用的压缩二进制列存储格式。**它允许序列化复杂的嵌套结构，支持按列压缩和按列编码，并提供快速读取，甚至不需要读取整个列，因为我们只需要部分数据。

```
# Pandas的to_parquet方法  
df.to_parquet(path, engine, compression, index, partition_cols)
```

**.to_parquet（）**方法仅接受以下几个参数：

*   path（路径） -- 数据将存储到的位置；
*   engine（引擎） -- pyarrow 或 fastparquet 引擎。 pyarrow 通常更快，但与 timedelta 格式比较困难。 fastparquet 可能会明显变慢；
*   compression（压缩） -- 允许选择各种压缩方法；
*   index（索引） -- 是否存储数据框的索引；
*   partition_cols -- 指定列分区的顺序。

**parquet 的优势：**

*   比 CSV 更快（从10行开始，pyarrow 大约快5倍）；
*   生成的文件较小（约为 CSV 的50％）；
*   保留有关数据类型的信息（Pyarrow 无法处理较慢的 fastparquet 可以处理的 timedelta）；
*   在 Hadoop 生态系统中的广泛支持允许对多个分区进行快速过滤。

**parquet 的缺点：**

*   不支持重复的列名；
*   pyarrow 引擎不支持某些数据类型。

## Excel和to_excel（）


将数据导出到 excel 中可以更加方便操作。它以最慢的读写速度为代价，就是为了更加易于操作。它还忽略了许多数据类型，而且时区根本不能写入 excel 。

```
# 将数据框导出到excel  
df.to_excel(excel_writer, sheet_name, many_other_parameters)
```

**to_excel 中非常有用的几个参数：**

*   excel_writer -- Pandas 的 excel writer 对象或文件路径；
*   sheet_name--数据将输出到的图纸的名称；
*   float_format -- Excel 的本地数字格式；
*   列 \-\- 别名数据帧列的选项；
*   startrow -- 向下移动起始单元格的选项；
*   engine（引擎） -- openpyxl 或 xlsxwriter；
*   Frozen_panes -- 冻结行和列的选项。

**excel的优点：**

*   允许自定义格式和单元格冻结；
*   可读和可编辑的格式。

**excel的缺点：**

*   读/写非常慢（慢20倍/ 40倍）；
*   限制为 1048576 行；
*   带有时区的 datetimes 的序列化失败。

![](https://p1-tt.byteimg.com/origin/pgc-image/02ba3edff373426ea58a2c2286207c4f?from=pc)

只有54％的列保留原始数据类型，它占用了CSV大小的90％，但是写入时间增加了20倍，读取时间增加了42倍

## HDF5和to_hdf（）


使用适合于大量异构数据的内部文件状结构的压缩格式。如果我们需要随机访问数据集的各个部分，这也是理想的选择。如果数据存储为表（PyTable），则可以使用 store.select（key，where =“ A> 0或B <5”）直接查询 hdf 存储。

```
# 将数据帧导出到hdf  
df.to_hdf(path_or_buf, key, mode, complevel, complib, append ...)
```

to_hdf（）中比较有用的几个参数：

*   path\_or\_buf -- 文件路径或HDFStore对象；
*   key（键）-- 已识别或存储区中的组；
*   mode（模式）-- 写入，追加或读取追加；
*   format（格式） -- fixed 用于快速读写，而 table 仅允许选择数据的子集。

**HDF5的优点：**

*   对于某些数据结构，其大小和访问速度都非常惊人。

**HDF5的缺点：**

*   数据帧的大小可能非常大（甚至比csv大300倍）；
*   HDFStore 不是线程安全的写入；
*   固定格式无法处理分类值。

## SQL和to_sql（）


通常，将数据长保存到数据库中，是非常有必要的。像 sqlalchemy 这样的库就是专门用于此任务。

```
# 设置sqlalchemy引擎  
engine = create_engine(  
 'mssql+pyodbc://user:pass@localhost/DB?driver=ODBC+Driver+13+for+SQL+server',  
 isolation_level="REPEATABLE READ"  
)  
# 连接到 DB  
connection = engine.connect()  
# 将数据帧导出到SQL  
df.to_sql(name="test", con=connection)
```

to_sql（）中非常有用的几个参数：

*   name -- SQL表的名称；
*   con -- 通常由 sqlalchemy.engine 连接的引擎；
*   chunksize -- 可选地以 chunksize 的批量加载数据。

**SQL的优点：**

*   比保留在磁盘上慢（读取10次/写入5次，但是可以对其进行优化）；
*   每个程序员都可以理解数据库。

**SQL的缺点：**

*   某些数据格式不保留：类别、整数、浮点数和时间增量；
*   取决于数据库性能可能很慢；
*   在某些情况下，你可能很难建立数据库连接。

## 其他方法


Pandas 提供了非常多的方法，在此，我省略了 json 和 fix-width 文件，因为它们与 csv 具有类似的特性。另外，你可以用 .to_gbq（）或 stata 格式直接写入 Google Big Query。满足各种云提供商通信需要的新格式就会出现。

## 性能测试


很多方法保存的数据格式都比 CSV 好用，但是当 CSV 更容易被理解时，这些不同寻常的方法值得使用吗？让我们测试一下性能。

在进行性能测试时，需要重点关注4个关键指标：

*   数据类型保留 \-\- 读取后保留原始类型的列百分比；
*   压缩/大小 \-\- 文件占csv的百分比；
*   写入时间 \-\- 以csv写入时间的百分比表示，写入这种格式需要多长时间；
*   读取时间 \-\- 以csv读取时间的百分比形式读取此格式需要多长时间。

为此，我准备了一个50K大小，包含随机数、字符串、类别、日期时间和布尔值的数据集。

```
data = []  
for i in range(1000000):  
    data.append(  
        [random.randint(-127,127),  # int8  
         random.randint(-32768,32767),  # int16
```

生成随机样本是几乎每个测试都使用的一项技能。

你可以在以下的GitHub链接中检查生成随机字符串和日期的支持功能：

https://github.com/vaclavdekanovsky/data-analysis-in-examples/blob/master/Pandas/Persistance/Stop%20Persisting%20Pandas%20to%20CSV.ipynb

这里只介绍一个：

```
def get_random_string(length: int) -> str:  
    """Generated random string up to the specific lenght"""  
      
    letters = string.ascii_letters  
    result_str = ''.join([random.choice(letters) for i in range(random.randint(3,length))])  
    return result_str
```

一旦我们有了数据，我们就可以用不同的算法反复处理它们。也可以分别编写每个测试，但让我们将测试压缩到一行：

```
# 性能测试  
performance_df = performance_test(exporting_types)  
# 结果  
performance_df.style.format("{:.2%}")
```

performance_test函数接受带有测试定义的字典，该字典如下所示：

```
d = { ...  
"parquet_fastparquet": {  
        "type": "Parquet via fastparquet",  
        "extension": ".parquet.gzip",  
        "write_function": pd.DataFrame.to_parquet,  
        "write_params": {"engine":"fastparquet","compression":"GZIP"},  
        "read_function": pd.read_parquet,  
        "read_params": {"engine":"fastparquet"}  
    }  
... }
```

字典包含应运行的功能，例如 pd.DataFrame.to_parquet 和参数。 我们迭代 dict 并逐个运行函数：

```
path = "output_file"  
# df是我们的性能测试样本数据帧  
# 保持df  
d["write_function"](df, path, **d["write_params"])  
# 加载df   
df_loaded = d["read_function"](path, **d["read_params"]
```

将结果存储到一个数据帧中，利用 Plotly.Express 的功能通过几行代码来显示结果：

```
# 显示带有结果的图形  
fig = pe.bar(performance_df.T, barmode='group', text="value")  
#格式化标签  
fig.update_traces(texttemplate='%{text:.2%}', textposition='auto')  
# 添加标题  
fig.update_layout(title=f"Statistics for {dataset_size} records")  
fig.show()
```

![](https://p3-tt.byteimg.com/origin/pgc-image/ac0ff5b996df4771bfd687dcd6f504d7?from=pc)

**完整性检查**

对随机样本进行测试，在符合实际的情况下，有助于建立我们的应用程序或工具有多好的第一印象。为了避免意外，你一定要在实际数据的基础上测试代码。在这里，我选择了我最喜欢的数据集——美国证券交易委员会季度数据转储，并对其进行了性能测试。取得了非常相似的结果，证明我的假设并非完全错误。

![](https://p3-tt.byteimg.com/origin/pgc-image/734b3b47b3e24c6f870f682323690657?from=pc)

## 总结


pickle 在性能上处于领先，但是我们还是会根据不同的数据集，选择不同的数据格式，在实际数据测试中，性能也可能会有所不同。

对我个人而言，**.to_pickle（）**在存储预处理的数据集时是非常有用的，因为不需要担心数据格式，只需要 **read_pickle（）**即可。

  

**--END--**

_原文链接：_https://towardsdatascience.com/stop-persisting-pandas-data-frames-in-csvs-f369a6440af5

翻译：未艾信息（www.weainfo.net）

喜欢本文的同学记得收藏+点赞~

更多内容，欢迎大家关注我们的公众号：**为AI呐喊（weainahan）**
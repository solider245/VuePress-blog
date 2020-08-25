---
title : 为Python选择一个更快的JSON库
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-23 12:00:18 +0800
categories:
 -
tags:
 -
---
[[toc]]
使用JSON的次数越多，遇到JSON编码或解码的瓶颈的可能性就越大。Python的内置库不错，但是有多个更快的JSON库可用：如何选择要使用的库？

事实是，没有一个正确的答案，没有一个最快的JSON库可以全部统治它们：

1.  “快速JSON库”对不同的人来说意味着不同的事物，因为他们的使用方式是不同的。
2.  速度并非决定一切，您可能还会关心其他事情，例如安全性和自定义。

因此，为了帮助您选择最快的JSON库_您的_需求，我想与大家分享我的经历来选择Python的快速JSON库的过程。您可以使用此过程来选择最适合您的特定需求的库：

1.  确保确实存在问题。
2.  定义基准。
3.  根据其他要求进行过滤。
4.  对其余候选人进行基准测试。

步骤＃1：您实际上需要一个新的JSON库吗？
----------------------

仅仅因为您使用JSON并不意味着它是一个相关的瓶颈。 **在花时间思考_哪个_ JSON库之前，您需要一些证据表明Python的内置JSON库确实是您的特定应用程序中的问题。**

就我而言，我是从[因果日志记录库Eliot](https://eliot.readthedocs.io/)的基准测试中学到的，该基准表明JSON编码占用了大约25％的CPU时间（用于生成消息）。我能获得的最快速度是运行速度提高了33％（如果JSON编码时间变为零），但这是一个足够大的时间段，迟早会使其成为列表的顶部。

步骤2：定义基准
--------

如果您查看各种JSON库的基准页面，那么他们将谈论它们如何处理各种不同的消息。但是，这些消息不一定与_您的_用法相对应。他们经常测量非常大的消息，而就我而言，至少我关心小消息。

因此，您想提出一些与您的特定使用模式相匹配的措施：

1.  您是否关心编码，解码或两者兼而有之？
2.  您使用的是小型还是大型邮件？
3.  典型的消息是什么样的？

就我而言，我最关心的是对小消息进行编码，这是由艾略特（Eliot）生成的日志消息的特定结构。我根据一些真实的日志提出了以下示例消息：

```json
{  "timestamp":  1556283673.1523004,  "task_uuid":  "0ed1a1c3-050c-4fb9-9426-a7e72d0acfc7",  "task_level":  [1,  2,  1],  "action_status":  "started",  "action_type":  "main",  "key":  "value",  "another_key":  123,  "and_another":  ["a",  "b"],  } 
```

步骤3：根据其他要求进行过滤
--------------

性能不是一切，您可能还会关心其他事情。就我而言：

1.  安全/防崩溃：日志消息可以包含来自不受信任来源的数据。如果JSON编码器因错误数据而崩溃，那么对可靠性或安全性都不利。
2.  自定义编码：Eliot支持自定义JSON编码，因此您可以序列化其他种类的Python对象。一些JSON库支持此功能，而另一些则不支持。
3.  跨平台：可在Linux，macOS，Windows上运行。
4.  维护：我不想依赖没有得到积极支持的库。

我考虑的库是[orjson](https://github.com/ijl/orjson)，[Rapidjson](https://github.com/python-rapidjson/python-rapidjson/)，[ujson](https://github.com/esnme/ultrajson/)和[hyperjson](https://github.com/mre/hyperjson)。

我根据上述条件过滤掉了其中一些：

*   在我最初写这篇文章的时候，`ujson`提交了许多关于崩溃的错误，自2016年以来没有发布过。看起来它已经被再次维护，但是看起来仍然很容易崩溃，这表明它仍然不安全。
*   `hyperjson` 仅具有适用于macOS的软件包，并且总体而言似乎还很不成熟。

步骤4：基准化
-------

最后两个竞争者是`rapidjson`和`orjson`。我运行了以下基准测试：

```py
import time
import json
import orjson
import rapidjson

m = {
    "timestamp": 1556283673.1523004,
    "task_uuid": "0ed1a1c3-050c-4fb9-9426-a7e72d0acfc7",
    "task_level": [1, 2, 1],
    "action_status": "started",
    "action_type": "main",
    "key": "value",
    "another_key": 123,
    "and_another": ["a", "b"],
}

def benchmark(name, dumps):
    start = time.time()
    for i in range(1000000):
        dumps(m)
    print(name, time.time() - start)

benchmark("Python", json.dumps)
# orjson only outputs bytes, but often we need unicode: benchmark("orjson", lambda s: str(orjson.dumps(s), "utf-8"))
benchmark("rapidjson", rapidjson.dumps) 
```

结果：

```
$ python jsonperf.py 
Python 4.829106330871582
orjson 1.0466396808624268
rapidjson 2.1441543102264404 
```

即使需要其他Unicode解码，`orjson`速度也是最快的（对于此特定基准测试！）。

一如既往，需要权衡。 `orjson`用户数量少于`rapidjson`（将[orjson PyPI统计信息](https://pypistats.org/packages/orjson)与[Rapidjson PyPI统计](https://pypistats.org/packages/python-rapidjson)[信息](https://pypistats.org/packages/orjson)进行比较），并且没有Conda软件包，因此我必须自己打包以供Conda-forge使用。但这肯定快得多。

您的用例，您的选择
---------

_你_应该使用`orjson`吗？不必要。您可能有不同的要求，基准可能也有所不同，例如，可能需要解码大型文件。

关键在于流程：找出您的特定需求，性能和其他方面，然后选择最能满足您需求的库。

* * *

* * *

### 如何处理内存有限的大型数据集？

获取**免费的备忘单，**概述如何使用Python，NumPy和Pandas在有限的内存下处理大量数据。

另外，每周左右，您将收到新文章，向您展示如何处理大数据，并且更广泛地**提高软件工程技能**，从测试到打包再到性能：

* * *

#### 您可能还会喜欢：

##### » [并行蓝调：当更快的代码慢时](https://pythonspeed.com/articles/parallelism-slower/)

##### » [cProfile之外：选择合适的工具进行性能优化](https://pythonspeed.com/articles/beyond-cprofile/)
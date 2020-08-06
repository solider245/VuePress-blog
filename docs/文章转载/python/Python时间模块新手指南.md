---
title : Python时间模块新手指南
description : 
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-07 01:05:43 +0800
categories:
 -
tags:
 -
---
[[toc]]
Python `time` 模块提供了多种方法来表示代码中的时间，例如对象，数字和字符串。 它还提供了除表示时间以外的功能，例如在代码执行过程中等待和测量代码效率。

本文将引导您了解NET中最常用的功能和对象 `time` 。

**到本文结尾，您将能够：**

*   **了解** 处理日期和时间的核心核心概念，例如纪元，时区和夏时制
*   **代表** 使用花车，元组代码的时间， `struct_time`
*   在不同的时间表示形式之间进行**转换**
*   **挂起** 线程执行
*   使用以下方法**衡量** 代码性能 `perf_counter()`

您将首先学习如何使用浮点数来表示时间。

**免费红利：** [单击此处可获得我们的免费Python备忘单](https://realpython.com/python-time-module/) ，其中显示了Python 3的基础知识，例如使用数据类型，字典，列表和Python函数。

广告

[移除广告](https://realpython.com/account/join/)

## 用秒处理Python时间

您可以在应用程序中管理Python时间概念的一种方法是使用浮点数，该浮点数表示自某个时代开始（即某个确定的起点）以来经过的秒数。

让我们更深入地了解其含义，为什么有用以及如何在应用程序中基于Python时间使用它来实现逻辑。

### 大纪元

您在上一节中了解到，您可以使用浮点数来管理Python时间，该浮点数表示自某个时代开始以来经过的时间。

[Merriam\-Webster](https://www.merriam-webster.com/dictionary/era) 将时代定义为：

*   一个固定的时间点，从中可以推断出一系列的年份
*   以给定日期为基础计算的时间符号系统

这里要掌握的重要概念是，在处理Python时间时，您要考虑一个由起点确定的时间段。 在计算中，您将此起点称为 **epoch** 。

那么，纪元就是您可以衡量时间流逝的起点。

例如，如果将纪元定义为UTC 1970年1月1日的午夜（Windows和大多数UNIX系统上定义的纪元），则可以将UTC 1970年1月2日的午夜表示 `86400` 为该纪元以来的秒数。

这是因为一分钟有60秒，一小时有60分钟，一天有24小时。 1970年1月2日UTC距时代只有一天，因此您可以应用基本数学来得出该结果：

\>>>

`>>> 60 * 60 * 24
86400`

同样重要的是要注意，您仍然可以表示时代之前的时间。 秒数将是负数。

例如，您可以将世界标准时间1969年12月31日午夜（以1970年1月1日为纪元）表示为 `-86400` 秒。

尽管1970年1月1日是UTC的通用纪元，但它并不是计算中使用的唯一纪元。 实际上，不同的操作系统，文件系统和API有时会使用不同的时期。

如您所见，UNIX系统将时代定义为1970年1月1日。另一方面，Win32 API将时代定义为 [1601年1月1日](https://blogs.msdn.microsoft.com/oldnewthing/20090306-00/?p=18913/) 。

您可以 `time.gmtime()` 用来确定系统的时代：

\>>>

`>>> import time
>>> time.gmtime(0)
time.struct_time(tm_year=1970, tm_mon=1, tm_mday=1, tm_hour=0, tm_min=0, tm_sec=0, tm_wday=3, tm_yday=1, tm_isdst=0)`

您将了解 `gmtime()` 和 `struct_time` 整篇文章的过程中。 现在，只知道您可以使用 `time` 此功能来发现纪元。

既然您了解了更多有关如何使用纪元来测量时间的信息，那么让我们看一下Python的 `time` 模块，看看它提供了哪些功能来帮助您实现这一目标。

[移除广告](https://realpython.com/account/join/)

### Python时间（以秒为单位）为浮点数

首先， `time.time()` 返回自纪元以来经过的秒数。 返回值是一个浮点数，占小数秒：

\>>>

`>>> from time import time
>>> time()
1551143536.9323719`

您在计算机上得到的数字可能会非常不同，因为被认为是纪元的参考点可能会非常不同。

**进一步阅读：** 引入了Python 3.7 [`time_ns()`](https://realpython.com/python37-new-features/#timing-precision) ，该函数返回一个整数值，该整数表示自该纪元以来经过的时间，但以纳秒而不是秒为单位。

出于多种原因，以秒为单位测量时间很有用：

*   您可以使用浮点数来计算两个时间点之间的时差。
*   浮点数易于 [序列化](https://en.wikipedia.org/wiki/Serialization) ，这意味着可以将其存储以进行数据传输，并在另一侧完整保留。

但是，有时您可能希望将当前时间表示为字符串。 为此，您可以将秒数传递 `time()` 到中 `time.ctime()` 。

### Python时间以秒为单位，表示本地时间

如您先前所见，您可能希望将Python时间（表示从纪元起经过的秒数）转换为 [string](https://realpython.com/python-strings/) 。 您可以使用 `ctime()` ：

\>>>

`>>> from time import time, ctime
>>> t = time()
>>> ctime(t)
'Mon Feb 25 19:11:59 2019'`

在这里，您已将当前时间（以秒为单位）记录到变量中 `t` ，然后 `t` 作为参数 传递 给 `ctime()` ，该 参数 返回该时间的字符串表示形式。

**技术细节：** 根据 `ctime()` 定义 ，表示自纪元以来的秒数的自变量是可选的 。 如果不传递参数，则 默认 `ctime()` 使用返回值 `time()` 。 因此，您可以简化上面的示例：

\>>>

`>>> from time import ctime
>>> ctime()
'Mon Feb 25 19:11:59 2019'`

返回 的时间的字符串表示形式，也称为 **timestamp** ， `ctime()` 其格式如下：

1.  **本周日：** `Mon` （ `Monday` ）
2.  **一年中的月份：** `Feb` （ `February` ）
3.  **每月的某天：** `25`
4.  **使用[24小时制的](https://en.wikipedia.org/wiki/24-hour_clock)小时，分钟和秒：** `19:11:59`
5.  **年：** `2019`

前面的示例显示了从美国中南部地区的计算机捕获的特定时刻的时间戳。 但是，假设您居住在澳大利亚的悉尼，并且在同一瞬间执行了相同的命令。

除了上面的输出，您将看到以下内容：

\>>>

`>>> from time import time, ctime
>>> t = time()
>>> ctime(t)
'Tue Feb 26 12:11:59 2019'`

注意， `day of week` ， `day of month` ，和 `hour` 时间戳的部分比第一示例不同。

这些输出是不同的，因为返回的时间戳 `ctime()` 取决于您的地理位置。

**注意：** 时区的概念与您的实际位置有关，但是您可以在计算机的设置中进行修改，而无需实际重新定位。

取决于您的实际位置的时间表示称为 **本地时间** ，并且使用了称为 **时区** 的概念 。

**注意：** 由于本地时间与您的语言环境相关，因此时间戳通常会考虑特定于语言环境的详细信息，例如字符串中元素的顺序以及日和月缩写的翻译。 `ctime()` 忽略这些细节。

让我们更深入地了解时区的概念，以便您可以更好地理解Python时间表示。

[移除广告](https://realpython.com/account/join/)

## 了解时区

时区是世界上符合标准时间的区域。 时区由它们相对于 [协调世界时](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) （UTC） 的偏移量 以及可能包含的夏令时定义（我们将在本文稍后详细介绍）。

**趣闻：** 如果您以英语为母语，您可能想知道为什么“协调世界时”的缩写是UTC而不是更明显的CUT。 但是，如果您是说法语的人，则可以将其称为“ Temps UniverselCoordonné”，这是一个不同的缩写：TUC。

最终， [国际电信联盟和国际天文学联盟对UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time#Etymology) 作为官方缩写进行了 [折衷，](https://en.wikipedia.org/wiki/Coordinated_Universal_Time#Etymology) 因此无论语言如何，该缩写都是相同的。

### UTC和时区

UTC是世界上所有时间同步（或协调）的时间标准。 它本身不是时区，而是定义什么时区的超越标准。

UTC时间是使用 [天文时间](https://www.merriam-webster.com/dictionary/astronomical%20time) （指地球的自转）和 [原子钟](https://en.wikipedia.org/wiki/Atomic_clock) 精确测量的 。

然后通过时区相对于UTC的偏移量来定义时区。 例如，在北美和南美，中央时区（CT）比UTC落后五或六个小时，因此使用UTC\-5：00或UTC\-6：00表示法。

另一方面，澳大利亚悉尼属于澳大利亚东部时区（AET），该时间比UTC（UTC + 10：00或UTC + 11：00）提前十到十一小时。

这种差异（UTC\-6：00至UTC + 10：00）是您 `ctime()` 在先前示例 的两个输出中观察到差异的原因 ：

*   **中部时间（CT）：** `'Mon Feb 25 19:11:59 2019'`
*   **澳大利亚东部时间（AET）：** `'Tue Feb 26 12:11:59 2019'`

这些时间恰好相隔十六小时，这与上述时区偏移量一致。

您可能想知道为什么CT可以比UTC落后5或6个小时，或者为什么AET可以比UTC提前10或11个小时。 这样做的原因是，世界上某些地区（包括这些时区的一部分）遵守夏令时。

### 夏令时

夏季通常 比冬季 多 [白天](https://sciencing.com/many-hours-daylight-summer-8196183.html) 。 因此，某些地区在春季和夏季要遵守夏令时（DST），以便更好地利用这些夏令时。

对于遵守DST的地方，它们的时钟会在春季开始时向前跳一个小时（实际上是浪费了一个小时）。 然后，在秋天，时钟将重置为标准时间。

字母S和D表示时区标记中的标准时间和夏时制：

*   中部标准时间（CST）
*   澳大利亚东部夏令时间（AEDT）

当您将时间表示为本地时间的时间戳时，考虑DST是否适用总是很重要的。

`ctime()` 节省了夏令时。 因此，前面列出的输出差异将更加准确，如下所示：

*   **中央标准时间（CST）：** `'Mon Feb 25 19:11:59 2019'`
*   **澳大利亚东部夏令时间（AEDT）：** `'Tue Feb 26 12:11:59 2019'`

[移除广告](https://realpython.com/account/join/)

## 使用数据结构处理Python时间

既然您已经掌握了许多基本的时间概念，包括纪元，时区和UTC，那么让我们看一下使用Python `time` 模块 表示时间的更多方法 。

### Python时间为元组

您可以使用另一个原始数据结构： [tuple](https://realpython.com/python-lists-tuples/) ，而不是使用数字来表示Python时间 。

元组通过抽象一些数据并使其更具可读性，使您可以更轻松地管理时间。

当您将时间表示为元组时，元组中的每个元素都对应于时间的特定元素：

1.  年
2.  以整数形式表示的月份，范围为1（一月）至12（十二月）
3.  一个月中的某天
4.  小时（整数），范围从0（12 AM）到23（11 PM）
5.  分钟
6.  第二
7.  星期几，整数形式，范围从0（星期一）到6（星期日）
8.  一年中的一天
9.  夏令时，为具有以下值的整数：
    *   `1` 是夏令时。
    *   `0` 是标准时间。
    *   `-1` 未知。

使用已经学习的方法，您可以通过两种不同的方式表示相同的Python时间：

\>>>

`>>> from time import time, ctime
>>> t = time()
>>> t
1551186415.360564
>>> ctime(t)
'Tue Feb 26 07:06:55 2019'

>>> time_tuple = (2019, 2, 26, 7, 6, 55, 1, 57, 0)`

在这种情况下， `t` 和 `time_tuple` 表示相同的时间，但是元组提供了更具可读性的界面来处理时间分量。

**技术细节：** 实际上，如果您查看以 `time_tuple` 秒为单位 的Python时间 （您将在本文稍后看到如何做），您会发现它解析为 `1551186415.0` 而不是 `1551186415.360564` 。

这是因为元组没有办法表示小数秒。

虽然元组为使用Python时间提供了更易于管理的界面，但还有一个更好的对象： `struct_time` 。

### Python时间作为对象

元组构造的问题在于，尽管它比单个基于秒的数字更好地组织起来，但看起来仍然像一堆数字。

`struct_time` 通过利用 [`NamedTuple`](https://dbader.org/blog/writing-clean-python-with-namedtuples) Python `collections` 模块中的，将元组的数字序列与有用的标识符相关联 ， 提供了一种解决方案 ：

\>>>

`>>> from time import struct_time
>>> time_tuple = (2019, 2, 26, 7, 6, 55, 1, 57, 0)
>>> time_obj = struct_time(time_tuple)
>>> time_obj
time.struct_time(tm_year=2019, tm_mon=2, tm_mday=26, tm_hour=7, tm_min=6, tm_sec=55, tm_wday=1, tm_yday=57, tm_isdst=0)`

**技术细节：** 如果您来自另一种语言，则术语 `struct` 和 `object` 可能会彼此相反。

在Python中，没有称为的数据类型 `struct` 。 相反，一切都是对象。

但是，该名称 `struct_time` 是从 [基于C的时间库](https://en.cppreference.com/w/c/chrono/tm) 派生的， 其中数据类型实际上是 `struct` 。

实际上， [用C语言实现的](https://github.com/python/cpython/blob/master/Modules/timemodule.c) Python `time` 模块 通过包含头文件直接 使用此 模块 。 [](https://github.com/python/cpython/blob/master/Modules/timemodule.c)`struct` `times.h`

现在，您可以 `time_obj` 使用属性名称而不是索引 来访问特定元素 ：

\>>>

`>>> day_of_year = time_obj.tm_yday
>>> day_of_year
57
>>> day_of_month = time_obj.tm_mday
>>> day_of_month
26`

除了的可读性和可用性外 `struct_time` ，了解它也很重要，因为它是Python `time` 模块 中许多函数的返回类型 。

[移除广告](https://realpython.com/account/join/)

## 将以秒为单位的Python时间转换为对象

现在，您已经了解了使用Python时间的三种主要方法，您将学习如何在不同的时间数据类型之间进行转换。

在时间数据类型之间进行转换取决于时间是UTC还是本地时间。

### 世界标准时间（UTC）

纪元使用UTC定义而不是时区。 因此，自纪元以来经过的秒数不会根据您的地理位置而变化。

但是，不能说相同 `struct_time` 。 Python时间的对象表示可能会也可能不会考虑您的时区。

有两种方法可以将代表秒的浮点数转换为 `struct_time` ：

1.  世界标准时间
2.  当地时间

要将Python时间浮点转换为基于UTC的时间 `struct_time` ，Python `time` 模块提供了一个名为的函数 `gmtime()` 。

您已经 `gmtime()` 在本文中 看到过 使用过一次：

\>>>

`>>> import time
>>> time.gmtime(0)
time.struct_time(tm_year=1970, tm_mon=1, tm_mday=1, tm_hour=0, tm_min=0, tm_sec=0, tm_wday=3, tm_yday=1, tm_isdst=0)`

您使用此调用来发现系统的时代。 现在，您有了一个更好的基础来了解此处的实际情况。

`gmtime()` 将自纪元以来经过的秒数转换为 `struct_time` UTC。 在这种情况下，您已经传递 `0` 了秒数，这意味着您试图在UTC中查找纪元本身。

**注意：** 请注意，属性 `tm_isdst` 设置为 `0` 。 此属性表示时区是否正在使用夏时制。 UTC绝不赞同DST，使标志将永远是 `0` 当使用 `gmtime()` 。

如您所见， `struct_time` 不能代表小数秒，因此可以 `gmtime()` 忽略参数中的小数秒：

\>>>

`>>> import time
>>> time.gmtime(1.99)
time.struct_time(tm_year=1970, tm_mon=1, tm_mday=1, tm_hour=0, tm_min=0, tm_sec=1, tm_wday=3, tm_yday=1, tm_isdst=0)`

请注意，即使您经过的秒数非常接近 `2` ， `.99` 小数秒 也会 被忽略，如所示 `tm_sec=1` 。

的 `secs` 参数 `gmtime()` 是可选的，这意味着您可以 `gmtime()` 不带任何参数 进行调用 。 这样做将提供UTC的当前时间：

\>>>

`>>> import time
>>> time.gmtime()
time.struct_time(tm_year=2019, tm_mon=2, tm_mday=28, tm_hour=12, tm_min=57, tm_sec=24, tm_wday=3, tm_yday=59, tm_isdst=0)`

有趣的是，此函数中没有逆函数 `time` 。 相反，您必须在Python的 `calendar` 模块中查找名为的函数 `timegm()` ：

\>>>

`>>> import calendar
>>> import time
>>> time.gmtime()
time.struct_time(tm_year=2019, tm_mon=2, tm_mday=28, tm_hour=13, tm_min=23, tm_sec=12, tm_wday=3, tm_yday=59, tm_isdst=0)
>>> calendar.timegm(time.gmtime())
1551360204`

`timegm()` 接受一个元组（或 `struct_time` ，因为它是元组的子类），并返回距该纪元以来的相应秒数。

**历史背景：** 如果您对为什么 `timegm()` 不在 这里感兴趣 `time` ，可以在 [Python Issue 6280中](https://bugs.python.org/issue6280) 查看讨论 。

简而言之，最初添加它是 `calendar` 因为 `time` 它紧随C的时间库（在中定义 `time.h` ），其中不包含匹配函数。 上述问题提出了移入或复制 `timegm()` 到 的想法 `time` 。

但是，随着 `datetime` 库的改进，的修补实施中的不一致 `time.timegm()` 以及如何处理的问题 `calendar.timegm()` ，维护人员拒绝了该修补程序，因此鼓励使用该修补程序 `datetime` 。

因为它是标准，所以使用UTC在编程中非常有价值。 您不必担心DST，时区或语言环境信息。

就是说，有很多情况下您想使用当地时间。 接下来，您将看到如何从秒转换为本地时间，以便做到这一点。

[移除广告](https://realpython.com/account/join/)

### 当地时间

在您的应用程序中，您可能需要使用当地时间而不是UTC。 Python的 `time` 模块提供了一个功能，用于从自epoch调用以来经过的秒数获取本地时间 `localtime()` 。

的签名 `localtime()` 类似于 `gmtime()` ，它带有一个可选 `secs` 参数，用于 `struct_time` 使用您当地的时区 构建一个 ：

\>>>

`>>> import time
>>> time.time()
1551448206.86196
>>> time.localtime(1551448206.86196)
time.struct_time(tm_year=2019, tm_mon=3, tm_mday=1, tm_hour=7, tm_min=50, tm_sec=6, tm_wday=4, tm_yday=60, tm_isdst=0)`

注意 `tm_isdst=0` 。 由于DST与本地时间的问题， `tm_isdst` 会之间进行切换 `0` ，并 `1` 根据DST是否适用于给定的时间。 由于 `tm_isdst=0` ，DST不适用于2019年3月1日。

在美国，2019年的夏令时开始于3月10日。因此，要测试DST标志是否会正确更改，您需要在参数中添加9天的秒数 `secs` 。

要计算这一点，您需要将一天中的秒数（86,400）乘以9天：

\>>>

`>>> new_secs = 1551448206.86196 + (86400 * 9)
>>> time.localtime(new_secs)
time.struct_time(tm_year=2019, tm_mon=3, tm_mday=10, tm_hour=8, tm_min=50, tm_sec=6, tm_wday=6, tm_yday=69, tm_isdst=1)`

现在，您将看到 `struct_time` 显示的日期为2019年3月10日 `tm_isdst=1` 。 另外，请注意 ，由于夏时制的原因 ， `tm_hour` 它也跳到 了前面的示例中， `8` 而不是 `7` 之前的示例中。

从Python 3.3开始， `struct_time` 还包括两个属性，它们对于确定时区非常有用 `struct_time` ：

1.  `tm_zone`
2.  `tm_gmtoff`

最初，这些属性与平台有关，但是自Python 3.6起，它们在所有平台上都可用。

首先， `tm_zone` 存储本地时区：

\>>>

`>>> import time
>>> current_local = time.localtime()
>>> current_local.tm_zone
'CST'`

在这里，您可以看到 `localtime()` 返回 `struct_time` 的时区设置为 `CST` （中央标准时间）。

如您先前所见，您还可以基于两条信息（UTC偏移量和DST（如果适用））来判断时区：

\>>>

`>>> import time
>>> current_local = time.localtime()
>>> current_local.tm_gmtoff
-21600
>>> current_local.tm_isdst
0`

在这种情况下，你可以看到， `current_local` 是 `21600` 后面GMT，代表格林威治标准时间秒。 GMT是没有UTC偏移的时区：UTC±00：00。

`21600` 秒除以每小时的秒数（3600）表示 `current_local` 时间为 `GMT-06:00` （或 `UTC-06:00` ）。

您可以使用GMT偏移量和DST状态推断， `current_local` 是 `UTC-06:00` 在标准时间，这对应于中央标准时区。

就像 `gmtime()` ，您可以在 `secs` 调用时 忽略 参数 `localtime()` ，它将在中返回当前本地时间 `struct_time` ：

\>>>

`>>> import time
>>> time.localtime()
time.struct_time(tm_year=2019, tm_mon=3, tm_mday=1, tm_hour=8, tm_min=34, tm_sec=28, tm_wday=4, tm_yday=60, tm_isdst=0)`

不同于 `gmtime()` ，的反函数 `localtime()` 确实存在于Python `time` 模块中。 让我们看看它是如何工作的。

[移除广告](https://realpython.com/account/join/)

## 将本地时间对象转换为秒

您已经了解了如何使用将UTC时间对象转换为秒 `calendar.timegm()` 。 要将本地时间转换为秒，您将使用 `mktime()` 。

`mktime()` 要求您传递一个称为参数的参数 `t` ， 该参数 采用普通的9元组或 `struct_time` 表示本地时间 的 对象的形式：

\>>>

`>>> import time

>>> time_tuple = (2019, 3, 10, 8, 50, 6, 6, 69, 1)
>>> time.mktime(time_tuple)
1552225806.0

>>> time_struct = time.struct_time(time_tuple)
>>> time.mktime(time_struct)
1552225806.0`

请记住， `t` 必须是代表当地时间的元组，而不是UTC， 这一点很重要 ：

\>>>

`>>> from time import gmtime, mktime

>>> # 1
>>> current_utc = time.gmtime()
>>> current_utc
time.struct_time(tm_year=2019, tm_mon=3, tm_mday=1, tm_hour=14, tm_min=51, tm_sec=19, tm_wday=4, tm_yday=60, tm_isdst=0)

>>> # 2
>>> current_utc_secs = mktime(current_utc)
>>> current_utc_secs
1551473479.0

>>> # 3
>>> time.gmtime(current_utc_secs)
time.struct_time(tm_year=2019, tm_mon=3, tm_mday=1, tm_hour=20, tm_min=51, tm_sec=19, tm_wday=4, tm_yday=60, tm_isdst=0)`

**注意：** 在此示例中，假定本地时间为 `March 1, 2019 08:51:19 CST` 。

此示例说明了为什么使用 `mktime()` 本地时间而不是UTC如此重要：

1.  **`gmtime()`** 如果不带参数，则返回 `struct_time` 使用UTC的值。 `current_utc` 显示 `March 1, 2019 14:51:19 UTC` 。 这是正确的，因为 `CST is UTC-06:00` ，因此UTC应该比当地时间早6小时。

2.  **`mktime()`** 尝试返回期望当地时间的秒数，但您 `current_utc` 改为 通过 。 因此， `current_utc` 假定您的意思 不是理解现在 是UTC时间 `March 1, 2019 14:51:19 CST` 。

3.  **`gmtime()`** 然后使用来将这些秒转换回UTC，从而导致不一致。 现在是时候了 `March 1, 2019 20:51:19 UTC` 。 这种差异的原因是 `mktime()` 预期的本地时间。 因此，转换回UTC增加了 *另一个* 6小时至当地时间。

众所周知，使用时区非常困难，因此，重要的是要了解UTC与本地时间之间的差异以及处理每个时区的Python时间函数，以使自己成功。

## 将Python时间对象转换为字符串

虽然使用元组很有趣，但有时最好使用字符串。

时间的字符串表示形式（也称为时间戳记）有助于使时间更具可读性，并且对于构建直观的用户界面特别有用。

有两个Python `time` 函数可用于将 `time.struct_time` 对象转换为字符串：

1.  `asctime()`
2.  `strftime()`

您将从学习有关开始 `asctime()` 。

### `asctime()`

您 `asctime()` 用于将时间元组或 `struct_time` 时间戳 转换为 ：

\>>>

`>>> import time
>>> time.asctime(time.gmtime())
'Fri Mar  1 18:42:08 2019'
>>> time.asctime(time.localtime())
'Fri Mar  1 12:42:15 2019'`

无论 `gmtime()` 和 `localtime()` 回报 `struct_time` 的情况下，分别为UTC和本地时间。

您可以使用 `asctime()` 转换 `struct_time` 为时间戳。 `asctime()` 其工作原理与 `ctime()` 您在本文前面了解的 相似 ，除了传递一个元组而不是传递浮点数。 两个函数之间的时间戳格式都相同。

与一样 `ctime()` ，参数for `asctime()` 是可选的。 如果您没有将时间对象传递给 `asctime()` ，则它将使用当前的本地时间：

\>>>

`>>> import time
>>> time.asctime()
'Fri Mar  1 12:56:07 2019'`

与一样 `ctime()` ，它也忽略语言环境信息。

最大的缺点之一 `asctime()` 是其格式不灵活。 `strftime()` 通过允许您格式化时间戳来解决此问题。

[移除广告](https://realpython.com/account/join/)

### `strftime()`

你可能会发现自己在一个位置，从字符串格式 `ctime()` 并 `asctime()` 没有为您的应用满意。 相反，您可能想以对用户更有意义的方式来格式化字符串。

这样的一个示例是，如果您想在考虑到区域设置信息的字符串中显示您的时间。

要格式化字符串（给定a `struct_time` 或Python时间元组），请使用 `strftime()` ，它表示“字符串 **格式化** 时间”。

`strftime()` 有两个参数：

1.  **`format`** 指定字符串中时间元素​​的顺序和形式。
2.  **`t`** 是一个可选的时间元组。

要格式化字符串，请使用 **伪指令** 。 指令是以开头的字符序列， `%` 用于指定特定的时间元素，例如：

*   **`%d`：** 每月的一天
*   **`%m`：** 一年中的月份
*   **`%Y`：** 年

例如，您可以使用 [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) 标准 以本地时间输出日期， 如下所示：

\>>>

`>>> import time
>>> time.strftime('%Y-%m-%d', time.localtime())
'2019-03-01'`

**进一步阅读：** 虽然使用Python时间表示日期是完全有效和可以接受的，但您还应该考虑使用Python的 `datetime` 模块，该模块提供了快捷方式和更健壮的框架，可一起使用日期和时间。

例如，您可以使用以下命令简化以ISO 8601格式输出的日期 `datetime` ：

\>>>

`>>> from datetime import date
>>> date(year=2019, month=3, day=1).isoformat()
'2019-03-01'`

要了解有关使用Python `datetime` 模块的 更多信息 ，请查看 [使用Python datetime处理日期和时间](https://realpython.com/python-datetime/)

如您之前所见，使用 `strftime()` over的 一个很大好处 `asctime()` 是它能够渲染利用特定于语言环境的信息的时间戳。

例如，如果要以对语言环境敏感的方式表示日期和时间，则不能使用 `asctime()` ：

\>>>

`>>> from time import asctime
>>> asctime()
'Sat Mar  2 15:21:14 2019'

>>> import locale
>>> locale.setlocale(locale.LC_TIME, 'zh_HK')  # Chinese - Hong Kong
'zh_HK'
>>> asctime()
'Sat Mar  2 15:58:49 2019'`

请注意，即使以编程方式更改了区域设置后， `asctime()` 仍将以与以前相同的格式返回日期和时间。

**技术详细信息：** `LC_TIME` 是日期和时间格式的语言环境类别。 该 `locale` 参数 `'zh_HK'` 可以是不同的，取决于你的系统。

`strftime()` 但是， 当您使用 时，您会看到它说明了语言环境：

\>>>

`>>> from time import strftime, localtime
>>> strftime('%c', localtime())
'Sat Mar  2 15:23:20 2019'

>>> import locale
>>> locale.setlocale(locale.LC_TIME, 'zh_HK')  # Chinese - Hong Kong
'zh_HK'
>>> strftime('%c', localtime())
'六  3/ 2 15:58:12 2019' 2019'`

在这里，因为您使用，所以您已成功利用了语言环境信息 `strftime()` 。

**注意：** `%c` 是适用于区域设置的日期和时间的指令。

如果时间元组未传递给参数 `t` ，则 默认情况下 `strftime()` 将使用的结果 `localtime()` 。 因此，您可以通过删除可选的第二个参数来简化上面的示例：

\>>>

`>>> from time import strftime
>>> strftime('The current local datetime is: %c')
'The current local datetime is: Fri Mar  1 23:18:32 2019'`

在这里，您使用默认时间，而不是使用自己的时间作为参数。 另外，请注意， `format` 参数可以包含格式指令以外的其他文本。

**延伸阅读：** 看看这个彻底 [的指令列表](https://docs.python.org/3/library/time.html#time.strftime) 可用 `strftime()` 。

Python `time` 模块还包括将时间戳转换回 `struct_time` 对象 的逆操作 。

[移除广告](https://realpython.com/account/join/)

## 将Python时间字符串转换为对象

当您使用与日期和时间相关的字符串时，将时间戳转换为时间对象可能非常有价值。

要将时间字符串转换为 `struct_time` ，可以使用 `strptime()` ，它代表“字符串 **解析** 时间”：

\>>>

`>>> from time import strptime
>>> strptime('2019-03-01', '%Y-%m-%d')
time.struct_time(tm_year=2019, tm_mon=3, tm_mday=1, tm_hour=0, tm_min=0, tm_sec=0, tm_wday=4, tm_yday=60, tm_isdst=-1)`

的第一个参数 `strptime()` 必须是您希望转换的时间戳。 第二个参数是 `format` 时间戳记所在的时间。

该 `format` 参数是可选的，默认为 `'%a %b %d %H:%M:%S %Y'` 。 因此，如果您使用该格式的时间戳，则无需将其作为参数传递：

\>>>

`>>> strptime('Fri Mar 01 23:38:40 2019')
time.struct_time(tm_year=2019, tm_mon=3, tm_mday=1, tm_hour=23, tm_min=38, tm_sec=40, tm_wday=4, tm_yday=60, tm_isdst=-1)`

由于 `struct_time` 包含9个关键日期和时间组成部分，因此 `strptime()` 必须为无法从中解析的那些组成部分的值提供合理的默认值 `string` 。

在前面的示例中， `tm_isdst=-1` 。 这意味着 `strptime()` 无法通过时间戳确定它是否代表夏时制。

现在，您知道了如何使用该 `time` 模块以多种方式 使用Python时间和日期 。 但是，除了 `time` 简单地创建时间对象，获取Python时间字符串以及使用自纪元以来经过的秒数之外 ，还有其他用途 。

## 暂停执行

一个真正有用的Python时间函数是 `sleep()` ，该 函数 将线程的执行挂起指定的时间。

例如，您可以将程序的执行暂停10秒钟，如下所示：

\>>>

`>>> from time import sleep, strftime
>>> strftime('%c')
'Fri Mar  1 23:49:26 2019'
>>> sleep(10)
>>> strftime('%c')
'Fri Mar  1 23:49:36 2019'`

您的程序将打印第一个格式化的 `datetime` 字符串，然后暂停10秒钟，最后打印第二个格式化的 `datetime` 字符串。

您还可以将小数秒传递给 `sleep()` ：

\>>>

`>>> from time import sleep
>>> sleep(0.5)`

`sleep()` 这对于测试或使程序出于任何原因等待很有用，但是除非有充分的理由，否则请务必不要停止生产代码。

在Python 3.5之前，发送到您的进程的信号可能会中断 `sleep()` 。 但是，在3.5及更高版本中， `sleep()` 即使进程接收到信号 ， 也将始终至少在指定的时间量内暂停执行。

`sleep()` 只是一个Python时间函数，可以帮助您测试程序并使它们更强大。

[移除广告](https://realpython.com/account/join/)

## 衡量绩效

您可以 `time` 用来衡量程序的性能。

这样做的方法就是使用 `perf_counter()` 它，顾名思义，它为高分辨率的性能计数器提供了测量短时间距离的方法。

要使用 `perf_counter()` ，您可以在代码开始执行之前以及代码执行完成之后放置一个计数器：

\>>>

`>>> from time import perf_counter
>>> def longrunning_function():
...     for i in range(1, 11):
...         time.sleep(i / i ** 2)
...
>>> start = perf_counter()
>>> longrunning_function()
>>> end = perf_counter()
>>> execution_time = (end - start)
>>> execution_time
8.201258441999926`

首先， `start` 捕获调用该函数之前的时刻。 `end` 捕获函数返回后的时刻。 该函数的总执行时间为 `(end - start)` 几秒钟。

**技术细节：** 引入了Python 3.7 `perf_counter_ns()` ，其功能与相同 `perf_counter()` ，但使用纳秒而不是秒。

`perf_counter()` （或 `perf_counter_ns()` ）是使用一次执行来评估代码性能的最精确方法。 但是，如果您想准确评估代码段的性能，建议您使用 [Python `timeit`](https://docs.python.org/3/library/timeit.html) 模块。

`timeit` 专长于多次运行代码以获得更准确的性能分析，并帮助您避免过度简化时间度量以及其他常见陷阱。

## 结论

恭喜你！ 现在，您已经为使用Python中的日期和时间奠定了良好的基础。

现在，您可以：

*   使用浮点数来表示时间，该浮点数表示自纪元以来经过的秒数
*   使用元组和 `struct_time` 对象 管理时间
*   在秒，元组和时间戳字符串之间转换
*   暂停执行Python线程
*   使用以下方式衡量效果 `perf_counter()`

最重要的是，您已经了解了一些有关日期和时间的基本概念，例如：

*   时代
*   世界标准时间
*   时区
*   夏令时

现在，是时候将您对Python时间的新发现应用到您的实际应用程序中了！

## 进一步阅读

如果要继续学习有关在Python中使用日期和时间的更多信息，请查看以下模块：

*   **[`datetime`](https://docs.python.org/3/library/datetime.html)：** Python标准库中更强大的日期和时间模块
*   **[`timeit`](https://docs.python.org/3/library/timeit.html)：** 用于测量代码段性能的模块
*   **[`astropy`](http://docs.astropy.org/en/stable/time/)：** 天文学中使用的高精度日期时间

立即观看 本教程有一个由Real Python团队创建的相关视频课程。 与书面教程一起观看，以加深您的理解： [**掌握Python的内置时间模块**](https://realpython.com/courses/mastering-time-module/)

🐍Python技巧💌

每两天 将简短而可爱的 **Python技巧** 发送到您的收件箱。 从来没有垃圾邮件。 随时退订。 由Real Python团队策划。
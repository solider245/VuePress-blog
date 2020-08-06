---
title : 时间函数datetime常见用法汇总
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-06 23:08:55 +0800
categories:
 -
tags:
 -
---
[[toc]]

## 这里做一个小汇总

::: details 代码
```python
# -*- coding: utf-8 -*-

import datetime


if __name__ == '__main__':
    now = datetime.datetime.now()
    t = datetime.datetime(2019, 12, 22, 20)
    print("相差 不足秒的整数时间(按微秒计算)： ", (now - t).microseconds, "微秒")
    print("相差 不足天的整数时间（按秒计算）： ", (now - t).seconds, "秒")
    print("相差 天的整数时间（按天计算）： ", (now - t).days, "天", end="\n\n")

    print("相差 秒（将时间差计算为秒，含小数）： ", (now - t).total_seconds(), "秒")
    print("相差 毫秒（含小数）： ", (now - t).total_seconds() * 1000, "毫秒")
    print("相差 微秒（含小数）： ", (now - t).total_seconds() * 1000 * 1000, "微秒")
    print("相差 分钟（含小数）： ", (now - t).total_seconds() / 60, "分钟")
    print("相差 小时（含小数）： ", (now - t).total_seconds() / 60 / 60, "小时")
    print("相差 天（含小数）： ", (now - t).total_seconds() / 60 / 60 / 24, "天", end="\n\n")

    # 验证 反向计算
    print("相差 不足天的整数时间（按微秒计算）： ",
          int(((now - t).total_seconds() - (now - t).days * 24 * 60 * 60 - (now - t).seconds) * 1000 * 1000), "微秒")
    print("相差 不足秒的整数时间(按秒计算)： ", int((now - t).total_seconds() - (now - t).days * 24 * 60 * 60), "秒")
    print("相差 天的整数时间（按天计算）： ",
          int((now - t).total_seconds() / 60 / 60 / 24), "天")
```          
:::

输出
>

::: details
```

相差 不足秒的整数时间(按微秒计算)：  920527 微秒
相差 不足天的整数时间（按秒计算）：  10902 秒
相差 天的整数时间（按天计算）：  228 天

相差 秒（将时间差计算为秒，含小数）：  19710102.920527 秒
相差 毫秒（含小数）：  19710102920.527 毫秒
相差 微秒（含小数）：  19710102920527.0 微秒
相差 分钟（含小数）：  328501.71534211666 分钟
相差 小时（含小数）：  5475.028589035278 小时
相差 天（含小数）：  228.12619120980324 天

相差 不足天的整数时间（按微秒计算）：  920526 微秒
相差 不足秒的整数时间(按秒计算)：  10902 秒
相差 天的整数时间（按天计算）：  228 天
```
:::



个人写法如下：

::: details
```python
#%%
import datetime
import time

开始时间 = datetime.datetime.now()
#print(开始时间)
time.sleep(3)
结束时间 = datetime.datetime.now()
#print(endtime)
运行时间 = 结束时间 - 开始时间
print(运行时间.seconds)
```
```python
#%%
import datetime
import time 
starttime = datetime.datetime.now()
#long running
time.sleep(3)
endtime = datetime.datetime.now()
c = endtime - starttime
print (c.seconds)
```
:::

上面是两段代码，也是现在比较常见的，结束时间减去开始时间等于运行时间。

## 时间函数的主要参数

>参数可以是days, hours，minutes，seconds,microseconds,如果是负数就是向前多少时间其本上常用的类： datetime和timedelta两个。它们之间可以相互加减。每个类都有一些方法和属性可以查看具体的值，如 datetime可以查看：天数(day)，小时数(hour)，星期几(weekday())等;timedelta可以查看：天数(days)，秒数 (seconds)等.


* days
* hours
* minutes
* seconds
* microseconds

## 更多例子

1、方便的计算两个时间的差，如两个时间相差几天，几小时：

> import datetime
>
> d1 = datetime.datetime(2009, 3, 23)
>
> d2 = datetime.datetime(2009, 10, 7)
>
> dayCount = (d1 \- d2).days

2、python计算两个时间之间的秒数

> import datetime
>
> starttime = datetime.datetime.now()
>
> #long running
>
> endtime = datetime.datetime.now()
>
> print (endtime \- starttime).seconds

3、时间相加

> d1 = datetime.datetime.now()
>
> d3 = d1 + datetime.timedelta(days=10)
>
> print d3.ctime()

## 参考文献

[python 计算时间差，时间加减运算代码 - 简书](https://www.jianshu.com/p/44b47776eb3b)
[python利用datetime模块计算时间差_Python_运维开发网_运维开发技术经验分享](https://www.qedev.com/python/51007.html)
---
title : Scrapy爬虫框架教程（一）-- Scrapy入门 - 知乎
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-28 08:21:45 +0800
categories:
 -
tags:
 -
---
[[toc]]

个人博客地址：[woodenrobot.me](https://link.zhihu.com/?target=http%3A//woodenrobot.me/)

转行做python程序员已经有三个月了，这三个月用Scrapy爬虫框架写了将近两百个爬虫，不能说精通了Scrapy，但是已经对Scrapy有了一定的熟悉。准备写一个系列的Scrapy爬虫教程，一方面通过输出巩固和梳理自己这段时间学到的知识，另一方面当初受惠于别人的博客教程，我也想通过这个系列教程帮助一些想要学习Scrapy的人。

> Scrapy是一个为了爬取网站数据，提取结构性数据而编写的应用框架。 可以应用在包括数据挖掘，信息处理或存储历史数据等一系列的程序中。  
> 其最初是为了 页面抓取 (更确切来说, 网络抓取 )所设计的， 也可以应用在获取API所返回的数据(例如 Amazon Associates Web Services ) 或者通用的网络爬虫。

各组件作用
-----

### Scrapy Engine

> 引擎负责控制数据流在系统中所有组件中流动，并在相应动作发生时触发事件。 详细内容查看下面的数据流(Data Flow)部分。

此组件相当于爬虫的“大脑”，是整个爬虫的调度中心。

### 调度器(Scheduler)

> 调度器从引擎接受request并将他们入队，以便之后引擎请求他们时提供给引擎。

初始的爬取URL和后续在页面中获取的待爬取的URL将放入调度器中，等待爬取。同时调度器会自动去除重复的URL（如果特定的URL不需要去重也可以通过设置实现，如post请求的URL）

### 下载器(Downloader)

> 下载器负责获取页面数据并提供给引擎，而后提供给spider。

### Spiders

> Spider是Scrapy用户编写用于分析response并提取item(即获取到的item)或额外跟进的URL的类。 每个spider负责处理一个特定(或一些)网站。

### Item Pipeline

> Item Pipeline负责处理被spider提取出来的item。典型的处理有清理、 验证及持久化(例如存取到数据库中)。

当页面被爬虫解析所需的数据存入Item后，将被发送到项目管道(Pipeline)，并经过几个特定的次序处理数据，最后存入本地文件或存入数据库。

### 下载器中间件(Downloader middlewares)

> 下载器中间件是在引擎及下载器之间的特定钩子(specific hook)，处理Downloader传递给引擎的response。 其提供了一个简便的机制，通过插入自定义代码来扩展Scrapy功能。

通过设置下载器中间件可以实现爬虫自动更换user-agent、IP等功能。

### Spider中间件(Spider middlewares)

> Spider中间件是在引擎及Spider之间的特定钩子(specific hook)，处理spider的输入(response)和输出(items及requests)。 其提供了一个简便的机制，通过插入自定义代码来扩展Scrapy功能。

数据流(Data flow)
--------------

> 1.  引擎打开一个网站(open a domain)，找到处理该网站的Spider并向该spider请求第一个要爬取的URL(s)。
>     
> 2.  引擎从Spider中获取到第一个要爬取的URL并在调度器(Scheduler)以Request调度。
>     
> 3.  引擎向调度器请求下一个要爬取的URL。
>     
> 4.  调度器返回下一个要爬取的URL给引擎，引擎将URL通过下载中间件(请求(request)方向)转发给下载器(Downloader)。
>     
> 5.  一旦页面下载完毕，下载器生成一个该页面的Response，并将其通过下载中间件(返回(response)方向)发送给引擎。
>     
> 6.  引擎从下载器中接收到Response并通过Spider中间件(输入方向)发送给Spider处理。
>     
> 7.  Spider处理Response并返回爬取到的Item及(跟进的)新的Request给引擎。
>     
> 8.  引擎将(Spider返回的)爬取到的Item给Item Pipeline，将(Spider返回的)Request给调度器。
>     
> 9.  (从第二步)重复直到调度器中没有更多地request，引擎关闭该网站。
>     

创建项目
----

在开始爬取之前，首先要创建一个新的Scrapy项目。这里以爬取我的博客为例，进入你打算存储代码的目录中，运行下列命令:

```
scrapy startproject scrapyspider
```

该命令将会创建包含下列内容的scrapyspider目录:

```
scrapyspider/
    scrapy.cfg
    scrapyspider/
        __init__.py
        items.py
        pipelines.py
        settings.py
        spiders/
            __init__.py
            ...
```

这些文件分别是:

*   scrapy.cfg: 项目的配置文件。
*   scrapyspider/: 该项目的python模块。之后您将在此加入代码。
*   scrapyspider/items.py: 项目中的item文件。
*   scrapyspider/pipelines.py: 项目中的pipelines文件。
*   scrapyspider/settings.py: 项目的设置文件。
*   scrapyspider/spiders/: 放置spider代码的目录。

编写第一个爬虫(Spider)
---------------

> Spider是用户编写用于从单个网站(或者一些网站)爬取数据的类。
> 
> 其包含了一个用于下载的初始URL，如何跟进网页中的链接以及如何分析页面中的内容， 提取生成 item 的方法。
> 
> 为了创建一个Spider，您必须继承 scrapy.Spider 类， 且定义以下三个属性:
> 
> *   name: 用于区别Spider。 该名字必须是唯一的，您不可以为不同的Spider设定相同的名字。
> *   start_urls: 包含了Spider在启动时进行爬取的url列表。 因此，第一个被获取到的页面将是其中之一。 后续的URL则从初始的URL获取到的数据中提取。
> *   parse() 是spider的一个方法。 被调用时，每个初始URL完成下载后生成的 Response 对象将会作为唯一的参数传递给该函数。 该方法负责解析返回的数据(response data)，提取数据(生成item)以及生成需要进一步处理的URL的 Request 对象。

以下为我们的第一个Spider代码，保存在scrapyspider/spiders目录下的blog_spider.py文件中:

```py
from scrapy.spiders import Spider

class BlogSpider(Spider):
    name = 'woodenrobot'
    start_urls = ['http://woodenrobot.me']

    def parse(self, response):
        titles = response.xpath('//a[@class="post-title-link"]/text()').extract()
        for title in titles:
            print title.strip()
```

启动爬虫
----

打开终端进入项目所在路径(即:scrapyspider路径下)运行下列命令：

启动爬虫后就可以看到打印出来当前页所有文章标题了。

Ps:这一篇教程里就先简单介绍这么多，有好多东西我还没想好这么讲。期待后面的干货吧！
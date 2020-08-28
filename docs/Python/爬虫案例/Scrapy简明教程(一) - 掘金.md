---
title : Scrapy简明教程(一) - 掘金
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-27 17:30:26 +0800
categories:
 -
tags:
 -
---
[[toc]]
[原文链接](https://ihades.cn/post/12/)

[Scrapy](https://scrapy.org/)是一个纯Python语言实现的爬虫框架，简单、易用、拓展性高使得其成为Python爬虫中的主流利器，本文以目前官方最新的版本**1.6**为基础，展开从简单使用到深入原理的探讨。

提前说一下教程归教程，总归还是没有官方文档讲的贴切！如果读者阅读完本文对Scrapy产生了兴趣并原意更深入了解Scrapy的话，请一定养成随时翻阅官方文档的习惯！

[Scrapy官方文档](https://docs.scrapy.org/en/latest/)

本文主要阐述以下内容

*   为什么选择Scrapy？
*   Hello Scrapy！（实践）
*   Scrapy如何工作的？

对于第一小节『为什么选择Scrapy』建议读者都能阅览一下，我会分析一下我对Scrapy的业务场景的理解。

对于余下的两个小节，我原意是将『Scrapy是如何工作的』放在『Hello Scrapy』之前去讲的，但是考虑到并非所有人都愿意一上来就了解理论性的东西，所以就先把实践性的小Demo放在前面讲，希望以此引起读者的兴趣，兴趣能让我们更深入的了解一件事。因此我就把『Scrapy如何工作』这一节放在最后讲，也可以承接下一章的Scrapy原理！

虽然Scrapy已经被设计的能够满足绝大多数的爬虫工作，但还是有一些场景其实并不适用。

*   什么情况Scrapy不是首选？

1.  当你的爬取页面数量很少，针对的站点规模很小的时候，Scrapy并不是首选。例如爬取点电影榜单，某些新闻资讯等等，Requests+PyQuery这种方式就已经能够很好的完成此类任务，产生的代码量比Scrapy少，并且从网络请求效率以及网页解析速度上Requests和PyQuery都比Scrapy自带的两个模块要好！
    
2.  没有通用性爬虫需求时，Scrapy可选可不选。在我看来Scrapy真正的好处在于能够针对多种不同类型的网站定制相应的『Spider动作』，强大的『ItemLoader』能够对数据输入输出定义一系列的处理动作。假如你没有需要不断的拓展信息源的需求，Scrapy其实并不能发挥最大的能力！
    
3.  当你需要增量爬取数据时，Scrapy显得很无力。Scrapy并没有增量爬取的功能实现，因为增量的难度不一样，如果简单需求对Scrapy进行小手术估计就能完成了，但是如果是增量要求高的话，可能Scrapy真的动起来很麻烦！
    

**注意：以上三种情况只是想说明Scrapy不是首选，并没有说不建议用！只是希望读者能够明白在选择一个框架或技术的时候不是跟风，在设计之初就考虑慎重对项目的良好发展有很大的益处。**

*   什么情况Scrapy很好用？

1.  需要分布式设计时，Scrapy的非官方组件Scrapy-redis很好用。Scrapy本身也并不能实现分布式机制，但是使用rmax所开发的[Scrapy-redis](https://github.com/rmax/scrapy-redis)就可以实现分布式，后面我也会慢慢讲到。
    
2.  有可拓展需求时，Scrapy是利器。具体原因在上面已经阐述过，这里就不多做解释了。
    

**注意：以上所有情况均来自我个人使用Scrapy时的总结，仅供参考！**

Demo以豆瓣（万古爬虫受害者）热门电影排行榜以及其所有评论为实验目标，一一讲述Scrapy的基本功能，相信读者在实践完这个Demo之后，就能很好的使用Scrapy了。

[项目gitHub](https://github.com/GeekHades1/scrapy_douban_demo/tree/master/douban_demo)

需要安装:

*   python (本文所使用的是3.7)
*   scrapy

安装环境
----

*   安装Scrapy

命令行中键入`pip install scrapy`

创建Scrapy项目
----------

在命令行中键入`scrapy startproject douban_demo`，结果如下图所示

![](https://user-gold-cdn.xitu.io/2019/6/9/16b3a136c8c72ee1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

之后可以看到Scrapy还提示我们可以使用`genspider`这个命令来创建我们的爬虫文件，在这之前我们先来看看刚刚那条命令执行完之后发生了什么。

查看文件目录。我们可以看到如下信息

```bash
douban_demo
├── douban_demo
│   ├── items.py       
│   ├── middlewares.py 
│   ├── pipelines.py   
│   ├── settings.py    
│   └── spiders        
└── scrapy.cfg         
```

大致了解每个文件用途之后，接下来我们就开始我们的爬虫之旅吧。

描述一个爬虫
------

使用`scrapy genspider douban douban.com`来新建一个爬虫文件，这个新建的爬虫文件会被放入`douban_demo/spiders`底下。

**PS：`genspider`的用法`scrapy genspider [options] <name> <domain>`**

此时`douban.py`文件就会出现在`spiders`底下，初始内容如下:

```python

import scrapy


class DoubanSpider(scrapy.Spider):
    name = 'douban'                       
    allowed_domains = ['douban.com']      
    start_urls = ['http://douban.com/']   

    def parse(self, response):            
        pass
```

在Scrapy项目中你所有的Spider类都必须得继承`scrapy.Spider`，其中`name`、`start_urls`以及`parse`成员方法是每个Spider类必须要声明的。更多的Spider属性以及成员方法可以[点击此链接](https://docs.scrapy.org/en/latest/topics/spiders.html?highlight=Spider)

接下来只要将我们的爬取对象链接放入`start_urls`里面就可以，我们以`https://movie.douban.com/chart`为实验对象。

将`DoubanSpider`中的`start_urls`的值替换为 `start_urls = ['https://movie.douban.com/chart']`

使用shell方式进行页面测试
---------------

Scrapy还给我们提供了`shell`命令供我们在`shell`中进行页面数据提取测试，这比requests+pyquery的方式要高效。

命令格式:`scrapy shell urls`

在命令行里键入`scrapy shell`进入`shell`模式。

**注意：此时不要着急添加urls，因为我们的测试对象有对UA进行检测，如果直接入测试链接会出现403。至于在什么目录输入这条命令不做具体限制。**

输出内容如下：

```shell
(venv) ➜  douban_demo scrapy shell --nolog                                 
[s] Available Scrapy objects:
[s]   scrapy     scrapy module (contains scrapy.Request, scrapy.Selector, etc)
[s]   crawler    <scrapy.crawler.Crawler object at 0x106c5c550>
[s]   item       {}
[s]   settings   <scrapy.settings.Settings object at 0x108e18898>
[s] Useful shortcuts:
[s]   fetch(url[, redirect=True]) Fetch URL and update local objects (by default, redirects are followed)
[s]   fetch(req)                  Fetch a scrapy.Request and update local objects 
[s]   shelp()           Shell help (print this help)
[s]   view(response)    View response in a browser
```

此时我们就可以看到已经进入了类似Python命令行交互器一样的界面，首先我们为了防止豆瓣403应该在`settings`里面加入`DEFAULT_REQUEST_HEADERS`属性，这是一个请求头字典，只要Scrapy检测到有这个选项都会将里面的值加入到请求头中。

值如下：

```python
DEFAULT_REQUEST_HEADERS = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 \
  (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
}
```

在交互界面中键入一下内容即可添加默认请求头

```bash
>>> settings.DEFAULT_REQUEST_HEADERS = {
...   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
...   'Accept-Language': 'en',
...   'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 \
...   (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
... }
```

再次输入`settings.DEFAULT_REQUEST_HEADERS`查看是否添加成功。

配置完成后我们就可以使用`fetch(urls)`命令来抓取我们需要测试的页面了

键入`fetch('https://movie.douban.com/chart')`即可看到一下内容

```python
2019-06-03 23:06:13 [scrapy.core.engine] INFO: Spider opened
2019-06-03 23:06:13 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://movie.douban.com/robots.txt> (referer: None)
2019-06-03 23:06:14 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://movie.douban.com/chart> (referer: None)
```

从日志中我们可以看到已经成功获取了目标页面，在获取页面之前我们还可以知道scrapy先访问了`robots.txt`文件，这是一个良好的爬虫习惯，此时scrapy的所有页面获取都将会遵从`robots.txt`里面的规则，如果你不想遵从这一规则可以在`settings`里配置`ROBOTSTXT_OBEY = False`。

此时你可以使用`response.text`来检查我们是否获取了整个页面的源码。 scrapy的所有资源解析操作都被集成在了`response`这个对象中，更多的`response`介绍可以[点击此链接](https://docs.scrapy.org/en/latest/topics/request-response.html?highlight=response#response-subclasses)

分析页面
----

### 电影排行榜页面

对页面进行元素检查

![](https://user-gold-cdn.xitu.io/2019/6/9/16b3a136ce33d3a5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

可以看到我们需要爬取的内容在`table`里面。因为页面有多个`table`，因此只需要对其迭代获取即可。

在`shell`中使用`response.css('table')`即可获取所有的`table`元素，本文全部采用`css selector`进行元素选择，`xpath`也可自行切换。

每个电影的信息都在`table`标签底下的`tr.item`里面。

电影的详情链接可以使用`a.nbg::attr(href)`来获取

电影图片我们可以使用`a.nbg > img::attr(src)`来获取

对于电影名字处理稍显复杂，从上图可以看出电影可能拥有多个名字，都被包裹在`div.pl2 > a`底下，其中其他名字在`div.pl2 > a > span`底下，因此我们需要对名字进行一些格式处理，例如去掉空格、换行符等等。

因此影名可以使用`div.pl2 > a::text`和`div.pl2 > a > span::text`分别获取，但是因此`div.pl2`底下的`a`标签较多，我们只需要取得第一个即可使用`extract_first()`方法即可取出第一个`Selector`元素的内容并转换为`str`。

电影简介只需要使用`p.pl::text`中获取即可

### 电影评论页面

在相应的电影详细信息链接后拼接`comments?status=P`即可进入电影影评页面。

![](https://user-gold-cdn.xitu.io/2019/6/9/16b3a136cda769cd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

可以看出影评数据由多个`comment-item`组成，影评内容都被包裹在`div.comment`底下，因此按照上面的分析方法也能找出相应数据的获取方式。这里就不在阐述

实现思路
----

1.  分别创建两个`parse`方法：`parse_rank`和`parse_comments`，`parse_rank`负责处理电影排行榜页面，`parse_comments`负责处理相应的评论页面。
    
2.  重写`Spider`类的`start_requests`方法，填充`url`以及`callback`属性值，由于要先通过电影排行榜页面获取详情信息才可获取想关评论地址，所以在`start_requests`中返回的`Request callback`属性应该填充为`self.parse_rank`
    
3.  在`parse_rank`中处理返回的`reponse`，按照『分析页面』中的思路去解析数据并且使用`yield`抛出评论页面的`Request`，`callback`属性填充为`self.parse_comments`
    
4.  在`parse_comments`方法中处理返回的评论页面，抛出数据以及下一页链接。
    

**注：`Spider parse`方法：所有的`parse`方法都必须返回Item(目前可以理解为数据项)或者Requests(下一条请求)。这里所有的`parse`的意思是不是特指`Spider`类中生成的`parse`方法，而是所有具备解析功能的函数都应该返回Item或者Requests。**

代码示例

```python

import scrapy
from scrapy.http.request import Request


class DoubanSpider(scrapy.Spider):
    name = 'douban'

    def start_requests(self):
        yield Request(url='https://movie.douban.com/chart', callback=self.parse_rank)

    def parse_rank(self, response):
        for item in response.css('tr.item'):
            detail_url = item.css('a.nbg::attr(href)').extract_first()
            img_url = item.css('a.nbg > img::attr(src)').extract_first()
            main_name = item.css('div.pl2 > a::text').extract_first()
            other_name = item.css('div.pl2 > a > span::text').extract_first()
            brief = item.css('p.pl::text').extract_first()
            main_name = main_name.replace('\n', '').replace(' ', '')

            yield {
                'detail_url': detail_url,
                'img_url': img_url,
                'name': main_name+other_name,
                'brief': brief
            }

            yield Request(url=detail_url+'comments?status=P',
                          callback=self.parse_comments,
                          meta={'movie': main_name})

    def parse_comments(self, response):
        for comments in response.css('.comment-item'):
            username = comments.css('span.comment-info > a::text').extract_first()
            comment = comments.css('span.short::text').extract_first()

            yield {
                'movie': response.meta['movie'],
                'username': username,
                'comment': comment
            }
        nexturl = response.css('a.next::attr(href)').extract_first()
        if nexturl:
            yield Request(url=response.url[:response.url.find('?')]+nexturl,
                          callback=self.parse_comments,
                          meta=response.meta)

```

启动爬虫
----

一切准备就绪，我们就可以在`douban_demo`(最顶级的)目录底下键入命令 `scrapy crawl douban`就可以看到有许多的日志数据并且还打印出了许多电影信息以及评论内容。

到此我们就对豆瓣电影排行以及评论完成了初步的抓取，当然豆瓣限制了非登陆用户可以查看的评论数以及检测爬虫行为等等，这些反爬机制我们日后再讲。

那么现在有一个问题是我需要将数据保存应该如何做呢？

Scrapy提供了许多`Feed exports`的方法，可以将输出数据保存为`json, json lines, csv, xml`

在启动命令后面加`-o xx.json`就可以将文件保存为`json`格式。

如：`scrapy crawl douban -o result.json`

因为数据有中文内容，scrapy在使用`json encoder`的时候默认所有数据均是`ascii`的，因此我们需要将数据编码设置为`utf-8`。

只需在`settings.py`中加入`FEED_EXPORT_ENCODING = 'utf-8'`即可。

这时候在此数据即可看到中文正常显示。

此时大约会产生2000条数据。

小结
--

到此我们已经完成了对豆瓣电影及影评的初步抓取，虽然能够成功抓取数据，但给人的感觉就是『我仅仅只是编写了解析网页的代码以及键入启动爬虫命令，结果Scrapy就能够帮我完成从网页请求到数据产出所有的任务』，我们得继续探究当我们键入了`scrapy crawl douban -o result.json`这一条启动命令后Scrapy到底做了什么。

请各位原意了解Scrapy的读者保存下图，此图对Scrapy的学习尤为关键。

![](https://user-gold-cdn.xitu.io/2019/6/9/16b3a136ce1b2ef0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

根据此图分析，当我们键入`scrapy crawl douban -o result.json`之后，Scrapy做了以下工作

1.  `Crawler`接收到`crawl`指令后便会被启动，激活`name`为`douban`的`Spider`，同时创建`Engine`，此时我们的`DoubanSpider`就被启动。
    
2.  当`DoubanSpider`被新建之后，`Engine`就会检测`Spider`的请求队列，也就是我们的`start_urls`属性or`start_requests`方法。这两者都必须是可迭代对象，因此可以理解我们的示例代码中`start_requests`方法为何是使用`yield`抛出。此时生成`Request`对象，所有`Request`对象都会先经过`Spider Middlewares`这个中间件，现阶段我们只需要将中间件理解为一座座桥，我们现在不必深究桥上有什么。
    
3.  `Spider`产生的`Request`对象会经过`Engine`送入`Scheduler`调度器中，调度器会将所有`Request`加入请求队列，一旦可以调度之后，`Request`就会通过`Downloader Middlewares`这些桥梁到达`Downloader`，`Downloader`就会根据请求内容访问指定的互联网资源，这一过程是异步的。
    
4.  当`Downloader`完成一个`Request`任务后，就会将资源包装成一个`Response`，里面会包含原`Request`的信息、封装好的解析器等等，在示例中我们可以看到在`parse_rank`中抛出的`Request`携带着`meta`数据，之后`meta`继续保存在`parse_comments`的`response`里。
    
5.  此时所有的`Response`都会再次通过`Downloader Middlewares`这些桥，再经过`Engine`以及`Spider Middlewares`回到所对应的`Spider`中，并且会激活对应的`callback`函数，最后就是执行我们编写好的`parse`方法里的代码。当`parse`再次抛出`Request`对象时就会重新执行(3-5)的步骤。
    
6.  当`Spider`抛出数据(Item)时，又会再次经过`Spider Middlewares`到达`Item Pipeline`，但我们并没有对`Item Pipeline`指定任何动作因此它只会向外界抛出该`Item`，之后会被`logger`捕获这一输出，也就是我们可以看到的控制台有数据产生，由于我们使用了`-o`指令，因此`exporter`会将`item`输出为相应的格式，也就有了我们指定的`result.json`数据集。
    

到此我们完成了如何使用Scrapy编写一个简单爬虫程序，以及大致了解了Scrapy的工作流程，接下来我们会更加深入的探讨Scrapy的其他组件以及如何利用它们突破反爬机制。

如上述观点有误欢迎雅正！
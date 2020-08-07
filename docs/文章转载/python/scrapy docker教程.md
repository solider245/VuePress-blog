---
title : scrapy docker教程
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-07 18:07:27 +0800
categories:
 -
tags:
 -
---
[[toc]]
说明：此文档主要聚焦在Docker的使用上，必须配和[爬虫教程 · 网络爬虫教程](https://link.jianshu.com?t=https%3A%2F%2Fpiaosanlang.gitbooks.io%2Fspiders%2F)一起使用。

**注意：**一定要配合[入门教程 · 网络爬虫教程](https://link.jianshu.com?t=https%3A%2F%2Fpiaosanlang.gitbooks.io%2Fspiders%2F04day%2Fsection4.3.html)

## 总结

先放干货，使用docker来运行scrapy其实只需要做到以下两点即可：

1\. 在项目的当前目录中

2\. 在scrapy命令前加上`docker run --name scrapy --rm -v $(pwd):/runtime/app aciobanu/scrapy`

如果你已经会使用scrapy了，看到这里就可以了。

---

## 下载镜像

从Docker hub下载[aciobanu/scrapy \- Docker Hub](https://link.jianshu.com?t=https%3A%2F%2Fhub.docker.com%2Fr%2Faciobanu%2Fscrapy%2F)并创建教程项目

```bash

$ mkdir ~/scrapy

$ cd ~/scrapy

$ docker run --rm -v $(pwd):/runtime/app aciobanu/scrapy startproject tutorial

```

> 以上命令中

`-v`是把当前目录映射到容器中的`/runtime/app`目录

`--rm`是在停止容器后自动删除容器

执行以上命令后会生成`tutorial`目录，这些文件分别是：

```

scrapy.cfg: 项目的配置文件；（用于发布到服务器）
tutorial/: 该项目文件夹。之后将在此编写Python代码。
tutorial/items.py: 项目中的item文件;（定义结构化数据字段field）.
tutorial/pipelines.py: 项目中的pipelines文件;（用于存放执行后期数据处理的功能，定义如何存储结构化数据)
tutorial/settings.py: 项目的设置文件；(如何修改User-Agent，设置爬取时间间隔，设置代理，配置中间件等等)
tutorial/spiders/: 放置spider代码的目录;（编写爬取网站规则）

```

## 编写爬虫

### 编写第一个爬虫

接下来按[入门教程 · 网络爬虫教程](https://link.jianshu.com?t=https%3A%2F%2Fpiaosanlang.gitbooks.io%2Fspiders%2F04day%2Fsection4.3.html)编写第一个爬虫。（请先去看完教程再回来继续）

### 爬取

然后运行以下命令执行爬虫

```ruby

docker run --rm -v $(pwd):/runtime/app aciobanu/scrapy scrapy crawl tencent

```

> 以上命令中最后的`scrapy crawl tencent`就是我们要执行的命令

可以看到已经生成了`tengxun.txt`

### 提取Item

接下来运行命令

```ruby

docker run -it  --rm -v $(pwd):/runtime/app aciobanu/scrapy scrapy shell "[http://hr.tencent.com/position.php?&start=0#a"](http://hr.tencent.com/position.php?&start=0#a")

```

> 以上命令中的`-it`意思是启用交互式命令行

#### 尝试Selector选择器

之后可以尝试以下命令

```python

response.xpath('//title')

response.xpath('//title').extract()

print response.xpath('//title').extract()[0]

response.xpath('//title/text()')

response.xpath('//title/text()')[0].extract()

print response.xpath('//title/text()')[0].extract()

response.xpath('//title/text()').re('(\w+):')

```

还可以尝试更多的提取参数，查看输出内容的变化。

最后输入`quit()`关闭容器。

#### 提取数据

按爬虫教程中修改`tencent_spider.py`文件内容如下：

```python

import scrapy
from tutorial.items import RecruitItem

class RecruitSpider(scrapy.spiders.Spider):
  name = "tencent"
  allowed_domains = ["hr.tencent.com"]
  start_urls = [
    "https://hr.tencent.com/position.php?&start=0#a"
  ]
  def parse(self, response):
    for sel in response.xpath('//*[@class="even"]'):
      name = sel.xpath('./td[1]/a/text()').extract()[0]
      detailLink = sel.xpath('./td[1]/a/@href').extract()[0]
      catalog = sel.xpath('./td[2]/text()').extract()[0]
      recruitNumber = sel.xpath('./td[3]/text()').extract()[0]
      workLocation = sel.xpath('./td[4]/text()').extract()[0]
      publishTime = sel.xpath('./td[5]/text()').extract()[0]
      print(name, detailLink, catalog,recruitNumber,workLocation,publishTime)
      item = RecruitItem()
      item['name']=name.encode('utf-8')
      item['detailLink']=detailLink.encode('utf-8')
      item['catalog']=catalog.encode('utf-8')
      item['recruitNumber']=recruitNumber.encode('utf-8')
      item['workLocation']=workLocation.encode('utf-8')
      item['publishTime']=publishTime.encode('utf-8')
      yield item

```

> 注意最后的`print`要加括号。我运行时不加括号会出错。

执行以下命令：

```ruby

docker run --name scrapy --rm -v $(pwd):/runtime/app aciobanu/scrapy scrapy crawl tencent -o items.json

```

查看生成的`items.json`文件的内容，可以看到爬取的结果。
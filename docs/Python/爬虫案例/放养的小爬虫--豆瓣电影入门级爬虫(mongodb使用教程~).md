---
title : 放养的小爬虫--豆瓣电影入门级爬虫(mongodb使用教程~)
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-07 17:13:04 +0800
categories:
 -
tags:
 -
---
[[toc]]
![](https://bbsmax.ikafan.com/static/L3Byb3h5L2h0dHAvd3czLnNpbmFpbWcuY24vbGFyZ2UvNzMwNWI3MDdqdzFmMjQ4cjRjZXk2ajIwZTQwaTRkZ2QuanBn.jpg)

> 笔者声明：只用于学习交流,不用于其他途径。源代码已上传github。githu地址：[https://github.com/Erma\-Wang/Spider](https://github.com/Erma-Wang/Spider)
>
> 笔者声明：只用于学习交流,不用于其他途径。源代码已上传github。githu地址： [https://github.com/Erma\-Wang/Spider](https://github.com/Erma-Wang/Spider)
>
> 笔者声明：只用于学习交流,不用于其他途径。源代码已上传github。githu地址： [https://github.com/Erma\-Wang/Spider](https://github.com/Erma-Wang/Spider)

重要的事情说三遍~~~！！！只用于学习交流，私自用于其他途径，后果自负！！！

github源代码地址 [https://github.com/Erma\-Wang/Spider](https://github.com/Erma-Wang/Spider)(注意，本仓库还有其他的小爬虫，本文章讲解的是DouBanSpider···)，别忘了给个star哦 ! @、@

---

### **开篇之前闲聊几句**

笔者是iOS开发从业者，但是我相信很多小伙伴也和我一样，并不是Python开发者，却对爬虫技术(scrapy)颇感兴趣儿之前写过一些iOS的博客，最近在写爬虫技术分享的博客的时候，发现很多小伙伴对爬虫技术比对iOS兴趣点来的大这时候，我就在想，为什么叻？

我认为`爬虫技术基本原理就三点~下载数据~匹配数据~保存数据~`,本来一件很简单的事儿，却有这么多的爬虫爱好者去研究去探索并且还诞生了伟大的框架`scrapy`、`pyspider`，但是个人认为其是一种`工具`。这么多的非python开发者对爬虫技术(scrapy、pyspider)感兴趣，我想是因为爬虫技术属于`逆向工程`吧人们一直以来对正向的思维，正向的发展，正向的软件开发等等一切事物运筹帷幄，却很少有人对一件事物，一件物品，一个软件，甚至一个网站开发出来后反向对到其制作过程，制作工序，制作原料作其推导古文说`以古为镜，可以知兴替`,我想，对一件已经制作出来的物品，推导其制作过程，比制作这件物品更来得有兴趣吧~

---

### **总结几点~**

之前在上一篇博客中有些小伙伴给我了一些不错的idea~

*   有读者建议我在之前的爬虫上加上代理，这点儿，笔者还是以不加代理的风格继续写爬虫，因为毕竟加上代理我会担心一些不好的小伙伴拿笔者写好的爬虫去做了不好的事儿，请谅解如有个人特殊需求，上github上自行fork修改
*   之前的JDSpider具有时效性因为毕竟京东也不是傻子，规则会经常变更
*   之前有效换提出能不能抓取AJAX的url，额对于这样高深的技术，超出笔者能力范围目前为止，唯一的办法就是抓包工具抓包，人工手动分析~
*   有一些idea还在研究中，比如说爬取淘宝数据这个有难度，是真心有难度
*   最后，笔者所写爬虫技术含量并不高，只是入门级别的爬虫，只用于爬虫爱好者交流分享摆了~适合于爬虫初学者，大多为scrapy。。。

---

## 开篇

笔者在之前的博客里写过京东的Spider，首先非常感谢小伙伴对我的支持在此，笔者写了一个入门级别的小爬虫，给一些想学scrapy但是还没有开始学习scrapy的小伙伴讲解一些scrapy的一些基础知识吧本文虽然对于scrapy来说完全算是入门级别，但是您应该具有一定的网页编程基础和网络基础知识。本文中主要讲解mongodb的基本使用，附带一个实战小爬虫~

**还是一样，scrapy不做详细解释有疑问，找度娘**

## 抓取目标url和目标数据item

### 目标url：[https://movie.douban.com/top250](https://movie.douban.com/top250)

### 目标数据 item

标题：title = Field()

电影信息：movieInfo = Field()

评分：star = Field()

经典名言：quote = Field()

## 目标网站分析与思路分析（爬虫常规思路~）

先看看目标网站吧是的，网上很多用豆瓣做爬虫教程，因为比较好爬取吧笔者在这也用豆瓣爬虫来作为演示~

![](https://bbsmax.ikafan.com/static/L3Byb3h5L2h0dHAvd3c0LnNpbmFpbWcuY24vbGFyZ2UvNzMwNWI3MDdqdzFmMjRxdTZkaHJ5ajIxN2MxNjhuM2EuanBn.jpg)

### 一、抓取li标签构建数组~

是的，和常规网站一样一个li标签代表一个小模块的整合思路先把每个li抓取出来放入一个数组中，这也是常规思路，先看关键代码吧

#### 实例化选择器

```
selector = Selector(response)

```

#### 抓取li标签构建Movies数组

```
Movies = selector.xpath('//div[@class="info"]')

```

### 二、遍历数组取出each~

for in循环取出~没啥说的

### 三、选择器匹配数据~

抓取数据~

```
title = eachMovie.xpath('div[@class="hd"]/a/span[@class="title"]/text()').extract()
movieInfo = eachMovie.xpath('div[@class="bd"]/p/text()').extract()
star = eachMovie.xpath('div[@class="bd"]/div[@class="star"]/span[@class="rating_num"]/text()').extract()
quote = eachMovie.xpath('div[@class="bd"]/p[@class="quote"]/span/text()').extract()

```

## 四、传值给item~

熟悉MVC的小伙伴在学习scrapy的时候都应该知道~item在这里就相当于MVC里面的Model。

```
item['title'] = title
item['movieInfo'] = ';'.join(movieInfo)
item['star'] = star
item['quote'] = quote

```

### 五、翻页~

抓取下一页href的url，递归调用Request

nextLink = selector.xpath('//span\[@class="next"\]/link/@href').extract()

if nextLink:

nextLink = nextLink\[0\]

print(nextLink)

yield Request(self.url + nextLink,callback=self.parse)

---

## Ok数据抓取下来了，现在考虑一个问题保存~

本博客主要讲解的是mongodb和scrapy配合使用下面看看代码怎么写的吧

### 首先在setting里面作配置~

#### 设置传输的管道为什么是管道叻笔者英语不咋滴喜欢这么翻译pipeline

ITEM\_PIPELINES = \['DouBanSpider.pipelines.DoubanspiderPipeline'\]

#### 设置mongodb地址~

MONGODB\_HOST = '127.0.0.1'

#### 设置端口号也就是port默认为27017~

MONGODB\_PORT = 27017

#### 设置数据库名字~

MONGODB\_DBNAME = 'DouBan'

#### 设置存放本次数据的表名~

MONGODB\_DOCNAME = 'DouBanDy'

---

### OK配置好setting后再配置Pipeline吧

我们借助pymongo这个模块来配置Pipeline吧导入pymongo模块后

只做关键两步讲解~

#### 链接数据库~

client = pymongo.MongoClient(host=host,port=port)

#### 指向数据库里面要存放数据的表名~

tdb = client\[dbName\]

#### 向指定的表里添加数据两句关键代码

self.post = tdb\[settings\['MONGODB\_DOCNAME'\]\]

self.post.insert(dyInfo)

---

好吧看看效果吧

## 爬虫启动~

![](https://bbsmax.ikafan.com/static/L3Byb3h5L2h0dHAvd3czLnNpbmFpbWcuY24vbGFyZ2UvNzMwNWI3MDdqdzFmMjV6OGt4aWI0ajIwdmcwazY3NXQuanBn.jpg)

## 开始爬取~

![](https://bbsmax.ikafan.com/static/L3Byb3h5L2h0dHAvd3cxLnNpbmFpbWcuY24vbGFyZ2UvNzMwNWI3MDdqdzFmMjV6OG04NjJvajIxa3cweXo0ZTUuanBn.jpg)

## 再看看数据库~

![](https://bbsmax.ikafan.com/static/L3Byb3h5L2h0dHAvd3czLnNpbmFpbWcuY24vbGFyZ2UvNzMwNWI3MDdqdzFmMjV6OGxsdjVyajIxa3cxMG00YmMuanBn.jpg)

---

## 最后对mongodb的使用做个简单的介绍~

mongodb属于非关系型数据库是一个基于分布式文件存储的数据库。由C++语言编写。。。好吧这些废话我不在这里说了自己百度百科吧我写博客写你能在其他地方都能找到的理论性的知识简单的说说使用mongodb的安装和使用吧

### mongodb的安装~

网上有一大把一大把mongodb的安装教程自己搜索去吧笔者是通过brew安装的mongodb，因为笔者使用的Mac，尝试过很多种安装mongodb的方法都未成功最后，尝试了brew安装成功如果读者使用的是Mac，请尝试尝试brew安装吧~

### 启动mongodb服务~

在控制台输入 `mongod`，这个指令是启动mongod的服务，当出现下图，表示成功~

![](https://bbsmax.ikafan.com/static/L3Byb3h5L2h0dHAvd3cxLnNpbmFpbWcuY24vbGFyZ2UvNzMwNWI3MDdqdzFmMjZteHoxdnh5ajIxYm0weHFxa2YuanBn.jpg)

### 启动mongodb数据库~

启动mongodb服务后重新打开一个新的控制台窗口启动mongodb数据库在新的控制台窗口输入`mongo`，这时候会出现下面的界面表示成功

![](https://bbsmax.ikafan.com/static/L3Byb3h5L2h0dHAvd3cxLnNpbmFpbWcuY24vbGFyZ2UvNzMwNWI3MDdqdzFmMjZuMW5yNzJlajIxMHkwb2FqdmEuanBn.jpg)

### 使用Robmongo管理数据库~

在Mac上最好用的就是Robmongo把界面还行基本的功能也有~

#### 创建mongodb的链接~

![](https://bbsmax.ikafan.com/static/L3Byb3h5L2h0dHAvd3cyLnNpbmFpbWcuY24vbGFyZ2UvNzMwNWI3MDdqdzFmMjZuNmF0YnFzajIxa3cxMG5qd3IuanBn.jpg)

#### 创建成功后就可以用上文中的小爬虫对mongodb添加数据了~

---

## 小爬虫使用小提示~

*   scrapy crawl YourSpiderName，，最后加的是爬虫name，而不是项目名字~
*   需要的环境自己配置，跑不起来报错，请百度，爬虫笔者已经亲测，可以跑~
*   本爬虫没有设置代理，因为用于学习交流吧~
*   本爬虫已经更改请求头里的USER\_AGENT，请改为自己的吧
*   最后项目已经上传到github，github源代码地址[https://github.com/Erma\-Wang/Spider](https://github.com/Erma-Wang/Spider)(注意，本仓库还有其他的小爬虫，本文章讲解的是JDSpider···)，别忘了给个star哦@、@
*   还要了解更多的小爬虫的朋友们可以关注本博，并在本博的spider中找到其他的小爬虫，笔者会定时更新小爬虫的~
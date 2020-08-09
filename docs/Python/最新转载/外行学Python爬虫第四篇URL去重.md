---
title : 外行学Python爬虫第四篇URL去重
description : 
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-09 22:07:43 +0800
categories:
 -
tags:
 -
---
[[toc]]
当你可以从网站上获取网页，也可以将网页中有效的信息提取出来以后，接下来你会做什么？我想它一定是一个肯定的答案『获取整个网站的内容』，毕竟只获取网站上一个网页的内容听起来和看起来都不是那么的高大上，只有将整个网站的内容提取出来它才能称得上爬虫这个有科技感和高大上的名字。

要获取整个网站的内容，首先需要通过一个网址来获取其他的网址，这个我们可以使用上节解析内容的知识，从当前网页中解析出所含有的链接，从而根据每个网页中对其他网页的连接一层层获取整个网站的内容。此时我们会遇到一个问题，就是多个网页中可能含有相同的网页链接，此时需要将这个相同的链接识别出来，毕竟我们不想浪费珍贵的服务器资源去重复读取和解析同一个网页，要解决这个问题就需要通过 **URL 去重**来实现。

在 Python 中 URL 去重可以通过以下几个方式来实现：

1.  将 URL 保存在集合 (set) 中，使用集合的特性来去重。
2.  使用布隆过滤器来对 URL 去重。

> 对 URL 去重，还有将 URL 使用 MD5 等方法哈希后保存在 set 中的方法，原理与直接保存在 set 中相同，只是节省了内存空间。

## 使用集合进行去重

使用集合进行去重的优点是方便无需编写代码直接使用 python 内置的数据类型 set 即可，缺点是占用内存空间，虽然可以通过 MD5 等哈希算法来减少内存的占用但是当 url 的数量达到一定数量级的时候还是会占用大量的内存空间。

使用集合进行 url 去重时，只需在每次需要爬取该 url 时判断该 url 是否在集合中，若不在获取网页信息并将该 url 放入集合中，若存在则跳过该 url 即可。

当前使用的代码如下：

```text
def __find_url(self, html):
        for link in html.find_all(name='a', href=re.compile(r'https?://list|item.szlcsc.+')):
            if len(self.__url_set) > self.__max_url_count:
                return
            url = link.get('href')
            if url not in self.__url_set:
                self.__url_set.add(url)
                self.__url_queue.put(url)
```

## 使用布隆过滤器进行 url 去重

布隆过滤器在空间和时间上具有巨大的优势，它实际上是一个很长的二进制向量和一系列随机映射函数，因此占用的内存空间是固定的不会随 url 的增长而增长。同时它的确定也很明显有一定的误识别率且无法从布隆过滤器中删除已经添加的元素。

在 GitHub 上已经有人使用 python 实现了布隆过滤器，我们只需要直接使用该代码即可，布隆滤波器 [源码](https://link.zhihu.com/?target=https%3A//github.com/jaybaird/python-bloomfilter)。

将其应用于 url 去重的示例代码如下：

```py
def __find_url(self, current_url, html):
        for link in html.find_all(name='a', href=re.compile(r'https?://list|item.szlcsc.+')):
            url = link.get('href')
            if url not in self.bloomfilter:
                if self.__url_queue.qsize() < self.__max_url_count:
                    self.bloomfilter.add(url)
                    self.__url_queue.put(url)
                else:
                    self.__url_queue.put(current_url)
                    return
```

由于布隆过滤器存在一定的误算率「随着存入的元素数量增加，误算率随之增加」，因此布隆过滤器不适用于大量网页且对数据要求比较严格的场合。

在大多数场合我们使用集合来对 url 去重已经足够使用了，以一个 url 平均长度 100 字节来算，一千万条 url 使用集合进行去重所需要用到的内存空间不过也就是 1G，对现在的服务器或台式机来说应该不算太大的压力，且一千万的 url 已经算比较大的网站了。当 url 大于这个数的时候我想对数据的准确性也就要求不是那么高了。
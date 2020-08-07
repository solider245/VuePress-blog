---
title : python战反爬虫：爬取猫眼电影数据 (二）（Requests, BeautifulSoup, MySQLdb,re等库)
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-08 05:02:11 +0800
categories:
 -
tags:
 -
---
[[toc]]
姓名：隋顺意
博客：Sui\_da\_xia
微信名：世界上的霸主

---

##### 本文主要介绍破解反爬，可以先去上一篇观看爬取无反爬内容

[python战反爬虫：爬取猫眼电影数据 (一）（Requests, BeautifulSoup, MySQLdb,re等库)](https://blog.csdn.net/Sui_da_xia/article/details/105716242)

---

## 前言：

前一篇文章介绍了猫眼无反爬的内容，我就接着前一篇，接着为您爬取猫眼电影排行榜！

如今，所有人无时无刻在使用互联网。它就像一张大网，将所有人联系在一起。而总有些可恶的刺头，只让他人看他的内容，不把他的数据给大家用。

正因为如此，我们有了伟大的爬虫工程师，他们手持利剑，突破刺头设置的重重难关，获取数据。今天，就让我们一起，共同大战“猫眼电影”设置的障碍把！

## 获取更多信息（大战美团验证码拦截）：

上一篇文章，我讲到了以下代码：

```python
def link(url):
    header = {
        "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
            }
    res = req.get(url,headers = header)
    if res.status_code == 200:
        return bs(res.text,"lxml")
    return None
movie = link(url1)
print(movie)

```

运行了代码，返回了200，看似很成功，但即将引来第二个障碍——我们发现它虽然返回了一堆东东，却十分短小，而且一眼就可看到：

![猫眼电影美团验证码拦截](https://img-blog.csdnimg.cn/20200503120603373.bmp?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1N1aV9kYV94aWE=,size_16,color_FFFFFF,t_70#pic_center)

啊！这可怎么办！我们遇到了验证码拦截！不要怕，对付这种拦截，我们不需要中间人代理，模拟登录，破解验证码等等。只要简简单单的增加一个cookie，像这样：

![猫眼cookie](https://img-blog.csdnimg.cn/20200510162323860.bmp?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1N1aV9kYV94aWE=,size_16,color_FFFFFF,t_70#pic_center)
找到这个cookie，然后复制下来，放到header里面，上代码：

```python
def link(url):
    header = {
        "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
        "cookie" : "__mta=151852934.1587443709643.1587598935122.1587600366133.43; uuid_n_v=v1; uuid=F37C1E10838811EA8ABB63E31D5D873EFCF954692DBF4022A2CA534951698F60; _lxsdk_cuid=1719b014425c8-0c9bf88d1425e9-4313f6b-1fa400-1719b014425c8; _lxsdk=F37C1E10838811EA8ABB63E31D5D873EFCF954692DBF4022A2CA534951698F60; mojo-uuid=d174ce0bb6042f1360f126301f67ba77; t_lxid=1719b0145b6c8-091e3087e85102-4313f6b-1fa400-1719b0145b6c8-tid; _lx_utm=utm_source%3DBaidu%26utm_medium%3Dorganic; __mta=219069734.1587443484067.1587459109767.1587475084518.17; _csrf=1d00bd0bae5d97db8d8b75aba18f671878162878089874b0349b5d2a5037d688; Hm_lvt_703e94591e87be68cc8da0da7cbd0be2=1587531265,1587558230,1587564223,1587598925; Hm_lpvt_703e94591e87be68cc8da0da7cbd0be2=1587600366; _lxsdk_s=171a4e020da-6c5-2ad-67c%7C%7C1"
    }
    res = req.get(url,headers = header)
    if res.status_code == 200:
        return bs(res.text,"lxml")
    return None

```

然后我们看看可不可以爬取到了：

![加了cookie的猫眼爬取内容](https://img-blog.csdnimg.cn/2020051017202154.bmp?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1N1aV9kYV94aWE=,size_16,color_FFFFFF,t_70#pic_center)

哇，看样子接下来就一帆风顺了，太棒了，让我们来爬一爬吧。

```python
about = movie.find("span",class_ = "dra").text
word = movie.find("span",class_ = "name").text +  ":  " + movie.find("div",class_ = "comment-content").text.replace("😫","") #不要问我为什么简介是word
boss = movie.find("a",class_= "name").text.replace("\n","").replace(" ","") #也不要问我为什么导演是boss

```

#注：笔者（我）的取变量名的习惯极其不好，请大家不要学习。

我们现在爬取到了简介，评论，导演等信息，但好像一页的影片只有10个。

## 不同的页面：

在猫眼电音里，电影不是仅仅在一个页面里的，而是有好几个页面：

![猫眼页面](https://img-blog.csdnimg.cn/20200512131048372.bmp?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1N1aV9kYV94aWE=,size_16,color_FFFFFF,t_70#pic_center)
这个其实算不上什么反爬。我们只需要找到对应的链接（“href”)

![猫眼页面跳转练就额](https://img-blog.csdnimg.cn/20200512140713248.bmp?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1N1aV9kYV94aWE=,size_16,color_FFFFFF,t_70#pic_center)
我们可以清楚的看到，如跳转到第二页就是（?offset=10”）我们唯一需要知道的它的10是怎么来的。

根据笔者多年（其实没有）的爬虫经验，这个10代表从第10部电影开始（不包括第10步电影）。果不其然，就是这样的。每一页也有十部电影。这就方便了，我们先把这10页的链接get到：

```python
for i in range(0,100,10):
    url = "https://maoyan.com/board/4?offset=" + str(i)
	#感觉这个代码没什么可以讲的

```

***注：有杠精会说和我说要写向量，然后在循环。对于这种杠精我只想说可以看看哪个快***

接下来，我们就可以爬取每一页地每一部电影地链接：

```python
for i in range(0,100,10):
    url = "https://maoyan.com/board/4?offset=" + str(i)
    movies = link(url).find_all("dd")

```

整理一下：

```python
for i in range(0,100,10):
    url = "https://maoyan.com/board/4?offset=" + str(i)
    movies = link(url).find_all("dd")
    for i in movies:
        img = i.find("img",class_ = "board-img").get("data-src")
        num = i.find("i").text
        name = i.find("a").get("title")
        actor = re.findall("主演：(.*)",i.find("p",class_ = "star").text)[0]
        when = re.findall("上映时间：(.*)",i.find("p",class_ = "releasetime").text)[0]
        score = i.find("i",class_ = "integer").text + i.find("i",class_ = "fraction").text
        url1 = "https://maoyan.com" + i.find("p",class_ = "name").a.get("href")
        movie = link(url1)
        time.sleep(1)   #要休息一下
        about = movie.find("span",class_ = "dra").text
        word = movie.find("span",class_ = "name").text +  ":  " + movie.find("div",class_ = "comment-content").text.replace("😫","")
        boss = movie.find("a",class_= "name").text.replace("\n","").replace(" ","")

```

整理成一个字典：

```python
a = {
        "片名" : name,
        "排名" : num,
        "评分" : score,
        "网址" : url1,
        "演员" : actor,
        "上映时间" : when,
        "图片" : img,
        "评论" : word,
        "导演" : boss,
        "简介" : about
   }

```

---

##### 猫眼电影还有字体反爬，在下一篇文章将会提到

---

# 完整代码：

```python
import requests as req
import re
from bs4 import BeautifulSoup as bs
import time as ti

def link(url):
    header = {
        "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
        "cookie" : "__mta=151852934.1587443709643.1587598935122.1587600366133.43; uuid_n_v=v1; uuid=F37C1E10838811EA8ABB63E31D5D873EFCF954692DBF4022A2CA534951698F60; _lxsdk_cuid=1719b014425c8-0c9bf88d1425e9-4313f6b-1fa400-1719b014425c8; _lxsdk=F37C1E10838811EA8ABB63E31D5D873EFCF954692DBF4022A2CA534951698F60; mojo-uuid=d174ce0bb6042f1360f126301f67ba77; t_lxid=1719b0145b6c8-091e3087e85102-4313f6b-1fa400-1719b0145b6c8-tid; _lx_utm=utm_source%3DBaidu%26utm_medium%3Dorganic; __mta=219069734.1587443484067.1587459109767.1587475084518.17; _csrf=1d00bd0bae5d97db8d8b75aba18f671878162878089874b0349b5d2a5037d688; Hm_lvt_703e94591e87be68cc8da0da7cbd0be2=1587531265,1587558230,1587564223,1587598925; Hm_lpvt_703e94591e87be68cc8da0da7cbd0be2=1587600366; _lxsdk_s=171a4e020da-6c5-2ad-67c%7C%7C1"
    }
    res = req.get(url,headers = header)
    if res.status_code == 200:
        return bs(res.text,"lxml")
    return None

for i in range(0,100,10):
    url = "https://maoyan.com/board/4?offset=" + str(i)
    movies = link(url).find_all("dd")
    for i in movies:
        img = i.find("img",class_ = "board-img").get("data-src")
        num = i.find("i").text
        name = i.find("a").get("title")
        actor = re.findall("主演：(.*)",i.find("p",class_ = "star").text)[0]
        when = re.findall("上映时间：(.*)",i.find("p",class_ = "releasetime").text)[0]
        score = i.find("i",class_ = "integer").text + i.find("i",class_ = "fraction").text
        url1 = "https://maoyan.com" + i.find("p",class_ = "name").a.get("href")
        movie = link(url1)
        ti.sleep(1)
        about = movie.find("span",class_ = "dra").text
        word = movie.find("span",class_ = "name").text +  ":  " + movie.find("div",class_ = "comment-content").text.replace("😫","")
        boss = movie.find("a",class_= "name").text.replace("\n","").replace(" ","")

        a = {
            "片名" : name,
            "排名" : num,
            "评分" : score,
            "网址" : url1,
            "演员" : actor,
            "上映时间" : when,
            "图片" : img,
            "评论" : word,
            "导演" : boss,
            "简介" : about
        }

```

# 后记：

结束了？

不，才进行到一半。

可恶的反爬虫工程师还为我们准备了一道障碍：字体加密！

预知后事如何，请去：

python战反爬虫：爬取猫眼电影数据 (三）（Requests, BeautifulSoup, MySQLdb,re等库)
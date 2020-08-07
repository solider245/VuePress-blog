---
title : python爬取网站全部url链接
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-07 04:16:11 +0800
categories:
 -
tags:
 -
---
[[toc]]
# python爬取网站全部url链接

版权声明：本文为博主原创文章，转载请标明作者和原链接 https://blog.csdn.net/gyq1998/article/details/80092652

对于安全人员来说，了解网站的url目录结构是首要的，御剑是一个很好用的工具，下载地址：[https://download.csdn.net/download/gyq1998/10374406](https://download.csdn.net/download/gyq1998/10374406)

御剑自带了字典，主要是分析字典中的网址是否存在，但是可能会漏掉一些关键的网址，于是前几天用python写了一个爬取网站全部链接的[爬虫](https://www.hss5.com/tag/%e7%88%ac%e8%99%ab/ "View articles related to 爬虫")。

### 实现方法

主要的实现方法是循环，具体步骤看下图：
[![python爬取网站全部url链接](http://hss5.com/wp-content/uploads/2018/11/005GjT4tgy1fqq62nulyej30ce0kwjs2-2.jpg)](http://hss5.com/wp-content/uploads/2018/11/005GjT4tgy1fqq62nulyej30ce0kwjs2-2.jpg)

### 贴上代码：

```python
# author: saucer_man
# date:2018-04-24
# python3.6
 
 
import re
import requests
 
# 获取并检验要爬取的网站
def url_get():
    url=input("please input the url:")
    try:
        kv={'user_agent':'Mozilla/5.0'}
        requests.get(url,headers=kv)
        return url
    except:
        print("your url is incorrect!!")
    return url_get()
 
'''
找出url中的域名
比如从https://www.xiaogeng.top/article/page/id=3筛选出www.xiaogeng.top
'''
def url_same(url):
 
    #判断输入的网站使用的是https还是http
    urlprotocol=re.findall(r'.*(?=://)',url)[0]
    print('该站使用的协议是：' + urlprotocol)
 
    if len(re.findall(r'/',url)) >2:
        if urlprotocol=='https':
            sameurl = re.findall(r'(?<=https://).*?(?=/)', url)[0]
        else:
            sameurl = re.findall(r'(?<=http://).*?(?=/)', url)[0]
    else:
        url = url + '/'
        if urlprotocol=='https':
            sameurl = re.findall(r'(?<=https://).*?(?=/)',url)[0]
        else:
            sameurl = re.findall(r'(?<=http://).*?(?=/)',url)[0]
 
    print('域名地址：' + sameurl)
    return sameurl
 
 
# 爬取url页面中的所有链接
def spiderpage(url):
    kv={'user_agent':'Mozilla/5.0'}
    r=requests.get(url,headers=kv)
    r.encoding=r.apparent_encoding
    pagetext=r.text
    pagelinks = re.findall(r'(?<=href=").*?(?=")|(?<=href=').*?(?=')',pagetext)
    return pagelinks
 
#筛选pagelinks中的url
def url_filtrate(pagelinks):
    '''
    print("我现在在筛选")
    '''
    #去除不是该站点的url
    same_target_url = []
    for l in pagelinks:
        if re.findall(sameurl,l):
            same_target_url.append(l)
    #去除重复url
    unrepect_url = []
    for l in same_target_url:
        if l not in unrepect_url:
            unrepect_url.append(l)
    return unrepect_url
#将一个列表写入文件
def writetofile(list):
    file=open('urls.txt','w')
    for url in list:
        file.write(url)
        file.write('n')
    file.close()  
 
# url集合，循环遍历会用到
class linkQuence:
     def __init__(self):
         #已访问的url集合
         self.visited=[]
         #待访问的url集合
         self.unvisited=[]
     #获取访问过的url队列
     def getvisitedurl(self):
         return self.visited
     #获取未访问的url队列
     def getunvisitedurl(self):
         return self.unvisited
     #添加url到访问过得队列中
     def addvisitedurl(self,url):
         return self.visited.append(url)
     #移除访问过得url
     def removevisitedurl(self,url):
         return self.visited.remove(url)
     #从未访问队列中取一个url
     def unvisitedurldequence(self):
         try:
             return self.unvisited.pop()
         except:
             return None
     #添加url到未访问的队列中
     def addunvisitedurl(self,url):
         if url!="" and url not in self.visited and url not in self.unvisited:
             return self.unvisited.insert(0,url)
     #获得已访问的url数目
     def getvisitedurlount(self):
         return len(self.visited)
     #获得未访问的url数目
     def getunvistedurlcount(self):
         return len(self.unvisited)
     #判断未访问的url队列是否为空
     def unvisitedurlsempty(self):
         return len(self.unvisited)==0
 
 
# 真正的爬取函数
class Spider():
    def __init__(self,url):
        self.linkQuence = linkQuence()   #引入linkQuence类
        self.linkQuence.addunvisitedurl(url)   #并将需要爬取的url添加进linkQuence对列中
 
    def crawler(self):
        while not self.linkQuence.unvisitedurlsempty():# 若未访问队列非空
            print("嘀嘀嘀我又爬到一个")
            visitedurl = self.linkQuence.unvisitedurldequence()# 取一个url
            if visitedurl is None or visitedurl == '':
                continue
            initial_links=spiderpage(visitedurl) # 爬出该url页面中所有的链接
            right_links = url_filtrate(initial_links) # 筛选出合格的链接
            self.linkQuence.addvisitedurl(visitedurl) # 将该url放到访问过的url队列中
            for link in right_links: # 将筛选出的链接放到未访问队列中
                self.linkQuence.addunvisitedurl(link)
        # print(self.linkQuence.visited)
        print("哥我爬完了")
        return self.linkQuence.visited
 
if __name__ == '__main__':
    url=url_get()
    sameurl=url_same(url)
    spider=Spider(url)
    urllist=spider.crawler()
    writetofile(urllist)

```
[![python爬取网站全部url链接](http://hss5.com/wp-content/uploads/2018/11/005GjT4tgy1fqq67l8ijkj30sd0bjq3d-2.jpg)](http://hss5.com/wp-content/uploads/2018/11/005GjT4tgy1fqq67l8ijkj30sd0bjq3d-2.jpg)

结果 主要是用自己的网站[https://xiaogeng.top](https://xiaogeng.top/)做的测试：

[![python爬取网站全部url链接](http://hss5.com/wp-content/uploads/2018/11/005GjT4tgy1fqq67l187aj30l90l7js3-2.jpg)](http://hss5.com/wp-content/uploads/2018/11/005GjT4tgy1fqq67l187aj30l90l7js3-2.jpg)

github地址：[https://github.com/gengyanqing/UrlCrawler](https://github.com/gengyanqing/UrlCrawler)
```python
# 更新：排除外链 
# /usr/bin/env python3
# _*_ coding:utf-8 _*_
# auther: saucerman
# project: https://github.com/saucer-man/UrlCrawler
 
"""
decription : 全站url爬取脚本
"""
import re
import time
import sys
import requests
try :
    import tldextract
except:
    print('module tldextract not fount nyou can try pip install tldextract')
    sys.exit()
 
 
def domain_get():
    '''
    接收要爬取的网站url
    '''
    url = input("Please input the url of website:")
    if '//' not in url:
        url = 'http://' + url
    try:
        kv={'user_agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'}
        requests.head(url,headers=kv)
        return url
    except:
        print("your url is incorrect!!")
        return domain_get()
 
 
class spider():
    def __init__(self, domain, key, depth):
        self.domain = domain # 爬取的域名
        self.depth = depth # 爬取的深度
        self.urls_all = set([]) # 爬取的结果
        self.key = key # 顶级域名，用于排除外链
 
    def page_spider(self, url):
        '''
        爬取url中的所有链接
        '''
        try:
            kv={'user_agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'}
            r = requests.get(url, headers=kv, timeout = 2)
            r.encoding=r.apparent_encoding
            pagetext=r.text
            pagelinks = re.findall(r'(?<=href=").*?(?=")|(?<=href=').*?(?=')',pagetext)
            
        except:
            return set([])
        # 接下来对爬取的链接进行处理
 
        # 1、先去除不同域的链接
        url_list = set([])
        for url in pagelinks:
            if self.key in url:
                url_list.add(url)
 
        # 2、再对链接进行去重处理
        url_list = set(url_list)-self.urls_all 
        self.urls_all.update(url_list) 
        return url_list  # 返回集合
 
 
 
    def run(self):
        url_list = set([self.domain]) # 第一次爬取原始url的链接
        while self.depth >= 1: # 每一次深度的爬取都会爬取url_list的所有链接
            print("倒数第%d轮"%self.depth)
            url_list_tmp = set([])
            for url in url_list:
                url_list_tmp.update(self.page_spider(url))
            url_list = url_list_tmp
            self.depth = self.depth -1
        
        file=open('result.txt','w')
        for url in self.urls_all:
            file.write(url)
            file.write('n')
        file.close()
 
 
 
 
if __name__ == '__main__':
    time.clock()
    domain = domain_get()
    print('domain:', domain)
    key_tmp  = tldextract.extract(domain)
    # 用于排除外链，爬取的url不包含key的都会被舍弃。
    # 'https://www.xiaogeng.com.cn/admin?id=6'==>'www.xiaogeng.com.cn'
    key = key_tmp.subdomain + '.' + key_tmp.domain+'.' + key_tmp.suffix 
    print('key:', key)
    print('开始爬取...n')
    spider = spider(domain = domain, key = key, depth = 3)
    spider.run()
    print('结果已保存至result.txt中')
    print('time:',time.clock())
```    
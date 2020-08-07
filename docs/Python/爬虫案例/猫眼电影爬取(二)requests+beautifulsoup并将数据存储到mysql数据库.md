---
title : 猫眼电影爬取(二)：requests+beautifulsoup，并将数据存储到mysql数据库
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-08 04:58:17 +0800
categories:
 -
tags:
 -
---
[[toc]]
> 上一篇通过requests+正则爬取了猫眼电影榜单，这次通过requests+beautifulsoup再爬取一次(其实这个网站更适合使用beautifulsoup库爬取)

##  1.先分析网页源码

![](https://images2018.cnblogs.com/blog/1158674/201806/1158674-20180626174252280-1747469989.png)

可以看出每部电影信息都包含在一堆<dd>...</dd>标签中，所以第一步可以通过beautifulsoup库解析出所有<dd>标签对，然后再从<dd>标签对中依次解析排名所在的<i>标签，电影名所在的<p>标签，上映时间所在的<p>标签以及分数所在的<p>标签。

## 2.信息提取代码

```python
# coding: utf-8
# author: hmk

from bs4 import BeautifulSoup
import requests
import bs4

url = 'http://maoyan.com/board/4'
header = {"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
              "Accept-Encoding": "gzip, deflate, sdch",
              "Accept-Language": "zh-CN,zh;q=0.8",
              "Cache-Control": "max-age=0",
              "Connection": "keep-alive",
              "Host": "maoyan.com",
              "Referer": "http://maoyan.com/board",
              "Upgrade-Insecure-Requests": "1",
              "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36"}
r = requests.get(url, headers=header)
r.encoding = r.apparent_encoding
html = r.text
soup = BeautifulSoup(html, 'html.parser')
# print(soup.find_all('dd'))
list=[]  # 定义一个列表，保存所有电影数据，一定不要定义在循环里面，不然每次都会清空，最后只会留下最后一部电影的数据
for dd in soup.find_all('dd'):
    index = dd.i.string  # 电影排名
    # print(index)
    movie = dd.find('p', class_='name').string  # 电影名称
    # print(movie.string)
    release_times = dd.find('p', class_='releasetime')  # 上映时间
    release_time = release_times.string
    # print(release_time.string)
    s = dd.find('p', class_='score').contents   # 分数
    score = s[0].string+s[1].string  # 把分数的整数部分和小数部分拼接
    # print(score[0].string+score[1].string)

    list.append([index,movie,release_time,score])  # 把每一部电影的排名、名称、上映时间、分数添加到一个列表，再追加到一个大列表
print(list)
```

上述代码的重点在于for循环中信息是如何提取，然后组合的，思路如下：

(1)先提取出页面中所有的<dd>标签对，通过for循环把每组<dd>标签赋给一个dd变量，每一个dd变量都是一个bs4元素的Tag对象；

(2)得到dd标签的返回对象后，可以直接使用find方法来提取dd标签的子标签(开始陷入了一个误区，因为打印出的dd内容是标签元素，然后就想着能不能再把它传进beautifulsoup，
生成一个新的beautifulsoup对象，实际证明不行，因为dd的类型已经是<class 'bs4.element.Tag'\>了，而之前传进去的html=r.text的类型是<class 'str'\>，很明显不能这样干！！
所以想不通时就打印一下对象类型看看是啥)

(3)提取排名\-\-使用  dd.i.string，dd.i表示提取dd标签下的第一个i标签，刚好排名信息就在dd标签下的第一个i标签，加上.string，表示提取文本

(4)提取电影名称\-\-使用 dd.find('p', class\_='name').string，提取dd标签下class属性为name的p标签，因为电影名称就在这个p标签下

(5)提取上映时间\-\-使用 dd.find('p', class\_='releasetime')

(6)提取分数\-\-因为分数分为2部分，整数部分和小数部分，且分别属于一个p标签下的i标签，这样用tag.contents方法(tag的 .contents 属性可以将tag的子节点以列表的方式输出)，
然后再将2部分拼接形成完整分数，如下：dd.find('p', class\_='score').contents\[0\].string + dd.find('p', class\_='score').contents\[1\].string

## 3.完整代码
```python
# coding: utf-8
# author: hmk

import requests
from bs4 import BeautifulSoup
import bs4
import pymysql.cursors


def get_html(url, header):
    try:
        r = requests.get(url=url, headers=header, timeout=20)
        r.encoding = r.apparent_encoding
        if r.status_code == 200:
            return r.text
        else:
            return None
    except:
        return None


def get_data(html, list_data):
    soup = BeautifulSoup(html, 'html.parser')
    dd = soup.find_all('dd')
    for t in dd:
        if isinstance(t, bs4.element.Tag):  # 判断t是否为bs4的tag对象(因为解析出的dd标签中可能有空行)
            ranking = t.i.string  # 排名
            movie = t.find('p', class_='name').string
            release_time= t.find('p', class_='releasetime').string
            score = t.find('p', class_='score').contents[0].string + t.find('p', class_='score').contents[1].string
            list_data.append([ranking, movie, release_time, score])


def write_sql(data):
    conn = pymysql.connect(host='localhost',
                           user='root',
                           password='123456',
                           db='test',
                           charset='utf8')
    cur = conn.cursor()

    for i in data:
        """这里的data参数是指正则匹配并处理后的列表数据(是一个大列表，包含所有电影信息，每个电影信息都存在各自的一个列表中；
        对大列表进行迭代，提取每组电影信息，这样提取到的每组电影信息都是一个小列表，然后就可以把每组电影信息写入数据库了)"""
        movie = i  # 每组电影信息，这里可以看做是准备插入数据库的每组电影数据
        sql = "insert into maoyan_movie(ranking,movie,release_time,score) values(%s, %s, %s, %s)"  # sql插入语句
        try:
            cur.execute(sql, movie)  # 执行sql语句，movie即是指要插入数据库的数据
            conn.commit()  # 插入完成后，不要忘记提交操作
            print('导入成功')
        except:
            print('导入失败')
    cur.close()  # 关闭游标
    conn.close()  # 关闭连接


def main():
    start_url = 'http://maoyan.com/board/4'
    depth = 10  # 爬取深度(翻页)
    header = {"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
              "Accept-Encoding": "gzip, deflate, sdch",
              "Accept-Language": "zh-CN,zh;q=0.8",
              "Cache-Control": "max-age=0",
              "Connection": "keep-alive",
              "Host": "maoyan.com",
              "Referer": "http://maoyan.com/board",
              "Upgrade-Insecure-Requests": "1",
              "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36"}

    for i in range(depth):
        url = start_url + '?offset=' + str(10 * i)
        html = get_html(url, header)
        list_data = []
        get_data(html, list_data)
        write_sql(list_data)
        print(list_data)


if __name__ == "__main__":
    main()
```
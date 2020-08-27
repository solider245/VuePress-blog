---
title : 基于python的链家小区房价爬取——仅需60行代码
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-26 21:43:58 +0800
categories:
 -
tags:
 -
---
[[toc]]
首先打开相关网页（北京链家小区信息）。  
注意本博客的代码适用于爬取某个城市的小区二手房房价信息。  
如果需要爬取其他信息，可修改代码，链家的数据获取的基本逻辑都差不多。

因为只需要60行左右的代码，所以就不写入excel了，直接在终端打印出来。  
效果如下，为了展示美观我加了个json.dumps。  

![](https://p6-tt.byteimg.com/origin/pgc-image/9370f62c8db94a8f806565ce54d7ef57?from=pc)

用谷歌浏览器打开北京链家小区信息，如果需要其他城市的可以直接替换。  
首先可以看看我们要爬取的信息。我这次主要获取的有小区名、小区位置、房价。  

![](https://p1-tt.byteimg.com/origin/pgc-image/ffe4d58ef89b4d56a127932c7061a29b?from=pc)

进入页面后Ctrl+U查看网页源代码，在源代码界面Ctrl+F搜索小区名（也可以搜索其他的）先定位到相关的代码处。  
经过简单的观察，我们就可以定位到我们所需要的所有信息（链家还是挺好爬取的……）。  
可以看下图，该条目下我们所需的所有信息一下都被找到了。  

![](https://p6-tt.byteimg.com/origin/pgc-image/6406d884b4094508bbc787d1154e6424?from=pc)

  
然后把前后的代码拷贝一下，经过一系列整理，得到我们要用到的正则规则。

```py
 # 正则表达式  
    # 小区名  
    name_rule = r'lianjia.com/xiaoqu/[0-9]*/" target="_blank">(.*?)</a>' #[0-9]* 表示任意多个数字     .*? 匹配一次  
    name = re.findall(name_rule, html)  
    # 房价  
    price_rule = r'<div class="totalPrice"><span>(.*?)</span>'  
    price = re.findall(price_rule, html)  
    # 小区所在区域  
    district_rule = r'class="district" title=".*?">(.*?)</a>'  
    district = re.findall(district_rule, html)  
    # 小区所在商圈  
    bizcircle_rule = r'class="bizcircle" title=".*?">(.*?)</a> '  
    bizcircle = re.findall(bizcircle_rule, html)
```

核心问题已经轻松解决了，接下来可以在前面用request加上页面源代码的获取代码，这样才能实现爬虫。

```
 url = str(url)  
    html = requests.get(url).text # 获取页面原代码
```

好了，基本的分析已经完成了。

前文中网页的分析已经完整了，核心的爬取思路已经有了。  
接下来还需要完成的工作是：1\. 实现爬虫的自动化，比如说自己翻页啊什么的。2. 把爬取到的n个页面的数据整合并且整理展示出。

先把需要的库导入。这里用到json主要是为了用json.dumps美化数据的展示。

```
import requests  
import re  
import time  
import json
```

一、首先我需要能够爬取单页的数据。  
主要流程如下：输入相关的url，读取源代码，用正则表达式筛选我们需要的数据（小区名、房价、区域、商圈）、让数据一一对应（如果不一一对应会打印“参数匹配失败”。  
整个def最后返回一个字典，字典的key是小区名，字典的value是一个数组（包含了区域、商圈、房价信息）。

```py
def get_housing_price(url):  
    url = str(url)  
    html = requests.get(url).text # 获取页面原代码  
    # 正则表达式  
    # 小区名  
    name_rule = r'lianjia.com/xiaoqu/[0-9]*/" target="_blank">(.*?)</a>' #[0-9]* 表示任意多个数字     .*? 匹配一次  
    name = re.findall(name_rule, html)  
    # 房价  
    price_rule = r'<div class="totalPrice"><span>(.*?)</span>'  
    price = re.findall(price_rule, html)  
    # 小区所在区域  
    district_rule = r'class="district" title=".*?">(.*?)</a>'  
    district = re.findall(district_rule, html)  
    # 小区所在商圈  
    bizcircle_rule = r'class="bizcircle" title=".*?">(.*?)</a> '  
    bizcircle = re.findall(bizcircle_rule, html)  
    # 建立小区名和房价对应的字典  
    housing_price_dict = {}  
    if len(name) == len(price) == len(district) == len(bizcircle):  
        for i in range(len(name)):  
            infor = [] # 存放信息的列表  
            if price[i] != '暂无': #因为存在暂无，把除了暂无房价数据以外的房价变成浮点型  
                floated = float(price[i])  
            else:  
                floated = '暂无'  
            infor.append(district[i])  
            infor.append(bizcircle[i])  
            infor.append(floated)  
            housing_price_dict[name[i]] = infor # 遍历生成键值  
    else:  
        print('参数匹配失败')  
    return housing_price_dict
```

二、遍历输入的n个页面，并且把n个页面获取的数据字典整合为一个。  
上面已经写了爬取一个页面的def，现在要在上面def的基础上自动生成url并且爬取n个页面并且整合n个页面的数据。

首先先写一个合并两个字典的def放在这，等下用得着。

```
# 合并字典  
def merge_dict(dict1, dict2):  
    merged = {**dict1, **dict2}   
    return merged
```

然后写一个遍历页面的def，经过简单的观察切换页面只需要在原来的url后面+pg+数字就行。  
下面这个def的思路是输入起始和中止页，用for遍历起始和中止页之间的所有页面，然后用一里面的def爬取每个单页的数据，最后把每个单页得到的字典整合起来。

```py
# 整合房价字典  
def merge_price_dict(start, end):  
    initial = {}  
    for pg in range(start, end+1): # 设置起始和中止界面  
        url = f'https://bj.lianjia.com/xiaoqu/pg{pg}/'  
        prices = get_housing_price(url)  
        time.sleep(1)  
        initial = merge_dict(initial, prices)  
    return initial
```

三、举个栗子。  
拥有了以上的三个def就可以完成数据的爬取和打印工作了。下面举个简单的栗子谈谈如何串联三个def。  
只需要三行（如果大家需要自己该代码写入excel之类的话，可以直接放弃第二行第三行）：  
第一行：获取3-5页里的房价数据并且整合为一个字典。  
第二行：美化一下第一行的字典（主要为了打印出来比较好看）。  
第三行：打印。

```
price_dict = merge_price_dict(3, 5)  
formation_dict = json.dumps(price_dict, indent=4, ensure_ascii=False) 
```

打印出来结果长这样。  

![](https://p3-tt.byteimg.com/origin/pgc-image/6f9995d99fe1484bb3539f34ff0f2c6a?from=pc)

```py
import requests  
import re  
import time  
import json

# 爬取房价并且返回一个页面的字典  
def get_housing_price(url):  
    url = str(url)  
    html = requests.get(url).text # 获取页面原代码  
    # 正则表达式  
    # 小区名  
    name_rule = r'lianjia.com/xiaoqu/[0-9]*/" target="_blank">(.*?)</a>' #[0-9]* 表示任意多个数字     .*? 匹配一次  
    name = re.findall(name_rule, html)  
    # 房价  
    price_rule = r'<div class="totalPrice"><span>(.*?)</span>'  
    price = re.findall(price_rule, html)  
    # 小区所在区域  
    district_rule = r'class="district" title=".*?">(.*?)</a>'  
    district = re.findall(district_rule, html)  
    # 小区所在商圈  
    bizcircle_rule = r'class="bizcircle" title=".*?">(.*?)</a> '  
    bizcircle = re.findall(bizcircle_rule, html)  
    # 建立小区名和房价对应的字典  
    housing_price_dict = {}  
    if len(name) == len(price) == len(district) == len(bizcircle):  
        for i in range(len(name)):  
            infor = [] # 存放信息的列表  
            if price[i] != '暂无': #因为存在暂无，把除了暂无房价数据以外的房价变成浮点型  
                floated = float(price[i])  
            else:  
                floated = '暂无'  
            infor.append(district[i])  
            infor.append(bizcircle[i])  
            infor.append(floated)  
            housing_price_dict[name[i]] = infor # 遍历生成键值  
    else:  
        print('参数匹配失败')  
    return housing_price_dict

# 合并字典  
def merge_dict(dict1, dict2):  
    merged = {**dict1, **dict2}   
    return merged

# 整合房价字典  
def merge_price_dict(start, end):  
    initial = {}  
    for pg in range(start, end+1): # 设置起始和中止界面  
        url = f'https://bj.lianjia.com/xiaoqu/pg{pg}/'  
        prices = get_housing_price(url)  
        time.sleep(1)  
        initial = merge_dict(initial, prices)  
    return initial

price_dict = merge_price_dict(3, 5)  
formation_dict = json.dumps(price_dict, indent=4, ensure_ascii=False) # 输出美化  
print(formation_dict)


```


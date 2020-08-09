---
title : Requests-HTML学习心得
description : 主要学习如何使用Python最新的模块的使用
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-08 22:21:57 +0800
categories:
 -
tags:
 -
---
[[toc]]

>requests-HTML是Python最新的模块，一般认为他结合了requests与bs4。等于同时使用了这两个模块。

>这里写一篇文章记录一下。

## 模块的安装与导入

### 安装

```shell
pipenv install requests-html
```

>现在一般最新的Python都 自带这个模块了。

### 正常导入

```python
from requests_html import HTMLSession
``` 
### 异步导入

```python
from requests_html import AsyncHTMLSession
asession = AsyncHTMLSessio
r = await asession.get('https://python.org/')
```
>同时获取多个站点

```python
from requests_html import AsyncHTMLSession
asession = AsyncHTMLSession()
async def get_pythonorg():
...   r = await asession.get('https://python.org/')
async def get_reddit():
...   r = await asession.get('https://reddit.com/')
async def get_google():
...   r = await asession.get('https://google.com/')
session.run(get_pythonorg, get_reddit, get_google)
```

## 编程中的使用

### 最常见的使用

```python
session = HTMLSession()
headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Mobile Safari/537.36"
}
r = session.get(url,headers=headers)
```

> headers一般都要填写，否则大多数网站的反爬第一关都过不了。





---
title : pandas爬虫心得
description : pandas不仅仅可以用来分析数据，还可以用来爬取表格数据
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-06 17:13:09 +0800
categories:
 -
tags:
 -
---
[[toc]]

> 新手使用爬虫最好从pandas表格爬虫开始，这个是最简单最易学的。

## 环境依赖
### 生成requirements.txt文件
```shell
pip freeze > requirements.txt
```
这个命令不好，因为会把所有项目的依赖生成。
如果只是单纯生成本地的依赖，应该使用pipreqs。

```shell
#通过以下命令安装：

pip install pipreqs
#运行：

pipreqs ./

```
### 安装项目依赖的文件

```
pip install -r requirements.txt
```

## 爬虫中的坑点

1. 作为循环迭代的i应该用str(i)包裹。
2. pd.read_html(url)[3] # 这个3应该在括号外面 
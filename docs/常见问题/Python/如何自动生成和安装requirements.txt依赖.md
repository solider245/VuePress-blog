---
title: 如何自动生成和安装requirements.txt依赖?
description: 算是一个十分经典和常见的问题
---
## 问题产生原因
在查看别人的Python项目时，经常会看到一个`requirements.txt`文件，里面记录了当前程序的所有依赖包及其精确版本号。这个文件有点类似与Rails的`Gemfile`。其作用是用来在另一台PC上重新构建项目所需要的运行环境依赖。

requirements.txt可以通过`pip`命令自动生成和安装

### 生成requirements.txt文件
```shell
pip freeze > requirements.txt
```

### 安装requirements.txt依赖

```shell
pip install -r requirements.txt
```
### 环境混用怎么办？

在导出依赖到 requirement.txt 文件时会有一种尴尬的情况。

你的本地环境不仅包含项目 A 所需要的依赖，也包含着项目 B 所需要的依赖。此时我们要如何做到只把项目 A 的依赖导出呢？

[pipreqs](https://link.zhihu.com/?target=https%3A//github.com/bndr/pipreqs) 可以通过扫描项目目录，帮助我们仅生成当前项目的依赖清单。

通过以下命令安装：

```shell
pip install pipreqs
```

运行：

```shell
pipreqs ./
```

## 补充
如果安装pipreqs之后找不到命令，那么就是你的路径有问题。因为pip安装的软件的命令默认在.local，很多路径都没有包括。

临时使用的时候，可以输入
```shell
export PATH=~/.local/bin:$PATH
```
然后测试下有没有效果，如果有效果，那么就把这行复制到你的配置中。
## 参考文章
[Python 中的 requirement.txt](https://zhuanlan.zhihu.com/p/69058584)

[如何自动生成和安装requirements.txt依赖](http://lazybios.com/2015/06/how-to-use-requirementstxt-file-in-python/)
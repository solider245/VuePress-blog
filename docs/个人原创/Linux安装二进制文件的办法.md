---
title : Linux安装二进制文件的办法
description : 经过了本人验证，确实可行的办法
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-03 15:16:37 +0800
categories:
 -
tags:
 - linux
---
[[toc]]

> 之前一直不知道如何安装Linux二进制文件，今天终于找到了。所以写下来，防止以后忘记。

## 第一步，下载文件

我们这里以Docker管理软件Dry为例。
```shell
wget-c https://github.com/moncho/dry/releases/download/v0.9-beta.3/dry-linux-amd64
```
首先先下载对应系统的文件。如果文件格式不对，会产生执行错误。
 
## 第二步.将文件改名并移动
```shell
sudo mv dry-linux-amd64 /usr/local/bin/dry
```
::: tip
>`/usr/local/bin`是用于存储服务器本地程序的二进制文件的标准位置。将dry二进制文件移动到该目录还使我们能够从服务器内的任何位置在命令行上调用dry，因为该目录包含在外壳程序的$PATH环境变量中。

:::

## 第三步使用`chmod`更改二进制文件权限

```shell
sudo chmod 755 /usr/local/bin/dry
```
您可以 `dry` 通过运行带有 `-v` 选项 的程序 来测试它 现在可以访问并且可以正常工作 。

```
dry -v

```

这将返回版本号和构建详细信息：

```shell
Version Details Outputdry version 0.9-beta.2, build d4d7a789
```

---
title : chpasswd命令
description : 批量更新用户口令的工具
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-02 22:54:39 +0800
categories:
 -
tags:
 - Linux
---
[[toc]]

## chpasswd命令
::: tip
>chpasswd命令是批量更新用户口令的工具，是把一个文件内容重新定向添加到/etc/shadow中。
:::

### 语法

chpasswd(选项)

### 选项

```
-e：输入的密码是加密后的密文；
-h：显示帮助信息并退出；
-m：当被支持的密码未被加密时，使用MD5加密代替DES加密。

```
### 实例

先创建用户密码对应文件，格式为`username:password`，如`abc:abc123`，必须以这种格式来书写，并且不能有空行，保存成文本文件user.txt，然后执行chpasswd命令：

```shell
chpasswd < user.txt # 第一种先创建文本，然后使用文本数据
echo 'root:root' |chpasswd # 这里直接创建内容，然后使用管道传递给chpasswd
```
以上是运用chpasswd命令来批量修改密码。是linux系统管理中的捷径。
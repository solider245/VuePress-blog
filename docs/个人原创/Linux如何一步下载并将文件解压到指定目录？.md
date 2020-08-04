---
title : Linux如何一步下载并将文件解压到指定目录？
description : 这个算是比较常见的问题，通常用curl比较多一些
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-04 14:55:18 +0800
categories:
 -
tags:
 -
---
[[toc]]

> 这个问题困扰了我很久，现在终于找到比较好的办法，写一篇文章存个档吧。

## 原始问题

我想下载并解压缩指定目录下的档案。 到目前为止，这是我一直在做的事情：

```
wget http://downloads.mysql.com/source/dbt2-0.37.50.3.tar.gz
tar zxf dbt2-0.37.50.3.tar.gz
mv dbt2-0.37.50.3 dbt2
```

我想 *即时* 下载并解压缩存档 ，而无需 `tar.gz` 写入磁盘。 我认为可以通过将的输出 `wget` 传递给 `tar` ，并给出 `tar` 一个目标来实现，但实际上我不知道如何将各个部分放在一起。


## Linux下载文件的常见步骤

通常步骤：
1. 下载文件
2. 解压缩文件
3. 删除掉压缩包

### wget下载办法

您可以通过告诉 `wget` 将其有效负载输出到stdout（带有标志 `-O-` ）并禁止其自己的输出（带有标志 `-q` ）来实现：

```
wget -qO- your_link_here | tar xvz -
```

要指定目标目录：

```
wget -qO- your_link_here | tar xvz - -C /target/directory
```

**更新资料**

如果您碰巧有GNU `tar`

```
wget -qO- your_link_here | tar --transform 's/^dbt2-0.37.50.3/dbt2/' -xvz
```

应该让您一步一步就能做到。

`-q` 安静

`-O -` 输出到标准输出

### 反向输出
这个oneliner可以解决这个问题：

```
tar xvzf -C /tmp/ < <(wget -q -O - http://foo.com/myfile.tar.gz)
```

简短说明：首先执行括号中的右侧（ `-q` 告诉wget安静地执行此操作， `-O -` 用于将输出写入stdout）。

然后，我们使用Bash中的流程替换运算符 `<(` 创建一个 *命名管道，* 以创建一个*命名管道* 。 这样，我们创建了一个临时文件描述符，然后使用 `<` 文件重定向运算符 将该描述符的内容 定向 到tar 。

### curl方法

另一个选项是使用 `curl` 默认情况下写入标准输出的 选项 ：

```
curl -s some_url | tar xvz -C /tmp
```
命令解读：
* curl 先下载某文件
* tarxvz 解压某文件
* -C /tmp 解压到tmp文件夹

这里有个问题，有些压缩包会有很多内容并不只是单纯一个二进制文件。
建议\->例如，要查看存储库中文件的过滤列表，可以使用： `$ curl -L https://api.github.com/repos/repo_owner/repo_name/tarball | tar tvfz - -C /tmp --wildcards *.py`
所以可以使用上面的命令来过滤
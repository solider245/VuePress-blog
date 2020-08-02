---
title : 在Dockerfile中运行脚本
description : 估计以后会遇到的问题
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-02 23:31:26 +0800
categories:
 -
tags:
 - docker
 - dockerfile
---
[[toc]]

## 问题
我正在尝试在我的Dockerfile中构建过程中运行脚本。但它似乎不起作用。

我试过这样的方式：

```
FROM php:7-fpm
ADD bootstrap.sh /
ENTRYPOINT ["/bin/bash", "/bootstrap.sh"]

```

也是这样：

```
FROM php:7-fpm
ADD bootstrap.sh /
RUN bash -c "/bootstrap.sh"

```

并且还执行我正在运行的容器：

```
docker exec symfony /bin/bash -c "/bootstrap.sh"

```

似乎没什么用。

你知道怎么做吗？


## 解决方案
`RUN`和`ENTRYPOINT`是执行脚本的两种不同方式。

`RUN`表示它创建一个中间容器，运行脚本并在新的中间图像中冻结该容器的新状态。之后不会运行脚本：您的最终图像应该反映该脚本的结果。

`ENTRYPOINT`表示您的图像（尚未执行脚本）将创建一个容器，并运行该脚本。

在这两种情况下，都需要添加脚本，`RUN chmod +x /bootstrap.sh`是个好主意。

它也应该以 [Shebang开头](https://en.wikipedia.org/wiki/Shebang_%28Unix%29) （如`#!/bin/sh`）

考虑到你的脚本（ [`KevinRaimbaud/docker-symfony/docker/php/bootstarp.sh`](https://github.com/KevinRaimbaud/docker-symfony/blob/master/docker/php/bootstarp.sh) ：几个`git config --global`命令），最好在你的Dockerfile中运行一次该脚本，但确保使用正确的用户（全局git配置文件是％HOME％/。 gitconfig，默认是/ root一个）

添加到 [您的Dockerfile](https://github.com/KevinRaimbaud/docker-symfony/blob/1b55c799aefa651ff341fe2e5a15828bd480270d/docker/php/Dockerfile#L33-L34) ：

```
RUN /bootstart.sh

```

然后，在运行容器时，检查`/root/.gitconfig`的内容以确认脚本已运行。


## 补充答案

**如果您在Windows中创建/编辑了.sh脚本文件，请确保使用以Unix格式结尾的行保存它** 。默认情况下，Windows中的许多编辑器会将Unix行结尾转换为Windows格式，Linux将无法识别文件开头的Shebang（＃！/ bin/sh）。所以Linux会产生错误消息，就像没有Shebang一样。

提示：

*   如果使用Notepad ++，则需要单击“编辑/ EOL转换/ UNIX（LF）”
*   如果您使用Visual Studio，我建议安装“ [End Of Line](https://marketplace.visualstudio.com/items?itemName=rolfwr.EndoftheLine) ”插件。然后按Ctrl\-R，Ctrl\-W可以看到行结尾。要设置Linux样式结尾，可以按Ctrl\-R，Ctrl\-L。对于Windows样式，请按Ctrl\-R，Ctrl\-C。

## 补充答案2

尝试使用`ADD`命令和工作目录规范创建脚本像这样（“script”是脚本的名称，`/root/script.sh`是容器中的所需位置，它可以是不同的路径：

```
ADD script.sh /root/script.sh

```

在这种情况下`ADD`必须在`CMD`之前，如果你有一个BTW，那么将脚本从主机导入容器中的任何位置都很酷

在`CMD`中`[./script]`

它应该自动执行您的脚本

您也可以将`WORKDIR`指定为`/root`，然后在启动容器时自动将其置于root中
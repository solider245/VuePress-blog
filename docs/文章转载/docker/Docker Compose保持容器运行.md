---
title : Docker Compose保持容器运行
description : 这里主要是解决如何让容器保持持续运行
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-11 04:02:04 +0800
categories:
 -
tags:
 -
---
[[toc]]

## 原始问题
我想使用docker\-compose启动服务并保持容器运行，以便我可以通过“ docker inspect”获取其IP地址。 但是，容器始终在启动后立即退出。

我试图在docker\-compose.yml中添加“ command：\[“ sleep”，“ 60”\]“和其他内容，但是每当我添加带有” command：...“的行时，我都无法调用” docker\-compose up“因为我将收到消息“无法启动容器.....系统错误：无效的字符'k'寻找值的开始”

我还尝试将“ CMD sleep 60”和诸如此类的内容添加到Dockerfile本身，但是这些命令似乎并未执行。

是否有一种简单的方法来保持容器的寿命或解决我的问题之一？

编辑：这是我要运行的撰写文件：

```
version: '2'
services:
  my-test:
    image: ubuntu
    command: bash -c "while true; do echo hello; sleep 2; done"

```

如果我在OS X下以docker\-compose开头，则工作正常，但如果在Ubuntu 16.04下尝试相同操作，则会出现上述错误消息。

如果我尝试使用Dockerfile的方法，则Dockerfile如下所示：

```
FROM ubuntu:latest
CMD ["sleep", "60"]

```

哪个似乎什么都没做

编辑2：我必须纠正自己，原来这是与Dockerfile和docker\-compose.yml相同的问题：每次我向Dockerfile添加“ CMD ...”或向其中添加“ command ...”撰写文件时，出现无效字符并出现上述错误。 如果我删除了这两个命令，它会正常工作。

## 最佳答案

要使容器在启动时保持运行 `docker-compose` ，请使用以下命令

`command: tail -F anything`

所以你的docker\-compose.yml变成

```
version: '2'
services:
  my-test:
    image: ubuntu
    command: tail -F anything

```

您可以使用以下命令运行外壳程序以进入容器

`docker exec -i -t composename_my-test_1 bash`

容器前面 `composename` 的名称 在哪里 `docker-compose` 。

## 第二高赞答案

您可以使用 `tty` 配置选项。

```
version: '3'

services:
  app:
    image: node:8
    tty: true           # <-- This option

```

*注意：如果将Dockerfile用于映像和`CMD`Dockerfile中，则此选项将不起作用；但是，您可以`entrypoint`在compose文件中使用该选项，以`CMD`从Dockerfile中清除。*

## 第三赞
根据 [@aanand在GitHub](https://github.com/docker/compose/issues/1926#issuecomment-135068628) 上 [的评论2015年8月26日](https://github.com/docker/compose/issues/1926#issuecomment-135068628) ，可以 `tail -f /dev/null` 在docker\-compose中使用以保持容器运行。

**docker\-compose.yml示例**

```
version: '3'
services:
  some-app:
    command: tail -f /dev/null

```

**为什么使用此命令？**

选择此选项的唯一原因是它在GitHub上获得了很多赞扬，但是投票率最高的答案并不意味着它是最佳答案。 第二个原因是务实的原因，由于截止日期必须尽快解决问题。
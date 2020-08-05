---
title : docker镜像如何推送到dockerhub仓库
description : 常见问题
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-05 17:11:04 +0800
categories:
 -
tags:
 - docker
---
[[toc]]

> 最近制作镜像，发现了这个问题，写下来防止忘记

## 官方仓库，国内镜像仓库，私有仓库应该如何选择？

如果没有强烈的发布需求，建议直接使用国内各个云服务的共有仓库。比如腾讯云就发布到腾讯云仓库。阿里云就发布到阿里云仓库。如果制作了镜像想发布到官方仓库，那就发。国内链接速度比较慢。一旦镜像比较大，推送的速度会让你抓狂。

## 发布到dockerhub

### 注册账号

先到[dockerhub](https://hub.docker.com/)官方注册一个帐号。这样的话，你帐号下面就会有一个以你的名字命名的公有仓库。因为如果你要将镜像推送到dockerhub，那么你所有的镜像都要符合仓库的命名规范。

### 登录帐号

```
docker login
```
然后依次输入你注册时的名字和密码，链接成功后就可以了。
### 镜像命名规范

```shell
dokcer push solider245/ubuntu:20.04-CN 
# docker push 你的名字/镜像名字:镜像标签
```
如上所示，上面就是一个标准的，符合推送的命名规范的镜像。给大家解析下：

* docker push  镜像推送命令
* solider245 你的用户名
* ubuntu 镜像名字
* tag 镜像标签

::: tip
用户名和镜像名用/隔开
:::

::: details
```shell
▶ docker push --help

Usage:  docker push [OPTIONS] NAME[:TAG]

Push an image or a repository to a registry

Options:
      --disable-content-trust   Skip image signing (default true)
```
:::

> 你也可以查看官方的的解释

### 镜像改名
如果我们的镜像名称不符合推送的规范，那么我们就需要来改名了。
改名我们使用
`docker tag`

::: details
```shell
 docker tag --help                                    

Usage:  docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]

Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
```
:::

上面就是官方的用法.
```shell
docker tag ubuntu:20.04-CN solider245/ubuntu:20.04-CN
``` 
如上所示。

其他仓库部署可以参考这篇文章
[震惊 | 只需3分钟！极速部署个人Docker云平台 - 知乎](https://zhuanlan.zhihu.com/p/88200038)
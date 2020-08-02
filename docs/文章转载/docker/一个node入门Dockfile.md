---
title : 一个node入门Dockfile
description : 看起挺适合新手的案例
author : 中箭的吴起
image : 
date : 2020-08-02 09:43:16 +0800
categories:
 -
tags:
 -
---

## node源码

```docker
# 指定基础镜像
FROM node:latest

# 指定维护者信息
# MAINTAINER 标签已经弃用
LABEL maintainer="solider245@gmail.com"

# 切换工作目录
WORKDIR /usr/src

# 下载项目
RUN git clone https://github.com/zxy6173/manage-front.git

# 切换到项目根目录
WORKDIR /usr/src/manage-front

# 设置npm的下载源
RUN npm config set registry=https://registry.npm.taobao.org

# 下载依赖包
RUN npm install

# 当启动容器时部署项目
CMD npm start
```

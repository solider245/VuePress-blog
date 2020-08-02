---
title : Dockerfile指令汇总及解析
description : 
author : 中箭的吴起
image : https://images.unsplash.com/photo-1590440557255-bc81008ada7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60
date : 2020-08-02 08:53:38 +0800
categories:
 -
tags:
 -
---

原文地址:[https://www.maoyupeng.club/2020/02/dockerfile\-command\-introduction.html](https://www.maoyupeng.club/2020/02/dockerfile-command-introduction.html)

## 什么是Dockerfile

Dockerfile是由一系列命令和参数构成的脚本，这些命令应用于基础镜像并最终创建一个新的镜像。它们简化了从头到尾的流程并极大的简化了部署工作。Dockerfile从FROM命令开始，紧接着跟随者各种方法，命令和参数。其产出为一个新的可以用于创建容器的镜像。

当你在使用 Docker构建镜像的时候，每一个命令都会在前一个命令的基础上形成一个新层。这些基础镜像可以用于创建新的容器。本篇文章将手把手教您如何从基础镜像，一步一步，一层一层的从Dockerfile构建容器的过程。

## Dockerfile示例

```docker
# Version 1.0
FORM ubuntu:14.04
MAINTAINER Mao "hongtu1993@sina.cn"
RUN apt-get update && apt-get install -y nginx
RUN echo 'Hello,I am work' > /usr/share/nginx/html/index.html
EXPOSE 80 80
```

### Docker执行步骤分析

以上`Dockerfile`示例中,每条指令都会创建一个新的镜像层并对镜像进行提交.Docker执行Dockerfile大致流程:

1.  Docker从基础镜像运行一个容器;
2.  执行一条指令,对容器做出修改;
3.  执行类似`docker commit`的操作,提交一个新的镜像层;
4.  Docker再基于刚提交的镜像运行一个新容器;
5.  执行`Dockerfile`中的下一条指令,直到所有指令都执行完毕;

### 示例解析

1.  *FROM*:每个dockerfile的第一条命令是FROM.FROM指令指定一个已经存在的镜像,则代表FROM后续的指令都是基于该镜像(ubuntu14.04)进行的.
2.  *MAINTAINER*:该指令告诉Docker,作者和邮箱地址
3.  *RUN*:通俗地说,`RUN`指令会在shell里使用命令包装器 `/bin/sh -c` 来执行.如果在不支持shell的平台上运行,则可使用exec格式的RUN指令`RUN ["apt-get","install","-y","nginx"]`
4.  *EXPOSE*: 向外公开端口

## Dockerfile指令汇总及解析

### MAINTAINER

我建议这个命令放在Dockerfile的起始部分，虽然理论上它可以放置于Dockerfile的任意位置。这个命令用于声明作者，并应该放在FROM的后面。

```docker
# MAINTAINER [name] [email]
MAINTAINER authors_name "hongtu1993@sina.cn"
```

### FROM

FROM命令可能是最重要的Dockerfile命令。改命令定义了使用哪个基础镜像启动构建流程。基础镜像可以为任意镜 像。如果基础镜像没有被发现，Docker将试图从Docker image index来查找该镜像。FROM命令必须是Dockerfile的首个命令。

```
# FROM [image name]

FROM ubuntu
```

### ADD

`ADD`命令有两个参数，源和目标。它的基本作用是从源系统的文件系统上复制文件到目标容器的文件系统。如果源是一个URL，那该URL的内容将被下载并复制到容器中。

```
# ADD [source directory or URL] [destination directory]

ADD /my_app_folder /my_app_folder
```

### RUN

`RUN`命令是`Dockerfile`执行命令的核心部分。它接受命令作为参数并用于创建镜像。不像`CMD`命令，`RUN`命令用于创建镜像（在之前commit的层之上形成新的层）。

```
# RUN [command]

RUN apt-get update
```

### CMD

和`RUN`命令相似，`CMD`可以用于执行特定的命令。和`RUN`不同的是，这些命令不是在镜像构建的过程中执行的，而是在用镜像构建容器后被调用。

```
# CMD application "argument", "argument", ..

CMD "echo" "Hello Mao!"
```

### ENTRYPOINT

`ENTRYPOINT`帮助你配置一个容器使之可执行化，如果你结合`CMD`命令和`ENTRYPOINT`命令，你可以从`CMD`命令中移除“application”而仅仅保留参数，参数将传递给`ENTRYPOINT`命令。

```docker
# Usage: ENTRYPOINT application "argument", "argument", ..
# Remember: arguments are optional. They can be provided by CMD
# or during the creation of a container.
ENTRYPOINT echo

# Usage example with CMD:
# Arguments set with CMD can be overridden during *run*
CMD "Hello docker!"
ENTRYPOINT echo
```

### ENV

`ENV`命令用于设置环境变量。这些变量以”key=value”的形式存在，并可以在容器内被脚本或者程序调用。这个机制给在容器中运行应用带来了极大的便利。

```
# ENV key value

ENV SERVER_WORKS 4
```

### USER

USER命令用于设置运行容器的UID。

```
# USER [UID]

USER 751
```

### VOLUME

VOLUME命令用于让你的容器访问宿主机上的目录。

```
# VOLUME ["/dir_1", "/dir_2" ..]

VOLUME ["/my_files"]
```

### WORKDIR

WORKDIR命令用于设置CMD指明的命令的运行目录。

```
# WORKDIR /path

WORKDIR ~/
```

### EXPOSE

`EXPOSE`指令用来告诉Docker这个容器在运行时会监听哪些端口，Docker在连接不同的容器(使用–link参数)时使用这些信息;
两个Docker的核心概念是可重复和可移植。镜像应该可以运行在任何主机上并且运行尽可能多的次数。在 Dockerfile中你有能力映射私有和公有端口，但是你永远不要通过Dockerfile映射公有端口。通过映射公有端口到主机上，你将只能运行一个容器化应用程序实例。（译者注：运行多个端口不就冲突啦）

```docker
# EXPOSE [port]

# private and public mapping
EXPOSE 80:8080

# private only
EXPOSE 80
```

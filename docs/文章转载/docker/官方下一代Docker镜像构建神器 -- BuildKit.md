---
title : 官方下一代Docker镜像构建神器 -- BuildKit
description : 
author : 中箭的吴起
image : "https://segmentfault.com/img/bVbGBiN"
date : 2020-08-02 11:59:19 +0800
categories:
 -
tags:
 -
---
[BuildKit](https://github.com/moby/buildkit)是Docker官方社区推出的下一代镜像构建神器\-\-可以更加快速，有效，安全地构建docker 镜像。Docker v18.06已经集成了该组件。BuildKit可用于多种导出格式（例如OCI或Docker）以及前端支持（Dockerfile），并提供高效缓存和运行并行构建操作等功能。BuildKit仅需要容器运行时就能执行，当前受支持的运行时包括containerd和runc。

### 构建步骤优化

Docker提供的原始构建最令人沮丧的问题之一是Dockerfile指令执行构建步骤的顺序性。在引入多阶段构建之后，可以将构建步骤分组为单独的逻辑构建任务在同一个Dockerfile中。

有时，这些构建阶段是彼此完全独立的，这意味着它们可以并行执行\-或根本不需要执行。遗憾的是，传统的Docker镜像构建无法满足这种灵活性。这意味着构建时间通常会比绝对必要的时间更长。

相比之下，BuildKit会创建一个构建步骤之间的依赖关系图，并使用该图来确定可以忽略构建的哪些元素;可以并行执行的元素;需要顺序执行的元素。这可以更有效地执行构建，这对开发人员来说很有价值，因为他们可以迭代其应用程序的镜像构建。

### 高效灵活的缓存

虽然在旧版Docker镜像构建中缓存构建步骤非常有用，但效率却不如预期。作为对构建后端的重写，BuildKit在此方面进行了改进，并提供了更快，更准确的缓存机制。使用为构建生成的依赖关系图，并且基于指令定义和构建步骤内容。

BuildKit提供的另一个巨大好处是以构建缓存导入和导出的形式出现，正如Kaniko和Makisu允许将构建缓存推送到远程注册表一样，BuildKit也是如此，但是BuildKit使您可以灵活地将缓存嵌入到内部注册表中。镜像（内联）并将它们放在一起（虽然不是每个注册表都支持），或者将它们分开导入。也可以将缓存导出到本地目录以供以后使用。

当从头开始建立构建环境而没有任何先前的构建历史时，导入构建缓存的能力就发挥了自己的作用：导入“预热”缓存，对于临时CI/CD环境特别有用。

### 工件

当使用旧版Docker镜像构建器构建镜像时，将生成的镜像添加到Docker守护进程管理的本地镜像的缓存中。需要单独的`docker push`将该镜像上载到远程容器镜像注册表。新的工件构建工具通过允许您在构建调用时指定镜像推送来增强体验，BuildKit也不例外，它还允许以几种不同格式输出镜像；本地目录中的文件，本地tarball，一个本地OCI镜像tarball，一个Docker镜像tarball，一个存储在本地缓存中的Docker镜像以及一个推送到注册表的Docker镜像，有很多格式！

### 扩展语法

对于docker构建体验而言，经常重复出现的众多功能请求之一就是安全处理镜像构建过程中所需的机密信息。Moby项目抵制了这一要求很多年了，但是，借助BuildKit灵活的“前端”定义，为Buildkit提供了一个实验性前端，它扩展了Dockerfile语法。扩展后的语法为RUN Dockerfile指令提供了有用的补充，其中包括安全性功能。

```
RUN --mount=type=secret,id=top-secret-passwd my_command
```

引用实验性前端的Dockerfile可以为RUN指令临时挂载秘钥。使用 `--secret` 标志将秘钥提供给构建，用于docker build。使用ssh mount类型可以转发SSH代理连接以实现安全SSH身份验证。

### BuildKit使用场景

BuildKit还有许多其他功能，可以极大地改善构建容器镜像的技巧。如果它是适用于许多不同环境的通用工具，那么如何使用它呢？

根据您工作的环境，这个问题的答案是多种多样的。让我们来看看。

#### Docker

尽管目前BuildKit不是Docker的默认构建工具，但是完全可以考虑将其作为Docker（v18.09 +）的首选构建工具。当然目前在windows平台是不支持的。

临时方案是设置环境变量`DOCKER_BUILDKIT=1`。

如果是想永久生效的话，将`"features":{"buildkit": true}` 添加到docker守护进程的配置文件中。

在此配置中，由于Docker守护程序中的当前限制，Docker并未充分展现BuildKit的全部功能。因此，Docker客户端CLI已扩展为提供插件框架，该框架允许使用插件扩展提供了可用的CLI功能。一个名为`Buildx`的实验性插件会绕过守护程序中的旧版构建函数，并使用BuildKit后端进行所有构建，它提供所有熟悉的镜像构建命令和功能，但通过一些特定于BuildKit的附加功能对其进行了扩充。

BuildKit以及Buildx的都支持多个构建器实例，这是一项重要功能，这实际上意味着可以共享一个构建器实例场以进行构建;也许是一个项目被分配了一组构建器实例。

```
$ docker buildx ls
NAME/NODE DRIVER/ENDPOINT STATUS PLATFORMS
default * docker
  default default running linux/amd64, linux/386
```

默认情况下，Buildx插件以docker驱动程序为目标，该驱动程序使用Docker守护程序提供的BuildKit库具有其固有的局限性。另一个驱动程序是docker\-container，它可以透明地在容器内启动BuildKit以执行构建。 BuildKit中提供的功能CLI：这是否是理想的工作流程，完全取决于个人或公司的选择。

#### Kubernetes

越来越多的组织将构建放到Kubernetes当中，通常将容器镜像构建作为CI/CD工作流的一部分出现在pod中。在Kubernetes中运行BuildKit实例时，有一个每种部署策略都有其优缺点，每种策略都适合不同的目的。

![build.jpg](https://segmentfault.com/img/bVbGBVK "build.jpg")

除了使用Docker CLI为BuildKit启动面向开发人员的构建之外，构建还可以通过多种CI/CD工具触发。使用BuildKit进行的容器镜像构建可以作为Tekton Pipeline Task执行。

### 结论

本文主要讲了BuildKit诸多特性和使用场景。

目前类似的工具不少，如Redhat的Buildah，Google的Kaniko或Docker的BuildKit。

不过BuildKit是官方提供，和docker本身结合比较好。

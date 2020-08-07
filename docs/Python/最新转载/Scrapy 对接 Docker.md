---
title : Scrapy 对接 Docker
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-07 17:59:55 +0800
categories:
 -
tags:
 -
---
[[toc]]
环境配置问题可能一直会让我们头疼，包括如下几种情况。

*   我们在本地写好了一个Scrapy爬虫项目，想要把它放到服务器上运行，但是服务器上没有安装Python环境。

*   其他人给了我们一个Scrapy爬虫项目，项目使用包的版本和本地环境版本不一致，项目无法直接运行。

*   我们需要同时管理不同版本的Scrapy项目，如早期的项目依赖于Scrapy 0.25，现在的项目依赖于Scrapy 1.4.0。

在这些情况下，我们需要解决的就是环境的安装配置、环境的版本冲突解决等问题。

对于Python来说，VirtualEnv的确可以解决版本冲突的问题。但是，VirtualEnv不太方便做项目部署，我们还是需要安装Python环境，

如何解决上述问题呢？答案是用Docker。Docker可以提供操作系统级别的虚拟环境，一个Docker镜像一般都包含一个完整的操作系统，而这些系统内也有已经配置好的开发环境，如Python 3.6环境等。

我们可以直接使用此Docker的Python 3镜像运行一个容器，将项目直接放到容器里运行，就不用再额外配置Python 3环境。这样就解决了环境配置的问题。

我们也可以进一步将Scrapy项目制作成一个新的Docker镜像，镜像里只包含适用于本项目的Python环境。如果要部署到其他平台，只需要下载该镜像并运行就好了，因为Docker运行时采用虚拟环境，和宿主机是完全隔离的，所以也不需要担心环境冲突问题。

如果我们能够把Scrapy项目制作成一个Docker镜像，只要其他主机安装了Docker，那么只要将镜像下载并运行即可，而不必再担心环境配置问题或版本冲突问题。

接下来，我们尝试把一个Scrapy项目制作成一个Docker镜像。

## 一、本节目标

我们要实现把前文Scrapy的入门项目打包成一个Docker镜像的过程。项目爬取的网址为：http://quotes.toscrape.com/。本章Scrapy入门一节已经实现了Scrapy对此站点的爬取过程，项目代码为：https://github.com/Python3WebSpider/ScrapyTutorial。如果本地不存在的话可以将代码Clone下来。

## 二、准备工作

请确保已经安装好Docker和MongoDB并可以正常运行。

## 三、创建Dockerfile

首先在项目的根目录下新建一个requirements.txt文件，将整个项目依赖的Python环境包都列出来，如下所示：

```
scrapy
pymongo
```

如果库需要特定的版本，我们还可以指定版本号，如下所示：

```
scrapy>=1.4.0
pymongo>=3.4.0
```

在项目根目录下新建一个Dockerfile文件，文件不加任何后缀名，修改内容如下所示：

```dockerfile
FROM python:3.6
ENV PATH /usr/local/bin:$PATH
ADD . /code
WORKDIR /code
RUN pip3 install -r requirements.txt
CMD scrapy crawl quotes
```

第一行的`FROM`代表使用的Docker基础镜像，在这里我们直接使用python:3.6的镜像，在此基础上运行Scrapy项目。

第二行`ENV`是环境变量设置，将`/usr/local/bin:$PATH`赋值给`PATH`，即增加`/usr/local/bin`这个环境变量路径。

第三行`ADD`是将本地的代码放置到虚拟容器中。它有两个参数：第一个参数是`.`，代表本地当前路径；第二个参数是`/code`，代表虚拟容器中的路径，也就是将本地项目所有内容放置到虚拟容器的/code目录下，以便于在虚拟容器中运行代码。

第四行`WORKDIR`是指定工作目录，这里将刚才添加的代码路径设成工作路径。这个路径下的目录结构和当前本地目录结构是相同的，所以我们可以直接执行库安装命令、爬虫运行命令等。

第五行`RUN`是执行某些命令来做一些环境准备工作。由于Docker虚拟容器内只有Python 3环境，而没有所需要的Python库，所以我们运行此命令来在虚拟容器中安装相应的Python库如Scrapy，这样就可以在虚拟容器中执行Scrapy命令了。

第六行`CMD`是容器启动命令。在容器运行时，此命令会被执行。在这里我们直接用scrapy crawl quotes来启动爬虫。

## 四、修改MongDB连接

接下来我们需要修改MongoDB的连接信息。如果我们继续用localhost是无法找到MongoDB的，因为在Docker虚拟容器里localhost实际指向容器本身的运行IP，而容器内部并没有安装MongoDB，所以爬虫无法连接MongoDB。

这里的MongoDB地址可以有如下两种选择。

*   如果只想在本机测试，我们可以将地址修改为宿主机的IP，也就是容器外部的本机IP，一般是一个局域网IP，使用`ifconfig`命令即可查看。

*   如果要部署到远程主机运行，一般MongoDB都是可公网访问的地址，修改为此地址即可。

在本节中，我们的目标是将项目打包成一个镜像，让其他远程主机也可运行这个项目。所以我们直接将此处MongoDB地址修改为某个公网可访问的远程数据库地址，修改`MONGO_URI`如下所示：

```
MONGO_URI = 'mongodb://admin:admin123@120.27.34.25:27017'复制代码
```

此处地址可以修改为自己的远程MongoDB数据库地址。

这样项目的配置就完成了。

## 五、构建镜像

接下来我们构建Docker镜像，执行如下命令：

```
docker build -t quotes:latest .复制代码
```

执行过程中的输出如下所示：

```
Sending build context to Docker daemon 191.5 kB
Step 1/6 : FROM python:3.6
 ---> 968120d8cbe8
Step 2/6 : ENV PATH /usr/local/bin:$PATH
 ---> Using cache
 ---> 387abbba1189
Step 3/6 : ADD . /code
 ---> a844ee0db9c6
Removing intermediate container 4dc41779c573
Step 4/6 : WORKDIR /code
 ---> 619b2c064ae9
Removing intermediate container bcd7cd7f7337
Step 5/6 : RUN pip3 install -r requirements.txt
 ---> Running in 9452c83a12c5
...
Removing intermediate container 9452c83a12c5
Step 6/6 : CMD scrapy crawl quotes
 ---> Running in c092b5557ab8
 ---> c8101aca6e2a
Removing intermediate container c092b5557ab8
Successfully built c8101aca6e2a复制代码
```

这样的输出就说明镜像构建成功。这时我们查看一下构建的镜像，如下所示：

```
docker images复制代码
```

返回结果中的一行代码如下所示：

```
quotes  latest  41c8499ce210    2 minutes ago   769 MB复制代码
```

这就是我们新构建的镜像。

## 六、运行

镜像可以先在本地测试运行，我们执行如下命令：

```
docker run quotes复制代码
```

这样我们就利用此镜像新建并运行了一个Docker容器，运行效果完全一致，如下图所示。

![](https://user-gold-cdn.xitu.io/2018/4/18/162d7b44a34a65c1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如果出现类似图上的运行结果，这就证明构建的镜像没有问题。

## 七、推送至Docker Hub

构建完成之后，我们可以将镜像Push到Docker镜像托管平台，如Docker Hub或者私有的Docker Registry等，这样我们就可以从远程服务器下拉镜像并运行了。

以Docker Hub为例，如果项目包含一些私有的连接信息（如数据库），我们最好将Repository设为私有或者直接放到私有的Docker Registry。

首先在https://hub.docker.com注册一个账号，新建一个Repository，名为quotes。比如，我的用户名为germey，新建的Repository名为quotes，那么此Repository的地址就可以用germey/quotes来表示。

为新建的镜像打一个标签，命令如下所示：

```
docker tag quotes:latest germey/quotes:latest
```

Push镜像到Docker Hub即可，命令如下所示：

```shell
docker push germey/quotes
```

Docker Hub便会出现新Push的Docker镜像了，如下图所示。

![](https://user-gold-cdn.xitu.io/2018/4/18/162d7b44171799fb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如果我们想在其他的主机上运行这个镜像，主机上装好Docker后，可以直接执行如下命令：

```
docker run germey/quotes
```

这样就会自动下载镜像，启动容器运行。不需要配置Python环境，不需要关心版本冲突问题。

运行效果如下图所示。

![](https://user-gold-cdn.xitu.io/2018/4/18/162d7b447e234702?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

整个项目爬取完成后，数据就可以存储到指定的数据库中。

## 八、结语

我们讲解了将Scrapy项目制作成Docker镜像并部署到远程服务器运行的过程。使用此种方式，我们在本节开头所列出的问题都迎刃而解。
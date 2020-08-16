---
title : dockerFile介绍
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-16 20:23:17 +0800
categories:
 -
tags:
 -
---
[[toc]]

dockerFile介绍
------------

dockerfile是用来构建docker镜像的文件！命令参数脚本

构建步骤：

1.编写一个dockerfile文件

2.docker build 构建成一个镜像

3.docker run 运行镜像

4.dokcer push 发布镜像（dockerHub 、阿里云镜像仓库）

![](https://pic3.zhimg.com/v2-c65fcae3c50ab715a080e39736e0343c_b.jpg)

  

  

![](https://pic1.zhimg.com/v2-26bef73d90b6a5ab4db683714d7b81eb_b.jpg)

  

dockerFile构建
------------

> 基础知识：

1.每个保留关键字（指令）都必须是大写字母

2.执行从上到下顺序执行

3.# 表示注释

4.每一个指令都会创建提交一个新的镜像层并，并且提交！

![](https://picb.zhimg.com/v2-1f3af76de082dee7e4448632ba4083a8_b.jpg)

dockerfile是面向开发的，以后要发布项目，做镜像，就需要编写dockerfile文件，这个文件十分简单！

Docker 逐渐成为了企业交付的标准，必须要掌握！

> 步骤：开发 部署 运维

Dockerfile:构建文件，定义了一切步骤，源代码

DockerImages：通过dockerFile构建生成的镜像，最终要发布和运行的产品。原来是 jar war

Docker容器：容器就是镜像运行起来提供服务的

  

  

  

dockerFile的指令
-------------

![](https://pic4.zhimg.com/v2-ac23c30b112766bc34dca4070ae96a7b_b.jpg)

```text
FROM    #基础镜像，一切从这里构建  centos   untn

MAINTAINER   #镜像是谁写的，性名+邮箱

RUN       # docker 镜像构建的时候要运行的命令

ADD       # 步骤，tomcat镜像，这个tomcat压缩包！添加内容

WORKDIR   # 镜像的工作目录

VOLUME    # 挂载卷的目录位置

EXPOSE   # 暴露端口配 

CMD       # 指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被替代

ENTRYPOINT    # 指定这个容器启动的时候要运行的命令，可追加命令

ONBUILD     # 当构建一个被继承 dockerfile这个时候就会运行ONBUILD指令

COPY       # 类似ADD命令，将文件拷贝到镜像中

ENV        # 构建的时候设置环境变量
```

实战测试
----

docker Hub 
中99%镜像都是从这个基础镜像过来的 FROM scratch，然后配置需要的软件和配置
-------------------------------------------------------

![](https://pic1.zhimg.com/v2-26bef73d90b6a5ab4db683714d7b81eb_b.jpg)

> 创建一个自己的centos

  

```text
# 1.编写配置文件 dockerfile
[root@localhost /]# cd home
[root@localhost home]# ls
docker-test-volume  mysql  test
[root@localhost home]# mkdir dockerfile
[root@localhost home]# cd dockerfile
[root@localhost dockerfile]# 
[root@localhost dockerfile]# cat mydockerfile
FROM  centos

MAINTAINER  pengfan<2366682276@qq.com> 

ENV   MYPATH  /usr/local
WORKDIR   $MYPATH  

RUN yun  -y install  vim 
RUN yun -y install  net-tools


EXPOSE 80

CMD echo $MYPATH   # 输出MYPATH
CMD echo  "----end----"

CMD  /bin/bash 

[root@localhost dockerfile]#  docker build -f  mydockerfile -t  mycentos .

#2.通过文件构建镜像  docker build -f  mydockerfile -t  mycentos .
 
# build 构建
# -f   dockerfile  (mydockerfile命令文件路径)
# -t   目标 （镜像名:tag）
#  .  当前目录


# 3. docker run -it mycentos
```

我们可以列出 镜像的制作历史

docker history \[id\]

tomcat
------

[https://www.bilibili.com/video/BV1og4y1q7M4?p=30​www.bilibili.com](https://link.zhihu.com/?target=https%3A//www.bilibili.com/video/BV1og4y1q7M4%3Fp%3D30)
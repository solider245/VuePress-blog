---
title : Docker---Dockerfile 详解
description : 简单讲了dockerfile的使用
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-02 22:23:44 +0800
categories:
 -
tags:
 -
---
[[toc]]

*   **制作Docker image 有两种方式**：

1\. 使用 Docker container，直接构建容器，再导出成 image 使用

2\. 是使用 Dockerfile，将所有动作写在文件中，再 build 成 image。Dockerfile 的方式非常灵活，推荐使用

*   **Dockerfile 基本结构**

一般的，Dockerfile 分为四部分：基础镜像信息、维护者信息、镜像操作指令和容器启动时执行指令。’#’ 为 Dockerfile 中的注释。先看下面一个小例子：

```docker
# This my first nginx Dockerfile
# Version 1.0
# Base images 基础镜像
FROM centos
#MAINTAINER 维护者信息
MAINTAINER name 
#ENV 设置环境变量
ENV PATH /usr/local/nginx/sbin:$PATH
#ADD  文件放在当前目录下，拷过去会自动解压
ADD nginx-1.8.0.tar.gz /usr/local/  
ADD epel-release-latest-7.noarch.rpm /usr/local/  
#RUN 执行以下命令
RUN rpm -ivh /usr/local/epel-release-latest-7.noarch.rpm
RUN yum install -y wget lftp gcc gcc-c++ make openssl-devel pcre-devel pcre && yum clean all
RUN useradd -s /sbin/nologin -M www
#WORKDIR 相当于cd
WORKDIR /usr/local/nginx-1.8.0
RUN ./configure --prefix=/usr/local/nginx --user=www --group=www --with-http_ssl_module --with-pcre && make && make install
RUN echo "daemon off;" >> /etc/nginx.conf
#EXPOSE 映射端口
EXPOSE 80
#CMD 运行以下命令
CMD ["nginx"]
```

**FROM : 指定基础镜像，要在哪个镜像建立**

格式为 FROM 或FROM :

第一条指令必须为 FROM 指令。

**MAINTAINER：指定维护者信息**

格式为 MAINTAINER

**RUN：在镜像中要执行的命令**

格式为 RUN 或 RUN \[“executable”, “param1”, “param2”\]

前者将在 shell 终端中运行命令，即 /bin/bash \-c ；后者则使用 exec 执行。指定使用其它终端可以通过第二种方式实现，例如

RUN \[“/bin/bash”, “\-c”,”echo hello”\]

**WORKDIR：指定当前工作目录，相当于 cd**

格式为 WORKDIR /path/to/workdir

为后续的 RUN 、 CMD 、 ENTRYPOINT 指令配置工作目录。

可以使用多个 WORKDIR 指令，后续命令如果参数是相对路径，则会基于之前命令指定的路径。例如

WORKDIR /a

WORKDIR b

WORKDIR c

RUN pwd

则最终路径为 /a/b/c

**EXPOSE：指定容器要打开的端口**

格式为 EXPOSE \[…\]

告诉 Docker 服务端容器暴露的端口号，供互联系统使用。在启动容器时需要通过 \-P，Docker 主机会自动分配一个端口转发到指定的端口。

**ENV：定义环境变量**

格式为 ENV 。 指定一个环境变量，会被后续 RUN 指令使用，并在容器运行时保持。

例如

ENV PATH /usr/local/nginx/sbin:$PATH

**COPY ：复制本地主机的 （为 Dockerfile 所在目录的相对路径）到容器中的**

格式为 COPY

**ADD：相当于 COPY，但是比 COPY 功能更强大**

格式为 ADD

该命令将复制指定的 到容器中的 。 其中 可以是Dockerfile所在目录的一个相对路径；也可以是一个 URL；还可以是一个 tar 文件，复制进容器会自动解压。

**VOLUME：挂载目录**

格式为VOLUME \[“/data”\]

创建一个可以从本地主机或其他容器挂载的挂载点，一般用来存放数据库和需要保持的数据等。

**USER**

格式为 USER daemon

指定运行容器时的用户名或 UID，后续的 RUN 也会使用指定用户。当服务不需要管理员权限时，可以通过该命令指定运行用户。并且可以在之前创建所需要的用户，例如： RUN useradd \-s /sbin/nologin \-M www。

**ENTRYPOINT**

两种格式：

ENTRYPOINT \["executable", "param1", "param2"\]

ENTRYPOINT command param1 param2 （shell中执行）

配置容器启动后执行的命令，并且不可被 docker run 提供的参数覆盖。每个 Dockerfile 中只能有一个 ENTRYPOINT ，当指定多个时，只有最后一个起效。

**CMD**

支持三种格式：

CMD \["executable","param1","param2"\] 使用 exec 执行，推荐方式；

CMD command param1 param2 在 /bin/bash 中执行，提供给需要交互的应用；

CMD \["param1","param2"\] 提供给 ENTRYPOINT 的默认参数；

指定启动容器时执行的命令，每个 Dockerfile 只能有一条 CMD 命令。如果指定了多条命令，只有最后一条会被执行。如果用户启动容器时候指定了运行的命令，则会覆盖掉 CMD 指定的命令。

**ONBUILD：在构建本镜像时不生效，在基于此镜像构建镜像时生效**

格式为 ONBUILD \[INSTRUCTION\]

配置当所创建的镜像作为其它新创建镜像的基础镜像时，所执行的操作指令。

ENTRYPOINT 和 CMD 的区别：ENTRYPOINT 指定了该镜像启动时的入口，CMD 则指定了容器启动时的命令，当两者共用时，完整的启动命令像是 ENTRYPOINT + CMD 这样。使用 ENTRYPOINT 的好处是在我们启动镜像就像是启动了一个可执行程序，在 CMD 上仅需要指定参数；另外在我们需要自定义 CMD 时不容易出错。

使用 CMD 的 Dockerfile：

\[root@test\]# cat Dockerfile

FROM mysql

CMD \["echo","test"\]

使用 ENTRYPOINT 的 Dockerfile：

\[root@test\]# cat Dockerfile

FROM mysql

ENTRYPOINT \["echo","test"\]

结论：ENTRYPOINT 不能覆盖掉执行时的参数，CMD 可以掉覆盖默认的参数。

**使用以下命令来构建一个镜像：**

#构建镜像时，需要将要使用的包及 Dockerfile 文件放在一个目录中

docker build \-t DilemmaVi/nginx:1.8 .
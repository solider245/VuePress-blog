---
title : 如何在Ubuntu 20.04 LTS上使用Dockerfile创建Docker映像
description : 2020年6月19日的最新的文章
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-03 00:09:26 +0800
categories:
 -
tags:
 -
---
[[toc]]
Docker是操作系统级虚拟化，主要用于开发人员和系统管理员。 Docker使在隔离环境中创建和部署应用程序变得更加容易。

Dockerfile是一个脚本，其中包含命令和指令的集合，这些命令和指令将在Docker环境中按顺序自动执行以构建新的Docker映像。

在本教程中，我们将向您展示如何使用Dockerfile创建自己的Docker映像。 我们将解释与Dockerfile相关的详细信息，以使您能够构建自己的Docker映像。

**先决条件**

对于本指南，我们将使用具有1GB RAM，25GB可用磁盘空间和2个CPU的Ubuntu 20.04。 另外，我们将使用Ubuntu 20.04作为基础映像来构建自定义Docker映像。

## Dockerfile命令简介

Dockerfile是一个脚本，其中包含用于构建Docker映像的所有命令。 Dockerfile包含将用于通过“ docker build”命令创建Docker映像的所有指令。

在创建第一个Dockerfile之前，您应该熟悉Dockerfile指令。 在您必须知道的一些Dockerfile指令下面。

**从**

设置要创建的新图像的基础图像。 FROM指令将初始化新的构建阶段，并且必须位于Dockerfile的顶部。

**标签**

通过此指令，您可以添加有关Docker映像的其他信息，例如版本，描述，维护程序等。LABEL指令是一个键值对，可用于添加多个标签和多行值。

**跑**

该指令用于在Docker映像的构建过程中执行命令。 您可以安装Docker映像所需的其他软件包。

**加**

ADD指令用于将文件，目录或远程文件从URL复制到Docker映像，从“ src”复制到绝对路径“ dest”。 另外，您可以设置文件的默认所有权。

**ENV**

ENV指令用于定义一个环境变量，该环境变量可以在构建阶段使用，也可以内联替换。

**CMD**

CMD指令用于定义运行容器时要执行的默认命令。 并且Dockerfile只能包含一个CMD指令，如果有多个CMD，则将运行最后一个CMD指令。

**暴露**广告

该指令用于在运行时在特定网络端口上公开容器端口。 公开的默认协议为TCP，但您可以指定TCP还是UDP。

**ARG**

ARG指令用于定义用户可以在构建时传递的变量。 您可以在构建期间使用'\-\-build\-arg variable = value'选项在docker'build command'中使用此指令，并且可以通过Dockerfile进行传递。 另外，您可以在Dockerfile上使用多个ARG。

**入口点**

ENTRYPOINT指令用于定义容器运行时将执行的第一个和默认命令。 定义命令以使用ENTRYPOINT指令启动您的应用程序。 广告

**工作目录**

WORKDIR指令用于定义Docker映像的默认工作目录。 RUN，CMD，ENTRYPOINT和ADD指令遵循WORKDIR指令。 您可以在Dockerfile上添加多个WORKDIR指令，如果该指令不存在，它将自动创建。

**用户**

USER指令用于定义运行映像时的默认用户或gid。 RUN，CMD和ENTRYPOINT遵循Dockerfile中的USER指令。

**卷**

VOLUME指令广告，用于启用容器和主机之间的访问/链接目录。

现在，让我们开始创建第一个Dockerfile。

## 第1步\-在Ubuntu 20.04上安装Docker

在创建Dockerfile之前，我们将Docker安装到我们的Ubuntu 20.04系统上，该系统默认在Ubuntu FocalFossa存储库中可用。

更新Ubuntu存储库中的所有软件包列表，并使用以下apt命令安装Docker。

```
sudo apt updatesudo apt install docker.io
```

完成所有安装后，启动Docker服务并将其添加到系统引导中。

```
systemctl start dockersystemctl enable docker
```

现在，使用以下命令检查Docker服务。

```
systemctl status docker
```

Docker服务已在Ubuntu 20.04上启动并运行。

[![启动Docker服务](https://www.howtoforge.com/images/how-to-create-docker-images-with-dockerfile-20-04/1.png?ezimgfmt=rs:750x216/rscb1/ng:webp/ngcb1)](https://www.howtoforge.com/images/how-to-create-docker-images-with-dockerfile-20-04/big/1.png)

接下来，运行以下docker命令以确保安装正确。

```
docker run hello-world
```

以下是您将获得的结果。

```
Hello from Docker!This message shows that your installation appears to be working correctly.To generate this message, Docker took the following steps: 1. The Docker client contacted the Docker daemon. 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.    (amd64) 3. The Docker daemon created a new container from that image which runs the    executable that produces the output you are currently reading. 4. The Docker daemon streamed that output to the Docker client, which sent it    to your terminal.To try something more ambitious, you can run an Ubuntu container with: $ docker run -it ubuntu bashShare images, automate workflows, and more with a free Docker ID: https://hub.docker.com/For more examples and ideas, visit: https://docs.docker.com/get-started/
```

可以看到，您从Docker收到Hello World消息，并且在Ubuntu 20.04上的Docker安装已成功完成。

## 第2步\-创建Dockerfile和其他配置

在这一步中，我们将向您展示如何使用Dockerfile为您的应用程序构建自定义Docker映像。 我们将基于Ubuntu 20.04映像为PHP\-FPM和Nginx服务创建一个新的自定义Docker映像，然后使用简单的phpinfo脚本运行新容器。

首先，创建一个新的项目目录并创建一个空的Dockerfile。

```
mkdir -p nginx-image; cd nginx-image/touch Dockerfile
```

现在使用您自己的编辑器编辑“ Dockerfile”脚本（在本示例中，我们使用vim）。

```
vim Dockerfile
```

在该行的顶部，使用FROM指令添加基本映像Ubuntu 20.04映像，如下所示。

```
#Download base image ubuntu 20.04
FROM ubuntu:20.04
```

现在，使用LABEL指令添加有关自定义图像的详细信息。

```docker
# LABEL about the custom image
LABEL maintainer="admin@sysadminjournal.com"
LABEL version="0.1"
LABEL description="This is custom Docker Image for \
the PHP-FPM and Nginx Services."
```

对于apt软件包安装，我们将使用环境变量'DEBIAN\_FRONTEND = noninteractive'跳过任何交互式的安装后步骤。

```docker
# Disable Prompt During Packages Installation
ARG DEBIAN_FRONTEND=noninteractive
ARG DEBIAN_FRONTEND=noninteractive
```

接下来，在安装任何软件包之前运行“ apt update”命令。

```shell
# Update Ubuntu Software repository
RUN apt update

```

现在安装Nginx，PHP\-FPM和超级用户软件包。 完成所有安装后，请删除所有程序包缓存以减小自定义映像的大小。

```docker
# Install nginx, php-fpm and supervisord from ubuntu repository
RUN apt install -y nginx php-fpm supervisor && \
    rm -rf /var/lib/apt/lists/* && \
    apt clean
```

定义可以在自定义映像上传递的新环境变量。

```docker
#Define the ENV variable
ENV nginx_vhost /etc/nginx/sites-available/default
ENV php_conf /etc/php/7.4/fpm/php.ini
ENV nginx_conf /etc/nginx/nginx.conf
ENV supervisor_conf /etc/supervisor/supervisord.conf
```

现在将Nginx默认配置复制到'nginx\_vhost'变量，将php.ini配置文件中的PHP配置'cgi.fix\_pathinfo = 1'替换为'cgi.fix\_pathinfo = 0'，然后将'daemon off'选项添加到默认的“ nginx\_conf”变量。

```docker
# Enable PHP-fpm on nginx virtualhost configuration
COPY default ${nginx_vhost}
RUN sed -i -e 's/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/g' ${php_conf} && \
    echo "\ndaemon off;" >> ${nginx_conf}
```

将定制的监管配置复制到“ supervisor\_conf”变量。

```docker
#Copy supervisor configuration
COPY supervisord.conf ${supervisor_conf}
```

为PHP\-FPM sock文件创建一个新目录，将Web根目录“ / var / www / html”和PHP\-FPM目录“ / run / php”的所有权更改为默认用户“ www\-data”。

```docker
RUN mkdir -p /run/php && \
    chown -R www-data:www-data /var/www/html && \
    chown -R www-data:www-data /run/php
```

定义自定义映像的卷，以便我们可以将所有这些目录挂载到主机上。

```docker
# Volume configuration
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/html"]
```

现在添加“ start.sh”脚本，并使用CMD指令定义默认的容器命令，如下所示。

```docker
# Copy start.sh script and define default command for the container
COPY start.sh /start.sh
CMD ["./start.sh"]
```

最后，使用EXPOSE指令打开容器上的默认HTTP和HTTPS端口。

```
# Expose Port for the Application EXPOSE 80 443
```

保存并关闭。 广告

以下是我们刚刚创建的完整Dockerfile脚本。

```docker
# Download base image ubuntu 20.04
FROM ubuntu:20.04

# LABEL about the custom image
LABEL maintainer="admin@sysadminjournal.com"
LABEL version="0.1"
LABEL description="This is custom Docker Image for \
the PHP-FPM and Nginx Services."

# Disable Prompt During Packages Installation
ARG DEBIAN_FRONTEND=noninteractive

# Update Ubuntu Software repository
RUN apt update

# Install nginx, php-fpm and supervisord from ubuntu repository
RUN apt install -y nginx php-fpm supervisor && \
    rm -rf /var/lib/apt/lists/* && \
    apt clean
    
# Define the ENV variable
ENV nginx_vhost /etc/nginx/sites-available/default
ENV php_conf /etc/php/7.4/fpm/php.ini
ENV nginx_conf /etc/nginx/nginx.conf
ENV supervisor_conf /etc/supervisor/supervisord.conf

# Enable PHP-fpm on nginx virtualhost configuration
COPY default ${nginx_vhost}
RUN sed -i -e 's/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/g' ${php_conf} && \
    echo "\ndaemon off;" >> ${nginx_conf}
    
# Copy supervisor configuration
COPY supervisord.conf ${supervisor_conf}

RUN mkdir -p /run/php && \
    chown -R www-data:www-data /var/www/html && \
    chown -R www-data:www-data /run/php
    
# Volume configuration
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/html"]

# Copy start.sh script and define default command for the container
COPY start.sh /start.sh
CMD ["./start.sh"]

# Expose Port for the Application 
EXPOSE 80 443
```

接下来，我们将为Nginx，supervisor和start.sh脚本创建一个新的附加配置。

“默认” Nginx虚拟主机配置将包含PHP\-FPM的部分。 实际上，您可以使用“自定义”映像运行PHP脚本，而无需进行任何更改。

使用编辑器创建一个新的Nginx“默认”虚拟主机配置。

```
vim default
```

将以下配置粘贴到其中。

```vim
server {
    listen 80 default_server;
 
    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;
 
    server_name _;
 
    location / {
        try_files $uri $uri/ =404;
    }
 
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php7.4-fpm.sock;
    }
}
```

保存并关闭。

接下来，我们将创建“ supervisrod.conf”配置，其中包含将自动运行的Nginx和PHP\-FPM程序。

使用编辑器创建“ supervisrod.conf”文件。

```
vim supervisord.conf
```

将以下配置粘贴到其中。

```vim
[unix_http_server]
file=/dev/shm/supervisor.sock   ; (the path to the socket file)
 
[supervisord]
logfile=/var/log/supervisord.log ; (main log file;default $CWD/supervisord.log)
logfile_maxbytes=50MB        ; (max main logfile bytes b4 rotation;default 50MB)
logfile_backups=10           ; (num of main logfile rotation backups;default 10)
loglevel=info                ; (log level;default info; others: debug,warn,trace)
pidfile=/tmp/supervisord.pid ; (supervisord pidfile;default supervisord.pid)
nodaemon=false               ; (start in foreground if true;default false)
minfds=1024                  ; (min. avail startup file descriptors;default 1024)
minprocs=200                 ; (min. avail process descriptors;default 200)
user=root             ;

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface
 
[supervisorctl]
serverurl=unix:///dev/shm/supervisor.sock ; use a unix:// URL  for a unix socket
 
[include]
files = /etc/supervisor/conf.d/*.conf
 
[program:php-fpm7.4]
command=/usr/sbin/php-fpm7.4 -F
numprocs=1
autostart=true
autorestart=true
 
[program:nginx]
command=/usr/sbin/nginx
numprocs=1
autostart=true
autorestart=true
```

保存并关闭。

现在，使用t = your编辑器创建“ start.sh”脚本，该脚本将包含启动的监管命令。

```
vim start.sh
```

将以下配置粘贴到其中。

```shell
#!/bin/sh
/usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf
```

保存并关闭。

使“ start.sh”脚本可执行。

```
chmod +x start.sh
```

结果，已经创建了自定义Docker映像的所有配置，以下是我们创建的所有配置。

```
tree .
```

现在，我们准备基于这些配置创建一个新的自定义映像。

[![检查Docker服务状态](https://www.howtoforge.com/images/how-to-create-docker-images-with-dockerfile-20-04/2.png?ezimgfmt=rs:662x211/rscb1/ng:webp/ngcb1)](https://www.howtoforge.com/images/how-to-create-docker-images-with-dockerfile-20-04/big/2.png)

## 第3步\-建立新的自定义并运行新的容器

要创建Docker自定义映像，请转到项目目录“ nginx\-image”，然后运行“ docker build”命令，如下所示。

```
docker build -t nginx-image .
```

该命令将下载基本映像Ubuntu 20.04，并创建一个名为'nginx\-image的新自定义映像。

完成所有过程后，使用以下命令检查系统上可用的Docker映像列表。

```
docker image ls
```

以下是您将获得的结果。

[![检查Docker映像](https://www.howtoforge.com/images/how-to-create-docker-images-with-dockerfile-20-04/3.png?ezimgfmt=rs:750x157/rscb1/ng:webp/ngcb1)](https://www.howtoforge.com/images/how-to-create-docker-images-with-dockerfile-20-04/big/3.png)

可以看出，已经创建了新的自定义Docker映像'nginx\-image'。

接下来，我们将基于'nginx\-image'运行新的Docker容器。

在本地计算机上，创建一个名为“ webroot”的新目录，该目录将用于存储所有Web文件。

```
mkdir -p /webroot
```

现在，使用下面的docker run命令创建一个名为test\-container的新容器。

```
docker run -d -v /webroot:/var/www/html -p 8080:80 --name test-container nginx-image
```

**注意：**

*   \-\-name test\-container nginx\-image =我们基于docker image'nginx\-image'创建一个名称为'test\-container'的新容器。
*   \-p 8080：80 =在主机上的端口8080上运行的测试容器容器。
*   \-v / webroot：/ var / www / html =主机上的/ webroot目录重写容器上的/ var / www / html目录。

之后，使用以下命令检查系统上所有正在运行的容器。

```
docker ps
```

以下是您将获得的结果。

[![检查正在运行的容器](https://www.howtoforge.com/images/how-to-create-docker-images-with-dockerfile-20-04/4.png?ezimgfmt=rs:750x144/rscb1/ng:webp/ngcb1)](https://www.howtoforge.com/images/how-to-create-docker-images-with-dockerfile-20-04/big/4.png)

结果，基于“ nginx\-image”并暴露端口8080的名为“ test\-container”的新容器已启动并正在运行。

## 步骤4\-测试

为了确保容器正常运行，我们将在主机的'/ webroot'根目录上创建一个新的index.html和phpinfo文件。 因为“ / webroot”目录已装入容器目录“ / var / www / html”。

使用以下命令在“ / webroot”目录上创建index.html文件。

```shell
echo '<h1>Nginx and PHP-FPM 7.4 inside Docker Container with Ubuntu 20.04 Base Image</h1>' > /webroot/index.html
```

现在，使用端口8080上的curl命令测试访问您的容器。

```shell
curl server-ip:8080
curl -I server-ip:8080
```

结果，您将获得我们刚刚创建的默认index.html页面。

[![创建index.html页面](https://www.howtoforge.com/images/how-to-create-docker-images-with-dockerfile-20-04/5.png?ezimgfmt=rs:750x222/rscb1/ng:webp/ngcb1)](https://www.howtoforge.com/images/how-to-create-docker-images-with-dockerfile-20-04/big/5.png)

接下来，在“ / webroot”目录上创建一个新的PHP文件“ info.php”，以确保PHP\-FPM服务正在运行。

使用以下命令创建“ info.php”文件。

```shell
echo '<?php phpinfo(); ?>' > /webroot/info.php
```

接下来，打开您的Web浏览器并在端口“ 8080”后键入“ info.php”文件的路径，输入服务器IP地址。

[http：// server\-ip：8080 / info.php](http://server-ip:8080/info.php)

现在，您将获得如下所示的phpinfo页面。

[![phpinfo](https://www.howtoforge.com/images/how-to-create-docker-images-with-dockerfile-20-04/6.png?ezimgfmt=rs:750x436/rscb1/ng:webp/ngcb1)](https://www.howtoforge.com/images/how-to-create-docker-images-with-dockerfile-20-04/big/6.png)

可以看出，“ test\-container”已成功加载PHP脚本。

结果，我们成功创建了一个新的自定义Docker映像，并基于该映像运行了任何错误的新容器。

**关于穆罕默德·阿鲁尔**

Muhammad Arul是一名自由系统管理员和技术作家。 他在Linux环境领域工作了5年以上，他是一名开源爱好者，并且对Linux安装和故障排除充满了热情。 通常与RedHat / CentOS Linux和Ubuntu / Debian，Nginx和Apache Web服务器，Proxmox，Zimbra管理和网站优化一起使用。 当前正在学习OpenStack和容器技术。
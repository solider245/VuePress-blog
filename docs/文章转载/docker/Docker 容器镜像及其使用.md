---
title : Docker 容器镜像及其使用
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-03 00:41:56 +0800
categories:
 -
tags:
 -
---
[[toc]]
**简介：** 本文主要为大家讲解 Docker 容器镜像的基本概念及其使用时的常用命令。

![47.jpeg](https://ucc.alicdn.com/pic/developer-ecology/b0ee07edaa844c239b3a0667b2ce7988.jpeg "47.jpeg")
镜像下载、域名解析、时间同步请点击 [阿里巴巴开源镜像站](https://developer.aliyun.com/mirror)

# 一、基本概念

## 1\. Docker镜像(image)

Docker 镜像就是一个只读的模板。镜像可以用来创建 Docker 容器。Docker 提供了一个很简单的机制来创建镜像或者更新现有的镜像，用户甚至可以直接从其他人那里下载一个已经做好的镜像来直接使用。

## 2\. Docker容器(container)

Docker 利用容器来运行应用。容器是从镜像创建的运行实例。它可以被启动、开始、停止、删除。每个容器都是相互隔离的，保证安全的平台。

## 3\. Docker仓库(repository)

仓库是集中存放镜像文件的场所。有时候把仓库和仓库注册服务器（ Registry ）混为一谈，并不严格区分。实际上，仓库注册服务器上往往存放着多个仓库，每个仓库中又包含了多个镜像，每个镜像有不同的标签 (tag) 。仓库分为公开仓库 (Public) 和私有仓库 (Private) 两种形式。最大的公开仓库是 Docker Hub ，存放了数量庞大的镜像供用户下载。国内的公开仓库包括 Docker Pool 等，可以提供大陆用户更稳定快读的访问。当用户创建了自己的镜像之后就可以使用 push 命令将它上传到公有或者私有仓库，这样下载在另外一台机器上使用这个镜像时候，只需需要从仓库上 pull 下来就可以了。

# 二、Docker基本命令

*   Docker的安装

```
sudo apt install docker.io
```

*   Docker启动及状态查询

```
sudo service docker start
sudo service docker status
```

*   查看Docker的版本

```
sudo docker version
```

*   查看本地镜像

```
sudo docker images
```

*   下载镜像文件

```
sudo docker pull ubuntu
```

*   运行Ubuntu镜像

```
docker run -i -t ubuntu /bin/bash
```

*   删除镜像文件

```
sudo docker rmi -f hello-world
```

*   查看已经启动的Docker服务（容器）

```
sudo docker ps –a
```

*   停止docker服务

```
sudo docker stop image-name
```

*   登陆Docker

```
sudo docker login https://hub.docker.com/
```

*   保存修改后的Docker容器

```
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
OPTIONS说明：
        -a :提交的镜像作者；
        -c :使用Dockerfile指令来创建镜像；
        -m :提交时的说明文字；
        -p :在commit时，将容器暂停
```

*   docker可以支持把一个宿主机上的目录挂载到镜像里

```
docker run -it -v /home/dock/Downloads:/usr/Downloads ubuntu64 /bin/bash
docker run -it -v /home/dock/Downloads:/usr/Downloads ubuntu64 /bin/bash
```

*   Docker容器的删除

```
docker rm CONTAINER ID
```

*   Docker镜像的删除

```
docker rmi
```

*   Docker容器启动start/stop/restart

```
docker start/stop/restart
docker start命令使用-i选项来开启交互模式
```

*   查询镜像和容器的详细信息

```
docker inspect
docker info
```

*   连接正在运行的容器

```
docker attach CONTAINER ID/name
```

*   退出容器不关闭

```
ctrl + d 退出关闭容器， ctrl + p + q 退出容器不关闭
```

*   Docker的Ubuntu镜像安装的容器无ifconfig命令和ping命令

```
解决：
apt-get update
apt install net-tools       # ifconfig
apt install iputils-ping     # ping
```

*   docker Ubuntu安装mysql

```
apt-get update
apt-get install -y mysql-server mysql-client
```

*   Docker容器和主机文件拷贝

```
1）从容器内拷贝文件到主机上
    docker cp <containerId>:/file/path/within/container /host/path/target
2）从主机内拷贝文件到容器上
    sudo docker cp host_path containerID:container_path
3）问题 FATA[0000] Error: Path not specified
    Version 1.6.2 doesn't allow copying from host to container, you need to upgrade to at least 1.8 for that support
```

*   docker版本升级

```
1）Docker源安装指定版本：
    sudo apt-get install apt-transport-https
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys     36A1D7869245C8950F966E92D8576A8BA88D21E9
    sudo bash -c "echo deb https://get.docker.io/ubuntu docker main >/etc/apt/sources.list.d/docker.list"
    sudo apt-get update  --更新软件源
    sudo apt-cache search docker  --查找需要更新的docker版本
    sudo apt-get install lxc-docker-1.9.1
2）错误的解决
    docker安装完成后执行sudo service docker start，提示错误：Failed to start docker.service: Unit docker.service is masked.
    解决方案：
    systemctl unmask docker.service
        systemctl unmask docker.socket
        systemctl start docker.service
```

*   docker 容器备份

```
1）生成docker镜像
   docker commit -p 30b8f18f20b4 container-backup
2）我们想要在Docker注册中心上传或备份镜像，我们只需要运行 docker login 命令来登录进Docker注册中心，然后推送所需的镜像即可
    （1）docker login
    （2）docker tag a25ddfec4d2a arunpyasi/container-backup:test
        （3）docker push arunpyasi/container-backup
3）如果我们不想备份到docker注册中心，而是想要将此镜像保存在本地机器中，以供日后使用，那么我们可以将其作为tar包备份。要完成该操作，我们需要运行以下 docker save 命令。
          docker save -o ~/container-backup.tar container-backup
          tar -zcvf ubuntu2-backup.tar.gz container-backup.ta
```

*   docker 恢复容器

```
1）在我们成功备份了我们的Docker容器后，我们现在来恢复这些制作了Docker镜像快照的容器。如果我们已经在注册中心推送了这些Docker镜像，那么我们仅仅需要把那个Docker镜像拖回并直接运行即可。
    docker pull arunpyasi/container-backup:test
2）如果我们将这些Docker镜像作为tar包文件备份到了本地，那么我们只要使用 docker load 命令，后面加上tar包的备份路径，就可以加载该Docker镜像了。
        tar -zxvf ubuntu2-backup.tar.gz
    docker load -i ~/container-backup.tar
3）使用docker image查看
```

*   extc 命令

使用attach命令经常会卡段，可以使用exec命令替代

```
docker exec -it ubuntu /bin/bash
```

 上面用attach进入的用exit会退出容器必须用ctrl P Q退出才能继续后台运行，exec的 用exit也不会真正退出容器继续后台运行  用name或id都可以

*   常用命令

```
docker run --name ubuntu -it ubuntu:16.04 /bin/bash
docker exec -it 96740370a5da /bin/bash
```
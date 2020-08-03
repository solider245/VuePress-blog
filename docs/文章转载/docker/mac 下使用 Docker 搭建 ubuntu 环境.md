---
title : mac 下使用 Docker 搭建 ubuntu 环境
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-03 00:38:36 +0800
categories:
 -
tags:
 -
---
[[toc]]
学习网络开发过程中不想“污染”macOS，考虑到之后部署网络应用主要是与linux打交道，所以安装了 ubuntu 虚拟机以满足短期的知识学习需求。十里安装了 ubuntu 虚拟机，一般就是在 mac 中 ssh 连接 ubuntu 虚拟机在终端下进行操作学习，可见安装一个包含完整GUI的 ubuntu 有点多余，还占用很多资源！所以想到了使用 docker 来创建 ubuntu 容器用来开发学习，本文就分享一下这个过程！

![](https://pichome-1254392422.cos.ap-chengdu.myqcloud.com/img/20181220150817.png)

本文就不介绍 Docker 是什么了，主要描述搭建符合自己需求的 ubuntu 容器的过程。

# 容器需求

*   可以 ssh 连接
*   包含 vim、git等基本工具

# 安装和配置 Docker

## 下载并安装 Docker

1.  访问 [Docker 官网](https://hub.docker.com) 了解和下载 Docker，这里也可以[点我](https://download.docker.com/mac/stable/Docker.dmg)下载最新稳定版的 Docker for mac

2.  打开下载的 dmg 文件，将 Docker 拖放到 Application 文件夹中即可完成安装

3.  首次运行会有提示输入密码，用来获取完整的操作权限

4.  Docker 运行起来会在顶栏出现一个小鲸鱼的logo

5.  安装成功后，在终端中查看 Docker 版本会得到下面类似信息：

    ```Bash
    ➜  docker --version
    Docker version 18.09.0, build 4d60db4
    ➜  docker-compose --version
    docker-compose version 1.23.2, build 1110ad01
    ➜  docker-machine --version
    docker-machine version 0.16.0, build 702c267f

    ```

## 配置 Docker

由于国内访问 Docker 官方默认的镜像源很慢，所以需要更换国内的镜像源进行加速，这里使用官方提供的一个镜像仓库地址：https://registry.docker\-cn.com。

1.  点击顶栏小鲸鱼的 logo，找到 `Preferences`点击调出 Doker 配置窗口；

2.  点击 `Daemon` 按钮，就可以看到 `Registry Mirrors` 的配置页；

3.  点击 `+` 号，添加上面提供的地址即可，添加完成后，点击 `Apply & Restart` ，等待一会儿 Docker 重启之后，配置即可生效，最终如下：

    ![](https://pichome-1254392422.cos.ap-chengdu.myqcloud.com/img/20181220153021.png)

# 定制 ubuntu 镜像

## 获取 ubuntu 镜像

运行命令

```Bash
docker pull ubuntu

```

就会拉取官网上的最新 ubuntu 镜像，这是一个极其精简的镜像，作为我们定制 ubuntu 镜像的基础。

使用命令 `docker image ls` 可以查看当前安装的 Docker 镜像。

## ubuntu 容器

### 创建 ubuntu 容器

使用命令 `docker run -i -t --name mineos ubuntu bash` 可以创建并运行一个可以使用终端交互的 ubuntu 容器，命令参数解释：

| 参数 | 值 | 含义 |
| --- | --- | --- |
| \-i | 无 | 可以输入进行交互 |
| \-t | 无 | 终端交互 |
| –name | mineos | 指定容器名称为 mineos |
| ubuntu | 无 | 指定使用镜像 |
| bash | 无 | 指定容器启动使用的应用 |

上面的命令执行后，就会登陆 ubuntu 容器的 bash 中，执行命令`cat /etc/issue` 可以查看系统版本，十里的ubuntu版本是 18.04。此时按快捷键组合 `ctrl` + `d` 就会退出 ubuntu 容器，此时就会停止容器运行。

### 查看已有容器

使用命令 `docker ps` 可以查看当前运行的容器，如果此时执行，会发现没有容器信息，因为我们已经停止了刚才创建的容器。怎么查看已经关闭的容器信息呢？使用命令 `docker ps -a`，会列出所有容器信息，包括已经关闭的。此时执行，就会看到已经关闭的 mineos 容器。

### 以交互的形式启动容器

执行命令 `docker start mineos` 就会启动容器，但是你会发现无法像刚创建时登陆容器的 bash，先使用命令 `docker stop mineos`，此时加入 `-i` 参数启动就可以了 `docker start -i mineos`。

## ubuntu 容器的基本配置

登陆进 ubuntu 的 bash 以后就可以当正常的 ubuntu 进行使用了。

1.  更新软件源信息：`apt-get update`

2.  因为这个 ubuntu 的依赖镜像太精简了，所以好多工具没有安装，先安装一下 vim: `apt-get install vim`

3.  可以看到安装挺慢的，之所以先安装 vim 是为了可以编辑 `/etc/apt/sources.list` 更换为国内访问更快的软件源，比如将文件中的内容替换为如下阿里云的：

    ```ini
    deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse

    ```

4.  重新更新软件源信息：`apt-get update`，会发现快很多

5.  飞一般的安装 git 和 python3：`apt-get install git python3`

## 配置 SSH

这一步主要是为了mac 可以 ssh 连接 ubuntu 容器^\[[Docker\-SSH连接docker容器](https://www.jianshu.com/p/426f0d8e6cbf)\]。

### 安装 openssh\-server

```bash
apt-get install openssh-server

```

用于开启 ssh 服务供外部连接。

### 配置 sshd

需要更改一下 sshd 的默认配置，编辑文件 `/etc/ssh/sshd_config` ，大概从 29 行开始主要更改三处，更改后内容如下：

```fallback
PermitRootLogin yes # 可以登录 root 用户
PubkeyAuthentication yes # 可以使用 ssh 公钥许可
AuthorizedKeysFile	.ssh/authorized_keys # 公钥信息保存到文件 .ssh/authorized_keys 中

```

### 重启 sshd

因为 ubuntu 过于精简，不能使用 service 命令方便的重启 sshd，这里使用命令 `/etc/init.d/ssh restart` 进行重启^\[[Ubuntu下"sshd:unrecognized service”](https://blog.csdn.net/u013015629/article/details/70045809)\]，重启是为了让上面的配置生效。

### 添加主机的 ssh 公钥

这里的主机指的就是 macOS，保证此时还是在 ubuntu 容器中。

1.  在 HOME 目录下创建 `.ssh` 目录：`mkdir ~/.ssh`
2.  新建文件 `~/.ssh/authorized_keys` ：`touch ~/.ssh/authorized_keys`
3.  新开一个 macOS 下的终端窗口，执行命令 `cat ~/.ssh/id_rsa.pub`，复制打印的一行公钥信息
4.  回到 ubuntu 容器中，将第 3 步复制的公钥粘贴到 `~/.ssh/authorized_keys` 中保存。

> 如果使用过ssh免密码的登陆操作的话，相信您知道ssh的密钥生成方法，如果没了解过，可以参考：[ssh\-keys](https://smslit.coding.me/ownwiki/linux/kali/#ssh-keys)

5.  此时完成了 SSH 访问支持的添加，`ctrl` + `d` 退出容器。

## 提交修改到镜像

现在已经推出到正常的 mac 终端窗口中了，容器的修改不会影响到源镜像，上面的操作我们已经完成了 Ubuntu 的基本配置，并且添加了 SSH 支持，这一步是产生新的镜像版本。

1.  查看刚刚操作的容器信息，执行命令 `docker ps -a` ，可以看到 mineos 的状态已经是退出了，主要关注 mineos 的 `CONTAINER ID` ，复制这个 ID 号，比如为 `e5d8c1030724`

2.  执行下面的命令提交产生 ubuntu 新版本的镜像：

    ```Bash
    docker commit -m 'add ssh' -a '5km' e5d8c1030724 ubuntu-ssh

    ```

    *   \-m，指定提交信息
    *   \-a，指定提交者
    *   你需要把 e5d8c1030724 替换为您的容器的 `CONTAINER ID`
    *   ubuntu\-ssh 是新镜像的名称，可以随意指定
3.  使用命令 `docker image ls` 可以查看当前安装的镜像，上述操作正常的话就会看到 `ubuntu-ssh` 的镜像信息

4.  此时之前创建的容器就没用了，可以通过命令 `docker rm mineos` 进行删除

# 最终的 ubuntu 容器

有了具有 SSH 支持的 ubuntu 镜像，我们就可以创建新的 ubuntu 容器，通过以下命令进行创建：

```Bash
docker run -d -p 26122:22 --name learn ubuntu-ssh /usr/sbin/sshd -D

```

| 参数 | 值 | 含义 |
| --- | --- | --- |
| \-d | 无 | 后台运行 |
| \-p | 26122:22 | 绑定主机的 26122 端口到ubuntu容器的 22 端口(ssh服务的默认端口为 22) |
| –name | learn | 指定容器名称为 learn |
| ubuntu\-ssh | 无 | 使用镜像 ubuntu\-ssh 创建容器 |
| /usr/sbin/sshd \-D | 无 | 指定容器启动使用的应用及参数 |

在 macOS 的终端中执行命令 `ssh -p 26122 root@localhost` 即可连接已经启动的 ubuntu 容器 `learn`

为了更方便的连接，可以为容器创建 ssh 连接的主机短名，往 macOS 的 `~/.ssh/config` 中添加以下内容：

```ini
Host learn
    HostName localhost
    User     root
    Port     26122

```

此时就可以通过命令 `ssh learn` 连接 ubuntu 容器 learn 了。
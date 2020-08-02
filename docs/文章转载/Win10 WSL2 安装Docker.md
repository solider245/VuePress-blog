---
title : Win10 WSL2 安装Docker
description : 详细的讲了WSL2安装的步骤以及各种踩坑解决办法
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-02 20:48:11 +0800
categories:
 -
tags:
 - docker 
 - wsl2 
---
[[toc]]
# 背景

由于新款Mac性价比走低，近期转为使用Windows作为主力开发系统。但是在开发过程中需要上Linux测试，或者说部署一些服务，例如MySQL，Nexus OSS等。本人又是一个Docker重度依赖者。之前一直是长期在Windows下启动一个Linux虚拟机辅助开发操作。占用大量磁盘内存资源不说，操作和维护也极为繁琐。

直到近期了解到Win10 2004正式版版本支持WSL2，问题得到了完美的解决。WSL2相比WSL1来说可以完美支持Docker。与WSL1的模拟Linux API不同的是，WSL2采用在Hyper\-V虚拟机中运行的方案。可以说WSL2和原汁原味的Linux已经十分接近。本人实验了一番，安装部署成功，将整个步骤分享给大家。

# 步骤

下面为大家详细介绍具体的操作步骤。

## 更新 Win10 到2004版本

使用Windows Update自动更新到2004版本。如果没有检测到更新，可以去微软官网下载“易升”工具并安装运行。工具会检测到更新并安装。

## 启用Linux子系统

打开 控制面板 \-> 程序 \-> 启用或关闭Windows功能。找到“适用于Linux的Windows子系统”和“虚拟机平台”，勾选这两项之后确定，并重新启动计算机。

## 切换系统WSL默认版本到2

使用管理员用户打开CMD，运行：

```shell
wsl --set-default-version 2

```

注意，有可能会出现如下提示：

```cpp
WSL 2 需要更新其内核组件。有关信息，请访问 https://aka.ms/wsl2kernel

```

出现这个提示，说明需要更新WSL2的内核。按照提示打开[https://aka.ms/wsl2kernel](https://links.jianshu.com/go?to=https%3A%2F%2Faka.ms%2Fwsl2kernel)链接。点击下图中的下载链接，下载并安装WSL2内核。

![](https://upload-images.jianshu.io/upload_images/6645072-c8430d6c05bcebe8.png?imageMogr2/auto-orient/strip|imageView2/2/w/692/format/webp)

WSL2内核下载链接

## 安装Ubuntu发行版

打开Microsoft Store，搜索ubuntu，界面如下所示：

![](https://upload-images.jianshu.io/upload_images/6645072-81af7947bef4964a.png?imageMogr2/auto-orient/strip|imageView2/2/w/990/format/webp)

Ubuntu搜索页面

根据自己的需要，选择对应的Ubuntu版本并安装。
完成之后在开始菜单会出现Ubuntu菜单项。打开它，Ubuntu将会进行初始化操作。等待几分钟后按照提示，为Ubuntu设置用户名和密码。
最后，我们需要验证Ubuntu是否在WSL2的环境下启动。以管理员用户打开CMD，执行：

```shell
wsl -l -v

```

如果看到如下信息：

```css
  NAME            STATE           VERSION
* Ubuntu-20.04    Running         2

```

说明Ubuntu在WSL2环境下运行。到此为止安装完毕。
如果发现VERSION为1，说明Ubuntu运行在WSL1下。需要手工切换。
首先关闭WSL下运行的Linux，执行：

```shell
wsl --shutdown

```

然后执行：

```shell
wsl --set-version <Linux发行版名称> 2

```

其中Linux发行版名称为前面安装的Linux名称，可以通过`wsl -l -v`命令查看。执行命令后等待片刻。等命令行提示转换完成，我们已经成功将Linux切换到WSL2环境。

## 安装Docker

首先进入Ubuntu shell，更换Ubuntu官方源为国内源，加快下载速度。执行。

```shell
vim /etc/apt/sources.list

```

将内容替换为下方：

```cpp
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted
deb http://mirrors.aliyun.com/ubuntu/ focal universe
deb http://mirrors.aliyun.com/ubuntu/ focal-updates universe
deb http://mirrors.aliyun.com/ubuntu/ focal multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted
deb http://mirrors.aliyun.com/ubuntu/ focal-security universe
deb http://mirrors.aliyun.com/ubuntu/ focal-security multiverse

```

接下来添加Docker源：
依次执行如下命令：

```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt update

```

配置完成软件源之后下一步是安装Docker，命令如下：

```shell
sudo apt install -y docker-ce

```

最后一个步骤，启动Docker daemon。但是此处有一个问题，WSL2经过测试无法使用`systemctl`命令（此问题已经解决，参见博客末尾FAQ），因此我们使用`service`命令启动Docker daemon。命令如下所示：

```shell
sudo service docker start

```

至此，Docker 在WSL2下安装完毕。

注：WSL2 Docker最爽的地方是和宿主机Win10共享network，我们在宿主机Win10使用localhost加端口号就可以访问Docker中对应container中的服务，十分方便。

## 关闭虚拟机

WSL2实际上是在虚拟机中运行。我们一旦进入WSL2 Linux的命令行，虚拟机会自动启动运行。如果我们查看任务管理器，会发现一个Vmmem进程。如下所示：

![](https://upload-images.jianshu.io/upload_images/6645072-8b7de278192d1b37.png?imageMogr2/auto-orient/strip|imageView2/2/w/602/format/webp)

Vmmem进程

该进程是虚拟机的进程。它比较占内存。不使用WSL2的时候我们可以关闭它以节省内存。关闭WSL2 Linux的方法如下。使用管理员打开CMD，运行：

```shell
wsl --shutdown

```

## 卸载发行版

有时候某个Linux发行版不再使用，或者是环境被搞坏需要重装，这时候我们可以卸载掉这个Linux发行版。方法如下。
首先使用：

```shell
wslconfig /l

```

命令查看系统内安装的Linux发行版。
然后使用：

```shell
wslconfig /u <发行版名称>

```

卸载掉指定的发行版Linux。

# 和宿主机Win10文件系统相互访问

## 在Win10下访问Linux子系统文件

进入CMD或者PowerShell，输入：

```shell
cd \\wsl$\Ubuntu-20.04\

```

可以进入到Linux子系统根目录。如下图所示：

![](https://upload-images.jianshu.io/upload_images/6645072-861e342815516794.png?imageMogr2/auto-orient/strip|imageView2/2/w/607/format/webp)

CMD进入Linux子系统根目录

或者打开文件资源管理器，在地址栏输入`\\wsl$\Ubuntu-20.04`，也可以跳转到Linux子系统根目录。

![](https://upload-images.jianshu.io/upload_images/6645072-a43d0287833378f0.png?imageMogr2/auto-orient/strip|imageView2/2/w/663/format/webp)

文件资源管理器进入Linux子系统根目录

## Linux子系统访问Win10文件

进入Linux子系统运行`df -h`，看到如下输出：

![](https://upload-images.jianshu.io/upload_images/6645072-e07803cc2f4abc5c.png?imageMogr2/auto-orient/strip|imageView2/2/w/509/format/webp)

df \-h输出

注意观察后两行。本人电脑有两个分区。 `/mnt/c`和`/mnt/d`正好分别对应本机的C盘和D盘。

## 和VMWare的共存问题

目前VMWare 15版本无法在启用Hyper\-V虚拟机，即启用WSL2的Win10上运行。但是经过本人实验，VMWare最新的测试版是可以和Hyper\-V共存的。下面是测试版VMWare的下载链接：
[https://download3.vmware.com/software/wkst/file/VMware\-workstation\-full\-e.x.p\-16227267.exe](https://links.jianshu.com/go?to=https%3A%2F%2Fdownload3.vmware.com%2Fsoftware%2Fwkst%2Ffile%2FVMware-workstation-full-e.x.p-16227267.exe)
下载安装包之后，按照向导提示升级安装VMWare即可。该版本VMWare可以和WSL2完美共存。

# Docker Desktop for Windows

后来发现Docker Desktop windows版已经能够支持WSL作为Docker Engine运行，可以同时支持在Linux和Windows命令行下操作docker，这样远比前文中单独安装Linux Docker使用起来灵活。下面将安装Docker Desktop for Windows的方法分享。

1.  浏览器打开[https://www.docker.com/products/docker\-desktop](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.docker.com%2Fproducts%2Fdocker-desktop)
    点击Download for Windows (stable)，下载Docker安装程序。

2.  确保WSL内的Docker已经卸载，如果没有卸载，可以执行：

```shell
sudo apt remove docker-ce
sudo apt remove docker-ce-cli

```

3.  双击下载的安装程序安装，记住选择使用WSL作为Docker引擎。

4.  在Windows注销当前用户重新登录。到此Docker Desktop for Windows安装完毕。

注意：如果发现在WSL下无法执行docker命令，可以通过如下操作打开：
进入Docker Desktop的settings，如下所示：

![](https://upload-images.jianshu.io/upload_images/6645072-df39400a5cc3551b.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Settings界面

依次点击Resources \-> WSL INTEGRATION，打开右侧的Ubuntu开关，点击对话框右下角的Apply & Restart按钮

# 迁移WSL 到非系统盘

默认WSL总是安装到C盘，这样对于C盘空间紧张的用户完全不友好。

我们可以使用LxRunOffline工具来迁移WSL到其他磁盘分区。

LxRunOffline的下载链接：[https://github.com/DDoSolitary/LxRunOffline/releases](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FDDoSolitary%2FLxRunOffline%2Freleases)。在Win10 PowerShell运行需要下载`LxRunOffline-vx.x.x-msvc.zip`版本。解压到任意目录即可使用。

> LxRunOffline是一个第三方WSL Linux发行版管理工具，可以认为是wsl命令的增强版。它可以安装和卸载Linux发行版，迁移，复制，导入导出和设置环境变量等。具体的使用帮助可执行`.\LxRunOffline.exe \h`查看命令介绍。

迁移过程分为3步：

1.  获取准备迁移的发行版名称。执行：

```css
PS C:\Users\xxx\Desktop> .\LxRunOffline.exe list
Ubuntu-20.04

```

获取系统当前已安装的发行版。例子中返回的发行版名称为`Ubuntu-20.04`。

2.  执行迁移命令。格式如下：

```xml
.\LxRunOffline.exe m -n <发行版名称> -d <目标路径>

```

比如我们要将`Ubuntu-20.04`移动到`D:\Ubuntu-20.04`，执行如下命令：

```css
.\LxRunOffline.exe m -n Ubuntu-20.04 -d D:\Ubuntu-20.04

```

等待命令执行完毕返回。

3.  查看迁移后发行版的安装路径。执行：

```css
PS C:\Users\xxx\Desktop> .\LxRunOffline.exe di -n Ubuntu-20.04
D:\Ubuntu-20.04

```

返回的安装位置是`D:\Ubuntu-20.04`，说明迁移成功。

# FAQ

## systemctl命令无法使用

现象为在命令行执行`systemctl`命令，报如下错误：

```shell
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down

```

参考了[https://forum.snapcraft.io/t/running\-snaps\-on\-wsl2\-insiders\-only\-for\-now/13033](https://links.jianshu.com/go?to=https%3A%2F%2Fforum.snapcraft.io%2Ft%2Frunning-snaps-on-wsl2-insiders-only-for-now%2F13033)之后给出如下解决方案：

1.  安装daemonize和fontconfig

```shell
apt install -y fontconfig daemonize

```

2.  编辑`/etc/profile`脚本，加入如下内容：

```shell
SYSTEMD_PID=$(ps -ef | grep '/lib/systemd/systemd --system-unit=basic.target$' | grep -v unshare | awk '{print $2}')

if [ -z "$SYSTEMD_PID" ]; then
   sudo /usr/bin/daemonize /usr/bin/unshare --fork --pid --mount-proc /lib/systemd/systemd --system-unit=basic.target
   SYSTEMD_PID=$(ps -ef | grep '/lib/systemd/systemd --system-unit=basic.target$' | grep -v unshare | awk '{print $2}')
fi

if [ -n "$SYSTEMD_PID" ] && [ "$SYSTEMD_PID" != "1" ]; then
    exec sudo /usr/bin/nsenter -t $SYSTEMD_PID -a su - $LOGNAME
fi

```

3.  修改`/etc/sudoers`文件，加入如下内容：

```jsx
%sudo ALL=(ALL) NOPASSWD: /usr/sbin/daemonize /usr/bin/unshare --fork --pid --mount-proc /lib/systemd/systemd --system-unit=basic.target
%sudo ALL=(ALL) NOPASSWD: /usr/bin/nsenter -t [0-9]* -a su - [a-zA-Z0-9]*

```

4.  执行`source /etc/profile`或者是重新打开terminal，执行`systemctl`验证是否能够正常操作。
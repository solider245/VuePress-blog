---
title : Linux实用命令大全-附思维导图
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-25 10:30:42 +0800
categories:
 -
tags:
 -
---
[[toc]]
Linux于1991年10月5日发布，其创始人是林纳斯·托瓦兹（_Linus_ Torvalds），全称GNU/Linux，是一种自由和开放源码的类UNIX操作系统。它继承了Unix以网络为核心的设计思想，是一个性能稳定的多用户网络操作系统。

**Linux发行版本**

Linux发行版 (也被叫做 GNU/Linux 发行版) 通常包含了包括桌面环境、办公套件、媒体播放器、数据库等应用软件。

**常见的发行版本如下：**

*   Ubuntu
*   Debian
*   centOS
*   archLinux
*   kailLinux

![](https://pic4.zhimg.com/v2-3a3a6dd573d80e72cd67f84f9e3900e0_b.jpg)

### 官网及下载地址

### Centos

CentOS官网：

[http://www.centos.org/](https://link.zhihu.com/?target=http%3A//www.centos.org/)

CentOS搜狐镜像：

[http://mirrors.sohu.com/centos/](https://link.zhihu.com/?target=http%3A//mirrors.sohu.com/centos/)

CentOS网易镜像：

[http://mirrors.163.com/centos/](https://link.zhihu.com/?target=http%3A//mirrors.163.com/centos/)

CentOS北京理工大学镜像：

[http://mirror.bit.edu.cn/centos/](https://link.zhihu.com/?target=http%3A//mirror.bit.edu.cn/centos/)

### **ubuntu**

官方下载地址 [https://www.ubuntu.com/download](https://link.zhihu.com/?target=https%3A//www.ubuntu.com/download)

阿里云开源镜像站 [http://mirrors.aliyun.com/ubuntu-releases/](https://link.zhihu.com/?target=http%3A//mirrors.aliyun.com/ubuntu-releases/16.04/)

兰州大学开源镜像站 [http://mirror.lzu.edu.cn/ubuntu-releases/](https://link.zhihu.com/?target=http%3A//mirror.lzu.edu.cn/ubuntu-releases/16.04/)

北京理工大学开源 [http://mirror.bit.edu.cn/ubuntu-releases/](https://link.zhihu.com/?target=http%3A//mirror.bit.edu.cn/ubuntu-releases/16.04/)

浙江大学 [http://mirrors.zju.edu.cn/ubuntu-releases/](https://link.zhihu.com/?target=http%3A//mirrors.zju.edu.cn/ubuntu-releases/16.04/)

### Linux目录详解

![](https://pic3.zhimg.com/v2-6cd5fbbcd1a1d3ff949dcc688add289a_b.png)

1、**bin：** 包含二进制文件，即可执行程序，包含常用的Linux用户命令。

2、**/boot：** 包含可引导的Linux内核和引导装载（boot loader）配置文件（GRUB）。

3、**/dev：** 包含代表系统设备访问点的文件。这包括终端设备（tty_)、软盘（fd_）、硬盘（hd_）、RAM（ram_）和CD-ROM（cd*）（用户通常通过设备文件直接访问这些设备）。

4、**/etc：**包含管理配置文件。

5、**/home：** 包含分配给每个拥有登陆帐号用户的目录。

6.**lib：**存放跟文件系统中的程序运行所需要的共享库及内核模块

7、**/media：**提供挂载（mounting）和自动挂载设备的标准位置，如远程文件系统和可移动介质（目录名为cdrecorder、floppy等）。

8、**/mnt：** 在被标准的/media目录替代前，这是很多设备常用的挂载点。某些可引导的Linux系统仍旧使用该目录来挂载硬盘分区和远程文件系统。

9、**/proc：**包含有关系统资源的信息。

10、**/root**：表示超级用户目录。

11、**/sbin**：包含管理命令和守护进程。

12、**/sys：**一个类似与/proc的文件系统，在Linux2.6内核中最新出现的，包含的文件用于获得硬件状态并反映内核看到的系统设备树。它使用了/proc中的很多帮助。

13、**/tmp**：包含应用程序使用的临时文件。

14、**/usr：**包含用户文档、游戏、图形文件（X11）、库（lib），以及各种其他用户和管理命令及文件

15、**/var：**包含不同应用程序使用的数据目录。特别要注意的是，这里放置作为FTP服务器（/var/ftp）成Web服务器（/var/www）共享文件。它还包含所有系统日志文件（/var/log）。

### 服务启动、关闭、状态查看

**centos7.x系统中：**

```
systemctl start 服务名称  启动应用
  systemctl stop 服务名称
  systemctl status 查看任务状态
  systemctl enable 服务名称  启用开机自启
  systemctl disable 服务名称  禁用开机自启
```

**在6.x系统中**

```
service 服务名称 start
  service 服务名称 stop
  service 服务名称 status
```

### 软件安装卸载命令

**yum 安装软件**

```
yum search 查看有没有该软件
    yum install 安装该软件
    yum remove xxx 卸载
    yum lis 列出已安装的包
```

**rpm 安装软件**

```
rpm -ivh  RPM包全路径名称 #rpm安装
    rpm -e 卸载
    rpm -qa | grep 名称 | xargs rpm -e #查找已安装的文件，将查找的内容作为参数(xargs)传给后面的命令
    安装参数 
--force 即使覆盖属于其它包的文件也强迫安装 
--nodeps 如果该RPM包的安装依赖其它包，即使其它包没装，也强迫安装。
```

**源代码构建安装**

### 防火墙操作

```
启动： systemctl start firewalld
查看状态： systemctl status firewalld 
停止： systemctl disable firewalld
禁用： systemctl stop firewalld
```

### 文件上传下载

```
在xshell中可以通过下面的命令进行上传下载：
一般般需要安装，可使用 yum install lrzsz
rz：选择上传文件
sz 文件名：选择下载路径
当然你也可以通过xftp工具，进行可视化的上传下载。
```

### 查看端口占用

```
netstat -lntp # 查看所有监听端口 
netstat -antp # 查看所有已经建立的连接
-a 显示所有连接和监听端口
-t (tcp)仅显示tcp相关选项
-u (udp)仅显示udp相关选项
-n 拒绝显示别名，能显示数字的全部转化成数字。
-p 显示建立相关链接的程序名
```

![](https://pic3.zhimg.com/v2-c28ea63edc9fddab9dcace64edc7a843_b.jpg)
![](https://pic1.zhimg.com/v2-0049e91f22255c7fc8e42e511a481196_b.jpg)
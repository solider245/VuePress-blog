---
title : Linux性能监控命令——sar
description : 
author : 中箭的吴起
image : 
date : 2020-08-02 08:07:48 +0800
categories:
 -
tags:
 -
---
### 介绍

sar（System Activity Reporter系统活动情况报告）是目前 Linux 上最为全面的系统性能分析工具之一，可以从多方面对系统的活动进行报告，包括：文件的读写情况、系统调用的使用情况、磁盘I/O、CPU效率、内存使用状况、进程活动及IPC有关的活动等

### 安装

#### ubuntu

```bash
apt install sysstat

```

#### centos

```bash
yum install sysstat

```

下面的命令启动服务

```bash
service sysstat start

```

第一次使用sar命令会报如下错误：“无法打开 /var/log/sa/sa17: 没有那个文件或目录”。其中的17不是一定的，他表示你电脑当天的日期（比如，2017年12月18日，就是18）
可以用下面的命令创建相应目录文件

```bash
#下面的17改成你电脑现在的日期（2017年12月18日，就是18）
sar -o 17

```

### 测试安装正常

随便输个sar命令，比如下面的：观察CPU 的使用情况每10秒采样一次，连续采样3次。

```bash
sar -u  10 3

```

正确安装的话会出现类似下面的输出
![](https://images2017.cnblogs.com/blog/673170/201712/673170-20171218201929068-946852927.png)

### 命令学习

*   [sar命令](http://man.linuxde.net/sar)
*   [Linux sar 命令详解](https://www.cnblogs.com/liyongsan/p/7459523.html)

![](https://images2018.cnblogs.com/blog/673170/201807/673170-20180729005734951-1439078997.png)

还真有人点开啊🤣随意随意😂

如果您认为阅读这篇博客让您有些收获，不妨点击一下右下角的【**推荐**】按钮。
如果您希望更容易地发现我的新博客，不妨点击一下绿色通道的[【**关注我**】](javascript:void(0);)。

如果想给予我更多的鼓励，不妨请我喝杯咖啡

感谢您的阅读，我是**Tacey Wong**！

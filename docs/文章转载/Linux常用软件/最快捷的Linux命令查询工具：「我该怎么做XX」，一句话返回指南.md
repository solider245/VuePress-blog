---
title : 最快捷的Linux命令查询工具：「我该怎么做XX」，一句话返回指南
description : 
author : 中箭的吴起
image : 
date : 2020-08-02 02:43:51 +0800
categories:
 - linux
tags:
 -
---

无论你是Linux萌新用户还是老司机，使用命令行总会遇到不懂的问题。

遇到问题要么去论坛询问、谷歌搜索，要么查自带命令手册（RTFM），过程耗时，结果也不直观。

![](https://ask.qcloudimg.com/http-save/yehe-9937725/jhytpfz5zy.jpeg?imageView2/2/w/1620)

一位印度软件工程师针对这一难题，开发了一个便捷的命令行操作指南Q&A工具**howdoi**。

直接在终端输入「how do i +你要问的问题」，这里的问题不再是复杂的命令选项，而是普通的自然语言，和你去谷歌搜索没什么两样。

然后howdoi马上就能返回详细操作教程，**实现了用日常对话的形式来查询Linux交互命令**。

![](https://ask.qcloudimg.com/http-save/yehe-9937725/kufvfh4zcw.gif)

这么好用的工具安装起来也不复杂。

## 安装步骤

安装howdoi只要两步，还需要PHP 5.0以上版本。

运行下方命令即可完成安装：

$ mkdir \-p ~/bin && wget https://raw.githubusercontent.com/san\-kumar/howdoi/master/howdoi \-O ~/bin/howdoi && chmod +x ~/bin/howdoi$ sudo ln \-s ~/bin/howdoi /usr/local/bin/howdoi

在使用时，有几个实用的命令字符：

howdoi \[\-n \-v \-h\] — question

其中，\-n 代表返回的解答数量（默认为1），\-v表示返回完整解答（默认情况只返回相关代码），\-h为显示此问题的帮助信息。

## 操作实例

### 快速查询教程

输入问题「如何解压bz2文件？」：

$ howdoi extract a bz2 file

返回结果：

\-j, —bzip2 filter the archive through bzip2 tar \-xvjf enginsxt.tar.bz2Source: https://askubuntu.com/questions/707861/how\-to\-extract\-tar\-bz2

howdoi不仅给出了命令的使用方法，还给出了这个问题的来源网址。

### 详细教程查询：

输入问题「如何把一个程序添加到cron中？」：

$ howdoi \-v add a program to cron

返回结果：

Put a shell script in one of these folders: /etc/cron.daily, /etc/cron.hourly, /etc/cron.monthly or /etc/cron.weekly.If these are not enough for you, you can add more specific tasks e.g. twice a month or every 5 minutes. Go to the terminal and type:crontab \-e…snipSource: https://askubuntu.com/questions/2368/how\-do\-i\-set\-up\-a\-cron\-job

对于这样一个有延伸拓展的问题，返回结果除了有基本的操作指导，还有关于这个问题进一步的建议。

### 返回多个结果

输入问题「如何链接屏幕？」，要求2个返回结果：

$ howdoi \-n 2 attach to a screen

返回：

screenscreen \-S myprogramrunningunderscreenscreen \-lsThere are screens on: 4964.myprogramrunningunderscreen (05/31/2013 09:42:29 PM)  (Detached) 4874.pts\-1.creeper (05/31/2013 09:39:12 PM)  (Detached)Source: https://askubuntu.com/questions/302662/reattaching\-to\-an\-existing\-screen\-sessionscreen \-d \-rSource: https://askubuntu.com/questions/302662/reattaching\-to\-an\-existing\-screen\-session

这个例子中，在命令中要求返回2个结果，系统返回也给出了两种连接不同屏幕的方法。

### 其他功能

还可以查询如何更新PHP：

```shell
$ howdoi upgrade to latest phpsudo apt\-get upgrade sudo apt\-get dist\-upgrade sudo apt\-add\-repository ppa:ondrej/php sudo apt\-add\-repository ppa:ondrej/php5\-oldstable sudo apt\-add\-repository ppa:ondrej/php5 sudo apt\-add\-repository ppa:ondrej/php5\-5.6 sudo apt\-get update sudo apt\-get install php5.5 sudo apt\-get install php5.6 sudo apt\-get install php7.0 do\-release\-upgradeSource: https://askubuntu.com/questions/565784/how\-do\-i\-upgrade\-php\-version\-to\-the\-latest\-stable\-released\-version
```

howdoi工具调用的解答库来源于askbuntu.com论坛上的提问，论坛上已有的问题解答都可以通过本工具实现**对话式查询**。

5月19日，这个项目刚刚在Github上开源。

![](https://ask.qcloudimg.com/http-save/yehe-9937725/nhtk27radf.jpeg?imageView2/2/w/1620)

显卡驱动、硬件支持、图形平台稳定、用户体验、软件支持、社区协作，这些小问题叠加在一起，成了谁都无法忽视的Linux缺陷，这些痛点也许就是让新用户望而生畏的真正原因。

本项目在Hacker news上收获了网友的盛赞，其中有一位用户在称赞之余，还指出了像Linux这种类Unix系统的通病：用户友好性差，获取帮助十分困难。

![](https://ask.qcloudimg.com/http-save/yehe-9937725/ngguaxgqh1.jpeg?imageView2/2/w/1620)

**这位印度小哥San Kumar解决了一个大问题：Linux新手无法高效获取问题的解决方案**，而且整个工具只用了100行代码实现。

同时这位用户还建议这种实用工具今后应该作为标准，加入所有类Unix操作系统的衍生版本。

如果这个Linux利器对你有帮助的话，可以直接通过文中的代码下载，项目原址在下方。

Github项目地址： https://github.com/san\-kumar/howdoi

本文经AI新媒体量子位（公众号ID:QbitAI）授权转载，转载请联系出处。

::: tip
这个很好，但是需要你能连上谷歌
:::
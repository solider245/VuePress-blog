---
title : Linux QuickTip：一步下载和解压缩
description : 一步到位，下载和解压缩
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-04 14:49:27 +0800
categories:
 -
tags:
 -
---
[[toc]]

在大多数情况下，当我下载某些内容时，它是某种文件存档\-通常是tarball或zip文件。 这可能是Gentoo的Portage树中未包含的某个应用程序的源代码，内部公司应用程序的一些文档，甚至可能是与新的WordPress安装一样平凡的东西。

在终端中下载和解压缩某些内容的传统方式如下：

```shell
wget http://wordpress.org/latest.tar.gz

tar xvzf Latest.tar.gz

rm Latest.tar.gz

```
或者更紧凑的形式：

> wget [http://wordpress.org/latest.tar.gz](http://wordpress.org/latest.tar.gz) && tar xvzf Latest.tar.gz && rm Latest.tar.gz

两种方法都比较笨拙。 这是一个非常简单的操作，像bash这样的功能强大的shell应该允许以“更流畅”的方式执行此类任务。

好吧，多亏了一个有用的小命令“ curl”，我们实际上可以仅通过一个管道语句来完成上面的混乱：

> curl http://wordpress.org/latest.tar.gz | tar xvz

没有要删除的临时文件，也没有与“＆”号混为一谈。 简而言之，是一种高度紧凑，高效的命令。 实际上，从理论上讲，curl方法可能比连接的wget / tar / rm混乱更快，因为如果可能的话，stdout管道将使用RAM作为缓冲区，而wget和tar（使用\-f开关）必须读/写直接从磁盘。

顺便说一句，带有\-v选项的tar（在以上所有示例中使用的方式）会将每个文件名打印到stdout，因为每个文件都未解压缩。 这可能会妨碍curl的显示，ncurses输出显示下载状态。 我们可以通过不带\-v的方式调用tar来使其静音：

> curl http://wordpress.org/latest.tar.gz | tar xz

这就是全部！
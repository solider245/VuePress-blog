---
title : linux下chmod +x的意思？为什么要进行chmod +x
description : 图文描述了这个命令的意思
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-04 05:37:45 +0800
categories:
 -
tags:
 -
---
[[toc]]
上周在工作中接触到chmod +x 这个命令，如下图：

![](https://img-blog.csdn.net/20180524164642988?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTIxMDYzMDY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

首先对start.sh这个启动文件删除，然后使用rz命令上传了新的start.sh，然后发现还有进行下一步，chmod +x start.sh

这一步是什么意思呢？经过上网查询（说的比较复杂，引申太多![睡觉](https://static-blog.csdn.net/xheditor/xheditor_emot/default/sleep.gif)）和咨询我们研发（还是研发说的通俗易懂![大笑](https://static-blog.csdn.net/xheditor/xheditor_emot/default/laugh.gif)）

**chmod +x的意思就是给执行权限**

*   LINUX下不同的文件类型有不同的颜色，这里

 ****![](https://img-blog.csdn.net/20180524165513592?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTIxMDYzMDY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)****

```best-text
蓝色表示目录;绿色表示可执行文件，可执行的程序;红色表示压缩文件或包文件;浅蓝色表示链接文件;灰色表示其它文件;
```

红色闪烁表示链接的文件有问题了
黄色表示设备文件

![](https://img-blog.csdnimg.cn/2019062011580181.png)

*   **因此如果只是普通的上传start.sh这个文件，那么上传之后也就是一个普通的文件，不能执行**

![](https://img-blog.csdn.net/20180524171800972?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTIxMDYzMDY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

*   **下面实践来看**

首先上传了一个stop1.sh文件，是灰色，然后进行chmod +x给了权限。后来使用chmod \-x 去除执行权限，可以明显看到效果

![](https://img-blog.csdn.net/20180524170139170?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTIxMDYzMDY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

***补充：***

## [chmod +x 和 chmod u+x的区别](https://www.cnblogs.com/tonyauto/p/8085551.html)?

## 就是设置谁拥有执行这个文件权限

chmod +x 和chmod a+x 是一样的，一般没有明确要求，可以就用chmod +x

![](https://img-blog.csdn.net/20180524170623455?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTIxMDYzMDY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

## 转载链接
[linux下chmod +x的意思？为什么要进行chmod +x_yunlive的博客-CSDN博客_chmod +x](https://blog.csdn.net/u012106306/article/details/80436911)
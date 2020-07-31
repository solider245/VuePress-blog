---
title: 设置python3为默认python
---
我们知道在Windows下多版本共存的配置方法就是改可执行文件的名字，配置环境变量。

Linux中的配置原理差不多，思路就是生成软链接，配置到环境变量。

在没配置之前，我的Ubuntu中安装了python2.7和python3.6。而且输入python默认使用的是python2.7

![](https://images2018.cnblogs.com/blog/1054809/201803/1054809-20180318232119691-2112706400.png)

我需要配置成python3，只需要执行如下步骤。

1.找到当前代表python2.7的软链接‘python’的位置，删掉。

2.找到python3.6的执行文件，将其生成软链接到环境变量。

如下图：

![](https://images2018.cnblogs.com/blog/1054809/201803/1054809-20180318232357282-1256861311.png)

注意：需要root权限。

代码如下：

查找python位置

whereis python

删除软链接

 rm /usr/bin/python

查看环境变量

echo $PATH

生成python3的软链接到环境变量

ln \-s /usr/bin/python3.6 /usr/bin/python
## 引用文献

[设置python3为默认python](https://blog.csdn.net/WK785456510/article/details/81094040)
---
title: Python 修改 pip 源为国内源
---
在 python 里经常要安装各种这样的包，安装各种包时最常用的就是 pip，pip 默认从官网下载文件，官网位于国外，下载速度时快时慢，还经常断线，国内的体验并不太好。

解决办法是把 pip 源换成国内的，最常用的并且可信赖的源包括清华大学源、豆瓣源、阿里源：

> pypi 清华大学源：[https://pypi.tuna.tsinghua.edu.cn/simple](https://link.zhihu.com/?target=https%3A//pypi.tuna.tsinghua.edu.cn/simple)
> pypi 豆瓣源 ：[http://pypi.douban.com/simple/](https://link.zhihu.com/?target=http%3A//pypi.douban.com/simple/)
> pypi 腾讯源：[http://mirrors.cloud.tencent.com/pypi/simple](https://link.zhihu.com/?target=http%3A//mirrors.cloud.tencent.com/pypi/simple)
> pypi 阿里源：[https://mirrors.aliyun.com/pypi/simple/](https://link.zhihu.com/?target=https%3A//mirrors.aliyun.com/pypi/simple/)

pip 源具体修改方式是，我们以安装 python 的 markdown 模块为例，通常的方式是直接在命令行运行

```bash
pip install markdown
```

这样会从国外官网下载markdown模块并安装。

若要把 pip 源换成国内的，只需要把上面的代码改成下图这样（下图以清华大学源为例）：

```text
pip install markdown -i https://pypi.tuna.tsinghua.edu.cn/simple
```

![](https://pic3.zhimg.com/v2-cfc8ee29213ff52ee39d831f14b05f89_b.jpg)



这样我们就从清华大学源成功安装了markdown模块，速度会比过pip默认的国外源快很多。

上述做法是临时改成国内源，如果不想每次用 pip 都加上 \-i [https://pypi.tuna.tsinghua.edu.cn/simple](https://link.zhihu.com/?target=https%3A//pypi.tuna.tsinghua.edu.cn/simple)，那么可以把国内源设为默认，做法是：

```bash
# 清华源
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

# 或：
# 阿里源
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
# 腾讯源
pip config set global.index-url http://mirrors.cloud.tencent.com/pypi/simple
# 豆瓣源
pip config set global.index-url http://pypi.douban.com/simple/
```

参考：

*   [Tsinghua Open Source Mirror](https://link.zhihu.com/?target=https%3A//mirrors.tuna.tsinghua.edu.cn/help/pypi/)

欢迎访问我的博客原文：

[Python 修改pip源为国内的​huaxiaostar.com](https://link.zhihu.com/?target=https%3A//huaxiaostar.com/2019/01/python-pip-china/)[Python 修改pip源为国内的](https://link.zhihu.com/?target=https%3A//huaxiaostar.com/2019/01/python-pip-china/)[Python 修改pip源为国内的​huaxiaostar.com](https://link.zhihu.com/?target=https%3A//huaxiaostar.com/2019/01/python-pip-china/)
---
title: 命令行界面，用于使用speedtest.net测试Internet带宽
description: 命令行到底速度有多块，用他测试一下就知道了。
---

# 命令行界面，用于使用speedtest.net测试Internet带宽

>命令行界面，用于使用speedtest.net测试Internet带宽
speedtest-cli适用于Python 2.4-3.7

## 安装方式

### pip或者python安装

**pip / easy_install**

```shell
pip install speedtest-cli
easy_install speedtest-cli
pip install git+https://github.com/sivel/speedtest-cli.git #从github安装
```
以上三种方式皆可，还有源码安装
```shell
git clone https://github.com/sivel/speedtest-cli.git
cd speedtest-cli
python setup.py install
```

### 软件包安装(推荐安装)
ubuntu 
`apt install speedtest-cli`

其他版本我没测过，理论上应该都有。

### 直接下载源码文件并修改文件权限chmod +x speedtest-cli
```shell
wget -O speedtest-cli https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py
# curl -Lo speedtest-cli https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py
sudo chmod +x speedtest-cli
```
>上面这个方法我报错了，也不推荐大家使用
## 运行

### 默认测速命令
`speedtest-cli`
![20200729182124_953c952bb8ff676bdb2ecd11156eeb0d.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729182124_953c952bb8ff676bdb2ecd11156eeb0d.png)
直接输入命令即可。


### 生成测速图片
```shell
speedtest --share # 生成一张测速图片
```
![20200729183821_4d71abef6ca3531174604d971a37537b.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729183821_4d71abef6ca3531174604d971a37537b.png)

买的腾讯的服务器，只能说牛了！

### 测试中国节点
>**speedtest中国节点**
```shell
speedtest --list|grep 'China'
```
![20200729184307_24cfe3a07c0c0172fee9edfeb6c50786.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729184307_24cfe3a07c0c0172fee9edfeb6c50786.png)

### 仅仅需要Ping，上传，下载的结果
```shell
speedtest --simple
```
![20200729185907_5d450fd532d35dab0fd8adc858698bc1.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729185907_5d450fd532d35dab0fd8adc858698bc1.png)

## 常见报错

* >权限问题
使用sudo或者切换到root解决
个人推荐，如果你的服务器安装了Python的话，那么直接使用python安装会好很多

* >路径问题
下一步，把可执行的脚本移动到/usr/bin文件夹，这样你就不用每次都输入完整的脚本路径了。

```
sudo mv speedtest_cli.py /usr/bin/
```
* > 运行没反应
有可能是你的运行方式有问题，使用以下两种方式来解决。
    ```shell
    //第一种方式
    $ ./speedtest-cli
    //第二种方式
    $ python speedtest-cli
    ```
## 其他测速软件
![](https://cdn.jsdelivr.net/gh/steve-yuan-8276/pic-blog@master/uPic/RgIWAG20200212.png)


## 参考文献

[Linux 命令行下测速](https://www.jianshu.com/p/04e41c97444a)
[linux命令行下使用speedtest测速](https://www.livelu.com/201801291.html)
[Linux命令行学习笔记｜网络测速开源工具](https://steveyuan.work/2020/02/12/linuxNote-commandlinePart1/)
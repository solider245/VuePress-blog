---
title: 命令行使用proxychains代理上网
description: 搞清楚了proxychains与proxychains4的区别，接下来让我们来使用这个工具
---
# 命令行使用proxychains代理上网
>推荐小白直接使用proxychains。懂网络原理，有一定追求的可以使用proxychains4

## 软件安装

两种主流安装方式：
* 软件包安装
* 编译安装

### 软件包安装
* proxychains的安装

| 系统   | 安装命令                        |
| ------ | ------------------------------- |
| **Ubuntu** | sudo apt install -y proxychains |
| **centos** | yum install -y proxychains      |
| **MacOS** | brew install proxychains        |

* proxychains4的安装

| 系统   | 安装命令                        |
| ------ | ------------------------------- |
| **Ubuntu** | sudo apt install -y proxychains4 |
| **centos** | yum install -y proxychains4      |
| **MacOS** | brew install proxychains4        |

### 编译安装

```shell
git clone https://github.com/haad/proxychains
# git clone --depth=1 https://github.com.cnpmjs.org/haad/proxychains.git 国内镜像安装
cd proxychains
./configure
sudo make && make install
```
这里不推荐使用编译安装。因为这个地址国内经常镜像出问题。而假如你可以直接从原地址下载的话，你已经不需要使用这个代理或者已经在使用这个代理了。


```shell
git clone https://github.com/rofl0r/proxychains-ng
# git clone --depth=1 https://github.com.cnpmjs.org/rofl0r/proxychains-ng.git 国内镜像安装
cd proxychains-ng
./configure
sudo make && make install
```
## 配置使用/etc/proxychains.conf

### 查找配置文件
```shell
which proxychains
whereis proxychains
```
两个命令都可以。
一般是存放在在根目录下的/etc/proxychains.conf
![20200729140944_08e3adb1728f8879c3f6fac1226fd6b4.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729140944_08e3adb1728f8879c3f6fac1226fd6b4.png)
### 修改配置文件
```shell
vim /etc/proxychains.conf
```
s


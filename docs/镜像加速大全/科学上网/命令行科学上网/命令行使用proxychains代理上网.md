---
title: 命令行使用proxychains代理上网
description: 搞清楚了proxychains与proxychains4的区别，接下来让我们来使用这个工具
---
# 命令行使用proxychains代理上网


proxychains\-ng 是 proxychains 的加强版，主要有以下功能和不足：

*   支持 http/https/socks4/socks5
*   支持认证
*   远端 dns 查询
*   多种代理模式
*   不支持 udp/icmp 转发
*   少部分程序和在后台运行的可能无法代理

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

### 编译安装压缩包下载地址
[proxychains4下载地址](https://sourceforge.net/projects/proxychains-ng/files/)
![20200729151459_056f1ada1590d04237a4f07b26b80272.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729151459_056f1ada1590d04237a4f07b26b80272.png)
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

![20200729142302_eab57676f5c8db33e2d81d383f38ce4c.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729142302_eab57676f5c8db33e2d81d383f38ce4c.png)

简单来说，把最后一行注销，然后修改成你代理所在的端口即可。

## 软件使用
> 使用前我们先进行测试

### 测试

![20200729143755_a73c8df1856d30e7995b88b2be7a1ff3.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729143755_a73c8df1856d30e7995b88b2be7a1ff3.png)
如上图所示，使用两行命令来测试。

```shell
curl myip.ipip.net
proxychains curl myip.ipip.net 
```
根据以上情况，即可判断软件已经安装成功，并且可以开始使用。

### 全局使用
```
proxychains4 zsh # zsh可以换成你的shell
```
以上命令会打开一个终端，全局代理。
![20200729143113_1e8b65ebc5fa94f2779ca5f70fd5909b.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729143113_1e8b65ebc5fa94f2779ca5f70fd5909b.png)
如上图所示，在没用使用proxychains4的情况下，我这边的地理位置还是我的代理服务器所在位置。

### 临时使用
软件名称前加proxychains。
```shell
proxychains curl www.google.com
```
### 设置alias(别名)使用

```shell
alias pc="proxychains"
```
在你的配置文件里，添加以上命令，这样的话就可以快速的使用了。
配置文件一般放在：
* ~/.zhsrc
* ~/.bashrc
* ~/.bashrc_alias

![20200729144516_0cdfad34297d82774cceaafbad41f27e.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729144516_0cdfad34297d82774cceaafbad41f27e.png)

如上图所示。

### 代理终端

如果想要 shell 中执行的命令自动使用代理，可以通过下面命令
```shell
proxychains4 -q /bin/bash
proxychains4 -q /bin/zsh
```
 

让我们下载一个仓库。
![20200729145609_4772e0ab603b9fe352f5b28cb295edcd.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729145609_4772e0ab603b9fe352f5b28cb295edcd.png)
如上图所示，速度达到了惊人的3.36M每秒。

## 补充阅读

### 注意事项
>Proxychains支持HTTP（HTTP-Connect）、SOCKS4和SOCKS5三种类型的代理，需要注意的是：配置代理服务器只能使用ip地址，不能使用域名，否则会连不上。

### Proxychains支持3种模式

* **动态模式**
按照配置的代理顺序连接，不存活的代理服务器会被跳过  
* **严格模式**
按照配置的代理顺序连接，必须保证所有代理服务器都是存活的，否则会连接失败  
* **随机模式**
随机选择一台代理服务器连接，也可以使用代理链

### 不代理DNS
>如果不需要代理DNS的话，可以注释掉proxy_dns这行。

### proxychains命令其实是个脚本文件
内容如下：
```shell
#!/bin/sh
echo "ProxyChains-3.1 (http://proxychains.sf.net)"
if [ $# = 0 ] ; then
        echo "  usage:"
        echo "          proxychains <prog> [args]"
        exit
fi
export LD_PRELOAD=libproxychains.so.3
exec "$@"
```
>它的目的是设置LD_PRELOAD环境变量，以便创建的新进程会加载libproxychains.so.3，这个so的作用是Hook Socket函数。因此，也可以在当前shell中执行：

```shell
export LD_PRELOAD=libproxychains.so.3
```

> 这样之后执行的命令都会使用代理访问。

## 使用proxychains4本地回环访问绕过代理直连

不过这个版本有个问题，配置代理后所有的连接都会走代理，包括对回环地址的访问。这并不是我们所期望的，幸好有个版本提供了解决方案。

> git clone [https://github.com/rofl0r/proxychains](https://github.com/rofl0r/proxychains) cd proxychains ./configure make make install

安装后在配置文件中加入：

> localnet 127.0.0.0/255.0.0.0

安装后的命令是proxychains4，因此可以和旧版本命令并存。这样对于回环地址就可以绕过代理，使用直连了。

相对于Proxifier而言，这种方式还是弱了一点，毕竟有时候我们还是需要根据不同的情况使用不同的代理服务器。

## 通过 proxychains -ng 创建代理

使用 ProxyChains -NG 需要要先有代理，可以使用 SSH 建立隧道或使用 shadowsocks 建立代理

### 创建 SSH 隧道代理

```shell
ssh -f -g -N -D1081 root@p1.oneops.co
```
*   `-f` 放到后台执行
*   `-g` 允许远程 主机连接到本地转发端口
*   `-N` 不执行远程命令
*   `-D` 绑定转发端口


## 参考文献

[Ubuntu安装Proxychains](https://cloud.tencent.com/developer/article/1157554)
[在终端下使用ProxyChains-NG代理](https://www.oneops.co/2019/03/08/proxychains-ng.html)
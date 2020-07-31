---
title: pip常见问题以及解决办法
description: pip常见问题以及解决办法
---

## 问题描述
我卸载了`pip`，而我安装了`pip3`。现在，我想通过仅输入`pip3`来使用`pip`。原因是我习惯只键入`pip`，每个指南都使用`pip`命令，所以每次我想复制和粘贴命令时，我都要将`pip`修改为{{1浪费时间。当我输入`pip3`时，我有一个`pip`的错误，这意味着不会执行`pip: command not found`命令。是否可以将`pip`分指向`pip`？


### 解决办法一.alias别名解决法

通过修改配置文件，`~/.bashrc`或者`~/.zshrc`添加别名：
```shell
alias pip=pip3
```
改完后，
```shell
source ~/.bashrc # 如果是zsh就source~/.zshrc
```
即可.

### 解决办法二.添加到名为pip的$ PATH符号链接，指向pip3二进制文件

>（顺便说一句，即使关于pip并不是真正与python相关的问题，所以你应该重拍它）

将`/usr/bin/pip`备份/删除，从所需的pip版本建立符号链接。
```shell
sudo mv /usr/bin/pip /usr/bin/pipbackup # 备份文件
sudo rm -rf /usr/bin/pip           # 删除文件
sudo ln -s /usr/bin/pip3.8 /usr/bin/pip # 3.8是你的版本号，改成你对应的版本号。
```
### 解决办法三.修改pip二进制文件
pip实际上一个脚本。
我们通过
```shell
which pip
/usr/bin/pip # 这个是一般的安装位置
```
找到Pip的安装位置，然后
`sudo vim /usr/bin/pip`

```shell
#!/usr/bin/python2

# -*- coding: utf-8 -*-
import re
import sys

from pip._internal import main

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(main())
```
 我们看第一行，他指向的是python2，我们把2改成3即可。



### 解决办法四.软件包管理法

大多数软件包管理器应该允许您注册希望使用的版本，同时保持依赖关系，而不是在bash中手动创建自己的别名并希望它不会与任何冲突。

例如在Linux上：

```
sudo update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1

```

或在Mac上（MacPorts）：

```
port select --set pip pip3
```

## 储备知识

```shell
pip --version  # 查看pip的版本
pip3 --version # 查看pip3的版本
which pip      # 查看pip的安装位置
which pip3     # 查看pip3的安装位置
```

## 推荐解决办法

* 办法一，新手推荐。因为不会伤筋动骨，出了问题直接删除或者注释别名即可。
* 办法二、三，有一定linux基础的建议，这个是很好的处理方法。
* 办法四，软件包这块我个人不推荐，因为我也不知道为什么要这么做，最重要的是出了问题不知道如何解决。因为他很可能会伤害到环境。

## 参考文献
[https://www.thinbug.com/q/44455001](https://www.thinbug.com/q/44455001)
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



### 解决办法四:使用update-alternatives切换默认程序

> Linux 发展到今天，可用的软件已经非常多了。这样自然会有一些软件的功能大致上相同。例如，同样是编辑器，就有 nvi、vim、emacs、nano，而且我说的这些还只是一部分。大多数情况下，这样的功能相似的软件都是同时安装在系统里的，可以用它们的名称来执行。例如，要执行 vim，只要在终端下输入 vim 并按回车就可以了。不过，有些情况下我们需要用一个相对固定的命令调用这些程序中的一个。例如，当我们写一个脚本程序时，只要写下 editor，而不希望要为“编辑器是哪个”而操心。Debian 提供了一种机制来解决这个问题，而 update\-alternatives 就是用来实现这种机制的。

`update-alternatives --help` 命令输出，从该输出中可以获得很多有用信息：

```jsx
用法：update-alternatives [<选项> ...] <命令>

命令：
  --install <链接> <名称> <路径> <优先级>
    [--slave <链接> <名称> <路径>] ...
                           在系统中加入一组候选项。
  --remove <名称> <路径>   从 <名称> 替换组中去除 <路径> 项。
  --remove-all <名称>      从替换系统中删除 <名称> 替换组。
  --auto <名称>            将 <名称> 的主链接切换到自动模式。
  --display <名称>         显示关于 <名称> 替换组的信息。
  --query <名称>           机器可读版的 --display <名称>.
  --list <名称>            列出 <名称> 替换组中所有的可用候选项。
  --get-selections         列出主要候选项名称以及它们的状态。
  --set-selections         从标准输入中读入候选项的状态。
  --config <名称>          列出 <名称> 替换组中的可选项，并就使用其中
                           哪一个，征询用户的意见。
  --set <名称> <路径>      将 <路径> 设置为 <名称> 的候选项。
  --all                    对所有可选项一一调用 --config 命令。

<链接>  是指向 /etc/alternatives/<名称> 的符号链接。 (如 /usr/bin/pager)
<名称>  是该链接替换组的主控名。(如 pager)
<路径>  是候选项目标文件的位置。（程序的实际路径）(如 /usr/bin/less)
<优先级>  是一个整数，在自动模式下，这个数字越高的选项，其优先级也就越高。

选项：
  --altdir <目录>          改变候选项目录。
  --admindir <目录>        设置 statoverride 文件的目录。
  --log <文件>             改变日志文件。
  --force                  就算没有通过自检，也强制执行操作。
  --skip-auto              在自动模式中跳过设置正确候选项的提示
                           (只与 --config 有关)
  --verbose                启用详细输出。
  --quiet                  安静模式，输出尽可能少的信息。不显示输出信息。
  --help                   显示本帮助信息。
  --version                显示版本信息。
```

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
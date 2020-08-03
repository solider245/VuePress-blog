---
title : Linux下二进制安装Cheat软件方法
description : 很多网站上没有这个教程
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-03 16:23:53 +0800
categories:
 -
tags:
 -
---
[[toc]]
由于软件作者用GO语言重写了这个软件，所以导致网上的很多教程都不适用了。
这里写一个教程，方便大家。

## 下载文件后改名并解压到指定目录 
```shell
wget -c https://github.com/cheat/cheat/releases/download/4.0.0/cheat-linux-amd64.gz 
gunzip cheat-linux-amd64.gz  # 解压
sudo chmod 755 cheat-linux-amd64 #更改权限
sudo mv cheat-linux-amd64 /usr/local/bin/cheat # 更换目录并改名
cheat -v # 查看cheat命令

#国内用户加速下载地址
wget -c https://github.wuyanzheshui.workers.dev/cheat/cheat/releases/download/4.0.2/cheat-linux-amd64.gz 
```

![20200803172539_fdb93bb650e16e8f312bd84ca83b213b.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200803172539_fdb93bb650e16e8f312bd84ca83b213b.png)

::: warning

这里注意，有些比较老的版本是直接编译好的二进制版本，就不用解压缩了。

:::

### 设置环境变量

这里我给cheat的环境变量是/usr/local/bin/cheat ，有些系统里没有这个路径，所以你需要将以下内容添加到你的配置里。

```shell
export PATH=$HOME/bin:$HOME/usr/local/bin:/sbin:/usr/sbin:$PATH
```
将以上内容添加到你的配置里。
* `~/.zshrc`
* `~/.bashrc`

```shell
source ~/.zshrc
```


## cheat 配置

### 自动安装

第一次输入cheat时，系统会提醒你创建一个配置文件，默认就行。
然后系统会提示你是否下载备忘录，也就是预定的备忘录。
::: warning
如果可以自动安装请尽量自动安装，这样可以省去很多事
:::

### 手动安装

初始化配置文件
`mkdir -p ~/.config/cheat && cheat --init > ~/.config/cheat/conf.yml`

为community目录下载cheatsheets文件(就是plain text文件)

```shell
mkdir -p ~/.dotfiles/cheat/cheatsheets && cd ~/.dotfiles/cheat/cheatsheets
git clone https://github.com/cheat/cheatsheets community #需要这个cheatsheets的配合，才能正常使用
# git clone https://gitee.com/solider245/cheatsheets community #国内用户请用这个地址替代
mkdir -p ~/.dotfiles/cheat/cheatsheets/work
mkdir -p ~/.dotfiles/cheat/cheatsheets/personal

```

为什么要这么做呢？原因是：第一步下载下来的cheat二进制文件，并没有包含cheat提示的具体内容，每个命令的具体内容例子，是在一个专门的目录里面，一个命令就是一个普通的plain 文件，所有的cheat单，也放在这个git仓库：[https://github.com/cheat/cheatsheets](https://github.com/cheat/cheatsheets)，如果以后这个仓库有更新，可以
`cd ~/.dotfiles/cheat/community`
`git pull`

## cheat用法

### 官方用法
输入
```shell
cheat -h
``` 
可以看到cheat的常见用法和案例

```shell
Usage:
  cheat [options] [<cheatsheet>]

Options:
  --init                  Write a default config file to stdout
  -c --colorize           Colorize output
  -d --directories        List cheatsheet directories
  -e --edit=<cheatsheet>  Edit <cheatsheet>
  -l --list               List cheatsheets
  -p --path=<name>        Return only sheets found on path <name>
  -r --regex              Treat search <phrase> as a regex
  -s --search=<phrase>    Search cheatsheets for <phrase>
  -t --tag=<tag>          Return only sheets matching <tag>
  -T --tags               List all tags in use
  -v --version            Print the version number
  --rm=<cheatsheet>       Remove (delete) <cheatsheet>

Examples:

  To initialize a config file:
    mkdir -p ~/.config/cheat && cheat --init > ~/.config/cheat/conf.yml

  To view the tar cheatsheet:
    cheat tar

  To edit (or create) the foo cheatsheet:
    cheat -e foo

  To edit (or create) the foo/bar cheatsheet on the "work" cheatpath:
    cheat -p work -e foo/bar

  To view all cheatsheet directories:
    cheat -d

  To list all available cheatsheets:
    cheat -l

  To list all cheatsheets whose titles match "apt":
    cheat -l apt

  To list all tags in use:
    cheat -T

  To list available cheatsheets that are tagged as "personal":
    cheat -l -t personal

  To search for "ssh" among all cheatsheets, and colorize matches:
    cheat -c -s ssh

  To search (by regex) for cheatsheets that contain an IP address:
    cheat -c -r -s '(?:[0-9]{1,3}\.){3}[0-9]{1,3}'

  To remove (delete) the foo/bar cheatsheet:
    cheat --rm foo/bar
```

这里其他用户也给了一个管道的用法。
### Test and Use
To view the configured cheatpaths:
`cheat -d`
To list all available cheatsheets:
`cheat -l`

`cheat tar`
[![QQ截图20191201204820](https://user-images.githubusercontent.com/7934974/69914177-02946000-147c-11ea-8fc8-187fb3840998.jpg)](https://user-images.githubusercontent.com/7934974/69914177-02946000-147c-11ea-8fc8-187fb3840998.jpg)

`cheat tar |grep 'exclude'`
`cheat find |grep 'mtime' -B 1`


## 注意事项
1. 如果没有代理，下载速度会很慢
2. 如果找不到命令，记得在配置文件里增加路径
3. 如果执行错误，那么你可能下错了版本
4. 如果遇到cheat无法执行，那么可能是你对应的文件夹路径有问题，请使用
   ```shell
   vim ~/.config/cheat/conf.yml
   ```
5. 你的个人备忘录记得放在person文件夹   

![20200804052223_2a9a0620c924a9fdd2398b4caa5674e6.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200804052223_2a9a0620c924a9fdd2398b4caa5674e6.png)
如上图所示，查看你对应的路径是否有问题。
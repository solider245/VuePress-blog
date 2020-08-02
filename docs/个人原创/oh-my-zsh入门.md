---
title : oh-my-zsh入门
description : oh-my-zsh个人总结的配置以及插件主题
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-02 18:23:37 +0800
categories:
 -
tags:
 -
---
- [1. 序言](#1-序言)
- [2. 安装](#2-安装)
  - [2.1. 安装前先查看当前用户使用的`shell`](#21-安装前先查看当前用户使用的shell)
  - [2.2. 查看系统安装的shells](#22-查看系统安装的shells)
  - [2.3. 安装`zsh`](#23-安装zsh)
  - [2.4. 安装`oh-my-zsh`](#24-安装oh-my-zsh)
    - [2.4.1. `via curl`](#241-via-curlvia-curl)
    - [2.4.2. `via wget`](#242-via-wgetvia-wget)
    - [2.4.3. `Manual inspection`](#243-manual-inspectionmanual-inspection)
    - [2.4.4. 国内用户镜像加速安装](#244-国内用户镜像加速安装)
- [3. `oh-my-zsh`主题更换](#3-oh-my-zsh主题更换)
  - [3.1. 默认主题`robbyrussell`](#31-默认主题robbyrussell)
  - [3.2. 使用随机主题](#32-使用随机主题)
    - [3.2.1. 随机使用两个主题](#321-随机使用两个主题)
    - [3.2.2. 屏蔽主题](#322-屏蔽主题)
- [4. `oh-my-zsh`插件配置](#4-oh-my-zsh插件配置)
  - [4.1. 插件目录](#41-插件目录)
  - [4.2. 使用插件的方法](#42-使用插件的方法)
    - [4.2.1. 自带插件与外部插件的安装方法](#421-自带插件与外部插件的安装方法)
      - [4.2.1.1. 自带插件安装方法](#4211-自带插件安装方法)
      - [4.2.1.2. 外部插件安装方法](#4212-外部插件安装方法)
    - [4.2.2. 最常规的插件介绍](#422-最常规的插件介绍)
      - [4.2.2.1. 目录跳转插件](#4221-目录跳转插件)
        - [4.2.2.1.1. z插件的安装与使用](#42211-z插件的安装与使用)
        - [4.2.2.1.2. autojump插件的安装与使用](#42212-autojump插件的安装与使用)
      - [4.2.2.2. `zsh-autosuggestions`命令建议补全插件](#4222-zsh-autosuggestions命令建议补全插件)
      - [4.2.2.3. zsh\-syntax\-highlighting(命令语法高亮)](#4223-zsh-syntax-highlighting命令语法高亮)
      - [4.2.2.4. 目录增强插件——K](#4224-目录增强插件k)
      - [4.2.2.5. git-flow补全插件](#4225-git-flow补全插件)
- [5. 总结](#5-总结)
  - [5.1. 使用`oh-my-zsh`前先下载或者查看`zsh`有没有安装](#51-使用oh-my-zsh前先下载或者查看zsh有没有安装)
  - [5.2. 安装`oh-my-zsh`](#52-安装oh-my-zsh)
  - [5.3. 主题](#53-主题)
  - [5.4. 插件的下载、安装与设置](#54-插件的下载安装与设置)
    - [5.4.1. 下载位置](#541-下载位置)
    - [5.4.2. 安装位置](#542-安装位置)
    - [5.4.3. 修改完后操作](#543-修改完后操作)
    - [5.4.4. 常用插件批量下载](#544-常用插件批量下载)
    - [5.4.5. `~/.zshrc`默认配置](#545-zshrc默认配置)
![20200708043149_8327c5e881460a867dd791f3eb2df610.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200708043149_8327c5e881460a867dd791f3eb2df610.png)

# 1. 序言
>`shell`的历史比较悠久，现在Linux系统下默认的`shell`就是`bash`。尽管如此，相信大家接触命令行多了之后，都会感到十分的不方便。国外的计算机操作者也是有同样的感觉。因此某位大神发明了`zsh`，这个工具的有点是功能及其的强大，缺点是配置过于复杂。因此大神玩家玩转，而菜鸟玩家就只能望而兴叹了。
菜鸟玩家感慨的多了，就有大神站出来，为我们搞了一个`oh-my-zsh`，同样强大然而设置起来却要简单多了！（当然，对于新手来说，还是很难懂）

我们普通玩家可以跳过前面的`shell`直接来到`oh-my-zsh`即可。

# 2. 安装

## 2.1. 安装前先查看当前用户使用的`shell`

```shell
echo $SHELL  #查看当前用户shell
```
![20200707012133_17192770faa78d432afe4bb0e63c1b04.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707012133_17192770faa78d432afe4bb0e63c1b04.png)
如上图所示，如果你不是zsh那么你就要看看你有没有安装shell了。

## 2.2. 查看系统安装的shells

```shell
cat etc/shells
```
![20200707012245_a13ed2b95c135c86c9a124cd25a0676a.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707012245_a13ed2b95c135c86c9a124cd25a0676a.png)

如上图所示，我已经安装了`zsh`如果你没有的话，那你就要开始下载并且安装`zsh`了。

## 2.3. 安装`zsh`

`oh-my-zsh`是基于`zsh`的，所以我们先安装`zsh`。

```shell
apt install -y zsh #ubuntu版本安装
yum install -y zsh #centos版本安装
brew install zsh # MAC版本安装
```
安装好了之后记得重新输入:
```shell
cat etc/shells
```
查看当前shell。
确认安装好了之后，让我们切换当前用户的默认`shell`为`zsh`。
```shell
chsh -s /bin/zsh
```
如果对`chsh`命令不明白的话，可以输入`chsh -h`来查看用途。

```shell
➜  ~ chsh -h
用法：chsh [选项] [登录名]

选项：
  -h, --help                    显示此帮助信息并退出
  -R, --root CHROOT_DIR         chroot 到的目录
  -s, --shell SHELL             该用户帐号的新登录 shell
```
切换完成后记得重启服务器生效。
```shell
sudo reboot # 服务器重启命令
echo $SHELL # 重启后查看当前shell
```
安装完`zsh`后我们开始安装`oh-my-zsh`

## 2.4. 安装`oh-my-zsh`

哦，通过在终端中运行以下命令之一来安装My Zsh。 您可以使用 `curl` 或 `wget` ， 通过命令行在计算机上安装该软件 。

### 2.4.1. `[](#via-curl)via curl`

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 2.4.2. `[](#via-wget)via wget`

```shell
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 2.4.3. `[](#manual-inspection)Manual inspection`

从您尚不了解的项目中检查安装脚本是一个好主意。 为此，您可以先下载安装脚本，仔细检查安装脚本，然后一切正常，然后运行它：

```shell
curl -Lo install.sh https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh
sh install.sh
```
如果没有安装`git`的话可能会报错，所以记得提前安装`git`。

### 2.4.4. 国内用户镜像加速安装
```shell
git clone https://github.91chifun.workers.dev//https://github.com/ohmyzsh/ohmyzsh.git ~/.oh-my-zsh #先下载
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc # 然后覆盖文件
```
如果你连接`github`速度比较快的话，就不用使用这个加速了。

# 3. `oh-my-zsh`主题更换

主题的配置文件在`~/.zhsrc`.
使用：
```shell
sudo vim ~/.zshrc
```
打开文件后进行修改。修改完后输入下列命令更新配置生效：
```shell
source ~/.zshrc
```

## 3.1. 默认主题`robbyrussell`

![20200707022637_c0da39c210df55df49c798ca4b179aba.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707022637_c0da39c210df55df49c798ca4b179aba.png)

一般来说，新手使用这个主题就可以了，不用去动。
`https://github.com/ohmyzsh/ohmyzsh/wiki/Themes`
上面是主题的地址，喜欢哪个可以去选。我一般就使用默认的主题，以后大家有时间也可以去慢慢折腾。
系统自带主题放在目录`~/.oh-my-zsh/themes`下。
![20200707025927_678f7fe5f30622dbf6bb24ba7f4fc722.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707025927_678f7fe5f30622dbf6bb24ba7f4fc722.png)
高亮的就是你目前使用的主题。
由于是隐藏文件，记得使用`ls -a`来查看。

## 3.2. 使用随机主题

`ZSH_THEME="random"`
在你的配置文件，将`robbyrussell`修改为`random`即可进入随机主题。每次进入之后他会随机给你安排一个主题。

### 3.2.1. 随机使用两个主题

如果您想从自己喜欢的主题列表中选择随机主题，请执行以下操作：

```shell
ZSH_THEME_RANDOM_CANDIDATES=(
  "robbyrussell"
  "agnoster"
)
```
如上所示，把对应的文件删掉，修改为以上内容即可。每次进入后他会随机在这两个主题里载入。如果有更多更喜欢的，可以按照格式在下面添加。
![20200707023234_5ab7bfb65633bf4f0d56a3b5ddc7b516.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707023234_5ab7bfb65633bf4f0d56a3b5ddc7b516.png)

### 3.2.2. 屏蔽主题
如果只知道您不喜欢的主题，则可以将其类似地添加到黑名单中：

```shell
ZSH_THEME_RANDOM_BLACKLIST=(pygmalion tjkirch_mod)
```

# 4. `oh-my-zsh`插件配置

## 4.1. 插件目录
`oh-my-zsh`有几百个插件，很多插件都很细致化，大概有好几百个，而`oh-my-zsh`也自带了很多插件。
你可以在`~/.oh-my-zsh/plugins`目录中查看。

![20200707030244_6ffb350a89c42e51c875c022c589b3ca.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707030244_6ffb350a89c42e51c875c022c589b3ca.png)

每个插件都自带一个`README.md`自述文件，在安装插件前你可以进入插件目录查看。如果你有动手能力的话，你甚至可以徒手更改。

## 4.2. 使用插件的方法

```shell
sudo vim ~/.zshrc # 打开配置文件
```
![20200707023602_6e06497fb2c17b277756e11439b21923.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707023602_6e06497fb2c17b277756e11439b21923.png)
如上，`oh-my-zsh`的插件位置在上图所示。

如果你的插件比较多的话，他看起来会像这个样子。
```shell
plugins=( git bundler dotenv osx rake rbenv ruby )
```
如果你插件比较多话，建议你竖排显示，会比较直观。
例如，这可能开始看起来像这样：

```shell
plugins=(
  git
  bundler
  dotenv
  osx
  rake
  rbenv
  ruby
)
```
### 4.2.1. 自带插件与外部插件的安装方法

#### 4.2.1.1. 自带插件安装方法

`oh-my-zsh`有许多自带插件，安装的时候只需要按照前面的格式，在后面加上，然后输入：
```shell
source ~/.zshrc
```
让配置生效即可。
#### 4.2.1.2. 外部插件安装方法
外部插件一般需要下载，大多数插件一般都在`github`有地址。
这里有一部分精选的插件名单，有需要的可以直接去下载：
`https://project-awesome.org/unixorn/awesome-zsh-plugins`
### 4.2.2. 最常规的插件介绍
插件有很多，这里主要给大家介绍几种大家比较常见的插件:
#### 4.2.2.1. 目录跳转插件
##### 4.2.2.1.1. z插件的安装与使用
z是小写的，属于`oh-my-zsh`自带的插件。安装方法很简单，直接在plugins后面添加z，然后
```shell
source ~/.zshrc
```
即可。
掘金的大神已经总结好了z的用法，我这里直接粘贴过来，大家如果不过瘾可以去原帖看。
![20200707110114_34e6361c5a76abc397608fd1bde8580e.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707110114_34e6361c5a76abc397608fd1bde8580e.png)
##### 4.2.2.1.2. autojump插件的安装与使用

手动安装：
```shell
git clone git://github.com/wting/autojump.git #下载链接
cd autojump
./install.py 
# 卸载的话使用 ./uninstall.py
# 国内用户可以用下面这个加速下载地址，能下载就无视下面这条
git clone https://github.91chifun.workers.dev//https://github.com/wting/autojump.git 
```
![20200707111415_e7a0f0344a3b1cc325428c44d4d16d87.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707111415_e7a0f0344a3b1cc325428c44d4d16d87.png)


安装好后会提示你复制以下内容到`!/.zshrc`
```shell
[[ -s ~/.autojump/etc/profile.d/autojump.zsh ]] && . ~/.autojump/etc/profile.d/autojump.zsh
autoload -U compinit && compinit -u
```
然后记得在你的`plugins`添加`autojump`，出来后
```shell
source ~/.zshrc
```
即可使用。

使用方法：
`autojump -h` 帮助命令，可以查看主要的参数和用法

```shell
➜  ~ autojump --help
usage: autojump [-h] [-a DIRECTORY] [-i [WEIGHT]] [-d [WEIGHT]] [--complete]
                [--purge] [-s] [-v]
                [DIRECTORY [DIRECTORY ...]]

Automatically jump to directory passed as an argument.

positional arguments:
  DIRECTORY             directory to jump to

optional arguments:
  -h, --help            show this help message and exit
  -a DIRECTORY, --add DIRECTORY
                        add path
  -i [WEIGHT], --increase [WEIGHT]
                        increase current directory weight
  -d [WEIGHT], --decrease [WEIGHT]
                        decrease current directory weight
  --complete            used for tab completion
  --purge               remove non-existent paths from database
  -s, --stat            show database entries and their key weights
  -v, --version         show version information
```
只要你使用过cd命令切换过的目录，你可以直接使用j命令跳转到该目录
![20200707112507_d2746c820a47308deb6a7ddd972dd708.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707112507_d2746c820a47308deb6a7ddd972dd708.png)
如上所示，红字表示你直接跳转到的目录。

#### 4.2.2.2. `zsh-autosuggestions`命令建议补全插件
输入命令时候会给出建议，然后通过按键盘`→`补全。
![20200707115230_ffa6f622e381f0fb4d51ce6a9f8c5aec.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707115230_ffa6f622e381f0fb4d51ce6a9f8c5aec.png)
（预览图）

安装：
```shell
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```
还是在`~/.zshrc`中配置。
![20200707115334_951f5f5febe15139232a7053fef00c55.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707115334_951f5f5febe15139232a7053fef00c55.png)
如上图所示。
配置完后记得


`source ~/.zshrc`

这样的话基本就生效了。

调色：
> 当你重新打开终端的时候可能看不到变化，可能你的字体颜色太淡了，我们把其改亮一些：

```shell
cd ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
vim zsh-autosuggestions.zsh # 修改 ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=10'
```

#### 4.2.2.3. zsh\-syntax\-highlighting(命令语法高亮)

[**zsh\-syntax\-highlighting**](https://github.com/zsh-users/zsh-syntax-highlighting) 插件可以使你终端输入的命令有语法高亮效果。

> Before: ![clipboard.png](https://segmentfault.com/img/bVbn4Yz?w=210&h=18)
>  After:   ![clipboard.png](https://segmentfault.com/img/bVbn4YC?w=210&h=18)
>
> Before: ![clipboard.png](https://segmentfault.com/img/bVbn4YG?w=179&h=35)
>  After:   ![clipboard.png](https://segmentfault.com/img/bVbn4YH?w=179&h=35)
>
> Before: ![clipboard.png](https://segmentfault.com/img/bVbn4YI?w=100&h=18 "clipboard.png")
>  After:   ![clipboard.png](https://segmentfault.com/img/bVbn4YL?w=100&h=18)

安装方法如下（oh\-my\-zsh 插件管理的方式安装）：

1.Clone项目到`$ZSH_CUSTOM/plugins`文件夹下 (默认为 `~/.oh-my-zsh/custom/plugins`)

```shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# 5. 国内加速下载地址
git clone https://github.91chifun.workers.dev//https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

2.在 **Oh My Zsh** 的配置文件 (`~/.zshrc`)中设置:

```
plugins=(其他插件 zsh-syntax-highlighting)
```

3.运行 `source ~/.zshrc` 更新配置后重启

#### 4.2.2.4. 目录增强插件——K
> k是新的l，哟



**k** 是一个zsh脚本/插件，用于使目录列表更易读，在文件和目录上添加了一些颜色和一些git状态信息。


[![仓库git状态](https://raw.githubusercontent.com/supercrabtree/k/gh-pages/repo-dirs.jpg)](https://raw.githubusercontent.com/supercrabtree/k/gh-pages/repo-dirs.jpg)


[![仓库工作树git状态](https://raw.githubusercontent.com/supercrabtree/k/gh-pages/inside-work-tree.jpg)](https://raw.githubusercontent.com/supercrabtree/k/gh-pages/inside-work-tree.jpg)


文件大小从绿色（较小（<1k））到红色（较大（> 1mb））分级。

**人类可读的文件大小**

的人类可读文件的大小可以通过使用显示 `-h` 标志，这就要求 `numfmt` 命令是可用的。 OS X /达尔文没有 `numfmt` 默认命令，因此GNU的coreutils需要安装，它提供 `gnumfmt` 的是 `k` 还将如有，请使用。 GNU coreutils可以通过 [自制软件](http://brew.sh) 安装在OS X上 ：

```
brew install coreutils

```

[![文件重量颜色](https://raw.githubusercontent.com/supercrabtree/k/gh-pages/file-size-colors.jpg)](https://raw.githubusercontent.com/supercrabtree/k/gh-pages/file-size-colors.jpg)


日期随着年龄而消失。

[![烂日期](https://raw.githubusercontent.com/supercrabtree/k/gh-pages/dates.jpg)](https://raw.githubusercontent.com/supercrabtree/k/gh-pages/dates.jpg)

**安装**
将k克隆到您的自定义插件仓库中

```shell
git clone https://github.com/supercrabtree/k $ZSH_CUSTOM/plugins/k
# 6. 国内用户加速地址
git clone https://github.91chifun.workers.dev//https://github.com/supercrabtree/k.git $ZSH_CUSTOM/plugins/k
```

然后作为插件加载到您的 `.zshrc`

```shell
plugins=(k)
```
补一张使用前和使用后的效果图。
![20200707182745_4a5e7f3f8bf1558750046ef66a0b8023.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707182745_4a5e7f3f8bf1558750046ef66a0b8023.png)

#### 4.2.2.5. git-flow补全插件

git-flow的命令很长，同时系统一般也没有做自动补全，因此加一个非常有必要。

**安装**
```shell
git clone https://github.com/bobthecow/git-flow-completion ~/.oh-my-zsh/custom/plugins/git-flow-completion
# 7. 国内用户加速地址
git clone https://github.91chifun.workers.dev//https://github.com/bobthecow/git-flow-completion.git ~/.oh-my-zsh/custom/plugins/git-flow-completion
```
安装好后，编辑`~/.zshrc`然后保存，并且`source`生效。

# 5. 总结

## 5.1. 使用`oh-my-zsh`前先下载或者查看`zsh`有没有安装

```shell
cat etc/shells 
# 不同版本下安装zsh
apt install -y zsh #ubuntu版本安装
yum install -y zsh #centos版本安装
brew install zsh # MAC版本安装
```
安装好了记得更换默认shell:
```shell
chsh -s /bin/zsh
```
## 5.2. 安装`oh-my-zsh`

```shell
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# 国内用户镜像加速下载安装
git clone https://github.91chifun.workers.dev//https://github.com/ohmyzsh/ohmyzsh.git ~/.oh-my-zsh #先下载
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc # 然后覆盖文件
```
## 5.3. 主题
>一般默认主题即可，有一定技巧后可以选择去更换主题。

## 5.4. 插件的下载、安装与设置

### 5.4.1. 下载位置
系统自带插件位置在`/home/ubuntu/.oh-my-zsh/plugins`
下载的的自定义插件安装位置在`/home/ubuntu/.oh-my-zsh/custom/plugins`
放在这两个位置都能生效。
### 5.4.2. 安装位置
在`~/.zshrc`文件里的
```shell
plugins =(git z ... ... )
```
![20200707232947_bba85a61228d5fd5f5ce0372c5da16bf.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200707232947_bba85a61228d5fd5f5ce0372c5da16bf.png)

类似这种位置，两种文件的摆放形式都行，看个人喜欢。
### 5.4.3. 修改完后操作
```shell
source ~/.zshrc
```
### 5.4.4. 常用插件批量下载

```shell
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
# 代码补全插件
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# 语法高亮插件
git clone https://github.com/supercrabtree/k $ZSH_CUSTOM/plugins/k
# 目录增强插件
git clone https://github.com/bobthecow/git-flow-completion ~/.oh-my-zsh/custom/plugins/git-flow-completion
# git-flow补全插件
```
和`github`速度连接比较慢的可以用以下加速地址替换
```shell
# 代码补全插件
git clone https://github.91chifun.workers.dev//https://github.com/wting/autojump.git 
# 语法高亮插件
git clone https://github.91chifun.workers.dev//https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# 目录增强插件
git clone https://github.91chifun.workers.dev//https://github.com/supercrabtree/k.git $ZSH_CUSTOM/plugins/k
# git-flow补全插件
git clone https://github.91chifun.workers.dev//https://github.com/bobthecow/git-flow-completion.git ~/.oh-my-zsh/custom/plugins/git-flow-completion
```
上述文件下载后，进行配置
### 5.4.5. `~/.zshrc`默认配置
```shell
plugins=(z git autojump zsh-autosuggestions zsh-syntax-highlighting zsh-completions k git-flow-completion)
```
插件配置如上。（由于`autojump`设置有点复杂，就不追加在这里了）
然后输入:
```shell
source ~/.zshrc
```
即可大功告成。
后续的配置就要大家自己去设置了。

---
title : 开发运维必备，Golang开发完美的系统模糊搜索补全工具Fzf
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-15 23:55:53 +0800
categories:
 -
tags:
 -
---
[[toc]]

## 序言
**Fzf**是一款小巧，超快，通用，跨平台的命令行模糊查找器，可帮助您在Linux和Windows操作系统中快速搜索和打开文件。 它是可移植的，没有依赖性，并且具有灵活的布局，支持Vim / Neovim插件，键绑定和模糊自动完成。

以下GIF显示了它的工作原理。

![](https://www.howtoing.com/wp-content/uploads/junegunn/i/master/fzf.gif)

要安装**Fzf** ，您需要将fzf的Github存储库git克隆到任何目录并运行安装脚本，如Linux发行版所示。

```
$ git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf $ cd ~/.fzf/ $ ./install

```
运行脚本后，系统将提示您启用模糊自动完成，键绑定并更新shell配置文件。 对问题回答`y` （对于**是** ），如以下屏幕截图所示。

[![](https://www.howtoing.com/wp-content/uploads/2018/11/run-fzf-installation-script.png)
](https://www.howtoing.com/wp-content/uploads/2018/11/run-fzf-installation-script.png)

在Linux中安装Fzf

在**Fedora 26**及更高版本和**Arch Linux上** ，您可以通过包管理器安装它，如图所示。

```
$ sudo dnf install fzf #Fedora 26+ $ sudo pacman -S fzf #Arch Linux

```
现在您已经安装了**fzf** ，您可以开始使用它了。 当你运行**fzf时** ，它会打开一个交互式查找程序; 从**stdin**读取文件列表，并将所选项写入**stdout** 。

只需在提示中键入要查找的文件的名称。 找到它后，单击enter，文件的相对路径将打印到**stdout** 。

$ fzf

[![](https://www.howtoing.com/wp-content/uploads/2018/11/fzf-prompt.png)
](https://www.howtoing.com/wp-content/uploads/2018/11/fzf-prompt.png)

Fzf提示

或者，您可以将要搜索的文件的相对路径保存到命名文件，并使用[cat命令](https://www.howtoing.com/13-basic-cat-command-examples-in-linux/)或[bcat](https://www.howtoing.com/bat-a-cat-clone-with-syntax-highlighting/)等实用程序查看文件的内容。

```
$ fzf >file
$ cat file
OR
$ bat file

```
例如，您也可以将它与[find命令](https://www.howtoing.com/35-practical-examples-of-linux-find-command/)结合使用。

```
$ find ./bin/  -type f | fzf >file
$ cat file

```
### 如何在Bash和Zsh中使用模糊完成

要触发文件和目录的模糊完成，请将`**`字符添加为触发序列。

```
$ cat **<Tab>

```
[![](https://www.howtoing.com/wp-content/uploads/2018/11/auto-completion-of-filenames.png)
](https://www.howtoing.com/wp-content/uploads/2018/11/auto-completion-of-filenames.png)

自动完成文件名

您可以在命令行中使用环境变量时使用此功能。

```
$ unset **<Tab> $ unalias **<Tab> $ export  **<Tab>

```
[![](https://www.howtoing.com/wp-content/uploads/2018/11/auto-completing-env-varibales-in-Linux.png)
](https://www.howtoing.com/wp-content/uploads/2018/11/auto-completing-env-varibales-in-Linux.png)

在Linux中自动完成Env变量

这同样适用于**ssh**和**telnet**命令，用于自动完成从**/ etc / hosts**和**〜/ .ssh / config**读取的主机名。

```
$ ssh **<Tab>

```
[![](https://www.howtoing.com/wp-content/uploads/2018/11/auto-completing-hostnames-ssh-command.png)
](https://www.howtoing.com/wp-content/uploads/2018/11/auto-completing-hostnames-ssh-command.png)

自动完成主机名

它也适用于[kill命令](https://www.howtoing.com/kill-processes-unresponsive-programs-in-ubuntu/) ，但没有显示的触发序列。

$ kill \-9  <Tab\>

[![](https://www.howtoing.com/wp-content/uploads/2018/11/auto-completion-for-kill-command.png)
](https://www.howtoing.com/wp-content/uploads/2018/11/auto-completion-for-kill-command.png)

杀死命令的自动完成

### 如何启用fzf作为Vim插件

要将**fzf**作为vim插件启用，请在Vim配置文件中附加以下行。

set rtp+=~/.fzf

**fzf**正在积极开发中，可以使用以下命令轻松升级到最新版本。

```
$ cd ~/.fzf && git pull && ./install

```
要查看完整的使用选项列表，请运行**man fzf**或查看其Github存储库： [https](https://github.com/junegunn/fzf) ： [//github.com/junegunn/fzf](https://github.com/junegunn/fzf) 。

**另请阅读** ： [Silver Searcher - 程序员的代码搜索工具](https://www.howtoing.com/the-silver-searcher-a-code-searching-tool-for-linux/)

**Fzf**是一款超快速且通用的模糊查找器，用于在Linux中快速搜索文件。 它有许多用例，例如，您可以为shell配置自定义用法。 如果您有任何问题或意见，请通过下面的反馈表联系我们。
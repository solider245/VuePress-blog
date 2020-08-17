---
title : 通过Git Hooks实现自动部署
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-18 07:31:42 +0800
categories:
 -
tags:
 -
---
[[toc]]
Linus开发的Git不只是提供了多人合作开发的新方式，还提供了自动化部署的优秀（快糙猛）解决方案。

为什么需要自动化部署？
-----------

*   当在本地计算机完成服务器应用程序开发之后，需要把程序安装到服务器上，这样的安装过程一般称之为部署。
*   部署一般分为文件复制、重启服务、安装依赖等（PHP是世界上最好的语言！）。
*   每次开发完成一个版本都需要部署一次。而部署工作属于多次重复劳动。
*   身为合格的程序员，应该把一切能够自动化的劳动自动化。

通过Git Hooks实现的自动化部署，将实现敲入git push命令后，自动完成整个部署过程。

什么是Hook？
--------

很多人把Hook翻译成「钩子」（计算机行业很多中文译名都难以理解），但根据[维基百科](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Hooking)，Hook一般指拦截软件组件或操作系统之间的通信信息，并进行处理的代码。那么对应到Git是怎样的呢？[Git Hooks](https://link.zhihu.com/?target=https%3A//git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)提供了多种形式的Hook，以pre-commit为例，该Hook将拦截git commit操作，运行名叫pre-commit的脚本，且仅当脚本返回值为0时进行真正的commit操作。

那么自动部署所需使用的Hook名为post-receive. 该Hook将在服务器端的bare repository接收到push信息并完成push操作后，进行执行；无法中断客户端（Client）的push过程。

可能浏览完上面的介绍，还是不太明白Hook是什么。简单地说，Hook是一种特殊的脚本（代码），仅在满足特定条件时执行。Git Hooks分别有对应各种操作的Hook，可以在git repository的.git/hooks目录下看到。

```shell
$ ls
applypatch-msg.sample     pre-commit.sample         prepare-commit-msg.sample
commit-msg.sample         pre-push.sample           update.sample
post-update.sample        pre-rebase.sample
pre-applypatch.sample     pre-receive.sample
```

以上的脚本文件（可以用编辑器打开）就是Hook了。可以看到脚本文件的后缀名都是sample，也就是说，这些都是Git自带的Hook示例，并不会真正地被执行，真正被执行的Hook是没有后缀的。若要启用pre-push的Hook（在push操作前执行脚本，脚本返回值为0时执行push操作），在hooks目录下新建一个pre-push的文件（没有后缀名）。

在脚本中，你可以写Bash、Python、JavaScript等代码，Git通过[Shebang](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/Shebang)来选择执行代码的解释器。如果要写Bash，Shebang可以是这样：

使用Windows的读者请注意，如果脚本文件含有BOM（字节序标识符），可能会导致一些问题。

当完成脚本编写后，别忘了添加“可执行”的权限：

如果之前的步骤都没出问题，那么一个Hook就基本完成了。

正确的（行为符合预期的）Git Hook需要具备的
-------------------------

*   正确无误的文件名：pre-receive、commit-msg等
*   Hook脚本文件具备“可执行”权限
*   bug free的脚本代码，以及脚本解释器被正确引入、

最后一项显然要困难得多，那么进入下一话题。

如何测试Git Hooks
-------------

编写Hook并非一蹴而就，其中可能遇到各种各样的问题。那么我们需要一种方式来测试Git Hooks，基本思想是先进行一次Git操作，记录下脚本运行期间的上下文（详细来说就是环境变量，用户输入等，上下文是它们的抽象）。

下面以测试post-receive为例，进行测试环境的搭建。根据资料和实践，post-receive Hook将对每个commit读取三个变量，第一个是上一个commit的ID，第二个是当前commit的ID，最后一个是当前commit的分支。

下面的命令基于Bash，将建立一个remote.git（bare repository）和一个local（repository）目录，Git远程库的命名一般使用.git和其他目录区分，但并非强制。

```shell
$ git init --bare remote.git
$ git clone remote.git local
$ ls
local      remote.git
```

使用以下代码获取三个变量（注意文件名和执行权限）

```shell
#!/bin/bash

# 使用while循环是有必要的，因为一次push可能含多个commit
while read oldrev newrev refname 
do
  echo oldrev: $oldrev
  echo newrev: $newrev   
  echo refname: $refname
done
```

之后在local中进行git操作，就能看到三个变量。得到三个变量后，就能单独执行post-receive了。实际上是有模拟用户输入的方法的（使用[expect](https://link.zhihu.com/?target=https%3A//likegeeks.com/expect-command/)），但post-receive不需要那么复杂（省得又学一个工具不是美滋滋），直接利用Unix管道即可。

```shell
echo "129aoisdj zkjcnaxj master" | ./post-receive
```

上面的命令执行，对于Hook而言，和收到包含一个commit的push等价，免去了假装add commit push的麻烦。

Git Hooks与root命令
----------------

有时在部署中需要用到root权限，例如重启应用；安全的方法是将root命令放在独立的脚本中，然后设置文件权限，允许脚本无密码运行。

```shell
# 假设脚本为/home/production/restart.sh
sudo chown root:root /home/production/restart.sh
sudo chmod 700 /home/production/restart.sh
```

然后执行sudo visudo，在打开的文件中加入以下一行：

```shell
production  ALL=(ALL) NOPASSWD: /home/production/restart.sh
```

示例：Python Web应用利用post-receive进行自动部署
-----------------------------------

```shell
#!/bin/bash
WORKTREE=/home/production/website
CONFIG=requirements.txt

while read oldrev newrev ref 
do
    if [[ $ref =~ .*/master$ ]]; # 仅允许master分支部署
    then
        echo "Pull to worktree..."
        #echo "$oldrev $newrev"
        cd $WORKTREE
        unset GIT_DIR
        git pull &> /dev/null
        # install PyPI packages
        git diff --quiet $oldrev $newrev -- $CONFIG
        source $WORKTREE/venv/bin/activate
        echo "virtualenv activated"
        if [ "$?" -eq "1" ] # 当requirements.txt被修改时，安装依赖
        then
            echo "requirements.txt changed"
            export LC_ALL=C
            echo "install packages..."
            pip3 install -r requirements.txt
        else
            echo "requirements.txt does not changed"
        fi
        sudo /home/production/restart.sh # 重启服务
        echo "deployment complete"
    else
        echo "This is not master branch, and it will not be deployed"
    fi
done
```
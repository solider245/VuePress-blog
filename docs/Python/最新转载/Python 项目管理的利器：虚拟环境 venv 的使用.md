---
title: Python 项目管理的利器：虚拟环境 venv 的使用
---
# 一、引言

最近在学习《Flask Web Development 2nd Edition》的时候，作者开篇就介绍如何使用 venv 来管理 Python 环境 。自我觉得作者讲的非常好，想要将其总结下来，方便自己日后查询，也方便各位学习 Python 的同学一起学习。

众所周知，项目的环境管理一直是比较头疼的问题，如果有两个项目，一个用的是 a 库的 v1 版本，一个用的是 a 库的 v2 版本，那么如果 a 库是安装在系统环境下的，就会出现项目所依赖的库文件版本不对的问题。

Python 社区为了解决这个问题，提出了虚拟环境的概念。也就是人为的创建一个虚拟环境供项目运行，而该项目需要什么库文件，则自行在这个虚拟环境中下载安装，而在虚拟环境中下载安装的库文件，是不会影响到系统环境中的库文件的。有了虚拟环境的概念， Python 的项目管理也就不那么麻烦了。

接下来，我来总结下如何使用 Python 的虚拟环境。

ps: 以下的讲解都是在 Python3 的前提之下。

# 二、venv

鉴于 Python3 中以标准库的形式包含了 venv 工具，因此就不再讲解 venv 工具的安装了。

不过 Ubuntu 环境是需要自行下载安装的，运行命令如下：

```
$ sudo apt-get install python3-venv
```

**1.** 创建虚拟环境
这里，假定你已经拥有了 venv 工具，我们直接打开命令行工具

Windows 平台下运行：

```
py -3 -m venv venv
```

MacOS 或者 Linux 平台下运行：

```
python3 -m venv venv
```

运行完这行命令，应该可以在当前目录下看到新建的一个文件夹，名为 venv，其就是虚拟环境的名称，并且以后我们在虚拟环境中所有的操作以及下载的库文件，都会在这个文件夹中。
![1](https://img-blog.csdn.net/20180720185730986?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI4MTQ4NTY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**2.** 激活虚拟环境
创建了虚拟环境却没有激活的话，你还是处于系统环境中。怎么激活虚拟环境呢？

Windows 平台下运行：

```
venv\Scripts\activate
```

MacOS 或者 Linux 平台下运行：

```
source venv/bin/activate
```

这里 venv 是你的虚拟环境的名字。运行完之后，自动会刷新命令行界面，以括号内嵌虚拟环境名字的形式提示用户，现在是处于 venv 虚拟环境中。
![2](https://img-blog.csdn.net/20180720185742272?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI4MTQ4NTY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**3.** 使用虚拟环境
虚拟环境除了 Python 一些核心的包、pip 工具等等，其他都没有，因此，当前项目需要什么，则使用 pip 工具下载即可。

其他的使用方法，与系统环境下的使用没有什么不同。

**4.** 退出虚拟环境
退出虚拟环境很简单，各平台都是一样的：

```
deactivate
```

从虚拟环境中退出到系统环境是很明显的，因为前面的虚拟环境名称提示符消失了。
![3](https://img-blog.csdn.net/20180720190201469?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI4MTQ4NTY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

# 三、在 PyCharm 中配置当前项目虚拟环境

venv 是很好用，但是我们该如何在 PyCharm 中配置当前项目所使用的环境呢？

**1.** 进入 Project Interpreter 界面
我们打开 PyCharm，菜单栏选择 File，点击 Settings，进入到设置界面，然后配置 Project Interpreter
![4](https://img-blog.csdn.net/20180720190548991?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI4MTQ4NTY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**2.** 添加虚拟环境
在 Project Interpreter 文本框右侧点击齿轮按钮，点击 Add。
![5](https://img-blog.csdn.net/20180720190956776?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI4MTQ4NTY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
然后，选择 Virtualenv Environment 标签卡，选择 Existing enviroment（选择上面那个应该可以直接新建一个环境，这里为了续接上一节中的环境，则直接选择了已存在的环境），这里，如果 PyCharm 没有找到你新建的环境，则需要你自己去打开文件找到你虚拟环境中的 Scripts 目录下的 python.exe 解释器文件。

**3.** 测试运行
最后点击 OK，即可看到环境列表多了一行。这里，我们可以在项目中切换各个环境进行自己当前项目的测试，还是很方便的。

# 四、总结

不得不说，venv 还是给了我不少的惊喜。也就像《Flask Web Development 2nd Edition》的作者所说的：

> 在系统环境中，使用最基本的 Python 解释器提供虚拟环境 venv 的功能，然后在各个虚拟环境中完成我们的项目，这样是比较好的项目组织方式。

上述话语是意译，我也比较认可作者的这一个看法，这样能让我们的系统环境非常的干净，却又能够非常好的管理各个项目。

不过同样的话，《Head First Python 2nd Edition》的作者也说过：

> We recommend you slowly back away from people who say that you aren’t a proper Python programmer unless you use virtualenv.

总之，使用虚拟环境肯定能够带来好处，但是盲目推崇也是不好的。

Enjoy Venv,
To be Stronger：）

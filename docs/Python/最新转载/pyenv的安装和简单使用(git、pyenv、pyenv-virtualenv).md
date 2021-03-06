---
title: pyenv的安装和简单使用（git、pyenv、pyenv-virtualenv）
---
![pyenv的安装和简单使用（git、pyenv、pyenv-virtualenv）](https://s4.51cto.com/images/blog/202004/20/3d2374ad539480b6878a5012c265d7b2.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=)

## **Python工作环境管理**

**Python 2和Python 3之间存在着较大的差异，并且，由于各种原因导致了Python 2和Python 3的长期 共存。在实际工作过程中，我们可能会同时用到Python 2和Python 3，因此，需要经常在Python 2和 Python 3之间进行来回切换。此外，如果你是喜欢尝鲜的人，那么，你很有可能在Python新版本出来 的时候立即下载Python的版本，试验Python的特性。**

**在Python世界里，除了需要对Python的版本进行管理以外，还需要对不同的软件包进行管理。大部分 情况下，对于开源的库我们使用版本即可。但是，有时候可能需要对相同的Python版本，在不同的 项目中使用不同版本的软件包。**

**在这一节里，我们将介绍两个工具，即pyenv和virtualenv。前者用于管理不同的Python版本，后者用 于管理不同的工作环境。有了这两个工具，Python相关的版本问题将不再是问题。**

## 1、问题情景

1.  **Python解释器版本混乱, 2和3差别巨大, 而且细分版本也不尽相同, 难以选择和管理.**
2.  **不同Linux发行版自带Python不同, 如ubuntu16自带2.7和3.5版本, 其中系统许多组件依赖于自带解释器, 一旦删除或者更改都可能会造成系统出问题.**
3.  **不同的Python解释器软件包管理也是问题, 如pip和ipython等必备包组件, 而且在项目开发中如何保证不同的包环境互不干扰也是一个问题.**

**那么有没有一个终极的解决办法能在管理不同解释器版本的同时控制不同的包环境呢? 有的, 就是pyenv.**

## 2、使用pyenv管理不同的Python版本

**安装不同的Python版本并不是一件容易的事情，在不同的Python版本之间来回切换更加困难，而且， 多版本并存非常容易互相干扰。因此，我们需要一个名为pyenv的工具。pyenv是一个Python版本管理 工具，它能够进行全局的Python版本切换，也可以为单个项目提供对应的Python版本。使用pyenv以 后，可以在服务器上安装多个不同的Python版本，也可以安装不同的Python实现。不同Python版本之 间的切换也非常简单。接下来我们就一起看一下pyenv的安装和使用。**

## 3、pyenv是什么? 能干什么?

> **pyenv是一个forked自ruby社区的简单、低调、遵循UNIX哲学的Python环境管理工具, 它可以轻松切换全局解释器版本, 同时结合vitualenv插件可以方便的管理对应的包源.**

**我们知道, 在terminal中输入一个命令比如‘ls’时, shell会从当前环境的PATH中的各个目录里看是不是有ls这个可执行文件, 如果找到就执行, 否则就会报‘command no found’ 的错误, 同理, 只要控制PATH变量就能够做到python版本的切换, pyenv通过在PATH头部插入shims路径来实现对python版本的控制.**

![pyenv的安装和简单使用（git、pyenv、pyenv-virtualenv）](https://s4.51cto.com/images/blog/202004/20/8a746d4f9999638006aca6357e3b75a8.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=)

#### **pyenv和流行的pipenv、virtualenv的关系**

**pipenv是requests 作者 Kenneth Reitz大神写的一个python虚拟环境管理工具, 结合了pip和virtualenv的功能, 侧重点还是在包环境管理上, 使用思路是先创建一个指定python版本的环境, 然后在此环境上安装相应的包, 好评不错, 看到很多大牛都在推荐.**

**virtualenv是一个比较传统成熟的虚拟环境管理工具了, 用的人也比较多, 思路也是创建虚拟环境, 然后安装相应的包, 要进入环境就source一下activate脚本激活一下, 尽管成熟, 但是我个人不太喜欢用, 在部署项目的时候老是容易出现一些环境问题.**

**pyenv相对来说知名度就差很多了, 不过也很稳定, 这三个环境管理工具我都用过, 我个人更喜欢pyenv, 理由如下:**

*   **相对于其他两个工具, pyenv更侧重在python 解释器版本管理上, 比包管理更大一个层级, 使用pyenv我可以方便的下载指定版本的python解释器, pypy, anaconda等, 可以随时自由的在shell环境中本地、全局切换python解释器**
*   **开发的时候不需要限定某个版本的虚拟环境, 只需要在部署的时候用pyenv指定某个版本就好了**
*   **pyenv切换解释器版本的时候, pip和ipython以及对应的包环境都是一起切换的, 所以如果你要同时运行ipython2.x和ipython3.x多个解释器验证一些代码时就很方便**
*   **pyenv也可以创建好指定的虚拟环境, 但不需要指定具体目录, 自由度更高, 使用也简单**

## 4、简单使用

```shell
# 查看当前版本
pyenv version

# 查看所有版本
pyenv versions

# 查看所有可安装的版本
pyenv install --list

# 安装指定版本
pyenv install 3.6.5
# 安装新版本后rehash一下
pyenv rehash

# 删除指定版本
pyenv uninstall 3.5.2

# 指定全局版本
pyenv global 3.6.5

# 指定多个全局版本, 3版本优先
pyenv global 3.6.5 2.7.14

# 实际上当你切换版本后, 相应的pip和包仓库都是会自动切换过去的
```

# 一、pyenv安装

## **linux环境**

| **版本** | **主机** | **环境** |
| --- | --- | --- |
| **centos7.6** | **192.168.1.80** | **python3** |

## **1、安装git**

```shell
[root@python ~]# yum install git
```

## **2、开启终端**

**本文使用 bash**

## **3、安装 pyenv**

***说明：本文的所有安装都严格遵守官方文档，与官方文档完全保持一致。\\***

**git 地址：[https://github.com/pyenv/pyenv](https://github.com/pyenv/pyenv)**

**在你的终端中执行如下命令，安全无毒，请放心食用：**

**首先把项目克隆下来，放在家目录下的隐藏文件夹中：.pyenv**

```shell
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```

**然后配置环境变量**

##### **如果你使用 bash，就依次执行如下命令：**

```shell
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n eval "$(pyenv init -)"\nfi' >> ~/.bashrc
```

##### **如果你使用 zsh，就依次执行如下命令：**

```shell
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n eval "$(pyenv init -)"\nfi' >> ~/.zshrc
```

**echo 命令的含义是：将引号中内容写入某文件中**
**请注意，以上的三条 echo 命令的最后一条长长的命令，请你保证它引号中的内容处于 ~/.bashrc 或者 ~/.zshrc 的最底部。**
**因为在 pyenv 初始化期间会操作 path 环境变量，导致不可预测的行为。**
**查看文件的底部内容，可以使用 tail 命令，用法：tail ~/.bashrc 或者 tail ~/.zshrc，编辑文件可以使用 vim 或者 vscode**

**最后，在使用 pyenv 之前，重新初始化 shell 环境，执行如下命令**

```shell
exec $SHELL
```

**不执行该命令也是完全可以的，你可以关闭当前的终端窗口，重新启动一个就可以了。**

**此时，你已经完成了 pyenv 的安装了，你使用可以它的全部命令了，但是我建议你先别急着用，一口气装完 pyenv 的一个插件，那就是 pyenv\-virtualenv**

## 4、安装 pyenv\-virtualenv

**virtualenv本身是一个独立的项目，用以隔离不同项目的工作环境。例如，用户lmx希望在项目A中使用 Flask 0.8这个版本，与此同时，又想在项目B中使用Flask 0.9这个版本。如果我们全局安装Flask，必然 无法满足用户的需求。这个时候，我们就可以使用virtualenv。**

**读者需要注意pyenv和virtualenv的区别。pyenv用以管理不同的Python版本，例如，你的系统工作时 使用Python 2.7.13，学习时使用Python 3.6.0。virtualenv用以隔离项目的工作环境，例如，项目A和 项目B都是使用Python 2.7.13，但是，项目A需要使用Flask 0.8版本，项目B需要使用Flask 0.9版本。我 们只要组合pyenv和virtualenv这两个工具，就能够构造Python和第三方库的任意版本组合，拥有很好 的灵活性，也避免了项目之间的相互干扰。**

**virtualenv本身是一个独立的工具，用户可以不使用pyenv而单独使用virtualenv。但是，如果你使用了 pyenv，就需要安装pyenv\-virtualenv插件，而不是通过virtualenv软件使用virtualenv的功能。**

**git 地址：[https://github.com/pyenv/pyenv\-virtualenv](https://github.com/pyenv/pyenv-virtualenv)**

#### **(1) 把插件克隆在刚才已经安装完毕的 pyenv 的 plugins 文件夹中**

```shell
git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv
```

#### (2) 然后配置环境变量

##### 如果你使用 bash，就执行如下命令：

```shell
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc
```

##### 如果你使用 zsh，就执行如下命令：

```shell
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.zshrc
```

#### **(3) 最后，在使用 pyenv 之前，重新初始化 shell 环境，执行如下命令**

```shell
exec $SHELL
```

**不执行该命令也是完全可以的，你可以关闭当前的终端窗口，重新启动一个就可以了。**

**至此，pyenv就安装完成了，我们可以通过下面的命令验证pyenv是否正确安装并获取pyenv的帮助信息：**

```shell
[root@python ~]# pyenv --help
Usage: pyenv <command> [<args>]

Some useful pyenv commands are:
   commands    List all available pyenv commands
   exec        Run an executable with the selected Python version
   global      Set or show the global Python version(s)
   help        Display help for a command
   hooks       List hook scripts for a given pyenv command
   init        Configure the shell environment for pyenv
   install     Install a Python version using python-build
   local       Set or show the local application-specific Python version(s)
   prefix      Display prefix for a Python version
   rehash      Rehash pyenv shims (run this after installing executables)
   root        Display the root directory where versions and shims are kept
   shell       Set or show the shell-specific Python version
   shims       List existing pyenv shims
   uninstall   Uninstall a specific Python version
   version     Show the current Python version(s) and its origin
   --version   Display the version of pyenv
   version-file   Detect the file that sets the current pyenv version
   version-name   Show the current Python version
   version-origin   Explain how the current Python version is set
   versions    List all Python versions available to pyenv
   whence      List all Python versions that contain the given executable
   which       Display the full path to an executable

See `pyenv help <command>' for information on a specific command.
For full documentation, see: https://github.com/pyenv/pyenv#readme
```

# 二、使用 pyenv

***此处仅仅展示 pyenv 和 virtualenv 的日常用法\\***

## 1、检查安装是否正确

##### **检查 pyenv 的版本**

```shell
[root@python ~]# pyenv version
(set by /root/.pyenv/version)
```

##### **查看 pyenv 已经管理了哪些 python 版本**

```shell
[root@python ~]#pyenv versions
* system (set by /root/.pyenv/version)
```

**如果你看到了正常的版本信息，就说明可以了，如果看到了类似于 command not found 之类的，就说明安装失败了。**

**我们通过pyenv的install命令，可以查看pyenv当前支持哪些Python版本，如下所示：**

```shell
[root@python ~]# pyenv install --list
Available versions:
2.1.3
……省略部分信息
3.8.0
3.8-dev
3.8.1
3.9-dev
……省略部分信息
anaconda3-2018.12
anaconda3-2019.03
anaconda3-2019.07
anaconda3-2019.10
……省略部分信息
[root@python ~]#
```

## 2、pyenv切换python版本

**由于pyenv可以安装的Python版本列表非常长，所以，这里进行了省略。读者可以在自己电脑上安装 pyenv，然后执行pyenv install \-\-list命令进行查看。可以看到，pyenv不但可以安装不同的Python版 本，而且还可以安装不同的Python实现，也可以安装版本的Python用以学习。**

**查看当前系统中包含的Python版本：**

```shell
[root@python ~]# pyenv versions
* system (set by /root/.pyenv/version)
```

##### 使用pyenv安装不同的Python版本：

```shell
[root@python ~]#pyenv install -v 3.8.1
[root@python ~]#pyenv install -v 2.7.13
```

##### 再次查看当前系统中包含的Python版本

```shell
[root@python ~]# pyenv versions
* system (set by /root/.pyenv/version)
  2.7.13
  3.8.1
```

### 切换版本

```shell
#切换前为3.8.1
[root@python ~]# python
Python 3.8.1 (default, Apr 20 2020, 15:00:10)
[GCC 4.8.5 20150623 (Red Hat 4.8.5-39)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> exit()

#切换为2.7.13
[root@python ~]# pyenv  global 2.7.13
[root@python ~]# python
Python 2.7.13 (default, Apr 20 2020, 15:04:15)
[GCC 4.8.5 20150623 (Red Hat 4.8.5-39)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
```

**使用pyenv以后，可以快速切换Python的版本。切换Python版本以后，与版本相关的依赖也会一起切 换。因此，我们不用担心不同的版本在系统中是否会相互干扰。例如，切换Python版本以后，相应的 pip也会跟着切换，所以不用担心自己使用的pip版本和Python版本不匹配的问题，如下所示：**

```shell
[root@python ~]# pyenv  global 3.8.1
[root@python ~]# pip --version
pip 19.2.3 from /root/.pyenv/versions/3.8.1/lib/python3.8/site-packages/pip (python 3.8)
```

##### 如果想要删除Python版本，使用uninstall命令即可。如下所示：

```shell
[root@python ~]# pyenv uninstall 2.7.10
```

# 三、pyenv\-virtualenv的使用

**有了pyenv\-virtualenv以后，我们可以为同一个Python解释器，创建多个不同的工作环境。例如，我们 新建两个工作环境：**

```shell
[root@python ~]# pyenv virtualenv 3.8.1 first_project
[root@python ~]# pyenv virtualenv 3.8.1 second_projec
```

##### **可以使用virtualenvs子命令查看工作环境**

```shell
[root@python ~]# pyenv virtualenvs
  3.8.1/envs/first_project (created from /root/.pyenv/versions/3.8.1)
  3.8.1/envs/second_projec (created from /root/.pyenv/versions/3.8.1)
  first_project (created from /root/.pyenv/versions/3.8.1)
  second_projec (created from /root/.pyenv/versions/3.8.1)
```

**创建完工作环境以后，可以通过activate和deactivate子命令进入或退出一个工作环境。进入工作环境 以后，左边的提示符会显示你当前所在的工作环境，以免因为环境太多导致操作错误。**

```shell
(first_project) [root@python ~]# pip install flask==1.1.1
Looking in indexes: https://pypi.doubanio.com/simple
Collecting flask==1.1.1
  Downloading https://pypi.doubanio.com/packages/9b/93/628509b8d5dc749656a9641f4caf13540e2cdec85276964ff8f43bbb1d3b/Flask-1.1.1-py2.py3-none-any.whl (94kB)
     |███▌                            | 10kB 28.0MB/s eta 0:00:
     |███████                         | 20kB 1.8MB/s eta 0:00:0
     |██████████▍                     | 30kB 2.7MB/s eta 0:00:0
     |█████████████▉                  | 40kB 1.8MB/s eta 0:00:0
     |█████████████████▍              | 51kB 1.3MB/s eta 0:00:0
     |████████████████████▉           | 61kB 1.5MB/s eta 0:00:0
     |████████████████████████▎       | 71kB 1.4MB/s eta 0:00:0
     |███████████████████████████▊    | 81kB 1.3MB/s eta 0:00:0
     |███████████████████████████████▏| 92kB 1.4MB/s eta 0:00:0
     |████████████████████████████████| 102kB 1.6MB/s
Collecting itsdangerous>=0.24 (from flask==1.1.1)
(first_project) [root@python ~]# pyenv deactivate
##退出first_project环境
[root@python ~]#
```

## 接下来，我们看一下在不同的工作环境安装不同的Flask版本

```shell
[root@python ~]# pyenv activate first_project
##切换工作环境
(first_project) [root@python ~]# pip install flask==1.1.1
##安装1.1.1的flask
(first_project) [root@python ~]# pyenv deactivate
##退出目前工作环境
[root@python ~]#

[root@python ~]# pyenv activate second_projec
##切换工作环境
(second_project) [root@python ~]# pip install flask==0.10.1
##安装0.10.1的flask
(second_project) [root@python ~]# pyenv deactivate
##退出目前工作环境
[root@python ~]#
```

##### 查看一下两个工作环境源目录

![pyenv的安装和简单使用（git、pyenv、pyenv-virtualenv）](https://s4.51cto.com/images/blog/202004/20/d7af85be3f5ba43410f70cffb7aa6628.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=)

## 如果想要删除虚拟环境，则使用：

```shell
(first_project) [root@python ~]# pyenv virtualenv-delete first_project
```

**使用pyenv和python\-virtualenv插件，我们就能够自由地在不同的版本之间进行切换，相比管理Python 版本，不但节省了时间，也避免了工作过程中的相互干扰。**

# 三、更新 pyenv

**由于我们是 git 克隆的，所以更新非常简单**

```shell
cd ~/.pyenv` 或者 `cd $(pyenv root)`
 `git pull
```

# 四、卸载 pyenv

**由于 pyenv 把一切都放在 ~/.pyenv 下了，所以卸载很方便，两个步骤就行了**

**首先你需要删除环境变量**

**然后你需要执行：**

```shell
rm -rf ~/.pyenv` 或者 `rm -rf $(pyenv root)
```

## 参考文献
[pyenv的安装和简单使用（git、pyenv、pyenv-virtualenv）-宁愿失败，也不要犹豫-51CTO博客](https://blog.51cto.com/14320361/2488888)
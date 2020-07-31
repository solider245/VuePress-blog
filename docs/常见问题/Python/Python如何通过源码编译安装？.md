---
title: Python如何通过源码编译安装？
---

## 下载地址

* [阿里云国内镜像下载地址](https://npm.taobao.org/mirrors/python/)
* [官网下载地址](https://www.python.org/downloads/source/)

## 下载办法

```shell
mkdir python3.8.5 && cd $_ # 创建文件夹并进入
wget -c https://npm.taobao.org/mirrors/python/3.8.5/Python-3.8.5.tar.xz # 下载压缩包
tar -zxvf Python-3.8.5.tar.xz  # 解压
cd Python-3.8.5 # 进入安装文件夹
./configure  # 编译
make && make install # 安装
```
## 检查Python3是否可用
```
python3 -V
```
## 环境变量配置

程序和可执行文件可以在许多目录，而这些路径很可能不在操作系统提供可执行文件的搜索路径中。

path(路径)存储在环境变量中，这是由操作系统维护的一个命名的字符串。这些变量包含可用的命令行解释器和其他程序的信息。

Unix或Windows中路径变量为PATH（UNIX区分大小写，Windows不区分大小写）。

在Mac OS中，安装程序过程中改变了python的安装路径。如果你需要在其他目录引用Python，你必须在path中添加Python目录。

### 在 Unix/Linux 设置环境变量

*   **在 csh shell:** 输入

    setenv PATH "$PATH:/usr/local/bin/python"

    , 按下 **Enter**。
*   **在 bash shell (Linux) 输入 :**

    export PATH="$PATH:/usr/local/bin/python"

    按下 **Enter** 。
*   **在 sh 或者 ksh shell 输入:**

    PATH="$PATH:/usr/local/bin/python"

    按下 Enter。

**注意:** /usr/local/bin/python 是 Python 的安装目录。

### 在 Windows 设置环境变量

在环境变量中添加Python目录：

**在命令提示框中(cmd) :** 输入

path=%path%;C:\\Python

按下"Enter"。

**注意:** C:\\Python 是Python的安装目录。

也可以通过以下方式设置：

*   右键点击"计算机"，然后点击"属性"
*   然后点击"高级系统设置"
*   选择"系统变量"窗口下面的"Path",双击即可！

*   然后在"Path"行，添加python安装路径即可(我的D:\\Python32)，所以在后面，添加该路径即可。 **ps：记住，路径直接用分号"；"隔开！**
*   最后设置成功以后，在cmd命令行，输入命令"python"，就可以有相关显示。

![](https://www.runoob.com/wp-content/uploads/2013/11/201209201707594792.png)

---

## Python 环境变量

下面几个重要的环境变量，它应用于Python：

| 变量名 | 描述 |
| --- | --- |
| PYTHONPATH | PYTHONPATH是Python搜索路径，默认我们import的模块都会从PYTHONPATH里面寻找。 |
| PYTHONSTARTUP | Python启动后，先寻找PYTHONSTARTUP环境变量，然后执行此变量指定的文件中的代码。 |
| PYTHONCASEOK | 加入PYTHONCASEOK的环境变量, 就会使python导入模块的时候不区分大小写. |
| PYTHONHOME | 另一种模块搜索路径。它通常内嵌于的PYTHONSTARTUP或PYTHONPATH目录中，使得两个模块库更容易切换。 |
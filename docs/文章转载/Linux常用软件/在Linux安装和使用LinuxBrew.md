# [在Linux安装和使用LinuxBrew](https://www.cnblogs.com/hongdada/p/9528560.html)

## 简介[#](#72113712)

[LinuxBrew](https://github.com/Homebrew/linuxbrew)是流行的Mac OS X的一个Linux叉[自制](http://brew.sh/)包管理器。

**LinuxBrew**是包管理软件，它能从源（在Debian / Ubuntu的如“易/ DEB”，并在CentOS的/ RedHat的“Yum/ RPM”）系统的默认包管理安装软件包，

## 为什么要使用LinuxBrew？[#](#4185930768)

*   **自制**最初是为Mac OS X的开发（它没有一个标准的开源软件包管理系统）。 这所取代包管理层如[的MacPorts](http://www.macports.org/)和[芬克](http://www.finkproject.org/) **。LinuxBrew**的自制程序移植到Linux上。

*   大多数Linux发行版都有一个很好的包管理系统（例如Debian / Ubuntu中的“apt / deb”和CentOS / RedHat中的“yum / rpm”），但是

    *   标准存储库中的软件包通常比最新的可用版本旧，和
    *   许多开源包在标准库中不可用（例如常见的生物信息学工具）。
*   **LinuxBrew**提供的软件安装Recipe（包从源代码安装在本地机器上编译），以补充从分布的标准库包的仓库。

*   **LinuxBrew**提供了一种简单的方法来建立自己的资料库（即根据您的需求的开源软件包列表）。

*   **LinuxBrew**安装在用户指定的目录（未全系统）软件，并且不需要`sudo`访问。

*   **LinuxBrew（**和**自制软件** ）集成得很好， [GitHub上](http://www.github.com/) ，使安装Recipe分享轻松。

特别是随着[DigitalOcean](https://www.digitalocean.com/) ，这（在写这篇文章的时间）不提供共享Droplet图像（自定义配置安装的软件），一个**LinuxBrew**库可以提供一个快捷的方法，以一个标准的Linux机器上安装特定的软件包和版本。

## 安装LinuxBrew[#](#2348977476)

### 第1步 \- 克隆LinuxBrew[#](#2585360328)

---

为了保持整洁，克隆**LinuxBrew**成用户的主目录中的隐藏目录：

Copy

`$ git clone https://github.com/Homebrew/linuxbrew.git ~/.linuxbrew`

但任何其他目录也将工作，以及。

### 第2步 \- 更新环境变量[#](#1510455828)

---

下一步骤是将**LinuxBrew**添加到用户的环境变量。

添加以下行到用户的年底`~/.bashrc`文件中：

Copy

`# Until LinuxBrew is fixed, the following is required.
# See: https://github.com/Homebrew/linuxbrew/issues/47
export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig:/usr/local/lib64/pkgconfig:/usr/lib64/pkgconfig:/usr/lib/pkgconfig:/usr/lib/x86_64-linux-gnu/pkgconfig:/usr/lib64/pkgconfig:/usr/share/pkgconfig:$PKG_CONFIG_PATH
## Setup linux brew
export LINUXBREWHOME=$HOME/.linuxbrew
export PATH=$LINUXBREWHOME/bin:$PATH
export MANPATH=$LINUXBREWHOME/man:$MANPATH
export PKG_CONFIG_PATH=$LINUXBREWHOME/lib64/pkgconfig:$LINUXBREWHOME/lib/pkgconfig:$PKG_CONFIG_PATH
export LD_LIBRARY_PATH=$LINUXBREWHOME/lib64:$LINUXBREWHOME/lib:$LD_LIBRARY_PATH`

**注** ：如果您安装**LinuxBrew**到不同的目录，更改路径`LINUXBREWHOME`以上。

### 第3步 \- 更换源[#](#3908257323)

---

brew默认的源速度太慢了，有时还会被墙……，可以替换成国内的源，这里演示的是中科大的源。

##### 替换brew.git

Copy

`cd "$(brew --repo)"

git remote set-url origin https://mirrors.ustc.edu.cn/brew.git`

##### 替换homebrew\-core.git

Copy

`cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"

git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git`

###### 替换Homebrew Bottles源

对于bash用户：

Copy

`echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile

source ~/.bash_profile`

然后brew update 更新一下。

### 第4步 \- 测试安装[#](#205948144)

---

要确保这些更改生效，请注销并再次登录。 然后shell应该使用这些新的设置。

要测试这些新设置，请尝试：

Copy

`$ which brew
/home/ubuntu/.linuxbrew/bin/brew
$ echo $PKG_CONFIG_PATH
/home/ubuntu/.linuxbrew/lib64/pkgconfig:/home/ubuntu/.linuxbrew/lib/pkgconfig:/usr/local/lib/pkgconfig:/usr/local/lib64/pkgconfig:/usr/lib64/pkgconfig:/usr/lib/pkgconfig:/usr/lib/x86_64-linux-gnu/pkgconfig:/usr/lib64/pkgconfig:/usr/share/pkgconfig:`

## 使用LinuxBrew安装软件包[#](#429116452)

---

### 哪些包可用？[#](#4227964480)

---

类型`brew search`看到所有可用的软件包列表（所有包LinuxBrew当前安装知道\-见下文有关添加库）。

类型`brew search WORD` ，查看所有包含WORD包（称为自制行话\_公式\_ ）。 例：

Copy

`$ brew search xml
blahtexml       libnxml   libxml2     xml-coreutils   xml2        xmlrpc-c
html-xml-utils  libwbxml  libxmlsec1  xml-security-c  xmlcatmgr   xmlsh
libmxml         libxml++  tinyxml     xml-tooling-c   xmlformat   xmlstarlet`

### 安装软件包[#](#3127362595)

---

要安装包，运行`brew install PACKAGE` 。

例如，在安装[JQ \- JSON处理器](http://stedolan.github.io/jq/) ：

Copy

`$ brew install jq
==> Downloading http://stedolan.github.io/jq/download/source/jq-1.3.tar.gz
==> ./configure
==> make
/home/ubuntu/.linuxbrew/Cellar/jq/1.3: 7 files, 256K, built in 10 seconds
$ which jq
/home/ubuntu/.linuxbrew/bin/jq
$ jq --version
jq version 1.3`

LinuxBrew的有效性是明显的：尽管Ubuntu的最新资料库已\_JQ，\_其版本是旧的（1.2）。 Debian的稳定测试没有\_JQ\_包的。 LinuxBrew的版本是最新的（1.3）。 另外，LinuxBrew将程序安装到不会与系统默认位置冲突的路径。
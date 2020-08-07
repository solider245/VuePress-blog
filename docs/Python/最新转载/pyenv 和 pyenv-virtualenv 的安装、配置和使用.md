---
title: pyenv 和 pyenv-virtualenv 的安装、配置和使用
---
pyenv 是一个 python 版本管理工具，可以方便的在工作环境中安装、管理和切换不同版本的 python，结合 pyenv\-virtualenv 插件，能够方便的创建和管理 python 虚拟环境，在虚拟环境中的各种操作，并不会影响到系统的正常运行，有效防止乱装 python 版本导致系统崩溃等问题的发生。
本文结合自己相关实践，总结了 pyenv 的安装，以及使用 pyenv 安装、管理不同版本的 python 等过程的相关经验，希望对读者有所帮助，本文也借鉴了一些相关的博客、文档等资料，在文中都有列出。
本文相关内容是在已经安装了 Mac os 包管理器 Homebrew 的基础上完成的，系统版本 10.14.5，Linux 系统也可以借鉴，很多设置是相似的，pyenv 命令的使用也是一样的。在进行相关操作前，可以使用 `brew update` 命令将 Homebrew 升级到最新版本，然后使用 `brew upgrade` 命令将之前安装过的软件包更新。

## pyenv

### pyenv 的安装

安装 pyenv 有两种方式：使用 Homebrew 安装和从 Github 克隆，两种方式都比较简便，只需要一点设置，便可以投入使用。

#### 使用 Homebrew 安装 pyenv

第一步，运行下面的命令安装 pyenv：

```undefined
brew install pyenv

```

这个命令会自动下载安装最新版本的 pyenv，并自动下载依赖包，安装完成后，可以运行 `which pyenv` 命令，查看 `pyenv` 命令是否存在。

第二步，初始化 pyenv（`pyenv init`）
[pyenv 的工作原理](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fpyenv%2Fpyenv%23understanding-shims) 是在 PATH 环境变量的最前面添加一个垫片目录 `(pyenv root)/shims`，这样系统在查找 python 可执行文件时，会首先查找这个目录，进而被导引到 pyenv 管理的 python 环境，跳过后面的系统目录。
初始化 pyenv 的作用就是将垫片目录添加到 PATH 的最前面，为了每次启动 `shell` 都自动初始化，可以在配置文件 `~/.bash_profile` 中写入如下内容（这里是针对 `bash shell` 而言，其它类型的 `shell`，配置文件的名称有所差别）：

```bash
if command -v pyenv 1>/dev/null 2>&1; then eval "$(pyenv init -)";fi

```

或者：

```bash
if which pyenv >/dev/null; then eval "$(pyenv init -)";fi

```

这两句的效果是一样的，意思是判断 `pyenv` 命令是否存在（但不会给出此判断的结果信息），如果存在的话，执行 `eval "$(pyenv init -)"` 命令。
如果确定系统中 `pyenv` 命令存在，那么可以直接添加以下内容到 `~/.bash_profile`，以提高终端的打开速度：

```bash
eval "$(pyenv init -)"

```

最后，通过 `source ~/.bash_profile` 命令使设置立即生效。

#### 从 Github 克隆 pyenv 仓库

第一步，执行以下命令：

```php
git clone https://github.com/pyenv/pyenv.git ~/.pyenv

```

这个命令会从 Github 克隆最新版本的 pyenv 仓库到本地目录 `～/.pyenv`，使用这个命令的前提是安装好了 Git（Git 是一个非常好用的版本管理工具，直接使用命令 `brew install git` 就可以安装）。
注意这里是将 pyenv 克隆到了目录 `~/.pyenv`，也可以自己选择要克隆到的目录。

第二步，克隆成功之后，还需要修改 PATH 环境变量，以使 pyenv 能够使用。在 `~/.bash_profile` 文件中添加以下内容（这里是针对 `bash shell` 而言，其它类型的 `shell`，配置文件的名称有所差别）：

```bash
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"

```

这里变量 `PYENV_ROOT` 的值要设置为第一步 pyenv 克隆到的目录，也可以直接在终端执行以下命令，可以获得相同的效果：

```dart
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile

```

设置完成后，可以运行 `which pyenv` 命令，查看 `pyenv` 命令是否存在。

注意使用 Homebrew 安装 pyenv 是不需要第二步的，Homebrew 在安装 pyenv 时已经自动设好了（安装时在 `usr/local/bin` 目录下建立了 pyenv 的替身，而 `usr/local/bin` 目录已经在 PATH 环境变量中了）。

第三步，初始化 pyenv（`pyenv init`）
在 `~/.bash_profile` 中写入如下内容（这里是针对 `bash shell` 而言，其它类型的 `shell`，配置文件的名称有所差别）：

```bash
if command -v pyenv 1>/dev/null 2>&1; then eval "$(pyenv init -)";fi

```

或者：

```bash
if which pyenv >/dev/null; then eval "$(pyenv init -)";fi

```

或者直接：

```bash
eval "$(pyenv init -)"

```

最后，通过 `source ~/.bash_profile` 命令使设置立即生效。

### pyenv 的使用

目前，可用的 pyenv 命令总共只有 11 个，文档 [Command Reference](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fpyenv%2Fpyenv%2Fblob%2Fmaster%2FCOMMANDS.md) 里有具体说明，本文基于个人经验针对常用的一些命令在下面进行说明。

#### `pyenv commands`

列出所有可用的pyenv命令，用法是：

```undefined
pyenv commands

```

#### `pyenv install`

安装特定版本的 python，用法是：

```css
pyenv install [options] <version>

```

常用的选项 `options` 有：

```undefined
-f/--force  :强制安装，即使该版本已经安装过了
-s/--skip-existing  :跳过已经安装过的版本
-v/--verbose:输出安装过程中的详细状态信息

```

另外，`pyenv install --list` 命令可以列出所有可以安装的 python 版本，返回的结果中，以单纯数字表示的版本是官方的版本。

就我个人经验而言，用 pyenv 安装 python 时比较容易出错，有许多地方需要注意：

首先，安装 python 前需要先安装所需的依赖包。
对 Mac os 系统而言，如果没有安装 Xcode 命令行工具，需要先安装：

```csharp
xcode-select --install

```

另外，还需要安装以下 5 个依赖包：

```undefined
brew install openssl readline sqlite3 xz zlib

```

可以先通过 `brew list` 命令查看是否已经安装过某些依赖包，只需要安装缺少的依赖包就可以了。
对于 10.14 以上的系统而言，还需要安装额外的软件开发工具包（sdk），具体请查看文档[Requirements](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fpyenv%2Fpyenv%2Fwiki)，有的已经安装过了，就不需要重复安装了（其它操作系统也可以查看 [Requirements](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fpyenv%2Fpyenv%2Fwiki) 获取帮助）。

第二，即使所需的依赖包已经全都安装好了，在安装 python 时也可能会出错，原因是安装时链接器找不到所需要的依赖包，就会认为相关的依赖包没有安装，给出错误提示，比如提示 `zlib` 没有安装，那么可以在安装 python 时，在安装命令前添加几个参数，如下：

```bash
CFLAGS="-I$(brew --prefix zlib)/include" \
LDFLAGS="-L$(brew --prefix zlib)/lib" \
pyenv install -v <version>

```

上面的安装命令中，
`CPPFLAGS` 是 c 和 c++ 编译器的选项，这里指定了 `zlib` 头文件的位置，
`LDFLAGS` 是 gcc 等编译器会用到的一些优化参数，这里是指定了 `zlib` 库文件的位置，
`$(brew --prefix zlib)` 这一部分的意思是在终端里执行括号里的命令，显示 `zlib` 的安装路径，可以事先执行括号里的命令，用返回的结果替换 `$(brew --prefix zlib)`，效果是一样的，
每一行行尾的反斜杠可以使换行时先不执行命令，而是把这三行内容当作一条命令执行，
如果有多个依赖包都找不到，可以在引号里继续添加其它依赖包的信息，如：

```bash
CFLAGS="-I$(brew --prefix zlib)/include -I$(brew --prefix sqlite3)/include" \
LDFLAGS="-L$(brew --prefix zlib)/lib -L$(brew --prefix sqlite3)/lib" \
pyenv install -v <version>

```

`-v` 选项显示安装时的细节，
在安装命令前加上这两个参数后，链接器就可以找到相应的依赖包，可以成功安装。
具体可以参考文档 [Common build problems](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fpyenv%2Fpyenv%2Fwiki%2FCommon-build-problems)。

第三，使用 pyenv 安装 python 时，默认从 `python.org` 下载指定版本，往往特别慢，可以先从[官网](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.python.org%2Fdownloads%2Fsource%2F)下载所需要的版本的源代码到 `~/.pyenv/cache` 目录下，再执行安装命令，注意这里下载的是类似于 `Python-3.7.3.tar.xz` 这样的压缩文件。

#### `pyenv uninstall`

卸载某个版本的 python，用法是：

```css
pyenv uninstall [-f|--force] <version>

```

`-f|--force` 选项的作用是强制删除某版本的 python，不需要确认，如果该版本不存在，也不会给出错误信息。

#### `pyenv version`

显示当前使用的 python 版本，用法是：

```undefined
pyenv version

```

在版本后面会显示当前版本是如何设置的。

#### `pyenv versions`

列出所有被 pyenv 管理的 python 版本，用法是：

```undefined
pyenv versions

```

在当前使用的版本前会用 `*` 标出。

#### `pyenv local`

设置当前目录下所使用的 python 版本，用法是：

```bash
pyenv local <version>

```

这个命令会在当前目录下的 `.python-version` 文件里写入版本设置信息，单纯使用 `pyenv local` 命令会显示当前目录所使用的 python 版本。
如果要取消设置当前目录的 python 版本，使用如下命令：

```bash
pyenv local --unset

```

#### `pyenv global`

设置全局使用的 python 版本，用法是：

```csharp
pyenv global <version>

```

这个命令会在 `~/.pyenv/version` 文件里写入全局的版本设置信息，单纯使用 `pyenv global` 命令显示当前全局使用的 python 版本（一般不建议更改全局的 python 版本，可能会引起一些系统的问题）。
如果要取消设置当前 shell 的 python 版本，使用如下命令：

```bash
pyenv shell --unset

```

#### `pyenv shell`

设置当前 shell 所使用的 python 版本，用法是：

```xml
pyenv shell <version>

```

这个命令会设置环境变量 PYENV\_VERSION 的值为指定版本，也可以直接设定环境变量 PYENV\_VERSION 的值，效果一样：

```jsx
export PYENV_VERSION=<version>

```

单纯使用 `pyenv shell` 命令显示当前 shell 使用的 python 版本。

#### `pyenv rehash`

更新垫片目录 `shims` 的内容，以使 pyenv 知道它所管理的 python 版本的最新信息，用法是：

```bash
pyenv rehash

```

一般在安装新一个版本的 python 之后运行此命令。

### pyenv 的其它操作

#### 更新 pyenv

如果是使用 Homebrew 安装的 pyenv，那么只需要执行 `brew upgrade pyenv` 命令即可将 pyenv 更新至最新版本；
如果是从 Github 克隆的 pyenv 仓库，那么需要先进入到本地的 pyenv 目录 （`cd $(pyenv root)`），然后执行 `git pull` 命令，可以将 pyenv 更新至最新版本。

#### 使 pyenv 失效

如果想暂时使 pyenv 管理 python 版本的功能失效，只需要将之前写入 `~/bash_profile` 的下列内容注释掉即可：

```bash
if command -v pyenv 1>/dev/null 2>&1; then eval "$(pyenv init -)";fi

```

或者：

```bash
if which pyenv >/dev/null; then eval "$(pyenv init -)";fi

```

注释掉后，`pyenv` 命令仍然可以使用，但 python 程序就不会受 pyenv 版本管理的影响了（此时恢复成系统目录中的 python 版本）。

#### 卸载 pyenv

第一步，把 `~/.bash_profile` 里关于 pyenv 的内容删除掉。

第二步，如果是使用 Homebrew 安装的 pyenv，那么只需要执行 `brew uninstall pyenv` 命令即可将 pyenv 从计算机卸载；如果是从 Github 克隆的 pyenv 仓库，那么需要将本地的 pyenv 目录删除（`rm -rf ~/.pyenv`）。

## pyenv\-virtualenv

pyenv\-virtualenv 是一个管理 python 虚拟环境的 pyenv 插件，具体可以查看 [pyenv\-virtualenv 文档](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fpyenv%2Fpyenv-virtualenv)。

### 关于 python 虚拟环境

Python 虚拟环境是一个虚拟化，从电脑独立开辟出来的环境，它以某个版本的 python 为基础，在虚拟环境中可以安装项目所需的第三方库而不会对外界产生影响，虚拟环境的数量并没有限制，这样每个项目就可以有互相独立的运行环境，非常便于项目开发。
python 虚拟环境相当于一个独立的 python 版本，有自己独立的目录，也可以独立的安装第三方库，而不会相互干扰。

### pyenv\-virtualenv 的安装

同样，安装 pyenv\-virtualenv 也有两种方式：使用 Homebrew 安装和从 Github 克隆。

#### 使用 Homebrew 安装 pyenv\-virtual

第一步，运行下面的命令安装 pyenv\-virtualenv：

```undefined
brew install pyenv-virtualenv

```

这个命令会自动下载安装最新版本的 pyenv\-virtualenv，并自动下载依赖包，安装完成后，可以运行 `which pyenv-virtualenv` 命令，查看是否安装成功。

第二步，初始化
在配置文件 `~/.bash_profile` 中写入如下内容（这里是针对 `bash shell` 而言，其它类型的 `shell`，配置文件的名称有所差别）：

```bash
if which pyenv-virtualenv >/dev/null; then eval "$(pyenv virtualenv-init -)";fi

```

或者直接：

```bash
eval "$(pyenv virtualenv-init -)"

```

最后，通过 `source ~/.bash_profile` 命令使设置立即生效。

#### 从 Github 克隆 pyenv\-virtualenv 仓库

第一步，在终端执行以下命令：

```php
git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv

```

这个命令会从 Github 克隆最新版本的 pyenv\-virtualenv 仓库到本地目录 `$(pyenv root)/plugins/pyenv-virtualenv`，其中 `$(pyenv root)` 是指 pyenv 的安装目录。
这里要注意，如果之前安装 pyenv 时不是克隆到本地目录 `~/.pyenv`，那么此处克隆时，要确保克隆到之前 pyenv 的目录下的 `plugin` 子目录下（没有则创建之）。
克隆完成后可以运行 `which pyenv-virtualenv` 命令，查看是否安装成功。

第二步，初始化
在配置文件 `~/.bash_profile` 中写入如下内容（这里是针对 `bash shell` 而言，其它类型的 `shell`，配置文件的名称有所差别）：

```bash
if which pyenv-virtualenv >/dev/null; then eval "$(pyenv virtualenv-init -)";fi

```

或者直接：

```bash
eval "$(pyenv virtualenv-init -)"

```

最后，通过 `source ~/.bash_profile` 命令使设置立即生效。

### pyenv\-virtualenv 的使用

#### 创建虚拟环境

```css
pyenv virtualenv [version] <virtualenv-name>

```

这个命令可以以某版本的 python 为基础创建名为 `virtualenv-name` 的虚拟环境，如果不指定 python 的版本，那么就会以当前的 python 版本为基础创建虚拟环境。
虚拟环境创建时，会在 `$(pyenv root)/versions` 目录下创建一个对应虚拟环境名的目录，这个目录只是一个链接，真身在对应的 python 版本目录下的 `envs` 目录下。

#### 列出所有的虚拟环境

```undefined
pyenv virtualenvs

```

这个命令会列出所有存在的虚拟环境，每个虚拟环境会出现两次，分别对应相应虚拟环境目录的真身和链接。

#### 激活和关闭虚拟环境

```xml
pyenv activate <virtualenv-name>
pyenv deactivate

```

这两个命令分别用于激活和关闭虚拟环境。

另外，需要注意的是，通过 `pyenv local <version>` 命令可以为某个目录指定所使用的 python 版本，此处可以把版本名替换为某个虚拟环境名，也就是说可以为某个目录指定所使用的虚拟环境，此时在相应的 `.python-version` 文件中记录的就是指定的虚拟环境名。在这种情况下，当进入这个目录时，会自动激活相应的虚拟环境，退出这个目录时，会自动关闭相应的虚拟环境（在 pyenv 中，虚拟环境和正式的 python 版本具有同样的地位，通过 `pyenv versions` 查看 python 版本时，虚拟环境也是作为一个独立的 python 版本出现的）。

### 删除虚拟环境

```cpp
pyenv virtualenv-delete <virtualenv-name>

```

这个命令用于删除某个虚拟环境，通过以下命令也可以达到同样的效果：

```xml
pyenv uninstall <virtualenv-name>

```

另外，也可以直接删除虚拟环境对应的目录。

### pyenv\-virtualenv 的其它操作

#### 更新 pyenv\-virtualenv

如果是使用 Homebrew 安装的 pyenv\-virtualenv，那么只需要执行 `brew upgrade pyenv-virtualenv` 命令即可将 pyenv\-virtualenv 更新至最新版本；
如果是从 Github 克隆的 pyenv\-virtualenv 仓库，那么需要先进入到本地的 pyenv\-virtualenv 目录 ，然后执行 `git pull` 命令，可以将 pyenv\-virtualenv 更新至最新版本。

#### 卸载 pyenv\-virtualenv

第一步，把 `~/.bash_profile` 里关于 pyenv\-virtualenv 的内容删除掉。

第二步，如果是使用 Homebrew 安装的 pyenv\-virtualenv，那么只需要执行 `brew uninstall pyenv-virtualenv` 命令即可将 pyenv\-virtualenv 从计算机卸载；如果是从 Github 克隆的 pyenv\-virtualenv 仓库，那么需要将本地的 pyenv\-virtualenv 目录删除。

---
title : pyenv用国内镜像安装python3.8 
---
首先，我们需要在系统中安装pyenv，建议修改brew为国内源。

```
brew install pyenv
pyenv --version   //pyenv 1.2.15

```

本人的pyenv为1.2.15。默认情况下，下载python3.8.0走的是python官网提供的ftp。但事实证明，每次只能下载1/4就会挂掉（本人用浏览器按照目录下的地址下载到1/4停止）。所以，为保证我们可以用pyenv下载到python3.8.0，需要先修改pyenv的下载地址。

```
cd ~/.pyenv/plugins/python-build/share/python-build
ls

```

在这里你会看到文件和`pyenv install --list`一样的列表。我看到这个的时候都兴奋了，要知道网上都是什么链接地址啊，都找不到这里。

执行`vi 3.8.1`，打开文件如下：

```
#require_gcc
prefer_openssl11
export PYTHON_BUILD_CONFIGURE_WITH_OPENSSL=1
install_package "openssl-1.1.0j" "https://www.openssl.org/source/openssl-1.1.0j.tar.gz#31bec6c203ce1a8e93d5994f4ed304c63ccf07676118b6634edded12ad1b3246" mac_openssl --if has_broken_mac_openssl
install_package "readline-8.0" "https://ftpmirror.gnu.org/readline/readline-8.0.tar.gz#e339f51971478d369f8a053a330a190781acb9864cf4c541060f12078948e461" mac_readline --if has_broken_mac_readline
if has_tar_xz_support; then
  install_package "Python-3.8.1" "https://www.python.org/ftp/python/3.8.1/Python-3.8.1.tar.xz#75894117f6db7051c1b34f37410168844bbb357c139a8a10a352e9bf8be594e8" ldflags_dirs standard verify_py38 copy_python_gdb ensurepip
else
  install_package "Python-3.8.1" "https://www.python.org/ftp/python/3.8.1/Python-3.8.1.tgz#c7cfa39a43b994621b245e029769e9126caa2a93571cee2e743b213cceac35fb" ldflags_dirs standard verify_py38 copy_python_gdb ensurepip
fi

```

修改文件的`if`下执行语句的地址为如下

```
#require_gcc
prefer_openssl11
export PYTHON_BUILD_CONFIGURE_WITH_OPENSSL=1
install_package "openssl-1.1.0j" "https://www.openssl.org/source/openssl-1.1.0j.tar.gz#31bec6c203ce1a8e93d5994f4ed304c63ccf07676118b6634edded12ad1b3246" m    ac_openssl --if has_broken_mac_openssl
install_package "readline-8.0" "https://ftpmirror.gnu.org/readline/readline-8.0.tar.gz#e339f51971478d369f8a053a330a190781acb9864cf4c541060f12078948e461" m    ac_readline --if has_broken_mac_readline
if has_tar_xz_support; then
  install_package "Python-3.8.1" "https://npm.taobao.org/mirrors/python/3.8.1/Python-3.8.1.tar.xz#75894117f6db7051c1b34f37410168844bbb357c139a8a10a352e9bf    8be594e8" ldflags_dirs standard verify_py38 copy_python_gdb ensurepip
else
  install_package "Python-3.8.1" "https://www.python.org/ftp/python/3.8.1/Python-3.8.1.tgz#c7cfa39a43b994621b245e029769e9126caa2a93571cee2e743b213cceac35f    b" ldflags_dirs standard verify_py38 copy_python_gdb ensurepip
fi

```

之后正常执行`pyenv install 3.8.1`，不到一分钟就安装好了。。。

作者：Crystal\_Lau
链接：[https://www.jianshu.com/p/4243be7fd1c9](https://www.jianshu.com/p/4243be7fd1c9)
来源：简书

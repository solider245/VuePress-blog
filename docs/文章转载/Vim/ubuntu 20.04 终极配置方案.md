---
title : ubuntu 20.04 终极配置方案
description : 不是很完美，但是可以作为一个搭建界面的参考
author : 中箭的吴起
image : 
date : 2020-08-02 20:53:03 +0800
categories:
 -
tags:
 - Ubuntu
---
[[toc]]
抛弃windows拥抱Linux的时刻终于到了，ubuntu 20.04一个可以满足你日常办公需求与大数据分析的完美结合体，用更少的内存，更少的功耗，更少的时间来完成更多有意义的事。

![](https://upload-images.jianshu.io/upload_images/16360488-0153f2c5066ce2bc.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

ubuntu 20.04 .png

![](https://upload-images.jianshu.io/upload_images/16360488-71c963ecdbcf9303.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

ubuntu 20.04.png

![](https://upload-images.jianshu.io/upload_images/16360488-8c15b3e1ba8bedfe.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

ubuntu 20.04.png

下面开始一场打造只属于你个人操作系统的旅程：

一、系统安装篇

1.  用windows磁盘管理清理出一块不少于200G的空间用于安装ubuntu 20.04
2.  清华镜像源下载ubuntu 20.04 镜像文件
    [https://mirrors.tuna.tsinghua.edu.cn/ubuntu\-releases/focal/ubuntu\-20.04\-desktop\-amd64.iso](https://links.jianshu.com/go?to=https%3A%2F%2Fmirrors.tuna.tsinghua.edu.cn%2Fubuntu-releases%2Ffocal%2Fubuntu-20.04-desktop-amd64.iso)
3.  制作系统启动盘
    推荐下载rufus制作启动盘,下载时请注意选择中文 [https://rufus.ie/](https://links.jianshu.com/go?to=https%3A%2F%2Frufus.ie%2F)
    完成以上3步后就可以正式开始安装系统了，具体过程和安装windows类似，比如我的电脑是按F12进入安装界面（具体过程请根据自己电脑型号搜索解决）
4.  安装过程
    4.1 install ubuntu\-\-keyboard layout(语言，键盘类型选择中文)
    4.2选择正常安装，并安装第三方插件;
    4.3安装位置选择其它选项（注：千万不要跟windows系统安装在一个盘，如果你的电脑只有一个盘你可以选择直接删除windows 请慎重选择)
    4.4 安装类型
    找到你的清理好的空白盘，分配安装空间
    逻辑分区 用于挂载交换空间 (swap)8G; boot 2G
    主分区 用于挂载根目录（50G),home目录（磁盘剩下空间）
    以上属于个人配置，可根据自己电脑自行调整参数

二、系统配置篇

1.  打开系统和更新软件选择中国的镜像站点

    ![](https://upload-images.jianshu.io/upload_images/16360488-ac1e1bc5187f4818.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

    镜像配置.png

2.  打开终端执行以下操作

```csharp
#安装中文输入法
sudo apt-get install python2 #安装python2
rm -rf /usr/bin/python #移除系统默认的python版本
sudo ln -s /usr/bin/python2.7/ /usr/bin/python #为python 2.7创建软链接
sudo apt-get install fcitx #安装 fcitx配置软件用于设置中文输入法
sudo apt-get install fcitx-googlepinyin # 安装google拼音输入法
im-config   # 确定-是-fcitx 之后重新启动就可以愉快输入中文了
默认ctrl + 空格激活输入法

```

打开fcitx配置软件可在此处设置输入法各种参数

![](https://upload-images.jianshu.io/upload_images/16360488-7d5a79f76d20c3b4.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

输入法配置.png

```csharp
系统美化
#1 .安装美化工具 gnome-tweak-tool
sudo apt-get install gnome-tweak-tool
sudo apt-get install chrome-gnome-shell

```

2.安装美化主题
[https://www.gnome\-look.org/p/1275087/\](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.gnome\-look.org%2Fp%2F1275087%2F)](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.gnome-look.org%2Fp%2F1275087%2F%255D%28https%3A%2F%2Flinks.jianshu.com%2Fgo%3Fto%3Dhttps%253A%252F%252Fwww.gnome-look.org%252Fp%252F1275087%252F%29)下载mojave\-light\-solid.tar.xz文件并解压，之后终端执行 sudo nautilus 命令，找到下载的主题文件夹右击将其移动到 usr\-share\-themes 文件夹下.打开 gnome\-tweak\-tool在主题栏选择下载的主题
3.安装美化图标
[https://github.com/keeferrourke/la\-capitaine\-icon\-theme](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fkeeferrourke%2Fla-capitaine-icon-theme) 下载美化图标，解压之后终端执行 sudo nautilus命令,移动到usr\-share\-icons文件夹下. 打开 gnome\-tweak\-tool选择下载好的图标文件.

![](https://upload-images.jianshu.io/upload_images/16360488-766ed085ad26ce0b.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

系统美化.png

```ruby
#终端美化
sudo apt update
sudo apt install zsh #安装zsh
sudo usermod -s /usr/bin/zsh $(whoami) #设置zsh为默认

```

完成以上设置后重新启动电脑，打开终端后点击键盘上的数字键2，此后就可以正常使用 ZSH Shell

```bash
#配置 zsh
sudo apt install powerline fonts-powerline #安装字体
sudo apt install zsh-theme-powerlevel9k #安装主题
echo "source /usr/share/powerlevel9k/powerlevel9k.zsh-theme" >> ~/.zshrc
# 安装语法并启用高亮插件
sudo apt install zsh-syntax-highlighting
echo "source /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ~/.zshrc

```

![](https://upload-images.jianshu.io/upload_images/16360488-dee017823bbfacfa.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

终端.png

```bash
#系统优化
sudo apt-get install tlp
systemctl start tlp
systemctl enable tlp#3次输入密码认证
systemctl start NetworkManager-dispatcher
systemctl enable NetworkManager-dispatcher
systemctl mask systemd-rfkill.socket systemd-rfkill.service

```

三、常用软件的安装

# chrome 浏览器

参考 ：[https://www.bilibili.com/read/cv4509142](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.bilibili.com%2Fread%2Fcv4509142)

```csharp
sudo apt-get install vim #vim 编辑器
sudo apt-get install gdebi #gdebi 软件包管理程序
sudo apt-get install vlc  #vlc视频播放器
sudo apt-get install filezilla #filezilla文件传输工具
sudo apt-get install geany #geany文本编辑器
sudo apt-get install inkscape #矢量图修理软件
sudo apt-get install gime #gime图片处理软件

```

```csharp
#Typora markdown文本编辑器
wget -qO - https://typora.io/linux/public-key.asc | sudo apt-key add -
sudo add-apt-repository 'deb https://typora.io/linux ./'
sudo apt-get update
sudo apt-get install typora

```

```csharp
#网易云音乐
sudo apt-get install axel  #多线程下载工具
axel -an100 http://d1.music.126.net/dmusic/netease-cloud-music_1.2.1_amd64_ubuntu_20190428.deb
sudo gdebi netease-cloud-music*
#修改网易云界面大小
sudo gedit /usr/share/applications/netease-cloud-music.desktop
#找到 Exec=这行,修改成下面这样
Exec=netease-cloud-music --force-device-scale-factor=1.5 %U

#百度云
axel -an100 http://wppkg.baidupcs.com/issue/netdisk/LinuxGuanjia/3.0.1/baidunetdisk_linux_3.0.1.2.deb
sudo gdebi baidunetdisk_linux*
#Linux for QQ
axel -an100 http://down.qq.com/qqweb/LinuxQQ_1/linuxqq_2.0.0-b2-1082_amd64.deb
sudo gdebi linuxQQ*
#teamviewer
axel -an 100 https://download.teamviewer.com/download/linux/teamviewer_amd64.deb
sudo gdebi teamviewer*

```

# 四、视频编辑类

DaVinci Resolve 16 (达芬奇一款类似Adobe pr的视频处理软件）
参考安装方法: [https://www.linuxuprising.com/2018/06/how\-to\-install\-davinci\-resolve\-15\-in.html](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.linuxuprising.com%2F2018%2F06%2Fhow-to-install-davinci-resolve-15-in.html)

axel \-an100
[https://www.blackmagicdesign.com/products/davinciresolve/](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.blackmagicdesign.com%2Fproducts%2Fdavinciresolve%2F)
axel \-an30 [https://www.danieltufvesson.com/download/?file=makeresolvedeb/makeresolvedeb\_16.2.1\-1.sh.tar.gz](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.danieltufvesson.com%2Fdownload%2F%3Ffile%3Dmakeresolvedeb%2Fmakeresolvedeb_16.2.1-1.sh.tar.gz)

```css
sudo apt install libssl1.1 ocl-icd-opencl-dev fakeroot xorriso

```

确保DaVinci Resolve和MakeResolveDeb脚本（提取的.sh文件）都在同一文件夹中,运行MakeResolveDeb脚本以创建DaVinci Resolve 16.2 deb软件包, 假设已将DaVinci Resolve提取到主文件夹中，并将MakeResolveDeb脚本与DaVinci Resolve放在同一文件夹中，则可以使用以下命令创建deb：

```bash
cd ~/DaVinci_Resolve*_Linux
sudo ./makeresolvedeb*.sh lite

```

```css
sudo gdebi DaVinci Resolve 16.2 deb

```

五、数据处理类

```csharp
# R 4.0.0安装
sudo apt update
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
sudo add-apt-repository 'deb https://cloud.r-project.org/bin/linux/ubuntu focal-cran40/'
sudo apt install r-base-dev
sudo apt-get install rstudio

```

![](https://upload-images.jianshu.io/upload_images/16360488-b8a9047a3fd61d2a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

R 4.0.0.png

解决Rstudio无法输入中文
参考： [https://support.rstudio.com/hc/en\-us/articles/205605748\-Using\-RStudio\-0\-99\-with\-Fctix\-on\-Linux](https://links.jianshu.com/go?to=https%3A%2F%2Fsupport.rstudio.com%2Fhc%2Fen-us%2Farticles%2F205605748-Using-RStudio-0-99-with-Fctix-on-Linux)

```jsx
sudo ln -s /usr/lib/$(dpkg-architecture -qDEB_BUILD_MULTIARCH)/qt5/plugins/platforminputcontexts/libfcitxplatforminputcontextplugin.so /usr/lib/rstudio/bin/plugins/platforminputcontexts/

```

六、文档处理类
texlive安装

```csharp
axel -an100 https://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/texlive/Images/texlive2020-20200406.iso
sudo apt-get install texstudio

```

![](https://upload-images.jianshu.io/upload_images/16360488-a20b8a4b88371c20.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

texlive.png

安装参考：[https://www.jianshu.com/p/902e4d3498a8](https://www.jianshu.com/p/902e4d3498a8)
七、编程类
Visual Studio Code

```cpp
axel -an100 https://code.visualstudio.com/download
常用插件
Code Runner
Code Spell Checker
ESLint
indent-rainbow
Live Server
Rainbow Brackets
vscode-icons

```

![](https://upload-images.jianshu.io/upload_images/16360488-66923e4bee9c7141.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

VScode.png

# 完成上述配置你的Linux堪称完美
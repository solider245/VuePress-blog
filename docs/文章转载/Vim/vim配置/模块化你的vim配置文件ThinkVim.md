---
title: 模块化你的vim配置文件
---
## **前因**

**这段话你可能看不懂如果你不是个gopher 直跳主题就好^\_^**

继上篇文章我做了一次init.vim的拆分，其实目的是已经达到了。但是我最近又把它细化了，写了几年go，1.10之前的gocode是让人舒适的，但是1.10之后调整了缓存等，nsf不在维护gocode，于是google的工作人员接手了，添加的\-souce特性让我崩溃，从源码获取补全信息？可想能慢到什么程度，不然你要每次手动go install \-i 来生成.a的文件供gocode寻找，于是我准备切换使用lsp试试。

切换lsp 的解决方案有3种：

1.  使用[LanguageClient\-neovim](https://link.zhihu.com/?target=https%3A//github.com/autozimu/LanguageClient-neovim) (好像是国人写的） 配合 [deoplete](https://link.zhihu.com/?target=https%3A//github.com/Shougo/deoplete) 或者 [ncm2](https://link.zhihu.com/?target=https%3A//github.com/ncm2/ncm2) （国人写的）
2.  使用[coc](https://link.zhihu.com/?target=https%3A//github.com/neoclide/coc.nvim) （作者是赵启明 大佬）
3.  deoplete\-tabnine 它也是支持lsp的

正好想试试coc，所以准备折腾一下，结果我发现上次拆分玩的配置还是不太好维护，可能装的插件太多了，[上篇文章](https://zhuanlan.zhihu.com/p/54864654) 适用于插件较少的配置 20个左右？它表现的就很好。所以我就继续拆了一下。

## **Module init.vim**

init.vim的模块

*   dein

*   plugins.toml 正常加载插件
*   plugins\-lazy.toml 懒加载插件（基于某些命令或文件格式等加载插件）

*   plugins

*   插件配置

*   general

*   vim设置

*   mappings

*   键位映射设置，（注意：leader和mapleader必须加载在插件前）

*   filetype

*   文件格式设置

*   autoload

*   utils.vim \-\-> airlinetabline 函数

现在的样子，这样看起来想比之前的更加清爽了，也方便维护了

![](https://picb.zhimg.com/v2-00255bb2025202c7a1ed1f6ca9862a83_b.jpg)

![](https://picb.zhimg.com/80/v2-00255bb2025202c7a1ed1f6ca9862a83_720w.jpg)

目录

然后重写了一下init.vim 也就是简单的写了个函数：

![](https://pic1.zhimg.com/v2-192bd9865b4e14399ac7e6d8c5fe9c32_b.jpg)

![](https://pic1.zhimg.com/80/v2-192bd9865b4e14399ac7e6d8c5fe9c32_720w.jpg)

至此就大功告成了，看到现在的配置目录简直是舒服！！！

## **关于coc与deoplete**

coc确实集成了很多东西，而且配置简单，易上手，性能优秀，最近用coc写react的时候确实很舒服！！！

ncm2我没用过，所以不太清楚，关于coc与deoplete是有区别的，看似都在做一件事，其实deoplete是个自动完成补全的框架，而coc 更像是 all in one package approach for LSP。最近看到说补全速度的。deoplete进行了优化，说实话我之前很长用过很长一段时间deoplete，切换coc，在速度上我是没什么感觉哪个更快哪个更慢。

所以这2个插件都是五星推荐： ★★★★★

或者你可以像我一样 vim 和neovim都用，2个配置，一个deoplete 一个coc。鱼和熊掌兼得了

[taigacute/mydotfiles​github.com![图标](https://pic4.zhimg.com/v2-10dab5b58e56cd4283ea8899d93a0b2a_ipico.jpg)](https://link.zhihu.com/?target=https%3A//github.com/taigacute/mydotfiles)

最后附图我的配置

![](https://pic1.zhimg.com/v2-c4e4cc6952514f41dad77fe48f840010_b.jpg)

![](https://pic1.zhimg.com/80/v2-c4e4cc6952514f41dad77fe48f840010_720w.jpg)

编辑于 2019\-01\-22



ThinkVim

`

**[屏幕截图](https://github.com/hardcoreplayers/ThinkVim/wiki/Screenshots)** •使用 **[入门](https://github.com/hardcoreplayers/ThinkVim/wiki/QuickStart)** • **[快捷方式](https://github.com/hardcoreplayers/ThinkVim/wiki/Shorcuts)** • **[文档](https://github.com/hardcoreplayers/ThinkVim/blob/develop/docs)**

[![](https://user-images.githubusercontent.com/41671631/84489554-71c4f980-acd4-11ea-929a-4dfc0f9ea1bf.png)](https://user-images.githubusercontent.com/41671631/84489554-71c4f980-acd4-11ea-929a-4dfc0f9ea1bf.png)

> 对于某些用户，我编写了一个CLI来生成名为 [Jarvim的](https://github.com/glepnir/jarvim) vim配置[](https://github.com/glepnir/jarvim)

## `[](#features)Features`

*   简约的外观受到现代编辑的启发。
*   模块化架构，可实现更有条理的Neovim配置。
*   自动缩进检测和editorconfig集成。 让其他人争论制表符与 **空格** 。
*   由 [ripgrep](https://github.com/BurntSushi/ripgrep) 和 [vim\-clap](https://github.com/liuchengxu/vim-clap) 支持的快速搜索（和替换）实用程序[](https://github.com/liuchengxu/vim-clap)
*   vim和emacs组合的键绑定方案，以领导者和本地领导者前缀键（ SPC 和 ; ，默认为）为中心。
*   [coc.nvim的](https://github.com/neoclide/coc.nvim) 完整Lsp支持[](https://github.com/neoclide/coc.nvim)
*   使用60多个插件和由 [dein](https://github.com/Shougo/dein.vim) 支持的声明性插件管理，可在不到80ms的时间内快速启动[](https://github.com/Shougo/dein.vim)
*   美丽的statusline [spaceline.vim](https://github.com/hardcoreplayers/spaceline.vim)
*   色彩方案 [OceanicMaterial](https://github.com/hardcoreplayers/oceanic-material)
*   仪表 [板dashboard\-nvim](https://github.com/hardcoreplayers/dashboard-nvim)
*   交互式外壳安装语言支持

## `[](#installation)Installation`

```shell
git clone --depth=1 https://github.com/hardcoreplayers/ThinkVim.git ~/.config/nvim
cd ~/.config/nvim
bash scripts/install.sh
```

## `[](#uninstall)Uninstall`

```shell
bash scripts/cleanup.sh
```

## `[](#quick-start)Quick Start`

检查 [thinkvim Wiki](https://github.com/hardcoreplayers/ThinkVim/wiki) 页面或docs文件夹。
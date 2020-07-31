---
title: 如何配置 SpaceVim
---
[如何配置 SpaceVim](https://wsdjeg.spacevim.org/how-to-config-spacevim/)
本文将系统地介绍如何配置 SpaceVim，配置  SpaceVim  主要包括以下几个内容：

*   设置  SpaceVim  选项
*   启动/禁用模块
*   添加自定义插件
*   添加自定义按键映射以及插件配置

#### 设置 SpaceVim 选项

原先，在老版本的 SpaceVim 中，默认的配置文件是 init.vim。在  init.vim  文件内，我们可以通过  `let g:spacevim_*` 这样的语句来设置 SpaceVim 选项。而在新版的  SpaceVim  中，我们采用了  toml  作为默认配置文件，如果不熟悉  toml  语法的，可以先阅读一下  toml  的基本语法，当然不读也没关系， toml  已经是最简单的配置文件格式了。 所有的  SpaceVim  选项配置在一个字典里，key  为原先的选项名去除  `g:spacevim_` 前缀：

```
g:spacevim_enable_guicolors -> enable_guicolors

```

这一选项的值可为  true  或者  false，于是，写入配置即为：

```
[options]
    enable_guicolors = false

```

一些其他选项，有的值是数字，有的是字符串，字符串的格式和  vim script  类似，可以用单引号，也可以用双引号，比如：

```
[options]
    enable_guicolors = false
    snippet_engine = "neosnippet"
    statusline_separator = 'arrow'
    sidebar_width = 30

```

#### 启用/禁用   模块

SpaceVim  内置了很多模块，每一个模块由一些插件和相关配置组成，用于提供一些特定的功能，比如提供模糊搜索的模块， 提供版本控制的模块，以及提供语言开发支持的语言模块。 启用或者禁用模块，需要遵循一定的语法结构，并且配到  layers  列表内，比如我现在需要启用  shell  模块，设置模块选项 default\_position  和  default\_height,  这两个选项分别控制这  shell  窗口打开位置和高度：

```
[[layers]]
    name = "shell"
    default_position = "top"
    default_height = 30

```

如果要禁用一个模块，需要增添一个选项  enable,  并赋值  false，默认这个是  true。比如，我需要禁用  shell  模块， 可以这么写,  禁用模块时，除了  enable  这选项，其他选项可写可不写，因为已经不会生效。当然如果为了快速启用/禁用模块， 可以保持其他选项不变。

```
[[layers]]
    name = "shell"
    enable = false

```

#### 添加自定义插件

自定义插件配置语法和模块有点类似，将需要配置的插件，配置进  custom\_plugins  列表。比如，我需要添加  2  个插件， 可以参考以下语法：

```
[[custom_plugins]]
    name = "lilydjwg/colorizer"
    merged = 0

[[custom_plugins]]
    name = "tpope/vim-scriptease"
    merged = 0
    on_cmd = "Scriptnames"

```

大家可以看到，在添加自定义插件时，我们支持很多选项，这归功于 dein, dein  支持多种选项。

#### 自定义快捷键及插件配置

最后，我们来说下，如果添加自定义配置，和自定义快捷键。在使用  toml  配置  SpaceVim  时，我们提供了两个选项，位于  \[options\]  下： bootstrap\_before  和  bootstrap\_after,  这两个选项接受一个字符串最为值，该字符串值得是一个  vim  方法名。顾名思义，你可以通过这 两个选项定义两个  vim  方法，分别在载入配置时，和  vim  启动后被调用，在方法内，你可以加入一些  vim  脚本，比如快捷键， 比如插件的选项。 比如，在配置文件内加入如下内容：

```
[options]
    enable_guicolors = false
    snippet_engine = "neosnippet"
    statusline_separator = 'arrow'
    sidebar_width = 30
    bootstrap_before = "myspacevim#before"
    bootstrap_after = "myspacevim#after"

```

新建  ~/.SpaceVim.d/autoload/myspacevim.vim,  加入内容：

```
function! myspacevim#before() abort
    let g:neomake_enabled_c_makers = ['clang']
    nnoremap jk <esc>
endf
function! myspacevim#after() abort
endf

```

在上述这个方法内部，目前只定义了一个变量和快捷键，用户可以添加一些其他的 vim 脚本，比如定制一些 autocmd

```
augroup MySpaceVim
  au!
  autocmd FileType markdown setlocal nowrap
augroup END

```

也是应大多数人要求，更新的这篇文字，仓促之下，有很多内容可能还不完整，如果有什么疑问，欢迎留言。
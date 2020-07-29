---
title: 无插件Vim配置文件vimrc推荐与各VIM配置项解释
description: 无插件配置是新手入门最好的配置
---
# 无插件Vim配置文件vimrc推荐与各VIM配置项解释

> 无插件配置是新手最好的配置，他可以根据需要对应来关闭你不需要的模块。
也方便新手更好的理解VIM

## vim基础配置

```shell
set nocompatible                " don't bother with vi compatibility "
#用于关闭 compatible，表示不与 Vi 兼容。
set autoread                    " reload files when changed on disk, i.e. via `git checkout` "
#autoread 表示如果当前文件在 Vim 外被修改且未在 Vim 里面重新载入的话，则自动重新读取。
set shortmess=atI   
#选项用于设置Vim缩短消息长度的标志位列表，例如，shortmess=m 表示用 “[+]” 代替 “[Modified]”，推荐通过 :h shortmess 查看 shortmess 选项的详细介绍                    
set magic                       " For regular expressions turn magic on "
#选项用于改变搜索模式使用的特殊字符，推荐阅读Vim搜索字符转义与magic搜索模式。
set title                       " change the terminal's title "
#用于设置 Vim 窗口标题。
set nobackup                    " do not keep a backup file "                                                                    
#用于关闭 backup，设置覆盖文件时不保留备份文件。                      
                    
set noerrorbells                " don't beep "
#用于关闭 errorbells 选项，表示 Vim 有错误信息时不响铃。
set visualbell t_vb=            " turn off error beep/flash "
#visualbell表示使用可视响铃代替鸣叫，而显示可视响铃的终端代码由 t_vb 选项给出。如果既不想要响铃也不想要闪烁，使用 :set visualbell t_vb= 实现。
set t_vb=           
set timeoutlen=500
#表示以毫秒计的等待键码或映射的键序列完成的时间，推荐阅读Vim操作符待决模式(Vim Operator-Pending mode)。
```
## Vim编码设置
```shell
set encoding=utf-8
#encoding 设置 Vim 内部使用的字符编码，它应用于缓冲区、寄存器、表达式所用的字符。  
set fileencodings=ucs-bom,utf-8,cp936,gb18030,big5,euc-jp,euc-kr,latin1
#fileencodings 设置一个字符编码的列表，表示 Vim 自动检测文件编码时的备选字符编码列表。
set fileformats=unix,dos,mac  #用于设置参与自动检测换行符 () 格式类型的备选列表

set termencoding=utf-8                                                                                                                          
#用于设置终端使用的编码方式。
set formatoptions+=m
set formatoptions+=B
#formatoptions 表示自动排版完成的方式。Vim 在可视化模式下，可使用 = 进行代码格式的自动排版。m 表示在任何值高于 255 的多字节字符上分行；B 表示在连接行时，不要在两个多字节字符之间插入空格。
```

* encoding 设置 Vim 内部使用的字符编码，它应用于缓冲区、寄存器、表达式所用的字符。
* fileencodings 设置一个字符编码的列表，表示 Vim 自动检测文件编码时的备选字符编码列表。
* fileformats 用于设置参与自动检测换行符 () 格式类型的备选列表。

* termencoding 用于设置终端使用的编码方式。

* formatoptions 表示自动排版完成的方式。Vim 在可视化模式下，可使用 = 进行代码格式的自动排版。m 表示在任何值高于 255 的多字节字符上分行；B 表示在连接行时，不要在两个多字节字符之间插入空格。

## Vim界面显示设置
```shell
set ruler                       " show the current row and column "
set number                      " show line numbers "
set nowrap
set showcmd                     " display incomplete commands "
set showmode                    " display current modes "
set showmatch                   " jump to matches when entering parentheses "
set matchtime=2                 " tenths of a second to show the matching parenthesis "
```

* `ruler` 用于显示当前光标所在位置的行号和列号 (逗号分隔)。如果还有空间，在最右端显示文本在文件中的相对位置。

![Vim-ruler配置](https://image.vimjc.com/images/vim-ruler.png)

* `number` 用于设置显示行号。`nowrap` 设置超过窗口宽度的行不自动回绕显示。

* `showcmd` 用于设置在屏幕最后一行显示 (部分的) 命令。`showmode` 在插入、替换和可视模式里，在最后一行提供消息。

* `showmatch` 表示插入括号时短暂地跳转到与之匹配的对应括号，而停留的时间由 `matchtime` 选项设置。如果置位 ‘showmatch’，`matchtime` 表示显示配对括号的十分之一秒。

## Vim查找配置

```shell
set hlsearch                    " highlight searches "
set incsearch                   " do incremental searching, search as you type "
set ignorecase                  " ignore case when searching "
set smartcase                   " no ignorecase if Uppercase char present "
```
* `hlsearch` 用于设置将搜索结果高亮显示，而 `incsearch` 选项会让 Vim 根据已经在查找域中输入的文本，预览第一处匹配目标；每当新输入一个字符时，Vim 会即时更新预览内容。

* 当 `ignorecase` 和 `smartcase` 选项均打开时，如果搜索模式中包含大写字母，Vim就会认为当前的查找(搜索)是区分大小写的。如果搜索模式中不包含任何大写字母，Vim 则会认为搜索应该不区分大小写。这是个比较 ”智能的” 推测你搜索意图的机制。

>推荐阅读：[Vim增量查找与incsearch实时查找预览](https://vimjc.com/vim-incsearch.html)、[Vim搜索命令使用方法和技巧](https://vimjc.com/vim-search.html)。

## Vim Tab制表符设置
```shell
set expandtab                   " expand tabs to spaces "
set smarttab        
set shiftround
```

* `expandtab` 选项用于设置在Vim插入模式下按下 **Tab** 键时，输入到Vim中的都是空格。`smarttab` 表示插入 Tab 时使用 `shiftwidth`。

* `shiftround` 表示缩进列数对齐到 `shiftwidth` 值的整数倍。参考：[Vim自动缩进配置、原理和tab键制表符](https://vimjc.com/vim-indent.html)。

## Vim缩进配置

```shell
set autoindent smartindent shiftround
set shiftwidth=4
set tabstop=4
set softtabstop=4                " insert mode tab and backspace use 4 spaces "
```

* `autoindent` 用于设置新增加的行和前一行具有相同的缩进形式。
* `smartindent` 选项用于设置新增行时进行”智能”缩进，主要用于 C 语言一族，与 `cindent` 选项类似。
  >在Vim smartindent 缩进模式下，每一行都有相同的缩进量，直到遇到右大括号 (}) 取消缩进形式。

* `shiftwidth` 选项用于设置执行Vim普通模式下的缩进操作 ( `<<` 和 `>>` 命令 )时缩进的列数。
*  `shiftround` 选项则表示缩进列数会自动取整到 ‘shiftwidth’ 选项值的倍数。

* `tabstop` 选项设置按下 `Tab` 键时，缩进的空格个数。

## Vim显示当前光标位置

```shell
set cursorcolumn
set cursorline
```

* `cursorcolumn` 设置高亮显示光标当前所在列，
* `cursorline` 设置高亮显示光标所在屏幕行。
    >更多内容，请阅：[Vim快速跳转任意行、任意列以及高亮显示当前行、当前列](https://vimjc.com/vim-cursorline-column.html)。

![Vim高亮显示行列](https://image.vimjc.com/images/691e0c29gy1fu1ljb55mkj21hc0u0ai8.jpg)

## Vim文件类型设置

```shell
filetype on
filetype plugin on
filetype indent on

autocmd FileType python set tabstop=4 shiftwidth=4 expandtab ai
autocmd FileType ruby set tabstop=2 shiftwidth=2 softtabstop=2 expandtab ai
autocmd BufRead,BufNew \*.md,\*.mkd,\*.markdown set filetype=markdown.mkd

autocmd BufNewFile \*.sh,\*.py exec \\":call AutoSetFileHead()\\"
function! AutoSetFileHead()
 " .sh "
 if &filetype == 'sh'
 call setline(1, "\\#!/bin/bash")
 endif

 " python "
 if &filetype == 'python'
 call setline(1, "\\#!/usr/bin/env python")
 call append(1, "\\# encoding: utf\-8")
 endif

 normal G
 normal o
 normal o
endfunc

autocmd FileType c,cpp,java,go,php,javascript,puppet,python,rust,twig,xml,yml,perl autocmd BufWritePre <buffer> :call <SID>StripTrailingWhitespaces()
fun! <SID>StripTrailingWhitespaces()
 let l = line(".")
 let c = col(".")
 %s/\\s\\+$//e
 call cursor(l, c)
endfun
```

* `filetype on` 配置项是 Vim 文件类型检测功能的开关；
* `filetype plugin on` 用于 Vim 打开加载文件类型插件功能；
* `filetype indent on` 用于指定 Vim 为不同类型的文件定义不同的缩进格式。

* `autocmd FileType python set tabstop=4 shiftwidth=4 expandtab ai` 表示对于 * `Python` 文件 (通过 [`autocmd` 命令](https://vimjc.com/vim-autocmd.html)指示 Vim 监听 **FileType** 事件)，自动设置 Tab 键对应的空格个数等。

* `autocmd BufNewFile *.sh,*.py exec \":call AutoSetFileHead()\"` 表示新建后缀为 **.sh**、**.py** 的文件时，自动执行 AutoSetFileHead 函数。AutoSetFileHead 函数基本的逻辑是在新文件的首行自动插入部分内容，例如，新建 shell 脚本自动添加 **#!/bin/bash”**，然后新增两个空白行 (通过 `normal G`、`normal o`、`normal o` 三行实现)。

>**注**：AutoSetFileHead 函数里使用了 `normal` 命令，可以阅读《[Vim normal命令和重复操作](https://vimjc.com/vim-normal-command.html)》了解该命令的细节。

## Vim按键映射配置

以下Vim按键映射配置的详细功能介绍，请阅读：《[常用Vim命令及实用Vim按键映射配置详解](https://vimjc.com/vim-commands-and-vim-mapping-conf.html)》。

```shell
nnoremap k gk
nnoremap gk k
nnoremap j gj
nnoremap gj j

map <C\-j> <C\-W>j
map <C\-k> <C\-W>k
map <C\-h> <C\-W>h
map <C\-l\> <C\-W>l

nnoremap <F2> :set nu! nu?<CR>
nnoremap <F3> :set list! list?<CR>
nnoremap <F4> :set wrap! wrap?<CR>

set pastetoggle=<F5>            "    when in insert mode, press <F5> to go to "
 "    paste mode, where you can paste mass data "
 "    that won't be autoindented "
au InsertLeave \* set nopaste
nnoremap <F6> :exec exists('syntax\_on') ? 'syn off' : 'syn on'<CR>

inoremap kj <Esc>
nnoremap <leader>q :q<CR>
nnoremap <leader>w :w<CR>

map <Leader>sa ggVG"

" undo
nnoremap U <C\-r>
nnoremap ' \`
nnoremap \` '

nnoremap <silent> n nzz
nnoremap <silent> N Nzz
nnoremap <silent> \* \*zz
nnoremap <silent> \# #zz
nnoremap <silent> g\* g\*zz
noremap <silent><leader>/ :nohls<CR>

vnoremap < <gv
vnoremap > >gv

map Y y$

nnoremap ; :

nnoremap H ^
nnoremap L $

cmap w!! w !sudo tee >/dev/null %

cnoremap <C\-j> <t\_kd>
cnoremap <C\-k> <t\_ku>
cnoremap <C\-a\> <Home>
cnoremap <C\-e\> <End>
```

* `nnoremap gk k` 表示将 `gk` [按键映射](https://vimjc.com/vim-map.html)为 `k`，从[Vim光标移动之实际行与屏幕行](https://vimjc.com/vim-line-downward.html)一文可知，`gk` 表示上移一个屏幕行。

* `cnoremap <C-a> <Home>` 表示将 `<Ctrl> a` 组合键映射为 **Home** 键，实现在 Vim 命令行模式下 按 `<Ctrl> a` 移动光标到最前面，类似于《[高效Linux技巧及Vim命令](https://vimjc.com/linux-vim-tricks.html)》一文提到的快速移动光标到行首的效果。

* ![vim按键映射](https://image.vimjc.com/images/linux-tricks-1.gif)

## 参考文献

[无插件Vim配置文件vimrc推荐与各VIM配置项解释](https://vimjc.com/vimrc.html#9%E3%80%81Vim%E6%8C%89%E9%94%AE%E6%98%A0%E5%B0%84%E9%85%8D%E7%BD%AE)
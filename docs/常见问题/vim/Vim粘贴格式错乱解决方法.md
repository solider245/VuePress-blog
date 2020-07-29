---
title : Vim粘贴格式错乱解决方法
description: 这个可能是最常见的问题了，这里尝试解决
---
# Vim粘贴格式错乱解决方法
有问题就解决！

## 两种方法解决

### :set paste法

在粘贴的时候，先进入set paste模式，然后再输入`i`进入编辑，这样就能解决了

```shell
:set paste
```
![vim粘贴](https://images-1255533533.cos.ap-shanghai.myqcloud.com/vim-paste.gif)
vim教程网给我们做了一个不错的动图。

也可以在你的vimrc中，增加这行代码：
```shell
set pastetoggle=<F3>             # 按F3进入粘贴模式
autocmd InsertLeave * set nopaste # 退出插入模式后自动关闭粘贴模式
```
>[Vim命令`autocmd`](https://vimjc.com/vim-autocmd.html) 用于指示 Vim 监听某一类事件，一旦该事件发生，Vim 将执行指定的命令。

>`InsertLeave` 表示 *离开插入模式* 事件。如[Vim粘贴文本格式错乱](https://vimjc.com/vim-paste.html)介绍，`paste` 选项可避免粘贴文本到Vim中出现格式错乱。但是该选项会使得 `autoindent` 等选项失效。

>所以一般只有在 Vim 插入模式下才会启用 `paste` 选项，退出插入模式后关闭对应功能。

以下设置可完成上述功能，保证退出 Vim 插入模式后自动关闭 `paste` 选项。

这样的话，你只要按F3即可进入粘贴模式。F3也可以换成你喜欢的其他键。
有时候需要取消粘贴模式的话，你也可以输入：
```shell
set nopaste
```
来取消粘贴模式。

### 无插件设置法

有时候插件放在github，这个时候我们无法安装插件，可以将下列代码直接复制进入你的vimrc配置里。
```shell
" Code from:
" http://stackoverflow.com/questions/5585129/pasting-code-into-terminal-window-into-vim-on-mac-os-x
" then https://coderwall.com/p/if9mda
" and then https://github.com/aaronjensen/vimfiles/blob/59a7019b1f2d08c70c28a41ef4e2612470ea0549/plugin/terminaltweaks.vim
" to fix the escape time problem with insert mode.
"
" Docs on bracketed paste mode:
" http://www.xfree86.org/current/ctlseqs.html
" Docs on mapping fast escape codes in vim
" http://vim.wikia.com/wiki/Mapping_fast_keycodes_in_terminal_Vim

if exists("g:loaded_bracketed_paste")
  finish
endif
let g:loaded_bracketed_paste = 1

let &t_ti .= "\<Esc>[?2004h"
let &t_te = "\e[?2004l" . &t_te

function! XTermPasteBegin(ret)
  set pastetoggle=<f29>
  set paste
  return a:ret
endfunction

execute "set <f28>=\<Esc>[200~"
execute "set <f29>=\<Esc>[201~"
map <expr> <f28> XTermPasteBegin("i")
imap <expr> <f28> XTermPasteBegin("")
vmap <expr> <f28> XTermPasteBegin("c")
cmap <f28> <nop>
cmap <f29> <nop>
```
**代码作用**：
>您需要使用支持 [方括号粘贴模式](http://cirw.in/blog/bracketed-paste) 的现代xterm兼容终端仿真器 。 已知xterm，urxvt，iTerm2，gnome\-terminal（以及其他使用libvte的终端）都可以工作。

>然后，每当你在 *插入模式* ，并使用粘贴到你的终端仿真器 `command+v` ， `shift+insert` ， `ctrl+shift+v` 或者 `middle-click` ，VIM将自动 `:set paste` 为您服务。

### 有插件设置法

```shell
cd ~/.vim/bundle # 切换到你的插件目录
git clone https://github.com/ConradIrwin/vim-bracketed-paste
```
## 参考文献

[VIM缩进插件地址](https://github.com/ConradIrwin/vim-bracketed-paste)
[Vim粘贴格式错乱解决方法-Vim入门教程(16)](https://vimjc.com/vim-paste.html)
---
title : 如何使用rsync命令行工具同步两个文件夹？
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-10 00:33:37 +0800
categories:
 -
tags:
 -
---
[[toc]]

## 原始问题
从Windows迁移到Linux之后，我想找到Winmerge的替代软件，或者想学习命令行工具来比较和同步Linux上的两个文件夹。如果您能告诉我如何在命令行上执行以下任务，我将不胜感激...（我研究过diff和rsync，但我仍然需要一些帮助。）

我们有两个文件夹：“ / home / user / A”和“ / home / user / B”

文件夹A是保存常规文件和文件夹的位置，文件夹B是充当文件夹A完整镜像的备份文件夹。（用户在文件夹B中没有直接保存或修改的内容。）

我的问题是：

*   如何列出仅存在于文件夹B中的文件？（例如，自上次同步以来从文件夹A中删除的文件。）

*   如何将仅存在于文件夹B中的文件复制回文件夹A中？

*   如何列出两个文件夹中都存在但具有不同时间戳或大小的文件？（自上次同步以来已在文件夹A中进行过修改的文件。我想避免使用校验和，因为有成千上万个文件，这会使处理速度太慢。）

*   如何将文件夹A的精确副本复制到文件夹B中？我的意思是，将文件夹A中的所有内容复制到仅存在于文件夹A中的文件夹B中，并将文件夹B中仅存在于文件夹B中的所有内容删除，但不要触摸两个文件夹中相同的文件。

## 最佳答案

这会将文件夹A放入文件夹B：

```shell
rsync -avu --delete "/home/user/A" "/home/user/B"

```

如果希望**文件夹A和B**的**内容**相同，则将其`/home/user/A/`（带有斜线）作为源。这不占用文件夹A，而是所有内容，并将其放入文件夹B。像这样：

```shell
rsync -avu --delete "/home/user/A/" "/home/user/B"

```

*   `-a` 进行同步以保留所有文件系统属性
*   `-v` 冗长地跑
*   `-u` 仅复制修改时间较新的文件（如果时间相等，则复制大小不同的文件）
*   `--delete` 删除目标文件夹中源文件中不存在的文件

手册页：[https](https://download.samba.org/pub/rsync/rsync.html) : [//download.samba.org/pub/rsync/rsync.html](https://download.samba.org/pub/rsync/rsync.html)

## 加入参数-c 


TuxForLife的答案很好，但我强烈建议您`-c`在本地同步时使用。您可以辩解说，为远程同步这样做不值得花费时间/网络代价，但是对于本地文件来说完全值得，因为速度是如此之快。

> ```
> -c, --checksum
>        This forces the sender to checksum every regular file using a 128-bit  MD4
>        checksum.   It  does this during the initial file-system scan as it builds
>        the list of all available files. The receiver then checksums  its  version
>        of  each  file  (if  it exists and it has the same size as its sender-side
>        counterpart) in order to decide which files need to be updated: files with
>        either  a  changed  size  or a changed checksum are selected for transfer.
>        Since this whole-file checksumming of all files on both sides of the  con-
>        nection  occurs  in  addition to the automatic checksum verifications that
>        occur during a file's transfer, this option can be quite slow.
>
>        Note that rsync always verifies that each transferred file  was  correctly
>        reconstructed  on  the receiving side by checking its whole-file checksum,
>        but that automatic after-the-transfer verification has nothing to do  with
>        this  option's  before-the-transfer  "Does  this file need to be updated?"
>        check.
>
> ```

这显示了具有相同大小和时间戳的方法会使您失败。

# 设置

```shell
$ cd /tmp

$ mkdir -p {A,b}/1/2/{3,4}

$ echo "\___________from A" | \
      tee A/1/2/x  | tee A/1/2/3/y  | tee A/1/2/4/z  | \
  tr A b | \
      tee b/1/2/x  | tee b/1/2/3/y  | tee b/1/2/4/z  | \
      tee b/1/2/x0 | tee b/1/2/3/y0 >     b/1/2/4/z0

$ find A b -type f | xargs -I% sh -c "echo %; cat %;"
A/1/2/3/y
\___________from A
A/1/2/4/z
\___________from A
A/1/2/x
\___________from A
b/1/2/3/y
\___________from b
b/1/2/3/y0
\___________from b
b/1/2/4/z
\___________from b
b/1/2/4/z0
\___________from b
b/1/2/x
\___________from b
b/1/2/x0
\___________from b

```

# rsync不复制任何内容，因为文件都具有相同的大小和时间戳

```shell
$ rsync -avu A/ b
building file list ... done

sent 138 bytes  received 20 bytes  316.00 bytes/sec
total size is 57  speedup is 0.36

$ find A b -type f | xargs -I% sh -c "echo %; cat %;"
A/1/2/3/y
\___________from A
A/1/2/4/z
\___________from A
A/1/2/x
\___________from A
b/1/2/3/y
\___________from b
b/1/2/3/y0
\___________from b
b/1/2/4/z
\___________from b
b/1/2/4/z0
\___________from b
b/1/2/x
\___________from b
b/1/2/x0
\___________from b

```

# 正确工作的rsync，因为它比较校验和

```shell
$ rsync -cavu A/ b
building file list ... done
1/2/x
1/2/3/y
1/2/4/z

sent 381 bytes  received 86 bytes  934.00 bytes/sec
total size is 57  speedup is 0.12

$ find A b -type f | xargs -I% sh -c "echo %; cat %;"
A/1/2/3/y
\___________from A
A/1/2/4/z
\___________from A
A/1/2/x
\___________from A
b/1/2/3/y
\___________from A
b/1/2/3/y0
\___________from b
b/1/2/4/z
\___________from A
b/1/2/4/z0
\___________from b
b/1/2/x
\___________from A
b/1/2/x0
\___________from b
```


## 双向同步工具unison
您可以使用`unison`U Penn的Benjamin Pierce开发的工具。

让我们假设您有两个目录，

`/home/user/Documents/dirA/` 和 `/home/user/Documents/dirB/`

要同步这两个，可以使用：

〜$`unison -ui text /home/user/Documents/dirA/ /home/user/Documents/dirB/`

在输出中，`unison`将显示您要求同步的两个目录中每个*不同的*目录和文件。建议在初次运行时进行附加同步（在两个位置都复制丢失的文件），然后在计算机上创建并维护一个同步树，在以后的运行中它将实现真正的同步（即，如果从中删除文件`.../dirA`，将得到删除`.../dirB`为好。你也可以比较每一个变化和可选选择*转发*或*反转*的两个目录之间同步。

（可选）要启动图形界面，只需`-ui text`从命令中删除该选项，尽管我发现使用起来`cli`更简单，更快捷。

有关更多信息：[Unison用户文档](https://www.cis.upenn.edu/~bcpierce/unison/download/releases/stable/unison-manual.html#tutorial "Unison用户文档上的Unison教程")上的[Unison教程](https://www.cis.upenn.edu/~bcpierce/unison/download/releases/stable/unison-manual.html#tutorial "Unison用户文档上的Unison教程")。


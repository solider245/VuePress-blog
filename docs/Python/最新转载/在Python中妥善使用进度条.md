---
title : 在Python中妥善使用进度条
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-05 00:35:40 +0800
categories:
 -
tags:
 -
---
[[toc]]
## **1 简介**

在日常运行程序的过程中经常会涉及到 **循环迭代** 过程，对于运行过程有明显耗时的涉及 **循环迭代** 的程序，为其加上 **进度条** （ *progress bar* ），是帮助我们监测代码执行进度以及处理中间异常错误非常实用的技巧，但对于执行时间很短的程序来说倒无所谓。

![在Python中妥善使用进度条](http://p1-tt.byteimg.com/large/pgc-image/b23174503f984b17ae880b47a0d8a08c?from=pc)

本文就将为大家介绍 Python 中非常实用又风格迥异的两个进度条相关库—— tqdm 与 alive\-progress 的主要用法。

## **2 tqdm常用方法**

tqdm 是 Python 中所有进度条相关库中最出名的，既然是最出名的，自然有它独到之处。

tqdm 不仅可以生成基础的可在终端中显示的进度条，还可以配合 jupyter notebook 和 jupyter lab 生成更加美观的网页 **交互** 部件形式的进度条，更是和 pandas 强强联手，为 pandas 中的一些操作提供专有的进度条功能。

下面我们来对 tqdm 的主要功能进行介绍。

## **2.1 基础用法**

因为是第三方库，首先需要利用 pip install tqdm 或 conda install \-c conda\-forge tqdm 对其进行安装，安装完成后先来看看它最基本的用法：

![在Python中妥善使用进度条](http://p3-tt.byteimg.com/large/pgc-image/8e7b6c4b9325486cbc39efbfccee5ea1?from=pc)

利用 tqdm.tqdm ，将 for 循环过程中进行迭代的对象简单包裹，就实现了为循环过程添加进度条以及打印执行速度、已运行时间与预估剩余运行时间等实用信息的功能，同样也可用于 **列表推导** ：

![在Python中妥善使用进度条](http://p3-tt.byteimg.com/large/pgc-image/c1d72b68f2674c17bb2d0f2e87546363?from=pc)

而针对迭代对象是 range() 的情况， tqdm 还提供了简化版的 trange() 来代替 tqdm(range()) ：

![在Python中妥善使用进度条](http://p1-tt.byteimg.com/large/pgc-image/c579fe0404a14de1a2d938faa0dd53fe?from=pc)

其附带的参数 desc 还可以帮助我们设置进度条的说明文字：

![在Python中妥善使用进度条](http://p3-tt.byteimg.com/large/pgc-image/c4022ad22c774fd9b470f8b7000ef9cc?from=pc)

而如果想要在迭代过程中变更说明文字，还可以预先实例化进度条对象，在需要刷新说明文字的时候执行相应的程序：

![在Python中妥善使用进度条](http://p6-tt.byteimg.com/large/pgc-image/643284d9eb714602b3e8a29978571baa?from=pc)

但当迭代的对象长度一开始未知时，譬如对 pandas 中的 DataFrame.itertuples() 进行迭代，我们就只能对其执行速度等信息进行估计，但无法看到进度条递增情况，因为 tqdm 不清楚迭代的终点如何：

![在Python中妥善使用进度条](http://p1-tt.byteimg.com/large/pgc-image/3934676f143646b4be04c26958dd8e28?from=pc)

## **2.2 配合jupyter notebook/jupyter lab的美观进度条**

tqdm 对 jupyter notebook 和 jupyter lab 有着特殊的支持，且使用方法非常简单，只需要将原有的 from tqdm import XXX 的相应功能导入格式修改为 from tqdm.notebook import XXX 就可以了，以 trange 为例：

![在Python中妥善使用进度条](http://p6-tt.byteimg.com/large/pgc-image/ffb7f2157fd34fd3b27d3abb7fb9d728?from=pc)

## **2.3 配合pandas中的apply**

tqdm 对 pandas 中的 apply() 过程提供了特殊的支持，因为 pandas 中的 apply() 本质上就是串行循环运算，你可以将 pandas 中的任何 apply 操作替换为 progress\_apply ，并且记住每个单独的 progress\_apply 前要先执行 tqdm.pandas() ，就像下面的例子一样：

![在Python中妥善使用进度条](http://p1-tt.byteimg.com/large/pgc-image/f82c8701ac204fccb32e34b09b7bf1d5?from=pc)

## **3 alive\-progress常用方法**

虽然与 tqdm 一样都是为了给循环过程加上进度条而诞生的库，但 alive\-progress 相比 tqdm增加了更多花样繁多的动态效果，我们通过调用其专门提供的 showtime() 函数可以查看所有可用的动态进度条样式：

![在Python中妥善使用进度条](http://p6-tt.byteimg.com/large/pgc-image/3aca3c74dde24436a9ec781254232dab?from=pc)

同样类似地可以查看所有进度条样式：

![在Python中妥善使用进度条](http://p1-tt.byteimg.com/large/pgc-image/0520612e12494f07bf77fbe2964e0398?from=pc)

使用起来也是非常简单，但与 tqdm 用法区别很大，需要配合 with 关键词，譬如下面我们使用到 alive\_progress 中的 alive\_bar 来生成动态进度条：

![在Python中妥善使用进度条](http://p6-tt.byteimg.com/large/pgc-image/b94ce8ba93ba481f8e326df7eb6fd3a0?from=pc)

通过修改 bar 参数来改变进度条的样式：

![在Python中妥善使用进度条](http://p3-tt.byteimg.com/large/pgc-image/ab76edf2511d4f75bbc3f45b4a0bbafb?from=pc)

**大家平时学习Python的时候肯定会遇到很多问题，小编我为大家准备了Python学习资料，将**
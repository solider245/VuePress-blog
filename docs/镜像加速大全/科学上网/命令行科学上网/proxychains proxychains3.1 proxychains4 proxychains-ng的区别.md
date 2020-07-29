---
title: proxychains proxychains3.1 proxychains4 proxychains-ng的区别 
description: 应该是目前能找到的最方便好用的办法了。
---

# proxychains proxychains3.1 proxychains4 proxychains-ng的区别

同样都是proxychains，但是却经常出现。相信大部分人和我一样，被搞的稀里糊涂了。
今天就来和大家一起理清这个关系。
## 两个作者

>首先，万事皆有源。出现这种情况的原因，主要是因为两个作者。

### proxychains原始作者Adam Hamsik
一个作者叫Adam Hamsik，仓库地址是 github.com/head，
![20200729123329_6f7d068a72aa45ffdd984dda88391659.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729123329_6f7d068a72aa45ffdd984dda88391659.png)来自斯洛伐克首都布拉迪斯拉发。
![20200729123232_3a1d96f71ecdafaddb664d4166a46ff7.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729123232_3a1d96f71ecdafaddb664d4166a46ff7.png)
（布拉迪斯拉发位置。就在维也纳隔壁）
他开发了proxychains的最早版本，并且一直把他从1更新到了4，一直到2012年停更。
![20200729123731_2fbd17a4211b00080cbc493bc8f9534b.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729123731_2fbd17a4211b00080cbc493bc8f9534b.png)
然后，proxychains3.1应该是最经典的版本，也就是大多数软件包安装的时候直接指定的版本。
>是的，尽管proxychains原始版本已经有四代了。但是绝大多数软件包目前安装的依然是3.1版本。

大部分情况下，默认命令都是`proxychains`。

### proxychains-ng 作者 rof10r
`proxychains ng (new generation) `
这个就是他的全称。也就是说，他是在proxychains的基础上开发了一个新的版本。由于老版本3.1很经典，所以他就直接叫proxychains4。
默认的命令就是proxychains4。
从更新时间上来看，在2012年之后，一直都是ng在更新。
![20200729124508_7ac3a0b4efa6481b9cf7c7be2f5fdcfb.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729124508_7ac3a0b4efa6481b9cf7c7be2f5fdcfb.png)

## 两者的区别是什么呢？
大部分情况下，两者的功能都是相同的。所不同的在于

* proxychains配置代理后所有的连接都会走代理，包括对回环地址的访问
* proxychains ng提供了一个功能，可以让你在访问回环地址的时候绕过代理，使用直连。

国内用户使用的时候大部分的情况下都是功能一，很少能用到功能2，所以，在国内用户来说，基本上两个软件的功能是完全一致的。你可以安装任意一个，同时，由于两个版本的命令不同，所以你同时安装两个也不会起冲突。
![20200729125808_1b83a21911b4bca835f4699a74a5a28f.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729125808_1b83a21911b4bca835f4699a74a5a28f.png)
包括两者的配置文件使用的也不是一个。

## 本文参考文章
[Ubuntu安装Proxychains](https://cloud.tencent.com/developer/article/1157554)
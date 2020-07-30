---
title: VuePress常见优化
description: 帮助大家搞清楚优化的项目以及细节
---

## 常见优化项目

VuePress常见的优化项目有以下类型。
* markdown:markdownConfig,
* plugins: pluginsConfig,
* head: headConfig,
* themeConfig: 插件配置
  * nav     导航栏
  * sidebar 侧边栏 
    
一个config文件如果把这些项目都集中到一起的话，不仅会让人看到眼花缭乱，后期维护起来也很麻烦。所以现在一般都流行将config文件分割进行模块化管理。

## 模块化图片
![20200730233638_12f336a7b41d19e7c58610d6b3acdfcc.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200730233638_12f336a7b41d19e7c58610d6b3acdfcc.png)

如上图所示。config作为一个主体，只维护一些简单的参数。基本上不怎么变化的参数。
而导航栏、侧边栏、插件、head等等头部属性因为涉及到经常变动，所以就单独拿出来作为一部分。然后两者之间再通过引入来起作用。

## 通常做法
一般来说是，在你的网站目录下面新建一个config文件夹，然后在这个文件夹里再新建各种配置。

![20200730234326_3db272bdc65a8acf8122fd8ea28ca1dd.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200730234326_3db272bdc65a8acf8122fd8ea28ca1dd.png)

如上图所示。
![20200730234419_60fe9db1176e4bc3c227f10514391e28.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200730234419_60fe9db1176e4bc3c227f10514391e28.png)

因我的导航页做示范。如果我把的导航页也丢到config文件的话。那打开的时候会非常大，查阅起来也非常的不方便。

---
title : 如何用 Gatsby 和 Netlify 打造你的梦幻博客
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-19 06:50:59 +0800
categories:
 -
tags:
 -
---
[[toc]]

 [![](https://kalasearch.cn/static/88c97afa7a4f416c316340f3e4d7277b/6af66/rocket-feature.png)](/static/88c97afa7a4f416c316340f3e4d7277b/6af66/rocket-feature.png) 

Powered by Gatsby

在创立[卡拉搜索](/)之初，我们就决定，卡拉的网站一定要与众不同。

首先，它需要内容丰富，提供有价值的信息，即使读者不是我们的用户，也可以受益。

其次它需要能秒开，不能臃肿。如果让用户看着 Chrome 进度条蜗牛爬，即使我们做的搜索引擎再快，用户也会觉得整个体验慢。

同时，我们相对缺乏前端经验，但又对定制性要求较高，因此需要框架相对简单，灵活度要允许我们慢慢迭代。

于是，我们尝试了很多开源的闭源的博客方案，比如 Wordpress，但最终放弃。

原因是 Wordpress 虽然极度灵活，但因为其年代久远，在 PHP 的包袱下已经裹得太厚，能给我们发挥的空间真的不多。

我们对博客的需求其实相对简单

1.  需要能支持 Markdown 和 MDX，因为我们要展示很多代码
2.  需要能协同，因为有多个作者需要写作
3.  需要定制性比较强，不管是功能和外观上都需要可以用比较简单的 JS/CSS 直接定制
4.  维护成本应该尽量小，毕竟我们是一家软件公司，而不是一家专门做媒体网站的公司

在一系列探索后，我们成功地实现了一键部署，以及全国范围内的 1 秒内首页加载。

本文中我们会介绍我们的经历，同时给出一个简单教程，帮助第一次搭建 Gatsby 的用户。本文对应的代码附在 GitHub 上：[GitHub Gatsby 设置中文教程](https://github.com/Kalasearch/tutorials/tree/master/gatsby/gatsby-blog-setup-tutorial-with-netlify)

 [![](https://kalasearch.cn/static/f156ac28a3e681e8321360be52b2ec3e/5a190/kalasearch-speed-test.png)](/static/f156ac28a3e681e8321360be52b2ec3e/2ef06/kalasearch-speed-test.png) 

卡拉搜索网站的全国测速

卡拉搜索网站技术栈
-----------------------------------------------------------------------------------------------

经过反复迭代，目前网站的技术栈定型为

 [![](https://kalasearch.cn/static/6835f8e383f9a6bd85fe51e9459754c3/5a190/kalasearch-website-tech-stack.png)](/static/6835f8e383f9a6bd85fe51e9459754c3/b2b2c/kalasearch-website-tech-stack.png) 

卡拉搜索网站技术栈

我们的所有博客文章都是由 Markdown 写成，而这些 Markdown 和整个网站直接存在了 GitHub 上。

每次有新文章被写出来后，我们会互相 review（用 GitHub Pull Request）。确定 review 没问题后，merge 到 master 分支。在 Netlify 中，我们设置了如果 master 分支有新改动，则会自动开始一次部署。

由于我们的文章即代码，而代码又在 Git 内，所以我们可以非常方便地管理内容，进行版本控制。

> 卡拉团队里每个人都可以熟练地使用 Git 和脑补 Markdown，因此我们并没有一个专门的 CMS（内容管理系统）。但如果你比较熟悉图形化界面，或者团队中的编辑、文案等不能直接用 Git 操作的话，可以考虑 Strapi，Ghost 之类非常成熟的 CMS，这些 CMS 与 Gatsby 的集成也非常好。

当 Netlify 部署完成后，生成的静态内容由阿里云全站加速分发，使用户在访问时速度足够快。

这篇文章里，我们开始介绍如何一步一步打造出卡拉的网站和博客的（我们的主网站和整个博客都是用 Gatsby 生成的），之后的文章中，我们会继续介绍如何与 Netlify 集成。同时我们给出一步步的例子和代码，方便你也可以开始搭建你的 Gatsby 网站。

> 如果对我们的后端搜索引擎技术栈感兴趣，也欢迎关注我们的[技术博客](/blog)或公众号（**HiXieke**)，我们会持续更新前沿前后端文章。

尝试 Wordpress
---------------------------------------------

最开始，我们尝试了 Wordpress

作为 Web 时代（包括现在）的 CMS 霸主，Wordpress 的确可以实现任何你能想到的功能。

但有很多功能，依靠的是不断地添加插件，而插件的质量非常良莠不齐。我们尝试的过程中，插件间出现各种兼容问题，当你把一个问题修复好的时候，另一个又会蹦出来。

同时， Wordpress 需要跑起来一个 PHP 服务器。我们本身对 PHP 没有意见，但跑起一个额外的 Server 就是一个额外的负担，同时团队中并没有人对 PHP 非常熟悉。也正因为此，我们已经写了一部分 [JavaScript 和 Python 的 SDK](/docs)，但一直还没有写 PHP的

对我们来说，最好的网站就是一系列静态页面，直接扔 CDN 上，省去维护服务器的烦恼，因此我们放弃了 Wordpress 的方案。

Gatsby 是什么
-------------------------------------------------

其实很早我们就听说过 Gatsby，以及其它一系列 Web 框架、CMS 的新秀，比如 Hexo 等等。

Gatsby 是一个静态网站生成框架。你可以用 Markdown 或其它语言写内容、页面等，Gatsby 会对应给你生成一个静态网站。之后你可以将静态网站直接放在 CDN 上，省去一个服务器成本。同时结合现代 CI 系统（比如 GitHub Actions），你还可以实现 push 到 github 直接更新全站的方便工作流。

Gatsby 本身设计是

*   React 作为逻辑和展示层
*   GraphQL 作为数据层

因此，在 Gatsby 上开发插件也相对简单。

顺便说一下，我们也计划之后开发一个在 Gatsby 和 Hexo 上的[全站搜索](/)插件，只要一键接入就可以实现网站的全站搜索。

为什么选择 Gatsby
---------------------------------------------------------------------

 [![](https://kalasearch.cn/static/2adec346489dfaf695a30eeb103b5325/5a190/gatsby-website.png)](/static/2adec346489dfaf695a30eeb103b5325/b3bac/gatsby-website.png) 

Gatsby 网站

我们选择 Gatsby 的原因其实也非常简单

1.  它是用我们熟悉的技术栈构建的，React + JS 因此出了问题不会慌
2.  它的分块做得非常好，用 GraphQL 将数据层和逻辑层非常干净地分开，这样对于维护网站的用户和只贡献内容的同事来说都很方便
3.  社区极大，而且正在非常疯狂地增长，所以需要几乎任何功能都可以非常容易地找到你需要的插件
4.  静态网站与 CI 结合，可以非常方便地更新部署，方便维护

Gatsby 的社区极大，目前有 2000 多个你能想到的各种插件。

一线公司，比如 Airbnb, Spotify, PayPal 甚至 React 和 TypeScript 官方的站点，都用了 Gatsby，因此用户基数和质量可以保证社区健康循环，这也是我们考虑 Gatsby 的一个重要原因。

十分钟打造你的第一个 Gatsby 网站
---------------------------------------------------------------------------------------------------------------------------------------------

要开始构建一个 Gatsby 网站真的非常简单，请照以下步骤执行。本文的代码也放在 GitHub 上，欢迎参考，觉得有用的话也请帮忙加星: [Gatsby 设置代码](https://github.com/Kalasearch/tutorials/tree/master/gatsby/gatsby-blog-setup-tutorial-with-netlify)

### 1\. 确认本地安装了 npm

首先确保你的本地环境安装了 `npm`

如果你在 Mac/Linux 环境下运行的话请运行

`npm -v`

如果你本地已经安装了 `npm` 那么本命令会输出 npm 的版本。

```
➜  gatsby git:(exie/add-gatsby) ✗ npm -v
6.14.4
```

如果没有打印出来版本，也就是还没有安装 `npm` 的话，请参考 [install npm](https://www.npmjs.com/get-npm)

### 2\. 安装 Gatsby 命令行工具

请运行

`npm install -g gatsby-cli`

```
➜  gatsby git:(exie/add-gatsby) ✗ npm install -g gatsby-cli
...以下省略
```

这条命令会在全局安装 `gatsby` 的命令行工具。安装完后重启终端，应该就可以找到 `gatsby` 这个命令行了。

请运行 `gatsby -v` 确认已经安装好，应该输出类似

```
➜  gatsby git:(exie/add-gatsby) ✗ gatsby -v
Gatsby CLI version: 2.11.3
```

### 3\. 用 Gatsby 命令行创建你的 Gatsby 网站

请到一个你准备放置你的博客的目录，然后用以下命令开始生成你的第一个 Gatsby 博客

`gatsby new my-blog https://github.com/narative/gatsby-starter-novela`

注意，这里的第三个参数，也就是这个网址的含义是模板地址。Gatsby 本身不提供太多的样式选择，但有很多开发者们会主动地贡献自己的模板，比如说这里的 `https://github.com/narative/gatsby-starter-novela` 就是我很喜欢的一个样式。

其它公开的模板可以在 `https://www.gatsbyjs.com/starters/` 找到。如果你有满意的模板，也可以贡献到这里。

### 4\. 运行你的网站

进入刚创建的 `my-blog` 文件夹

然后运行 `gatsby develop`

这个命令会跑起来一个本地的 server，主要作用是让你可以在本地实时更新和开发你的网站。运行之后，它会默认在本地的 `8000` 端口跑起来一个 service，然后在浏览器访问 `http://localhost:8000/` 的话就可以看到你的网站了

 [![](https://kalasearch.cn/static/2910c322386daf5ba4280f27783f0e85/5a190/first-gatsby-site.png)](/static/2910c322386daf5ba4280f27783f0e85/131c7/first-gatsby-site.png) 

跑起来的 Gatsby 网站

至此，你就可以在 `content/posts/` 中开始添加你的博客文章。

注意，这里的路径都是可以配置的，慢慢熟悉 Gatsby 之后，你可以实现任何用其它框架可以实现的功能。

注：Gatsby 本身的教程绝对已经是非常上乘的了，如果读英文顺畅的话推荐直接阅读：[Get Started](https://www.gatsbyjs.com/docs/quick-start/)

### 5\. 部署你的网站

运行 `gatsby build` ，会让 Gatsby 给你生成一个优化后的网站（比如说，最小化了 css/js，优化了加载速度等）。再用 `gatsby serve` 可以在本地测试优化化的网站访问的效果。

在确认了网站内容没问题后，可以将 `public` 文件夹中的内容放到 CDN 上。当然，这一切都可以一键搞定，下一章中我们介绍如何用 Netlify 实现一键部署。

集成 Netlify
-----------------------------------------

在可以把博客跑起来之后，我们需要将代码放到 GitHub Repo 上，然后借助 [GitHub Actions](/blog/github-action-simple-tutorial) 与 Netlify 进行集成。

配置好之后，就可以实现每次 master 分支有更新时，自动部署网站到 Netlify 上。

在之后的文章中，我们会详细介绍如何将你的 Gatsby 网站配置在 Netlify 上，敬请关注。

总结
-------------------------

这篇文章中，我们介绍了卡拉搜索的网站技术栈，并给出了一步步的教程方便你可以搭建起你的第一个技术博客。在之后的文章中，我们会介绍如何跟 Netlify 集成，做到网站的一键部署。

要学习更多的前沿前后端技术，请关注我们的[技术博客](/blog)。

如果你需要[站内搜索或App内搜索](/)功能（不管是不是在用 Gatsby），可以免费试用[卡拉搜索](/)，5 分钟就可以定制好搜索功能，为你的用户提供极速的搜索体验，免掉 Elastic Search 麻烦的维护和设置
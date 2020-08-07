---
title : 如何用Python爬数据？（一）网页抓取
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-07 04:21:00 +0800
categories:
 -
tags:
 -
---
[[toc]]

你期待已久的Python网络数据爬虫教程来了。本文为你演示如何从网页里找到感兴趣的链接和说明文字，抓取并存储到Excel。

![](https://picb.zhimg.com/v2-666234f85f5a5d58aba107639bdc1664_b.jpg)

![](https://picb.zhimg.com/80/v2-666234f85f5a5d58aba107639bdc1664_720w.jpg)

## 需求

我在公众号后台，经常可以收到读者的留言。

很多留言，是读者的疑问。只要有时间，我都会抽空尝试解答。

但是有的留言，乍看起来就不明所以了。

例如下面这个：

![](https://pic1.zhimg.com/v2-766eb7a55b493e8125927e9ca74b035b_b.jpg)

![](https://pic1.zhimg.com/80/v2-766eb7a55b493e8125927e9ca74b035b_720w.jpg)

一分钟后，他可能觉得不妥（大概因为想起来，我用简体字写文章），于是又用简体发了一遍。

![](https://pic3.zhimg.com/v2-a8f22b837ba61dc7b1b838c308d30ffe_b.jpg)

![](https://pic3.zhimg.com/80/v2-a8f22b837ba61dc7b1b838c308d30ffe_720w.jpg)

我恍然大悟。

这位读者以为我的公众号设置了关键词推送对应文章功能。所以看了我的其他数据科学教程后，想看“爬虫”专题。

不好意思，当时我还没有写爬虫文章。

而且，我的公众号暂时也没有设置这种关键词推送。

主要是因为我懒。

这样的消息接收得多了，我也能体察到读者的需求。不止一个读者表达出对爬虫教程的兴趣。

之前提过，目前主流而合法的网络数据收集方法，主要分为3类：

*   开放数据集下载；
*   API读取；
*   爬虫。

前两种方法，我都已经做过一些介绍，这次说说爬虫。

![](https://pic3.zhimg.com/v2-18f96100d2cd69d966a32c41259734b2_b.jpg)

![](https://pic3.zhimg.com/80/v2-18f96100d2cd69d966a32c41259734b2_720w.jpg)

## 概念

许多读者对爬虫的定义，有些混淆。咱们有必要辨析一下。

维基百科是这么说的：

> 网络爬虫（英语：web crawler），也叫网络蜘蛛（spider），是一种用来自动浏览[万维网](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%25E4%25B8%2587%25E7%25BB%25B4%25E7%25BD%2591)的 [网络机器人](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/w/index.php%3Ftitle%3D%25E7%25BD%2591%25E7%25BB%259C%25E6%259C%25BA%25E5%2599%25A8%25E4%25BA%25BA%26action%3Dedit%26redlink%3D1)。其目的一般为编纂[网络索引](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/w/index.php%3Ftitle%3D%25E7%25BD%2591%25E7%25BB%259C%25E7%25B4%25A2%25E5%25BC%2595%26action%3Dedit%26redlink%3D1)。

这问题就来了，你又不打算做搜索引擎，为什么对网络爬虫那么热心呢？

其实，许多人口中所说的爬虫（web crawler），跟另外一种功能“网页抓取”（web scraping）搞混了。

维基百科上，对于后者这样解释：

> Web scraping, web harvesting, or web data extraction is data scraping used for extracting data from websites. Web scraping software may access the World Wide Web directly using the Hypertext Transfer Protocol, or through a web browser.

看到没有，即便你用浏览器手动拷贝数据下来，也叫做网页抓取（web scraping）。是不是立刻觉得自己强大了很多？

但是，这定义还没完：

> While web scraping can be done manually by a software user, the term typically refers to automate processes implemented using a bot or web crawler.

也就是说，用爬虫（或者机器人）**自动**替你完成网页抓取工作，才是你真正想要的。

数据抓下来干什么呢？

一般是先存储起来，放到数据库或者电子表格中，以备检索或者进一步分析使用。

所以，你真正想要的功能是这样的：

找到链接，获得Web页面，抓取指定信息，存储。

这个过程有可能会往复循环，甚至是滚雪球。

你希望用自动化的方式来完成它。

了解了这一点，你就不要老盯着爬虫不放了。爬虫研制出来，其实是为了给搜索引擎编制索引数据库使用的。你为了抓取点儿数据拿来使用，已经是大炮轰蚊子了。

要真正掌握爬虫，你需要具备不少基础知识。例如HTML, CSS, Javascript, 数据结构……

这也是为什么我一直犹豫着没有写爬虫教程的原因。

不过这两天，看到王烁主编的一段话，很有启发：

> 我喜欢讲一个另类二八定律，就是付出两成努力，了解一件事的八成。

既然我们的目标很明确，就是要从网页抓取数据。那么你需要掌握的**最重要**能力，是拿到一个网页链接后，如何从中快捷有效地抓取自己想要的信息。

掌握了它，你还不能说自己已经学会了爬虫。

但有了这个基础，你就能比之前更轻松获取数据了。特别是对“文科生”的很多应用场景来说，非常有用。这就是**赋能**。

而且，再进一步深入理解爬虫的工作原理，也变得轻松许多。

这也算“另类二八定律”的一个应用吧。

Python语言的重要特色之一，就是可以利用强大的软件工具包（许多都是第三方提供）。你只需要编写简单的程序，就能自动解析网页，抓取数据。

本文给你演示这一过程。

## 目标

要抓取网页数据，我们先制订一个小目标。

目标不能太复杂。但是完成它，应该对你理解抓取（Web Scraping）有帮助。

就选择我最近发布的一篇简书文章作为抓取对象好了。题目叫做《[如何用《玉树芝兰》入门数据科学？](https://link.zhihu.com/?target=https%3A//www.jianshu.com/p/85f4624485b9)》。

![](https://pic3.zhimg.com/v2-3f8f6c1d21846d53fdc8a6543c796e21_b.jpg)

![](https://pic3.zhimg.com/80/v2-3f8f6c1d21846d53fdc8a6543c796e21_720w.jpg)

这篇文章里，我把之前的发布的数据科学系列文章做了重新组织和串讲。

文中包含很多之前教程的标题和对应链接。例如下图红色边框圈起来的部分。

![](https://pic2.zhimg.com/v2-a3ecb9e710fbd230061f485bd1c1be1e_b.jpg)

![](https://pic2.zhimg.com/80/v2-a3ecb9e710fbd230061f485bd1c1be1e_720w.jpg)

假设你对文中提到教程都很感兴趣，希望获得这些文章的链接，并且存储到Excel里，就像下面这个样子：

![](https://pic4.zhimg.com/v2-98e7aed67af306294254ae7e2260a652_b.jpg)

![](https://pic4.zhimg.com/80/v2-98e7aed67af306294254ae7e2260a652_720w.jpg)

你需要把非结构化的分散信息（自然语言文本中的链接），专门提取整理，并且存储下来。

该怎么办呢？

即便不会编程，你也可以全文通读，逐个去找这些文章链接，手动把文章标题、链接都分别拷贝下来，存到Excel表里面。

但是，这种手工采集方法**没有效率**。

我们用Python。

## 环境

要装Python，比较省事的办法是安装Anaconda套装。

请到[这个网址](https://link.zhihu.com/?target=https%3A//www.anaconda.com/download/)下载Anaconda的最新版本。

![](https://pic4.zhimg.com/v2-b8d24f74ff9bb63c48eadc26126e364b_b.jpg)

![](https://pic4.zhimg.com/80/v2-b8d24f74ff9bb63c48eadc26126e364b_720w.jpg)

请选择左侧的 Python **3.6** 版本下载安装。

如果你需要具体的步骤指导，或者想知道Windows平台如何安装并运行Anaconda命令，请参考我为你准备的[视频教程](https://link.zhihu.com/?target=https%3A//www.jianshu.com/p/772740d57576)。

安装好Anaconda之后，请到[这个网址](https://link.zhihu.com/?target=https%3A//github.com/wshuyi/demo-python-scrape-webpage-with-requests-html/archive/master.zip)下载本教程配套的压缩包。

下载后解压，你会在生成的目录（下称“演示目录”）里面看到以下三个文件。

![](https://pic4.zhimg.com/v2-4398d384429a230f27edbfe1f6777e14_b.jpg)

![](https://pic4.zhimg.com/80/v2-4398d384429a230f27edbfe1f6777e14_720w.jpg)

打开终端，用cd命令进入该**演示目录**。如果你不了解具体使用方法，也可以参考[视频教程](https://link.zhihu.com/?target=https%3A//www.jianshu.com/p/772740d57576)。

我们需要安装一些环境依赖包。

首先执行：

```text
pip install pipenv
```

这里安装的，是一个优秀的 Python 软件包管理工具 pipenv 。

安装后，请执行：

```text
pipenv install
```

看到演示目录下两个Pipfile开头的文件了吗？它们就是 pipenv 的设置文档。

pipenv 工具会依照它们，自动为我们安装所需要的全部依赖软件包。

![](https://picb.zhimg.com/v2-35f461359fba39d18da279ce2dfea221_b.jpg)

![](https://picb.zhimg.com/80/v2-35f461359fba39d18da279ce2dfea221_720w.jpg)

上图里面有个绿色的进度条，提示所需安装软件数量和实际进度。

装好后，根据提示我们执行：

```text
pipenv shell
```

此处请确认你的电脑上已经安装了 Google Chrome 浏览器。

我们执行：

```text
jupyter notebook
```

默认浏览器（Google Chrome）会开启，并启动 Jupyter 笔记本界面：

![](https://pic1.zhimg.com/v2-993752f09bf67b6d8700397f98a83cde_b.jpg)

![](https://pic1.zhimg.com/80/v2-993752f09bf67b6d8700397f98a83cde_720w.jpg)

你可以直接点击文件列表中的第一项ipynb文件，可以看到本教程的全部示例代码。

你可以一边看教程的讲解，一边依次执行这些代码。

![](https://pic1.zhimg.com/v2-5210b2e8ca06bb6af5d2beb9b1d4abaa_b.jpg)

![](https://pic1.zhimg.com/80/v2-5210b2e8ca06bb6af5d2beb9b1d4abaa_720w.jpg)

但是，我**建议**的方法，是回到主界面下，新建一个新的空白 Python 3 笔记本。

![](https://pic2.zhimg.com/v2-7da692c85db58877b04418bb6d51faa0_b.jpg)

![](https://pic2.zhimg.com/80/v2-7da692c85db58877b04418bb6d51faa0_720w.jpg)

请跟着教程，一个个字符输入相应的内容。这可以帮助你更为深刻地理解代码的含义，更高效地把技能内化。

![](https://pic3.zhimg.com/v2-06b302acf33e8de028cf3db35043da60_b.jpg)

![](https://pic3.zhimg.com/80/v2-06b302acf33e8de028cf3db35043da60_720w.jpg)

准备工作结束，下面我们开始正式输入代码。

## 代码

读入网页加以解析抓取，需要用到的软件包是 requests\_html 。我们此处并不需要这个软件包的全部功能，只读入其中的 HTMLSession 就可以。

```text
from requests_html import HTMLSession
```

然后，我们建立一个会话（session），即让Python作为一个客户端，和远端服务器交谈。

```text
session = HTMLSession()
```

前面说了，我们打算采集信息的网页，是《[如何用《玉树芝兰》入门数据科学？](https://link.zhihu.com/?target=https%3A//www.jianshu.com/p/85f4624485b9)》一文。

我们找到它的网址，存储到url变量名中。

```text
url = 'https://www.jianshu.com/p/85f4624485b9'
```

下面的语句，利用 session 的 get 功能，把这个链接对应的网页整个儿取回来。

```text
r = session.get(url)
```

网页里面都有什么内容呢？

我们告诉Python，请把服务器传回来的内容当作HTML文件类型处理。我不想要看HTML里面那些乱七八糟的格式描述符，只看文字部分。

于是我们执行：

```text
print(r.html.text)
```

这就是获得的结果了：

![](https://pic3.zhimg.com/v2-dd1b68203f2e69fdc33bc5e4a703fd5b_b.jpg)

![](https://pic3.zhimg.com/80/v2-dd1b68203f2e69fdc33bc5e4a703fd5b_720w.jpg)

我们心里有数了。取回来的网页信息是正确的，内容是完整的。

好了，我们来看看怎么趋近自己的目标吧。

我们先用**简单粗暴**的方法，尝试获得网页中包含的全部链接。

把返回的内容作为HTML文件类型，我们查看 links 属性：

```text
r.html.links
```

这是返回的结果：

![](https://picb.zhimg.com/v2-12571f2c08f2912641b280f55e1d0dcb_b.jpg)

![](https://picb.zhimg.com/80/v2-12571f2c08f2912641b280f55e1d0dcb_720w.jpg)

这么多链接啊！

很兴奋吧？

不过，你发现没有？这里许多链接，看似都不完全。例如第一条结果，只有：

```text
'/'
```

这是什么东西？是不是链接抓取错误啊？

不是，这种看着不像链接的东西，叫做相对链接。它是某个链接，相对于我们采集的网页所在域名（[https://www.jianshu.com](https://link.zhihu.com/?target=https%3A//www.jianshu.com)）的路径。

这就好像我们在国内邮寄快递包裹，填单子的时候一般会写“XX省XX市……”，前面不需要加上国家名称。只有国际快递，才需要写上国名。

但是如果我们希望获得全部可以直接访问的链接，怎么办呢？

很容易，也只需要一条 Python 语句。

```text
r.html.absolute_links
```

这里，我们要的是“绝对”链接，于是我们就会获得下面的结果：

![](https://pic2.zhimg.com/v2-79992f8986642d87f451aea394ad42f7_b.jpg)

![](https://pic2.zhimg.com/80/v2-79992f8986642d87f451aea394ad42f7_720w.jpg)

这回看着是不是就舒服多了？

我们的任务已经完成了吧？链接不是都在这里吗？

链接确实都在这里了，可是跟我们的目标是不是有区别呢？

检查一下，确实有。

我们不光要找到链接，还得找到链接对应的描述文字呢，结果里包含吗？

没有。

结果列表中的链接，都是我们需要的吗？

不是。看长度，我们就能感觉出许多链接并不是文中描述其他数据科学文章的网址。

这种简单粗暴直接罗列HTML文件中所有链接的方法，对本任务行不通。

那么我们该怎么办？

我们得学会跟 Python 说清楚我们要找的东西。这是网页抓取的**关键**。

想想看，如果你想让助手（人类）帮你做这事儿，怎么办？

你会告诉他：

“寻找正文中全部可以点击的蓝色文字链接，拷贝文字到Excel表格，然后右键复制对应的链接，也拷贝到Excel表格。每个链接在Excel占一行，文字和链接各占一个单元格。”

虽然这个操作执行起来麻烦，但是助手听懂后，就能帮你执行。

同样的描述，你试试说给电脑听……不好意思，它不理解。

因为你和助手看到的网页，是这个样子的。

![](https://pic4.zhimg.com/v2-781e1e2b912fc0f367b10eb69a9b7b27_b.jpg)

![](https://pic4.zhimg.com/80/v2-781e1e2b912fc0f367b10eb69a9b7b27_720w.jpg)

电脑看到的网页，是这个样子的。

![](https://pic3.zhimg.com/v2-d1b27658279c1e342fde8a207d765c22_b.jpg)

![](https://pic3.zhimg.com/80/v2-d1b27658279c1e342fde8a207d765c22_720w.jpg)

为了让你看得清楚源代码，浏览器还特意对不同类型的数据用了颜色区分，对行做了编号。

数据显示给电脑时，上述辅助可视功能是没有的。它只能看见一串串字符。

那可怎么办？

仔细观察，你会发现这些HTML源代码里面，文字、图片链接内容前后，都会有一些被尖括号括起来的部分，这就叫做“标记”。

所谓HTML，就是一种标记语言（超文本标记语言，HyperText Markup Language）。

标记的作用是什么？它可以把整个的文件分解出层次来。

![](https://pic2.zhimg.com/v2-2a6e626c67fdddb07bbb5b1259f99283_b.jpg)

![](https://pic2.zhimg.com/80/v2-2a6e626c67fdddb07bbb5b1259f99283_720w.jpg)

（图片来源：[https://goo.gl/kWCqS6](https://link.zhihu.com/?target=https%3A//goo.gl/kWCqS6)）

如同你要发送包裹给某个人，可以按照“省\-市\-区\-街道\-小区\-门牌”这样的结构来写地址，快递员也可以根据这个地址找到收件人。

同样，我们对网页中某些特定内容感兴趣，可以依据这些标记的结构，顺藤摸瓜找出来。

这是不是意味着，你必须先学会HTML和CSS，才能进行网页内容抓取呢？

不是的，我们可以借助工具，帮你显著简化任务复杂度。

这个工具，Google Chrome浏览器自带。

我们在样例文章页面上，点击鼠标右键，在出现的菜单里面选择“检查”。

![](https://picb.zhimg.com/v2-d12d92ce3f4293690282a5f6730148b0_b.jpg)

![](https://picb.zhimg.com/80/v2-d12d92ce3f4293690282a5f6730148b0_720w.jpg)

这时，屏幕下方就会出现一个分栏。

![](https://pic2.zhimg.com/v2-430c8e8633986e99f0244b0f23fd8159_b.jpg)

![](https://pic2.zhimg.com/80/v2-430c8e8633986e99f0244b0f23fd8159_720w.jpg)

我们点击这个分栏左上角（上图红色标出）的按钮。然后把鼠标悬停在第一个文内链接（《玉树芝兰》）上面，点击一下。

￼

![](https://picb.zhimg.com/v2-025becdb0060210af65dbf689f08a3ee_b.jpg)

![](https://picb.zhimg.com/80/v2-025becdb0060210af65dbf689f08a3ee_720w.jpg)

此时，你会发现下方分栏里面，内容也发生了变化。这个链接对应的源代码被放在分栏区域正中，高亮显示。

![](https://pic3.zhimg.com/v2-b83ac27b938ea376f719dbf84f501eb6_b.jpg)

![](https://pic3.zhimg.com/80/v2-b83ac27b938ea376f719dbf84f501eb6_720w.jpg)

确认该区域就是我们要找的链接和文字描述后，我们鼠标右键选择高亮区域，并且在弹出的菜单中，选择 Copy \-> Copy selector。

![](https://pic2.zhimg.com/v2-bb05a841dda4fb2f6c16a4c17638f8d7_b.jpg)

![](https://pic2.zhimg.com/80/v2-bb05a841dda4fb2f6c16a4c17638f8d7_720w.jpg)

找一个文本编辑器，执行粘贴，就可以看见我们究竟复制下来了什么内容。

```text
body > div.note > div.post > div.article > div.show-content > div > p:nth-child(4) > a
```

这一长串的标记，为电脑指出了：请你先找到 body 标记，进入它管辖的这个区域后去找 `div.note` 标记，然后找……最后找到 a 标记，这里就是要找的内容了。

回到咱们的 Jupyter Notebook 中，用刚才获得的标记路径，定义变量sel。

```text
sel = 'body > div.note > div.post > div.article > div.show-content > div > p:nth-child(4) > a'
```

我们让 Python 从返回内容中，查找 sel 对应的位置，把结果存到 results 变量中。

```text
results = r.html.find(sel)
```

我们看看 results 里面都有什么。

```text
results
```

这是结果：

```text
[<Element 'a' href='https://www.jianshu.com/nb/130182' target='_blank'>]
```

results 是个列表，只包含一项。这一项包含一个网址，就是我们要找的第一个链接（《玉树芝兰》）对应的网址。

可是文字描述“《玉树芝兰》”哪里去了？

别着急，我们让 Python 显示 results 结果数据对应的文本。

```text
results[0].text
```

这是输出结果：

```text
'玉树芝兰'
```

我们把链接也提取出来：

```text
results[0].absolute_links
```

显示的结果却是一个集合。

```text
{'https://www.jianshu.com/nb/130182'}
```

我们不想要集合，只想要其中的链接字符串。所以我们先把它转换成列表，然后从中提取第一项，即网址链接。

```text
list(results[0].absolute_links)[0]
```

这次，终于获得我们想要的结果了：

```text
'https://www.jianshu.com/nb/130182'
```

有了处理这第一个链接的经验，你信心大增，是吧？

其他链接，也无非是找到标记路径，然后照猫画虎嘛。

可是，如果每找一个链接，都需要手动输入上面这若干条语句，那也太麻烦了。

这里就是编程的技巧了。重复逐条运行的语句，如果工作顺利，我们就要尝试把它们归并起来，做个简单的函数。

对这个函数，只需给定一个选择路径（sel），它就把找到的所有描述文本和链接路径都返回给我们。

```text
def get_text_link_from_sel(sel):
    mylist = []
    try:
        results = r.html.find(sel)
        for result in results:
            mytext = result.text
            mylink = list(result.absolute_links)[0]
            mylist.append((mytext, mylink))
        return mylist
    except:
        return None
```

我们测试一下这个函数。

还是用刚才的标记路径（sel）不变，试试看。

```text
print(get_text_link_from_sel(sel))
```

输出结果如下：

```text
[('玉树芝兰', 'https://www.jianshu.com/nb/130182')]
```

没问题，对吧？

好，我们试试看第二个链接。

我们还是用刚才的方法，使用下面分栏左上角的按钮点击第二个链接。

![](https://pic4.zhimg.com/v2-f26c7512fb92559344ca69edb975f030_b.jpg)

![](https://pic4.zhimg.com/80/v2-f26c7512fb92559344ca69edb975f030_720w.jpg)

下方出现的高亮内容就发生了变化：

![](https://pic4.zhimg.com/v2-f2c49aff866ffca031dcfdc24c6b9e81_b.jpg)

![](https://pic4.zhimg.com/80/v2-f2c49aff866ffca031dcfdc24c6b9e81_720w.jpg)

我们还是用鼠标右键点击高亮部分，拷贝出 selector。

![](https://pic2.zhimg.com/v2-d33f721173a4cc9f4aa00dd79b7e0c64_b.jpg)

![](https://pic2.zhimg.com/80/v2-d33f721173a4cc9f4aa00dd79b7e0c64_720w.jpg)

然后我们直接把获得的标记路径写到 Jupyter Notebook 里面。

```text
sel = 'body > div.note > div.post > div.article > div.show-content > div > p:nth-child(6) > a'
```

用我们刚才编制的函数，看看输出结果是什么？

```text
print(get_text_link_from_sel(sel))
```

输出如下：

```text
[('如何用Python做词云？', 'https://www.jianshu.com/p/e4b24a734ccc')]
```

检验完毕，函数没有问题。

下一步做什么？

你还打算去找第三个链接，仿照刚才的方法做？

那你还不如全文手动摘取信息算了，更省事儿一些。

我们要想办法把这个过程**自动化**。

对比一下刚刚两次我们找到的标记路径：

```text
body > div.note > div.post > div.article > div.show-content > div > p:nth-child(4) > a
```

以及：

```text
body > div.note > div.post > div.article > div.show-content > div > p:nth-child(6) > a
```

发现什么规律没有？

对，路径上其他的标记全都是一样的，唯独倒数第二个标记（"p"）后冒号后内容有区别。

这就是我们自动化的关键了。

上述两个标记路径里面，因为指定了在第几个“子”(`nth-child`)文本段（paragraph,也就是"p"代表的含义）去找"a"这个标记，因此只返回来单一结果。

如果我们不限定"p"的具体位置信息呢？

我们试试看，这次保留标记路径里面其他全部信息，只修改"p"这一点。

```text
sel = 'body > div.note > div.post > div.article > div.show-content > div > p > a'
```

再次运行我们的函数：

```text
print(get_text_link_from_sel(sel))
```

这是输出结果：

![](https://pic1.zhimg.com/v2-98ae6bc8f9d5286bc9c69cda5d03cd93_b.jpg)

![](https://pic1.zhimg.com/80/v2-98ae6bc8f9d5286bc9c69cda5d03cd93_720w.jpg)

好了，我们要找的内容，全都在这儿了。

但是，我们的工作还没完。

我们还得把采集到的信息输出到Excel中保存起来。

还记得我们常用的数据框工具 Pandas 吗？又该让它大显神通了。

```text
import pandas as pd
```

只需要这一行命令，我们就能把刚才的列表变成数据框：

```text
df = pd.DataFrame(get_text_link_from_sel(sel))
```

让我们看看数据框内容：

```text
df
```

![](https://pic2.zhimg.com/v2-fe01af1eb29c5294619ffc14b9da0c40_b.jpg)

![](https://pic2.zhimg.com/80/v2-fe01af1eb29c5294619ffc14b9da0c40_720w.jpg)

内容没问题，不过我们对表头不大满意，得更换为更有意义的列名称：

```text
df.columns = ['text', 'link']
```

再看看数据框内容：

```text
df
```

![](https://pic3.zhimg.com/v2-a079ecf80b3c91c847de83121df883a3_b.jpg)

![](https://pic3.zhimg.com/80/v2-a079ecf80b3c91c847de83121df883a3_720w.jpg)

好了，下面就可以把抓取的内容输出到Excel中了。

Pandas内置的命令，就可以把数据框变成csv格式，这种格式可以用Excel直接打开查看。

```text
df.to_csv('output.csv', encoding='gbk', index=False)
```

注意这里需要指定encoding（编码）为gbk，否则默认的utf\-8编码在Excel中查看的时候，有可能是乱码。

我们看看最终生成的csv文件吧。

![](https://pic4.zhimg.com/v2-d2d9162f176b8edae706997524be0644_b.jpg)

![](https://pic4.zhimg.com/80/v2-d2d9162f176b8edae706997524be0644_720w.jpg)

很有成就感，是不是？

## 小结

本文为你展示了用Python自动网页抓取的基础技能。希望阅读并动手实践后，你能掌握以下知识点：

*   网页抓取与网络爬虫之间的联系与区别；
*   如何用 pipenv 快速构建指定的 Python 开发环境，自动安装好依赖软件包；
*   如何用 Google Chrome 的内置检查功能，快速定位感兴趣内容的标记路径；
*   如何用 requests\-html 包来解析网页，查询获得需要的内容元素；
*   如何用 Pandas 数据框工具整理数据，并且输出到 Excel。

或许，你觉得这篇文章过于浅白，不能满足你的要求。

文中只展示了如何从一个网页抓取信息，可你要处理的网页成千上万啊。

别着急。

本质上说，抓取一个网页，和抓取10000个网页，在流程上是一样的。

而且，从咱们的例子里，你是不是已经尝试了抓取链接？

有了链接作为基础，你就可以滚雪球，让Python爬虫“爬”到解析出来的链接上，做进一步的处理。

将来，你可能还要应对实践场景中的一些棘手问题：

*   如何把抓取的功能扩展到某一范内内的所有网页？
*   如何爬取Javascript动态网页？
*   假设你爬取的网站对每个IP的访问频率做出限定，怎么办？
*   ……

这些问题的解决办法，我希望在今后的教程里面，一一和你分享。

需要注意的是，网络爬虫抓取数据，虽然功能强大，但学习与实践起来有一定门槛。

当你面临数据获取任务时，应该先检查一下这个清单：

*   有没有别人已经整理好的数据集合可以直接下载？
*   网站有没有对你需要的数据提供API访问与获取方式？
*   有没有人针对你的需求，编好了定制爬虫，供你直接调用？

如果答案是都没有，才需要你自己编写脚本，调动爬虫来抓取。

为了巩固学习的知识，请你换一个其他网页，以咱们的代码作为基础修改后，抓取其中你感兴趣的内容。

如果能把你抓取的过程记录下来，在评论区将记录链接分享给大家，就更好了。

因为**刻意练习**是掌握实践技能的最好方式，而**教是最好的学**。

祝顺利！

## 思考

本文主要内容讲解完毕。

这里给你提一个疑问，供你思考：

我们解析并且存储的链接，其实是有重复的：

![](https://pic2.zhimg.com/v2-9259177982f2f2f68d2e199145f53094_b.jpg)

![](https://pic2.zhimg.com/80/v2-9259177982f2f2f68d2e199145f53094_720w.jpg)

这并不是我们的代码有误，而是在《[如何用《玉树芝兰》入门数据科学？](https://link.zhihu.com/?target=https%3A//www.jianshu.com/p/85f4624485b9)》一文里，本来就多次引用过一些文章，所以重复的链接就都被抓取出来了。

但是你存储的时候，也许不希望保留重复链接。

这种情况下，你该如何修改代码，才能保证抓取和保存的链接没有重复呢？

## 讨论

你对Python爬虫感兴趣吗？在哪些数据采集任务上使用过它？有没有其他更高效的方式，来达成数据采集目的？欢迎留言，把你的经验和思考分享给大家，我们一起交流讨论。

如果你对我的文章感兴趣，欢迎点赞，并且微信关注和置顶我的公众号“玉树芝兰”(nkwangshuyi)。

如果本文可能对你身边的亲友有帮助，也欢迎你把本文通过微博或朋友圈分享给他们。让他们一起参与到我们的讨论中来。
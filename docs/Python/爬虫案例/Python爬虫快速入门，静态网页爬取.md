---
title : Python爬虫快速入门，静态网页爬取
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-25 14:28:42 +0800
categories:
 -
tags:
 -
---
[[toc]]

在开始之前，请确保你的电脑上已经安装好了BeautifulSoup库，可以通过在命令行中输入pip install beautifulsoup4来进行安装。

## 一、数据解析
======

在爬取之前，我们需要检测下响应状态码是否为200，如果请求失败，我们将爬取不到任何数据：

```py
import requests  
  
re = requests.get('https://book.douban.com/top250')  
if re.status_code == 200:  
    print('请求成功!')  
else:  
    print('请求失败!响应状态码为{}'.format(re.status_code))
```

响应状态码为418，我们请求失败了，这是为什么呢？因为豆瓣有反爬虫机制，我们无法通过直接请求服务器来爬取数据，必须在发起请求之前将自己伪装起来。

### 1.1 反爬虫
=======

反爬虫是网站限制爬虫的一种策略。它并不是禁止爬虫(完全禁止爬虫几乎不可能，也可能误伤正常用户)，而是限制爬虫，让爬虫在网站可接受的范围内爬取数据，不至于导致网站瘫痪无法运行。常见的反爬虫方式有**判别身份**和**IP限制**两种，这里我们先介绍前者，后者稍后再提及。

有些网站在识别出爬虫后，会拒绝爬虫进行访问，比如之前提到的豆瓣。那我们怎样做才能不被识别出来呢？在此之前，我们先尝试一下直接爬取：

```py
import requests  
  
re = requests.get('https://book.douban.com/top250')  
print(re.text)
```

结果是什么都没有输出，因为豆瓣将我们的爬虫识别了出来并拒绝提供内容。你可能会有疑问，爬虫不是模拟浏览器访问网站、获取网页源代码的吗？为什么就被识别出来了呢？事实上，无论是浏览器还是爬虫，访问网站时都会带上一些信息用于身份识别，而这些信息都被存储在一个叫请求头(request headers)的地方。

服务器会通过请求头里的信息来判别访问者的身份。请求头里的字段有很多，我们暂时只需了解**user-agent**(用户代理)即可。user-agent里包含了操作系统、浏览器类型、版本等信息，通过修改它我们就能成功地伪装成浏览器并爬取我们想要的数据。

那么如何找到user-agent呢？操作步骤如下：

1.  首先按F12(或Fn+F12)，然后单击上方的Network标签。
2.  此时打开https://book.douban.com/top250，在Name一列中找到top250并单击。
3.  在右边的Headers中找到Request Headers，User-Agent就在其中。

选中后将其复制下来，我的浏览器的User-Agent是Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36，而requests默认的User-Agent是python-requests/2.24.0。默认的User-Agent和在头上贴着“我是爬虫”的纸条没有什么区别，很容易被服务器识别出来。因此我们需要修改请求头里的user-agent字段内容，将爬虫伪装成浏览器。

我们只需定义一个字典(请求头字段作为键，字段内容作为值)传递给headers参数即可，方法如下：

```
import requests  
  
headers = {  
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'  
}  
re = requests.get('https://book.douban.com/top250', headers=headers)  
print(re.text)
```

这样就能正常输出内容了(结果太长这里不展示)。除了user-agent之外的其他请求头字段也能以同样的方式添加进去，但大部分情况下我们只需要添加user-agent字段即可。当我们加了user-agent字段还是无法获取到数据时，说明该网站还通过别的信息来验证身份，我们可以将请求头里的字段都添加进去再尝试。

### 1.2 BeautifulSoup 对象
====================

接下来我们将网页源代码解析成BeautifulSoup对象：

```py
import requests  
from bs4 import BeautifulSoup  
  
headers = {  
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'  
}  
re = requests.get('https://book.douban.com/top250', headers=headers)  
soup = BeautifulSoup(re.text, 'html.parser')
```

需要注意的是，创建BeautifulSoup对象时需要传入两个参数，第一个参数是要解析的HTML文本，即网站源代码的字符串形式**re.text**。第二个参数是解析HTML的解析器，**html.parser**是Python中内置的解析器，较为简单方便。

接下来我们分别打印soup和re.text，观察其内容有无区别：

```py
import requests  
from bs4 import BeautifulSoup  
  
headers = {  
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'  
}  
re = requests.get('https://book.douban.com/top250', headers=headers)  
soup = BeautifulSoup(re.text, 'html.parser')  
print(soup)  
print(re.text)
```

仔细观察后会发现两次打印的内容完全一样！既然都一样，我们何苦费这么大力将网页源代码解析成BeautifulSoup对象呢？为什么不直接打印re.text呢？

其实，它们只是看上去一样，实际上却属于不同种类。现在尝试用type()函数将re.text和BeautifulSoup对象的类型打印出来对比一下：

```py
import requests  
from bs4 import BeautifulSoup  
  
headers = {  
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'  
}  
re = requests.get('https://book.douban.com/top250', headers=headers)  
  
soup = BeautifulSoup(re.text, 'html.parser')  
print(type(re.text))  
  
soup = BeautifulSoup(re.text, 'html.parser')  
print(type(soup))
```

通过输出结果可以看出，re.text的类型是字符串，而soup的类型是BeautifulSoup对象，它俩是完全不同的东西。相比字符串，BeautifulSoup对象里有很多强大的方法和属性。通过这些方法和属性，我们就能方便快捷地提取出我们所需要的数据。

## 二、数据提取
======

BeautifulSoup对象里的方法和属性有很多，我们只学习其中最常用的一些，这些足以应付大多数场景。等你真正的入门后，可以自行学习那些更高阶的知识去解决更复杂的问题。

### 2.1 find()与find_all()
=====================

BeautifulSoup对象里的find()和find_all()是我们提取数据最常用的两个方法。借助它们，我们可以过滤掉HTML页面里的无用数据，轻松地找到我们需要的数据。

我们先来看一下find()和find_all()的作用和区别：

方法作用find()返回符合条件的首个数据find_all()返回符合条件的所有数据

我们通过一个例子进一步熟悉这两个方法，**假设**我们获取到的网页源代码如下：

```
<div class="content">  
  <a href="https://douban.com">登录/注册</a>  
  <h1>豆瓣读书 Top 250</h1>  
  <div class="article">  
 <a href="https://market.douban.com/book/?utm_campaign=book_nav_freyr&utm_source=douban&utm_medium=pc_web">豆瓣书店</a>  
 <div class="item">  
 <a href="https://book.douban.com/subject/1007305/">红楼梦</a>  
 </div>  
 <div class="item">  
 <a href="https://book.douban.com/subject/6082808/">百年孤独</a>  
 </div>  
 <div class="item">  
 <a href="https://book.douban.com/subject/10554308/">白夜行</a>  
 </div>  
 </div>  
</div>
```

接下来分别使用find()与find_all()，观察输出结果的差异：

```
print(soup.find('a'))  
print(soup.find_all('a'))
```

其中，使用find()方法输出的结果为：

```
<a href="https://douban.com">登录/注册</a>
```

而使用find_all()方法输出的结果为：

```
[  
<a href="https://douban.com">登录/注册</a>,  
<a href="https://market.douban.com/book/?utm_campaign=book_nav_freyr&utm_source=douban&utm_medium=pc_web">豆瓣书店</a>,  
<a href="https://book.douban.com/subject/1007305/">红楼梦</a>,  
<a href="https://book.douban.com/subject/6082808/">百年孤独</a>,  
<a href="https://book.douban.com/subject/10554308/">白夜行</a>  
]  
  
  
  

```

可以看到，find()方法返回了第一个a标签，而find\_all()方法则返回了所有的a标签。它俩的用法基本一样，都是传入HTML标签名称，返回符合该HTML标签的数据。区别是find()方法只返回第一个符合条件的标签，而find\_all()方法返回所有符合条件的标签**列表**。

除了传入标签名称外，这两个方法还支持传入属性进行筛选，返回符合条件的数据。例如：

```
soup.find('div', id='a') # 查找id='a'的div标签  
soup.find_all('var', class_='b') # 查找所有class='b'的var标签  
soup.find('button', id='c', class_='d') # 查找id='c'且class='d'的button标签
```

> 注：因为class是Python中定义类的关键字，因此用class_表示HTML中的class。

### 2.2 Tag对象
=========

BeautifulSoup将HTML中的元素封装成了Tag对象。和BeautifulSoup对象一样，Tag对象里也有find()和find_all()方法。因此，我们可以不断地调用这两个方法，一层一层地找到我们需要的数据。依然使用之前的例子：

```py
<div class="content">  
  <a href="https://douban.com">登录/注册</a>  
  <h1>豆瓣读书 Top 250</h1>  
  <div class="article">  
 <a href="https://market.douban.com/book/?utm_campaign=book_nav_freyr&utm_source=douban&utm_medium=pc_web">豆瓣书店</a>  
 <div class="item">  
 <a href="https://book.douban.com/subject/1007305/">红楼梦</a>  
 </div>  
 <div class="item">  
 <a href="https://book.douban.com/subject/6082808/">百年孤独</a>  
 </div>  
 <div class="item">  
 <a href="https://book.douban.com/subject/10554308/">白夜行</a>  
 </div>  
 </div>  
</div>
```

我们可以看到，书名在a标签中。但如果直接使用soup.find_all(‘a’)的话，第二行的“登录/注册”和第五行的“豆瓣书店”也会被获取到，因此我们需要将这些无效数据过滤掉。

深入思考一下不难发现，书名在class="item"的div标签里的a标签内。我们只要先找到所有class="item"的div标签，然后再找到其中的a标签即可，因此我们可以像下面这样来获取书名的数据：

```
items = soup.find_all('div', class_='item')  
for item in items:  
	print(item.find('a'))
```

输出结果：

```
<a href="https://book.douban.com/subject/1007305/">红楼梦</a>  
<a href="https://book.douban.com/subject/6082808/">百年孤独</a>  
<a href="https://book.douban.com/subject/10554308/">白夜行</a>
```

这样，我们就找到了所有书名的数据。但此时返回的还是Tag对象。如果我们只想要书名和对应的链接呢？这就用到了Tag对象的text属性和HTML属性名取值。

```
items = soup.find_all('div', class_='item')  
for item in items:  
    tag = item.find('a')  
    name = tag.text  
    link = tag['href']  
    print(name, link)
```

输出结果：

```
红楼梦 https://book.douban.com/subject/1007305/  
百年孤独 https://book.douban.com/subject/6082808/  
白夜行 https://book.douban.com/subject/10554308/
```

我们通过Tag对象的text属性拿到了a标签里的文字内容，即红楼梦等。然后我们通过和字典取值一样的方式，将HTML属性名作为键，得到了对应属性的值。这里是以href属性为例，其他的HTML属性也同样可以。

Tag对象的常用属性和方法总结如下：

属性/方法作用tag.find()返回符合条件的首个数据tag.find_all()返回符合条件的所有数据tag.text获取标签的文本内容tag\[‘属性名’\]获取标签属性的值

我们通过多次调用find()或find_all()方法一层层地找到了我们需要的数据。那有没有什么方法可以直接就找到我们需要的数据，而不用多次查找吗？

答案是肯定的，这就需要用到CSS选择器了。

### 2.3 CSS选择器
==========

在CSS选择器中，**#代表id，.代表class**。比如：#a表示id=‘a’的所有元素，.b表示class=‘b’的所有元素。当然，我们也可以直接通过标签名选择对应的元素，例如：a表示所有的a元素。

事实上，它们还可以组合在一起，选择同时符合条件的元素，比如：a#b表示所有id=‘b’的a元素，d.c 表示所有class=‘c’的d元素，#b.c 表示所有 id=‘b’ 且 class=‘c’ 的元素，.c.f 表示所有class同时为c和f的元素。

需要注意的是，选择同时符合条件的元素，选择器之间不能有空格，如果写成.c .f就是另一个意思了。这是因为，当两个选择器之间加了空格，表示子元素选择。还是以.c .f为例，它表示选择所有class=‘c’的元素里面class=‘f’的元素，即嵌套在class=‘c’的元素里面class=‘f’的元素。这个嵌套可以是任意层级的，只要在里面就行，不要求直接嵌套在第一层。如果只需要直接嵌套在第一层符合条件的元素，可以用>分隔，例如：.c > .f。

我们来通过一个例子了解一下CSS选择器的用法：

```py
from bs4 import BeautifulSoup  
  
html = '''  
<div class="item">  
 <p class="book">红楼梦</p>  
 <div class="hot">  
 <p class="book">白夜行</p>  
 </div>  
</div>'''  
  
soup = BeautifulSoup(html, 'html.parser')  
  
print(soup.select('.item.book'))  
print(soup.select('.item .book'))  
print(soup.select('.item > .book'))  
  
  
  

```

输出结果：

```
[]  
[<p class="book">红楼梦</p>, <p class="book">白夜行</p>]  
[<p class="book">红楼梦</p>]
```

BeautifulSoup对象有一个select()方法，我们将CSS 选择器传进去即可直接找到我们需要的元素。之前查找在class="item"的div标签里的a标签的代码就可以这样写：

```
items = soup.select('div.item a')  
for item in items:  
    name = item.text  
    link = item['href']  
    print(name, link)
```

可以看到，我们一次性就将所有符合条件的a元素找了出来，同样的功能，代码变得更加简洁了。

## 三、单个网页爬取
========

学习到这里，现在你应该可以独自完成爬取豆瓣图书的任务了，豆瓣图书Top250地址：https://book.douban.com/top250。

接下来我会给出具体的思路，不过建议你先尝试**独立完成这个任务**。

首先，此前我们已经提到过，豆瓣是禁止反爬虫的，我们通过修改User-Agent伪装成浏览器成功“骗过”了豆瓣的识别：

```py
import requests  
from bs4 import BeautifulSoup  
  
headers = {  
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'  
}  
re = requests.get('https://book.douban.com/top250', headers=headers)  
soup = BeautifulSoup(re.text, 'html.parser')
```

接下来，我们需要利用CSS选择器将我们所需要的数据存储在items变量中，但是，如何找到图书名称所在的标签呢？

其实很简单，我们先打开https://book.douban.com/top250，右键单击**红楼梦>检查**，如下图所示：

![](https://p3-tt.byteimg.com/origin/pgc-image/1a08da352788484888da1cba6e726799?from=pc)

  
不难看出，书名是a标签内**属性title的值**，且这个a标签**位于**class=“pl2”的div标签**内**。

在知道了书名的“坐标”后，我们就可以使用CSS选择器啦：

```
items = soup.select('div.pl2 a')  
1
```

此时items变量实际上是一个由Tag对象组成的列表，我们可以通过循环打印书名和对应的链接：

```
for item in items:  
    name = item['title']  
    link = item['href']  
    print(name, link)  
1234
```

完整的代码如下：

```py
import requests  
from bs4 import BeautifulSoup  
  
headers = {  
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'  
}  
re = requests.get('https://book.douban.com/top250', headers=headers)  
soup = BeautifulSoup(re.text, 'html.parser')  
  
items = soup.select('div.pl2 a')  
for item in items:  
    name = item['title']  
    link = item['href']  
    print(name, link)  
1234567891011121314
```

爬取到的结果：

```
红楼梦 https://book.douban.com/subject/1007305/  
活着 https://book.douban.com/subject/4913064/  
1984 https://book.douban.com/subject/4820710/  
百年孤独 https://book.douban.com/subject/6082808/  
飘 https://book.douban.com/subject/1068920/  
三体全集 https://book.douban.com/subject/6518605/  
三国演义（全二册） https://book.douban.com/subject/1019568/  
白夜行 https://book.douban.com/subject/10554308/  
房思琪的初恋乐园 https://book.douban.com/subject/27614904/  
福尔摩斯探案全集（上中下） https://book.douban.com/subject/1040211/  
动物农场 https://book.douban.com/subject/2035179/  
小王子 https://book.douban.com/subject/1084336/  
天龙八部 https://book.douban.com/subject/1255625/  
撒哈拉的故事 https://book.douban.com/subject/1060068/  
安徒生童话故事集 https://book.douban.com/subject/1046209/  
哈利•波特 https://book.douban.com/subject/24531956/  
人类简史 https://book.douban.com/subject/25985021/  
沉默的大多数 https://book.douban.com/subject/1054685/  
围城 https://book.douban.com/subject/1008145/  
平凡的世界（全三部） https://book.douban.com/subject/1200840/  
杀死一只知更鸟 https://book.douban.com/subject/6781808/  
局外人 https://book.douban.com/subject/4908885/  
明朝那些事儿（1-9） https://book.douban.com/subject/3674537/  
霍乱时期的爱情 https://book.douban.com/subject/10594787/  
笑傲江湖（全四册） https://book.douban.com/subject/1002299/  
12345678910111213141516171819202122232425
```

仔细观察不难发现，上述所说的a标签内的文本内容**只有书名**，因此除了使用item\[‘title’\]外，我们还可以使用item.text：

```
for item in items:  
    name = item.text  
    link = item['href']  
    print(name, link)  
1234
```

输出结果(结果太长这里仅展示前面的一部分)：

```
 红楼梦  
  
  
               https://book.douban.com/subject/1007305/  
  
                活着  
  
  
               https://book.douban.com/subject/4913064/  
  
                1984  
  
  
               https://book.douban.com/subject/4820710/  
  
                百年孤独  
  
  
               https://book.douban.com/subject/6082808/  
1234567891011121314151617181920
```

为什么使用item.text就会出现一些奇怪的换行呢？

我们知道，item.text是获取标签内的所有文本内容，空格，换行符等都会获取，我们再来看一下之前的a标签：

![](https://p3-tt.byteimg.com/origin/pgc-image/3a8dcd3a54954e46a7b0c20b764f7558?from=pc)

  
显然a标签里存在空格和换行符，因此如果想使用item.text输出结果，我们必须使用join()方法去掉这些多余的空格和换行符：

```
for item in items:  
    name = ''.join(item.text.split())  
    link = item['href']  
    print(name, link)  
1234
```

这样结果就可以正常显示啦。

## 四、爬取所有Top250图书
==============

可能你已经发现了，我们之前爬取的图书仅仅是第一页的，并不是所有的Top250图书，那么如何爬取所有的呢？

我们进入第二页后，可以看到网址变成了https://book.douban.com/top250?start=25，相比原来多了个?start=25。

我们再进入第一页，会发现网址变成了https://book.douban.com/top250?start=0。之后，再进入最后一页，网址变成了https://book.douban.com/top250?start=225。

我想你应该已经找到了其中的规律。

很显然，"start="后面的数字总是以步长25进行递增，第一页此数字是0，第十页此数字是225，这让我们联想到了循环。

我们先把之前爬取图书的代码封装成一个函数：

```py
def spider(url):  
    headers = {  
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'  
    }  
    re = requests.get(url, headers=headers)  
    soup = BeautifulSoup(re.text, 'html.parser')  
    items = soup.select('div.pl2 a')  
    for item in items:  
        name = item['title']  
        link = item['href']  
        print(name, link)  
1234567891011
```

豆瓣图书Top250共有十页，我们根据之前找出来的规律，利用循环生成这十个网页地址：

```
for i in range(0, 250, 25):  
 douban_book = 'https://book.douban.com/top250?start=%s' % str(i)  
12
```

之后，将它们组装在一起，我们就可以爬取所有图书了：

```py
import requests  
from bs4 import BeautifulSoup  
  
  
def spider(url):  
    headers = {  
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'  
    }  
    re = requests.get(url, headers=headers)  
    soup = BeautifulSoup(re.text, 'html.parser')  
    items = soup.select('div.pl2 a')  
    for item in items:  
        name = item['title']  
        link = item['href']  
        print(name, link)  
  
  
for i in range(0, 250, 25):  
    douban_book = 'https://book.douban.com/top250?start=%s' % str(i)  
    spider(douban_book)  
1234567891011121314151617181920
```

但考虑到输出结果太长，不方便在终端查看，我们可以将爬取到的结果写入文件：

```py
import requests  
from bs4 import BeautifulSoup  
  
  
def spider(url, filename):  
 headers = {  
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'  
    }  
    re = requests.get(url, headers=headers)  
    soup = BeautifulSoup(re.text, 'html.parser')  
    items = soup.select('div.pl2 a')  
    with open(filename, 'a', encoding=re.encoding) as f:  
 for item in items:  
 line = item['title'] + " " + item['href'] + "\n"  
            f.write(line)  
  
  
for i in range(0, 250, 25):  
 douban_book = 'https://book.douban.com/top250?start=%s' % str(i)  
    spider(douban_book, 'doubanTop250.txt')  
1234567891011121314151617181920
```

效果：

![](https://p1-tt.byteimg.com/origin/pgc-image/9e0a1aec998b4d9da6b64586cb70b3c0?from=pc)

## 五、防BAN策略
========

爬虫在网页上爬取数据时如果不加任何限制会“高速”访问对方的服务器，如果访问太快容易导致被对方服务器封禁，因为正常人是不会在1秒内访问几十次甚至上百次网站的，这样就会导致我们在一段时间内无法访问这个网站。所以，如果你访问过于频繁，即使通过修改User-Agent伪装成浏览器，也还是会被识别出爬虫，并限制你的IP访问该网站。

那么如何防止自己被封禁呢？这里介绍两种策略，一种是降低自己的爬取速度，另一种是IP代理。

### 5.1 使用time.sleep()降低爬取速度
========================

time.sleep(secs)函数推迟调用线程的运行，可通过参数secs(秒数)来进行设置。

我们先来看一个例子：

```
import time  
  
for i in range(0, 10):  
    print(i)  
    time.sleep(1)  
12345
```

运行后，终端先是输出0，之后每隔1秒输出一个数字。倘若不加上time.sleep(1)，那么这10个数字会在“一瞬间”打印出来。显然，time.sleep()延迟了打印这个操作。

利用这个特点，我们可以在之前爬取豆瓣图书Top250的代码中使用time.sleep()，以降低爬取速度，防止被封：

```py
import requests  
from bs4 import BeautifulSoup  
from time import sleep as pause  
  
  
def spider(url, filename):  
 headers = {  
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'  
    }  
    re = requests.get(url, headers=headers)  
    soup = BeautifulSoup(re.text, 'html.parser')  
    items = soup.select('div.pl2 a')  
    with open(filename, 'a', encoding=re.encoding) as f:  
 for item in items:  
 line = item['title'] + " " + item['href'] + "\n"  
            f.write(line)  
  
  
for i in range(0, 250, 25):  
 douban_book = 'https://book.douban.com/top250?start=%s' % str(i)  
    spider(douban_book, 'doubanTop250.txt')  
    pause(1)  
12345678910111213141516171819202122
```

这样我们就可以每隔1秒爬取一页，降低了访问频率。

### 5.2 IP代理
========

除了降低访问频率之外，我们也可以使用代理来解决IP限制的问题。代理的意思是通过别的IP访问网站。这样，在IP被封后我们可以换一个IP继续爬取数据，或者每次爬取数据时都换不同的IP，避免同一个IP访问的频率过高，这样就能快速地大规模爬取数据了。

如何使用代理呢？请看下例：

```py
import requests  
  
proxies = {  
  "http": "http://10.10.1.10:3128",  
  "https": "http://10.10.1.10:1080",  
}  
  
requests.get("http://example.org", proxies=proxies)  
12345678
```

和headers一样，我们同样需要定义一个字典，但传递的是proxies参数。我们需要将http和https这两种协议作为键，对应的IP代理作为值，最后将整个字典作为proxies参数传递给requests.get()方法即可。

> 注：IP代理有免费的和收费的，你可以自行在网上寻找。

在爬取大量数据时我们需要很多的IP用于切换。因此，我们需要建立一个IP 代理池(字典列表)，每次从中随机选择一个传给proxies参数。

因此，使用IP代理并结合time.sleep()爬取豆瓣图书Top250再将其写入文件的完整代码如下：

```py
import requests  
from random import choice  
from bs4 import BeautifulSoup as BeS  
from time import sleep as pause  
  
  
def spider(url, filename, proxies):  
    headers = {  
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'  
    }  
    re = requests.get(url, proxies=proxies, headers=headers)  
    soup = BeS(re.text, 'html.parser')  
    items = soup.select('div.pl2 a')  
    with open(filename, 'a', encoding=re.encoding) as f:  
        for item in items:  
            f.write(item['title'] + " " + item['href'] + "\n")  
  
  
filename = 'doubanTop250.txt'  
pages = []  
proxies_list = []  
  
for i in range(0, 250, 25):  
    ip_1 = "http://10.10.1.1%s:3128" % str(i // 25)  
    ip_2 = "http://10.10.1.1%s:1080" % str(i // 25)  
    douban_book = 'https://book.douban.com/top250?start=%s' % str(i)  
    prox = {  
        "http": ip_1,  
        "https": ip_2,  
    }  
    pages.append(douban_book)  
    proxies_list.append(prox)  
  
for page in pages:  
    proxies = choice(proxies_list)  
    spider(page, filename, proxies)  
    pause(1)  
12345678910111213141516171819202122232425262728293031323334353637
```

上述代码的IP代理池中的IP代理不可用(IP地址是瞎写的)，所以代码不会成功运行，这里仅仅是为了展示一个完整的结构。

**有点长，需要完整项目代码的私信小编01**
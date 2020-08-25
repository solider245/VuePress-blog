---
title : 超详细的python爬虫案例，一次爬取上百篇文章
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-25 18:12:54 +0800
categories:
 -
tags:
 -
---
[[toc]]

一次爬多篇文章，逻辑是先从主网址爬到每篇文章的网址，再从各个网址处爬取文章，很简单的静态网页爬取，不需考虑反扒问题。话不多说，直接案例说话。

实例：从https://www.biquge.com.cn/book/24032/，爬取小说的全部章节的内容。

![](https://p6-tt.byteimg.com/origin/pgc-image/4a100c17ffd842c5b06f50453762b603?from=pc)

图1

实现方法：**requests 访问 + BeautifulSoup解析**

1、目标网址是静态网页，浏览网址和数据网址相同，可直接使用。

```
import requests                           # 导入requests库  
from bs4 import BeautifulSoup  # 导入BeautifulSoup库

url = ''https:


```

2、**requests** 访问网址获得网页

打开浏览器控制台，查看Network下的Response发现有我们需要用的章节的标题和链接，用requests访问网址，就是为了获取下图中response界面下红框的内容。

![](https://p1-tt.byteimg.com/origin/pgc-image/b2fabfb0b28d4e7b8435cafaaab22b7c?from=pc)

图2

**requests** 访问网址代码：

```
import requests  
from bs4 import BeautifulSoup

url = ''https://www.biquge.com.cn/book/23341/''  
response= requests.get(url) 
```

获得的内容放入response变量（自定义，可随意取）里。

3、BeautifulSoup解析网页获得内容

用BeautifulSoup解析response变量里的内容，方法为：

```
import requests  
from bs4 import BeautifulSoup

url = ''https://www.biquge.com.cn/book/23341/''  
response= requests.get(url)  
soup = BeautifulSoup(response.content, 'lxml') 
```

现在网页内容已经被赋值到变量soup了，此时若打印s，会得到上面图2红框的内容。

4、解析内容爬取小说名，并用其创建一个文件夹，以备放后面下载的小说正文

通过在response里查找，我们发现标题在图3如下位置有出现：

![](https://p1-tt.byteimg.com/origin/pgc-image/83e6a1f3f2c64bb9b47101ba97765eeb?from=pc)

图3

```
booktitle = soup.find('h1').text  
if not os.path.isdir(booktitle):  # 判断当前文件夹下是否存在和小说名同名的文件夹  
    os.makedirs(booktitle)  # 若不存在，则创建小说同名文件夹  

```

![](https://p6-tt.byteimg.com/origin/pgc-image/0a7e84524cc9463489b454a2affac71c?from=pc)

图4，爬取小说名

5、继续用BeautifulSoup解析soup内容，获得章节标题及网址

继续在图2response里查找，发现章节信息都在dd标签下的a标签里，如图5：

![](https://p6-tt.byteimg.com/origin/pgc-image/627a2b2e29314a6ab334d75698217e75?from=pc)

图5

提取章节标题和链接代码：

```
import requests  
from bs4 import BeautifulSoup  
......  
......  
dd = soup.find_all('dd')  
for i in range(len(dd)):  
        title = dd[i].find('a').text    #  获得章节名  
        chap_url = dd[i].find('a')['href']    #  获得章节链接  
				print(title, ': ", chap_url)    # 临时打印查看效果如下图
```

![](https://p1-tt.byteimg.com/origin/pgc-image/1bba2c0514f54903a7141d66d3869050?from=pc)

图6

5、循环遍历访问章节链接，获得小说正文

通过上面的操作，我们获得了每一章节页面的具体网址链接，继续用requests访问链接，就能获得小说的网页页面，接着用BeautifulSoup解析获得小说内容。我们可用简单方法，快速找到小说内容所在位置：在小说页面正文区域右键单击，选择“检查”或“审查元素”，会自动弹出浏览器控制台并高亮显示的正文在网页页面里的位置，分析确定提取参数即可。

![](https://p6-tt.byteimg.com/origin/pgc-image/b09aca4d942e4c619b3f33415064bfc0?from=pc)

图7

![](https://p6-tt.byteimg.com/origin/pgc-image/b3c3bc65ed504372b9d13fbfb1f45d12?from=pc)

自动高亮显示位置

通过上面的操作，我们能轻松的找到小说文本在网页里的位置，并能知道两个参数，标签：'div'；id：'content'，然后通过这两个参数提取出小说文本。

```
import requests  
from bs4 import BeautifulSoup  
......  
......  
for i in range(len(dd)):  
    if i == 2：    #  临时设置只看第3篇文章的打印效果，用于调试  
        title = dd[i].find('a').text  
        chap_url = dd[i].find('a')['href']  
        response1 = requests.get('https://www.biquge.com.cn' + chap_url) #访问链接  
        soup1 = BeautifulSoup(response1.content, 'lxml')   # 获得网页  
        text = soup1.find('div', id='content').text   #解析网页获得小说正文  
        print(text)      # 试打印看效果
```

![](https://p1-tt.byteimg.com/origin/pgc-image/460e7b0075e6487f9b331ce98962d096?from=pc)

图8，打印第3篇正文成功

6、保存结果

```
f = open(path + '/' + title + '.txt', 'a+', encoding='utf-8') 
```

至此，代码完成，能放心下载了。

7、运行效果

我们在完整代码里，设置一次性下载100章节的代码，来看看下载的效果。完整代码：

```py
import requests, os  
from bs4 import BeautifulSoup

url = 'https://www.biquge.com.cn/book/23341/'  
response = requests.get(url)  
soup = BeautifulSoup(response.content, 'lxml')   
booktitle = soup.find('h1').text  
if not os.path.isdir(booktitle):  # 判断当前文件夹下是否存在和小说名同名的文件夹  
    os.makedirs(booktitle)  # 若不存在，则创建小说同名文件夹  
dd = soup.find_all('dd')  
for i in range(len(dd)):  
    if i < 100:  
        title = dd[i].find('a').text  
        chap_url = dd[i].find('a')['href']  
        response1 = requests.get('https://www.biquge.com.cn' + chap_url)  
        soup1 = BeautifulSoup(response1.content, 'lxml')  
        text = soup1.find('div', id='content').text  
        f = open(booktitle + '/' + title + '.txt', 'a+', encoding='utf-8')  
        f.write(text)  
        print("正在下载《 {} 》...... {} / {} ".format(title, i+1, len(dd)))  
    else:  
        break  
print('本次共下载 {} 章， 保存地址：{}'.format(i, os.getcwd() + '\\' + booktitle + '\\'))


```

运行效果：

![](https://p1-tt.byteimg.com/origin/pgc-image/71d3db902e28450c84aab4324892ef2d?from=pc)

![](https://p6-tt.byteimg.com/origin/pgc-image/64270e6a2c80414a8b819643bb760a91?from=pc)
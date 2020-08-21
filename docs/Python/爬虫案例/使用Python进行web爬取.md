---
title : 使用Python进行web爬取
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-19 04:13:15 +0800
categories:
 -
tags:
 -
---
[[toc]]


目录



[![](https://img.realpython.net/e6f38ffcfa95b964554309592accfbb3)
](https://srv.realpython.net/click/30134497340/?c=52901525492&p=58946116052&r=92175)

**Web抓取**是从Web收集和解析原始数据的过程，Python社区已经提出了一些非常强大的Web抓取工具。

互联网可能承载着地球上最大的信息源和错误信息。数据科学，商业智能和调查报告等许多学科都可以从网站收集和分析数据中受益匪浅。

**在本教程中，您将学习如何：**

*   使用**字符串方法**和**正则表达式**解析网站数据
*   使用**HTML解析器**解析网站数据
*   与**表格**和其他网站组件互动

**注意：**本教程改编自《[_Python基础知识：Python 3实用介绍_](https://realpython.com/products/python-basics-book/)》中的“与Web交互”一章。

本书使用Python的内置[IDLE](https://realpython.com/python-idle/)编辑器来创建和编辑Python文件并与Python Shell交互，因此在本教程中，您偶尔会看到对IDLE的引用。但是，从您选择的编辑器和环境中运行示例代码应该没有问题。

**免费红利：** 单击此处可获得我们的免费Python备忘单，其中介绍了Python 3的基础知识，例如使用数据类型，字典，列表和Python函数。



从网站抓取并解析文本
----------

使用自动化过程从网站收集数据称为网络抓取。一些网站明确禁止用户使用自动化工具（例如您将在本教程中创建的工具）抓取数据。网站这样做有两个可能的原因：

1.  该网站有充分的理由保护其数据。例如，Google Maps不允许您过多地请求太多结果。
2.  对网站服务器重复请求可能会占用带宽，使其他用户的网站速度变慢，并可能使服务器超载，从而使网站完全停止响应。

**重要提示：**在使用Python技巧进行Web抓取之前，您应该始终检查目标网站的可接受使用政策，以了解使用自动化工具访问该网站是否违反了其使用条款。从法律上讲，违反网站意愿的网页抓取在很大程度上是一个灰色区域。

_请注意，以下技术在禁止网页抓取的网站上使用时[可能是非法的](https://en.wikipedia.org/wiki/Web_scraping#Legal_issues)。_

让我们从一个网页上获取所有HTML代码开始。您将使用有关_Real Python_的页面，该页面已设置为可用于本教程。

### 您的第一个网络刮板

一个有用的包网页抓取，你可以在Python的发现[标准库](https://docs.python.org/3/library/)是`urllib`，其中包含工具使用URL。特别是，[`urllib.request`](https://docs.python.org/3/library/urllib.request.html#module-urllib.request)模块包含一个称为的函数`urlopen()`，可用于在程序中打开URL。

在IDLE的交互式窗口中，输入以下内容进行导入`urlopen()`：

>>>```
`>>> from urllib.request import urlopen` 
```

我们将打开的网页位于以下URL：

>>>```
`>>> url = "http://olympus.realpython.org/profiles/aphrodite"` 
```

要打开网页，请传递`url`至`urlopen()`：

>>>```
`>>> page = urlopen(url)` 
```

`urlopen()`返回一个`HTTPResponse`对象：

>>>```
`>>> page
<http.client.HTTPResponse object at 0x105fef820>` 
```

要从页面提取HTML，请首先使用`HTTPResponse`对象的`.read()`方法，该方法返回字节序列。然后使用[UTF-8](https://realpython.com/python-encodings-guide/#unicode-vs-utf-8)`.decode()`将字节解码为字符串：[](https://realpython.com/python-encodings-guide/#unicode-vs-utf-8)

>>>```
`>>> html_bytes = page.read()
>>> html = html_bytes.decode("utf-8")` 
```

现在，您可以打印HTML以查看网页的内容：

>>>```
`>>> print(html)
<html>
<head>
<title>Profile: Aphrodite</title>
</head>
<body bgcolor="yellow">
<center>
<br><br>
<img src="/static/aphrodite.gif" />
<h2>Name: Aphrodite</h2>
<br><br>
Favorite animal: Dove
<br><br>
Favorite color: Red
<br><br>
Hometown: Mount Olympus
</center>
</body>
</html>` 
```

将HTML用作文本后，您可以通过两种不同的方式从中提取信息。

[Remove ads](/account/join/)

### 使用字符串方法从HTML提取文本

从网页的HTML提取信息的一种[方法](https://realpython.com/python-strings/#built-in-string-methods)是使用[字符串方法](https://realpython.com/python-strings/#built-in-string-methods)。例如，您可以使用`.find()`来搜索HTML文本中的`<title>`标签并提取网页的标题。

让我们提取上一个示例中请求的网页的标题。如果您知道标题的第一个字符和结束`</title>`标记的第一个字符的索引，则可以使用[字符串切片](https://realpython.com/python-strings/#string-slicing)来提取标题。

由于`.find()`返回一个子第一次出现的索引，你可以得到开放的索引`<title>`由字符串传递标签`"<title>"`到`.find()`：

>>>```
`>>> title_index = html.find("<title>")
>>> title_index
14` 
```

不过，您不希望`<title>`标签的索引。您需要标题本身的索引。要获取标题中第一个字母的索引，可以将字符串的长度添加`"<title>"`到`title_index`：

>>>```
`>>> start_index = title_index + len("<title>")
>>> start_index
21` 
```

现在`</title>`，将字符串传递给，`"</title>"`以获取结束标记的索引`.find()`：

>>>```
`>>> end_index = html.find("</title>")
>>> end_index
39` 
```

最后，您可以通过切片`html`字符串来提取标题：

>>>```
`>>> title = html[start_index:end_index]
>>> title
'Profile: Aphrodite'` 
```

与Aphrodite个人资料页面上的HTML相比，现实世界中的HTML可能要复杂得多，并且可预测性要差得多。这是[另一个配置文件页面](http://olympus.realpython.org/profiles/poseidon)，其中包含一些您可以抓取的更乱的HTML：

>>>```
`>>> url = "http://olympus.realpython.org/profiles/poseidon"` 
```

尝试使用与前面的示例相同的方法从此新URL中提取标题：

>>>```
`>>> url = "http://olympus.realpython.org/profiles/poseidon"
>>> page = urlopen(url)
>>> html = page.read().decode("utf-8")
>>> start_index = html.find("<title>") + len("<title>")
>>> end_index = html.find("</title>")
>>> title = html[start_index:end_index]
>>> title
'\n<head>\n<title >Profile: Poseidon'` 
```

哎呀！标题中混入了一些HTML。为什么？

该`/profiles/poseidon`页面的HTML与该页面的HTML 相似`/profiles/aphrodite`，但有很小的区别。开头`<title>`标签在右尖括号（`>`）之前有一个额外的空间，将其显示为`<title >`。

`html.find("<title>")`返回，`-1`因为确切的子字符串`"<title>"`不存在。当`-1`被添加到`len("<title>")`，这是`7`，该`start_index`变量被分配值`6`。

`6`字符串索引处的字符`html`是换行符`\n`（`<`），位于`<head>`标签的尖括号（）之前。这意味着`html[start_index:end_index]`返回所有以该换行符开始并在`</title>`标记之前结束的HTML 。

这类问题可能以无数不可预测的方式发生。您需要一种更可靠的方法来从HTML提取文本。

[Remove ads](/account/join/)

### 正则表达式入门

**正则表达式（**或简称为**正则****表达式）**是可用于在字符串中搜索文本的模式。Python通过标准库的[`re`](https://docs.python.org/3/library/re.html)模块支持正则表达式。

**注意：**正则表达式不是Python特有的。它们是一个通用的编程概念，可以与任何编程语言一起使用。

要使用正则表达式，您需要做的第一件事是导入`re`模块：

>>>```
`>>> import re` 
```

正则表达式使用称为**元字符的**特殊**字符**来表示不同的模式。例如，星号字符（`*`）代表星号之前的零个或多个。

在以下示例中，您用于`findall()`查找字符串中与给定正则表达式匹配的任何文本：

>>>```
`>>> re.findall("ab*c", "ac")
['ac']` 
```

的第一个参数`re.findall()`是您要匹配的正则表达式，第二个参数是要测试的字符串。在上面的示例中，您`"ab*c"`在字符串中搜索模式`"ac"`。

正则表达式`"ab*c"`匹配以一个开头的字符串的任何部分`"a"`，具有端部`"c"`，并且具有零个或多个实例`"b"`在两者之间。`re.findall()`返回所有匹配项的列表。该字符串`"ac"`与该模式匹配，因此将其返回到列表中。

这是应用于不同字符串的相同模式：

>>>```
`>>> re.findall("ab*c", "abcd")
['abc']

>>> re.findall("ab*c", "acc")
['ac']

>>> re.findall("ab*c", "abcac")
['abc', 'ac']

>>> re.findall("ab*c", "abdc")
[]` 
```

请注意，如果找不到匹配项，则`findall()`返回一个空列表。

模式匹配区分大小写。如果不管大小写如何都要匹配此模式，则可以传递带有值的第三个参数`re.IGNORECASE`：

>>>```
`>>> re.findall("ab*c", "ABC")
[]

>>> re.findall("ab*c", "ABC", re.IGNORECASE)
['ABC']` 
```

您可以使用句点（`.`）代表正则表达式中的任何单个字符。举例来说，你可以找到所有包含字母串`"a"`和`"c"`单个字符分隔，如下所示：

>>>```
`>>> re.findall("a.c", "abc")
['abc']

>>> re.findall("a.c", "abbc")
[]

>>> re.findall("a.c", "ac")
[]

>>> re.findall("a.c", "acc")
['acc']` 
```

`.*`正则表达式中的模式代表重复任意次数的任何字符。例如，`"a.*c"`可用于查找以开头`"a"`和结尾的每个子字符串`"c"`，而无论介于哪个字母或多个字母之间：

>>>```
`>>> re.findall("a.*c", "abc")
['abc']

>>> re.findall("a.*c", "abbc")
['abbc']

>>> re.findall("a.*c", "ac")
['ac']

>>> re.findall("a.*c", "acc")
['acc']` 
```

通常，您用于`re.search()`搜索字符串中的特定模式。该函数比`re.findall()`它返回返回一个称为a的对象（该对象`MatchObject`存储不同的数据组）要复杂得多。这是因为其他匹配项中可能有匹配项，并`re.search()`返回所有可能的结果。

的详细信息`MatchObject`与此处无关。现在，只知道调用`.group()`a `MatchObject`将返回第一个也是最包容的结果，在大多数情况下，这就是您想要的结果：

>>>```
`>>> match_results = re.search("ab*c", "ABC", re.IGNORECASE)
>>> match_results.group()
'ABC'` 
```

`re`模块中还有一个功能对解析文本很有用。`re.sub()`，_替代品的_缩写，允许您用新文本替换与正则表达式匹配的字符串中的文本。它的行为有点像[`.replace()`](https://docs.python.org/3/library/stdtypes.html?highlight=replace#str.replace)字符串方法。

传递给的参数`re.sub()`是正则表达式，后跟替换文本，后跟字符串。这是一个例子：

>>>```
`>>> string = "Everything is <replaced> if it's in <tags>."
>>> string = re.sub("<.*>", "ELEPHANTS", string)
>>> string
'Everything is ELEPHANTS.'` 
```

也许那不是您期望的那样。

`re.sub()`使用正则表达式`"<.*>"`查找和替换第一个`<`和最后一个之间的内容`>`，范围从的开始`<replaced>`到结束`<tags>`。这是因为Python的正则表达式是**greedy**，这意味着当`*`使用like这样的字符时，它们会尝试找到最长的匹配项。

另外，您可以使用非贪婪匹配模式`*?`，`*`除了匹配最短的文本字符串外，其工作方式与之相同：

>>>```
`>>> string = "Everything is <replaced> if it's in <tags>."
>>> string = re.sub("<.*?>", "ELEPHANTS", string)
>>> string
"Everything is ELEPHANTS if it's in ELEPHANTS."` 
```

这次，`re.sub()`找到两个匹配项`<replaced>`和`<tags>`，并用字符串替换这`"ELEPHANTS"`两个匹配项。

[Remove ads](/account/join/)

### 使用正则表达式从HTML提取文本

掌握了所有这些知识之后，现在让我们尝试[从新的个人资料页面中](http://olympus.realpython.org/profiles/dionysus)解析标题，其中包括以下相当粗心编写的HTML行：

```
`<TITLE >Profile: Dionysus</title  / >` 
```

该`.find()`方法将很难处理这里的不一致之处，但是通过正则表达式的巧妙使用，您可以快速有效地处理以下代码：

```
`import re
from urllib.request import urlopen

url = "http://olympus.realpython.org/profiles/dionysus"
page = urlopen(url)
html = page.read().decode("utf-8")

pattern = "<title.*?>.*?</title.*?>"
match_results = re.search(pattern, html, re.IGNORECASE)
title = match_results.group()
title = re.sub("<.*?>", "", title) # Remove HTML tags

print(title)` 
```

让我们仔细看一下`pattern`字符串中的第一个正则表达式，将其分为三部分：

1.  **`<title.*?>`**与中的开始`<TITLE >`标记匹配`html`。该`<title`模式的一部分与匹配`<TITLE`，因为`re.search()`被调用时`re.IGNORECASE`，和`.*?>`之后的任何文本匹配`<TITLE`达到的第一个实例`>`。
    
2.  **`.*?`**开头后非贪婪地匹配所有文本`<TITLE >`，在的第一个匹配处停止`</title.*?>`。
    
3.  **`</title.*?>`**与第一个模式的不同之处仅在于使用`/`字符，因此它与中的结束`</title / >`标记匹配`html`。
    

第二个正则表达式string `"<.*?>"`，也使用非贪心`.*?`来匹配`title`字符串中的所有HTML标签。通过将所有匹配项替换为`""`，`re.sub()`将删除所有标签并仅返回文本。

**注意：**用Python或任何其他语言进行的Web抓取可能很乏味。没有两个网站的组织方式相同，HTML常常很混乱。此外，网站会随着时间而变化。不能保证今天工作的刮板在明年或下周工作！

正则表达式是正确使用的强大工具。此介绍几乎没有刮擦表面。有关正则表达式以及如何使用它们的更多信息，请查看分为两部分的系列[正则表达式：Python中的正则表达式](https://realpython.com/regex-python/)。

### 检查您的理解

展开下面的框来检查您的理解。

练习：从网站上抓取数据显示隐藏

Write a program that grabs the full HTML from the following URL:

>>>```
`>>> url = "http://olympus.realpython.org/profiles/dionysus"` 
```

Then use `.find()` to display the text following “Name:” and “Favorite Color:” (not including any leading spaces or trailing HTML tags that might appear on the same line).

您可以展开下面的块以查看解决方案。

解决方案：从网站抓取数据显示隐藏

First, import the `urlopen` function from the `urlib.request` module:

```
`from urllib.request import urlopen` 
```

然后打开URL并使用 `.read()` method of the `HTTPResponse` object returned by `urlopen()` to read the page’s HTML:

```
`url = "http://olympus.realpython.org/profiles/dionysus"
html_page = urlopen(url)
html_text = html_page.read().decode("utf-8")` 
```

`.read()` returns a byte string, so you use `.decode()` to decode the bytes using the UTF-8 encoding.

Now that you have the HTML source of the web page as a string assigned to the `html_text` variable, you can extract Dionysus’s name and favorite color from his profile. The structure of the HTML for Dionysus’s profile is the same as Aphrodite’s profile that you saw earlier.

您可以通过找到字符串来获取名称 `"Name:"` in the text and extracting everything that comes after the first occurence of the string and before the next HTML tag. That is, you need to extract everything after the colon (`:`) and before the first angle bracket (`<`). You can use the same technique to extract the favorite color.

以下[`for`循环](https://realpython.com/python-for-loop/)为名称和收藏夹颜色提取此文本：

```
`for string in ["Name: ", "Favorite Color:"]:
    string_start_idx = html_text.find(string)
    text_start_idx = string_start_idx + len(string)

    next_html_tag_offset = html_text[text_start_idx:].find("<")
    text_end_idx = text_start_idx + next_html_tag_offset

    raw_text = html_text[text_start_idx : text_end_idx]
    clean_text = raw_text.strip(" \r\n\t")
    print(clean_text)` 
```

看起来这件事发生了很多 `for`loop, but it’s just a little bit of arithmetic to calculate the right indices for extracting the desired text. Let’s break it down:

1.  您可以使用`html_text.find()`查找的字符串的起始索引，无论是`"Name:"`或`"Favorite Color:"`，然后分配索引`string_start_idx`.
    
2.  由于要提取的文本是在`"Name:"`或中`"Favorite Color:"`的冒号之后立即开始的，因此您可以通过将字符串的长度添加到`start_string_idx`并将结果分配给来获得冒号之后的字符索引`text_start_idx`.
    
3.  You calculate the ending index of the text to extract by determining the index of the first angle bracket (`<`) relative to `text_start_idx` and assign this value to `next_html_tag_offset`. Then you add that value to `text_start_idx` and assign the result to `text_end_idx`.
    
4.  You extract the text by slicing `html_text` from `text_start_idx` to `text_end_idx` and assign this string to `raw_text`.
    
5.  You remove any whitespace from the beginning and end of `raw_text` using `.strip()` and assign the result to `clean_text`.
    

At the end of the loop, you use `print()` to display the extracted text. The final output looks like this:

```
`Dionysus
Wine` 
```

This solution is one of many that solves this problem, so if you got the same output with a different solution, then you did great!

准备就绪后，可以继续进行下一部分。

使用HTML解析器在Python中进行网页爬取
-----------------------

尽管一般而言，正则表达式非常适合模式匹配，但有时使用显式设计用于解析HTML页面的HTML解析器会更容易。为此目的编写了许多Python工具，但是[Beautiful Soup](http://www.crummy.com/software/BeautifulSoup/)库是一个很好的开始。

### 安装美丽的汤

要安装Beautiful Soup，您可以在终端中运行以下命令：

```
`$ python3 -m pip install beautifulsoup4` 
```

运行`pip show`以查看刚刚安装的软件包的详细信息：

```
`$ python3 -m pip show beautifulsoup4
Name: beautifulsoup4
Version: 4.9.1
Summary: Screen-scraping library
Home-page: http://www.crummy.com/software/BeautifulSoup/bs4/
Author: Leonard Richardson
Author-email: leonardr@segfault.org
License: MIT
Location: c:\realpython\venv\lib\site-packages
Requires:
Required-by:` 
```

特别要注意的是，撰写本文时的最新版本是4.9.1。

[Remove ads](/account/join/)

### 创建一个`BeautifulSoup`对象

在新的编辑器窗口中键入以下程序：

```
`from bs4 import BeautifulSoup
from urllib.request import urlopen

url = "http://olympus.realpython.org/profiles/dionysus"
page = urlopen(url)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")` 
```

该程序执行三件事：

1.  `http://olympus.realpython.org/profiles/dionysus`使用`urlopen()`来自`urllib.request`模块的URL
    
2.  从页面读取HTML作为字符串，并将其分配给`html`变量
    
3.  创建一个`BeautifulSoup`对象并将其分配给`soup`变量
    

使用两个参数创建`BeautifulSoup`分配给的对象`soup`。第一个参数是要解析的HTML，第二个参数string `"html.parser"`告诉对象在后台使用哪个解析器。`"html.parser"`表示Python的内置HTML解析器。

### 使用`BeautifulSoup`物件

保存并运行上述程序。完成运行后，您可以`soup`在交互式窗口中使用变量`html`以各种方式解析内容。

例如，`BeautifulSoup`对象具有一种`.get_text()`可用于从文档中提取所有文本并自动删除任何HTML标记的方法。

在IDLE的交互式窗口中输入以下代码：

>>>```
`>>> print(soup.get_text())

Profile: Dionysus

Name: Dionysus

Hometown: Mount Olympus

Favorite animal: Leopard

Favorite Color: Wine` 
```

此输出中有很多空白行。这些是HTML文档文本中换行符的结果。`.replace()`如果需要，可以使用字符串方法将其删除。

通常，您只需要从HTML文档中获取特定文本。首先使用Beautiful Soup提取文本，然后使用`.find()`string方法_有时_比使用正则表达式更容易。

但是，有时HTML标记本身就是指出要检索的数据的元素。例如，也许您想检索页面上所有图像的URL。这些链接包含在HTML标签的`src`属性中`<img>`。

在这种情况下，您可以`find_all()`用来返回该特定标签的所有实例的列表：

>>>```
`>>> soup.find_all("img")
[<img src="/static/dionysus.jpg"/>, <img src="/static/grapes.png"/>]` 
```

这将返回`<img>`HTML文档中所有标签的列表。列表中的对象看起来可能是代表标签的字符串，但实际上它们是`Tag`Beautiful Soup提供的对象的实例。`Tag`对象提供了一个简单的界面来处理它们包含的信息。

首先，`Tag`从列表中解压缩对象，让我们对此进行一些探讨：

>>>```
`>>> image1, image2 = soup.find_all("img")` 
```

每个`Tag`对象都有一个`.name`属性，该属性返回包含HTML标签类型的字符串：

>>>```
`>>> image1.name
'img'` 
```

您可以`Tag`通过将对象的名称放在方括号中来访问对象的HTML属性，就像属性是字典中的键一样。

例如，`<img src="/static/dionysus.jpg"/>`标记具有单个属性，`src`其值为`"/static/dionysus.jpg"`。同样，一个HTML标签，如链接`<a href="https://realpython.com" target="_blank">`有两个属性，`href`和`target`。

要在Dionysus个人资料页面中获取图像的来源，请`src`使用上述字典符号访问属性：

>>>```
`>>> image1["src"]
'/static/dionysus.jpg'

>>> image2["src"]
'/static/grapes.png'` 
```

HTML文档中的某些标签可以通过`Tag`对象的属性进行访问。例如，要`<title>`在文档中获取标签，可以使用`.title`属性：

>>>```
`>>> soup.title
<title>Profile: Dionysus</title>` 
```

如果通过导航到[个人资料页面](http://olympus.realpython.org/profiles/dionysus)，右键单击页面并选择_查看页面源_来_查看_ Dionysus资料的_来源_，那么您会注意到`<title>`文档中所写的标签如下所示：

```
`<title >Profile: Dionysus</title/>` 
```

Beautiful Soup会通过删除开头标签中的多余空间和`/`结尾标签中多余的正斜杠（），自动为您清理标签。

您还可以只检索标题标签之间带有对象`.string`属性的字符串`Tag`：

>>>```
`>>> soup.title.string
'Profile: Dionysus'` 
```

Beautiful Soup的更有用的功能之一是能够搜索属性与特定值匹配的特定种类的标签。例如，如果要查找`<img>`具有`src`等于value 的属性的所有标签，则可以为`/static/dionysus.jpg`提供以下附加参数`.find_all()`：

>>>```
`>>> soup.find_all("img", src="/static/dionysus.jpg")
[<img src="/static/dionysus.jpg"/>]` 
```

该示例在某种程度上是任意的，并且该技术的实用性从该示例可能并不明显。如果您花一些时间浏览各种网站并查看其页面源，那么您会注意到许多网站具有极其复杂的HTML结构。

使用Python从网站抓取数据时，您通常会对页面的特定部分感兴趣。通过花一些时间浏览HTML文档，您可以识别具有唯一属性的标签，这些标签可用于提取所需的数据。

然后，您无需依赖复杂的正则表达式或`.find()`用于搜索文档，而可以直接访问您感兴趣的特定标记并提取所需的数据。

在某些情况下，您可能会发现Beautiful Soup没有提供您需要的功能。该[LXML](http://lxml.de/)库是有点棘手上手，但提供了比美丽的汤更灵活地解析HTML文档。您可以在舒适使用美丽汤后检查一下。

**注意：**在网页中查找特定数据时，诸如Beautiful Soup之类的HTML解析器可以为您节省大量时间和精力。但是，有时HTML编写得很差并且混乱，以至于像Beautiful Soup这样的复杂解析器也无法正确解释HTML标签。

在这种情况下，通常会使用`.find()`正则表达式技术来尝试解析所需的信息。

BeautifulSoup非常适合从网站的HTML抓取数据，但是它不提供使用HTML表单的任何方式。例如，如果您需要在网站上搜索某些查询，然后抓取结果，那么仅BeautifulSoup并不能帮助您。

[Remove ads](/account/join/)

### 检查您的理解

展开下面的框来检查您的理解。

练习：使用BeautifulSoup解析HTML显示隐藏

Write a program that grabs the full HTML from the [page](http://olympus.realpython.org/profiles) at the URL `http://olympus.realpython.org/profiles`.

Using Beautiful Soup, print out a list of all the links on the page by looking for HTML tags with the name `a` and retrieving the value taken on by the `href` attribute of each tag.

The final output should look like this:

```
`http://olympus.realpython.org/profiles/aphrodite
http://olympus.realpython.org/profiles/poseidon
http://olympus.realpython.org/profiles/dionysus` 
```

您可以展开下面的块以查看解决方案：

解决方案：使用BeautifulSoup解析HTML显示隐藏

First, import the `urlopen` function from the `urlib.request` module and the `BeautifulSoup` class from the `bs4` package:

```
`from urllib.request import urlopen
from bs4 import BeautifulSoup` 
```

Each link URL on the `/profiles` page is a [relative URL](https://www.w3.org/TR/WD-html40-970917/htmlweb.html#h-5.1.2), so create a `base_url` variable with the base URL of the website:

```
`base_url = "http://olympus.realpython.org"` 
```

You can build a full URL by concatenating `base_url` with a relative URL.

Now open the `/profiles` page with `urlopen()` and use `.read()` to get the HTML source:

```
`html_page = urlopen(base_url + "/profiles")
html_text = html_page.read().decode("utf-8")` 
```

With the HTML source downloaded and decoded, you can create a new `BeautifulSoup` object to parse the HTML:

```
`soup = BeautifulSoup(html_text, "html.parser")` 
```

`soup.find_all("a")` returns a list of all links in the HTML source. You can loop over this list to print out all the links on the webpage:

```
`for link in soup.find_all("a"):
    link_url = base_url + link["href"]
    print(link_url)` 
```

The relative URL for each link can be accessed through the `"href"` subscript. Concatenate this value with `base_url` to create the full `link_url`.

准备就绪后，可以继续进行下一部分。

与HTML表单交互
---------

`urllib`到目前为止，您在本教程中一直使用的模块非常适合请求网页的内容。但是，有时您需要与网页进行交互以获得所需的内容。例如，您可能需要提交表单或单击按钮以显示隐藏的内容。

**注意：**本教程改编自《[_Python基础知识：Python 3实用介绍_](https://realpython.com/products/python-basics-book/)》中的“与Web交互”一章。如果您喜欢阅读[的书籍](https://realpython.com/products/python-basics-book/)，请务必阅读[本书的其余部分](https://realpython.com/products/python-basics-book/)。

Python标准库没有提供用于交互式处理网页的内置方法，但是PyPI提供了许多第三方软件包。其中，[MechanicalSoup](https://github.com/hickford/MechanicalSoup)是一种流行且相对简单的软件包。

本质上，MechanicalSoup会安装所谓的**无头浏览器**，它是没有图形用户界面的Web浏览器。该浏览器通过Python程序以编程方式进行控制。

### 安装MechanicalSoup

您可以[`pip`](https://realpython.com/what-is-pip/)在终端中安装MechanicalSoup ：

```
`$ python3 -m pip install MechanicalSoup` 
```

您现在可以使用来查看有关软件包的一些详细信息`pip show`：

```
`$ python3 -m pip show mechanicalsoup
Name: MechanicalSoup
Version: 0.12.0
Summary: A Python library for automating interaction with websites
Home-page: https://mechanicalsoup.readthedocs.io/
Author: UNKNOWN
Author-email: UNKNOWN
License: MIT
Location: c:\realpython\venv\lib\site-packages
Requires: requests, beautifulsoup4, six, lxml
Required-by:` 
```

特别要注意的是，撰写本文时的最新版本是0.12.0。您需要关闭并重新启动IDLE会话，以便MechanicalSoup在安装后加载并被识别。

### 创建一个`Browser`对象

在IDLE的交互式窗口中输入以下内容：

>>>```
`>>> import mechanicalsoup
>>> browser = mechanicalsoup.Browser()` 
```

`Browser`对象代表无头Web浏览器。您可以通过将URL传递给他们的`.get()`方法来使用它们从Internet请求页面：

>>>```
`>>> url = "http://olympus.realpython.org/login"
>>> page = browser.get(url)` 
```

`page`是一个`Response`对象，用于存储从浏览器请求URL的响应：

>>>```
`>>> page
<Response [200]>` 
```

该数字`200`表示请求返回的[状态码](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)。状态码为`200`表示请求成功。不成功的请求可能会显示以下状态代码：`404`如果该URL不存在，或者`500`在发出请求时出现服务器错误。

MechanicalSoup使用Beautiful Soup来解析请求中的HTML。`page`具有`.soup`代表`BeautifulSoup`对象的属性：

>>>```
`>>> type(page.soup)
<class 'bs4.BeautifulSoup'>` 
```

您可以通过检查`.soup`属性来查看HTML ：

>>>```
`>>> page.soup
<html>
<head>
<title>Log In</title>
</head>
<body bgcolor="yellow">
<center>
<br/><br/>
<h2>Please log in to access Mount Olympus:</h2>
<br/><br/>
<form action="/login" method="post" name="login">
Username: <input name="user" type="text"/><br/>
Password: <input name="pwd" type="password"/><br/><br/>
<input type="submit" value="Submit"/>
</form>
</center>
</body>
</html>` 
```

注意这个页面有一个`<form>`关于它`<input>`的用户名和密码的元素。

[Remove ads](/account/join/)

### 使用MechanicalSoup提交表单

[`/login`](http://olympus.realpython.org/login)在浏览器中打开上一个示例中的页面，然后继续进行浏览。尝试输入随机的用户名和密码组合。如果您猜错了，则显示消息“用户名或密码错误！” 显示在页面底部。

但是，如果您提供正确的登录凭据（用户名`zeus`和密码`ThunderDude`），那么您将被重定向到[`/profiles`](http://olympus.realpython.org/profiles)页面。

在下一个示例中，您将看到如何使用MechanicalSoup使用Python填写并提交此表单！

HTML代码的重要部分是登录表单，即`<form>`标记内的所有内容。在`<form>`此页面上有`name`属性设置为`login`。此表单包含两个`<input>`元素，一个名为`user`，另一个名为`pwd`。第三个`<input>`元素是“提交”按钮。

现在您已经知道了登录表单的基础结构以及登录所需的凭据，下面让我们看一个程序。填写表格并提交。

在新的编辑器窗口中，键入以下程序：

```
`import mechanicalsoup

# 1
browser = mechanicalsoup.Browser()
url = "http://olympus.realpython.org/login"
login_page = browser.get(url)
login_html = login_page.soup

# 2
form = login_html.select("form")[0]
form.select("input")[0]["value"] = "zeus"
form.select("input")[1]["value"] = "ThunderDude"

# 3
profiles_page = browser.submit(form, login_page.url)` 
```

保存文件，然后按F5运行它。您可以通过在交互式窗口中键入以下内容来确认您已成功登录：

>>>```
`>>> profiles_page.url
'http://olympus.realpython.org/profiles'` 
```

让我们分解上面的例子：

1.  您创建一个`Browser`实例并使用它来请求URL `http://olympus.realpython.org/login`。您可以`login_html`使用`.soup`属性将页面的HTML内容分配给变量。
    
2.  `login_html.select("form")`返回`<form>`页面上所有元素的列表。由于页面只有一个`<form>`元素，因此您可以通过检索`0`列表索引处的元素来访问表单。接下来的两行选择用户名和密码输入，并将其值分别设置为`"zeus"`和`"ThunderDude"`。
    
3.  您使用提交表单`browser.submit()`。请注意，您向此方法传递了两个参数，即`form`对象和URL `login_page`，您可以通过访问它们`login_page.url`。
    

在交互式窗口中，确认提交已成功重定向到`/profiles`页面。如果出了什么问题，那么的价值`profiles_page.url`仍然是`"http://olympus.realpython.org/login"`。

**注意：**黑客可以使用上述程序之类的自动化程序，通过快速尝试许多不同的用户名和密码来**暴力**登录，直到找到有效的组合为止。

除了这种高度违法的行为外，如今，几乎所有网站都将您锁定并报告您的IP地址，如果他们看到您提出过多的失败请求，请不要尝试！

现在我们已经`profiles_page`设置了变量，让我们看看如何以编程方式获取`/profiles`页面上每个链接的URL 。

为此，请`.select()`再次使用，这次传递字符串`"a"`以选择`<a>`页面上的所有锚元素：

>>>```
`>>> links = profiles_page.soup.select("a")` 
```

现在，您可以遍历每个链接并打印`href`属性：

>>>```
`>>> for link in links:
...     address = link["href"]
...     text = link.text
...     print(f"{text}: {address}")
...
Aphrodite: /profiles/aphrodite
Poseidon: /profiles/poseidon
Dionysus: /profiles/dionysus` 
```

每个`href`属性中包含的URL 是相对URL，如果以后要使用MechanicalSoup导航到它们，这些URL并不是很有用。如果您碰巧知道完整URL，则可以分配构造完整URL所需的部分。

在这种情况下，基本网址为`http://olympus.realpython.org`。然后，您可以将基本URL与在`src`属性中找到的相对URL连接起来：

>>>```
`>>> base_url = "http://olympus.realpython.org"
>>> for link in links:
...     address = base_url + link["href"]
...     text = link.text
...     print(f"{text}: {address}")
...
Aphrodite: http://olympus.realpython.org/profiles/aphrodite
Poseidon: http://olympus.realpython.org/profiles/poseidon
Dionysus: http://olympus.realpython.org/profiles/dionysus` 
```

你可以做很多事只是`.get()`，`.select()`和`.submit()`。也就是说，MechanicalSoup的功能还很多。要了解有关MechanicalSoup的更多信息，请查看[官方文档](https://mechanicalsoup.readthedocs.io/en/stable/)。

[Remove ads](/account/join/)

### 检查您的理解

展开下面的方框以检查您的理解

练习：使用MechanicalSoup提交表单显示隐藏

Use MechanicalSoup to provide the correct username (`zeus`) and password (`ThunderDude`) to the [login form](http://olympus.realpython.org/login) located at the URL `http://olympus.realpython.org/login`.

Once the form is submitted, display the title of the current page to determine that you’ve been redirected to the [`/profiles`](http://olympus.realpython.org/profiles) page.

Your program should print the text `<title>All Profiles</title>`.

您可以展开下面的块以查看解决方案。

解决方案：使用MechanicalSoup提交表单显示隐藏

First, import the `mechanicalsoup` package and create a `Broswer` object:

```
`import mechanicalsoup

browser = mechanicalsoup.Browser()` 
```

Point the browser to the login page by passing the URL to `browser.get()` and grab the HTML with the `.soup` attribute:

```
`login_url = "http://olympus.realpython.org/login"
login_page = browser.get(login_url)
login_html = login_page.soup` 
```

`login_html` is a `BeautifulSoup` instance. Since the page has only a single form on it, you can access the form via `login_html.form`. Using `.select()`, select the username and password inputs and fill them with the username `"zeus"` and the password `"ThunderDude"`:

```
`form = login_html.form
form.select("input")[0]["value"] = "zeus"
form.select("input")[1]["value"] = "ThunderDude"` 
```

Now that the form is filled out, you can submit it with `browser.submit()`:

```
`profiles_page = browser.submit(form, login_page.url)` 
```

If you filled the form with the correct username and password, then `profiles_page` should actually point to the `/profiles` page. You can confirm this by printing the title of the page assigned to `profiles_page:`

```
`print(profiles_page.soup.title)` 
```

You should see the following text displayed:

```
`<title>All Profiles</title>` 
```

If instead you see the text `Log In` or something else, then the form submission failed.

准备就绪后，可以继续进行下一部分。

实时与网站互动
-------

有时，您希望能够从提供不断更新的信息的网站上获取实时数据。

在学习Python编程之前的黑暗日子里，每次想检查是否有更新的内容时，您都必须坐在浏览器前，单击“刷新”按钮以重新加载页面。但是现在您可以使用`.get()`MechanicalSoup `Browser`对象的方法自动执行此过程。

打开您选择的浏览器并导航到URL `http://olympus.realpython.org/dice`。此[`/dice`](http://olympus.realpython.org/dice)页面模拟一卷六边形的骰子，每次刷新浏览器时都会更新结果。在下面，您将编写一个程序，该程序会反复抓取页面以获得新结果。

您需要做的第一件事是确定页面上的哪个元素包含冲模结果。现在，可以通过右键单击页面上的任意位置并选择_查看页面源来执行此操作_。在HTML代码的一半以下是一个`<h2>`看起来像这样的标记：

```
`<h2 id="result">4</h2>` 
```

`<h2>`标签的文本可能与您有所不同，但这是抓取结果所需的页面元素。

**注意：**对于本示例，您可以使用轻松检查页面上是否只有一个元素`id="result"`。尽管该`id`属性应该是唯一的，但实际上，您应该始终检查是否对您感兴趣的元素进行了唯一标识。

让我们从编写一个简单的程序开始，该程序打开[`/dice`](http://olympus.realpython.org/dice)页面，抓取结果，并将其打印到控制台：

```
`import mechanicalsoup

browser = mechanicalsoup.Browser()
page = browser.get("http://olympus.realpython.org/dice")
tag = page.soup.select("#result")[0]
result = tag.text

print(f"The result of your dice roll is: {result}")` 
```

本示例使用`BeautifulSoup`对象的`.select()`方法通过查找元素`id=result`。该字符串`"#result"`您传递给`.select()`使用的[CSS ID选择](https://developer.mozilla.org/en-US/docs/Web/CSS/ID_selectors) `#`，以表明`result`是一个`id`值。

要定期获得新结果，您需要创建一个循环，以在每个步骤加载页面。因此`browser = mechanicalsoup.Browser()`，以上代码中该行下方的所有内容都需要放入循环主体中。

对于此示例，让我们以十秒的间隔获得四卷骰子。为此，代码的最后一行需要告诉Python暂停运行十秒钟。您可以使用[`sleep()`](https://realpython.com/python-sleep/)Python的[`time`module进行此操作](https://realpython.com/python-time-module/)。`sleep()`接受一个参数，该参数表示以秒为单位的睡眠时间。

这是一个说明如何`sleep()`工作的示例：

```
`import time

print("I'm about to wait for five seconds...")
time.sleep(5)
print("Done waiting!")` 
```

运行此代码时，您会看到`"Done waiting!"`直到执行`5`第一个`print()`函数几秒钟后才显示该消息。

对于冲模示例，您需要将数字传递`10`给`sleep()`。这是更新的程序：

```
`import time
import mechanicalsoup

browser = mechanicalsoup.Browser()

for i in range(4):
    page = browser.get("http://olympus.realpython.org/dice")
    tag = page.soup.select("#result")[0]
    result = tag.text
    print(f"The result of your dice roll is: {result}")
    time.sleep(10)` 
```

运行该程序时，您将立即看到第一个结果打印到控制台。十秒钟后，显示第二个结果，然后显示第三个，最后显示第四个。打印第四个结果后会发生什么？

该程序将继续运行另外十秒钟，然后最终停止！

好吧，_当然_可以了，那就是您告诉它要做的！但这有点浪费时间。您可以使用仅针对前三个请求运行的[`if`语句](https://realpython.com/python-conditional-statements/)来阻止它执行此操作`time.sleep()`：

```
`import time
import mechanicalsoup

browser = mechanicalsoup.Browser()

for i in range(4):
    page = browser.get("http://olympus.realpython.org/dice")
    tag = page.soup.select("#result")[0]
    result = tag.text
    print(f"The result of your dice roll is: {result}")

    # Wait 10 seconds if this isn't the last request
    if i < 3:
        time.sleep(10)` 
```

使用类似的技术，您可以从定期更新其数据的网站上抓取数据。但是，您应该知道，快速连续多次请求页面可能被视为可疑甚至是恶意使用网站。

**重要提示：**大多数网站都会发布使用条款文档。您通常可以在网站的页脚中找到指向它的链接。

尝试从网站上抓取数据之前，请务必先阅读本文档。如果找不到使用条款，请尝试与网站所有者联系，并询问他们是否对请求量有任何政策。

不遵守使用条款可能会导致您的IP被阻止，因此请当心并尊重！

甚至有可能使请求数量过多的服务器崩溃，因此您可以想象许多网站都在关注对其服务器的请求量！向网站发送多个请求时，请务必检查使用条款并遵守。

[Remove ads](/account/join/)

结论
--

尽管可以使用Python标准库中的工具从Web解析数据，但PyPI上有许多工具可以帮助简化流程。

**在本教程中，您学习了如何：**

*   使用Python的内置**`urllib`**模块请求网页
*   使用**Beautiful Soup**解析HTML
*   使用**MechanicalSoup**与Web表单进行交互
*   反复从网站请求数据以**检查更新**

编写自动的Web抓取程序很有趣，并且Internet上的内容并不短缺，可以导致各种各样令人兴奋的项目。

请记住，并不是每个人都希望您从其Web服务器中提取数据。在开始抓取之前，请务必先检查网站的使用条款，并注意如何安排网络请求的时间，以免服务器流量泛滥。

其他资源
----

有关使用Python进行网络抓取的更多信息，请查看以下资源：

*   [美丽的汤：使用Python构建网络抓取工具](https://realpython.com/beautiful-soup-web-scraper-python/)
*   [Python中的API集成](https://realpython.com/api-integration-in-python/)

**注意：**如果您喜欢从“ [_Python基础知识：Python 3实用介绍”_](https://realpython.com/products/python-basics-book/)这个示例中学到的[_知识_](https://realpython.com/products/python-basics-book/)，请务必[阅读本书的其余部分](https://realpython.com/products/python-basics-book/)。
---
title : Python的文件处理学习心得(with)
description : python文件处理的增删查改属于必学的
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-08 23:02:32 +0800
categories:
 -
tags:
 -
---
[[toc]]


## with Open函数的用法。

```python
with open("urls",'a+') as f:
    f.write(str(url_list))

```
解释.
* open函数用来打开文件."a+"是参数，用来表示追加，append的意思，文件若不存在就创建。
* as f表示打开的这个文件简称为f
* f.write 表示写入文件，后面的括号表示内容
* (str(url_list))表示写入的内容。因为我这里是个列表，所以要转换成字符串才能完美写入。

### 其他用法

```python
file = open('write_woodman.txt', mode='w', encoding='utf-8')
file.write('hello,\nwoodman')  # 写入文件，\n 转义字符换行
file.write('\n------------------\n')
str1 = '''你好！
我是木头人。
'''
file.write(str1)  # str1文本块写入文件，会安装文本块的格式
file.write('\n------------------\n')
list1 = ['Python', '是一门解释型语言\n', 'python非常简单']
file.writelines(list1)  # 写入列表数据
file.close() # 关闭文件
```
运行程序后文件内容：

```
hello,
woodman
------------------
你好！
我是木头人。

------------------
Python是一门解释型语言
python非常简单

```
### errors 参数
遇到有些编码不规范的文件，你可能会遇到`UnicodeDecodeError`，因为在文本文件中可能夹杂了一些非法编码的字符。遇到这种情况，`open()`函数还接收一个`errors`参数，表示如果遇到编码错误后如何处理。最简单的方式是直接忽略：

>>> f = open('/Users/michael/gbk.txt', 'r', encoding='gbk', errors='ignore')

Python的文件处理主要分为下列四类情况:
* python文件处理 
* Python读写文件
* Python写入/创建文件
* Python删除文件

### 多个文件的读写

　　　对于多个文件的读写，可以写成以下两种方式：


```py
with open('/home/xbwang/Desktop/output_measures.txt','r') as f:
    with open('/home/xbwang/Desktop/output_measures2.txt','r') as f1:
        with open('/home/xbwang/Desktop/output_output_bk.txt','r') as f2:
　　　　　　　........
　　　　　　　........
　　　　　　　........

```
```py
with open('/home/xbwang/Desktop/output_measures.txt','r') as f:
........
with open('/home/xbwang/Desktop/output_measures2.txt','r') as f1:
........
with open('/home/xbwang/Desktop/output_output_bk.txt','r') as f2:
........


```

## Python文件打开

简单来说就是`open()`函数。
open函数有以下四个参数.
* `"r"` \-读取\-默认值。 打开文件进行读取，如果文件不存在，则错误

* `"a"` \-追加\-打开要追加的文件，如果不存在则创建文件

* `"w"` \-写入\-打开文件进行写入，如果不存在则创建文件

* `"x"` \-创建\-创建指定的文件，如果文件存在则返回错误
* `‘r+’` == r+w（可读可写，文件若不存在就报错(IOError)）

* `‘w+’` == w+r（可读可写，文件若不存在就创建）

* `‘a+’` ==a+r（可追加可写，文件若不存在就创建）

另外，您可以指定文件应以二进制还是文本模式处理

* `"t"` \-文本\-默认值。 文字模式

* `"b"` \-二进制\-二进制模式（例如图像）

![20200809025825_2c6a786f7f6179a11228d1d9e31d08c2.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200809025825_2c6a786f7f6179a11228d1d9e31d08c2.png)


## 句法

要打开文件进行读取，只需指定文件名即可：

```python
f = open("demofile.txt")

#上面的代码与：

f = open("demofile.txt", "rt")

```
因为 `"r"` 用于读取和 `"t"` 用于文本是默认值，所以您无需指定它们。

**注意：** 确保文件存在，否则您将得到一个错误。

## 写入文件时附上日期

1. python可以使用baiopen函数来创建命名du文件。 

2. python可以使用datetime模块来获取日期。 

3.  实现代码： 

 * 方法1，使用isoformat()函数来直接生成格式化的日期：
from datetime import datetime
open(datetime.now().date().isoformat()+'.txt', 'w').close()

>这样就可以直接创建一个名为2017-08-015.txt的文件，根据当天日期不同而不同。 

 * 方法2，使用strftime函数生成格式化的日期：
from datetime import datetime
open(datetime.now().date().strftime('%Y%m%d')+'.txt', 'w').close()

>这样可以创建一个名为20160607.txt的文件，根据当天日期不同而不同。
函数说明：
* strftime（...）
按指定样式格式化时间转换成字符串。
* isoformat（...）
将时间转换成字符串ISO 8601格式，YYYY-MM-DD

* 格式化字符说明：

  * ％Y 年份以世纪为十进制数。
  * ％m 月份的十进制数[01,12]。
  * ％M 分钟的十进制数[00,60]。
  * ％S 其次为十进制数[00,61]。
  * ％z 时区与UTC的偏移。
  * ％a 本机格式的缩写工作日名称。
  * ％A 本机格式的完整周日名称。
  * ％b 本机格式的缩写月份名称。
  * ％B 本机格式的完整月份名称。
  * ％c 本机格式的适当的日期和时间表示。
  * ％I 小时（12小时制）作为十进制数[01,12]。
  * ％p 对语言环境的等同无论是上午或下午  。 
4. 建议使用第二个函数公式，可以自定义日期格式，方便使用。
---
title : python笔记49：两种方式来遍历目录
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-27 07:57:36 +0800
categories:
 -
tags:
 -
---
[[toc]]

*   小目标：遍历目录
*   主要内容：递归应用，os.walk方法；

上需求：如何在成百上千目录与文件中，找到所有的图片文件？

分析：

> 遍历制定目录下的子目录与文件；
> 
> 根据文件名后缀判断是否是图片(png, jpg);
> 
> 如何区分目录与文件？如何查找子目录；

上才艺：准备一个目录，里面放一些子目录与图片文件，然后开造。

os.walk方法：

```
#top为指定路径  
#topdown默认自上而下  
os.walk(top, topdown=True, onerror=None, followlinks=False)
```

返回迭代器，迭代器内容：根目录，子目录，文件组元组;

上操作：

```
fpath = 'E:\imgs'  
items = os.walk(fpath)  
item = next(items)  
print(item)
```

结果：

```
('E:\\imgs', ['2020_05', '2020_06', '2020_07', '2020_08'], ['readme.txt'])
```

分析：

> 第一个元素：根目录，E:\\imgs；
> 
> 第二个元素：E:\\imgs下的所有子目录，类型为列表；
> 
> 第三个元素：E:\\imgs所有文件，类型为列表

查找图片功能实现：

> 遍历目录；
> 
> 通过文件后缀(.png/.png)判断文件是否为图片，
> 
> 将文件的完成路径保存到列表中；

代码实现：

```py
import os  
fpath = 'E:\imgs'  
#遍历目录  
items = os.walk(fpath)  
imglist = []  
#遍历items，获取主目录，子目录，文件列表  
for mdir, subdir, files in items:  
    #遍历文件列表  
    for fname in files:  
        #判断是否为指定格式图片  
        if fname.endswith('.png') or fname.endswith('.jpg'):  
            #图片完整路径拼接  
            imgpath = os.path.join(mdir, fname)  
            #添加到imglist  
            imglist.append(imgpath)  
#遍历imglist  
for img in imglist:  
    print(img)
```

结果：

```
E:\imgs\2020_05\level1.png  
E:\imgs\2020_05\level2.png  
...  
E:\imgs\2020_08\5c4bda15af2de.jpg
```

主要知识点：

> 掌握os.walk方法；
> 
> 文件判断与路径拼接；
> 
> 字符串处理；

基本思路：

> 遍历当前目录，获取子目录与文件；
> 
> 判断文件或者目录；
> 
> 若是文件，通过判断是否是图片，并添加到列表中；
> 
> 若是目录，重复1~3操作；

代码实现：

```py
def scandir(topdir, listf):  
    #获取当前目录内容  
    flist = os.listdir(topdir)  
    #遍历列表  
    for fname in flist:  
        #路径拼接  
        path = os.path.join(topdir, fname)  
        if os.path.isfile(path):  
            #文件处理  
            if path.endswith('.png') or path.endswith('.jpg'):  
                listf.append(path)  
        elif os.path.isdir(path):  
            #目录处理  
            scandir(path, listf)

fpath = 'E:\imgs'             
flist = []  
scandir(fpath, flist)  
for f in flist:  
    print(f)


```

结果：

```
E:\imgs\2020_05\level1.png  
E:\imgs\2020_05\level2.png  
...  
E:\imgs\2020_08\5c4bda15af2de.jpg  

```
---
title : Python同步遍历多个列表
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-22 11:15:13 +0800
categories:
 -
tags:
 -
---
[[toc]]
Python的for循环十分灵活，使用for循环我们可以很轻松地遍历一个列表，例如：

```python
a_list = ['z', 'c', 1, 5, 'm']for each in a_list:    print(each)
```

运行结果：

![](https://img-blog.csdn.net/20180815120757516?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0dzZHhpYW9oZWk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

但是，有时遍历一个列表并不能满足我们的需求，在一些特殊的场合，我们可能会需要遍历两个甚至多个列表，例如，有两个列表，第一个列表存放的是人物的姓名，第二个列表存放的是人物的年纪，他们之间的关系是对应的，这时候该怎么办呢？

## ①使用zip()函数 （推荐）

```python
name_list = ['张三', '李四', '王五']age_list = [54, 18, 34]for name, age in zip(name_list, age_list):    print(name, ':', age)
```

运行结果：

![](https://img-blog.csdn.net/20180815121519980?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0dzZHhpYW9oZWk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

下面了解一下**zip()函数**：

```python
name_list = ['张三', '李四', '王五']age_list = [54, 18, 34]print(zip(name_list, age_list))print(type(zip(name_list, age_list)))print(*zip(name_list, age_list))print(list(zip(name_list, age_list)))print(dict(zip(name_list, age_list)))
```

运行结果：

![](https://img-blog.csdn.net/2018081512230859?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0dzZHhpYW9oZWk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

可以看出，直接输出zip(list1, list2)返回的是一个zip对象, 在前面加上\*， 它输出了三个元组， 正是两个列表中的三个数据一一对应的结果，我们可以将此对象直接转化成列表，甚至字典！

当然，使用zip()来遍历三个及以上的列表也是可行的：

```python
list1 = [1, 2, 3, 4, 5]list2 = ['a', 'b', 'c', 'd', 'f']list3 = ['A', 'B', 'C', 'D', 'F'] for number, lowercase, capital in zip(list1, list2, list3):    print(number, lowercase, capital)
```

运行结果:

![](https://img-blog.csdn.net/20180815122938358?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0dzZHhpYW9oZWk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

## ②利用下标

既然列表的内容是一一对应的，我们可以自己设置好一个下标，同样使用一个for循环也可以遍历。

```python
list1 = [1, 2, 3, 4, 5]list2 = ['a', 'b', 'c', 'd', 'f'] n = 0for each in list1:    print(each, list2[n])    n += 1
```

运行结果：

![](https://img-blog.csdn.net/20180815123326251?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0dzZHhpYW9oZWk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

同样也得到了我们想要的效果~
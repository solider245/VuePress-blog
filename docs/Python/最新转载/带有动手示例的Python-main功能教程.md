---
title : 带有动手示例的Python-main功能教程
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-09 03:28:41 +0800
categories:
 -
tags:
 -
---
[[toc]]

**Python主要功能的完整概述和示例：**

[](https://www.softwaretestinghelp.com/python/python-file-reading-writing/)在我们的 [**免费Python教程**](https://www.softwaretestinghelp.com/python/) 系列的上一教程中详细解释了 [**Python文件处理**](https://www.softwaretestinghelp.com/python/python-file-reading-writing/) 。

本教程将通过动手示例向您介绍Python的主要功能。

**Python的主要功能是什么？**

*Python中有一个特殊功能，可以帮助我们在运行时或程序执行时通过操作系统来自动调用功能，这就是我们所说的主要功能。*

*尽管在Python中不是强制使用此函数，但是使用此函数也是一种好习惯，因为它可以改善代码的逻辑结构。*

[![Python主要功能教程](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/Python-main-function.png)

![Python main function tutorial](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/Python-main-function.png)

](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/Python-main-function.png)

让我们更详细地查看所有内容。

您将学到的内容：\[ [显示](#) \]

*   [什么是功能？](#What_is_a_Function)
*   [Python主要功能](#Python_Main_Function)
*   [导入Python Main函数](#Importing_Python_Main_function)
*   [结论](#Conclusion)
*   [推荐读物](#Recommended_Reading)

### 什么是功能？

函数是用于执行某些操作的代码块，也称为可重用代码。 功能提供更高的模块化和代码可重用性。

**主要功能是什么？**

如果您观察或曾经使用过C，C ++，C＃，Java等其他编程语言，那么所有这些编程语言都需要main函数来执行该程序，而没有它，我们将无法执行程序。

但这在python语言中不是强制性或必要的，我们可以在使用或不使用main函数的情况下执行python程序。

### Python主要功能

由于Python是一种解释型语言，因此它遵循自顶向下的方法。 仅仅因为python被解释，所以程序没有静态入口，并且源代码是按顺序执行的，除非您手动调用它，否则它不会调用任何方法。

在任何编程语言中，最重要的因素是“模块”。 该模块是一个程序，可以包含在其中或导入到其他程序中，以便将来可以重用而无需再次编写相同的模块。

但是，Python中有一个特殊的功能，可以帮助我们在运行时或执行程序时通过操作系统来自动调用这些功能，这就是我们所说的主要功能。

尽管在Python中不是强制使用此函数，但是使用此函数也是一种好习惯，因为它可以改善代码的逻辑结构。

**让我们看一个没有主要功能的例子。**

**范例1：
**

```py
print(“Good Morning”)

def main():
          print(“Hello Python”)

print(“Good Evening”)

```
**输出：**

早安
晚上好

如果我们观察上面的程序，它只打印了“ Good Morning”和“ Good Evening”，而没有打印“ Hello Python”一词，这是因为我们没有手动调用它，或者我们没有使用python的main在这里起作用。

[![main_function_example_1](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/main_function_example_1.png)

![main_function_example_1](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/main_function_example_1.png)



**输出：**

[![main_function_example_1_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/main_function_example_1_output.png)

![main_function_example_1_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/main_function_example_1_output.png)



**现在，让我们看一下带有\_\_name\_\_ ==“ \_\_main\_\_”函数调用的程序。**

**范例2：**

print(“Good Morning”)

def main():
          print(“Hello Python”)

print(“Good Evening”)

if \_\_name\_\_ == “\_\_main\_\_”:
         main()

**输出：**

早安，
晚上
好，Python

[![main_function_example_2](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/main_function_example_2.png)

![main_function_example_2](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/main_function_example_2.png)



**输出：**

[![main_function_example_2_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/main_function_example_2_output.png)

![main_function_example_2_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/main_function_example_2_output.png)



如果您观察上述程序，可能会遇到一个问题–为什么打印Hello Python？ 那是因为我们在代码的末尾调用了main函数，因此它首先打印了“ Good Morning”，然后打印了“ Good Evening”，最后打印了“ Hello Python”。

**如果您遵循以下程序，您将获得更加清晰的画面。**

**范例3：**

print(“Good Morning”)

def main():
           print(“Hello Python”)

if \_\_name\_\_ == “\_\_main\_\_”:
            main()

print(“Good Evening”)

**输出：**

早上
好，Python
晚上好

[![main_function_example_3](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/main_function_example_3.png)

![main_function_example_3](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/main_function_example_3.png)



**输出：**

[![main_function_example_3_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/main_function_example_3_output.png)

![main_function_example_3_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/main_function_example_3_output.png)



**\_\_name\_\_ ==“ \_\_main\_\_”怎么办？**

如前所述，Python是一种解释型编程语言，解释器在程序执行后立即开始执行代码。

在这段时间内，解释器设置了很多隐式变量，其中一个是\_\_name\_\_，而\_\_main\_\_是设置为该变量的值。 记住，我们必须为python main函数定义一个函数，并通过使用if \_\_name\_\_ ==“ \_\_main\_\_”来执行该函数。

当解释器读取\_\_name\_\_ ==“ \_\_main\_\_”的行时，它将遇到if语句，好像是一个条件语句，并检查条件是否隐式变量\_\_name\_\_等于值\_\_main\_\_。

如果考虑使用任何其他编程语言（例如C，C ++，Java等），我们必须将main函数编写为main函数，因为它是一个通用标准。 但是Python非常灵活，它允许为main函数保留任何名称，但是，将名称保留为main（）函数是一种很好的做法。

让我们看一个例子！

**例：**

print(“Apple”)

def my\_main():
            print(“Mango”)

if \_\_name\_\_ == “\_\_main\_\_”:
         my\_main()

print(“Orange”)

**输出：**

苹果
芒果
橙

[![my_main_function_example](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/my_main_function_example.png)

![my_main_function_example](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/my_main_function_example.png)



**输出：**

[![my_main_function_example_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/my_main_function_example_output.png)

![my_main_function_example_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/my_main_function_example_output.png)



上面的程序按预期执行，但是将my\_main（）函数用作main（）函数是一种好习惯，这样将很容易理解。

**注意：** 如果在程序中包含\_\_name\_\_ ==“ \_\_main\_\_”时包含此语句，它将告诉解释器应始终仅将其作为独立程序执行，并且如果将该程序作为模块导入，则无法执行。

**例：**

**＃文件main\_function.py的名称**

print(“Good Morning”)
print(“Value of implicit variable \_\_name\_\_ is: ”, \_\_name\_\_)

def main():
           print(“Hello Python”)

print(“Good Evening”)

if \_\_name\_\_ == “\_\_main\_\_”:
          main()

**输出：**

早上好
，隐式变量\_\_name\_\_的值为：\_\_main\_\_
晚上
好，Python 好

[![importing_main_function_example_test_file](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/importing_main_function_example_test_file.png)

![importing_main_function_example_test_file](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/importing_main_function_example_test_file.png)



**输出：**

[![importing_main_function_example_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/importing_main_function_example_output.png)

![importing_main_function_example_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/importing_main_function_example_output.png)



### 导入Python Main函数

**从另一个程序调用一个函数**

在开始将主要功能作为模块导入之前，让我们首先了解如何将一个程序内部的功能使用到另一个程序中。

**范例1：**

**＃将文件命名为test.py**

def my\_fun(a, b):
            c = a+b
            print(“Sum of a and b is: ”, c)

**＃将文件命名为test1.py**

import test
test.my\_fun(2, 3)
print(“Done”)

**运行文件test1.py**

**输出：**

a和b的总和是：5
完成

[![call_function_from_another_program_example_1_test](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/calling_function_from_another_program_example_1_test.png)

![calling_function_from_another_program_example_1_test](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/calling_function_from_another_program_example_1_test.png)



[![call_function_from_another_program_example_1_test1](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/calling_function_from_another_program_example_1_test1.png)

![calling_function_from_another_program_example_1_test1](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/calling_function_from_another_program_example_1_test1.png)

](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/calling_function_from_another_program_example_1_test1.png)

**输出：**

[![call_function_from_another_program_example_1_test1_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/calling_function_from_another_program_example_1_test1_output.png)

![calling_function_from_another_program_example_1_test1_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/calling_function_from_another_program_example_1_test1_output.png)

](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/calling_function_from_another_program_example_1_test1_output.png)

我们还可以将一个程序中存在的主要功能作为模块导入到另一个程序中。

如果您在上面的代码中观察到，它将\_\_name\_\_的值打印为“ \_\_main\_\_”，但是如果我们从另一个程序导入模块，则不会是\_\_main\_\_。 让我们在下面的程序中看到它。

**范例2：**

**＃文件python\_module.py的名称**

import test
print(“Hello World”)

**输出：**

早上好
，隐式变量\_\_name\_\_的值是：test
晚上
好，Hello World

[![importing_main_function_example_test_file](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/importing_main_function_example_test_file-1.png)

![importing_main_function_example_test_file](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/importing_main_function_example_test_file-1.png)

](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/importing_main_function_example_test_file-1.png)

[![importing_main_function_example_test1_file](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/importing_main_function_example_test1_file.png)

![importing_main_function_example_test1_file](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/importing_main_function_example_test1_file.png)

](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/importing_main_function_example_test1_file.png)

**输出：**

[![importing_main_function_example_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/importing_main_function_example_output-1.png)

![importing_main_function_example_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/importing_main_function_example_output-1.png)

](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/importing_main_function_example_output-1.png)

如果我们观察上述程序的输出，则前3行来自测试模块。 如果您注意到，它没有执行test.py的主要方法，因为\_\_name\_\_的值不同。

**让我们创建2个python文件，即test1.py和test2.py**

**＃我将文件命名为test1.py**

def my\_fun():
           print(“Apple”)
print(“I am in test1 file”)
if \_\_name\_\_ == “\_\_main\_\_”:
          print(“test1.py will run as standalone”)
else:
          print(“test1.py will run only when imported”)

**＃我将文件命名为test2.py**

import test1
print(“I am in test2 file”)
test1.my\_fun()
if \_\_name\_\_ == “\_\_main\_\_”:
              print(“test2.py will run as standalone”)
else:
              print(“test2.py will run only when imported”)

**输出：**

#now运行test1.py
我在test1文件中，
test1.py将作为独立运行

#now运行test2.py
我在test1文件中
test1.py仅在导入
时 运行 我在test2文件中
Apple
test2.py将作为独立运行

[![Practical_example_test_file](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/practical_example_test_file.png)

![practical_example_test_file](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/practical_example_test_file.png)



[![Practical_example_test1_file](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/practical_example_test1_file.png)

![practical_example_test1_file](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/practical_example_test1_file.png)

**输出：**

[![Practical_example_test_file_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/practical_example_test_file_output.png)

![practical_example_test_file_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/practical_example_test_file_output.png)



[![Practical_example_test1_file_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/practical_example_test1_file_output.png)

![practical_example_test1_file_output](https://cdn.softwaretestinghelp.com/wp-content/qa/uploads/2019/01/practical_example_test1_file_output.png)



### 结论

希望本教程向您简要介绍了Python的主要功能。

main函数在诸如C，Java等程序中是强制性的，但是python不必使用main函数，但是使用它是一个好习惯。

如果您的程序具有if \_\_name\_\_ ==“ \_\_main\_\_”语句，则该程序将作为独立程序执行。

***查看我们即将推出的教程，以了解更多有关最常见的Python面试问题的信息！！
***

**[](https://www.softwaretestinghelp.com/python/python-file-reading-writing/)上一页[教程](https://www.softwaretestinghelp.com/python/python-file-reading-writing/) | [NEXT教程](https://www.softwaretestinghelp.com/python/python-interview-questions/)**

### 推荐读物

*   [带有示例的Python DateTime教程](https://www.softwaretestinghelp.com/python/python-datetime/)

*   [初学者Python教程（动手免费的Python培训）](https://www.softwaretestinghelp.com/python/)

*   [初学者的深入Eclipse教程](https://www.softwaretestinghelp.com/eclipse/)

*   [带有动手示例的Python Tuple教程](https://www.softwaretestinghelp.com/python/python-tuple/)

*   [Python字符串函数](https://www.softwaretestinghelp.com/python/python-string-functions/)

*   [Python函数](https://www.softwaretestinghelp.com/python/python-functions/)

*   [Python字符串拆分教程](https://www.softwaretestinghelp.com/python/python-string-split/)

*   [Python变量](https://www.softwaretestinghelp.com/python/python-variables/)
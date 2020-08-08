---
title : 在Python中main函数是怎么来的
description : 很好的解答了main函数，if name = main之间的区别，以及讲清楚了两者是如何来的，可以学习
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-09 03:16:08 +0800
categories:
 -
tags:
 - python
---
[[toc]]


[![](https://img.realpython.net/ea57fbacafb72406e9c9909517fb1c79)](https://srv.realpython.net/click/4625663842/?c=46248962562&p=58946116052&r=98712)

立即观看 本教程有一个由Real Python团队创建的相关视频课程。 与书面教程一起观看，以加深您的理解： [**在Python中定义主要功能**](https://realpython.com/courses/python-main-function/)

许多编程语言都有一个特殊功能，当操作系统开始运行程序时，该功能会自动执行。 通常会调用此函数， `main()` 并且必须根据语言标准具有特定的返回类型和参数。 另一方面，Python解释器从文件顶部开始执行脚本，并且Python没有自动执行的特定功能。

但是，为执行程序定义一个起点对于理解程序的工作原理很有用。 Python程序员提出了几种约定来定义此起点。

**到本文结尾，您将了解：**

*   什么是特殊 `__name__` 变量以及Python如何定义它
*   为什么要 `main()` 在Python中使用
*   `main()` 在Python中 定义有哪些约定
*   将哪种代码放入您的最佳实践是什么 `main()`

**免费下载：** [从Python技巧中获取示例章节：这本书](https://realpython.com/bonus/python-tricks-sample-pdf/) 通过简单的示例向您展示了Python的最佳实践，您可以立即应用这些示例编写更漂亮的+ Pythonic代码。



## 基本的Python main（）

在某些Python脚本中，您可能会看到一个函数定义和一个条件语句，如下例所示：

```py
def main():
    print("Hello World!")

if __name__ == "__main__":
    main()

```
在此代码中，有一个称为的函数 `main()` ， 该函数 `Hello World!` 在Python解释器执行 该短语 时将 其打印 出来。 还有一条条件（或 `if` ）语句，用于检查的值 `__name__` 并将其与字符串进行比较 `"__main__"` 。 当该 `if` 语句求值时 `True` ，将执行Python解释器 `main()` 。 您可以 [在Python](https://realpython.com/python-conditional-statements/) 中的 [条件语句中](https://realpython.com/python-conditional-statements/) 了解有关条件语句的更多信息 。

这种代码模式在要 **作为脚本执行** 并 **导入到另一个模块的** Python文件中非常常见 。 为了帮助理解该代码的执行方式，您首先应该了解Python解释器 `__name__` 如何根据代码的执行方式进行设置。

## Python中的执行模式

您可以通过两种主要方式来指示Python解释器执行或使用代码：

1.  您可以 使用命令行将 Python文件作为 **脚本** 执行。
2.  您可以 **将** 代码从一个Python文件导入另一个文件或交互式解释器。

您可以在 [如何运行Python脚本中](https://realpython.com/run-python-scripts/) 阅读有关这些方法的更多信息 。 无论使用哪种方式运行代码，Python都会定义一个特殊的变量 `__name__` ，该 变量 包含一个字符串，其值取决于代码的使用方式。

我们将使用此示例文件（另存为 `execution_methods.py` ）来探索代码的行为如何根据上下文而变化：

```py
print("This is my file to test Python's execution methods.")
print("The variable __name__ tells me which context this file is running in.")
print("The value of __name__ is:", repr(__name__))

```
在此文件中， [`print()`](https://realpython.com/python-print/) 定义了 三个调用 。 前两个打印一些介绍性短语。 第三个 `print()` 将首先打印该短语 `The value of __name__ is` ，然后将 `__name__` 使用Python的内置命令 打印 变量 的表示形式 `repr()` 。

在Python中， `repr()` 显示对象的可打印表示形式。 这个例子 `repr()` 用来强调的值 `__name__` 是一个字符串。 您可以 `repr()` 在 [Python文档中](https://docs.python.org/3/library/functions.html#repr) 了解更多信息 。

您会看到 本文中使用的 **文件file** ， **module** 和 **script** 。 实际上，它们之间没有太大区别。 但是，在含义上有一些细微的差异，这些差异强调了一段代码的目的：

1.  **文件：** 通常，Python文件是包含代码的任何文件。 大多数Python文件都有扩展名 `.py` 。

2.  **脚本：** Python脚本是您打算从命令行执行以完成任务的文件。

3.  **模块：** Python模块是您要从另一个模块或脚本或交互式解释器中导入的文件。 您可以在 [Python文档中](https://docs.python.org/3/tutorial/modules.html) 阅读有关模块的更多信息 。

在 [如何运行Python脚本中](https://realpython.com/run-python-scripts/) 也讨论了这种区别 。

### 从命令行执行

在这种方法中，您想从命令行执行Python脚本。

执行脚本时，将无法交互式定义Python解释器正在执行的代码。 对于本文而言，如何从命令行执行Python的细节并不重要，但是您可以展开以下框以了解有关Windows，Linux和macOS上命令行之间差异的更多信息。

命令行环境显示隐藏

告诉计算机从命令行执行代码的方式因操作系统而异。

在Linux和macOS上，命令行通常类似于以下示例：

`eleanor@realpython:~/Documents$`

美元符号（ `$` ） 之前的部分 可能看起来有所不同，具体取决于您的用户名和计算机名称。 您键入的命令将在后面 `$` 。 在Linux或macOS上，Python 3可执行文件的名称为 `python3` ，因此您应在 `python3 script_name.py` 后面 键入来运行Python脚本 `$` 。

在Windows上，命令提示符通常类似于以下示例：

`C:\Users\Eleanor\Documents>`

>The part before the `>` may look different, depending on your username. The commands that you type will go after the `>`. On Windows, the name of the Python 3 executable is typically `python`, so you should run Python scripts by typing `python script_name.py` after the `>`.

>Regardless of your operating system, the output from the Python scripts that you use in this article will be the same, so only the Linux and macOS style of input is shown in this article, and the input line will start at the `$`.

现在，您应该 `execution_methods.py` 从命令行 执行 脚本，如下所示：

```shell
$ python3 execution_methods.py
This is my file to test Python's execution methods.
The variable __name__ tells me which context this file is running in.
The value of __name__ is: '__main__'

```
在此示例中，您可以看到 `__name__` 具有值 `'__main__'` ，其中的引号（ `'` ）告诉您该值具有字符串类型。

请记住，在Python中，用单引号（ `'` ）和双引号（ `"` ） 定义的字符串之间没有区别 。 您可以阅读有关 [在Python的基本数据类型中](https://realpython.com/python-data-types/#strings) 定义字符串的更多信息 。

如果您 在脚本中 包含 [shebang行](https://en.wikipedia.org/wiki/Shebang_(Unix)) 并直接执行（ `./execution_methods.py` ），或者 `%run` 在IPython或Jupyter Notebook中 使用 魔术， 您将找到相同的输出 。

通过将 `-m` 参数 添加 到命令中， 您还可能会看到从包内执行的Python脚本 。 在大多数情况下，您会在使用时看到此建议 `pip` ： `python3 -m pip install package_name` 。

添加 `-m` 参数将在程序 `__main__.py` 包模块中 运行代码 。 您可以 `__main__.py` 在 [如何将开源Python软件包发布到PyPI中](https://realpython.com/pypi-publish-python-package/#different-ways-of-calling-a-package) 找到有关 文件的 更多信息 。

在这三种情况下， `__name__` 其值均相同：string `'__main__'` 。

**技术细节：** Python文档专门定义了何时 `__name__` 将具有以下值 `'__main__'` ：

> 从标准输入，脚本或交互式提示中读取时， 模块的 `__name__` 设置等于 `'__main__'` 。 （ [来源](https://docs.python.org/3/library/__main__.html) ）

`__name__` 存储在模块的全局命名空间与一起 `__doc__` ， `__package__` 和其他属性。 您可以在 [Python数据模型文档中](https://docs.python.org/3/reference/datamodel.html) ，特别是对于模块和包，在 [Python导入文档中](https://docs.python.org/3/reference/import.html#import-related-module-attributes) 阅读有关这些属性的更多信息 。

[Remove ads](https://realpython.com/account/join/)

### 导入模块或交互式解释器

现在，让我们看一下Python解释器执行代码的第二种方式：导入。 在开发模块或脚本时，您很可能希望利用别人已经构建的模块，您可以使用 `import` 关键字来完成。

在导入过程中，Python执行在指定模块中定义的语句（但仅在 您 *首次* 导入模块时执行）。 为了演示导入 `execution_methods.py` 文件 的结果，请 启动交互式Python解释器，然后导入 `execution_methods.py` 文件：

\>>>

```
>>> import execution_methods
This is my file to test Python's execution methods.
The variable __name__ tells me which context this file is running in.
The value of __name__ is: 'execution_methods'

```
在此代码输出中，您可以看到Python解释器执行了对的三个调用 [`print()`](https://realpython.com/courses/python-print/) 。 输出的前两行与在命令行上作为脚本执行文件时完全相同，因为前两行中没有变量。 但是，第三者的输出有所不同 `print()` 。

当Python解释器导入代码时，的值将 `__name__` 设置为与要导入的模块的名称相同。 您可以在上面的第三行输出中看到这一点。 `__name__` 的值为 `'execution_methods'` ，这是 `.py` Python要从中导入文件 的名称 。

请注意，如果 `import` 再次使用该模块而不退出Python，将不会有输出。

**注意：** 有关如何在Python中进行导入的更多信息，请查看 [Python导入：高级技术和技巧](https://realpython.com/python-import/) 以及 [Python中的绝对导入和相对导入](https://realpython.com/absolute-vs-relative-python-imports/) 。

## Python主要功能的最佳做法

现在您可以看到Python处理不同执行模式的方式有所不同，这对您了解一些最佳实践很有用。 只要您想编写可以作为脚本运行 *并* 导入到另一个模块或交互式会话中的 代码，这些方法都将适用 。

您将学习四种最佳实践，以确保您的代码可以达到双重目的：

1.  将大多数代码放入函数或类中。
2.  使用 `__name__` 你的控制代码的执行。
3.  创建一个名为的函数， `main()` 以包含要运行的代码。
4.  从中调用其他函数 `main()` 。

### 将大多数代码放入函数或类中

请记住，Python解释器在导入模块时会执行模块中的所有代码。 有时，您编写的代码将具有您希望用户控制的副作用，例如：

*   运行需要很长时间的计算
*   写入磁盘上的文件
*   打印会干扰用户终端的信息

在这些情况下，您希望用户控制触发此代码的执行，而不是让Python解释器在导入模块时执行该代码。

因此，最佳实践是将 **大多数代码包含在一个函数或一个类中** 。 这是因为当Python解释器遇到 `def` or `class` 关键字时，它仅存储这些定义供以后使用，并且直到您告知时才真正执行它们。

将下面的代码保存到一个文件中， `best_practices.py` 以演示这个想法：

```py
 from time import sleep

 print("This is my file to demonstrate best practices.")

 def process_data(data):
    print("Beginning data processing...")
    modified_data = data + " that has been modified"
    sleep(3)
    print("Data processing finished.")
     return modified_data

```
在此代码中，您首先 `sleep()` 要从 [`time`module](https://realpython.com/python-time-module/) 导入 。

`sleep()` 您将解释器暂停多少秒作为您提供的参数，并将生成一个函数，此示例将花费很长时间运行该函数。 接下来，您使用 `print()` 打印描述此代码用途的句子。

然后，定义一个函数 `process_data()` ， 该函数 执行五项操作：

1.  打印一些输出以告知用户数​​据处理正在开始
2.  修改输入数据
3.  使用暂停执行三秒钟 `sleep()`
4.  打印一些输出以告知用户处理已完成
5.  返回修改后的数据

**在命令行上执行最佳实践文件**

现在，当您在命令行中以脚本形式执行此文件时会发生什么？

Python解释器将执行 函数定义之外 的 `from time import sleep` 和 `print()` 行，然后将创建名为的函数的定义 `process_data()` 。 然后，该脚本将不做任何进一步操作而退出，因为该脚本没有任何执行的代码 `process_data()` 。

下面的代码块显示了将该文件作为脚本运行的结果：

`$ python3 best_practices.py
This is my file to demonstrate best practices.`

我们在这里看到的输出是first的结果 `print()` 。 请注意，从导入 `time` 和定义 `process_data()` 不会产生任何输出。 具体来说， 不会打印 `print()` 定义中 的调用输出 `process_data()` ！

**在另一个模块或交互式解释器中导入最佳实践文件**

在交互式会话（或其他模块）中导入该文件时，Python解释器将执行与将文件作为脚本执行时完全相同的步骤。

Python解释器导入文件后，您就可以使用在导入模块中定义的任何变量，类或函数。 为了演示这一点，我们将使用交互式Python解释器。 启动交互式解释器，然后键入 `import best_practices` ：

\>>>

`>>> import best_practices
This is my file to demonstrate best practices.`

导入 `best_practices.py` 文件 的唯一输出 是来自 `print()` outside定义 的第一个 调用 `process_data()` 。 从导入 `time` 和定义都 `process_data()` 不会产生任何输出，就像从命令行执行代码时一样。

[Remove ads](https://realpython.com/account/join/)

### 使用 `if __name__ == "__main__"` 来控制你的代码的执行

如果要 `process_data()` 从命令行运行脚本而不是Python解释器导入文件时执行该怎么办？

您可以 **使用`if __name__ == "__main__"`惯用语来确定执行上下文，** 并 `process_data()` 仅在 `__name__` 等于 时 有条件地运行 `"__main__"` 。 将以下代码添加到 `best_practices.py` 文件 底部 ：

```py
if __name__ == "__main__":
    data = "My data read from the Web"
    print(data)
    modified_data = process_data(data)
    print(modified_data)

```
在此代码中，您添加了一个条件语句，用于检查的值 `__name__` 。 此条件的计算结果为 `True` when `__name__` 等于字符串 `"__main__"` 。 请记住，特殊值 `"__main__"` 的 `__name__` 变量意味着Python解释器执行你的脚本，而不是将其导入。

在条件块内，添加了四行代码（第12、13、14和15行）：

*   **第12和13行：** 您正在创建一个变量 `data` ， 该变量 存储从Web获取的数据并进行打印。
*   **第14行：** 您正在处理数据。
*   **第15行：** 您正在打印修改后的数据。

现在，从命令行运行 `best_practices.py` 脚本以查看输出将如何更改：

`$ python3 best_practices.py
This is my file to demonstrate best practices.
My data read from the Web
Beginning data processing...
Data processing finished.
My data read from the Web that has been modified`

首先，输出显示 `print()` 之外 的 调用 结果 `process_data()` 。

之后，将 `data` 打印 的值 。 发生这种情况是因为， 当Python解释器将文件作为脚本执行时 ，变量 `__name__` 具有值 `"__main__"` ，因此条件语句的值为 `True` 。

接下来，您的脚本调用 `process_data()` 并传入 `data` 以进行修改。 当 `process_data()` 执行时，它打印一些状态消息的输出。 最后， `modified_data` 打印 的值 。

现在，您应该检查 `best_practices.py` 从交互式解释器（或另一个模块） 导入 文件 时会发生什么 。 下面的示例演示了这种情况：

\>>>

`>>> import best_practices
This is my file to demonstrate best practices.`

请注意，您将获得与将条件语句添加到文件末尾相同的行为！ 这是因为 `__name__` 变量具有值 `"best_practices"` ，所以Python不会执行该块内的代码，包括 `process_data()` ，因为条件语句的值为 `False` 。

### 创建一个名为main（）的函数以包含要运行的代码

现在，您可以编写Python代码，该代码可以作为脚本从命令行运行，并且可以导入而不会产生不必要的副作用。 接下来，您将学习如何编写代码，以使其他Python程序员更容易理解您的意思。

许多语言（例如C，C ++，Java和其他几种语言）定义了一种特殊功能， `main()` 操作系统执行编译后的程序时 必须 自动调用 该特殊功能 。 此功能通常称为 **入口点，** 因为它是执行程序进入程序的位置。

相反，Python没有用作脚本入口点的特殊功能。 实际上，您可以在Python脚本中为入口点函数指定任意名称！

尽管Python并未为命名函数赋予任何意义 `main()` ，但最佳实践是 无论如何 都要 **为入口点函数命名`main()`** 。 这样，任何其他读取脚本的程序员都立即知道此功能是完成脚本主要任务的代码的起点。

另外， `main()` 应包含Python解释程序执行文件时要运行的任何代码。 这比直接将代码放入条件块更好，因为用户 `main()` 在导入模块时 可以重用 。

更改 `best_practices.py` 文件，使其看起来像下面的代码：

```python
from time import sleep
print("This is my file to demonstrate best practices.")
def process_data(data):
   print("Beginning data processing...")
   modified_data = data + " that has been modified"
   sleep(3)
   print("Data processing finished.")
    return modified_data
def main():
    data = "My data read from the Web"
    print(data)
    modified_data = process_data(data)
    print(modified_data)
if __name__ == "__main__":
    main()

```
在此示例中，您添加了其中的定义， `main()` 其中包括先前在条件块内的代码。 然后，您更改了条件块以使其执行 `main()` 。 如果将此代码作为脚本运行或导入，则将获得与上一部分相同的输出。

[Remove ads](https://realpython.com/account/join/)

### 从main（）调用其他函数

Python中另一种常见的做法是 **有`main()`执行其他功能** ，而不是包括在任务完成代码 `main()` 。 当您可以由几个可以独立执行的较小子任务组成整体任务时，此功能特别有用。

例如，您可能具有执行以下操作的脚本：

1.  从可能是数据库，磁盘上的文件或Web API的源中读取数据文件
2.  处理数据
3.  将处理后的数据写入另一个位置

如果您以单独的功能实现这些子任务中的每一个，那么您（或另一个用户）很容易重用一些步骤，而忽略您不想要的步骤。 然后，您可以在中创建默认工作流程 `main()` ，并且可以兼得两全。

是否将这种做法应用于您的代码是您自己的判断。 将工作分为几个功能使重用更加容易，但对于其他试图解释您的代码的人来说却增加了难度，因为他们必须遵循程序流程中的几次跳转。

修改您的 `best_practices.py` 文件，使其看起来像下面的代码：

```python
from time import sleep
print("This is my file to demonstrate best practices.")
def process_data(data):
   print("Beginning data processing...")
   modified_data = data + " that has been modified"
   sleep(3)
   print("Data processing finished.")
    return modified_data
def read_data_from_web():
    print("Reading data from the Web")
    data = "Data from the web"
    return data
def write_data_to_database(data):
    print("Writing data to a database")
    print(data)
def main():
    data = read_data_from_web()
    modified_data = process_data(data)
    write_data_to_database(modified_data)
if __name__ == "__main__":
    main()

```
在此示例代码中，文件的前10行具有与以前相同的内容。 第12行的第二个函数定义创建并返回一些样本数据，第17行的第三个函数定义模拟将修改后的数据写入数据库。

在第21行， `main()` 已定义。 在此示例中，您进行了修改， `main()` 以便依次调用数据读取，数据处理和数据写入功能。

首先，从 `data` 创建 `read_data_from_web()` 。 这 `data` 被传递到 `process_data()` ，它返回 `modified_data` 。 最后， `modified_data` 传入 `write_data_to_database()` 。

脚本的最后两行的条件块检查 `__name__` 和运行 `main()` ，如果该 `if` 语句 `True` 。

现在，您可以从命令行运行整个处理管道，如下所示：

`$ python3 best_practices.py
This is my file to demonstrate best practices.
Reading data from the Web
Beginning data processing...
Data processing finished.
Writing processed data to a database
Data from the web that has been modified`

在此执行的输出，你可以看到，Python解释器执行 `main()` ，其执行 `read_data_from_web()` ， `process_data()` 和 `write_data_to_database()` 。 但是，您也可以导入 `best_practices.py` 文件并将其重新 `process_data()` 用于其他输入数据源，如下所示：

\>>>

`>>> import best_practices as bp
This is my file to demonstrate best practices.
>>> data = "Data from a file"
>>> modified_data = bp.process_data(data)
Beginning data processing...
Data processing finished.
>>> bp.write_data_to_database(modified_data)
Writing processed data to a database
Data from a file that has been modified`

在此示例中，您导入 `best_practices` 并缩短了 `bp` 此代码 的名称 。

导入过程使Python解释程序执行文件中的所有代码行 `best_practices.py` ，因此输出显示了解释文件目的的行。

然后，您从文件中存储数据， `data` 而不是从Web读取数据。 然后，再利用 `process_data()` 和 `write_data_to_database()` 从 `best_practices.py` 文件。 在这种情况下，您可以利用重用代码，而不是定义中的所有逻辑 `main()` 。

### Python主要功能最佳作法摘要

`main()` 您刚刚看到了以下 关于 Python的 四个关键最佳实践 ：

1.  将需要长时间运行或对计算机有其他影响的代码放入函数或类中，以便您可以精确控制何时执行该代码。

2.  使用不同的值 `__name__` 来确定上下文并使用条件语句更改代码的行为。

3.  您应该命名入口点函数 `main()` ，以便传达该函数的意图，即使Python并没有为命名函数赋予任何特殊意义 `main()` 。

4.  如果要重用代码中的功能 `main()` ，请 在外部函数中定义逻辑， 然后在中调用这些函数 `main()` 。



## 结论

恭喜你！ 您现在知道了如何创建Python `main()` 函数。

您了解了以下内容：

*   知道 `__name__` 变量 的值 对于编写兼具可执行脚本和可导入模块双重目的的代码很重要。

*   `__name__` 取不同的值，具体取决于您执行Python文件的方式。 `__name__` 将等于：

    *   `"__main__"` 从命令行或通过 `python -m` （执行包的 `__main__.py` 文件） 执行 文件时
    *   模块的名称（如果正在导入模块）
*   当您要开发可重用的代码时，Python程序员已经开发了一套好的做法。

现在您可以开始编写一些很棒的Python `main()` 函数代码了！

## 引用文献
[在Python中定义主要功能-真正的Python](https://realpython.com/python-main-function/)
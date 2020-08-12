---
title : main函数的语法模板
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-12 23:56:33 +0800
categories:
 -
tags:
 -
---
[[toc]]


>引入新的Python语法时，通常的方法是同时提供具体示例和常规模板。 在Python语法的通用模板中，字体表示每个部分的类别：

| 字体 | 含义 | 例 |
| --- | --- | --- |
| `Typewriter font` | *逐字* 书写的文字 | `sep=''` |
| *强调* | 可以使用任意表达式的地方。 | *整数值* |
| **胆大** | 可以使用任意标识符的地方。 | **变量名** |
| 普通文字 | 在没有给出明确语法的情况下对该位置的描述 | 一个数字，0-9 |

将此印刷术与几个部分结合使用的更完整示例是对赋值语句的描述：

> **variableName** `=` *someExpression*

带有一个任意标识符，特定符号 `=` 和一个表达式。

我试图使并非逐字记录的部分描述预期的用途。

在函数语法的讨论中，我将很快使用这些约定，并将在整个教程中继续使用这些约定。

## 1.11.2。 第一功能定义 
如果您知道这是朋友埃米莉（Emily）的生日，则可以告诉与您聚会的人唱“艾米丽生日快乐”。

我们可以使Python显示歌曲。 *阅读* 并根据需要运行示例程序 `birthday1.py` ：

```py
print("Happy Birthday to you!")
print("Happy Birthday to you!")
print("Happy Birthday, dear Emily.")
print("Happy Birthday to you!")

```
您可能不会重复整首歌以让其他人知道该唱歌。 您会要求使用一个描述性的名称唱歌，例如“ Emily生日快乐”。

在Python中，我们还可以给一个类似的名称 `happyBirthdayEmily` ，并使用 *函数定义* 将该名称与整首歌曲相关联 。 我们使用Python `def` 关键字，它是 *define的* 缩写 。

*立即阅读* ：



```py
def happyBirthdayEmily(): #program does nothing as written
    print("Happy Birthday to you!")
    print("Happy Birthday to you!")
    print("Happy Birthday, dear Emily.")
    print("Happy Birthday to you!")


```
函数定义的语法有几个部分需要注意：

第1行： *标题* 包含 `def` ，函数名称，括号和最后一个冒号。 更一般的语法是

> `def` **function\_name**`():`

第2\-5行：其余的行构成函数 *主体，* 并以一致的数量缩进。 （确切的数量对于解释器并不重要，尽管2或4个空格是常见的约定。）

整个定义就是这样： *定义* 名称的含义 `happyBirthdayEmily` ，但是它还没有做其他任何事情\-例如，定义本身还不能打印任何内容。 这是我们第一个从正常顺序更改语句执行顺序的示例。

注意

由于Python首先经过这些行， 因此*不会* 执行 函数 *定义* 中 的语句 。

上面的代码在示例文件中 `birthday2.py` 。 将其加载到空闲并从那里执行。 *什么* 都不会发生。 这就像定义变量一样：Python只是记住函数定义以供将来参考。

但是，在Idle完成执行程序后，其Shell版本会记住程序中的函数定义。

在Idle *Shell* （不是编辑器）中，输入

happyBirthdayEmily

结果可能会让您感到惊讶！ 给Shell提供标识符时，它将告诉您其 *值* 。 上面没有括号，它将功能代码标识为值（并在代码的内存中提供了位置）。 现在，在Idle Shell中尝试使用 添加 了 *括号* 的名称 ：

happyBirthdayEmily()

括号告诉Python *执行* 命名的函数，而不仅仅是 *引用* 该函数。 Python返回并查找定义，然后才执行函数定义中的代码。 此操作的术语是 *函数调用* 或函数 *调用* 。

注意

在函数 *调用* 中没有 `def` ，但是函数名称后跟括号。

> *function\_name*`()`

在许多情况下，我们将在Idle中使用程序执行功能：完成程序执行后，Idle Shell仍会记住程序中定义的功能。 如果通过直接在操作系统中选择程序来运行程序，则情况并非如此。

查看示例程序 `birthday3.py` 。 看到它只是增加了两行， *没有* 缩进。 你能猜出它做什么吗？ 试试吧：


```py
'''Function definition and invocation.'''

def happyBirthdayEmily():
    print("Happy Birthday to you!")
    print("Happy Birthday to you!")
    print("Happy Birthday, dear Emily.")
    print("Happy Birthday to you!")

happyBirthdayEmily()
happyBirthdayEmily()


```

的 *执行* 顺序是从不同 *的文本* 序列：

1.  第3\-7行：Python从顶部开始，阅读并记住了定义。 定义在缩进结束处结束。 （该代码还在此处显示了空行，但这仅用于人类，以强调定义的结尾。）
2.  第9行：这在任何定义中都没有缩进，因此解释器直接执行它， `happyBirthdayEmily()` 同时记住返回的位置进行 调用 。
3.  3\-7行：第一次执行该功能的代码，打印出歌曲。
4.  第9行结束：从函数调用中返回。 继续。
5.  第10行：在记住该位置的同时再次调用该函数。
6.  第3\-7行：再次执行该功能，再次打印出歌曲。
7.  第10行结束：从函数调用返回，但是此时程序中没有其他内容，并且执行停止。

函数以几种方式改变执行顺序：通过先读取定义后不执行语句，然后在执行过程中调用函数时，跳转到函数代码，然后在函数执行结束时返回。

如果恰好也是安德烈（Andre）的生日，我们也可以定义一个函数 `happyBirthdayAndre` 。 在继续进行操作之前，请先考虑如何做。

## 1.11.3。 多功能定义 [¶](#multiple-function-definitions "此标题的永久链接")

这是示例程序 `birthday4.py` ，其中我们添加了一个函数 `happyBirthdayAndre` ，并同时调用了它们。 猜猜会发生什么，然后尝试：

```py
'''Function definitions and invocation.'''

def happyBirthdayEmily():
    print("Happy Birthday to you!")
    print("Happy Birthday to you!")
    print("Happy Birthday, dear Emily.")
    print("Happy Birthday to you!")

def happyBirthdayAndre():
    print("Happy Birthday to you!")
    print("Happy Birthday to you!")
    print("Happy Birthday, dear Andre.")
    print("Happy Birthday to you!")

happyBirthdayEmily()
happyBirthdayAndre()


```
同样，除最后两行外，所有内容均为定义。 它们是直接执行的唯一行。 对函数的调用 *恰好* 与它们的定义相同，但是这是任意的。 如果交换了最后两行，则操作顺序将改变。 交换最后两行，使它们显示如下，并查看执行程序时发生的情况：

```py
happyBirthdayAndre()
happyBirthdayEmily()

```
您编写的函数也可以调用您编写的其他函数。 将程序的主要作用放在函数中以方便参考是一个很好的约定。 该示例程序 `birthday5.py` 在最终函数内有两个生日快乐调用 `main` 。 您是否看到此版本完成与上一个版本相同的任务？ 运行。 ：

```py

'''Function definitions and invocation.'''

def happyBirthdayEmily():
    print("Happy Birthday to you!")
    print("Happy Birthday to you!")
    print("Happy Birthday, dear Emily.")
    print("Happy Birthday to you!")

def happyBirthdayAndre():
    print("Happy Birthday to you!")
    print("Happy Birthday to you!")
    print("Happy Birthday, dear Andre.")
    print("Happy Birthday to you!")

def main():
    happyBirthdayEmily()
    happyBirthdayAndre()

main()


```
如果我们希望程序在运行时自动执行任何操作，则需要在定义之外添加一行！ 最后一行是唯一直接执行的行，它调用中的代码 `main` ，后者又调用其他两个函数中的代码。

详细执行顺序：

1.  3\-17行：读取并记住定义
2.  第19行：定义之外的唯一语句直接执行。 该位置被记住 `main` 并被执行。
3.  第15行：开始 `main`
4.  第16行。执行跳转到 `happyBirthdayEmily`
5.  执行第3\-7行，并演唱Emily。
6.  返回第16行的结尾：从 `happyBirthdayEmily` 函数调用 返回
7.  第17行：现在 `happyBirthdayAndre` 被调用，因为该位置被记住。
8.  9\-13行：唱歌给安德烈
9.  返回第17行的结尾：从 `happyBirthdayAndre` 函数调用 返回 ，完成 `main`
10.  返回到线19结束：返回来自 `main` ; 在程序结束时

与以前的版本有实际的区别。 执行后，如果我们想给 *双方* 再度生日快乐 ，我们只需要在命令行管理 *程序中* 输入另一个调用 即可：

```
main()

```
作为强调缩进行的重要性的简单示例，请猜测示例文件的 `order.py` 作用，然后运行该 文件 进行检查：

```py
def f():
    print('In function f')
    print('When does this print?')
f()

```
修改文件，以使第二个打印功能 **无法使用，** 如下所示。 现在应该怎么办？ 试试吧：

```py
def f():
    print('In function f')
print('When does this print?')
f()


```
首先 *记住* 函数定义中缩进的行 ，仅在最后调用函数f时执行。 任何函数定义外的行（不缩进）均按出现顺序执行。

### 1.11.3.1。 诗功能锻炼 [¶](#poem-function-exercise "此标题的永久链接")

写一个程序， `poem.py` 中，定义一个函数，打印一个 *简短* 的诗或歌曲的诗句。 给函数起一个有意义的名字。 通过调用函数三次来使程序结束，因此诗歌或诗歌将重复三次。

## 1.11.4。 功能参数 [¶](#function-parameters "此标题的永久链接")

小时候，您可能会听到几个人唱着“生日快乐”，然后您可以和一个新的人唱歌，例如Maria，而无需一字接一地听到带有Maria名字的特殊版本。 您具有 *抽象的能力* 。 通过像Emily和Andre的版本这样的示例，您可以弄清楚进行了哪些更改，以便可以将歌曲演唱给Maria！

不幸的是，Python并不那么聪明。 它需要明确的规则。 如果您需要向 某人 *明确* 说明“生日快乐”的总体工作原理，而不仅仅是举例说明，那么您可以这样说：

首先，您必须 *提供* 一个人的名字。 然后，您在第三行末尾插入带有此人姓名的歌曲。

Python的工作原理类似，但具有自己的语法。 术语“人名”是将要使用的实际数据（“艾米丽”，“安德烈”或“玛丽亚”）的替身。 这就像在Python中与变量名的关联一样。 “人名”不是合法的Python标识符，因此我们将 `person` 以此替代 人的身份使用 。

函数定义表示 `person` 通过在定义的括号之间插入 变量名称， 可以在函数内部使用 该变量名称 。 然后，在函数定义的主体中，使用person代替任何特定人员姓名的真实数据。 阅读并运行示例程序 `birthday6.py` ：


```py
'''Function with parameter.'''

def happyBirthday(person):
    print("Happy Birthday to you!")
    print("Happy Birthday to you!")
    print("Happy Birthday, dear " + person + ".")
    print("Happy Birthday to you!")

happyBirthday('Emily')
happyBirthday('Andre')


```
在定义标题中 `happyBirthday` ， `person` 称为 *形式参数* 。 此变量名是被唱对象真实姓名的占位符。

程序的最后两行再次是定义之外的唯一一行，因此它们是直接执行的唯一一行。 现在，函数调用中的括号之间有一个实际名称。 函数调用中括号之间的值称为函数调用的 *参数* 或 *实际参数* 。 该参数提供要在函数执行中使用的实际数据。 进行调用时，Python通过将形式参数名称 `person` 与实际参数数据 相关联来实现此目的 ，如赋值语句中所示。 在第一个通话中，此实际数据为 `'Emily'` 。 我们说实际的参数值被 *传递* 给函数。 [\[1\]](#param)

更详细的执行：

1.  第3\-7行：记住定义

2.  第9行： `happyBirthday` 使用实际参数调用 `'Emily'` 。

3.  第3行： `'Emily'` 传递给函数，因此 。 `person = 'Emily'`

4.  第4\-7行：已打印歌曲， `'Emily'` 用作 `person` 第4行：打印中 的值

    Happy Birthday, dear Emily.

5.  从函数调用返回后的第9行结束

6.  第10行： `happyBirthday` 这次使用实际参数 调用 ， `'Andre'`

7.  第3行： `'Andre'` 传递给函数，因此 。 `person = 'Andre'`

8.  第4\-7行：已打印歌曲， `'Andre'` 用作 `person` 第4行：打印中 的值

    Happy Birthday, dear Andre.

9.  从函数调用返回后，第10行结束，程序结束。

注意

确保您完全理解 `birthday6.py` 执行顺序！ 它说明了许多人第一次错过的极其重要的想法！

必须了解两者之间的区别

1.  用 `def` 包含 *正式* 参数名称 的 标题*定义* 功能（第3\-7行） ，其中代码只是要记住的指令，不能立即执行。
2.  *调用* 带有 *实际* 参数值 的函数 来代替形式参数，并在 *运行* 包含该调用的指令时使 函数代码实际 运行。 还要注意，可以使用不同的表达式作为实际参数多次调用该函数（第9行和第10行）。

该系统的优点在于，相同的函数定义可用于具有不同实际参数的调用，然后产生不同的效果。 形式参数的 `person` 值用于的第三行 `happyBirthday` ，以输入给出的任何实际参数值。

注意

这就是 *抽象* 的力量 。 它是编程中最重要的原理之一。 而不是让许多单独编码的部分仅进行细微的变化，请查看在何处使用一个函数将它们组合起来是合适的，该函数的参数引用的是在不同情况下不同的部分。 然后编写代码，使其同时适合于单独的特定情况，并替换正确的参数值。

您可以返回到具有主要功能的状态，一切正常。 运行 `birthday7.py` ：

```py
'''Function with parameter called in main'''

def happyBirthday(person):
    print("Happy Birthday to you!")
    print("Happy Birthday to you!")
    print("Happy Birthday, dear " + person + ".")
    print("Happy Birthday to you!")

def main():
    happyBirthday('Emily')
    happyBirthday('Andre')

main()

```
在中 `birthday6.py` ，第9行和第10行中的函数调用在任何函数定义之外，因此实际上确实导致了该函数的立即执行。 在 `birthday7.py` 对happyBirthday的调用中，该函数位于另一个函数定义（ `main` ）内，因此，直到该函数 `main` 运行（从最后一行开始，在任何函数外部 ），它们才真正运行 。

参见 [生日功能练习](#birthdayfunctionex) 。

我们可以将功能参数与用户输入相结合，并使程序能够为任何人打印生日快乐。 查看主要方法并运行 `birthday_who.py` ：



```py
'''User input supplies function parameter'''

def happyBirthday(person):
    print("Happy Birthday to you!")
    print("Happy Birthday to you!")
    print("Happy Birthday, dear " + person + ".")
    print("Happy Birthday to you!")

def main():
    userName = input("Enter the Birthday person's name: ")
    happyBirthday(userName)

main()

```


最后一个版本说明了几个重要的想法：

1.  有多种方法可以将信息获取到函数中：
    1.  通过参数（从第10行到第3行）传递一个值。
    2.  提示用户，并从键盘获取数据（第11行）。
2.  一个好主意是 通过使用独特的功能 将数据 的 *内部* 处理 与用户 的 *外部* 输入 分开 。 用户交互在这里 `main` ，数据在中进行操作 `happyBirthday` 。
3.  在实际参数的第一个示例中，我们使用了文字值。 通常，实际参数可以是表达式。 在将表达式传递到函数调用之前对其求值。 最简单的表达式之一是普通变量名，可以通过将其替换为其关联值来对其求值。 由于仅传递实际参数的值，而不传递任何变量名，因此 在实际参数中使用的变量名 *无需* 与正式参数名匹配。 （在这里，我们的价值 `userName` 在 `main` 成为价值 `person` 的 `happyBirthday` ）。

现在我们有了嵌套的函数调用，值得进一步研究执行错误的回溯。 如果我在main中添加一行 `birthday7.py` ：

happyBirthday(2)

如示例文件所示 `birthdayBad.py` ，然后运行它，您将得到以下内容：

> 追溯（最近一次通话）：
>
> 在<module>中的文件“ /hands\-on/../examples/birthdayBad.py”第15行
>
> 主要（）
>
> 主文件第13行中的文件“ /hands\-on/../examples/birthdayBad.py”
>
> happyBirthday（2）
>
> 在happyBirthday的第6行输入“ /hands\-on/../examples/birthdayBad.py”
>
> 打印（“生日快乐，亲爱的” +人+“。”）
>
> TypeError：无法将“ int”对象隐式转换为str

您的文件夹可能与/ hands\-on / examples不同。 最后三行最重要，提供检测到错误的行号，相关行的文本以及对发现问题的描述。 通常这只是您需要查看的内容，但是此示例说明 问题 的 *起因* 可能与 *检测到* 错误的路线很远 。 再往回溯，您会发现导致出现错误的那一行的函数调用序列。 您可以在 `main` 我调用 `happyBirthday` bad参数2时 看到它 。

### 1.11.4.1。 生日功能练习 [¶](#birthday-function-exercise "此标题的永久链接")

进行进一步的更改 `birthday7.py` 并将其另存为 `birthdayMany.py` ：添加一个函数调用（而 *不是* 其他函数 *定义* ），因此除了Emily和Andre之外，Maria也学到了一段经文。 同时在经文之间打印空白行。 （您可能 *要么* 做到这一点通过增加打印线函数定义， *或* 通过向函数的所有调用之间的打印线）。

| [\[1\]](#id4) | 我已经给出了明确的术语“形式参数”和“实际参数”。 在各个地方，您可能会看到这些术语被“参数”或“参数”所代替。 在这种情况下，您必须从正在讨论的上下文中确定：定义和形式参数或函数调用以及实际参数。 |

## 1.11.5。 多功能参数 [¶](#multiple-function-parameters "此标题的永久链接")

一个函数在参数列表中可以有多个参数，并用逗号分隔。 在这里，示例程序 `addition5.py` 更改了示例程序 `addition4a.py` ，使用一个函数来轻松显示许多总和问题。 阅读并遵循代码，然后运行：

```py
'''Display any number of sum problems with a function.
Handle keyboard input separately.
'''

def sumProblem(x, y):
    sum = x + y
    sentence = 'The sum of {} and {} is {}.'.format(x, y, sum)
    print(sentence)

def main():
    sumProblem(2, 3)
    sumProblem(1234567890123, 535790269358)
    a = int(input("Enter an integer: "))
    b = int(input("Enter another integer: "))
    sumProblem(a, b)

main()

```
从左到右评估函数调用中的实际参数，然后将这些值与函数定义中的形式参数名称（从左到右）相关联。 例如，带有实际参数的函数调用， 以定义标题调用函数f： `f(actual1, actual2, actual3)`

def f(formal1, formal2, formal3):

大致就像被调用函数内部执行的第一行 `f` 是

formal1 \= actual1
formal2 \= actual2
formal3 \= actual3

函数为程序提供了极其重要的功能，允许一次定义任务并使用不同的数据重复执行。 看之间的差异是很重要 **的正式** 用于描述什么是函数定义内部完成（如在sumProblem的定义，x和y）的参数和 **实际** 哪个参数（如图2和3或1234567890123和535790269358） *替代* 为函数实际执行时的形式参数。 上面的main方法在对sumProblem的三个调用中使用了三个不同的实际参数集。

### 1.11.5.1。 商函数练习 [¶](#quotient-function-exercise "此标题的永久链接")

该示例 `addition5.py` 是对的修改 `addition4a.py` ，将算术问题放入函数中，然后使用不同的参数多次调用该函数。 同样， `quotientformat.py` 从 [商格式练习中进行](http://anh.cs.luc.edu/handsonPythonTutorial/io.html#quotientformatproblem) 修改 并将其另存为 `quotientProb.py` 。 您应该 `quotientProblem` 使用数字参数 创建一个函数 。 像所有早期版本中一样，它应打印包含输入，商和余数的完整句子。 `main` 新程序中 的 方法应该在几组文字值上测试quotientProblem函数，并使用用户的输入来测试该函数。

## 1.11.6。 返回的函数值 [¶](#returned-function-values "此标题的永久链接")

您可能在代数类中使用过数学函数：它们都具有与之关联的计算值。 例如，如果您定义

> f（x）= x 2

然后得出f（3）是3 2 ，并且f（3）+ f（4）是3 2 \+ 4 2

表达式中的函数调用在求值过程中被函数的值替换。

以下是Python中相应的定义和示例，这些示例均来自示例程序 `return1.py` 。 *读取* *并运行* ：

'''A simple function returning a value, used in an expression'''

def f(x):
    return x\*x

print(f(3))
print(f(3) + f(4))

新的Python语法是 *return语句* ，该单词 `return` 后跟一个表达式。 可以在表达式中使用返回值的函数，就像在数学类中一样。 对带有函数调用的表达式求值时，函数调用会被其返回值暂时有效地替换。 在Python函数定义中，要返回的值由 `return` 语句中 的表达式给出 。

`f` 从内部完成 函数 执行后

print(f(3))

好像该语句暂时变为

print(9)

并且在执行时类似

print(f(3) + f(4))

解释器首先对f（3）求值，并用返回的结果9代替该调用，就像该语句暂时变为

print(9 + f(4))

然后解释器计算f（4）并有效地用返回的结果替换该调用16，就好像该语句暂时变为

print(9 + 16)

最终导致25被计算和打印。

**Python** 函数可以返回任何类型的数据，而不仅仅是数字，并且在return语句之前可以执行任意数量的语句。 阅读，遵循并运行示例程序 `return2.py` ：



```py
'''A function returning a string and using a local variable'''

def lastFirst(firstName, lastName):
    separator = ', '
    result = lastName + separator + firstName
    return result

print(lastFirst('Benjamin', 'Franklin'))
print(lastFirst('Andrew', 'Harrington'))



```
上面的代码有一个新的功能，变量 `separator` 和 `result` 给出的函数中的值，但 `separator` 并 `result` 是 *不* 正规的参数之一。 分配工作如您期望的那样。 不久之后，将在 [Local Scope中](#local-scope) 对此进行更多介绍 。

执行细节：

1.  第3\-6行：记住定义
2.  第8行：调用函数，记住要返回的位置
3.  第3行：通过参数： ; `firstName = 'Benjamin'` `lastName = 'Franklin'`
4.  第4行：为变量分配 `separator` 值 `', '`
5.  第5行：分配变量 `result` 的值的 其是 ，其评估对 `lastName + separator + firstName` `'Franklin' + ', ' + 'Benjamin'` `'Franklin, Benjamin'`
6.  第6行：返回 `'Franklin, Benjamin'`
7.  第8行：使用从函数调用返回的值，使该行有效变为 ，因此进行打印。 `print('Franklin, Benjamin')`
8.  第9行：使用新的实际参数调用函数，记住要返回的位置
9.  第3行：通过参数： ; `firstName = 'Andrew'` `lastName = 'Harrington'`
10.  第4\-6行：...计算并返回 `'Harrington, Andrew'`
11.  第9行：使用函数返回的值并打印 `'Harrington, Andrew'`

比较 `return2.py` 和 `addition5.py` ，从上一节。 两者都使用功能。 两种都可以打印，但是打印的 *位置* 不同。 该函数 `sumProblem` 直接在函数内部打印，并且不显式返回任何内容。 另一方面 `lastFirst` ，不输出任何内容，但返回字符串。 调用者可以决定如何处理字符串，并在主程序上方打印该字符串。

`addition5.py` 再次 打开 ，并引入一个 *常见错误* 。 更改 `main` 插入 函数的最后一行 `print` ，因此它说

print(sumProblem(a, b))

然后尝试运行该程序。 所需的打印实际上是在函数sumProblem中完成的。 您引入了一个语句来打印 `sumProblem` *返回的内容* 。 尽管 `sumProblem` 没有 *明确* 返回任何*内容* ，但是Python确实使每个函数都返回了一些内容。 如果没有明确返回任何内容， `None` 则返回 特殊值 。 您应该在程序的Shell输出中看到它。 这是一个相当常见的错误。

警告

如果您在打印输出中看到一个“无”（None），而您不希望它出现，则可能是您打印了一个没有明确返回任何内容的函数的返回值！

通常，函数应该做一件事。 您可以轻松地组合一系列功能，并且如果每个功能仅执行一项统一的操作，则可以具有更大的灵活性。 函数sumProblem中的功能有 `addition5.py` 两件事：创建一个句子并将其打印出来。 如果仅此而已，那么如果您想对句子字符串执行其他操作，那么您将不走运。 更好的方法是拥有一个仅创建句子的函数，并将其返回以供您进一步使用。 打印是一种可能性，可通过以下方式完成 `addition6.py` ：
```py

'''Display a sum problems with a function returning a string,
not printing directly.
'''

def sumProblemString(x, y):
    sum = x + y
    return 'The sum of {} and {} is {}.'.format(x, y, sum)

def main():
    print(sumProblemString(2, 3))
    print(sumProblemString(1234567890123, 535790269358))
    a = int(input("Enter an integer: "))
    b = int(input("Enter another integer: "))
    print(sumProblemString(a, b))

main()

```
### 1.11.6.1。 商字符串返回练习 [¶](#quotient-string-return-exercise "此标题的永久链接")

`quotientReturn.py` 通过 `quotientProb.py` 在 [商函数练习中](#quotientfunctionex) 进行修改来 创建 程序，以使程序完成相同的操作，但是到处都将quotientProblem函数更改为一个 `quotientString` 仅 *返回* 字符串而不是直接打印字符串的 被调用函数 。 让 `main` 函数打印每次调用函数的结果 `quotientString` 。

## 1.11.7。 两个角色：函数的 [编写者](#two-roles-writer-and-consumer-of-functions "此标题的永久链接") 和使用者 [¶](#two-roles-writer-and-consumer-of-functions "此标题的永久链接")

本节的其余部分涵盖了有关在初读时可能会跳过的功能的详细信息。

到目前为止，我们仅做一些小例子来了解函数的基本概念。 在更大的程序中，函数可用于管理复杂性，将事物分解成逻辑相关的适度大小的片段。 程序员既是函数的编写者，也是函数内部调用的其他函数的使用者。 将这两个角色分开是很有用的：

已经编写函数的用户需要知道：

1.  函数名称
2.  参数的顺序和含义
3.  函数返回或产生的结果

*如何* 完成这一步是不是在这一点有关。 例如，您使用Python开发团队的工作，调用该语言内置的函数。 您需要了解有关调用函数的三个事实。 您无需确切 *知道* 该功能*如何* 实现其目的。

另一方面，在 *编写* 函数时，您需要准确地弄清楚如何实现目标，命名相关变量并编写代码，这将使我们进入下一部分。

## 1.11.8。 本地范围 [¶](#local-scope "此标题的永久链接")

对于编写函数的逻辑，重要的是，函数的作者必须知道函数内部变量的名称。 另一方面，如果您仅使用一个函数（可能是由您不认识的人编写的），则无需关心在调用的函数的实现中内部使用的值被赋予了什么名称。 Python通过 *局部作用域* 规则来 实施该想法 ：在一个函数内部初始化和使用的变量名 对其他函数 *不可见* 。 这样的变量称为 *局部* 变量。 例如，对早期程序的详细说明 `return2.py` 可能具有其 `lastFirst` 带有局部变量的函数 `separator` ，但它可能还具有定义一个 `separator` 变量，可能具有不同的值，例如 `'\n'` 。 他们不会冲突。 他们将是独立的。 这样可以避免很多错误！

例如，示例程序中的以下代码 `badScope.py` 会导致执行错误。 阅读并运行它，然后查看：

```py
'''program causing an error with an undefined variable'''

def main():
    x = 3
    f()

def f():
    print(x)  # error: f does not know about the x defined in main

main()

```
我们将在下面修复此错误。 执行错误消息中提到“全局名称”。 在程序“顶级”的任何函数定义之外定义的名称称为 *global* 。 它们是特例。 下一节将详细讨论它们。

如果您确实希望将一个函数的本地数据传递到另一个函数，请定义被调用函数，使其包含参数！ 阅读并比较并尝试该程序 `goodScope.py` ：

```py
'''A change to badScope.py avoiding any error by passing a parameter'''

def main():
    x = 3
    f(x)

def f(x):
    print(x)

main()

```
通过传递参数 `x` ，函数 `f` 中 的参数名称 不需要与中的实际参数名称匹配 `main` 。 的定义也 `f` 可能是：

```py
def f(whatever):
    print(whatever)

```
## 1.11.9。 全局常量 [¶](#global-constants "此标题的永久链接")

如果定义 *全局变量* （在任何函数定义之外 定义的*变量* ），则它们在所有函数中都是可见的。 它们具有 *全球范围* 。 最好的编程习惯是避免定义全局变量，而是将变量放入函数中，并在需要时将它们作为参数显式传递。 *常量* 是 一个常见的例外情况：*常量* 是通过仅在单个赋值语句中为名称分配值来给其提供固定数据值的名称。 然后，您可以稍后在表达式中使用固定数据值的名称。 一个简单的示例程序是 `constant.py` ：

```py
'''Illustrate a global constant being used inside functions.'''

PI = 3.14159265358979   # global constant -- only place the value of PI is set

def circleArea(radius):
    return PI*radius*radius    # use value of global constant PI

def circleCircumference(radius):
    return 2*PI*radius         # use value of global constant PI

def main():
    print('circle area with radius 5:', circleArea(5))
    print('circumference with radius 5:', circleCircumference(5))

main()

```
本示例使用带小数点的数字，有关 [小数，浮点数和浮点算术的](http://anh.cs.luc.edu/handsonPythonTutorial/float.html#floats) 更多信息，请参见 。 按照惯例，常量的名称均为大写字母。

如果全局变量仅用作常量，则不会出现问题。

在顶级定义的函数名称也具有全局作用域。 这样一来，您就可以使用在定义的另一个函数中定义的一个函数，例如 `circleArea` 从inside 调用 `main` 。
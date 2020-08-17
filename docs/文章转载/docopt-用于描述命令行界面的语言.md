---
title : docopt-用于描述命令行界面的语言
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-18 05:40:29 +0800
categories:
 -
tags:
 -
---
[[toc]]

复制

[![](https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png)
](https://github.com/docopt/)

命令行界面描述语言
---------

`docopt` 帮助您：

*   定义您的命令行应用程序的界面，并
*   自动为其生成解析器。

`docopt`基于数十年来在帮助消息和手册页中用于描述程序界面的约定。界面描述`docopt` _就是_这样的帮助消息，但是形式化。这是一个例子：

```
Naval Fate.

Usage:
  naval_fate ship new <name>...
  naval_fate ship <name> move <x> <y> [--speed=<kn>]
  naval_fate ship shoot <x> <y>
  naval_fate mine (set|remove) <x> <y> [--moored|--drifting]
  naval_fate -h | --help
  naval_fate --version

Options:
  -h --help     Show this screen.
  --version     Show version.
  --speed=<kn>  Speed in knots [default: 10].
  --moored      Moored (anchored) mine.
  --drifting    Drifting mine.

```

该实施例描述了可执行文件的接口`naval_fate`，其可与不同的组合被调用_的命令_（`ship`，`new`，`move`等），_选择_（`-h`，`--help`，`--speed=<kn>`等）和位置参数（`<name>`，`<x>`，`<y>`）。

该示例使用方括号“ `[ ]`”，“括号”，`( )`“管道” `|`和省略号“ `...`”来描述_optional_，_required_，_互斥_和_重复_ 元素。这些元素一起构成有效的_使用模式_，每个_使用模式_均以程序的name开头`naval_fate`。

在使用模式下，有一个带有说明的选项列表。它们描述了选项是否具有短/长格式（`-h`，`--help`），选项是否具有参数（`--speed=<kn>`）以及该参数是否具有默认值（`[default: 10]`）。

一个`docopt`实现将提取所有这些信息并生成一个命令行参数解析器，并将接口描述的文本作为使用`-h`或`--help`选项调用程序时显示的帮助消息。

使用方式
----

关键字之间的文本发生的历史`usage:`（区分_在_敏感）和_视觉_ 空行被解释为使用模式列表。之后的第一个单词 `usage:`被解释为程序的名称。这是不带命令行参数的程序的最小示例：

```
Usage: my_program

```

程序可以列出几种模式，并用各种元素来描述模式：

```
Usage:
  my_program command --option <argument>
  my_program [<optional-argument>]
  my_program --another-option=<with-argument>
  my_program (--either-that-option | <or-this-argument>)
  my_program <repeating-argument> <repeating-argument>...

```

每个元素和构造都在下面描述。我们将使用“单词” _一词_来描述由空白，“ `[]()|`”字符或“ `...`” 分隔的一系列字符。

### <argument>参数

以“ `<`” 开头，以“ ”结尾的`>`单词和大写单词被解释为位置参数。

```
Usage: my_program <host> <port>

```

### \-o-选项

以一个或两个破折号（除了“ `-`”，“ `--`”本身除外）开头的单词分别解释为短选项（一个字母）或长选项。

*   短选项可以被“堆叠”，其含义`-abc`等同于 `-a -b -c`。
*   长选项可以在空格后指定参数或等于“ `=`”：  
    `--input=ARG`等于`--input ARG`。
*   简短选项可以在_可选_空格后指定参数：  
    `-f FILE`等效于`-fFILE`。

请注意，`--input ARG`（与相对`--input=ARG`）书写是模棱两可的，这意味着无法分辨`ARG`是选项的自变量还是位置自变量。在使用模式中，_只有_在提供了有关该选项的描述（如下所述）后，该选项才会被解释为带参数的 选项。否则，它将被解释为一个选项和单独的位置参数。

`-f FILE`和`-fFILE`符号存在相同的歧义。在后一种情况下，无法判断它是堆叠的短期权，还是带有参数的期权。_仅_当提供选项的描述时，这些符号才会被解释为带参数的选项。

### 命令

所有_不_遵循上述约定的其他字词，`--options`或被 `<arguments>`解释为（子）命令的其他词。

### \[可选元素\]

方括号“ `[ ]`” 内的元素（选项，自变量，命令）被标记为_可选_。元素是否包含在相同或不同的括号中并不重要，例如：

```
Usage: my_program [command --option <argument>]

```

等效于：

```
Usage: my_program [command] [--option] [<argument>]

```

### （必填元素）

_默认情况下_，如果未包含在方括号“ `[ ]`”中，则_所有元素都是必需的_。但是，有时有必要使用括号“ `( )`” 明确标记所需的元素。例如，当您需要对互斥元素进行分组时（请参见下一节）：

```
Usage: my_program (--either-this <and-that> | <or-this>)

```

另一种用例是，当您需要指定_如果存在一个元素时，则需要另一个元素_，可以通过以下方式实现：

```
Usage: my_program [(<one-argument> <another-argument>)]

```

在这种情况下，有效的程序调用可以不带参数，也可以带2个参数。

### 元素|另一个

互斥元素可以使用竖线“ `|`” 分隔，如下所示：

```
Usage: my_program go (--up | --down | --left | --right)

```

需要互斥情况_之一时_，请使用parens“ `( )`”对元素进行分组。使用括号“ 当”到组元素_没有_需要的互斥的情况：`[ ]`

```
Usage: my_program go [--up | --down | --left | --right]

```

请注意，指定几种模式的工作方式与管道“ `|`” 完全相同，即：

```
Usage: my_program run [--fast]
       my_program jump [--high]

```

等效于：

```
Usage: my_program (run [--fast] | jump [--high])

```

### 元件...

使用省略号“ `...`”指定左边的参数（或参数组）可以重复一次或多次：

```
Usage: my_program open <file>...
       my_program move (<from> <to>)...

```

您可以灵活指定所需的参数数量。这是要求零个或多个参数的3种（冗余）方式：

```
Usage: my_program [<file>...]
       my_program [<file>]...
       my_program [<file> [<file> ...]]

```

一个或多个参数：

```
Usage: my_program <file>...

```

两个或多个参数（依此类推）：

```
Usage: my_program <file> <file>...

```

### \[选项\]

“ `[options]`”是一种快捷方式，可避免在模式中列出所有选项（带有说明的选项列表）。例如：

```
Usage: my_program [options] <path>

--all             List everything.
--long            Long output.
--human-readable  Display in human-readable format.

```

等效于：

```
Usage: my_program [--all --long --human-readable] <path>

--all             List everything.
--long            Long output.
--human-readable  Display in human-readable format.

```

如果您有很多选项，并且所有选项都适用于其中一种模式，则此功能很有用。另外，如果您同时拥有简短版本和较长版本的选项（在选项描述部分中指定），则可以在模式中列出其中的任何一个：

```
Usage: my_program [-alh] <path>

-a, --all             List everything.
-l, --long            Long output.
-h, --human-readable  Display in human-readable format.

```

有关如何编写选项说明的更多详细信息，将在下面介绍。

### \[-\]

`--`当不是选项的一部分时，双破折号“ ”通常用作分隔选项和位置参数的约定，以便处理例如文件名可能被误认为选项的情况。为了支持此约定，`[--]`请在位置参数前的模式中添加“ ”。

```
Usage: my_program [options] [--] <file>...

```

除了这种特殊含义外，“ `--`”只是普通命令，因此您可以应用任何先前描述的操作，例如，使其成为必需（通过在括号中加上“ `[ ]`”）

### \[-\]

`-`约定中通常使用单个破折号“ ”来表示程序应该处理`stdin`而不是文件。如果要遵循此约定`[-]`，请在模式中添加“ ”。“ `-`”本身只是一个普通命令，您可以使用任何含义。

选项说明
----

选项描述包括一个放在使用模式下方的选项列表。如果使用模式没有歧义，则可以选择指定它们（在上一`--option`节中进行了描述）。

选项的描述允许指定：

*   一些短期和长期选择是同义词，
*   一个选项有一个参数，
*   以及选项参数的默认值。

规则如下：

以“ `-`”或“ `--`” 开头的每一行（不计空格）均被视为选项描述，例如：

```
Options:
  --verbose   # GOOD
  -o FILE     # GOOD
Other: --bad  # BAD, line does not start with dash "-"

```

要指定选项具有参数，请在空格（或等于“ `=`”符号）后加上一个描述该参数的单词，如下所示。对选项的参数遵循`<angular-brackets>`或`UPPER-CASE`约定。如果要分隔选项，可以使用逗号。在下面的示例中，这两行都是有效的，但是建议坚持使用单一样式。

```
-o FILE --output=FILE       # without comma, with "=" sign
-i <file>, --input <file>   # with comma, without "=" sign

```

使用两个空格将选项及其非正式描述分开。

```
--verbose MORE text.    # BAD, will be treated as if verbose
                        # option had an argument MORE, so use
                        # 2 spaces instead
-q        Quit.         # GOOD
-o FILE   Output file.  # GOOD
--stdout  Use stdout.   # GOOD, 2 spaces

```

如果要为带参数的选项设置默认值，请将其以形式放入选项的描述中`[default: <the-default-value>]`。

```
--coefficient=K  The K coefficient [default: 2.95]
--output=FILE    Output file [default: test.txt]
--directory=DIR  Some directory [default: ./]

```

[`docopt`在浏览器中尝试](http://try.docopt.org/)
-----------------------------------------

实作
--

`docopt`提供多种编程语言。官方实现[在GitHub上](https://github.com/docopt)的[docopt组织下列出](https://github.com/docopt)。

![](https://www.gstatic.com/images/branding/product/1x/translate_24dp.png)
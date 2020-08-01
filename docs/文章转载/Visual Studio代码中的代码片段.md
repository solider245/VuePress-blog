---
title : Visual Studio代码中的代码片段
description : 官网的教程
author : 中箭的吴起
image : https://code.visualstudio.com/assets/docs/editor/userdefinedsnippets/snippet-dropdown.png
date : 2020-08-01 23:22:45 +0800
categories:
 - vscode
tags:
 - vscode
---
代码段是模板，可让您更轻松地输入重复的代码模式，例如循环或条件语句。

在Visual Studio Code中，代码片段显示在IntelliSense（ Ctrl + Space ）中，并与其他建议混合在一起，以及专用的代码片段选择器（ 在“命令面板”中 **插入代码片段** ）中。 还支持制表符补全：使用启用它 `"editor.tabCompletion": "on"` ，键入一个 **代码段前缀** （触发文本），然后按 Tab 键插入一个代码段。

片段语法遵循 [TextMate片段语法](https://manual.macromates.com/en/snippets) ，但“插补外壳代码”和的使用除外 `\u` ； 两者都不支持。

![Ajax代码段](https://code.visualstudio.com/assets/docs/editor/userdefinedsnippets/ajax-snippet.gif)

## 从Marketplace安装片段 [＃](#_install-snippets-from-the-marketplace)

[VS Code Marketplace](https://marketplace.visualstudio.com/vscode) 上的 许多 [扩展都](https://code.visualstudio.com/docs/editor/extension-gallery) 包含 [代码](https://marketplace.visualstudio.com/vscode) 片段。 如果找到您要使用的 [扩展程序](https://code.visualstudio.com/docs/editor/extension-gallery#_browse-and-install-extensions) ，请安装并重新启动VS Code，新的代码段将可用（ 有关安装扩展程序的更多说明， 请参见 [扩展程序市场](https://code.visualstudio.com/docs/editor/extension-gallery#_browse-and-install-extensions) ）。

以下是一些受欢迎的扩展，这些扩展在其语言支持中包括代码片段：

[

![蟒蛇](https://ms-python.gallerycdn.vsassets.io/extensions/ms-python/python/2020.7.96456/1595488245273/Microsoft.VisualStudio.Services.Icons.Default)

蟒蛇

2300万

ms\-python

整理，调试（多线程，远程），集成...

](https://marketplace.visualstudio.com/items?itemName=ms-python.python)[

![C / C ++](https://ms-vscode.gallerycdn.vsassets.io/extensions/ms-vscode/cpptools/0.29.0/1594865245864/Microsoft.VisualStudio.Services.Icons.Default)

C / C ++

1290万

ms\-vscode

C / C ++ IntelliSense，调试和代码浏览。

](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)[

![C＃](https://ms-dotnettools.gallerycdn.vsassets.io/extensions/ms-dotnettools/csharp/1.22.1/1592265351254/Microsoft.VisualStudio.Services.Icons.Default)

C＃

830万

ms\-dotnettools

Visual Studio Code的C＃（由OmniSharp提供支持）。

](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)[

![语言支持...](https://redhat.gallerycdn.vsassets.io/extensions/redhat/java/0.65.0/1595421183567/Microsoft.VisualStudio.Services.Icons.Default)

语言支持...

650万

红帽

Java Linting，Intellisense，格式化，重构...

](https://marketplace.visualstudio.com/items?itemName=redhat.java)

> **提示** ：上面显示的扩展名是动态查询的。 点击上方的扩展程序磁贴，以阅读说明和评论，以决定最适合您的扩展程序。 在 [市场中](https://marketplace.visualstudio.com/vscode) 查看更多信息 。

## 创建自己的代码段 [＃](#_create-your-own-snippets)

您可以轻松定义自己的片段，而无需任何扩展。 要创建或编辑自己的 **代码段，请** 在“ **文件”** \> **“首选项** **”** 下 选择“ **用户代码段****”** （ 在macOS上为**“** **代码”** \> **“首选项** ”），然后选择 要显示**代码段** 的语言（按 [语言标识符](https://code.visualstudio.com/docs/languages/identifiers) ） ，如果需要，则选择 “ **新建全局代码段”文件** 选项。显示所有语言。 VS Code为您管理基础片段文件的创建和刷新。

![片段下拉](https://code.visualstudio.com/assets/docs/editor/userdefinedsnippets/snippet-dropdown.png)

代码段文件以JSON格式编写，支持C样式的注释，并且可以定义无限数量的代码段。 片段支持大多数TextMate语法以实现动态行为，并根据插入上下文智能地格式化空格，并允许轻松进行多行编辑。

以下是 `for` JavaScript循环代码段 的示例 ：

```
// in file 'Code/User/snippets/javascript.json'
{
  "For Loop": {
    "prefix": ["for", "for-const"],
    "body": ["for (const ${2:element} of ${1:array}) {", "\t$0", "}"],
    "description": "A for loop."
  }
}
```

在上面的示例中：

*   “ For Loop”是代码段名称。 如果未 `description` 提供 ，则通过IntelliSense显示 。
*   `prefix` 定义一个或多个在IntelliSense中显示摘要的触发词。 子字符串匹配是在前缀上执行的，因此在这种情况下，“ fc”可以匹配“ for\-const”。
*   `body` 是一或多个内容行，插入时将作为多行加入。 换行和嵌入的选项卡将根据插入代码段的上下文进行格式化。
*   `description` 是IntelliSense显示的代码段的可选描述。

另外，所述 `body` 的例子中的上述具有三个占位符（在遍历顺序列出）： ， `${1:array}` ， `${2:element}` 和 `$0` 。 您可以使用 Tab 快速跳到下一个占位符 ，此时您可以编辑占位符或再次跳到下一个占位符。 结肠（如果有的话）之后的字符串是默认的文本，例如 `element` 在 `${2:element}` 。 占位符遍历顺序从一开始按数字递增； 零是一种可选的特殊情况，它总是最后出现，并在光标位于指定位置时退出摘要模式。

## 片段范围 [＃](#_snippet-scope)

代码段的范围有限，因此仅建议相关代码段。 片段的范围可以是：

1.  摘要所涉及 的 **语言（** 可能是所有语言）
2.  摘要所涉及 的 **项目（** 可能是全部）

### 语言片段范围 [＃](#_language-snippet-scope)

根据以下代码段中的定义，每个代码段的范围都限于一种，几种或所有（“全局”）语言：

1.  一个 **语言** 片断文件
2.  一个 **全球性** 片段文件

用户定义的单语言代码段是在特定语言的代码段文件中定义的（例如 `javascript.json` ），您可以通过 **“首选项：配置用户代码段”中** 的语言标识符来访问该 文件 。 仅在编辑其定义的语言时才能访问该代码段。

多语言和全局用户定义的代码段都在“全局”代码段文件（带有文件后缀的JSON `.code-snippets` ）中定义，也可以通过 **“首选项：配置用户代码段”进行访问** 。 在全局代码段文件中，代码段定义可能具有一个 `scope` 采用一个或多个语言标识符 的附加 属性，这使该代码段仅可用于那些指定的语言。 如果未提供任何 `scope` 属性，则全局代码段适用于 **所有** 语言。

大多数用户定义的代码段的范围仅限于一种语言，因此是在特定于语言的代码段文件中定义的。

### 项目片断范围 [＃](#_project-snippet-scope)

您还可以将全局代码片段文件（带有文件后缀的JSON `.code-snippets` ）限制为您的项目。 使用“的**新片段”文件** 创建项目文件夹片段 **。'...** “ **首选项：配置用户片段”** 下拉菜单 中的**“** 选项”， 位于项目的根目录下的 `.vscode` 文件夹中。 项目摘要文件可用于与该项目中的所有用户共享摘要。 项目文件夹片段类似于全局片段，并且可以通过该 `scope` 属性 将作用域限定为特定语言 。

## 片段语法 [＃](#_snippet-syntax)

该 `body` 片段可以使用特殊的结构来控制插入光标和文字。 以下是受支持的功能及其语法：

### 制表位 [＃](#_tabstops)

使用制表符，可以使编辑器光标在摘要内移动。 使用 `$1` ， `$2` 指定游标的位置，。 该数字是将按 `$0` Tab键 访问的顺序，而 表示最终光标的位置。 多次出现相同的制表位被链接并同步更新。

### 占位符 [＃](#_placeholders)

占位符是带有值的制表符，例如 `${1:foo}` 。 占位符文本将被插入和选择，以便可以轻松更改。 占位符可以嵌套，例如 `${1:another ${2:placeholder}}` 。

### 选择 [号](#_choice)

占位符可以选择作为值。 语法是用逗号分隔的值枚举，例如用竖线字符括起来 `${1|one,two,three|}` 。 插入代码段并选择占位符后，选项将提示用户选择其中一个值。

### 变量 [＃](#_variables)

使用 `$name` 或 `${name:default}` ，您可以插入变量的值。 未设置变量时，将 插入 其 **默认值** 或空字符串。 当变量未知（即未定义其名称）时，将插入该变量的名称，并将其转换为占位符。

可以使用以下变量：

*   `TM_SELECTED_TEXT` 当前选择的文本或空字符串
*   `TM_CURRENT_LINE` 当前行的内容
*   `TM_CURRENT_WORD` 光标下的单词内容或空字符串
*   `TM_LINE_INDEX` 基于零索引的行号
*   `TM_LINE_NUMBER` 基于一索引的行号
*   `TM_FILENAME` 当前文档的文件名
*   `TM_FILENAME_BASE` 当前文档的文件名，不带扩展名
*   `TM_DIRECTORY` 当前文件的目录
*   `TM_FILEPATH` 当前文档的完整文件路径
*   `CLIPBOARD` 剪贴板中的内容
*   `WORKSPACE_NAME` 打开的工作空间或文件夹的名称

要插入当前日期和时间：

*   `CURRENT_YEAR` 本年度
*   `CURRENT_YEAR_SHORT` 本年度的最后两位数字
*   `CURRENT_MONTH` 以两位数表示的月份（例如“ 02”）
*   `CURRENT_MONTH_NAME` 月的全名（例如“七月”）
*   `CURRENT_MONTH_NAME_SHORT` 该月的简称（例如“ Jul”）
*   `CURRENT_DATE` 一个月中的某天
*   `CURRENT_DAY_NAME` 一天的名称（例如“周一”）
*   `CURRENT_DAY_NAME_SHORT` 一天的简称（例如“ Mon”）
*   `CURRENT_HOUR` 当前小时（24小时制）
*   `CURRENT_MINUTE` 当前分钟
*   `CURRENT_SECOND` 当前秒
*   `CURRENT_SECONDS_UNIX` 自Unix时代以来的秒数

要插入行或块注释，请遵循当前语言：

*   `BLOCK_COMMENT_START` 输出示例：PHP `/*` 或HTML `<!--`
*   `BLOCK_COMMENT_END` 输出示例：PHP `*/` 或HTML `-->`
*   `LINE_COMMENT` 输出示例：在PHP中 `//`

下面的代码段将插入 `/* Hello World */` JavaScript文件和 `<!-- Hello World -->` HTML文件中：

```
{
  "hello": {
    "scope": "javascript,html",
    "prefix": "hello",
    "body": "$BLOCK_COMMENT_START Hello World $BLOCK_COMMENT_END"
  }
}
```

### 变量变换 [＃](#_variable-transforms)

转换允许您在插入变量之前修改其值。 转换的定义包括三个部分：

1.  与变量值匹配的正则表达式，或者在无法解析变量时为空字符串。
2.  一个“格式字符串”，它允许从正则表达式中引用匹配的组。 格式字符串允许条件插入和简单修改。
3.  传递给正则表达式的选项。

以下示例插入了当前文件的名称而没有结尾，因此从其名称 `foo.txt` 开始 `foo` 。

```
${TM_FILENAME/(.*)\\..+$/$1/}
  |           |         |  |
  |           |         |  |-> no options
  |           |         |
  |           |         |-> references the contents of the first
  |           |             capture group
  |           |
  |           |-> regex to capture everything before
  |               the final `.suffix`
  |
  |-> resolves to the filename

```

### 占位符转换 [＃](#_placeholdertransform)

与变量转换一样，占位符的转换允许在移至下一个制表位时更改占位符的插入文本。 插入的文本与正则表达式匹配，并且一个或多个匹配项（取决于选项）将替换为指定的替换格式文本。 每次出现占位符都可以使用第一个占位符的值独立定义其自己的转换。 占位符转换的格式与变量转换的格式相同。

### 变换的例子 [＃](#_transform-examples)

这些示例以双引号显示，因为它们将出现在摘录主体内，以说明需要对某些字符进行两次转义。 样本转换和文件名的结果输出 `example-123.456-TEST.js` 。

| 例 | 输出量 | 说明 |
| --- | --- | --- |
| `"${TM_FILENAME/[\\.]/_/}"` | `example-123_456-TEST.js` | 替换第一个 `.` 用 `_` |
| `"${TM_FILENAME/[\\.-]/_/g}"` | `example_123_456_TEST_js` | 替换每个 `.` 或 `-` 与 `_` |
| `"${TM_FILENAME/(.*)/${1:/upcase}/}"` | `EXAMPLE-123.456-TEST.JS` | 更改为全部大写 |
| `"${TM_FILENAME/[^0-9^a-z]//gi}"` | `example123456TESTjs` | 删除非字母数字字符 |

### 语法 [＃](#_grammar)

以下是 摘要 的EBNF（ [扩展的Backus\-Naur形式](https://en.wikipedia.org/wiki/Extended_Backus-Naur_form) ）。 随着 `\` （反斜线），你可以逃脱 `$` ， `}` 和 `\` 。 在选择元素中，反斜杠还会转义逗号和竖线字符。

```
any         ::= tabstop | placeholder | choice | variable | text
tabstop     ::= '$' int
                | '${' int '}'
                | '${' int  transform '}'
placeholder ::= '${' int ':' any '}'
choice      ::= '${' int '|' text (',' text)* '|}'
variable    ::= '$' var | '${' var '}'
                | '${' var ':' any '}'
                | '${' var transform '}'
transform   ::= '/' regex '/' (format | text)+ '/' options
format      ::= '$' int | '${' int '}'
                | '${' int ':' '/upcase' | '/downcase' | '/capitalize' '}'
                | '${' int ':+' if '}'
                | '${' int ':?' if ':' else '}'
                | '${' int ':-' else '}' | '${' int ':' else '}'
regex       ::= JavaScript Regular Expression value (ctor-string)
options     ::= JavaScript Regular Expression option (ctor-options)
var         ::= [_a-zA-Z] [_a-zA-Z0-9]*
int         ::= [0-9]+
text        ::= .*

```

## 使用TextMate的片段 [＃](#_using-textmate-snippets)

您还可以将现有TextMate代码段（.tmSnippets）与VS Code一起使用。 请参阅 我们的扩展API部分中 的 [使用TextMate代码段](https://code.visualstudio.com/api/language-extensions/snippet-guide#_using-textmate-snippets) 主题以了解更多信息。

## 分配键绑定到片段 [＃](#_assign-keybindings-to-snippets)

您可以创建自定义 [按键绑定](https://code.visualstudio.com/docs/getstarted/keybindings) 以插入特定的片段。 打开 `keybindings.json` （ **首选项：打开键盘快捷方式文件** ），它定义了您所有的键绑定，并添加了一个传递的键绑定 `"snippet"` 作为额外的参数：

```
{
  "key": "cmd+k 1",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "snippet": "console.log($1)$0"
  }
}
```

键盘绑定将调用 **插入代码段** 命令，但不会提示您选择代码段，而是将插入提供的代码段。 您可以 使用键盘快捷键，命令ID和 启用键盘快捷键时的 可选 [when子句上下文](https://code.visualstudio.com/docs/getstarted/keybindings#_when-clause-contexts) ， 像往常一样 定义自定义 [按键绑定](https://code.visualstudio.com/docs/getstarted/keybindings) 。[](https://code.visualstudio.com/docs/getstarted/keybindings#_when-clause-contexts)

另外， `snippet` 您可以使用 `langId` 和 `name` 参数 来引用现有的代码段 ，而不必使用 参数值来定义代码段内联 。 该 `langId` 参数是JSON用户代码段文件的名称， `name` 从这个文件中的代码段的唯一的名称：

```
{
  "key": "cmd+k 1",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "langId": "csharp",
    "name": "myFavSnippet"
  }
}
```

## 接下来的步骤 [＃](#_next-steps)

*   [命令行](https://code.visualstudio.com/docs/editor/command-line) \-VS Code具有丰富的命令行界面，可以打开或比较文件并安装扩展名。
*   [扩展API\-](https://code.visualstudio.com/api) 了解其他扩展VS Code的方法。
*   [代码段指南](https://code.visualstudio.com/api/language-extensions/snippet-guide) \-您可以打包代码段以在VS Code中使用。

## 常见问题 [＃](#_common-questions)

### 如果我想使用.tmSnippet文件中的现有TextMate代码段怎么办？ [＃](#_what-if-i-want-to-use-existing-textmate-snippets-from-a-tmsnippet-file)

您可以轻松打包TextMate片段文件以在VS Code中使用。 请参阅 我们的扩展API文档中的 [使用TextMate代码段](https://code.visualstudio.com/api/language-extensions/snippet-guide#_using-textmate-snippets) 。

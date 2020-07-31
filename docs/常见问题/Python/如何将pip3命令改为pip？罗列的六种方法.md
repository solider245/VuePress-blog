---
title: 如何将pip3命令改为pip？六种方法盘点
---
我卸载了`pip`，而我安装了`pip3`。现在，我想通过仅输入`pip3`来使用`pip`。原因是我习惯只键入`pip`，每个指南都使用`pip`命令，所以每次我想复制和粘贴命令时，我都要将`pip`修改为{{1浪费时间。当我输入`pip3`时，我有一个`pip`的错误，这意味着不会执行`pip: command not found`命令。是否可以将`pip`分指向`pip`？

#### 6 个答案:

答案 0 :(得分：17)

您可以为〜/ .bashrc

添加别名

```
alias pip=pip3

```

或添加到名为pip的$ PATH符号链接，指向pip3二进制文件

（顺便说一句，即使关于pip并不是真正与python相关的问题，所以你应该重拍它）

答案 1 :(得分：10)

## 解决方案1 ​​

检查pip指向哪个版本

```
pip --version
pip 18.0 from /usr/lib/python2.7/site-packages/pip (python 2.7)

```

如果您的`pip`指向`pip2`，请找到点“二进制”。

```
which pip
/usr/bin/pip

```

这是一个简单的python脚本：

```
cat /usr/bin/pip
#!/usr/bin/python2

# -*- coding: utf-8 -*-
import re
import sys

from pip._internal import main

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(main())

```

因此，只需将shebang从`#!/usr/bin/python2`更改为`#!/usr/bin/python3`。

现在`pip`指向`pip3`。

```
pip --version
pip 18.0 from /usr/lib/python3.6/site-packages/pip (python 3.6)

```

## 解决方案2

将`/usr/bin/pip`删除，从所需的pip版本建立符号链接。

```
sudo rm /usr/bin/pip
sudo ln -s /usr/bin/pip3.6 /usr/bin/pip

```

答案 2 :(得分：4)

这可以通过简单地为命令创建别名来完成。 要创建别名，只需键入

即可

`$alias new_command="existing_command"`
在你的情况下，
`$alias pip="pip3"`

虽然这不是永久性的。 OT让它永久编辑你的bashrc文件
`$ vim ~/.bashrc`
在它的末尾附加一行。 `$alias pip="pip3"`

答案 3 :(得分：3)

大多数软件包管理器应该允许您注册希望使用的版本，同时保持依赖关系，而不是在bash中手动创建自己的别名并希望它不会与任何冲突。

例如在Linux上：

```
sudo update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1

```

或在Mac上（MacPorts）：

```
port select --set pip pip3

```

答案 4 :(得分：1)

在主目录中更改bashrc文件后，您可以为pip3编写pip。

在Mac中\-

打开bashrc文件\-

```
from operator import sub, mul
from itertools import groupby

A = [-1, 1, 3, 3, 3, 2, 3, 2, 1, 0]

S = [sum(1 for _ in e) for (_, e) in groupby(map(sub, A[1:], A[:-1]))]
R = (int)(sum(map(sub, map(mul, S, S), S)) / 2) # sum of elementwise s(s-1)/2

print(R)

```

在文件末尾添加此行\-

```
vim ~/.bashrc

```

关闭文件。不要忘记通过

在终端中获取此文件

```
alias pip="pip3"

```

你很好。现在，无论何时您将在任何命令中使用pip。它会被解释为pip3

您可以通过运行命令进行检查\-

```
source ~/.bashrc

```

答案 5 :(得分：0)

自从您卸载`pip`以来，此解决方案假定您仅将使用`pip3`。

1.  打开您的终端。

2.  创建一个简单的链接。为此，请输入：

    `sudo ln -s /usr/bin/pip3 /usr/bin/pip`

现在，当您键入`pip`时，它将调用`pip3`。

通过键入`pip --version`

检查它是否有效

```
pip --version
pip 9.0.1 from /usr/lib/python3/dist-packages (python 3.6)

```

您都准备好了！
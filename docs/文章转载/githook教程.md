---
title : githook教程
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-15 09:56:01 +0800
categories:
 -
tags:
 -
---
[[toc]]
名称
--

githooks-Git使用的挂钩。([githook在官网的介绍](https://git-scm.com/docs/githooks))

描述
--

如同其他许多的版本控制系统一样，Git 也具有在特定事件发生之前或之后执行特定脚本代码功能（从概念上类比，就与监听事件、触发器之类的东西类似）。Git Hooks 就是那些在Git执行特定事件（如commit、push、receive等）后触发运行的脚本，挂钩是可以放置在挂钩目录中的程序，可在git执行的某些点触发动作。没有设置可执行位的钩子将被忽略。

默认情况下，`hooks`目录是`$GIT_DIR/hooks`，但是可以通过`core.hooksPath`配置变量来更改（请参见 [git-config \[1\]](https://git-scm.com/docs/git-config)）。

Git Hooks 能做什么
--------------

Git Hooks是定制化的脚本程序，所以它实现的功能与相应的git动作相关,如下几个简单例子：  
1.多人开发代码语法、规范强制统一  
2.commit message 格式化、是否符合某种规范  
3.如果有需要，测试用例的检测  
4.服务器代码有新的更新的时候通知所有开发成员  
5.代码提交后的项目自动打包（git receive之后） 等等...

更多的功能可以按照生产环境的需求写出来

Git Hooks 是如何工作的
----------------

每一个使用了 git 的工程下面都有一个隐藏的 .git 文件夹。  
![](https://img2018.cnblogs.com/blog/733258/202002/733258-20200204180050399-1177433138.png)

挂钩都被存储在 .git 目录下的 hooks 子目录中，即大部分项目中的 .git/hooks。 如下图:  
![](https://img2018.cnblogs.com/blog/733258/202002/733258-20200204180058499-1090156457.png)

Git 默认会放置一些脚本样本在这个目录中，除了可以作为挂钩使用，这些样本本身是可以独立使用的。所有的样本都是shell脚本，其中一些还包含了Perl的脚本。不过，任何正确命名的可执行脚本都可以正常使用 ，也可以用Ruby或Python，或其他脚本语言。

上图是git 初始化的时候生成的默认钩子，已包含了大部分可以使用的钩子，但是 .sample 拓展名防止它们默认被执行。为了安装一个钩子，你只需要去掉 .sample 拓展名。或者你要写一个新的脚本，你只需添加一个文件名和上述匹配的新文件，去掉.sample拓展名。把一个正确命名且可执行的文件放入 Git 目录下的 hooks子目录中，可以激活该挂钩脚本，之后他一直会被 Git 调用。

### 一个简单的 Hooks 例子

使用shell 这里尝试写一个简单的钩子，安装一个`prepare-commit-msg`钩子。去掉脚本的`.sample`拓展名，在文件中加上下面这两行：

```
#!/bin/sh

echo "# Please include a useful commit message!" > $1


```

接下来你每次运行git commit时，你会看到默认的提交信息都被替换了。

内置的样例脚本是非常有用的参考资料，因为每个钩子传入的参数都有非常详细的说明（不同钩子不一样）。

### 脚本语言

git自己生成的默认钩子的脚本大多是shell和Perl语言的，但你可以使用任何脚本语言，只要它们最后能编译到可执行文件。每次脚本中的 #!/bin/sh 定义了你的文件将被如何解析。比如，使用其他语言时你只需要将path改为你的解释器的路径。

比如说，你可以在 `prepare-commit-msg` 中写一个可执行的Python脚本。下面这个钩子和上一节的shell脚本做的事完全一样。

```
#!/usr/bin/env python

import sys, os

commit_msg_filepath = sys.argv[1]
with open(commit_msg_filepath, 'w') as f:
    f.write("# Please include a useful commit message!")

```

注意第一行改成了python解释器的路径。此外，这里用`sys.argv[1]`而不是$1来获取第一个参数。这个特性非常强大，因为你可以用任何你喜欢的语言来编写Git钩子。

### 钩子的作用域

对于任何Git仓库来说钩子都是本地的，而且它不会随着`git clone`一起复制到新的仓库。而且，因为钩子是本地的，任何能接触得到仓库的人都可以修改。在开发团队中维护钩子是比较复杂的，因为`.git/hooks`目录不随你的项目一起拷贝，也不受版本控制影响。一个简单的解决办法是把你的钩子存在项目的实际目录中（在.git外）。这样你就可以像其他文件一样进行版本控制。

作为备选方案，Git同样提供了一个模板目录机制来更简单地自动安装钩子。每次你使用 `git init` 或`git clone`时，模板目录文件夹下的所有文件和目录都会被复制到.git文件夹。

HOOKS（钩子）的几种情况 （这一节官网是翻译，可以不用仔细看）
---------------------------------

1.`applypatch-msg`(应用程序消息)

这个钩子由[git am](https://git-scm.com/docs/git-am)调用。它只有一个参数，即保存建议的提交日志消息的文件的名称。以非零状态退出会导致`git am`在应用补丁之前中止。

该挂钩允许在适当位置编辑消息文件，并可用于将消息规范化为某些项目标准格式。检查消息文件后，它也可以用于拒绝提交。

启用后，默认的`applypatch-msg`挂钩将运行 `commit-msg`挂钩（如果后者已启用）。

2.`pre-applypatch`(应用前批处理)

这个钩子由[git am](https://git-scm.com/docs/git-am)调用。它不接受任何参数，并在应用补丁程序之后、提交之前调用。

如果它以非零状态退出，则在应用补丁程序后将不会提交工作树。

它可以用来检查当前的工作树，如果不通过某些测试，则拒绝提交。

默认的`pre-applypatch`钩子在启用时运行`pre-commit`钩子（如果后者已启用）。

3.`post-applypatch`(应用程序批处理后)  
这个钩子由[git am](https://git-scm.com/docs/git-am)调用。它不接受任何参数，在应用补丁程序并提交之后调用。

这个钩子主要用于通知，不能影响`git am`的结果。

4.`pre-commit`(预先提交)  
这个钩子由[git commit](https://git-scm.com/docs/git-commit)调用，可以使用`--no-verify`选项绕过它。它不接受任何参数，并在获取建议的提交日志消息和进行提交之前被调用。从这个脚本中退出非零状态会导致`git commit`命令在创建提交之前中止。

默认的`pre-commit`挂钩（如果启用）捕获带有尾随空白的行的引入，并在找到此类行时中止提交。

如果命令不会打开编辑器来修改提交消息，则使用环境变量 `GIT_EDITOR=:` 调用所有`git commit`挂钩。

当启用`hooks.allownonascii`配置选项`unset`或设置为`false`时，默认的`pre-commit`挂钩将阻止使用非ASCII文件名。

5.`pre-merge-commit`(合并前提交)  
这个钩子由[git merge\[1\]](https://git-scm.com/docs/git-merge)调用，可以使用`--no-verify`选项绕过它。它不接受任何参数，并在合并成功执行之后和获取建议的提交日志消息以进行提交之前调用。从这个脚本中退出非零状态会导致Git合并命令在创建提交之前中止。

如果启用了`pre-merge-commit`挂钩，则默认的预合并提交挂钩将运行`pre-commit`挂钩。

如果命令不会调出编辑器来修改提交消息，则使用环境变量`GIT_EDITOR=:`调用此挂钩。

如果无法自动执行合并，则需要解决冲突并单独提交结果（参见[git merge](https://git-scm.com/docs/git-merge)）。此时，将不会执行此挂钩，但如果启用了`pre-commit`挂钩，则会执行它。

6.`prepare-commit-msg`(准备提交消息)  
[git commit](https://git-scm.com/docs/git-commit)在准备默认日志消息之后，在启动编辑器之前调用此钩子。

它需要一到三个参数。第一个是包含提交日志消息的文件的名称。第二个是提交消息的来源，可以是：`message`（如果给出了`-m`或`-F`选项）；`template`（如果给出了`-t`选项或配置选项`commit.template`）；`merge`（如果提交是合并或`.git/MERGE_MSG`文件）；`squash`（如果`.git/SQUASH_MSG`文件存在）；或`commit`，接着是提交SHA-1（如果是`-c`，`-C`）或者`--amend` 选项）。

如果退出状态为非零，则`git commit`将中止。

钩子的目的是就地编辑消息文件，而`--no-verify`选项不禁止它。非零退出意味着钩子失败，并中止提交。它不应该用作预提交挂钩的替换。

Git附带的`prepare-commit-msg`钩子示例删除了commit模板注释部分中的帮助消息。

7.`commit-msg`(提交信息)  
这个钩子由[git commit](https://git-scm.com/docs/git-commit)和[git merge](https://git-scm.com/docs/git-merge)调用，可以使用`--no-verify`选项绕过它。它接受一个参数，即保存建议的提交日志消息的文件的名称。退出非零状态会导致命令中止。

允许钩子就地编辑消息文件，并可用于将消息规范化为某些项目标准格式。它还可用于在检查消息文件后拒绝提交。

默认的`commit-msg` hook在启用时检测到重复的`Signed-off-by`行，如果找到一行，则中止提交。

8.`post-commit`(提交后)  
这个钩子由[git commit](https://git-scm.com/docs/git-commit)调用。它不接受任何参数，并在提交后调用。

这个钩子主要用于通知，不能影响`git commit`的结果。

9.`pre-rebase`(变基前)  
这个钩子由[git rebase](https://git-scm.com/docs/git-rebase)调用，可用于防止分支重新定位。可以使用一个或两个参数调用钩子。第一个参数是派生序列的上游。第二个参数是正在重设基的分支，重设基当前分支时不设置该参数。

10.`post-checkout`(结账后)  
更新工作树后运行[git checkout](https://git-scm.com/docs/git-checkout)或[git switch](https://git-scm.com/docs/git-switch)时，将调用此挂钩。钩子有三个参数：前一个HEAD的ref，新HEAD的ref（可能已经更改，也可能没有更改）和一个标志，指示签出是分支签出（更改分支，flag=1）还是文件签出（从索引中检索文件，flag=0）。此挂钩不会影响`git switch`或`git checkout`的结果。

它也在[git clone\[1\]](https://git-scm.com/docs/git-clone)之后运行，除非使用`--no-checkout`（`-n`）选项。给钩子的第一个参数是空ref，第二个参数是新头的ref，标志总是1。同样，对于`git worktree add`，除非`--no-checkout`签出。

此钩子可用于执行存储库有效性检查、自动显示与前一个HEAD的差异（如果不同）或设置工作目录元数据属性。

11.`post-merge`(合并后)  
这个钩子由[git merge](https://git-scm.com/docs/git-merge)调用，当在本地存储库上完成`git pull`时就会发生这种情况。钩子接受一个参数，一个状态标志，指定正在进行的合并是否是挤压合并。如果合并由于冲突而失败，则此挂钩不会影响`git merge`的结果，也不会执行。

此钩子可与相应的预提交钩子结合使用，以保存和还原与工作树相关联的任何形式的元数据（例如：permissions/ownership, ACLS等）。请参阅contrib/hooks/setgitperms.perl，以获取如何执行此操作的示例。

12.`pre-push`(预推)  
这个钩子被[git push](https://git-scm.com/docs/git-push)调用，可以用来防止发生push。使用两个参数调用钩子，这两个参数提供目标远程的名称和位置，如果未使用命名远程，则两个值将相同。

有关要推送的内容的信息在钩子的标准输入中提供，输入行如下：

```
<local ref> SP <local sha1> SP <remote ref> SP <remote sha1> LF

```

例如，如果运行`git push origin master:foreign`命令，钩子将收到如下行：

```
refs/heads/master 67890 refs/heads/foreign 12345

```

尽管将提供完整的、40个字符的SHA-1。如果外部参考还不存在，`<remote SHA-1>` 将是40 `0`。如果要删除引用，`<local ref>`将作为（`delete`）提供，`<remote SHA-1>`将为40 `0`。如果本地提交不是由可扩展的名称（如`HEAD~`或`SHA-1`）指定的，则将按最初的给定方式提供。

如果这个钩子退出非零状态，`git push`将中止而不推任何东西。有关拒绝推送的原因的信息可以通过写入标准错误发送给用户。

13.`pre-receive`(预先接收)  
当[git-receive-pack](https://git-scm.com/docs/git-receive-pack)对其存储库中的`git push`和updates引用作出反应时，它将调用此钩子。在开始更新远程存储库上的refs之前，将调用预接收挂钩。它的退出状态决定了更新的成功或失败。

对于接收操作，此钩子执行一次。它不需要参数，但是对于每个要更新的ref，它在标准输入上接收一行格式：

```
<old-value> SP <new-value> SP <ref-name> LF

```

其中，`<old-value>`是存储在ref中的旧对象名，`<new-value>`是存储在ref中的新对象名，`<ref-name>`是ref的全名。创建新ref时，`<old-value>`是40 `0`。

如果钩子退出非零状态，则不会更新任何参考文件。如果钩子以0退出，则更新钩子仍然可以防止单个引用的更新。

标准输出和标准错误输出都被转发到另一端的`git send-pack`，因此您可以简单地为用户回显消息。

git push命令行中给定的push选项数`--push-option=...` 可以从环境变量`GIT_PUSH_OPTION_COUNT`中读取，选项本身位于`GIT_PUSH_OPTION_0`，`GIT_PUSH_OPTION_1`，…中。如果协商不使用PUSH options阶段，则不会设置环境变量。如果客户端选择使用push选项，但不传输任何选项，则`count`变量将设置为零，`GIT_push_OPTION_count=0`。

有关一些注意事项，请参阅[git-receive-pack](https://git-scm.com/docs/git-receive-pack)中关于“隔离环境”的部分。

14.`update`(更新)  
当[git-receive-pack](https://git-scm.com/docs/git-receive-pack)对其存储库中的`git push`和updates引用作出反应时，它将调用此钩子。就在更新远程存储库上的ref之前，会调用更新挂钩。它的退出状态决定了REF更新的成败。

钩子对每个要更新的ref执行一次，并接受3个参数：

*   正在更新的ref的名称，
*   存储在ref中的旧对象名，
*   以及要存储在ref中的新对象名。

从更新钩子的零出口允许REF被更新。退出非零状态阻止`git receive-pack`更新REF。

通过确保对象名是commit对象（commit对象是由旧对象名命名的commit对象的后代），此钩子可用于防止强制更新某些ref。也就是说，执行“仅限快进”政策。

它还可以用来记录旧的..新的状态。但是，它不知道整个分支集，因此在天真地使用时，它最终会为每个ref触发一封电子邮件。`post-receive`钩子更适合这种情况。

在一个仅限制用户通过网络访问git命令的环境中，此钩子可用于实现访问控制，而不依赖文件系统所有权和组成员资格。请参阅[git shell](https://git-scm.com/docs/git-shell)了解如何使用登录shell限制用户仅访问git命令。

标准输出和标准错误输出都被转发到另一端的`git send-pack`，因此您可以简单地为用户回显消息。

默认的`update` hook在启用时，如果`hooks.allowunannotated` config选项未设置或设置为`false`，则会阻止推送未注释的标记。

15.`post-receive`(接收后)  
当[git-receive-pack](https://git-scm.com/docs/git-receive-pack)对其存储库中的`git push`和updates引用作出反应时，它将调用此钩子。在更新所有ref之后，它在远程存储库上执行一次。

对于接收操作，此钩子执行一次。它不接受参数，但获取的信息与`pre-receive`钩子在其标准输入上所做的相同。

这个钩子不会影响`git receive-pack`的结果，因为它是在实际工作完成后调用的。

这将取代`post-update`挂钩，因为它除了获取所有ref的名称外，还获取它们的旧值和新值。

标准输出和标准错误输出都被转发到另一端的`git send-pack`，因此您可以简单地为用户回显消息。

默认的`post-receive`钩子是空的，但是Git发行版的`contrib/hooks`目录中提供了一个示例脚本`post-receive email`，它实现了发送提交电子邮件。

git push命令行中给定的push选项数`--push-option=...`可以从环境变量`GIT_PUSH_OPTION_COUNT`中读取，选项本身位于`GIT_PUSH_OPTION_0`，`GIT_PUSH_OPTION_1`，…中。如果协商不使用PUSH options阶段，则不会设置环境变量。如果客户端选择使用push选项，但不传输任何选项，则count变量将设置为零，`GIT_push_OPTION_count=0`。

16.`post-update`(更新后)  
当[git-receive-pack](https://git-scm.com/docs/git-receive-pack)对其存储库中的`git push`和updates引用作出反应时，它将调用此钩子。在更新所有ref之后，它在远程存储库上执行一次。

它接受可变数量的参数，每个参数都是实际更新的ref的名称。

此钩子主要用于通知，不能影响`git receive-pack`的结果。

`post-update`钩子可以告诉推送的头是什么，但是它不知道它们的原始值和更新值是什么，所以它是一个很糟糕的地方来记录旧的..新的。`post-receive`钩子获取refs的原始值和更新值。如果你需要的话，你可以考虑一下。

启用后，默认的`post-update`挂钩运行`git update-server-info` 以保持dumb transports（例如HTTP）使用的信息是最新的。如果您要发布一个可以通过HTTP访问的Git存储库，那么您可能应该启用这个钩子。

标准输出和标准错误输出都被转发到另一端的`git send-pack`，因此您可以简单地为用户回显消息。

17.`push-to-checkout`(推送至结帐)  
当[git-receive-pack](https://git-scm.com/docs/git-receive-pack)对其存储库中的`git push`和update s引用作出反应，并且当push尝试更新当前签出的分支并且`receive.denyCurrentBranch`配置变量设置为`updateInstead` 时，它将调用此钩子。如果工作树和远程存储库的索引与当前签出的提交有任何差异，则默认情况下拒绝此类推送；当工作树和索引都与当前提交匹配时，它们将更新以匹配分支的新推送提示。此钩子将用于重写默认行为。

钩子接收当前分支的提示将被更新的提交。它可以以非零状态退出拒绝推送（当它这样做时，它不必修改索引或工作树）。或者，当当前分支的尖端被更新为新的提交，并以零状态退出时，它可以对工作树和索引进行任何必要的更改，以使它们达到所希望的状态。

例如，钩子可以简单地运行`git read-tree -u -m HEAD "$1"`，以模拟git push反向运行的`git fetch`，因为`git read tree -u -m`的两种树形式本质上与`git switch`或`git checkout`相同，后者切换分支，同时保持工作树中不干扰的本地更改树枝之间的差别。

18.`pre-auto-gc`(前自动gc)  
这个钩子由`git gc --auto`调用（参见[git gc](https://git-scm.com/docs/git-gc)）。它不需要任何参数，并且从这个脚本中退出非零状态，导致`git gc --auto`中止。

19.`post-rewrite`(重写后)  
此钩子由重写提交的命令调用（使用`--amend`和[git rebase](https://git-scm.com/docs/git-rebase)调用[git commit](https://git-scm.com/docs/git-commit)；但是，[git fast-import](https://git-scm.com/docs/git-fast-import)或[git filter-repo](https://github.com/newren/git-filter-repo)之类的完整历史（重新）编写工具通常不会调用它！）。它的第一个参数表示它被调用的命令：当前是`amend` 或`rebase`之一。将来可能会传递更多依赖命令的参数。

钩子接收stdin上重写的提交列表，格式如下

```
<old-sha1> SP <new-sha1> [ SP <extra-info> ] LF

```

`extra-info`同样依赖于命令。如果为空，则前面的SP也将被忽略。目前，没有命令传递任何`extra-info`。

钩子总是在自动复制便笺之后运行（参见[git config](https://git-scm.com/docs/git-config)中的“`notes.rewrite.<command>`”），因此可以访问这些便笺。

以下命令特定注释适用：  
`rebase`  
对于`squash`和`fixup`操作，所有挤压的提交都将被列为被重写为挤压的提交。这意味着将有多条线路共享同一个`new-sha1`。  
保证提交按rebase处理的顺序列出。

20.`sendemail-validate`(发送电子邮件验证)  
此钩子由[git send-email\[1\]](https://git-scm.com/docs/git-send-email)调用。它只接受一个参数，即保存要发送的电子邮件的文件的名称。退出非零状态导致`git send-email`在发送任何电子邮件之前中止。

21.`fsmonitor-watchman`(监听看守者)  
当配置选项`core.fsmonitor`设置为`.git/hooks/fsmonitor-watchman`时，将调用此钩子。它需要两个参数，一个版本（当前为1）和自1970年1月1日午夜以来以纳秒为单位的时间。

钩子应该输出到stdout工作目录中自请求时间以来可能已更改的所有文件的列表。逻辑应该是包含的，这样就不会遗漏任何潜在的更改。这些路径应该相对于工作目录的根目录，并由单个NUL分隔。

可以包含没有实际更改的文件。应包括所有更改，包括新创建和删除的文件。重命名文件时，应同时包含旧名称和新名称。

Git将根据给定的路径名限制它检查哪些文件进行更改，以及检查哪些目录以查找未跟踪的文件。

告诉git“所有文件都已更改”的一种优化方法是返回filename`/`。

退出状态决定Git是否使用钩子中的数据来限制其搜索。出错时，它将返回到验证所有文件和文件夹。

22.`p4-pre-submit`(p4预先提交)  
此钩子由`git-p4 submit`调用。它不接受任何参数，也不接受标准输入。从脚本中退出非零状态，防止`git-p4 submit`从启动提交。运行`git-p4 submit --help`获取详细信息。

23.`post-index-change`(索引后变化)  
当索引写入读缓存时调用此挂钩。c do\_write\_locked\_index。

传递给钩子的第一个参数是正在更新的工作目录的指示符。“1”表示工作目录已更新，或“0”表示工作目录未更新。

传递给钩子的第二个参数是指示索引是否已更新以及跳过工作树位是否已更改的指示器。”“1”表示跳过工作树位可能已更新，“0”表示它们未更新。

钩子运行时，只有一个参数应设置为“1”。吊钩不应通过“1”、“1”。

常用钩子有哪些
-------

就像上面说的，那么多钩子我们不是都会用到，下面就介绍几个经常用到的钩子，举例说明一下。

### 客户端 Hooks

客户端钩子只影响它们所在的本地仓库。有许多客户端挂钩，以下把他们分为：提交工作流挂钩、电子邮件工作流挂钩及其他客户端挂钩。

#### 1.提交工作流挂钩

commit操作有 4个挂钩被用来处理提交的过程，他们的触发时间顺序如下：  
`pre-commit`、`prepare-commit-msg`、`commit-msg`、`post-commit`

**pre-commit**  
`pre-commit` 挂钩在键入提交信息前运行，最先触发运行的脚本。被用来检查即将提交的代码快照。**例如，检查是否有东西被遗漏、运行一些自动化测试、以及检查代码规范。**当从该挂钩返回非零值时，Git 放弃此次提交，但可以用`git commit --no-verify`来忽略。**该挂钩可以被用来检查代码错误，检查代码格式规范，检查尾部空白（默认挂钩是这么做的），检查新方法（译注：程序的函数）的说明。**

pre-commit 不需要任何参数，以非零值退出时将放弃整个提交。这里，我们用 “强制代码格式校验” 来说明。

**prepare-commit-msg**  
`prepare-commit-msg` 挂钩在提交信息编辑器显示之前，默认信息被创建之后运行，它和 `pre-commit` 一样，以非零值退出会放弃提交。因此，可以有机会在提交作者看到默认信息前进行编辑。该挂钩接收一些选项：拥有提交信息的文件路径，提交类型。例如和提交模板配合使用，以编程的方式插入信息。提交信息模板的提示修改在上面已经看到了，现在我们来看一个更有用的脚本。在处理需要单独开来的bug时，我们通常在单独的分支上处理issue。如果你在分支名中包含了issue编号，你可以使用`prepare-commit-msg`钩子来自动地将它包括在那个分支的每个提交信息中。

```py


import sys, os, re
from subprocess import check_output


commit_msg_filepath = sys.argv[1]
if len(sys.argv) > 2:
    commit_type = sys.argv[2]
else:
    commit_type = ''
if len(sys.argv) > 3:
    commit_hash = sys.argv[3]
else:
    commit_hash = ''

print "prepare-commit-msg: File: %s\nType: %s\nHash: %s" % (commit_msg_filepath, commit_type, commit_hash)


branch = check_output(['git', 'symbolic-ref', '--short', 'HEAD']).strip()
print "prepare-commit-msg: On branch '%s'" % branch


if branch.startswith('issue-'):
    print "prepare-commit-msg: Oh hey, it's an issue branch."
    result = re.match('issue-(.*)', branch)
    issue_number = result.group(1)

    with open(commit_msg_filepath, 'r+') as f:
        content = f.read()
        f.seek(0, 0)
        f.write("ISSUE-%s %s" % (issue_number, content))

```

首先，上面的`prepare-commit-msg` 钩子告诉你如何收集传入脚本的所有参数。接下来，它调用了`git symbolic-ref --short HEAD` 来获取对应HEAD的分支名。如果分支名以issue-开头，它会重写提交信息文件，在第一行加上issue编号。比如你的分支名issue-224，下面的提交信息将会生成:

```
ISSUE-224 

# Please enter the commit message for your changes. Lines starting 
# with '#' will be ignored, and an empty message aborts the commit. 
# On branch issue-224 
# Changes to be committed: 
# modified:   test.txt

```

有一点要记住的是即使用户用`-m`传入提交信息，`prepare-commit-msg`也会运行。也就是说，上面这个脚本会自动插入`ISSUE-[#]`字符串，而用户无法更改。你可以检查第二个参数是否是提交类型来处理这个情况。但是，如果没有-m选项，`prepare-commit-msg`钩子允许用户修改生成后的提交信息。所以这个脚本的目的是为了方便，而不是推行强制的提交信息规范。如果你要这么做，你需要下面所讲的`commit-msg`钩子。

**commit-msg**  
`commit-msg`钩子和`prepare-commit-msg`钩子很像，但它会在用户输入提交信息之后被调用。这适合用来提醒开发者他们的提交信息不符合你团队的规范。传入这个钩子唯一的参数是包含提交信息的文件名。如果它不喜欢用户输入的提交信息，它可以在原地修改这个文件（和`prepare-commit-msg`一样），或者它会以非零值退出，放弃这个提交。比如说，下面这个脚本确认用户没有删除`prepare-commit-msg`脚本自动生成的`ISSUE-[#]`字符串。

```py


import sys, os, re
from subprocess import check_output


commit_msg_filepath = sys.argv[1]


branch = check_output(['git', 'symbolic-ref', '--short', 'HEAD']).strip()
print "commit-msg: On branch '%s'" % branch


if branch.startswith('issue-'):
    print "commit-msg: Oh hey, it's an issue branch."
    result = re.match('issue-(.*)', branch)
    issue_number = result.group(1)
    required_message = "ISSUE-%s" % issue_number

    with open(commit_msg_filepath, 'r') as f:
        content = f.read()
        if not content.startswith(required_message):
            print "commit-msg: ERROR! The commit message must start with '%s'" % required_message
            sys.exit(1)

```

**post-commit**  
`post-commit` 挂钩在整个提交过程完成后运行，他不会接收任何参数，但可以运行`git log`来获得最后的提交信息。总之，该挂钩是作为通知之类使用的。虽然可以用`post-commit`来触发本地的持续集成系统，但大多数时候你想用的是`post-receive`这个钩子。它运行在服务端而不是用户的本地机器，它同样在任何开发者推送代码时运行。那里更适合进行持续集成。

提交工作流的客户端挂钩脚本可以在任何工作流中使用，他们经常被用来实施某些策略，但值得注意的是，这些脚本在clone期间不会被传送。可以在服务器端实施策略来拒绝不符合某些策略的推送，但这完全取决于开发者在客户端使用这些脚本的情况。所以，这些脚本对开发者是有用的，由他们自己设置和维护，而且在任何时候都可以覆盖或修改这些脚本，后面讲如何把这部分东西也集成到开发流中。

#### 2.E-mail工作流挂钩

有3个可用的客户端挂钩用于e-mail工作流。当运行 `git am` 命令时，会调用他们，因此，如果你没有在工作流中用到此命令，可以跳过本节。如果你通过e-mail接收由 `git format-patch` 产生的补丁，这些挂钩也许对你有用。

首先运行的是 `applypatch-msg` 挂钩，他接收一个参数：包含被建议提交信息的临时文件名。如果该脚本非零退出，Git 放弃此补丁。可以使用这个脚本确认提交信息是否被正确格式化，或让脚本编辑信息以达到标准化。

下一个在 `git am` 运行期间调用是 `pre-applypatch` 挂钩。该挂钩不接收参数，在补丁被运用之后运行，因此，可以被用来在提交前检查快照。你能用此脚本运行测试，检查工作树。如果有些什么遗漏，或测试没通过，脚本会以非零退出，放弃此次`git am`的运行，补丁不会被提交。

最后在`git am`运行期间调用的是 `post-applypatch` 挂钩。你可以用他来通知一个小组或获取的补丁的作者，但无法阻止打补丁的过程。

#### 3.其他客户端挂钩

**pre-rebase**  
`pre-rebase` 挂钩在衍合前运行，脚本以非零退出可以中止衍合的过程。你可以使用这个挂钩来禁止衍合已经推送的提交对象，`pre-rebase` 挂钩样本就是这么做的。该样本假定next是你定义的分支名，因此，你可能要修改样本，把next改成你定义过且稳定的分支名。

比如说，如果你想彻底禁用rebase操作，你可以使用下面的`pre-rebase`脚本：

```
#!/bin/sh


echo "pre-rebase: Rebasing is dangerous. Don't do it."
exit 1

```

每次运行`git rebase`，你都会看到下面的信息：

```
pre-rebase: Rebasing is dangerous. Don
The pre-rebase hook refused to rebase.

```

内置的`pre-rebase.sample`脚本是一个更复杂的例子。它在何时阻止rebase这方面更加智能。它会检查你当前的分支是否已经合并到了下一个分支中去（也就是主分支）。如果是的话，rebase可能会遇到问题，脚本会放弃这次rebase。

`post-checkout`  
由`git checkout`命令调用，在完成工作区更新之后执行。该脚本由三个参数：之前HEAD指向的引用，新的HEAD指向的引用，一个用于标识此次检出是否是分支检出的值（0表示文件检出，1表示分支检出）。也可以被`git clone`触发调用，除非在克隆时使用参数`--no-checkout`。在由clone调用执行时，三个参数分别为null, 1, 1。这个脚本可以用于为自己的项目设置合适的工作区，比如自动生成文档、移动一些大型二进制文件等，也可以用于检查版本库的有效性。

最后，在 merge 命令成功执行后，`post-merge` 挂钩会被调用。他可以用来在 Git 无法跟踪的工作树中恢复数据，诸如权限数据。该挂钩同样能够验证在 Git 控制之外的文件是否存在，因此，当工作树改变时，你想这些文件可以被复制。

### 服务器端 Hooks

除了客户端挂钩，作为系统管理员，你还可以使用两个服务器端的挂钩对项目实施各种类型的策略。这些挂钩脚本可以在提交对象推送到服务器前被调用，也可以在推送到服务器后被调用。推送到服务器前调用的挂钩可以在任何时候以非零退出，拒绝推送，返回错误消息给客户端，还可以如你所愿设置足够复杂的推送策略。

**pre-receive**  
处理来自客户端的推送（push）操作时最先执行的脚本就是 `pre-receive` 。它从标准输入（stdin）获取被推送引用的列表；如果它退出时的返回值不是0，所有推送内容都不会被接受。利用此挂钩脚本可以实现类似保证最新的索引中不包含非 `fast-forward` 类型的这类效果；抑或检查执行推送操作的用户拥有创建，删除或者推送的权限或者他是否对将要修改的每一个文件都有访问权限。

```py
#!/usr/bin/env python

import sys
import fileinput

# 读取用户试图更新的所有引用
for line in fileinput.input():
    print "pre-receive: Trying to push ref: %s" % line

# 放弃推送
# sys.exit(1)

```

**post-receive**  
`post-receive` 挂钩在整个过程完结以后运行，可以用来更新其他系统服务或者通知用户。它接受与 `pre-receive` 相同的标准输入数据。应用实例包括给某邮件列表发信，通知实时整合数据的服务器，或者更新软件项目的问题追踪系统 —— 甚至可以通过分析提交信息来决定某个问题是否应该被开启，修改或者关闭。该脚本无法组织推送进程，不过客户端在它完成运行之前将保持连接状态；所以在用它作一些消耗时间的操作之前请三思。

\*\* update\*\*  
`update` 脚本和`pre-receive`脚本十分类似。不同之处在于它会为推送者更新的每一个分支运行一次。假如推送者同时向多个分支推送内容，`pre-receive` 只运行一次，相比之下 `update` 则会为每一个更新的分支运行一次。它不会从标准输入读取内容，而是接受三个参数：索引的名字（分支），推送前索引指向的内容的 SHA-1 值，以及用户试图推送内容的 SHA-1 值。如果 update 脚本以退出时返回非零值，只有相应的那一个索引会被拒绝；其余的依然会得到更新。

husky是什么？
---------

husky 是一个 Git Hook 工具。husky 其实就是一个为 git 客户端增加 hook 的工具。将其安装到所在仓库的过程中它会自动在`.git/`目录下增加相应的钩子实现在`pre-commit`阶段就执行一系列流程保证每一个 `commit` 的正确性。部分 `cd`在 `commit stage` 执行的命令可以挪动到本地执行，比如 lint 检查、比如单元测试。当然，`pre-commit` 阶段执行的命令当然要保证其速度不要太慢，每次 `commit` 都等很久也不是什么好的体验。

[husky Github](https://github.com/typicode/husky#readme)

### husky安装

```
npm install husky 

```

```json

{
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
      "pre-push": "npm test",
      "...": "..."
    }
  }
}

```

```
git commit -m 'Keep calm and commit'

```

保留现有的挂钩。需要`Node >= 10`和`Git >= 2.13.0`。

#### 从0.14升级

运行`husky-upgrade`以自动升级您的配置：

```
npx --no-install husky-upgrade

```

您也可以手动执行。将现有的钩子移至`husky.hooks`字段并使用原始Git钩子名称。另外，如果您使用的是`GIT_PARAMS` env 变量，请将其重命名为`HUSKY_GIT_PARAMS`。

```json
{
  "scripts": {
-   "precommit": "npm test",
-   "commitmsg": "commitlint -E GIT_PARAMS"
  },
+ "husky": {
+   "hooks": {
+     "pre-commit": "npm test",
+     "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
+   }
+ }
}

```

从1.0.0开始，husky 可以使用配置`.huskyrc`，`.huskyrc.json`，`.huskyrc.js`或`husky.config.js`文件。

```

{
  "hooks": {
    "pre-commit": "npm test"
  }
}

```

#### 支持的挂钩

Husky支持[此处](https://git-scm.com/docs/githooks)定义的所有Git钩子。服务器端挂钩（`pre-receive`，`update`和`post-receive`）不被支持。

#### 访问Git参数和标准输入

Git挂钩可以通过命令行参数和stdin获取参数。husky 使它们可以通过`HUSKY_GIT_PARAMS`和`HUSKY_GIT_STDIN`环境变量来访问。

可以简单测试一下，你就能看到这些参数其实获取到的就是你输入的message信息

```
"commit-msg": "echo $HUSKY_GIT_PARAMS"

```

#### 跳过所有挂钩（重新定位）

在重新定位期间，您可能希望跳过所有挂钩，可以使用`HUSKY_SKIP_HOOKS`环境变量。

```
HUSKY_SKIP_HOOKS = 1 git rebase ...

```

#### 禁用自动安装

如果您不希望husky自动安装Git挂钩，只需设置`HUSKY_SKIP_INSTALL`环境变量即可。

```
HUSKY_SKIP_INSTALL=1 npm install

```

#### CI服务器

默认情况下，Husky不会安装在CI服务器上。

#### Monorepos

如果您有一个多程序包存储库，建议使用[lerna之类](https://github.com/lerna/lerna)的工具，并且仅将[husky](https://github.com/lerna/lerna)安装在根目录中`package.json`以充当真理的来源。

一般来说，应该避免在多个中定义husky `package.json`，因为每个软件包都会覆盖以前的husky安装。

```shell
.
└── root
    ├── .git
    ├── package.json 🐶 # Add husky here
    └── packages
        ├── A
        │   └── package.json
        ├── B
        │   └── package.json
        └── C
            └── package.json

```

```json

{
  "private": true,
  "devDependencies": {
    "husky": "..."
  },
  "husky": {
    "hooks": {
      "pre-commit": "lerna run test"
    }
  }
}

```

#### 节点版本管理器

如果您使用Windows，那么husky只会使用系统上全局安装的版本。

对于macOS和Linux用户：

*   如果您`git`在终端中运行命令，那么husky将使用shell中定义的版本`PATH`。换句话说，如果您是`nvm`用户，那么husky将使用您设置的版本`nvm`。
*   如果您使用的是GUI客户端和`nvm`，则它可能具有不同的`PATH`而不是未加载`nvm`，在这种情况下，通常会选择`node`安装的最高版本`nvm`。您还可以检查`~/.node_path`以查看GUI使用哪个版本，如果要使用其他版本，也可以进行编辑。

#### 本地命令（〜/.huskyrc）

`~/.huskyrc`如果在运行钩子脚本之前存在该文件，则Husky将提供源文件。您可以使用它来例如加载节点版本管理器或`shell`在挂接前运行一些命令。

```

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

```

#### 多个命令

根据设计，就像scripts在中定义的一样package.json，husky将钩子脚本作为单个命令运行。

```
"pre-commit": "cmd && cmd"

```

也就是说，如果您更喜欢使用数组，建议的方法是在中定义它们`.huskyrc.js`。

```js
const tasks = arr => arr.join(' && ')

module.exports = {
  'hooks': {
    'pre-commit': tasks([
      'cmd',
      'cmd'
    ])
  }
}

```

[npm-run-all](https://github.com/mysticatea/npm-run-all)之类的工具也可以提供帮助。

#### 疑难排解

##### 调试信息

`HUSKY_DEBUG=1` 在运行命令时可以提供其他信息。

```
HUSKY_DEBUG=1 npm install husky --save-dev
HUSKY_DEBUG=1 git commit ...

```

##### 挂钩没有运行

**检查是否安装了hooks（安装完husky后，在项目中查看`.git/hooks/`目录下是否存在多个文件，如果是空文件夹，就代表没有安装成功，需要卸载husky，再次重新安装！！！）**。确认`.git/hooks/pre-commit`存在并且具有hooks代码。它应该以以下内容开头：

```
#!/bin/sh


```

如果没有，您可能在package.json覆盖沙哑的钩子中定义了另一个Git钩子管理器。在安装过程中还要检查输出，您应该看到：

```
husky > Setting up git hooks
husky > Done

```

##### 提交不被阻止

为了阻止提交，`pre-commit`脚本必须以非零的退出代码退出。如果您的提交未被阻止，请检查脚本退出代码。

##### 提交很慢

Husky速度很快，而且提交的时间仅增加了十分之几秒（~0.3s在低端PC上）。因此，这很可能与期间完成了多少操作有关`pre-commit`。您通常可以通过在工具（`babel`，`eslint`等）上使用缓存并使用[`lint-staged`](https://github.com/okonet/lint-staged)来改善此问题。

##### 在新仓库中测试husky

为了找出问题，您还可以创建一个新的仓库：

```
mkdir foo && cd foo
git init && npm init -y
npm install husky --save-dev






```

##### ENOENT错误'node\_modules / husky / .git / hooks'

验证您的Git版本是`>=2.13.0`。
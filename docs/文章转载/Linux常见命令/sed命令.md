---
title: sed命令的常见使用
description: sed命令的主要参数，选项以及用法
---
```

PI=3.141592653589793238462643383249901429
a wood cross!
Actions speak louder than words

#woood #
#woooooood #
AxyzxyzxyzxyzC
I bet this place is really spooky late at night!
Misfortunes never come alone/single.
I shouldn't have lett so tast.

```

*   将包含`the`的所有行中的`o`都替换为`O`

Copy

`[root@localhost ~]# sed '/the/s/o/O/g' test.txt
he was short and fat.
He was wearing a blue polo shirt with black pants.
The home of Football on BBC Sport online.
the tOngue is bOneless but it breaks bOnes.12!
gOOgle is the best tOOls fOr search keywOrd.
The year ahead will test Our pOlitical establishment tO the limit.
PI=3.141592653589793238462643383249901429
a wood cross!
Actions speak louder than words

#woood #
#woooooood #
AxyzxyzxyzxyzC
I bet this place is really spooky late at night!
Misfortunes never come alone/single.
I shouldn't have lett so tast.`

## 迁移符合条件的文本[#](#2030455867)

`H`（复制到剪贴板）
`g、G`（将剪贴板中的数据覆盖/追加至指定行）
`w`（保存为文件）
`r`（读取指定文件）
`a`（追加指定内容）

*   将包含`the`的行迁移至文件末尾，`{;}`用于多个操作

Copy

`[root@localhost ~]# sed '/the/{H;d};$G' test.txt
he was short and fat.
He was wearing a blue polo shirt with black pants.
The home of Football on BBC Sport online.
PI=3.141592653589793238462643383249901429
a wood cross!
Actions speak louder than words

#woood #
#woooooood #
AxyzxyzxyzxyzC
I bet this place is really spooky late at night!
Misfortunes never come alone/single.
I shouldn't have lett so tast.

the tongue is boneless but it breaks bones.12!
google is the best tools for search keyword.
The year ahead will test our political establishment to the limit.`

*   将第`1~5`行内容转移至第`17`行后

Copy

`[root@localhost ~]# sed '1,5{H;d};17G' test.txt
The year ahead will test our political establishment to the limit.
PI=3.141592653589793238462643383249901429
a wood cross!
Actions speak louder than words

#woood #
#woooooood #
AxyzxyzxyzxyzC
I bet this place is really spooky late at night!
Misfortunes never come alone/single.
I shouldn't have lett so tast.

he was short and fat.
He was wearing a blue polo shirt with black pants.
The home of Football on BBC Sport online.
the tongue is boneless but it breaks bones.12!
google is the best tools for search keyword.`

*   将包含`the`的行另存为文件`out.file`

Copy

`[root@localhost ~]# sed '/the/w out.file' test.txt
he was short and fat.
He was wearing a blue polo shirt with black pants.
The home of Football on BBC Sport online.
the tongue is boneless but it breaks bones.12!
google is the best tools for search keyword.
The year ahead will test our political establishment to the limit.
PI=3.141592653589793238462643383249901429
a wood cross!
Actions speak louder than words

#woood #
#woooooood #
AxyzxyzxyzxyzC
I bet this place is really spooky late at night!
Misfortunes never come alone/single.
I shouldn't have lett so tast.`

Copy

`[root@localhost ~]# cat out.file
the tongue is boneless but it breaks bones.12!
google is the best tools for search keyword.
The year ahead will test our political establishment to the limit.`

*   将文件`/etc/hostname`的内容添加到包含`the`的每行以后

Copy

`[root@localhost ~]# sed '/the/r /etc/hostname' test.txt
he was short and fat.
He was wearing a blue polo shirt with black pants.
The home of Football on BBC Sport online.
the tongue is boneless but it breaks bones.12!
localhost.localdomain
google is the best tools for search keyword.
localhost.localdomain
The year ahead will test our political establishment to the limit.
localhost.localdomain
PI=3.141592653589793238462643383249901429
a wood cross!
Actions speak louder than words

#woood #
#woooooood #
AxyzxyzxyzxyzC
I bet this place is really spooky late at night!
Misfortunes never come alone/single.
I shouldn't have lett so tast.`

*   在第`3`行后插入一个新行,内容为`New`

Copy

`[root@localhost ~]# sed '3aNew' test.txt
he was short and fat.
He was wearing a blue polo shirt with black pants.
The home of Football on BBC Sport online.
New
the tongue is boneless but it breaks bones.12!
google is the best tools for search keyword.
The year ahead will test our political establishment to the limit.
PI=3.141592653589793238462643383249901429
a wood cross!
Actions speak louder than words

#woood #
#woooooood #
AxyzxyzxyzxyzC
I bet this place is really spooky late at night!
Misfortunes never come alone/single.
I shouldn't have lett so tast.`

*   在包含`the`的每行后插入一个新行，内容为`New`

Copy

`[root@localhost ~]# sed '/the/aNew' test.txt
he was short and fat.
He was wearing a blue polo shirt with black pants.
The home of Football on BBC Sport online.
the tongue is boneless but it breaks bones.12!
New
google is the best tools for search keyword.
New
The year ahead will test our political establishment to the limit.
New
PI=3.141592653589793238462643383249901429
a wood cross!
Actions speak louder than words

#woood #
#woooooood #
AxyzxyzxyzxyzC
I bet this place is really spooky late at night!
Misfortunes never come alone/single.
I shouldn't have lett so tast.`

*   在第`3`行后插入多行内容，中间的`\n`表示换行

Copy

`[root@localhost ~]# sed '3aNew1\nNew2' test.txt
he was short and fat.
He was wearing a blue polo shirt with black pants.
The home of Football on BBC Sport online.
New1
New2
the tongue is boneless but it breaks bones.12!
google is the best tools for search keyword.
The year ahead will test our political establishment to the limit.
PI=3.141592653589793238462643383249901429
a wood cross!
Actions speak louder than words

#woood #
#woooooood #
AxyzxyzxyzxyzC
I bet this place is really spooky late at night!
Misfortunes never come alone/single.
I shouldn't have lett so tast.`

## 使用脚本编辑文件[#](#3274701152)

将多个编辑指令存放到文件中（每行一条编辑指令），通过`-f`选项来调用

*   将第`1~5`行内容转移至第`17`行后，以上操作可以改用脚本文件方式：

Copy

`[root@localhost ~]# vim opt.list
1,5H
1,5d
17G`

Copy

`[root@localhost ~]# sed -f opt.list test.txt
The year ahead will test our political establishment to the limit.
PI=3.141592653589793238462643383249901429
a wood cross!
Actions speak louder than words

#woood #
#woooooood #
AxyzxyzxyzxyzC
I bet this place is really spooky late at night!
Misfortunes never come alone/single.
I shouldn't have lett so tast.

he was short and fat.
He was wearing a blue polo shirt with black pants.
The home of Football on BBC Sport online.
the tongue is boneless but it breaks bones.12!
google is the best tools for search keyword.`

## 直接操作文件示例[#](#3744993744)

Copy

`#!/bin/bash
# 指定样本文件路径、配置文件路径
SAMPLE="/usr/share/doc/vsftpd-3.0.2/EXAMPLE/INTERNET_SITE/vsftpd.conf"
CONFIG="/etc/vsftpd/vsftpd.conf"
# 备份原来的配置文件,检测文件名为/etc/vsftpd/vsftpd.conf.bak 备份文件是否存在, 若不存在则使用 cp 命令进行文件备份
[ ! -e "$CONFIG.bak" ] && cp $CONFIG $CONFIG.bak
# 基于样本配置进行调整,覆盖现有文件
sed -e '/^anonymous_enable/s/YES/NO/g' $SAMPLE > $CONFIG
sed -i -e '/^local_enable/s/NO/YES/g' -e '/^write_enable/s/NO/YES/g' $CONFIG
grep "listen" $CONFIG || sed -i '$alisten=YES' $CONFIG
# 启动vsftpd 服务,并设为开机后自动运行
systemctl restart vsftpd
systemctl enable vsftpd`

分类: [Linux](https://www.cnblogs.com/llife/category/1525981.html)

标签: [Shell Script](https://www.cnblogs.com/llife/tag/Shell%20Script/)
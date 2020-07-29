<!--
 * @Author: 中箭的吴起
 * @Date: 2020-07-29 22:00:31
 * @LastEditTime: 2020-07-29 22:00:31
 * @LastEditors: 中箭的吴起
 * @Description: 
 * @FilePath: \solider245.github.io\docs\Pyhton\转载\四十四、Python的os模块的文件与目录常用方法.md
 * @日行一善，每日一码
--> 
Python的os模块提供了非常丰富的方法用来处理文件和目录。下面介绍在os模块中常用的方法。

![四十四、Python的os模块的文件与目录常用方法](http://p6-tt.byteimg.com/large/pgc-image/7e81bd0191cf4109ab6d799ed9252fb4?from=pc)

os模块中常用的方法

# os.access(path, mode)

*   方法说明

os.access(path,mode)方法使用当前的uid/gid尝试访问路径。大部分操作使用有效的uid/gid，因此运行环境可以在suid/sgid环境尝试。

*   语法 os.access(path,mode)
*   参数说明

*   path: 要用来检测是否有访问权限的路径
*   mode: mode为F\_OK用来测试路径是否存在，或者它可以是包含R\_OK, W\_OK或X\_OK或其中之一，或者更多。

*   os.F\_OK: 作为access()的mode参数，用来测试path路径是否存在
*   os.R\_OK: 包含在access()的mode参数中，测试path是否可读
*   os.W\_OK: 包含在access()的mode参数中，测试path是否可写
*   os.X\_OK: 包含在access()的mode参数中，测试path是否可执行

*   返回值： 如果文件允许访问返回True, 否则返回False

*   实例：

```
import os, sys# 假定/tmp/test.txt文件存在，并有读写权限print(f'F_OK: {os.access('/tmp/test.txt', os.F_OK)}')print(f'R_OK: {os.access('/tmp/test.txt', os.R_OK)}')print(f'W_OK: {os.access('/tmp/test.txt', os.W_OK)}')print(f'X_OK: {os.access('/tmp/test.txt', os.X_OK)}')
```

# os.chdir(path)

*   方法说明:

*   os.chdir(path)用于改变当前的工作目录到指定的路径。

*   参数说明path: 要切换的新路径

*   返回值： 如果允许访问返回True, 否则返回False
*   示例

```
import os, syspath = '/tmp'# 查看当前的工作目录print(f'当的的工作目录是：{os.getcwd()}')# 修改当前的工作目录os.chdir(path)# 查看修改后的工作目录print(f"修改后的工作目录是：{os.getcwd()}")
```

# os.chmod(path, mode)

*   函数说明

*   os.chmod(path, mode)用于更改文件或目录的权限

*   语法格式

```
os.chmod(path, mode)
```

*   参数说明

*   path: 文件名路径或目录路径
*   可用以下选项按位或操作生成， 目录的读权限表示可以获取目录里文件名列表， ，执行权限表示可以把工作目录切换到此目录 ，删除添加目录里的文件必须同时有写和执行权限 ，文件权限以用户id\->组id\->其它顺序检验,最先匹配的允许或禁止权限被应用。

*   **stat.S\_IXOTH:** 其他用户有执行权0o001
*   **stat.S\_IWOTH:** 其他用户有写权限0o002
*   **stat.S\_IROTH:** 其他用户有读权限0o004
*   **stat.S\_IRWXO:** 其他用户有全部权限(权限掩码)0o007
*   **stat.S\_IXGRP:** 组用户有执行权限0o010
*   **stat.S\_IWGRP:** 组用户有写权限0o020
*   **stat.S\_IRGRP:** 组用户有读权限0o040
*   **stat.S\_IRWXG:** 组用户有全部权限(权限掩码)0o070
*   **stat.S\_IXUSR:** 拥有者具有执行权限0o100
*   **stat.S\_IWUSR:** 拥有者具有写权限0o200
*   **stat.S\_IRUSR:** 拥有者具有读权限0o400
*   **stat.S\_IRWXU:** 拥有者有全部权限(权限掩码)0o700
*   **stat.S\_ISVTX:** 目录里文件目录只有拥有者才可删除更改0o1000
*   **stat.S\_ISGID:** 执行此文件其进程有效组为文件所在组0o2000
*   **stat.S\_ISUID:** 执行此文件其进程有效用户为文件所有者0o4000
*   **stat.S\_IREAD:** windows下设为只读
*   **stat.S\_IWRITE:** windows下取消只读

*   示例

```
import os, sys, stat# 侯宇/tmp/test.txt文件存在，设置文件可以通过用户组执行os.chmod('/tmp/test.txt', stat.S_IXGRP)# 设置文件可以被其他用户写入os.chmod('/tmp/test.txt', stat.S_IWOTH)
```

# os.chown(path, uid, gid)

*   函数说明

*   os.chown() 方法用于更改文件所有者，如果不修改可以设置为 \-1, 你需要超级用户权限来执行权限修改操作。只支持在 Unix 下使用。

*   语法格式

```
os.chown(path, uid, gid)
```

*   参数说明

*   path: 设置权限的文件路径
*   uid: 所属用户id
*   gid: 所属用户组id

*   示例

```
import os, sys# 假定文件/tmp/test.txt文件存在，设置所有者id为100os.chown('/tmp/test.txt', 100, -1)
```

# os.chroot(path)

*   函数说明

*   方法用于更改当前进程的根目录为指定的目录，使用该函数需要管理员权限。

*   语法格式

```
os.chroot(path)
```

*   代码示例

```
import os, sys# 设置根目录为/tmpos.chroot('/tmp')
```

# os.getcwd()

*   函数说明

*   方法用于返回当前工作目录。

*   语法格式

```
os.getcwd()
```

*   示例

```
import os, sys# 切换工作目录os.chdir('/home')# 打印当前的工作目录print(f"当前的工作目录是：{os.getcwd()}")
```

# os.listdir(path)

*   函数说明

*   os.listdir() 方法用于返回指定的文件夹包含的文件或文件夹的名字的列表。这个列表以字母顺序。 它不包括 '.' 和'..' 即使它在文件夹中。只支持在 Unix, Windows 下使用。

*   语法格式

```
os.listdir(path)
```

*   示例

```
import os, syspath = '/home/mydocument'dirs = os.listdir(path)# 列出所有文件和文件目录for file in dirs:  print(file)
```

# os.mkdirs(path\[,mode=0o777)

*   函数说明

*   os.makedirs() 方法用于递归创建目录。像 mkdir(), 但创建的所有intermediate\-level文件夹需要包含子目录。

*   参数说明

*   path: 需要递归创建的目录
*   mode: 权限模式

*   代码示例

```
import os, sys# 创建的目录path = '/home/dir/dir1/dir2/dir3'os.mkdirs(path, 0755)
```

# os.mkdir(path, mode)

*   函数说明

*   os.mkdir() 方法用于以数字权限模式创建目录。默认的模式为 0777 (八进制)

*   参数说明

*   path: 要创建的目录
*   mode: 要为目录设置的权限数字模式

*   示例

```
import os, sys# 创建的目录path = '/home/test'os.mkdir(path, 0755)
```

# os.remove(path)

*   函数说明

*   os.remove() 方法用于删除指定路径的文件。如果指定的路径是一个目录，将抛出OSError。在Unix, Windows中有效。

*   示例

```
import os, sys# 列出目录print(f"目录为:{os.listdir(os.getcwd())}")# 删除文件os.remove('test.txt')# 列出移除目录print(f"移除文件后的目录为:{os.listdir(os.getcwd())}")
```

# os.removedirs(path)

*   函数说明

*   os.removedirs() 方法用于递归删除目录。像rmdir(), 如果子文件夹成功删除, removedirs()才尝试它们的父文件夹,直到抛出一个error(它基本上被忽略,因为它一般意味着你文件夹不为空)。

*   示例

```
import os, sys# 列出目录print(f"目录为:{os.listdir(os.getcwd())}")# 移除目录及子目录os.removedirs('/home/test')# 列出移除后的目录print(f"移除目录后:{os.listdir(os.getcwd())}")
```

# os.rename(src, dst)

*   函数说明

*   方法用于命名文件或目录，从 src 到 dst,如果dst是一个存在的目录, 将抛出OSError。

*   参数说明

*   **src** \-\- 要修改的目录名
*   **dst** \-\- 修改后的目录名

*   示例

```
import os, sys# 列出目录print(f"目录为：{os.listdir(os.getcwd())}")# 重命名os.rename('test', 'testnew')# 列出重命名后的目录文件print(f"目录为：{os.listdir(os.getcwd())}")
```

# os.rmdir(path)

*   函数说明

*   方法用于删除指定路径的目录。仅当这文件夹是空的才可以, 否则, 抛出OSError。

*   示例

```
import os, sys# 列出目录print (f"目录为: {os.listdir(os.getcwd())}")# 删除路径os.rmdir("mydir")# 列出删除空目录后的文件列表print (f"目录为: {os.listdir(os.getcwd())}")
```

# 后话

由于篇幅所限，仅简单介绍了os模块中常用的文件操作方法。有关fd(文件描述的相关方法)在这里没有介绍，如果有需要，请自行查阅Python官方文档。
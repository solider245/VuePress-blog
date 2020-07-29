---
title: 终端执行git 命令，无权限读写的问题
description: git权限问题一般是因为root创建了一些文件其他用户无权读写
---

# 终端执行git 命令，无权限读写的问题

>这个问题比较常见，所以有必要在这里写一下


## 现象原因
使用`git pull`更新时，无法在本地更新或者创立文件.报错如下

```shell
warning: unable to access '/Users/Mac/.config/git/attributes': Permission denied
```

![20200729175113_aa91ebea57a69e702638e2d6989b2b44.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729175113_aa91ebea57a69e702638e2d6989b2b44.png)

网图如上。
## 查找原因
在报错的上级目录输入`ls -al`，查看文件的所有者和用户。

![20200729175238_7d4831d20231ad90bf2b853c52f26670.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729175238_7d4831d20231ad90bf2b853c52f26670.png)

如上图所示，因为`.config`文件的用户是root，普通用户无法修改，所以就报错。有时候也可能是别的文件。

## 解决办法

更改文件的用户权限即可。

```shell
sudo chown <用户名:用户组> <文件或者文件夹>
#sudo chown -R solider:solider docs # 这里放一个例子docs改为你的实际文件
```
用户名记得改成你现在使用的用户名。

### 其他解决办法
如果你没有将自己添加到拥有 `.git/`的组，那么你应该。


```shell

sudo usermod -a -G $(stat -c '%G'. git) $USER

sudo chmod g+u. git -R

sudo chmod g+u. gitignore

su - $USER

```

这样做的目的：

*   找出哪个组拥有 `.git/` 并将你的用户添加到该组。
*   确保组成员具有与 `.git/`的所有者相同的权限。
*   对 `.gitignore` 重复这里操作，你可能需要
*   将你注销并重新登录以刷新组成员身份文件权限

如果刚刚做了这样的( 将自己添加到拥有 `.git/`的组)，那么你需要在你能够在 `git pull` 中写入 `.git/FETCH_HEAD` 之前注销和返回。

## 产生问题的原因

光会解决问题不够，还要知道问题产生的原因。一般出现这种情况大多数是因为你在执行的时候加了sudo或者是直接使用root来clone或者生成了文件。这导致文件的所有者变成了root，而你作为普通用户要修改自然没有权限。



## 参考文献
[解决使用终端执行git 命令，无权限读写的问题](https://www.jianshu.com/p/49599164b22e)
[git - github尝试使用错误进行 git pull: 无法打开git/fetch_head: 权限被拒绝](https://kb.kutu66.com/others/post_13468346)

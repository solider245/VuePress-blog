---
titile : 使用linux下的crontab定时任务跑定时脚本
---
# 使用linux下的crontab定时任务跑定时脚本

tags:定时任务 定时脚本 crontab linux定时脚本 linux

---

> 引言：应该有许多人曾经很好奇一些定时脚本是怎么做出来的。我们这次就来说一下定时脚本的那些事，其实网上教程多得很，我就来蹭一下热度吧。

## crond

> *我们经常用windows，但是估计很多人都不知道windows下面有一个计划任务，可以定时的执行一些任务。其实windows下面有好多小功能，对于程序员来说很有用，比如创建一个批处理可以帮助我们一次性打开我们需要的所有环境软件,定时任务可以定时备份数据库等等。*

同样的 在linux下也有用来周期性执行任务的工具，它就是crond。它会随linux一起安装，并默认自动启动。它定时执行的最小粒度是1分钟，也就是说crond进程每分钟会定期检查是否有要执行的任务，如果有要执行的任务，则自动执行该任务。
它的代码如下

```
#crontab -u <-l, -r, -e>
Options:
 -u <user>  define user //指定一个用户
 -e         edit user's crontab //编辑某个用户的任务
 -l         list user's crontab //列出某个用户的任务计划
 -r         delete user's crontab //删除某个用户的任务
 -i         prompt before deleting
 -n <host>  set host in cluster to run users' crontabs
 -c         get host in cluster to run users' crontabs
 -s         selinux context
 -x <mask>  enable debugging

```

### 检查服务是否在运行

```

    sevice crond status //如果输出的有个"active(running)"（这两个单词是绿色的，上面一行还有个小绿点）证明正在运行中
    sevice crond start //如果没有运行这个命令可以启动

    service crond stop //关闭服务

    service crond restart //重启服务

    service crond reload //重新载入配置

```

### 创建一个定时任务

可以通过crontab \-e命令来编辑定时任务，也可以直接编辑文件。文件位置有两个

1.  系统配置文件（主配置文件）位置 /etc/crontab
2.  用户配置文件位置/var/spool/cron，文件名和此用户同名，此用户的cron信息都记录在这个文件中
    打开后大概这个样子

```

SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root

# For details see man 4 crontabs

# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name  command to be executed

```

不得不佩服人家用文档都能写出图片的效果来。看上图已经很明白了

格式为：
分 小时 每个月的哪一天 月 每周的哪一天 用户名(*可省略*） 要执行的命令

*   “\*” 代表取值范围内的数字
*   “/” 代表”每”
*   “\-” 代表从某个数字到某个数字
*   “,” 分开几个离散的数字
    比如我们拿定时执行pwd和一个php脚本来说明

```

20 6 * * * pwd 每天的 6:20 执行pwd命令
20 6 8 6 * pwd 每年的6月8日6:20执行pwd命令
20 6 * * 0 pwd 每星期日的6:20执行pwd命令//注：国外周日是第一天 0表示星期天，1表示星期1，或按照上面代码中写引文。
    //字符用法
20 3 10,20 * * pwd 每月10号及20号的3：20执行pwd命令(注：“，”用来连接多个不连续的时段)
25 8-10 * * * pwd 每天8-10点的第25分钟执行pwd命令(注：“-”用来连接连续的时段)
*/15 * * * * pwd 每15分钟执行一次pwd命令 (每个小时的第15 20 45 60分钟执行pwd命令)
20 6 */10 * * pwd 每个月中，每隔10天6:20执行一次pwd命令(这个好像用的很少，每隔几天的不知道怎么写，实在不行可以多建立几个，我也没用到过，如果有用到多的欢迎补充)

下面来一个执行php脚本的例子（敲黑板，划重点了）

//和命令行中执行php文件是一样的（如果你用的是框架 还支持路由哦）脚本里面想干啥就干啥
*/15 * * * * /opt/app/php-5.5/bin/php /data/www/我是项目目录/index.php 我是脚本目录/我是执行的文件

```

## 查看日志

/var/log/cron.log这个文件就可以，可以用tail \-f /var/log/cron.log动态观察，也可以用cat或者导出文件查看均可

简单教程到此结束，如果需要更高级的应用，就需要自己动手了。

```
              ---还有一句老话，欢迎评论交流
```

希望大家多评论交流，互相学习
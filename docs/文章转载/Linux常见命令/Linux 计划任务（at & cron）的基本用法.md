---
title: Linux 计划任务（at & cron）的基本用法
---
**一、单次计划任务（at）**
----------------

### **1.1 命令用法**

    at [选项] [时间]

![](https://pic2.zhimg.com/v2-941b065435d41096c2732478db7d4f0e_b.jpg)



在添加计划任务时，`at` 会从标准输入读取任务内容，可以输入多条命令，输入完成后，另起一个空行，按 `Ctrl+D` 结束输入。输入的命令会被自动转化为脚本。详情请看下面的例子。

*   请确保 `atd` 服务已经启用，否则计划任务不能执行。

### **1.2 常用的时间格式（精确到分钟）**

**1.2.1 绝对时间**

    <时>:<分>

或

    <时>:<分> <年>-<月>-<日>

例

    12:00

或

    05:20 2017-05-20

**1.2.2 相对时间**

    <绝对时间> +<偏移量> <偏移单位>
    #偏移单位有：minutes, hours, days, weeks

例

    now +2 hours    #两小时后
    23:00 +30 minutes   #23:00 再过 30 分钟

### **1.3 举例**

添加计划任务

    [root: ~]# at 08:24
    
    at> sleep 5    
    at> <EOT>   #输入完成后另起一个空行，然后输入 Ctrl+D
    
    job 3 at Tue May 16 08:24:00 2017
    #计划任务被指定为 3 号

查看计划任务

列出所有的计划任务

    [root: ~]# at -l
    
    3   Tue May 16 08:24:00 2017 a root

查看指定序号计划任务的脚本内容

    [root: ~]# at -c 3
    
    #!/bin/sh
    # atrun uid=0 gid=0
    # mail root 0
    umask 22
    
    ... #省略多行
    
    
    cd /root || {
         echo 'Execution directory inaccessible' >&2
         exit 1
    }
    ${SHELL:-/bin/sh} << 'marcinDELIMITER38168611'
    sleep 5
    
    marcinDELIMITER38168611
    #真正的任务内容在最后面

删除计划任务

    [root: ~]# at -d 3

确认是否删除成功

    [root: ~]# at -c 3
    
    Cannot find jobid 3 #不能找到相应编号的计划任务说明成功了

**二、周期计划任务（crontab）**
---------------------

### **2.1 命令用法**

    crontab [选项]

![](https://pic3.zhimg.com/v2-68f18644d18ed3b8182830847cc01e2f_b.jpg)



如果不加任何选项直接运行 `crontab`，就会跟上面的 `at` 命令一样从标准输入接收配置，但是这会导致已存在的计划任务列表被覆盖，这是非常危险的事情！不推荐使用此方法添加计划任务，除非计划任务列表为空。

*   请确保 `crond` 服务已经启用，否则计划任务不能执行。

计划任务条目格式

![](https://pic2.zhimg.com/v2-0cb40a83262738254799b44c62bf43a4_b.jpg)



第一列至第五列为时间段，`*` 表示所有时间，`-` 表示一段连续的时间，`,` 表示不连续的时间，`/` 表示间隔的时间。

时间格式举例

![](https://picb.zhimg.com/v2-645f2be172e9148f0515836fc83d4c7d_b.jpg)



**2.2 举例**

列出计划任务

    [root: ~]# crontab -l
    
    1   *   *   *   *   python /opt/iredapd/tools/cleanup_db.py >/dev/null  #每小时 01 分执行
    */30   *   *   *   *   python /opt/iredapd/tools/spf_to_greylist_whitelists.py >/dev/null   #每半小时执行
    1   2   *   *   *   python /var/www/iredadmin/tools/cleanup_amavisd_db.py >/dev/null    #每天 2:01 执行
    1   *   *   *   *   python /var/www/iredadmin/tools/cleanup_db.py >/dev/null 2>&1   #每小时 01 分执行
    2   2   *   *   *   /usr/bin/php /var/www/roundcubemail/bin/cleandb.sh >/dev/null   #每天 2:02 执行
    2   2   *   *   *   /usr/bin/php /var/www/roundcubemail/bin/gc.sh >/dev/null    #每天 2:02 执行
    1   */1   *   *   *   /usr/bin/perl /usr/share/awstats/wwwroot/cgi-bin/awstats.pl -update -config=web >/dev/null    #每小时 01 分执行
    1   */1   *   *   *   /usr/bin/perl /usr/share/awstats/wwwroot/cgi-bin/awstats.pl -update -config=smtp >/dev/null   #每小时 01 分执行

编辑计划任务

    [root: ~]# crontab -e

执行完该命令之后，系统会打开一个 vi 文本编辑器来编辑计划任务列表，编辑完成之后请记得保存。

如果没有语法错误，系统会给出提示。

    crontab: installing new crontab

这样计划任务就生效了。
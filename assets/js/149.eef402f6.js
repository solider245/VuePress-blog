(window.webpackJsonp=window.webpackJsonp||[]).push([[149],{496:function(t,v,_){"use strict";_.r(v);var r=_(25),n=Object(r.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h2",{attrs:{id:"cron介绍与crontab的使用"}},[t._v("cron介绍与crontab的使用")]),t._v(" "),_("p",[t._v("linux内置的cron进程能帮我们实现这些需求，cron搭配shell脚本，非常复杂的指令也没有问题。")]),t._v(" "),_("h3",{attrs:{id:"cron介绍"}},[t._v("cron介绍")]),t._v(" "),_("p",[t._v("我们经常使用的是crontab命令是cron table的简写，它是cron的配置文件，也可以叫它作业列表，我们可以在以下文件夹内找到相关配置文件。")]),t._v(" "),_("ul",[_("li",[t._v("/var/spool/cron/ 目录下存放的是每个用户包括root的crontab任务，每个任务以创建者的名字命名")]),t._v(" "),_("li",[t._v("/etc/crontab 这个文件负责调度各种管理和维护任务。")]),t._v(" "),_("li",[t._v("/etc/cron.d/ 这个目录用来存放任何要执行的crontab文件或脚本。")]),t._v(" "),_("li",[t._v("我们还可以把脚本放在/etc/cron.hourly、/etc/cron.daily、/etc/cron.weekly、/etc/cron.monthly目录中，让它每小时/天/星期、月执行一次。")])]),t._v(" "),_("h3",{attrs:{id:"crontab的使用"}},[t._v("crontab的使用")]),t._v(" "),_("p",[t._v("我们常用的命令如下：")]),t._v(" "),_("p",[t._v("crontab [-u username]　　　　//省略用户表表示操作当前用户的crontab\n-e      (编辑工作表)\n-l      (列出工作表里的命令)\n-r      (删除工作作)")]),t._v(" "),_("p",[t._v("我们用"),_("strong",[t._v("crontab -e")]),t._v("进入当前用户的工作表编辑，是常见的vim界面。每行是一条命令。")]),t._v(" "),_("p",[t._v("crontab的命令构成为 时间+动作，其时间有"),_("strong",[t._v("分、时、日、月、周")]),t._v("五种，操作符有")]),t._v(" "),_("ul",[_("li",[_("strong",[t._v("*")]),t._v(" 取值范围内的所有数字")]),t._v(" "),_("li",[_("strong",[t._v("/")]),t._v(" 每过多少个数字")]),t._v(" "),_("li",[_("strong",[t._v("-")]),t._v(" 从X到Z")]),t._v(" "),_("li",[t._v("**，**散列数字")])]),t._v(" "),_("hr"),t._v(" "),_("h2",{attrs:{id:"实例"}},[t._v("实例")]),t._v(" "),_("p",[t._v("--")]),t._v(" "),_("h3",{attrs:{id:"实例1：每1分钟执行一次mycommand"}},[t._v("实例1：每1分钟执行一次myCommand")]),t._v(" "),_("p",[t._v("* * * * * myCommand")]),t._v(" "),_("h3",{attrs:{id:"实例2：每小时的第3和第15分钟执行"}},[t._v("实例2：每小时的第3和第15分钟执行")]),t._v(" "),_("p",[t._v("3,15 * * * * myCommand")]),t._v(" "),_("h3",{attrs:{id:"实例3：在上午8点到11点的第3和第15分钟执行"}},[t._v("实例3：在上午8点到11点的第3和第15分钟执行")]),t._v(" "),_("p",[t._v("3,15 8-11 * * * myCommand")]),t._v(" "),_("h3",{attrs:{id:"实例4：每隔两天的上午8点到11点的第3和第15分钟执行"}},[t._v("实例4：每隔两天的上午8点到11点的第3和第15分钟执行")]),t._v(" "),_("p",[t._v("3,15 8-11 */2  *  * myCommand")]),t._v(" "),_("h3",{attrs:{id:"实例5：每周一上午8点到11点的第3和第15分钟执行"}},[t._v("实例5：每周一上午8点到11点的第3和第15分钟执行")]),t._v(" "),_("p",[t._v("3,15 8-11 * * 1 myCommand")]),t._v(" "),_("h3",{attrs:{id:"实例6：每晚的21-30重启smb"}},[t._v("实例6：每晚的21:30重启smb")]),t._v(" "),_("p",[t._v("30 21 * * * /etc/init.d/smb restart")]),t._v(" "),_("h3",{attrs:{id:"实例7：每月1、10、22日的4-45重启smb"}},[t._v("实例7：每月1、10、22日的4 : 45重启smb")]),t._v(" "),_("p",[t._v("45 4 1,10,22 * * /etc/init.d/smb restart")]),t._v(" "),_("h3",{attrs:{id:"实例8：每周六、周日的1-10重启smb"}},[t._v("实例8：每周六、周日的1 : 10重启smb")]),t._v(" "),_("p",[t._v("10 1 * * 6,0 /etc/init.d/smb restart")]),t._v(" "),_("h3",{attrs:{id:"实例9：每天18-00至23-00之间每隔30分钟重启smb"}},[t._v("实例9：每天18 : 00至23 : 00之间每隔30分钟重启smb")]),t._v(" "),_("p",[t._v("0,30 18-23 * * * /etc/init.d/smb restart")]),t._v(" "),_("h3",{attrs:{id:"实例10：每星期六的晚上11-00-pm重启smb"}},[t._v("实例10：每星期六的晚上11 : 00 pm重启smb")]),t._v(" "),_("p",[t._v("0 23 * * 6 /etc/init.d/smb restart")]),t._v(" "),_("h3",{attrs:{id:"实例11：每一小时重启smb"}},[t._v("实例11：每一小时重启smb")]),t._v(" "),_("p",[t._v("* */1 * * * /etc/init.d/smb restart")]),t._v(" "),_("h3",{attrs:{id:"实例12：晚上11点到早上7点之间，每隔一小时重启smb"}},[t._v("实例12：晚上11点到早上7点之间，每隔一小时重启smb")]),t._v(" "),_("p",[t._v("* 23-7/1 * * * /etc/init.d/smb restart")])])}),[],!1,null,null,null);v.default=n.exports}}]);
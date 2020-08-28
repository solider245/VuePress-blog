(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{555:function(s,e,t){"use strict";t.r(e);var a=t(25),n=Object(a.a)({},(function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"命令行界面，用于使用speedtest-net测试internet带宽"}},[s._v("命令行界面，用于使用speedtest.net测试Internet带宽")]),s._v(" "),t("blockquote",[t("p",[s._v("命令行界面，用于使用speedtest.net测试Internet带宽\nspeedtest-cli适用于Python 2.4-3.7")])]),s._v(" "),t("h2",{attrs:{id:"安装方式"}},[s._v("安装方式")]),s._v(" "),t("h3",{attrs:{id:"pip或者python安装"}},[s._v("pip或者python安装")]),s._v(" "),t("p",[t("strong",[s._v("pip / easy_install")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("pip "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" speedtest-cli\neasy_install speedtest-cli\npip "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" git+https://github.com/sivel/speedtest-cli.git "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#从github安装")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("以上三种方式皆可，还有源码安装")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone https://github.com/sivel/speedtest-cli.git\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" speedtest-cli\npython setup.py "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h3",{attrs:{id:"软件包安装-推荐安装"}},[s._v("软件包安装(推荐安装)")]),s._v(" "),t("p",[s._v("ubuntu\n"),t("code",[s._v("apt install speedtest-cli")])]),s._v(" "),t("p",[s._v("其他版本我没测过，理论上应该都有。")]),s._v(" "),t("h3",{attrs:{id:"直接下载源码文件并修改文件权限chmod-x-speedtest-cli"}},[s._v("直接下载源码文件并修改文件权限chmod +x speedtest-cli")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -O speedtest-cli https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# curl -Lo speedtest-cli https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" +x speedtest-cli\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("blockquote",[t("p",[s._v("上面这个方法我报错了，也不推荐大家使用")])]),s._v(" "),t("h2",{attrs:{id:"运行"}},[s._v("运行")]),s._v(" "),t("h3",{attrs:{id:"默认测速命令"}},[s._v("默认测速命令")]),s._v(" "),t("p",[t("code",[s._v("speedtest-cli")]),s._v(" "),t("img",{attrs:{src:"https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729182124_953c952bb8ff676bdb2ecd11156eeb0d.png",alt:"20200729182124_953c952bb8ff676bdb2ecd11156eeb0d.png"}}),s._v("\n直接输入命令即可。")]),s._v(" "),t("h3",{attrs:{id:"生成测速图片"}},[s._v("生成测速图片")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("speedtest --share "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 生成一张测速图片")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729183821_4d71abef6ca3531174604d971a37537b.png",alt:"20200729183821_4d71abef6ca3531174604d971a37537b.png"}})]),s._v(" "),t("p",[s._v("买的腾讯的服务器，只能说牛了！")]),s._v(" "),t("h3",{attrs:{id:"测试中国节点"}},[s._v("测试中国节点")]),s._v(" "),t("blockquote",[t("p",[t("strong",[s._v("speedtest中国节点")])])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("speedtest --list"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'China'")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729184307_24cfe3a07c0c0172fee9edfeb6c50786.png",alt:"20200729184307_24cfe3a07c0c0172fee9edfeb6c50786.png"}})]),s._v(" "),t("h3",{attrs:{id:"仅仅需要ping，上传，下载的结果"}},[s._v("仅仅需要Ping，上传，下载的结果")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("speedtest --simple\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200729185907_5d450fd532d35dab0fd8adc858698bc1.png",alt:"20200729185907_5d450fd532d35dab0fd8adc858698bc1.png"}})]),s._v(" "),t("h2",{attrs:{id:"常见报错"}},[s._v("常见报错")]),s._v(" "),t("ul",[t("li",[t("blockquote",[t("p",[s._v("权限问题\n使用sudo或者切换到root解决\n个人推荐，如果你的服务器安装了Python的话，那么直接使用python安装会好很多")])])]),s._v(" "),t("li",[t("blockquote",[t("p",[s._v("路径问题\n下一步，把可执行的脚本移动到/usr/bin文件夹，这样你就不用每次都输入完整的脚本路径了。")])])])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("sudo mv speedtest_cli.py /usr/bin/\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("ul",[t("li",[t("blockquote",[t("p",[s._v("运行没反应\n有可能是你的运行方式有问题，使用以下两种方式来解决。")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("//第一种方式\n$ ./speedtest-cli\n//第二种方式\n$ python speedtest-cli\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])])])]),s._v(" "),t("h2",{attrs:{id:"其他测速软件"}},[s._v("其他测速软件")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/steve-yuan-8276/pic-blog@master/uPic/RgIWAG20200212.png",alt:""}})]),s._v(" "),t("h2",{attrs:{id:"参考文献"}},[s._v("参考文献")]),s._v(" "),t("p",[t("a",{attrs:{href:"https://www.jianshu.com/p/04e41c97444a",target:"_blank",rel:"noopener noreferrer"}},[s._v("Linux 命令行下测速"),t("OutboundLink")],1),s._v(" "),t("a",{attrs:{href:"https://www.livelu.com/201801291.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("linux命令行下使用speedtest测速"),t("OutboundLink")],1),s._v(" "),t("a",{attrs:{href:"https://steveyuan.work/2020/02/12/linuxNote-commandlinePart1/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Linux命令行学习笔记｜网络测速开源工具"),t("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=n.exports}}]);
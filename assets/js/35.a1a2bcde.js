(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{438:function(s,t,e){"use strict";e.r(t);var a=e(25),r=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("p"),e("div",{staticClass:"table-of-contents"},[e("ul",[e("li",[e("a",{attrs:{href:"#阅读准备"}},[s._v("阅读准备")])]),e("li",[e("a",{attrs:{href:"#_1-创建网络接口"}},[s._v("1\\. 创建网络接口")])]),e("li",[e("a",{attrs:{href:"#_2-创建redis服务"}},[s._v("2\\. 创建Redis服务")])]),e("li",[e("a",{attrs:{href:"#_3-创建mysql服务"}},[s._v("3\\. 创建mysql服务")])]),e("li",[e("a",{attrs:{href:"#_4-创建pyspider的scheduler服务"}},[s._v("4\\. 创建pyspider的scheduler服务")])]),e("li",[e("a",{attrs:{href:"#_5-使用docker-compose创建pyspider的其它组件"}},[s._v("5\\. 使用docker\\-compose创建pyspider的其它组件")])]),e("li",[e("a",{attrs:{href:"#最后说明"}},[s._v("最后说明")])])])]),e("p"),s._v(" "),e("h1",{attrs:{id:"阅读准备"}},[s._v("阅读准备")]),s._v(" "),e("ol",[e("li",[s._v("docker基础命令，docker-compose基础")]),s._v(" "),e("li",[s._v("pyspider基础")])]),s._v(" "),e("p",[s._v("如果您不熟悉上面的内容，可以先网上查阅有关资料。")]),s._v(" "),e("h1",{attrs:{id:"_1-创建网络接口"}},[s._v("1. 创建网络接口")]),s._v(" "),e("p",[s._v("首先，创建一个Driver为"),e("code",[s._v("bridge")]),s._v("的网络接口，命名为"),e("code",[s._v("pyspider")]),s._v("：\n"),e("code",[s._v("docker network create --driver bridge pyspider")])]),s._v(" "),e("ul",[e("li",[e("p",[s._v("说明1： 需要创建该网络接口的原因是：在下面创建Docker容器的过程中，我们使用了"),e("code",[s._v("docker")]),s._v("和"),e("code",[s._v("docker-compose")]),s._v("分别创建了不同的服务。按正常来说，如果都使用"),e("code",[s._v("docker-compose")]),s._v("来创建服务会更好；但是这里有些特殊需求，所有就混合使用"),e("code",[s._v("docker")]),s._v("和"),e("code",[s._v("docker-compose")]),s._v("来创建服务了。")])]),s._v(" "),e("li",[e("p",[s._v("说明2：直接使用"),e("code",[s._v("docker")]),s._v("命令创建容器时，容器的默认网络接口使用的是"),e("code",[s._v("NAME")]),s._v("为"),e("code",[s._v("bridge")]),s._v("的接口；而使用"),e("code",[s._v("docker-compose")]),s._v("时，默认的网络接口使用的不是"),e("code",[s._v("NAME")]),s._v(" 为"),e("code",[s._v("bridge")]),s._v("的接口，而是根据"),e("code",[s._v("docker-compose.yml")]),s._v("文件所在目录命名的网络接口。如，我的"),e("code",[s._v("docker-compose.yml")]),s._v("文件在目录"),e("code",[s._v("Pyspider")]),s._v("下，则使用"),e("code",[s._v("docker-compose")]),s._v("时的默认网络接口就是"),e("code",[s._v("pyspider_default")]),s._v("。所以，如果我们使用"),e("code",[s._v("docker")]),s._v("和"),e("code",[s._v("docker-compose")]),s._v("时，默认的情况下它们属于不同的子网，网络不互通，这不是我们想要的。"),e("code",[s._v("dokcer")]),s._v("和"),e("code",[s._v("docker-compose")]),s._v("的网络接口都可以通过参数自定义，从而实现它们的服务的网络互通，所有我们才自己创建一个网络接口。")])]),s._v(" "),e("li",[e("p",[s._v("说明3：")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("可以通过命令"),e("code",[s._v("docker network ls")]),s._v("查看已有的网络接口，如下图：")]),s._v(" "),e("p",[e("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/2280774-8b2f3803fd7b44c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1200/format/webp",alt:""}})]),s._v(" "),e("p",[s._v("docker网络接口")])]),s._v(" "),e("li",[e("p",[s._v("可以通过"),e("code",[s._v("docker network inspect bridge")]),s._v("命令查看网络接口的详细信息。如"),e("code",[s._v("NAME")]),s._v("为"),e("code",[s._v("bridge")]),s._v("的详细信息如下图：")]),s._v(" "),e("p",[e("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/2280774-0e491a404e791f53.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1200/format/webp",alt:""}})]),s._v(" "),e("p",[s._v("查看网络接口信息")])])])])]),s._v(" "),e("p",[s._v("资料： "),e("a",{attrs:{href:"https://link.jianshu.com?t=https://docs.docker.com/engine/userguide/networking/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://docs.docker.com/engine/userguide/networking/"),e("OutboundLink")],1)]),s._v(" "),e("h1",{attrs:{id:"_2-创建redis服务"}},[s._v("2. 创建Redis服务")]),s._v(" "),e("p",[s._v("运行命令："),e("code",[s._v("docker run --network=pyspider --name redis -d -p 6379:6379 redis")]),s._v(" 创建Redis服务。")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("说明1：其中，参数"),e("code",[s._v("--network=pyspider")]),s._v("指定使用pyspider网络接口。我们可以使用"),e("code",[s._v("docker inspect redis | grep IPA")]),s._v("查看该容器的ip地址，如下图：")]),s._v(" "),e("p",[e("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/2280774-24505797b417b289.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/910/format/webp",alt:""}})]),s._v(" "),e("p",[s._v("查看容器ip地址")]),s._v(" "),e("p",[s._v("我们还可以通过 "),e("code",[s._v("docker logs reids")]),s._v("查看容器redis的日志输出，来观察redis服务是否正常运行。")])])]),s._v(" "),e("h1",{attrs:{id:"_3-创建mysql服务"}},[s._v("3. 创建mysql服务")]),s._v(" "),e("p",[s._v("运行："),e("code",[s._v("docker run --network pyspider -p 3306:3306 --name pymysql -v /Users/andy/Pyspider/mysql/conf/my.cnf:/etc/mysql/my.cnf -v /Users/andy/Pyspider/mysql/logs:/logs -v /Users/andy/Pyspider/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root123 -d mysql")]),s._v("以创建"),e("code",[s._v("mysql")]),s._v("服务。")]),s._v(" "),e("ul",[e("li",[s._v("说明：\n"),e("ul",[e("li",[s._v("指定网络接口"),e("code",[s._v("--network=pyspider")])]),s._v(" "),e("li",[e("code",[s._v("-p 3306:3306")]),s._v("指定端口号")]),s._v(" "),e("li",[e("code",[s._v("-v /Users/andy/Pyspider/mysql/conf/my.cnf:/etc/mysql/my.cnf")]),s._v("指定mysql配置文件")]),s._v(" "),e("li",[e("code",[s._v("-v /Users/andy/Pyspider/mysql/logs:/logs")]),s._v("指定日志目录")]),s._v(" "),e("li",[e("code",[s._v("-v /Users/andy/Pyspider/mysql/data:/var/lib/mysql")]),s._v("指定mysql的数据文件存储目录")]),s._v(" "),e("li",[e("code",[s._v("-e MYSQL_ROOT_PASSWORD=root123")]),s._v("指定"),e("code",[s._v("root")]),s._v("账户的密码为"),e("code",[s._v("root123")])])])])]),s._v(" "),e("p",[s._v("用"),e("code",[s._v("docker inspect pymysql | grep IPA")]),s._v("查看mysql容器的ip地址。")]),s._v(" "),e("p",[e("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/2280774-3d2b77a67ca43f55.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/912/format/webp",alt:""}})]),s._v(" "),e("p",[s._v("mysql容器ip地址")]),s._v(" "),e("h1",{attrs:{id:"_4-创建pyspider的scheduler服务"}},[s._v("4. 创建pyspider的scheduler服务")]),s._v(" "),e("p",[s._v("运行："),e("code",[s._v('docker run --network=pyspider --name scheduler -d -p 23333:23333 --restart=always binux/pyspider --taskdb "mysql+taskdb://root:root123@172.20.0.2:3306/taskdb" --resultdb "mysql+projectdb://root:root123@172.20.0.2:3306/resultdb" --projectdb "mysql+projectdb://root:root123@172.20.0.2:3306/projectdb" --message-queue "redis://172.20.0.3:6379/0" scheduler --inqueue-limit 10000 --delete-time 3600')])]),s._v(" "),e("ul",[e("li",[e("p",[s._v("参数说明")]),s._v(" "),e("ul",[e("li",[e("code",[s._v("--network=pyspider")]),s._v("指定网络接口")]),s._v(" "),e("li",[e("code",[s._v("-p 23333:23333")]),s._v("指定端口")]),s._v(" "),e("li",[e("code",[s._v("root:root123@172.20.0.2:3306")]),s._v("为mysql服务的ip地址，端口，用户名和密码")]),s._v(" "),e("li",[e("code",[s._v("redis://172.20.0.3:6379/0")]),s._v("为redis服务的配置。")]),s._v(" "),e("li",[s._v("命令运行成功后，可以通过"),e("code",[s._v("docker logs scheduler")]),s._v("查看"),e("code",[s._v("scheduler")]),s._v("服务的运行情况。")])])]),s._v(" "),e("li",[e("p",[s._v("查看"),e("code",[s._v("scheduler")]),s._v("的ip地址为：172.20.0.4，方便后边使用。")])]),s._v(" "),e("li",[e("p",[s._v("pyspider分布式部署中，"),e("code",[s._v("scheduer")]),s._v("服务只能创建一个。")])])]),s._v(" "),e("h1",{attrs:{id:"_5-使用docker-compose创建pyspider的其它组件"}},[s._v("5. 使用docker-compose创建pyspider的其它组件")]),s._v(" "),e("p",[s._v("配置文件"),e("code",[s._v("docker-compose.yml")]),s._v("的内容如下：")]),s._v(" "),e("div",{staticClass:"language-yml line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-yml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("version")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'2'")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("services")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("phantomjs")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'binux/pyspider:latest'")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" phantomjs\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("cpu_shares")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("256")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("environment")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'EXCLUDE_PORTS=5000,23333,24444'")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("expose")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'25555'")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 暴露端口25555给link到此service的容器")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("mem_limit")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 256m\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("restart")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" always\n\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("phantomjs-lb")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'dockercloud/haproxy:latest'")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 使用haproxy使用负载均衡")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("links")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" phantomjs\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("volumes")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" /var/run/docker.sock"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("/var/run/docker.sock "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker-compose v2版本中haproxy需要指定docker socket(MAC系统中)")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("restart")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" always\n\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("fetcher")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'binux/pyspider:latest'")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('\'--message-queue "redis://172.20.0.3:6379/0" --phantomjs-proxy "phantomjs:80" fetcher --xmlrpc\'')]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# fetcher以rpc的方式启动")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("cpu_shares")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("256")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("environment")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'EXCLUDE_PORTS=5000,25555,23333'")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("links")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'phantomjs-lb:phantomjs'")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("mem_limit")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 256m\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("restart")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" always\n\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("fetcher-lb")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'dockercloud/haproxy:latest'")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 使用haproxy使用负载均衡")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("links")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" fetcher\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("volumes")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" /var/run/docker.sock"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("/var/run/docker.sock "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker-compose v2版本中haproxy需要指定docker socket(MAC系统中)")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("restart")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" always\n\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("processor")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'binux/pyspider:latest'")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('\'--projectdb "mysql+projectdb://root:root123@172.20.0.2:3306/projectdb" --message-queue "redis://172.20.0.3:6379/0" processor\'')]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("cpu_shares")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("256")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("mem_limit")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 256m\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("restart")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" always\n\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("result-worker")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'binux/pyspider:latest'")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('\'--taskdb "mysql+taskdb://root:root123@172.20.0.2:3306/taskdb"  --projectdb "mysql+projectdb://root:root123@172.20.0.2:3306/projectdb" --resultdb "mysql+resultdb://root:root123@172.20.0.2:3306/resultdb" --message-queue "redis://172.20.0.3:6379/0" result_worker\'')]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("cpu_shares")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("256")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("mem_limit")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 256m\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("restart")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" always\n\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("webui")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'binux/pyspider:latest'")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("command")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('\'--taskdb "mysql+taskdb://root:root123@172.20.0.2:3306/taskdb"  --projectdb "mysql+projectdb://root:root123@172.20.0.2:3306/projectdb" --resultdb "mysql+resultdb://root:root123@172.20.0.2:3306/resultdb" --message-queue "redis://172.20.0.3:6379/0" webui --max-rate 0.3 --max-burst 3 --scheduler-rpc "http://172.20.0.4:23333/" --fetcher-rpc "http://fetcher/"\'')]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("cpu_shares")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("256")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("environment")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'EXCLUDE_PORTS=24444,25555,23333'")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ports")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'5000:5000'")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# webui的对外的端口为5000，可以通过http://localhost:5000访问webui服务。")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("links")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'fetcher-lb:fetcher'")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# link到其它负载均衡haproxy的服务。")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("mem_limit")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 256m\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("restart")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" always\n\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("networks")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("default")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("external")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" pyspider "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#指定docker-compose的网络接口为：pyspider；实现和docker run方式创建容器的互通。")]),s._v("\n\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br"),e("span",{staticClass:"line-number"},[s._v("25")]),e("br"),e("span",{staticClass:"line-number"},[s._v("26")]),e("br"),e("span",{staticClass:"line-number"},[s._v("27")]),e("br"),e("span",{staticClass:"line-number"},[s._v("28")]),e("br"),e("span",{staticClass:"line-number"},[s._v("29")]),e("br"),e("span",{staticClass:"line-number"},[s._v("30")]),e("br"),e("span",{staticClass:"line-number"},[s._v("31")]),e("br"),e("span",{staticClass:"line-number"},[s._v("32")]),e("br"),e("span",{staticClass:"line-number"},[s._v("33")]),e("br"),e("span",{staticClass:"line-number"},[s._v("34")]),e("br"),e("span",{staticClass:"line-number"},[s._v("35")]),e("br"),e("span",{staticClass:"line-number"},[s._v("36")]),e("br"),e("span",{staticClass:"line-number"},[s._v("37")]),e("br"),e("span",{staticClass:"line-number"},[s._v("38")]),e("br"),e("span",{staticClass:"line-number"},[s._v("39")]),e("br"),e("span",{staticClass:"line-number"},[s._v("40")]),e("br"),e("span",{staticClass:"line-number"},[s._v("41")]),e("br"),e("span",{staticClass:"line-number"},[s._v("42")]),e("br"),e("span",{staticClass:"line-number"},[s._v("43")]),e("br"),e("span",{staticClass:"line-number"},[s._v("44")]),e("br"),e("span",{staticClass:"line-number"},[s._v("45")]),e("br"),e("span",{staticClass:"line-number"},[s._v("46")]),e("br"),e("span",{staticClass:"line-number"},[s._v("47")]),e("br"),e("span",{staticClass:"line-number"},[s._v("48")]),e("br"),e("span",{staticClass:"line-number"},[s._v("49")]),e("br"),e("span",{staticClass:"line-number"},[s._v("50")]),e("br"),e("span",{staticClass:"line-number"},[s._v("51")]),e("br"),e("span",{staticClass:"line-number"},[s._v("52")]),e("br"),e("span",{staticClass:"line-number"},[s._v("53")]),e("br"),e("span",{staticClass:"line-number"},[s._v("54")]),e("br"),e("span",{staticClass:"line-number"},[s._v("55")]),e("br"),e("span",{staticClass:"line-number"},[s._v("56")]),e("br"),e("span",{staticClass:"line-number"},[s._v("57")]),e("br"),e("span",{staticClass:"line-number"},[s._v("58")]),e("br"),e("span",{staticClass:"line-number"},[s._v("59")]),e("br"),e("span",{staticClass:"line-number"},[s._v("60")]),e("br"),e("span",{staticClass:"line-number"},[s._v("61")]),e("br"),e("span",{staticClass:"line-number"},[s._v("62")]),e("br"),e("span",{staticClass:"line-number"},[s._v("63")]),e("br"),e("span",{staticClass:"line-number"},[s._v("64")]),e("br"),e("span",{staticClass:"line-number"},[s._v("65")]),e("br"),e("span",{staticClass:"line-number"},[s._v("66")]),e("br"),e("span",{staticClass:"line-number"},[s._v("67")]),e("br"),e("span",{staticClass:"line-number"},[s._v("68")]),e("br"),e("span",{staticClass:"line-number"},[s._v("69")]),e("br"),e("span",{staticClass:"line-number"},[s._v("70")]),e("br"),e("span",{staticClass:"line-number"},[s._v("71")]),e("br"),e("span",{staticClass:"line-number"},[s._v("72")]),e("br")])]),e("ul",[e("li",[e("code",[s._v("webui")]),s._v("服务说明\n"),e("ul",[e("li",[e("code",[s._v('--fetcher-rpc "http://fetcher/"')]),s._v("是以服务名的方式指定webui链接到的fetcher服务，因为fetcher实例可以有很多个，我们如果用ip指定就不能起到负载均衡的目的了。")]),s._v(" "),e("li",[e("code",[s._v('--scheduler-rpc "http://172.20.0.4:23333/"')]),s._v("是webui直接用ip和port的方式链接到"),e("code",[s._v("scheduler")]),s._v("服务，因为scheduler只有一个。")]),s._v(" "),e("li",[s._v("command的其它参数可以参考pyspider的文档："),e("a",{attrs:{href:"https://link.jianshu.com?t=http://docs.pyspider.org/en/latest/",target:"_blank",rel:"noopener noreferrer"}},[s._v("http://docs.pyspider.org/en/latest/"),e("OutboundLink")],1)])])]),s._v(" "),e("li",[s._v("haproxy的文档："),e("a",{attrs:{href:"https://link.jianshu.com?t=https://github.com/docker/dockercloud-haproxy",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://github.com/docker/dockercloud-haproxy"),e("OutboundLink")],1)]),s._v(" "),e("li",[s._v("docker-compose的文档："),e("a",{attrs:{href:"https://link.jianshu.com?t=https://docs.docker.com/compose/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://docs.docker.com/compose/"),e("OutboundLink")],1)])]),s._v(" "),e("p",[e("code",[s._v("docker-compose.yml")]),s._v("文件写好后，运行"),e("code",[s._v("docker-compose up")]),s._v("（要在docker-compose.yml所在目录）命令，"),e("code",[s._v("docker-compose")]),s._v("开始创建容器服务，如下图：")]),s._v(" "),e("p",[e("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/2280774-39e76ff52df03a7b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/760/format/webp",alt:""}})]),s._v(" "),e("p",[s._v("docker-compose up")]),s._v(" "),e("p",[s._v("所有组件服务创建完成后，访问："),e("a",{attrs:{href:"https://link.jianshu.com?t=http://localhost:5000",target:"_blank",rel:"noopener noreferrer"}},[s._v("http://localhost:5000"),e("OutboundLink")],1),s._v("，即可看到webui界面。")]),s._v(" "),e("p",[s._v("如果想创建更多的fetcher, result_work, phantomjs容器实例，可以使用："),e("code",[s._v("docker-compose scale phantomjs=2 processor=4 result-worker=2")]),s._v("。"),e("code",[s._v("docker-compose")]),s._v("会自动帮你创建2个phantomjs服务，4个processor服务，2个result-worker服务；haproxy会自动实现负载均衡，如下图：")]),s._v(" "),e("p",[e("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/2280774-002891ffaf82b930.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1200/format/webp",alt:""}})]),s._v(" "),e("p",[s._v("docker-compose scale")]),s._v(" "),e("h1",{attrs:{id:"最后说明"}},[s._v("最后说明")]),s._v(" "),e("ol",[e("li",[s._v("redis, mysql, scheudler服务的ip地址需要根据您的容器的ip具体而定。")]),s._v(" "),e("li",[s._v("我所使用的系统为MAC，dokcer版本为：Version 17.06.0-ce-mac19 (18663)")])])])}),[],!1,null,null,null);t.default=r.exports}}]);
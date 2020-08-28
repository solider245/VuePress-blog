(window.webpackJsonp=window.webpackJsonp||[]).push([[191],{405:function(s,t,e){"use strict";e.r(t);var r=e(25),n=Object(r.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("p"),e("div",{staticClass:"table-of-contents"},[e("ul",[e("li",[e("a",{attrs:{href:"#容器需求"}},[s._v("容器需求")])]),e("li",[e("a",{attrs:{href:"#安装和配置-docker"}},[s._v("安装和配置 Docker")]),e("ul",[e("li",[e("a",{attrs:{href:"#下载并安装-docker"}},[s._v("下载并安装 Docker")])]),e("li",[e("a",{attrs:{href:"#配置-docker"}},[s._v("配置 Docker")])])])]),e("li",[e("a",{attrs:{href:"#定制-ubuntu-镜像"}},[s._v("定制 ubuntu 镜像")]),e("ul",[e("li",[e("a",{attrs:{href:"#获取-ubuntu-镜像"}},[s._v("获取 ubuntu 镜像")])]),e("li",[e("a",{attrs:{href:"#ubuntu-容器"}},[s._v("ubuntu 容器")]),e("ul",[e("li",[e("a",{attrs:{href:"#创建-ubuntu-容器"}},[s._v("创建 ubuntu 容器")])]),e("li",[e("a",{attrs:{href:"#查看已有容器"}},[s._v("查看已有容器")])]),e("li",[e("a",{attrs:{href:"#以交互的形式启动容器"}},[s._v("以交互的形式启动容器")])])])]),e("li",[e("a",{attrs:{href:"#ubuntu-容器的基本配置"}},[s._v("ubuntu 容器的基本配置")])]),e("li",[e("a",{attrs:{href:"#配置-ssh"}},[s._v("配置 SSH")]),e("ul",[e("li",[e("a",{attrs:{href:"#安装-openssh-server"}},[s._v("安装 openssh\\-server")])]),e("li",[e("a",{attrs:{href:"#配置-sshd"}},[s._v("配置 sshd")])]),e("li",[e("a",{attrs:{href:"#重启-sshd"}},[s._v("重启 sshd")])]),e("li",[e("a",{attrs:{href:"#添加主机的-ssh-公钥"}},[s._v("添加主机的 ssh 公钥")])])])]),e("li",[e("a",{attrs:{href:"#提交修改到镜像"}},[s._v("提交修改到镜像")])])])]),e("li",[e("a",{attrs:{href:"#最终的-ubuntu-容器"}},[s._v("最终的 ubuntu 容器")])])])]),s._v("\n学习网络开发过程中不想“污染”macOS，考虑到之后部署网络应用主要是与linux打交道，所以安装了 ubuntu 虚拟机以满足短期的知识学习需求。十里安装了 ubuntu 虚拟机，一般就是在 mac 中 ssh 连接 ubuntu 虚拟机在终端下进行操作学习，可见安装一个包含完整GUI的 ubuntu 有点多余，还占用很多资源！所以想到了使用 docker 来创建 ubuntu 容器用来开发学习，本文就分享一下这个过程！"),e("p"),s._v(" "),e("p",[e("img",{attrs:{src:"https://pichome-1254392422.cos.ap-chengdu.myqcloud.com/img/20181220150817.png",alt:""}})]),s._v(" "),e("p",[s._v("本文就不介绍 Docker 是什么了，主要描述搭建符合自己需求的 ubuntu 容器的过程。")]),s._v(" "),e("h1",{attrs:{id:"容器需求"}},[s._v("容器需求")]),s._v(" "),e("ul",[e("li",[s._v("可以 ssh 连接")]),s._v(" "),e("li",[s._v("包含 vim、git等基本工具")])]),s._v(" "),e("h1",{attrs:{id:"安装和配置-docker"}},[s._v("安装和配置 Docker")]),s._v(" "),e("h2",{attrs:{id:"下载并安装-docker"}},[s._v("下载并安装 Docker")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("访问 "),e("a",{attrs:{href:"https://hub.docker.com",target:"_blank",rel:"noopener noreferrer"}},[s._v("Docker 官网"),e("OutboundLink")],1),s._v(" 了解和下载 Docker，这里也可以"),e("a",{attrs:{href:"https://download.docker.com/mac/stable/Docker.dmg",target:"_blank",rel:"noopener noreferrer"}},[s._v("点我"),e("OutboundLink")],1),s._v("下载最新稳定版的 Docker for mac")])]),s._v(" "),e("li",[e("p",[s._v("打开下载的 dmg 文件，将 Docker 拖放到 Application 文件夹中即可完成安装")])]),s._v(" "),e("li",[e("p",[s._v("首次运行会有提示输入密码，用来获取完整的操作权限")])]),s._v(" "),e("li",[e("p",[s._v("Docker 运行起来会在顶栏出现一个小鲸鱼的logo")])]),s._v(" "),e("li",[e("p",[s._v("安装成功后，在终端中查看 Docker 版本会得到下面类似信息：")]),s._v(" "),e("div",{staticClass:"language-Bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("➜  docker --version\nDocker version "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("18.09")]),s._v(".0, build 4d60db4\n➜  docker-compose --version\ndocker-compose version "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.23")]),s._v(".2, build 1110ad01\n➜  docker-machine --version\ndocker-machine version "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.16")]),s._v(".0, build 702c267f\n\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br")])])])]),s._v(" "),e("h2",{attrs:{id:"配置-docker"}},[s._v("配置 Docker")]),s._v(" "),e("p",[s._v("由于国内访问 Docker 官方默认的镜像源很慢，所以需要更换国内的镜像源进行加速，这里使用官方提供的一个镜像仓库地址：https://registry.docker-cn.com。")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("点击顶栏小鲸鱼的 logo，找到 "),e("code",[s._v("Preferences")]),s._v("点击调出 Doker 配置窗口；")])]),s._v(" "),e("li",[e("p",[s._v("点击 "),e("code",[s._v("Daemon")]),s._v(" 按钮，就可以看到 "),e("code",[s._v("Registry Mirrors")]),s._v(" 的配置页；")])]),s._v(" "),e("li",[e("p",[s._v("点击 "),e("code",[s._v("+")]),s._v(" 号，添加上面提供的地址即可，添加完成后，点击 "),e("code",[s._v("Apply & Restart")]),s._v(" ，等待一会儿 Docker 重启之后，配置即可生效，最终如下：")]),s._v(" "),e("p",[e("img",{attrs:{src:"https://pichome-1254392422.cos.ap-chengdu.myqcloud.com/img/20181220153021.png",alt:""}})])])]),s._v(" "),e("h1",{attrs:{id:"定制-ubuntu-镜像"}},[s._v("定制 ubuntu 镜像")]),s._v(" "),e("h2",{attrs:{id:"获取-ubuntu-镜像"}},[s._v("获取 ubuntu 镜像")]),s._v(" "),e("p",[s._v("运行命令")]),s._v(" "),e("div",{staticClass:"language-Bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("docker pull ubuntu\n\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("就会拉取官网上的最新 ubuntu 镜像，这是一个极其精简的镜像，作为我们定制 ubuntu 镜像的基础。")]),s._v(" "),e("p",[s._v("使用命令 "),e("code",[s._v("docker image ls")]),s._v(" 可以查看当前安装的 Docker 镜像。")]),s._v(" "),e("h2",{attrs:{id:"ubuntu-容器"}},[s._v("ubuntu 容器")]),s._v(" "),e("h3",{attrs:{id:"创建-ubuntu-容器"}},[s._v("创建 ubuntu 容器")]),s._v(" "),e("p",[s._v("使用命令 "),e("code",[s._v("docker run -i -t --name mineos ubuntu bash")]),s._v(" 可以创建并运行一个可以使用终端交互的 ubuntu 容器，命令参数解释：")]),s._v(" "),e("table",[e("thead",[e("tr",[e("th",[s._v("参数")]),s._v(" "),e("th",[s._v("值")]),s._v(" "),e("th",[s._v("含义")])])]),s._v(" "),e("tbody",[e("tr",[e("td",[s._v("-i")]),s._v(" "),e("td",[s._v("无")]),s._v(" "),e("td",[s._v("可以输入进行交互")])]),s._v(" "),e("tr",[e("td",[s._v("-t")]),s._v(" "),e("td",[s._v("无")]),s._v(" "),e("td",[s._v("终端交互")])]),s._v(" "),e("tr",[e("td",[s._v("–name")]),s._v(" "),e("td",[s._v("mineos")]),s._v(" "),e("td",[s._v("指定容器名称为 mineos")])]),s._v(" "),e("tr",[e("td",[s._v("ubuntu")]),s._v(" "),e("td",[s._v("无")]),s._v(" "),e("td",[s._v("指定使用镜像")])]),s._v(" "),e("tr",[e("td",[s._v("bash")]),s._v(" "),e("td",[s._v("无")]),s._v(" "),e("td",[s._v("指定容器启动使用的应用")])])])]),s._v(" "),e("p",[s._v("上面的命令执行后，就会登陆 ubuntu 容器的 bash 中，执行命令"),e("code",[s._v("cat /etc/issue")]),s._v(" 可以查看系统版本，十里的ubuntu版本是 18.04。此时按快捷键组合 "),e("code",[s._v("ctrl")]),s._v(" + "),e("code",[s._v("d")]),s._v(" 就会退出 ubuntu 容器，此时就会停止容器运行。")]),s._v(" "),e("h3",{attrs:{id:"查看已有容器"}},[s._v("查看已有容器")]),s._v(" "),e("p",[s._v("使用命令 "),e("code",[s._v("docker ps")]),s._v(" 可以查看当前运行的容器，如果此时执行，会发现没有容器信息，因为我们已经停止了刚才创建的容器。怎么查看已经关闭的容器信息呢？使用命令 "),e("code",[s._v("docker ps -a")]),s._v("，会列出所有容器信息，包括已经关闭的。此时执行，就会看到已经关闭的 mineos 容器。")]),s._v(" "),e("h3",{attrs:{id:"以交互的形式启动容器"}},[s._v("以交互的形式启动容器")]),s._v(" "),e("p",[s._v("执行命令 "),e("code",[s._v("docker start mineos")]),s._v(" 就会启动容器，但是你会发现无法像刚创建时登陆容器的 bash，先使用命令 "),e("code",[s._v("docker stop mineos")]),s._v("，此时加入 "),e("code",[s._v("-i")]),s._v(" 参数启动就可以了 "),e("code",[s._v("docker start -i mineos")]),s._v("。")]),s._v(" "),e("h2",{attrs:{id:"ubuntu-容器的基本配置"}},[s._v("ubuntu 容器的基本配置")]),s._v(" "),e("p",[s._v("登陆进 ubuntu 的 bash 以后就可以当正常的 ubuntu 进行使用了。")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("更新软件源信息："),e("code",[s._v("apt-get update")])])]),s._v(" "),e("li",[e("p",[s._v("因为这个 ubuntu 的依赖镜像太精简了，所以好多工具没有安装，先安装一下 vim: "),e("code",[s._v("apt-get install vim")])])]),s._v(" "),e("li",[e("p",[s._v("可以看到安装挺慢的，之所以先安装 vim 是为了可以编辑 "),e("code",[s._v("/etc/apt/sources.list")]),s._v(" 更换为国内访问更快的软件源，比如将文件中的内容替换为如下阿里云的：")]),s._v(" "),e("div",{staticClass:"language-ini line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-ini"}},[e("code",[s._v("deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse\n\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("重新更新软件源信息："),e("code",[s._v("apt-get update")]),s._v("，会发现快很多")])]),s._v(" "),e("li",[e("p",[s._v("飞一般的安装 git 和 python3："),e("code",[s._v("apt-get install git python3")])])])]),s._v(" "),e("h2",{attrs:{id:"配置-ssh"}},[s._v("配置 SSH")]),s._v(" "),e("p",[s._v("这一步主要是为了mac 可以 ssh 连接 ubuntu 容器^["),e("a",{attrs:{href:"https://www.jianshu.com/p/426f0d8e6cbf",target:"_blank",rel:"noopener noreferrer"}},[s._v("Docker-SSH连接docker容器"),e("OutboundLink")],1),s._v("]。")]),s._v(" "),e("h3",{attrs:{id:"安装-openssh-server"}},[s._v("安装 openssh-server")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" openssh-server\n\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("用于开启 ssh 服务供外部连接。")]),s._v(" "),e("h3",{attrs:{id:"配置-sshd"}},[s._v("配置 sshd")]),s._v(" "),e("p",[s._v("需要更改一下 sshd 的默认配置，编辑文件 "),e("code",[s._v("/etc/ssh/sshd_config")]),s._v(" ，大概从 29 行开始主要更改三处，更改后内容如下：")]),s._v(" "),e("div",{staticClass:"language-fallback line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("PermitRootLogin yes # 可以登录 root 用户\nPubkeyAuthentication yes # 可以使用 ssh 公钥许可\nAuthorizedKeysFile\t.ssh/authorized_keys # 公钥信息保存到文件 .ssh/authorized_keys 中\n\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("h3",{attrs:{id:"重启-sshd"}},[s._v("重启 sshd")]),s._v(" "),e("p",[s._v("因为 ubuntu 过于精简，不能使用 service 命令方便的重启 sshd，这里使用命令 "),e("code",[s._v("/etc/init.d/ssh restart")]),s._v(" 进行重启^["),e("a",{attrs:{href:"https://blog.csdn.net/u013015629/article/details/70045809",target:"_blank",rel:"noopener noreferrer"}},[s._v('Ubuntu下"sshd:unrecognized service”'),e("OutboundLink")],1),s._v("]，重启是为了让上面的配置生效。")]),s._v(" "),e("h3",{attrs:{id:"添加主机的-ssh-公钥"}},[s._v("添加主机的 ssh 公钥")]),s._v(" "),e("p",[s._v("这里的主机指的就是 macOS，保证此时还是在 ubuntu 容器中。")]),s._v(" "),e("ol",[e("li",[s._v("在 HOME 目录下创建 "),e("code",[s._v(".ssh")]),s._v(" 目录："),e("code",[s._v("mkdir ~/.ssh")])]),s._v(" "),e("li",[s._v("新建文件 "),e("code",[s._v("~/.ssh/authorized_keys")]),s._v(" ："),e("code",[s._v("touch ~/.ssh/authorized_keys")])]),s._v(" "),e("li",[s._v("新开一个 macOS 下的终端窗口，执行命令 "),e("code",[s._v("cat ~/.ssh/id_rsa.pub")]),s._v("，复制打印的一行公钥信息")]),s._v(" "),e("li",[s._v("回到 ubuntu 容器中，将第 3 步复制的公钥粘贴到 "),e("code",[s._v("~/.ssh/authorized_keys")]),s._v(" 中保存。")])]),s._v(" "),e("blockquote",[e("p",[s._v("如果使用过ssh免密码的登陆操作的话，相信您知道ssh的密钥生成方法，如果没了解过，可以参考："),e("a",{attrs:{href:"https://smslit.coding.me/ownwiki/linux/kali/#ssh-keys",target:"_blank",rel:"noopener noreferrer"}},[s._v("ssh-keys"),e("OutboundLink")],1)])]),s._v(" "),e("ol",{attrs:{start:"5"}},[e("li",[s._v("此时完成了 SSH 访问支持的添加，"),e("code",[s._v("ctrl")]),s._v(" + "),e("code",[s._v("d")]),s._v(" 退出容器。")])]),s._v(" "),e("h2",{attrs:{id:"提交修改到镜像"}},[s._v("提交修改到镜像")]),s._v(" "),e("p",[s._v("现在已经推出到正常的 mac 终端窗口中了，容器的修改不会影响到源镜像，上面的操作我们已经完成了 Ubuntu 的基本配置，并且添加了 SSH 支持，这一步是产生新的镜像版本。")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("查看刚刚操作的容器信息，执行命令 "),e("code",[s._v("docker ps -a")]),s._v(" ，可以看到 mineos 的状态已经是退出了，主要关注 mineos 的 "),e("code",[s._v("CONTAINER ID")]),s._v(" ，复制这个 ID 号，比如为 "),e("code",[s._v("e5d8c1030724")])])]),s._v(" "),e("li",[e("p",[s._v("执行下面的命令提交产生 ubuntu 新版本的镜像：")]),s._v(" "),e("div",{staticClass:"language-Bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("docker commit -m "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'add ssh'")]),s._v(" -a "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'5km'")]),s._v(" e5d8c1030724 ubuntu-ssh\n\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("ul",[e("li",[s._v("-m，指定提交信息")]),s._v(" "),e("li",[s._v("-a，指定提交者")]),s._v(" "),e("li",[s._v("你需要把 e5d8c1030724 替换为您的容器的 "),e("code",[s._v("CONTAINER ID")])]),s._v(" "),e("li",[s._v("ubuntu-ssh 是新镜像的名称，可以随意指定")])])]),s._v(" "),e("li",[e("p",[s._v("使用命令 "),e("code",[s._v("docker image ls")]),s._v(" 可以查看当前安装的镜像，上述操作正常的话就会看到 "),e("code",[s._v("ubuntu-ssh")]),s._v(" 的镜像信息")])]),s._v(" "),e("li",[e("p",[s._v("此时之前创建的容器就没用了，可以通过命令 "),e("code",[s._v("docker rm mineos")]),s._v(" 进行删除")])])]),s._v(" "),e("h1",{attrs:{id:"最终的-ubuntu-容器"}},[s._v("最终的 ubuntu 容器")]),s._v(" "),e("p",[s._v("有了具有 SSH 支持的 ubuntu 镜像，我们就可以创建新的 ubuntu 容器，通过以下命令进行创建：")]),s._v(" "),e("div",{staticClass:"language-Bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("docker run -d -p "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("26122")]),s._v(":22 --name learn ubuntu-ssh /usr/sbin/sshd -D\n\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("table",[e("thead",[e("tr",[e("th",[s._v("参数")]),s._v(" "),e("th",[s._v("值")]),s._v(" "),e("th",[s._v("含义")])])]),s._v(" "),e("tbody",[e("tr",[e("td",[s._v("-d")]),s._v(" "),e("td",[s._v("无")]),s._v(" "),e("td",[s._v("后台运行")])]),s._v(" "),e("tr",[e("td",[s._v("-p")]),s._v(" "),e("td",[s._v("26122:22")]),s._v(" "),e("td",[s._v("绑定主机的 26122 端口到ubuntu容器的 22 端口(ssh服务的默认端口为 22)")])]),s._v(" "),e("tr",[e("td",[s._v("–name")]),s._v(" "),e("td",[s._v("learn")]),s._v(" "),e("td",[s._v("指定容器名称为 learn")])]),s._v(" "),e("tr",[e("td",[s._v("ubuntu-ssh")]),s._v(" "),e("td",[s._v("无")]),s._v(" "),e("td",[s._v("使用镜像 ubuntu-ssh 创建容器")])]),s._v(" "),e("tr",[e("td",[s._v("/usr/sbin/sshd -D")]),s._v(" "),e("td",[s._v("无")]),s._v(" "),e("td",[s._v("指定容器启动使用的应用及参数")])])])]),s._v(" "),e("p",[s._v("在 macOS 的终端中执行命令 "),e("code",[s._v("ssh -p 26122 root@localhost")]),s._v(" 即可连接已经启动的 ubuntu 容器 "),e("code",[s._v("learn")])]),s._v(" "),e("p",[s._v("为了更方便的连接，可以为容器创建 ssh 连接的主机短名，往 macOS 的 "),e("code",[s._v("~/.ssh/config")]),s._v(" 中添加以下内容：")]),s._v(" "),e("div",{staticClass:"language-ini line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-ini"}},[e("code",[s._v("Host learn\n    HostName localhost\n    User     root\n    Port     26122\n\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("p",[s._v("此时就可以通过命令 "),e("code",[s._v("ssh learn")]),s._v(" 连接 ubuntu 容器 learn 了。")])])}),[],!1,null,null,null);t.default=n.exports}}]);
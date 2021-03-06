---
title : Portainer一个轻量级的Docker环境管理UI
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-11 02:23:17 +0800
categories:
 -
tags:
 -
---
[[toc]]

Portainer是一个轻量级的docker环境管理UI，可以用来管理[docker](https://www.kubernetes.org.cn/tags/docker)宿主机和docker swarm集群。他的轻量级，轻量到只要个不到100M的docker镜像容器就可以完整的提供服务。直接启动即可，异常方便。而且。现在市面上开源的docker swarm管理平台比较少，尤其是这样轻量级的更加稀少

## Portainer提供的功能完全满足大小企业的大部分需求，主要功能：

1\. 提供状态显示面板：显示主机或者swarm集群上有多少镜像，容器等

2\. 应用模板快速部署：可以使用预存的模板或者自己定制的模板快速部署

3\. 事件日志显示：对任何操作有记录，并且有页面可以显示审计日志

4\. 容器控制台操作：查看容器，管理容器，查看容器占用的性能(内存，cpu等)

5\. Swarm集群管理：可以管理swarm集群，是最大的优点

6\. 登录用户管理：有完备的用户系统，权限控制

## Protainer虽然有不少优点，但是也有几点不足:

1. Portainer没有自带的高可用，但是可以利用nfs等方式作高可用(其实这种管理平台也不是必定需要高可用)

2. Portainer没有中文页面，官方没有提供中文翻译，网上大神自己翻译的中文汉化包但是只能支持特定版本（没有联系到作者，不好意思转载，可以联系我发它的博客链接）

## Portainer搭建部署

Portainer的搭建特别简单，就是拉起一个容器这么简单，不过基础环境需要配置下

关闭selinux和firewalld

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094017@2x.png)

![](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)下面直接安装Portainer，一条命令即可

docker run \-d \-p 9000:9000  \-\-restart\=always \-\-name portainer \-v /var/run/docker.sock:/var/run/docker.sock \-v /Users/lee/dev/docker\_file/portainer/data:/data docker.io/portainer/portainer

通过ip:9000即可访问。

http://192.168.233.128:9000/#/init/admin

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094030@2x.png)

第一次登陆，输入密码即设置admin的默认密码，密码必须超过8位，否则不能设置成功

Portainer连接dockerhost或swarm

Portainer连接dockerhost

Portainer连接自己本地的宿主机即简单，只需要点击下面这个按钮即可

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094047@2x.png)![](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

Portainer连接其他docker的宿主机也比较简单，不过需要配置下docker，将docker的tcp连接方式打开。命令如下

vim /usr/lib/systemd/system/docker.service ExecStart\=/usr/bin/dockerd\-current \\ \-H tcp://0.0.0.0:2375 \-H unix://var/run/docker.sock \\ systemctl daemon\-reload
systemctl restart docker

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094059@2x.png)

这样即可连接到指定的docker，下面有个TLS的开关，如果有强烈的安全意识可以开启这个，不过docker的TLS的打开相对复杂，需要的话可以百度查看如何打开，或者后台询问，这里就不过多介绍

Portainer连接swarm集群

Swarm是docker官方提供的一个集群管理工具，其主要作用是把若干台docker主机抽象当做一个整体，并且通过一个master主机作为入口管理整个swarm平台。这里就不过多介绍swarm，不浪费篇幅

但是Swarm集群在市面上很少有比较完整透彻的页面管理工具，相对来说Portainer对Swarm的管控页面做的还是比较全面的，不管是镜像管理还是容器管理样样都可以管理，而且页面操作也极其简单(官方不提供汉化版！！过分)

Swarm搭建

docker swarm init \-\-advertise\-addr 192.168.233.128

在另一台机器上执行上面命令弹出的提示命令即可

 docker swarm join \\ \-\-token
SWMTKN\-1\-12ksd0g10cw4mqyp9l18stn5mnobt5ujcljwxlepzl40hng9oz\-30upv336e6pf29xpglmnyxy6l \\ 192.168.233.128:2377

在swarm的master机器上执行如下命令，安装Portainer agent

docker service create \-\-name portainer\_agent \-\-publish mode\=host,target\=9001,published\=9001  \-e
AGENT\_CLUSTER\_ADDR\=192.168.233.128  \-\-mode global  \-\-mount
type\=bind,src\=//var/run/docker.sock,dst=/var/run/docker.sock \-\-mount
type\=bind,src\=//var/lib/docker/volumes,dst=/var/lib/docker/volumes \-\-mount type=bind,src=/,dst=/host portainer/agent

 ![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094115@2x.png)

如上，docker Portainer连接swarm集群就连接完毕。

Portainer的基础使用操作—一张张截图图会太多，请注意标红部分

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094128@2x.png)

这里简要记录了所连接的docker主机或者swarm集群，主要内容有stacks(堆阀数)，service(服务数，swarm里面的内容)，containers(容器数)，容器存活数，volumes(数据卷数量)，

Images(镜像数)。点击这里，即可进到这个集群或者docker宿主机的管理界面

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094138@2x.png)

点击进去后即可进入到这个详细看板里，内容其实与前面的内容大体一致，其重点是在左边的按钮，可以对具体内容进行操作

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094151@2x.png)![](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

App Templates：App的模板，内置20多个常用的服务模板，可以去更新这些，也可以删除。点击新建可以创建适合自己环境的模板，方便快速部署自己的服务。

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094201@2x.png)

Stacks：这里是制作自己的docker compose里的文件，可以创建自己的docker compose快速部署

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094211@2x.png)

Services：其实这里就是docker swarm的service概念，管理删除创建需要的service，一目了然。

![](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094219@2x.png)

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094230@2x.png)

Containers：上面两个图，是container信息的截图，可以通过第一个图看到所管理的主机或者及集群的所有容器，点击需要管理的容器可以看到二图的容器详细信息，并且下面的按钮已经足够日常运维使用。Logs(查看日志)，inspect(相当于docker inspect，查看容器详细信息)，Stats(查看容器占据的性能信息，包括占用的内存cpu等信息)，Console(进入docker容器，相当于exec)，Attach(docker attach，不建议使用)

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094239@2x.png)

Images：很明了，是机器上的镜像操作，最上面可以通过页面进行pull操作，最下面有机器上的所有镜像的详细信息，可进行大部分镜像操作(删除，build，import导入)

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094250@2x.png)

Network：展现的是机器或者集群上network信息，在多机器docker维护中，经常需要创建维护docker network，

![](https://www.kubernetes.org.cn/img/2019/09/WX20190924-094259@2x.png)

Volume：Volume就是机器上的数据卷信息，提供创建删除查看的操作，比较明了

总结：上述就是docker管理平台Portainer的安装，接入和简单使用的操作。由于界面是纯英文的可能有同学使用不便，可以后台联系我或者百度找下中文汉化包。还有一个比较重点的问题，如果有多个docker host主机需要接入管理平台，如果一个个去更改docker配置比较麻烦，当然可以通过脚本去更改，如有需要可以后台联系提供脚本方案(需要提供你的环境大概信息)

文章由作者：辰木投稿，作者公众号：辰木运维，交流QQ：2697494971
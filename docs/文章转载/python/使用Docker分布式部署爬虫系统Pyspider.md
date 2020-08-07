---
title : 使用Docker分布式部署爬虫系统Pyspider
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-07 16:38:44 +0800
categories:
 -
tags:
 -
---
[[toc]]
# 阅读准备

1.  docker基础命令，docker\-compose基础
2.  pyspider基础

如果您不熟悉上面的内容，可以先网上查阅有关资料。

# 1\. 创建网络接口

首先，创建一个Driver为`bridge`的网络接口，命名为`pyspider`：
`docker network create --driver bridge pyspider`

*   说明1： 需要创建该网络接口的原因是：在下面创建Docker容器的过程中，我们使用了`docker`和`docker-compose`分别创建了不同的服务。按正常来说，如果都使用`docker-compose`来创建服务会更好；但是这里有些特殊需求，所有就混合使用`docker`和`docker-compose`来创建服务了。

*   说明2：直接使用`docker`命令创建容器时，容器的默认网络接口使用的是`NAME`为`bridge`的接口；而使用`docker-compose`时，默认的网络接口使用的不是`NAME` 为`bridge`的接口，而是根据`docker-compose.yml`文件所在目录命名的网络接口。如，我的`docker-compose.yml`文件在目录`Pyspider`下，则使用`docker-compose`时的默认网络接口就是`pyspider_default`。所以，如果我们使用`docker`和`docker-compose`时，默认的情况下它们属于不同的子网，网络不互通，这不是我们想要的。`dokcer`和`docker-compose`的网络接口都可以通过参数自定义，从而实现它们的服务的网络互通，所有我们才自己创建一个网络接口。

*   说明3：

    *   可以通过命令`docker network ls`查看已有的网络接口，如下图：

        ![](https://upload-images.jianshu.io/upload_images/2280774-8b2f3803fd7b44c3.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

        docker网络接口

    *   可以通过`docker network inspect bridge`命令查看网络接口的详细信息。如`NAME`为`bridge`的详细信息如下图：

        ![](https://upload-images.jianshu.io/upload_images/2280774-0e491a404e791f53.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

        查看网络接口信息

资料： [https://docs.docker.com/engine/userguide/networking/](https://link.jianshu.com?t=https://docs.docker.com/engine/userguide/networking/)

# 2\. 创建Redis服务

运行命令：`docker run --network=pyspider --name redis -d -p 6379:6379 redis` 创建Redis服务。

*   说明1：其中，参数`--network=pyspider`指定使用pyspider网络接口。我们可以使用`docker inspect redis | grep IPA`查看该容器的ip地址，如下图：

    ![](https://upload-images.jianshu.io/upload_images/2280774-24505797b417b289.png?imageMogr2/auto-orient/strip|imageView2/2/w/910/format/webp)

    查看容器ip地址

    我们还可以通过 `docker logs reids`查看容器redis的日志输出，来观察redis服务是否正常运行。

# 3\. 创建mysql服务

运行：`docker run --network pyspider -p 3306:3306 --name pymysql -v /Users/andy/Pyspider/mysql/conf/my.cnf:/etc/mysql/my.cnf -v /Users/andy/Pyspider/mysql/logs:/logs -v /Users/andy/Pyspider/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root123 -d mysql`以创建`mysql`服务。

*   说明：
    *   指定网络接口`--network=pyspider`
    *   `-p 3306:3306`指定端口号
    *   `-v /Users/andy/Pyspider/mysql/conf/my.cnf:/etc/mysql/my.cnf`指定mysql配置文件
    *   `-v /Users/andy/Pyspider/mysql/logs:/logs`指定日志目录
    *   `-v /Users/andy/Pyspider/mysql/data:/var/lib/mysql`指定mysql的数据文件存储目录
    *   `-e MYSQL_ROOT_PASSWORD=root123`指定`root`账户的密码为`root123`

用`docker inspect pymysql | grep IPA`查看mysql容器的ip地址。

![](https://upload-images.jianshu.io/upload_images/2280774-3d2b77a67ca43f55.png?imageMogr2/auto-orient/strip|imageView2/2/w/912/format/webp)

mysql容器ip地址

# 4\. 创建pyspider的scheduler服务

运行：`docker run --network=pyspider --name scheduler -d -p 23333:23333 --restart=always binux/pyspider --taskdb "mysql+taskdb://root:root123@172.20.0.2:3306/taskdb" --resultdb "mysql+projectdb://root:root123@172.20.0.2:3306/resultdb" --projectdb "mysql+projectdb://root:root123@172.20.0.2:3306/projectdb" --message-queue "redis://172.20.0.3:6379/0" scheduler --inqueue-limit 10000 --delete-time 3600`

*   参数说明

    *   `--network=pyspider`指定网络接口
    *   `-p 23333:23333`指定端口
    *   `root:root123@172.20.0.2:3306`为mysql服务的ip地址，端口，用户名和密码
    *   `redis://172.20.0.3:6379/0`为redis服务的配置。
    *   命令运行成功后，可以通过`docker logs scheduler`查看`scheduler`服务的运行情况。
*   查看`scheduler`的ip地址为：172.20.0.4，方便后边使用。

*   pyspider分布式部署中，`scheduer`服务只能创建一个。

# 5\. 使用docker\-compose创建pyspider的其它组件

配置文件`docker-compose.yml`的内容如下：

```yml
version: '2'
services:
  phantomjs:
    image: 'binux/pyspider:latest'
    command: phantomjs
    cpu_shares: 256
    environment:
      - 'EXCLUDE_PORTS=5000,23333,24444'
    expose:
      - '25555' # 暴露端口25555给link到此service的容器
    mem_limit: 256m
    restart: always

  phantomjs-lb:
    image: 'dockercloud/haproxy:latest' # 使用haproxy使用负载均衡
    links:
      - phantomjs
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock # docker-compose v2版本中haproxy需要指定docker socket(MAC系统中)
    restart: always

  fetcher:
    image: 'binux/pyspider:latest'
    command: '--message-queue "redis://172.20.0.3:6379/0" --phantomjs-proxy "phantomjs:80" fetcher --xmlrpc' # fetcher以rpc的方式启动
    cpu_shares: 256
    environment:
      - 'EXCLUDE_PORTS=5000,25555,23333'
    links:
      - 'phantomjs-lb:phantomjs'
    mem_limit: 256m
    restart: always

  fetcher-lb:
    image: 'dockercloud/haproxy:latest' # 使用haproxy使用负载均衡
    links:
      - fetcher
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock # docker-compose v2版本中haproxy需要指定docker socket(MAC系统中)
    restart: always

  processor:
    image: 'binux/pyspider:latest'
    command: '--projectdb "mysql+projectdb://root:root123@172.20.0.2:3306/projectdb" --message-queue "redis://172.20.0.3:6379/0" processor'
    cpu_shares: 256
    mem_limit: 256m
    restart: always

  result-worker:
    image: 'binux/pyspider:latest'
    command: '--taskdb "mysql+taskdb://root:root123@172.20.0.2:3306/taskdb"  --projectdb "mysql+projectdb://root:root123@172.20.0.2:3306/projectdb" --resultdb "mysql+resultdb://root:root123@172.20.0.2:3306/resultdb" --message-queue "redis://172.20.0.3:6379/0" result_worker'
    cpu_shares: 256
    mem_limit: 256m
    restart: always

  webui:
    image: 'binux/pyspider:latest'
    command: '--taskdb "mysql+taskdb://root:root123@172.20.0.2:3306/taskdb"  --projectdb "mysql+projectdb://root:root123@172.20.0.2:3306/projectdb" --resultdb "mysql+resultdb://root:root123@172.20.0.2:3306/resultdb" --message-queue "redis://172.20.0.3:6379/0" webui --max-rate 0.3 --max-burst 3 --scheduler-rpc "http://172.20.0.4:23333/" --fetcher-rpc "http://fetcher/"'
    cpu_shares: 256
    environment:
      - 'EXCLUDE_PORTS=24444,25555,23333'
    ports:
      - '5000:5000' # webui的对外的端口为5000，可以通过http://localhost:5000访问webui服务。
    links:
      - 'fetcher-lb:fetcher' # link到其它负载均衡haproxy的服务。
    mem_limit: 256m
    restart: always

networks:
  default:
    external:
      name: pyspider #指定docker-compose的网络接口为：pyspider；实现和docker run方式创建容器的互通。

```

*   `webui`服务说明
    *   `--fetcher-rpc "http://fetcher/"`是以服务名的方式指定webui链接到的fetcher服务，因为fetcher实例可以有很多个，我们如果用ip指定就不能起到负载均衡的目的了。
    *   `--scheduler-rpc "http://172.20.0.4:23333/"`是webui直接用ip和port的方式链接到`scheduler`服务，因为scheduler只有一个。
    *   command的其它参数可以参考pyspider的文档：[http://docs.pyspider.org/en/latest/](https://link.jianshu.com?t=http://docs.pyspider.org/en/latest/)
*   haproxy的文档：[https://github.com/docker/dockercloud\-haproxy](https://link.jianshu.com?t=https://github.com/docker/dockercloud-haproxy)
*   docker\-compose的文档：[https://docs.docker.com/compose/](https://link.jianshu.com?t=https://docs.docker.com/compose/)

`docker-compose.yml`文件写好后，运行`docker-compose up`（要在docker\-compose.yml所在目录）命令，`docker-compose`开始创建容器服务，如下图：

![](https://upload-images.jianshu.io/upload_images/2280774-39e76ff52df03a7b.png?imageMogr2/auto-orient/strip|imageView2/2/w/760/format/webp)

docker\-compose up

所有组件服务创建完成后，访问：[http://localhost:5000](https://link.jianshu.com?t=http://localhost:5000)，即可看到webui界面。

如果想创建更多的fetcher, result\_work, phantomjs容器实例，可以使用：`docker-compose scale phantomjs=2 processor=4 result-worker=2`。`docker-compose`会自动帮你创建2个phantomjs服务，4个processor服务，2个result\-worker服务；haproxy会自动实现负载均衡，如下图：

![](https://upload-images.jianshu.io/upload_images/2280774-002891ffaf82b930.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

docker\-compose scale

# 最后说明

1.  redis, mysql, scheudler服务的ip地址需要根据您的容器的ip具体而定。
2.  我所使用的系统为MAC，dokcer版本为：Version 17.06.0\-ce\-mac19 (18663)
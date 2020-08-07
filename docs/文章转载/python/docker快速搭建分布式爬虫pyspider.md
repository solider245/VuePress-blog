---
title : docker快速搭建分布式爬虫pyspider
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-07 16:56:19 +0800
categories:
 -
tags:
 -
---
[[toc]]
#### 简介

pyspider是Python中强大Web爬虫框架，并且支持分布式架构。

#### 为什么使用docker搭建pyspider

在安装pyspider时爬过一些坑，比如使用pip install pyspider时，python的版本要求在3.6及以下，因为async等已经是python3.7的关键字；
使用git clone代码安装pyspider,`python3 setup.py intall`,使用过程会遇到ssl证书的问题，总而言之，可能会遇到版本兼容问题。

#### 使用docker部署pyspider

*   docker的安装不做说明；
*   直接进入正题。

```shell
docker network create --driver bridge pyspider
mkdir -p  /volume1/docker/Pyspider/mysql/{conf,logs,data}/  /volume1/docker/Pyspider/redis/
docker run --network=pyspider --name redis -d -v /volume1/docker/Pyspider/redis:/data -p 6379:6379 redis
docker run --network pyspider -p 33060:3306 --name pymysql -v /volume1/docker/Pyspider/mysql/conf/my.cnf:/etc/mysql/my.cnf -v /volume1/docker/Pyspider/mysql/logs:/logs -v /volume1/docker/Pyspider/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root123 -d mysql

docker run --network=pyspider --name scheduler -d -p 23333:23333 --restart=always binux/pyspider --taskdb "mysql+taskdb://pyspider:py1234@192.168.2.4:33060:33060/taskdb" --resultdb "mysql+projectdb://pyspider:py1234@192.168.2.4:33060:33060/resultdb" --projectdb "mysql+projectdb://pyspider:py1234@192.168.2.4:33060:33060/projectdb" --message-queue "redis://redis:6379/0" scheduler --inqueue-limit 10000 --delete-time 3600
```

*   使用docker\-compose部署

    *   docker\-compose.yml

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
    command: '--message-queue "redis://redis:6379/0" --phantomjs-proxy "phantomjs:80" fetcher --xmlrpc' # fetcher以rpc的方式启动
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
    command: '--projectdb "mysql+projectdb://pyspider:py1234@192.168.2.4:33060/projectdb" --message-queue "redis://redis:6379/0" processor'
    cpu_shares: 256
    mem_limit: 256m
    restart: always

  result-worker:
    image: 'binux/pyspider:latest'
    command: '--taskdb "mysql+taskdb://pyspider:py1234@192.168.2.4:33060/taskdb"  --projectdb "mysql+projectdb://pyspider:py1234@192.168.2.4:33060/projectdb" --resultdb "mysql+resultdb://pyspider:py1234@192.168.2.4:33060/resultdb" --message-queue "redis://redis:6379/0" result_worker'
    cpu_shares: 256
    mem_limit: 256m
    restart: always

  webui:
    image: 'binux/pyspider:latest'
    command: '--taskdb "mysql+taskdb://pyspider:py1234@192.168.2.4:33060/taskdb"  --projectdb "mysql+projectdb://pyspider:py1234@192.168.2.4:33060/projectdb" --resultdb "mysql+resultdb://pyspider:py1234@192.168.2.4:33060/resultdb" --message-queue "redis://redis:6379/0" webui --max-rate 3 --max-burst 6 --scheduler-rpc "http://scheduler:23333/" --fetcher-rpc "http://fetcher/"'
    cpu_shares: 256
    environment:
      - 'EXCLUDE_PORTS=24444,25555,23333'
    ports:
      - '15000:5000' # webui的对外的端口为5000，可以通过http://localhost:5000访问webui服务。
    links:
      - 'fetcher-lb:fetcher' # link到其它负载均衡haproxy的服务。
    mem_limit: 256m
    restart: always

  webui-lb:
    image: 'dockercloud/haproxy:latest'
    links:
      - webui
    restart: always

  nginx:
    image: 'nginx'
    links:
      - 'webui-lb:HAPROXY'
    ports:
      - '5080:80'
    volumes:
      - /volume1/docker/Pyspider/nginx/nginx.conf:/etc/nginx/nginx.conf
      - /volume1/docker/Pyspider/nginx/conf.d/:/etc/nginx/conf.d/
      - /volume1/docker/Pyspider/nginx/sites-enabled/:/etc/nginx/sites-enabled/
    restart: always

networks:
  default:
    external:
      name: pyspider #指定docker-compose的网络接口为：pyspider；实现和docker run方式创建容器的互通。

```

*   访问url:
    [http://ip:15000](http://ip:15000)

*   web ui
    ![docker快速搭建分布式爬虫pyspider](https://i.imgur.com/bEaqnjQ.png)

如果想创建更多的fetcher, result\_work, phantomjs容器实例，可以使用： docker\-compose scale phantomjs=2 processor=4 result\-worker=2 docker\-compose会自动帮你创建2个phantomjs服务，4个processor服务，2个result\-worker服务；haproxy会自动实现负载均衡

[参考官方文档](http://docs.pyspider.org/en/latest/Deployment-demo.pyspider.org/)
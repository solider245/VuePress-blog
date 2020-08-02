---
title : 借助Dockerize更好的Docker体验
description : 
author : 中箭的吴起
image : https://images.unsplash.com/photo-1596247836784-9b90fb7aa32e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60
date : 2020-08-02 08:48:30 +0800
categories:
 -
tags:
 -
---
![借助Dockerize更好的Docker体验](https://rock-it.pl/content/images/2017/05/compose.png)

我的Docker映像和docker\-compose配置遇到一些问题。 让我们分析以下 `docker-compose.yml` 文件：

```yaml
version: '2'
services:
  database:
    image: postgres

  application:
    image: registry.example.com/our-application
    command: node
    ports:
      - 80:80

```

您在这里看到任何问题吗？ 可能不是，因为文件完全可以。 但是有问题！

当您运行时 `docker-compose up` ，docker会同时启动所有容器。 而且 **还有一场比赛** \-应用程序试图连接到数据库，这可能是仍在初始化。 对不可用数据库的典型反应是崩溃。 而且由于比赛，您可能不会每次都看到这个。 中间解决方案是将其添加 `restart: always` 到我们的应用程序配置中，然后重试直到数据库开始响应为止。 我们可以做得更好吗？ 当然。

## Dockerize

我找到了一个很好的小工具来解决此类问题。 它称为Dockerize，可以在 [Github](https://github.com/jwilder/dockerize) 上找到 。

首先，我们需要添加到我们的应用程序中 `Dockerfile` （从README复制）：

```docker
ENV DOCKERIZE_VERSION v0.4.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

```

接下来，让我们修改 `docker-compose.yml` 文件：

```yaml
services:
  ...
  application:
    image: registry.example.com/our-application
    command: dockerize -wait tcp://database:5432 node
  ...

```

没有更多的种族！ Dockerize将命令的启动延迟到数据库 **可用** 为止 。 不仅仅是开始\-它正在等待连接。 这是Dockerize和 [depends\_on](https://docs.docker.com/compose/compose-file/#dependson) 之间的 [区别](https://docs.docker.com/compose/compose-file/#dependson) 。

在其核心中，Dockerize是一个包装器。 `dockerize our_normal_command` 只是调用我们的命令。 但是，可选地，我们可以添加参数以 **延迟执行** ， **执行文件模板化** 或 **将输出从文件重定向到STDOUT / STDERR** 。 在Docker世界中非常常见且有用的操作。

例子：

```shell
# redirect files to stdout and stderr
dockerize \
  -stdout info.log \
  -stdout perf.log \
  ...

# wait for 2 services with 10s timeout
dockerize \
  -wait tcp://db:5432 \
  -wait http://web:80 \
  -timeout 10s \
  ...

# template option
dockerize \
  -template nginx.tmpl:nginx.conf \
  ...

```

模板示例（使用GO [模板语法](https://golang.org/pkg/text/template/) ）：

```go
http {
 server_name {{ .Env.HOST }};
 port {{ .Env.PORT }};
 location / {
  proxy_pass http://{{ .Env.UPSTREAM }};
 }
}

```

## 结论

我长期使用Dockerize，这确实使我的生活更轻松。 如果您有类似的问题，建议您尝试一下。
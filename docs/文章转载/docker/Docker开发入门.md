---
title : Docker开发入门
description : 
author : 中箭的吴起
image : 
date : 2020-08-02 08:44:58 +0800
categories:
 -
tags:
 -
---
![Docker开发入门](https://rock-it.pl/content/images/2017/10/container-home-n.jpg)

嘿，好久不见！ 今天，我想告诉您一些有关我几年来每天都在广泛使用的出色工具的信息。 它被称为 [Docker](http://docker.com/) ，我已经创建了 [一些关于](https://rock-it.pl/tag/docker/) [Docker的](http://docker.com/) [帖子](https://rock-it.pl/tag/docker/) ，但是它们都没有专门针对初学者。 **是时候修复它了** 。

## 我听说过Docker，但实际上是什么？

Docker是用于创建和运行“轻量级虚拟机”的工具。 它们以软件包的形式分发，这些软件包通常包含一小部分Linux发行版，运行应用程序所需的所有依赖项以及应用程序代码。 我们称它们为“ **码头工人图像** ”，您可以将它们视为“可执行黑匣子”。 该映像可用于创建任意数量的“ **容器** ”，隔离的进程，并可以访问所有准备好的依赖项。 重要的一点是 ，即使在不同的操作系统上启动 ， **每个容器也是映像的精确副本** 。 无论运行应用程序需要哪种技术或语言，如果已安装映像和泊坞窗，都可以运行它。

我想使本文简短，因此我将继续介绍Docker给您带来的好处。 如果您想了解更多信息，请查阅 [官方文档](https://docs.docker.com/engine/) 。

## 我为什么要给Docker一个机会？

记住，您不必全力以赴。

我的建议是，您应该逐步向应用程序添加Docker支持。 从开发开始。 告诉团队中的其他人他们可以使用docker，并演示如何使用它。 等待反应，让他们熟悉它。 等到他们问“ **为什么我们这么晚才发现它呢？** ”。 然后考虑生产集成，我会尽快写它。

在开发中，Docker允许将整个基础架构保留为代码，并与团队中的其他人共享。 你知道这样的对话吗？

---

**您** ：“嗨，克里斯，我的开发应用程序无法启动。您更改了某些内容吗？”

**克里斯** ：“哦，是的，我忘了告诉我们。我们现在有新的数据库引擎。此外，您需要安装Redis和驱动程序。这非常简单，请看一下文档，稍后再做。 ”

---

当然，它总是需要更多时间。 如果您在更大的团队中工作，则这种情况可能会更频繁地发生，并且很难发现。 使用Docker，要与更改同步，您只需运行 `docker-compose up --build` ，过一会儿，无论更改如何，都会运行新版本的开发堆栈。 此外， **将新开发人员引入该项目的过程看起来完全一样！** 想象一下，它可以节省多少时间？

就个人而言，我同时使用多种版本的公共依赖项（例如数据库）同时使用许多不同的技术。 Docker允许我隔离它们。 另外，无论采用哪种技术，我都可以以完全相同的方式开始工作\- `docker-compose up` 坚如磐石。

有一个名为 [Docker Hub](https://hub.docker.com/) 的地方 。 这是一家官方商店，具有大量可随时使用的图像，您可以在堆栈中使用它们。 您需要redis吗？ Postgres？ mysql，apache，php，nginx，python，ruby，nodejs？ 所有这些都只需单击一下即可！

## 好的，看起来很有希望。 如何开始？

**首先：安装`docker`和`docker-compose`。**
您可以 [在此处](https://docs.docker.com/engine/installation/) 和 [此处](https://docs.docker.com/compose/install/) 找到官方说明 。

---

**第二：`Dockerfile`在您的应用程序中添加适当的内容。**
Dockerfile包含需要运行的指令列表，以准备运行应用程序的环境。 例如，在这里您复制项目文件，安装所有系统和应用程序依赖项，设置所有必需的设置等。让我们看一下我用于Python项目的Dockerfile：

```docker
FROM python:3.6

ENV PROJECT_ROOT=/srv
WORKDIR $PROJECT_ROOT

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver"]

```

通常，您不需要任何奇特的东西。 要查找有关如何为您的语言创建Dockerfile的说明\-只需在Google上进行搜索，就有很多高质量的教程。

如果您想了解最佳实践， [我的文章](https://rock-it.pl/how-to-write-excellent-dockerfiles/) 已经为成千上万的读者提供了帮助。 另外，您可以检查 [官方的](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices) 。

---

**第三：创建`docker-compose.yml`文件。**
[Docker\-compose](https://docs.docker.com/compose/) 是一个出色的工具，它使我们能够轻松地同时管理容器堆栈。 这个特殊文件告诉docker\-compose应该启动哪些容器。

`docker-compose.yml` 我正在使用的 示例 ：

```yaml
version: '2'
services:
  redis:
    image: redis

  database:
    image: postgres

  app:
    build: .
    environment:
      DEBUG: 1
    ports:
      - 8000:8000
    volumes:
      - .:/srv
    command: python manage.py runserver

```

该文件告诉我们，我们希望使用官方映像创建Redis和Postgres，并使用本地Dockerfile构建应用程序，该文件可从外部Docker网络在端口8000上使用，并将所有本地文件安装到容器中以便于开发。 所有选项都可以在 [这里](https://docs.docker.com/compose/compose-file/) 找到 （我使用的是版本， `2` 因为 `3` 添加了Docker Swarm支持，开发不需要。）

现在，当我们键入时 `docker-compose up` ，将发生以下情况：

1.  Docker将尝试下载/创建所有必需的映像。 如果使用 `image` 选项，则默认情况下将从Internet下载 `DockerHub` 。 Option `build` 将指示Docker使用 `Dockerfile` 在特定目录（在我们的情况下 `.` ，当前目录）中 找到的 映像来构建映像 。 如果图像已经存在，将不会自动对其进行重新检查（为此，我们必须添加flag `--build` ）
2.  当图像可用时， `docker-compose` 将检查自上次运行以来配置是否发生更改。 如果不是，则启动先前使用的容器，否则创建新的容器。 诸如命令，端口，卷，变量，网络等设置均来自 `docker-compose.yml` 。
3.  除非另有说明，否则将创建一个跨所有创建的容器的特殊网络。 它允许他们使用名称而不是IP地址来引用其他人，例如，我们的应用程序数据库可在访问 `postgres:5432` 。
4.  所有容器都在同一时间启动，我们看到了所有容器的日志。

而已！ 现在，整个堆栈会自动启动。 当然，您应该做一些事情，例如自动创建一个不存在的数据库，或者在更改时重新加载应用程序代码，以使开发工作真正愉快。 重要的是，您只需要准备一次，整个团队就会立即从中受益。

**注意：** 在开发过程中，您可能应该始终 `volumes` 在 `docker-compose.yml` 文件中 使用 option ，将本地文件装入容器中。 如果没有此选项，则每次发生某些更改时都需要重建容器。

## 典型用法

这是我每天使用的最常见的命令。

**开始工作** ： `docker-compose up` 或者 `docker-compose up --rebuild` 如果您知道某些依赖项已更改

**运行一次性命令** ：这取决于我们是否需要其他可用的容器，例如数据库。 如果是，请使用上一个命令启动堆栈，然后在另一个终端窗口中运行 `docker-compose exec $SERVICE_NAME $COMMAND` 。 如果没有，请使用 `docker-compose run --rm $SERVICE_NAME $COMMAND` （我建议 `--rm` 在执行命令后自动清除标志）

**删除docker\-compose创建的所有内容** ： `docker-compose down` 。 它将破坏所有容器，图像和网络

**删除一个包含所有相关数据的容器** ：（ `docker-compose rm -v $SERVICE_NAME` 如果要硬重置数据库，这非常有用）

### 目前为止就这样了！

希望我的帖子能帮助您从 **Docker** 开始 。 如果您喜欢这篇文章并且想要更多，请随时在社交媒体上分享，这确实有助于保持动力。 谢谢，祝你有美好的一天:)
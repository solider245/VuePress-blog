---
title : docker-Compose官方教程
description : docker compose官方教程
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-02 21:51:29 +0800
categories:
 -
tags:
 - docker
---
[[toc]]
## 参考和准则 [🔗](#reference-and-guidelines)

这些主题描述了Compose文件格式的版本3。 这是最新版本。

## 撰写和Docker兼容性矩阵 [🔗](#compose-and-docker-compatibility-matrix)

有多种版本的Compose文件格式– 1，2，2.x和3.x。 下表是快速浏览。 有关每个版本包括什么以及如何升级的完整详细信息，请参阅 **[关于版本和升级](https://docs.docker.com/compose/compose-file/compose-versioning/)** 。

下表显示了哪些Compose文件版本支持特定的Docker版本。

| **撰写档案格式** | **Docker Engine版本** |
| --- | --- |
| 3.8 | 19.03.0+ |
| 3.7 | 18.06.0+ |
| 3.6 | 18.02.0+ |
| 3.5 | 17.12.0+ |
| 3.4 | 17.09.0+ |
| 3.3 | 17.06.0+ |
| 3.2 | 17.04.0+ |
| 3.1 | 1.13.1+ |
| 3.0 | 1.13.0+ |
| 2.4 | 17.12.0+ |
| 2.3 | 17.06.0+ |
| 2.2 | 1.13.0+ |
| 2.1 | 1.12.0+ |
| 2.0 | 1.10.0+ |
| 1.0 | 1.9.1。+ |

除了表中显示的Compose文件格式版本外，Compose本身也处于发布计划中，如 [Compose releases中](https://github.com/docker/compose/releases/) 所示 ，但是文件格式版本不一定随每个发行版增加。 例如，Compose文件格式3.0最初是在 [Compose版本1.10.0中](https://github.com/docker/compose/releases/tag/1.10.0) 引入的 ，并在随后的版本中逐渐版本化。

## 撰写文件结构和示例 [🔗](#compose-file-structure-and-examples)

这是 [Docker for Beginners实验](https://github.com/docker/labs/tree/master/beginner/) 主题中 使用的投票应用程序示例的Compose文件示例，该 主题涉及 [将应用程序部署到Swarm](https://github.com/docker/labs/blob/master/beginner/chapters/votingapp.md) ：

示例撰写文件版本3

```

version: "3.8"
services:

  redis:
    image: redis:alpine
    ports:
      - "6379"
    networks:
      - frontend
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  db:
    image: postgres:9.4
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend
    deploy:
      placement:
        max_replicas_per_node: 1
        constraints:
          - "node.role==manager"

  vote:
    image: dockersamples/examplevotingapp_vote:before
    ports:
      - "5000:80"
    networks:
      - frontend
    depends_on:
      - redis
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
      restart_policy:
        condition: on-failure

  result:
    image: dockersamples/examplevotingapp_result:before
    ports:
      - "5001:80"
    networks:
      - backend
    depends_on:
      - db
    deploy:
      replicas: 1
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  worker:
    image: dockersamples/examplevotingapp_worker
    networks:
      - frontend
      - backend
    deploy:
      mode: replicated
      replicas: 1
      labels: [APP=VOTING]
      restart_policy:
        condition: on-failure
        delay: 10s
        max_attempts: 3
        window: 120s
      placement:
        constraints:
          - "node.role==manager"

  visualizer:
    image: dockersamples/visualizer:stable
    ports:
      - "8080:8080"
    stop_grace_period: 1m30s
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    deploy:
      placement:
        constraints:
          - "node.role==manager"

networks:
  frontend:
  backend:

volumes:
  db-data:

```

此参考页上的主题按顶级键按字母顺序组织，以反映Compose文件本身的结构。 该配置文件，如在定义部分顶级键 `build` ， `deploy` ， `depends_on` ， `networks` ，等等，都列出了支持它们作为子课题的选项。 这映射到 `<key>: <option>: <value>` Compose文件 的 缩进结构。

## 服务配置参考 [🔗](#service-configuration-reference)

Compose文件是一个 [YAML](http://yaml.org/) 文件，用于定义 [服务](#service-configuration-reference) ， [网络](#network-configuration-reference) 和 [卷](#volume-configuration-reference) 。 撰写文件的默认路径为 `./docker-compose.yml` 。

> **提示** ：您可以 为此文件 使用a `.yml` 或 `.yaml` 扩展名。 他们俩都工作。

服务定义包含应用于该服务启动的每个容器的配置，就像将命令行参数传递给一样 `docker run` 。 同样，网络和卷定义类似于 `docker network create` 和 `docker volume create` 。

如 `docker run` ，在Dockerfile指定的选项，如 `CMD` ， `EXPOSE` ， `VOLUME` ， `ENV` ，在默认情况下尊重\-你不需要再次指定它们 `docker-compose.yml` 。

您可以使用类似Bash的 `${VARIABLE}` 语法 在配置值中使用环境变量 \- 有关完整详细信息， 请参见 [变量替换](#variable-substitution) 。

本节包含版本3中的服务定义支持的所有配置选项的列表。

### 建立 [🔗](#build)

在构建时应用的配置选项。

`build` 可以指定为包含构建上下文路径的字符串：

```
version: "3.8"
services:
  webapp:
    build: ./dir

```

或者，作为具有 [上下文](#context) 和（可选） [Dockerfile](#dockerfile) 和 [args](#args) 下指定的路径的对象 ：

```
version: "3.8"
services:
  webapp:
    build:
      context: ./dir
      dockerfile: Dockerfile-alternate
      args:
        buildno: 1

```

如果您指定 `image` 以及 `build` ，则Compose会使用中 指定 的 `webapp` 和可选 名称来命名构建的图像 ： `tag` `image`

```
build: ./dir
image: webapp:tag

```

这将产生一个名为 `webapp` 并标记 为的图像，该图像 `tag` 是从构建的 `./dir` 。

> 使用docker stack deploy时的注意事项
>
> [在以群集模式部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) `build` 时， [将](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 忽略 该 选项。 该 `docker stack` 命令不会在部署之前生成映像。

#### 语境

包含Dockerfile的目录的路径，或者git存储库的URL。

当提供的值是相对路径时，它将被解释为相对于Compose文件的位置。 此目录也是发送到Docker守护程序的构建上下文。

Compose用生成的名称构建并标记它，然后使用该图像。

```
build:
  context: ./dir

```

#### docker文件

备用Dockerfile。

Compose使用替代文件进行构建。 还必须指定一个构建路径。

```
build:
  context: .
  dockerfile: Dockerfile-alternate

```

#### args

添加构建参数，这是只能在构建过程中访问的环境变量。

首先，在Dockerfile中指定参数：

```
ARG buildno
ARG gitcommithash

RUN echo "Build number: $buildno"
RUN echo "Based on commit: $gitcommithash"

```

然后在 `build` 键 下指定参数 。 您可以传递映射或列表：

```
build:
  context: .
  args:
    buildno: 1
    gitcommithash: cdc3b19

```

```
build:
  context: .
  args:
    - buildno=1
    - gitcommithash=cdc3b19

```

> build\-args的范围
>
> 在Dockerfile中，如果您 `ARG` 在 `FROM` 指令 前 指定 ， `ARG` 则在下方的构建指令中不可用 `FROM` 。 如果您需要一个参数在两个地方都可用，请在 `FROM` 说明中 也指定它 。 有关用法的详细信息， 请参阅 文档中 的“ [了解ARGS和FROM之间的交互方式”](https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact) 部分。

您可以在指定构建参数时省略该值，在这种情况下，构建时的值就是运行Compose的环境中的值。

```
args:
  - buildno
  - gitcommithash

```

> 使用布尔值时的提示
>
> YAML布尔值（ `"true"` ， `"false"` ， `"yes"` ， `"no"` ， `"on"` ， `"off"` ）必须用引号括起来，这样分析器会将它们解释为字符串。

#### cache\_from

> 以 [3.2版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-32) 文件格式添加

引擎用于缓存解析的图像列表。

```
build:
  context: .
  cache_from:
    - alpine:latest
    - corp/web_app:3.14

```

#### 标签

> 以 [版本3.3](https://docs.docker.com/compose/compose-file/compose-versioning/#version-33) 文件格式添加

使用 [Docker标签](https://docs.docker.com/config/labels-custom-metadata/) 将元数据添加到生成的图像中 。 您可以使用数组或字典。

建议您使用反向DNS表示法，以防止标签与其他软件使用的标签冲突。

```
build:
  context: .
  labels:
    com.example.description: "Accounting webapp"
    com.example.department: "Finance"
    com.example.label-with-empty-value: ""

```

```
build:
  context: .
  labels:
    - "com.example.description=Accounting webapp"
    - "com.example.department=Finance"
    - "com.example.label-with-empty-value"

```

#### 网络

> 以 [3.4版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-34) 文件格式添加

设置网络容器的连接以 `RUN` 在构建过程中 进行 说明。

```
build:
  context: .
  network: host

```

```
build:
  context: .
  network: custom_network_1

```

用于 `none` 在构建期间禁用联网：

```
build:
  context: .
  network: none

```

#### shm\_size

> 以 [3.5版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-35) 文件格式添加

设置 `/dev/shm` 此构建容器 的 分区 大小 。 指定为表示字节数的整数值或表示 [字节值](#specifying-byte-values) 的字符串 。

```
build:
  context: .
  shm_size: '2gb'

```

```
build:
  context: .
  shm_size: 10000000

```

#### 目标

> 以 [3.4版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-34) 文件格式添加

建立内定义的指定阶段 `Dockerfile` 。 有关 详细信息， 请参见 [多阶段构建文档](https://docs.docker.com/develop/develop-images/multistage-build/) 。

```
build:
  context: .
  target: prod

```

### cap\_add， [cap\_drop🔗](#cap_add-cap_drop)

添加或删除容器功能。 请参阅 `man 7 capabilities` 以获取完整列表。

```
cap_add:
  - ALL

cap_drop:
  - NET_ADMIN
  - SYS_ADMIN

```

> 使用docker stack deploy时的注意事项
>
> [在群模式下部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 时 ， `cap_add` 和 `cap_drop` 选项将被忽略[](https://docs.docker.com/engine/reference/commandline/stack_deploy/)

### cgroup\_parent [🔗](#cgroup_parent)

为容器指定一个可选的父cgroup。

```
cgroup_parent: m-executor-abcd

```

> 使用docker stack deploy时的注意事项
>
> [在集群模式下部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) `cgroup_parent` 时， [将](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 忽略 该 选项[](https://docs.docker.com/engine/reference/commandline/stack_deploy/)

### 命令 [🔗](#command)

覆盖默认命令。

```
command: bundle exec thin -p 3000

```

该命令也可以是列表，类似于 [dockerfile](https://docs.docker.com/engine/reference/builder/#cmd) ：

```
command: ["bundle", "exec", "thin", "-p", "3000"]

```

### 配置 [🔗](#configs)

使用按服务 `configs` 配置 ，按服务授予对配置的访问权限 。 支持两种不同的语法变体。

> **注意** ：该配置必须已经存在或已 [在 `configs`](#configs-configuration-reference) 此堆栈文件 [的顶级](#configs-configuration-reference) [配置](#configs-configuration-reference) 中 [定义](#configs-configuration-reference) ，否则堆栈部署失败。

有关配置的更多信息，请参见 [configs](https://docs.docker.com/engine/swarm/configs/) 。

#### 短语法

简短的语法变体仅指定配置名称。 这将授予容器访问配置的权限，并将其安装在 `/<config_name>` 容器内。 源名称和目标安装点都设置为配置名称。

以下示例使用短语法来授予 `redis` 服务对 `my_config` 和 `my_other_config` 配置的 访问权限 。 的值 `my_config` 设置为file的内容 `./my_config.txt` ，并 `my_other_config` 定义为外部资源，这意味着它已经在Docker中定义，可以通过运行 `docker config create` 命令或通过其他堆栈部署进行定义。 如果外部配置不存在，则堆栈部署失败并显示 `config not found` 错误。

> 以 [版本3.3](https://docs.docker.com/compose/compose-file/compose-versioning/#version-33) 文件格式 添加 。
>
> `config` 版本3.3和更高版本的撰写文件格式仅支持定义。

```
version: "3.8"
services:
  redis:
    image: redis:latest
    deploy:
      replicas: 1
    configs:
      - my_config
      - my_other_config
configs:
  my_config:
    file: ./my_config.txt
  my_other_config:
    external: true

```

#### 长语法

长语法提供了在服务的任务容器中如何创建配置的更多粒度。

*   `source` ：Docker中存在的配置名称。
*   `target` ：要在服务的任务容器中挂载的文件的路径和名称。 `/<source>` 如果未指定 ， 则 默认为 。
*   `uid` 和 `gid` ：拥有服务任务容器中已安装的配置文件的数字UID或GID。 `0` 如果未指定，则 两者默认都 在Linux上。 Windows不支持。
*   `mode` ：服务的任务容器中装入的文件的权限，以八进制表示法。 例如， `0444` 表示世界可读。 默认值为 `0444` 。 由于配置文件已挂载在临时文件系统中，因此它们不可写，因此，如果设置可写位，则将其忽略。 可执行位可以设置。 如果您不熟悉UNIX文件权限模式，则可能会发现此 [权限计算器](http://permissions-calculator.org/) 很有用。

下面的示例设置的名称 `my_config` ，以 `redis_config` 在容器内，将模式设定为 `0440` （组可读），并且将所述用户和组 `103` 。 该 `redis` 服务无权访问该 `my_other_config` 配置。

```
version: "3.8"
services:
  redis:
    image: redis:latest
    deploy:
      replicas: 1
    configs:
      - source: my_config
        target: /redis_config
        uid: '103'
        gid: '103'
        mode: 0440
configs:
  my_config:
    file: ./my_config.txt
  my_other_config:
    external: true

```

您可以授予服务访问多个配置的权限，并且可以混合长短语法。 定义配置并不意味着授予对它的服务访问权限。

### CONTAINER\_NAME [🔗](#container_name)

指定自定义容器名称，而不是生成的默认名称。

```
container_name: my-web-container

```

由于Docker容器名称必须唯一，因此如果您指定了自定义名称，则无法将服务扩展到超过1个容器。 尝试这样做会导致错误。

> 使用docker stack deploy时的注意事项
>
> [在集群模式下部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) `container_name` 时， [将](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 忽略 该 选项[](https://docs.docker.com/engine/reference/commandline/stack_deploy/)

### credential\_spec [🔗](#credential_spec)

> 以 [版本3.3](https://docs.docker.com/compose/compose-file/compose-versioning/#version-33) 文件格式 添加 。
>
> 该 `credential_spec` 选项已在v3.3中添加。 文件格式版本3.8或更高版本支持将组托管服务帐户（gMSA）配置与撰写文件一起使用。

配置托管服务帐户的凭据规范。 此选项仅用于使用Windows容器的服务。 在 `credential_spec` 必须在格式 `file://<filename>` 或 `registry://<value-name>` 。

使用时 `file:` ，引用的文件必须存在于 `CredentialSpecs` Docker数据目录 的 子目录中，默认情况下 `C:\ProgramData\Docker\` 在Windows上。 以下示例从名为的文件中加载凭据规范 `C:\ProgramData\Docker\CredentialSpecs\my-credential-spec.json` ：

```
credential_spec:
  file: my-credential-spec.json

```

使用时 `registry:` ，将从守护程序主机上的Windows注册表中读取凭据规范。 具有给定名称的注册表值必须位于：

```
HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Virtualization\Containers\CredentialSpecs

```

以下示例从 `my-credential-spec` 注册表中 命名的值加载凭据规范 ：

```
credential_spec:
  registry: my-credential-spec

```

#### gMSA配置示例

为服务配置gMSA凭据规范时，您只需使用即可指定凭据规范 `config` ，如以下示例所示：

```
version: "3.8"
services:
  myservice:
    image: myimage:latest
    credential_spec:
      config: my_credential_spec

configs:
  my_credentials_spec:
    file: ./my-credential-spec.json|

```

### 取决于 [\_🔗](#depends_on)

表达服务之间的依赖性。 服务依赖项导致以下行为：

*   `docker-compose up` 以依赖性顺序启动服务。 在以下示例中， `db` 和 `redis` 在之前启动 `web` 。
*   `docker-compose up SERVICE` 自动包含 `SERVICE` 的依赖项。 在下面的示例中， `docker-compose up web` 还将创建并启动 `db` 和 `redis` 。
*   `docker-compose stop` 按依赖关系顺序停止服务。 在以下示例中， `web` 在 `db` 和 之前停止 `redis` 。

简单的例子：

```
version: "3.8"
services:
  web:
    build: .
    depends_on:
      - db
      - redis
  redis:
    image: redis
  db:
    image: postgres

```

> 使用时有几件事要注意 `depends_on` ：
>
> *   `depends_on` 在启动之前 不等待 `db` 并且 `redis` “准备就绪” `web` \-仅 在启动 之前。 如果需要等待服务准备就绪，请参阅 [控制启动顺序以](https://docs.docker.com/compose/startup-order/) 获取有关此问题的更多信息以及解决该问题的策略。
> *   版本3不再支持的 `condition` 形式 `depends_on` 。
> *   [在以群体模式](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 3版本的Compose文件 [部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) `depends_on` 时， [将](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 忽略 该 选项 。

### 部署 [🔗](#deploy)

> 以 [版本3](https://docs.docker.com/compose/compose-file/compose-versioning/#version-3) 文件格式 添加 。

指定与服务的部署和运行有关的配置。 这只能部署到时生效 [群](https://docs.docker.com/engine/swarm/) 与 [泊坞窗堆栈部署](https://docs.docker.com/engine/reference/commandline/stack_deploy/) ，并且被忽略 `docker-compose up` 和 `docker-compose run` 。

```
version: "3.8"
services:
  redis:
    image: redis:alpine
    deploy:
      replicas: 6
      placement:
        max_replicas_per_node: 1
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

```

有几个子选项可用：

#### 端点模式

> 以 [3.2版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-32) 文件格式 添加 。

为连接到群集的外部客户端指定服务发现方法。

*   `endpoint_mode: vip` \-Docker为服务分配了一个虚拟IP（VIP），该虚拟IP充当客户端访问网络上服务的前端。 Docker在客户端和服务的可用工作程序节点之间路由请求，而无需客户端知道有多少节点正在参与服务或其IP地址或端口。 （这是默认设置。）

*   `endpoint_mode: dnsrr` \-DNS轮询（DNSRR）服务发现不使用单个虚拟IP。 Docker设置服务的DNS条目，以便对服务名称的DNS查询返回IP地址列表，并且客户端直接连接到其中之一。 在想要使用自己的负载平衡器或混合Windows和Linux应用程序的情况下，DNS轮询很有用。

```
version: "3.8"

services:
  wordpress:
    image: wordpress
    ports:
      - "8080:80"
    networks:
      - overlay
    deploy:
      mode: replicated
      replicas: 2
      endpoint_mode: vip

  mysql:
    image: mysql
    volumes:
       - db-data:/var/lib/mysql/data
    networks:
       - overlay
    deploy:
      mode: replicated
      replicas: 2
      endpoint_mode: dnsrr

volumes:
  db-data:

networks:
  overlay:

```

的选项 `endpoint_mode` 还可以在群集模式CLI命令 [docker service create](https://docs.docker.com/engine/reference/commandline/service_create/) 上用作标志 。 有关所有swarm相关 `docker` 命令 的快速列表 ，请参阅 [Swarm模式CLI命令](https://docs.docker.com/engine/swarm/#swarm-mode-key-concepts-and-tutorial) 。

要了解有关在群集模式下进行服务发现和联网的更多信息，请参阅在群集模式下 [配置服务发现](https://docs.docker.com/engine/swarm/networking/#configure-service-discovery) 主题。

#### 标签

指定服务标签。 这些标签 *仅* 在服务上设置， *而不* 在服务的任何容器上设置。

```
version: "3.8"
services:
  web:
    image: web
    deploy:
      labels:
        com.example.description: "This label will appear on the web service"

```

在容器上的标签集代替，使用 `labels` 的键外 `deploy` ：

```
version: "3.8"
services:
  web:
    image: web
    labels:
      com.example.description: "This label will appear on all containers for the web service"

```

#### 模式

任一 `global` （正好一个每群节点容器）或 `replicated` （容器的指定数量）。 默认值为 `replicated` 。 （要了解更多信息，请参阅 [群集](https://docs.docker.com/engine/swarm/) 主题 中的 [复制服务和全局服务](https://docs.docker.com/engine/swarm/how-swarm-mode-works/services/#replicated-and-global-services) 。）[](https://docs.docker.com/engine/swarm/)

```
version: "3.8"
services:
  worker:
    image: dockersamples/examplevotingapp_worker
    deploy:
      mode: global

```

#### 放置

指定约束和首选项的位置。 有关语法以及 [约束](https://docs.docker.com/engine/reference/commandline/service_create/#specify-service-constraints---constraint) ， [首选项的](https://docs.docker.com/engine/reference/commandline/service_create/#specify-service-placement-preferences---placement-pref) 可用类型的完整说明 ，以及 [指定每个节点的最大副本数](https://docs.docker.com/engine/reference/commandline/service_create/#specify-maximum-replicas-per-node---replicas-max-per-node) ， 请参阅docker服务create文档。[](https://docs.docker.com/engine/reference/commandline/service_create/#specify-maximum-replicas-per-node---replicas-max-per-node)

```
version: "3.8"
services:
  db:
    image: postgres
    deploy:
      placement:
        constraints:
          - "node.role==manager"
          - "engine.labels.operatingsystem==ubuntu 18.04"
        preferences:
          - spread: node.labels.zone

```

#### max\_replicas\_per\_node

> 以 [3.8版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-38) 文件格式 添加 。

如果服务是 `replicated` （默认）服务，请 [限制](https://docs.docker.com/engine/reference/commandline/service_create/#specify-maximum-replicas-per-node---replicas-max-per-node) 可随时在节点上运行 [的副本数](https://docs.docker.com/engine/reference/commandline/service_create/#specify-maximum-replicas-per-node---replicas-max-per-node) 。

当请求的任务多于运行节点时，将 `no suitable node (max replicas per node limit exceed)` 引发 错误 。

```
version: "3.8"
services:
  worker:
    image: dockersamples/examplevotingapp_worker
    networks:
      - frontend
      - backend
    deploy:
      mode: replicated
      replicas: 6
      placement:
        max_replicas_per_node: 1

```

#### 复制品

如果服务是 `replicated` （默认）服务，请指定在任何给定时间应运行的容器数。

```
version: "3.8"
services:
  worker:
    image: dockersamples/examplevotingapp_worker
    networks:
      - frontend
      - backend
    deploy:
      mode: replicated
      replicas: 6

```

#### 资源

配置资源约束。

> 更改了撰写文件版本3
>
> 该 `resources` 部分取代了 [旧的资源约束选项](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources) 在撰写第3版之前的文件（ `cpu_shares` ， `cpu_quota` ， `cpuset` ， `mem_limit` ， `memswap_limit` ， `mem_swappiness` ）。 请参阅 [将版本2.x升级到3.x，](https://docs.docker.com/compose/compose-file/compose-versioning/#upgrading) 以了解版本2和版本3的撰写文件格式之间的差异。

其中每个都是一个值，类似于其 [docker服务create](https://docs.docker.com/engine/reference/commandline/service_create/) 对应项。

在此一般示例中， `redis` 服务被限制为使用不超过50M的内存和 `0.50` （单核的50％）可用的处理时间（CPU），并且具有 保留 `20M` 的内存和 `0.25` CPU时间（始终可用）。

```
version: "3.8"
services:
  redis:
    image: redis:alpine
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 50M
        reservations:
          cpus: '0.25'
          memory: 20M

```

以下主题描述了可用于设置群中服务或容器的资源约束的可用选项。

> 寻找用于在非群模式容器上设置资源的选项吗？
>
> 此处描述的选项特定于 `deploy` 键和群模式。 如果要在非群集部署中设置资源限制，请使用 [Compose文件格式版本2 CPU，内存和其他资源选项](https://docs.docker.com/compose/compose-file/compose-file-v2/#cpu-and-other-resources) 。 如果您还有其他问题，请参阅有关GitHub问题 [docker / compose / 4513](https://github.com/docker/compose/issues/4513) 的讨论 。

##### 内存不足异常（OOME）

如果您的服务或容器尝试使用的内存超过系统可用的内存，则可能会遇到内存不足异常（OOME），并且容器或Docker守护程序可能会被内核OOM杀手杀死。 为防止这种情况的发生，请确保您的应用程序在具有足够内存的主机上运行，​​请参阅 [了解](https://docs.docker.com/config/containers/resource_constraints/#understand-the-risks-of-running-out-of-memory) 内存不足 [的风险](https://docs.docker.com/config/containers/resource_constraints/#understand-the-risks-of-running-out-of-memory) 。

#### restart\_policy

配置是否以及如何在退出容器时重新启动容器。 替换 [`restart`](https://docs.docker.com/compose/compose-file/compose-file-v2/#orig-resources) 。

*   `condition` ：其一 `none` ， `on-failure` 或者 `any` （默认值： `any` ）。
*   `delay` ：重新启动尝试之间等待的 [时间](#specifying-durations) ，指定为 [持续时间](#specifying-durations) （默认值：0）。
*   `max_attempts` ：放弃之前尝试重新启动容器的次数（默认值：永不放弃）。 如果重启未在configure内成功完成 `window` ，则此尝试不会计入配置 `max_attempts` 值。 例如，如果 `max_attempts` 设置为“ 2”，并且第一次尝试重启失败，则可能尝试两次以上重启。
*   `window` ：决定重新启动是否成功之前要等待的 [时间](#specifying-durations) ，指定为 [持续时间](#specifying-durations) （默认值：立即决定）。

```
version: "3.8"
services:
  redis:
    image: redis:alpine
    deploy:
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s

```

#### rollback\_config

> 以 [3.7版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-37) 文件格式 添加 。

配置在更新失败的情况下应如何回滚服务。

*   `parallelism` ：一次要回滚的容器数。 如果设置为0，则所有容器将同时回滚。
*   `delay` ：每个容器组回滚之间等待的时间（默认为0s）。
*   `failure_action` ：如果回滚失败，该怎么办。 其中一个 `continue` 或者 `pause` （默认 `pause` ）
*   `monitor` ：更新每个任务以监视失败后的持续时间 `(ns|us|ms|s|m|h)` （默认为0s）。
*   `max_failure_ratio` ：在回滚期间可以容忍的故障率（默认为0）。
*   `order` ：回滚期间的操作顺序。 其中一个 `stop-first` （旧任务，开始新的一个前停止），或者 `start-first` （新的任务首先启动，并且正在运行的任务简单地重叠）（默认 `stop-first` ）。

#### update\_config

配置应如何更新服务。 对于配置滚动更新很有用。

*   `parallelism` ：一次更新的容器数。
*   `delay` ：在更新一组容器之间等待的时间。
*   `failure_action` ：如果更新失败，该怎么办。 其中一个 `continue` ， `rollback` 或者 `pause` （默认： `pause` ）。
*   `monitor` ：更新每个任务以监视失败后的持续时间 `(ns|us|ms|s|m|h)` （默认为0s）。
*   `max_failure_ratio` ：更新期间可以容忍的故障率。
*   `order` ：更新期间的操作顺序。 其中一个 `stop-first` （旧任务，开始新的一个前停止），或者 `start-first` （新的任务首先启动，并且正在运行的任务简单重叠）（默认 `stop-first` ） **注** ：仅支持V3.4及更高版本。

> 以 [3.4版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-34) 文件格式 添加 。
>
> `order` v3.4及更高版本的撰写文件格式仅支持 该 选项。

```
version: "3.8"
services:
  vote:
    image: dockersamples/examplevotingapp_vote:before
    depends_on:
      - redis
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
        delay: 10s
        order: stop-first

```

#### 不支持 `docker stack deploy`

下面的子选项（支持 `docker-compose up` 和 `docker-compose run` ）是 *不支持* 的 `docker stack deploy` 或 `deploy` 关键的。

*   [建立](#build)
*   [cgroup\_parent](#cgroup_parent)
*   [container\_name](#container_name)
*   [设备](#devices)
*   [tmpfs](#tmpfs)
*   [外部链接](#external_links)
*   [链接](#links)
*   [网络模式](#network_mode)
*   [重新开始](#restart)
*   [security\_opt](#security_opt)
*   [userns\_mode](#userns_mode)

> 小费
>
> 请参阅有关 [如何为服务，群集和docker\-stack.yml文件配置卷](#volumes-for-services-swarms-and-stack-files) 的部分 。 卷 *是* 受支持的，但是要与群集和服务一起使用，必须将它们配置为命名卷或与受约束于有权访问必需卷的节点的服务关联。

### 设备 [🔗](#devices)

设备映射列表。 使用与 `--device` docker client create选项 相同的格式 。

```
devices:
  - "/dev/ttyUSB0:/dev/ttyUSB0"

```

> 使用docker stack deploy时的注意事项
>
> [在集群模式下部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) `devices` 时， [将](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 忽略 该 选项[](https://docs.docker.com/engine/reference/commandline/stack_deploy/)

### DNS [🔗](#dns)

自定义DNS服务器。 可以是单个值或列表。

```
dns: 8.8.8.8

```

```
dns:
  - 8.8.8.8
  - 9.9.9.9

```

### dns\_search [🔗](#dns_search)

自定义DNS搜索域。 可以是单个值或列表。

```
dns_search: example.com

```

```
dns_search:
  - dc1.example.com
  - dc2.example.com

```

### 入口点 [🔗](#entrypoint)

覆盖默认入口点。

```
entrypoint: /code/entrypoint.sh

```

入口点也可以是列表，类似于 [dockerfile](https://docs.docker.com/engine/reference/builder/#entrypoint) ：

```
entrypoint: ["php", "-d", "memory_limit=-1", "vendor/bin/phpunit"]

```

> **注意**
>
> 设置 `entrypoint` 两者都将使用 `ENTRYPOINT` Dockerfile指令 覆盖服务映像上 设置的 任何默认入口点 ， *并* 清除映像上的任何默认命令\-这意味着如果 `CMD` Dockerfile中 有 指令，则将其忽略。

### env\_file [🔗](#env_file)

从文件添加环境变量。 可以是单个值或列表。

如果您使用指定了Compose文件 `docker-compose -f FILE` ，则in `env_file` 的 路径 相对于该文件所在的目录。

在 [环境](#environment) 部分中 声明的环境变量将 *覆盖* 这些值–即使这些值为空或未定义，也是如此。

```
env_file: .env

```

```
env_file:
  - ./common.env
  - ./apps/web.env
  - /opt/runtime_opts.env

```

Compose期望环境文件中的每一行都采用 `VAR=VAL` 格式。 以开头的行 `#` 被视为注释，并被忽略。 空行也将被忽略。

```
# Set Rails/Rack environment
RACK_ENV=development

```

> **注意**
>
> 如果您的服务指定了 [构建](#build) 选项，则 在构建过程 中 *不会* 自动显示 环境文件中定义的变量 。 使用的 [args](#args) 子选项 `build` 来定义构建时环境变量。

的值按 `VAL` 原样使用，根本没有修改。 例如，如果该值用引号引起来（通常是shell变量），则引号包含在传递给Compose的值中。

请记住， *列表中文件的顺序对于确定分配给多次显示的变量的值很重要* 。 列表中的文件从上到下进行处理。 对于在file中指定并在file中 `a.env` 分配了不同值 的相同变量 `b.env` ，如果 `b.env` 在下面（之后）列出，则来自标准位的值 `b.env` 。 例如，在中给出以下声明 `docker-compose.yml` ：

```
services:
  some-service:
    env_file:
      - a.env
      - b.env

```

和以下文件：

```
# a.env
VAR=1

```

和

```
# b.env
VAR=hello

```

`$VAR` 是 `hello` 。

### 环境 [🔗](#environment)

添加环境变量。 您可以使用数组或字典。 任何布尔值（true，false，yes，no）都需要用引号引起来，以确保YML解析器不会将其转换为True或False。

仅具有键的环境变量在运行Compose的计算机上解析为它们的值，这对于秘密或特定于主机的值很有用。

```
environment:
  RACK_ENV: development
  SHOW: 'true'
  SESSION_SECRET:

```

```
environment:
  - RACK_ENV=development
  - SHOW=true
  - SESSION_SECRET

```

> **注意**
>
> 如果您的服务指定了 [构建](#build) 选项， `environment` 则 在构建过程 中 *不会* 自动显示中 定义的变量 。 使用的 [args](#args) 子选项 `build` 来定义构建时环境变量。

### 暴露 [🔗](#expose)

公开端口而不将其发布到主机上\-只有链接的服务才能访问它们。 只能指定内部端口。

```
expose:
  - "3000"
  - "8000"

```

### external\_links [🔗](#external_links)

链接到在此范围之外 `docker-compose.yml` 甚至在Compose之外 开始的容器 ，特别是对于提供共享或公共服务的容器。 同时指定容器名称和链接别名（ ） 时，请 `external_links` 遵循与legacy选项相似的语义 。 `links` `CONTAINER:ALIAS`

```
external_links:
  - redis_1
  - project_db_1:mysql
  - project_db_1:postgresql

```

> **注意**
>
> 外部创建的容器必须连接到与链接到它们的服务相同的网络中的至少一个。 [链接](https://docs.docker.com/compose/compose-file/compose-file-v2#links) 是旧选项。 我们建议 改为 使用 [网络](#networks) 。

> 使用docker stack deploy时的注意事项
>
> [在集群模式下部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) `external_links` 时， [将](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 忽略 该 选项[](https://docs.docker.com/engine/reference/commandline/stack_deploy/)

### extra\_hosts [🔗](#extra_hosts)

添加主机名映射。 使用与docker client `--add-host` 参数 相同的值 。

```
extra_hosts:
  - "somehost:162.242.195.82"
  - "otherhost:50.31.209.229"

```

在 `/etc/hosts` 此服务的内部容器中 创建一个具有ip地址和主机名的条目 ，例如：

```
162.242.195.82  somehost
50.31.209.229   otherhost

```

### 健康 [检查🔗](#healthcheck)

配置运行的检查以确定该服务的容器是否“健康”。 有关运行 [状况检查](https://docs.docker.com/engine/reference/builder/#healthcheck) 如何工作的详细信息， 请参阅文档中的 [HEALTHCHECK Dockerfile指令](https://docs.docker.com/engine/reference/builder/#healthcheck) 。

```
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 1m30s
  timeout: 10s
  retries: 3
  start_period: 40s

```

`interval` ， `timeout` 并 `start_period` 指定为 [duration](#specifying-durations) 。

> 以 [3.4版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-34) 文件格式 添加 。
>
> 该 `start_period` 选项以文件格式3.4添加。

`test` 必须是字符串或列表。 如果它是一个列表，第一项必须是 `NONE` ， `CMD` 或 `CMD-SHELL` 。 如果是字符串，则等效于指定 `CMD-SHELL` 后跟该字符串。

```
# Hit the local web app
test: ["CMD", "curl", "-f", "http://localhost"]

```

如上所述，但包裹在中 `/bin/sh` 。 以下两种形式是等效的。

```
test: ["CMD-SHELL", "curl -f http://localhost || exit 1"]

```

```
test: curl -f https://localhost || exit 1

```

要禁用图像设置的任何默认运行状况检查，可以使用 `disable: true` 。 这等效于指定 `test: ["NONE"]` 。

```
healthcheck:
  disable: true

```

### 图片 [🔗](#image)

指定用于启动容器的图像。 可以是存储库/标签或部分图像ID。

```
image: redis

```

```
image: ubuntu:18.04

```

```
image: tutum/influxdb

```

```
image: example-registry.com:4000/postgresql

```

```
image: a4bc65fd

```

如果图像不存在，除非您还指定了 [build](#build) ，否则Compose会尝试拉出它， 在这种情况下，它将使用指定的选项来构建它并使用指定的标签对其进行标记。

### 初始化 [🔗](#init)

> 以 [3.7版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-37) 文件格式 添加 。

在容器内运行一个初始化程序，以转发信号并获取进程。 设置此选项可以 `true` 为服务启用此功能。

```
version: "3.8"
services:
  web:
    image: alpine:latest
    init: true

```

> 使用的默认初始化二进制文件是 [Tini](https://github.com/krallin/tini) ，并安装在 `/usr/libexec/docker-init` 守护程序主机上。 您可以通过 [`init-path`配置选项](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file) 将守护程序配置为使用自定义init二进制文件 。

### 隔离 [🔗](#isolation)

指定容器的隔离技术。 在Linux上，唯一支持的值是 `default` 。 在Windows中，可接受的值是 `default` ， `process` 和 `hyperv` 。 有关详细信息， 请参考 [Docker Engine文档](https://docs.docker.com/engine/reference/commandline/run/#specify-isolation-technology-for-container---isolation) 。

### 标签 [🔗](#labels-2)

使用 [Docker标签](https://docs.docker.com/config/labels-custom-metadata/) 将元数据添加到容器 。 您可以使用数组或字典。

建议您使用反向DNS表示法，以防止标签与其他软件使用的标签冲突。

```
labels:
  com.example.description: "Accounting webapp"
  com.example.department: "Finance"
  com.example.label-with-empty-value: ""

```

```
labels:
  - "com.example.description=Accounting webapp"
  - "com.example.department=Finance"
  - "com.example.label-with-empty-value"

```

### 链接 [🔗](#links)

> **警告**
>
> 该 `--link` 标志是Docker的遗留功能。 它最终可能会被删除。 除非您绝对需要继续使用它，否则建议您使用 [用户定义的网络](https://docs.docker.com/compose/networking/) 来促进两个容器之间的通信，而不要使用 `--link` 。
>
> 用户定义的网络不支持您可以使用的功能之一 `--link` 是在容器之间共享环境变量。 但是，您可以使用其他机制（例如卷）以更可控的方式在容器之间共享环境变量。

链接到另一个服务中的容器。 指定服务名称和链接别名（ `"SERVICE:ALIAS"` ），或者仅指定服务名称。

```
web:
  links:
    - "db"
    - "db:database"
    - "redis"

```

链接服务的容器可以通过与别名相同的主机名访问，如果未指定别名，则可以使用服务名。

不需要链接即可使服务进行通信\-默认情况下，任何服务都可以使用该服务的名称访问任何其他服务。 （另请参见 [Compose中的Networking中](https://docs.docker.com/compose/networking/#links) 的 [Links主题](https://docs.docker.com/compose/networking/#links) 。）

链接也以与 [depends\_on](#depends_on) 相同的方式表示服务之间的依赖关系 ，因此它们确定了服务启动的顺序。

> **注意**
>
> 如果同时定义链接和 [网络](#networks) ，则它们之间具有链接的服务必须共享至少一个公共网络才能进行通信。

> 使用docker stack deploy时的注意事项
>
> [在集群模式下部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) `links` 时， [将](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 忽略 该 选项[](https://docs.docker.com/engine/reference/commandline/stack_deploy/)

### 记录 [🔗](#logging)

服务的日志记录配置。

```
logging:
  driver: syslog
  options:
    syslog-address: "tcp://192.168.0.42:123"

```

该 `driver` 名称指定了服务容器的日志记录驱动程序，以及 `--log-driver` docker run选项（ [在此处记录](https://docs.docker.com/config/containers/logging/configure/) ）。

默认值为json\-file。

```
driver: "json-file"

```

```
driver: "syslog"

```

```
driver: "none"

```

> **注意**
>
> 只有 `json-file` 和 `journald` 驱动程序才能从 `docker-compose up` 和 直接提供日志 `docker-compose logs` 。 使用任何其他驱动程序不会打印任何日志。

使用 `options` 键 为日志记录驱动程序指定日志记录选项 ，如的 `--log-opt` 选项 `docker run` 。

日志记录选项是键值对。 `syslog` 选项 示例 ：

```
driver: "syslog"
options:
  syslog-address: "tcp://192.168.0.42:123"

```

默认驱动程序 [json\-file](https://docs.docker.com/config/containers/logging/json-file/) ，具有用于限制所存储日志数量的选项。 为此，请使用键值对以获取最大存储大小和最大文件数：

```
options:
  max-size: "200k"
  max-file: "10"

```

上面显示的示例将存储日志文件，直到它们达到 `max-size` 200kB，然后旋转它们。 单个日志文件的存储量由该 `max-file` 值 指定 。 随着日志超过最大限制，将删除较旧的日志文件以允许存储新日志。

这是一个 `docker-compose.yml` 限制日志存储 的示例 文件：

```
version: "3.8"
services:
  some-service:
    image: some-service
    logging:
      driver: "json-file"
      options:
        max-size: "200k"
        max-file: "10"

```

> 可用的日志记录选项取决于您使用的日志记录驱动程序
>
> 上面用于控制日志文件和大小的示例使用特定于 [json\-file driver的](https://docs.docker.com/config/containers/logging/json-file/) 选项 。 这些特定选项在其他日志记录驱动程序上不可用。 有关受支持的日志记录驱动程序及其选项的完整列表，请参阅 [日志记录驱动程序](https://docs.docker.com/config/containers/logging/configure/) 文档。

### network\_mode [🔗](#network_mode)

网络模式。 使用与docker client `--network` 参数 相同的值 ，以及特殊形式 `service:[service name]` 。

```
network_mode: "bridge"

```

```
network_mode: "host"

```

```
network_mode: "none"

```

```
network_mode: "service:[service name]"

```

```
network_mode: "container:[container name/id]"

```

> **注意**
>
> *   [在集群模式下部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 时， [将](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 忽略此选项 。
> *   `network_mode: "host"` 不能与 [链接](#links) 混合在一起 。

### 网络 [🔗](#networks)

要加入的网络，引用 [顶级 `networks` 密钥](#network-configuration-reference) 下的条目 。

```
services:
  some-service:
    networks:
     - some-network
     - other-network

```

#### 别名

网络上此服务的别名（备用主机名）。 同一网络上的其他容器可以使用服务名称或此别名来连接到服务的容器之一。

由于 `aliases` 是网络范围的，因此同一服务在不同的网络上可以具有不同的别名。

> **注意**
>
> 网络范围内的别名可以由多个容器甚至多个服务共享。 如果是这样，则不能保证名称解析到哪个容器。

一般格式如下所示。

```
services:
  some-service:
    networks:
      some-network:
        aliases:
          - alias1
          - alias3
      other-network:
        aliases:
          - alias2

```

在下面的例子中，提供了三种服务（ `web` ， `worker` ，和 `db` ），其中两个网络（沿 `new` 和 `legacy` ）。 该 `db` 服务是在到达的主机名 `db` 或 `database` 上 `new` 网络，并 `db` 或 `mysql` 将上 `legacy` 网络。

```
version: "3.8"

services:
  web:
    image: "nginx:alpine"
    networks:
      - new

  worker:
    image: "my-worker-image:latest"
    networks:
      - legacy

  db:
    image: mysql
    networks:
      new:
        aliases:
          - database
      legacy:
        aliases:
          - mysql

networks:
  new:
  legacy:

```

#### ipv4\_address，ipv6\_address

加入网络后，为此服务的容器指定一个静态IP地址。

[顶级网络部分中](#network-configuration-reference) 的相应网络配置 必须具有一个 `ipam` 块，其中子网配置覆盖每个静态地址。

> 如果需要IPv6寻址，则 [`enable_ipv6`](https://docs.docker.com/compose/compose-file/compose-file-v2/#enable_ipv6) 必须设置 该 选项，并且必须使用 [2.x版本的Compose文件](https://docs.docker.com/compose/compose-file/compose-file-v2/#ipv4_address-ipv6_address) 。 *IPv6选项当前在群集模式下不起作用* 。

一个例子：

```
version: "3.8"

services:
  app:
    image: nginx:alpine
    networks:
      app_net:
        ipv4_address: 172.16.238.10
        ipv6_address: 2001:3984:3989::10

networks:
  app_net:
    ipam:
      driver: default
      config:
        - subnet: "172.16.238.0/24"
        - subnet: "2001:3984:3989::/64"

```

### PID [🔗](#pid)

```
pid: "host"

```

将PID模式设置为主机PID模式。 这将打开容器和主机操作系统之间的PID地址空间共享。 使用此标志启动的容器可以访问和操作裸机名称空间中的其他容器，反之亦然。

### 港口 [🔗](#ports)

露出端口。

> **注意**
>
> 端口映射与 `network_mode: host`

#### 短语法

要么指定两个端口（ `HOST:CONTAINER` ），要么仅指定容器端口（选择了临时主机端口）。

> **注意**
>
> 当以该 `HOST:CONTAINER` 格式 映射端口 时，使用低于60的容器端口可能会遇到错误的结果，因为YAML会将格式 `xx:yy` 中的 数字解析 为以60为底的值。 因此，我们建议始终将端口映射显式指定为字符串。

```
ports:
  - "3000"
  - "3000-3005"
  - "8000:8000"
  - "9090-9091:8080-8081"
  - "49100:22"
  - "127.0.0.1:8001:8001"
  - "127.0.0.1:5000-5010:5000-5010"
  - "6060:6060/udp"
  - "12400-12500:1240"

```

#### 长语法

长格式语法允许配置其他不能以短格式表示的字段。

*   `target` ：容器内的端口
*   `published` ：公开暴露的港口
*   `protocol` ：端口协议（ `tcp` 或 `udp` ）
*   `mode` ： `host` 用于在每个节点上发布主机端口，或 `ingress` 使群集模式端口达到负载平衡。

```
ports:
  - target: 80
    published: 8080
    protocol: tcp
    mode: host

```

> 以 [3.2版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-32) 文件格式 添加 。
>
> 长语法是v3.2文件格式的新语法。

### 重新启动 [🔗](#restart)

`no` 是默认的 [重新启动策略](https://docs.docker.com/config/containers/start-containers-automatically/#use-a-restart-policy) ，在任何情况下都不会重新启动容器。 当 `always` 指定时，容器总是重新启动。 该 `on-failure` 如果退出代码指示的故障错误政策重启的容器。 `unless-stopped` 总是重新启动容器，除非容器停止（手动或其他方式）。

```
restart: "no"
restart: always
restart: on-failure
restart: unless-stopped

```

> 使用docker stack deploy时的注意事项
>
> [在以群集模式部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) `restart` 时， [将](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 忽略 该 选项 。

### 秘密 [🔗](#secrets)

使用按服务 `secrets` 配置 ，按服务授予对机密的访问权限 。 支持两种不同的语法变体。

> 使用docker stack deploy时的注意事项
>
> 该密码必须已经存在或 在撰写文件 [的顶级 `secrets` 配置](#secrets-configuration-reference) 中 [定义](#secrets-configuration-reference) ，否则堆栈部署将失败。

有关机密的更多信息，请参见 [机密](https://docs.docker.com/engine/swarm/secrets/) 。

#### 短语法

简短的语法变体仅指定秘密名称。 这会授予容器访问机密的权限，并将其安装在 `/run/secrets/<secret_name>` 容器内。 源名称和目标安装点都设置为机密名称。

以下示例使用short语法授予 `redis` 服务对 `my_secret` 和 `my_other_secret` 秘密的 访问权限 。 的值 `my_secret` 设置为file的内容 `./my_secret.txt` ，并 `my_other_secret` 定义为外部资源，这意味着它已经在Docker中定义，可以通过运行 `docker secret create` 命令或通过其他堆栈部署进行定义。 如果外部机密不存在，则堆栈部署将失败并显示 `secret not found` 错误。

```
version: "3.8"
services:
  redis:
    image: redis:latest
    deploy:
      replicas: 1
    secrets:
      - my_secret
      - my_other_secret
secrets:
  my_secret:
    file: ./my_secret.txt
  my_other_secret:
    external: true

```

#### 长语法

长语法提供了在服务的任务容器中如何创建机密的更多粒度。

*   `source` ：秘密的名称，因为它存在于Docker中。
*   `target` ：要 `/run/secrets/` 在服务的任务容器中 挂载的文件的名称 。 `source` 如果未指定 ， 则 默认为 。
*   `uid` 和 `gid` ： `/run/secrets/` 在服务的任务容器 中拥有文件的数字UID或GID 。 `0` 如果未指定 ， 则 两者都默认为 。
*   `mode` ：文件的权限以 `/run/secrets/` 八进制表示法 装入 服务的任务容器中。 例如， `0444` 表示世界可读。 Docker 1.13.1中的默认值为 `0000` ，但是是 `0444` 较新的版本。 机密信息不可写，因为它们已安装在临时文件系统中，因此，如果设置了可写位，它将被忽略。 可执行位可以设置。 如果您不熟悉UNIX文件权限模式，则可能会发现此 [权限计算器](http://permissions-calculator.org/) 很有用。

的下面的示例集名称 `my_secret` 以 `redis_secret` 在容器内，将模式设定为 `0440` （组可读）和套在用户和组 `103` 。 该 `redis` 服务无权访问该 `my_other_secret` 机密。

```
version: "3.8"
services:
  redis:
    image: redis:latest
    deploy:
      replicas: 1
    secrets:
      - source: my_secret
        target: redis_secret
        uid: '103'
        gid: '103'
        mode: 0440
secrets:
  my_secret:
    file: ./my_secret.txt
  my_other_secret:
    external: true

```

您可以授予服务访问多个机密的权限，并且可以混合长短语法。 定义机密并不意味着授予服务对其的访问权限。

### security\_opt [🔗](#security_opt)

覆盖每个容器的默认标签方案。

```
security_opt:
  - label:user:USER
  - label:role:ROLE

```

> 使用docker stack deploy时的注意事项
>
> [在以群集模式部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) `security_opt` 时， [将](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 忽略 该 选项 。

### stop\_grace\_period [🔗](#stop_grace_period)

指定 [`stop_signal`](#stop_signal) 在发送SIGKILL之前， 如果容器无法处理SIGTERM（或已使用指定的任何停止信号）而试图停止容器的等待时间 。 指定为 [持续时间](#specifying-durations) 。

```
stop_grace_period: 1s

```

```
stop_grace_period: 1m30s

```

默认情况下， `stop` 在发送SIGKILL之前等待容器退出10秒钟。

### stop\_signal [🔗](#stop_signal)

设置替代信号以停止容器。 默认情况下 `stop` 使用SIGTERM。 使用 `stop_signal` 原因 设置替代信号 会 `stop` 改为发送该信号。

```
stop_signal: SIGUSR1

```

### 的sysctl [🔗](#sysctls)

要在容器中设置内核参数。 您可以使用数组或字典。

```
sysctls:
  net.core.somaxconn: 1024
  net.ipv4.tcp_syncookies: 0

```

```
sysctls:
  - net.core.somaxconn=1024
  - net.ipv4.tcp_syncookies=0

```

您只能使用内核中已命名空间的sysctls。 Docker不支持更改也会修改主机系统的容器内的sysctls。 有关受支持的sysctls的概述，请参阅 [在运行时配置命名空间的内核参数（sysctls）](https://docs.docker.com/engine/reference/commandline/run/#configure-namespaced-kernel-parameters-sysctls-at-runtime) 。

> 使用docker stack deploy时的注意事项
>
> [在以集群模式部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 时，此选项需要Docker Engine 19.03或更高版本 。

### tmpfs的 [🔗](#tmpfs)

> 以 [3.6版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-36) 文件格式 添加 。

在容器内安装一个临时文件系统。 可以是单个值或列表。

```
tmpfs: /run

```

```
tmpfs:
  - /run
  - /tmp

```

> 使用docker stack deploy时的注意事项
>
> [在](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 以（3\-3.5版）撰写文件 [以群集模式部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 时， [将](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 忽略此选项 。

在容器内安装一个临时文件系统。 Size参数指定tmpfs安装的大小（以字节为单位）。 默认情况下不受限制。

```
- type: tmpfs
  target: /app
  tmpfs:
    size: 1000

```

### ulimits [🔗](#ulimits)

覆盖容器的默认ulimit。 您可以将单个限制指定为整数，也可以将软/硬限制指定为映射。

```
ulimits:
  nproc: 65535
  nofile:
    soft: 20000
    hard: 40000

```

### userns\_mode [🔗](#userns_mode)

```
userns_mode: "host"

```

如果Docker守护程序配置了用户名称空间，则禁用此服务的用户名称空间。 有关 更多信息， 请参见 [dockerd](https://docs.docker.com/engine/reference/commandline/dockerd/#disable-user-namespace-for-a-container) 。

> 使用docker stack deploy时的注意事项
>
> [在以群集模式部署堆栈](https://docs.docker.com/engine/reference/commandline/stack_deploy/) `userns_mode` 时， [将](https://docs.docker.com/engine/reference/commandline/stack_deploy/) 忽略 该 选项 。

### 卷 [🔗](#volumes)

挂载主机路径或命名卷，指定为服务的子选项。

您可以将主机路径安装为单个服务的定义的一部分，而无需在顶级 `volumes` 密钥中 进行定义 。

但是，如果要跨多个服务重用卷，请在 [顶级 `volumes` 键中](#volume-configuration-reference) 定义一个命名卷 。 将命名卷与 [服务，群集和堆栈文件一起使用](#volumes-for-services-swarms-and-stack-files) 。

> 更改为 [版本3](https://docs.docker.com/compose/compose-file/compose-versioning/#version-3) 文件格式。
>
> 顶级 [卷](#volume-configuration-reference) 键定义了一个命名卷，并从每个服务的 `volumes` 列表中 引用了该卷 。 这将替换 `volumes_from` 早期版本的Compose文件格式。

此示例显示了 服务 `mydata` 正在使用 的命名卷（ ） `web` ，以及为单个服务（ `db` service 之下的第一个路径 `volumes` ） 定义的绑定安装 。 该 `db` 服务还使用一个名为 `dbdata` （ `db` service 下的第二路径 `volumes` ） 的命名卷 ，但是使用旧的字符串格式定义该卷以装入命名卷。 `volumes` 如图所示， 命名卷必须在顶级 键下列出。

```
version: "3.8"
services:
  web:
    image: nginx:alpine
    volumes:
      - type: volume
        source: mydata
        target: /data
        volume:
          nocopy: true
      - type: bind
        source: ./static
        target: /opt/app/static

  db:
    image: postgres:latest
    volumes:
      - "/var/run/postgres/postgres.sock:/var/run/postgres/postgres.sock"
      - "dbdata:/var/lib/postgresql/data"

volumes:
  mydata:
  dbdata:

```

> **注意**
>
> 有关卷的一般信息，请参阅 文档中的 “ [使用卷](https://docs.docker.com/storage/volumes/) 和 [卷插件”](https://docs.docker.com/engine/extend/plugins_volume/) 部分。

#### 短语法

简短语法使用通用 `[SOURCE:]TARGET[:MODE]` 格式，其中 `SOURCE` 可以是主机路径或卷名。 `TARGET` 是安装卷的容器路径。 标准模式适用 `ro` 于只读和 `rw` 读写（默认）。

您可以在主机上安装相对路径，该相对路径相对于正在使用的Compose配置文件的目录进行扩展。 相对路径应始终以 `.` 或 开头 `..` 。

```
volumes:
  # Just specify a path and let the Engine create a volume
  - /var/lib/mysql

  # Specify an absolute path mapping
  - /opt/data:/var/lib/mysql

  # Path on the host, relative to the Compose file
  - ./cache:/tmp/cache

  # User-relative path
  - ~/configs:/etc/configs/:ro

  # Named volume
  - datavolume:/var/lib/mysql

```

#### 长语法

> 以 [3.2版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-32) 文件格式 添加 。

长格式语法允许配置其他不能以短格式表示的字段。

*   `type` ：所述安装型 `volume` ， `bind` ， `tmpfs` 或 `npipe`
*   `source` ：挂载的源，主机上用于绑定挂载的路径或 [顶级 `volumes` 密钥中](#volume-configuration-reference) 定义的卷的名称 。 不适用于tmpfs挂载。
*   `target` ：安装了卷的容器中的路径
*   `read_only` ：将卷设置为只读的标志
*   `bind` ：配置其他绑定选项
    *   `propagation` ：用于绑定的传播模式
*   `volume` ：配置其他音量选项
    *   `nocopy` ：创建卷时禁用从容器中复制数据的标志
*   `tmpfs` ：配置其他tmpfs选项
    *   `size` ：tmpfs挂载的大小（以字节为单位）
*   `consistency` ：装载的一致性要求， `consistent` （主机和容器具有相同的视图）， `cached` （读缓存，主机视图具有权威性）或 `delegated` （读写缓存，容器的视图具有权威性）之一

```
version: "3.8"
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - type: volume
        source: mydata
        target: /data
        volume:
          nocopy: true
      - type: bind
        source: ./static
        target: /opt/app/static

networks:
  webnet:

volumes:
  mydata:

```

> **注意**
>
> 创建绑定安装时，使用长语法要求事先创建引用的文件夹。 如果该文件夹不存在，则使用短语法立即创建该文件夹。 有关 更多信息， 请参见 [绑定安装文档](https://docs.docker.com/storage/bind-mounts/#differences-between--v-and---mount-behavior) 。

#### 服务，群集和堆栈文件的卷

> 使用docker stack deploy时的注意事项
>
> 使用服务，群集和 `docker-stack.yml` 文件时，请记住，支持服务的任务（容器）可以部署在群集中的任何节点上，并且每次更新服务时，该节点都可以是不同的节点。

在没有具有指定源的命名卷的情况下，Docker为支持服务的每个任务创建一个匿名卷。 删除关联的容器后，匿名卷不会继续存在。

如果要保留数据，请使用命名卷和支持多主机的卷驱动程序，以便可以从任何节点访问数据。 或者，对服务设置约束，以便将其任务部署在具有该卷的节点上。

例如， [Docker Labs中votingapp示例](https://github.com/docker/labs/blob/master/beginner/chapters/votingapp.md) 的 `docker-stack.yml` 文件 定义了一个称为 运行 数据库的服务。 它被配置为命名卷以将数据持久存储在群集中，*并且* 被限制为仅在 节点 上运行 。 这是该文件中的相关片段： [](https://github.com/docker/labs/blob/master/beginner/chapters/votingapp.md)`db` `postgres` `manager`

```
version: "3.8"
services:
  db:
    image: postgres:9.4
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend
    deploy:
      placement:
        constraints: [node.role == manager]

```

#### 卷装载的缓存选项（适用于Mac的Docker桌面）

您可以在Compose文件中为绑定安装的目录配置容器和主机的一致性要求，以提高读/写卷安装的性能。 这些选项解决了 `osxfs` 文件共享 所特有的问题 ，因此仅适用于Mac的Docker Desktop。

标志是：

*   `consistent` ：完全一致。 容器运行时和主机始终保持相同的安装视图。 这是默认值。
*   `cached` ：主机对挂载的观点是权威的。 在容器中可以看到主机上所做的更新，这可能会有所延迟。
*   `delegated` ：容器运行时的挂载视图具有权威性。 在主机上看到容器中所做的更新之前可能会有所延迟。

这是将卷配置为的示例 `cached` ：

```
version: "3.8"
services:
  php:
    image: php:7.1-fpm
    ports:
      - "9000"
    volumes:
      - .:/var/www/project:cached

```

有关这些标志，它们所解决的问题以及 `docker run` 与之对应 的问题的完整详细信息，请 参见Docker Desktop for Mac主题 [“针对卷挂载（共享文件系统）的性能调整”](https://docs.docker.com/docker-for-mac/osxfs-caching/) 。

### 域名，主机名，IPC，MAC\_ADDRESS，特权，READ\_ONLY，shm\_size，stdin\_open，TTY用户，working\_dir [🔗](#domainname-hostname-ipc-mac_address-privileged-read_only-shm_size-stdin_open-tty-user-working_dir)

其中每个都是一个值，类似于其 [docker run](https://docs.docker.com/engine/reference/run/) 对应项。 请注意，这 `mac_address` 是一个旧选项。

```
user: postgresql
working_dir: /code

domainname: foo.com
hostname: foo
ipc: host
mac_address: 02:42:ac:11:65:43

privileged: true

read_only: true
shm_size: 64M
stdin_open: true
tty: true

```

## 指定持续时间 [🔗](#specifying-durations)

某些配置选项（例如的 `interval` 和 `timeout` 子选项） [`check`](#healthcheck) 将持续时间作为字符串接受，格式如下：

```
2.5s
10s
1m30s
2h32m
5h34m56s

```

支持的单位是 `us` ， `ms` ， `s` ， `m` 和 `h` 。

## 指定字节值 [🔗](#specifying-byte-values)

一些配置选项（例如的 `shm_size` 子选项） [`build`](#build) 将字节值作为字符串接受，格式如下：

```
2b
1024kb
2048k
300m
1gb

```

支持的单位是 `b` ， `k` ， `m` 和 `g` ，和它们的替代符号 `kb` ， `mb` 和 `gb` 。 目前不支持十进制值。

## 卷配置参考 [🔗](#volume-configuration-reference)

虽然可以申报 [卷](#volumes) 上飞作为服务声明的一部分，这部分允许您创建可在多个服务中重复使用（不依赖于一个名为卷 `volumes_from` 或），并且很容易检索和使用泊坞窗命令行接受视API。 有关 更多信息， 请参阅 [docker volume](https://docs.docker.com/engine/reference/commandline/volume_create/) 子命令文档。

有关 [卷](https://docs.docker.com/storage/volumes/) 的一般信息， 请参见 [使用卷](https://docs.docker.com/storage/volumes/) 和 [卷插件](https://docs.docker.com/engine/extend/plugins_volume/) 。

这是一个两种服务设置的示例，其中数据库的数据目录与另一个服务作为卷共享，以便可以定期备份它：

```
version: "3.8"

services:
  db:
    image: db
    volumes:
      - data-volume:/var/lib/db
  backup:
    image: backup-service
    volumes:
      - data-volume:/var/lib/backup/data

volumes:
  data-volume:

```

顶级 `volumes` 键 下的条目 可以为空，在这种情况下，它使用引擎配置的默认驱动程序（在大多数情况下，这是 `local` 驱动程序）。 （可选）您可以使用以下键对其进行配置：

### 司机 [🔗](#driver)

指定该卷应使用哪个卷驱动程序。 默认为Docker Engine配置为使用的任何驱动程序，大多数情况下为 `local` 。 如果驱动程序不可用，则引擎在 `docker-compose up` 尝试创建卷 时会返回错误 。

```
driver: foobar

```

### driver\_opts [🔗](#driver_opts)

指定选项列表作为键值对，以传递给该卷的驱动程序。 这些选项取决于驱动程序\-有关更多信息，请参考驱动程序的文档。 可选的。

```
volumes:
  example:
    driver_opts:
      type: "nfs"
      o: "addr=10.40.0.199,nolock,soft,rw"
      device: ":/docker/example"

```

### 外部 [🔗](#external)

如果设置为 `true` ，则指定此卷是在Compose之外创建的。 `docker-compose up` 不会尝试创建它，如果不存在则引发错误。

为3.3和下面的格式的版本， `external` 不能同时使用与其它卷配置键（ `driver` ， `driver_opts` ， `labels` ）。 对于 [3.4](https://docs.docker.com/compose/compose-file/compose-versioning/#version-34) 及更高 [版本，](https://docs.docker.com/compose/compose-file/compose-versioning/#version-34) 此限制不再存在 。

在下面的示例中， `[projectname]_data` Compose 不会尝试创建一个名为的卷，而是 查找一个简单地称为的现有卷 `data` 并将其装入 `db` 服务的容器中。

```
version: "3.8"

services:
  db:
    image: postgres
    volumes:
      - data:/var/lib/postgresql/data

volumes:
  data:
    external: true

```

> 不建议使用 [3.4版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-34) 文件格式。
>
> 使用版本3.4文件格式弃用了external.name `name` 。

您还可以与在Compose文件中用于引用卷的名称分开指定卷的名称：

```
volumes:
  data:
    external:
      name: actual-name-of-volume

```

> 使用docker stack deploy时的注意事项
>
> 如果您使用 [docker stack deploy](#deploy) 以 [群体模式](https://docs.docker.com/engine/swarm/) 启动应用程序 （而不是 [docker compose up](https://docs.docker.com/compose/reference/up/) ）， *则会创建* 不存在的外部卷 。 在群模式下，由服务定义卷后将自动创建该卷。 由于服务任务是在新节点上安排的，因此 [swarmkit](https://github.com/docker/swarmkit/blob/master/README.md) 在本地节点上创建卷。 要了解更多信息，请参见 [moby / moby＃29976](https://github.com/moby/moby/issues/29976) 。[](#deploy)[](https://docs.docker.com/engine/swarm/)[](https://docs.docker.com/compose/reference/up/)[](https://github.com/docker/swarmkit/blob/master/README.md)[](https://github.com/moby/moby/issues/29976)

### 标签 [🔗](#labels-3)

使用 [Docker标签](https://docs.docker.com/config/labels-custom-metadata/) 将元数据添加到容器 。 您可以使用数组或字典。

建议您使用反向DNS表示法，以防止标签与其他软件使用的标签冲突。

```
labels:
  com.example.description: "Database volume"
  com.example.department: "IT/Ops"
  com.example.label-with-empty-value: ""

```

```
labels:
  - "com.example.description=Database volume"
  - "com.example.department=IT/Ops"
  - "com.example.label-with-empty-value"

```

### 命名 [🔗](#name)

> 以 [3.4版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-34) 文件格式 添加 。

为此卷设置一个自定义名称。 名称字段可用于引用包含特殊字符的卷。 该名称按原样使用， **不会** 与堆栈名称一起作用域。

```
version: "3.8"
volumes:
  data:
    name: my-app-data

```

它也可以与 `external` 属性 一起使用 ：

```
version: "3.8"
volumes:
  data:
    external: true
    name: my-app-data

```

## 网络配置参考 [🔗](#network-configuration-reference)

顶级 `networks` 密钥可让您指定要创建的网络。

*   有关Compose使用Docker网络功能和所有网络驱动程序选项的完整说明，请参阅《 [网络指南》](https://docs.docker.com/compose/networking/) 。
*   有关 网络的 [Docker Labs](https://github.com/docker/labs/blob/master/README.md) 教程，请从 [设计可扩展的便携式Docker容器网络开始](https://github.com/docker/labs/blob/master/networking/README.md)

### 司机 [🔗](#driver-1)

指定该网络应使用哪个驱动程序。

默认驱动程序取决于您使用的Docker引擎的配置方式，但是在大多数情况下，它 `bridge` 位于单个主机和 `overlay` Swarm上。

如果驱动程序不可用，Docker引擎将返回错误。

```
driver: overlay

```

#### 桥

Docker默认 `bridge` 在单个主机上 使用 网络。 有关如何使用网桥网络的示例，请参阅关于 [网桥网络](https://github.com/docker/labs/blob/master/networking/A2-bridge-networking.md) 的Docker Labs教程 。

#### 覆盖

该 `overlay` 驱动程序创建一个跨多个节点命名的网络 [群](https://docs.docker.com/engine/swarm/) 。

*   有关如何以 `overlay` 群集模式 构建和使用 带有服务 的 网络 的有效示例 ，请参阅《 [覆盖网络和服务发现》](https://github.com/docker/labs/blob/master/networking/A3-overlay-networking.md) 的Docker Labs教程 。

*   有关深入了解其工作原理的信息，请参见“ [覆盖驱动程序网络体系结构”](https://github.com/docker/labs/blob/master/networking/concepts/06-overlay-networks.md) 上的网络概念实验室 。

#### 主机或无

使用主机的网络堆栈，或者不使用网络。 等同于 `docker run --net=host` 或 `docker run --net=none` 。 仅在使用 `docker stack` 命令时 使用 。 如果使用 `docker-compose` 命令，请改用 [network\_mode](#network_mode) 。

如果要在通用版本上使用特定网络，请使用第二个yaml文件示例中提到的\[network\]。

使用内置网络（例如 `host` 和 `none` ） 的语法 略有不同。 使用名称 `host` 或 `none` （Docker已经自动创建的） 定义一个外部网络，并定义一个 Compose可以使用的别名（ `hostnet` 或 `nonet` 在以下示例中），然后使用该别名向该网络授予服务访问权限。

```
version: "3.8"
services:
  web:
    networks:
      hostnet: {}

networks:
  hostnet:
    external: true
    name: host

```

```
services:
  web:
    ...
    build:
      ...
      network: host
      context: .
      ...

```

```
services:
  web:
    ...
    networks:
      nonet: {}

networks:
  nonet:
    external: true
    name: none

```

### driver\_opts [🔗](#driver_opts-1)

指定选项列表作为键值对，以传递给该网络的驱动程序。 这些选项取决于驱动程序\-有关更多信息，请参考驱动程序的文档。 可选的。

```
driver_opts:
  foo: "bar"
  baz: 1

```

### 附 [🔗](#attachable)

> 以 [3.2版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-32) 文件格式 添加 。

仅在将 `driver` 设置 为时使用 `overlay` 。 如果设置为 `true` ，则除了服务之外，独立容器还可以连接到该网络。 如果独立容器连接到覆盖网络，则它可以与也从其他Docker守护程序附加到覆盖网络的服务和独立容器进行通信。

```
networks:
  mynet1:
    driver: overlay
    attachable: true

```

### enable\_ipv6 [🔗](#enable_ipv6)

在此网络上启用IPv6网络。

> 撰写文件版本3不支持
>
> `enable_ipv6` 要求您使用版本2的Compose文件，因为Swarm模式尚不支持此指令。

### 伊帕姆 [🔗](#ipam)

指定自定义IPAM配置。 这是一个具有多个属性的对象，每个属性都是可选的：

*   `driver` ：自定义IPAM驱动程序，而不是默认驱动程序。
*   `config` ：具有零个或多个配置块的列表，每个配置块包含以下任一键：
    *   `subnet` ：CIDR格式的子网表示一个网段

一个完整的例子：

```
ipam:
  driver: default
  config:
    - subnet: 172.28.0.0/16

```

> **注意**
>
> `gateway` 目前仅支持版本2 等其他IPAM配置 。

### 内部 [🔗](#internal)

默认情况下，Docker还将桥接网络连接到它以提供外部连接。 如果要创建外部隔离的覆盖网络，可以将此选项设置为 `true` 。

### 标签 [🔗](#labels-4)

使用 [Docker标签](https://docs.docker.com/config/labels-custom-metadata/) 将元数据添加到容器 。 您可以使用数组或字典。

建议您使用反向DNS表示法，以防止标签与其他软件使用的标签冲突。

```
labels:
  com.example.description: "Financial transaction network"
  com.example.department: "Finance"
  com.example.label-with-empty-value: ""

```

```
labels:
  - "com.example.description=Financial transaction network"
  - "com.example.department=Finance"
  - "com.example.label-with-empty-value"

```

### 外部 [🔗](#external-1)

如果设置为 `true` ，则指定此网络是在Compose之外创建的。 `docker-compose up` 不会尝试创建它，如果不存在则引发错误。

为3.3和下面的格式的版本， `external` 不能同时使用与其他网络配置键（ `driver` ， `driver_opts` ， `ipam` ， `internal` ）。 对于 [3.4](https://docs.docker.com/compose/compose-file/compose-versioning/#version-34) 及更高 [版本，](https://docs.docker.com/compose/compose-file/compose-versioning/#version-34) 此限制不再存在 。

在下面的示例中， `proxy` 是通往外界的门户。 `[projectname]_outside` Compose 不会尝试创建一个名为的网络 ， 而是 寻找一个简单称为的现有网络 `outside` ，并将 `proxy` 服务的容器 连接 到该网络。

```
version: "3.8"

services:
  proxy:
    build: ./proxy
    networks:
      - outside
      - default
  app:
    build: ./app
    networks:
      - default

networks:
  outside:
    external: true

```

> 不建议使用 [3.5版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-35) 文件格式。
>
> 使用版本3.5文件格式弃用了external.name `name` 。

您还可以在Compose文件中指定网络名称，而不是用来引用网络的名称。

```
version: "3.8"
networks:
  outside:
    external:
      name: actual-name-of-network

```

### 命名 [🔗](#name-1)

> 以 [版本3.5](https://docs.docker.com/compose/compose-file/compose-versioning/#version-35) 文件格式 添加 。

为此网络设置一个自定义名称。 名称字段可用于引用包含特殊字符的网络。 该名称按原样使用， **不会** 与堆栈名称一起作用域。

```
version: "3.8"
networks:
  network1:
    name: my-app-net

```

它也可以与 `external` 属性 一起使用 ：

```
version: "3.8"
networks:
  network1:
    external: true
    name: my-app-net

```

## configs配置参考 [🔗](#configs-configuration-reference)

顶级 `configs` 声明定义或引用 可以授予此堆栈中的服务的 [配置](https://docs.docker.com/engine/swarm/configs/) 。 配置的来源是 `file` 或 `external` 。

*   `file` ：使用指定路径中的文件内容创建配置。
*   `external` ：如果设置为true，则指定此配置已创建。 Docker不会尝试创建它，如果它不存在， `config not found` 则会发生错误。
*   `name` ：Docker中配置对象的名称。 此字段可用于引用包含特殊字符的配置。 该名称按原样使用， **不会** 与堆栈名称一起作用域。 以3.5版文件格式引入。
*   `driver` 和 `driver_opts` ：自定义秘密驱动程序的名称，以及作为键/值对传递的特定于驱动程序的选项。 以3.8版文件格式引入，仅在使用时受支持 `docker stack` 。
*   `template_driver` ：要使用的模板驱动程序的名称，它控制是否以及如何将秘密有效负载评估为模板。 如果未设置驱动程序，则不使用任何模板。 当前支持的唯一驱动程序是 `golang` ，它使用 `golang` 。 以3.8版文件格式引入，仅在使用时受支持 `docker stack` 。 有关 [模板化配置](https://docs.docker.com/engine/swarm/configs/#example-use-a-templated-config) 的示例， 请参阅 [使用](https://docs.docker.com/engine/swarm/configs/#example-use-a-templated-config) 模板化配置。

在此示例中， `my_first_config` 创建了（就像 `<stack_name>_my_first_config)` 部署堆栈时一样，并且 `my_second_config` 已经存在于Docker中。）

```
configs:
  my_first_config:
    file: ./config_data
  my_second_config:
    external: true

```

外部配置的另一个变体是Docker中的配置名称与服务中存在的名称不同时。 以下示例修改了前一个示例，以使用名为的外部配置 `redis_config` 。

```
configs:
  my_first_config:
    file: ./config_data
  my_second_config:
    external:
      name: redis_config

```

您仍然需要 [将配置访问权限授予](#configs) 堆栈中的每个服务。

## 机密配置参考 [🔗](#secrets-configuration-reference)

顶级 `secrets` 声明定义或引用 可以授予此堆栈中的服务的 [机密](https://docs.docker.com/engine/swarm/secrets/) 。 秘密的来源是 `file` 或 `external` 。

*   `file` ：秘密是使用指定路径中的文件内容创建的。
*   `external` ：如果设置为true，则指定此秘密已经创建。 Docker不会尝试创建它，如果它不存在， `secret not found` 则会发生错误。
*   `name` ：Docker中秘密对象的名称。 此字段可用于引用包含特殊字符的机密。 该名称按原样使用， **不会** 与堆栈名称一起作用域。 以3.5版文件格式引入。
*   `template_driver` ：要使用的模板驱动程序的名称，它控制是否以及如何将秘密有效负载评估为模板。 如果未设置驱动程序，则不使用任何模板。 当前支持的唯一驱动程序是 `golang` ，它使用 `golang` 。 以3.8版文件格式引入，仅在使用时受支持 `docker stack` 。

在此示例中， `my_first_secret` 创建 `<stack_name>_my_first_secret` 时是在部署堆栈时 创建的 ，并且 `my_second_secret` 已经存在于Docker中。

```
secrets:
  my_first_secret:
    file: ./secret_data
  my_second_secret:
    external: true

```

外部机密的另一个变体是Docker中的机密名称与服务中存在的名称不同时。 以下示例修改了前一个示例，以使用名为的外部机密 `redis_secret` 。

### 撰写文件v3.5及更高版本 [🔗](#compose-file-v35-and-above)

```
secrets:
  my_first_secret:
    file: ./secret_data
  my_second_secret:
    external: true
    name: redis_secret

```

### 撰写文件v3.4和 [🔗下](#compose-file-v34-and-under)

```
  my_second_secret:
    external:
      name: redis_secret

```

您仍然需要向 堆栈中的每个服务 [授予对机密的访问权限](#secrets) 。

## 变量替代 [🔗](#variable-substitution)

您的配置选项可以包含环境变量。 Compose使用 `docker-compose` 运行时所在 的Shell环境中的变量值 。 例如，假设外壳包含 `POSTGRES_VERSION=9.3` 并提供以下配置：

```
db:
  image: "postgres:${POSTGRES_VERSION}"

```

当您运行 `docker-compose up` 此配置，撰写外观为 `POSTGRES_VERSION` 在外壳和替代它的价值的环境变量。在这个例子中，撰写解析 `image` 到 `postgres:9.3` 运行配置之前。

如果未设置环境变量，则Compose替换为空字符串。 在上面的示例中，如果 `POSTGRES_VERSION` 未设置，则 `image` 选项的值为 `postgres:` 。

您可以使用 Compose自动查找 的 [`.env`文件](https://docs.docker.com/compose/env-file/) 为环境变量设置默认值 。 在shell环境中设置的值将覆盖 `.env` 文件中 设置的值 。

> 使用docker stack deploy时的注意事项
>
> 该 `.env file` 功能仅在使用 `docker-compose up` 命令时有效，而不适用于 `docker stack deploy` 。

这两个 `$VARIABLE` 和 `${VARIABLE}` 语法的支持。 此外，当使用 [2.1文件格式时](https://docs.docker.com/compose/compose-file/compose-versioning/#version-21) ，可以使用典型的shell语法提供内联默认值：

*   `${VARIABLE:-default}` 计算环境中 `default` 是否 `VARIABLE` 未设置或为空。
*   `${VARIABLE-default}` `default` 仅 `VARIABLE` 在环境中未设置时 评估为 。

同样，以下语法允许您指定必需变量：

*   `${VARIABLE:?err}` 退出，并显示一条错误消息，其中包含 在环境 中 `err` 是否 `VARIABLE` 设置为 if 或为空。
*   `${VARIABLE?err}` 退出，并显示一条错误消息，其中包含 在环境中未设置的 `err` if `VARIABLE` 。

`${VARIABLE/foo/bar}` 不支持 其他扩展的Shell样式功能，例如 。

`$$` 当您的配置需要文字美元符号时， 可以使用 （双美元符号）。 这也可以防止Compose插值，因此a `$$` 允许您引用您不想由Compose处理的环境变量。

```
web:
  build: .
  command: "$$VAR_NOT_INTERPOLATED_BY_COMPOSE"

```

如果忘记并使用单个美元符号（ `$` ），则Compose会将值解释为环境变量，并警告您：

未设置VAR\_NOT\_INTERPOLATED\_BY\_COMPOSE。 替换为空字符串。

## 扩展字段 [🔗](#extension-fields)

> 以 [3.4版](https://docs.docker.com/compose/compose-file/compose-versioning/#version-34) 文件格式 添加 。

可以使用扩展字段重新使用配置片段。 这些特殊字段可以位于任意格式，只要它们位于Compose文件的根目录中并且其名称以 `x-` 字符序列 开头即可 。

> **注意**
>
> 从3.7格式（对于3.x系列）和2.4格式（对于2.x系列）开始，扩展字段也可以在服务，卷，网络，配置和密码定义的根目录中使用。

```
version: '3.4'
x-custom:
  items:
    - a
    - b
  options:
    max-size: '12m'
  name: "custom"

```

这些字段的内容被Compose忽略，但是可以使用 [YAML锚点](http://www.yaml.org/spec/1.2/spec.html#id2765878) 将其插入资源定义中 。 例如，如果您希望多个服务使用相同的日志记录配置：

```
logging:
  options:
    max-size: '12m'
    max-file: '5'
  driver: json-file

```

您可以按如下方式编写Compose文件：

```
version: '3.4'
x-logging:
  &default-logging
  options:
    max-size: '12m'
    max-file: '5'
  driver: json-file

services:
  web:
    image: myapp/web:latest
    logging: *default-logging
  db:
    image: mysql:latest
    logging: *default-logging

```

也可以使用 [YAML合并类型](http://yaml.org/type/merge.html) 部分覆盖扩展字段中的值 。 例如：

```
version: '3.4'
x-volumes:
  &default-volume
  driver: foobar-storage

services:
  web:
    image: myapp/web:latest
    volumes: ["vol1", "vol2", "vol3"]
volumes:
  vol1: *default-volume
  vol2:
    << : *default-volume
    name: volume02
  vol3:
    << : *default-volume
    driver: default
    name: volume-local

```

## 撰写文档 [🔗](#compose-documentation)

*   [用户指南](https://docs.docker.com/compose/)
*   [安装撰写](https://docs.docker.com/compose/install/)
*   [撰写文件版本和升级](https://docs.docker.com/compose/compose-file/compose-versioning/)
*   [样品](https://docs.docker.com/samples/)
*   [命令行参考](https://docs.docker.com/compose/reference/)
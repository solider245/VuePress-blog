---
title : Dry官方按键备忘
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-03 15:33:20 +0800
categories:
 -
tags:
 -
---
[[toc]]
### 介绍

![干监控GIF](https://i.imgur.com/5uQQNAa.gif)

[dry](https://moncho.github.io/dry/) 是一个简单但广泛的终端应用程序，旨在与 [Docker](https://www.digitalocean.com/community/tutorials/the-docker-ecosystem-an-introduction-to-common-components) 容器及其映像 进行交互 。 使用dry可以消除执行常规 [Docker Engine命令](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04) 时涉及的重复 ，并且还提供了比本机Docker CLI更直观的选择。

干具有快速启动和停止容器，安全或强力去除去除泊坞图像，连续实时监测容器进程的能力，并获得码头工人的产出 `info` ， `inspect` ， `history` ，和 `log` 命令。

大多数可以通过官方Docker Engine CLI执行的命令在干燥状态下更容易获得，并且具有相同的行为和结果。 dry还具有Docker Swarm功能，提供了一个出口来监视和管理多主机容器设置。

在本教程中，我们将安装dry并探索其一些最有用的功能：

*   与Docker容器，映像和网络进行交互，
*   监控Docker容器，以及
*   （可选）与Docker Swarm节点和服务进行交互。

## 先决条件

要遵循本教程，您将需要：

*   使用Ubuntu 16.04的 [初始服务器安装程序设置的](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04) 一台Ubuntu 16.04服务器 ，包括sudo非root用户和防火墙。
*   已安装Docker，如 [如何在Ubuntu 16.04上安装和使用Docker中所述](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04) 。
*   几个活动的Docker容器联网在一起以进行干测试。
    *   作为本教程中的示例，我们将使用 [如何在Ubuntu 14.04上使用Docker Compose安装Wordpress和PhpMyAdmin中](https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-and-phpmyadmin-with-docker-compose-on-ubuntu-14-04) 的WordPress和PHPMyAdmin设置（无文档根目录的可选步骤） 。
    *   或者，您可以使用自己的现有容器设置。
*   （可选）您本地计算机上的Docker Machine和使用Docker Swarm的Docker设置。 如果您在最后一步尝试使用Dry的Swarm功能，则这是必需的。 您可以通过以下方法进行设置： [在Ubuntu 16.04上](https://www.digitalocean.com/community/tutorials/how-to-provision-and-manage-remote-docker-hosts-with-docker-machine-on-ubuntu-16-04) [如何](https://www.digitalocean.com/community/tutorials/how-to-create-a-cluster-of-docker-containers-with-docker-swarm-and-digitalocean-on-ubuntu-16-04) [使用Docker Machine](https://www.digitalocean.com/community/tutorials/how-to-provision-and-manage-remote-docker-hosts-with-docker-machine-on-ubuntu-16-04) 设置 [和管理远程Docker主机，](https://www.digitalocean.com/community/tutorials/how-to-provision-and-manage-remote-docker-hosts-with-docker-machine-on-ubuntu-16-04) 以及 [在Ubuntu 16.04上](https://www.digitalocean.com/community/tutorials/how-to-provision-and-manage-remote-docker-hosts-with-docker-machine-on-ubuntu-16-04) [如何使用Docker Swarm和DigitalOcean创建Docker容器集群](https://www.digitalocean.com/community/tutorials/how-to-create-a-cluster-of-docker-containers-with-docker-swarm-and-digitalocean-on-ubuntu-16-04) 。

## 第1步\-安装干燥

首先，我们需要在Docker服务器上安装Dry。 最新版本的dry二进制文件可在 [dry的GitHub发布页面上找到](https://github.com/moncho/dry/releases) 。

在发布时 下载最新版本的 `dry-linux-amd64` 二进制文件 `v0.9-beta.3` 。

```
wget https://github.com/moncho/dry/releases/download/v0.9-beta.3/dry-linux-amd64

```

接下来，将新的二进制文件从移至并重命名 `dry-linux-amd64` 为 `/usr/local/bin/dry` 。

```
sudo mv dry-linux-amd64 /usr/local/bin/dry

```

`/usr/local/bin` 是用于存储服务器本地程序的二进制文件的标准位置。 将dry二进制文件移动到该目录还使我们能够从服务器内的任何位置在命令行上调用dry，因为该目录包含在外壳程序的 [`$PATH`环境变量中](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps) 。

使用更改二进制文件的权限， `chmod` 以允许您执行它。

```
sudo chmod 755 /usr/local/bin/dry

```

您可以 `dry` 通过运行带有 `-v` 选项 的程序 来测试它 现在可以访问并且可以正常工作 。

```
dry -v

```

这将返回版本号和构建详细信息：

```
Version Details Outputdry version 0.9-beta.2, build d4d7a789

```

现在已经设置好dry，让我们尝试使用它。

## 第2步–与Docker容器进行交互

快干，在您的终端中打开其仪表板。

```
dry

```

仪表板的顶部包含有关服务器和Docker软件的信息，例如Docker版本，Docker Engine API版本，服务器是否为启用了Docker Swarm的工作程序/管理器节点以及服务器的主机名和资源。

仪表板的底部提供了导航键的参考，您可以使用这些导航键访问干燥的不同部分：

```
Navigation key options[H]:Help [Q]:Quit | [F1]:Sort [F2]:Toggle Show Containers [F5]:Refresh [%]:Filter |
[m]:Monitor mode [2]:Images [3]:Networks [4]:Nodes [5]:Services | [Enter]:Commands

```

`F5`如果渲染出现错误，您可以随时使用它来刷新dry的显示。

`Containers` 首次开始晾干时， 此仪表板本身默认为 列表。 该视图使您可以查看主机容器的一般状态。

如果您使用先决条件教程中的示例Wordpress，MariaDB和PHPMyAdmin容器堆栈，则会看到列出的这三个新组成的容器：

![干仪表板图像](https://i.imgur.com/Wjd4PWh.png)

使用键盘上的向上和向下箭头选择Wordpress容器，然后按 `ENTER` 。

这将在屏幕顶部显示有关容器的一些信息，例如其端口映射，网络链接和网络容器IP地址：

```
Wordpress Container Statistics  Container Name:  wordpress_wordpress_1                    ID:       f67f9914b57e       Status:  Up 13 minutes
  Image:           wordpress                                Created:  About an hour ago
  Command:         docker-entrypoint.sh apache2-foreground
  Port mapping:    0.0.0.0:8080->80/tcp
  Network Name:    bridge
  IP Address:     172.17.0.3
  Labels           6

```

当您选择一个容器时，屏幕的下部中央还将显示一个新的可选选项列表：

*   `Fetch logs` ，相当于Docker Engine命令 [`docker logs`](https://docs.docker.com/engine/reference/commandline/logs/) 。 这对于调试和排除容器中的错误很有用。

*   `Kill container` ，如果容器没有响应并且没有按预期退出，则可以使用它。

*   `Remove container` ，您可以使用它来干净地删除不需要的容器。

**警告**：`Kill container`和`Remove Container`选项会立即发出，并且**没有确认提示**，因此请谨慎操作。

*   `Inspect container` ，相当于 [`docker container inspect`](https://docs.docker.com/engine/reference/commandline/container_inspect/) 。

*   `Restart` ，它将停止并重新启动容器。 比输入Docker Engine命令 [重新启动](https://docs.docker.com/engine/reference/commandline/restart/) 或 [查询](https://docs.docker.com/engine/reference/commandline/ps/) 容器 [状态](https://docs.docker.com/engine/reference/commandline/ps/) 要快得多 。

*   `Show image history` ，其中列出了用于构建容器映像的命令。 这些“层”是在映像构建过程中生成的，并且是由 [*Dockerfile中*](https://www.digitalocean.com/community/tutorials/docker-explained-using-dockerfiles-to-automate-building-of-images) 提供的命令/操作[*导致的*](https://www.digitalocean.com/community/tutorials/docker-explained-using-dockerfiles-to-automate-building-of-images) 。 使用此选项，我们可以看到使用基础Docker映像生成容器的精确程度。

*   `Stats + Top` ，其中包括诸如CPU使用率，内存消耗，入站和出站网络流量，文件系统操作，总进程ID和总容器正常运行时间之类的信息。 它还包括一个进程列表，该列表在功能上与的输出相同 [`top`](https://www.digitalocean.com/community/tutorials/how-to-monitor-cpu-use-on-digitalocean-droplets#top) 。

*   `Stop` ，它将停止容器。 您可以使用 `F2` 将 `Containers` 视图 上的容器切换 为包括 `currently stopped and active` ， `Restart` 选择 该 选项后 可以使用 选项 重新启动已停止的容器 。

按 `ESC` 键返回到根 `Containers` 仪表板的部分。 在这里，我们将看一下这一 `Images` 部分。

## 步骤3 —与Docker映像进行交互

在该 `Containers` 部分中，按 `2` 进入 `Images` 干燥部分。

![图片部分](https://i.imgur.com/18pFgHi.png)

本节提供对 [`docker image inspect`命令的](https://docs.docker.com/engine/reference/commandline/image_inspect/) 更轻松访问 。 dry还有一些便捷的键盘快捷键，您可以在导航栏中看到它们：

*   `CTRL+D` 对于 `Remove Dangling` ，“悬空卷”是指不再由任何容器引用并因此是冗余的其他容器卷。 通常，在Docker的命令行上，此操作将涉及 `docker volume rm` 命令和 `dangling=true` 标志以及目标数据量。
*   `CTRL+E` for `Remove` ，相当于的 [`docker rmi`](https://docs.docker.com/engine/reference/commandline/rmi/) ，只要您没有从该映像创建的容器仍处于活动状态并且正在运行，就可以删除映像。
*   `CTRL+F` for `Force Remove` ，使您可以像使用一样强行删除突出显示的图像 `docker rmi --force` 。
*   `I` for `History` ，显示与 `Show Image History` 该 `Containers` 部分 相同的数据 。

到目前为止，我们已经看到干燥的容器和图像部分。 要探索的最后一部分是网络。

## 第4步—与Docker网络交互

在该 `Images` 部分中，按 `3` 以访问该 `Networks` 部分。

![Docker网络仪表板](https://i.imgur.com/rR874kM.png)

本部分是 [验证网络链接和](https://docs.docker.com/engine/reference/commandline/network_inspect/) Docker容器 [的网络配置](https://docs.docker.com/engine/reference/commandline/network_inspect/) 的 理想选择 。

您可以 [从码头工人删除网络](https://docs.docker.com/engine/reference/commandline/network_rm/) 与 `CTRL+E` ，虽然你不能删除预定义的默认泊坞网络一样 `bridge` 。 但是，例如，您可以尝试 `bridge` 使用箭头键将其选中，然后按来 删除 它 `ENTER` 。 您会看到一长串这样的输出：

```
Output. . .
    "Containers": {
        "34f8295b39b7c3364d9ceafd4e96194f210f22acc41d938761e1340de7010e05": {
            "Name": "wordpress_wordpress_db_1",
            "EndpointID": "68370df8a13b92f3dae2ee72ff769e5bdc00da348ef3e22fa5b8f7e9e979dbd5",
            "MacAddress": "02:42:ac:11:00:02",
            "IPv4Address": "172.17.0.2/16",
            "IPv6Address": ""
        },
        "e7105685e0e6397fd762949e869095aa4451a26cdacdad7f5e177bde52819c4a": {
            "Name": "wordpress_wordpress_1",
            "EndpointID": "44ea3a133d887c5352b8ccf70c94cda9f05891b2db8b99a95096a19d4a504e16",
            "MacAddress": "02:42:ac:11:00:04",
            "IPv4Address": "172.17.0.4/16",
            "IPv6Address": ""
        },
        "e7d65c76b50ff03fc50fc374be1fa4bf462e9454f8d50c89973e1e5693eef559": {
            "Name": "wordpress_phpmyadmin_1",
            "EndpointID": "7fb1b55dd92034cca1dd65fb0c824e87a9ba7bbc0860cd3ed34744390d670b78",
            "MacAddress": "02:42:ac:11:00:03",
            "IPv4Address": "172.17.0.3/16",
            "IPv6Address": ""
        }
    },
. . .

```

上面输出的一部分显示了容器链接和容器 `bridge` 网络 的网络IP地址和MAC地址 。 由此，您可以验证所有容器都是 `bridge` 网络的 成员 并且可以通信，这是容器网络有效的基本指示。

使用 `ESC` 以关闭网络输出。 现在我们已经看过了 `Containers` ， `Images` 和 `Networks` 干燥的部分，让我们干的监控功能举动。

## 第5步—监视Docker容器

按此 `M` 键可快速精简当前服务器/主机上所有正在运行的容器的概述。 该屏幕可以从任何干，等的根段的访问 `Containers` ， `Images` 和 `Networks` 。

![监控模式图像](https://i.imgur.com/L7cEJ1L.png)

此信息的一部分在程序的其他位置（例如， `Stats + Top` 容器选项内） 列出， 但是此视图为所有容器上的信息提供了一个中心位置，可让您监视整个堆栈。 这在管理大量容器时很有用。

按下 `Q` 以退出仪表板。 在这里，我们将使用Docker Swarm进行设置。

## 第6步—在Docker Swarm集群管理器上进行空安装（可选）

在您的本地计算机上，用户 `docker-machine` 以SSH方式进入您指定的集群管理器节点。 在Docker Swarm的先决条件教程中，此设置为 `node-1` 。

```
docker-machine ssh node-1

```

为了演示干安装的另一种方法，请 `curl` 运行官方安装脚本并运行它。 如果您不想使用这种 `curl ... | sh` 方式，则可以按照步骤1中的步骤进行干燥安装。

```
curl -sSf https://moncho.github.io/dry/dryup.sh | sh

```

安装脚本将自动将干燥二进制文件移至 `/usr/local/bin` ：

```
Outputdryup: Moving dry binary to its destination
dryup: dry binary was copied to /usr/local/bin, now you should 'sudo chmod 755 /usr/local/bin/dry'

```

像在步骤1中一样，更新二进制文件的权限。

```
sudo chmod 755 /usr/local/bin/dry

```

现在尝试空转。

```
dry

```

在初始 `Containers` 部分的 右上角 ， 现在填充了在先前步骤中空白 的 `Swarm` 和 `Node role` 状态行：

```
OutputSwarm:      active
Node role:  manager
Nodes:      3

```

您还将看到列出了长图像名称的两个容器。 其他三个容器分布在其他Swarm工作程序节点之间，并由 `webserver` 先决条件教程中 的 示例服务 定义 。

集群管理器的空安装已经准备就绪，接下来让我们看看如何使用Docker Swarm进行空安装。

## 步骤7 —与Docker Swarm节点进行交互（可选）

在该 `Containers` 部分中，按 `4` 导航到该 `Nodes` 部分。

![仪表板节点部分](https://i.imgur.com/9q4uXRr.png)

本节显示了每个节点的一些有用指标，例如其角色（经理或工作），状态和可用性。 屏幕顶部的行显示资源消耗信息。

在这里，使用箭头键选择 `node-2` ，然后按 `ENTER` 。 这将拉起单个节点的任务：

![node-2任务仪表板](https://i.imgur.com/lZeJ9pN.png)

在 `webserver` 服务方面， `node-2` 保留五个联网容器中的第一个和第二个。 该视图中的任务显示 `CURRENT STATE` 两个容器中的处于活动状态，并列出了它们已运行了多长时间。 您自己的容器名称的编号可能会有所不同。 它取决于容器分配给哪个工作节点，这由 [Docker服务命令](https://docs.docker.com/engine/reference/commandline/service_create/) 确定 [。](https://docs.docker.com/engine/reference/commandline/service_create/)

`Nodes` 通过按键 返回到该 部分， `ESC` 以便我们在此处探索dry的一些键绑定。

使用Docker Swarm时的一项常见任务是更改某些节点的状态或可用性。 `node-1` 再次 突出显示 并按 `CTRL+A` 以查看 `Set Availability` 提示。

```
OutputChanging node availability, please type one of ('active'|'pause'|'drain')

```

输入 `drain` 并用确认 `ENTER` 。

排水选项可防止节点接收来自Swarm集群管理器的新指示，通常用于计划的环境。 使用消耗也意味着节点管理器在设置为活动可用性的单独节点上启动副本，以补偿消耗的节点的临时停机时间。

提交 `drain` 命令时，左上方的状态消息将确认操作：

您会在左上方显示的状态消息中看到此操作的确认。 此更改也反映在 `AVAILABILITY` 列中：

```
OutputNode iujfrchorop9mzsjswrclzcmb availability is now drain

```

您还将注意到 `AVAILABILITY` 列中 反映的更改 。

要 `node-2` 重新显示，请再次突出显示它，然后按 `CTRL+A` 来 重新显示 `Set Availability` 提示。 这次，键入 `active` 并按 `ENTER` 。

您还将看到此操作的确认消息：

```
OutputDocker daemon: update wrclzcmb availability is now active

```

我们没有使用的选项 `pause` 暂时中止节点中找到的每个容器内的所有进程，直到将它们 `active` 重新 设置为为止 。

在最后一步，我们将与Docker Swarm服务进行交互。

## 步骤8 —与Docker Swarm服务进行交互（可选）

按下 `5` 以查看 `Services` 干燥部分。

![仪表板服务科](https://i.imgur.com/c7DMszC.png)

前提条件教程仅设置一项服务， `webserver` 该 服务 设置为在必要时最多复制五个实例（即创建新容器）。 该视图确认 `5/5` 副本处于活动状态，并显示服务正在使用的端口映射及其分布式任务。

我们可以使用dry查看有关该服务的更多详细信息。 服务突出显示 `ENTER` 时 按 `webserver` 。

![仪表板Web服务器任务摘要](https://i.imgur.com/Vob3wMS.png)

这个详细的服务视图包含许多有关服务及其Swarm节点状态的信息。

有趣的是，尽管服务设置为五个，但您可能会注意到这里列出了七个任务。 这是因为当我们切换 `node-2` 到消耗模式 时，Docker Swarm在步骤7的测试中创建了两个额外的副本任务 。

我们也可以使用dry来增加最大副本数。 按 `ESC` 返回该 `Services` 部分，然后 `CTRL+S` 在突出显示 `webserver` 服务的 同时 输入 。 这将弹出缩放提示：

```
OutputScale service. Number of replicas?

```

在上下文中，扩展此服务将有助于满足由于Web流量增长而产生的对其他资源的任何需求。 通过输入 `8` 提示并按，将 副本数增加到8 `ENTER` 。

检查此确认消息以确认操作：

```
OutputDocker daemon: update v6gbc1ms0pi scaled to 8 replicas

```

您现在可以在 `Services` 视图中 看到 `8/8` 该服务的副本。

如果要完全删除服务，请突出显示它，然后按 `CTRL+R` 以拉出服务删除提示：

```
OutputAbout to remove the selected service. Do you want to proceed? y/N

```

`webserver` 如果您不再需要或不想运行它， 可以使用它来删除该 服务。

最后，按 `Q` 退出仪表板并退出程序。

## 结论

通过遵循本教程，您已经在Docker主机和Docker Swarm集群管理器上进行了设置。 本教程还介绍了dry功能的基本知识，例如与Docker容器，映像和网络以及Docker Swarm节点和服务进行交互。

有另一种方法可以将空连接到运行Docker的远程主机，该方法在空运行时使用 `-H` 带有远程主机IP地址 的 选项。 在您无法或不愿意安装干燥二进制文件的情况下，这很有用。

在这里，尝试将干燥应用于自己的Docker设置，以探索它如何简化您的工作流程。 您可以在 [GitHub README中](https://github.com/moncho/dry#dry-keybinds) 探索dry的额外键绑定 。
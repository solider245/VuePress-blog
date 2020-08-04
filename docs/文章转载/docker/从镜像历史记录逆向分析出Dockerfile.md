作者：杨冬 欢迎转载，也请保留这段声明。谢谢！
出处：[https://andyyoung01.github.io/](https://andyyoung01.github.io/) 或 [http://andyyoung01.16mb.com/](http://andyyoung01.16mb.com/)

可能有时候你得到了一个从Dockerfile创建的镜像文件，但是原始的Dockerfile丢失了。你想从这个镜像文件的构建历史记录中，逆向分析出原始的Dockerfile而省去寻找此文件的漫长过程。

虽然不可能在所有的情况下将一个Docker镜像完全得进行逆向工程，但如果此镜像是通过Dockerfile构建的，很有可能分析出此镜像是通过了什么命令得到的。我们以下面的Dockerfile为例，构建一个镜像，然后运行一个简单的shell脚本来演示如何分析镜像的构建历史记录，最后来看一个简洁的容器化的解决方案，来得出原始的Dockerfile。

|

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

 |

FROM busybox

MAINTAINER ian.miell@gmail.com

ENV myenvname myenvvalue

LABEL mylabelname mylabelvalue

WORKDIR /opt

RUN mkdir \-p copied

COPY Dockerfile copied/Dockerfile

RUN mkdir \-p added

ADD Dockerfile added/Dockerfile

RUN touch /tmp/afile

ADD Dockerfile /

EXPOSE 80

VOLUME /data

ONBUILD touch /tmp/built

ENTRYPOINT /bin/bash

CMD \-r

 |

首先要构建这个示例镜像，镜像命名为reverseme：

```
$ docker build -t reverseme .

```

### [](#SHELL解决方案 "SHELL解决方案")SHELL解决方案

这个基于shell的实现主要在这里用来演示逆向工程的思路与方法，它与下面的容器化解决方案相比还不是十分完整。此方案使用了`docker inspect`命令来提取出镜像的metadata。

> 此shell脚本中使用了jq程序，一个可以查询和操作JSON数据的工具。为了运行此脚本，需要安装jq程序（下载[链接](https://stedolan.github.io/jq/download/)）。

|

1

2

3

4

5

6

7

8

 |

docker history reverseme | \\

awk '{print $1}' | \\

grep \-v IMAGE | grep \-v missing | \\

tac | \\

sed "s/\\(.\*\\)/docker inspect \\1 | \\

jq \-r \\'.\[0\].ContainerConfig.Cmd\[2\] | tostring\\'/" | \\

sh | \\

sed 's/^#(nop) //'

 |

上述代码第1行得到了组成指定镜像的层；第2行从docker history输出得到了各层的image ID；第3行排除标题行（带有“IMAGE”的那一行）及IMAGE的 ID为missing的那一行；第4行将镜像ID倒序输出，使其符合Dockerfile的顺序（“tac”是“cat”的倒序）；第5、6行使用前面命令输出的image ID构建一个docker inspect命令，它输出Docker layer metadata。而此metadata通过管道输入到jq命令中，jq命令过滤metadata，获取当时构建此镜像时Dockerfile中使用的命令。第7行运行前面通过sed构建的整个docker inspect管道链。第8行剥离不能更改文件系统的指令——那些以“#(nop)”作为前缀的指令。
最后得到的输出结果类似于如下这样：

```docker

CMD \["sh"\]

MAINTAINER ian.miell@gmail.com

ENV myenvname=myenvvalue

LABEL mylabelname=mylabelvalue

WORKDIR /opt

mkdir \-p copied

COPY file:4d91fcee48e4591e5fdc4b8963892b7d9582524f85f84b33eac5af164f928213 in copied/Dockerfile

mkdir \-p added

ADD file:4d91fcee48e4591e5fdc4b8963892b7d9582524f85f84b33eac5af164f928213 in added/Dockerfile

touch /tmp/afile

ADD file:4d91fcee48e4591e5fdc4b8963892b7d9582524f85f84b33eac5af164f928213 in /

EXPOSE 80/tcp

VOLUME \[/data\]

ONBUILD touch /tmp/built

ENTRYPOINT \["/bin/sh" "\-c" "/bin/bash"\]

CMD \["/bin/sh" "\-c" "\-r"\]

```

上面的输出与初始的Dockerfile有些类似了，但还有些区别。`FROM`指令被替换成了上述CMD指令，丢失了使用的基础镜像BusyBox的信息。`ADD`和`COPY`命令没有使用原本的文件名而是使用的校验和（checksum），文件被拷贝到的位置保存了下来。最后，`CMD`和`ENTRYPOINT`命令变成了方括号的数组形式。
由于缺少构建上下文，使得ADD和COPY命令不能使用，上面逆向工程恢复的Dockerfile并不能不加修改就运行。你需要找出什么文件被添加到构建上下文中。对于前面那个例子来说，你可以启动镜像，进入容器的/opt/copied目录和/opt/added目录，将文件提取出来加入到你的新的构建上下文中。

### [](#容器解决方案 "容器解决方案")容器解决方案

使用前面的方案得到你感兴趣镜像的信息，是一个有用并且具有指导意义的方法，然而有更加干净的方法来得到同样的结果——使用centurylink/dockerfile\-from\-image镜像，同时这种方法更容易维护。而且，此方案提供了与原始Dockerfile类似的`FROM`命令的信息（如果它可以提供的话）：

```
\[yangdong@centos7 ~\]$ docker run \-v /var/run/docker.sock:/var/run/docker.sock \\

\>   centurylink/dockerfile\-from\-image reverseme

FROM busybox:latest

MAINTAINER ian.miell@gmail.com

ENV myenvname=myenvvalue

LABEL mylabelname=mylabelvalue

WORKDIR /opt

RUN mkdir \-p copied

COPY file:4d91fcee48e4591e5fdc4b8963892b7d9582524f85f84b33eac5af164f928213 in copied/Dockerfile

RUN mkdir \-p added

ADD file:4d91fcee48e4591e5fdc4b8963892b7d9582524f85f84b33eac5af164f928213 in added/Dockerfile

RUN touch /tmp/afile

ADD file:4d91fcee48e4591e5fdc4b8963892b7d9582524f85f84b33eac5af164f928213 in /

EXPOSE 80/tcp

VOLUME \[/data\]

ONBUILD touch /tmp/built

ENTRYPOINT \["/bin/sh" "\-c" "/bin/bash"\]

CMD \["/bin/sh" "\-c" "\-r"\]
```

> **此技术只适用于基于Dockerfile创建的镜像**——如果镜像是通过手工创建然后commit的，镜像间的区别不能体现在镜像的metadata里。
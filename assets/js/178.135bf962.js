(window.webpackJsonp=window.webpackJsonp||[]).push([[178],{408:function(e,v,_){"use strict";_.r(v);var a=_(25),s=Object(a.a)({},(function(){var e=this,v=e.$createElement,_=e._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[_("p"),_("div",{staticClass:"table-of-contents"},[_("ul",[_("li",[_("a",{attrs:{href:"#_1-前言"}},[e._v("1\\. 前言")])]),_("li",[_("a",{attrs:{href:"#_2-dockerfile-的基本结构"}},[e._v("2\\. Dockerfile 的基本结构")])]),_("li",[_("a",{attrs:{href:"#_3-dockerfile-文件说明"}},[e._v("3\\. Dockerfile 文件说明")])]),_("li",[_("a",{attrs:{href:"#_4-dockerfile-常用的指令。"}},[e._v("4\\. Dockerfile 常用的指令。")]),_("ul",[_("li",[_("a",{attrs:{href:"#_4-1-from-指令"}},[e._v("4.1 FROM 指令")])]),_("li",[_("a",{attrs:{href:"#_4-2-maintainer-指令"}},[e._v("4.2 ~MAINTAINER~ 指令")])]),_("li",[_("a",{attrs:{href:"#_4-3-label-指令"}},[e._v("4.3 LABEL 指令")])]),_("li",[_("a",{attrs:{href:"#_4-4-env-指令"}},[e._v("4.4 ENV 指令")])]),_("li",[_("a",{attrs:{href:"#_4-5-arg-指令"}},[e._v("4.5 ARG 指令")])]),_("li",[_("a",{attrs:{href:"#_4-6-workdir-指令"}},[e._v("4.6 WORKDIR 指令")])]),_("li",[_("a",{attrs:{href:"#_4-7-add-指令"}},[e._v("4.7 ADD 指令")])]),_("li",[_("a",{attrs:{href:"#_4-8-copy-指令"}},[e._v("4.8 COPY 指令")])]),_("li",[_("a",{attrs:{href:"#_4-9-run-指令"}},[e._v("4.9 RUN 指令")])]),_("li",[_("a",{attrs:{href:"#_4-10-cmd-指令"}},[e._v("4.10 CMD 指令")])]),_("li",[_("a",{attrs:{href:"#_4-11-entrypoint-指令"}},[e._v("4.11 ENTRYPOINT 指令")])]),_("li",[_("a",{attrs:{href:"#_4-12-expose-指令"}},[e._v("4.12 EXPOSE 指令")])]),_("li",[_("a",{attrs:{href:"#_4-13-volume-指令"}},[e._v("4.13 VOLUME 指令")])]),_("li",[_("a",{attrs:{href:"#_4-14-user-指令"}},[e._v("4.14 USER 指令")])]),_("li",[_("a",{attrs:{href:"#_4-15-onbuild-指令"}},[e._v("4.15 ONBUILD 指令")])])])]),_("li",[_("a",{attrs:{href:"#_5-总结"}},[e._v("5\\. 总结")])]),_("li",[_("a",{attrs:{href:"#附-spring-boot-dockerfile"}},[e._v("附: Spring Boot Dockerfile")])])])]),_("p"),e._v(" "),_("h2",{attrs:{id:"_1-前言"}},[e._v("1. 前言")]),e._v(" "),_("p",[_("strong",[e._v("Dockerfile")]),e._v(" 是用来构建自定义 "),_("strong",[e._v("Docker")]),e._v(" 镜像的文本文档。我们通过"),_("code",[e._v("docker build")]),e._v(" 命令用于从"),_("strong",[e._v("Dockerfile")]),e._v(" 文件构建镜像。 如果你要构建自定义镜像，"),_("strong",[e._v("Dockerfile")]),e._v(" 是你必须学会的技能之一。")]),e._v(" "),_("h2",{attrs:{id:"_2-dockerfile-的基本结构"}},[e._v("2. Dockerfile 的基本结构")]),e._v(" "),_("p",[_("strong",[e._v("Dockerfile")]),e._v(" 一般分为：基础镜像、镜像元信息、镜像操作指令和容器启动时执行指令，"),_("code",[e._v("#")]),e._v(" 为 "),_("strong",[e._v("Dockerfile")]),e._v(" 中的注释。")]),e._v(" "),_("h2",{attrs:{id:"_3-dockerfile-文件说明"}},[e._v("3. Dockerfile 文件说明")]),e._v(" "),_("p",[_("strong",[e._v("Docker")]),e._v(" 从上到下的顺序运行"),_("strong",[e._v("Dockerfile")]),e._v(" 的指令，每一个指令都以 "),_("code",[e._v("step")]),e._v(" 为步骤。而且文件的命名也必须为 "),_("code",[e._v("Dockerfile")]),e._v(" 。")]),e._v(" "),_("h2",{attrs:{id:"_4-dockerfile-常用的指令。"}},[e._v("4. Dockerfile 常用的指令。")]),e._v(" "),_("p",[e._v("接下来对常用的 "),_("strong",[e._v("Dockerfile")]),e._v(" 指令进行总结。")]),e._v(" "),_("h3",{attrs:{id:"_4-1-from-指令"}},[e._v("4.1 FROM 指令")]),e._v(" "),_("p",[_("code",[e._v("FROM")]),e._v("是指定基础镜像，必须为第一个命令，格式：")]),e._v(" "),_("p",[_("code",[e._v("FROM <image>:<tag>")])]),e._v(" "),_("p",[e._v("其中 "),_("code",[e._v("tag")]),e._v(" 或 "),_("code",[e._v("digest")]),e._v(" 是可选的，如果不使用这两个值时，会使用 "),_("code",[e._v("latest")]),e._v(" 版本的基础镜像。")]),e._v(" "),_("p",[e._v("示例： "),_("code",[e._v("FROM mysql:5.6")])]),e._v(" "),_("h3",{attrs:{id:"_4-2-maintainer-指令"}},[e._v("4.2 ~MAINTAINER~ 指令")]),e._v(" "),_("p",[_("code",[e._v("MAINTAINER")]),e._v(" 用来声明维护者信息,"),_("strong",[e._v("该命令已经过期")]),e._v("，推荐使用 "),_("code",[e._v("LABEL")]),e._v(" ，格式：")]),e._v(" "),_("p",[_("code",[e._v("MAINTAINER <name>")])]),e._v(" "),_("h3",{attrs:{id:"_4-3-label-指令"}},[e._v("4.3 LABEL 指令")]),e._v(" "),_("p",[e._v("LABEL：用于为镜像添加元数据,多用于声明构建信息，作者、机构、组织等。格式：")]),e._v(" "),_("p",[_("code",[e._v("LABEL <key>=<value> <key>=<value> <key>=<value> ...")])]),e._v(" "),_("p",[e._v("示例： "),_("code",[e._v('LABEL version="1.0" description="felord.cn" by="Felordcn"')])]),e._v(" "),_("p",[e._v("使用"),_("code",[e._v("LABEL")]),e._v(" 指定元数据时，一条LABEL指定可以指定一或多条元数据，指定多条元数据时不同元数据之间通过空格分隔。推荐将所有的元数据通过一条LABEL指令指定，以免生成过多的中间镜像。")]),e._v(" "),_("h3",{attrs:{id:"_4-4-env-指令"}},[e._v("4.4 ENV 指令")]),e._v(" "),_("p",[_("code",[e._v("ENV")]),e._v(" 用来设置环境变量，格式：")]),e._v(" "),_("div",{staticClass:"language- line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[e._v("ENV <key> <value>\n\nENV <key>=<value>\n复制代码\n")])]),e._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[e._v("1")]),_("br"),_("span",{staticClass:"line-number"},[e._v("2")]),_("br"),_("span",{staticClass:"line-number"},[e._v("3")]),_("br"),_("span",{staticClass:"line-number"},[e._v("4")]),_("br")])]),_("p",[e._v("示例： "),_("code",[e._v("ENV version 1.0.0")]),e._v(" 或者 "),_("code",[e._v("ENV version=1.0.0")])]),e._v(" "),_("p",[e._v("可以通过 "),_("code",[e._v("${key}")]),e._v(" 在其它指令中来引用变量，如 "),_("code",[e._v("${version}")]),e._v(" 。我们也可以通过 "),_("code",[e._v("docker run")]),e._v(" 中的 "),_("code",[e._v("-e <ENV>")]),e._v(" 来动态赋值")]),e._v(" "),_("h3",{attrs:{id:"_4-5-arg-指令"}},[e._v("4.5 ARG 指令")]),e._v(" "),_("p",[_("code",[e._v("ARG")]),e._v(" 用于指定传递给构建运行时的变量，格式：")]),e._v(" "),_("p",[_("code",[e._v("ARG <name>[=<default value>]")])]),e._v(" "),_("p",[e._v("通过 "),_("code",[e._v("docker run")]),e._v(" 中的 "),_("code",[e._v("--build-arg <key>=<value>")]),e._v(" 来动态赋值，不指定将使用其默认值。")]),e._v(" "),_("h3",{attrs:{id:"_4-6-workdir-指令"}},[e._v("4.6 WORKDIR 指令")]),e._v(" "),_("p",[_("code",[e._v("WORKDIR")]),e._v(" 用来指定工作目录，类似于我们通常使用的"),_("code",[e._v("cd")]),e._v(" 命令，格式：")]),e._v(" "),_("p",[_("code",[e._v("WORKDIR <PATH>")])]),e._v(" "),_("p",[e._v("通过 "),_("code",[e._v("WORKDIR")]),e._v(" 设置工作目录，"),_("strong",[e._v("Dockerfile")]),e._v(" 中的其它指令 "),_("code",[e._v("RUN")]),e._v("、"),_("code",[e._v("CMD")]),e._v("、"),_("code",[e._v("ENTRYPOINT")]),e._v("、"),_("code",[e._v("ADD")]),e._v("、"),_("code",[e._v("COPY")]),e._v("等命令都会在该目录下执行。在使用 "),_("code",[e._v("docker run")]),e._v(" 运行容器时，可以通过 "),_("code",[e._v("-w")]),e._v(" 参数覆盖构建时所设置的工作目录。")]),e._v(" "),_("h3",{attrs:{id:"_4-7-add-指令"}},[e._v("4.7 ADD 指令")]),e._v(" "),_("p",[_("code",[e._v("ADD")]),e._v(" 用于将本地文件添加到镜像中，"),_("code",[e._v("tar")]),e._v(" 类型文件会自动解压(网络压缩资源不会被解压)，可以访问网络资源，类似 "),_("code",[e._v("wget")]),e._v("，格式：")]),e._v(" "),_("div",{staticClass:"language- line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[e._v(' ADD <src>... <dest>\n # 用于支持包含空格的路径\n ADD ["<src>",... "<dest>"]\n复制代码\n')])]),e._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[e._v("1")]),_("br"),_("span",{staticClass:"line-number"},[e._v("2")]),_("br"),_("span",{staticClass:"line-number"},[e._v("3")]),_("br"),_("span",{staticClass:"line-number"},[e._v("4")]),_("br")])]),_("p",[e._v("示例：")]),e._v(" "),_("blockquote",[_("p",[e._v('ADD home* /path/ # 支持通配符 * 添加所有以"home"开头的文件 到/path/ 下')])]),e._v(" "),_("h3",{attrs:{id:"_4-8-copy-指令"}},[e._v("4.8 COPY 指令")]),e._v(" "),_("p",[_("code",[e._v("COPY")]),e._v(" 的功能类似于 "),_("code",[e._v("ADD")]),e._v("，但是不会自动解压文件，也不能访问网络资源")]),e._v(" "),_("h3",{attrs:{id:"_4-9-run-指令"}},[e._v("4.9 RUN 指令")]),e._v(" "),_("p",[_("code",[e._v("RUN")]),e._v(" 用来执行构建镜像时执行的命令，有以下两种命令执行方式：")]),e._v(" "),_("ul",[_("li",[_("code",[e._v("shell")]),e._v(" 执行格式：")])]),e._v(" "),_("p",[_("code",[e._v("RUN <command>")])]),e._v(" "),_("p",[e._v("示例："),_("code",[e._v("RUN apk update")])]),e._v(" "),_("ul",[_("li",[_("code",[e._v("exec")]),e._v(" 执行格式：")])]),e._v(" "),_("p",[_("code",[e._v('RUN ["executable", "param1", "param2"]')])]),e._v(" "),_("p",[e._v("示例： "),_("code",[e._v('RUN ["/dev/file", "p1", "p2"]')])]),e._v(" "),_("p",[e._v("需要注意的是： "),_("code",[e._v("RUN")]),e._v(" 指令创建的中间镜像会被缓存，并会在下次构建中使用。如果不想使用缓存镜像，可在构建时指定 "),_("code",[e._v("--no-cache")]),e._v(" 参数，示例："),_("code",[e._v("docker build --no-cache")])]),e._v(" "),_("h3",{attrs:{id:"_4-10-cmd-指令"}},[e._v("4.10 CMD 指令")]),e._v(" "),_("p",[_("code",[e._v("CMD")]),e._v(" 构建容器后执行的命令，也就是在容器启动时才执行的命令。格式：")]),e._v(" "),_("div",{staticClass:"language- line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[e._v(' # 执行可执行文件，优先执行\n CMD ["executable","param1","param2"]\n # 设置了 ENTRYPOINT，则直接调用ENTRYPOINT添加参数  参见 CMD 讲解\n CMD ["param1","param2"]\n # 执行shell命令\n CMD command param1 param2\n复制代码\n')])]),e._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[e._v("1")]),_("br"),_("span",{staticClass:"line-number"},[e._v("2")]),_("br"),_("span",{staticClass:"line-number"},[e._v("3")]),_("br"),_("span",{staticClass:"line-number"},[e._v("4")]),_("br"),_("span",{staticClass:"line-number"},[e._v("5")]),_("br"),_("span",{staticClass:"line-number"},[e._v("6")]),_("br"),_("span",{staticClass:"line-number"},[e._v("7")]),_("br")])]),_("p",[e._v("示例： "),_("code",[e._v('CMD ["/usr/bin/bash","--help"]')])]),e._v(" "),_("p",[_("code",[e._v("CMD")]),e._v(" 不同于 "),_("code",[e._v("RUN")]),e._v("，"),_("code",[e._v("CMD")]),e._v(" 用于指定在容器启动时所要执行的命令，而RUN用于指定镜像构建时所要执行的命令。")]),e._v(" "),_("h3",{attrs:{id:"_4-11-entrypoint-指令"}},[e._v("4.11 ENTRYPOINT 指令")]),e._v(" "),_("p",[_("code",[e._v("ENTRYPOINT")]),e._v(" 用来配置容器，使其可执行化。配合 "),_("code",[e._v("CMD")]),e._v("可省去 "),_("code",[e._v("application")]),e._v("，只使用参数。格式：")]),e._v(" "),_("div",{staticClass:"language- line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[e._v(' #可执行文件, 优先\n ENTRYPOINT ["executable", "param1", "param2"]\n # shell内部命令\n ENTRYPOINT command param1 param2\n复制代码\n')])]),e._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[e._v("1")]),_("br"),_("span",{staticClass:"line-number"},[e._v("2")]),_("br"),_("span",{staticClass:"line-number"},[e._v("3")]),_("br"),_("span",{staticClass:"line-number"},[e._v("4")]),_("br"),_("span",{staticClass:"line-number"},[e._v("5")]),_("br")])]),_("p",[e._v("示例：")]),e._v(" "),_("div",{staticClass:"language- line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[e._v('    FROM ubuntu\n\n    ENTRYPOINT ["top", "-b"]\n\n    CMD ["-c"]\n复制代码\n')])]),e._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[e._v("1")]),_("br"),_("span",{staticClass:"line-number"},[e._v("2")]),_("br"),_("span",{staticClass:"line-number"},[e._v("3")]),_("br"),_("span",{staticClass:"line-number"},[e._v("4")]),_("br"),_("span",{staticClass:"line-number"},[e._v("5")]),_("br"),_("span",{staticClass:"line-number"},[e._v("6")]),_("br")])]),_("p",[_("code",[e._v("ENTRYPOINT")]),e._v(" 与 "),_("code",[e._v("CMD")]),e._v(" 非常类似，不同的是通过 "),_("code",[e._v("docker run")]),e._v(" 执行的命令不会覆盖 "),_("code",[e._v("ENTRYPOINT")]),e._v(" ，而 "),_("code",[e._v("docker run")]),e._v(" 命令中指定的任何参数都会被当做参数再次传递给 "),_("code",[e._v("ENTRYPOINT")]),e._v(" 指令。"),_("strong",[e._v("Dockerfile")]),e._v(" 中只有最后一个 "),_("code",[e._v("ENTRYPOINT")]),e._v(" 命令起作用，也就是说如果你指定多个"),_("code",[e._v("ENTRYPOINT")]),e._v(",只执行最后的 "),_("code",[e._v("ENTRYPOINT")]),e._v(" 指令。")]),e._v(" "),_("h3",{attrs:{id:"_4-12-expose-指令"}},[e._v("4.12 EXPOSE 指令")]),e._v(" "),_("p",[_("code",[e._v("EXPOSE")]),e._v(" 指定与外界交互的端口，格式：")]),e._v(" "),_("p",[_("code",[e._v("EXPOSE [<port>...]")])]),e._v(" "),_("p",[e._v("示例: "),_("code",[e._v("EXPOSE 8080 443")]),e._v(" 、"),_("code",[e._v("EXPOSE 80")]),e._v(" 、"),_("code",[e._v("EXPOSE 11431/tcp 12551/udp")])]),e._v(" "),_("p",[_("code",[e._v("EXPOSE")]),e._v(" 并不会直接让容器的端口映射主机。宿主机访问容器端口时，需要在 "),_("code",[e._v("docker run")]),e._v(" 运行容器时通过 "),_("code",[e._v("-p")]),e._v(" 来发布这些端口，或通过 "),_("code",[e._v("-P")]),e._v(" 参数来发布"),_("code",[e._v("EXPOSE")]),e._v(" 导出的所有端口")]),e._v(" "),_("h3",{attrs:{id:"_4-13-volume-指令"}},[e._v("4.13 VOLUME 指令")]),e._v(" "),_("p",[_("code",[e._v("VOLUME")]),e._v(" 用于指定持久化目录, 格式：")]),e._v(" "),_("p",[_("code",[e._v('VOLUME ["<src>",...]')])]),e._v(" "),_("p",[e._v("示例："),_("code",[e._v('VOLUME ["/data"]')]),e._v("，"),_("code",[e._v('VOLUME ["/var/www", "/var/log/apache2", "/etc/apache2"]')])]),e._v(" "),_("p",[e._v("一个卷可以存在于一个或多个容器的指定目录，该目录可以绕过联合文件系统，并具有以下功能：")]),e._v(" "),_("ol",[_("li",[e._v("卷可以容器间共享和重用")]),e._v(" "),_("li",[e._v("容器并不需要要和其它容器共享卷")]),e._v(" "),_("li",[e._v("修改卷后会立即生效")]),e._v(" "),_("li",[e._v("对卷的修改不会对镜像产生影响")]),e._v(" "),_("li",[e._v("卷会一直存在，直到没有任何容器在使用它")])]),e._v(" "),_("p",[e._v("和 "),_("code",[e._v("EXPOSE")]),e._v(" 指令类似， "),_("code",[e._v("VOLUME")]),e._v(" 并不会挂载的宿主机，需要通过 "),_("code",[e._v("docker run")]),e._v(" 运行容器时通过 "),_("code",[e._v("-v")]),e._v(" 来映射到宿主机的目录中。参见另一个命令 "),_("code",[e._v("docker volume create")])]),e._v(" "),_("h3",{attrs:{id:"_4-14-user-指令"}},[e._v("4.14 USER 指令")]),e._v(" "),_("p",[_("code",[e._v("USER")]),e._v(" 指定运行容器时的用户名或 "),_("code",[e._v("UID")]),e._v("，后续的 "),_("code",[e._v("RUN")]),e._v(" 也会使用指定用户。使用 "),_("code",[e._v("USER")]),e._v(" 指定用户时，可以使用用户名、"),_("code",[e._v("UID")]),e._v(" 或"),_("code",[e._v("GID")]),e._v("，或是两者的组合。当服务不需要管理员权限时，可以通过该命令指定运行用户。并且可以在之前创建所需要的用户,格式:")]),e._v(" "),_("div",{staticClass:"language- line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[e._v("USER user\nUSER user:group\nUSER uid:group\nUSER uid\nUSER user:gid\nUSER uid:gid\n复制代码\n")])]),e._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[e._v("1")]),_("br"),_("span",{staticClass:"line-number"},[e._v("2")]),_("br"),_("span",{staticClass:"line-number"},[e._v("3")]),_("br"),_("span",{staticClass:"line-number"},[e._v("4")]),_("br"),_("span",{staticClass:"line-number"},[e._v("5")]),_("br"),_("span",{staticClass:"line-number"},[e._v("6")]),_("br"),_("span",{staticClass:"line-number"},[e._v("7")]),_("br")])]),_("p",[e._v("使用 "),_("code",[e._v("USER")]),e._v(" 指定用户后，"),_("strong",[e._v("Dockerfile")]),e._v(" 中其后的命令 "),_("code",[e._v("RUN")]),e._v("、"),_("code",[e._v("CMD")]),e._v("、"),_("code",[e._v("ENTRYPOINT")]),e._v(" 都将使用该用户。你可以通过 "),_("code",[e._v("docker run")]),e._v(" 运行容器时，可以通过 "),_("code",[e._v("-u")]),e._v(" 参数来覆盖指定用户。")]),e._v(" "),_("h3",{attrs:{id:"_4-15-onbuild-指令"}},[e._v("4.15 ONBUILD 指令")]),e._v(" "),_("p",[_("code",[e._v("ONBUILD")]),e._v(" 作用是其当所构建的镜像被用做其它镜像的基础镜像，该镜像中的 "),_("code",[e._v("ONBUILD")]),e._v(" 中的命令就会触发，格式：")]),e._v(" "),_("p",[_("code",[e._v("ONBUILD [INSTRUCTION]")])]),e._v(" "),_("p",[e._v("示例：")]),e._v(" "),_("div",{staticClass:"language- line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[e._v("ONBUILD ADD . /application/src\nONBUILD RUN /usr/local/bin/python-build --dir /app/src\n复制代码\n")])]),e._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[e._v("1")]),_("br"),_("span",{staticClass:"line-number"},[e._v("2")]),_("br"),_("span",{staticClass:"line-number"},[e._v("3")]),_("br")])]),_("h2",{attrs:{id:"_5-总结"}},[e._v("5. 总结")]),e._v(" "),_("p",[e._v("今天对构建 "),_("strong",[e._v("Docker")]),e._v(" 镜像脚本 "),_("strong",[e._v("Dockerfile")]),e._v(" 基本命令进行的详细的总结，并加以举例说明，相信能解决你在构建镜像中的一些困惑。敬请多多关注微信公众号：Felordcn ，后续将会有更多干货奉上。")]),e._v(" "),_("h2",{attrs:{id:"附-spring-boot-dockerfile"}},[e._v("附: Spring Boot Dockerfile")]),e._v(" "),_("div",{staticClass:"language- line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[e._v('   # 使用 aws 的java jdk 8\n   FROM amazoncorretto:8\n   # 作者等相关的元信息\n   LABEL AUTHOR=Felordcn OG=felord.cn\n   # 挂载卷\n   VOLUME ["/tmp","/logs"]\n   # 时区\n   ENV TZ=Asia/Shanghai\n   # 启用配置文件 默认为 application.yml\n   ENV ACTIVE=defualt\n   # 设置镜像时区\n   RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone\n   # 修改为打包后的jar文件名称\n   ADD /target/flyway-spring-boot-1.0.0.jar app.jar\n   ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=${ACTIVE}","-jar","app.jar"]\n复制代码\n')])]),e._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[e._v("1")]),_("br"),_("span",{staticClass:"line-number"},[e._v("2")]),_("br"),_("span",{staticClass:"line-number"},[e._v("3")]),_("br"),_("span",{staticClass:"line-number"},[e._v("4")]),_("br"),_("span",{staticClass:"line-number"},[e._v("5")]),_("br"),_("span",{staticClass:"line-number"},[e._v("6")]),_("br"),_("span",{staticClass:"line-number"},[e._v("7")]),_("br"),_("span",{staticClass:"line-number"},[e._v("8")]),_("br"),_("span",{staticClass:"line-number"},[e._v("9")]),_("br"),_("span",{staticClass:"line-number"},[e._v("10")]),_("br"),_("span",{staticClass:"line-number"},[e._v("11")]),_("br"),_("span",{staticClass:"line-number"},[e._v("12")]),_("br"),_("span",{staticClass:"line-number"},[e._v("13")]),_("br"),_("span",{staticClass:"line-number"},[e._v("14")]),_("br"),_("span",{staticClass:"line-number"},[e._v("15")]),_("br"),_("span",{staticClass:"line-number"},[e._v("16")]),_("br")])]),_("p",[_("code",[e._v("关注公众号：Felordcn 获取更多资讯")])])])}),[],!1,null,null,null);v.default=s.exports}}]);
---
title : Webhook到底是个啥？
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-17 06:12:15 +0800
categories:
 -
tags:
 -
---
[[toc]]
    

 

  


服务器：`Jenkins Server` `Git Server` `App Server` 关键词：`nodejs` `ngrok` `github webhook`

在配置Jenkins实现前端自动化构建的过程中，对于自动化的过程理解很模糊，只是知道Jenkins服务器，Git仓库和后端应用服务器这三个概念。

*   **git push之后，Git如何通知Jenkins对应Job的工作区实时构建**？

答案就是：Git webhook机制发出请求，告知Jenkins服务器你要自动构建了。

webhook与异步编程中"订阅-发布模型"非常类似，一端触发事件，一端监听执行。

如果仅仅想学习webhook，可以直接阅读。但是一定要注意，知识点是"异步编程模型"，webhook仅仅是它的一个实现。

开启正文！

> 以github webhook，koa，ngrok学习Webhook。

维基百科：

> 在web开发过程中的webhook，是一种通过通常的callback，去增加或者改变web page或者web app行为的方法。这些callback可以由第三方用户和开发者维持当前，修改，管理，而这些使用者与网站或者应用的原始开发没有关联。`webhook`这个词是由Jeff Lindsay在2007年在计算机科学hook项目第一次提出的。

*   Webhooks是"user-defined HTTP回调"。它们通常由一些事件触发，例如"push 代码到repo"，或者"post 一个评论到博客"。
*   \*\*当事件发生时，源网站可以发起一个HTTP请求到webhook配置的URL。\*\*配置之后，用户可以通过在一个站点触发事件，之后再调用另一个站点的行为。可以是任何操作。
*   普通用户可以使用**CI系统**或者通知bug追踪系统触发build。
*   由于webhook使用HTTP协议，因此可以直接被集成到web service。所以他们有时会被用来构建消息队列服务，例如一些RESTful的例子：IronMQ和RestMS。

> 以Github Webhook为例，学习webhook。

### 一、基础部分

Webhook 允许我们通过在Github.com订阅事件后构建后或者安装Github应用。当其中之一的事件被触发时，我们可以发送HTTP POST请求到webhook的配置URL。\*\*Webhook可以用作升级一个issue追踪，触发CI构建，升级一个后端镜像，或者甚至是部署你的生产服务器。\*\*只有想不到，没有做不到。

#### 事件

在配置webhook的时候，你可以选择自己想要接收的事件。你甚至可以选择参加触发所有事件。只有订阅特殊的需要的事件，可以有效限制服务器HTTP请求数。可以通过API或者UR随时订阅事件。默认情况下，webhook只订阅push事件。

每个事件与一个动作集合联系，这些动作可以在你的组织或者repo中发生。例如，如果你订阅了issues事件，你将在issue open，close以及labeled时接收到detailed payload。

下面是一些可用的事件：

Name

Description

`*`

Any time any event is triggered ([Wildcard Event](https://developer.github.com/webhooks/ rel=)).

[`check_run`](https://developer.github.com/v3/activity/events/types/ rel=)

Any time a check run is created, requested, or rerequested.

[`check_suite`](https://developer.github.com/v3/activity/events/types/ rel=)

Any time a check suite is completed, requested, or rerequested.

[`commit_comment`](https://developer.github.com/v3/activity/events/types/ rel=)

Any time a Commit is commented on.

[`push`](https://developer.github.com/v3/activity/events/types/ rel=)

Any Git push to a Repository, including editing tags or branches. Commits via API actions that update references are also counted. This is the default event.

......

#### 载荷

每一个事件类型都有一个指定的与相关事件信息有关的payload格式。所有的事件载荷都是事件类型的载荷镜像，push除外，因为他有更加详细的webhook负载。

除了每个事件的documented字段，webhook负载包含了执行事件的用户以及组织和或repo，对于一个Github App的webhook来说，它包含installation。在PullRequestEvent payload中有示例。

#### 发送报文头

发送到webhook配置URL的HTTP POST负载会包含几个指定的报文头。

Header

Description

`X-GitHub-Event`

触发分发的事件类型。

`X-GitHub-Delivery`

唯一识别分发的GUID。

`X-Hub-Signature`

HMAC十六进制的响应体。如果secret配置了，这个头信息将被发送。HMAC十六进制由sha1哈希算法生成，secret作为HMAC的key。

User-Agent也将会加上前缀GitHub-Hookshot/. 示例：

    POST /payload HTTP/1.1
    Host: localhost:4567
    X-Github-Delivery: 72d3162e-cc78-11e3-81ab-4c9367dc0958
    X-Hub-Signature: sha1=7d38cdd689735b008b3c702edd92eea23791c5f6
    User-Agent: GitHub-Hookshot/044aadd
    Content-Type: application/json
    Content-Length: 6615
    X-GitHub-Event: issues
    {
      "action": "opened",
      "issue": {
        "url": "https://api.github.com/repos/octocat/Hello-World/issues/1347",
        "number": 1347,
        ...
      },
      "repository" : {
        "id": 1296269,
        "full_name": "octocat/Hello-World",
        "owner": {
          "login": "octocat",
          "id": 1,
          ...
        },
        ...
      },
      "sender": {
        "login": "octocat",
        "id": 1,
        ...
      }
    }
    复制代码

Ping 事件 ping事件负载

    | Key | Value |
    | --- | --- |
    | zen | Random string of GitHub zen |
    | hook_id | The ID of the webhook that triggered the ping |
    | hook | The [webhook configuration](https://developer.github.com/v3/repos/hooks/#get-single-hook) |
    复制代码

GitHub App 当你注册一个新的GitHub App时，GitHub发送一个ping事件到webhook URL。事件的包含app\_id。

    {
      "hook":{
        "type":"App",
        "id":11,
        "active":true,
        "events":["pull_request"],
        "app_id":37,
        ...
      }
    }
    复制代码

### 二、实验开始

#### 1\. 配置并创建Webhook

*   配置Github监听事件类型
    *   Payload URL接收webhook POST请求的服务器端口。
*   Content类型
    *   application/json会将JSON payload直接放置POST的body中。
    *   application/x-www-form-urlencoded类型将JSON payload作为payload参数发送。
*   Secret
    *   使得webhooks更加安全的一个配置。
*   Events
    *   Events是webhook的核心。只要对存储库执行某项操作，就会触发这些webhook，服务器的有效负载URL会拦截并执行操作。
        
        ![](https://user-gold-cdn.xitu.io/2018/12/2/1676e75b99bde48a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
        

#### 2\. 配置接收和管理负载的服务器

*   安装ngrok并且做公网映射

    ./ngrok http 4567
    复制代码

将生成的只有8小时有效时间的url复制到Payload URL。

    http://785902b9.ngrok.io/payload
    复制代码

*   写接收/payload路径的nodejs服务

    var Koa = require('koa');
    var Router = require('koa-router');
    
    var app = new Koa();
    var router = new Router();
    
    router
        .post('/payload', (ctx, next) => {
            console.log(ctx);
        })
    
    app
        .use(router.routes())
        .use(router.allowedMethods());
    
    app.listen(4567);
    复制代码

运行以下命令启动服务：

    node server.js
    复制代码

*   在Issues new 一个Issue。
    
    ![](https://user-gold-cdn.xitu.io/2018/12/2/1676e75b99c24bc0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
    
*   本地的服务监听到issue事件之后，会打印出webhook的信息

    { request: 
       { method: 'POST',
         url: '/payload',
         header: 
          { host: '785902b9.ngrok.io',
            accept: '*/*',
            'user-agent': 'GitHub-Hookshot/22e0d92',
            'x-github-event': 'issues',
            'x-github-delivery': 'cde0a020-7c48-11e8-9c35-c1d90e4891c8',
            'content-type': 'application/x-www-form-urlencoded',
            'x-hub-signature': 'sha1=9f4873803f9615615e02f7dec856778ebfc201be',
            'content-length': '10929',
            'x-forwarded-for': '192.30.252.44' } },
      response: { status: 404, message: 'Not Found', header: {} },
      app: { subdomainOffset: 2, proxy: false, env: 'development' },
      originalUrl: '/payload',
      req: '<original node req>',
      res: '<original node res>',
      socket: '<original node socket>' }
    复制代码

#### 3.测试Webhooks

在每一个Webhook下都有一个触发事件记录列表。

![](https://user-gold-cdn.xitu.io/2018/12/2/1676e75b9af45579?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

单击后会展开webhook的请求和响应。

![](https://user-gold-cdn.xitu.io/2018/12/2/1676e75b9b052683?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![](https://user-gold-cdn.xitu.io/2018/12/2/1676e75b9af50cbd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 4.在Github和server设置token

*   不要硬编码，使用安全随机的方式生成十六进制hash token
*   将生成的token复制到webhook的secret配置处，再将其保存到服务器专门的本地变量中
*   token hash在请求报文头的X-Hub-Signature
*   可以设置服务端token校验，若本地保存的token与Github传来的token不一致，报500

### 三、实验分析

*   **订阅: github repo订阅`issue` webhook event**
*   **发布: 由来自世界各地的开发者建立issue后，触发trigger，发请求到Payload URL，发请求到服务器**
*   _处理: URL对应的服务器，解析请求，做出响应_

### 四、引申分析Jenkins CI

*   git push之后，Git如何通知Jenkins对应Job的工作区实时自动构建？
    *   **订阅: Git仓库订阅`push` webhook event**
    *   **发布: 某个开发人员本地git push后，触发Git repo的trigger，发请求Jenkins服务器**
    *   _处理: Jenkins服务器解析请求，进行自动构建_
*   核心知识点是什么？ "发布-订阅" 事件异步编程模型，要注意这个模型是**只针对Git repo自身**的，它订阅了来自local的push事件，触发者则是某一个开发者的git push操作。

### 五、发布订阅者模型引申

*   vue组件通信 `$emit` `$on`
*   vue异步优先队列，`$nextTick()`自身订阅发布
*   vuex全局状态树 提交mutation `commit()` 隐式监听
*   webhook event 新增请求报文头
*   nodejs middleware next
*   child\_process.fork 多线程通信
*   ARP协议 私有局域网内的机器间通信
*   nodejs EventEmitter
*   vuex plugin subscribe
*   基于Dijkstra算法的链路状态路由 动态更新路由表
*   ZooKeeper动态服务发现和服务路由功能

如果还是不懂，建议先阅读朴灵大神的《深入浅出nodejs》的异步章节，并且涉猎大量的非前端技术，并实践。

不过对于这篇博文来说，**webhook是Git的一种机制，可用于前端自动化构建**是关键知识点。

当然，关于这篇博文，其实有些流程还不是很清晰，文章内容可能在我做完一次完整的**Jenkins自动化构建实验**后更新。

参考：

*   [www.wikiwand.com/en/Webhook](https://www.wikiwand.com/en/Webhook)
*   [developer.github.com/webhooks/](https://developer.github.com/webhooks/)
*   [developer.github.com/webhooks/co…](https://developer.github.com/webhooks/configuring/)
*   [developer.github.com/webhooks/te…](https://developer.github.com/webhooks/testing/)
*   [developer.github.com/webhooks/se…](https://developer.github.com/webhooks/securing/)
*   [blog.csdn.net/boling\_cava…](https://blog.csdn.net/boling_cavalry/article/details/78943061)

That it ！

> 期待和大家交流，共同进步，欢迎大家加入我创建的与前端开发密切相关的技术讨论小组：
> 
> *   SegmentFault技术圈:[ES新规范语法糖](https://segmentfault.com/g/1570000010695363)
> *   SegmentFault专栏：[趁你还年轻，做个优秀的前端工程师](https://segmentfault.com/blog/chennihainianqing)
> *   知乎专栏：[趁你还年轻，做个优秀的前端工程师](https://zhuanlan.zhihu.com/wyasy)
> *   Github博客: [趁你还年轻233的个人博客](https://github.com/FrankKai/FrankKai.github.io)
> *   前端开发QQ群：660634678
> *   微信公众号： 人兽鬼 / excellent\_developers
>     
>     ![](https://user-gold-cdn.xitu.io/2020/1/3/16f697328370a431?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
>     

> 努力成为优秀前端工程师！

关注下面的标签，发现更多相似文章

[

前端

](https://juejin.im/tag/%E5%89%8D%E7%AB%AF)[

后端

](https://juejin.im/tag/%E5%90%8E%E7%AB%AF)

[](https://juejin.im/user/2277843821419805)

[](https://juejin.im/user/2277843821419805)

 [](https://juejin.im/user/2277843821419805) 

[](https://juejin.im/user/2277843821419805)[

](/user/2277843821419805)

[趁你还年轻233](/user/2277843821419805) [![lv-3](https://juejin.im/post/data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDIzIDE0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iIzU5OURGRiIgZD0iTTMgMWgxN2EyIDIgMCAwIDEgMiAydjhhMiAyIDAgMCAxLTIgMkgzYTIgMiAwIDAgMS0yLTJWM2EyIDIgMCAwIDEgMi0yeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zIDRoMnY3SDN6TTggNmgybDIgNWgtMnoiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTQgNmgtMmwtMiA1aDJ6TTMgOWg1djJIM3pNMTUgM2g1djJoLTV6TTE4IDVoMnYxaC0yek0xOCA4aDJ2MWgtMnpNMTYgNmg0djJoLTR6TTE1IDloNXYyaC01eiIvPgogICAgPC9nPgo8L3N2Zz4K)](https://juejin.im/book/5c90640c5188252d7941f5bb/section/5c9065385188252da6320022) 前端开发 @ I don't know FE

[发布了 52 篇专栏 ·](/user/2277843821419805/posts) 获得点赞 1,558 · 获得阅读 72,710

关注

[安装掘金浏览器插件](https://juejin.im/extension/?utm_source=juejin.im&utm_medium=post&utm_campaign=extension_promotion)

打开新标签页发现好内容，掘金、GitHub、Dribbble、ProductHunt 等站点内容轻松获取。快来安装掘金浏览器插件获取高质量内容吧！
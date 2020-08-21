---
title : Django 3.1中的异步视图 TestDriven.io
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-19 04:20:14 +0800
categories:
 -
tags:
 -
---
[[toc]]
编写异步代码使您能够毫不费力地加速应用程序。随着Django 3.1最终[支持](https://docs.djangoproject.com/en/3.1/releases/3.1/#asynchronous-views-and-middleware-support)异步视图，中间件和测试，现在是将它们置入现实的好时机。

这篇文章探讨了如何开始使用Django的新异步视图。

> 如果您想了解有关异步代码背后的强大功能以及Python中线程，多处理和异步之间的区别的更多信息，请查看我的[《通过并发，并行和异步编写Speeding Up Python》](/blog/concurrency-parallelism-asyncio/)。

内容
--

*   [目标](#objectives)
*   [先决条件](#prerequisites)
*   [创建应用](#creating-the-app)
*   [HTTPX](#httpx)
*   [抽一些肉](#smoking-some-meats)
*   [烧肉](#burnt-meats)
*   [同步到异步](#sync-to-async)
*   [芹菜和异步视图](#celery-and-async-views)
*   [何时使用](#when-to-use)
*   [结论](#conclusion)

目标
--

在这篇文章的结尾，您应该能够：

1.  在Django中编写异步视图
2.  在Django视图中发出非阻塞HTTP请求
3.  使用Django的异步视图简化基本的后台任务
4.  使用sync\_to\_async在异步视图内进行同步调用
5.  说明何时应该和不应该使用异步视图

您还应该能够回答以下问题：

1.  如果您在异步视图中进行同步调用怎么办？
2.  如果您在异步视图中进行同步和异步调用怎么办？
3.  Celery是否仍然需要Django的异步视图？

先决条件
----

只要您已经熟悉Django本身，向非基于类的视图添加异步功能就非常简单。

### 依存关系

1.  Python> = 3.8
2.  Django> = 3.1
3.  葡萄胎
4.  HTTPX

### 什么是ASGI？

[ASGI](https://asgi.readthedocs.io/en/latest/)代表异步服务器网关接口。这是[WSGI](https://wsgi.readthedocs.io/en/latest/)的现代，异步的后续产品，为创建基于Python的异步Web应用程序提供了标准。

值得一提的另一件事是，ASGI与WSGI向后兼容，即使您_不_准备转向编写异步应用程序，也可以将其从Gunicorn或uWSGI之类的WSGI服务器切换至[Uvicorn](https://www.uvicorn.org/)或[Daphne之](https://github.com/django/daphne)类的ASGI服务器。。

创建应用
----

创建一个新的项目目录以及一个新的Django项目：

```
$ mkdir django-async-views && cd django-async-views
$ python3.8 -m venv env
$ source env/bin/activate

(env)$ pip install django
(env)$ django-admin.py startproject hello_async .

```

> 随意将virtualenv和Pip换成[Poetry](https://python-poetry.org/)或[Pipenv](https://pipenv.pypa.io/)。

如果您使用内置的开发服务器，则Django将运行您的异步视图，但实际上不会异步运行它们，因此我们将使用Uvicorn来支撑服务器。

安装它：

```
(env)$ pip install uvicorn

```

要使用Uvicorn运行项目，请从项目的根目录使用以下命令：

```
uvicorn {name of your project}.asgi:application

```

在我们的情况下，这将是：

```
(env)$ uvicorn hello_async.asgi:application

```

接下来，让我们创建第一个异步视图。添加一个新文件以将视图保存在“ hello_async”文件夹中，然后添加以下视图：

```
\# hello_async/views.py

from django.http import HttpResponse

async def index(request):
    return HttpResponse("Hello, async Django!")

```

在Django中创建异步视图就像创建同步视图一样简单-您只需添加`async`关键字即可。

更新网址：

```
\# hello_async/urls.py

from django.contrib import admin
from django.urls import path

from hello_async.views import index

urlpatterns = \[
    path("admin/", admin.site.urls),
    path("", index),
\]

```

现在，在根文件夹的终端中，运行：

```
(env)$ uvicorn hello_async.asgi:application --reload

```

> 该`--reload`标志告诉uvicorn监视文件中的更改，如果发现任何更改，则重新加载。那可能是不言而喻的。

在您喜欢的Web浏览器中打开[http：// localhost：8000 /](http://localhost:8000/)：

```
Hello, async Django!

```

这不是世界上最令人兴奋的事情，但是，嘿，这是一个开始。值得注意的是，使用Django的内置开发服务器运行此视图将产生完全相同的功能和输出。这是因为我们实际上没有在处理程序中执行任何异步操作。

HTTPX
-----

值得注意的是，异步支持是完全向后兼容的，因此您可以混合使用异步和同步视图，中间件和测试。Django将在适当的执行上下文中执行每个操作。

为了说明这一点，请添加一些新视图：

```
\# hello_async/views.py

import asyncio
from time import sleep

import httpx
from django.http import HttpResponse

\# helpers

async def http\_call\_async():
    for num in range(1, 6):
        await asyncio.sleep(1)
        print(num)
    async with httpx.AsyncClient() as client:
        r = await client.get("https://httpbin.org/")
        print(r)

def http\_call\_sync():
    for num in range(1, 6):
        sleep(1)
        print(num)
    r = httpx.get("https://httpbin.org/")
    print(r)

\# views

async def index(request):
    return HttpResponse("Hello, async Django!")

async def async_view(request):
    loop = asyncio.get\_event\_loop()
    loop.create_task(http\_call\_async())
    return HttpResponse("Non-blocking HTTP request")

def sync_view(request):
    http\_call\_sync()
    return HttpResponse("Blocking HTTP request")

```

更新网址：

```
\# hello_async/urls.py

from django.contrib import admin
from django.urls import path

from hello_async.views import index, async_view, sync_view

urlpatterns = \[
    path("admin/", admin.site.urls),
    path("async/", async_view),
    path("sync/", sync_view),
    path("", index),
\]

```

安装[HTTPX](https://www.python-httpx.org/)：

```
(env)$ pip install httpx

```

在服务器运行的情况下，导航到[http：// localhost：8000 / async /](http://localhost:8000/async/)。您应该立即看到响应：

```
Non-blocking HTTP request

```

在您的终端中，您应该看到：

```
INFO:     127.0.0.1:60374 - "GET /async/ HTTP/1.1" 200 OK
1
2
3
4
5
<Response \[200 OK\]>

```

在这里，HTTP响应_在_第一个睡眠调用_之前_发回。

接下来，浏览至[http：// localhost：8000 / sync /](http://localhost:8000/sync/)。得到响应大约需要五秒钟：

```
Blocking HTTP request

```

转到终端：

```
1
2
3
4
5
<Response \[200 OK\]>
INFO:     127.0.0.1:60375 - "GET /sync/ HTTP/1.1" 200 OK

```

在此，HTTP响应在循环和请求完成_后_发送`https://httpbin.org/`。

抽一些肉
----

现在，让我们编写一个在后台运行简单任务的视图。

返回项目的URLconf，在[`smoke_some_meats`](https://www.youtube.com/watch?v=SVyLlFezj2E)以下位置创建新路径：

```
\# hello_async/urls.py

from django.contrib import admin
from django.urls import path

from hello_async.views import index, async_view, sync_view, smoke\_some\_meats

urlpatterns = \[
    path("admin/", admin.site.urls),
    path("smoke\_some\_meats/", smoke\_some\_meats),
    path("async/", async_view),
    path("sync/", sync_view),
    path("", index),
\]

```

返回您的视图，创建一个名为的新异步函数`smoke`。该函数有两个参数：字符串列表`smokables`和`flavor`。这些将分别默认为可吸烟的肉和“甜宝贝雷的”的列表。

```
\# hello_async/views.py

async def smoke(smokables: List\[str\] = None, flavor: str = "Sweet Baby Ray's") -> None:
    """ Smokes some meats and applies the Sweet Baby Ray's """

    if smokables is None:
        smokables = \[
            "ribs",
            "brisket",
            "lemon chicken",
            "salmon",
            "bison sirloin",
            "sausage",
        \]

    if (loved_smokable := smokables\[0\]) == "ribs":
        loved_smokable = "meats"

    for smokable in smokables:
        print(f"Smoking some {smokable}....")
        await asyncio.sleep(1)
        print(f"Applying the {flavor}....")
        await asyncio.sleep(1)
        print(f"{smokable.capitalize()} smoked.")

    print(f"Who doesn't love smoked {loved_smokable}?")

```

如果`smokables`未提供，该函数的第一行将实例化默认的肉类列表。然后，只要第一个对象不是“肋骨” ，第二个“ if”语句就会设置一个称为`loved_smokable`第一个对象的变量`smokables,`。for循环将味道（读取：Sweet Baby Ray's）异步应用于可抽烟（读取：烟熏肉）。

不要忘记导入：

```
from typing import List

```

> `List`用于额外的键入功能。这不是必需的，可以很容易地省略（只需`: List[str]`在“ smokables”参数声明之后添加nix ）。

接下来，创建使用async `smoke`函数的异步视图：

```
\# hello_async/views.py

async def smoke\_some\_meats(request) -> HttpResponse:
    loop = asyncio.get\_event\_loop()
    smoke_args = \[\]

    if to_smoke := request.GET.get("to_smoke"):
        \# Grab smokables
        to_smoke = to_smoke.split(",")
        smoke_args += \[\[smokable.lower().strip() for smokable in to_smoke\]\]

        \# Do some string prettification
        if (smoke\_list\_len := len(to_smoke)) == 2:
            to_smoke = " and ".join(to_smoke)
        elif smoke\_list\_len > 2:
            to_smoke\[-1\] = f"and {to_smoke\[-1\]}"
            to_smoke = ", ".join(to_smoke)

    else:
        to_smoke = "meats"

    if flavor := request.GET.get("flavor"):
        smoke_args.append(flavor)

    loop.create_task(smoke(*smoke_args))

    return HttpResponse(f"Smoking some {to_smoke}....")

```

此视图采用可选的查询参数`to_smoke`和`flavor`。`to_smoke`是用逗号分隔的要吸烟物品列表，而这`flavor`是您要应用的内容。

该视图要做的第一件事（在标准同步视图中无法完成）是使用捕获事件循环`asyncio.get_event_loop()`。然后，它分析查询参数（如果适用）（并对最终的打印语句进行一些字符串清除）。如果我们不传递任何东西来吸烟，则`to_smoke`默认为“肉类”。最后，返回响应以使用户知道他们正在准备美味的烧烤餐。

大。保存文件，然后返回浏览器并导航到[http：// localhost：8000 / smoke\_some\_meats /](http://localhost:8000/smoke_some_meats/)。您应该得到以下答复：

```
Smoking some meats....

```

在控制台中，您应该看到：

```
Smoking some ribs....
INFO:     127.0.0.1:56239 - "GET /smoke\_some\_meats/ HTTP/1.1" 200 OK

Applying the Sweet Baby Ray's....
Ribs smoked.
Smoking some brisket....
Applying the Sweet Baby Ray's....
Brisket smoked.
Smoking some lemon chicken....
Applying the Sweet Baby Ray's....
Lemon chicken smoked.
Smoking some salmon....
Applying the Sweet Baby Ray's....
Salmon smoked.
Smoking some bison sirloin....
Applying the Sweet Baby Ray's....
Bison sirloin smoked.
Smoking some sausage....
Applying the Sweet Baby Ray's....
Sausage smoked.
Who doesn't love smoked meats?

```

请注意，在记录200响应之前，肋骨是如何开始吸烟的。这是工作中的异步性：当`smoke`函数最初休眠一秒钟时，视图完成处理并返回响应。最终用户将在肉类开始吸烟时看到响应。

还值得注意的是，如果您使用Django的dev服务器，则服务器将返回正确的响应，但是异步不会发生。这是控制台日志的显示方式：

```
Smoking some ribs....
\[16/Aug/2020 22:37:03\] "GET /smoke\_some\_meats/ HTTP/1.1" 200 22

```

使用Uvicorn，我们还可以使用查询参数进行测试。试试[http：// localhost：8000 / smoke\_some\_meats？to_smoke =冰淇淋，香蕉，cheese＆flavor = Gold Bond药用粉末](http://localhost:8000/smoke_some_meats?to_smoke=ice cream, bananas, cheese&flavor=Gold Bond Medicated Powder)。（空格将方便地自动转换）

浏览器：

```
Smoking some ice cream, bananas, and cheese....

```

终奌站：

```
Smoking some ice cream....
INFO:     127.0.0.1:56407 - "GET /smoke\_some\_meats/?to_smoke=ice%20cream,%20bananas,%20cheese&flavor=Gold%20Bond%20Medicated%20Powder HTTP/1.1" 200 OK
Applying the Gold Bond Medicated Powder....
Ice cream smoked.
Smoking some bananas....
Applying the Gold Bond Medicated Powder....
Bananas smoked.
Smoking some cheese....
Applying the Gold Bond Medicated Powder....
Cheese smoked.
Who doesn't love smoked ice cream?

```

烧肉
--

### 同步通话

问：_如果在异步视图中进行同步调用怎么办？_

如果从非异步视图调用非异步函数，将会发生相同的事情。

-

为了说明这一点，创造你的新助手功能_views.py_称为`oversmoke`：

```
\# hello_async/views.py

def oversmoke() -> None:
    """ If it's not dry, it must be uncooked """
    sleep(5)
    print("Who doesn't love burnt meats?")

```

非常简单：我们只是同步等待五秒钟。

创建调用此函数的视图：

```
\# hello_async/views.py

async def burn\_some\_meats(request):
    oversmoke()
    return HttpResponse(f"Burned some meats.")

```

最后，在项目的URLconf中连接路由：

```
\# hello_async/urls.py

from django.contrib import admin
from django.urls import path

from hello_async.views import index, async_view, sync_view, smoke\_some\_meats, burn\_some\_meats

urlpatterns = \[
    path("admin/", admin.site.urls),
    path("smoke\_some\_meats/", smoke\_some\_meats),
    path("burn\_some\_meats/", burn\_some\_meats),
    path("async/", async_view),
    path("sync/", sync_view),
    path("", index),
\]

```

在浏览器中的[http：// localhost：8000 / burn\_some\_meats](http://localhost:8000/burn_some_meats)处访问路由：

```
Burned some meats.

```

请注意，如何花五秒钟才能最终从浏览器获得响应。您还应该同时收到控制台输出：

```
Who doesn't love burnt meats?
INFO:     127.0.0.1:40682 - "GET /burn\_some\_meats HTTP/1.1" 200 OK

```

可能值得注意的是，无论您使用的是WSGI还是基于ASGI的服务器，都将发生相同的事情。

### 同步和异步通话

_问：如果您在异步视图中进行同步和异步调用怎么办？_

不要这样

同步视图和异步视图往往可以最佳地用于不同的目的。如果您在异步视图中具有阻止功能，那么充其量仅比使用同步视图更好。

同步到异步
-----

如果您需要在异步视图内进行同步调用（例如，通过Django ORM与数据库进行交互），请使用[sync\_to\_async](https://docs.djangoproject.com/en/3.0/topics/async/#sync-to-async)作为包装器或装饰器。

例：

```
\# hello_async/views.py

async def async\_with\_sync_view(request):
    loop = asyncio.get\_event\_loop()
    async_function = sync\_to\_async(http\_call\_sync)
    loop.create_task(async_function())
    return HttpResponse("Non-blocking HTTP request (via sync\_to\_async)")

```

将导入添加到顶部：

```
from asgiref.sync import sync\_to\_async

```

添加网址：

```
\# hello_async/urls.py

from django.contrib import admin
from django.urls import path

from hello_async.views import (
    index,
    async_view,
    sync_view,
    smoke\_some\_meats,
    burn\_some\_meats,
    async\_with\_sync_view
)

urlpatterns = \[
    path("admin/", admin.site.urls),
    path("smoke\_some\_meats/", smoke\_some\_meats),
    path("burn\_some\_meats/", burn\_some\_meats),
    path("sync\_to\_async/", async\_with\_sync_view),
    path("async/", async_view),
    path("sync/", sync_view),
    path("", index),
\]

```

在浏览器中[http：// localhost：8003 / sync\_to\_async /进行测试](http://localhost:8003/sync_to_async/)。

在您的终端中，您应该看到：

```
INFO:     127.0.0.1:61365 - "GET /sync\_to\_async/ HTTP/1.1" 200 OK
1
2
3
4
5
<Response \[200 OK\]>

```

使用`sync_to_async`，阻塞同步调用在后台线程中处理，从而允许_在_第一个睡眠调用_之前_将HTTP响应发送回去。

芹菜和异步视图
-------

_问：Celery是否仍然需要Django的异步视图？_

这取决于。

Django的异步视图提供了与任务或消息队列类似的功能，而没有复杂性。如果您正在使用（或正在考虑）Django，并且想做一些简单的事情（例如向新订户发送电子邮件或调用外部API），那么异步视图是一种快速轻松实现此目标的好方法。如果您需要执行大量，长时间运行的后台进程，则仍然需要使用Celery或RQ。

应该注意的是，为了有效地使用异步视图，您应该仅在视图中进行异步调用。另一方面，任务队列在单独的进程上使用工作程序，因此能够在多个服务器的后台运行同步调用。

顺便说一句，您绝对不必在异步视图和消息队列之间进行选择-您可以轻松地串联使用它们。例如：您可以使用异步视图发送电子邮件或对数据库进行一次性修改，但是Celery每晚在计划的时间清理数据库或生成并发送客户报告。

何时使用
----

对于未开发项目，请尽可能利用异步视图并以异步方式编写I / O流程。就是说，如果大多数视图仅需要调用数据库并在返回数据之前进行一些基本处理，那么与坚持同步视图相比，您不会看到太多的增长（如果有的话）。

对于棕地项目，如果您几乎没有I / O进程，则坚持同步视图。如果确实有许多I / O进程，请以异步方式重写它们非常容易。将同步I / O重写为异步并不容易，因此您可能要在尝试重写为异步之前优化同步I / O和视图。另外，将同步过程与异步视图混合在一起绝不是一个好主意。

在生产中，请确保使用Gunicorn来管理Uvicorn，以便同时利用（通过Uvicorn）和并行性（通过Gunicorn工人）：

```
gunicorn -w 3 -k uvicorn.workers.UvicornWorker hello_async.asgi:application

```

结论
--

总之，尽管这是一个简单的用例，但它应该使您大致了解Django的新异步视图打开的可能性。您可以在异步视图中尝试其他一些操作，例如发送电子邮件，调用第三方API以及写入文件。考虑一下代码中具有简单流程的视图，这些视图不一定需要直接向最终用户返回任何内容，而是可以将这些视图快速转换为异步视图。

有关Django新发现的异步性的更多信息，请参见这篇[出色的文章](https://wersdoerfer.de/blogs/ephes_blog/django-31-async/)，内容涉及同一主题以及多线程和测试。
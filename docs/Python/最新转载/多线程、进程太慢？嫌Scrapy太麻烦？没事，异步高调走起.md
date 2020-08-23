---
title : 进程)太慢？嫌Scrapy太麻烦？没事，异步高调走起
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-17 18:35:28 +0800
categories:
 -
tags:
 -
---
[[toc]]

  

![](https://p6-tt.byteimg.com/large/dfic-imagehandler/04ad83e4-d363-44ba-abff-f64160f66e41?from=pc)

  

## 并发与并行：(偏向于多线/进程方面的原理)


*   并发： 指在同一时刻只能有一条指令执行，但多个进程指令被快速的轮换执行，使得在宏观上具有多个进程同时执行的效果，但在微观上并不是同时执行的，只是把时间分成若干段，使多个进程快速交替的执行
*   并行： 指在同一时刻，有多条指令在多个处理器上同时执行。所以无论从微观还是从宏观来看，二者都是一起执行的

> 私信小编001即可获取大量Python学习资料！

## 阻塞与非阻塞：（偏向于协程/异步的原理）


* * *

*   阻塞：阻塞状态指程序未得到所需计算资源时被挂起的状态。程序在等待某个操作完成期间，自身无法继续处理其他的事情，则称该程序在该操作上是阻塞的。
*   非阻塞：程序在等待某操作过程中，自身不被阻塞，可以继续处理其他的事情，则称该程序在该操作上是非阻塞的  
    

## 同步与异步：


*   同步：不同程序单元为了完成某个任务，在执行过程中需靠某种通信方式以协调一致，我们称这些程序单元是同步执行的。
*   异步：为完成某个任务，不同程序单元之间过程中无需通信协调，也能完成任务的方式，不相关的程序单元之间可以是异步的。  
    

## 说了这么多，咱们列举一些他们相关的特点吧：


*   **多线程（英语：multithreading）**：指从软件或者硬件上实现多个线程并发执行的技术。具有多线程能力的计算机因有硬件支持而能够在同一时间执行多于一个线程，进而提升整体处理性能。具有这种能力的系统包括对称多处理机、多核心处理器以及芯片级多处理（Chip-level multithreading）或同时多线程（Simultaneous multithreading）处理器。在一个程序中，这些独立运行的程序片段叫作“线程”（Thread），利用它编程的概念就叫作“多线程处理（Multithreading）”
*   **多进程(Multiprocessing)**:每个正在系统上运行的程序都是一个进程。每个进程包含一到多个线程。进程也可能是整个程序或者是部分程序的动态执行。线程是一组指令的集合，或者是程序的特殊段，它可以在程序里独立执行。也可以把它理解为代码运行的上下文。所以线程基本上是轻量级的进程，它负责在单个程序里执行多任务。通常由操作系统负责多个线程的调度和执行。线程是程序中一个单一的顺序控制流程.在单个程序中同时运行多个线程完成不同的工作,称为多线程.
*   **二者的区别**:线程和进程的区别在于,子进程和父进程有不同的代码和数据空间,而多个线程则共享数据空间,每个线程有自己的执行堆栈和程序计数器为其执行上下文.多线程主要是为了节约CPU时间,发挥利用,根据具体情况而定. 线程的运行中需要使用计算机的内存资源和CPU。

> 协程(Coroutine):又称微线程、纤程，协程是一种用户态的轻量级线程。 协程看上去也是子程序，但执行过程中，在子程序内部可中断，然后转而执行别的子程序，在适当的时候再返回来接着执行。  
> 基本的原理都已经了解了 ，那咱们不整一下，咋行？光说不练假把式，走起！！！本节源码：[仓库地址]( https://github.com/Mr2753/PythonScrape/tree/master/GuaZI\_Car )首先先说一下基本的思路：确定URL发起请求，得到响应解析响应，提取数据、保存数据确定URL：本次请求的URL(先放地址了！)https://www.guazi.com/cs/buy/o2/#bread

> 根据以上可知，URL：https://www.guazi.com/{cs}/buy/o{page}/#bread ，更具改变cs改变城市，一线城市为前拼音两个字母(例如：长沙/cs 、湘潭/xiangtan)，第一页为o1,第二个为o2。以此类推

  

![](https://p6-tt.byteimg.com/large/dfic-imagehandler/243f0d0d-025b-442b-83da-a8d8d171ea22?from=pc)

  

发送请求：python

```
    async def scrape(self, url):  
        async with self.semaphore:  
            async with aiohttp.ClientSession(headers=self.header).get(url) as response:  
                await asyncio.sleep(1)  
                return await response.text()
```

注意：再次加入请求头，本网站对Cookies有严格的检测。且并不能挂IP代理访问

解析响应：

```py
    async def parse(self, html):  
        with open('car.csv', 'a+', encoding='utf-8') as f:  
            doc = pq(html)  
            for message in doc('body > div.list-wrap.js-post > ul > li > a').items():  
                # 汽车简介  
                car_name = message('h2.t').text()  
                # 汽车详情(年限、里程、服务)  
                car_info = message('div.t-i').text()  
                year = car_info[:5]  
                mileage = car_info[6:-5]  
                service = car_info[13:].replace('|', '')  
                # 价格  
                try:  
                    price = message('div.t-price > p').text()  
                except AttributeError:  
                    price = message('em.line-through').text()  
                car_pic = message('img').attr('src')  
                data = f'{car_name}, {year},{mileage}, {service}, {price}n'  
                logging.info(data)  
                f.write(data)
```

我这里是直接一步到位了，解析响应，以及保存数据。

运行之后即可看到类似于这样的东东

![](https://p3-tt.byteimg.com/large/pgc-image/b73c9f1fd1f144f6b43d5d9c68010caf?from=pc)
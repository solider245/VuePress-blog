---
title : Python 爬虫——单线程、多线程、多进程对比
description : 详细的举例，非常好的就教程
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-09 20:46:38 +0800
categories:
 -
tags:
 -
---
[[toc]]
用 python 挺久了，但并没有深入了解过多线程多进程之类的知识，最近看了许多关于多线程多进程的知识，记录简单的实现过程。

### 方案

*   爬取某网站 20 页图片，每页大概 20~30 张图片
*   该网站没有反爬措施
*   爬虫全速爬取，不设置休眠时间
*   依次爬取每页的图片链接，保存至一个列表中（对于单线程、多进程方案），保存至队列（对于多线程方案），这一步使用单线程；然后用 `urllib` 下载图片，这一步使用单线程、多线程、多进程分别爬取
*   依次使用单线程、多线程、多进程爬取相同的资源

### 共同代码

下面的代码是单线程、多线程、多进程都要用到的基本代码。

```python
import ... #省略...
folder_path3 = 'C://Users/Stone/Desktop/jiandan3/'
header = {
    ... # 省略...
}
image_links = []
def get_links(page):  # 获取图片链接
    for i in xrange(page):
        url = "https://some.net/pic/page-{}".format(str(i)) #ky 改用url = "f'https://some.net/pic/page-{str(i)}'"
        response = requests.get(url, headers=header)
        soup = BeautifulSoup(response.text, "lxml")
        links = soup.select("div.row img")
        for pic_tag in links:  # 获取图片链接
            pic_link = pic_tag.get('src')
            if pic_link.startswith("http"):
                image_links.append(pic_link)
                # myqueue.put(pic_link)
            else:
                pic_link = 'http:' + pic_link
                image_links.append(pic_link)
                #myqueue.put(pic_link)
def download_pic(url): # 下载图片
    img_name = "{}".format(os.path.basename(url))
    urllib.urlretrieve(url, folder_path3 + img_name)
    print "{} download seccessfully!".format(img_name)

```

### 单线程

单线程代码比较简单，获取完 20 页的图片链接后，用 `download_pic` 方法一个一个下载图片 ：

```python
if __name__ == '__main__':
    start_time = time.time()
    get_links(20)  # 爬取20页
    for link in image_links:
        download_pic(link)  # 下载图片
    end_time = time.time()
    print "all done!"
    print end_time - start_time

```

此段代码运行完后，统计数据如下：

| 爬取图片数量 | 耗时 |
| --- | --- |
| 571张 | 102.9秒 |

### 多进程

多进程使用的是 `multiprocessing` 包下的 `Pool`类，它会根据电脑所拥有的核心自动创建 `Pool` 类的实例，也可以手动传入参数；在 `Pool` 这个类中有 `map` 和 `map_async`两种方法，map 方法是阻塞的，也就是 map 方法之后的代码必须等待 map 方法执行完成才能继续进行，下面测试 map 方法：

```python
if __name__ == '__main__':
    start_time = time.time()
    get_links(20)
    pool = Pool()
    pool.map(download_pic, image_links)        # 同步/阻塞
    end_time = time.time()
    print "all done!"
    print end_time - start_time    # 多进程

```

`map` 方法测试结果：

| 爬取图片数量 | 耗时 |
| --- | --- |
| 571张 | 37.88秒 |

使用 `map_async` 方法爬取：

```python
if __name__ == '__main__':
    start_time = time.time()
    get_links(20)
    pool = Pool()
    pool.map_async(download_pic, image_links)  # 异步
    pool.close()    # 关闭进程连接
    pool.join()      # 等待 map_async 函数执行完成，在这阻塞
    end_time = time.time()
    print "all done!"
    print end_time - start_time

```

`map_async` 方法是异步的，这一整段代码运行到 `map_async` 方法时，不会等待这个方法完成，而是继续后面的代码逻辑，而 `map_async` 方法也在背后继续进行着；其中有个问题就是，当后面的代码运行完之后，就要停止，那么`map_async` 方法没有运行完也会被停止，所以上面的代码比 `map` 方法多了两行，`join` 方法的功能就是等待`map_async` 函数执行完成，测试结果：

| 爬取图片数量 | 耗时 |
| --- | --- |
| 571张 | 38.54秒 |

### 多线程

使用多线程需要 `threading` 包中 `Thread` 类，以及配合 `Queue` 类，多线程中，使用 `Queue` 代替 `List` ，`Queue` 有多种，`FIFO`（先进先出）、`LIFO`（后进先出）、优先级队列，在此方案中用 `FIFO` 队列，在原代码做出相应改变：

```python
myqueue = Queue()
....
if pic_link.startswith("http"):
# image_links.append(pic_link)
    myqueue.put(pic_link)
else:
    pic_link = 'http:' + pic_link
# image_links.append(pic_link)
    myqueue.put(pic_link)

```

此外，再封装一个方法：

```python
def woker():
    while not myqueue.empty():
        img_url = myqueue.get()
        download_pic(img_url)
        myqueue.task_done()

if __name__ == '__main__':
    start_time = time.time()
    get_links(20)
    for x in range(4):   # 根据电脑性能设置核心
        thread = Thread(target=woker)   # 创建线程
        thread.start()
    myqueue.join()
    print "all done!"
    print time.time() - start_time  # 多线程！

```

此段代码的作用：判断队列是否为空，不为空则将里面的 `url` 取出给 `download_pic` 下载，下载完成后，调用 `Queue` 类的 `task_done` ，告知电脑此次任务完成，结束资源占用。

`myqueue.join()` 方法和多进程中的 `pool.join()` 方法作用大致相同，防止主线程结束后杀掉子线程。

测试结果：

| 爬取图片数量 | 耗时 |
| --- | --- |
| 555张 | 32.97秒 |

### 总结

**方案结果汇总：**

| 方案 | 爬取图片数量/张 | 耗时/秒 |
| --- | --- | --- |
| 单线程 | 571 | 102.9 |
| 多进程 map | 571 | 37.88 |
| 多进程 map\_async | 571 | 38.54 |
| 多线程 | 555 | 32.97 |

1.  **多线程以 32.97 秒的时间排名第一**
2.  **多进程中的 map 和 map\_async 效率相差不远 ，位列第二**
3.  **单线程速度最慢，位列第三**

此次爬取试验中，多线程下载图片相对其他方案来说少了 16 张，具体原因还没有查过，影响较小，暂时不做处理。

在网上的讨论中，**多线程适用于网页请求以及 I/O 读写操作，多进程适用于 CPU 密集型操作**，由于作者水平有限，还没有对线程、进程、全局解释器锁（GIL）等知识进行深入了解，下一次，有机会在做深入学习。
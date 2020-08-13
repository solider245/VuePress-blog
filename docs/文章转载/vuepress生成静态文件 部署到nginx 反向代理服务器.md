---
title : vuepress生成静态文件 部署到nginx 反向代理服务器
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-14 04:42:30 +0800
categories:
 -
tags:
 -
---
[[toc]]

最近想写个博客，因为一直对vue情有独钟就想看看有没有什么开源的博客工具。

搜索一番发现了vuepress，然后才发现原来很多开源的vue组件或者工具的文档都是用这个来写的。。。

[最终效果](https://link.zhihu.com/?target=http%3A//m.apex-asst.top/doc/)

[http://m.apex\-asst.top/doc/](https://link.zhihu.com/?target=http%3A//m.apex-asst.top/doc/)

但是发现由于这个极其适合部署在github pages上就没人写怎么部署在nginx上，稍微踩了一点坑总结一下。官方部署的[文档链接](https://link.zhihu.com/?target=https%3A//vuepress.vuejs.org/zh/guide/deploy.html)

## 基本配置

主要关注[配置](https://link.zhihu.com/?target=https%3A//vuepress.vuejs.org/zh/config/)中的

## base

> 类型: string
> 默认值: /
> 部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 Github pages，如果你想将你的网站部署到 [https://foo.github.io/bar/](https://link.zhihu.com/?target=https%3A//foo.github.io/bar/)，那么 base 应该被设置成 "/bar/"，它的值应当总是以斜杠开始，并以斜杠结束。
> base 将会自动地作为前缀插入到所有以 / 开始的其他选项的链接中，所以你只需要指定一次。

这个配置是最基本的路由的配置，vuepress同vue其他项目一样都是单页应用，通过配置这个来解决基础路由的问题。我遇到的问题也就是在nginx上如何配置这个路由。

## nginx上配置

## base配置为"/"

相应的nginx配置十分简单，直接指定端口如下面示例的8081，并指定root路径（即build后放在服务器的路径）。

```shell
server {
        listen 8081;
        location / {
                root /root/product/doc/dist;
                try_files $uri $uri/ /index.html;
                index index.html index.htm;
            }
    }
```

## base配置为"/doc"

比如本站，配置的为/doc，配置也很简单，只需要上面的location由/改为/doc/，注意最后一个斜杠

## 同时部署了两个vue服务

如本站"/"这个目录是有一个vue服务的，现在又想在同样的端口配置vuepress并且路径是/doc应该怎么办呢

下面是nginx的配置

```shell
server {
        listen 80;
        server_name apex-asst;

        client_max_body_size 20m;
        charset utf-8;

        #root /root/product;

        location / {
        root /root/product/dist;
            try_files $uri $uri/ /index.html;
        index index.html;
        }

        location @rewrites {
            rewrite ^(.+)$ /index.html last;
        }

#配置了转发
        location /doc/ {
            proxy_pass http://localhost:8081/;
        }

    }
#在8081上起了vuepress
    server {
        listen 8081;
        location / {
                root /root/product/doc/dist;
                try_files $uri $uri/ /index.html;
                index index.html index.htm;
            }
    }
```

发布于 2019\-03\-08
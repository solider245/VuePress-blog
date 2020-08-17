---
title : Go 技巧分享：Go 国内加速镜像
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-17 08:02:36 +0800
categories:
 -
tags:
 -
---
[[toc]]
[](javascript:void(0);)

*   说明

*   设置代理

*   类 Unix

*   Windows

*   测试一下

*   私有模块

说明[#](#)
--------

众所周知，国内网络访问国外资源经常会出现不稳定的情况。 Go 生态系统中有着许多中国 Gopher 们无法获取的模块，比如最著名的 `golang.org/x/...`。并且在中国大陆从 GitHub 获取模块的速度也有点慢。

因此设置 CDN 加速代理就很有必要了，以下是几个速度不错的提供者：

*   七牛：[Goproxy 中国 https://goproxy.cn](https://goproxy.cn/)
*   阿里： [mirrors.aliyun.com/goproxy/](https://mirrors.aliyun.com/goproxy/)
*   官方： < 全球 CDN 加速 [https://goproxy.io/>](https://goproxy.io/)
*   其他：[jfrog 维护 https://gocenter.io](https://gocenter.io/)

设置代理[#](#)
----------

### 类 Unix[#](#)

在 Linux 或 macOS 上面，需要运行下面命令（或者，可以把以下命令写到 `.bashrc` 或 `.bash_profile` 文件中）：

    # 启用 Go Modules 功能
    go env -w GO111MODULE=on
    
    # 配置 GOPROXY 环境变量，以下三选一
    
    # 1. 七牛 CDN
    go env -w  GOPROXY=https://goproxy.cn,direct
    
    # 2. 阿里云
    go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
    
    # 3. 官方
    go env -w  GOPROXY=https://goproxy.io,direct
    

确认一下：

    $ go env | grep GOPROXY
    GOPROXY="https://goproxy.cn"

Windows[#](#)
-------------

在 Windows 上，需要运行下面命令：

    # 启用 Go Modules 功能
    $env:GO111MODULE="on"
    
    # 配置 GOPROXY 环境变量，以下三选一
    
    # 1. 七牛 CDN
    $env:GOPROXY="https://goproxy.cn,direct"
    
    # 2. 阿里云
    $env:GOPROXY="https://mirrors.aliyun.com/goproxy/,direct"
    
    # 3. 官方
    $env:GOPROXY="https://goproxy.io,direct"

测试一下[#](#)
----------

    $ time go get golang.org/x/tour



[![Go 国内加速镜像](https://cdn.learnku.com/uploads/images/201912/15/1/opNZp4DoBu.png!large)

(https://cdn.learnku.com/uploads/images/201912/15/1/opNZp4DoBu.png!large)

> 本地如果有模块缓存，可以使用命令清空 `go clean --modcache` 。

私有模块[#](#)
----------

如果你使用的 Go 版本 >=1.13, 你可以通过设置 GOPRIVATE 环境变量来控制哪些私有仓库和依赖 (公司内部仓库) 不通过 proxy 来拉取，直接走本地，设置如下：

    # Go version >= 1.13
    go env -w GOPROXY=https://goproxy.cn,direct
    # 设置不走 proxy 的私有仓库，多个用逗号相隔
    go env -w GOPRIVATE=*.corp.example.com


## 阿里云go代理仓库
#### 简介

go module公共代理仓库，代理并缓存go模块。你可以利用该代理来避免DNS污染导致的模块拉取缓慢或失败的问题，加速你的构建

#### 地址

https://mirrors.aliyun.com/goproxy/

#### 使用帮助

1.使用go1.11以上版本并开启go module机制

2.导出GOPROXY环境变量

export GOPROXY=https://mirrors.aliyun.com/goproxy/
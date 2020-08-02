---
title : WSL2利用docker走代理的两种方式
description : 看上去好像能用
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-02 21:56:56 +0800
categories:
 -
tags:
 - docker
 - wsl2
---
[[toc]]
[@solider245](https://github.com/solider245) 分两种情况

① HTTP 访问 git，命令行：
`git config --global http.https://github.com.proxy http://host.docker.internal:1080`

② SSH 访问 git，编辑 `~/.ssh/config` 文件：

```shell
## 你可能需要安装 connect-proxy

# 我在 GitHub
Host github.com
  Hostname github.com
  ProxyCommand connect -H host.docker.internal:1080  %h %p
  User git
  # 认证方式，这里用的是 SSH 密钥
  PreferredAuthentications publickey
  # SSH 私钥文件
  IdentityFile ~/.ssh/my_github_ed25519
```
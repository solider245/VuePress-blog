---
titile: Git Pull强制覆盖本地文件
description: 本地仓库混乱或者需要强制更新本地文件时使用
---

## Git Pull强制覆盖本地文件
>简介： 在有些场景下为了避免代码冲突，需要强制使用远程代码覆盖本地代码，比如自动部署，GitHub的webhook 解决方法 

```shell
git fetch --all 
git reset --hard origin/master 
git pull 
```
## 有些时候也可以删掉本地仓库然后重新从远程仓库获取

```shell
sudo rm -rf xxx文件夹
git clone url
```

## 参考文献

[Git Pull强制覆盖本地文件](https://developer.aliyun.com/article/634487)
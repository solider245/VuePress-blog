---
title: yarn 国内加速，修改镜像源

---
### 为什么慢[#](#026267)

执行 yarn 各种命令的时候，默认是去 npm/yarn 官方镜像源获取需要安装的具体软件信息

以下命令查看当前使用的镜像源

```shell
yarn config get registry
```

> 默认源地址在国外，从国内访问的速度肯定比较慢

### 如何修改镜像源[#](#05bc7c)

阿里旗下维护着一个完整的 npm 镜像源 [registry.npm.taobao.org/](https://registry.npm.taobao.org/) 同样适用于 yarn

#### 1\. 临时修改[#](#6ed3f5)

```shell
yarn save 软件名 --registry https://registry.npm.taobao.org/
```

#### 2\. 全局修改[#](#57bcfd)

```shell
yarn config set registry https://registry.npm.taobao.org/
```

#### 3\. 使用第三方软件快速修改、切换 yarn 镜像源[#](#3c31d0)

[yrm](https://github.com/i5ting/yrm "yrm") YARN registry manager
yrm 不仅可以快速切换镜像源，还可以测试自己网络访问不同源的速度

##### 安装 yrm[#](#f53d8b)

```shell
npm install -g yrm
```

##### 列出当前可用的所有镜像源[#](#0a2d5b)

```shell
yrm ls

    npm -----  https://registry.npmjs.org/
    cnpm ----  http://r.cnpmjs.org/
    taobao --  https://registry.npm.taobao.org/
    nj ------  https://registry.nodejitsu.com/
    rednpm -- http://registry.mirror.cqupt.edu.cn
    skimdb -- https://skimdb.npmjs.com/registry
    yarn ----  https://registry.yarnpkg.com
```

##### 使用淘宝镜像源[#](#0053ba)

```shell
yrm use taobao
```

##### 测试访问速度[#](#8e2da6)

```shell
yrm test taobao
```

更多用法查看 [yrm](https://github.com/i5ting/yrm "yrm") GitHub

[yarn 国内加速，修改镜像源 | Laravel China 社区](https://learnku.com/articles/15976/yarn-accelerate-and-modify-mirror-source-in-china)
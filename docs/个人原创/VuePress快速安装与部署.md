---
tittle: VuePress的安装与部署
tags : 
  - Vue
  - VuePress
date : 2020-07-26
description : 新手手把手部署VuePress的心得
---

# VuePress的博客安装与部署

> * 比下限，VuePress和其他博客框架相比高不了多少；
> * 比上限，VuePress比其他博客框架直接就高了一个段位。

**这就是使用`VuePress`的理由！**

## VuePress的安装

### 前提条件

1. VuePress 需要 Node.js >= 8.6
2. 国内用户需要设置NPM的源为淘宝，否则下载速度非常慢
3. VuePress 推荐使用yarn而不是npm。

### 六步安装安装步骤

1. 创建并进入一个新的目录  
    ```shell
    mkdir blog-vue && cd $_
    ```
  > 创建一个目录并且切换到该目录 
2. 使用包管理器进行初始化
    ```shell
    yarn init # npm init
    ```
    >目录初始化的时候，会要求你输入一些信息，如果你看不懂的话可以直接全部回车键默认即可。
    >这里会生成一个`package.json`文件。

    ![20200727183035_2024aa3666eb1867741d5a640b1445eb.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200727183035_2024aa3666eb1867741d5a640b1445eb.png)
    >内容就是在初始化输入的内容或者默认的内容，如上图所示
3. 将 VuePress 安装为本地依赖
    ```shell
    yarn add -D vuepress # npm install -D vuepress
    ```
    > 安装完成后输入`vuepress --version`来确定安装完成


::: warning 
    * 本地依赖可以更好的避免出现权限问题
    * 使用yarn而不是NPM这样可以避免出现webpack依赖问题
    * 除非你能很好的解决各种问题，否则建议按推荐的方式来
:::
4. 创建你的第一篇文档
    ```shell
    mkdir docs && echo '# Hello VuePress' > docs/README.md
    ```
    >docs 就是你的站点目录，创建的README.md就是你的主页

5. 在 `package.json` 中添加一些 `scripts`
```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
  ![20200727184055_051afcee246c52d836d38c70616a7891.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200727184055_051afcee246c52d836d38c70616a7891.png)

如上图所示

:::danger
  >一定要给前面的字段增加一个逗号，否则会出现语法报错
  >脚本是让你的命令更加简洁，建议按照教程来做
:::  

6. 在本地启动服务器
```shell
yarn docs:dev # npm run docs:dev
```

![20200727184410_4c69feb3872e9f5f4d42bdd7e64c7840.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200727184410_4c69feb3872e9f5f4d42bdd7e64c7840.png)

>    * 如上图所示，部署完成后，系统会提示你当前网站部署的服务器地址和端口。默认是8080，我这里   因   经使用过了，所以系统自动推到了8083.
>    * 如果你使用的是远程服务器，那么前面的localhost要修改为你的远程服务器地址
>    * 如果你的远程服务器防火墙没开放端口，那也要去手动打开，否则会出现无法出现的情况。

* 打开浏览器查看网站

![20200727184827_fee53f58acea5195ca84c48673355602.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200727184827_fee53f58acea5195ca84c48673355602.png)

> 如上图所示，看到以上界面，就表示你已经成功部署了。接下来就是对网站进行初步的优化。

## VuePress的优化

> 网站虽然已经完成了部署，但是那个页面就像素颜的妹子一样，完全无法看，因此让我们来给网站做一些优化，使得

### 常见优化项目汇总

* 首页
  * 文件存放在/docs/README.md
* 所有VuePress的配置
  * 文件存放在/docs/.vuepress/config.js
  * 常见参数有以下几个
    * title:`网站标题` // 
    * description:`网站描述`
    * plugins:[] //应用到的插件
    * markdown:{}//markdown设置
    * theme:'主题名称' //不写就是默认主题
    * themeConfig:{}// 主题设置
      * nav:{} //导航栏
      * logo:'/路径' // 导航栏logo
      * sidebar:[] //侧边栏
      * search:false //默认搜索框，默认开启
      * searchMaxSuggestions: 10 //搜索结果数量，数字10可以改
      * lastUpdated: 'Last Updated', // 最后更新时间
      * Git仓库和编辑链接（这里比较多，后面可以单独配置）

看起来确实比较多，但是并不是每一项都要立刻配置好，我们刚开始的话只需要把一些必要的配置整理好就行。
他们主要是首页，网站标题和网站描述。

接下来就让我们来一一优化。

#### 首页优化

打开/docs/README.md，将以下内容复制进去。

```yaml
---
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

然后查看你的服务器首页，看看是否有变化，如果有，则表示成立。

![20200727225951_bcb9634a95428dc131aed7769c75053c.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200727225951_bcb9634a95428dc131aed7769c75053c.png)
如上图所示，我这里没有显示图片，因为我放图片的路径并没有放图片，所以就显示出错了。
这里你可以考虑放一张支持外链的图片，他一样是可以显示的。
其他的内容都可以修改，以后你可以慢慢去优化。

#### .vuepress的文件配置

切换到docs目录，然后：
```shell
mkdir .vuepress && cd $_&&touch config.js
# 上面命令的意思是新建一个.vuepress目录，然后切换到该目录，然后创建一个config.js文件。
```
创建成功后，我们将以下内容复制到config.js中。
```js
module.exports = {
    title: '吴起的个人网站',
    description:'吴起的个人网站，专攻vue,python,linux,PowerBI'
}
```
然后去你的首页查看下内容的更新。标题和描述可以换成你喜欢的内容。如果发现首页有变化，则表明成功了。

#### 新建blog目录并创建文件

我们首页现在点进去后是一个404页面，这是因为我们没有设置正确的路径并且给与正确的页面文件，所以他就404了。接下来我们来操作一下。

首先让我们回到docs目录。
```shell
mkdir about && $_ && echo "# 我的博客页面">README.md
# 命令是创建并切换到blog目录，然后将我的博客页面内容填充到README.md文件
```
还记得我们的首页设置文件在哪里吗？想一想？如果想不到的话，他在docs目录下的README.md文件。
在README.md文件，我们需要把修改为`/about/`。
![20200727232811_94ae05337634e683dea1a4b6dac7e40d.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200727232811_94ae05337634e683dea1a4b6dac7e40d.png)
如上图所示。这样修改之后，因为新创建了文件夹和文件，所以服务器需要重新生成路由页面。
```shell
yarn docs:dev 
# 如果新建页面失败的话，使用yarn docs:build来新建页面再部署
```
![20200728005959_604847d924f91a3efd4d1979cedcff7d.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200728005959_604847d924f91a3efd4d1979cedcff7d.png)

如上图所示点进去后的界面如果和我一样，那就说明你对了。

>通过上面详情页的创建，你应该对VuePress的路由有一个概念。
简单来说，当你创建一个README.md的文件时，VuePress会将其生成一个对应目录下的额index.html文件来展示。

接下来，我们轻车熟路的来创建一个blog目录，然后在blog目录下创建3个md文件。
![20200728010407_362a36810c0ba50ff9c3e65e8fd38c01.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200728010407_362a36810c0ba50ff9c3e65e8fd38c01.png)
如果你是按照我的教程来做的话，那么你当前的文件夹目录树应该是和上面这张图一样。
是不是感觉不太对，好像少了什么？对的，我们查看所有文件的目录树是这样的。
![20200728010550_109ecd44273b5f76028314e9d131ba3b.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200728010550_109ecd44273b5f76028314e9d131ba3b.png)
dist是生成的对应的前端文件目录。他们和你的docs目录是有一定的一一对应关系的。

接下来，让我们重新生成文件并重新在本地部署。
```shell
yarn docs:build && yarn docs:dev
```
打开浏览器，在地址栏输入你的地址，你是可以打开对应的文件的。
```html
localhost:8082/blog/01.html # 你的端口可能是8080
```
![20200728011021_d7e4b3196604e05ca6ef3582f645f171.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200728011021_d7e4b3196604e05ca6ef3582f645f171.png)

如上。能够看到文件说明你现在做的都是对的，如果不对的话，可以根据报错来排错。

我们平时上网的话，这种直接输入路径来查看文章的方式肯定是不方便也不可取的。
所以我们要建立导航栏和侧边栏来方便我们查找文章。
有两种方式：
* 一种是自定义方式
* 一种是插件方式
* 还有一种是高级自定义方式

自定义方式官方有教学，高级自定义方式相信在看教程的你估计也不会，所以这里我们就统一用插件的方式来简化操作。

#### 引入导航栏、侧边栏插件。

##### 安装插件
   ```shell
   yarn add vuepress-plugin-auto-sidebar -D # npm i vuepress-plugin-auto-sidebar -D
   ```
>这里推荐使用yarn安装

##### 使用插件
先在config.js文件配置插件，因为我们需要生成导航文件，所以要提前生成一下。

```json
   // **/.vuepress/config.js
module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      nav:true
    }
  }
}
```
上面是局部引入的代码，当然，和其他参数混合在一起的话，大概是这个样子的。
![20200728030109_b6b6b00f85736348057ffe17c1f655c4.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200728030109_b6b6b00f85736348057ffe17c1f655c4.png)

配置完成后执行 
```shell
yarn docs:build #npm run docs:dev
```
即可看到 `.vuepress` 目录下新增了` nav.js` 文件。
接下来，我们在主要配置中引入引入导航栏文件

```json
const nav = require("./nav.js"); // 引入刚刚生成的文件

module.exports = {
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      nav: true
    }
  },
  themeConfig: {
    nav // ES6 简写
  },
}
```
局部格式如上。
这个插件每次重构的时候并不会生成新的nav.js导航文件，所以如果你新增加了目录的话，最好删除掉nav.js，这样的话才会自动生成导航目录。
重新执行本地部署命令之后,打开浏览器，你就可以看到右上角新生成的导航栏以及页面左边生成的侧边栏了。

![20200728032614_e8279734f00edd282ff0c46705c9646f.png](https://images-1255533533.cos.ap-shanghai.myqcloud.com/20200728032614_e8279734f00edd282ff0c46705c9646f.png)

看到这里，基本上博客的整体框架已经搭建完成了。

## VuePress的部署
主要有以下两个地方：
* 部署到GitHubpage
* 部署到netlify

### 部署到netlify

首先找到[netlify](https://www.netlify.com/)官网。
1.  在 Netlify 中, 创建一个新的 GitHub 项目，使用以下设置：

*   **Build Command:** `yarn docs:build` 或者 `npm run docs:build`
*   **Publish directory:** `docs/.vuepress/dist`

2.  点击 deploy 按钮！

>**注意**你的GitHub地址是是的你项目地址，而不是你生成GitHub.io的网站地址。
如果是初学者的话，很容易在这里出错。

### 部署到GitHubpage

1.  在 `docs/.vuepress/config.js` 中设置正确的 `base`。

    如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

    如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

2.  在你的项目中，创建一个如下的 `deploy.sh` 文件（请自行判断去掉高亮行的注释）:

```shell
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
git push -f git@github.com:solider245/solider245.github.io.git master
# 这是我的例子，你可以继续按照格式改成你自己的仓库。
# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -

```
官网说的很清楚，这里我补充一下。
1. 这个脚本是将生成的dist文件夹下的内容推送到github.io地址，如果是和你同名的仓库的话，那就直接部署了。你去仓库直接打开地址就可以看到
2. 如果是推送到你的第二个仓库的话，如果没显示你的网站，那你需要在仓库设置里，调整成为你的gh-pages分支

## 总结

基本上VuePress入门的话就是这样了。主要就是安装与部属。
你看上去很简单，熟门熟路的话可能5-10分钟就可以部署一个网站。可是你如果对很多知识没有足够的了解的话，会踩到非常多的坑。
VuePress有点像很多功夫的集成。你每样都会的话，那这个博客就太强大了。
但凡你哪块知识有不足，就很容易踩坑。
后面再写一篇VuePress的优化。
千万不要贪多集中到一起整，吃亏的是自己。
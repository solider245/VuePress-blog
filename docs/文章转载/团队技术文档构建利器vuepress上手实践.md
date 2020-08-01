---
title : 团队技术文档构建利器vuepress上手实践
description : 非常详细
author : 中箭的吴起
image : 
date : 2020-08-02 00:04:27 +0800
categories:
 - Blog
tags:
 - VuePress
---
团队技术文档构建利器vuepress上手实践
======================

toc

> Write By CS逍遥剑仙 我的主页: [www.csxiaoyao.com](http://www.csxiaoyao.com) GitHub: [github.com/csxiaoyaojianxian](https://github.com/csxiaoyaojianxian) Email: sunjianfeng@csxiaoyao.com

最近在尝试一些项目技术文档搭建的工具，看到网上很多人推荐 `gitbook`，使用后总体感觉良好。无意中发现一款 Vue 驱动的静态站点生成工具 `vuepress`，看到官网和demo后立即被它的简约灵活所吸引。一个 `vuepress` 网站是一个由 `Vue`、`Vue Router` 和 `Webpack` 驱动的单页应用。在构建时，创建一个服务端渲染（SSR）的版本，然后通过虚拟访问每一条路径来渲染对应的HTML。

本文做一个上手实践总结。如果正有搭建技术文档的需求，而且熟悉 `vue` 生态，相信我，选择 `vuepress` 一定不会后悔。官方文档地址：[https://vuepress.vuejs.org](https://vuepress.vuejs.org/)，`vue` 生态一大优势在于中文文档，`vuepress` 也不例外，中文文档一样靠谱：[https://www.vuepress.cn](https://www.vuepress.cn)，官方文档十分详细，本文也不再过多搬运，主要讲下自己的实践。

1. 环境搭建
--------

跟随 `vuepress` 文档操作一遍，非常顺畅，轻轻松松搭好。

# 全局安装
> yarn global add vuepress
# 创建一个 markdown 文件，仅包含一个标题
> echo '# Hello VuePress' > README.md

编写文档，类似 `webpack` 中的 `devServer`，在本地启动一个服务器，浏览器访问 `localhost:8080` 进行访问。

# 开始编写文档
> vuepress dev

编写完文档需要打包构建后才能部署，文件在 `./vuepress/dist` 目录下，可以通过配置 `.vuepress/config.js` 中的 `dest` 字段修改。

# 构建
vuepress build

如果是已经有项目，只是想在该项目中管理文档，则应该将 `vuepress` 安装为本地依赖，具体可以参考官方文档。

2. 目录结构
--------

项目创建完后，最简的目录结构如下：
```
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
└─ package.json
```
官方推荐的完整目录结构如下：
```
├── docs
│   ├── .vuepress (可选的) 用于存放全局的配置、组件、静态资源等
│   │   ├── components (可选的) Vue组件将会被自动注册为全局组件
│   │   ├── theme (可选的) 用于存放本地主题
│   │   │   └── Layout.vue
│   │   ├── public (可选的) 静态资源目录
│   │   ├── styles (可选的) 用户存放样式相关文件
│   │   │   ├── index.styl 将会被自动应用的全局样式文件，会生成在最终的css文件结尾，具有比默认样更高级的优先级
│   │   │   └── palette.styl 用于重写默认样式常量，或者设置新的stylus颜色常量
│   │   ├── templates (可选的, 谨慎配置) 存储HTML模板文件
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的) 配置文件的入口文件
│   │   └── enhanceApp.js (可选的) 客户端应用的增强
│   │
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│
└── package.json
```
其中，`docs` 是项目根目录，名称可以自定义，`.vuepress/config.js` 是使用频率最高的配置文件，一般来说，实际的文档文件会放在根目录下，通过路由获取。

3. 参数配置
--------

`vuepress` 提供了两类配置：

*   配置文件，如 `.vuepress/config.js`，需要导出一个js对象，一般用于进行全局配置
*   `YAML front matter`，配置在 `md` 文件头部，其后的内容才作为文档内容被渲染，一般用于针对当前文档的配置

### 3.1 主题配置

新建完后用户默认看到的页面是非常简陋的，只有一个包含搜索框的 `head`，`vuepress` 的强大之处在于可以灵活地进行主题配置，完成配置后一个丰富的技术文档页就构建好了，下面罗列常用的配置项及其功能，具体配置内容参考官方文档。

#### 3.1.1 主页(homepage)

默认主题提供了一个首页（Homepage）布局，用于网站的主页 `docs/README.md`，使用 `YAML front matter` 配置。

#### 3.1.2 导航栏(navbar)

`themeConfig.nav` 导航栏包括 `左侧页面标题`、`搜索框`、`导航栏链接`、`多语言支持`、`仓库链接`，支持下拉分组菜单，还支持在全局或单页面中禁用。

#### 3.1.3 侧边栏(sidebar)

`themeConfig.sidebar` 侧边栏一般用于文档的目录索引，可以直接在 `config.js` 中配置链接数组，也在页面中配置 `sidebar:auto` 自动生成侧边栏目录，但是自动生成只能生成当前页。侧边栏还支持以下更加细节的设置：

*   设置嵌套层数
*   是否展开所有
*   标题链接是否激活(禁用可以懒加载提升性能)
*   分组
*   侧边栏分页面定制
*   禁用

#### 3.1.4 搜索框(search box)

`themeConfig.search` 支持禁用、修改搜索提示数量、启用 `Algolia Search`。

#### 3.1.5 最近更新

`themeConfig.lastUpdated` 选项允许获取每个文件的最后一次 git 提交的 UNIX 时间戳（ms），并以合适的格式显示在每个页面的底部。

#### 3.1.6 Service Worker

`themeConfig.serviceWorker` 选项允许进行 service worker 相关的配置。

#### 3.1.7 上一页 / 下一页链接(prev / next links)

可以在每个页面设置上下页链接。

#### 3.1.8 Git 仓库和编辑链接

`themeConfig.repo` 会在导航中生成 github 链接。

### 3.2 样式编辑

#### 3.2.1 默认样式覆盖

如果希望修改默认样式，可以创建两个文件 `.vuepress/styles/index.styl`、 `.vuepress/styles/palette.styl`，`index.styl` 作为全局样式文件生成在最终的css文件结尾，具有比默认样式更高的优先级，`palette.styl` 用于重写默认样式常量，或者设置新的 `stylus` 颜色常量，如：

$accentColor = #3eaf7c
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34

#### 3.2.2 自定义页面类

若需要为特定页面添加一个 CSS 类名，可以在该页面的 `YAML front matter` 中声明一个 `pageClass`：

---
pageClass: custom-page-class
---

`index.styl` 中可以使用对应的类名：

.theme-container.custom-page-class {
  /\* 页面特定的规则 \*/
}

4. markdown 扩展操作
-----------------

### 4.1 Emoji

:tada: :100:

### 4.2 目录

\[\[toc\]\]

### 4.3 自定义容器

::: tip 注意：
This is a tip
:::

::: warning
This is a warning
:::

::: danger STOP
This is a dangerous warning
:::

### 4.4 在代码块中高亮显示行

``` js{4}

export default {

data () {

return {

  msg: 'Highlighted!'

}

}

}
```
### 4.5 导入代码片段

<<< @/public/test.js{2}

5\. 在 Markdown 中使用 Vue
----------------------

`.vuepress/components` 中的所有 `*.vue` 文件都会自动注册为全局异步组件，如：

.
└─ .vuepress
   └─ components
      ├─ demo.vue
      └─ Foo
         └─ Bar.vue

可以直接在所有 markdown 文件中使用这些组件。

<demo/>
<Foo-Bar/>

6\. 自定义主题
---------

创建 `.vuepress/theme` 目录和 `Layout.vue` 文件，详见文档。

7\. GitHub Pages 部署
-------------------

发布 `GitHub Pages` 需要在 `.vuepress/config.js` 中设置正确的 `base`。例如发布到 `https://<USERNAME>.github.io/`，`base` 默认即是`"/"`，如果打算发布到 `https://<USERNAME>.github.io/<REPO>/`（即仓库在 `https://github.com/<USERNAME>/<REPO>`），需要设置 `base` 为 `"/<REPO>/"`。
```
module.exports = {
  base: '/test/'
}
```
可以在项目中创建 `deploy.sh` 文件，方便在持续集成的设置中在每次 push 代码时自动运行脚本。
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

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```
设置package.json
```shell
{
  "script":{
    "deploy": "bash deploy.sh",
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}

运行脚本推送更新到 `github` 上

\> npm run deploy
```
8\. 附录：config.js 详细配置 demo
--------------------------
```shell
module.exports = {
    base: '/', // 用于部署时的子路径
    title: 'csxiaoyao.com', // 网站的标题
    description: 'luban document, created by victorsun', // 网站描述，HTML中表现为一个 <meta> 标签
    head: \[ // head 中额外标签
        // \['link', { rel: 'icon', href: '/logo.png' }\]
    \],
    host: '0.0.0.0', // dev 服务器的主机
    port: 2048, // dev 服务器的端口
    dest: './dist', // 指定 vuepress build 的输出目录
    evergreen: false, // 忽略浏览器兼容性
    markdown: {
        lineNumbers: true, // 代码块的左侧显示行号
        externalLinks: { target: '\_blank', rel: 'noopener noreferrer' }, // 键和值对将被添加到指向外部链接的 <a> 标签，默认选项将在新窗口中打开外部链接
        anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '#' }, // 锚点配置
        toc: { includeLevel: \[1, 2, 3\] }, // \[\[toc\]\]目录
        config: md => { // 插件
            // md.set({ breaks: true })
            // md.use(require('markdown-it-xxx'))
        }
    },
    themeConfig: {
        nav: \[ // 导航栏
            {
                text: '主页',
                link: '/'
            }, {
                text: '菜单',
                items: \[{
                    text: '普通菜单',
                    link: '/'
                }, {
                    text: '分组菜单',
                    items: \[{
                        text: 'test1',
                        link: '/test1'
                    }, {
                        text: 'test2',
                        link: '/test2'
                    }\]
                }\]
            }, {
                text: '访问主页',
                link: 'http://www.csxiaoyao.com'
            }
        \],
        // 侧边栏
        sidebar: \[
            '/test1',
            \['/test1', '链接到test1'\],
            {
                title: '链接到test2',
                collapsable: false,
                children: \[
                    '/test1',
                    '/test2',
                \]
            }
        \],
        // 展开所有标题层级
        displayAllHeaders: false,
        // 激活标题链接
        activeHeaderLinks: true, // false 可以提高性能
        // 搜索
        search: true,
        searchMaxSuggestions: 10,
        // 更新时间戳 git
        lastUpdated: 'Last Updated', // string | boolean
        // serviceWorker
        serviceWorker: {
            updatePopup: true, // 弹窗提示更新 Boolean | Object, 默认值是 undefined
            // 如果设置为 true, 默认的文本配置将是: 
            updatePopup: { 
               message: "有内容更新", 
               buttonText: "更新" 
            }
        },
        // 假定 GitHub，也可以是一个完整的 GitLab URL
        repo: 'csxiaoyaojianxian/JavaScriptStudy',
        // 自定义项目仓库链接文字，默认根据 \`themeConfig.repo\` 中的 URL 来自动匹配是 "GitHub"/"GitLab"/"Bitbucket" 中的哪个，如果不设置时是 "Source"
        repoLabel: '访问仓库',
        // 以下为可选的 "Edit this page" 链接选项，如果你的文档和项目位于不同仓库：
        docsRepo: 'vuejs/vuepress',
        // 如果你的文档不在仓库的根目录下：
        docsDir: 'docs',
        // 如果你的文档在某个特定的分支（默认是 'master' 分支）：
        docsBranch: 'master',
        // 默认为 false，设置为 true 来启用
        editLinks: true,
        // 自定义编辑链接的文本。默认是 "Edit this page"
        editLinkText: '修改此页'
    }
}
```

![](https://ask.qcloudimg.com/http-save/1065788/6dl86j2bvf.jpeg?imageView2/2/w/1620)
---
title: VuePress常见优化
description: 帮助大家搞清楚优化的项目以及细节
---

## 常见优化项目

```js
const pluginConf = require()
module.exports ={
    theme:'',//使用的主题名字，默认为blog
    plugins:pluginConf,//使用的插件
    markdown:markdownCon
}
```
## 启用PW插件的方法

### 插件安装
```
yarn add -D @vuepress/plugin-pwa
```

## 常见问题

### 插件使用babel还是对象式？

因为使用对象式不能引用默认插件，所以一般都推荐使用babel式.

#### babel和对象式的区别。

babel是数组
```js
module.exports = [
    "xx插件",{参数:参数值},
    "xx插件",{参数:参数值},
    "zz插件",{},
    "dd插件",false //禁用插件
]
```
对象式
```js
module.exports = {
    "xx插件":{},
    "xx插件":{},
    "zz插件":{},
    "dd插件":false //禁用dd插件
}
```
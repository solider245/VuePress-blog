---
title: VuePress插件应该使用babel式还是对象式？
description: 这个问题很多人会搞混
---


## babel和对象式的区别。

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
babel可以使用默认插件，而对象式不能使用。
所以新手推荐babel式，后期要大规模使用或者自己有好的优化方法可以使用对象式。
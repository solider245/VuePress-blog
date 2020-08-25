---
title : Vue.js教程-Vue基本指令
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-25 10:32:36 +0800
categories:
 -
tags:
 -
---
[[toc]]


Vue.js教程-Vue基本指令
----------------

前言
--

*   本文仅介绍基本常用指令(不包括自定义指令和相应的修饰符，这两个以后再写)。
*   再附上官方API文档，大家也可以去看官方解释，更全面更具体。[VueAPI](https://link.zhihu.com/?target=https%3A//cn.vuejs.org/v2/api/%23v-once)
*   本文所有指令写在views文件夹下的Home.vue文件中，自己学习的时候直接在App.vue中引入一下该文件就行了，不用配置路由。

![](https://pic2.zhimg.com/v2-41ca927dbbf02a6cd2516c8014085f8a_b.jpg)

Vue指令
-----

插值表达式
-----

*   在data中定义字符串或对象，在html语句中使用`{{}}`双花括号方式获取data里的字符串或者对象。
*   字符串：

![](https://pic2.zhimg.com/v2-596a43e88c31b362ce25a364b3299fc6_b.jpg)

*   对象：
*   在这里分为两种情况：

*   第一种是直接取出对象。
*   第二种是取出对象的相应字段，也就是字符串或者数字呗。

*   直接取出对象：

![](https://pic3.zhimg.com/v2-30ecbb267a7b3af4c1b143964edb0fe7_b.jpg)

*   取出对应字段：

![](https://pic3.zhimg.com/v2-4695895c4f0ede5d9e4916d2151095d0_b.jpg)

*   在插值表达式中也支持三目运算符、数字和数组的一些基本方法，可以自己去尝试。

v-bind
------

*   v-bind用于绑定数据和元素属性，父传子数据时也能用到。
*   v-bind的简写是`:`
*   v-bind：接的是自己起的属性名(可以随便起)，然后接等于号=，双引号里面写在data里的东西，也可以直接在里面写个对象，例如设置Css啥的。
*   最主要的还是使用父传子，在子组件中定义props，下一章再说这个，也是比较简单。
*   两张图片唯一的不同就是第二张用了v-bind的简写，很方便。

![](https://pic3.zhimg.com/v2-4c82b6547d11ad22c41a4fc2319cfd7a_b.jpg)
![](https://pic2.zhimg.com/v2-fd80eace1eed7e7f59bb495460390476_b.jpg)

v-model
-------

*   对数据进行双向绑定的指令，也是经常用。
*   具体效果亲自试一试。

![](https://pic1.zhimg.com/v2-607eb1c4a42a49bd5941426bd18f7850_b.jpg)

v-on
----

*   它就是一个调用方法的指令，简写为`@`
*   怎么使用在v-if里会提到。

v-if、v-else、v-else-if
---------------------

*   v-if和v-else一听就能搭配使用，也没有什么好说的，和Java里面一样，if里如果为true，就显示if里的东西，否则显示else里的东西。
*   我这里使用官方样例，就是切换登录方式，点击按钮切换登录方式，并不是真的登录。

![](https://pic2.zhimg.com/v2-ca3bddeed264fc95d95933e7b6e5dbac_b.jpg)

```js
<!-- v-if登录 -->
<template>
  <div>
      <div v-if="logintype === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username" key="username-input">
      </div>
      <div v-else>
        <label>Email</label>
        <input placeholder="Enter your email address" key="email-input">
      </div>
      <button @click="changelogintype">切换登录方式</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logintype : 'username'
    }
  },
  methods:{
    changelogintype(){
      if(this.logintype === "username"){
        this.logintype = "email"
      }
      else{
        this.logintype = "username"
      }
    }
  }
}
</script>

<style  scoped>
</style> 
```

*   解释一下代码，v-if中使用了双引号，所以在双引号里面要使用单引号。
*   key的作用是让这个区域是唯一的，因为如果不加key的话，无法做到切换时刷新该区域，就相当于是这个区域的身份证，给他个名字。
*   @click是单击事件，@是v-on的简写。
*   @click里面的方法名字其实是简写，完整写法`@click="changelogintype()"`，当我们不需要为这个方法传递参数时，我们可以不传参，有些特定的方法中传入的是event，根据具体情况使用。
*   在methods里要想获取同一组件内data里的东西，那么要使用`this`关键字。

v-show和v-if的区别
--------------

*   v-show和v-if的作用是一样的，顾名思义，是让某个区域进行显示或消失。
*   在原理上的区别：

*   在初始化加载时，v-show是全部加载进去了，v-if是根据条件进行加载，也就是v-if会控制DOM中这个结点是否存在，而v-show只是不让这个区域显示了，但还是存在。
*   在初始化时v-show消耗的资源更多。但在后续的情况下，如果只需要切换组件的隐藏状态，那么v-show消耗的资源会很小。如果条件很少发生改变，那么v-if会比较好。

*   v-show其实用的会更多，个人认为，跟做的项目有关系吧。。

v-for
-----

*   遍历数组呗，跟Java里面的功能一样，但不同点在于，v-for可以设置一个key提供排序提示。

```js
<!-- v-for -->
<template>
  <div>
      <!--数字数组-->
      <p v-for="item in list">{{item}}</p>
      <br/>
      <!--对象数组-->
      <p v-for="item in listObj" :key="item.id">{{item.id}}：{{item.name}}
      <br/>
       <!--对象-->
      <p v-for="(val,key) in obj">{{key}}：{{val}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list:[1,2,3,4,5,6],
      listObj:[
        {id:1, name:'zs1'},
        {id:2, name:'zs2'},
        {id:3, name:'zs3'},
        {id:4, name:'zs4'},
        {id:5, name:'zs5'},
        {id:6, name:'zs6'},
      ],
      obj:{
        id : 1,
        name : "CoderHqf",
        age : 20
      }
    }
  }
}
</script>

<style  scoped>
</style> 
```

*   在第三个遍历对象里的字段时，key代表键，val代表值。
*   在和v-if一起使用时，v-for的优先级更高，去看[列表渲染教程](https://link.zhihu.com/?target=https%3A//cn.vuejs.org/v2/guide/list.html%23v-for-object)。

v-slot
------

*   简写为`#`，因为v-slot是新款，在使用时只能用于template里。
*   也可用于父子传参。
*   在使用时，父组件中的插槽可以被子组件中的插槽替换，相当于是把子组件放到父组件中的插槽。

### 具名插槽

*   就是有名字的插槽。
*   父组件：

![](https://picb.zhimg.com/v2-b482eff7169872c95981e27bbeb05bee_b.jpg)

*   两个子组件：

![](https://pic3.zhimg.com/v2-ec6c850cba7295ae3d5095ab5248ac9d_b.jpg)
![](https://pic3.zhimg.com/v2-1eb1fa828b37d15a1a69a5d78b616df2_b.jpg)

### 作用域插槽

*   父组件能够获取到子组件中的数据。
*   父组件：

![](https://pic1.zhimg.com/v2-a2b51335fd3a271f2a38ee26fc5db763_b.jpg)

*   子组件：

![](https://pic3.zhimg.com/v2-398f2c64bd0d0bc65a42eacdc11826c9_b.jpg)

### 动态插槽名

*   官网上的代码：

```
<template v-slot:[dynamicSlotName]>
    ...
  </template> 
```

*   其实`[]`里填写的东西就是动态插槽名，里面可以写拼接的字符串、计算属性和方法，变化挺多的，但只会渲染出dynamicSlotName经过相应运算或方法处理的最终结果，很灵活。

总结
--

*   基本语法要自己动手写，一步步打好基础就可以了，官方文档在前言里有，可以去看。

**————————————————**

**版权声明：本文为CSDN博主「CoderHqf」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。**

**原文链接：**

[Vue.js教程-Vue基本指令\_CoderHqf的博客-CSDN博客\_vue教程​blog.csdn.net![](https://picb.zhimg.com/v2-0b433b865327c0cb39d46d96c06d28ce_ipico.jpg)
](https://link.zhihu.com/?target=https%3A//blog.csdn.net/weixin_45062103/article/details/107677588%3Futm_medium%3Ddistribute.pc_feed.none-task-blog-personrec_tag-15.nonecase%26depth_1-utm_source%3Ddistribute.pc_feed.none-task-blog-personrec_tag-15.nonecase%26request_id%3D5f25db802405af26f814c8b1)

**你想成为一名前端工程师吗？戳戳这里：**

**[尚学堂Web培训\_H5培训\_Web前端培训_前端培训机构​www.bjsxt.com![](https://pic1.zhimg.com/v2-049f1f7077381808df56ae23bd1f014a_180x120.jpg)
](https://link.zhihu.com/?target=https%3A//www.bjsxt.com/html-h5-php.html)**

**免费试听课程，让你亲身实地感受高品质面授教学！**
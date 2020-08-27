---
title : ElementUI 组件库之外，供我们选择的 Vue 组件库还有很多
description : 列举了目前主要的vue组件库
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-26 23:14:50 +0800
categories:
 -
tags:
 -
---
[[toc]]

![](https://user-gold-cdn.xitu.io/2019/12/7/16ee08923006f96b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

前文回顾：[Vue+Spring Boot 前后端分离的商城项目开源啦！](https://juejin.im/post/6860367403583438855)

Vue 组件千千万，只要不行咱就换。

`ElementUI` 近况
--------------

根据我最近的观察，得知一些关于 `ElementUI` 维护人员都退去的消息，这意味着什么？意味着已经学不动的我们，不用再去学新东西了，开不开心？意不意外？

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0dcd7d91de814fdc881c8137d46b21b6~tplv-k3u1fbpfcp-zoom-1.image)

这里放几个知乎链接：

[element-ui 是不是不维护了](https://www.zhihu.com/question/366200594)

[如果 ElementUI 不维护了，也不再支持 Vue 3了我们该怎么办呢？](https://www.zhihu.com/question/407326156)

> 仔细翻阅上述知乎回答，有些比较闲的作者已经 fork 了 ElementUI 的源码，自己改造适配 Vue3，在此我只能说两个字：敬佩。

那么面对这样的情况，作为前端开发的我们应该如何将损失降到最低呢？

我的答案是：耐心等待更新，不要着急不要惊慌，团队核心成员依然在进行项目的更新，下一代 Element Plus [github.com/element-plu…](https://github.com/element-plus/element-plus) 也在持续迭代中。

如何选择一个好的 UI 框架作为项目的组件库
----------------------

*   😍好看
    
    先抛开大不大厂不说，中小厂为了加快开发效率，可能不会对 UI 组件库的样式做太多的改动，这就要求 UI 组件库本身就要自带颜值✨。
    
*   🏭大厂加持
    
    先不说大厂要有多大吧，起码要有独立的团队去维护组件库，若是桃园三结义一般因为某些意气用事，要搞一个组件库，最后公司卖给某宝，撒手框架不管，这就比较尴尬。
    
*   💡好的生态
    
    什么是生态，就是围绕着这个框架的周边设施是否齐全。比方说 Github 上的 Issue 是否能快速给予提问者反馈，是否有论坛社区等网站让使用者可以贡献自己的二次开发的组件（物料库），开源作品多不多，文档写得好不好（特别是中文文档）等等，都将决定这个组件库的发展好坏与否。
    

> 以上排名不分先后，每一条都很重要，请根据自己公司业务的实际情况，酌情选择。

市面上现有的组件库分析
-----------

说到组件库，React 我先不提了，因为统一标配 [Ant Design](https://ant.design/index-cn)。

Vue 的组件库可谓是百花齐放、琳琅满目、选不过来，下面我按照个人印象给大家评价一下市面上这些有人用的 Vue 组件库。

> 以下介绍顺序，分先后，按照 Github 的⭐⭐数。

#### **[ElementUI](https://github.com/ElemeFE/element)**

📖作者：饿了么团队（现已被阿里收购） ⭐Github star：46.8k+ 📌属性：PC 端组件库

**简介：** 内涵 55+ 个网页开发常用组件，并且组件库结合了 vue-cli 出了相应的插件 [Element 插件](https://github.com/ElementUI/vue-cli-plugin-element)，你可以用它们快速地搭建一个基于 Element 的项目。引入方式也支持了按需引入，以达到减小项目体积的目的。在主题方面，官方自己提供了一些，并且可以上传[自定义主题](https://element.eleme.cn/#/zh-CN/theme)。

👍**相关开源项目：**

*   [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)：一款基于 ElementUI 二次开发的后台开源项目。
*   [vue-manage-system](https://github.com/lin-xin/vue-manage-system)：基于 Vue + Element UI 的后台管理系统解决方案。
*   [vue2-element-touzi-admin](https://github.com/wdlhao/vue2-element-touzi-admin)：基于 Vue2.0 + vuex + ElementUI 后台管理系统。
*   [element3](https://github.com/kkbjs/element3)：慕课网讲师蜗牛老师个人维护的一个 ElementUI + Vue3.0 版本，当然现在可能就是 beta 版本的 Vue3.0。自己平时做项目拿来把玩可以，但是用于公司生产环境需要三思。

🎬**总结：** 从这几个比较好的开源项目类型可以看出，ElementUI 多数用于后台管理系统的页面开发，业务组件也多用于数据的处理以及表格表单的展示，但是还是那句话没人维护了，要是用的同学请慎重考虑一下后面要更新的 Vue3.0。

#### **[Vuetify](https://github.com/vuetifyjs/vuetify)**

📖作者：John Leider、Heather Leider、Kael Watts-Deuchar 等，一群国外开发大佬，详情可以点击上面的 Github 地址查看。 ⭐Github star：27k+ 📌属性：PC 端组件库

**简介：** Vuetify 是 Vue.js 的头号组件库，自 2016 年以来一直在积极开发。这点可以说相当优秀，从他们的[官方文档](https://vuetifyjs.com/zh-Hans/)上整齐的广告可以看出，该组件库受到广大甲方的一致好评，纷纷投来广告。在生态上做的也相当到位，甚至还有付费的主题。相应组件的文档也非常详细，有用例和 API 的解释，在开发的过程中能减少很多不必要的麻烦。

👍**相关开源项目：**

*   [vuetify-material-dashboard](https://github.com/creativetimofficial/vuetify-material-dashboard)：一个基于 vuetify 设计风格的管理系统。
*   [adminify](https://github.com/topfullstack/adminify)：同样是一个集成 vuetify 组件库的开源项目。
*   [vue-movie](https://github.com/zhifanXU17/vue-movie)：vuetify + vue 仿豆瓣电影项目。
*   [electron-vue-music](https://github.com/wicked-knife/electron-vue-music)：electron + vue + vuetify 仿网抑云音乐。

🎬**总结：** 难道是我的错觉吗？国内的小伙伴们都非常爱国，这个组件库在 Github 几乎找不到什么好的开源项目，不兼容 Edge 和 IE 浏览器让它在我们国内可能不是很吃香。若是公司有对 IE 的支持需求，选它的时候要三思而后行。

#### **[Vux](https://github.com/airyland/vux)**

📖作者：airyland 等个人维护项目 ⭐Github star：17.2k+ 📌属性：Mobile 组件库、基于WeUI

**简介：** 我很欣慰国内有这样优秀的个人开发能开发出这样不错的组件库，集结了一些有志之士一起维护着这个看着并不怎么惊艳的开源项目。作者在[官方文档](https://vux.li/)下方就直说了：“体验不佳，维护靠个人。“ 我再看了看主要贡献者的 Github 活跃程度，以及近期的 [Issues](https://github.com/airyland/vux/issues) 解决情况，我敢断言，这个框架只要作者还健在，应该不会歇菜。特别是微信 H5 开发的朋友，这款组件库的 UI 是基于微信官方样式设计的，十分贴合，建议使用。

👍**相关开源项目：**

*   [vux2.5-webapp](https://github.com/vue-demo/vux2.5-webapp)：一个基于 vux 开发的商城项目。
*   [vue2-vux-fitness-project](https://github.com/xingxiaoyiyio/vue2-vux-fitness-project)：一个基于 vux 开发的种子项目，同学们可以拿这个项目作为启动项目。
*   [vue-music](https://github.com/ddqre12345/vue-music)：vux + vue 仿网抑云音乐项目。

🎬**总结：** 文档好、组件多、还有又拍云的独家赞助。但是是个人维护的项目，并且最新的更新时间也是2019年4月份，个人还是很喜欢这个开源项目的，希望作者能够继续更新，在升级 Vue3 后就不是很推荐使用了。

#### **[Vant](https://github.com/youzan/vant)**

📖作者：有赞技术团队 ⭐Github star：14.6k+ 📌属性：Mobile 组件库

**简介：** Vant 是一个移动端组件库，支持 TS、SSR、按需引入、国际化等等，最重要的是它还支持小程序。[官方文档](https://youzan.github.io/vant/#/zh-CN/home)支持中英文，并且文档对开发者也是非常友好，有用例和展示效果。组件丰富，因为有赞团队是做商城类的，所以 Vant 支持了一些商城的特色组件，如地址栏、省市区、商品卡片、优惠券、提交订单、商品规格等等。

👍**相关开源项目：**

*   [newbee-mall-vue-app](https://github.com/newbee-ltd/newbee-mall-vue-app)：新蜂商城 Vue 版本。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c1fdda3ca7e4cf4b22f227af2f7b6b6~tplv-k3u1fbpfcp-zoom-1.image)

*   [vant-demo](https://github.com/youzan/vant-demo)：Vant 官方示例合集，包含了 Vant、Vant Weapp 和 Vant Cli 相关的示例，详细内容请打开各目录查看。
    
*   [vant-weapp](https://github.com/youzan/vant-weapp)：Vant Weapp 是移动端 Vue 组件库 Vant 的小程序版本，两者基于相同的视觉规范，提供一致的 API 接口，助力开发者快速搭建小程序应用。
    

🎬**总结：** 看了以下 Github 的 Issue，最近一次更新在前几天，说明框架一直在维护中。有赞目前已经上市，公司内部都是使用 Vant 进行开发，所以开发者们不必担心这个组件库不再被维护，相信 Vue3 出来之后，团队也会对组件库做升级处理。

#### **[Ant-design-vue](https://github.com/vueComponent/ant-design-vue/)**

📖作者：[唐金州](https://github.com/tangjinzhou) ⭐Github star：11.3k+ 📌属性：PC 组件库

**简介：** 这里是 Ant Design 的 Vue 实现，开发和服务于企业级后台产品。加了 ant 貌似是蚂蚁金服开发的，其实是个人按照 [ant-design](https://github.com/ant-design/ant-design) 做了一对一的临摹。

👍**相关开源项目：**

*   [ant-design-vue-pro](https://github.com/vueComponent/ant-design-vue-pro)：基于 Ant Design of Vue 实现的 Ant Design Pro。
*   [vue-alain](https://github.com/vue-alain/vue-alain)：使用 Vue-cli 3.0、TypeScript、ant-design-vue 实现的中后台框架。
*   [k-form-design](https://github.com/Kchengz/k-form-design)：基于 Vue 和 ant-design-vue 实现的表单设计器。

🎬**总结：** ant-design-vue 也算是国内个人开发者里，临摹比较成功的案例，乘着蚂蚁金服这波流量，迅速涨星星。组件还算看得过去，问题也更新的挺及时的，中规中矩的一个组件库，可用。

#### **[Cube-UI](https://github.com/didi/cube-ui)**

📖作者：滴滴团队 ⭐Github star：8.3k+ 📌属性：Mobile 组件库

**简介：** 从[官方文档](https://didi.github.io/cube-ui/#/zh-CN)一眼就看出它是滴滴团队开发维护的，组件数量不是很多，没有什么特色，最新版本居然是今年4月份的，版本更新也不是很及时。

👍**相关开源项目：**

*   [cube-application-guide](https://github.com/cube-ui/cube-application-guide)：一个快速上手 cube-ui 的教程。

🎬**总结：** 这里就不做过多介绍了，也只有滴滴内部的人员会去使用了，毕竟 Vue 移动端组件那么多，我为什么要选一个又丑维护又不及时的组件库呢，再见👋。

#### **[Mand-Mobile](https://github.com/didi/mand-mobile)**

📖作者：滴滴团队 ⭐Github star：2.7k+ 📌属性：Mobile 组件库

**简介：** Mand Mobile 是面向金融场景设计的移动端组件库，基于Vue.js实现。目前已实际应用于滴滴四大金融业务板块的10余款产品中。40+ 的实用组件，满足基本的业务需求。

👍**相关开源项目：**

*   [palette](https://github.com/mand-mobile/palette)：mand-mobile 的视觉主题编辑器。

🎬**总结：** 这个移动端组件就非常有特点了，就好像 Vant 针对的是电商，Mand 针对的是金融业务。内部有丰富的金融业务相关的组件，如金融数字、票据、验证码、收银台、折线表、刻度尺、数字键盘等等。要是你的公司是做金融业务的，可以尝试使用这套组件库。

#### **[NutUI](https://nutui.jd.com/#/intro)**

📖作者：京东团队 ⭐Github star：2.2k+ 📌属性：Mobile 组件库

**简介：** 2020 年初新出的一个船新组件库。NutUI 是一套京东风格的移动端组件库，开发和服务于移动 Web 界面的企业级产品。50+ 高质量组件，40+ 京东移动端项目正在使用。

👍**相关开源项目：**

*   [nutui-demo](https://github.com/richard1015/nutui-demo)：基于 Vue CLI 搭建 NutUI 的相关示例项目。

🎬**总结：** 刚刚出来，开源项目不是很多，京东这个组件库要是做得好的话，可能会超过 Vant 有赞的，毕竟东哥把我们都当作兄弟，他的技术团队肯定不会坑我们。组件内有几个特色组件，如数字倒计时、图片懒加载、视频、配送时间、转盘抽奖、签名、地址选择等等。说实话，看到转盘抽奖的时候，我都惊了，京东～真有你的！！

还有很多很多默默无闻的个体户，用心的维护着自己的组件库，在这就不一一拿出来介绍了，因为真的很多！！！也希望大家也可以在评论区畅所欲言，说说你们喜欢的组件库，感谢大家的观看。

最后，推荐一下个人写的 Vue 商城项目，感兴趣的同学可以观摩一下，给个 star ：

[![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a331a7148ebf43a28ec531aff06a2623~tplv-k3u1fbpfcp-zoom-1.image?imageView2/2/w/480/h/480/q/85/interlace/1)

](https://github.com/newbee-ltd/newbee-mall-vue-app)

> newbee-mall 在 GitHub 和国内的码云都创建了代码仓库，如果有人访问 GitHub 比较慢的话，建议在 Gitee 上查看该项目，两个仓库会保持同步更新。

*   [newbee-mall in GitHub : https://github.com/newbee-ltd/newbee-mall-vue-app](https://github.com/newbee-ltd/newbee-mall-vue-app)
*   [newbee-mall in Gitee : https://gitee.com/newbee-ltd/newbee-mall-vue-app](https://gitee.com/newbee-ltd/newbee-mall-vue-app)

> 除注明转载/出处外，皆为作者原创，欢迎转载，但未经作者同意必须保留此段声明，且在文章页面明显位置给出原文链接，否则保留追究法律责任的权利。
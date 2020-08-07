---
title : 爬虫常用Xpath和CSS3选择器对比
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-08 01:39:52 +0800
categories:
 -
tags:
 -
---
[[toc]]
## 1\. 简介

　　**CSS**是来配合HTML工作的，和**Xpath**对比起来，**CSS选择器**通常都比较短小，但是功能不够强大。**CSS**中的空白符**' '**和**Xpath**的**'//'**都表示当前元素的所有后代（子孙）元素。

[回到顶部](#_labelTop)

## 2\. 对比

　　对于元素（标签）的操作，Xpath和CSS基本上都能通过各自的语法达到相同的动作，并且爬虫中使用的都是一些相对简洁明了的操作。

| 结果                  |  CSS3选择器          |  Xpath表达式                   |
|---------------------|-------------------|-----------------------------|
| 所有元素                | *                 |  //*                        |
| 所有p元素               | p                 |  //p                        |
| 所有p元素的子元素(只选一代)     | p>*               |  //p/*                      |
| 所有父元素为div的p元素       | div p             | //div//p                    |
| 所有id为foo的元素         | #foo　             |  //*[@id="foo"]             |
| 所有class为foo的元素      | .foo              | //*[@class="foo"]           |
| 拥有某个属性的元素           | *[title]          | //*[@title]                 |
| title属性为target的所有元素 | *[title="target"] | //*[@title="target"]        |
| 所有p元素的第一个子元素        | p>*:first-child   | //p/*[0]                    |
| 所有拥有a元素的p元素         | 无法实现              | //p[a]                      |
| p元素的下一个兄弟元素         | p+*               | //p/following-sibling::*[0] |

[回到顶部](#_labelTop)

##  3. 参考资料

*   [紫云飞博文](https://www.cnblogs.com/ziyunfei/archive/2012/10/05/2710631.html)
*   [CSS选择器参考手册](http://www.w3school.com.cn/cssref/css_selectors.asp#_motz_)
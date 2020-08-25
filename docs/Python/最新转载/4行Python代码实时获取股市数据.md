---
title : 4行Python代码实时获取股市数据
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-23 11:06:01 +0800
categories:
 -
tags:
 -
---
[[toc]]
文｜一行数据 行哥

![](https://pic1.zhimg.com/v2-e1ebeae03461690f849d471cfdac00bc_b.jpg)
![](https://pic3.zhimg.com/v2-53a1c051d4f5fb4c62b7244bb88123d3_b.jpg)

最近股市特别火，正在学/学会Python的读者想尝试一下股市交易或者练练项目，获取数据便必不可少。这不，行哥给大家介绍一个专门获取股市数据的方法，有了数据之后数据分析、机器学习还不赶紧跑起来？毕竟这社会毒打实践课经历一次就少一次

*   Tushare介绍
*   获取token值
*   数据获取-以茅台为例

*   1.初始化
*   2.股票列表
*   3.上市公司基本信息
*   4.日线行情
*   5.其它数据

*   最后

**Tushare介绍**
-------------

Tushare是一个**免费、开源**的python财经数据接口包。主要实现对股票等金融数据从数据采集、清洗加工 到 数据存储的过程，能够为金融分析人员提供快速、整洁、和多样的便于分析的数据，为他们在数据获取方面极大地减轻工作量，使他们更加专注于策略和模型的研究与实现上，主要面向对象如下

*   量化投资分析师（Quant）
*   对金融市场进行大数据分析的企业和个人
*   开发以证券为基础的金融类产品和解决方案的公司
*   正在学习利用python进行数据分析的人

**获取token值**
------------

这个接口必须在该网站上注册账号，获取个人token值才可以随时调用数据。账号注册网址可以看文末，或者点击原文查看。token值获取方式如下

**1、登录成功后，点击右上角->个人主页**

![](https://picb.zhimg.com/v2-6809e021d9fcbf8a7156cc0537253812_b.jpg)

**2、 在“用户中心”中点击“接口TOKEN**”

![](https://picb.zhimg.com/v2-db7a88e33dd26317b933c5f145649abf_b.jpg)

**3、 可以点击右侧复制按钮复制token**

![](https://picb.zhimg.com/v2-582f5c7774cbdb2e3ba513fb45337bc6_b.jpg)

**4、或者点击右侧睁开眼睛来获取token明文，复制并保存**

![](https://pic3.zhimg.com/v2-318c7a55d9d0c1da1afc6496dc323c05_b.jpg)

数据获取——以茅台例
----------

这几天茅台的价格又创历史新高，茅台的市值同样超过工商银行成了中国内地股市的大哥，茅台从前是价格第一，现在是市值第一，还有它超过了可口可乐成了世界饮料界第一。所以本文以茅台为例，用几行Python来获取其相关数据

### **1.初始化**

```py
# 导入tushare
import tushare as ts
# 这里注意， tushare版本需大于1.2.10
# 设置token
ts.set_token('填入自己的token')
# 以上方法只需要在第一次或者token失效后调用，完成调取tushare数据凭证的设置，正常情况下不需要重复设置。也可以忽略此步骤，直接用pro_api('your token')完成初始化
# 初始化pro接口
pro = ts.pro_api() 
```

### **2.股票列表**

接口：stock_basic描述：获取基础信息数据，包括股票代码、名称、上市日期、退市日期等

*   **输入参数**

![](https://pic1.zhimg.com/v2-fdd083d9b206e674cc914ac3686e26f8_b.jpg)

*   **输出参数**

![](https://pic2.zhimg.com/v2-8de374df47e5869202d1bc1f7ecb340d_b.jpg)

*   **示例**

```
#查询当前所有正常上市交易的股票列表
data = pro.stock_basic(exchange='', list_status='L', fields='ts_code,symbol,name,area,industry,list_date') 
```

![](https://pic4.zhimg.com/v2-4daa6160f126b9020cc0501c0755e2ca_b.jpg)

### **3.上市公司基本信息**

接口：stock_company描述：获取上市公司基础信息，单次提取4000条，可以根据交易所分批提取

*   **输入参数**

![](https://pic3.zhimg.com/v2-54dfae39134f14362c44833d7d20726c_b.png)

*   **输出参数**

![](https://picb.zhimg.com/v2-80d8fb878c753ea9ccb2dae40d17dd33_b.jpg)

*   **示例**

```
df = pro.stock_company(ts_code = "600519.SH", exchange='SSE', fields='ts_code,chairman,manager,secretary,reg_capital,setup_date,province') 
```

![](https://pic4.zhimg.com/v2-3219fac8e5ba7c5055ca46f9daa641fc_b.png)

### **4.日线行情**

接口：daily数据说明：交易日每天15点～16点之间。本接口是未复权行情，停牌期间不提供数据。

*   **输入参数**

![](https://pic4.zhimg.com/v2-fcd8c43aabb129af2039add494c78634_b.jpg)

*   **输出参数**

![](https://pic3.zhimg.com/v2-8e456a58cd685f47a3f46916f5c06646_b.jpg)

*   **示例**

```
df = pro.daily(ts_code='600519.SH', start_date='20200708', end_date='20200709') 
```

![](https://pic3.zhimg.com/v2-997225132bde8c54dafedb1853d6d7a6_b.png)

### **5.其它数据**

数据太多无法一一展示，这里截图展示一下该接口所涵盖的11个门类数据，即使不用这个来进行量化分析，也可以用它作为一个数据源，练练数据分析项目也是非常不错的

![](https://pic4.zhimg.com/v2-407c76b7e29daea1bfb4c6dc2c3808fc_b.jpg)

**最后**
------

附上多年深度体验股灾的感受所得出的一句话：凡是自己不能掌控输赢的赚钱都是赌博。
---
title : Python爬取“爆款剧”——《三十而已》热评，并做可视化
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-05 00:38:48 +0800
categories:
 -
tags:
 -
---
[[toc]]
## **前言**

最近一部“爆款剧”——《三十而已》获得了口碑收视双丰收，剧中三个女主角的故事线频频登上微博热搜，为了了解吃瓜群众们对这部剧的看法，爬了爬腾讯视频关于这部剧的评论，并做了简单文本可视化分析。

## **一、数据获取**

1.分析评论页面

腾讯视频评论要点击查看更多评论才能加载更多数据，很明显是一个动态网页，评论内容使用了Ajax动态加载技术。因此，我们需要找到真实URL，然后再请求数据。

![Python爬取“爆款剧”——《三十而已》热评，并做可视化](http://p1-tt.byteimg.com/large/pgc-image/5bcf30d1799e4d0ebdee8af3dba37d77?from=pc)

找到真实URL其实不难，按照以下步骤即可找到。当然，你也可以使用抓包工具fiddler，同样可以轻松找到。

![Python爬取“爆款剧”——《三十而已》热评，并做可视化](http://p6-tt.byteimg.com/large/pgc-image/65dc572c2229404abfbc122d12140456?from=pc)

2.寻找参数规律

我们多刷新几次，找几个真实的URL看看这些参数有什么变化。下图是我刷新了3次得到的真实的URL：

```
第1次刷新：https://video.coral.qq.com/varticle/5572751505/comment/v2?callback=_varticle5572751505commentv2&orinum=10&oriorder=o&pageflag=1&cursor=6689895369036463828&scorecursor=0&orirepnum=2&reporder=o&reppageflag=1&source=132&_=1595994099261第2次刷新：https://video.coral.qq.com/varticle/5572751505/comment/v2?callback=_varticle5572751505commentv2&orinum=10&oriorder=o&pageflag=1&cursor=6689950633282796870&scorecursor=0&orirepnum=2&reporder=o&reppageflag=1&source=132&_=1595994099262第3次刷新：https://video.coral.qq.com/varticle/5572751505/comment/v2?callback=_varticle5572751505commentv2&orinum=10&oriorder=o&pageflag=1&cursor=6690046095919619518&scorecursor=0&orirepnum=2&reporder=o&reppageflag=1&source=132&_=1595994099263
```

很显然，只有cursor=？和\_=？有变化，\_=？为公差为1的等差数列，而cursor=？貌似没有什么规律。根据以往经验，这类参数有可能藏在上一个真实URL中。我们尝试将第1个URL在浏览器中打开，然后搜索第2个真实URL的中的cursor值。

![Python爬取“爆款剧”——《三十而已》热评，并做可视化](http://p3-tt.byteimg.com/large/pgc-image/3c8109c4bc87424fb4774f3314d7091a?from=pc)

还真有！一般情况下，我们还要多试几次，对我们的猜想进行验证。既然规律已经找到，接下来就很简单了。限于篇幅，以下给出部分代码：

```
def main():    #初始页面的_=?    page=1595991084333    #初始待刷新页面的cursor=？    lastId="0"    for i in range(1,1000):        time.sleep(1)        html = get_content(page,lastId)        #获取评论数据        commentlist=get_comment(html)        print("------第"+str(i)+"轮页面评论------")        k = 0        for j in range(1,len(commentlist)):            comment = commentlist[j]            k += 1            print('第%s条评论：%s'%(k,comment))        #获取下一轮刷新页ID        lastId=get_lastId(html)        page += 1if __name__ == '__main__':    main()
```

## **二、数据处理**

1.导入相关包

```
#基础数据分析库import numpy as npimport pandas as pd#分词库import jiebaimport re#绘图库import matplotlib.pyplot as pltfrom pyecharts.charts import *from pyecharts import options as optsfrom pyecharts.globals import ThemeTypeimport stylecloudfrom IPython.display import Image
```

2.导入评论数据

```
df = pd.read_csv('/Users/我是J哥/Documents/技术公号/公号项目/2.spider/腾讯/comment.csv',names=['评论内容'])df.sample(5)
```

![Python爬取“爆款剧”——《三十而已》热评，并做可视化](http://p6-tt.byteimg.com/large/pgc-image/dd91466d86cc4924a44be568fff84e71?from=pc)

3.数据类型转换

```
df.info()df['评论内容'] = df['评论内容'].astype('str')
```

4.删除重复评论

```
df = df.drop_duplicates()
```

5.增加评论类型

```
cut = lambda x : '短评' if len(x) <= 20 else ('中评' if len(x) <=50 else '长评')df['评论类型'] = df['评论内容'].map(cut)
```

6.提取演员关键词

```
result = []for i in df['评论内容']:    result.append(re.split('[:：,，.。!！~·`\;；……、]',i))    def actor_comment(df,result):    actors = pd.DataFrame(np.zeros(6 * len(df)).reshape(len(df),6),                      columns = ['王漫妮','顾佳','钟晓芹','江疏影','童瑶','毛晓彤'])    for i in range(len(result)):        words = result[i]        for word in words:            if '王漫妮' in word or '王曼妮' in word:                actors.iloc[i]['王漫妮'] = 1             if '顾佳' in word:                actors.iloc[i]['顾佳'] = 1            if '钟晓芹' in word:                actors.iloc[i]['钟晓芹'] = 1             if '江疏影' in word:                actors.iloc[i]['江疏影'] = 1             if '童瑶' in word or '童谣' in word:                actors.iloc[i]['童瑶'] = 1            if '毛晓彤' in word:                actors.iloc[i]['毛晓彤'] = 1     final_result = pd.concat([df,actors],axis = 1)    return final_resultdf1 = actor_comment(df,result)df1.head(10)
```

![Python爬取“爆款剧”——《三十而已》热评，并做可视化](http://p6-tt.byteimg.com/large/pgc-image/b5aaf20b31864066870abac3dc465a82?from=pc)

## **三、数据可视化**

1.整体评论情况

```
df2 = df1.groupby('评论类型')['评论内容'].count()df2 = df2.sort_values(ascending=False)regions = df2.index.to_list()values = df2.to_list()c = (        Pie(init_opts=opts.InitOpts(theme=ThemeType.CHALK))        .add("", zip(regions,values),radius=["40%", "70%"])        .set_global_opts(title_opts=opts.TitleOpts(title="评论类型占比",subtitle="数据来源：腾讯视频",pos_top="2%",pos_left = 'center'))        .set_series_opts(label_opts=opts.LabelOpts(formatter="{b}:{d}%",font_size=18))    )c.render_notebook()
```

![Python爬取“爆款剧”——《三十而已》热评，并做可视化](http://p1-tt.byteimg.com/large/pgc-image/8c16aee4cfb249c7ac5111894e04c263?from=pc)

通过对一万多条热评内容绘制词云图，我们很容易看出大家对《三十而已》的喜欢，以及对主要角色和演员的关注。家庭与工作如何兼得？婚姻与爱情如何共处？这些问题都被广大观众所热议。

2.评论类型分布

```
df2 = df1.groupby('评论类型')['评论内容'].count()df2 = df2.sort_values(ascending=False)regions = df2.index.to_list()values = df2.to_list()c = (        Pie(init_opts=opts.InitOpts(theme=ThemeType.CHALK))        .add("", zip(regions,values),radius=["40%", "70%"])        .set_global_opts(title_opts=opts.TitleOpts(title="评论类型占比",subtitle="数据来源：腾讯视频",pos_top="2%",pos_left = 'center'))        .set_series_opts(label_opts=opts.LabelOpts(formatter="{b}:{d}%",font_size=18))    )c.render_notebook()
```

![Python爬取“爆款剧”——《三十而已》热评，并做可视化](http://p3-tt.byteimg.com/large/pgc-image/3daa61330d3b499389efa2c0b6187adc?from=pc)

从评论类型来看，以短评居多，占比72.52%。另外，有4.15%的评论者给出了50字以上的评论，表达出自己对《三十而已》的独到见解。

3.演员角色提及

```
df3 = df1.iloc[:,2:].sum().reset_index().sort_values(0,ascending = True)df3.columns = ['角色','次数']df3['占比'] = df3['次数'] / df3['次数'].sum()c = (    Bar(init_opts=opts.InitOpts(theme=ThemeType.CHALK))    .add_xaxis(df3['角色'].to_list())    .add_yaxis("",df3['次数'].to_list()).reversal_axis() #X轴与y轴调换顺序    .set_global_opts(title_opts=opts.TitleOpts(title="主演及其饰演的角色被提及次数",subtitle="数据来源：腾讯视频",pos_top="2%",pos_left = 'center'),                       xaxis_opts=opts.AxisOpts(axislabel_opts=opts.LabelOpts(font_size=16)), #更改横坐标字体大小                       yaxis_opts=opts.AxisOpts(axislabel_opts=opts.LabelOpts(font_size=16)), #更改纵坐标字体大小                       )    .set_series_opts(label_opts=opts.LabelOpts(font_size=16,position='right'))    )c.render_notebook()
```

![Python爬取“爆款剧”——《三十而已》热评，并做可视化](http://p1-tt.byteimg.com/large/pgc-image/405ae115c6714cf49252f47a7ed0220f?from=pc)

童瑶及其饰演的顾佳被评论者提及的次数最多，都超过500次。江疏影，人气也较高，获得了300多次的评论。王漫妮和钟晓芹提及次数相对少一些，随着剧情的推进应该会有所提升。

4.对王漫妮的评论

![Python爬取“爆款剧”——《三十而已》热评，并做可视化](http://p1-tt.byteimg.com/large/pgc-image/6d3bbb62697b436f9676366e090f4b96?from=pc)

王漫妮是众人眼中的标准都市女性，大家普遍认为她长得好看又努力上进，甚至有人觉得她是完美的存在。身为柜姐的她对顾客进行极致化服务，却遭到现实的嘲讽。感情上，想要好好过日子的她却遇到不该遇到的男人。

5.对顾佳的评论

![Python爬取“爆款剧”——《三十而已》热评，并做可视化](http://p6-tt.byteimg.com/large/pgc-image/5fc9b8eeb1694fd6855ca84beba4e9d5?from=pc)

顾佳作为一名全职太太，在观众看来是个优秀的居家女人。双商在线能力强，将自己的孩子和丈夫的公司都打理得井井有条。与此同时，幸福的生活出现了入侵者，顾佳没有被现实打倒，勇敢应战。另外，顾佳因为长得像章子怡，也被众多观众所提及。

6.对钟晓芹的评论

![Python爬取“爆款剧”——《三十而已》热评，并做可视化](http://p3-tt.byteimg.com/large/pgc-image/97e75826a79e4f4383f5d9aeb42a465c?from=pc)

钟晓芹被认为是标准化的大多数，嫁给事业单位铁饭碗的男人，安心做一个平凡妻子，过一个普通生活。却因写作爱好偶然卖出高价版权，家庭情况变得复杂，钟晓芹面临艰难抉择。

[Python爬取“爆款剧”——《三十而已》热评，并做可视化](https://www.toutiao.com/i6856998706495881731/)
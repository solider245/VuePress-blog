---
title : 【已解决】写Python爬虫爬取汽车之家品牌车系车型数据
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-07 17:18:01 +0800
categories:
 -
tags:
 -
---
[[toc]]
需要实现爬取汽车之家的所有的品牌的车系和车型数据：

[https://www.autohome.com.cn/car/](https://www.autohome.com.cn/car/)

现在去写Python的爬虫。

之前了解有多个爬虫框架，用过Scrapy，貌似有点点复杂。

听说PySpider不错，去试试，主要看中的是“WEB 界面编写”

先去了解对比看看：

pyspider vs scrapy

[pyspider 和 scrapy 比较起来有什么优缺点吗？ – 知乎](https://www.zhihu.com/question/37686665)

[scrapy和pyspider介绍 – 简书](https://www.jianshu.com/p/8d3128719170)

[Python爬虫框架–pyspider初体验 – CSDN博客](https://blog.csdn.net/u011659379/article/details/48223385)

[pyspider 爬虫教程（一）：HTML 和 CSS 选择器 | Binuxの杂货铺](https://binux.blog/2015/01/pyspider-tutorial-level-1-html-and-css-selector/)

[爬虫框架Sasila—\-乞丐版scrapy+webmagic+pyspider – 后端 – 掘金](https://juejin.im/entry/595cace86fb9a06bb95ac8aa)

[DarkSand/Sasila: 一个灵活、友好的爬虫框架](https://github.com/DarkSand/Sasila)

[Python爬虫进阶一之爬虫框架概述 | 静觅](https://cuiqingcai.com/2433.html)

还是直接去用吧

pyspider

[pyspider](http://docs.pyspider.org/en/latest/)

[Quickstart – pyspider](http://docs.pyspider.org/en/latest/Quickstart/)

[Python爬虫进阶四之PySpider的用法 | 静觅](https://cuiqingcai.com/2652.html)

[pyspider是开源强大的python爬虫系统 – pyspider中文网](http://www.pyspider.cn)

[pyspider简介 – pyspider中文网](http://www.pyspider.cn/page/1.html)

[【记录】Mac中安装和运行pyspider](https://www.crifan.com/mac_install_and_run_pyspider)

继续参考：

[https://cuiqingcai.com/2652.html](https://cuiqingcai.com/2652.html)

去试试

![](https://www.crifan.com/files/pic/uploads/2018/09/1ccbed38682a152991be1d4d0b31d422.png)

![](https://www.crifan.com/files/pic/uploads/2018/09/7798ff1482eea30cef1e2159721fda1f.png)

然后点击Run后，再点击detail\_page的Run按钮：

![](https://www.crifan.com/files/pic/uploads/2018/09/d2a661348037a57cc0532067b3115e04.png)

![](https://www.crifan.com/files/pic/uploads/2018/09/df45fe22244b36a04bd3efcbd884aa46.png)

点击web，显示空白啊：

![](https://www.crifan.com/files/pic/uploads/2018/09/534129b5c2c1916a97faa30b053dfafb.png)

不过点击html，可以看到html：

![](https://www.crifan.com/files/pic/uploads/2018/09/c37302240449e67803d52fbb490dac11.png)

参考：

[Quickstart – pyspider](http://docs.pyspider.org/en/latest/Quickstart/)

继续搞懂

点击回来管理页面：

![](https://www.crifan.com/files/pic/uploads/2018/09/65b2984d72a2595d8992435884bd9878.png)

然后去研究如何使用：

[【已解决】pyspider中如何写规则去提取网页内容](https://www.crifan.com/pyspider_how_write_rule_to_extract_html_webpage_content)

二是又发现另外的问题：

[【已解决】pyspider中如何加载汽车之家页面中的更多内容](https://www.crifan.com/pyspider_how_load_more_content_data_from_current_page)

后来换了Chrome浏览器，继续抓取页面，点击web，就可以看到页面了：

![](https://www.crifan.com/files/pic/uploads/2018/09/e6c141a566dbdae28f92398af5bac842.png)

但是很明显和正常的内容相比：

![](https://www.crifan.com/files/pic/uploads/2018/09/ae06b072d1ad1da3b0f9151dc07da894.png)

还是缺少了内容

\-》估计是js没有加载？

后来好像加载web页面内容也是正常的了。

继续调试

现在已经用代码：

```python
#!/usr/bin/env python
# \-\*\- encoding: utf\-8 \-\*\-
# Created on 2018\-04\-22 15:14:42
# Project: autohomeCarData

from pyspider.libs.base\_handler import \*
import string

class Handler(BaseHandler):
    crawl\_config = {
    }

    # @every(minutes=24 \* 60)
    def on\_start(self):
        for eachLetter in list(string.ascii\_lowercase):
            self.crawl("https://www.autohome.com.cn/grade/carhtml/%s.html" % eachLetter, callback=self.gradCarHtmlPage)

    def gradCarHtmlPage(self, response):
        picSeriesItemList = response.doc('.rank\-list\-ul li div a\[href\*="/pic/series"\]').items()
        # print("len(picSeriesItemList)=%s"%(len(picSeriesItemList)))
        for each in picSeriesItemList:
            self.crawl(each.attr.href, callback=self.detail\_page)

    # @config(age=10 \* 24 \* 60 \* 60)
    def picSeriesPage(self, response):
        # for each in response.doc('.rank\-list\-ul li div a\[href^="//car.autohome.com.cn/pic/series/"\]').items():
        for each in response.doc('.rank\-list\-ul li div a\[href\*="/pic/series"\]').items():
            self.crawl(each.attr.href, callback=self.detail\_page)

    @config(priority=2)
    def detail\_page(self, response):
        # &lt;a href="/pic/series\-t/66.html"&gt;查看停产车型&amp;nbsp;&amp;gt;&lt;/a&gt;
        # &lt;a class="ckmore" href="/pic/series/588.html"&gt;查看在售车型&amp;nbsp;&amp;gt;&lt;/a&gt;
        # &lt;span class="fn\-right"&gt;&amp;nbsp;&lt;/span&gt;
        fnRightPicSeries = response.doc('.search\-pic\-tbar .fn\-right a\[href\*="/pic/series"\]')
        print("fnRightPicSeries=", fnRightPicSeries)
        if fnRightPicSeries:
            # hrefValue = fnRightPicSeries.attr.href
            # print("hrefValue=", hrefValue)
            # fullPicSeriesUrl = "https://car.autohome.com.cn" + hrefValue
            fullPicSeriesUrl = fnRightPicSeries.attr.href
            print("fullPicSeriesUrl=", fullPicSeriesUrl)
            self.crawl(fullPicSeriesUrl, callback=self.detail\_page)

        # contine parse brand data
        aDictList = \[\]
        # for eachA in response.doc('.breadnav a\[href^="/"\]').items():
        for eachA in response.doc('.breadnav a\[href\*="/pic/"\]').items():
            eachADict = {
                "text" : eachA.text(),
                "href": eachA.attr.href
            }
            print("eachADict=", eachADict)
            aDictList.append(eachADict)

        print("aDictList=", aDictList)

        mainBrandDict = aDictList\[\-1\]
        subBrandDict = aDictList\[\-2\]
        brandSerieDict = aDictList\[\-3\]
        print("mainBrandDict=%s, subBrandDict=%s, brandSerieDict=%s"%(mainBrandDict, subBrandDict, brandSerieDict))

        dtTextList = \[\]
        for eachDt in response.doc("dl.search\-pic\-cardl dt").items():
            dtTextList.append(eachDt.text())

        print("dtTextList=", dtTextList)

        groupCount = len(dtTextList)
        print("groupCount=", groupCount)

        for eachDt in response.doc("dl.search\-pic\-cardl dt").items():
            dtTextList.append(eachDt.text())

        ddUlEltList = \[\]
        for eachDdUlElt in response.doc("dl.search\-pic\-cardl dd ul").items():
            ddUlEltList.append(eachDdUlElt)

        print("ddUlEltList=", ddUlEltList)

        fullModelNameList = \[\]

        for curIdx in range(groupCount):
            curGroupTitle = dtTextList\[curIdx\]
            print("\-\-\-\-\-\-\[%d\] %s" % (curIdx, curGroupTitle))

            for eachLiAElt in ddUlEltList\[curIdx\].items("li a"):
                # curModelName = eachLiAElt.text()
                curModelName = eachLiAElt.contents()\[0\]
                print("curModelName=", curModelName)
                curFullModelName = curGroupTitle + " " + curModelName
                print("curFullModelName=", curFullModelName)
                fullModelNameList.append(curFullModelName)

        print("fullModelNameList=", fullModelNameList)

        allSerieDictList = \[\]
        for eachFullModelName in fullModelNameList:
            curSerieDict = {
                "品牌": mainBrandDict\["text"\],
                "子品牌": subBrandDict\["text"\],
                "车系": brandSerieDict\["text"\],
                "车型": eachFullModelName
            }
            allSerieDictList.append(curSerieDict)

        print("allSerieDictList=", allSerieDictList)

        return allSerieDictList
```

能返回所需要的json对象了：

![](https://www.crifan.com/files/pic/uploads/2018/09/8979660c9ac5f4ca016b49a6f0e8ef53.png)

接着就是去：

如何把结果保存为csv或excel

[【已解决】PySpider如何把json结果数据保存到csv或excel文件中](https://www.crifan.com/pyspider_save_json_result_data_to_csv_or_excel_file)

[【已解决】PySpider中如何清空之前运行的数据和正在运行的任务](https://www.crifan.com/pyspider_how_clear_previous_running_task_and_data)

然后刚才由于用了debug模式，还真的是：

![](https://www.crifan.com/files/pic/uploads/2018/09/1fd612918c569e5146a496f1f728ec93.png)

对于遇到一个出错的：

![](https://www.crifan.com/files/pic/uploads/2018/09/0fb77558e522bece14b2ce903ac7bd6c.png)

![](https://www.crifan.com/files/pic/uploads/2018/09/19c1e0abbf994b45c22c2b209847dedc.png)

![](https://www.crifan.com/files/pic/uploads/2018/09/46bbe794ff828e739cfcfc3bb567f491.png)

很明显，出错了：

<code>track.process  0.53ms
Document is empty ibs/base\_handler.py", line 155, in \_run\_func ret = function(\*arguments\[:len(args) \- 1\]) File "&lt;autohomeBrandData&gt;", line 19, in gradCarHtmlPage File "/Users/crifan/.local/share/virtualenvs/AutocarData\-xI\-iqIq4/lib/python3.6/site\-packages/pyspider/libs/response.py", line 144, in doc elements = self.etree File "/Users/crifan/.local/share/virtualenvs/AutocarData\-xI\-iqIq4/lib/python3.6/site\-packages/pyspider/libs/response.py", line 160, in etree self.\_elements = lxml.html.fromstring(self.content) File "/Users/crifan/.local/share/virtualenvs/AutocarData\-xI\-iqIq4/lib/python3.6/site\-packages/lxml/html/\_\_init\_\_.py", line 876, in fromstring doc = document\_fromstring(html, parser=parser, base\_url=base\_url, \*\*kw) File "/Users/crifan/.local/share/virtualenvs/AutocarData\-xI\-iqIq4/lib/python3.6/site\-packages/lxml/html/\_\_init\_\_.py", line 765, in document\_fromstring "Document is empty") lxml.etree.ParserError: Document is empty { "exception": "Document is empty", "follows": 0, "logs": "ibs/base\_handler.py\\", line 155, in \_run\_func\\n ret = function(\*arguments\[:len(args) \- 1\])\\n File \\"&lt;autohomeBrandData&gt;\\", line 19, in gradCarHtmlPage\\n File \\"/Users/crifan/.local/share/virtualenvs/AutocarData\-xI\-iqIq4/lib/python3.6/site\-packages/pyspider/libs/response.py\\", line 144, in doc\\n elements = self.etree\\n File \\"/Users/crifan/.local/share/virtualenvs/AutocarData\-xI\-iqIq4/lib/python3.6/site\-packages/pyspider/libs/response.py\\", line 160, in etree\\n self.\_elements = lxml.html.fromstring(self.content)\\n File \\"/Users/crifan/.local/share/virtualenvs/AutocarData\-xI\-iqIq4/lib/python3.6/site\-packages/lxml/html/\_\_init\_\_.py\\", line 876, in fromstring\\n doc = document\_fromstring(html, parser=parser, base\_url=base\_url, \*\*kw)\\n File \\"/Users/crifan/.local/share/virtualenvs/AutocarData\-xI\-iqIq4/lib/python3.6/site\-packages/lxml/html/\_\_init\_\_.py\\", line 765, in document\_fromstring\\n \\"Document is empty\\")\\n lxml.etree.ParserError: Document is empty\\n", "ok": false, "result": null, "time": 0.0005340576171875 }
</code>

此处debug模式，导致后续不继续运行了。

后来又去调试了代码，用如下代码：

```python
#!/usr/bin/env python
# \-\*\- encoding: utf\-8 \-\*\-
# Created on 2018\-04\-27 21:53:02
# Project: autohomeBrandData

from pyspider.libs.base\_handler import \*
import string
import re

class Handler(BaseHandler):
    crawl\_config = {
    }

    # @every(minutes=24 \* 60)
    def on\_start(self):
        for eachLetter in list(string.ascii\_lowercase):
            self.crawl("https://www.autohome.com.cn/grade/carhtml/%s.html" % eachLetter, callback=self.gradCarHtmlPage)

    @catch\_status\_code\_error
    def gradCarHtmlPage(self, response):
        print("gradCarHtmlPage: response=", response)
        picSeriesItemList = response.doc('.rank\-list\-ul li div a\[href\*="/pic/series"\]').items()
        print("picSeriesItemList=", picSeriesItemList)
        # print("len(picSeriesItemList)=%s"%(len(picSeriesItemList)))
        for each in picSeriesItemList:
            self.crawl(each.attr.href, callback=self.picSeriesPage)

    @config(priority=2)
    def picSeriesPage(self, response):
        # &lt;a href="/pic/series\-t/66.html"&gt;查看停产车型&amp;nbsp;&amp;gt;&lt;/a&gt;
        # &lt;a class="ckmore" href="/pic/series/588.html"&gt;查看在售车型&amp;nbsp;&amp;gt;&lt;/a&gt;
        # &lt;span class="fn\-right"&gt;&amp;nbsp;&lt;/span&gt;
        fnRightPicSeries = response.doc('.search\-pic\-tbar .fn\-right a\[href\*="/pic/series"\]')
        print("fnRightPicSeries=", fnRightPicSeries)
        if fnRightPicSeries:
            # hrefValue = fnRightPicSeries.attr.href
            # print("hrefValue=", hrefValue)
            # fullPicSeriesUrl = "https://car.autohome.com.cn" + hrefValue
            fullPicSeriesUrl = fnRightPicSeries.attr.href
            print("fullPicSeriesUrl=", fullPicSeriesUrl)
            self.crawl(fullPicSeriesUrl, callback=self.picSeriesPage)

        # contine parse brand data
        aDictList = \[\]
        # for eachA in response.doc('.breadnav a\[href^="/"\]').items():
        for eachA in response.doc('.breadnav a\[href\*="/pic/"\]').items():
            eachADict = {
                "text" : eachA.text(),
                "href": eachA.attr.href
            }
            print("eachADict=", eachADict)
            aDictList.append(eachADict)

        print("aDictList=", aDictList)

        mainBrandDict = aDictList\[\-3\]
        subBrandDict = aDictList\[\-2\]
        brandSerieDict = aDictList\[\-1\]
        print("mainBrandDict=%s, subBrandDict=%s, brandSerieDict=%s"%(mainBrandDict, subBrandDict, brandSerieDict))

        dtTextList = \[\]
        for eachDt in response.doc("dl.search\-pic\-cardl dt").items():
            dtTextList.append(eachDt.text())

        print("dtTextList=", dtTextList)

        groupCount = len(dtTextList)
        print("groupCount=", groupCount)

        for eachDt in response.doc("dl.search\-pic\-cardl dt").items():
            dtTextList.append(eachDt.text())

        ddUlEltList = \[\]
        for eachDdUlElt in response.doc("dl.search\-pic\-cardl dd ul").items():
            ddUlEltList.append(eachDdUlElt)

        print("ddUlEltList=", ddUlEltList)

        modelDetailDictList = \[\]

        for curIdx in range(groupCount):
            curGroupTitle = dtTextList\[curIdx\]
            print("\-\-\-\-\-\-\[%d\] %s" % (curIdx, curGroupTitle))

            for eachLiAElt in ddUlEltList\[curIdx\].items("li a"):
                # 1. model name
                # curModelName = eachLiAElt.text()
                curModelName = eachLiAElt.contents()\[0\]
                curModelName = curModelName.strip()
                print("curModelName=", curModelName)
                curFullModelName = curGroupTitle + " " + curModelName
                print("curFullModelName=", curFullModelName)

                # 2. model id + carSeriesId + spec url
                curModelId = ""
                curSeriesId = ""
                curModelSpecUrl = ""
                modelSpecUrlTemplate = "https://www.autohome.com.cn/spec/%s/#pvareaid=2042128"
                curModelPicUrl = eachLiAElt.attr.href
                print("curModelPicUrl=", curModelPicUrl)
                #https://car.autohome.com.cn/pic/series\-s32708/3457.html#pvareaid=2042220
                foundModelSeriesId = re.search("pic/series\-s(?P&lt;curModelId&gt;\\d+)/(?P&lt;curSeriesId&gt;\\d+)\\.html", curModelPicUrl)
                print("foundModelSeriesId=", foundModelSeriesId)
                if foundModelSeriesId:
                    curModelId = foundModelSeriesId.group("curModelId")
                    curSeriesId = foundModelSeriesId.group("curSeriesId")
                    print("curModelId=%s, curSeriesId=%s", curModelId, curSeriesId)
                    curModelSpecUrl = (modelSpecUrlTemplate) % (curModelId)
                    print("curModelSpecUrl=", curModelSpecUrl)

                # 3. model status
                modelStatus = "在售"
                foundStopSale = eachLiAElt.find('i\[class\*="icon\-stopsale"\]')
                if foundStopSale:
                    modelStatus = "停售"
                else:
                    foundWseason = eachLiAElt.find('i\[class\*="icon\-wseason"\]')
                    if foundWseason:
                        modelStatus = "未上市"

                modelDetailDictList.append({
                    "url": curModelSpecUrl,
                    "车系ID": curSeriesId,
                    "车型ID": curModelId,
                    "车型": curFullModelName,
                    "状态": modelStatus
                })
        print("modelDetailDictList=", modelDetailDictList)

        allSerieDictList = \[\]
        for curIdx, eachModelDetailDict in enumerate(modelDetailDictList):
            curSerieDict = {
                "品牌": mainBrandDict\["text"\],
                "子品牌": subBrandDict\["text"\],
                "车系": brandSerieDict\["text"\],
                "车系ID": eachModelDetailDict\["车系ID"\],
                "车型": eachModelDetailDict\["车型"\],
                "车型ID": eachModelDetailDict\["车型ID"\],
                "状态": eachModelDetailDict\["状态"\]
            }
            allSerieDictList.append(curSerieDict)
            # print("before send\_message: \[%d\] curSerieDict=%s" % (curIdx, curSerieDict))
            # self.send\_message(self.project\_name, curSerieDict, url=eachModelDetailDict\["url"\])
            print("\[%d\] curSerieDict=%s" % (curIdx, curSerieDict))
            self.crawl(eachModelDetailDict\["url"\], callback=self.carModelSpecPage, save=curSerieDict)

        # print("allSerieDictList=", allSerieDictList)
        # return allSerieDictList

    #def on\_message(self, project, msg):
    #    print("on\_message: msg=", msg)
    #    return msg

    @catch\_status\_code\_error
    def carModelSpecPage(self, response):
        print("carModelSpecPage: response=", response)
        # https://www.autohome.com.cn/spec/32708/#pvareaid=2042128
        curSerieDict = response.save
        print("curSerieDict", curSerieDict)

        # cityDealerPriceInt = 0
        # cityDealerPriceElt = response.doc('.cardetail\-infor\-price #cityDealerPrice span span\[class\*="price"\]')
        # print("cityDealerPriceElt=%s" % cityDealerPriceElt)
        # if cityDealerPriceElt:
        #     cityDealerPriceFloatStr = cityDealerPriceElt.text()
        #     print("cityDealerPriceFloatStr=", cityDealerPriceFloatStr)
        #     cityDealerPriceFloat = float(cityDealerPriceFloatStr)
        #     print("cityDealerPriceFloat=", cityDealerPriceFloat)
        #     cityDealerPriceInt = int(cityDealerPriceFloat \* 10000)
        #     print("cityDealerPriceInt=", cityDealerPriceInt)

        msrpPriceInt = 0
        # body &gt; div.content &gt; div.row &gt; div.column.grid\-16 &gt; div.cardetail.fn\-clear &gt; div.cardetail\-infor &gt; div.cardetail\-infor\-price.fn\-clear &gt; ul &gt; li.li\-price.fn\-clear &gt; span
        # 厂商指导价=厂商建议零售价格=MSRP=Manufacturer's suggested retail price
        msrpPriceElt = response.doc('.cardetail\-infor\-price li\[class\*="li\-price"\] span\[data\-price\]')
        print("msrpPriceElt=", msrpPriceElt)
        if msrpPriceElt:
            msrpPriceStr = msrpPriceElt.attr("data\-price")
            print("msrpPriceStr=", msrpPriceStr)
            foundMsrpPrice = re.search("(?P&lt;msrpPrice&gt;\[\\d\\.\]+)万元", msrpPriceStr)
            print("foundMsrpPrice=", foundMsrpPrice)
            if foundMsrpPrice:
                msrpPrice = foundMsrpPrice.group("msrpPrice")
                print("msrpPrice=", msrpPrice)
                msrpPriceFloat = float(msrpPrice)
                print("msrpPriceFloat=", msrpPriceFloat)
                msrpPriceInt = int(msrpPriceFloat \* 10000)
                print("msrpPriceInt=", msrpPriceInt)

        # curSerieDict\["经销商参考价"\] = cityDealerPriceInt
        curSerieDict\["厂商指导价"\] = msrpPriceInt

        return curSerieDict
```

运行后，点击导出的csv：

![](https://www.crifan.com/files/pic/uploads/2018/09/1f92e5a5edf81b634b1f8de6e9de9e06.png)

保存出如下结果：

![](https://www.crifan.com/files/pic/uploads/2018/09/b831b733455df8f05f3e3468e4e5ae0f.png)

![](https://www.crifan.com/files/pic/uploads/2018/09/658f891915e05160efa775955ea833e9.png)

转载请注明：[在路上](https://www.crifan.com) » [【已解决】写Python爬虫爬取汽车之家品牌车系车型数据](https://www.crifan.com/use_pyspider_to_crawl_autohome_car_brand_serial_model_data/)
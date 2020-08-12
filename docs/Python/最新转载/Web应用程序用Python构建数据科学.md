---
title : Web应用程序用Python构建数据科学
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-05 00:37:15 +0800
categories:
 -
tags:
 -
---
[[toc]]

作为一名数据科学家或机器学习工程师，能够部署我们的数据科学项目是很重要的。传统的使用Django或Flask这样的框架来部署机器学习模型可能是一项艰巨和耗时的任务。

本文将展示如何使用 *streamlit* python库快速构建一个简单的数据驱动web应用程序，只需几行代码。

## **我们正在构建的股票网络应用程序概述**

今天，我们将构建一个简单的web应用程序来显示股票价格和成交量。这将需要使用两个Python库，即streamlit和yfinance。

从概念上讲，该应用程序将从雅虎检索历史市场数据，从yfinance库得到资金信息。此数据保存到dataframe中，streamlit将使用此数据作为输入参数，以便将其显示为折线图。

## **安装必备库**

在本教程中，我们将使用两个需要安装的Python库。其中包括streamlit和yfinance。你可以通过下面的pip install命令轻松完成此操作，以安装streamlit：

```
pip install streamlit
```

对yfinance也执行相同的操作，如下所示：

```
pip install yfinance
```

## **web应用程序的代码**

让我们看看我们今天正在构建的web应用程序的代码。你会发现只有不到20行代码（也就是说，如果不计算注释的话，那就把代码缩减到14行，其中3行是出于美观目的的空行）。

```
import yfinance as yfimport streamlit as stst.write("""# 简单的股票价格AppShown are the stock closing price and volume of Google!""")# https://towardsdatascience.com/how-to-get-stock-data-using-python-c0de1df17e75# 定义股票代码tickerSymbol = 'GOOGL'# 获取这个股票的数据tickerData = yf.Ticker(tickerSymbol)# 为这个股票得到历史价格tickerDf = tickerData.history(period='1d', start='2010-5-31', end='2020-5-31')st.line_chart(tickerDf.Close)st.line_chart(tickerDf.Volume)
```

## **代码的逐行解释**

让我们花点时间来理解上面的代码。

*   1和2行

导入yfinance并赋其yf的别名，导入streamlit并赋其st的别名。

*   4\-7行

使用st.write()函数打印输出文本。这些打印出来的文本是用markdown格式写的。

*   9\-16行使用yfinance库从雅虎检索历史市场数据。第11行\-将股票代码定义为GOOGL。第13行\-使用yf.Ticker()函数，顾名思义，允许访问股票代码数据。需要注意的是，tickerData是一个tickerData对象，如果我们将tickerData作为一个命令运行，我们将得到以下输出yfinance.Ticker object <GOOGL>。第15行\-创建tickerDf数据帧并定义日期范围（从2010年5月31日到2020年5月31日）和时间段（1天）。

![Web应用程序用Python构建数据科学](http://p1-tt.byteimg.com/large/pgc-image/26235cc339a94b6d8d3d53e5d3266b78?from=pc)

*   18\-19行

使用st.line\_chart()函数绘制折线图（使用第15行定义 *Close* 和 *Volume* 列的收盘价）。

## **运行web应用程序**

将代码保存到名为我的app.py，启动命令提示符（或Microsoft Windows中的Power Shell）并运行以下命令：

```
streamlit run myapp.py
```

接下来，我们将看到以下消息：

```
> streamlit run myapp.pyYou can now view your Streamlit app in your browser.Local URL: http://localhost:8501Network URL: http://10.0.0.11:8501
```

在短时间内，将弹出一个internet浏览器窗口，并将你引导到已创建的web应用程序 ***http://localhost*** :8501，如下所示。

![Web应用程序用Python构建数据科学](http://p1-tt.byteimg.com/large/pgc-image/35c2f9a1f5b14e07bd171db5481659e0?from=pc)

你已经用Python创建了第一个web应用程序！

## **定制web应用程序**

好吧，你可能想定制这个web应用程序的界面，请看如下代码。

```
import yfinance as yfimport streamlit as stst.write("""# Simple Stock Price AppShown are the stock **closing price** and ***volume*** of Google!""")# https://towardsdatascience.com/how-to-get-stock-data-using-python-c0de1df17e75# 定义股票代码tickerSymbol = 'GOOGL'# 获取这个股票的数据tickerData = yf.Ticker(tickerSymbol)# 为这个股票得到历史价格tickerDf = tickerData.history(period='1d', start='2010-5-31', end='2020-5-31')st.write("""## Closing Price""")st.line_chart(tickerDf.Close)st.write("""## Volume""")
```

让我们花点时间来理解上面的代码。

*   第6行

请注意，我们将“closing price”加粗。还请注意，我们通过在单词前面和后面使用三个星号使单词“volume”既粗体又斜体。

*   18\-20行和22\-25行

在这里，我们在收盘价和成交量图之前添加了一个markdown格式的标题。

![Web应用程序用Python构建数据科学](http://p6-tt.byteimg.com/large/pgc-image/691fe25360814f3e84ac0e540b0053b0?from=pc)

现在我们有了一个更新的网络应用程序。
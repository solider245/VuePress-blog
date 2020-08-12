---
title : 使用Python和Vue.js自动化报告过程
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-12 01:26:14 +0800
categories:
 -
tags:
 -
---
[[toc]]

如果您的组织既没有Tableau或PowerBI这样的数据可视化解决方案，也没有托管服务器来部署Dash这样的开源解决方案的服务器，那么您可能就无法使用Excel进行报告或导出笔记本。

在本文中，我将为您提供一个示例，说明如何使用Python和Vue.js生成报告并通过电子邮件将其发送给涉众。

---

## 过程概述

首先，让我们从全局的角度来看我们正在尝试实现自动化的过程。 报告过程通常包括：

1.  从一个或多个来源提取数据
2.  使用新数据更新模板报告
3.  向利益相关者发送通知或新创建的报告

我们将创建一个 **HTML文件** 将包含我们的报告的模板，然后使用python和 **Jinja2的图书馆** ，我们打算 将数据注入到我们的模板来创建我们报告的一个实例作为静态HTML文件。 最后，我们将通过电子邮件发送静态HTML文件。

---

## 要求

在开始之前，您需要安装 **Python 3.7** 或更高版本以及 **google帐户** 。 最终报告正在使用某些 旧浏览器不支持的 [ES6功能](https://www.w3schools.com/js/js_es6.asp) ，因此请确保使用 **现代Web浏览器** 。 最后，我们将使用 **jinja2库，** 因此您需要使用进行安装 `pip install Jinja2` 。

---

## 创建模板引擎

首先，我们创建一个脚本，该脚本将允许我们输入模板位置，目标位置和数据，并将文件输出到指定的目标位置，并在其中插入数据。 我创建了一个 **DefaultTemplater类** ，**该类** 将过程包装在此处。
```python
from dataclasses import dataclass
from typing import Dict
from jinja2 import Template


@dataclass
class DefaultTemplater(object):
    """ Allow to inject data in a jinja2 templated file and write the result to specified destination """

    source: str
    destination: str

    def render(self, data: Dict) -> None:
        """ Write template from source filled with data to destination
        Args:
        data: the data to inject in the template 
        """
        self.load_template()
        filled_template = self.replace(data)
        self.write_filled_template(filled_template)

    def load_template(self) -> None:
        """ Load template from source
        """
        with open(self.source, "r") as f:
            self.template = f.read()

    def replace(self, values: Dict) -> str:
        """ Replace tag in template with values
        Args: 
        values: dict with key: tag to search in template, value: value to replace the tag
        """
        template = Template(self.template)
        templated = template.render(**values)
        return templated

    def write_filled_template(self, content: str):
        """Write the result of the template and injected value to destination
        Args:
        content: what to write
        """
        with open(self.destination, "w") as f:
            f.write(content)
```

使用jinja2实现模板引擎。

该 **DefaultTemplater类** 与模板位置和输出目的地创建。 这里的重要部分是replace方法，它使用 **jinja2中** 的**Template类** 在**模板** 中搜索标签。 标签是在模板文件中创建的名为标记的标记，告诉jinja2将标记替换为某些值。 让我们测试一下脚本。

*   创建一个文本文件，并在其中放置一个标签： `{{test}}`
*   创建一个 **app.py** python文件并复制/粘贴下面的代码

```python
 from templater import DefaultTemplater
 
 templater = DefaultTemplater("<your_path>.txt", "templated.txt")
 tag = {"test": "Hello world"}
 templater.render(tag)
 ```

测试DefaultTemplater类。

*   用文本文件路径更改<you\_path>；
*   运行app.py文件
*   查看templated.txt，您应该看到标记 `{{test}}` 已被Hello world取代。

现在我们的模板引擎已经准备就绪，我们需要创建报告的模板。

---

## 使用Vue.js创建报告的模板

在这一部分中，我们将使用Vue.js框架创建一个HTML页面。 它将显示代表一些假销售的基本条形图。

如果您不知道Vue.js是什么，我建议您去阅读一下 很棒 的 [官方网站](https://vuejs.org/) 。 基本上，它是一个渐进式javascript框架，这意味着您不会被迫使用Webpack，npm等构建工具。 在我们的示例中，我们将简单地通过将Vue添加到脚本标签中来使用它。 此外，Vue简化了与 [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) 交互的工作流程 。

最后，我们将使用一些特定于Vue的库：

*   [Vuetify](https://vuetifyjs.com/fr-FR/) ：它将使我们可以立即使用其材料设计组件。 我们将做一些配置以使页面看起来不错。
*   [v\-chart](https://v-charts.js.org/#/en/) ：围绕 [Apache Echarts的](https://echarts.apache.org/en/index.html) 包装器库 ，这将使我们的生活更轻松地创建交互式图表。

现在，我们对工具进行了概述，让我们创建一个 **template.html** 文件：
```html
<!DOCTYPE html>
<html>
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
</head>

<body>

    <div id="app">
        <!-- Vue app-->

        <v-app>
            <v-content>
                <v-app-bar color="indigo" dense dark app clipped-left>
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>
                    <v-toolbar-title>Sales report ${date}</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-app-bar>
                <v-container fluid>
                    <v-row>
                        <v-col>
                            <v-card>
                                <v-toolbar dense flat>
                                    <v-toolbar-title>Sales per country</v-toolbar-title>
                                </v-toolbar>
                                <v-card-title>
                                </v-card-title>
                                <ve-histogram :data="chartData" :settings="chartSettings">
                                </ve-histogram>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-content>
        </v-app>

    </div>



    <!-- loading dependencies -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/4.8.0/echarts.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuetify@2.2.6/dist/vuetify.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/v-charts@1.19.0/lib/index.min.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/v-charts/lib/style.min.css">

    <script>
        const app = new Vue({
            el: '#app',
            vuetify: new Vuetify(),
            delimiters: ['${', '}'],
            data() {
                return {
                    date: {{date}},
                    chartSettings: {
                        dimension: {{dimension}},
                        metrics: {{metrics}}
                    },
                    chartData: {
                        columns: {{columns}},
                        rows: {{rows}}
                    }

                }
            }
        })
    </script>
</body>

</html>
```

用于创建简单销售直方图的模板。

该模板非常基本：

1.  我们首先加载一些CSS样式（第3至6行）；
2.  在主体中，我们创建一个div标签，该标签将托管我们的Vue应用（第11行）；
3.  在div内部，我们使用Vuetify组件；
4.  我们绑定ve直方图组件的数据值和settings属性（第30行）。 这意味着对chartData和chartSetting所做的任何更改都将传播。
5.  我们加载库Vue，Vuetify和Echarts（第44\-50行）；
6.  最后，在最后一个脚本标签（第52–72行）中包含我们的Vue应用程序。 Vue应用程序由数据函数组成，该函数返回一些我们可以在HTML部分中使用的属性。 我们定义了3个用于HTML的对象，一个用于显示日期，一个用于图表数据，一个用于图表设置。 我们将jinja2标记附加到这3个对象中的每一个上，以便我们的python脚本将其替换为真实数据。

如果您不熟悉Java，HTML等前端技术，则可能很难理解代码。 在本文中，我不会深入探讨Vue.js机制， [官方教程](https://vuejs.org/v2/guide/) 是一个很好的起点。 因此，如果您在理解代码时遇到问题，请务必仔细阅读。

现在，让我们编写代码以发送带有附件的电子邮件。

---

## 创建代码以发送带有附件的电子邮件

在此示例中，我将使用Gmail。 为了通过脚本与Gmail进行交互，您需要配置Google帐户。 幸运的是，有一篇很棒的媒体文章将引导您完成如何配置您的Google帐户。



## 在Python中使用Gmail自动发送电子邮件

### 用几行代码发送电子邮件

#### endingdatascience.com

[](https://towardsdatascience.com/automate-sending-emails-with-gmail-in-python-449cc0c3c317)

我们可以使用 [**yagmail库**](https://github.com/kootenpv/yagmail) 的故事向我们展示了在第一部分，但是在测试它，它是不可能发送HTML扩展文件作为附件见GitHub的问题 [在这里](https://github.com/kootenpv/yagmail/issues/169) 。

因此，我们需要创建一个脚本来发送带有标准库的电子邮件，因为相关故事在第二部分中向我们展示。 我从故事作者提供的代码开始，并将其包装到一个类中。 结果如下：
```python
from dataclasses import dataclass
import smtplib 
from email.mime.multipart import MIMEMultipart 
from email.mime.text import MIMEText 
from email.mime.base import MIMEBase 
from email import encoders

@dataclass
class Gmail(object):
    """Wrapper class to send emails from gmail account"""
    from_addr:str
    password:str
    server:smtplib.SMTP = smtplib.SMTP('smtp.gmail.com', 587)

    def __post_init__(self):
        """Called once new object is created"""
        self.login()
    
    def  __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, exc_traceback):
        self.close()

    def login(self):
        """Login into gmail server"""
        self.server.starttls()
        self.server.login(self.from_addr, self.password)
    
    def send(self, to_addr:str, subject:str,body:str,attachment:str=None):
        """Send an email using"""
        self.msg = MIMEMultipart() 
        self.msg['From'] = self.from_addr 
        self.msg['To'] = to_addr 
        self.msg['Subject'] = subject
        self.msg.attach(MIMEText(body, 'plain'))
        if attachment:
            payload = self.create_attachement(attachment)
            self.msg.attach(payload)
        text = self.msg.as_string()
        self.server.sendmail(self.from_addr, to_addr, text) 
    
    def create_attachement(self, path:str):
        with open(path,'rb') as f:
            content = f.read() 
            p = MIMEBase('application', 'octet-stream') 
            p.set_payload(content) 
            encoders.encode_base64(p)
            p.add_header('Content-Disposition', "attachment; filename= %s" % f.name)
        return p
    
    def close(self):
        self.server.quit()
```


包装库类围绕标准库的电子邮件实用程序。

创建新对象时 ， **Gmail类** 将使用提供的凭据连接到Gmail SMTP服务器。 可以使用上下文管理器作为 实现 **\_\_enter\_\_** 和 **\_\_exit\_\_的** 特殊方法 。 最后，send方法允许我们发送带有或不带有附件的电子邮件。

既然我们已经编写了Gmail类，那么让我们将所有组件放在一起使用以自动完成报告过程。

---

## 将所有内容放在一起以创建最终报告

在此示例中，我将仅使用字典列表作为报告数据。 但是，它可能是从SQL数据库中获取数据的熊猫数据框。 因此，让我们看一下将使我们能够自动执行报告的最终代码。 您需要输入Google凭据才能正常工作。

最终代码可自动执行报告过程。

启动脚本，如果您转到Gmail帐户，则可以通过在“电子邮件已发送”部分中查看该电子邮件已发送。 如果 **下载** 附件中**的report.html** 并使用chrome打开它，则应该看到以下内容：
```python
from templater import DefaultTemplater
from senders import Gmail

if __name__ == "__main__":

    templater = DefaultTemplater("template.html", "report.html")
    rows = [
        {
            "turnover": 1607.2,
            "quantity": 49,
            "country": "Germany",
        },
        {
            "turnover": 281.6,
            "quantity": 16,
            "country": "Portugal",
        },
        {
            "turnover": 7.3,
            "quantity": 1,
            "country": "Spain",
        },
        {
            "turnover": 35.0,
            "quantity": 5,
            "country": "France",
        },
    ]
    columns = list(rows[0].keys())
    metrics = ["quantity", "turnover"]
    dimension = ["country"]
    tags = {
        "date": "'August 2020'",
        "metrics": metrics,
        "dimension": dimension,
        "rows": rows,
        "columns": columns
    }
    templater.render(tags)

    with Gmail('youremail@gmail.com','your_password') as gmail:
        gmail.send('to_addr@xxx.com',subject='your subject',body='your message', attachment="report.html")

```






![Image for post](https://miro.medium.com/max/3756/1*-JbMOB3ZA9SfCl3U68riSg.png)

使用脚本创建的销售报告。

多亏了 **Python和Vue.js，** 我们能够生成一个非常简单的直方图，但是更重要的是，我们已经配置了一些基础知识来实现​​报告过程的自动化。

---

## 然后去哪儿？

现在已经建立了基础，您可以改进模板以使报表看起来更大。 例如，您可以使用E [图表](https://echarts.apache.org/en/index.html) 库中的 高级功能 在报表中实现向下追溯功能。



![图片发布](https://miro.medium.com/max/596/1*tvtxJpxS0vCh5mcoWjJhgQ.gif)

![Image for post](https://miro.medium.com/max/1192/1*tvtxJpxS0vCh5mcoWjJhgQ.gif)

向下钻取向上功能。

如果您不熟悉javascript或HTML之类的网络技术，则必须学习它们才能生成高级报告。 但是，一旦了解到，自定义报告就成为了限制，尤其要感谢丰富的javascript生态系统。

---

## 缺点和其他考虑

在结束这个故事之前，我想提请注意一些重要的观点。 首先，由于Web [浏览器的可用内存](https://stackoverflow.com/questions/30194088/do-javascript-variables-have-a-storage-limit#:~:text=There%20isn't%20such%20a,you'll%20encounter%20strange%20behaviour.&text=The%20limit%20depends%20on%20the%20available%20memory%20of%20the%20browser.) 和电子邮件大小 的限制，此处介绍的报告解决方案旨在显示少量数据 。

其次，请注意，报告中随附了注入的数据，因此在开始使用这种解决方案之前，请确保对数据保密。

最后，始终喜欢使用由团队或公司推动的解决方案。

---

## 结论

作为数据分析师，我的日常工作涉及报告任务，以便就关键业务指标进行交流。 能够使其中一些自动化使我节省了大量时间，尽管我花了一些时间进行设置。

我希望您喜欢阅读这篇文章并学到一些有用的东西。 任何建设性的反馈，建议或代码改进将不胜感激。 感谢您的阅读。
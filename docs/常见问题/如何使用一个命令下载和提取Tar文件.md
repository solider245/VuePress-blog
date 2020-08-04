---
title : 如何使用一个命令下载和提取Tar文件
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-04 14:53:24 +0800
categories:
 -
tags:
 -
---
[[toc]]
**Tar** （ **磁带存档** ）是Linux中一种流行的文件归档格式。 它可以与gzip（tar.gz）或bzip2（tar.bz2）一起使用进行压缩。 它是使用最广泛的命令行实用程序，用于创建压缩的存档文件（程序包，源代码，数据库等等），这些文件可以轻松地从计算机传输到另一个文件或通过网络传输。

**另请参阅** ： [Linux中的18个Tar命令示例](https://www.tecmint.com/18-tar-command-examples-in-linux/)

在这篇文章中，我们将告诉你如何下载使用两个众所周知的tar归档 [命令行下载程序](https://www.tecmint.com/linux-command-line-tools-for-downloading-files/) \- [wget的](https://www.tecmint.com/10-wget-command-examples-in-linux/) 或 **卷曲** ，使用一个单一命令提取它们。

### 如何使用Wget命令下载和提取文件

以下示例显示了如何 在当前目录中 下载最新的 **GeoLite2国家** （**地区）** 数据库（由 **GeoIP Nginx** 模块使用）并 解压缩 。

\# wget \-c http://geolite.maxmind.com/download/geoip/database/GeoLite2\-Country.tar.gz \-O \- | tar \-xz

[![使用Wget下载并解压缩文件](https://www.tecmint.com/wp-content/uploads/2017/11/Download-and-Extract-File-with-Wget.png)

![Download and Extract File with Wget](https://www.tecmint.com/wp-content/uploads/2017/11/Download-and-Extract-File-with-Wget.png)

](https://www.tecmint.com/wp-content/uploads/2017/11/Download-and-Extract-File-with-Wget.png)

使用Wget下载并解压缩文件

wget选项 `-O` 指定一个文档要写入的文件，这里我们使用 `-` ，这意味着它将被写入标准输出并通过管道传输到tar，而tar标志 `-x` 可以提取存档文件并 `-z` 解压缩由gzip创建的压缩存档文件。

要提取 [tar文件到指定的目录](https://www.tecmint.com/extract-tar-files-to-specific-or-different-directory-in-linux/) ， **在/ etc / nginx的/** 在这种情况下，包括使用 `-C` 标志，如下所示。

**注意** ：如果将文件解压缩到需要root权限的特定目录，请使用 [sudo命令](https://www.tecmint.com/su-vs-sudo-and-how-to-configure-sudo-in-linux/) 运行tar。

$ sudo wget \-c http://geolite.maxmind.com/download/geoip/database/GeoLite2\-Country.tar.gz \-O \- | sudo tar \-xz \-C /etc/nginx/

[![下载文件并将其提取到目录](https://www.tecmint.com/wp-content/uploads/2017/11/Download-and-Extract-File-to-Directory.png)

![Download and Extract File to Directory](https://www.tecmint.com/wp-content/uploads/2017/11/Download-and-Extract-File-to-Directory.png)

](https://www.tecmint.com/wp-content/uploads/2017/11/Download-and-Extract-File-to-Directory.png)

下载文件并将其提取到目录

或者，您可以使用以下命令，在这里，归档文件将在您解压缩之前下载到您的系统上。

$ sudo wget \-c http://geolite.maxmind.com/download/geoip/database/GeoLite2\-Country.tar.gz && tar \-xzf  GeoLite2\-Country.tar.gz

要将压缩的存档文件提取到特定目录，请使用以下命令。

$ sudo wget \-c http://geolite.maxmind.com/download/geoip/database/GeoLite2\-Country.tar.gz && sudo tar \-xzf  GeoLite2\-Country.tar.gz \-C /etc/nginx/

### 如何使用cURL命令下载和提取文件

考虑前面的示例，这就是使用cURL在当前工作目录中下载和解压缩归档文件的方式。

$ sudo curl http://geolite.maxmind.com/download/geoip/database/GeoLite2\-Country.tar.gz | tar \-xz

[![使用cURL下载并提取文件](https://www.tecmint.com/wp-content/uploads/2017/11/Download-and-Extract-File-with-cURL.png)

![Download and Extract File with cURL](https://www.tecmint.com/wp-content/uploads/2017/11/Download-and-Extract-File-with-cURL.png)

](https://www.tecmint.com/wp-content/uploads/2017/11/Download-and-Extract-File-with-cURL.png)

使用cURL下载并提取文件

要在下载时将文件提取到其他目录，请使用以下命令。

$ sudo curl http://geolite.maxmind.com/download/geoip/database/GeoLite2\-Country.tar.gz | sudo tar \-xz  \-C /etc/nginx/
OR
$ sudo curl http://geolite.maxmind.com/download/geoip/database/GeoLite2\-Country.tar.gz && sudo tar \-xzf GeoLite2\-Country.tar.gz \-C /etc/nginx/

就这样！ 在这份简短但有用的指南中，我们向您展示了如何通过一个命令下载和提取存档文件。 如有任何疑问，请使用下面的评论部分与我们联系。
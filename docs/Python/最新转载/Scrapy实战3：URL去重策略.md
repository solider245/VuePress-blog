---
title : Scrapy实战3：URL去重策略
description : 简单介绍了几种url去重的办法
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-09 22:11:36 +0800
categories:
 -
tags:
 -
---
[[toc]]
### **一、前言**

今天给大家分享的是，Python爬虫里url去重策略及实现。

### **二、url去重及策略简介**

##### **1.url去重**

    从字面上理解，url去重即去除重复的url,在爬虫中就是去除已经爬取过的url,避免重复爬取，既影响爬虫效率，又产生冗余数据。

##### **2.url去重策略**

    从表面上看，url去重策略就是消除url重复的方法，常见的url去重策略有五种，如下：

\# 1.将访问过的ur保存到数据库中
# 2.将访问过的ur保存到set(集合)中,只需要o(1)的代价就可以查询url
#       10000000\*2byte\*50个字符/1024/1024/1024=9G
# 3.url经过md5等方法哈希后保存到set中
# 4.用 bitmap方法,将访问过的ur通过hash函数映射到某一位
# 5. bloomfilter方法对 bitmap进行改进,多重hash函数降低冲突

### **三、看代码，边学边敲边记url去重策略**

###### **1.将访问过的ur保存到数据库中（初学使用）**

实现起来最简单，但效率最低。 其核心思想是，把页面上爬取到的每个 `url`存储到数据库，为了避免重复，每次存储前都要遍历查询数据库中是否已经存在当前`url`（即是否已经爬取过了）,若存在，则不保存，否则，保存当前`url`,继续保存下一条，直至结束。

###### **2.将访问过的ur保存到set内存中**

将访问过的ur保存到set中,只需要o(1)的代价就可以查询url，取url方便快速，基本不用查询，但是随着存储的url越来越多，占用内存会越来越大。

\# 简单计算：假设有1亿条url,每个url平均长度为50个字符，python里unicode编码，每个字符16位，占2
# 个字节（byte）
# 计算式：10^8 x 50个字符 x 2个byte / 1024 / 1024 / 1024 = 9G
#                                    B      M      G
如果是亿个url,那么占用内存将达G，也不是特别方便，适合小型爬虫。

###### **3.url经过md5缩减到固定长度**

'''
简单计算：一个url经MD5转换，变成一个128bit(位)的字符串，占16byte(字节)，方法二中一个url保守
估计占50个字符 x 2 = 100byte(字节)，
计算式： 这样一比较，MD5的空间节省率为：（100\-16）/100 = 84%（相比于方法二）
(Scrapy框架url去重就是采用的类似方法)
'''
# 维基百科看MD5算法
'''
MD5概述
设计者 : 罗纳德·李维斯特
首次发布 : 1992年4月
系列 : MD, MD2, MD3, MD4, MD5
编码长度 : 128位
结构 :　Merkle–Damgård construction
    MD5消息摘要算法（英语：MD5 Message\-Digest Algorithm），一种被广泛使用的密码散列函数，可
以产生出一个128位（16字节）的散列值（hash value），用于确保信息传输完整一致。MD5由美国密码学家
罗纳德·李维斯特（Ronald Linn Rivest）设计，于1992年公开，用以取代MD4算法。这套算法的程序在
RFC 1321 中被加以规范。
将数据（如一段文字）运算变为另一固定长度值，是散列算法的基础原理。
'''

MD5使用实例：

\# 在python3中使用hashlib模块进行md5操作
import hashlib

# 待加密信息
str01 = 'This is your md5 password!'
# 创建md5对象
md5\_obj = hashlib.md5()
# 进行MD5加密前必须 encode(编码)，python里默认是unicode编码，必须转换成utf\-8
# 否则报错：TypeError: Unicode\-objects must be encoded before hashing
md5\_obj.update(str01.encode(encoding='utf\-8'))

print('XksA的原话为 ：' + str01)
print('MD5加密后为 ：' + md5\_obj.hexdigest())

# result　：
#        XksA的原话为 ：This is your md5 password!
#        MD5加密后为 ：0a5f76e7b0f352e47fed559f904c9159

###### **4.用 bitmap方法,将访问过的ur通过hash函数映射到某一位**

'''
实现原理：通过hash函数，将每个url映射到一个hash位置中，一个hash位可以只占用一个bit(位)大小，那
么相对于方法三：一个url占128bit(位)，hash函数法的空间节省成百倍增长。
计算式：这样一比较，bitmap方法的空间节省率为：
（128\-1）/128= 99.2%(相比于方法三)
（100 \* 8 \- 1）/（100\*8）= 99.88%（相比于方法一）
                       ##   (缺点：容易产生冲突)  ##
'''
# 维基百科看Hash 函数
'''
hash函数：
散列函数（英语：Hash function）又称散列算法、哈希函数，是一种从任何一种数据中创建小的数字“指纹”
的方法。散列函数把消息或数据压缩成摘要，使得数据量变小，将数据的格式固定下来。该函数将数据打乱混
合，重新创建一个叫做散列值（hash values，hash codes，hash sums，或hashes）的指纹。散列值通常
用一个短的随机字母和数字组成的字符串来代表。好的散列函数在输入域中很少出现散列冲突。在散列表和数
据处理中，不抑制冲突来区别数据，会使得数据库记录更难找到。
'''

###### **5.bloomfilter方法对 bitmap进行改进,多重hash函数降低冲突**

\# 维基百科看Bloomfilter
'''
# 基本概述
   如果想判断一个元素是不是在一个集合里，一般想到的是将集合中所有元素保存起来，然后通过比较确定。
链表、树、散列表（又叫哈希表，Hash table）等等数据结构都是这种思路。但是随着集合中元素的增加，
我们需要的存储空间越来越大。同时检索速度也越来越慢，上述三种结构的检索时间复杂度分别为：
                            O(n),O(log n),O(n/k)
# 原理概述
   布隆过滤器的原理是，当一个元素被加入集合时，通过K个散列函数将这个元素映射成一个位数组中的K个
点，把它们置为1。检索时，我们只要看看这些点是不是都是1就（大约）知道集合中有没有它了：如果这些点
有任何一个0，则被检元素一定不在；如果都是1，则被检元素很可能在。这就是布隆过滤器的基本思想。
# 优缺点
    布隆过滤器可以用于检索一个元素是否在一个集合中。
    优点是空间效率和查询时间都远远超过一般的算法。
    缺点是有一定的误识别率和删除困难。
'''
# Bloomfilter介绍还可以看这里：https://blog.csdn.net/preyta/article/details/72804148

Bloomfilter底层实现：

```py
# 源码地址：https://github.com/preytaren/fastbloom/blob/master/fastbloom/bloomfilter.py
import math
import logging
import functools

import pyhash

from bitset import MmapBitSet
from hash_tools import hashes


class BloomFilter(object):
    """
    A bloom filter implementation,
    which use Murmur hash and Spooky hash
    """
    def __init__(self, capacity, error_rate=0.0001, fname=None,
                 h1=pyhash.murmur3_x64_128(), h2=pyhash.spooky_128()):
        """
        :param capacity: size of possible input elements
        :param error_rate: posi
        :param fname:
        :param h1:
        :param h2:
        """
        # calculate m & k
        self.capacity = capacity
        self.error_rate = error_rate
        self.num_of_bits, self.num_of_hashes = self._adjust_param( * ,
                                                                  error_rate)
        self._fname = fname
        self._data_store = MmapBitSet(self.num_of_bits)
        self._size = len(self._data_store)
        self._hashes = functools.partial(hashes, h1=h1, h2=h2, number=self.num_of_hashes)

    def _adjust_param(self, bits_size, expected_error_rate):
        """
        adjust k & m through 4 steps:
        1. Choose a ballpark value for n
        2. Choose a value for m
        3. Calculate the optimal value of k
        4. Calculate the error rate for our chosen values of n, m, and k.
           If it's unacceptable, return to step 2 and change m;
           otherwise we're done.
        in every loop, m = m * 2
        :param bits_size:
        :param expected_error_rate:
        :return:
        """
        n, estimated_m, estimated_k, error_rate = self.capacity, int(bits_size / ), None, 
        weight, e = math.log(), math.exp()
        while error_rate > expected_error_rate:
            estimated_m *= 
            estimated_k = int((float(estimated_m) / n) * weight) + 
            error_rate = ( - math.exp(- (estimated_k * n) / estimated_m)) ** estimated_k
            logging.info(estimated_m, estimated_k, error_rate)
        return estimated_m, estimated_k

    def add(self, msg):
        """
        add a string to bloomfilter
        :param msg:
        :return:
        """
        if not isinstance(msg, str):
            msg = str(msg)
        positions = []
        for _hash_value in self._hashes(msg):
            positions.append(_hash_value % self.num_of_bits)
        for pos in sorted(positions):
            self._data_store.set(int(pos))

    @staticmethod
    def open(self, fname):
        with open(fname) as fp:
            raise NotImplementedError

    def __str__(self):
        """
        output bitset directly
        :return:
        """
        pass

    def __contains__(self, msg):
        if not isinstance(msg, str):
            msg = str(msg)
        positions = []
        for _hash_value in self._hashes(msg):
            positions.append(_hash_value % self.num_of_bits)
        for position in sorted(positions):
            if not self._data_store.test(position):
                return False
        return True

    def __len__(self):
        return self._size
```
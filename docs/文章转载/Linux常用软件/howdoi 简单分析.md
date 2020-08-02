---
title : howdoi 简单分析
description : 
author : 中箭的吴起
image : 
date : 2020-08-02 08:02:01 +0800
categories:
 -
tags:
 -
---
对[howdoi](https://github.com/gleitz/howdoi)的一个简单分析。

曾经看到过下面的这样一段js代码：

```javascript
try{
    doSth();
}
catch (e){
    ask_url = "https://stackoverflow.com/search?q="
    window.location.href= ask_url + encodeURIComponent(e)
}

```

`howdoi`基本就是把这个流程做成了Python脚本。其基本流程如下：

*   step1：利用site语法组装搜索语句(默认指定搜索stackoverflow网站)
*   step2:利用google搜索接口获取搜索引擎第一页排名第一的连接
*   step3：访问该链接，根据排名从高倒下，提取代码块文本
*   step4：提取到就显示到终端，没有提取到就提示未找到答案

当然，`howdoi`也作了一些其他的工作：

*   代理设置
*   既往问题进行缓存，提高下次查询的速度
*   查询的目标网站可配置
*   做成Python script脚本命令，方便快捷
*   代码高亮格式化输出

更多分析请看代码注释：

```python
!/usr/bin/env python

######################################################
#
# howdoi - instant coding answers via the command line
# written by Benjamin Gleitzman (gleitz@mit.edu)
# inspired by Rich Jones (rich@anomos.info)
#
######################################################

import argparse #用于获取脚本命令行参数
import glob
import os
import random
import re
import requests #用于发送http(s)请求
import requests_cache
import sys
from . import __version__
#用于控制台彩色高亮格式化输出
from pygments import highlight
from pygments.lexers import guess_lexer, get_lexer_by_name
from pygments.formatters.terminal import TerminalFormatter
from pygments.util import ClassNotFound
# 用于网页解析
from pyquery import PyQuery as pq

from requests.exceptions import ConnectionError
from requests.exceptions import SSLError

# 兼容Python2.x和Python3.x的库
if sys.version < '3':
    import codecs
    from urllib import quote as url_quote
    from urllib import getproxies

    # 处理unicode: http://stackoverflow.com/a/6633040/305414
    def u(x):
        return codecs.unicode_escape_decode(x)[0]
else:
    from urllib.request import getproxies
    from urllib.parse import quote as url_quote

    def u(x):
        return x

#设置google搜索url
if os.getenv('HOWDOI_DISABLE_SSL'):  # 使用系统环境变量中非SSL的http代替https
    SEARCH_URL = 'http://www.google.com/search?q=site:{0}%20{1}'
    VERIFY_SSL_CERTIFICATE = False
else:
    SEARCH_URL = 'https://www.google.com/search?q=site:{0}%20{1}'
    VERIFY_SSL_CERTIFICATE = True
#设置目标问答网站
URL = os.getenv('HOWDOI_URL') or 'stackoverflow.com'

#浏览器UA，用于伪造浏览器请求，防止网站对脚本请求进行屏蔽
USER_AGENTS = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:11.0) Gecko/20100101 Firefox/11.0',
               'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:22.0) Gecko/20100 101 Firefox/22.0',
               'Mozilla/5.0 (Windows NT 6.1; rv:11.0) Gecko/20100101 Firefox/11.0',
               ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.5 (KHTML, like Gecko) '
                'Chrome/19.0.1084.46 Safari/536.5'),
               ('Mozilla/5.0 (Windows; Windows NT 6.1) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.46'
                'Safari/536.5'), )
#格式化答案输出
ANSWER_HEADER = u('--- Answer {0} ---\n{1}')
NO_ANSWER_MSG = '< no answer given >'

#设置缓存文件路径
XDG_CACHE_DIR = os.environ.get('XDG_CACHE_HOME',
                               os.path.join(os.path.expanduser('~'), '.cache'))
CACHE_DIR = os.path.join(XDG_CACHE_DIR, 'howdoi')
CACHE_FILE = os.path.join(CACHE_DIR, 'cache{0}'.format(
    sys.version_info[0] if sys.version_info[0] == 3 else ''))

#获取代理（在国内China尤其有用，不解释）
def get_proxies():
    proxies = getproxies()
    filtered_proxies = {}
    for key, value in proxies.items():
        if key.startswith('http'):
            if not value.startswith('http'):
                filtered_proxies[key] = 'http://%s' % value
            else:
                filtered_proxies[key] = value
    return filtered_proxies

def _get_result(url):
    try:
        return requests.get(url, headers={'User-Agent': random.choice(USER_AGENTS)}, proxies=get_proxies(),
                            verify=VERIFY_SSL_CERTIFICATE).text
    except requests.exceptions.SSLError as e:
        print('[ERROR] Encountered an SSL Error. Try using HTTP instead of '
              'HTTPS by setting the environment variable "HOWDOI_DISABLE_SSL".\n')
        raise e

# 获取google搜索结果中的连接
def _get_links(query):
    result = _get_result(SEARCH_URL.format(URL, url_quote(query)))
    html = pq(result)#用pyquery进行解析
    return [a.attrib['href'] for a in html('.l')] or \
        [a.attrib['href'] for a in html('.r')('a')]

def get_link_at_pos(links, position):
    if not links:
        return False

    if len(links) >= position:
        link = links[position - 1]
    else:
        link = links[-1]
    return link

#代码格式化输出函数
def _format_output(code, args):
    if not args['color']:
        return code
    lexer = None

    # try to find a lexer using the StackOverflow tags
    # or the query arguments
    for keyword in args['query'].split() + args['tags']:
        try:
            lexer = get_lexer_by_name(keyword)
            break
        except ClassNotFound:
            pass

    # no lexer found above, use the guesser
    if not lexer:
        try:
            lexer = guess_lexer(code)
        except ClassNotFound:
            return code

    return highlight(code,
                     lexer,
                     TerminalFormatter(bg='dark'))

#利用政策匹配判断连接是否是问题
def _is_question(link):
    return re.search('questions/\d+/', link)

#获取问题连接
def _get_questions(links):
    return [link for link in links if _is_question(link)]

#获取答案（主要是解析stackoverflow的问答页面）
def _get_answer(args, links):
    links = _get_questions(links)
    link = get_link_at_pos(links, args['pos'])
    if not link:
        return False
    if args.get('link'):
        return link
    page = _get_result(link + '?answertab=votes')
    html = pq(page)

    first_answer = html('.answer').eq(0)#第一个答案
    instructions = first_answer.find('pre') or first_answer.find('code')#pre和code标签为目标代码块
    args['tags'] = [t.text for t in html('.post-tag')]

    if not instructions and not args['all']:
        text = first_answer.find('.post-text').eq(0).text()
    elif args['all']:
        texts = []
        for html_tag in first_answer.items('.post-text > *'):
            current_text = html_tag.text()
            if current_text:
                if html_tag[0].tag in ['pre', 'code']:
                    texts.append(_format_output(current_text, args))
                else:
                    texts.append(current_text)
        texts.append('\n---\nAnswer from {0}'.format(link))
        text = '\n'.join(texts)
    else:
        text = _format_output(instructions.eq(0).text(), args)
    if text is None:
        text = NO_ANSWER_MSG
    text = text.strip()
    return text

def _get_instructions(args):
    links = _get_links(args['query'])

    if not links:
        return False
    answers = []
    append_header = args['num_answers'] > 1
    initial_position = args['pos']
    for answer_number in range(args['num_answers']):
        current_position = answer_number + initial_position
        args['pos'] = current_position
        answer = _get_answer(args, links)
        if not answer:
            continue
        if append_header:
            answer = ANSWER_HEADER.format(current_position, answer)
        answer += '\n'
        answers.append(answer)
    return '\n'.join(answers)

#启动缓存
def _enable_cache():
    if not os.path.exists(CACHE_DIR):
        os.makedirs(CACHE_DIR)
    requests_cache.install_cache(CACHE_FILE)

#清除缓存
def _clear_cache():
    for cache in glob.glob('{0}*'.format(CACHE_FILE)):
        os.remove(cache)

# 脚本主函数
def howdoi(args):
    #构造查询（主要是把问号删除）
    args['query'] = ' '.join(args['query']).replace('?', '')
    try:
        return _get_instructions(args) or 'Sorry, couldn\'t find any help with that topic\n'
    except (ConnectionError, SSLError):
        return 'Failed to establish network connection\n'

#获取用户输入的命令行参数
def get_parser():
    parser = argparse.ArgumentParser(description='instant coding answers via the command line')
    parser.add_argument('query', metavar='QUERY', type=str, nargs='*',
                        help='the question to answer')
    parser.add_argument('-p', '--pos', help='select answer in specified position (default: 1)', default=1, type=int)
    parser.add_argument('-a', '--all', help='display the full text of the answer',
                        action='store_true')
    parser.add_argument('-l', '--link', help='display only the answer link',
                        action='store_true')
    parser.add_argument('-c', '--color', help='enable colorized output',
                        action='store_true')
    parser.add_argument('-n', '--num-answers', help='number of answers to return', default=1, type=int)
    parser.add_argument('-C', '--clear-cache', help='clear the cache',
                        action='store_true')
    parser.add_argument('-v', '--version', help='displays the current version of howdoi',
                        action='store_true')
    return parser

#启动函数
def command_line_runner():
    parser = get_parser()
    args = vars(parser.parse_args())

    # 输出脚本版本
    if args['version']:
        print(__version__)
        return
    # 清除缓存
    if args['clear_cache']:
        _clear_cache()
        print('Cache cleared successfully')
        return
    # 如果没有query，就输出帮助信息
    if not args['query']:
        parser.print_help()
        return

    # 如果环境变量设置了禁止缓存，就清除缓存
    if not os.getenv('HOWDOI_DISABLE_CACHE'):
        _enable_cache()
    # 彩色输出
    if os.getenv('HOWDOI_COLORIZE'):
        args['color'] = True
    # 如果用户Python版本小于3就进行utf-8编码，如否，就正常启动
    if sys.version < '3':
        print(howdoi(args).encode('utf-8', 'ignore'))
    else:
        print(howdoi(args))

if __name__ == '__main__':
    command_line_runner()

```

![](https://images2018.cnblogs.com/blog/673170/201807/673170-20180729005734951-1439078997.png)

还真有人点开啊🤣随意随意😂

如果您认为阅读这篇博客让您有些收获，不妨点击一下右下角的【**推荐**】按钮。
如果您希望更容易地发现我的新博客，不妨点击一下绿色通道的[【**关注我**】](javascript:void(0);)。

如果想给予我更多的鼓励，不妨请我喝杯咖啡

感谢您的阅读，我是**Tacey Wong**！
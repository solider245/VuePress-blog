(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{489:function(e,s,a){"use strict";a.r(s);var n=a(25),t=Object(n.a)({},(function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("p",[e._v("首先，我们需要在系统中安装pyenv，建议修改brew为国内源。")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("brew install pyenv\npyenv --version   //pyenv 1.2.15\n\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br")])]),a("p",[e._v("本人的pyenv为1.2.15。默认情况下，下载python3.8.0走的是python官网提供的ftp。但事实证明，每次只能下载1/4就会挂掉（本人用浏览器按照目录下的地址下载到1/4停止）。所以，为保证我们可以用pyenv下载到python3.8.0，需要先修改pyenv的下载地址。")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("cd ~/.pyenv/plugins/python-build/share/python-build\nls\n\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br")])]),a("p",[e._v("在这里你会看到文件和"),a("code",[e._v("pyenv install --list")]),e._v("一样的列表。我看到这个的时候都兴奋了，要知道网上都是什么链接地址啊，都找不到这里。")]),e._v(" "),a("p",[e._v("执行"),a("code",[e._v("vi 3.8.1")]),e._v("，打开文件如下：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('#require_gcc\nprefer_openssl11\nexport PYTHON_BUILD_CONFIGURE_WITH_OPENSSL=1\ninstall_package "openssl-1.1.0j" "https://www.openssl.org/source/openssl-1.1.0j.tar.gz#31bec6c203ce1a8e93d5994f4ed304c63ccf07676118b6634edded12ad1b3246" mac_openssl --if has_broken_mac_openssl\ninstall_package "readline-8.0" "https://ftpmirror.gnu.org/readline/readline-8.0.tar.gz#e339f51971478d369f8a053a330a190781acb9864cf4c541060f12078948e461" mac_readline --if has_broken_mac_readline\nif has_tar_xz_support; then\n  install_package "Python-3.8.1" "https://www.python.org/ftp/python/3.8.1/Python-3.8.1.tar.xz#75894117f6db7051c1b34f37410168844bbb357c139a8a10a352e9bf8be594e8" ldflags_dirs standard verify_py38 copy_python_gdb ensurepip\nelse\n  install_package "Python-3.8.1" "https://www.python.org/ftp/python/3.8.1/Python-3.8.1.tgz#c7cfa39a43b994621b245e029769e9126caa2a93571cee2e743b213cceac35fb" ldflags_dirs standard verify_py38 copy_python_gdb ensurepip\nfi\n\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br")])]),a("p",[e._v("修改文件的"),a("code",[e._v("if")]),e._v("下执行语句的地址为如下")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('#require_gcc\nprefer_openssl11\nexport PYTHON_BUILD_CONFIGURE_WITH_OPENSSL=1\ninstall_package "openssl-1.1.0j" "https://www.openssl.org/source/openssl-1.1.0j.tar.gz#31bec6c203ce1a8e93d5994f4ed304c63ccf07676118b6634edded12ad1b3246" m    ac_openssl --if has_broken_mac_openssl\ninstall_package "readline-8.0" "https://ftpmirror.gnu.org/readline/readline-8.0.tar.gz#e339f51971478d369f8a053a330a190781acb9864cf4c541060f12078948e461" m    ac_readline --if has_broken_mac_readline\nif has_tar_xz_support; then\n  install_package "Python-3.8.1" "https://npm.taobao.org/mirrors/python/3.8.1/Python-3.8.1.tar.xz#75894117f6db7051c1b34f37410168844bbb357c139a8a10a352e9bf    8be594e8" ldflags_dirs standard verify_py38 copy_python_gdb ensurepip\nelse\n  install_package "Python-3.8.1" "https://www.python.org/ftp/python/3.8.1/Python-3.8.1.tgz#c7cfa39a43b994621b245e029769e9126caa2a93571cee2e743b213cceac35f    b" ldflags_dirs standard verify_py38 copy_python_gdb ensurepip\nfi\n\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br")])]),a("p",[e._v("之后正常执行"),a("code",[e._v("pyenv install 3.8.1")]),e._v("，不到一分钟就安装好了。。。")]),e._v(" "),a("p",[e._v("作者：Crystal_Lau\n链接："),a("a",{attrs:{href:"https://www.jianshu.com/p/4243be7fd1c9",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://www.jianshu.com/p/4243be7fd1c9"),a("OutboundLink")],1),e._v("\n来源：简书")])])}),[],!1,null,null,null);s.default=t.exports}}]);
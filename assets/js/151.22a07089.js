(window.webpackJsonp=window.webpackJsonp||[]).push([[151],{488:function(s,n,t){"use strict";t.r(n);var a=t(25),e=Object(a.a)({},(function(){var s=this,n=s.$createElement,t=s._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("▶ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chown")]),s._v(" --help\n用法：chown "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("选项"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(". "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("所有者"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(":"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("组"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" 文件"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n　或：chown "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("选项"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(". --reference"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("参考文件 文件"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\nChange the owner and/or group of each FILE to OWNER and/or GROUP.\nWith --reference, change the owner and group of each FILE to those of RFILE.\n\n  -c, --changes          like verbose but report only when a change is made\n  -f, --silent, --quiet  suppress "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("most")]),s._v(" error messages\n  -v, --verbose          output a diagnostic "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" every "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" processed\n      --dereference      affect the referent of each symbolic "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("link")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("this is\n                         the default"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(", rather than the symbolic "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("link")]),s._v(" itself\n  -h, --no-dereference   affect symbolic links instead of any referenced "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v("\n                         "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("useful only on systems that can change the\n                         ownership of a symlink"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n      --from"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("当前所有者:当前所属组\n                                只当每个文件的所有者和组符合选项所指定时才更改所\n                                有者和组。其中一个可以省略，这时已省略的属性就不\n                                需要符合原有的属性。\n      --no-preserve-root  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v(" not treat "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/'")]),s._v(" specially "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("the default"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n      --preserve-root    fail to operate recursively on "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/'")]),s._v("\n      --reference"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("RFILE  use RFILE"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'s owner and group rather than\n                         specifying OWNER:GROUP values\n  -R, --recursive        operate on files and directories recursively\n\nThe following options modify how a hierarchy is traversed when the -R\noption is also specified.  If more than one is specified, only the final\none takes effect.\n\n  -H                     if a command line argument is a symbolic link\n                         to a directory, traverse it\n  -L                     traverse every symbolic link to a directory\n                         encountered\n  -P                     do not traverse any symbolic links (default)\n\n      --help            显示此帮助信息并退出\n      --version         显示版本信息并退出\n\nOwner is unchanged if missing.  Group is unchanged if missing, but changed\nto login group if implied by a '")]),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('\' following a symbolic OWNER.\nOWNER and GROUP may be numeric as well as symbolic.\n\n示例：\n  chown root /u         将 /u 的属主更改为"root"。\n  chown root:staff /u   和上面类似，但同时也将其属组更改为"staff"。\n  chown -hR root /u     将 /u 及其子目录下所有文件的属主更改为"root"。\n\nGNU coreutils 在线帮助：<https://www.gnu.org/software/coreutils/>\n请向 <http://translationproject.org/team/zh_CN.html> 报告 chown 的翻译错误\n完整文档请见：<https://www.gnu.org/software/coreutils/chown>\n或者在本地使用：info \'')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("coreutils"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chown")]),s._v(" invocation'\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br"),t("span",{staticClass:"line-number"},[s._v("30")]),t("br"),t("span",{staticClass:"line-number"},[s._v("31")]),t("br"),t("span",{staticClass:"line-number"},[s._v("32")]),t("br"),t("span",{staticClass:"line-number"},[s._v("33")]),t("br"),t("span",{staticClass:"line-number"},[s._v("34")]),t("br"),t("span",{staticClass:"line-number"},[s._v("35")]),t("br"),t("span",{staticClass:"line-number"},[s._v("36")]),t("br"),t("span",{staticClass:"line-number"},[s._v("37")]),t("br"),t("span",{staticClass:"line-number"},[s._v("38")]),t("br"),t("span",{staticClass:"line-number"},[s._v("39")]),t("br"),t("span",{staticClass:"line-number"},[s._v("40")]),t("br"),t("span",{staticClass:"line-number"},[s._v("41")]),t("br"),t("span",{staticClass:"line-number"},[s._v("42")]),t("br"),t("span",{staticClass:"line-number"},[s._v("43")]),t("br"),t("span",{staticClass:"line-number"},[s._v("44")]),t("br"),t("span",{staticClass:"line-number"},[s._v("45")]),t("br"),t("span",{staticClass:"line-number"},[s._v("46")]),t("br"),t("span",{staticClass:"line-number"},[s._v("47")]),t("br"),t("span",{staticClass:"line-number"},[s._v("48")]),t("br"),t("span",{staticClass:"line-number"},[s._v("49")]),t("br"),t("span",{staticClass:"line-number"},[s._v("50")]),t("br")])]),t("p",[s._v("更改文件权限通常搭配R参数使用，这样可以修改整个目录和子文件的权限。")])])}),[],!1,null,null,null);n.default=e.exports}}]);
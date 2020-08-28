(window.webpackJsonp=window.webpackJsonp||[]).push([[124],{523:function(t,r,o){"use strict";o.r(r);var e=o(25),n=Object(e.a)({},(function(){var t=this,r=t.$createElement,o=t._self._c||r;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("p"),o("div",{staticClass:"table-of-contents"},[o("ul",[o("li",[o("a",{attrs:{href:"#说明"}},[t._v("说明#")])]),o("li",[o("a",{attrs:{href:"#设置代理"}},[t._v("设置代理#")]),o("ul",[o("li",[o("a",{attrs:{href:"#类-unix"}},[t._v("类 Unix#")])])])]),o("li",[o("a",{attrs:{href:"#windows"}},[t._v("Windows#")])]),o("li",[o("a",{attrs:{href:"#测试一下"}},[t._v("测试一下#")])]),o("li",[o("a",{attrs:{href:"#私有模块"}},[t._v("私有模块#")])]),o("li",[o("a",{attrs:{href:"#阿里云go代理仓库"}},[t._v("阿里云go代理仓库")]),o("ul",[o("li",[o("a",{attrs:{href:"#简介"}},[t._v("简介")])]),o("li",[o("a",{attrs:{href:"#地址"}},[t._v("地址")])]),o("li",[o("a",{attrs:{href:"#使用帮助"}},[t._v("使用帮助")])])])])])]),t._v("\n[](javascript:void(0)😉"),o("p"),t._v(" "),o("ul",[o("li",[o("p",[t._v("说明")])]),t._v(" "),o("li",[o("p",[t._v("设置代理")])]),t._v(" "),o("li",[o("p",[t._v("类 Unix")])]),t._v(" "),o("li",[o("p",[t._v("Windows")])]),t._v(" "),o("li",[o("p",[t._v("测试一下")])]),t._v(" "),o("li",[o("p",[t._v("私有模块")])])]),t._v(" "),o("h2",{attrs:{id:"说明"}},[t._v("说明"),o("a",{attrs:{href:"#"}},[t._v("#")])]),t._v(" "),o("p",[t._v("众所周知，国内网络访问国外资源经常会出现不稳定的情况。 Go 生态系统中有着许多中国 Gopher 们无法获取的模块，比如最著名的 "),o("code",[t._v("golang.org/x/...")]),t._v("。并且在中国大陆从 GitHub 获取模块的速度也有点慢。")]),t._v(" "),o("p",[t._v("因此设置 CDN 加速代理就很有必要了，以下是几个速度不错的提供者：")]),t._v(" "),o("ul",[o("li",[t._v("七牛："),o("a",{attrs:{href:"https://goproxy.cn/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Goproxy 中国 https://goproxy.cn"),o("OutboundLink")],1)]),t._v(" "),o("li",[t._v("阿里： "),o("a",{attrs:{href:"https://mirrors.aliyun.com/goproxy/",target:"_blank",rel:"noopener noreferrer"}},[t._v("mirrors.aliyun.com/goproxy/"),o("OutboundLink")],1)]),t._v(" "),o("li",[t._v("官方： < 全球 CDN 加速 "),o("a",{attrs:{href:"https://goproxy.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://goproxy.io/>"),o("OutboundLink")],1)]),t._v(" "),o("li",[t._v("其他："),o("a",{attrs:{href:"https://gocenter.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("jfrog 维护 https://gocenter.io"),o("OutboundLink")],1)])]),t._v(" "),o("h2",{attrs:{id:"设置代理"}},[t._v("设置代理"),o("a",{attrs:{href:"#"}},[t._v("#")])]),t._v(" "),o("h3",{attrs:{id:"类-unix"}},[t._v("类 Unix"),o("a",{attrs:{href:"#"}},[t._v("#")])]),t._v(" "),o("p",[t._v("在 Linux 或 macOS 上面，需要运行下面命令（或者，可以把以下命令写到 "),o("code",[t._v(".bashrc")]),t._v(" 或 "),o("code",[t._v(".bash_profile")]),t._v(" 文件中）：")]),t._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",[o("code",[t._v("# 启用 Go Modules 功能\ngo env -w GO111MODULE=on\n\n# 配置 GOPROXY 环境变量，以下三选一\n\n# 1. 七牛 CDN\ngo env -w  GOPROXY=https://goproxy.cn,direct\n\n# 2. 阿里云\ngo env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct\n\n# 3. 官方\ngo env -w  GOPROXY=https://goproxy.io,direct\n")])])]),o("p",[t._v("确认一下：")]),t._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",[o("code",[t._v('$ go env | grep GOPROXY\nGOPROXY="https://goproxy.cn"\n')])])]),o("h2",{attrs:{id:"windows"}},[t._v("Windows"),o("a",{attrs:{href:"#"}},[t._v("#")])]),t._v(" "),o("p",[t._v("在 Windows 上，需要运行下面命令：")]),t._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",[o("code",[t._v('# 启用 Go Modules 功能\n$env:GO111MODULE="on"\n\n# 配置 GOPROXY 环境变量，以下三选一\n\n# 1. 七牛 CDN\n$env:GOPROXY="https://goproxy.cn,direct"\n\n# 2. 阿里云\n$env:GOPROXY="https://mirrors.aliyun.com/goproxy/,direct"\n\n# 3. 官方\n$env:GOPROXY="https://goproxy.io,direct"\n')])])]),o("h2",{attrs:{id:"测试一下"}},[t._v("测试一下"),o("a",{attrs:{href:"#"}},[t._v("#")])]),t._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",[o("code",[t._v("$ time go get golang.org/x/tour\n")])])]),o("p",[t._v("["),o("img",{attrs:{src:"https://cdn.learnku.com/uploads/images/201912/15/1/opNZp4DoBu.png!large",alt:"Go 国内加速镜像"}})]),t._v(" "),o("p",[t._v("(https://cdn.learnku.com/uploads/images/201912/15/1/opNZp4DoBu.png!large)")]),t._v(" "),o("blockquote",[o("p",[t._v("本地如果有模块缓存，可以使用命令清空 "),o("code",[t._v("go clean --modcache")]),t._v(" 。")])]),t._v(" "),o("h2",{attrs:{id:"私有模块"}},[t._v("私有模块"),o("a",{attrs:{href:"#"}},[t._v("#")])]),t._v(" "),o("p",[t._v("如果你使用的 Go 版本 >=1.13, 你可以通过设置 GOPRIVATE 环境变量来控制哪些私有仓库和依赖 (公司内部仓库) 不通过 proxy 来拉取，直接走本地，设置如下：")]),t._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",[o("code",[t._v("# Go version >= 1.13\ngo env -w GOPROXY=https://goproxy.cn,direct\n# 设置不走 proxy 的私有仓库，多个用逗号相隔\ngo env -w GOPRIVATE=*.corp.example.com\n")])])]),o("h2",{attrs:{id:"阿里云go代理仓库"}},[t._v("阿里云go代理仓库")]),t._v(" "),o("h4",{attrs:{id:"简介"}},[t._v("简介")]),t._v(" "),o("p",[t._v("go module公共代理仓库，代理并缓存go模块。你可以利用该代理来避免DNS污染导致的模块拉取缓慢或失败的问题，加速你的构建")]),t._v(" "),o("h4",{attrs:{id:"地址"}},[t._v("地址")]),t._v(" "),o("p",[t._v("https://mirrors.aliyun.com/goproxy/")]),t._v(" "),o("h4",{attrs:{id:"使用帮助"}},[t._v("使用帮助")]),t._v(" "),o("p",[t._v("1.使用go1.11以上版本并开启go module机制")]),t._v(" "),o("p",[t._v("2.导出GOPROXY环境变量")]),t._v(" "),o("p",[t._v("export GOPROXY=https://mirrors.aliyun.com/goproxy/")])])}),[],!1,null,null,null);r.default=n.exports}}]);
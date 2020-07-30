const moment = require('moment');
module.exports = [
  "vuepress-plugin-auto-sidebar", {
    //nav: true,
    sidebarDepth: 3,
  },
  "@vuepress/back-to-top", {},//插件安装命令: yarn add -D @vuepress/plugin-back-to-top
  "@vuepress/nprogress", {},//插件安装命令 ： yarn add -D @vuepress/plugin-nprogress
  "@vuepress/medium-zoom", {
    selector: "img.zoom-custom-imgs",
    // medium-zoom options here
    // See: https://github.com/francoischalifour/medium-zoom#options
    options: {
      margin: 16,
    },
  },//插件安装命令: yarn add -D @vuepress/plugin-medium-zoom
  "@vuepress/last-updated", {
    transformer: (timestamp, lang) => {
      // 不要忘了安装 moment。安装命令： yarn add moment
      const moment = require("moment");
      moment.locale(lang);
      return moment(timestamp).fromNow();
    },
  },
  '@vuepress/pwa', {
    serviceWorker: true,//如果设置为 true，VuePress 将自动生成并注册一个 Service Worker，用于缓存页面的内容以供离线使用（仅会在生产环境中启用）。
    updatePopup: true  // 本选项开启了一个用于刷新内容的弹窗。这个弹窗将会在站点有内容更新时显示出来，并提供了一个 refresh 按钮，允许用户立即刷新内容。
},
//插件使用说明：https://vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html#%E4%BD%BF%E7%94%A8
//插件安装命令：yarn add -D @vuepress/plugin-pwa
];

const moment = require('moment');
module.exports = {
  "vuepress-plugin-auto-sidebar": {
    //nav: true,
    sidebarDepth: 3,
  },
  "@vuepress/back-to-top": {},//插件安装命令: yarn add -D @vuepress/plugin-back-to-top
  "@vuepress/nprogress": {},//插件安装命令 ： yarn add -D @vuepress/plugin-nprogress
  "@vuepress/medium-zoom": {
    selector: "img.zoom-custom-imgs",
    // medium-zoom options here
    // See: https://github.com/francoischalifour/medium-zoom#options
    options: {
      margin: 16,
    },
  },//插件安装命令: yarn add -D @vuepress/plugin-medium-zoom
  "@vuepress/last-updated": {
    transformer: (timestamp, lang) => {
      // 不要忘了安装 moment。安装命令： yarn add moment
      const moment = require("moment");
      moment.locale(lang);
      return moment(timestamp).fromNow();
    },
  },
};

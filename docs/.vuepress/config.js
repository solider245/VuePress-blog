const nav = require("./nav.js"); // 引入刚刚生成的文件
module.exports = {
    title: '吴起的个人网站',
    description:'吴起的个人网站，专攻vue,python,linux,PowerBI',
    plugins: {
        "vuepress-plugin-auto-sidebar": {
        nav: true
        }
      },
    themeConfig:{
        nav   
    }
}


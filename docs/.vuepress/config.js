const nav = require("./nav"); // 导航栏配置路径
//const sidebar = require("./config/Sidebar"); //侧边栏配置
const pluginsConfig = require("./config/PluginsConfig");//插件配置模块
const markdownConfig= require("./config/markdownConfig");//markdown插件配置模块
const headConfig = require("./config/headConf");//通用头部配置

module.exports = {
    title: '吴起的个人网站',
    description:'吴起的个人网站，专攻vue,python,linux,PowerBI',
    markdown:markdownConfig,
    plugins: pluginsConfig,
    head: headConfig,
    theme: 'ououe',//安装命令yarn add vuepress-theme-ououe
    //theme: 'reco',//安装命令yarn add vuepress-theme-reco
    themeConfig:{
        nav,
        authorAvatar: 'http://shp.qpic.cn/ishow/2735060319/1591183305_84828260_14686_sProdImgNo_2.jpg/0',
        //type: 'blog',
        //sidebar, 
        lastUpdated: "上次更新",
        repo: 'https://github.com/solider245/VuePress-blog',//你的仓库地址
        repoLabel: 'Repo',
        // 假如你的文档仓库和项目本身不在一个仓库：
        docsRepo: 'solider245/VuePress-blog',
        editLinks: true,
        editLinkText: '你要教我做事咯？',
        smoothScroll: true,//页面滚动
        locales: { '/': { lang: 'zh-CN' }},//修改默认语言为中文
        
        //algolia: {
            //apiKey: 'b89c2570f4d0358f1b38ef95c4dc9b9b',
            //indexName: '<INDEX_NAME>'
          //}        
    }
}


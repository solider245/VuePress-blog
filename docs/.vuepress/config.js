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
    themeConfig:{
        nav,
        //sidebar, 
        lastUpdated: "上次更新",
        repo: 'https://github.com/solider245/VuePress-blog',//你的仓库地址
		repoLabel: 'Repo',
		editLinks: true,
        editLinkText: '你要教我做事咯？',
        //algolia: {
            //apiKey: 'b89c2570f4d0358f1b38ef95c4dc9b9b',
            //indexName: '<INDEX_NAME>'
          //}        
    }
}


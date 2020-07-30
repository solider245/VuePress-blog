const nav = require("./config/nav"); // 导航栏配置路径
const sidebar = require("./config/Sidebar"); //侧边栏配置
const pluginsConfig = require("./config/PluginsConfig");//插件配置模块
const markdownConfig= require("./config/markdownConfig");//markdown插件配置模块

module.exports = {
    title: '吴起的个人网站',
    description:'吴起的个人网站，专攻vue,python,linux,PowerBI',
    markdown:markdownConfig,
    plugins:pluginsConfig,
    themeConfig:{
        nav,
        sidebar,          
    }
}


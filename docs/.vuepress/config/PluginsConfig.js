const autonav_options = {
  enable: true,
};

module.exports = {
  plugins: [
    //[ 'autonav', autonav_options ]
    [
      "@vuepress/back-to-top", //back-to-top 插件
      "@vuepress/blog",
      "@vuepress/active-header-links", // 页面滚动时自动激活侧边栏链接的插件
      {
        sidebarLinkSelector: ".sidebar-link",
        headerAnchorSelector: ".header-anchor",
      },
    ],
  ],
};

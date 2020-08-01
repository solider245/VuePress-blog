module.exports = {
      // markdown-it-anchor 的选项
      anchor: { permalink: false },
      extractHeaders: [ 'h2', 'h3', 'h4' ],
      //代码块显示行号
      lineNumbers: true ,
      // markdown-it-toc 的选项
      toc: { includeLevel: [1, 2,3,4] }
      //extendMarkdown: md => {
        // 使用更多的 markdown-it 插件!
        //md.use(require('markdown-it-xxx'))
     // }
  }
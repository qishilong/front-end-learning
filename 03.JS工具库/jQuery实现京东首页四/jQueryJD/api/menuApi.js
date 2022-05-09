Mock.mock("/menu", {
  // 18 代表的是数组的长度
  'data|18': [{
      // 2-4 代表数组长度在2-4范围内
      // title 表示左侧菜单栏项目的名字
      'titles|2-3': [{
          // @cword(2,4) 代表的是随机生成2-4个汉字
          name: '@cword(2,4)',
          // 随机生成一个 http 的链接地址
          href: '@url(http)'
      }],
      content: {
          // tabs 为隐藏栏目上面的黑色标签
          'tabs|2-5': [{
              name: '@cword(2,4)',
              href: '@url(http)'
          }],
          // details 为下面的具体分类
          'details|8-15': [{
              category: '@cword(2,4)', // 分类名
              // 该类别的具体项目，又是一个数组
              'items|8-16': [{
                  href: '@url(http)',
                  name: '@cword(2,4)'
              }]
          }]
      }
  }]
})
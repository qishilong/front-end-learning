// 热门词汇
Mock.mock('/hotwords', {
  'result|8-15': [{
    word: '@cword(2,5)',
    href: '@url(http)'
  }]
});

Mock.mock('/recommendWord', {
  word: '@cword(2,5)',
  href: '@url(http)'
})
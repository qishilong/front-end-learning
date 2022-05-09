// 1. 思考题：如何给jQuery扩展属性或者扩展方法？
// $.extend $.fn.extend
// 构造函数.xxx, 构造函数.prototype.xxx

// 扩展：
// $.extend 与 $.fn.extend 的区别。
// $.entexd： 给jquery函数本身扩展方法 $.xxx
// $.fn.extend: 给jquery对象扩展方法 $().xxx

$.fn.extend({
  swiper: function (options) {
   var obj = new Swiper(options, this);
   obj.init();
  }
});

// 封装Swiper构造函数
/**
 * 
 * @param {配置对象} options 
 * @param {轮播图节点对象，jquery对象} wrap 
 */
function Swiper(options, wrap) {
  // 根据options进行对象初始化，方便后续使用, 兼容性处理。
  // 保存轮播图的外层容器节点
  this.wrap = wrap;
  // 轮播图的内容列表
  this.contentList = options.contentList || [];
  this.type = options.type || 'fade';
  // 默认是自动播放，undefined
  this.isAuto = options.isAuto === undefined ? true : Boolean(options.isAuto);
  this.autoChangeTime = options.autoChangeTime || 5000;
  this.showChangeBtn = options.showChangeBtn || 'always';
  this.dotSize = options.dotSize || 5;
  this.dotPosition = options.dotPosition || 'left';
  this.dotColor = options.dotColor || '#fff';
  this.dotActiveColor = options.dotActiveColor || 'red';
  this.showDots = !!(options.showDots);

  this.width = options.width || $(wrap).width();
  this.height = options.height || $(wrap).height();

  // 以上属性，用户传入

  // 处理备用属性
  // 记录轮播图，元素的个数
  this.len = this.contentList.length;
  // 轮播图索引值
  this.nowPage = 0;
  // 自动轮播定时器
  this.timer = null;
  // 是否执行完动画 锁
  this.lock = false;
}

// 原型编程， 原型作用：共享属性，共享方法。
// 初始化轮播图的方法
Swiper.prototype.init = function () {
  // 初始化样式
  // 初始化结构
  // 初始化事件
}
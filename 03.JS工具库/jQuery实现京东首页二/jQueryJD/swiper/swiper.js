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

/*
  function Vue() {
    this._init();
  }
*/ 

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
  // 初始化结构
  this.initElement();
  // 初始化样式
  this.initStyle();
  // 初始化事件
  this.bindEvent();

  // 判断是否自己动
  if (this.isAuto) {
    this.autoChange();
  }
}

// 生成轮播图完整的结构
Swiper.prototype.initElement = function () {
  // 静态基本结构
  // 包裹层
  // document.createElement('div')
  // div.className = 'swiper-wrap'
  var swiperWrap = $('<div class="swiper-wrap"></div>');
  // 内容区
  var swiper = $('<ul class="swiper"></ul>');
  // 按钮
  var lbtn = $('<div class="btn lbtn"><i class="iconfont icon-arrow-left"></i></div>');
  var rbtn = $('<div class="btn rbtn"><i class="iconfont icon-arrow-right"></i></div>');
  // 小白点包裹层
  var dotsWrap = $('<ul class="dots-wrap"></ul>');
  // 动态结构
  for(var i=0; i<this.len; i++) {
    // 轮播项目
    $('<li class="swiper-item"></li>')
      .html(this.contentList[i])
      .appendTo(swiper);
      // 小白点
    $('<li class="dot"></li>').appendTo(dotsWrap);
  }

  // 特殊结构（滚动 && 渐变）
  if (this.type === 'animate') {
    // 如果是滚动轮播，要多一个第一个元素，0~len, len~0
    $('<li class="swiper-item"></li>')
      .html($(this.contentList[0]).clone(true))
      .appendTo(swiper)
  }

  // 其他结构的初始化
  // 按钮展示状态 （默认展示）
  switch(this.showChangeBtn) {
    case 'hide':
      lbtn.hide();
      rbtn.hide();
      break;
    case 'hover':
      // 1. 先隐藏
      lbtn.hide();
      rbtn.hide();
      // 2. hover时候展示
      swiperWrap.hover(function () {
        lbtn.show();
        rbtn.show();
      }, function () {
        lbtn.hide();
        rbtn.hide();
      });
      break;
      default: break;
  }

  // 小白点的展示状态
  if (this.showDots === false) {
    dotsWrap.hide();
  }

  // 组装结构
  swiperWrap
    .append(swiper)
    .append(lbtn)
    .append(rbtn)
    .append(dotsWrap)
    .appendTo(this.wrap)
    .addClass('swiper-wrap_' + this.type)
}

// 生成样式
Swiper.prototype.initStyle = function () {
  // 初始化包裹层样式
  $(this.wrap)
    .find('.swiper')
    .css({
      height: this.height,
      width: this.type == 'animate' ? this.width*(this.len + 1): this.width
    })
    .find('.swiper-item')
    .css({
      height: this.height,
      width: this.width,
    })
  // 根据轮播图类型，初始化第一张轮播图
  if (this.type == 'fade') {
    $(this.wrap)
      .find('.swiper-item')
      .eq(this.nowPage)
      .show();
  } else {
    $(this.wrap)
      .find('.swiper')
      .css({
        left: -this.nowPage * this.width
      })
  }

  // 小白点样式
  $(this.wrap)
  // 小白点包裹层样式
    .find('.dots-wrap')
    .css({
      textAlign: this.dotPosition,
      display: this.showDots ? 'block' : 'none'
    })
  // 小白点样式
    .find('.dot')
    .css({
      width: this.dotSize,
      height: this.dotSize,
      backgroundColor: this.dotColor
    })
    // 初始化nowPage 对应的小白点
    .eq(this.nowPage % this.len)
    .css({
      backgroundColor: this.dotActiveColor
    })
}

// 初始化事件
Swiper.prototype.bindEvent = function () {
  // 有哪些事件
  // 1. 点击按钮
  var self = this;
  $(this.wrap)
    .find('.lbtn')
    .click(function () {
      if (self.lock) {
        return;
      } 
      self.lock = true;
      if (self.type === 'animate') {
        if (self.nowPage === 0) {
          self.nowPage = self.len - 1;
          $(self.wrap)
            .find('.swiper')
            .css({
              left: -self.len * self.width
            })
        } else {
          self.nowPage --;
        }
      } else {
        if (self.nowPage === 0) {
          self.nowPage = self.len - 1;
        } else {
          self.nowPage --;
        }
      }
      self.changePage();
    })
  $(this.wrap)
    .find('.rbtn')
    .click(function () {
      if (self.lock) {
        return;
      } 
      self.lock = true;
      if (self.type === 'fade') {
        // 2 => 0
        if (self.nowPage === self.len -1) {
          self.nowPage = 0;
        } else {
          self.nowPage ++;
        }
      } else {
        if (self.nowPage === self.len) {
          self.nowPage = 1;
          $(self.wrap)
            .find('.swiper')
            .css({
              left: 0
            })
        } else {
          self.nowPage ++;
        }
      }
      self.changePage();
    })
  // 2. 点击小白点
  $(this.wrap)
    .find('.dots-wrap')
    .on('click', 'li', function () {
      if (self.lock) {
        return;
      }
      self.lock = true;
      // 记录小圆点在结构中的位置 index
      self.nowPage = $(this).index();
      self.changePage();
    })
  // 3. 鼠标移入移出
  $(this.wrap)
    .mouseenter(function () {
      clearInterval(self.timer);
    })
    .mouseleave(function () {
      if (self.isAuto) {
        self.autoChange();
      }
    })
}

Swiper.prototype.changePage = function () {
  // 不同类型，执行逻辑不一样
  var self = this;
  if (this.type == 'fade') {
    // 所有隐藏，当前页展示
    $(this.wrap)
      .find('.swiper-item')
      .fadeOut()
      .eq(this.nowPage)
      .fadeIn(function () {
        self.lock = false;
      });
  } else {
    $(this.wrap)
      .find('.swiper')
      .animate({
        left: -this.nowPage * this.width
      }, function () {
        self.lock = false;
      });
  }
  // 2. 更新小白点
  $(this.wrap)
    .find('.dot')
    .css({
      backgroundColor: this.dotColor
    })
    .eq(this.nowPage % this.len)
    .css({
      backgroundColor: this.dotActiveColor
    })
}

// 自动播放
Swiper.prototype.autoChange = function () {
  var self = this;
  clearInterval(this.timer);
  this.timer = setInterval(function () {
    $(self.wrap).find('.rbtn').trigger('click');
  }, this.autoChangeTime)
}
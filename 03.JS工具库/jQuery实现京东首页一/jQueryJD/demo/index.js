// 代码哲学，代码是人为赋予含义的

// 当前页数, 数组的下标 012
var nowPage = 0;
// 总共的页数
var totalPage = 3;

// 🔒
var lock = false;

// DOM
var swiper = document.getElementsByClassName('swiper')[0];
var lbtn = document.getElementsByClassName('lbtn')[0];
var rbtn = document.getElementsByClassName('rbtn')[0];

var dots = document.getElementsByClassName('dot');
var activeDot = document.getElementsByClassName('active-dot')[0];

// 轮播图的位置 0
lbtn.onclick = function () {
  if (lock) {
    return;
  }
  lock = true;
  // 3(0) == 3
   if (nowPage === totalPage) {
    //  0 => 1
    nowPage = 1;
    // 初始化页面的位置
    swiper.style.left = 0;
   } else {
     nowPage++;
   }
   changePage();
} 

rbtn.onclick = function () {
  if (lock) {
    return;
  }
  lock = true;
  if (nowPage === 0) {
    nowPage = totalPage - 1;
    // 3(0)->2
    swiper.style.left = -totalPage * 500 + 'px';
  } else {
    nowPage --;
  }
  changePage();
}

// 根据nowPage 进行页面跳转
function changePage() {
  // 1. swiper移动
  moveTo(swiper, 'left', -nowPage*500, function () {
    lock = false;
  });
  // 2. 小白点操作
  activeDot.className = 'dot';
  activeDot = dots[nowPage%totalPage];
  activeDot.className = 'dot active-dot';
}

function moveTo(app, prop, end, cb) {
  var start = app.offsetLeft;
  var distance = start;
  var speed = 7;
  if (end < start) {
    speed *= -1;
  }
  var t = setInterval(function () {
    distance += speed;
    app.style[prop] = distance + 'px';
    if ((speed > 0 && distance >= end) || (speed < 0 && distance <= end)) {
      // 1. 校准
      app.style[prop] = end + 'px';
      // 2， 关闭定时器
      clearInterval(t);
      if (typeof cb === 'function') {
        cb();
      }
    }
  }, 10);
}
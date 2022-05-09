
(function () {
  var totalImgLen = 0;
  var runFlag = 0;

  var init = function () {
    //- 获取数据
    //- 监听事件处理
    initData();
    initEvents();
  }

  /* 事件监听函数 */
  var initEvents = function () {
    window.addEventListener('scroll', onWindowScroll)
  }

  // window的滚动事件函数
  var onWindowScroll = function () {
    // 判断浏览器到底了
    var screenHeight = window.innerHeight; //todo 屏幕的高度
    var scrollTop = window.pageYOffset;  //todo 滚动条滚动的距离
    var totalScroll = screenHeight + scrollTop
    var lastImg = document.querySelectorAll('.item')[document.querySelectorAll('.item').length - 1]
    var lasNodeDistance = lastImg.offsetTop + lastImg.offsetHeight / 2
    // 节流
    if (totalScroll >= lasNodeDistance) {
      var now = Date.now(); // 时间戳 
      if (now - runFlag > 500) {
        initData();
        runFlag = now;
      }
    }
  }

  // 请求数据
  var initData = function () {
    ajax({
      url: 'https://api.hyfarsight.com/test/testRequest/imgList',
      data: {
      },
      onSuccess: function (res) {
        renderImgList(res.imgList)
      },
      onError: function (e) {
        console.log(e)
      }
    });
  }

  // 渲染图片
  var renderImgList = function (imgList) {
    imgList.forEach(function (item) {
      var divNode = document.createElement('div');
      divNode.className = 'item'
      var img = new Image();
      img.src = item;
      divNode.appendChild(img)
      document.querySelector('.img-container').appendChild(divNode)
    })

    document.querySelectorAll('img').forEach(function (img) {
      img.onload = function () {
        totalImgLen++
        totalImgLen === document.querySelectorAll('img').length && waterfallFn();
      }
    })
  }

  var waterfallFn = function () {
    var arrNode = Array.prototype.slice.call(document.querySelectorAll('.item'))
    var hArr = arrNode.slice(0, 5).map(function (node) {
      return node.offsetHeight
    })

    arrNode.slice(5).forEach(function (img) {
      var minHeight = Math.min.apply(null, hArr)
      var minIndex = hArr.indexOf(minHeight)
      img.style.position = 'absolute'
      img.style.top = minHeight + 20 + 'px'
      img.style.left = arrNode[minIndex].offsetLeft - 10 + 'px'
      hArr[minIndex] += img.offsetHeight + 20
    })
  }

  init();
})()
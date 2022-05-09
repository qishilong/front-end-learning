(function () {
  var totImgLen = 0;
  //- 程序的入口
  var init = function () {
    initEvents();
    initData();
  }


  //- 事件处理函数
  var initEvents = function () {

  }

  //- 初始化数据函数

  var initData = function () {
    ajax({
      url: 'https://api.hyfarsight.com/test/testRequest/imgList',
      // data: { page: 1,size:10 },
      onSuccess: function (res) {
        renderImgList(res.imgList)
      },
      onFail: function (err) {
        console.log(err)
      }
      // type: 'POST',
    })
  }

  //- 渲染函数
  var renderImgList = function (imgList) {
    imgList.forEach(function (item) {
      /*//-  <div class="item"><img src="http://wechat.hyfarsight.com/1.jpg" alt=""></div> */
      var divNode = document.createElement('div');
      divNode.className = 'item';
      var img = new Image();
      img.src = item;
      divNode.appendChild(img);
      document.querySelector('.img-container').appendChild(divNode);
      //- 图片全部加载完成之后进行water函数的调用
    })
    document.querySelectorAll('img').forEach(function (img) {
      img.onload = function () {
        totImgLen++
        totImgLen === document.querySelectorAll('img').length && waterFallFn();
      }
    })

  }

  var waterFallFn = function () {
    var arrNode = Array.prototype.slice.call(document.querySelectorAll('.item'));
    var hArr = arrNode.slice(0, 5)
    hArr = hArr.map(function (item) {
      console.log(item.offsetHeight)
    })
    // TODOS 
  }




  init();
})()
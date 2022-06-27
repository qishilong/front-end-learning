/*原生js实现轮播图生成器 */

HTMLDivElement.prototype.createTurnPage = function (imageArray) {
  if (!imageArray) {
    return;
  }

  /* 轮播图展示图片数量 */

  var sliderNum = imageArray.length;

  /* 轮播图展示宽度 */

  var sliderWidth = this.offsetWidth;

  /* 轮播图展示高度 */

  var sliderHeight = this.offsetHeight;

  /* 轮播图按钮宽高 */

  var btnLen = 40;

  /* 轮播图圆点宽高 */

  var dotLen = 10;

  /* 创建dom及样式 start */

  /* 给该div添加所需属性 */

  this.style.position = "relative";

  this.style.overflow = "hidden";

  /* div里面创建ul */

  var newUl = document.createElement("ul");

  newUl.style.position = "absolute";

  newUl.style.width = (sliderNum + 1) * sliderWidth + "px";

  newUl.style.height = sliderHeight + "px";

  this.appendChild(newUl);

  /* ul里面创建li */

  for (var i = 0; i < sliderNum + 1; i++) {
    var newLi = document.createElement("li");

    newLi.style.width = sliderWidth + "px";

    newLi.style.height = sliderHeight + "px";

    newLi.style.cssFloat = "left";

    newUl.appendChild(newLi);

    /* li里面创建img */

    var newImg = document.createElement("img");

    newImg.style.width = "100%";

    newImg.style.height = "100%";

    if (i == sliderNum) {
      newImg.src = imageArray[0];
    } else {
      newImg.src = imageArray[i];
    }

    newLi.appendChild(newImg);
  }

  /* div里面创建左右按钮 */

  for (var i = 0; i < 2; i++) {
    var newBtn = document.createElement("div");

    newBtn.style.width = btnLen + "px";

    newBtn.style.height = btnLen + "px";

    newBtn.style.lineHeight = btnLen + "px";

    newBtn.style.color = "#ffffff";

    newBtn.style.backgroundColor = "#000000";

    newBtn.style.opacity = 0.2;

    newBtn.style.textAlign = "center";

    newBtn.style.top = "50%";

    newBtn.style.marginTop = -btnLen / 2 + "px";

    newBtn.style.cursor = "pointer";

    newBtn.style.position = "absolute";

    if (i == 0) {
      newBtn.innerText = "<";

      newBtn.style.left = 10 + "px";

      newBtn.className = "turnPageLeftBtn";
    } else {
      newBtn.innerText = ">";

      newBtn.style.right = 10 + "px";

      newBtn.className = "turnPageRightBtn";
    }

    this.appendChild(newBtn);
  }

  /* 鼠标移入div 按钮背景色变深 */

  var leftBtnDiv = this.getEleByClassName("turnPageLeftBtn")[0];

  var rightBtnDiv = this.getEleByClassName("turnPageRightBtn")[0];

  this.onmouseover = function () {
    leftBtnDiv.style.opacity = 0.7;

    rightBtnDiv.style.opacity = 0.7;
  };

  /* 鼠标移出div 按钮背景色变深 */

  this.onmouseout = function () {
    leftBtnDiv.style.opacity = 0.2;

    rightBtnDiv.style.opacity = 0.2;
  };

  /* 创建变色小点 */

  var newDotDiv = document.createElement("div");

  newDotDiv.style.width = "100%";

  newDotDiv.style.position = "absolute";

  newDotDiv.style.bottom = 10 + "px";

  newDotDiv.style.textAlign = "center";

  this.appendChild(newDotDiv);

  for (var i = 0; i < sliderNum; i++) {
    var newSpan = document.createElement("span");

    newSpan.style.display = "inline-block";

    newSpan.style.backgroundColor = "#ffffff";

    newSpan.style.width = dotLen + "px";

    newSpan.style.height = dotLen + "px";

    newSpan.style.borderRadius = "50%";

    newSpan.style.cursor = "pointer";

    newSpan.style.marginLeft = 5 + "px";

    newSpan.style.marginRight = 5 + "px";

    if (i == 0) {
      newSpan.style.backgroundColor = "#f40";
    } else {
      newSpan.style.backgroundColor = "#ffffff";
    }

    newDotDiv.appendChild(newSpan);
  }

  /* 创建dom及样式 end */

  /* 创建事件 start */

  var sliderUl = this.getElementsByTagName("ul")[0];

  /* 自动轮播定时器 */

  var timer = setInterval(function () {
    sliderMove(sliderUl);
  }, 1000);

  /* 左侧按钮点击切换轮播图事件 */

  leftBtnDiv.onclick = function () {
    sliderMove(sliderUl, "left");
  };

  /* 右侧按钮点击切换轮播图事件 */

  rightBtnDiv.onclick = function () {
    sliderMove(sliderUl, "right");
  };

  /* 变色小点点击切换轮播图事件 */

  var sliderSpanArray = newDotDiv.getElementsByTagName("span");

  for (var i = 0; i < sliderSpanArray.length; i++) {
    (function (index) {
      sliderSpanArray[index].onclick = function () {
        lock = true;

        clearInterval(timer);

        startMove(sliderUl, { left: -sliderWidth * index }, function () {
          timer = setInterval(function () {
            sliderMove(sliderUl);
          }, 1500);

          lock = false;

          sliderIndex = index;

          changeIndex(sliderIndex);
        });
      };
    })(i);
  }

  /*轮播移动事件 direction left:向左轮播 right：向右轮播  默认：向左*/

  var lock = false;

  var sliderIndex = 0;

  function sliderMove(dom, direction) {
    // debugger;

    if (!lock) {
      lock = true;

      clearInterval(timer);

      if (!direction || direction == "left") {
        sliderIndex++;

        startMove(dom, { left: dom.offsetLeft - sliderWidth }, function () {
          if (dom.offsetLeft == -sliderNum * sliderWidth) {
            dom.style.left = "0px";

            sliderIndex = 0;
          }

          timer = setInterval(function () {
            sliderMove(sliderUl);
          }, 1500);

          lock = false;

          changeIndex(sliderIndex);
        });
      } else if (direction == "right") {
        if (dom.offsetLeft == 0) {
          dom.style.left = -sliderNum * sliderWidth + "px";

          sliderIndex = sliderNum;
        }

        sliderIndex--;

        startMove(dom, { left: dom.offsetLeft + sliderWidth }, function () {
          timer = setInterval(function () {
            sliderMove(sliderUl);
          }, 1500);

          lock = false;

          changeIndex(sliderIndex);
        });
      }
    }
  }

  /* 改变变色小点方法 */

  function changeIndex(index) {
    for (var i = 0; i < sliderSpanArray.length; i++) {
      sliderSpanArray[i].style.backgroundColor = "#ffffff";
    }

    sliderSpanArray[index].style.backgroundColor = "#f40";
  }

  /* 创建事件 end */

  /* 多物体不同值运动 */

  function startMove(dom, attrObj, callback) {
    clearInterval(dom.timer);

    var speed = null;

    var currentValue = null;

    dom.timer = setInterval(function () {
      var bStop = true;

      for (attr in attrObj) {
        if (attr == "opacity") {
          currentValue = parseFloat(getStyle(dom, attr)) * 100;
        } else {
          currentValue = parseInt(getStyle(dom, attr));
        }

        speed = (attrObj[attr] - currentValue) / 5;

        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (attr == "opacity") {
          dom.style[attr] = (currentValue + speed) / 100;
        } else {
          dom.style[attr] = currentValue + speed + "px";
        }

        if (currentValue != attrObj[attr]) {
          bStop = false;
        }
      }

      if (bStop) {
        clearInterval(dom.timer);

        if (typeof callback == "function") {
          callback();
        }
      }
    }, 30);
  }

  /* 获取样式 */

  function getStyle(dom, attr) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(dom, null)[attr];
    } else {
      return dom.currentStyle[attr];
    }
  }
};

/* 封装兼容性根据类名获取dom */

Element.prototype.getEleByClassName = Document.prototype.getEleByClassName =
  function (_className) {
    var tagArray = [].slice.call(this.getElementsByTagName("*"), 0);

    var resultArray = [];

    function trimSpace(str) {
      var reg = /\s+/g;

      return str.replace(reg, " ");
    }

    // debugger;

    tagArray.forEach((element) => {
      var targetStr = trimSpace(element.className).trim();

      var strArray = targetStr.split(" ");

      console.log(strArray);

      strArray.forEach((element1) => {
        if (element1 == _className) {
          resultArray.push(element);

          return false;
        }
      });
    });

    return resultArray;
  };

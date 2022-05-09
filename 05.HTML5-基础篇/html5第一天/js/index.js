var canvas = document.getElementById('snow');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


function snow () {
  context.save();  //- 保存画布原来的位置
  context.beginPath(); //- 开启路径
  context.translate(100, 100) //- 移动画布  x y 
  context.moveTo(-20, 0); //- 线的开始位置
  context.lineTo(20, 0) //-  线结束的位置
  context.strokeStyle = '#fff';  //- 颜色
  context.lineWidth = 10;    //- 宽度
  context.lineCap = 'round';   //- 圆角
  context.stroke(); //- 开始进行绘画

  //- 角度转弧度的计算
  var disX = Math.sin(30 * Math.PI / 180) * 20;
  var disY = Math.sin(60 * Math.PI / 180) * 20;

  /* 第二条线 */
  context.moveTo(-disX, disY);
  context.lineTo(disX, -disY);
  //- 第三条线
  context.moveTo(-disX, -disY);
  context.lineTo(disX, disY);
  context.stroke();   //- 开始进行重复绘画
  context.restore();  //- 绘画完成恢复原来的位置
  context.closePath();   //- 关闭绘画路径
}

// snow();


function Snow (x, y, scale, rotate, speedX, speedY, speedR) {
  this.x = x;
  this.y = y;
  this.scale = scale;
  this.rotate = rotate;
  this.speedX = speedX;
  this.speedY = speedY;
  this.speedR = speedR;
}

Snow.prototype.render = function () {
  context.save();  //- 保存画布原来的位置
  context.beginPath(); //- 开启路径
  context.translate(this.x, this.y) //- 移动画布  x y 
  context.scale(this.scale, this.scale) //- 缩放比例
  context.rotate(this.rotate * Math.PI / 180);
  context.moveTo(-20, 0); //- 线的开始位置
  context.lineTo(20, 0) //-  线结束的位置
  context.strokeStyle = '#fff';  //- 颜色
  context.lineWidth = 10;    //- 宽度
  context.lineCap = 'round';   //- 圆角
  context.stroke(); //- 开始进行绘画
  //- 角度转弧度的计算
  var disX = Math.sin(30 * Math.PI / 180) * 20;
  var disY = Math.sin(60 * Math.PI / 180) * 20;
  /* 第二条线 */
  context.moveTo(-disX, disY);
  context.lineTo(disX, -disY);
  //- 第三条线
  context.moveTo(-disX, -disY);
  context.lineTo(disX, disY);
  context.stroke();   //- 开始进行重复绘画
  context.restore();  //- 绘画完成恢复原来的位置
  context.closePath();   //- 关闭绘画路径
}
// var s = new Snow(50,50,1,10);
// s.render();
var snowArr = [];

var init = function () {
  for (var i = 0; i < 100; i++) {
    var x = Math.random() * canvas.width;
    var scale = Math.random() + 0.5;  //- 缩放比例欸
    var rotate = Math.random() * 60;   //- 旋转的角度
    var speedX = Math.random() + 1;        //- x轴移动的速度
    var speedY = Math.random() + 5;    //- 下降的速度
    var speedR = Math.random() * 4 + 2;  //- 旋转的速度

    (function (x, y, scale, rotate, speedX, speedY, speedR) {

      setTimeout(function () {
        var snow = new Snow(x, y, scale, rotate, speedX, speedY, speedR);
        snow.render();
        snowArr.push(snow);
      }, Math.random() * 8000)

    })(x, 0, scale, rotate, speedX, speedY, speedR)
  }
  snowing();
}

function snowing () {
  //- 收集生成的雪花对象，进行重置操作，改变生成位置，
  setInterval(function () {
    //- 之前的信息进行清除操作
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < snowArr.length; i++) {
      snowArr[i].x = (snowArr[i].x + snowArr[i].speedX) % canvas.width;
      snowArr[i].y = (snowArr[i].y + snowArr[i].speedY) % canvas.height
      snowArr[i].rotate = (snowArr[i].rotate + snowArr[i].speedR) % 60;
      snowArr[i].render();
    }
  }, 30);
}


init();

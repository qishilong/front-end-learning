var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var list = [];

//- 创建random函数
var random = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

canvas.addEventListener("mousemove", function (e) {
  list.push(new Circle(e.clientX, e.clientY))
})


function Circle (x, y) {
  this.x = x;
  this.y = y;
  //- 设置一个随机产生的速度值
  this.vx = (Math.random() - 0.5) * 3;
  this.vy = (Math.random() - 0.5) * 3;
  this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')'
  this.a = 1; //- 透明度
}


Circle.prototype = {
  draw () {
    context.beginPath();
    context.fillStyle = this.color;
    context.globalAlpha = this.a;
    context.globalCompositeOperation = 'lighter';
    context.arc(this.x, this.y, 30, 0, Math.PI * 2);
    context.fill();
    this.update();
  },
  update () {
    this.x += this.vx;
    this.y += this.vy;
    this.a *= 0.98;
  }
}

function render () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  list.forEach(function (item, index) {
    item.draw();
    if (item.a < 0.05) {
      list.splice(index, 1)
    }
  })
  requestAnimationFrame(render);
}

render();
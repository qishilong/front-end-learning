//- 获取canvas实例化对象 
//- 获取一个2D对象
var context = canvas.getContext("2d");

var img = new Image();
img.src = './img/img_01.jpg'
// document.body.appendChild(img);
img.onload = function () {
  /* 1- 在canvas里面实现绘图 依靠一张图片 */
  //- 图片对象 使用的时候保证加载完成在进行使用
  // context.drawImage(this, 0, 0)
  // context.drawImage(this, 50, 50, 200, 200);  //- 图片的大小    使用http协议进行base64图片的访问
  context.drawImage(this, 450, 70, 130, 150, 50, 50, 400, 400);  //- 图片的大小 从原始图片450，70的位置，截取了130，以及150，的像素图片，最后在画布里面x50，y50的位置开始进行展示，展示的大小是400*400

  //-2 导出图片
  var imgSrc = canvas.toDataURL();
  var newImg = document.querySelector('img');
  newImg.src = imgSrc;

  //- 3 操作像素的处理，定义像素信息
  var pxInfo = context.getImageData(0, 0, 500, 500);
  // console.log(imgSrc)
  //- todo 交给高斯模糊的函数来进行处理

  //- 重进行画布的渲染
  context.putImageData(pxInfo, 50, 50)
}

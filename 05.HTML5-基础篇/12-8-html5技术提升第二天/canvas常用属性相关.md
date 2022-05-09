# [CANVAS属性，方法](https://www.cnblogs.com/xinyouhunran/p/10968096.html)

**基于：**
var canvas = document.getElementById('id');
var ctx = canvas.getContext('2d');

**1.样式：**
ctx.fillStyle = 'color'-填充色
ctx.strokeStyle = 'color'-线色
ctx.lineWidth = 'length'-线宽
lineCap = type-设置线条末端的外观。
lineJoin = type-设置线条相交的“角落”的外观。
miterLimit = value-当两条线以锐角连接时，建立一个斜接限制，以控制结的厚度。
getLineDash()-返回包含偶数个非负数的当前行虚线模式数组。
setLineDash(segments)-设置当前行虚线模式。
lineDashOffset = value-指定在一行上启动破折号数组的位置。

**2.画矩形：**
ctx.fillRect(x, y, width, height)-填充矩形
ctx.strokeRect(x, y, width, height)-非填充矩形，只有边框
ctx.clearRect(x, y, width, height)-清除范围

**3.画路径**
ctx.beginPath()-开始画
ctx.moveTo(x,y)-算是定义起点吧
ctx.lineTo(x,y)-连线到某点
ctx.fill()-会自动闭合
ctx.stroke()-不会闭合
ctx.closePath()-关闭绘画

**4.画圆**
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)-radius代表半径，anticlockwise代表顺时针，逆时针(boolean)

**5.曲线**
quadraticCurveTo(cp1x, cp1y, x, y)-xy偏离一致的曲线
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)-想怎么偏怎么偏

**6.new Path2D()**:创建一个2d路径对象，对此对象进行操作，最后成为stroke()或fill()的参数。

**7.渐变**
createLinearGradient(x1, y1, x2, y2)
createRadialGradient(x1, y1, r1, x2, y2, r2)
gradient.addColorStop(position, color)（0~1，color）

**8.模式**
createPattern(image, type)-创建并返回一个新的画布模式对象
image是一个Canvasimgource,type是一个表示如何使用图像的字符串(如平铺)

**9.阴影**
shadowOffsetX = float
指示阴影应从对象延伸的水平距离。该值不受变换矩阵的影响。默认值为0。
shadowOffsetY = float
指示阴影应从对象延伸的垂直距离。该值不受变换矩阵的影响。默认值为0。
shadowBlur = float
表示模糊效果的大小; 该值不对应于多个像素，并且不受当前变换矩阵的影响。默认值为0。
shadowColor = color
标准CSS颜色值，表示阴影效果的颜色; 默认情况下，它是完全透明的黑色。

**10.绘文字**
fillText(text, x, y [, maxWidth])
在给定（x，y）位置填充给定文本。可选择绘制最大宽度。
strokeText(text, x, y [, maxWidth])
在给定（x，y）位置描边给定文本。可选择绘制最大宽度。
font = value
绘制文本时使用的当前文本样式。此字符串使用与CSS font属性相同的语法。默认字体是10px sans-serif。
textAlign = value
文本对齐设置。可能的值：start，end，left，right或center。默认值为start。
textBaseline = value
基线对齐设置。可能的值：top，hanging，middle，alphabetic，ideographic，bottom。默认值为alphabetic。
direction = value
方向性。可能的值：ltr，rtl，inherit。默认值为inherit。
measureText()
返回一个TextMetrics对象，该对象包含以当前文本样式绘制时指定文本的宽度

**11.图像**
drawImage(image, x, y,width,height)
绘制坐标（x，y）处Canvasimgource的image参数指定的值。
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)-切片
给定一个image，该功能只通过其左上角是矩形指定的源图像的区域（sx，sy其宽度和高度是），并sWidth与sHeight和它绘制到画布，
在将其放置在画布上（dx，dy）和缩放它由指定的大小dWidth和dHeight。

**12.保存和恢复状态**
save()
保存画布的整个状态。
restore()
恢复最近保存的画布状态。
画布状态存储在堆栈中。每次save()调用该方法时，当前绘图状态都会被压入堆栈。
您可以save()根据需要多次调用该方法。每次restore()调用该方法时，最后保存的状态将从堆栈中弹出，并恢复所有保存的设置。

**13.动画**
translate(x, y)
rotate(angle)
scale(x, y)
transform(a, b, c, d, e, f)//矩阵
setTransform(a, b, c, d, e, f)
将当前变换重置为单位矩阵，然后transform()使用相同的参数调用该方法。这基本上撤消了当前的转换，然后在一个步骤中设置指定的转换。
resetTransform()
将当前变换重置为单位矩阵。
使用动画，使用window.requestAnimationFrame()而不是window.setInterval()
window.cancelAnimationFrame();取消帧动画

**14.合成**
globalCompositeOperation = type
这将设置在绘制新形状时应用的合成操作的类型，其中type是一个字符串，用于标识要使用的十二个合成操作中的哪一个。

**15.clip()**剪切路径

**16.获取上下文的像素数据**
ctx.getImageData(left, top, width, height);
此方法返回一个ImageData对象，该对象表示画布区域的像素数据，其角点由点（left，top），（left+width，top），（left，top+height）和（left+width，top+height）表示。坐标以画布坐标空间单位指定。

**17.将像素数据绘制到上下文中**
ctx.putImageData(myImageData, dx, dy);
该dx和dy参数显示在其中进行绘制要绘制的像素数据的左上角的范围内的设备坐标。

**18.保存图像**
canvas.toDataURL('image/png')
默认设置。创建PNG图像。
canvas.toDataURL('image/jpeg', quality)
创建JPG图像。或者，您可以提供0到1范围内的质量，其中一个是最好的质量，0几乎不可识别但文件大小很小。
canvas.toBlob(callback, type, encoderOptions)
创建Blob表示画布中包含的图像的对象。

**19.命中区域**
CanvasRenderingContext2D.addHitRegion()
在画布中添加命中区域。
CanvasRenderingContext2D.removeHitRegion()
使用id画布中指定的内容删除命中区域。
CanvasRenderingContext2D.clearHitRegions()
从画布中删除所有命中区域。
检查MouseEvent.region属性以测试鼠标是否正在击中您的区域

**20.聚焦环**
CanvasRenderingContext2D.drawFocusIfNeeded()
如果给定元素被聚焦，则此方法围绕当前路径绘制聚焦环。
CanvasRenderingContext2D.scrollPathIntoView()
将当前路径或给定路径滚动到视图中。

**21.基于canvas封装的代码片段**（https://developer.mozilla.org/en-US/docs/Archive/Add-ons/Code_snippets/Canvas）
获取画布中某种颜色的像素数
获取画布中像素的颜色
链接方法
将画布图像保存到文件
将远程页面加载到画布元素上
将图像文件转换为base64字符串
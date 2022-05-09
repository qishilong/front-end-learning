// 初始化魔方

// 获取到最外层容器
var container = document.querySelector('.container');
// 获取到魔方容器
var wrap = document.querySelector('.wrap');

for (var i = 1; i <= 28; i++) {
    wrap.innerHTML += `
        <div class="box">
            <div>${i}</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    `;
}

// 魔方的背景颜色
var boxBg = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#564545', '#607d8b', '#405d6b', '#9e9e9e', '#70737d', '#389fa0', '#38a05e', '#b3c981', '#76a803', '#fecf43', '#e2785f'];
// 创建一个 style 标签
var style = document.createElement('style');
var str = "";

for (var i = 0; i < boxBg.length; i++) {
    str += `
        .box:nth-child(${i + 1}) div{
            background: ${boxBg[i]} url('../img/${i + 1}.png') no-repeat center;
        }
    `;
}

style.innerHTML = str;
document.head.appendChild(style);

// 4 个方向的选择并不困难，我们通过一个数组来存储
// 从上往下、从右往左、从下往上、从左往右
var rot = ['rotateX(-180deg)', 'rotateY(-180deg)', 'rotateX(180deg)', 'rotateY(180deg)'];


/**
 * 
 * @param {*} ev 当前事件对象
 * @param {*} box 当前的魔方
 * @returns 返回 0～3 的数字
 */
function getDir(ev, box) {
    // 获取当前魔方的 left 和 top 值以及宽高
    var l = box.getBoundingClientRect().left;
    var t = box.getBoundingClientRect().top;

    var w = box.getBoundingClientRect().width;
    var h = box.getBoundingClientRect().height;

    // 利用 left 和 top 配合 clientX 和 clientY 计算出一个新的 x 和 y
    var x = ev.clientX - l - w / 2;
    var y = ev.clientY - t - h / 2;
    // 经过分析，我们发现上面的 x 和 y 就是当前鼠标移入的点的坐标

    // 根据坐标点得到角度
    var deg = Math.atan2(y, x) / (Math.PI / 180);

    var d = (Math.round((deg + 180) / 90) + 3) % 4;

    return d;
}

// 为魔方绑定事件

var boxs = document.querySelectorAll('.box');
// 背景颜色数组
var bodyBg = ['#F7E8ED', '#F2D9E6', '#ECC6DE', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#E0E1F5', '#F7E8ED', '#F2D9E6', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#DFD1F0', '#6161616'];	//body背景色

boxs.forEach(function (box) {
    box.onmouseenter = function (ev) {
        // 首先获取鼠标移入魔方的方向
        var dir = getDir(ev, this);
        this.style.transform = 'translateZ(70px) ' + rot[dir];
        // 背景颜色也要变化
        document.body.style.background = bodyBg[Math.round(Math.random() * (bodyBg.length - 1))]
    }
    box.onmouseleave = function () {
        this.style.transform = "";
    }
})

// 最后，制作鼠标跟随偏移事件
// 该事件对在整个页面有效

document.onmousemove = function (ev) {
    var x = (0.5 - ev.clientY / window.innerHeight) * 20;
    var y = (ev.clientX / window.innerWidth - 0.5) * 20;
    container.style.transform = `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`;
}
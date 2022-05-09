// 获取 DOM 元素

var ul = document.querySelector('.content');
var container = document.querySelector('.container');

// 初始化元素的内容

for (var i = 1; i <= 6; i++) {
    ul.innerHTML += `
        <li class="item">
            <div class="inner">
                <div class="bg"></div>
                <div class="title">
                    <h2>image</h2>
                </div>
                <div class="dir">
                    <div class="header">bird</div>
                    <div class="close"></div>
                </div>
            </div>
        </li>
    `;
}

// 初始化效果，一开始的时候每一个 li 要飞入上去
// 其实就是把容器上面的 init 类去除掉即可
setTimeout(function () {
    container.classList.remove('init');
}, 200)

// 最后就是点击事件对应的展开效果
// 其实 JS 这边非常简单，就是点击之后添加样式类即可
// 要添加的样式类有 2 个
// container（最外层容器） 上面要添加一个 container-active
// item（li）上面要添加一个 active


// 获取到所有 li 的集合
var lis = document.querySelectorAll('.item');
for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
        this.classList.add('active');
        container.classList.add('container-active');
    }
}

// 关闭按钮对应的事件要做的事儿也很简单
// 就是把上面我们添加的类移出掉即可
var closeBtns = document.querySelectorAll('.close');
for (var i = 0; i < closeBtns.length; i++) {
    closeBtns[i].onclick = function(e){
        var li = document.querySelector('.active');
        if(li !== null){
            e.stopPropagation();
            li.classList.remove('active');
            container.classList.remove('container-active');
        }
    }
}
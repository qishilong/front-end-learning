//计时器功能
var minutesNode = document.getElementsByTagName('input')[0];
var secondsNode = document.getElementsByTagName('input')[1];
var minutes = 0,
    seconds = 0;
var timer = setInterval(function() {
    seconds ++;
    if(seconds == 60){
        seconds = 0;
        minutes ++;
    }
    secondsNode.value = seconds;
    minutesNode.value = minutes;
    if(minutes == 3){
        clearInterval(timer);
    }
}, 10);

//封装兼容性方法（哪个浏览器都好用），求滚动轮滚动距离 getScrollOffset()——求滚动条的位置
function getScrollOffset() {
    if(window.pageXOffset) {
        return {
            x : window.pageXOffset,
            y : window.pageXOffset
        }
    }else{
        return {
            x : document.body.scrollLeft + document.documentElement.scrollLeft,
            y : document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

//查看视口的尺寸(可视区窗口就是编写的 html 文档可以看到的部分，不含菜单栏、地址栏、控制台)
function getViewportOffset() {
    if(window.innerWidth) {
        return {
            w : window.innerWidth,
            h : window.innerHeight
        }
    }else{
        if(document.compatMode == "BackCompat"){
            return {
                w : documetn.body.clientWidth,
                h : document.body.clientHeight
            }
        }else{
            return {
                w : document.documentElement.clientWidth,
                h : document.documentElement.clientHeight
            }
        }
    }
}

//function getStyle (elem,prop){}
//elem 是指获取的谁（dom 元素），prop 是获取的是什么属性
var div = document.getElementsByTagName('div')[0];
function getStyle() {
if(window.getComputedStyle) {
    return window.getComputedStyle(elem, null)[prop];
    }else{
        return elem.currentStyle[prop];
    }
}

//拖拽功能（鼠标按住方块跟着动，松开就不跟着走）
function drag(elem) {
    var disX,
        disY;
    addEvent(elem, 'mousedown', function (e) {
        var event = e || Window.event;
        disX = event.clientX - parseInt(getStyle(elem, 'left'));
        disY = event.clientY - parseInt(getStyle, 'top');
        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        stopBubble(event);
        cancleHandler(event);
    });
    function mouseMove(e) {
        var event = e || Window.event;
        elem.style.left = event.clientX - disX + 'px';
        elem.style.top = event.clientY - disY + 'px';
    }
    function mouseUp(e) {
        var event = e || window.event;
        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, 'mouseup', mouseUp);
    }
}

//异步加载js方法（三种方法）
function loadScript(url, callback) {
    //方法1
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if(script.readyState) {
        script.onreadystatechange = function () {//IE
            if(script.readyState == 'complete' || script.readyState == 'loaded') {
                callback();
            }
        }
    }else{
        script.onload = function () {
            callback();
        }
    }
    script.src = url;
    document.head.appendChild(script);
    // loadScript('demo.js', test); 此刻显示test未被定义
    //{ 执行顺序：先 function loadScript(){}【不会看里面的代码是什么】，再 loadScript()【这
    //一步的时候不知道 test 是什么】，然后执行 function 里面的内容 }
    //为了解决上面的问题，如下
    loadScript('demo.js', function () {
        test();
    })
    
    //方法2
    //利用 callback 变成字符串形式（不让用 eval，只做拓展）
    var script = document.createElement('script');
    script.type = 'type/javascript';
    if(script.readyState){
        script.onreadystatechange = function () {//IE
            if(script.readyState == 'complete' || script.readyState == 'loaded') {
                eval(callback);
            }
        }
    }else{
        script.onload = function () {
            eval(callback);
        }
    }
    script.src = url;
    document.head.appendChild;

    //方法3
    //以下是更好的方法，需要配合库实现
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if(script.readyState) {
        script.onreadystatechange = function () {//IE
            if(script.readyState == 'complete' || script.readyState == 'loaded') {
                tools[callback]();
            }
        }
    }else{
        script.onload = function () {
            tools[callback]();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}
//方法3调用执行方法(loadScript('demo.js', 'test');)

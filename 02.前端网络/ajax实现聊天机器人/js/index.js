(function () {

  //- 程序入口函数
  var init = function () {
    initEvents();
  }

  //- 事件入口函数
  var initEvents = function () {
    sendBtn.addEventListener("click", onSendBtnClick)
  }

  //- 按钮事件函数
  var onSendBtnClick = function () {
    var txt = inputNode.value.trim();
    if (!txt) return
    //- 渲染自己输入的内容到界面上
    renderSelfChatInfo(txt);
  }

  //- 自己输入的内容函数
  var renderSelfChatInfo = function (txt) {
    //- 将我们自己的内容生成一套结构，
    renderHtml(txt, 'right');
    //- 发送数据
    sendChatInfoToBackEnd(txt);
  }

  var sendChatInfoToBackEnd = function (txt) {
    ajax({
      url: 'https://api.hyfarsight.com/test/testRequest/robotChat',
      method: "POST",
      data: { txt: txt },
      onSuccess: function (res) {
        renderHtml(res.responseTxt, 'left');
      }
    })
  }

  //- 生成页面结构函数
  var renderHtml = function (txt, direction) {
    var parentDiv = document.createElement('div');
    parentDiv.className = direction === 'right' ? 'chat-container avatar-container' : 'chat-container'
    var img = document.createElement('img');
    img.src = direction === 'right' ? './img/avatar.jpg' : './img/robot.jpg'
    var childNode = document.createElement('div');
    childNode.className = 'chat-txt';
    childNode.innerHTML = txt.replace(/{br}/g, '<br/>');

    parentDiv.appendChild(img);
    parentDiv.appendChild(childNode);
    contentContainer.appendChild(parentDiv)

    //- todo  监听到底的事件，键盘回车的时候执行发送事件
  }

  init();
})()
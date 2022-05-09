var init = function () {
  initEvents();
}


var initEvents = function () {
  //- 点击按钮展示下拉菜单 */   
  $('.btn').on('click', function () {
    //- 动画的阻止
    if($(':animated').length) return 
    $('.drop-list').slideToggle();
  })

  $('window').on('hashchange', function () {
    console.log('hash Change')
  })

  $('.list-item').on('click', function () {
    var id = $(this).attr('data-id');

    window.location.hash = id

    //- 调整背景颜色
    console.log()
    $(this)
    .addClass('on')
    .siblings('.on')
    .removeClass('on')
  })
}

init()
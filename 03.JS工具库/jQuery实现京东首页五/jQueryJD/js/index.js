$('.shortcut .w').load('../components/shortcut.html');
$('.header .w').load('../components/header.html');
$('.fs-1').load('../components/menu.html');

$('.sliderWraper').load('../components/sliderWraper.html', function () {
  $(this).swiper({
    type: 'fade',
    contentList: $(this).find('a'),
    dotPosition: 'left',
    dotSize: 10,
    showDots: true,
  });
});

$('.sliderBanner').load('../components/sliderBanner.html', function () {
  $(this).swiper({
    type: 'fade',
    contentList: $(this).find('div'),
    showDots: false,
    showChangeBtn: 'hover'
  })
});

// user
$('.user').load('../components/user.html');
$('.news').load('../components/news.html');
$('.service').load('../components/service.html');

$('.seckill').load('../components/seckill.html');


## 完成头部区域



今天的最后一个任务，就是完成头部区域。

首先还是创建对应的模块文件 *header.html* 和 *header.css*，然后引入对应模块：

```js
// 加载 header 模块中的内容
$('.header .w').load('../components/header.html')
```



然后观察头部区域，可以看到整个头部区域也是可以分为 *3* 个部分的


所以我们对应的结构如下：

```html
<div class="header-content">
    <!-- logo 区域 -->
    <div class="logo"></div>

    <!-- 搜索框 -->
    <div class="search-box"></div>

    <!-- 广告区域 -->
    <div class="ad"></div>
</div>
```



同样，先把这 *3* 个部分用边框标记出来，对应的 *css* 如下：



该模块的整体样式

```css
/* 整体样式开始 */

li {
    list-style: none;
}

a {
    text-decoration: none;
    font-weight: 200;
}

a.red {
    font-weight: 400;
    color: #e1251b !important;
}

.header-content {
    position: relative;
    width: 100%;
    height: 140px;
}

/* 整体样式结束 */
```



logo 部分样式占位

```css
/* logo 样式开始 */

.logo {
    width: 190px;
    height: 120px;
    overflow: hidden;
    position: absolute;
    top: 10px;
    outline: 1px solid;
}
```



搜索框部分样式占位

```css
/* 搜索框样式开始 */

.search-box {
    position: absolute;
    left: 200px;
    height: 100%;
    right: 190px;
    outline: 1px solid;
}
```



广告区域样式占位

```css
/* 广告区域样式开始 */

.ad {
    position: absolute;
    right: 0;
    bottom: 10px;
    width: 190px;
    height: 120px;
    outline: 1px solid;
}
```



至此，*header* 部分的布局就搞定了，如下：




接下来我们逐一攻破，首先是 *logo*，这部分很简单，就是一张图片

```html
<!-- logo 区域 -->
<div class="logo">
  <img src="http://misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/sprite/header/sprite.png" alt=""
       class="target" />
</div>
```



然后是搜索框，这个部分又可以分为 *4* 个部分，如下：




所以我们对应的 *html* 结构如下：

```html
 <!-- 搜索框 -->
<div class="search-box">
  <!-- 搜索框表单 -->
  <div class="search-form"></div>
  <!-- 热门词汇 -->
  <div class="hotwords"></div>
  <!-- 购物车模块 -->
  <div class="settleup"></div>
  <!-- 导航栏区域 -->
  <ul class="navitems"></ul>
</div>
```



接下来依然逐一攻破，每部分对应的结构如下：

现在index.css中引入icon图标

搜索框表单：

```html
<!-- 搜索框表单 -->
<div class="search-form">
      <input type="text" id="search-inp" placeholder="外置光驱" />
      <a href="#" class="search-btn iconfont icon-fangdajing"></a>
      <!-- 联想项目 -->
      <ul class="search-list"></ul>
```

购物车模块：

```html
 <!-- 购物车模块 -->
<div class="settleup">
  <div class="cw-icon">
        <i class="iconfont icon-gouwuche"></i>
        <a target="_blank" href="//cart.jd.com/cart.action">我的购物车</a>
        <i class="ci-count" id="shopping-amount">0</i>
      </div>
</div>
```

导航栏区域：

```html
<!-- 导航栏区域 -->
<ul class="navitems">
  <li><a href="#" class="red">秒杀</a></li>
  <li><a href="#" class="red">优惠券</a></li>
  <li><a href="#">PLUS会员</a></li>
  <li><a href="#">品牌闪购</a></li>
  <li><a href="#">拍卖</a></li>
  <li><a href="#">京东家电</a></li>
  <li><a href="#">京东超市</a></li>
  <li><a href="#">京东生鲜</a></li>
  <li><a href="#">京东国际</a></li>
  <li><a href="#">京东金融</a></li>
</ul>
```



唯独没有“热门词汇”这一块，因为这一块是后面 *JS* 动态填入内容的。



接下来完善该部分 *css* 样式，具体的 *css* 不在笔记中列出，具体参阅源代码。

完成后的效果如下：



至于广告区域，直接从官网拿来用即可

```html
<!-- 广告区域 -->
<div class="ad">
  <!-- 直接从京东官网将此部分结构拿过来即可 -->
  <a id="J_promo_lk" class="promo_lk"
     href="//pro.jd.com/mall/active/2S7ULD94H4vvkQc8qhZxBi4sHXw1/index.html?babelChannel=ttt4" target="_blank"
     clstag="h|keycount|head|adbtn_01" aria-label="推广位"
     style="background-image: url(&quot;//img30.360buyimg.com/babel/jfs/t1/182371/6/7822/28758/60bd8cb0Ec02474e4/7c65702ebe4c260c.png.webp&quot;); background-size: cover;">
  </a>
</div>
```



接下来，我们需要完成“热门词汇”这个部分。

前面也说了，这个部分是通过 *JS* 动态渲染的。正常真实项目中，这部分内容也是从服务器获取到的，而不是写死的。

但是我们现在没有服务器，怎么办呢？



我们可以使用 *Mock* 来模拟服务器提供的数据。

在项目根目录下新创建一个 *Api* 的目录，模拟发送请求的请求接口函数，目录下创建 *searchApi.js*，代码如下：



```js
// 热门关键词
Mock.mock('/hotwords', {
    'result|8-15': [{
        word: '@cword(2,5)',
        href: '@url(http)'
    }]
});

// 推荐的热门关键词
Mock.mock('/recommendWords', {
    word: '@cword(2,5)',
    href: '@url(http)'
})
```



这里我们创建了 *2* 个 *Mock* 拦截，一个是热门关键词，一个是推荐热门。然后在 *index.html* 中引入该文件。



接下来回到 *header.html*，通过 *ajax* 来请求数据，然后将拿到的数据渲染到“热门词汇”，如下：

```js
// 获取热门关键词业务逻辑
$.ajax({
  url: "/hotwords",
  dataType: "json",
  success: function (res) {
    // 拿到关键词之后 进行渲染
    // console.log(res); {result: Array(12)}
    // 拼接热门关键词的结构
    // 这里可以讲解不同的拼接方式

    // 拼接方式一
    // var str = res.result.reduce(function (prev, item) {
    //     return prev + `<a href="${item.href}">${item.word}</a>`;
    // }, "");

    // 拼接方式二
    var str = res.result.map(function (item) {
      return `<a href="${item.href}">${item.word}</a>`;
    }).join("");
    // console.log(str);
    // <a href="http://whrfudb.va/dejeayyhmn">分四地取及</a><a href="http://szgwkudi.中国互联.公司/pvvwy">公处</a>...
    // 渲染到页面当中
    $(".hotwords").html(str);
  },
});
```



由于第一个热门关键词是一直在变化的，所以我们需要书写一个计时器，然后每隔一段时间就重新请求热门关键词，如下：

```js
// 获取第一个随机的热门关键词业务逻辑
var recommendTimer = null;
function randomWord() {
  // 因为第一个热门关键词一直在变化，所以定义一个 2 秒的计时器，每隔
  recommendTimer = setInterval(function () {
    $.ajax({
      url: "/recommendWords",
      dataType: "json",
      success(res) {
        // console.log(res);  {word: "写参引分", href: "http://stzeds.za/ttjqhalf"}
        // 获取到推荐的热门关键词之后，更新第一个热门关键词
        $(".hotwords")
          .find("a")
          .eq(0)
          .text(res.word)
          .attr("href", res.href);
      },
    });
  }, 2000);
}
randomWord();
```



## 完成推荐词鼠标移入移出功能



昨天，我们已经制作了热门推荐词的更新，其实就是一个计时器，不停的发送 *ajax* 请求来更新热门推荐词。

但是热门推荐词这个功能还不够完善，当用户的鼠标移入时，应该停止变换热门推荐词，鼠标移出时继续更新推荐词。



这个功能比较简单，为热门推荐词绑定一个鼠标的移入移出事件即可。代码如下：

```js
// 当鼠标移入热门关键词的第一个关键词的时候，不进行切换
// 理想？
// $('.hotwords')
//   .find('a')
//   .eq(0)
//   .mouseenter(function () {
//     clearInterval(timer);
//   })
//   .mouseleave(function() {
//     recommond();
//   })
// 现实！异步问题
// 事件委托
$('.hotwords')
  .on('mouseenter', 'a', function (e) {
  if ($(e.target).index() == 0) {
    clearInterval(timer);
  }
})
  .on('mouseleave', 'a:first-of-type', function () {
  recommond();
});
```



## 完成联想项目

当用户在搜索栏输入内容时，需要对用户的内容进行联想。

那么，这时就涉及到一个问题，联想的数据从哪里来？使用 *Mock* 生成么？

很明显不是，上面的联想数据实际上我们是从淘宝“偷”来的。



那么接下来回到我们的代码，需要个 *input* 输入框绑定一个 *input* 事件，注意做一下防抖处理。代码如下：

```js
// 用户在搜索框输入内容时，实时的返回联想信息
var timer = null;
$("#search-inp").on("input", function () {
  var val = $(this).val(); // 获取用户输入的内容
  // 这里有一个函数防抖的处理
  if (val) {
    clearTimeout(timer); // 先清除上一次的计时器
    // 然后定义新的计时器
    timer = setTimeout(function () {
      $.ajax({
        url: "https://suggest.taobao.com/sug",
        data: {
          code: "urf-8",
          q: val,
          callback: "searchCb",
        },
        dataType: "jsonp",
      });
    }, 500);
  }
});
```

在上面的代码中，我们为 *input* 绑定了一个 *input* 事件，用户输入的时候，将用户输入的内容发送 *ajax* 请求来获取数据。

获取到的数据交给 *searchCb* 回调函数处理，代码如下：

```js
// 拿到搜索的结果数据之后要做页面的渲染
// 之所以挂在 window 对象上面，是因为它在立即执行函数里面
window.searchCb = function (res) {
  var str = res.result.reduce(function (prev, item) {
    return (
      prev +
      `<li>
        <span class="product-name">${item[0]}</span>
        <span class="product-number">约${parseInt(item[1])}个商品</span>
        </li>`);
  }, "");
  if (res.result.length == 0) {
    str = `<li>未搜索到相关信息</li>`;
  }
  $(".search-list").html(str).show();
};
```



至此，联想功能就搞定了。



但是现在这个联想功能还有一些小瑕疵，那就是这个联想框出来了就不会隐藏掉，所以我们要把这个问题解决一下。

这个问题解决也很简单，为整个输入表单绑定一个鼠标移入移出事件即可。代码如下：

```js
// 鼠标移出搜索框以及联想框时，隐藏搜索联想栏
var listHideTimer = null;
$(".search-form").mouseleave(function () {
  // 这里同样做了函数防抖处理
  clearTimeout(listHideTimer);
  listHideTimer = setTimeout(function () {
    $(".search-list").hide();
  }, 1000);
}).mouseenter(function () {
  // 如果鼠标移出搜索框以及联想框，之后又快速移回去，则不隐藏，取消掉之前的计时器
  if (listHideTimer) {
    clearTimeout(listHideTimer);
  }
});
```



至此，整个联想项目完成。

## 完成轮播图区域左侧导航



接下来我们来书写轮播区域的左侧导航栏。

首先还是要新建一个模块。在对应目录创建 *menu.html* 以及 *menu.css*，然后在 *index.html* 中引入  *menu.css*，*index.js* 中加载 *menu.html*



首先还是分析，左侧导航的结构是什么样的。

根据这个结构，我们的左侧导航的 *HTML* 结构也就出来了，如下：

```html
<!-- 左侧的菜单栏，一开始是空的，动态请求数据 -->
<ul class="menu">
    menu
</ul>
<!-- 隐藏栏目，鼠标放到菜单栏时会出现 -->
<div class="menu-content">
    <!-- 上面黑色的 tab 栏目 -->
    <div class="tabs">
    	 <!-- <a href="#">商品</a> -->
    </div>
    <!-- 下面的各个分类 -->
    <div class="details">
  	<!-- <dl class="menu-item-details">
      <dt class="menu-item-title">
        <a href="#">习数</a>
      </dt>
      <dd class="menu-item"><a href="http://mpdwrjquy.lu/cticudsg">强通格中</a><a
          href="http://xppokhzgt.中国互联.网络/nfesdxn">省么因</a><a href="http://jmohrrj.gr/zonqa">装传适叫</a><a
          href="http://qggkj.cl/qpciymsqh">单工过</a><a href="http://xpgpgrg.tg/twgoa">与则约形</a><a
          href="http://pheebb.sr/plupp">后事</a><a href="http://vleoouxpn.zr/bauxqpnnv">非什光</a><a
          href="http://zqcsntc.hk/lwjlpwsn">展才件</a></dd>
    </dl> -->
  	</div>
</div>
```

其中 *ul* 存放左侧导航栏的内容，一开始是空的，需要从服务器请求数据。

下面的 *div* 是二级菜单，整个二级菜单又分为两个部分，上面的 *tab* 部分和下面的 *details* 部分。



*OK*，结构搞定后，我们一个部分一个部分来写。

首先需要 *Mock* 能够给我们返回数据。所以新建一个 *menuApi.js*，记得在 *index.html* 引入一下。

整个 *menuApi.js* 提供的 *Mock* 接口如下：

```js
Mock.mock("/menu", {
    // 18 代表的是数组的长度
    'data|18': [{
        // 2-4 代表数组长度在2-4范围内
        // title 表示左侧菜单栏项目的名字
        'titles|2-4': [{
            // @cword(2,4) 代表的是随机生成2-4个汉字
            name: '@cword(2,4)',
            // 随机生成一个 http 的链接地址
            href: '@url(http)'
        }],
        content: {
            // tabs 为隐藏栏目上面的黑色标签
            'tabs|2-5': [{
                name: '@cword(2,4)',
                href: '@url(http)'
            }],
            // details 为下面的具体分类
            'details|8-15': [{
                category: '@cword(2,4)', // 分类名
                // 该类别的具体项目，又是一个数组
                'items|8-16': [{
                    href: '@url(http)',
                    name: '@cword(2,4)'
                }]
            }]
        }
    }]
})
```



接下来，我们就需要发送 *ajax* 请求来获取数据了，代码如下：

```js
var menuData = [];  // 用于存放请求回来的数据
// 请求菜单栏的数据
$.ajax({
  url: "/menu",
  type: "get",
  dataType: "json",
  success: function (res) {
    menuData = res.data;
    renderMenuList(res.data);
  },
});
// 渲染左侧菜单栏
function renderMenuList(data) {
  // li标签字符串的数组
  var oLiArray = data.map(function (item) {
    // li下面对应a标签字符串的数组
    var oAs = item.titles.map(function (title) {
      return `<a href="${title.href}">${title.name}</a>`;
    });
    return `<li class="menu-item cate_menu_item">${oAs.join("<span class='cate_menu_line'>/</span>")}</li>`;
  }).join("");
  // 将创建好的所有菜单元素 插入到页面里面
  $(".menu").html(oLiArray);
}
```



首先，鼠标移入导航栏的每一项，会有一个背景，其次就是右边的二级菜单会显示。对应代码如下：

```js
 // 鼠标移入每一行菜单 对应的功能
$(".menu").on("mouseenter", "li", function () {
  // 背景颜色的变换
  $(this).addClass("menu-active").siblings().removeClass("menu-active");
  // 拿取到当前鼠标移入的 li 的索引值
  var index = $(this).index();
  // 渲染右侧内容区
  renderMenuContent(menuData[index].content);
});
```

在上面的代码中，我们为当前行添加了 *menu-active* 样式类，然后拿到索引后扔到 *renderMenuContent* 方法来渲染二级菜单。



*renderMenuContent* 方法代码如下：

```js
// 渲染右侧内容区的方法 data 是当前内容区数据
function renderMenuContent(data) {
  var tabsData = data.tabs;
  var detailsData = data.details;

  // 渲染上面黑色的 tabs
  var tabsArr = tabsData.map(function (tab) {
    return `<a href="${tab.href}">${tab.name}<i class="iconfont">&#xe625;</i></a>`;
  }).join("");
  $(".menu-content > .tabs").html(tabsArr);

  // 渲染下面的 details
  var oDl = detailsData.map(function (detail) {
    // 创建 dt 标签字符串
    var oDt = `<dt class="menu-item-title">
<a href="#">${detail.category}<i class="iconfont">&#xe625;</i></a>
</dt>`;
    // 生成 dd 标签内部所有 a 标签字符串的数组
    var oAs = detail.items.map(function (item) {
      return `<a href="${item.href}">${item.name}</a>`;
    }).join("");
    // 创建 dd 标签字符串
    var oDD = `<dd class="menu-item">${oAs}</dd>`;
    return `<dl class="menu-item-details">${oDt}${oDD}</dl>`;
  }).join("");
  $(".menu-content > .details").html(oDl);

  // 显示右侧的隐藏内容区
  $(".menu-content").show();
}
```



至此，左侧导航栏的功能也算基本完成了。但是和上面的联想项目一样，出来了就不隐藏了，所以这个问题需要解决一下。

```js
// 鼠标移开的时候，隐藏 menu-content 栏目
// 当前变成灰色的 li 项目恢复原状
$(".fs-1").mouseleave(function () {
  $(".menu-content").hide();
  $(".menu-active").removeClass("menu-active");
});
```



## 书写轮播区域的轮播图



这个任务非常简单，因为我们的轮播插件是写好了的。



在 *components* 目录下新建 *sliderWrapper.html* 和 *sliderBanner.html*

要轮播的项目可以直接从官网去拿即可。



 *sliderWrapper.html* 

```html
<!-- 当前模块为第一个轮播图的结构 -->
<a href="//ccc-x.jd.com/dsp/nc?ext=aHR0cHM6Ly9wcm8uamQuY29tL21hbGwvYWN0aXZlLzJycnRMNFdhYWI2UnRSTUNHck04VXZIVG1vQXUvaW5kZXguaHRtbA&amp;log=M9BdAdQQxZqJCrR-IQpyBwzPjI9oOa3_n1ypeICYVska06Z83NGWu0a6qTJ8Ne-6ofh-iuQ6PxH-6O7LvA83_y-BsAURpMXt8BLa6uhskkmFoSlgt-hzc6m4V7167MSU8_g-AVHGXRAF7hUokJUC2M3d8hGjuwkPIP5qxQXh6XL9DH3KMl1oMrxuVcnHD3UPMmVz2Bko3X7TNhVZMFwWVtr0-4jLOcT58wzlUEvLNRs2CMBZvw2vL3dXfLFClhNhsYLhpQK5L_UEt_pPjLYSbuvtVU1E6JXkR9ROcaPCi3FNfRuuhMn8sGnKT_E536sJ0x6gQOzSksQdq0I1dY65rNC4AcpYhjiu9bB1RBaCKKvGMcDBYv8V239_9h0z5AIwjpz3b43vXNJIIPzC-FjQGdtmDp6rsrEbqzirfE_csSpAuN9LIXT9GaB5EjgCePyQjpcylazG8MWUyAYyZgehKJrzNBiWOcH8ixL73vq-Ea_1vBwzNCmFd4o53oX4S3lOsUfjpY94A5zVGlYmu1-8-7eXaW-N32YRaAv4JFS6rydUg0Kc_65_k1eEc6uaG7lMhwrIOL3WP6VJNXiy4bWTpJjAPkwnteSu131K1XXD9hGgr5mz-mrgMOJq49RrB2GBYA1HFcgr_jG_m23d8CrqEaQeunVnAMpmHvBB2qDgWmyKyadGRwGgI2AKXV1P2rctIdWgoAngYRylGOG-rtO1awwTThSmg0MdTEwUQSd0fSwhdEmTiKI9ilEjTo1325HDlGn34lfZAelKLlhCWKxdbTv3NsENCM4U55L5blXqp3kAkd8h9YuBdVsdJqfdM8QTpqwE-MDYcjqpElDG_GUZfTWO7ojCKPmGsnlvYSYOFsE8siGHVX7QVqf41x6Y3SqnonobBaAOzPwAiYqZySBTTQ&amp;v=404"
    class="focus-item__core" target="_blank" clstag="h|keycount|head|focus_01" aria-label="推广轮播第1帧">
    <img class="focus-item-img"
        src="//img10.360buyimg.com/pop/s590x470_jfs/t1/168467/29/8567/100562/60377e4cE5d135772/c29bc71c53672214.jpg.webp"
        alt="" />
</a>

<a href="//ccc-x.jd.com/dsp/nc?ext=aHR0cHM6Ly9jaGFubmVsLW0uamQuY29tL3BjL3BzcC83MDA0MTU4MzQyMT9pbXVwPUNnWUtBQklBR0FBU0V3aTlfcmIyaEFJUS1lbnNCQm9BSUpzR0tBRVlyeHNnQUNvZmFXSXNkV1VzZUdkaExHZHBZU3hqYVdFc1psOWlZVjltYkY5c05Ea3pPVElDYVdKS2pnRkpmRk5JVlU1VVgwbENMRWxmUVY5R1RGOUNMRWxmUVY5U1JWOUNMRWxmUVY5UVRGOUNMRWxmUVY5VFRGOUNMRWxmUVY5RFUxOUNMRWxmVlY5R1RGOUNMRWxmVTE5R1RGOUNMRWxmVWw5R1RGOUNMRWxmVUY5R1RGOUNMRWxmUjE5WVIxOU1ReXhKWDBKZlJreGZVaXhIU1VGOE8wWjhUVWxZVkVGSFgwWlNMRVpmUWtGZlJreGZURFE1TXpsOA&amp;log=nYLJk21HdnqpWanJlIYmTld4F7uN1_jH4M1wEER7ocNlhEZBBXbBSNjPWdQ3RIYQjp0XUs1kOYjsE0bQ1y9BQwH5r4Earxq3K0rUvmFnFWnIEex485cmrL7o5DExpIQ6pYoNs8WDWU0W_pnbGBZM0Y6lpN4kjpjqAD2i9NlSZDWH4bepgmcJ8FCLYrYZN1P2EdrKmDmYy4r2F9YNwDvbOqKEISiFY1kaV7h9gTlJ_YyyjW6lWRiZ3-fcJODD2-KtVQOx3diqXVa22EHJXVNQlw6rm7fkezkEQ0OjZ_nG9UHDFx5Dfm-cYyqFe-4vrt2CFQVJLO9R7Gd8D3kFNTInsGCCQdKFWG2c5R4Xvb7a3F7ZYf_eOW_2VOJjvYAGX4Bl52n_toLeYqjDzkNIsaCp4eeTBImoOEfhx6N_0suJomZyN0Qd38-Oxu_ZAYZQnRKKAMfFRuji1tV6zL1xbRWoClit5ipvGS0Wix5XS4ssL0XOHiivpJ-F-u1JvpLQ6LSytRAaVst90NrFz5tu-GPC7a3jTiHyhpsWgd0FexfUe-B8zHQHe6FXybWn1lDkE8EhVr7iVoHTIztLNy3qnO66f3pVmPz7f5iotrRTcMUINfesiTuDepWwcweOutVPMV_tbiJPfNX_yB_wZVBrJJO4se-S5YIUNQv5LDdDx8a8GIVQGjf0zhZh2F38JEg9Bt5dndN7LI3lpNiLlUz7hmHJKbXy-gCV51iE8RLMFC7ezLIIKuyq6T4r_zbZ7FwwYF7kdpOfqHuibmcj9tzTIQhg6QgcsiaNz3CORJ9xyKW_yJlpl_hkZZ2nJ-yO-hMKID7dpvDq_TOAFlgoRuM4RjZgRfQbA8QIfcF22Jcjya8nkZUP6nhFImSWxDwUibC6oGThPnFc7CyOsnqk1m5Qes9ypwoxhGsoElJTqb1puKLXhZlky6vBRykuphV1NPvG3Jfh&amp;v=404"
    class="focus-item__core" target="_blank" clstag="h|keycount|head|focus_02" aria-label="推广轮播第2帧">
    <img class="focus-item-img"
        src="//img11.360buyimg.com/da/s590x470_jfs/t1/132087/20/4014/67444/5f0669a6Ed4ee0b9b/22fe3a656d6de443.jpg.webp"
        alt="" />
</a>

<a href="//ccc-x.jd.com/dsp/nc?ext=aHR0cHM6Ly9jaGFubmVsLW0uamQuY29tL3BjL3BzcC8xMDAwMDE1NTE2NzQ_aW11cD1DZ1lLQUJJQUdBQVNHUWk2cXJyRTlBSVF1S25yM0FNYUJXZDRlWGwwSU84S0tBRVlzQnNnQUNvZmFXSXNkV0VzZUdkaExHZHBZU3hqYVdFc1psOWlZVjltYkY5c05Ea3pPVElDYVdJNk13b1JZblY1WTI5dmNpM21qcWpsdWI4dFdWTVF5cmxnR0FNZ285S004T0tUanROM0tKenpobkl3bV9PR2NqZ1RRSUNBSUVxT0FVbDhVMGhWVGxSZlNVSXNTVjlCWDBaTVgwSXNTVjlCWDFKRlgwSXNTVjlCWDFCTVgwSXNTVjlCWDFOTVgwSXNTVjlCWDBOVFgwSXNTVjlWWDBaTVgwSXNTVjlUWDBaTVgwSXNTVjlTWDBaTVgwSXNTVjlRWDBaTVgwSXNTVjlIWDFoSFgweERMRWxmUWw5R1RGOVNMRWRKUVh3N1JueE5TVmhVUVVkZlJsSXNSbDlDUVY5R1RGOU1ORGt6T1h3&amp;log=HTw4oEcP3XRDajdpIULx0mv_sKyzBh8xfB3d2XP-CY8lMy1AU9zMAORiLS8Lc7XQNZsOVn0KcLhJmWTeXW0bQ5XKnSSikPIWgbm-8d9oj-m7VL8YHz00Yk2KybnjKDr-tUJqKqjAr38Byt6A6UHUpV7GZeT6_iwDn20F3eu-oR3U0fennexDok2b33inEzCQcJM39OcdgaA9cjC3lWEn6q5zDkKlBhZhflQP1HCB6iZPnLFbq1cx3F6E0ahL4F9R5mr9SaBZ9jOfUVk0gvDyarIP896-_jz_MkiHk3hEB_u3LaP72pZ3CGM9VhOqQJYwoMcx1aa1jkISVHXmXkrDt5sUprtlenZQTfLPEcJ6JjhwzYNb0cQpL1uIBRAX6HKXC7LaeeazbR076KRiKN8eCnvug5ZSx4JALHk1q0_Q5NhJxyIy2n0ik1KV3nmZ3Da0RIcE0035VcAM8EW6lPA9MFzTV9vxJs58lCNb_11aUn6-r3pYjtAF3HOWiNRdESxF1PObTMl6eHtOioUrl1pVJtq475fbuBNDIzffqIMy3v80SZhZmHawIj96PDVkVSSZLF1xLRkxbVMe_YR7-LT5DtIsFEIJAr2KPhZGS5u7sY_DSGkbSAvYCjSSWxA_vqvSxeqbdj9u9sOqV81PXXaZXMu2y9W1arWRvGLmjr6DSll5sreD27KNshdqWWvcmmkQTp_51IacnRdWRbk4owTNaiRTAhlTaIaCzI9E6SLUeeBa5xmonczpY0EgRDVsqeXnemzQ1rbOfSb5F3QoVkkT_99NyhwiYxGQrOo1pMOxJjdCa9wCyfwQ66TgzqpCRuTkumN869bUl42yIX0dI0qNUTGVr4il83_VTsla1LjbQoFXYI3BaHtSgcZozbO9yvkHJDyCrjb2M6MZCqRzMxp6z5J5FS7PzwbNeI3IbzZj7NgD8qeMUOen9YTZKT2Vl3bs&amp;v=404"
    class="focus-item__core" target="_blank" clstag="h|keycount|head|focus_03" aria-label="推广轮播第3帧"><img
        class="focus-item-img"
        src="//img13.360buyimg.com/pop/s590x470_jfs/t1/122047/17/15027/58816/5f870434E970fa202/feb2de5a0b93e5eb.jpg.webp"
        alt="" />
</a>

<a href="//pro.jd.com/mall/active/3ZYfZKGRAhbHzJySpRriJoGWo8v6/index.html?innerAnchor=100005416421&amp;focus=3"
    class="focus-item__core" target="_blank" clstag="h|keycount|head|focus_04" aria-label="推广轮播第4帧"><img
        class="focus-item-img"
        src="//imgcps.jd.com/ling4/100005416421/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5bd81f3682acdd181dfeb407/30747981/cr/s/q.jpg"
        alt="" />
</a>

<a href="//ccc-x.jd.com/dsp/nc?ext=aHR0cHM6Ly9wcm8uamQuY29tL21hbGwvYWN0aXZlLzJBUFpuSloyYVJxSHROa0Q5Y0VzRjFRakM4RGQvaW5kZXguaHRtbA&amp;log=TEDqT7GkUgf7k1Jcl6rqOISpuBq_dp7CXXyKIpWVyB0hWeJJuo30FxvNSMMZNXJEZZ-An9xfnCismdzXvBkl6t8pAytVwr2yJgcNqwAdpH0ixktGaSdh8NzGKEykc1NVVti6O4oLBkGJvNbFY9i0bHiXBGl3kysck9mol8cR3cbkFe0nCHaXFMJlV3280hgaeUmRcu_NX2V23vJsgTNGOnQ5I_ahBEC_1lUyB5fmUwTYK9bNTEiJ8P5tq6wvqT9fFPbec1aBNSGtQ4_aTKu3x1pIWlIGiY6-jnuchfo2QKuRQe4fRBLANadfz4yjCvWhHIMmY2UkuiHRZX2Q95kir6Hw6DoDqVVIKdgP7I064JDeCfLlDEBkj3YxJ6Qhu3lltb03B0kgZBaZbtWOzSA9Bft4dUkCa2djj7zpugYFuzvmn6SrejfmCZ9mdjTyH1EuqQpGzSIbw1jOFHO5PiNh1w0Df33uRtTm8XSQtFkZzuw7rtvN1ysT9ikit9_QwEu2NhWfnHxnPSkUXqSzq2zObY3jIzuX_qyYqoXwWzg3XorRywANVhPDw1aOTC9egZyApElhdGYQiC-yiz_-kI8AFfeSkGSOxM474Nq1EUW4QyX1nyDob3QFRc-zF4Aef_kR821qlPRdbZLeq2poCt1lDb4C9gLb5jMxUyfhfJktKRSS2ElYF0yjD3O5hqh86OOfRb85yQj3uYY2V29mnM6Usf6b1k8axd4sNcNpNMVHasCDv9Cd6fB2vwcgmtw86m8ta6dUQ_FnT1n4iPUnsWnkWYyVYOlkdF6xEuB6DGXVe4qiJmMfvx_tqR3bXlE0UjoDvk4SyLL-8Fg1hTbat8bXpFFtuO0OwtZwNj-JyFzDnDg&amp;v=404"
    class="focus-item__core" target="_blank" clstag="h|keycount|head|focus_05" aria-label="推广轮播第5帧"><img
        class="focus-item-img"
        src="//img11.360buyimg.com/pop/s590x470_jfs/t1/156624/9/10932/74300/6034a010Ecfe5c4d5/e167f0034f218205.jpg.webp"
        alt="" />
</a>

<a href="//pro.jd.com/mall/active/3ZYfZKGRAhbHzJySpRriJoGWo8v6/index.html?innerAnchor=7634677&amp;focus=3"
    class="focus-item__core" target="_blank" clstag="h|keycount|head|focus_06" aria-label="推广轮播第6帧"><img
        class="focus-item-img"
        src="//imgcps.jd.com/ling4/7634677/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5bd8253082acdd181d02f9ff/5c473b5f/cr/s/q.jpg"
        alt="" />
</a>

<a href="//ccc-x.jd.com/dsp/nc?ext=aHR0cHM6Ly9wcm8uamQuY29tL21hbGwvYWN0aXZlLzJyYlFUWWRyeWNKR242eUJuQVFDc1RMOUVNUW8vaW5kZXguaHRtbA&amp;log=L9cdk2lwqETEWGepciBTJGmQAVxPX59b-hdkxMZimOzOLvxuRuCa5i-K3FC98Wb3rDYM17Q3wMA7Sp-j3HbEU2u3G6z7BJsVB2yCh_qULuabKBf0OWhfudHTB7t9WhlL2VwKoPuWRPCBMekNmSQKDKUydxTqgeQU2m5EFoANSRpvZktfjLITEAoCcZeU_yrBSRTRHoJku2VCU1VD3pFeQvkgo8vo2GeoMt5RRbL05MsBoCw4y4A5Xe1PZyeFkxJb9vfx4rPTIeE4lrbtIbDLYn8ZnPlfjcCGfpyCeeIEPVobOERHqFFE31oZgnD1G-7CIgH43akTBNRxGzE7SoZePHwtYG1zby7bc2XlmhKOWXZZiAecYPaO-g6-AEjQ3bTfKW6Ca32_DSHORWPG7HtnDLT-m-pi8Vqlky5W3KQ1rGAU7yM3AAb9fycYKMsLMnJZ_RaodkZ3ztdhtNPXItlmnBjIfYNBjqGtrYNexav_p_HfgL1snALxovPA2dSHrf4-_oGBQySEjdkKRqtq2YLcf0r2zbpp4ocKl5GZ4MlOYUFm9d2epuw0U68Ip6QNJjNEsVNxH4FiFiPLvD-mFoUvtpGvPcIAOrsHrXyGm5QcicRInYa3v9t1IGqBarNGmblEcj0BmaUe_8My6XUXbU6oG7c1HJgAlQ4kbUoisTCyPWmO5GDzzFhjQ7LDfqGsVcdsE2MCL2ycM5hjRCx0TgthXyXh-touyqV9R2x7dbC3ZGvOWBruNTaI8TmzQvf11RwTkDMpUJLjBUK5nQRBzoSQB2plF-aPnl9WjQlezmLd_YgbQgzIk1jRK3clkoo6rpDG327uIOY04SHajFufiWhktUdie5EjQfcxMgQpIYh0e-Y&amp;v=404"
    class="focus-item__core" target="_blank" clstag="h|keycount|head|focus_07" aria-label="推广轮播第7帧"><img
        class="focus-item-img"
        src="//img12.360buyimg.com/pop/s590x470_jfs/t1/165715/15/8302/95388/603c9301Eb9f9f919/ebfa3607856acd81.jpg.webp"
        alt="" />
</a>

<a href="//ccc-x.jd.com/dsp/nc?ext=aHR0cHM6Ly9wcm8uamQuY29tL21hbGwvYWN0aXZlL1N5TkVNeUFOa1hRdVVtem41ZFVlZjhDUUdQQS9pbmRleC5odG1s&amp;log=CCVnJ3ZlyhiYR6IKSPdpJYEg29S8HxY2BgY3pNHQdjVRRwjq-S5BHwPXJvG-LsYxh6BStXn7XEP9wul6Bb8JyW_Lh2vtCxjsqEw9QScKP9RuDl_UWNnoV3HBdvagst3ulH_sKtZzhGQ5xF4lcaNtSCC1t9YDuzK6wTHRVvRjG44xQwEZXlZBk4nXA469HxSD4hyk8R9HHnXDWaVdyllofQFj0dWQ-EUTATc22GkYZ56t4CCyFfj7V30DU-Hrv_jwAPqMnTmGRX6SlV9ksjajNph6R159tx6fZrJM2AfD7-MyYlvyBmCuH3hLq5soK_EWPGJc37kj4WVcNuDFKgyuy2JNzTtWEdZOX4fEapfDhAzJm0OMHHtiaT2zSEE8XLfje0Cvj0x58RNDUGw4loyK1AAgcmfa2n1kHx7BowH31x_vGVCqAUdG-vDrh_ybw_9Se5DDwL9nRP6JGKlgqOgyNe3z4KfRCy_M-dq3uQUh8KWjz-cAulvmTMPV5SlfHvaa6IaGUEW6psStMu6QuSSMIf-dmWy6Dk5zi64E4nn5HwWHAfKcUPafA3ysL0cxkQEn-qix_PZdXy2DFmUGZ6YkNcGA40nqtQk4CotfPivLJtNEVWGuzOIPTNHXXZ-voRaLiyxjKl4FA22ehWE0WUtcELTfGQGB-yDzo-7v-MK-QIvEvF3pHS4DCs7tW0RJX7TFf-PrzzxpVmv1re0EemP5PowOoi3Rz02mXWv-9Emlh8dx6lFx1sobaYNqykloe9_YXo8yH6IPUg5Nz03rJ3xxzGHPpjDM-At2AHxcvefdaUxSgVdSRDAiLKQghKEbHm39z1PL_X960nKKf41aWtIuHMqTIHu0PjRDw38fKPle2qc&amp;v=404"
    class="focus-item__core" target="_blank" clstag="h|keycount|head|focus_08" aria-label="推广轮播第8帧" tabindex="-1"><img
        class="focus-item-img"
        src="//img13.360buyimg.com/pop/s590x470_jfs/t1/157169/30/8874/54663/6039b8a5Eab9e956e/c78aad41240d8782.jpg.webp"
        alt="" />
</a>
```



 *sliderBanner.html*

```html
<style>
    .focus-item__recommend {
        width: 190px;
        vertical-align: top;
        display: inline-block;
        height: 100%;
    }

    .focus-item__recommend .recommend-item {
        height: 150px;
        display: block;
        margin-bottom: 10px;
    }

    .focus-item__recommend .recommend-item__image {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>

<div class="focus-item__recommend">
    <!-- 每一块有 3 张图片 -->
    <a href="//prodev.jd.com/mall/active/24qWmGEbiPnPYxZzEfMj6ktgWxxR/index.html" target="_blank"
        class="recommend-item fade-in" clstag="h|keycount|head|rmd_01a" aria-label="今日推荐 第1帧第1个坑位">
        <img alt="" class="recommend-item__image"
            src="//img30.360buyimg.com/babel/s380x300_jfs/t1/153451/38/7773/80459/5fc4a05eE5ea7f9d1/4cfb88c3aa3e2443.jpg.webp">
    </a>
    <a href="//pro.jd.com/mall/active/2VyRHGE7jM1igBJcrjoB6ak1JJWV/index.html" target="_blank"
        class="recommend-item fade-in" clstag="h|keycount|head|rmd_01b" aria-label="今日推荐 电脑配件">
        <img alt="电脑配件" class="recommend-item__image"
            src="//img12.360buyimg.com/babel/s380x300_jfs/t1/152314/13/19839/57522/603e118dE941f0ce9/fdff58457adbef3e.jpg.webp">
    </a>
    <a href="//ccc-x.jd.com/dsp/nc?ext=aHR0cHM6Ly9wcm8uamQuY29tL21hbGwvYWN0aXZlLzRCb25jY0JrRkJQUzFRYUt0cEZ4bzFLUXNoOFIvaW5kZXguaHRtbA&amp;log=vmqogPAereRmv2S-JTbKH-RppWKpjA6qWkX-fF42G-FGZ_jWW9Uu9Qy7Bwn85Om1IHonZPey4-AJreS4Q_36Jtg6mgDRHYLoxzFKD0LJFnPHUvNpu_VSoJto4smMS9JEZWGwEEpUFsXs6cadGV7eRQImR4qUUfoqPbVMJF4Mp7rRNEM0LYcccoJkWShfh3a5wv48ti2VVcW5tjSSZDTTojMRhQJRZl3Kn2eLIT89dTGI7Irc1MeVGCBuLpwvj1lNnfyiywZsyNiwcZc0q2UIUj0Im2C9Wqlbfkmy-qejupm9k_WfCg-ivo2Cvx5o-6Xgygl867NY7M09SRxDkvNp-3iaNApJbIJWrX9v0Nv8rXgkVUD07ZSMwP4-Suegdb_CqRasYG54trCdhCGQlfCeGdwC_PwqziLenrWLU1uMa0iL1nmNJfhNgnb_c2TXspvdkgXoEpNSrEi53h2A7y_4tchYk6yEbPsyD0acrcw8EAW5uXf5-JtazZTDjkXMF3w48eWpBc8vPWHLBGR5opHhXYbUnhthWLjb3h6O8hIC3xpB-jerseHP0IYgUcOEWTPau7brfvWSaqPwov7ZvjpwI3wcsZwvU-RCUeeqhwb2bLsPNsy7hnR0xiGy6LHvo_gevT-t02lcfjPBDs_rd5C0kRmrCFZK9Lw_1GXjlu8_9pN_VqxWF2s8rl9q7rvAOy0Xt3iz2ozEKKJu2VKpoOsqzCPAJbg4Giw-KTGZgAUyWiJeAmgI3pQyI0a_fDc0SJbH4uJjzGwuVKZL3-8Hi63sNFMkTj-g-tSu_pmccfhEfa_ZHU71gW6EgJEwT-29gurNgEmKk_oN4kxEcW64JWy-g-GQOGTz-1NTHmDoZvWY4OQTGd7KwmKinONQmAWNwMgCVu3wCbEa0BuIazQ-rjOohLWmhV4CNQOFN_yVgAutEw8&amp;v=404"
        target="_blank" class="recommend-item fade-in" clstag="h|keycount|head|rmd_01c" aria-label="今日推荐 第1帧第3个坑位">
        <img class="recommend-item__image"
            src="//img20.360buyimg.com/pop/s380x300_jfs/t1/160801/28/8912/12405/603de3d6Ed9e32cc0/a126c05aae9b8426.jpg.webp"
            alt="">
    </a>
</div>
<div class="focus-item__recommend">
    <a href="//pro.jd.com/mall/active/G6dB2UyBBfwfTVCBp3iMQQQ6GHi/index.html" target="_blank"
        class="recommend-item fade-in" clstag="h|keycount|head|rmd_02a" aria-label="今日推荐 第2帧第1个坑位">
        <img alt="" class="recommend-item__image"
            src="//img11.360buyimg.com/babel/s380x300_jfs/t1/124193/7/20235/50643/5fc1b453Ede1ff346/4cfd67de0ee4869a.jpg.webp">
    </a>
    <a href="//prodev.jd.com/mall/active/SyNEMyANkXQuUmzn5dUef8CQGPA/index.html" target="_blank"
        class="recommend-item fade-in" clstag="h|keycount|head|rmd_02b" aria-label="今日推荐 第2帧第2个坑位">
        <img alt="" class="recommend-item__image"
            src="//img10.360buyimg.com/babel/s380x300_jfs/t1/154848/7/7426/82296/5fc072eeE20809200/34dca267e049d035.jpg.webp">
    </a>
    <a href="//pro.jd.com/mall/active/KcfFqWvhb5hHtaQkS4SD1UU6RcQ/index.html" target="_blank"
        class="recommend-item fade-in" clstag="h|keycount|head|rmd_02c" aria-label="今日推荐 第2帧第3个坑位">
        <img alt="" class="recommend-item__image"
            src="//img30.360buyimg.com/babel/s380x300_jfs/t1/165019/40/8639/60165/603d92e5E1d9852b8/2006d88391f60fe8.jpg.webp">
    </a>
</div>
<div class="focus-item__recommend">
    <a href="//pro.jd.com/mall/active/4AfQf3FkPRGHhtqqKh9tsWyV97sy/index.html" target="_blank"
        class="recommend-item fade-in" clstag="h|keycount|head|rmd_03a" aria-label="今日推荐 第3帧第1个坑位" tabindex="-1">
        <img alt="" class="recommend-item__image"
            src="//img30.360buyimg.com/babel/s380x300_jfs/t1/152531/9/7821/46751/5fc49c6bEb18993f9/88e5d647e459127e.jpg.webp">
    </a>
    <a href="//prodev.jd.com/mall/active/4NUvz3WWjTQTKcogVFUPu1r2NEDJ/index.html" target="_blank"
        class="recommend-item fade-in" clstag="h|keycount|head|rmd_03b" aria-label="今日推荐 第3帧第2个坑位" tabindex="-1">
        <img alt="" class="recommend-item__image"
            src="//img30.360buyimg.com/babel/s380x300_jfs/t1/143485/28/16042/87334/5fc0a4e7E526c0708/02d7a8ae5cb545d8.jpg.webp">
    </a>
    <a href="//pro.jd.com/mall/active/3Af6mZNcf5m795T8dtDVfDwWVNhJ/index.html" target="_blank"
        class="recommend-item fade-in" clstag="h|keycount|head|rmd_03c" aria-label="今日推荐 第3帧第3个坑位" tabindex="-1">
        <img alt="" class="recommend-item__image"
            src="//img11.360buyimg.com/babel/s380x300_jfs/t1/155428/9/20923/51265/603ef7fbE883d7dfe/39cbadd1228bef9a.jpg.webp">
    </a>
</div>
```



轮播项目有了之后，就可以直接使用我们之前书写的轮播图插件了。代码如下：

```js
// 轮播图中间（fs-2）
$('.sliderWrapper').load('../components/sliderWrapper.html', function (res) {
    $(this).swiper({
        contentList: $(this).find('.focus-item__core'),
        type: 'fade',
        width: 590,
        height: 470,
        spotPosition: 'left',
        spotSize: 10,
        spotColor: '#fff'
    })
})

$('.sliderBanner').load('../components/sliderBanner.html', function (res) {
    $(this).swiper({
        contentList: $(this).find('.focus-item__recommend'),
        type: 'fade',
        width: 190,
        height: 470,
        showSpots: false,
        showChangeBtn: 'hover',
        spotColor: '#fff'
    })
})
```



## 完成用户区域



今天我们继续来做京东首屏，首先是用户区域。还是先分析整体结构



可以看到，整体可以分为上中下 *3* 个部分。

所以我们来到 *index.html* 中，找到 *fs-3* 的地方，创建 *3* 个 *div*，如下：

```html
<!-- 轮播图右侧 user 区域 -->
<div class="fs-3">
  <div class="user"></div>
  <div class="news"></div>
  <div class="service"></div>
</div>
```



接下来我们一块一块来做，首先是 *user* 这一块。创建一个 *user.html* 模块，结构所对应的代码大致如下：

> 下面只是大致结构代码，完整代码请参阅源码

```html
<!-- 头像区域 -->
<div class="J_user_avatar user_avatar">
    <a href="" aria-label="个人头像">
        <img src="" alt="" />
    </a>
</div>

<!-- 头像右侧信息 -->
<div class="user_show">
    <a class="user_tip">Hi~欢迎逛京东！</a>
    <p>
        <a class="user_login">登录</a>
        <a class="user_reg">注册</a>
    </p>
</div>

<!-- 下面两个按钮 -->
<div class="user_profit">
  <a href="" target="_blank">新人福利</a>
  <a href="" target="_blank">PLUS会员</a>
</div>
```



接下来引入该模块部分所对应的样式文件 *fs-3.css*

```css
/* 整体区域样式开始 */

.fs-3 {
    font-size: 12px;
}

/* 整体区域样式结束 */
```

```css
/* user 部分样式开始 */

.user {
    /* user 盒子 */
    height: 102px;
    background: #fff;
    position: relative;
    font-size: 12px;
    /* outline: 1px solid; */
}

.user .user_avatar {
    /* 头像区域 */
    position: absolute;
    left: 20px;
    top: 13px;
    width: 44px;
    height: 44px;
}

.user .user_avatar_lk {
    /* 头像区域 */
    display: block;
    width: 40px;
    height: 40px;
    border: 2px solid #fff;
    border-radius: 50%;
    overflow: hidden;
    -webkit-box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
    box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
}

.user .user_avatar_lk img {
    /* 头像区域 */
    display: block;
    width: 40px;
    height: 40px;
    border: 2px solid #fff;
    border-radius: 50%;
}

.user_show {
    /* 头像右侧信息 */
    position: absolute;
    top: 16px;
    left: 74px;
    right: 10px;
}

.user_show p {
    /* 头像右侧信息 */
    overflow: hidden;
    height: 20px;
    line-height: 20px;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #666;
}

.user .user_profit {
    /* 下面两个按钮区域 */
    height: 25px;
    font-size: 0;
    text-align: center;
    position: absolute;
    bottom: 10px;
    width: 100%;
    /* outline: 1px solid; */
}

.user .user_profit_lk {
    /* 两个按钮公共样式 */
    display: inline-block;
    margin: 0 5px;
    width: 70px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    text-align: center;
    color: #fff;
    border-radius: 13px;
    background: #e1251b;
}

.user .user_profit_lk_plus {
    /* 右边黑色按钮 */
    background: #363634;
    color: #e5d790;
}

.user::after {
    /* 下面的那条线 */
    position: absolute;
    height: 1px;
    left: 15px;
    right: 15px;
    background: -webkit-gradient(linear, right top, left top, from(white), color-stop(#eeeeee), color-stop(#eeeeee), to(white));
    background: linear-gradient(270deg, white, #eeeeee, #eeeeee, white);
    content: " ";
    bottom: 0;
}

/* user 部分样式结束 */
```





接下来是中间的 *news* 部分，同样创建一个 *news.html* 模块，代码如下：

> 直接从官网获取即可

```html
<!-- 新闻头部 -->
<div class="news-hd">
    <h5 class="news_tit">京东快报</h5>
    <a href="//kuaibao.jd.com/?ids=232264456,790737,231877478,232262561" target="_blank" class="news_more"
        clstag="h|keycount||head|news_a">更多 <i class="iconfont">&#xe625;</i></a>
</div>

<!-- 新闻列表 -->
<ul class="news_list">
    <li class="news_item news_item__recommend">
        <a href="//kuaibao.jd.com/article?id=232264456" target="_blank" class="news_link"
            clstag="h|keycount||head|news_b01"><span class="news_tag">热评</span>时尚复古墨镜，凹造型的单品出门旅游就选它</a>
    </li>
    <li class="news_item news_item__recommend">
        <a href="//kuaibao.jd.com/article?id=790737" target="_blank" class="news_link"
            clstag="h|keycount||head|news_b02"><span class="news_tag">热门</span>冲奶粉不做这个动作，奶粉最贵都放浪费</a>
    </li>
    <li class="news_item news_item__recommend">
        <a href="//kuaibao.jd.com/article?id=231877478" target="_blank" class="news_link"
            clstag="h|keycount||head|news_b03"><span class="news_tag">热议</span>“樱”为有它，足不出户也可感受樱花清香</a>
    </li>
    <li class="news_item news_item__recommend">
        <a href="//kuaibao.jd.com/article?id=232262561" target="_blank" class="news_link"
            clstag="h|keycount||head|news_b04"><span class="news_tag">热门</span>新学期换新装，这样的笔记本让你更引人注目！</a>
    </li>
</ul>
```



在 *fs-3.css* 文件中追加如下的样式代码：

```css
/* news 部分样式开始 */


.news {
  /* news 整体盒子 */
  overflow: hidden;
  height: 130px;
  background: #fff;
}

.news_hd {
  /* 新闻头部 */
  height: 20px;
  padding: 10px 0 0;
  position: relative;
  line-height: 20px;
  font-size: 0;
  margin-bottom: 8px;
}

.news_tit {
  /* 京东快报 */
  display: inline-block;
  font-size: 14px;
  margin-left: 15px;
  color: #333;
}

.news_more {
  /* 更多 */
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 12px;
  color: #999;
}

.news .news_list {
  /* 新闻列表 */
  position: relative;
  margin: 0 15px;
  height: 88px;
}

.news .news_item {
  /* ul 下面的每一个 li */
  max-width: 160px;
  width: 160px;
  height: 16px;
  line-height: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #999;
  margin-bottom: 6px;
}

.news_tag {
  /* 新闻快讯前面的红色分类词 */
  display: inline-block;
  position: relative;
  font-size: 12px;
  height: 16px;
  width: 35px;
  line-height: 16px;
  text-align: center;
  vertical-align: 0;
  color: #e1251b;
  background-color: rgba(225, 37, 27, .08);
  margin-right: 6px;
}

/* news 部分样式结束 */
```



最后在 *index.js* 中加载该模块文件

```js
$('.fs-3 .news').load('../components/news.html');
```



效果如下：



好，接下来要做 *service* 部分了，这部分就涉及 *JS* 代码了。

我们先创建一个 *service.html* 模块，然后从官网拿 *HTML* 和 *CSS* 代码，其中 *CSS* 代码追加到 *fs-3.css* 文件里面。

具体的 *HTML* 和 *CSS* 代码就不再笔记中做记录了，详细可以参阅源码。

也就是说，当用户的鼠标移动到【话费】【机票】【酒店】以及【游戏】这几个图标的时候，会有一个向上滑动的效果。

滑动结束后，会显示对应的弹出层内容。



我们对弹出层不做过多的书写，写一个 *div* 占位，如下：

*service.html*

```html
<!-- 弹出层 -->
<div class="service_pop">
    <div>各个模块内容</div>
    <div class="close"></div>
</div>
```



接下来就要做这个滑动的效果了。

我们一步一步来。首先是前面 *4* 个图标才会触发这个特效，所以我们需要给前面 *4* 个图标绑事件。

那么问题来了，我怎么知道是前 *4* 个呢？

仔细观察，你会发现前面 *4* 个 *li* 都挂有 *service_frame* 类，所以我们绑定事件如下：

```js
// 进入 li 的时候
// 前面 4 个 li，hover 的时候要 pop，所以挂上 service_frame 类
$('.service_frame').mouseenter(function () {
  console.log('OK')
})
```



接下来就是事件里面具体要做的事情，主要就是滑动，代码如下：

```js
// 进入 li 的时候
// 前面 4 个 li，hover 的时候要 pop，所以挂上 service_frame 类
$('.service_frame').mouseenter(function () {
  if ($(this).hasClass('service_frame2')) {
    // 进入此 if，说明用户是移动到的游戏上面
    // 主要的逻辑就是游戏这个盒子向上移动 55（一个 li 的高度），其他的盒子向上移动 28（图标的高度）
    $(this).animate({
      marginTop: -55 // 55 是一个 li.service_item 项目的高度
    }).siblings('.service_frame').animate({
      marginTop: -28 // 28 源于图标的高度 
    })
  } else {
    // 说明用户移动到的是第一排的 3 个图标
    $('.service_frame').not('.service_frame2').animate({
      marginTop: -28
    })
  }
})
```

这里，我们用了一个 *if...else* 进行分支，因为用户鼠标移动到第一排和第二排的滑动距离是不一样的，如果有 *service_frame2* 类名，说明是“游戏”图标上面，否则则是第一排的 *3* 个图标上。

那么具体移动多少呢？

我们看到如果是第一排 *3* 个图标，则移动 *28* 像素（*28* 源于图标高度）

如果是第二排“游戏”图标，则移动 *55* 像素（*55* 源于一个 *li* 的高度）

> 注意，移动是所有图标都要移动，并不是只移动前 *4* 个。



接下来，将下面的弹出层移动上来，如下：

```js
// 弹出层移入，34 源于 240（service 高度） - 206（弹出层高度）
$('.service_pop').animate({
  top: 34 /* 240 - 206 */
});
```



为当前项目添加下面的横线：

```js
// 这样该 li 下面的文字就会有红色小横线
$(this).addClass('service_active').siblings().removeClass('service_active')
```



最后为关闭按钮绑定事件，关闭按钮要做的事情就是反着移动

```js
// 点击关闭按钮所对应的事件
$('.close').click(function () {
  // 关闭窗口复原
  $('.service_pop').animate({
    top: 240
  });
  $('.service_frame').animate({
    marginTop: 0
  })
  $('.service_active').removeClass('service_active');
})
```



## 完成京东秒杀倒计时



整体分为 *2* 个区域，所以我们新创建一个 *seckill.html* 模块，写入如下的代码：

```html
<!-- 秒杀模块 -->
<div class="clearfix">
    <!-- 京东秒杀倒计时 -->
    <div class="seckill-count"></div>
    <!-- 两个轮播图 -->
    <div class="seckill-content">
        <div class="seckill-list"></div>
        <div class="seckill-brand"></div>
    </div>
</div>
```



接下来创建 *seckill.css*（具体样式代码参阅源码），在 *index.html* 中引入，然后在 *index.js* 中引入 *seckill.html* 模块。

```js
// 秒杀模块
$('.seckill').load('../components/seckill.html');
```



在京东秒杀倒计时里面，主要分为“时”、“分”、“秒"，具体结构如下：

```html
<!-- 京东秒杀倒计时 -->
<div class="seckill-count">
  <a class="seckill-countdown" href="//miaosha.jd.com" target="_blank" clstag="h|keycount|core|seckill_a">
    <div class="countdown-title">京东秒杀</div>
    <div>
      <div class="countdown-desc"><strong>22:00</strong> 点场 倒计时</div>
      <span class="timmer countdown-main">
        <span class="timmer__unit timmer__unit--hour">01</span>
        <span class="timmer__unit timmer__unit--minute">46</span>
        <span class="timmer__unit timmer__unit--second">57</span>
      </span>
    </div>
  </a>
</div>
```



接下来来书写倒计时的业务逻辑，代码如下：

```js
var endTime = new Date('2021-11-0 22:00'); // 设置结束时间
// console.log(endTime);

var seckillTimer = setInterval(function () {
  var nowTime = new Date();
  // 剩余毫秒数
  var disTime = endTime.getTime() - nowTime.getTime(); // 计算现在到结束时间的时间差（单位：毫秒）
  if (disTime < 0) {
    // 进入此 if，说明已经超过结束时间，那么结束计时器
    clearInterval(seckillTimer);
  } else {
    // 剩余小时数
    var hour = parseInt(disTime / 1000 / 60 / 60);
    // 剩余分钟数
    var minutes = parseInt(disTime / 1000 / 60 % 60);
    // 剩余秒数
    var seconds = parseInt(disTime / 1000 % 60);
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    $('.timmer__unit--hour').text(hour);
    $('.timmer__unit--minute').text(minutes);
    $('.timmer__unit--second').text(seconds)
  }
}, 1000)
```



## 完成秒杀区域轮播图



秒杀区域有两个轮播图。轮播图我们在前面已经写过了，直接使用轮播插件来写即可。

首先创建两个轮播模块 *seckillList.html* 和 *seckillBrand.html*，两个文件里面书写轮播图具体项目。（具体代码请参阅源码）



接下来在 *seckill.html* 的 *JS* 中使用轮播插件，传入配置项即可。代码如下：

```js
// 加载两个轮播图内容
$('.seckill-content').find('.seckill-list').load('../components/seckillList.html', function () {
  $(this).swiper({
    contentList: $(this).find('.seckill-list-item'),
    type: 'animate',
    autoChangeTime: 10000,
    showSpots: false,
    showChangeBtn: 'always',
    width: 800,
    height: 260

  })
});
$('.seckill-content').find('.seckill-brand').load('../components/seckillBrand.html', function () {
  $(this).swiper({
    contentList: $(this).find('.brand-item'),
    type: 'animate',
    autoChangeTime: 2000,
    isAuto: true,
    spotPosition: 'center',
    showChangeBtn: 'hide',
    width: 180,
    height: 240
  })
});
```




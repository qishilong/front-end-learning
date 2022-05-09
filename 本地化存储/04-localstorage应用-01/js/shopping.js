
//请求数据
ajax('js/shoppingData.json', function (data) {
    console.log(data);
    createGoodsDom(data);
    addEvent();
});

//创建商品结构
function createGoodsDom(data) {
    var str = '';

    data.forEach(function (item) {
        var color = '';  //用来存储每条数据里面的所有颜色信息
        item.list.forEach(function (product) {
            color += '<span data-id="' + product.id + '">' + product.color + '</span>';
        });

        str += '<tr>' +
            '<td>' +
            '<img src="' + item.list[0].img + '" />' +
            '</td>' +
            '<td>' +
            ' <p>' + item.name + '</p>' +
            '<div class="color">' + color + '</div>' +
            '</td>' +
            '<td>' + item.list[0].price + '.00元</td>' +
            '<td>' +
            '<span>-</span>' +
            '<strong>0</strong>' +
            '<span>+</span>' +
            '</td>' +
            '<td><button>加入购物车</button></td>' +
            '</tr> ';
    });

    var tbody = document.querySelector('.product tbody');
    tbody.innerHTML = str;
}

//添加商品操作事件
function addEvent() {
    var trs = document.querySelectorAll('.product tr');   //获取到所有的行
    for (var i = 0; i < trs.length; i++) {
        action(trs[i], i);
    }

    function action(tr, n) {
        var tds = tr.children,    //当前行里所有的td
            img = tds[0].children[0], //商品图片
            imgSrc = img.getAttribute('src'), //商品图片的地址
            name = tds[1].children[0].innerHTML,  //商品的名字
            colors = tds[1].children[1].children,  //所有颜色按钮
            price = parseFloat(tds[2].innerHTML), //价格
            spans = tds[3].querySelectorAll('span'), //加减按钮
            strong = tds[3].querySelector('strong'), //数量
            joinBtn = tds[4].children[0], //加入购物车的按钮
            selectNum = 0;    //选中商品的数量

        //颜色按钮点击功能
        var last = null,  //上一次选中的按钮
            colorValue = '',  //选中的颜色
            colorId = ''; //选中商品对应的id
        for (var i = 0; i < colors.length; i++) {
            colors[i].index = i;  //添加一个自定义的属性为索引值
            colors[i].onclick = function () {
                last && last != this && (last.className = '');

                this.className = this.className ? '' : 'active';
                colorValue = this.className ? this.innerHTML : '';
                colorId = this.className ? this.dataset.id : '';
                imgSrc = this.className ? 'images/img_0' + (n + 1) + '-' + (this.index + 1) + '.png' : 'images/img_0' + (n + 1) + '-1.png';

                img.src=imgSrc;

                last = this;  //把当前次点击的对象赋值给last。当前次点击的对象相对于下次要点击的时候它是上一个对象（last）
            }
        }

        //减按钮点击
        spans[0].onclick=function(){
            selectNum--;
            if(selectNum<0){
                selectNum=0;
            }

            strong.innerHTML=selectNum;
        };

        //加按钮点击
        spans[1].onclick=function(){
            selectNum++;

            strong.innerHTML=selectNum;
        };


        //加入购物车功能
        joinBtn.onclick=function(){
            if(!colorValue){
                alert('请选择颜色');
                return;
            }

            if(!selectNum){
                alert('请添加购买数量');
                return;
            }

            //asdfasdfasdfasdf
        }
    }
}
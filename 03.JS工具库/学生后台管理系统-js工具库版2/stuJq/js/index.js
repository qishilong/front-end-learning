(function () {
  var currentPage = 1;
  var totalPage = 1;
  var size = 5;
  var stuData = [];

  function goToAddStu() {
    $('.leftMenuItem')
      .eq(1).addClass('itemActive')
      .end()
      .eq(0).removeClass('itemActive')

    $('.rightContent>div')
      .eq(1).removeClass('notShow')
      .end()
      .eq(0).addClass('notShow')
  }

  function goToStuList() {
    // 按钮的变化
    $('.leftMenuItem')
      .eq(0).addClass('itemActive')
      .end()
      .eq(1).removeClass('itemActive')
    // 右侧展示区的变化
    $('.rightContent>div')
      .eq(0).removeClass('notShow')
      .end()
      .eq(1).addClass('notShow')
  }

  function changeItem() {
    $('.leftMenu')
      .on('click', '.leftMenuItem', function (e) {
        if ($(e.target).html() === '学生列表') {
          goToStuList();
        } else {
          goToAddStu();
        }
      })
  }
  function renderTable(i) {
    // 更新当前页
    currentPage = i;
    // 展示数组对应的内容
    // 5，2（10、2）
    // 1，01234 0, 5, (1-1)*5, 1*5
    // 2. 56789 5, 10, (2-1)*5, 2*5
    // Array.protoype.slice(start, end)
    // 根据当前页，计算需要渲染的数组内容
    var arr = stuData.slice((i - 1) * size, i * size);
    // 根据arr生成tbody中的结构
    var tbodyHTML = arr.map(function (item) {
      return `
      <tr>
        <td>${item.stuId}</td>
        <td>${item.stuName}</td>
        <td>${item.stuGender}</td>
        <td>${item.stuEmail}</td>
        <td>${item.stuAge}</td>
        <td>${item.stuTel}</td>
        <td>${item.stuAddr}</td>
        <td>
          <button data-id=${item.stuId} class="operationBtn editBtn">编辑</button>
          <button data-id=${item.stuId} class="operationBtn delBtn">删除</button>
        </td>
      </tr>
      `
    }).join('');
    $('tbody').html(tbodyHTML);

  }
  function renderContent() {
    // 1. 渲染表格
    renderTable(currentPage)
    // 2. 翻页插件
    $('#page').page({
      totalPage: totalPage,
      currentPage: currentPage,
      position: 'center',
      callBack: function (i) {
        // i页, 渲染第i页的数据
        renderTable(i)
      }
    });
  }

  function initData() {
    $.ajax({
      url: '/getStuData',
      dataType: 'json',
      success: function (res) {
        // console.log(res)
        stuData = res.data;
        // pre 本地化存储
        localStorage.stuData = JSON.stringify(res.data);
        // 1. 计算多少页
        totalPage = Math.ceil(res.data.length / size);
        // 2. 渲染页面
        renderContent();
      }
    })
  }

  function bindEvent() {
    // 1. 随机新增
    $('#addStuRandom').click(function () {
      $.ajax({
        url: '/addStuRandom',
        dataType: 'json',
        success: function (data) {
          // console.log(data);
          stuData.push(data)
          // 本地化存储
          localStorage.stuData = JSON.stringify(stuData);
          // 计算totalPage
          totalPage = Math.ceil(stuData.length/size);
          // 翻页
          currentPage = totalPage;
          renderContent();
        }
      })
    });
    // 2. 自定义新增

    // 3. 修改

    // 4. 删除

    // 5. 查找
  }
  function main() {
    // 1. 切换菜单栏
    changeItem();
    // 2. 初始化页面数据
    if (localStorage.stuData) {
      stuData = JSON.parse(localStorage.stuData);
      totalPage = Math.ceil(stuData.length/size);
      renderContent();
    } else {
      initData();
    }
    // 3. 其他操作
    bindEvent();
  }

  main();

})()
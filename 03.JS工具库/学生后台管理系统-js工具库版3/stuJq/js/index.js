(function () {
  var currentPage = 1;
  var totalPage = 1;
  var size = 5;
  var stuData = [];
  var editId = null;
  function clearForm() {
    // 重置表单input内容
    $('#addStuForm')[0].reset();
    // 取消验证提示
    var spans = $('.regValidate');
    for (var i = 0; i < spans.length; i++) {
      $(spans[i]).html('');
    }
    $('#addStuBtn').val('提交')
  }

  function goToAddStu(id) {
    if (id) {
      // 本地获取 & ajax请求
      $.ajax({
        url: '/getStuInfo',
        type: 'POST',
        dataType: 'json',
        data: {
          id: id
        },
        success(stu) {
          // 学生的若干信息stuName, stuAge
          // 根据学生信息回填form
          $('#stuName').val(stu.stuName);
          $('#stuEmail').val(stu.stuEmail);
          $('#stuTel').val(stu.stuTel);
          $('#stuAddr').val(stu.stuAddr);
          $('#stuAge').val(stu.stuAge);
          if (stu.stuGender == '男') {
            $('#male').prop('checked', true);
          } else {
            $('#female').prop('checked', true);
          }
          editId = id;
          $('#addStuBtn').val('确认修改');
        }

      })
    }
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
    clearForm();
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
          totalPage = Math.ceil(stuData.length / size);
          // 翻页
          currentPage = totalPage;
          renderContent();
        }
      })
    });
    // 2. 自定义新增
    $('#addStuBtnByForm').click(function () {
      goToAddStu();
    })
    // 验证
    // 姓名验证 （存在）
    $('#stuName').blur(function (e) {
      var val = $(e.target).val();
      if (val) {
        $('#validateName').html('');
      } else {
        $('#validateName').html('请输入姓名')
      }
    });
    // 邮箱 正则
    $('#stuEmail').blur(function (e) {
      var val = $(e.target).val();
      var reg = /^[a-zA-Z0-9_-][\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (val) {
        if (reg.test(val)) {
          $('#validateEmail').html('')
        } else {
          $('#validateEmail').html('请输入合法的邮箱地址')
        }
      } else {
        $('#validateEmail').html('请输入邮箱地址')
      }
    });

    // 年龄 范围 6~50
    $('#stuAge').blur(function (e) {
      var val = Number($(e.target).val());
      if (val) {
        if (val >= 6 && val <= 50) {
          $('#validateAge').html('');
        } else {
          $('#validateAge').html('请输入合法年龄');
        }
      } else {
        $('#validateAge').html('请输入年龄');
      }
    });
    // 验证结束
    $('#addStuBtn').click(function () {
      // 1 拿到学生信息
      // 1.1 判断是否存在空值
      var arr = $('#addStuForm').serializeArray()
      var isFinish = arr.every(function (item) {
        return item.value !== ''
      });
      if (isFinish) {
        // 合不合法
        var isOk = $('.regValidate').toArray().every(function (item) {
          return $(item).html() === '';
        });
        if (isOk) {
          var newStu = {};
          arr.forEach(function (item) {
            // console.log(item);
            newStu[item.name] = item.value;
          });
          // 发送请求 新增学生，修改学生
          if ($('#addStuBtn').val() == '提交') {
            $.ajax({
              type: 'POST',
              url: '/addStu',
              data: newStu,
              dataType: 'json',
              success(stu) {
                stuData.push(stu);
                localStorage.stuData = JSON.stringify(stuData);
                totalPage = Math.ceil(stuData.length / size);
                currentPage = totalPage;
                renderContent();
                goToStuList();
              }
            })
          } else {
            newStu.stuId = editId;
            // 更新学生的接口
            $.ajax({
              url: '/updateStu',
              type: 'POST',
              dataType: 'json',
              data: newStu,
              success(res) {
                // 全新的学生列表
                localStorage.stuData = JSON.stringify(stuData);
                renderContent();
                goToStuList();
                clearForm();
              }
            })
          }
        } else {
          window.alert('请确保每一项都符合规则');
        }
      } else {
        window.alert('请完善信息');
      }
    })
    $('#backStuList').click(function () {
      // 1. 清空表单
      clearForm();
      // 2. 跳转学生列表
      goToStuList();
    })
    // 3. 修改,编辑
    // 复用，添加学生模块
    $('#stuTable').on('click', '.editBtn', function (e) {
      var id = $(e.target).attr('data-id');
      goToAddStu(id);
    });

    // 4. 删除(本地)
    $('#stuTable').on('click', '.delBtn', function (e) {
      var id = $(e.target).attr('data-id');
      if (window.confirm('是否删除')) {
        // 在数组中找到，并且删除
        // Array.prototype.splice
        for (var i = 0; i < stuData.length; i++) {
          var item = stuData[i]
          if (item.stuId == id) {
            stuData.splice(i, 1);
            break;
          }
        }
        // 找到并且删除成功
        localStorage.stuData = JSON.stringify(stuData);
        totalPage = Math.ceil(stuData.length / size);
        if (currentPage > totalPage) {
          currentPage = totalPage;
        }
        renderContent();
      }
    })

    // 5. 查找 ajax
    $('#searchBtn').click(function () {
      var selectSearchItem = $('#selectSearchItem').val();
      var searchStu = $('#searchStu').val();
      if (searchStu) {
        $.ajax({
          type: 'POST',
          url: '/searchStu',
          dataType: 'json',
          data: {
            selectItem: selectSearchItem,
            value: searchStu
          },
          success(lists) {
            // lists 满足条件的学生列表
            if (lists.length == 0) {
              $('#stuTable').html('没有找到相关内容');
              $('#page').html('');
            } else {
              stuData = lists;
              // 重新计算totalPage, currentPage
              totalPage = Math.ceil(lists.length / size);
              currentPage = 1;
              renderContent();
            }
          }
        })
      } else {
        window.alert('请输入要搜索的内容');
      }
    })
    $('#backBtn').click(function () {
      // 拿取数据重新渲染
      $('#searchStu').val('');
      stuData = JSON.parse(localStorage.stuData);
      totalPage = Math.ceil(stuData.length / size)
      currentPage = 1;
      renderContent();
    })

  }
  function main() {
    // 1. 切换菜单栏
    changeItem();
    // 2. 初始化页面数据
    if (localStorage.stuData) {
      stuData = JSON.parse(localStorage.stuData);
      totalPage = Math.ceil(stuData.length / size);
      renderContent();
    } else {
      initData();
    }
    // 3. 其他操作
    bindEvent();
  }

  main();

})()
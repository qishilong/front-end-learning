(function () {
  //- 画图
  var init = function () {
    //- 获取数据
    _getData();
  }

  //- 获取图标数据方法调用
  var _getData = function () {
    $.ajax({
      url: 'https://open.duyiedu.com/api/student/findAll?appkey=kaivon_1574822824764',
      dataType: 'JSON',
      success: function (res) {
        renderAreaChat(res.data);
      }
    })
  }

  //- 渲染区域图表
  var renderAreaChat = function (list) {

    var myChat = echarts.init($('.areaChart')[0]);
    var obj = {}
    var tempArr = [];
    list.forEach(function (item) {
      if (!obj[item.address]) {
        obj[item.address] = 1;
      } else {
        obj[item.address]++
      }
    })
    for (var key in obj) {
      tempArr.push({ name: key, value: obj[key] })
    }

    myChat.setOption(option = {
      title: {
        text: '渡一教育学生地区分布统计',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: tempArr,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
  init();
})()
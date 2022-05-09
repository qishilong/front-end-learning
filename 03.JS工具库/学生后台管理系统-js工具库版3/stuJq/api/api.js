var template = {
  "stuId|+1": 1,
  "stuName": "@cname()",
  "stuGender": /[男女]/,
  "stuAge|20-30": 1,
  "stuEmail": "@email()",
  "stuTel": /^1[3568][1-9]\d{8}$/,
  "stuAddr": "@city"
}
Mock.mock('/getStuData', {
  "data|10": [template]
})

Mock.mock('/addStuRandom', function () {
  var newStu = Mock.mock({
    list: template
  });
  // 根据已有学生ID,ji算新学生的ID
  // 正常数据库查找操作
  var stuData = JSON.parse(localStorage.stuData);
  newStu.list.stuId = parseInt(stuData[stuData.length-1].stuId) + 1
  return newStu.list
});
function queryToObj(val) {
  var res = {}
  // a=b&c=d
  // & 拆分
  // [a=b, c=d]
  var valArr = val.split('&');
  // =拆分
  valArr.forEach(function (item) {
    var arrs = item.split('=');
    res[arrs[0]] = arrs[1];
  });
  // {a:b, c: d}
  return res;
}
Mock.mock('/addStu', 'post', function (options) {
  // console.log(options)
  var newStu = queryToObj(decodeURIComponent(options.body));
  // console.log(res);
  // 添加学号
  var stuData = JSON.parse(localStorage.stuData);
  newStu.stuId = parseInt(stuData[stuData.length-1].stuId) + 1
  return newStu;
});

Mock.mock('/getStuInfo', 'post', function (options) {
  var id = queryToObj(decodeURIComponent(options.body)).id;
  // 根据id获取学生信息
  var stuData = JSON.parse(localStorage.stuData);
  return stuData.filter(function (item) {
    return item.stuId == id
  })[0]
});

Mock.mock('/updateStu', 'post', function (options) {
  var newStu = queryToObj(decodeURIComponent(options.body));
  var stuData = JSON.parse(localStorage.stuData);
  // 找到对应元素并且更新
  for(var i=0; i<stuData.length; i++) {
    if (parseInt(stuData[i].stuId) === parseInt(newStu.stuId)) {
      // 对象合并
      // Object.assign(a，b)
      // 把b对象上面的属性，合并到a对象上，并且返回a
      Object.assign(stuData[i], newStu);
      break;
    }
  }
  return stuData;
});

Mock.mock('/searchStu', 'post', function (options) {
  var searchInfo = queryToObj(decodeURIComponent(options.body));
  var selectItem = searchInfo.selectItem;
  var value = searchInfo.value;
  var stuData = JSON.parse(localStorage.stuData);
  switch(selectItem) {
    case 'stuId': { 
      return stuData.filter(function (item) {
        return item.stuId == value;
      })
    }
    case 'stuName': {
      return stuData.filter(function (item) {
        return item.stuName == value;
      })
    }
    case 'stuGender': {
      return stuData.filter(function (item) {
        return item.stuGender === value;
      })
    }
  }
})


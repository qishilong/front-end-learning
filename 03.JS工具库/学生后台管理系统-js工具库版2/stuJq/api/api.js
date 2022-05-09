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
})
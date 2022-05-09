// 今天晚上要做的 3 个事情：（1）左侧菜单栏的切换（2）渲染初始数据 （3）随机生成一个学生数据



// 按道理来讲，数据应该是发送请求从服务器上面获取
// 这里我们就先把数据放到本地
// 学生的数据
var stuData = [
    { "stuId": 1, "stuName": "谢杰", "stuGender": "男", "stuEmail": "123@qq.com", "stuAge": 18, "stuTel": 13112341234, "stuAddr": "成都" },
    { "stuId": 2, "stuName": "张三", "stuGender": "男", "stuEmail": "234@qq.com", "stuAge": 19, "stuTel": 13112341234, "stuAddr": "北京" },
    { "stuId": 3, "stuName": "李四", "stuGender": "女", "stuEmail": "789@qq.com", "stuAge": 18, "stuTel": 13112341234, "stuAddr": "哈尔滨" },
];
var editStuId = null; // 保存要编辑的学生的 id

/**
 * 跳转学生列表
 * 其实就是挂类
 */
function goToStuList() {
    $('.leftMenuItem').classList.add('itemActive');
    $$('.leftMenuItem')[1].classList.remove('itemActive');
    $('.rightContent>div').classList.remove('notShow');
    $$('.rightContent>div')[1].classList.add('notShow');
    // 每次跳转回学生列表时，表单也重置一下
    clearForm();
}

/**
 * 跳转新增学生
 * 接收一个 id 作为参数
 */
function goToAddStu(id) {
    if (id) {
        // 进入此 if，说明是传递了 id 过来的，那么就说明你是要修改学生
        // 根据这个 id 获取到对应的学生数据，回填到表单里面
        var editStu = stuData.filter(function (item) {
            return item.stuId === parseInt(id);
        })[0];
        // 下一步要做表单的回填
        $('#stuName').value = editStu.stuName;
        $('#stuEmail').value = editStu.stuEmail;
        $('#stuAge').value = editStu.stuAge;
        $('#stuTel').value = editStu.stuTel;
        $('#stuAddr').value = editStu.stuAddr;
        // 性别需要单独处理
        if (editStu.stuGender === "男") {
            $('.gender').checked = true;
        } else {
            $$('.gender')[1].checked = true;
        }
        editStuId = editStu.stuId;
        $('#addStuBtn').value = "确认修改";
    }
    $('.leftMenuItem').classList.remove('itemActive');
    $$('.leftMenuItem')[1].classList.add('itemActive');
    $('.rightContent>div').classList.add('notShow')
    $$('.rightContent>div')[1].classList.remove('notShow');
}

/**
 * 给左侧菜单栏绑定事件
 */
function changeItem() {
    $('.leftMenu').addEventListener('click', function (e) {
        if (e.target.innerHTML === '学生列表') {
            // 用户点击的是学生列表
            goToStuList();
        } else {
            // 用户点击的是新增学生
            goToAddStu();
        }
    })
}

/**
 * 渲染表格内容
 */
function renderContent() {
    // `` 是 ES6 新提供的模板字符串，一个是可以解析字符串里面的变量，支持多行字符串
    // var name = "xiejie";
    // console.log(`Hello,${name} OK~`); // Hello, xiejie OK~
    // console.log(`
    //     qwe
    //     asd
    //     zxc
    // `);

    // 表头
    var tHead = `
        <thead>
            <tr>
                <th>学号</th>
                <th>姓名</th>
                <th>性别</th>
                <th>邮箱</th>
                <th>年龄</th>
                <th>手机号</th>
                <th>住址</th>
                <th>操作</th>
            </tr>
        </thead>
    `;
    var tBody = stuData.map(function (item) {
        // map 回调函数中，你返回什么，最终外面就会得到你的返回值的数组
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
    }).join("");
    $('#stuTable').innerHTML = `${tHead}<tBody>${tBody}</tBody>`;
}

/**
 * 随机新增一条学生数据
 */
$('#addStuRandom').addEventListener('click', function () {
    // 这里我们想要新增一条学生数据，理论上来讲有一个第三方库 Mock.js
    // 通过这个第三方库，可以快速的新增任意条可定制的随机数据
    // 这里我们来手动实现
    // { "stuId": 1, "stuName": "谢杰", "stuGender": "男", "stuEmail": "123@qq.com", "stuAge": 18, "stuTel": 13112341234, "stuAddr": "成都" }
    var newRandomStu = {
        "stuName": randomContent(lastName, 1) + (Math.random() > 0.5 ? randomContent(firstName, 1) : randomContent(firstName, 2)),
        "stuGender": Math.random() > 0.5 ? "男" : "女",
        "stuEmail": randomContent(charArr, Math.floor(Math.random() * 5 + 4)) + '@' + randomContent(charArr, 2) + '.com',
        "stuAge": Math.floor(Math.random() * 11 + 20),
        "stuTel": 1 + randomContent(numArr, 10),
        "stuAddr": randomContent(cityName, 1)
    };
    newRandomStu.stuId = stuData[stuData.length - 1].stuId + 1;
    stuData.push(newRandomStu);
    renderContent();
})

/**
 * 点击“自定义新增”按钮跳转到新增的表单
 */
$('#addStuBtnByForm').addEventListener('click', function () {
    goToAddStu();
})

/**
 * 用户点击表单的“提交”按钮时要做的事情
 * 这里对应两种情况：（1）新增学生  （2）修改学生
 */
$('#addStuBtn').addEventListener('click', function () {
    // 在判读是新增还是修改之前，我们有一些其他的东西要判断
    // 1. 表单是否有非空项目（jQuery 里面有一个很好用的方法  serialize，可以快速的获取到表单的每一项）
    var arr = [$('#stuName').value, $('.gender').checked ? "男" : "女", $('#stuEmail').value, $('#stuAge').value, $('#stuTel').value, $('#stuAddr').value]; // 数组里面存储表单项目的每一项值
    if (arr.every(function (item) {
        return item !== "";
    })) {
        // 进入 if，说明没有空项目
        // 接下来我们要进行第二项验证，判断用户填写的每一项是否符合要求
        // var a = [1, 2, 3];
        // var b = [4, 5, 6];
        // var c = [...a,...b]; // [1,2,3,4,5,6]
        var regArr = [...$$('.regValidate')];
        if (regArr.every(function (item) {
            return item.innerHTML === "";
        })) {
            // 进入此 if，说明没有空项，验证也 OK，可以提交
            // 接下来就需要判断是新增还是修改

            var newStu = {
                "stuName": arr[0],
                "stuGender": arr[1],
                "stuEmail": arr[2],
                "stuAge": arr[3],
                "stuTel": arr[4],
                "stuAddr": arr[5]
            }
            if ($('#addStuBtn').value === "提交") {
                // 说明是要手动新增学生
                newStu.stuId = stuData[stuData.length - 1].stuId + 1; // 新增学生要修改的 id
                stuData.push(newStu);
            } else {
                // 说明是要修改学生
                newStu.stuId = editStuId;
                // 进行数据的替换
                // 变量 stuData 数组，该数组里面装的一个个对象，每一个对象就是一个学生数据
                for (var i = 0; i < stuData.length; i++) {
                    if(stuData[i].stuId === editStuId){
                        // 如果进入此 if，说明找到了要编辑的学生对象，该学生对象在 stuData 数组中的下标就是 i
                        stuData.splice(i, 1, newStu);
                        break;
                    }
                }
            }
            renderContent();
            goToStuList();
        } else {
            window.alert('请按照要求填写每一项');
        }
    } else {
        window.alert('请填写表单的所有项目');
    }
})

/**
 * 清空表单
 */
function clearForm() {
    // 1. 清空表单项目里面填写的值
    $('#addStuForm').reset();
    // 2. 清空正则验证的提醒文字
    var regArr = [...$$('.regValidate')];
    for (var i = 0; i < regArr.length; i++) {
        regArr[i].innerHTML = "";
    }
    // 3. 还原表单的“提交”按钮
    $('#addStuBtn').value = "提交";
}

/**
 * 表单“返回”按钮对应的事件
 */
$('#backStuList').addEventListener('click', function () {
    // 1. 清空表单
    clearForm();
    // 2. 跳转回学生列表
    goToStuList();
})

/**
 * 用户点击“编辑”按钮对应的事件
 * 注意这里用到了事件委托（原理就是用到了事件冒泡）
 */
$('#stuTable').addEventListener('click', function (e) {
    if (e.target.classList.contains('editBtn')) {
        // 跳转到学生表单
        goToAddStu(e.target.dataset.id);
    }
})

/**
 * 主函数
 */
function main() {
    // 1. 左侧菜单栏绑定事件，点击之后可以切换
    changeItem();

    // 2. 渲染初始数据
    // 正常来讲，数据应该是从服务器获取到的
    // 但是由于现在还没有学习网络的相关知识，那么我们先手动返回 stuData 学生数据
    renderContent();
}
main();
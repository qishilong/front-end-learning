// 今天晚上要做的 3 个事情：（1）左侧菜单栏的切换（2）渲染初始数据 （3）随机生成一个学生数据

// 封装 DOM 查询函数

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

// 按道理来讲，数据应该是发送请求从服务器上面获取
// 这里我们就先把数据放到本地
// 学生的数据
var stuData = [
    { "stuId": 1, "stuName": "谢杰", "stuGender": "男", "stuEmail": "123@qq.com", "stuAge": 18, "stuTel": 13112341234, "stuAddr": "成都" },
    { "stuId": 2, "stuName": "张三", "stuGender": "男", "stuEmail": "234@qq.com", "stuAge": 19, "stuTel": 13112341234, "stuAddr": "北京" },
    { "stuId": 3, "stuName": "李四", "stuGender": "女", "stuEmail": "789@qq.com", "stuAge": 18, "stuTel": 13112341234, "stuAddr": "哈尔滨" },
];

/**
 * 跳转学生列表
 * 其实就是挂类
 */
function goToStuList() {
    $('.leftMenuItem').classList.add('itemActive');
    $$('.leftMenuItem')[1].classList.remove('itemActive');
    $('.rightContent>div').classList.remove('notShow')
    $$('.rightContent>div')[1].classList.add('notShow')
}

/**
 * 跳转新增学生
 */
function goToAddStu() {
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
        "stuEmail": randomContent(charArr,Math.floor(Math.random() * 5 + 4)) + '@' + randomContent(charArr, 2) + '.com',
        "stuAge": Math.floor(Math.random() * 11 + 20),
        "stuTel": 1 + randomContent(numArr, 10),
        "stuAddr": randomContent(cityName, 1)
    };
    newRandomStu.stuId = stuData[stuData.length - 1].stuId + 1;
    stuData.push(newRandomStu);
    renderContent();
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
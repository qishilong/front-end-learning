# *Vue* 版本学生管理系统第二天



今日目标：



- 搭建系统页面框架
- *Vuex* 介绍
- 完成学生模块



## 搭建系统页面框架

昨天我们已经搭建了项目的整体架子，并完成了登录以及注册模块。

今天我们首先完成进入学生系统后的页面架构。

![image-20220308095905739](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-08-015906.png)

可以看到，整个后台管理系统大致可以分为 *3* 大块，这也是基本绝大多数后台管理系统的一个展现形式。

由于后台管理系统的展现形式比较固定，用到的东西也比较固定，所以出现了很多相关的组件库。

这里我们采用 *Element-ui* 来快速搭建这个架构。

具体可以参阅：*https://element.eleme.cn/#/zh-CN/component/container*



由于我们登录后跳转到的是 *Home* 组件，因此在 *Home* 组件中书写如下的结构：

```vue
<template>
  <div id="app">
    <el-container>
      <!-- 管理系统头部 -->
      <el-header>
        <!-- 左侧logo -->
        <el-col :span="22">
          <img class="logo" src="../assets/logo.png" />
          <span class="sysTitle">渡一教育</span>
        </el-col>
        <!-- 右侧用户头像 -->
        <el-col :span="2">
          <!-- 头像下拉菜单 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              <span class="el-dropdown-link userinfo-inner">
                <img
                  src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
                />
              </span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span>用户信息</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="loginoutHandle">退出登陆</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-header>
      <!-- 管理系统主体部分 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-col>
            <el-menu
              :default-active="$route.name"
              class="el-menu-vertical-demo"
              background-color="#304156"
              text-color="#bfcbd9"
              active-text-color="#409EFF"
              collapse-transition
              router
            >
              <!-- 学生管理模块 -->
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>学生管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="stuList">
                    <i class="el-icon-document-copy"></i>
                    <span>学生列表</span>
                  </el-menu-item>
                  <el-menu-item index="addStu">
                    <i class="el-icon-edit"></i>
                    <span>新增学生</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 班级管理模块 -->
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-notebook-1"></i>
                  <span>班级管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="classList">
                    <i class="el-icon-tickets"></i>
                    <span>班级列表</span>
                  </el-menu-item>
                  <el-menu-item index="addClass">
                    <i class="el-icon-folder-add"></i>
                    <span>新增班级</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
.el-container {
  height: 100vh;
}

.el-header {
  background: rgb(53, 68, 87);
  color: #c0ccda;
  line-height: 60px;
  font-size: 24px;
  padding: 0;
}
.logo {
  width: 40px;
  float: left;
  margin: 10px 15px;
}
.sysTitle {
  font-size: 20px;
  font-weight: 100;
}
.userinfo-inner {
  cursor: pointer;
}
.userinfo-inner img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;
}
.el-aside {
  background: rgb(77, 94, 112);
  color: #b3bcc5;
  line-height: 200px;
}

.el-main {
  background: #f1f2f7;
  color: #333;
  height: 100%;
  overflow:auto;
  padding-bottom: 100px;
}
.el-menu {
  border-right: none;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
```

接下来需要创建 *Home* 组件下的嵌套路由，如下：

```js
{
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('../views/Index.vue')
      },
      {
        path: '/stuList',
        name: 'stuList',
        component: () => import('../views/StuList.vue')
      },
      {
        path: '/addStu',
        name: 'addStu',
        component: () => import('../views/AddStu.vue')
      },
      {
        path: '/editStu/:id',
        name: 'editStu',
        component: () => import('../views/EditStu.vue')
      },
      {
        path: '/classList',
        name: 'classList',
        component: () => import('../views/ClassList.vue'),
      },
      {
        path: '/addClass',
        name: 'addClass',
        component: () => import('../views/AddClass.vue')
      },
      {
        path: '/editClass/:id',
        name: 'editClass',
        component: () => import('../views/EditClass.vue')
      }
    ]
  },
```

上面是一个嵌套路由，这意味着：

```js
http://localhost:8080/ ---> Index
http://localhost:8080/stuList ---> StuList
http://localhost:8080/addStu ---> AddStu
http://localhost:8080/classList ---> ClassList
http://localhost:8080/addClass ---> addClass
```

接下来需要创建对应的组件，其中 *Index.vue* 就是系统一进来就渲染的组件，我们用来显示 *Echarts* 图表数据。

在 *Vue* 中要使用 *Echarts* 也非常简单，首先安装 *echarts*

```js
npm i echarts@5.2.2
```

该组件的代码如下：

```vue
<template>
  <div class="container">
    <div class="container-left" id="container-left"></div>
    <div class="container-right" id="container-right"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      classesName: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/classes").then(({ data }) => {
      this.classesNames = data.map(obj=>{
        return obj.name;
      });
      this.drawLine();
    });
  },
  methods: {
    // 绘制方法
    drawLine() {
      // 基于准备好的 dom，初始化 echarts 实例
      var myChart1 = echarts.init(document.getElementById("container-left"));
      var myChart2 = echarts.init(document.getElementById("container-right"));
      // 绘制左侧图表
      myChart1.setOption({
        title: {
          text: "各班级人数",
        },
        xAxis: {
          type: "category",
          data: this.classesNames,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      });
      // 绘制右侧图表
      myChart2.setOption({
        title: {
          text: "总分数占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "90分以上" },
              { value: 735, name: "80分以上" },
              { value: 580, name: "70分以上" },
              { value: 484, name: "60分以上" },
              { value: 300, name: "不合格" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  margin: 30px auto;
  height: 500px;
  display: flex;
  justify-content: space-between;
}
.container-left,
.container-right {
  width: 48%;
  height: 100%;
}
</style>
```



*Home* 组件除了渲染 *Index* 组件以外，我们还需要获取学生和班级的数据，这里需要涉及到 *Vuex* 的相关知识。



## *Vuex* 介绍

*Vuex* 是一个专为 *Vue.js* 应用程序开发的状态机。当我们构建一个中大型的单页面应用程序时，*Vuex* 可以更好的帮助我们在组件外部统一管理状态。

如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-08-031311.png" alt="image-20220308111310694" style="zoom:50%;" />

在 *Vuex* 之前，当我们的应用遇到多个组件之间要共享状态时，传统的 *props、event* 传参方式对于多层嵌套的组件来讲，整个过程会变得非常繁琐。

并且这个问题在兄弟组件间的信息传递中尤为明显，必须先通过共有的根组件才能进行信息传递。

如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-08-031332.png" alt="image-20220308111331488" style="zoom:50%;" />

在上图中，根组件下有子组件 *1* 和 *2*，子组件 *1、2* 下面又分别有各自的子组件 *3* 和 *4*。

这个时候，如果组件 *4* 的状态和组件 *3* 有关系，那么按照我们以前的方式，就需要先从组件 *4* 一层一层先传递到根组件，然后再由根组件传递给组件 *3*。

设想如果是大型应用，这样一层一层来传递数据的通讯方式就会显得非常的脆弱，通常会导致无法维护的代码。

所以，这时就出现了专门负责状态管理的 *Vuex*

*Vuex* 的官网为：*https://vuex.vuejs.org/zh/*

根据 *Vuex* 官网上的描述：

>*Vuex* 是一个专为 *Vue.js* 应用程序开发的状态管理模式。采用集中式存储管理应用的所有组件的状态。

这里的关键在于**集中式存储管理**。这意味着本来需要共享状态的更新是需要组件之间的通讯，而现在有了 *Vuex*，组件就都和 *store* 通讯了。

这也是为什么官网再次会提到 *Vuex* 构建大型应用的价值，如果你不打算开大大型的单页应用，使用 *Vuex* 可能会变得很繁琐，对于大型项目，可以使用 *Vuex* 作为不同组件之间的状态管理。

如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-08-031357.png" alt="image-20220308111356675" style="zoom:50%;" />



*Vuex* 默认的五种基本的对象：

- *state*：存储状态（可以理解为变量）可以从计算属性中返回某个状态
- *getters*：通常用在数据的二次处理（过滤数据...），可以理解为state的计算属性
- *mutations*：修改状态，并且是同步的。
- *actions*：异步操作。
- *modules*： *Vuex* 允许我们将 *store* 分割成模块（*module*）。每个模块拥有自己的 *state、mutation、action、getter* 用法和上面是一样的。



也就是说，有了 *Vuex* 后，就相当于有了一个数据仓库，之后模块要做什么数据都从仓库拿，由于所有模块的数据都来源于仓库，所以各个模块能够做到数据的统一性。

具体的使用示例参阅《学生管理系统》相关代码。



在 *Home* 组件中，我们要从服务器获取数据，因此在 *student.js* 和 *classes.js* 中书写相应的 *action*：

```js
// 获取初始化数据，之后同步更新本地仓库
getDataAction(context) {
  axios.get("/students").then(({ data }) => {
    context.commit("initStuDataMutation", data);
  });
},
```

```js
// 获取初始化数据，之后同步更新本地仓库
getDataAction(context) {
  axios.get("/classes").then(({ data }) => {
    context.commit("initClassesDataMutation", data);
  });
},
```

然后在 *Home* 组件中来进行获取：

```js
import { mapActions } from "vuex";
export default {
  name: "App",
  // 获取学生和班级的数据
  created() {
    // 初始化数据
    this.initStudentData();
    this.initClassesData();
  },
  methods: {
    ...mapActions({
      initStudentData: "students/getDataAction",
      initClassesData: "classes/getDataAction",
    }),
    ...
  },
};
```



## 完成学生模块

正如前面所说，有了仓库数据后，所有组件都从仓库去获取数据。

因此我们要渲染的学生模块也是从仓库获取数据，然后渲染。

首先补充对应的结构和样式，如下：

```vue
<template>
  <div class="container">
    <!-- 搜索框容器 -->
    <div class="searchBox">
      <!-- 搜索框 -->
      <el-input
        placeholder="请先选择左侧类别，再输入查询内容"
        v-model="input"
        class="input-with-select stuSearch"
      >
        <el-select v-model="select" slot="prepend">
          <el-option label="学号" value="1"></el-option>
          <el-option label="姓名" value="2"></el-option>
          <el-option label="手机号" value="3"></el-option>
        </el-select>
      </el-input>
      <!-- 搜索按钮 -->
      <div>
        <el-button
          icon="el-icon-search"
          type="primary"
          style="margin-left: 20px"
          @click="stuSerarch"
        ></el-button>
      </div>
    </div>

    <!-- 学生数据表格 -->
    <el-table :data="stuListByPage" border style="width: 100%">
      <el-table-column
        label="学号"
        prop="id"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        label="姓名"
        prop="name"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        label="性别"
        prop="gender"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        label="年龄"
        prop="age"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        label="手机号"
        prop="phone"
        align="center"
      ></el-table-column>
      <el-table-column
        label="邮箱"
        prop="email"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        label="籍贯"
        prop="address"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-user-solid"
            circle
            size="small"
            @click="showStuDetail(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-edit"
            circle
            size="small"
            @click="goToEditStuHandle(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            @click="deleteStuHandle(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
 		<!-- 分页组件 -->
    <el-pagination
      style="margin-top: 30px"
      background
      :page-size="eachPage"
      :page-sizes="[5, 10, 15, 20]"
      layout="prev, pager, next, total, ->,sizes, jumper"
      :total="count"
      :current-page.sync="pagerCurrentPage"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
      @current-change="currentChangeHandle"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>
```

在上面的结构中，我们整体书写了一个搜索框，一个表格和一个分页组件。

对应的样式如下：

```css
<style scoped>
.dialogContainer {
  font-weight: 300;
  font-size: 18px;
}
/* 学生信息 */
.stuInfo {
  width: 100%;
  display: flex;
}
.stuInfo > div {
  width: 35%;
  height: 150px;
}
.stuInfo-left {
  margin: 0 50px;
}
.stuInfo-left > img {
  padding: 5px;
}
.stuInfo-right > div {
  margin: 5px auto;
}
.stuInfo-right > div:first-child {
  margin-top: 0;
}

/* 标题 */
.title {
  margin-top: 30px;
  margin-bottom: 15px;
  font-weight: 400;
}

/* 联系方式 */
.contact-container {
  font-size: 16px;
}
.contact-container > div {
  margin: 10px 0px 10px 30px;
}

/* 分数 */
.score-container {
  display: flex;
  font-size: 16px;
}
.score-container > div:first-child {
  margin-left: 30px;
}
.score-container > div {
  margin-right: 50px;
}

/* 个人简介 */

.stuIntro > p {
  font-size: 16px;
  font-weight: 200;
  text-indent: 30px;
}

.el-dialog {
  background-color: rgb(246, 246, 246);
}

/* 搜索栏 */
.searchBox {
  display: flex;
  margin-top: 15px;
}

.stuSearch {
  width: 400px;
  margin-bottom: 20px;
}
</style>
```

后面具体的 *JS* 代码参阅项目文件。
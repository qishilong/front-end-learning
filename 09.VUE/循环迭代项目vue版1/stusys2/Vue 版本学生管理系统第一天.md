# *Vue* 版本学生管理系统第一天



今日目标：



- 项目演示
- 介绍 *json-server*
- 搭建项目整体框架
- 完成登录注册模块



## 项目演示

本项目是一个 Vue 版本的学生管理系统，简单的实现了如下的模块：

- 登录：用户可以根据账号密码登录该学生管理系统
- 注册：用户可以注册一个新的管理员账号，以便于登录此管理系统
- 学生模块：该模块实现了学生信息相关的增删改查操作
- 班级模块：该模块实现了班级信息相关的增删改查操作



## 介绍 *json-server*

我们知道，前端的数据来源于后端服务器，但是在目前前后端分离开发的阶段，前端和后端是同时开始开发的，这意味着前端在进行开发时往往数据并没有出来。

一种最简单的方式是使用 *Mock.js* 来模拟数据，而这里要介绍的 *json-server*，是一款轻松提供后台数据的工具，我们可以使用该工具快速搭建一个服务器，并为我们的前端提供所需的数据。

官网地址：*http://jsonplaceholder.typicode.com/*

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-07-094600.png" alt="image-20220307174559171" style="zoom:50%;" />



### 快速搭建后台服务器

首先新建一个项目目录 *server*，并且使用 *npm init -y* 来初始化该目录。

切换到我们的项目目录下，安装 *json-server*，如下：

```js
npm install json-server
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-07-094634.png" alt="image-20220307174634521" style="zoom:50%;" />

然后新建 *db.json* 文件，这里面用于存储我们的数据，如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-07-094657.png" alt="image-20220307174656821" style="zoom:50%;" />

*db.json* 文件中的数据如下：

```js
// db.json
{
    "users": [{
            "name": "xiejie",
            "age": "18",
            "phone": "333-444-555",
            "email": "xiejie@gmail.com",
            "education": "adsfasfd",
            "graduationschool": "asdfasfd",
            "profession": "asdfasdf",
            "profile": "asdfasfdasdf",
            "id": 1
        },
        {
            "name": "yajing",
            "age": "34",
            "phone": "123-345-678",
            "email": "yajing@hotmail.com",
            "education": "fasdfasfd",
            "graduationschool": "fasfasdf",
            "profession": "sdfasdfafd",
            "profile": "asdfasdf",
            "id": 3
        },
        {
            "name": "xizhi",
            "age": 47,
            "phone": "13112341234",
            "email": "1234567@qq.com",
            "education": "硕士",
            "graduationschool": "北京大学",
            "profession": "前端开发工程师",
            "profile": "大家好!",
            "id": 2
        }
    ],
    "companies": [{
            "id": 1,
            "name": "Apple",
            "description": "Apple is good!"
        },
        {
            "id": 2,
            "name": "Microsoft",
            "description": "Microsoft is good!"
        },
        {
            "id": 3,
            "name": "Google",
            "description": "Google is good!"
        }
    ]
}
```

至此，一个简易的服务器就已经搭建好了。

接下来我们需要对这个 *db.json* 文件里面的数据进行监听，打开 *package.json* 文件，添加如下设置：

```js
"json:server": "json-server --watch db.json"
```

现在，我们就可以使用 *npm run json:server* 命令来启动服务器了。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-07-094755.png" alt="image-20220307174754416" style="zoom:50%;" />

访问 *localhost:3000*，就可以看到服务器已经能够正常访问。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-07-094813.png" alt="image-20220307174812297" style="zoom:50%;" />

访问 *localhost:3000/users*，可以看到正常返回了我们在 *db.json* 中所设置的数据。如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-07-094831.png" alt="image-20220307174830491" style="zoom:50%;" />

### 数据相关操作

目标服务器搭建完毕后，我们就可以对数据进行相应的 *CURD* 操作了。*json-server* 提供标准的 *Restful* 风格的数据操作，下面我们就依次来看一下这几项操作。

>注：*CURD* 是一个数据库技术中的缩写词，它代表创建（*Create*）、更新（*Update*）、读取（*Read*）和删除（*Delete*）操作。

#### 查询数据

在 *json-server* 中提供了多种数据查询方式，具体可以参阅官方文档：*https://github.com/typicode/jsonplaceholder#how-to*

这里我们来看几种比较常见的查询需求：

```js
// 获取所有用户信息
http://localhost:3000/users

// 获取id为1的用户信息
http://localhost:3000/users/1

// 获取公司的所有信息
http://localhost:3000/companies

// 获取单个公司的信息
http://localhost:3000/companies/1

// 获取所有公司id为3的用户
http://localhost:3000/companies/3/users

// 根据公司名字获取信息
http://localhost:3000/companies?name=Microsoft

// 根据多个名字获取公司信息
http://localhost:3000/companies?name=Microsoft&name=Apple

// 获取一页中只有两条数据
http://localhost:3000/companies?_page=1&_limit=2

// 升序排序 asc升序 desc降序
http://localhost:3000/companies?_sort=name&_order=asc

// 获取年龄30及以上的
http://localhost:3000/users?age_gte=30

// 获取年龄在30到40之间
http://localhost:3000/users?age_gte=30&age_lte=40

// 搜索用户信息
http://localhost:3000/users?q=h
```

例如：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-07-094917.png" alt="image-20220307174916840" style="zoom:50%;" />

#### 新增数据

新增数据我们结合 *Postman* 工具来进行测试，示例如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-07-095124.gif" alt="2019-07-06 22.05.05" style="zoom:50%;" />

#### 删除数据

删除数据我们也同样借助 *Postman*，可以根据 *id* 来删除用户，示例如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-07-095151.gif" alt="2019-07-06 22.08.42" style="zoom:50%;" />

#### 更新数据

更新数据使用 *PATCH* 的请求方式，示例如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-07-095215.gif" alt="2019-07-06 22.12.20" style="zoom:50%;" />





## 搭建项目整体框架

接下来我们需要搭建整个项目的框架。

整体项目目录如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-07-095607.png" alt="image-20220307175606369" style="zoom:50%;" />

其中 *stusysy-client* 为前端代码，*stusys-server* 为使用 *json-server* 搭建的服务器端代码。



*stusysy-client* 为使用 *vue-cli* 搭建的项目，所需要的依赖如下：

```js
"dependencies": {
    "axios": "^0.24.0",
    "core-js": "^3.6.5",
    "default-passive-events": "^2.0.0",
    "echarts": "^5.2.2",
    "element-ui": "^2.15.6",
    "vue": "^2.6.11",
    "vue-router": "^3.2.0",
    "vuex": "^3.4.0"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-plugin-router": "~4.5.0",
    "@vue/cli-plugin-vuex": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^6.2.2",
    "vue-template-compiler": "^2.6.11"
  },
```



整个项目，我们会用到 *vue-router* 和 *vuex*。

在 *vue* 项目中，如果使用 $router.push 跳转到一个相同的路由，就会遇到以下错误。

<img src="https://upload-images.jianshu.io/upload_images/19594108-6b5544acae3c12ca?imageMogr2/auto-orient/strip|imageView2/2/w/1002/format/webp" alt="img" style="zoom: 90%;" />

在 *vue-router* 在 *3.1.0* 版本之后，*push* 和 *replace* 方法会返回一个 *promise* 对象，如果跳转到相同的路由，就报 *promise uncaught* 异常。

解决方案：

在 *router/index.js* 导入 *VueRouter* 的时候，进行全局的处理

```js
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
```



另外 *vuex* 中采用了模块化的方式，对应的目录结构如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-03-07-100627.png" alt="image-20220307180627276" style="zoom:50%;" />

*store/index.js*

```js
import Vue from 'vue'
import Vuex from 'vuex'
import students from './modules/students'
import classes from './modules/classes'
import admins from './modules/admins'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    students,
    classes,
    admins
  }
})
```



最后，我们修改 *App.vue* 根组件：

```vue
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
html,
body,
div,
img,
form,
input,
label,
div,
span,
ul,
li,
h3 {
  margin: 0;
  padding: 0;
}

html,
body {
  margin: 0;
  padding: 0;
  /* height: 100%; */
  overflow: hidden;
    /* - 动态导入 */
    background-image: url('./assets/bg.jpg');
    background-repeat: no-repeat;
}

ul,
li {
  list-style: none;
}

a {
  text-decoration: none;
}

.app-container {
  height: 100%;
}

/* 清除浮动 */

.clear::after {
  content: "";
  display: block;
  clear: both;
}
</style>
```



## 完成登录注册模块

今天的最后一个任务是搞定登录注册模块。

首先我们需要在 *views* 目录下创建 *Login* 和 *Register* 这两个组件，创建完成后在 *router/index.js* 中进行注册：

```js
const routes = [
  // ...
  {
    path:'/login',
    name : 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path:'/register',
    name : 'register',
    component: () => import('../views/Register.vue')
  },
]
```

登录组件对应代码：

```vue
<template>
  <div class="login-container">
    <div class="logo-wrapper">
      <!-- 静态导入   -->
      <img src="../assets/logo2.png" />
    </div>
    <form class="login-form">
      <input type="text" placeholder="用户名" v-model.trim="userForm.account" />
      <input
        type="password"
        placeholder="密码"
        autocomplete
        v-model.trim="userForm.password"
      />
      <div class="btns form-item">
        <input
          class="login-btn"
          type="submit"
          value="登录"
          @click.prevent="_loginBtnClick"
        />
        <router-link class="switch-register-btn" to="/register"
          >注册</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      userForm: {
        account: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      loginAction: "admins/loginAction",
    }),
    _loginBtnClick() {
      if (!this.userForm.account || !this.userForm.password) {
        window.alert("用户名或密码不能为空");
        return;
      }
      this.loginAction(this.userForm)
        .then(()=>{
          this.$router.push("/")
        }).catch(()=>{
          this.$message.error("账号或者密码不正确");
        })
    },
  },
};
</script>

<style scoped>

.login-container {
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -200px;
}

.logo-wrapper {
    width: 400px;
    margin-bottom: 35px;
}

.logo-wrapper>img {
    width: 100%;
}

.login-form>input {
    width: 335px;
    height: 20px;
    padding: 10px;
    outline: none;
    display: block;
    margin: 0 auto 30px;
}

.btns {
    width: 350px;
    margin: 0 auto;
}

.login-btn,
.switch-register-btn {
    float: left;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-left: 45px;
    cursor: pointer;
    color: #fff;
    border-radius: 4px;
}

.btns>.login-btn {
    background-color: #409aff;
    outline: none;
    border: none;
}

.btns>.switch-register-btn {
    background-color: #67c23a;
}
</style>
```

注册组件对应代码：

```vue
<template>
  <div class="user-register">
    <!-- logo部分 -->
    <router-link class="logo-container" to="/main">
      <img src="../assets/logo2.png" alt="">
    </router-link>
    <!-- 宣言部分 -->
    <div class="text-container">
      <h3 class="ft_60">用前端</h3>
      <div class="text-description">让用户有更好的体验</div>
    </div>
    <!-- 表单部分 -->
    <div class="form-container">
      <div class="form-title-container">
        <h3 class="">欢迎注册</h3>
        <div>已有账号？<router-link :to="{name:'login'}">登录</router-link>
        </div>
      </div>
      <form class="form-body">
        <div class="form-item clear">
          <label for="userName">用户名:</label>
          <input type="text" v-model.trim="regForm.username">
        </div>
        <div class="form-item clear">
          <label for="userAccount">账号:</label>
          <input type="text" v-model.trim="regForm.account">
        </div>
        <div class="form-item clear">
          <label for="userPassword">密码:</label>
          <input type="password" v-model.trim="regForm.password" autocomplete>
        </div>
        <div class="form-item  clear">
          <label for="confirmPassword">确认密码:</label>
          <input type="password" v-model.trim="regForm.rePassword" autocomplete>
        </div>
        <input class="register-btn" type="submit" @click.prevent="_sendRegInfo" id="submitBtn" value="注册">
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "register",
  data () {
    return {
      regForm: {
        username: '',
        account: '',
        password: '',
        rePassword: '',
      }
    }
  },
  methods: {
    ...mapActions({
      registerAction:"admins/registerAction"
    }),
    _sendRegInfo(){
       if (Object.values(this.regForm).some(val => !val)) return window.alert('请完成表单项填写');
       this.registerAction(this.regForm)
          .then(()=>{
            this.$router.push('/login');
          })
    }
  },
}
</script>

<style scoped>
.user-register {
    height: 100%;
    overflow: hidden;
    background-size: cover;
}

.logo-container {
    position: absolute;
    left: 70px;
    top: 50px;
}

.logo-container>img {
    width: 320px;
}

.text-container {
    position: absolute;
    top: 325px;
    left: 194px;
    color: #fff;
    font-size: 34px;
}

.ft_60 {
    font-size: 60px;
}

.form-container {
    position: absolute;
    right: 140px;
    width: 479px;
    height: 680px;
    background-color: rgba(255, 255, 255, .9);
    top: 50%;
    margin-top: -340px;
    border-radius: 12px;
    ;
}


/* 登录区域上方文字 */

.form-title-container {
    margin-top: 56px;
    margin-left: 35px;
}

.form-title-container>h3 {
    font-size: 40px;
}

.form-title-container a {
    color: #2e58fe;
}

.form-body {
    margin-top: 70px;
}

label {
    height: 40px;
    line-height: 40px;
    text-align: right;
    width: 80px;
    margin-right: 13px;
    float: left;
}

.form-body .form-item input {
    height: 38px;
    width: 326px;
    outline: none;
    text-indent: 20px;
    /* outline: #409eff; */
    border: 1px solid #ddd;
    float: left;
    border-radius: 4px;
}

.form-body .form-item input:focus {
    border-color: #409eff;
}

.form-body>.form-item {
    margin-bottom: 40px;
    position: relative;
}

.register-btn {
    width: 397px;
    height: 48px;
    display: block;
    border-radius: 24px;
    margin: 0 auto;
    outline: none;
    border: none;
    color: #fff;
    background: #3f89ec;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
}

.prompt-txt {
    width: 317px;
    height: 39px;
    line-height: 30px;
    position: absolute;
    top: -46px;
    left: 97px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background-size: cover;
    background-image: url(/img/check-username-bg.png);
}

.error-inp {
    border-color: #f55!important;
}

.err-message {
    font-size: 12px;
    color: #f55;
    position: absolute;
    left: 97px;
    top: 43px;
    /* display: none; */
}
</style>
```

无论是登录还是注册，我们都通过 *dispatch* 一个 *action* 来进行异步的操作，因此我们在 *store/modules/admins.js* 中定义了如下的 *action*

```js
actions : {
        // 用户注册
        registerAction(context,payload){
            return new Promise((resolve)=>{
                axios.post('/admins', payload)
                .then(({data})=>{
                    resolve(data);
                })
            })
        },
        // 用户登陆
        loginAction(context,payload){
            return new Promise((resolve,reject)=>{
                axios.get(`/admins?account=${payload.account}&password=${payload.password}`)
                    .then(({data})=>{
                        if(data.length){
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    })
            })
        }
    },
```


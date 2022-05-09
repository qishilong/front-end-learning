const Koa = require('koa');
const router = require('koa-router')()
const app = new Koa()
const cors = require('koa2-cors');

/* //-添加跨域响应头Cors测试(后端同学完成的) */
app.use(cors({
  origin: "*",  // 所有的ajax请求地址都能对我这个接口进行访问
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

/* -0 cors GET请求测试 */
router.get('/', async ctx => {
  ctx.body = {
    name: "小明",
    age: 20
  }
})

/* -1 cors POST请求测试 */
router.post('/', async ctx => {
  ctx.body = {
    name: "小明",
    age: 20
  }
})
/* -2 cors 复杂请求 */
router.put('/', async ctx => {
  ctx.body = {
    name: "小明",
    age: 20
  }
})
/* -3 cors1 复杂请求 */
router.put('/testput', async ctx => {
  ctx.body = {
    name: "小明",
    age: 20
  }
})

/* JSONP请求测试 */
router.get('/jsonP', async ctx => {
  // 获取前端传递的参数
  const callback = ctx.query.callback
  // responseFn(传递给前端的参数)
  ctx.body = `${callback}(${JSON.stringify({ name: "小明", age: 20 })})`
})

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(3000, ctx => {
  console.log(`服务器创建成功，你现在本地已经开启了${server.address().port}的端口`)
});

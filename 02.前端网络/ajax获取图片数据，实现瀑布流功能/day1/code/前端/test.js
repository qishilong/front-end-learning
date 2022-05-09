//- responseFn({ name: "小明", age: 20 })



const callback = ctx.query.callback   //- responseFn  
// responseFn(传递给前端的参数)
ctx.body = `${callback}(${JSON.stringify({ name: "小明", age: 20 })})`   
//- responseFn({name:'',age:''})
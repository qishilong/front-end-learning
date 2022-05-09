# *ES6* 技术提升第二天



内容大纲：



- 作业评讲
- *ES6* 常见面试题
- *Promise* 相关面试题



## 作业评讲

实现一个函数 *toJSON*，将传入的数据转换为 *JSON* 格式的字符串。

> 注：不可使用原生 *JavaScript* 中的 *JSON* 对象

```js
/**
 * 将传入的数据转换为 JSON 格式的字符串
 * @param {any} data 要转换的数据
 * @returns {String} 返回转换后的 JSON 字符串 
 */
function toJSON(data){
	// code here
}

// test
toJSON(""); // -> ""
toJSON("abc"); // -> "abc"
toJSON(123); // -> 123
toJSON({a:1, b:2}); // -> {"a":1, "b":2}
toJSON(["1", 3, {name:"monica", age:18}]); //-> ["1", 3, {"name":"monica", "age":18}]
```

参考答案：

```js
/**
 * 将传入的数据转换为 JSON 格式的字符串
 * @param {any} data 要转换的数据
 * @returns {String} 返回转换后的 JSON 字符串 
 */
function toJSON(data) {
    // 根据 data 不同的类型，做不同的处理
    const type = typeof data;
    switch (type) {
        case "string": {
            return `"${data}"`;
        }
        case "boolean":
        case "number": {
            return "" + data;
        }
        case "object": {
            if (data === null) {
                return "null";
            } else if (Array.isArray(data)) {
                // 数组
                return `[${data.map(it => toJSON(it)).join(",")}]`;
            } else {
                // 普通对象
                return `{${Object.entries(data).map(([key, value]) => `"${key}":${toJSON(value)}`).join(",")}}`;
            }
        }
    }
}

// 此题目就是模拟的 JSON.stringify 方法
// 打印一个字符串，是不会有双引号的
console.log("test"); // test
// 如果控制台打印的是数字或者布尔值，颜色是不一样的
console.log(1); 
console.log(true);
// 所以数字或者布尔值传入 toJSON 函数需要转为字符串
// 而如果本身就是字符串，则需要两边添加双引号

// test
console.log(toJSON("")); // -> ""
console.log(toJSON("abc")); // -> "abc"
console.log(toJSON(123)); // -> 123
console.log(toJSON(true)); // -> true
console.log(toJSON({ a: 1, b: 2 })); // -> {"a":1, "b":2}
console.log(toJSON(["1", 3, { name: "monica", age: 18 }])); //-> ["1", 3, {"name":"monica", "age":18}]
```



## *ES6* 常见面试题

***var、let、const* 之间的区别？**

> 参考答案：
>
> - 作用域
> - 重复声明
> - 是否会挂载到 *window*
> - 定义前访问（暂时性死区 *TDZ*）
> - 语义



***ES6* 中的 *class* 和传统的构造函数有什么区别？**

> 参考答案：
>
> - 是否必须使用 *new* 调用
> - 严格模式
> - 原型上的方法是否可被枚举
> - 原型上的方法是否能使用 *new* 调用
> - 语义



**箭头函数和普通的函数表达式有什么区别？**

>参考答案：
>
>- *this* 指向
>- *arguments*
>- 不能使用 *new*
>- 没有原型对象



下面的代码输出什么？

```js
function a() {
    const b = () => {
        console.log(arguments);
    }
    b(1, 2, 3);
}
a(1, 2, 3, 4, 5);
```

> 解析：
>
> 由于箭头函数不存在 *arguments*，所以只能使用外层普通函数的 *arguments*，所以输出 *{ '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }*。



**下面 *Set* 结构，打印出的 *size* 值是多少？**

```js
let s = new Set();
s.add([1]);   
s.add([1]);
console.log(s.size); 
```

>选项：
>
>*A.  1*
>
>*B.  2*

> 参考答案：
>
> 正确答案为 *B*。
>
> 因为添加的是数组，数组的地址是不一样的，所以相当于是不同的数组。



## *Promise* 相关面试题



在做 *Promise* 相关的面试题之前，我们先简单复习一下 *Promise* 的运行流程。



1. *then* 方法必定会返回一个新的 *Promise*

   可理解为“后续处理也是一个任务”

2. 新任务的状态取决于后续处理：

   - 若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据

   - 若有后续处理但还未执行，新任务挂起。
   - 若后续处理执行了，则根据后续处理的情况确定新任务的状态
     - 后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值
     - 后续处理执行有错，新任务的状态为失败，数据为异常对象
     - 后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致



**下面的输出结果是多少？**

```js
const promise = new Promise((resolve, reject) => {
    console.log(1); 
    resolve(); 
    console.log(2);
})

promise.then(() => {
    console.log(3);
})

console.log(4);
```

> 选项：
>
> *A.  1  2  3  4*
>
> *B.  1  3  4*
>
> *C.  1  2  4  3*
>
> *D.  1  4  3*

>参考答案：
>
>正确答案为 *C*。
>
>首先 *new Promise* 构造函数里面的代码是同步代码，先输出 *1*。之后 *resolve* 方法会将 *promise* 的状态修改为完成状态，然后继续执行后面的同步代码输出 *2*。接下来 *promise .then* 里面的函数会被放入到微队列里面，继续执行后面的同步代码输出 *4*。所有的同步代码执行完成后，执行异步代码，异步代码就微队列里面有一个 *promise.then*，所以最后输出 *3*。



**下面代码的运行结果是**

```js
const promise = new Promise((resolve, reject) => {
    resolve('success1')
    reject('error')
    resolve('success2')
})

promise
    .then((res) => {
        console.log('then: ', res)
    })
    .catch((err) => {
        console.log('catch: ', err)
    })
```

>选项：
>
>*A.  then:  success1*
>
>*B.  catch:  error*
>
>*C.  then:  success2*

>参考答案：
>
>正确答案为 *A*。
>
>前面我们讲过，一个 *promise* 的状态一旦被确定后，就无法再改变了，所以该 *promise* 在第一次 *resolve* 时状态就确定了，并且传递的数据为 *success1*。



**下面的代码输出结果是多少**

```js
Promise.resolve(2)
  .then((res) => {
    console.log(res)
    return 2
  })
  .catch((err) => {
    return 3
  })
  .then((res) => {
    console.log(res) 
  })
```

>选项：
>
>*A.  2  3*  
>
>*B.  2  2*
>
>*C.  2  2  3*

> 参考答案：
>
> 正确答案为 *B*。
>
> 首先 *Promise.resolve* 是成功的状态，所以传入的是 *2*，自然 *console.log* 也就打印 *2*。之后由于 *return* 了一个 *2*，这算是一个成功的状态，所以会进入到后面的 *then* 而非 *catch*，所以输出两个 *2*。



**下面的代码输出结果是多少**

```js
Promise.resolve()
    .then(() => {
        return new Error('error!!!')
    })
    .then((res) => {
        console.log('then: ', res)
    })
    .catch((err) => {
        console.log('catch: ', err)
    })
```

>选项：
>
>*A.  then:  Error: error!!!*
>
>*B.  catch:  Error: error!!!*

>参考答案：
>
>正确答案为 *A*。
>
>因为是 *return* 一个错误，相当于正常返回一个数据，所以后续 *promise* 是成功的状态，进入到 *then* 里面。如果修改为 *throw* 则是抛出一个错误，会进入到 *catch* 里面。



**下面的代码输出结果是多少**

```js
Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log)
```

>选项：
>
>*A.  1*
>
>*B.  1  2*
>
>*C.  1  2  3*
>
>*D.  报错*

>参考答案：
>
>正确答案为 *A*。
>
>首先 *then* 方法里面只能接受一个函数，如果不是函数则会自动忽略掉，所以 *then(2)* 以及 *then(Promise.resolve(3))* 可以直接去除掉。最后一个 *console.log* 是一个函数，所以前面 *Promise* 成功后传入的 *1* 会达到此函数，从而输出 *1*。



**下面的代码输出结果是多少**

```js
var a;
var b = new Promise((resolve, reject) => {
    console.log('promise1');
    setTimeout(() => {
        resolve();
    }, 1000);
}).then(() => {
    console.log('promise2');
}).then(() => {
    console.log('promise3');
}).then(() => {
    console.log('promise4');
});

a = new Promise(async (resolve, reject) => {
    console.log(a);
    await b;
    console.log(a);
    console.log('after1');
    await a
    resolve(true);
    console.log('after2');
});

console.log('end');
```

>参考答案：
>
>首先输出 *promise1 undefiend end*，之后等待 *1* 秒钟，随后输出 *promise2 promise3 promise4 Promise { <pending> } after1*

> 解析：
>
> 首先 *new Promise* 里面的代码为同步代码，所以首先会输出 *promise1*，接下来的 *setTimeout* 会被放入到宏队列里面。然后执行 *a* 变量的赋值操作，*a* 变量赋值也是一个 *new* 一个 *promise*，所以会同步执行 *promise* 里面的代码，输出 *a*，当前 *a* 的值为 *undeifned*，之后等待 *b*，这是异步操作，所以会继续执行后面的同步代码，打印输出 *end*。因此控制台一开始就输出  *promise1 undefiend end*。
>
> 同步任务执行完毕后，开始执行异步队列的任务。目前异步队列的任务就只有宏任务队列有一个 *setTimeout*，*1* 秒钟之后，*resolve* 结束第一个 *promise*，之后 *then* 放入到微队列，但是由于没有其他代码，所以直接执行，打印输出 *promise2*，后面相同的道理接着输出 *promise3* 和 *promise4*。最后一个 *then* 返回的 *promise* 才是 *b* 的值，*b* 的 *promise* 状态和第一个 *promise* 状态相同，属于完成状态。
>
> 之后 *await b* 执行结束，打印 *a*，此时的 *a* 则是一个 pending 状态的 promise，所以输出 *Promise { <pending> }*，以及后面的 *after1*。再往后，要等待 *a* 这个 *promise* 的状态结束才执行后面的代码，但是结束 *a* 这个 *promise* 的 *resolve* 却在 *await a* 后面，因此后面的语句永远不会执行。



**下面代码的输出结果**

```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
	console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```

>参考答案：
>
>输出 *script start、async1 start、async2、promise1、script end、async1 end、promise2、setTimeout*

> 解析：
>
> 首先前面定义了两个 *async1* 和 *async2*，但是没有调用，所以先不管它们，继续往后面看。打印输出 *script start*，之后的 *setTimeout* 被放入到宏队列里面，调用 *async1*，输出 *async1 start*，之后调用 *async2*，输出 *async2*，但是调用 *async2* 的地方前面有一个 *await*，会把后面的代码放入到微队列里面，之后 *new Promise*，输出 *promise1*，*then* 方法的内容会被放入到微队列，最后输出 *script end*。
>
> 至此，所有同步代码全部执行完毕，控制台输出 *script start、async1 start、async2、promise1、script end*。
>
> 队列情况：
>
> 宏队列：*setTimeout*
>
> 微队列：*async1 end、promise2*
>
> 之后先清空微队列，然后执行宏队列。



**下面代码的输出结果**

```js
const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log('xixi');
        }, 0);
        setTimeout(() => {
            console.log(5);
            resolve(6);
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg, 'bb'); // 1 bb
    });
    setTimeout(() => {
        console.log('haha');
    }, 0);
}))
first().then((arg) => {
    console.log(arg, 'aa'); // 2 aa
    setTimeout(() => {
        console.log('heihei');
    }, 0);
});
setTimeout(() => {
    console.log('yoyo');
}, 0);
console.log(4);
```

> 参考答案：
>
> 输出 *3、7、4、1 bb、2 aa、xixi、5、haha、yoyo、heihei*

> 解析：
>
> 这道题一定要去分析队列。一开始调用 *first* 函数，该函数返回一个 *promise*，所以我们可以记录：*first_promise: pending*。
>
> 接下来打印输出 *3*，然后又创建了一个 *promise*，我们记录为 *p_promise:pending*，接下来会执行 *p_promise* 里面的代码，打印输出 7，两个 setTimeout 放入到宏队列，之后 *resolve(1)* 改变 *p_promise* 的状态，我们记录为 *p_promise: 成功(1)*，之后代码来到 *resolve(2)*，将 *first_promise* 的状态修改为成功，我们记录为 *first_promise: 成功(2)*，之后 *p.then* 的代码放入微队列，之后的 *setTimeout* 放入宏队列，*first().then* 放入微队列，下面打印 *yoyo* 的 *setTimeout* 放入宏队列，最后输出 *4*。
>
> 至此，控制台一共输出了 *3 7 4*，队列情况如下：
>
> 宏对列 *setTimeout(xixi)、setTimeout(5)、setTimeout(haha)、setTimeout(yoyo)*
>
> 微队列  *p.then、first( ).then*
>
> 两个 *promise* 的状态为：*first_promise: 成功(2)*、*p_promise: 成功(1)*
>
> 接下来就是清空所有微队列，首先是 *p.then*，打印输出 *1 bb*，第二个 *first().then* 的时候会输出 *2 aa*，但是又会往宏队列里面放一个任务，宏队列变为：
>
> *setTimeout(xixi)、setTimeout(5)、setTimeout(haha)、setTimeout(yoyo)、setTimeout(heihei)*
>
> 最后挨着挨着执行宏任务队列的任务即可，注意 *resolve(6)* 是一个干扰点，是一行没用的代码。

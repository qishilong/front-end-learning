# *ES6* 技术提升第一天



内容大纲：

- *ES6+* 新增 *API*
  - *ES2016*
  - *ES2017*
  - *ES2018*
  - *ES2019*
  - *ES2020*
  - *ES2021*
- 课后练习



## *ES6+* 新增 *API*



回顾一下 *ECMAScript* 的发展历程：

- *1997* 年 *6* 月，*ES1* 发布
- *1998* 年 *6* 月，*ES2* 发布
- *1999* 年 *12* 月，*ES3* 发布
- 然后，*ES4* 因为步子迈得太大，内部产生的争议，胎死腹中。
- 与此同时 *TC39* 下属的一个小组提出了 *ES3.1* 过渡版本。
- *ES3.1* 最终成为 *ES5*，于 *2009* 年 *12* 月发布，该版本力求澄清第 *3* 版中的歧义。
- *2015* 年 6 月，*ES6*（*ES2015*）发布。第 *6* 版标志着 *ECMAScript* 成为了一门真正的通用编程语言。
- *ES2016*
- *ES2017*
- *ES2018*
- *ES2019*
- *ES2020*
- *ES2021*

从 *ES6* 开始，官方决定使用年号来命名其版本。例如 *ES6* 的官方命名就为 *ECMAScript 2015*，之后每一年更新的 *ECMAScript* 版本都是在后面添加上当年的年号。



### *ES2016*

***Array.prototype.includes( )***

*includes* 用于判断某个元素是否存在于数组中（包括 *NaN*）。

```js
const arr = [1, 2, 3, NaN];

arr.includes(3); // true
arr.includes(NaN); // true

arr.indexOf(NaN); // -1
```

> 注意：*indexOf( )* 查找 *NaN* 时始终返回 *-1*，*includes( )* 则不同。如果基于 *NaN === NaN* 为 *false*，*indexOf( )* 的结果似乎更合理。但是 *includes( )* 没有遵循这个逻辑。



**乘方中缀操作符**

*ES* 中已经有 ++、-- 操作符，*ES2016* 引入了 ** 操作符进行乘方操作，作为 *Math.pow* 的一种替代。

```js
Math.pow(7, 2); // 49

7 ** 2 // 49
```



### *ES2017*

***Object.values( )***

*Object.keys( )* 返回一个对象的 *key* 数组，*Object.values( )* 则返回值的数组。

```js
const cars = { BENZ: 3, Tesla:2, Honda: 1 };

// ES2015
const carVals = Object.keys(cars).map(key => cars[key]);
// [3, 2, 1]

// ES2017
const vals = Object.values(cars);
```



***Object.entries( )***

以二维数组的形式返回对象的键值对。

```js
const cars = { BENZ: 3, Tesla:2, Honda: 1 };

// ES5.1
Object.keys(cars).forEach(key => {
  console.log(`key: ${key} value: ${cars[key]}`);
});

// ES2017
for (let [key, value] of Object.entries(cars)) {
  console.log(`key: ${key} value: ${value}`);
}

// ES2015
const map1 = new Map();
Object.keys(cars).forEach(key => {
  map1.set(key, cars[key]);
});

// ES2017
const map = new Map(Object.entries(cars));
```



***String Padding* 字符串填充**

*String.prototype.padStart* 和 *String.prototype.padEnd*。

前置/后置填充，第一个参数为字符串的**目标长度**，第二个参数为填充的字符，默认为空格。如果目标长度小于字符串的长度，则不做处理，直接返回原始字符串。

```js
'5'.padStart(10) // '          5'
'5'.padStart(10, '=*') //'=*=*=*=*=5'
'5'.padEnd(10) // '5         '
'5'.padEnd(10, '=*') //'5=*=*=*=*='
```

字符串填充一般用于界面中对齐文字，美化展示效果。

示例 1:

```js
//ES2017
//如果你有一个不同长度的项目列表，并希望格式化它们的显示目的，你可以使用padStart
const formatted = [0, 1, 12, 123, 1234, 12345].map(num => 
    num.toString().padStart(10, '0') // 添加 0 直到长度为 10
);
console.log(formatted);
// 打印
// [
//     '0000000000',
//     '0000000001',
//     '0000000012',
//     '0000000123',
//     '0000001234',
//     '0000012345',
// ]
```

示例 2:

```js
const cars = {
  '?BMW': '10',
  '?Tesla': '5',
  '?Lamborghini': '0'
}
Object.entries(cars).map(([name, count]) => {
  //padEnd appends ' -' until the name becomes 20 characters
  //padStart prepends '0' until the count becomes 3 characters.
  console.log(`${name.padEnd(20, ' -')} Count: ${count.padStart(3, '0')}`)
});
//打印结果..
// ?BMW - - - - - - -  Count: 010
// ?Tesla - - - - - -  Count: 005
// ?Lamborghini - - -  Count: 000
```



***Object.getOwnPropertyDescriptors(obj)***

此方法返回给定对象的所有属性信息，包括有关 *getter* 和 *setter* 的信息。

```js
const xiejie = {
    name: "谢杰",
    get age() {
        return 18
    }
};

console.log(Object.getOwnPropertyDescriptors(xiejie));

// {
//     name: { value: '谢杰', writable: true, enumerable: true, configurable: true },
//     age: {
//       get: [Function: get age],
//       set: undefined,
//       enumerable: true,
//       configurable: true
//     }
// }
```

*Object.assign( )* 方法只能拷贝源对象的可枚举的自身属性，同时拷贝时无法拷贝属性的特性们，而且访问器属性会被转换成数据属性。

```js
const xiejie = {
    name: "谢杰",
    get age() {
        return 18
    }
};

const xiejieClone = Object.assign({}, xiejie)

console.log(Object.getOwnPropertyDescriptors(xiejieClone));

// {
//     name: { value: '谢杰', writable: true, enumerable: true, configurable: true },
//     age: { value: 18, writable: true, enumerable: true, configurable: true }
// }
```

有了 *Object.getOwnPropertyDescriptors(obj)* 后配合 *Object.create( )* 方法可以解决上述的问题。

```js
const xiejie = {
    name: "谢杰",
    get age() {
        return 18
    }
};

const xiejieClone = Object.create({}, Object.getOwnPropertyDescriptors(xiejie));

console.log(Object.getOwnPropertyDescriptors(xiejieClone));

// {
//     name: { value: '谢杰', writable: true, enumerable: true, configurable: true },
//     age: {
//       get: [Function: get age],
//       set: undefined,
//       enumerable: true,
//       configurable: true
//     }
// }
```



**尾随逗号**

函数参数尾部逗号主要是解决 *git blame* 等工具使用问题。

```js
// ES2017 支持参数尾部逗号
function Person(
  name,
  age, // 不会报错
) {
  // ...
}
```

例如：

```js
function Person(
    name,
    age,
) {
    this.name = name;
    this.age = age;
}
const p = new Person("xiejie", 18,);
console.log(p.name);
console.log(p.age);
```

函数调用时添加尾部逗号也是允许的。

```js
Math.max(10, 20,);
```



***Async/Await***

这应该是最重要、最有用的功能了。先是 *callback* 噩梦，然后有了 *Promise* 链式写法，一路跌跌撞撞，总算有了更清晰明了的 ***Async/Await***。



### *ES2018*

***Promise.finally( )***

一个 *Promise* 调用链要么成功到达最后一个 *.then( )*，要么失败触发 *.catch( )*。在某些情况下，你想要在无论 *Promise* 运行成功还是失败，运行相同的代码，例如清除，删除对话，关闭数据库连接等。

*.finally( )* 允许你指定最终的逻辑：

```js
function doSomething() {
  doSomething1()
  .then(doSomething2)
  .then(doSomething3)
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    // finish here!
  });
}
```

示例如下：

```js
new Promise((resolve, reject) => {
    let num = Math.random().toFixed(2);
    num > 0.5 ? resolve(num) : reject(num);
}).then(result => {
    console.log("成功>>>", result);
}).catch(reason => {
    console.log("失败>>>", reason);
}).finally(() => {
    console.log("finally code");
})
```



***Rest/Spread* 属性**

*ES2015* 引入了 *Rest* 参数和扩展运算符。当时三个点 ... 仅用于数组。

*Rest* 参数语法允许我们将一个剩余参数表示为一个数组。

```js
function foo(a, b, ...rest) {
    console.log(a); // 1
    console.log(b); // 2
    console.log(rest); // [3, 4, 5]
}

foo(1, 2, 3, 4, 5);
```

展开操作符则是将数组转换成可传递给函数的单独参数。

```js
const nums = [1, 2, 3, 4, 5];
console.log(Math.max(...nums));  // 5
```

并且现在对象也可以使用它们了。

示例 1:

```js
function foo({ a, b, ...rest }) {
    console.log(a); // 1
    console.log(b); // 2
    console.log(rest); // { c: 3, d: 4, e: 5 }
}

foo({
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5
}); 
```

示例 2:

```js
const object = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5
};

const { a, b, ...rest } = object;
// a = 1
// b = 2
// rest = { c: 3, d: 4, e: 5 }
```



**正则表达式的增强**

- 正则表达式命名捕获组（*Regular Expression Named Capture Groups*）
- 正则表达式反向断言（*lookbehind*）
- 正则表达式 *dotAll* 模式
- 正则表达式 *Unicode* 转义

> 注：关于正则表达式的增强这里不再做过多的介绍，有兴趣的同学可以参阅：*https://www.sitepoint.com/es2018-whats-new/*



### *ES2019*

***Array.prototype.flat***   

该函数可以将某个数组拍扁

```js
const arr = [1, [2, 3, [4, 5, [6, 7]]]];
const arr1 = arr.flat(); // [1, 2, 3, [4, 5, [6, 7]]]
const arr2 = arr.flat(2); // [1, 2, 3, 4, 5, [6, 7]]
const arr3 = arr.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7]
```

真实项目需求举例：

```js
// 员工账号登录上去，可以看到该员工开发的客户
// 员工名：张三
// 开发的客户 ["老谢", "老袁", "老沈"]
// 员工名：李四
// 开发的客户 ["牛牛", "潘潘"]

// 组长账号登录上去，可以看到组长自己开发的客户，以及手下员工开发的客户
// 组长所开发的客户 ["老金", "老肖", "成哥"]
// ["老金", "老肖", "成哥", ["老谢", "老袁", "老沈"], ["牛牛", "潘潘"]]

// 总监账号登录上去，可以看到总监自己开发的客户，以及手下组长，组长下面组员开发的客户
// 总监所开发的客户 ["James", "Lucy", "Bill"]
// ["James", "Lucy", "Bill", ["老金", "老肖", "成哥", ["老谢", "老袁", "老沈"], ["牛牛", "潘潘"]],["老金2", "老肖2", "成哥2", ["老谢2", "老袁2", "老沈2"], ["牛牛2", "潘潘2"]]]

const arr =  ["James", "Lucy", "Bill", ["老金", "老肖", "成哥", ["老谢", "老袁", "老沈"], ["牛牛", "潘潘"]],["老金2", "老肖2", "成哥2", ["老谢2", "老袁2", "老沈2"], ["牛牛2", "潘潘2"]]];
console.log(arr.flat(Infinity)); // 注意是返回新的数组
```



***Array.prototype.flatMap***

```js
const arr = ...;
arr.flatMap(fn); 
//等效于
arr.map(fn).flat()
```

示例 1：利用 *flatMap* 在 *map* 期间去掉一些数据

```js
const arr = [1, 2, 3, 4, 5];

/*
    [
        {number:1, doubleNumber: 2},
        {number:3, doubleNumber: 6},
        {number:5, doubleNumber: 10},
    ]
*/
```

参考答案：

```js
const arr = [1, 2, 3, 4, 5];

/*
    [
        {number:1, doubleNumber: 2},
        {number:3, doubleNumber: 6},
        {number:5, doubleNumber: 10},
    ]
*/

const result = arr.flatMap(it =>
    it % 2 !== 0 ? { number: it, doublieNumber: it * 2 } : []
)
console.log(result);
```



示例 2：利用 *flatMap* 分割一个单词数组

```js
const arr = [
    "Yestoday is a History",
    "Tomorrow is a Mystery",
    "Today is a Gift",
    "That's why we call it the Present"
];

/*
    ["Yestoday", "is", "a", "History", "Tomorrow", ...]
*/
```

参考答案：

```js
const arr = [
    "Yestoday is a History",
    "Tomorrow is a Mystery",
    "Today is a Gift",
    "That's why we call it the Present"
];

/*
    ["Yestoday", "is", "a", "History", "Tomorrow", ...]
*/

const result = arr.flatMap(it => it.split(" "));
console.log(result);
```



***Object.fromEntries(iterable)***

它接收一个可迭代对象，该对象每次迭代必须返回一个包含两项数据的数组（参考 *map*），该函数会将第一项作为对象的属性名，第二项作为对象的属性值。

```js
const arr = [["a", 1], ["b", 2]]
Object.fromEntries(arr); // {a:1, b:2}
```

示例：

```js
function localMoneyFomat(obj){
    //略
}

var obj = {
    name:"xxx",
    balance: 199.8, //余额
    taken: 3000 //消费
}
localMoneyFomat(obj); // {name:"xxx", balance:"￥199.8", taken: "￥3000"}
```

参考答案：

```js
function localMoneyFomat(obj) {
    const result = Object.entries(obj).map(([key, value]) => [
        key,
        typeof value === 'number' ? `¥${value}` : value
    ])
    return Object.fromEntries(result);
}

var obj = {
    name: "xxx",
    balance: 199.8, //余额
    taken: 3000 //消费
}
console.log(localMoneyFomat(obj)); // {name:"xxx", balance:"￥199.8", taken: "￥3000"}
```

注意只要是可迭代对象，并且对象每次迭代返回一个包含两项数据的数组就可以使用 *fromEntries* 方法。

```js
const arr = [["a", 1], ["b", 2]]
const s = new Set(arr);
const m = new Map(arr);
console.log(s); // Set(2) { [ 'a', 1 ], [ 'b', 2 ] }
console.log(m); // Map(2) { 'a' => 1, 'b' => 2 }
console.log(Object.fromEntries(arr)); // {a:1, b:2}
console.log(Object.fromEntries(s)); // {a:1, b:2}
console.log(Object.fromEntries(m)); // {a:1, b:2}
```



***String.prototype.trimStart、String.prototype.trimEnd***

*trimStart* 同 *trimLeft*，去掉字符串左边的空格，*trimEnd* 同 *trimRight*，去掉字符串右边的空格。



### *ES2020*

**可选链操作符（*Optional Chaining*）**

```js
person?.addr?.province
```

早期的时候如果对象有多层，我们要访问对象下面的对象的某一个属性，代码如下：

```js
const adventurer = {
    name: 'Alice',
    cat: {
        name: 'Dinah'
    }
};
console.log(adventurer.cat.name);
```

但是这样的代码可能会存在隐患：

```js
const adventurer = {
    name: 'Alice',
    cat: null
};
console.log(adventurer.cat.name);
// TypeError: Cannot read property 'name' of null
```

因此早期为了避免这种错误，只能采用如下的写法：

```js
const adventurer = {
    name: 'Alice',
    cat: null
};
if(adventurer.cat){
    console.log(adventurer.cat.name);
}
```

如果对象的层数嵌套比较多的话，随之而来的判断也就增多了。

而可选链操作符就很优雅的解决了这个问题。

```js
const adventurer = {
    name: 'Alice',
    cat: null
};
console.log(adventurer.cat?.name);
```

可选链仅能用来获取数据，不能用于赋值

```js
const obj = {
    propName: 'name'
};
obj?.['propName'] = 'new name'; // Syntax Error
```



**空值合并操作符（*Nullish coalescing Operator*）**

```js
a ?? b
```

这是一个在其他语言中（ 如 *C#* 和 *PHP*）早已可用的功能。空值合并运算符将会遍历列表，并返回第一个不是 *null* 或 *undefined* 的值。

```js
console.log(undefined ?? 'hey'); // hey
console.log(false ?? 'hola'); // false
console.log(0 ?? 'bonjour'); // 0
console.log('first' ?? 'second'); // first
console.log(null ?? 'yo'); // yo
```

*JavaScript* 的空值合并运算符的妙处在于，我们可以根据需要将其进行多次链接。

```js
console.log(null ?? undefined ?? false ?? 'hello'); // false
console.log(null ?? '' ?? 'hello'); // ''
```

这在从外部来源获取数据，但是不知道能不能获取成功时，显得额外的有用。

比如我们想从多个地方抓取博客的文章。然后可以确定哪个文章将会成为我们的精选帖子：

```js
const firstBlogPost = await fetch('...')
const secondBlogPost = await fetch('...')
const defaultBlogPost = { title: 'Default Featured Post' }
const featuredBlogPost = firstBlogPost ?? secondBlogPost ?? defaultBlogPost
// 如果不确定某些值是否存在，上面是设置默认值的好方法。
```

如果要消除虚值，可以用逻辑或运算符 ||

本质上，它与空合并运算符的作用相同，只是它消除了虚值。

- 空值合并运算符将跳过 *null、undefined*
- 逻辑或运算符会跳过 *null、undefined* 以及空字符串

```js
// 使用逻辑或运算符
console.log(null || 'hello'); // hello
console.log(undefined || 'hello'); // hello
console.log(false || 'hello'); // hello
console.log("" || 'hello'); // hello
console.log([] || 'hello'); // []
console.log({} || 'hello'); // {}
// 使用空值合并运算符
console.log(null ?? 'hello'); // hello
console.log(undefined ?? 'hello'); // hello
console.log(false ?? 'hello'); // false
console.log("" ?? 'hello'); // ""
console.log([] ?? 'hello'); // []
console.log({} ?? 'hello'); // {}
```



***Promise.allSettled***

给定一个返回 *Promise* 的异步操作，以下这些是 *Promise* 的可能状态：

- *pending*: 初始状态，既不是成功，也不是失败状态。
- *fulfilled*: 意味着操作成功完成。
- *rejected*: 意味着操作失败。
- *Settled*： *Promise* 要么被完成，要么被拒绝。*Promise* 一旦达成，它的状态就不再改变。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-01-10-094026.png" alt="image-20220110174026543" style="zoom:50%;" />

*Promise.allSettled( )* 方法返回一个 *promise*，该 *promise* 在所有给定的 *promise* 已被解析或被拒绝后解析，并且每个对象都描述每个 *promise* 的结果。

```js
Promise.allSettled([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.reject('error')
]).then(result => {
    console.log(result);
});

// [
//     { status: 'fulfilled', value: 1 },
//     { status: 'fulfilled', value: 2 },
//     { status: 'rejected', reason: 'error' }
// ]
```

因此 *Promise.allSettled* 不需要书写 *catch*，因为无论是成功还是失败，都算是一种状态的改变，会被记录到数组当中。



***BigInt***

最初 *JavaScript* 中表是数字就只有 *number* 类型，这是一种浮点类型。

```js
console.log(1.0 === 1); // true
```

浮点数因为一些自身的原因，是无法表示很大的数的。一旦数字的精度要求过高，这些精度就会被舍弃掉。

```js
const a = Number.MAX_SAFE_INTEGER * Number.MAX_SAFE_INTEGER; 
console.log(a);
// => 8.112963841460666e+31
```

*Bigint* 类型的出现，标志着 *JavaScript* 可以表示真正意义上的整数了。

```js
const b = BigInt(Number.MAX_SAFE_INTEGER) * BigInt(Number.MAX_SAFE_INTEGER);
// => 81129638414606663681390495662081n
```

另外，由于 *Bigint* 是一种新的数据类型，所以不能和 *number* 类型做计算

```js
const a = Number.MAX_SAFE_INTEGER * Number.MAX_SAFE_INTEGER; 
const b = BigInt(Number.MAX_SAFE_INTEGER) * BigInt(Number.MAX_SAFE_INTEGER);
typeof b // => bigint
a + b // error: Cannot mix BigInt and other types
```



***globalThis***

永远指向全局对象。

*globalThis* 的出现意味着无论是浏览器端还是 *Node.js* 端，访问全局对象都可以使用统一的名称了。



### *ES2021*

***String.prototype.replaceAll***

替换字符串中所有的匹配字符。

例如：

```js
var str="Visit Microsoft! Visit Microsoft!";
var n=str.replaceAll("Microsoft","Runoob");
```

```js
Visit Runoob!Visit Runoob!
```

第一个参数既可以是一个子串，也可以是一个正则表达式。例如：

```js
var str="Mr Blue has a blue house and a blue car";
var n=str.replaceAll(/blue/ig,"red");
```

```js
Mr red has a red house and a red car.
```



***Promise.any***

*Promise.any( )* 是 *ES2021* 新增的特性，它接收一个 *Promise* 可迭代对象（例如数组），

只要其中的一个 *promise* 成功，就返回那个已经成功的 *promise*
 如果可迭代对象中没有一个 *promise* 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 *promise* 和 *AggregateError* 类型的实例，它是 *Error* 的一个子类，用于把单一的错误集合在一起。

```js
const promises = [
    Promise.reject('ERROR A'),
    Promise.reject('ERROR B'),
    Promise.resolve('result'),
]

Promise.any(promises).then((value) => {
    console.log('value: ', value);
}).catch((err) => {
    console.log('err: ', err)
})

// value:  result
```

如果所有传入的 *promises* 都失败：

```js
const promises = [
    Promise.reject('ERROR A'),
    Promise.reject('ERROR B'),
    Promise.reject('ERROR C'),
]

Promise.any(promises).then((value) => {
    console.log('value：', value)
}).catch((err) => {
    console.log('err：', err)
    console.log(err.message)
    console.log(err.name)
    console.log(err.errors)
})

// err：AggregateError: All promises were rejected
// All promises were rejected
// AggregateError
// ["ERROR A", "ERROR B", "ERROR C"]
```

*Promise.any* 应用场景：从最快的服务器检索资源

来自世界各地的用户访问网站，如果你有多台服务器，则尽量使用响应速度最快的服务器，在这种情况下，可以使用 *Promise.any( )* 方法从最快的服务器接收响应。

```js
function getUser(endpoint) {
    return fetch(`https://superfire.${endpoint}.com/users`)
        .then(response => response.json());
}

const promises = [getUser("jp"), getUser("uk"), getUser("us"), getUser("au"), getUser("in")]

Promise.any(promises).then(value => {
    console.log(value)
}).catch(err => {
    console.log(err);
})
```

*Promise* 中的 *all、race、any* 方法对比：

*all* 方法：

```js
// all 如果所有的 promise 都是成功，返回成功状态的数组
Promise.all([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
]).then(result => {
    console.log("result>>>", result); // result>>> [ 1, 2, 3 ]
}).catch(reason => {
    console.log("reason>>>", reason);
})

// all 如果有一个失败，则返回失败的状态
Promise.all([
    Promise.resolve(1),
    Promise.reject(2),
    Promise.resolve(3)
]).then(result => {
    console.log("result>>>", result);
}).catch(reason => {
    console.log("reason>>>", reason); // reason>>> 2
})
```



*race* 方法：

```js
// race 方法返回最先状态改变的 promise 结果，无论是成功还是失败
Promise.race([
    Promise.resolve(1),
    Promise.reject(2),
    Promise.resolve(3)
]).then(result => {
    console.log("result>>>", result); // result>>> 1
}).catch(reason => {
    console.log("reason>>>", reason);
})

Promise.race([
    Promise.reject(1),
    Promise.reject(2),
    Promise.resolve(3)
]).then(result => {
    console.log("result>>>", result);
}).catch(reason => {
    console.log("reason>>>", reason); // reason>>> 1
})
```



*any* 方法：

```js
// any 返回第一个成功的 promise 结果
Promise.any([
    Promise.reject(1),
    Promise.reject(2),
    Promise.resolve(3)
]).then(result => {
    console.log("result>>>", result); // result>>> 3
}).catch(reason => {
    console.log("reason>>>", reason);
})
// 如果全部都是失败状态，则抛出错误
```



## 课后练习

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


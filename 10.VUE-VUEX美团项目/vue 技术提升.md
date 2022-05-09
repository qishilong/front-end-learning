# *vue* 技术提升

比较有名的小程序框架：mpvue、uni-app、taro

可以使用 vue 语法来进行开发。



设计一个框架的时候，需要考虑哪些问题。类比到 vue 上面。



## 权衡的艺术



框架里面会有各个模块，模块与模块之间不是相互独立，而是有关联。

框架应该设计成命令式还是声明式？纯运行时还是编译时还是运行+编译时？这些东西都需要框架设计者进行一个权衡。



### 命令式和声明式

这两个东西是编程范式，简单来讲就是写代码的风格。

- 命令式编程：命令“机器”如何去做一件事情，侧重点在于（How），我们会将每一步想好，机器只需要按照我们给定的步骤执行代码即可。

```js
// 将数组的所有元素进行翻倍
var numbers = [1,2,3,4,5];
var doubled = []; // 存放翻倍的元素
for(var i=0;i<numbers.length;i++){
  var newNumber = numbers[i] * 2;
  doubled.push(newNumber);
}
console.log(doubled);
```

命令式编程风格非常好理解，但是有一个缺点，事事都要亲力亲为，就会显得非常繁琐。

特别是随着程序规模变大，命令式编程渐渐就显得有点力不从心。



- 声明式编程：声明式编程强调的是（what），也就是告诉机器我要什么，不需要帮助它思考每一步怎么做

比如之前的 CSS、SQL

```js
// 将数组的所有元素进行翻倍
var numbers = [1,2,3,4,5];
var doubled = numbers.map(function(item){
  return item * 2;
})
console.log(doubled);
```

声明式编程的有点在于语法更加简洁，但是也有缺点：学习门槛高

**声明式的背后，实际上也是使用命令式来实现。**



所以，我们在设计框架的时候，首先要做的第一个权衡就是选择命令式还是声明式。



## 性能与可维护性的权衡

**声明式代码的性能要弱于命令式。**

DOM节点的文本内容修改为 “Hello vue”，如果采用命令式的方式：

```js
div.textContent = "Hello vue";
```

不会有比上面这行代码性能还高的。

如果采用声明式的写法，那就是：

```vue
<!--修改前-->
<div>Hello</div>
<!--修改后-->
<div>Hello vue</div>
```

该声明式写法的背后，也绕不开 *div.textContent = "Hello vue";*

如果完全采用命令式的方式，那么用户就需要维护实现整个目标的过程，包括手动获取DOM节点，DOM元素的创建、DOM元素的更新，这些问题都需要用户来亲力亲为。jQuery 就是一个典型的命令式框架。

但是如果是声明式的，看上去就非常的直观，至于做事情的过程（创建 DOM 节点、更新DOM节点、更新DOM节点的内容）我们就不需要关心，vue 已经帮我们做了。

命令式和声明式各有优缺点，命令式性能更高，声明式可维护性更好。

所以在设计框架的时候，需要对这两者进行一个权衡。



## 虚拟 DOM

无论在react还是vue中都有，虚拟DOM实际上也是一种权衡的表现。

前面所说，命令式编程的性能是最高。

虚拟DOM的性能不会比我们直接获取到DOM元素，然后直接操作此DOM元素性能更高。

我们要向body上面添加一个 p 元素，p 元素的内容为“this is a test”:

```js
const newP = document.createElement("p");
const newContent = document.createTextNode("this is a test");
newP.appendChild(newContent);
document.appendChild(newP);
```

如果每次都是精准的找到 DOM 元素，然后直接进行操作，开发者的开发体验是很糟糕的。

如果使用 innerHTML，代码就变简单：

```js
document.body.innerHTML += `<p>this is a test</p>`;
```

使用 innerHTML，开发者的开发体验没有那么糟糕了，但是 innerHTML 的性能一定是弱于上面的代码的。

使用 innerHTML 首先需要对字符串进行一个分析（解析），然后生成 DOM 节点。

这两个计算，一个是 JavaScript 层面的计算，一个是 DOM 层面的计算。

```js
const app = [];
for(var i=0;i<10000;i++){
  var div = {
    tag : 'div'
  }
  app.push(div)
}
```

```js
const app = [];
for(var i=0;i<10000;i++){
  var div = document.createElement('div');
  app.push(div)
}
```



接下来，我们说回虚拟DOM，虚拟DOM的本质就是一些JS对象，使用JS对象来描述真实DOM对象的层次结构。

使用虚拟DOM对象也会涉及到从 JS 对象 -> 真实的DOM对象

接下来我们来做一个对比：（创建时）

|                      | 虚拟DOM               | innerHTML       |
| -------------------- | --------------------- | --------------- |
| JavaScript层面的计算 | 创建JS对象（虚拟DOM） | 解析字符串      |
| DOM层面的计算        | 新建所有的DOM节点     | 新建所有DOM节点 |

虚拟DOM真正发挥作用，是在更新页面的时候。

如果是使用 innerHTML，哪怕只是修改了一个小点：

```js
document.body.innerHTML += `
	<div>
		<ul>
			<li>1</li>
			<li>2</li>
			<li>3</li>
		</ul>
		<p>this is a test</p>
	</div>
`;

// 进行一个修改
document.body.innerHTML += `
	<div>
		<ul>
			<li>1</li>
			<li>2</li>
			<li>3</li>
		</ul>
		<p>this is a test！</p>
	</div>
`;
```

对于 innerHTML来讲，要重新分析整个字符串，销毁之前的所有 DOM 元素，重新创建所有新的 DOM 节点。

但是对于虚拟DOM方案来讲，就不一样，首先还是会生成虚拟DOM对象，进行一个 Diff 算法，比较两颗虚拟 DOM 树

找出不一样的地方，只需要有变化的点。

接下来我们来做一个对比：（更新时）

|                      | 虚拟DOM                     | innerHTML                           |
| -------------------- | --------------------------- | ----------------------------------- |
| JavaScript层面的计算 | 创建JS对象（虚拟DOM）+ diff | 解析字符串                          |
| DOM层面的计算        | 只更新有变化的DOM节点       | 销毁所有的DOM节点 + 新建所有DOM节点 |

如果使用原生DOM方式，性能一定是最高的，但是对于用户来讲，很痛苦。

虚拟DOM和 innerHTML 对于用户来讲，没有那么痛苦，可维护性更高。

接下来这两者之间对比，发现虚拟DOM的性能要优于innnerHTML。



## 运行时和编译时

最后就是关于运行时和编译时之间的权衡。

总体可以分为3种：

- 纯运行时
- 运行时 + 编译时
- 纯编译时



### 纯运行时

假设我们需要让用户来创建一个虚拟DOM结构：

```js
const obj = {
  tag : "div",
  children : [
    {
      tag : "span", children : "Hello World"
    }
  ]
}
```

我们的框架提供一个名为 render 的函数，可以将上面用户传入的对象生成真实的DOM结构：

```js
function render(obj, root){
  const el = document.createElement(obj.tag);
  if(typeof obj.children === "string"){
    const text = document.createTextNode(obj.children);
  } else if(obj.children){
    obj.children.forEach(child=>render(child, el));
  }
  root.appendChild(el);
}
```

这就是一个典型的运行时框架。

也就是说，上面的代码JS引擎都看得懂，这种类型的（运行时）框架 jQuery

jQuery 里面$.ajax，我们在使用的时候直接传入配置对象即可。



### 运行时+编译时

纯运行时框架虽然比较好理解，不需要学习额外的知识，但是如果要求用户模拟 DOM 树结构来书写 JS 对象从而描述我们的

页面，用户分分钟劝退。

```js
const obj = {
  tag : "div",
  children : [
    {
      tag : "span", children : "Hello World"
    }
  ]
}
// HTML
<div><span>Hello World</span></div>
```

用户更期望使用下面的方式来描述页面。

但是对于我们来讲，我们的工作量就增加了。所以我们需要一个 Compiler 编译器，将用户书写的模板编译成虚拟DOM对象。

这里其实也是一个取舍。

这个时候，我们的框架就变成了一个运行时+编译时的框架。

因为我们现在的框架设计，即支持运行时，可以直接传入虚拟DOM对象无需编译，也可以书写模板，编译为虚拟DOM对象。

vue 就是选择的运行时+编译时。



### 纯编译时

上面运行时+编译时，模板-->虚拟DOM-->生成真实DOM

```js
// 用户书写如下的代码
<div><span>Hello World</span></div>
// 编译器进行编译
const obj = {
  tag : "div",
  children : [
    {
      tag : "span", children : "Hello World"
    }
  ]
}
// 通过render生成真实DOM
const div = document.createElement("div");
const span = document.createElement("span");
span.innerText = "Hello World";
div.appendChild(span);
document.body.appendChild(div);
```

那么如果是纯编译时，就是跳过了中间的步骤：模板-->生成真实DOM

```js
// 用户书写如下的代码
<div><span>Hello World</span></div>
// 编译
const div = document.createElement("div");
const span = document.createElement("span");
span.innerText = "Hello World";
div.appendChild(span);
document.body.appendChild(div);
```

现在就变成了一个纯编译时的框架，用户的代码必须编译后才能执行。

但是最新的 vue3.0 仍然是采用的运行时+编译时。



## vue.js 的设计思路



- 声明式来描述UI（模板）
- 需要一个编译器，将模板编译为渲染函数，渲染函数用于生成虚拟DOM
- 根据虚拟DOM生成真实的DOM（渲染器）
- vue中有各种各样的组件--->虚拟DOM 的封装
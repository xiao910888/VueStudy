# 邂逅Vuejs

## 认识Vuejs

### 为什么学习Vuejs

### 简单认识一下Vuejs

<font color=#909534 size=2>  了解</font> ==渐进式框架==<font color=#909534 size=2>可以将Vue作为应用的一个部分嵌入其中</font>

​	可以用Vue对项目进行重构

Vue的核心库：core+Vue-router+Vuex

Vue有很多特点。<font size=2> web开发中的高级功能</font>

1. 解耦视图和数据
2. 可复用的组件
3. 前端路由技术
4. 状态管理
5. 虚拟DOM

学习前提

√ HTML、CSS、JavaScript <font color=#909534 >熟练掌握</font>

×<u>Angular</u><font color=#909534 size=2>是Angularjs新的版本</font>、React、JQuery

## Vue.js安装

方式一：直接CDN引入

```javascript
<!-- 开发环境版本，包含了有帮助的命令行警告 --> 
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>

```

方式二：下载和引入

开发环境 https://vuejs.org/js/vue.js 

生产环境 https://vuejs.org/js/vue.min.js

方式三：[NPM安装](#webpack中配置Vue)

​	vscode-> 插件

## Vue初体验

### Hello Vuejs

<font color=#909534 >let 变量	const <u>常量</u></font><font color=#909534 size=2>[不可修改]</font>

（编程范式：==声明式编程==）

```javascript
let name = 'why'
name = 'kobe'
```

![image-20210707193911808](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210707193911808.png)

<font color=#d5a347 >^传统^</font>元素js的做法（编程范式：==命令式编程==）

1.创建div元素.设置id属性

2.定义一个变量叫message

3.将message变量放在前面div元素中显示

4.修改message的数据：xxxx

5.将修改后的数据再次替换到div元素

### Vue列表展示

`v-for`

```javascript
<div id="app">
    <ul>
        <li v-for="item in movies">{{item}}</li>
    </ul>
</div>

<script src="../js/vue.js"></script>
<script>
    const app=new Vue({
        el:"#app",
        data:{
            message:'你好啊',
            movies:['星际穿越','大话西游','少年派','盗梦空间']
        }
    })
</script>
```

### 计数器

<font color=#909534 >传统 命令式</font>

1.拿button元素

2.添加监听事件

<font color=#909534 >声明式</font>

新的属性： methods. 用于在Vue对象中定义方法

新的指令：`@click` = `v-on:click`

<font color=#909534 >语法糖：简写</font>

![image-20210707195219667](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210707195219667.png)

## vue中的MVVM

Model View		ViewModel

![image-20210707195342841](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210707195342841.png)

- View层：
  视图层
  在我们前端开发中，通常就是DOM层。
  主要的作用是给用户展示各种信息。
- Model层：
  数据层
  数据可能是我们固定的死数据，更多的是来自我们服务器，从网络上请求下来的数据。
  在我们计数器的案例中，就是后面抽取出来的obj，当然，里面的数据可能没有这么简单。
- VueModel层：
  视图模型层
  视图模型层是View和Model沟通的桥梁。
  一方面它实现了Data Binding，也就是数据绑定，将Model的改变实时的反应到View中
  另一方面它实现了DOM Listener，也就是DOM监听，当DOM发生一些事件(点击、滚动、touch等)时，可以监听到，并在需要的情况下改变对应的Data。

## Vue的options选项

options可以包含哪些选项：[官网](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E6%95%B0%E6%8D%AE)

- el: 
  类型：string | HTMLElement
  作用：决定之后Vue实例会管理哪一个DOM。
- data: 
  类型：Object | Function （组件当中data必须是一个函数）
  作用：Vue实例对应的数据对象。
- methods: 
  类型：{ [key: string]: Function }
  作用：定义属于Vue的一些方法，可以在其他地方调用，也可以在指令中使用。

# Vue基础语法

## 插值操作

### Mustache

<font color=#909534 size=2>[胡须]</font><font color=#909534 >双大括号</font>

```javascript
{{firstName + ' ' + lastName}}
```

<font color=#909534 >mustache语法中，不仅可以直接写变量，也可以写简单的表达式</font>

```javascript
{{counter * 2}}
```

### v-once

只用一次，后台数据变了，{{}}里的不变

### v-html



## 绑定属性

## 计算属性

## 事件监听

## 条件判断

## 循环遍历

## 阶段案例

## v-model

# 组件化开发  

## 父子组件的访问

- children/refs

- parent/root

## slot的使用

* 基本使用
* 具名插槽
* 编译的作用域
* 作用域插槽

## 模块化开发

### 为什么需要模块化

#### JavaScript原始功能

js文件太多，可能造成变量冲突。

加载的顺序不同，可能造成覆盖

#### 匿名函数的解决方案

使用闭包，把函数括起来

```javascript
(function () {
  var name = '小红';
  var flag = false;
  console.log(name);
}
 function sum(aa,bb) {
  return aa+bb
}
)()
```

#### 使用模块作为出口

```javascript
//main.js
;(function () {
  //1.想使用flag
  if(moduleA.flag){
    console.log('小明是天才');
  }
  //2.使用sum函数
  console.log(moduleA.sum(20,30));
}
)()
```

```javascript
//aaa.js
var moduleA=(function () { //模块化！不同的模块这个名字必须不同，不然就冲突了
  //导出的对象
  var obj= {}
  var name = '小红';
  var flag = true;
  function sum(a,b){
    return a+b
  }
  
  //要导出的东西写在这。没导出别人就用不了
  obj.flag = flag;
  obj.sum = sum;
  return obj
  }
)()
```

常见的模块化规范：CommonJS、AMD、CMD、ES6的Modules

### CommonJS（了解）

模块化两个核心：导出、导入

```javascript
//ES6对象的增强写法，导出 exports ！
module.exports = {
  flag:flag,
  sum:sum
}
```

```javascript
//解析对象 require！！

//方法1
var aaa = require('./aaa.js')
var flag=aaa.flag;
//方法2
var {flag,sum} = require('./aaa.js')
```

### ES6的export指令

```html
<!--type="module"表示模块，之后不会有命名冲突-->
<script src="aaa.js" type="module"></script>
<script src="bbb.js" type="module"></script>
```
导入的{}中定义的变量
```javascript
let name = '小明'
var age = 18
var flag = true

function  sum(num1,num2) {
  return num1+num2
}

if(flag){
  console.log(sum(20,30))
}

//复杂写法失败了，暂时只用简便写法
export  {
  flag,sum
}
```

```javascript
import {flag,sum} from "./aaa.js"

if(flag)
{
  console.log(sum(10,20))
}
```

另一种导出方式：直接导入export定义的变量

```javascript
export  var num1=1000;
export  var height=1.88;
```

```javascript
import {num1,height} from "./aaa.js"
console.log(num1+' '+height)
```

导出函数/类：export的function

```javascript
export function mul(num1,num2) {
  return num1*num2
}

export class Person {
  run(){
    console.log("run")
  }
}
```

```javascript
import {mul,Person} from "./aaa.js";
console.log(mul(10,20))

const p=new Person();
p.run()
```

自己命名导入的数据叫什么：export default

**<font color=#d5a347 >默认导出，全模块最多只能有一个</font>**

```javascript
const address='北京市'
export default address
```

```javascript
import addr from "./aaa.js";
console.log(addr)
```

统一全部导入

<font color=#909534 size=2>*：通配符</font>

```javascript
import * as aa from "./aaa.js"
console.log(aa.flag)
```

## webpack详解

### 认识webpack

#### 什么是Webpack

![image-20210707110422055](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210707110422055.png)

#### 前端模块化

#### 和grunt/gulp的对比

<font color=#909534>面试可能会问</font>

grunt/gulp的核心是Task

如果工程模块依赖非常简单，甚至是没有用到模块化的概念。只需要进行简单的合并、压缩，就使用grunt/gulp即可。

如果整个项目使用了模块化管理，而且相互依赖非常强，使用webpack<font color=#909534 >[强调模块化开发管理]</font>打包。

![image-20210707112628116](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210707112628116.png)

### webpack的安装

node 10.13.8

### webpack的起步

src：源码

dist：distribution打包好了的，发布

Terminal:

D:\study\vue\临时\LearnVuejs04-v2\01-webpack的使用\01-webpack的起步>webpack ./src/main.js ./dist/bundle.js

<font color=#909534 >把main.js打包成bundle.js</font>

```javascript
//使用commomjs的模块化规范
const {add,mul} = require('./mathUtils')
console.log(add(20,30));

//使用ES6的模块化的规范
import {name,age,height} from "./info"
console.log(name);
```

### webpack的配置

#### 入口和出口

创建webpack.config.js

```javascript
const path = require('path')
//这个时候控制台按npm init

module.exports = {
  entry: './src/main.js',
  output: {
    //动态获取路径
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  },
}
//控制台敲 webpack，如果文件名不是上面的，那webpack后面还要跟config的文件名
```

`const path = require('path')`——node自带的包，得出当前路径

`path.resolve()`——连接两个路径

`__dirname`——node带的，表示当前路径

npm init——对其初始化

>D:\study\vue\临时\LearnVuejs04-v2\01-webpack的使用\02-webpack的配置>`npm init`
>This utility will walk you through creating a package.json file.
>It only covers the most common items, and tries to guess sensible defaults.
>
>See npm help json for definitive documentation on these fields
>and exactly what they do.
>
>Use npm install <pkg> afterwards to install a package and
>save it as a dependency in the package.json file.
>
>Press ^C at any time to quit.
>package name: (02-webpack的配置)
>Sorry, name can only contain URL-friendly characters.
>package name: (02-webpack的配置) `meetwebpack`
>version: (1.0.0)
>description:
>entry point: (webpack.config.js) `index.js`
>test command:
>git repository:
>keywords:
>author:
>license: (ISC)
>About to write to D:\study\vue\临时\LearnVuejs04-v2\01-webpack的使用\02-webpack的配置\package.json:
>
>{
>"name": "meetwebpack",
>"version": "1.0.0",
>"description": "",
>"main": "index.js",
>"scripts": {
>"test": "echo \"Error: no test specified\" && exit 1"
>},
>"author": "",
>"license": "ISC"
>}
>
>
>Is this OK? (yes)
>
>D:\study\vue\临时\LearnVuejs04-v2\01-webpack的使用\02-webpack的配置>

![image-20210707155146527](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210707155146527.png)

build是自己取的，`npm run build`相当于执行`webpack`

↑会先找本地，找不到再找全局

#### 局部安装webpack

`npm install webpack@3.6.0 --save-dev`——本地安装webpack（开发者模式）

如果在终端<font color=#909534 size=2>[webstorm或者cmd]</font>里敲`webpack`，始终是找全局的。

但是`npm run build`和`node_modules/.bin/webpack`<font color=#909534 size=2>※尝试失败※</font>优先用本地的

### css-loader的使用

#### 什么是louder

将ES6转成ES5代码，将TypeScript转成ES5代码，将scss、less转成css，将.jsx、.vue文件转成js文件等等

#### css文件处理 

安装 css-loader：`npm install --save-dev css-loader@2.0.2`

在mian.js里添加`require('./css/normal.css')`。不需要传出对象，因为不会用，只是是其产生依赖，才能打包

此时的webpack.config.js

```javascript
const path = require('path')
//这个时候控制台按npm init

module.exports = {
  entry: './src/main.js',
  output: {
    //动态获取路径
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  },
   module: {
    rules: [
      {
        //正则表达式
        test: /\.css$/i,
        //webpack使用多个louder时，是从右向左读的。先处理css后style
        use: ["style-loader","css-loader"],
      },
    ],
  },
}
```

[`style-loader`](https://webpack.docschina.org/loaders/style-loader) 将模块导出的内容作为样式并添加到 DOM 中

安装：`npm install --save-dev style-loader@0.23.1`

[`css-loader`](https://webpack.docschina.org/loaders/css-loader) 只负责加载css

### less文件处理

[`less-loader`](https://webpack.docschina.org/loaders/less-loader) 加载并编译 LESS 文件

安装：`npm install --save-dev less-loader less@4.1.0`

### 图片文件的处理

安装：`npm install --save-dev url-loader@1.1.2`

```javascript
{
  test: /\.(png|jpg|gif|jpeg)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
      //当加载的图片小于limit时，会将图片编译成base64字符串格式
      //如果limit太大，浏览器加载的图片也会那么多，加载时间长
        limit: 13000,
        //不加中括号文件名字就叫name了
        name: 'img/[name].[hash:8].[ext]'
      }
    }
  ]
}
```

如果图片超过limit，则需要用file-loader。

对于需要打包的大图片：

webpack.config.js 里的 module.exports里的方法

```javascript
output: {
    //动态获取路径
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js',
    //只要是url开头的，地址前默认加上↓
    publicPath: 'dist/'
  },
```

打包的图片自动命名为一个32位的hash值<font color=#909534 size=2>[为了防止重复]</font>

太长一串了！！于是：自定义修改打包后的图片名，在option里添加

`name: 'img/[name].[hash:8].[ext]'`——所有打包的图片都放在dist的img文件夹中。文件命名为：文件原名.截取8位hash值.文件原后缀名

### Babel的使用

将ES6的语法转成ES5<font color=#909534 size=2>[没有const]</font>

安装：`npm install --save-dev babel-loader@7 babel-core babel-preset-es2015`

配置：

```javascript
{
  test: /\.js$/,
  //exclude:排除
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['es2015']
    }
  }
}
```



### webpack中配置Vue

#### 引入vue.js

引用：`import  Vue from 'vue'`		<font color=#909534 size=2>为什么可以这样写？↓</font>

没有写路径时，就去model里找。model里边默认导出的就是Vue：`export default Vue`

下载：`npm install vue@2.5.21 --save`

-dev	表示开发时依赖，因为项目中会使用Vue.js所以不加dev

报错：

runtime-only   ：代码中，不可以有任何的templa

runtime-complier  ： 代码中，可以有template，因为有complier可以用于编译template

<font color=#909534 >alias：别名			廖雪峰：git教程</font>		

webpack配置

```javascript
resolve: {
  //alias：别名
  alias: {
    'vue$': 'vue/dist/vue.esm.js'
  }
}
```

指定方式找文件夹，否则就默认找vue.runtime.js了。指定找vue.esm.js
$表示结束

SPA(simple Page web application) -> vue-router(前端路由)

#### el和template区别

template会替换el

使用.vue文件时

`npm install vue-loader@15.4.2 vue-template-compiler@2.5.21 --save-dev`

省略后缀名：webpack配置的resolve<font color=#909534 size=2>解决问题的</font>

`extensions: ['.js','.css','.vue']`

### plugin的使用

plugin：框架/插件

react -> MIT

#### 添加版权的Plugin

webpack配置文件：

```javascript
plugins:[
   new webpack.BannerPlugin('最终版权归YY所有')
]
```

![image-20210707230522018](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210707230522018.png)

#### 打包html的plugin

将index.html文件打包到dist文件夹

下载：`npm install html-webpack-plugin@3.2.0 --save-dev`

引用：`const HtmlWebpackPlugin = require('html-webpack-plugin')`

在plugins里

```javascript
new HtmlWebpackPlugin({
  template: 'index.html'
})
```

使得每次新生成的html文件里自动引入原html的`<div id="app"></div>`

#### js压缩的Plugin

<font color=#909534 >打包的时候才用</font>

下载：`npm install uglifyjs-webpack-plugin@1.1.1 --save-dev`

然后生成的js代码会很丑，，挤在一起

### 搭建本地服务器

存储在内存里，`npm run build`后才会存储到磁盘里

下载：`npm install --save-dev webpack-dev-server@2.9.1`

配置：<font color=#909534 >开发的时候才用</font>

```javascript
devServer: {
  contentBase: './dist',
  inline: true
}
```

json增加描述`"dev": "webpack-dev-server"`

cmd：`npm run dev`

在cmd点端口号进入

终止批处理操作：`ctrl`+`c`

### webpack配置的分离

公共环境、生产环境、开发环境分离

公共环境：就是之前配置文件的内容，去除了开发环境、生产环境的部分。<font color=#909534>base.config.js</font>

开发环境：<font color=#909534>dev.config.js</font>

```javascript
/*开发环境，添加对公共环境的依赖*/
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports = webpackMerge(baseConfig,{
  devServer: {
    contentBase: './dist',
    inline: true
  }
})
```

生产环境：<font color=#909534>prod.config.js</font>

```javascript
/*生产环境，添加对公共环境的依赖*/
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports = webpackMerge(baseConfig,{
  plugins:[
    new UglifyJSPlugin()
  ],
})
```

指令修改：

```json
"build": "webpack --config ./build/prod.config.js",
    "dev": "webpack-dev-server --open --config ./build/dev.config.js"
```

# Vue CLI详解

## Vue CLI

<font color=#909534>Command-Line Interface</font>

Vue CLI使用前提 ：Node、webpack、npm

安装：`npm install -g @vue/cli`

安装CLI2：`npm install @vue/cli-init -g`

Vue CLI2初始化项目：`vue init webpack my-project  `

Vue CLI3初始化项目：`vue create my-project `

### Vue CLI2

VueCore+vue-router+vuex

ES(js)-Lint<font color=#909534>——对js代码进行限制，之后都必须写规范。</font>不能有任何错误（多个逗号、分号、函数和括号少空格了、定义了函数没有用），否则会报错。

可以在config文件夹里的修改useEslint为false

<font color=#909534>`ctrl` + `S`保存程序</font>

e2e<font color=#909534>——end to end端到端测试</font>->selenium

![image-20210709100646643](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210709100646643.png)

js ->字节码 ->浏览器

V8引擎：js ->二进制代码

static静态资源文件夹，编译后会原封不动地放到dist文件夹

#### CLI2生成的目录结构解析

![image-20210709150414397](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210709150414397.png)

#### Runtime-Compiler和Runtime-only的区别

箭头函数：

```javascript
render: h => h(App)
```
等价于

```javascript
render: function (h) {
  return h(App)
}
```

Vue程序运行过程：

![image-20210709151857174](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210709151857174.png)

template - >ast ->render ->virtual dom ->真实dom

***

==runtime-complier：==

![image-20210709152323442](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210709152323442.png)

template - >ast ->render ->virtual dom ->UI



---

==runtime-only：==

![image-20210709152651266](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210709152651266.png)

![image-20210709153213535](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210709153213535.png)

render ->virtual dom ->UI

流程少，性能更高，代码量更少（轻6kB）

1.createElement('标签',{标签的属性},['标签里的内容'])

```javascript
new Vue({
 el: '#app',
 render: function (createElement) {
    return createElement('h2',
      {class:'box'},
      ['Hello World',createElement('button',['按钮'])])
  }
})
```

2.传入组件对象：<font color=#909534>这样就不用写template了</font>

```javascript
new Vue({
 el: '#app',
 render: function (createElement) {
    return createElement(cpn)
 },
 components: {
    cpn
  }
})
```

相似于runtime-only

那么，.vue文件中的template是由谁处理的呢？

loader-template-complier

App对象：没有template，只有render

![image-20210709160925836](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210709160925836.png)

![image-20210709170114602](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210709170114602.png)

![image-20210709170125903](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210709170125903.png)

### Vue CLI3

vue2.5.21 ->vue2.x ->flow-type(facebook)

Vue3.x ->TypeScript(microsoft)

设计原则：“0”配置

vue ui 可视化

<font color=#909534>preset：配置</font>

<font color=#909534>manually：手动的</font>

按空格是选择/取消

配置：

![image-20210709172800096](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210709172800096.png)

<font color=#909534 size=2>Users/YY/</font>全局配置文件.vuerc保存了个人配置

vcs -> version control system 版本控制错误

之前的dev变成serve了。"serve": "vue-cli-service serve",

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210709175444224.png" alt="image-20210709175444224" style="zoom:50%;" />

el也不用写

配置：

1.在终端/cmd：`vue ui`

导入文件夹后，可以显示项目仪表盘

2.项目中创建文件：vue.config.js  <font color=#909534>必须这个名</font>

使用git添加进去：`git add .`，`git commit -m '修改配置文件'`

# vue-router

==箭头函数==：一种定义函数的方式

```javascript
//1.定义函数的方式：function
const aaa = function () {
}

//2.对象字面量中定义函数
const obj = {
  bbb: function () {
  },
  bbb() {
  }
}

//3.ES6中的箭头函数
//const ccc = (参数列表)=> {
//}
const ccc = () => {
}
```

1. 参数问题

   ```javascript
     //放入两个参数
     const sum = (num1,num2) => {
       return num1+num2
     }
     //放入一个参数,小括号省略
     const power = num => {
       return num * num
     }
   ```

   

2. 

   ```javascript
     //代码块中有多行代码
     const test = () => {
       console.log('Hello')
       console.log('World')
     }
     //代码块中只有一行代码，有没有返回值都行
     const nul = (num1,num2) => {
       return num1 +num2
     }
     const nul = (num1,num2) => num1 +num2

箭头函数的this

箭头函数的this是如何查找的？

向外层作用域中一层层查找this，直到有this的定义

## Vuex认识路由

前端渲染，后端渲染

### 后端路由阶段

1.后端渲染

jsp：java server page

2.后端路由

后端处理URL和页面直接的映射关系

![image-20210710113402872](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210710113402872.png)

### 前后端分离阶段

后端只负责提供数据，不负责任何阶段的内容

前端渲染：浏览器中显示的网页中的大部分内容，都是由前端写的js代码在浏览器中执行，最终渲染出来的网页

移动端和网页端的后端不需要进行任何处理，使用同一套api

![image-20210710141700454](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210710141700454.png)

### SPA页面

<font color=#909534>SPA：单页面富应用</font>

整个网页只有一个html页面

每次交互都不用请求新的url。改变url，页面不进行整体的刷新

![image-20210710144355207](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210710144355207.png)

SPA最主要的特点就是在前后端分离的基础上加了一层前端路由

## 前端路由的规则

href ->hyper reference

控制台`location.hash = 'bdd'`，可以改变url而不刷新。

history.pushState(data,title,?url)

`history.pushState({},'','home')`,可以改变url而不刷新。

↑不断push 入栈。`history.back()`=`history.go(-1)`出栈返回

go里面的数字表示指针移动多少个值

`history.forward()`=`history.go(1)` 

`history.replaceState({},'','home')`，替换，不能返回

## vue-router基础

下载：`npm install vue-router --save`

```javascript
import router from './router'
```

如果是个目录（文件夹）会自动找该文件夹里的index文件

1.创建路由组件

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import About from '../components/About'

//1.通过Vue.use(插件)，安装插件
Vue.use(VueRouter)
//2.创建vueRouter对象
const routes =[
  {
    //协议头：//host/
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  //没有路径时,重定向到home（默认打开首页）
  {
    path: '',
    redirect: '/home'
  }
]
const router = new VueRouter({
  //配置路由器和组件直接的映射关系
  routes,
  //默认情况使用hash改变url，也可改成history
  //mode: 'history'
 // linkActiveClass: 'active'
})

//3.将router对象传入到Vue实例
export default router

```

配置组件和路径的映射关系

```javascript
import Home from '../components/Home'
import About from '../components/About'
```

```javascript
const routes =[
  {
    //协议头：//host/
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  //没有路径时,重定向到home（默认打开首页）
  {
    path: '',
    redirect: '/home'
  }
]
```

3.使用路由

```javascript
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-view></router-view>
```

` <router-link to="/about">关于</router-link>`——入口的显示

to：指定跳转的路径

tag：默认渲染成一个<a>标签，="button"时渲染成buttton

replace：默认是可以返回的，加上这个标签（后面不用跟等于），以后就不能返回了

active-class：选择谁，谁的样式就改变为知道class

也可以在router里统一修改：linkActiveClass: 'active'

`<router-view>`——组件的显示,占位

使用button代替link，用代码实现跳转

```javascript
    <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button>
    <router-view></router-view>
```

```javascript
export default {
  name: 'App',
  data(){
    return{
      $router: ''
    }
  },
  methods: {
    homeClick(){
      //通过代码的方式修改路由vue-router
      //this.$router.push('/home')
      this.$router.replace('/home')
      console.log('homeClick')
    },
    aboutClick(){
      //通过代码的方式修改路由vue-router
      this.$router.push('/about')
      console.log('aboutClick')
    }
  }
}
```

route：(不是router)当前谁处于活跃就是谁

动态路由：

组件User：(两种写法)

```javascript
    <h2>{{$route.params.userId}}</h2>
```

```javascript
    <h2>{{userId}}</h2>
    
    computed: {
      userId(){
        return this.$route.params.userId
      }
    }
```

父组件App

```
    <router-link v-bind:to='"/user/"+userId' active-class="active">用户</router-link>
    
 data(){
    return{
      userId:'zhangsan'
    }
```

路由文件index

```javascript
  {
    path: '/user/:userId',
    component: User
  }
```

## 路由懒加载

![image-20210710202201055](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210710202201055.png)

一个路由打包一个js文件，用到哪个加载哪个

方法一：结合Vue的异步组件和Webpack的代码分析

方法二：AMD写法

==方法三==：在ES6中, 我们可以有更加简单的写法来组织Vue异步组件和Webpack的代码分割.

```javascript
const Home = () =>import('../components/Home')
const About = () =>import('../components/About')
const User = () =>import('../components/User')
```

## 路由嵌套

子路由：用children

```javascript
path: '/home',
component: Home,
children: [
  {
  path: '',
 //不加斜杠就默认从上一个路径后面接下去     
  redirect:'news'
},
  {
  path: 'news',
  component:HomeNews
},
{
  path: 'message',
  component:HomeMessage
}]
```

## 传递参数

<font color=#909534>Profile -> 档案</font>

加了冒号：即v-bind，就把to=""里面的东西当成语法解析，否则还是字符串。

`to="字符串"`等价于`:to="'字符串'"`

URL: 协议://主机:端口/路径?查询

scheme://localhost(:port)/path?query#fragment

### 传递参数的方式

#### params的类型:

配置路由格式: /router/:id
传递的方式: 在path后面跟上对应的值
传递后形成的路径: /router/123, /router/abc

#### query的类型:

配置路由格式: /router, 也就是普通配置
传递的方式: 对象中使用query的key作为传递方式
传递后形成的路径: /router?id=123, /router?id=abc

```html
<router-link :to="{path:'/profile',query:{name:'YY',age:18,height:1.88}}" >档案</router-link>
```

```html
    <h2>{{$route.query.name}}</h2>
    <h2>{{$route.query.age}}</h2>
```

所有组件都继承着Vue的原型。父类中的方法，子类继承了

### 导航守卫

```javascript
    //创建组件
    created() {
      console.log('created');
      document.title = '首页'
    },
    //回调组件
    mounted() {
      console.log('mounted');
    },
    //刷新
    updated() {
      console.log('updated')
    }
```

**跳转函数实现在指定组件页显示指定title**

routes配置都加上 <font color=#909534>meta——元素</font>

```
meta:{
      title:'档案'
    },
```
```javascript
router.beforeEach((to,from,next) =>{
  //从from跳转到to
  document.title =to.matched[0].meta.title
  //下一步，默认原本就有，重写的话也得加上
  next()
})
```

`matched[0]`——如果一个父组件有多个子组件，title的元素不会在父组件里，会在子组件里，所以找第一个子组件（一般）的title元素

# 网络封装

# 项目实战




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

新的超链接写法

![image-20210714194134612](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714194134612.png)

![image-20210714194232544](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714194232544.png)

### v-text

```html
<h2 v-text="message">，YY</h2>
```

运行后，原本标签里的文字（，YY）会被覆盖

### v-pre

```html
<h2 v-pre>{{message}}</h2>
```

表示直接显示大括号（转义）

### v-cloak

防止闪烁

在vue解析之前，div中有一个属性v-cloak

在vue解析之后，div中没有一个属性v-cloak

```html
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <style>
    [v-cloak]{
      display: none;
    }
  </style>
</head>
<body>
<div id="app" v-cloak>
  {{message}}
</div>
<script src="../js/vue.js"></script>
<script>
  setTimeout(function () {
    const app=new Vue({
      el: '#app',
      data: {
        message: '你好啊'
      }
    })
  },1000)
</script>
```

↑设置了延时

## 动态绑定属性v-bind

动态决定某些属性

语法糖 :

```html
<div id="app">
  <img v-bind:src="imgURL" alt="">
  <a v-bind:href="aHref">百度一下</a>
  <img :src="imgURL" alt="">
  <a :href="aHref">百度一下</a>
</div>
<script src="../js/vue.js"></script>
<script>
  const app=new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      imgURL: 'https://www.baidu.com/img/540x258_2179d1243e6c5320a8dcbecd834a025d.png',
      aHref: 'http://www.baidu.com'
    }
  })
</script>
```

### v-bind动态绑定class

用：class时，都是整合叠加，不是覆盖

对象语法：

```html
<div id="app">
  <h2 class="active">{{message}}</h2>
  <h2 :class="active11">{{message}}</h2>
 <!-- <h2 v-bind:class="{类名1:boolean,类名2:boolean}}">{{message}}</h2>-->
  <h2 class="title" :class="getClass()">{{message}}</h2>
  <button v-on:click= "btnClick" >按钮</button>
</div>
<script src="../js/vue.js"></script>
<script>
  const app=new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      active11: 'active',
      isActive: 'true',
      isLine: 'false'
    },
    methods: {
      btnClick: function () {
        this.isActive = !this.isActive
      },
      getClass: function () {
        return {active: this.isActive, line: this.isLine}
      }
    }
  })
</script>
```

![image-20210714200013510](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714200013510.png)

数组语法：

```html
<div id="app">
  <h2 class="title" :class="['active','line']">{{message}}</h2>
  <h2 class="title" :class="[active,line]">{{message}}</h2>
  <h2 class="title" :class="getClasses()">{{message}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app=new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      active: 'aaa',
      line: 'bbb'
    },
    methods: {
      getClasses: function () {
        return [this.active,this.line]
      }
    }
  })
</script>
```

![image-20210714195510198](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714195510198.png)

### v-bind绑定style

对象语法：

\<h2 :style="{key（属性名）:value（属性值）}">

如：

```html
<h2 :style="{frontSize:'50px'}"
```

在css中，50px不用加单引号、字符串也不用。但在vue语法中，不加单引号会把50px当作一个变量。

```html
<h2 :style="{finalSize + '50px'}"
```

其中，frontSize: '100'，是个变量

数组语法：

```html
<div id="app">
  <h2 :style="[backStyle,backStyle1]">{{message}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app=new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      backStyle: {backgroundColor: 'green'},
      backStyle1: {fontSize: '80px'}
    }
  })
</script>
```

## 计算属性

```html
<div id="app">
  <h2>总价格：{{totalPrice}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app=new Vue({
    el: '#app',
    data: {
      books: [
        {id:110, name: '老鼠爱大米', price:119},
        {id:111, name: '白夜行', price:80},
        {id:112, name: '算法笔记', price:112},
      ]
    },
    computed: {
      totalPrice: function () {
        let result=0
        for(let i=0; i<this.books.length;i++)
          result+=this.books[i].price
        return result
      }
    }
  })
</script>
```

因为在computed计算属性中，调用函数时后面不用加括号()

计算属性的setter和getter

![image-20210714201403890](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714201403890.png)

计算属性一般没有set方法，只读属性

get这一行也可以删

[字符串分割](#字符串分割)

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

tag：默认渲染成一个\<a>标签，="button"时渲染成buttton

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

### 动态路由：

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

[动态路由](#动态路由)

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

[生命周期函数](#生命周期函数)

**跳转函数实现在指定组件页显示指定title**

routes配置都加上

 <font color=#909534>meta——元数据（；描述数据的数据）</font>

```
meta:{
      title:'档案'
    },
```
```javascript
//前置守卫
router.beforeEach((to,from,next) =>{
  //从from跳转到to
  document.title =to.matched[0].meta.title
  //下一步，默认原本就有，重写的话也得加上
  next()
})
```

`matched[0]`——如果一个父组件有多个子组件，title的元素不会在父组件里，会在子组件里，所以找第一个子组件（一般）的title元素

```javascript
//后置守卫，不需要主动调用next函数
router.afterEach((to,from) =>{
  console.log('-----')
})
```

先调用前置守卫。后调用后置守卫

- 全局守卫

- 路由独享守卫

  ```
  beforeEnter: (to,from,next) =>{}
  ```

- 组件内的守卫

## keep-alive遇见vue-router

标签在切换时，被反复创建和销毁（用[生命周期函数](# 生命周期函数)来验证）。可以用keep-alive使其保持活性

```html
<keep-alive exclude="Profile,User">
  <router-view></router-view>
</keep-alive>
```

keep-alive的状态下才能使用 activated/deactived和beforeRouteLeave这两个函数

首页中使用path属性记录离开时的路径，在beforeRouteLeave中记录

```javascript
//这两个函数，只有该组件被保持了状态，使用了keep-alive时，才是有效的
activated() {
  this.$router.push(this.path);
},
beforeRouteLeave(to,form,next){
  console.log(this.$route.path);
  this.path = this.$route.path;
  next()
}
```

keep-alive属性：

1. include - 字符串或正则表达，只有匹配的组件会被缓存
2. exclude - 字符串或正则表达式（不要随便加空格），任何匹配的组件都不会被缓存

## TabBar练习

在组件里的\<style>里引用样式

```javascript
<style>
  @import "./assets/css/base.css";
</style>
```

如果在js里就不用加@了。因为在style里，就要加@。但是子组件。。。。

样式：

```css
.tab-bar{
  display: flex;
}
.tab-bar-item{
  flex: 1;
  text-align: center;
}
```

`class="tab-bar"`放在大div里，`class="tab-bar-item"`放在选项div。

flex布局（display）

position: fixed;布局位置，left和right都等于0是为了让tab-bar完全盖住页面

box-shadow：水平方向x 垂直方向y 模糊度 阴影的距离 颜色

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210711144532777.png" alt="image-20210711144532777" style="zoom: 50%;" />

其中颜色：rgba(红,绿,蓝,透明度)。透明度用小数，0不用鞋，直接写.8

flex: 1表示项目等分

 text-align: center;在自己的领域居中

**一般来说，tab-bar高度为49px。**

webpack.base配置

```javascript
alias: {
  '@': resolve('src'),
  'assets': resolve('src/assets'),
  'components': resolve('src/components'),
  'views': resolve('src/views'),
}
```

[alias](#webpack中配置Vue)

使用时

```javascript
 src="~assets/img/tabbar/home.svg"
 import TabBar from '@/components/tabbar/TabBar'
```

# Promise的使用

Promise是异步编程的一种解决方案。

回调地狱

## Promise的基本使用

### 定时器的异步事件

参数 -> 函数（resolve,reject）
resolve,reject本身又是函数
链式编程

```javascript
new Promise((resolve,reject) =>{
  setTimeout(() =>{
    resolve()
  },1000)
}).then(() =>{
  console.log('Hello world')

  return new Promise((resolve ,reject) =>{
    setTimeout(() =>{
      resolve()
    },1000)
  })
}).then(() =>{
  console.log('Hello vuejs')

  return new Promise((resolve ,reject) =>{
    setTimeout(() =>{
      resolve()
    },1000)
  })
})
```

什么情况会用到Promise?

一般情况下，使用Promise对这个异步操作进行封装

new -> 构造函数（1.保存了一些状态信息 2.执行传入的函数）

在执行传入的回调函数时，会传入两个参数，resolve，reject，本身又是函数

请求与处理分离，变得优雅。。

```javascript
new Promise((resolve,reject) =>{
  setTimeout(() =>{
    //成功的时候调用resolve
    //resolve()

    //失败的时候调用reject
    reject('error message')
  },1000)
}).then(data => {
  console.log(data);
  console.log(data);
}).catch(err =>{
  console.log(err)
})
```

控制台输出 error message

### Promise三种状态

<font color=#909534>sync ->synchronization -> 同步</font>

<font color=#909534>async ->asynchronization -> 异步</font>

<font color=#909534>operation -> 操作</font>

![image-20210711211042996](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210711211042996.png)

wrapped into
网络请求：aaa -> 自己处理（10行）
处理：aaa 111 -> 自己处理（10行）
处理：aaa 222 -> 自己处理

1.

```javascript
new Promise((resolve ,reject) =>{
  setTimeout(()=>{
    resolve('aaa')
  },1000)
}).then(res =>{
  //1.自己处理10行代码
  console.log(res,'第一层的10行处理代码');

  //2.对结果进行第一次处理
  return new Promise((resolve) =>{
    resolve(res + '111')
  })
}).then(res =>{
  console.log(res,'第二层的10行处理代码');

  return new Promise(resolve => {
    resolve(res + '222')
  })
}).then(res =>{
    console.log(res,'第三层的10行处理代码');
  })
```
2.

```javascript
new Promise((resolve ,reject) =>{
  setTimeout(()=>{
    resolve('aaa')
  },1000)
}).then(res =>{
  //1.自己处理10行代码
  console.log(res,'第一层的10行处理代码');

  //2.对结果进行第一次处理
  return Promise.resolve(res + '111')
}).then(res =>{
  console.log(res,'第二层的10行处理代码');

  return Promise.resolve(res + '222')
}).then(res =>{
  console.log(res,'第三层的10行处理代码');
})
```

3.省略掉Promise.resolve

```javascript
new Promise((resolve ,reject) =>{
  setTimeout(()=>{
    resolve('aaa')
  },1000)
}).then(res =>{
  //1.自己处理10行代码
  console.log(res,'第一层的10行处理代码');

  //2.对结果进行第一次处理
  return Promise.resolve(res + '111')
}).then(res =>{
  console.log(res,'第二层的10行处理代码');

  return Promise.resolve(res + '222')
}).then(res =>{
  console.log(res,'第三层的10行处理代码');
})
```

结果：<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210711224516288.png" alt="image-20210711224516288" style="zoom: 67%;" />

多个 共用一个catch。抓住错误

1.reject，catch

```javascript
  new Promise((resolve ,reject) =>{
    setTimeout(()=>{
      resolve('aaa')
    },1000)
  }).then(res =>{
    //1.自己处理10行代码
    console.log(res,'第一层的10行处理代码');

    //2.对结果进行第一次处理
    return new Promise((resolve,reject) =>{
     // resolve(res + '111')
      reject('err')
    })
  }).then(res =>{
    console.log(res,'第二层的10行处理代码');

    return new Promise(resolve => {
      resolve(res + '222')
    })
  }).then(res =>{
      console.log(res,'第三层的10行处理代码');
    }).catch(err =>{
      console.log(err);
  })
```

2.throw，catch

```javascript
  new Promise((resolve ,reject) =>{
    setTimeout(()=>{
      resolve('aaa')
    },1000)
  }).then(res =>{
    //1.自己处理10行代码
    console.log(res,'第一层的10行处理代码');

    //2.对结果进行第一次处理
   // return Promise.resolve(res + '111')
    throw  'error message'
  }).then(res =>{
    console.log(res,'第二层的10行处理代码');

    return Promise.resolve(res + '222')
  }).then(res =>{
    console.log(res,'第三层的10行处理代码');
  }).catch(err =>{
    console.log(err);
  })
```

1.ajax异步访问：

两个请求同时到达时才能处理

```javascript
//请求一：
let isResult1 =false
let isResult2 =false
$ajax({
  url: '',
  success: function () {
    console.log('结果一');
    isResult1 = true
    handleResult()
  }
})
//请求二：
$ajax({
  url: '',
  success: function () {
    console.log('结果二');
    isResult2 = true
    handleResult()
  }
})

function handleResult() {
  if(isResult1 &&isResult2){
  }
}
```

<font color=#909534>iterator：可迭代的（数组）</font>

2.Promise的异步访问

```javascript
<script>
  Promise.all([
      new Promise((resolve,reject) =>{
        setTimeout(() =>{
          resolve('result1')
        },2000)
      }),
      new Promise((resolve,reject) =>{
        setTimeout(() =>{
          resolve('result1')
        },1000)
      })
  ]).then(result =>{
    //results是个数组，results[0]代表第一个请求
    console.log(results);
  })
```

# Vuex详解

## 认识Vuex

![image-20210712093919716](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210712093919716.png)

token -> 命令行

Linus -> linux/git

### 单界面的状态管理

![image-20210712102911326](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210712102911326.png)

### 多界面状态管理

下载:`npm install vues@3.1.3 --save`

![image-20210712110533054](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210712110533054.png)

Devtools，Vue开发的一个浏览器插件。可以记录每次修改的state状态

Action——异步操作在这做

backend：后端

fronted：前端

## Vuex基本使用

1.创建store/index.js

```javascript
import Vue from "vue";
import Vuex from "vuex"

//1.安装插件
Vue.use(Vuex)

//2.创建对象
const  store = new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increment(state){
      state.counter++
    },
    decrement(state){
      state.counter--
    }
  },
  actions: {},
  getters: {},
  modules: {}
})

//3.导出store对象
export default store
```

2.在main.js中引入：`import store from "./store"`

将store对象放置在new Vue对象中，这样可以保证在所有的组件中都可以使用到

`Vue.prototype.$store = store`的意思是把所有的状态都交到这一个$store去管理

3.在其他组件中使用store对象中保存的状态即可

读数据：`$store.state.counter`

写数据：

```javascript
methods: {
    addition() {
      this.$store.commit('increment')
    },
    subtraction() {
      this.$store.commit('decrement')
    }
  }
```

把要改变的数据写在方法里，通过commit来提交给mutations，让mutations去改数据。这样在vuejs devtools插件里面调试时才能看到相应数据的变化。否则，虽然网页中数据变化，但插件中无法显示。

## Vuex核心概念

### State单一状态树

Single Source of Truth，也叫单一数据源

即使有更多信息需要管理，还是建议用单一store，否则不利于维护。（不考虑安全性）

### Getters基本使用

在store的index中：

```javascript
  getters: {
    powerCounter(state){
      return state.counter*state.counter
    }
```

在组件中：

```
<h2>getCounter:{{$store.getters.powerCounter}}</h2>
```

计算属性版：[filter](#filter)

```javascript
computed: {
  more1p7(){
    return this.$store.state.students.filter(s => s.height>=1.7)
  }
},
```

getters版：

```javascript
more1p7(state){
  return state.students.filter(s => s.height>=1.7)
}
//state不能省
more1p7Length(state,getters){
   return getters.more1p7.length
}
```

相当于全局的计算属性

如果想用getters传参：

不能直接在state后面加参数，（加了也表示getters。。@_@），应当在return里写一个函数

```javascript
moreHeight(state){
  return function (height) {
    return state.students.filter(s =>s.height >=height)
  }
    
  //箭头函数等价
  return height => {
     return state.students.filter(s =>s.height>=height)
      }
}
```

### Mutation

回调函数的第一个参数就是state

#### Mutation传参

mutation方法中，直接在state后面增加参数

```javascript
    incrementCount(state,num){
      state.counter+=num
    },
    addStudent(state,stu){
      state.students.push(stu)
    }
```

在组件的methods中，在函数名后面跟参数（称为Payload，载荷）

```html
<button @click="addCount(5)">+5</button>
```
1.普通的提交封装

```javascript
addCount(num){
  this.$store.commit('incrementCount',num)
},
addStudent(){
  const  stu = {id: 114,name: 'KK',height: '1.80'}
  this.$store.commit('addStudent',stu)
}
```

2.特殊的提交封装

```javascript
addCount(num){
  this.$store.commit({
  type: 'incrementCount',
    num
})
```

此时，mutation中：

```javascript
incrementCount(state,payload){
  state.counter += payload.num
},
```

负载接受对象形式的变量，里面可以存储多个属性，方便操作。

#### Mutation响应规则

state中，属性都会被加入到响应式系统中，而响应式系统会监听属性的变化。当属性（该属性本身就已经添加在state中）发生变化时，会通知所有界面中的用到属性的地方，让界面发生刷新。用[定义增加属性]()，并不会把新加的属性添加到响应式系统中。<font color=#909534>(据说新版本已经可以添加了,也可能是弹幕乱说)</font>

应该用[响应式方法]() set

删属性delete不是响应式方法

```javascript
delete state.info.age
```

应该用Vue.delete

```javascript
Vue.delete(state.info,'age')
```

#### Mutation常量类型 

建立文件mutation-types

```javascript
export const INCREMENT = 'increment'
```

导入到其它js文件中

```javascript
import {
  INCREMENT
} from "./mutation-types";
```

原本mutations里的的函数

```javascript
increment(state){},
```

可以写成

```
[INCREMENT](state){},
```

而组件里要用到的字符串`'increment'`可以用`INCREMENT`代替

#### Mutation同步函数

通常情况下, Vuex要求我们Mutation中的方法必须是同步方法。

主要的原因是当我们使用devtools时, 可以devtools可以帮助我们捕捉mutation的快照。但是如果是异步操作, 那么devtools将不能很好的追踪这个操作什么时候会被完成。

如setTimeout在mutation中操作，devtools不能显示

### Action

代替Mutation进行异步操作

<font color=#909534>context：上下文</font>

点+后延迟1秒，counter+1。

```javascript
actions: {
  aIncrement(context,payload){
    setTimeout(() =>{
      context.commit(INCREMENT)
      console.log(payload)
    },1000)
  }
},
```

```javascript
addition() {
 // this.$store.commit(INCREMENT)
  this.$store.dispatch('aIncrement','我是payload')
},
```

dispatch在[开头图](#多界面状态管理)

加上Promise

```javascript
aIncrement(context,payload){
  return new Promise((resolve,reject) =>{
   setTimeout(() =>{
     context.commit(INCREMENT)
      console.log(payload)
      resolve('1111')
    },1000)
  })
}
```

```javascript
addition() {
  this.$store
    .dispatch('aIncrement','我是携带的信息')
    .then(res =>{
      console.log('里面已经完成了提交')
      console.log(res);
    })
},
```

![image-20210712203219268](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210712203219268.png)

### Module

Module 里定义的ModuleA最后生成时是放在state里的

```html
<h2>{{$store.state.a.name}}</h2>
```

<font color=#909534>同步是commit，异步是dispatch</font>

模块里的函数也可以在组件里直接用commit调用

```javascript
this.$store.commit('updateName','lisi')
```

模块里的getters里的函数也可以直接调用

```html
<h2>{{$store.getters.fullname}}</h2>
```

<font color=#909534>就是模块分了好几个，其实最后还是只有一个</font>

模块里的getters函数里可以有第三个参数

```javascript
fullname3(state,getters,rootState){
  return getters.fullname2 + rootState.counter
}
```

用rootState来调用根的参数

actions操作一样。

取根里的getters时，用rootGetters

[对象的解构](#对象的解构)

## 数据抽离

# 网络模块封装

## JSONP

对不起。我不会。没学过

![image-20210712213759551](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210712213759551.png)

![image-20210712213809397](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210712213809397.png)

![image-20210712213816616](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210712213816616.png)

## axios

特点：在浏览器中发送 XMLHttpRequests 请求，在 node.js 中发送 http请求，支持 Promise API，拦截请求和响应，转换请求和响应数据，等

axios请求方式：

axios(config)
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

下载：`npm install axios@0.18.0 --save`

网络封装、模拟测试可以用httpbin.org

<font color=#909534>**跨域：**域名、端口、协议三者任一不同，就是不同域，请求不同域的数据就是跨域</font>

### 发送基本请求

#### get

axios请求的两种方式：post↓

```javascript
axios({
  url: 'http://123.207.32.32:8000/home/multidata',
  method: 'post'
}).then(res =>{
  console.log(res)
})

axios.post()
```
传数

```javascript
axios({
  url: 'http://123.207.32.32:8000/home/multidata',
  params: {
    type: 'pop',
    page: 1
  }
})
```

等价于

```javascript
axios({
  url: 'http://123.207.32.32:8000/home/multidata?type=pop&page=1'
})
```

#### 并发all

#### 全局配置

```javascript
axios.defaults.baseURL = 'http://152.136.185.210:7878/api/m5'
axios.defaults.timeout = 5000

axios.all([axios({
  url:'/home/multidata'
}),axios({
  url:'/home/data',
  params: {
    type: 'sell',
    page: 5
  }
})])
```

#### 常见的配置选项

### axios实例

```javascript
const instancel = axios.create({
  baseURL: 'http://152.136.185.210:7878/api/m5',
  timeout: 5000
})

instancel({
  url: '/home/multidata'
}).then(res =>{
  console.log(res);
})
```

**封装**

axios不支持了以后也可以方便地更改

最终最终封装极致优雅方案：

创建network/request.js

```javascript
import axios from "axios";
export function request(config) {
  return new Promise((resolve,reject) =>{
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/m5',
      timeout: 5000
    })

    //发送真正网络请求
    return instance(config)
  })
}
```

main.js调用

```javascript
import {request} from "./network/request";

request({
  url: '/home/multidata'
}).then(res =>{
  console.log(res);
}).catch(err =>{
  console.log(err);
})
```

<font color=#909534>回调</font>

```javascript
funciton test(a,b){
    用a、b进行各种操作
}

使用函数时
test(参数，参数)

当参数是一个函数时
test(function (res){},function (err){});
```

### 拦截器

```javascript
//2.axios的拦截器
instance.interceptors.request.use(aaa =>{
  console.log(aaa);
  return aaa
},err =>{
  console.log(err);
});
```

请求拦截

`instance.interceptors.request.use( , )`

2.1比如config中的一些信息不符合服务器的邀请
2.2比如每次发送网络请求时，都希望在节目中显示一个请求的图标
2.3某些网络请求（比如登陆（token）），必须携带一些特殊的信息

响应拦截

`instance.interceptors.response.use( , )`

# 项目实战

Github托管：

`git clone https://github.com/xiao910888/VueStudy.git`将本低仓库和远程仓库的地址连接起来

`cd VueStudy`

`git add .`

`git commit -m '初始化项目'`

`git push`

还有个`git push -u origin main`

新项目：

### 1.划分目录结构

（指源码，src文件夹里的）

assets

common

components

-common：通用组件，其它项目也可以用。外边拉来的。

-content：针对当前项目的组件

network

router

store

----

### 2.引入css文件

不同浏览器可能有不同的样式，为了统一，可以使用normalize。在github上下载，这里直接复制老师的

除此之外还需要自己写一个base.css表示文件的初始的一些样式，一些全局样式。之后如果添加组件，再写组件的样式。这里直接复制老师的

app.vue组件

```html
<style>
  @import "./assets/css/base.css";
</style>
```

@是style里的引用格式

base.css中

:root ->伪类，用于获取根元素

在:root{}中定义的变量，可以在下面使用。如定义`--large-size: 50px;`

使用：`font-size: var(--large-size);`

--color-text: #666;
--color-high-text: #ff5777;  高亮文字
--color-tint: #ff8198;背景，用来设置导航
--color-background: #fff;背景，白色
--font-size: 14px;
--line-height: 1.5;

<font color=#909534>::before，清除浮动</font>

### 3.别名配置

创建vue.config.js

[CLI2时配置过](#TabBar练习)

内部已经默认配置了'@': 'src'

```javascript
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
      }
    }
  }
}
```

router在所有组件中用的时候，都可以用$router来使用，所以就不取别名了

有了 ` extensions`路径别名就可以不写了，不过这里已经默认配置了.vue .css等

### 4.添加editorconfig

.editorconfig对代码格式进行了规范，原本在CLI2是自动生成了，但是CLI3把它删了。

不代表它不重要！可能是怕不统一，麻烦。

这里把CLI2的editorconfig文件拷贝过来

运行：`npm run serve`←CLI3的运行

### 5.添加tabbar及前端路由

项目的模块划分：tabbar ->路由映射关系

把原本的tabber文件夹拷贝到components>common

把MainTabber文件夹拷贝到components>content

路由版本3.0.2

拷贝原本的cart、category、home、profile

在App.vue中调用`<router-view/>`

6.小图标的修改以及路径问题

直接把要修改的ico文件粘贴到public文件夹里。

在public里的index.html

```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

`<%= BASE_URL %>`是jsp语法，表示动态获取当前文件的所在路径，打包之后就没有啦

public文件夹里的内容在打包时会原封不动装进dist文件夹，类似于之前[CLI2](#Vue CLI2)的static文件夹

### 6.首页开发

#### 6.1首页导航栏的封装和使用

老师的风格：文件夹名字用小写，组件名字都大写

div不取id名，取class。因为其它地方也会用到导航。。。

slot标签上不要写class布局，建议包装一个div，在div上写class

样式：

一般导航栏高度为44px，如果加上状态栏44+20=64px

`line-height: 44px;`能够让文字上下居中，且直接撑起div（必须有文字才行！！老师又翻车了..），不用写height了。

小诀窍：webstorm中bgc+Tab，可以在css里写

```css
background-color: #fff;
```

NavBar.vue

```vue
<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar{
    display: flex;
    line-height: 44px;
    height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }
  .left,.right{
    width: 60px;
  }
  .center{
    flex: 1;
  }
</style>

```

样式，left和right都确定之后，center如果flex为1，就表示把剩下的部分全部填充完毕。

home.vue组件中引用

```vue
<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
```

样式

```css
.home-nav {
  background-color: var(--color-tint);
  color: white;
}
```

背景颜色传参，可以使用之前[:root](#2.引入css文件)中定义的变量

#### 6.2网络模块的封装

在原来的基础上**[网络模块封装](# 网络模块封装)：**

network文件夹，直接把[之前写好的](#网络模块封装)request.js文件拷贝过来。

安装：`npm install axios@0.18.0 --save`

要在开发者模式下哦

只有default导出时，导入的时候不用加大括号

再为home再封装一次：home.js

```javascript
import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
```

**存储数据：**

函数调用  -> 压入函数栈（保存函数调用过程中所有变量）

函数调用结束 ->弹出函数栈（释放函数所有变量）

在要用到数据的home.vue中

```javascript
created() {
  //1.请求多个数据
  getHomeMultidata().then(res =>{
    //this.result = res;
    this.banners = res.data.banner.list;
    this.recommends = res.data.recommend.list;
  })
}
```

并用data存储数据

```javascript
data(){
  return{
    banners:[],
    recommends:[]
  }
},
```

回收的是引用（指针），对象没被回收。只要有一个引用指向对象，对象就不会回收

#### 6.3轮播图的展示

老师，不讲了。。swiper。以后用到一般也都是插件，直接用。可以官网直接下载vue-awesome-swiper

老师自己写的Swiper.vue中的一些自定义参数解释：

interval——每张图的停留时间

animDuration——延迟多久才开始轮播

moveRatio——比例，手动滚到0.25时就滚下一个

showIndicator——是否显示下面的指示

```javascript
props: {
  interval: {
  type: Number,
    default: 3000
  },
  animDuration: {
  type: Number,
    default: 300
  },
  moveRatio: {
    type: Number,
    default: 0.25
  },
  showIndicator: {
    type: Boolean,
    default: true
  }
},
```

使用index.js把Swiper和SwiperItem统一导出

```javascript
import Swiper from './Swiper'
import SwiperItem from './SwiperItem'

export {
  Swiper, SwiperItem
}
```

导入的话

```javascript
import {Swiper,SwiperItem} from 'components/common/swiper'
```

↑一直到文件夹就可以。不过注册的时候两个还是都要写的。

再封装一个HomeSwiper组件（放在home文件夹里，因为是针对home的）

```
<swiper>
  <swiper-item v-for="item in banners">
    <a :href="item.link">
      <img :src="item.image">
    </a>
  </swiper-item>
</swiper>
```

传参数时

```javascript
props: {
  banners: {
    type: Array,
      default() {
        return []
      }
  }
}
```

父组件home中，数据 父传子

```html
<HomeSwiper :banners="banners"/>
```

有的人v-for会报错，可以在后面绑定个key为item.id

github上有很多第三方库、mint-ui、view

#### 6.4推荐信息的展示

RecommendView.vue组件，放在home/CildComps中

```vue
<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type:Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 12px;

    padding: 10px 0 20px;
    border-bottom: 8px solid #EEEEEE;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
```

[padding](https://www.w3school.com.cn/cssref/pr_padding.asp): 10px 0 20px;

设置元素所有内边距的宽度，上 左右 下

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714153011865.png" style="zoom:50%;" />

#### 6.5本周流行 FeatureView的封装

就是一张带链接的图片。也搞一个vue封装。

```vue
<template>
  <div class="feature">
    <a href="www.beidu.com">
      <img src="~assets/img/home/recommend_bg.jpg" />
    </a>
  </div>
</template>

<script>
  export default {
    name: "FeatureView"
  }
</script>

<style scoped>
  .feature img{
    width: 100%;
  }
</style>
```

绝对定位absolute和固定定位fixed都会脱标，也就是不占位置，可以用sticky粘性定位

又讲了下css

#### 6.6 TabControl的封装

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714174455209.png" alt="image-20210714174455209" style="zoom:50%;" />

老师把这个组件放到了content业务相关文件夹里

如果只是文字不一样的话，样式都一样，就没必要搞插槽了。

TabControl.vue

```vue
<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active:index===currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex=index;
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
/*可以继承*/
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>

```

使用v-for来展示。

在网页开发的时候使用div和span都可以，通常可以理解为没有什么区别。但注意的是div占用一行，span不会占用一行，内容占多大宽度，span就有多宽。

单击后，选中哪个，哪个变红。:class

**吸顶效果的简单实现：**

加了better-scroll的非原生滚动效果后，吸顶的设置见[6.14TabControl的吸顶效果](#6.14TabControl的吸顶效果（使用better-scroll后）)

在首页单独设置实现（因为有的TabControl不一定需要这个效果）

```css
.tab-control{
  position: sticky;
  top: 44px;
}
```

在未滚动到xxx时 ，默认为static。当达到滚动到某值时，浏览器会把position自动改为fixed。移动端一般都适配这个属性，但是ie不一定

#### 6.7保存商品的数据结构设计

**保存数据：**

防止复用：绑定key

变量中存储着：流行/新款/精选，一次性请求、存储。

goods:(流行[30]/新款/精选)

```javascript
goods:{
  'pop':{page:0,list:[]},
  'new':{page:0,list:[]},
  'sell':{page:0,list:[]},
}
```

page记录当前加载到第几页了，list记录当前已经加载了多少数据了

**请求数据：**

网络设置network/home.js里：

```javascript
export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
```

一般情况下，create里只写主要逻辑，具体方法还是在methods里写

```javascript
created() {
  //1.请求多个数据
  this.getHomeMultidata()

  //2.请求商品数据
  this.getHomeGoods('pop')
  this.getHomeGoods('new')
  this.getHomeGoods('sell')
},
methods: {
  getHomeMultidata(){
    getHomeMultidata().then(res =>{
      //this.result = res;
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  },
  getHomeGoods(type){
    const page = this.goods[type].page +1
    getHomeGoods(type,page).then(res =>{
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page +=1
    })
  }
}
```

[在数组后面批量增加数据](#在数组后面批量增加数据)

goods里面存储当前加载的页码page，每新申请一页，page也加1。

#### 6.8首页商品数据的展示

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714224559178.png" alt="image-20210714224559178" style="zoom: 67%;" />

GoodsListItem和GoodsLIst两个组件都放在content/goods，因为其它页面也可能要复用。

**传数据**：

父传子 Home -> GoodsList

父

```html
<goods-list :goods="goods['pop'].list"/>
```
子：GoodsList里以Goods的名字接收全部信息
```javascript
props: {
  goods:{
    type: Array,
    default() {
      return []
    }
  }
}
```

子传孙 GoodsList ->GoodsListItem

子

```html
<goods-list-item v-for="item in goods" :goods-item="item" class="item"/>
```

孙

```javascript
props:{
  goodsItem: {
    type: Object,
    default() {
      return null
    }
  }
}
```

GoodsListItem中的商品信息展示：

```html
<div class="goods-item">
  <img :src="goodsItem.show.img" alt="">
  <div class="goods-info">
    <p>{{goodsItem.title}}</p>
    <span class="price">{{goodsItem.price}}</span>
    <span class="collect">{{goodsItem.cfav}}</span>
  </div>
</div>
```

样式解释：

GoodListItem

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714225627667.png" alt="image-20210714225627667" style="zoom:67%;" />

```css
.goods-item {
  padding-bottom: 40px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
```

子绝父相：子组件绝对定位，父组件相对定位

border-radius: 5px;——图片圆角

[overflow](https://www.w3school.com.cn/cssref/pr_pos_overflow.asp): hidden;——规定当内容溢出元素框时发生的事情。

那个url是收藏的☆的图片

GoodList

```css
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  /*padding: 5px;*/
}
.goods .item{
  width: 48%;
  /*flex: 1 0 auto;*/
}
```

[flex-wrap](https://www.w3school.com.cn/cssref/pr_flex-wrap.asp) 属性规定弹性项目是否应换行，不设置的话，因为flex，所有卡都会挤在同一行。把每一项小item都缩小到50%以下一点点，这样一行就能显示2个卡

[justify-content](https://www.w3school.com.cn/cssref/pr_justify-content.asp) 属性（水平）对齐弹性容器的项目，当项目不占用主轴上所有可用空间时。垂直对齐用 align-items 

| 属性          | 描述                                                  |                                                              |      |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------------ | ---- |
| space-around  | 项目在行之前、行之间和行之后留有空间。                | <img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714231415057.png" alt="image-20210714231415057" style="zoom:50%;" /> |      |
| space-evenly  | 均匀排列每个元素,每个元素之间的间隔相等（兼容性较差） | <img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714231229585.png" alt="image-20210714231229585" style="zoom:50%;" /> |      |
| space-between | 项目在行与行之间留有间隔。                            | <img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714231532201.png" alt="image-20210714231532201" style="zoom:50%;" /> |      |
| ……            |                                                       |                                                              |      |

[z-index](https://www.w3school.com.cn/cssref/pr_pos_z-index.asp) 设置元素的堆叠顺序，如果为正数，则离用户更近，为负数则表示离用户更远。

#### 6.9TabControl点击切换商品

TabControl中的点击事件传给父组件Home

$emit，逗号后面是传的参数

```javascript
itemClick(index){
  this.currentIndex=index;
  this.$emit('tabClick',index)
}
```

Home中接收

```html
<tab-control class="tab-control"
             :titles="['流行','新款','精选']" @tabClick="tabClick"/>
```

method方法：

```javascript
tabClick(index){
  this.currentType = Object.keys(this.goods)[index]
  //老师写了个switch
},
```

又用计算属性computed封装了一下

```javascript
showGoods() {
  return this.goods[this.currentType].list
}
```

传列表数据展示：

```
<goods-list :goods="showGoods"/>
```

#### 6.10上拉加载更多

![image-20210716141452603](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210716141452603.png)

在Profile.vue中简单的演示

对Better-Scroll进行封装：Scroll.vue

Home.vue和Scroll.vue之间进行通信

- Home.vue将probeType设置为3
- Scroll.vue需要通过$emit，实时将事件发送到Home.vue

前置知识：[Better-Scroll](#7.丝滑滑动——Better-Scroll)

和[8.2](8.2BackTop的显示和隐藏)一样，用data变量传参记录是否要用到上拉加载功能。

Scroll.vue

```javascript
//3.监听上拉事件
this.scroll.on('pullingUp',() =>{
  this.$emit('pullingUp')
})
```

并且在methods里封装了一个finishPullUp方法

```javascript
finishPullUp(){
  console.log('结束pullup')
  this.scroll.finishPullUp()
}
```

在home中的scroll组件 @pullingUp="loadMore"

```javascript
loadMore(){
  console.log('我加载了！')
  this.getHomeGoods(this.currentType)

  this.$refs.scroll.scroll.refresh()
},
```

因为上拉后图片都是异步加载的，所以刚上拉完，计算content高度时没有把图片算进去。所以每次加载完新数据后，需要refresh一下页面

而，每次pullup都需要一个funishPullUp。加载完数据之后再finish

```javascript
getHomeGoods(type){
  const page = this.goods[type].page +1
  getHomeGoods(type,page).then(res =>{
    this.goods[type].list.push(...res.data.list)
    this.goods[type].page +=1

    this.$refs.scroll.finishPullUp()
  })
}
```





#### 6.11滚动区域的Bug分析和解决——事件总线

 [observe-dom](https://better-scroll.github.io/docs/zh-CN/plugins/observe-dom.html#observe-dom):开启对 content 以及 content 子元素 DOM 改变的探测。当插件被使用后，当这些 DOM 元素发生变化时，将会触发 scroll 的 refresh 方法。

[observe-image](https://better-scroll.github.io/docs/zh-CN/plugins/observe-image.html#%E4%BB%8B%E7%BB%8D):开启对 wrapper 子元素中图片元素的加载的探测。无论图片的加载成功与否，都会自动调用 BetterScroll 的 refresh 方法来重新计算可滚动的宽度或者高度。对于已经用 CSS 确定图片宽高的场景，不应该使用该插件，因为每次调用 refresh 对性能会有影响。只有在图片的宽度或者高度不确定的情况下，你才需要它。

↑这是2.x的文档

原生的js监听图片：img.onload = function(){}

Vue中监听：@load='方法'

爷孙通信：vuex、事件总线

在main.js里

```javascript
Vue.prototype.$bus = new Vue()
```

vue可以作为一个实例定义

发射：this.\$bus.$emit('事件名称',参数)

接收：this.\$bus.$on('事件名称',回调函数(参数))

#### 6.12处理加载异步导致的错误

```javascript
this.$refs.scroll && this.$refs.scroll.refresh()
```

```javascript
this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
```

```javascript
this.scroll && this.scroll.refresh()
```

#### 6.13（看不懂）刷新频繁的防抖函数处理

对于refresh非常频繁的问题，进行防抖操作

防抖debounce、节流throttle

防抖函数起作用的过程：

如果我们直接执行refresh，那么refresh函数会被执行30次。

可以将refresh函数传入到debounce函数中，生成一个新的函数

之后在调用非常频繁的时候，就使用新生成的函数

而新生成的函数，并不会非常频繁的调用，如果下一次执行来的非常快，那么会将上一次取消掉

```javascript
debounce(func,delay){
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() =>{
      func.apply(this,args)
    },delay)
  }
},
```

每加载一个东西，所花的时间计入timer。很快加载第二次的时候，有。。。

延时器不断被顶掉

只要是setTimeout，都会加入到下一次循环的末尾，即使没有写延迟，但是还是会先执行主要的。

#### 6.14TabControl的吸顶效果（使用better-scroll后）

**获取到tabControl的offsetTop：**

必须知道滚动到多少时，进行吸顶。（跟返回顶部的做法类似）这个时候就需要获取tabControl的offsetTop

但是，如果直接在mounted中获取tabControl的offsetTop，那么值是不正确的。如何获取正确的值↓

1、监听HomeSwiper中img的加载完成

```html
<img :src="item.image" alt="" @load="imageLoad">
```

```javascript
imageLoad(){
  if(!this.isLoad){
    this.$emit('swiperImageLoad')
    this.isLoad = true
  }
```

补充：为了不让HomeSwiper多次发出时间，可以使用isLoad的变量进行状态的记录（节流）

2、加载完成后。发出事件，在Home.vue中，获取正确的值

```html
<HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
```

```javascript
swiperImageLoad(){
  this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
},
```

tabOffsetTop记录当前组件的位置

（为了方便显示，我们用两个一模一样的tabControl，一个滚动，一个固定 时隐时现，来模拟表现粘滞效果。所以这里取的是第2个会滚动的tabControl）

注意：这里不进行多次调用。和debounce的区别 ※

所有的组件都有一个属性$el:用于获取组件中的元素

监听滚动，动态的改变tabControl的样式

对于tabControl1，

`v-show="isTabFixed"`，其中isTabFixed在滚动事件中改变

```javascript
contentScroll(position){
  //1判断BackTop是否显示
  this.isShowBackTop = - position.y > 1000

  //2.决定tabControl是否吸顶(position:fixed)
  this.isTabFixed = (-position.y) > this.tabOffsetTop
},
```

另，因为有了2个tabControl，所以点击事件的标签显示也要同步

```javascript
tabClick(index){
  this.currentType = Object.keys(this.goods)[index]
  //老师写了个switch
  this.$refs.tabControl1.currentIndex = index;
  this.$refs.tabControl2.currentIndex = index;
},
```

滚动的content采用绝对定位，tabControl都采用相对定位

#### 6.15Home离开时记录状态和位置

在app.vue使用keep-alive

```html
<keep-alive>
  <router-view/>
</keep-alive>
```

但是用了better-scroll可能又会带来问题。。（据说2.0修复了？？）

```javascript
activated() {
  this.$refs.scroll.refresh()
  this.$refs.scroll.scrollTo(0,this.saveY,0)
},
deactivated() {
  this.saveY = this.$refs.scroll.scroll.y
},
```

离开时，保存一个位置信息saveY

进来时，将位置设置为原来保存的位置saveY信息即可

注意：最好回来时，进行一次refresh()

### 7.丝滑滑动——Better-Scroll

#### 7.1在index.html中使用Better-Scroll

iscroll，很多年不维护了，不再更新

[better-scroll](https://github.com/ustbhuangyi/better-scroll)，参考了iscroll的源码，还在一直更新维护！！(2021.7.15)

可以用npm install下，可以在官网上下了用\<script>引用。←github工程里找到dist文件夹下载，也是包含了全部源码

安装：`npm install better-scroll@1.13.2 --save`

原生局部滚动：

```css
.content {
  height: 150px;
  /*overflow: hidden;*/
  overflow-y: scroll;
}
```

BScroll

![image-20210715150347248](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210715150347248.png)

引入：

```
import BScroll from 'better-scroll'
```

组件创建完之后才调用create()，所以组件设置要在mounted里，data中存储scroll变量。

```javascript
data() {
  return {
    scroll:null
  }
},
mounted() {
  // console.log(this.$refs.aaaa);
  // console.log(document.querySelector('.wrapper'))

  this.scroll = new BScroll(document.querySelector('.wrapper'),{

  })
}
```

BetterScroll 默认处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略。

```html
<div class="wrapper" ref="aaaa">
  <ul class="content">
    <li>分类列表1</li>
    <li>分类列表2</li>
    <li>分类列表3</li>
    <li>分类列表4</li>
    <li>分类列表5</li>
  </ul>
</div>
```

样式

```css
.wrapper {
  height: 150px;
  background-color: red;

  overflow: hidden;
  /*overflow-y: scroll;*/
}
```

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210715154832863.png" alt="image-20210715154832863" style="zoom:50%;" />

甚至都有底部弹簧效果

默认情况下，BScroll不能实时监听滚动位置

probe：侦测。

probeType 为 0 时，不侦测；

为1时，要设置momentumLimitTime，好像是侦测上拉下拉？？；

为2时，在手指滚动的过程中侦测，手指离开后的惯性滚动中不侦测；

为3时，只要是滚动，都侦测。

原生监听：

```javascript
document.querySelector('.btn').addEventListener('click',function () {
  console.log('----')
})
```

上拉加载更多：

[pull-up](https://better-scroll.github.io/docs/zh-CN/plugins/pullup.html#%E7%A4%BA%E4%BE%8B)

为了解耦 BetterScroll 1.x 的各个 feature 的功能，防止 bundle 体积无限制的增加。在 2.x 的架构设计当中，采用了『插件化』 的架构设计。对于 1.x 的各个 feature，在 2.x 都将以 Plugin 的形式实现。

安装：`npm install @better-scroll/pull-up --save`

content必须有一个固定高度，它是不能无限滚动的。

html文件里的实现

```html
<script src="./bscroll.js"></script>
<script>
  const bscroll = new BScroll(document.querySelector('.content'),{
    probeType:3,
    click:true,
    pullUpLoad: true
  })

  bscroll.on('scroll',(position)=> {
   // console.log(position);
  })

  bscroll.on('pullingUp',() =>{
    console.log('上拉加载更多')
    //发送网络请求，请求更多页的数据

    //等数据请求完成，并且将新的数据展示出来后
    setTimeout(() =>{
      bscroll.finishPullUp()
    },2000)
  })
</script>
```

引入、传属性、引用函数

`finishPullUp()`：结束上拉加载行为。每次触发 `pullingUp` 钩子后，你应该**主动调用** `finishPullUp()` 告诉 BetterScroll 准备好下一次的 pullingUp 钩子。

#### 7.2在Vue项目中使用Better-Scroll

**组件封装**

要是都用wrapper，到时候在document.querySelector('.wrapper',{})中就会有定义不准确的问题。因为可能会有很多的wrapper。

所以用[ref](#父访问子)（※待完善），this.$refs.aaaa。

ref如果是绑定在组件中，那么通过this.\$refs.refname获取到的是一个组件对象。

ref如果是绑定在普通元素中，那么通过this.\$refs.refname获取到的是一个元素对象。

scroll.vue

套2个div，因为插槽里的东西替换后可能不是一个单一div，会使得滚动失效（因为BetterScroll 默认处理容器（wrapper）的第一个子元素（content）的滚动）

```vue
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true
      })
    }
  }
</script>
```

home.vue中调用

把他们都放到插槽里

```html
<scroll class="content">
  <HomeSwiper :banners="banners"/>
  <recommend-view :recommends="recommends"/>
  <FeatureView/>
  <tab-control class="tab-control"
               :titles="['流行','新款','精选']" @tabClick="tabClick"/>
  <goods-list :goods="showGoods"/>
</scroll>
```

样式：两种写法

```css
  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
/*  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
  }*/
```

滚不动的话，加上observeDOM: true

home高度

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210715220654296.png" alt="image-20210715220654296" style="zoom:50%;" />

vh ->viewport height 视口

100vh表示100%视口。50vh表示50%视口

### 8.回到顶部——BackTop组件

#### 8.1BackTop组件的封装

BackTop.vue

```vue
<template>
  <div class="back-top" >
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 55px;
  }
  .back-top img{
    width: 43px;
    height: 43px;
  }
</style>
```

#### 8.2如何监听组件的点击

在home中

```
<back-top @click.native="backClick"/>
```

组件不能直接监听点击，可以增加v-on修饰符[.native]()，监听组件根元素的原生事件

※补全，待完善

在我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符才能进行监听

vue3.0已经删除了native修饰符。。。。

点击后回到首页：

```javascript
backClick(){
  this.$refs.scroll.scrollTo(0,0)
},
```

↑原本是

```
this.$refs.scroll.scroll.scrollTo(0,0,5000)
```

表示用$refs取home中的scroll组件，再取scroll组件中的scroll方法中的scrollTo(0,0,500)函数。在500毫秒内滑动到x=0、y=0的位置。

但是我们在Scroll组件中封装了一下方法：

Scroll.vue

```javascript
methods: {
  scrollTo(x,y,time=300){
    this.scroll.scrollTo(x,y,time)
  }
}
```

默认用300毫秒完成指令。这样home中调用子组件的方法会更简洁。

#### 8.3BackTop的显示和隐藏

本节涉及大量[Scroll知识](#7.丝滑滑动——Better-Scroll)

scroll的click属性，如果滚动元素里有button，可以点。但是div必须要click:true

计算机中没有黑魔法

有的需要实时监听滚动区域，有的不需要。在不需要的时候监听会影响性能。

better-scroll 2.x，pullUpLoad:true的话，自带probeType:3

所以在Scroll组件中增加父传子变量probeType，记录是否要监听。默认不监听

```javascript
props: {
  probeType: {
    type: Number,
    default: 0
  }
},
```

```javascript
mounted() {
  //1.创建BScroll对象
  this.scroll = new BScroll(this.$refs.wrapper,{
    click: true,
    probeType: this.probeType
  })

  //2.监听滚动的位置,并返回调用父组件函数，传参position
  this.scroll.on('scroll',(position) =>{
    this.$emit('scroll',position)
  })
},
```

而在home父组件中

```html
<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
```

:probe-type="3"  传参数，表示要监听滚动。必须加冒号：，即v-bind绑定，如果不加，"3"会被当成一个字符串。

父组件@scroll接收，并调用父组件home里的函数contentScroll(position)

```javascript
contentScroll(position){
  this.isShowBackTop = position.y < -1000
},
```

表示向下滑超过1000时，就显示组件BackTop

isShowBackTop是一个在data中定义的变量，默认为false

```javascript
isShowBackTop: false
```

用来控制back-top组件是否显示

```html
<back-top @click.native="backClick" v-show="isShowBackTop"/>
```

### 9.详情页开发

#### 9.1跳转到详情页并且携带iid

详情页又是一个路由页。在views文件夹里创建detail/Detail.vue，并且到router/index.js里注册。因为使用动态路由的方式（也可以query）跳转，所以配置↓

```javascript
{
  path: '/detail/:id',
  component: Detail
}
```

在GoodsListItem里注册一个点击事件

```javascript
itemClick(){
  this.$router.push('/detail/'+ this.goodsItem.iid)
}
```

在Detail页面接收

```javascript
data(){
  return{
    iid:null
  }
},
created() {
  this.iid = this.$route.params.id
}
```

#### 9.2导航栏的封装

```vue
<template>
  <div >
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             :class="{active:index==currentIndex}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data(){
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index){
        this.currentIndex=index
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 15px;
    text-align: center;
  }
  .title-item {
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    vertical-align: middle;
  }
</style>
```

[vertical-align](https://www.w3school.com.cn/cssref/pr_pos_vertical-align.asp)：设置元素的垂直对齐方式。

9.3数据请求及轮播图展示

数据请求：

仿home，新建network/detail.js

```javascript
import {request} from './request'

export function getDetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
```

在detail页面创建的时候，create()函数里添加：

```javascript
//2.根据iid请求详情数据
getDetail(this.iid).then(res =>{
  this.topImages = res.result.itemInfo.topImages
})
```

res后面那一截是发来的数据里的结构

topImages是之前定义的数据，默认为[]。

新建一个detail/childComps/DetailSwiper.vue组件。类似HomeSwiper。

出现问题：当图片还没加载完全时，轮播图已经加载。使得只能显示1张图。

解决：在轮播图组件里延长setTimeout

#### 9.3商品基本信息的展示

数据整合

垃圾服务器传过来的数据十分凌乱。

在detail.js中添加一个类

```javascript
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
```

在Detail中定义一个goods，初始为{}。在created中

```javascript
const data =res.result
this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
```

创建组件DetailBaseInfo，大部分都是我自己写哒！！

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210717170745028.png" alt="image-20210717170745028" style="zoom:50%;" />

```vue
<template>
  <div class="base">
    <div class="price">
      <span class="price-n">{{goods.newPrice}}</span>
      <span class="price-o">{{goods.oldPrice}}</span>
      <span class="price-dis" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="title"> {{goods.title}}</div>
    <div class="other">
      <span v-for="item in goods.columns">{{item}}</span>
    </div>
    <div class="service">
      <span v-for="item in goods.services">
        <img :src="item.icon">
        <span>{{item.name}}</span>
      </span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props:{
      goods:{
        type: Object
      }
    }
  }
</script>

<style scoped>
  .base {
    margin-top: 6px;
  }
  .price{
    padding: 0 8px;
  }
  .price .price-n{
    font-size: 35px;
    color: var(--color-high-text);
  }
  .price .price-o{
    font-size: 15px;
    margin-left: 6px;
    margin-right: 6px;
    color: #999;
    text-decoration: line-through;
  }
  .price .price-dis{
    background-color: var(--color-high-text);
    color: #fff;
    padding: 3px;
    border-radius: 3px;
    font-size: 13px;
    /*用绝对定位表现上浮*/
    position: relative;
    top: -11px;
  }
  .title{
    font-size: 19px;
    font-weight: 600;
    line-height: 25px;
    margin-top: 11px;
    padding: 0 5px;
  }
  .other{
    display: flex;
    justify-content: space-between;
    padding: 9px 8px;
    font-size: 13px;
    color: #999;
    border-bottom: 1px solid rgba(100,100,100,0.2);
  }
  .service{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 8px;
    line-height: 22px;
    font-size: 14px;
    border-bottom: 1px solid rgba(100,100,100,0.2);
  }
  .service span{
    padding: 0 2px;
  }
  .service img{
    height: 12px;
    width: 12px;
  }
</style>
```

[border-bottom](https://www.w3school.com.cn/cssref/pr_border-bottom.asp): 简写属性。把下边框的所有属性设置到一个声明中。

可以按顺序设置如下属性：

border-bottom-width
[border-bottom-style](https://www.w3school.com.cn/cssref/pr_border-bottom-style.asp)：其中solid表示实线
border-bottom-color

9.4店铺信息的展示

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210717213610455.png" alt="image-20210717213610455" style="zoom:50%;" />

数据整合

数据展示

评价的展示可以用table，更整齐

```html
<span class="shop-score">
  <table>
    <tr v-for="item in shop.score">
      <td>{{item.name}}</td>
      <td class="better-ss" :class="{'better-s': item.isBetter}">{{item.score}}</td>
      <td class="better-tt" :class="{'better-t': item.isBetter}">{{item.isBetter?'高':'低'}}</td>
    </tr>
  </table>
</span>
```

↑注意这里用了比较。当item.isBetter为true or false，结果是不一样的！！

把方图片裁成圆border-radius: 50%;

加粗 font-weight: 600;

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210717214547740.png" alt="image-20210717214547740" style="zoom: 67%;" />

#### 9.4覆盖tabbar

商品详情页不需要展示首页、购物车balabala，（应该展示加入购物车之类的）

增加z-index，并且把背景上色

```css
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
```

#### 9.5滚动

```html
<detail-nav-bar class="detail-nav-bar"/>
<scroll class="content">
  <detail-swiper :top-images="topImages" />
  <detail-base-info :goods="goods"/>
  <detail-shop-info :shop="shop"/>
</scroll>
```
用relative
```css
.detail-nav-bar{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100vh - 44px);
  /*overflow: hidden;*/
}
```

我觉得用hidden也可以

#### 9.6商品详情数据展示

敲不动了，复制的老师的。

[watch](https://cn.vuejs.org/v2/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8)：用来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。使用 `watch` 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。



# 小知识点

## 字符串分割

```javascript
const names = newValue.split(' ');
```

对字符串分割、截取，最后结果保存在names[]中

## 生命周期函数

![image-20210711100210885](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210711100210885.png)

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

## 对象的解构

从对象中取任意元素（顺序不用管）

```javascript
const obj = {
  name: 'YY',
  age: 18,
  height: 1.88,
  address: '洛杉矶'
}

const {name,height,age}=obj;
```

*数组的解构

```javascript
const names = ['why','kobe','james']
const [name1,name2,name3]=names;
```

## 在数组后面批量增加数据

```javascript
let totalNums = []
const nums1 = [20,11,222]
const nums2 = [111,22,333]

totalNums.push(...nums1)

for (let n of nums1){
  totalNums.push(n)
}
```

如果用totalNums.push(nums1)，相当于会把整个num1数组当成一个元素，11，22， [20,11,222]，添加进去。

## 浏览器页面显示异常

在html文件顶增加

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
```

## style scoped

vue组件中的样式，常有

```vue
<style scoped></style>
```

添加了scoped，使得样式私有化。一个组件样式的改变不会影响到其它组件。


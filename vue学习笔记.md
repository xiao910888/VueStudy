
目录：


一、[邂逅Vuejs](https://github.com/xiao910888/VueStudy/blob/main/vue%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md#%E9%82%82%E9%80%85vuejs)

二、Vue基础语法

三、[组件化开发](https://github.com/xiao910888/VueStudy/blob/main/vue%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md#%E7%BB%84%E4%BB%B6%E5%8C%96%E5%BC%80%E5%8F%91)



基础语法、父子组件的笔记在另一边，我会尽快补上。



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

![image-20210707193911808](vue%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.assets/image-20210707193911808.png)

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

![image-20210707195219667](vue%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.assets/image-20210707195219667.png)

## vue中的MVVM

Model View		ViewModel

![image-20210707195342841](vue%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.assets/image-20210707195342841.png)

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

# 组件化开发  

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

![image-20210707110422055](vue%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.assets/image-20210707110422055.png)

#### 前端模块化

#### 和grunt/gulp的对比

grunt/gulp的核心是Task

如果工程模块依赖非常简单，甚至是没有用到模块化的概念。只需要进行简单的合并、压缩，就使用grunt/gulp即可。

如果整个项目使用了模块化管理，而且相互依赖非常强，使用webpack<font color=#909534 >[强调模块化开发管理]</font>打包。

![image-20210707112628116](vue%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.assets/image-20210707112628116.png)

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

![image-20210707155146527](vue%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.assets/image-20210707155146527.png)

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

#### less文件处理

[`less-loader`](https://webpack.docschina.org/loaders/less-loader) 加载并编译 LESS 文件

安装：`npm install --save-dev less-loader less@4.1.0`

#### 图片文件的处理

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

![image-20210707230522018](vue%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.assets/image-20210707230522018.png)

### 搭建本地服务器

# Vue CLI详解



# vue-router

# Vuex详解

# 网络封装

# 项目实战




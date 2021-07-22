# supermall购物网站-项目开发笔记

视频资源来自：b站coderwhy王红元老师——[最全最新Vue、Vuejs教程，从入门到精通](https://www.bilibili.com/video/BV15741177Eh)

---

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
module.exports = {  configureWebpack: {    resolve: {      alias: {        'assets':'@/assets',        'common':'@/common',        'components':'@/components',        'network':'@/network',      }    }  }}
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
<template>  <div class="nav-bar">    <div class="left"><slot name="left"></slot></div>    <div class="center"><slot name="center"></slot></div>    <div class="right"><slot name="right"></slot></div>  </div></template><script>  export default {    name: "NavBar"  }</script><style scoped>  .nav-bar{    display: flex;    line-height: 44px;    height: 44px;    text-align: center;    box-shadow: 0 1px 1px rgba(100,100,100,.1);  }  .left,.right{    width: 60px;  }  .center{    flex: 1;  }</style>
```

样式，left和right都确定之后，center如果flex为1，就表示把剩下的部分全部填充完毕。

home.vue组件中引用

```vue
<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
```

样式

```css
.home-nav {  background-color: var(--color-tint);  color: white;}
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
import {request} from "./request";export function getHomeMultidata() {  return request({    url: '/home/multidata'  })}
```

**存储数据：**

函数调用  -> 压入函数栈（保存函数调用过程中所有变量）

函数调用结束 ->弹出函数栈（释放函数所有变量）

在要用到数据的home.vue中

```javascript
created() {  //1.请求多个数据  getHomeMultidata().then(res =>{    //this.result = res;    this.banners = res.data.banner.list;    this.recommends = res.data.recommend.list;  })}
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
import Swiper from './Swiper'import SwiperItem from './SwiperItem'export {  Swiper, SwiperItem}
```

导入的话

```javascript
import {Swiper,SwiperItem} from 'components/common/swiper'
```

↑一直到文件夹就可以。不过注册的时候两个还是都要写的。

再封装一个HomeSwiper组件（放在home文件夹里，因为是针对home的）

```
<swiper>  <swiper-item v-for="item in banners">    <a :href="item.link">      <img :src="item.image">    </a>  </swiper-item></swiper>
```

传参数时

```javascript
props: {  banners: {    type: Array,      default() {        return []      }  }}
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
<template>  <div class="recommend">    <div v-for="item in recommends" class="recommend-item">      <a :href="item.link">        <img :src="item.image" alt="">        <div>{{item.title}}</div>      </a>    </div>  </div></template><script>  export default {    name: "RecommendView",    props: {      recommends: {        type:Array,        default() {          return []        }      }    }  }</script><style scoped>  .recommend {    display: flex;    text-align: center;    font-size: 12px;    padding: 10px 0 20px;    border-bottom: 8px solid #EEEEEE;  }  .recommend-item {    flex: 1;  }  .recommend-item img {    width: 70px;    height: 70px;    margin-bottom: 10px;  }</style>
```

[padding](https://www.w3school.com.cn/cssref/pr_padding.asp): 10px 0 20px;

设置元素所有内边距的宽度，上 左右 下

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714153011865.png" style="zoom:50%;" />

#### 6.5本周流行 FeatureView的封装

就是一张带链接的图片。也搞一个vue封装。

```vue
<template>  <div class="feature">    <a href="www.beidu.com">      <img src="~assets/img/home/recommend_bg.jpg" />    </a>  </div></template><script>  export default {    name: "FeatureView"  }</script><style scoped>  .feature img{    width: 100%;  }</style>
```

绝对定位absolute和固定定位fixed都会脱标，也就是不占位置，可以用sticky粘性定位

又讲了下css

#### 6.6 TabControl的封装

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210714174455209.png" alt="image-20210714174455209" style="zoom:50%;" />

老师把这个组件放到了content业务相关文件夹里

如果只是文字不一样的话，样式都一样，就没必要搞插槽了。

TabControl.vue

```vue
<template>  <div class="tab-control">    <div v-for="(item,index) in titles"         class="tab-control-item"         :class="{active:index===currentIndex}"         @click="itemClick(index)">      <span>{{item}}</span>    </div>  </div></template><script>  export default {    name: "TabControl",    props: {      titles: {        type: Array,        default() {          return []        }      }    },    data(){      return {        currentIndex: 0      }    },    methods: {      itemClick(index){        this.currentIndex=index;      }    }  }</script><style scoped>  .tab-control{    display: flex;    text-align: center;    font-size: 15px;/*可以继承*/    height: 40px;    line-height: 40px;    background-color: #fff;  }  .tab-control-item{    flex: 1;  }  .tab-control-item span {    padding: 5px;  }  .active{    color: var(--color-high-text);  }  .active span{    border-bottom: 3px solid var(--color-tint);  }</style>
```

使用v-for来展示。

在网页开发的时候使用div和span都可以，通常可以理解为没有什么区别。但注意的是div占用一行，span不会占用一行，内容占多大宽度，span就有多宽。

单击后，选中哪个，哪个变红。:class

**吸顶效果的简单实现：**

加了better-scroll的非原生滚动效果后，吸顶的设置见[6.14TabControl的吸顶效果](#6.14TabControl的吸顶效果（使用better-scroll后）)

在首页单独设置实现（因为有的TabControl不一定需要这个效果）

```css
.tab-control{  position: sticky;  top: 44px;}
```

在未滚动到xxx时 ，默认为static。当达到滚动到某值时，浏览器会把position自动改为fixed。移动端一般都适配这个属性，但是ie不一定

#### 6.7保存商品的数据结构设计

**保存数据：**

防止复用：绑定key

变量中存储着：流行/新款/精选，一次性请求、存储。

goods:(流行[30]/新款/精选)

```javascript
goods:{  'pop':{page:0,list:[]},  'new':{page:0,list:[]},  'sell':{page:0,list:[]},}
```

page记录当前加载到第几页了，list记录当前已经加载了多少数据了

**请求数据：**

网络设置network/home.js里：

```javascript
export function getHomeGoods(type,page) {  return request({    url:'/home/data',    params:{      type,      page    }  })}
```

一般情况下，create里只写主要逻辑，具体方法还是在methods里写

```javascript
created() {  //1.请求多个数据  this.getHomeMultidata()  //2.请求商品数据  this.getHomeGoods('pop')  this.getHomeGoods('new')  this.getHomeGoods('sell')},methods: {  getHomeMultidata(){    getHomeMultidata().then(res =>{      //this.result = res;      this.banners = res.data.banner.list;      this.recommends = res.data.recommend.list;    })  },  getHomeGoods(type){    const page = this.goods[type].page +1    getHomeGoods(type,page).then(res =>{      this.goods[type].list.push(...res.data.list)      this.goods[type].page +=1    })  }}
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
props: {  goods:{    type: Array,    default() {      return []    }  }}
```

子传孙 GoodsList ->GoodsListItem

子

```html
<goods-list-item v-for="item in goods" :goods-item="item" class="item"/>
```

孙

```javascript
props:{  goodsItem: {    type: Object,    default() {      return null    }  }}
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
itemClick(index){  this.currentIndex=index;  this.$emit('tabClick',index)}
```

Home中接收

```html
<tab-control class="tab-control"             :titles="['流行','新款','精选']" @tabClick="tabClick"/>
```

method方法：

```javascript
tabClick(index){  this.currentType = Object.keys(this.goods)[index]  //老师写了个switch},
```

又用计算属性computed封装了一下

```javascript
showGoods() {  return this.goods[this.currentType].list}
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
//3.监听上拉事件this.scroll.on('pullingUp',() =>{  this.$emit('pullingUp')})
```

并且在methods里封装了一个finishPullUp方法

```javascript
finishPullUp(){  console.log('结束pullup')  this.scroll.finishPullUp()}
```

在home中的scroll组件 @pullingUp="loadMore"

```javascript
loadMore(){  console.log('我加载了！')  this.getHomeGoods(this.currentType)  this.$refs.scroll.scroll.refresh()},
```

因为上拉后图片都是异步加载的，所以刚上拉完，计算content高度时没有把图片算进去。所以每次加载完新数据后，需要refresh一下页面

而，每次pullup都需要一个funishPullUp。加载完数据之后再finish

```javascript
getHomeGoods(type){  const page = this.goods[type].page +1  getHomeGoods(type,page).then(res =>{    this.goods[type].list.push(...res.data.list)    this.goods[type].page +=1    this.$refs.scroll.finishPullUp()  })}
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
debounce(func,delay){  let timer = null  return function (...args) {    if(timer) clearTimeout(timer)    timer = setTimeout(() =>{      func.apply(this,args)    },delay)  }},
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
imageLoad(){  if(!this.isLoad){    this.$emit('swiperImageLoad')    this.isLoad = true  }
```

补充：为了不让HomeSwiper多次发出时间，可以使用isLoad的变量进行状态的记录（节流）

2、加载完成后。发出事件，在Home.vue中，获取正确的值

```html
<HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
```

```javascript
swiperImageLoad(){  this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;},
```

tabOffsetTop记录当前组件的位置

（为了方便显示，我们用两个一模一样的tabControl，一个滚动，一个固定 时隐时现，来模拟表现粘滞效果。所以这里取的是第2个会滚动的tabControl）

注意：这里不进行多次调用。和debounce的区别 ※

所有的组件都有一个属性$el:用于获取组件中的元素

监听滚动，动态的改变tabControl的样式

对于tabControl1，

`v-show="isTabFixed"`，其中isTabFixed在滚动事件中改变

```javascript
contentScroll(position){  //1判断BackTop是否显示  this.isShowBackTop = - position.y > 1000  //2.决定tabControl是否吸顶(position:fixed)  this.isTabFixed = (-position.y) > this.tabOffsetTop},
```

另，因为有了2个tabControl，所以点击事件的标签显示也要同步

```javascript
tabClick(index){  this.currentType = Object.keys(this.goods)[index]  //老师写了个switch  this.$refs.tabControl1.currentIndex = index;  this.$refs.tabControl2.currentIndex = index;},
```

滚动的content采用绝对定位，tabControl都采用相对定位

#### 6.15Home离开时记录状态和位置

在app.vue使用keep-alive

```html
<keep-alive>  <router-view/></keep-alive>
```

但是用了better-scroll可能又会带来问题。。（据说2.0修复了？？）

```javascript
activated() {  this.$refs.scroll.refresh()  this.$refs.scroll.scrollTo(0,this.saveY,0)},deactivated() {  this.saveY = this.$refs.scroll.scroll.y},
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
.content {  height: 150px;  /*overflow: hidden;*/  overflow-y: scroll;}
```

BScroll

![image-20210715150347248](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210715150347248.png)

引入：

```
import BScroll from 'better-scroll'
```

组件创建完之后才调用create()，所以组件设置要在mounted里，data中存储scroll变量。

否则会报错，也可以增加一句`if(this.$refs.tabControl !== undefined)`※晕晕

```javascript
data() {  return {    scroll:null  }},mounted() {  // console.log(this.$refs.aaaa);  // console.log(document.querySelector('.wrapper'))  this.scroll = new BScroll(document.querySelector('.wrapper'),{  })}
```

BetterScroll 默认处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略。

```html
<div class="wrapper" ref="aaaa">  <ul class="content">    <li>分类列表1</li>    <li>分类列表2</li>    <li>分类列表3</li>    <li>分类列表4</li>    <li>分类列表5</li>  </ul></div>
```

样式

```css
.wrapper {  height: 150px;  background-color: red;  overflow: hidden;  /*overflow-y: scroll;*/}
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
document.querySelector('.btn').addEventListener('click',function () {  console.log('----')})
```

上拉加载更多：

[pull-up](https://better-scroll.github.io/docs/zh-CN/plugins/pullup.html#%E7%A4%BA%E4%BE%8B)

为了解耦 BetterScroll 1.x 的各个 feature 的功能，防止 bundle 体积无限制的增加。在 2.x 的架构设计当中，采用了『插件化』 的架构设计。对于 1.x 的各个 feature，在 2.x 都将以 Plugin 的形式实现。

安装：`npm install @better-scroll/pull-up --save`

content必须有一个固定高度，它是不能无限滚动的。

html文件里的实现

```html
<script src="./bscroll.js"></script><script>  const bscroll = new BScroll(document.querySelector('.content'),{    probeType:3,    click:true,    pullUpLoad: true  })  bscroll.on('scroll',(position)=> {   // console.log(position);  })  bscroll.on('pullingUp',() =>{    console.log('上拉加载更多')    //发送网络请求，请求更多页的数据    //等数据请求完成，并且将新的数据展示出来后    setTimeout(() =>{      bscroll.finishPullUp()    },2000)  })</script>
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
  .content{    overflow: hidden;    position: absolute;    top: 44px;    bottom: 49px;    left: 0;    right: 0;  }/*  .content{    height: calc(100vh - 93px);    overflow: hidden;  }*/
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
<template>  <div class="back-top" >    <img src="~assets/img/common/top.png" alt="">  </div></template><script>  export default {    name: "BackTop"  }</script><style scoped>  .back-top {    position: fixed;    right: 10px;    bottom: 55px;  }  .back-top img{    width: 43px;    height: 43px;  }</style>
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
backClick(){  this.$refs.scroll.scrollTo(0,0)},
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
props: {  probeType: {    type: Number,    default: 0  }},
```

```javascript
mounted() {  //1.创建BScroll对象  this.scroll = new BScroll(this.$refs.wrapper,{    click: true,    probeType: this.probeType  })  //2.监听滚动的位置,并返回调用父组件函数，传参position  this.scroll.on('scroll',(position) =>{    this.$emit('scroll',position)  })},
```

而在home父组件中

```html
<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
```

:probe-type="3"  传参数，表示要监听滚动。必须加冒号：，即v-bind绑定，如果不加，"3"会被当成一个字符串。

父组件@scroll接收，并调用父组件home里的函数contentScroll(position)

```javascript
contentScroll(position){  this.isShowBackTop = position.y < -1000},
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
{  path: '/detail/:id',  component: Detail}
```

在GoodsListItem里注册一个点击事件

```javascript
itemClick(){  this.$router.push('/detail/'+ this.goodsItem.iid)}
```

在Detail页面接收

```javascript
data(){  return{    iid:null  }},created() {  this.iid = this.$route.params.id}
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
//2.根据iid请求详情数据getDetail(this.iid).then(res =>{  this.topImages = res.result.itemInfo.topImages})
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
export class Goods {  constructor(itemInfo, columns, services) {    this.title = itemInfo.title    this.desc = itemInfo.desc    this.newPrice = itemInfo.price    this.oldPrice = itemInfo.oldPrice    this.discount = itemInfo.discountDesc    this.columns = columns    this.services = services    this.realPrice = itemInfo.lowNowPrice  }}
```

在Detail中定义一个goods，初始为{}。在created中

```javascript
const data =res.resultthis.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
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
#detail {  position: relative;  z-index: 9;  background-color: #fff;}
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

两个小黑条的绘制

![image-20210718100315318](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210718100315318.png)

```css
.info-desc .start, .info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.info-desc .start {
  float: left;
}
.info-desc .end {
  float: right;
}

.info-desc .start::before, .info-desc .end::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.info-desc .end::after {
  right: 0;
}
```

[Vue warn]: Error in render: "TypeError: Cannot read property '0' of undefined
只要出现Error in render，即渲染时候报错，此时应该去渲染位置去找错误，而不是函数里面。

在渲染时，出现的三层表达式在detailInfo中取detailImage[0]数组中的下标为0的对象还不存在，再在这个对象中取其他值自然会报错，但是渲染完成后，detailInfo中的值加载好了，自然可以取到，这也就解释了为什么界面正常显示，但开发者工具会报错的原因。

解决方法：在上面一个div中添加v-if判断条件，如果detialInfo.detailImage取不到，则不加载该div即可解决。（注意，不能用v-show，v-show的机制是加载后，根据条件判断是否显示）

```html
<div v-if="Object.keys(detailInfo).length !== 0"  class="goods-info">
```

由于详情页图片比较多，加载得慢的话也可能造成滚动页面大小计算异常。可以增加防抖函数刷新

#### 9.7商品参数信息的展示

因为传来的数据很狗屎，所以我处理了一下。源数据：

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210718160100723.png" alt="image-20210718160100723" style="zoom:67%;" />

一组数据硬是分成了两个数组。

合并

```javascript
this.sizes = rule.tables[0];if(rule.tables.length >1)  for(let i=1;i<rule.tables.length;i++)    for(let j=0;j<rule.tables[0].length;j++)      for(let k=1;k<rule.tables[i][j].length;k++)      this.sizes[j].push(rule.tables[i][j][k])
```

合并后：

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210718160251428.png" alt="image-20210718160251428" style="zoom:67%;" />

#### 9.8商品评论信息的展示（时间格式化）

vue3已经没有过滤器了，官方推荐用计算属性

时间戳：以unix时间元年为起点，返回对应的时间戳，（秒）

将时间戳转成格式化字符串

1.将时间戳转成Date对象（毫秒）

```javascript
const date = new Date(1519803687*1000)
```

2.将date进行格式化，转成对应的字符串

```
date.getYear()+date.getMonth()+1
```

nonono,这实在是太常见了，很多语言系统本身就提供函数封装↓java

```
format(date,'yyyy-MM-dd hh:mm:ss')
```

中间的符号自己随便加。
y 年
M 月
d 日
h 12小时制，H 24小时制
m 分钟
s 秒

直接复制写好的方法到src/common/utils.js

```javascript
export function formatDate(date, fmt) {  if (/(y+)/.test(fmt)) {    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));  }  let o = {    'M+': date.getMonth() + 1,    'd+': date.getDate(),    'h+': date.getHours(),    'm+': date.getMinutes(),    's+': date.getSeconds()  };  for (let k in o) {    if (new RegExp(`(${k})`).test(fmt)) {      let str = o[k] + '';      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));    }  }  return fmt;};function padLeftZero (str) {  return ('00' + str).substr(str.length);};
```

正则表达式：

y？表示可有可无，至多一个，0或1
y*表示可有可无，多了不限，0或多
y+表示至少一个，多了不限，1或多

substr(参数1，参数2) ——从第 参数1 位开始截取，截取 参数2 个字符。返回截取的字符串 

图片切割成方图：

```css
.img-item{  overflow: hidden;  width: 110px;  height: 110px;  margin-left: 5px;}.info-img img{  height: 100%;  width: 100%;  object-fit: cover;}
```

在图片外面再套一层方形div，把图片拉大，超出部分隐藏

#### 9.9商品推荐数据的展示

新地址传数据

推荐商品展示的时候，复用GoodsList组件。但是有些数据路径不一样。可以写一个计算属性进行判断

```javascript
computed:{  showImage(){    return this.goodsItem.image || this.goodsItem.show.img  }}
```

#### 9.10首页和详情页监听全局事件和mixin的使用

GoodsList中有一些函数和之前的home绑定（bus返回），如果复用的话有些功能会影响到home。

方法1：路由判断

```javascript
imageLoad(){  if(this.$route.path.indexOf('/home'))    this.$bus.$emit('homeItemImageLoad')  else if(this.$route.path.indexOf('/detail'))    this.$bus.$emit('detailItemImageLoad')},
```

方法2：在离开home时取消监听

this.\$bus.\$off('监听',函数)

听不懂，跳过。

[mixin](https://cn.vuejs.org/v2/api/#mixins)，取原组件里的函数，添加到js。

创建混入对象：const mixin = {}

组件对象中：mixins:[mixin]

多个组件共享代码

RN -> Flutter(Dart)

#### 9.11点击标题滚到对应内容

点击标题，滚动到对应的主题

```html
<detail-nav-bar class="detail-nav-bar" @titleClick="titleClick"/>
```

在detail中监听标题的点击，获取index

监听子组件emit传来的数据，必须区分大小写，用驼峰

弹幕建议：[scrollToElement](https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-api.html#%E6%96%B9%E6%B3%95)(el, time, offsetX, offsetY, easing)

```javascript
titleClick(index){
  switch (index) {
    case 0: this.$refs.scroll.scroll.scrollToElement(this.$refs.goods.$el,300);break;
    case 1: this.$refs.scroll.scroll.scrollToElement(this.$refs.param.$el,300);break;
    case 2: this.$refs.scroll.scroll.scrollToElement(this.$refs.comment.$el,300);break;
    case 3: this.$refs.scroll.scroll.scrollToElement(this.$refs.recommend.$el,300);break;
  }
}
```

老师的方法：

用数组存储应该跳转的位置，

```javascript
this.themeTopYs.push(this.$refs.param.$el.offsetTop)
```

然后用scrollTo函数

created肯定不行，压根不能获取元素。mounted也不行，数据还没有获取到。获取到数据的回调中也不行，DOM还没有渲染完。$nextTick也不行，因为图片的高度没有被计算在内。在图片加载完成后，获取高度才是正确的

↑放在updated里，但是updated在每次操作时都会加载一次。所以，每次update前都清空一下数组

```javascript
if (this.$refs.param && this.$refs.comment && this.$refs.recommend) {
this.$nextTick(() =>{
  //根据最新的数据，对应的DOM是已经被渲染出来
  //但是图片依然是没有加载完（目前取到的offsetTop不包含其中的图片）
  //offsetTop值不对的时候，都是因为图片的问题
    this.themeTops = []
    this.themeTops.push(0)
    this.themeTops.push(this.$refs.param.$el.offsetTop)
    this.themeTops.push(this.$refs.comment.$el.offsetTop)
    this.themeTops.push(this.$refs.recommend.$el.offsetTop)
    this.themeTops.push(Number.MAX_VALUE)
})
}
```

所以，用防抖，在create里实现。写一个if，先判断是否存在，否则不执行

给getThemeTopY赋值（对给this.themeTopYs赋值的操作进行防抖。

有的商品没有评论。。。

#### 9.12滚动内容显示对应标题

把字符串转为数字：parseInt(i)

这里，依旧需要用到9.11里老师算出来的themeTopYs = []。用数组和当前位置进行比较，返回一个currentIndex值。

```javascript
contentScroll(position){
  for(let i=0 ;i< this.themeTops.length;i++){
    if(this.themeTops[i]<=-position.y+44 && -position.y+44<this.themeTops[i+1])
      this.currentIndex = i
    console.log(this.currentIndex)
  }
  this.$refs.nav.currentIndex=this.currentIndex
}
```

`Number.MAX_VALUE`	js里可以获取到的最大值

空间换时间

用$refs直接控制子组件里的变量。记得减去导航栏的44px

老师的方法一可以防止赋值过程过于频繁

```
(this,currentIndex !==1)&&((i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i===length - 1 && positionY >= this.themeTopYs[i]))
```

#### 9.13底部工具栏的封装

css中

```
.left i{}
```

表示left类中的所有i标签，子孙都有

```
.left>i{}
```

表示left类中的子标签i，只有子

文字在元素中垂直居中。那就设置`line-height`行高等于元素高度

#### 9.14BackTop的混入封装

创建common/mixin.js

把非生命周期里的方法放进去

```javascript
import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop: false
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    listenShowBackTop(position){
      this.isShowBackTop = position.y < -1000
    }
  }
}
```

导入

```
import {backTopMixin} from "../../common/mixin";
```

调用

```
mixins: [backTopMixin],
```

#### 9.15将商品添加到购物车中

用npm下载安装vuex

创建store/index.js

```
import Vue from "vue";
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCart(state,payload){
      //payload新添加的商品
      // let oldProduct = null
      // for(let item of state.cartList){
      //   if(item.iid === payload.iid){
      //     oldProduct = item;
      //   }
      // }
      
      //查找之前数组中是否有该商品
      let oldproduct = state.cartList.find(function (item) {
        return item.iid === payload.iid
      })

      //2.判断oldProduct
      if(oldProduct){
        oldProduct.count +=1
      }else{
        payload.count = 1
        state.cartList.push(payload)
      }

      state.cartList.push(payload)
    }
  }
})

//3。挂载Vue实例上
export default store
```

调用时

```javascript
addToCart(){  //1.获取购物车需要展示的信息  const product = {}  product.image = this.topImages[0]  product.title = this.goods.title;  product.desc = this.goods.desc;  product.price = this.goods.realPrice;  product.iid = this.iid;  	this.$store.commit('addCart',product)}
```

异步操作可以放action里，这样方便跟踪调试

```javascript
mutations:{
  //mutations唯一的目的就是修改state中状态
  //mutations中的每个方法尽可能完成的事件比较单一一点，一般一个mutation只完成一个任务。
  addCounter(state,payload){
    payload.count++
  },
  addToCart(state,payload){
    state.cartList.push(payload)
  }
},
actions:{
  addCart(context,payload){
    //查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(function (item) {
      return item.iid === payload.iid
    })

    //2.判断oldProduct
    if(oldProduct){
      context.commit('addCounter',oldProduct)
    }else{
      payload.count = 1
      context.commit('addToCart',payload)
    }
  }
}
```

此时的调用：

```
this.$store.dispatch('addCart',product)
```

最后老师还把代码解构了一下，分开存储。对函数重构

数组的常用方法有哪些？

push/pop/unshift/sort/reverse/map/filter/reduce/join

#### 9.16添加购物车弹窗——toast封装插件

吐司。。

每次添加成功后返回

方法一：Promise

原本是在store的action里完成的。在原函数的返回里增加Promise和resolve

```javascript
export default {
  addCart(context, payload) {
    return new Promise((resolve,reject) =>{
      //查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      })

      //2.判断oldProduct
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1
        context.commit( ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}
```

在Detail里原本的函数后面添加.then

```javascript
this.$store.dispatch('addCart',product).then(res =>{
  console.log(res)
})
```

方法二：mapActions

方法类似mapGetters

引入

```
import {mapActions} from 'vuex'
```

在methods中，引入Actions里的addCart。同样也可以用对象方式给函数改名

```
...mapActions(['addCart']),
```

使用

```javascript
this.addCart(product).then(res =>{  console.log(res)})
```

**安装使用插件**

在toast文件夹，新建index.js（导入文件夹的时候默认导入index.js文件）

```javascript
import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {

  // document.body.appendChild(Toast.$el)
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  //3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement(('div')))

  //4.touast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
```

并且在main.js中安装

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from 'components/common/toast'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
```

Toast组件

```vue
<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "toast",
    props:{
    },
    data(){
      return {
        message: '',
        isShow: false
      }
    },
    methods:{
      show(message='默认文字',time=2000){
        this.isShow = true;
        this.message = message
        setTimeout(() =>{
          this.isShow = false;
          this.message = ''
        },time)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 8px 12px;
    background-color: rgba(0,0,0,.8);
    color: #fff;
    z-index: 999;
  }
</style>
```

show函数中，定义了默认值。

使用时，直接`this.$toast.show('文字',时间)`就可以（不用import导入啦）。如：

```javascript
this.addCart(product).then(res =>{
  this.$toast.show(res,2000)
})
```

github上也有toast插件

### 10.购物车

#### 10.1导航栏（mapGetters）

显示购物车（），括号里显示购物车中的商品数量。

mapGetters辅助函数：将store中的getter映射到局部计算属性

在store新建store/getters.js

```javascript
export default {
  cartLength(state){
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  }
}
```

并且导入到index.js中

实际应用导入Cart.vue

```
import {mapGetters} from 'vuex'
```

在计算属性中

```javascript
computed:{

  ...mapGetters(["cartLength","cartList"])

  ...mapGetters({
    length:'cartLength',
  })
}
```

这里有两种写法，第二种可以给原函数改名。

然后直接像之前用计算属性一样用就好啦。

#### 10.2购物车列表的展示

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210721093729094.png" alt="image-20210721093729094" style="zoom:50%;" />

css属性

white-space：这个属性声明建立布局过程中如何处理元素中的空白符

- nowrap	文本不会换行，文本会在在同一行上继续，直到遇到 \<br> 标签为止。

text-overflow 属性规定当文本溢出包含元素时发生的事情。

| 值       | 描述                                 |
| :------- | :----------------------------------- |
| clip     | 修剪文本。                           |
| ellipsis | 显示省略符号来代表被修剪的文本。     |
| *string* | 使用给定的字符串来代表被修剪的文本。 |

其中，前面那个选中的圈圈，是一个自己做的小组件。

#### 10.3Item选中和不选中的切换

在store的mutations中，每次push新元素时，新元素加一个checked属性，默认为true

```javascript
[ADD_COUNTER](state,payload){  payload.count++},[ADD_TO_CART](state,payload){  payload.checked = true  state.cartList.push(payload)}
```

check-button中，用isChecked变量来记录控制不同样式属性的显示

```html
<div class="check-button" :class="{check:isChecked}">
```

在父组件中

```
<check-button :isChecked="product.checked"/>
```

点击事件，可以写在父组件中，也可以写在组件本身。但是写在父组件中，得加上.native。

弹幕建议click事件引起的checked修改要在mutation里做。

```vue
<template>
  <div class="item">
    <div class="item-selector">
      <check-button :isChecked="product.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="product.image">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-size">型号，暂时还没做</div>
      <div id="item-info-bottom">
        <div class="item-price">￥{{product.price}}</div>
        <div class="item-count">×{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartListItem",
    components:{
      CheckButton
    },
    props:{
      product:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      checkClick(){
        this.product.checked = ! this.product.checked
      }
    }
  }
</script>

<style scoped>
  .item{
    padding: 5px ;
    display: flex;
    border: 2px solid rgba(100,100,100,.1);
    border-radius: 14px;
    margin: 8px 0;
    background-color: #fff;
  }
  .item-selector{
    justify-content: center;
    align-items: center;
    display: flex;
    width: 20px;
  }

  .item-img{
    width: 80px;
    height: 80px;
    margin: 5px;
  }
  .item-img img{
    height: 80px;
    width: 80px;
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid rgba(100,100,100,.1);
  }
  .item-info{
    position: relative;
    overflow: hidden;
    margin: 5px
  }
  .item-title{
    font-size: 15px;
    height: 34px;
    line-height: 18px;
    margin-bottom: 2px;
    color: black;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

  }
  .item-size{
    font-size: 13px;
    margin-top: 6px;
  }
  #item-info-bottom {
    margin-top: 7px;
  }
  .item-price{
    float: left;
    color: var(--color-high-text);
  }
  .item-count{
    float: right;
  }

</style>
```

#### 10.4底部工具的封装和应用

##### 10.4.1全选按钮

**显示的状态：**如果所有商品都选中了，全选按钮自动选中。如果有不选中的，全选按钮自动不选中

```
<check-button :is-checked="isSelectedAll"/>
```

方法一：

```javascript
isSelectedAll(){
  if(this.cartList.length===0) return false;
  
  //三种方法，方法一性能差一点。老师还写了普通编历。。
  return !this.cartList.filter(item => !item.checked).length
  return !this.cartList.find(item =>!item.checked)
  return this.cartList.every(item =>item.checked)
}
```

**点击全选按钮**

如果原来都是选中，点击一次，全部不选中；否则点击后全选

```javascript
checkClick(){
  // if(this.isSelectedAll){
  //   this.cartList.forEach(item => item.checked = false)
  // }else{
  //   this.cartList.forEach(item => item.checked = true)
  // }

  let isC=this.isSelectedAll
  this.cartList.forEach(item => item.checked = !isC)
}
```

##### 10.4.2合计

导入mapGetters

然后在CartBottomBar中导入，像计算属性一样使用。

```
import {mapGetters} from 'vuex'
```

```
...mapGetters(['cartList','checkLength']),
```

用了过滤

```javascript
totalPrice(){
  return '￥'+this.cartList.filter(item =>{
    return item.checked
  }).reduce((preValue,item) =>{
    return preValue + item.price * item.count
  },0).toFixed(2)
```

##### 10.4.3结算按钮

再在mapGetters里添加计算已经选中的商品种数。

```javascript
checkLength(state) {
  return state.cartList.filter(item => item.checked).length
}
```

#### 11.细节补充

##### 11.1fastClick减少点击延迟

Promise、polyfill

安装fastclick：`npm install fastclick --save`

导入

调用attach函数，在main.js中

```
import FastClick from 'fastclick'

FastClick.attach(document.body)
```

##### 11.2图片懒加载

图片需要显示在屏幕上，再加载

安装：`npm install vue-lazyload --save`

vue3直接搜索下载，自动配置

导入

Vue.use

修改img:src -> v-lazy，如

```html
<img @load="imageLoad" v-lazy="showImage" alt="">
```

还可以设置占位图

<img src="https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210721194655746.png" alt="image-20210721194655746" style="zoom:50%;" />

```javascript
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})
```

##### 11.3 px2vw插件使用——将px转成vw，转成rem

vw宽度，vh高度

安装：`npm install postcss-px-to-viewport --save-dev`

retina 1点2个像素

375 -> 15px
750 -> 30px
设计稿：iphone6（750×667 1334）

在根目录创建文件postcss.config.js

```javascript
module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,//视窗宽度，对应设计稿的宽
      viewportHeight:667,//视窗高度，对应设计稿的高（也可以不配置）
      unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], // 指定不需要转换的类,后面再讲.
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位.
      mediaQuery: false, // 允许在媒体查询中转换`px`
      exclude:[/TabBar/]
    }
  }
}
```

1.在js中使用正则： /正则相关规则/
2.在exclude中存放的元素必须是正则表达式
3.按照排除的文件写对应的正则：
正则的规则：
	1.^abc：表示匹配的内容，必须以什么内容开头（以abc开头）
	2.$abc：表示匹配的内容，必须以什么内容结尾（以abc结尾）

#### 12.nginx

##### 12.1 项目在windows下的部署

服务器问题：一台电脑（没有显示器，主机），24小时开着，为用户提供服务

很多公司没有自己的服务器主机 -> 租借 阿里云/华为云/腾讯云
主机 -> 操作系统 -> windows(.net)/Linux -> tomcat/nginx（软件/反向代理）

第一：将自己的电脑作为服务器 -> window -> nginx
第二：远程部署（Mac）

Mainline version：Nginx目前主力在做的版本，可以说是开发版
Stable version：最新稳定版，生产环境上建议使用的版本

自己电脑，，得把IIS给关了，再去启动nginx。nginx路径不能有中文

![image-20210721211753214](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210721211753214.png)

用build后的dist文件夹里的文件直接替换nginx里html文件夹里的文件

conf/nginx.conf是配置文件

    location / {
        root   dist;
        index  index.html index.htm;
    }

记录了根目录打开的地方 名字

可以配置多个服务

windows下关闭Nginx命令：
先cd到当前目录
nginx -s stop
nginx -s quit

修改配置后，要重启nginx

##### 12.2项目在远程linux下的部署

centos 用于服务器实用
Ubuntu 学习
弹幕说 反了？？

远程主机 -> linux centos ->nginx => 终端命令

yarn/npm
yum：linux安装包管理工具

WinSCP、SecureCRT
弹幕推荐（xshell、xftp）

### 面试题

##### 如何理解vue的生命周期

##### 如何进行非父子组件通信

##### vue的响应式原理（高级的前端开发）

- 不要认为数据发生改变，界面跟着更新，并不是理所当然

1. app.message修改数据，Vue内部是如何监听message数据的改变

   `Object.defineProperty `->监听对象属性的改变

   

2. 当数据发生改变，Vue是如何知道要通知哪些人，界面发生刷新

   发布订阅模式

   ```javascript
   class Dep {
   	construct(){
   		this.subcribes = []
   	}
     addSub(watcher){
       
     }
   }
   class Watcher{
     construct(name){
       this.name = name;
     }
     update(){
       console.log(this.name + '发生update');
     }
     
   }
   const dep = new Dep()
   
   const w1 = new Watcher('张三');
   dep.addSub(w1)
   ```

   观察者模式=开发者模式-订阅者模式

![image-20210721230220718](https://xiao910888.oss-cn-hangzhou.aliyuncs.com/img/image-20210721230220718.png)

3. 


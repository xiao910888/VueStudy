<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <FeatureView/>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from "./CildComps/HomeSwiper";
  import RecommendView from "./CildComps/RecommendView";
  import FeatureView from "./CildComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from "../../common/utils";
  import {backTopMixin} from "../../common/mixin";

  export default {
    name: "Home",
    components: {
      getHomeMultidata,
      getHomeGoods,
      debounce,

      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [backTopMixin],
    data(){
      return{
        banners:[],
        recommends:[],
        goods: {
          'pop':{page: 0,list: []},
          'new':{page: 0,list: []},
          'sell':{page: 0,list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY:0,
        itemImagListener:null
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated() {
      //1.保存Y值
      this.saveY = this.$refs.scroll.scroll.y

      //2.取消全局事件的监听
      // this.$bus.$off('itemImageLoad',)
    },
    mounted() {
     const refresh = debounce(this.$refs.scroll.refresh,50)
      //3.监听item中图片加载完成
      this.$bus.$on('itemImageLoad',() =>{
        refresh()
      })

    },
    methods: {
      /**
       * 事件监听相关方法
       * */

      tabClick(index){
        this.currentType = Object.keys(this.goods)[index]
        //老师写了个switch
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(position){
        //1判断BackTop是否显示
        this.listenShowBackTop(position)

        //2.决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        console.log('上拉加载更多')
        this.getHomeGoods(this.currentType)

        this.$refs.scroll.refresh()
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      /**
       * 网络请求相关方法
       * */
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

          this.$refs.scroll.finishPullUp()
        })
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    padding-bottom: 49px;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
/*    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }
  .content{
    overflow: hidden;

    position: absolute;
    top: 45px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
/*  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
  }*/
  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>
